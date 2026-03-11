import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const PATH_TO_SLUG: Record<string, string> = {
  "/": "home",
  "/services": "services",
  "/services/digital-marketing": "digital-marketing",
  "/services/seo": "seo-services",
  "/services/paid-advertising": "paid-advertising",
  "/services/content-strategy": "content-strategy",
  "/services/web-development": "web-development",
  "/services/web-development/wordpress-shopify": "wordpress-shopify",
  "/services/web-development/custom-apps": "custom-apps",
  "/services/web-development/ecommerce-solutions": "ecommerce-solutions",
  "/services/app-development": "app-development",
  "/services/app-development/android-ios": "android-ios",
  "/services/app-development/hybrid-apps": "hybrid-apps",
  "/services/business-software": "business-software",
  "/services/business-software/desktop-software": "desktop-software",
  "/services/business-software/saas-application": "saas-application",
  "/services/business-software/custom-business-software": "custom-business-software",
  "/services/ai-services": "ai-services",
  "/services/ai-services/ai-influencer": "ai-influencer",
  "/services/ai-services/ai-model-photoshoot": "ai-model-photoshoot",
  "/services/ai-services/ai-chatbot": "ai-chatbot",
  "/services/ai-services/ai-content-creation": "ai-content-creation",
  "/services/ai-services/ai-automation": "ai-automation",
  "/services/social-media": "social-media",
  "/services/social-media/platform-management": "platform-management",
  "/services/social-media/content-creation": "social-content-creation",
  "/services/social-media/community-engagement": "community-engagement",
  "/services/design-video": "design-video",
  "/services/design-video/logo-branding": "logo-branding",
  "/services/design-video/motion-graphics": "motion-graphics",
  "/services/design-video/video-editing": "video-editing",
  "/portfolio": "portfolio",
  "/about": "about",
  "/blog": "blog",
  "/contact": "contact",
};

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
}

export function useSEO({ title, description, keywords, canonical, ogImage }: SEOProps) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
  const slug = PATH_TO_SLUG[pathname] || null;

  const { data: dbSeo } = useQuery<any>({
    queryKey: ["/api/seo", slug],
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    const finalTitle = dbSeo?.metaTitle || title;
    const finalDesc = dbSeo?.metaDescription || description;
    const finalKeywords = dbSeo?.metaKeywords || keywords;
    const finalCanonical = dbSeo?.canonicalUrl || canonical;
    const finalOgTitle = dbSeo?.ogTitle || finalTitle;
    const finalOgDesc = dbSeo?.ogDescription || finalDesc;
    const finalOgImage = dbSeo?.ogImage || ogImage;
    const finalTwitterTitle = dbSeo?.twitterTitle || finalOgTitle;
    const finalTwitterDesc = dbSeo?.twitterDescription || finalOgDesc;
    const noIndex = dbSeo?.noIndex ?? false;

    document.title = finalTitle;

    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    const createOrSetMeta = (name: string, nameAttr: "name" | "property", content: string) => {
      const selector = nameAttr === "property"
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(nameAttr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    createOrSetMeta("description", "name", finalDesc);
    createOrSetMeta("og:title", "property", finalOgTitle);
    createOrSetMeta("og:description", "property", finalOgDesc);
    createOrSetMeta("twitter:title", "name", finalTwitterTitle);
    createOrSetMeta("twitter:description", "name", finalTwitterDesc);
    createOrSetMeta("robots", "name", noIndex ? "noindex, nofollow" : "index, follow");

    if (finalOgImage) {
      createOrSetMeta("og:image", "property", finalOgImage);
    }

    if (finalKeywords) {
      createOrSetMeta("keywords", "name", finalKeywords);
    }

    if (finalCanonical) {
      createOrSetMeta("og:url", "property", finalCanonical);
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", finalCanonical);
    }
  }, [dbSeo, title, description, keywords, canonical, ogImage]);
}
