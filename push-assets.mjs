import { ReplitConnectors } from "@replit/connectors-sdk";
import fs from "fs";

const connectors = new ReplitConnectors();
const OWNER = "shanio786";
const REPO = "devoriatech-site";
const ASSETS_DIR = "/home/runner/workspace/attached_assets";

const NEEDED_FILES = [
  "about-office.webp", "ai-automation-hero.webp", "ai-chatbot-hero.webp",
  "ai-content-creation-hero.webp", "ai-influencer-hero.webp", "ai-model-photoshoot-hero.webp",
  "ai-services-hero.webp", "android-ios-hero.webp", "app-dev-hero.webp",
  "blog-ai-automation-hero.webp", "blog-ai-automation-smb.webp", "blog-ai-automation.webp",
  "blog-ai-automation-workflow.webp", "blog-ai-chatbot.webp", "blog-ai-hero.webp",
  "blog-branding-hero.webp", "blog-branding-process.webp", "blog-branding-recognition.webp",
  "blog-digital-marketing-email.webp", "blog-digital-marketing-hero.webp",
  "blog-digital-marketing-social.webp", "blog-social-media-content.webp",
  "blog-social-media-growth.webp", "blog-social-media-hero.webp",
  "blog-video-editing.webp", "blog-video-hero.webp", "blog-video-social.webp",
  "blog-website-hero.webp", "blog-website-mobile.webp", "blog-website-seo.webp",
  "business-software-hero.webp", "ceo-zeeshan-ahmad.webp", "content-strategy-hero.webp",
  "custom-apps-hero.webp", "custom-business-software-hero.webp",
  "design-creative-process.webp", "design-logo-branding.webp", "design-motion-graphics.webp",
  "design-video-editing.webp", "design-video-hero.webp", "desktop-software-hero.webp",
  "dm-hero.webp", "ecommerce-hero.webp", "hybrid-apps-hero.webp",
  "logo-branding-hero.webp", "logo-branding-services.webp",
  "motion-graphics-hero.webp", "motion-graphics-types.webp", "paid-ads-hero.webp",
  "portfolio-ai-chatbot-project.webp", "portfolio-branding-project.webp",
  "portfolio-ecommerce-project.webp", "portfolio-ecommerce.webp",
  "portfolio-fitness-app.webp", "portfolio-healthcare-app.webp", "portfolio-marketing.webp",
  "portfolio-mobile-app-project.webp", "portfolio-saas-dashboard.webp",
  "portfolio-social-media-project.webp", "portfolio-website-project.webp",
  "saas-development-hero.webp", "seo-hero.webp",
  "services-ai.webp", "services-app-dev.webp", "services-business-software.webp",
  "services-digital-marketing.webp", "services-hero.webp", "services-social-media.webp",
  "services-web-dev.webp", "social-media-community-hero.webp",
  "social-media-content-hero.webp", "social-media-hero.webp",
  "social-media-management-hero.webp", "video-editing-hero.webp", "video-editing-types.webp",
  "web-dev-hero.webp", "wp-shopify-hero.webp"
];

async function ghApi(endpoint, options = {}) {
  const resp = await connectors.proxy("github", endpoint, options);
  const text = await resp.text();
  if (!resp.ok) throw new Error(`GitHub API ${resp.status}: ${text.substring(0, 200)}`);
  return JSON.parse(text);
}

async function getLatestCommitSha() {
  const data = await ghApi(`/repos/${OWNER}/${REPO}/git/refs/heads/main`);
  return data.object.sha;
}

async function getTreeSha(commitSha) {
  const data = await ghApi(`/repos/${OWNER}/${REPO}/git/commits/${commitSha}`);
  return data.tree.sha;
}

async function main() {
  console.log(`Uploading ${NEEDED_FILES.length} asset files...`);

  const latestCommit = await getLatestCommitSha();
  const baseTree = await getTreeSha(latestCommit);
  console.log(`Base commit: ${latestCommit}`);

  const treeItems = [];
  const BATCH = 3;

  for (let i = 0; i < NEEDED_FILES.length; i += BATCH) {
    const batch = NEEDED_FILES.slice(i, i + BATCH);
    const results = await Promise.all(batch.map(async (fileName) => {
      const filePath = `${ASSETS_DIR}/${fileName}`;
      if (!fs.existsSync(filePath)) {
        console.log(`  SKIP: ${fileName} (not found)`);
        return null;
      }
      const content = fs.readFileSync(filePath).toString("base64");
      const blob = await ghApi(`/repos/${OWNER}/${REPO}/git/blobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, encoding: "base64" }),
      });
      return { path: `attached_assets/${fileName}`, mode: "100644", type: "blob", sha: blob.sha };
    }));

    treeItems.push(...results.filter(Boolean));
    console.log(`  ${Math.min(i + BATCH, NEEDED_FILES.length)}/${NEEDED_FILES.length} uploaded`);
  }

  console.log("Creating tree...");
  const tree = await ghApi(`/repos/${OWNER}/${REPO}/git/trees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ base_tree: baseTree, tree: treeItems }),
  });

  console.log("Creating commit...");
  const commit = await ghApi(`/repos/${OWNER}/${REPO}/git/commits`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "Add all attached assets (images) used in source code",
      tree: tree.sha,
      parents: [latestCommit],
    }),
  });

  console.log("Updating branch...");
  await ghApi(`/repos/${OWNER}/${REPO}/git/refs/heads/main`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sha: commit.sha }),
  });

  console.log(`\nDone! ${treeItems.length} assets pushed to GitHub`);
}

main().catch(err => {
  console.error("Error:", err.message);
  process.exit(1);
});
