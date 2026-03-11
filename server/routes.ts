import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertBlogSchema, insertSeoSchema } from "@shared/schema";
import { ZodError } from "zod";
import nodemailer from "nodemailer";
import crypto from "crypto";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || "";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "devoria2026";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function checkAdminPassword(password: string): boolean {
  if (ADMIN_PASSWORD_HASH) {
    return hashPassword(password) === ADMIN_PASSWORD_HASH;
  }
  return password === ADMIN_PASSWORD;
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if ((req.session as any)?.adminAuthenticated) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.hostinger.com",
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || "info@devoriatech.com",
    pass: process.env.SMTP_PASS || "",
  },
});

async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  budget?: string | null;
  message: string;
}) {
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0f1e; color: #ffffff; padding: 30px; border-radius: 12px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #06b6d4; margin: 0;">New Contact Form Submission</h1>
        <p style="color: #ffffff80; font-size: 14px;">Devoria Tech Website</p>
      </div>
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="border-bottom: 1px solid #ffffff10;">
          <td style="padding: 12px; color: #06b6d4; font-weight: bold; width: 130px;">Name</td>
          <td style="padding: 12px; color: #fff;">${data.name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #ffffff10;">
          <td style="padding: 12px; color: #06b6d4; font-weight: bold;">Email</td>
          <td style="padding: 12px; color: #fff;"><a href="mailto:${data.email}" style="color: #38bdf8;">${data.email}</a></td>
        </tr>
        ${data.phone ? `<tr style="border-bottom: 1px solid #ffffff10;"><td style="padding: 12px; color: #06b6d4; font-weight: bold;">Phone</td><td style="padding: 12px; color: #fff;">${data.phone}</td></tr>` : ""}
        ${data.company ? `<tr style="border-bottom: 1px solid #ffffff10;"><td style="padding: 12px; color: #06b6d4; font-weight: bold;">Company</td><td style="padding: 12px; color: #fff;">${data.company}</td></tr>` : ""}
        ${data.service ? `<tr style="border-bottom: 1px solid #ffffff10;"><td style="padding: 12px; color: #06b6d4; font-weight: bold;">Service</td><td style="padding: 12px; color: #fff;">${data.service}</td></tr>` : ""}
        ${data.budget ? `<tr style="border-bottom: 1px solid #ffffff10;"><td style="padding: 12px; color: #06b6d4; font-weight: bold;">Budget</td><td style="padding: 12px; color: #fff;">${data.budget}</td></tr>` : ""}
        <tr>
          <td style="padding: 12px; color: #06b6d4; font-weight: bold; vertical-align: top;">Message</td>
          <td style="padding: 12px; color: #fff; line-height: 1.6;">${data.message.replace(/\n/g, "<br>")}</td>
        </tr>
      </table>
      <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #ffffff10; text-align: center;">
        <p style="color: #ffffff40; font-size: 12px;">Reply directly to this email to respond to ${data.name}</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Devoria Tech Website" <${process.env.SMTP_USER || "info@devoriatech.com"}>`,
    to: process.env.CONTACT_EMAIL || "info@devoriatech.com",
    replyTo: data.email,
    subject: `New Inquiry from ${data.name}${data.service ? ` - ${data.service}` : ""}`,
    html: htmlBody,
  });
}

async function seedBlogs() {
  const existing = await storage.getAllBlogs();
  if (existing.length > 0) return;

  const blogs = [
    {
      title: "Why Every Business Needs a Professional Website in 2026",
      slug: "why-every-business-needs-professional-website-2026",
      excerpt: "Discover why having a professional website is essential for businesses in 2026. Learn how a modern website builds trust, attracts customers, and improves marketing results.",
      category: "Web Development",
      heroImage: "/assets/blog-website-hero.webp",
      metaTitle: "Why Every Business Needs a Professional Website in 2026 | Devoria Tech",
      metaDescription: "Discover why having a professional website is essential for businesses in 2026. Learn how a modern website builds trust, attracts customers, and improves marketing results.",
      metaKeywords: "professional website, business website 2026, website importance, web development, SEO website, mobile-friendly website",
      published: true,
      publishedAt: new Date("2026-03-08"),
      content: `<h2>Your Website is Your Digital Storefront</h2>
<p>In 2026, a professional website is no longer optional — it's the foundation of every successful business. Whether you're a small local shop or a growing enterprise, your website is the first thing potential customers see when they search for your services online.</p>
<h2>Why a Professional Website Matters</h2>
<ul>
<li><strong>Builds Trust:</strong> 75% of users judge a company's credibility based on its website design.</li>
<li><strong>24/7 Marketing:</strong> Your website works around the clock, even when you're asleep.</li>
<li><strong>Wider Reach:</strong> Reach customers beyond your local area with a globally accessible website.</li>
<li><strong>SEO Visibility:</strong> A well-optimized website ranks on Google and brings you free organic traffic.</li>
</ul>
<h2>Mobile-First Design is Essential</h2>
<p>Over 60% of web traffic now comes from mobile devices. A mobile-first, responsive design ensures your site looks perfect on every screen size — from smartphones to large desktop monitors.</p>
<h2>Key Features of a Professional Website</h2>
<ul>
<li>Fast loading speed (under 3 seconds)</li>
<li>Clear call-to-action buttons</li>
<li>SSL certificate (https://)</li>
<li>Contact forms and live chat</li>
<li>SEO-optimized content and structure</li>
</ul>
<h2>Conclusion</h2>
<p>Investing in a professional website is one of the highest ROI decisions a business can make. At Devoria Tech, we build fast, beautiful, and SEO-optimized websites that drive real results for your business.</p>`,
    },
    {
      title: "What is Digital Marketing and Why It Is Important for Businesses",
      slug: "what-is-digital-marketing-why-important-for-businesses",
      excerpt: "Understand what digital marketing is and why it's crucial for business growth in the digital age. Explore SEO, social media, PPC, and content marketing strategies.",
      category: "Digital Marketing",
      heroImage: "/assets/blog-digital-marketing-hero.webp",
      metaTitle: "What is Digital Marketing and Why It Is Important | Devoria Tech",
      metaDescription: "Understand what digital marketing is and why it's crucial for business growth in the digital age. Explore SEO, social media, PPC, and content marketing strategies.",
      metaKeywords: "digital marketing, SEO, social media marketing, PPC, content marketing, online marketing",
      published: true,
      publishedAt: new Date("2026-03-06"),
      content: `<h2>What is Digital Marketing?</h2>
<p>Digital marketing is the promotion of products and services through digital channels — including search engines, social media, email, and websites. It's how modern businesses connect with their target audience online.</p>
<h2>Core Components of Digital Marketing</h2>
<ul>
<li><strong>SEO (Search Engine Optimization):</strong> Optimizing your website to rank higher on Google.</li>
<li><strong>PPC (Pay-Per-Click):</strong> Paid ads on Google, Facebook, and other platforms.</li>
<li><strong>Social Media Marketing:</strong> Building brand presence on Instagram, Facebook, LinkedIn, and TikTok.</li>
<li><strong>Content Marketing:</strong> Creating valuable blogs, videos, and infographics to attract customers.</li>
<li><strong>Email Marketing:</strong> Nurturing leads and customers through targeted email campaigns.</li>
</ul>
<h2>Why Digital Marketing is Essential in 2026</h2>
<p>With over 5 billion internet users worldwide, digital marketing allows businesses of all sizes to reach their ideal customers at the right time with the right message — and measure every result.</p>
<h2>Benefits of Digital Marketing</h2>
<ul>
<li>Cost-effective compared to traditional advertising</li>
<li>Highly targeted — reach specific demographics</li>
<li>Measurable ROI with real-time analytics</li>
<li>Builds long-term brand authority</li>
</ul>
<h2>Conclusion</h2>
<p>Digital marketing is the engine of modern business growth. Devoria Tech offers full-service digital marketing solutions tailored to your business goals.</p>`,
    },
    {
      title: "How Artificial Intelligence Is Transforming Modern Businesses",
      slug: "how-artificial-intelligence-transforming-modern-businesses",
      excerpt: "Explore how AI is revolutionizing industries with automation, chatbots, predictive analytics, and personalization — and how your business can benefit.",
      category: "AI & Technology",
      heroImage: "/assets/blog-ai-hero.webp",
      metaTitle: "How AI Is Transforming Modern Businesses | Devoria Tech",
      metaDescription: "Explore how AI is revolutionizing industries with automation, chatbots, predictive analytics, and personalization — and how your business can benefit.",
      metaKeywords: "artificial intelligence, AI business, AI automation, chatbots, machine learning, AI transformation",
      published: true,
      publishedAt: new Date("2026-03-04"),
      content: `<h2>AI: The Biggest Business Revolution of Our Time</h2>
<p>Artificial Intelligence is no longer a futuristic concept — it's actively reshaping how businesses operate, compete, and grow. From customer service chatbots to predictive analytics, AI is delivering measurable results across every industry.</p>
<h2>How AI is Being Used in Business Today</h2>
<ul>
<li><strong>AI Chatbots:</strong> Handle customer inquiries 24/7 without human intervention.</li>
<li><strong>Predictive Analytics:</strong> Forecast sales trends and customer behavior with data-driven insights.</li>
<li><strong>Marketing Automation:</strong> Personalize email campaigns and ad targeting at scale.</li>
<li><strong>Content Creation:</strong> Generate blog posts, product descriptions, and social media content faster.</li>
<li><strong>Process Automation:</strong> Eliminate repetitive tasks and reduce operational costs.</li>
</ul>
<h2>Industries Being Transformed by AI</h2>
<p>Retail, healthcare, finance, education, and manufacturing are all experiencing significant AI-driven transformation. Businesses that adopt AI early gain a major competitive advantage.</p>
<h2>Getting Started with AI for Your Business</h2>
<p>You don't need a tech giant budget to leverage AI. Start small with chatbots, automated email sequences, or AI content tools — then scale as you see results.</p>
<h2>Conclusion</h2>
<p>AI is the future, and the future is now. Devoria Tech specializes in custom AI solutions that help businesses automate, grow, and outperform the competition.</p>`,
    },
    {
      title: "Top Benefits of Social Media Marketing for Small Businesses",
      slug: "top-benefits-social-media-marketing-small-businesses",
      excerpt: "Learn how social media marketing can help small businesses grow their brand, attract new customers, and compete with larger companies on a budget.",
      category: "Social Media",
      heroImage: "/assets/blog-social-media-hero.webp",
      metaTitle: "Top Benefits of Social Media Marketing for Small Businesses | Devoria Tech",
      metaDescription: "Learn how social media marketing can help small businesses grow their brand, attract new customers, and compete with larger companies on a budget.",
      metaKeywords: "social media marketing, small business marketing, Instagram marketing, Facebook marketing, brand awareness",
      published: true,
      publishedAt: new Date("2026-03-02"),
      content: `<h2>Why Social Media is a Game-Changer for Small Businesses</h2>
<p>Social media has leveled the playing field. Small businesses can now compete with large corporations by building authentic relationships with their audience — at a fraction of the cost of traditional advertising.</p>
<h2>Top Benefits of Social Media Marketing</h2>
<ul>
<li><strong>Brand Awareness:</strong> Reach thousands of potential customers organically and through paid ads.</li>
<li><strong>Customer Engagement:</strong> Build real relationships through comments, DMs, and community interaction.</li>
<li><strong>Cost-Effective:</strong> Even a small budget can yield significant results with targeted ads.</li>
<li><strong>Drive Website Traffic:</strong> Social posts and stories can funnel users directly to your website.</li>
<li><strong>Competitor Insights:</strong> Monitor what your competitors are doing and stay ahead.</li>
</ul>
<h2>Which Platforms Should You Focus On?</h2>
<p>The right platform depends on your audience. Instagram and TikTok work best for visual brands targeting younger demographics. LinkedIn is ideal for B2B businesses. Facebook remains powerful for local businesses targeting adults.</p>
<h2>Content that Performs on Social Media</h2>
<ul>
<li>Short-form videos (Reels, TikTok)</li>
<li>Behind-the-scenes content</li>
<li>Customer testimonials and case studies</li>
<li>Educational tips and how-to posts</li>
</ul>
<h2>Conclusion</h2>
<p>Social media is one of the most powerful tools available to small businesses today. Devoria Tech's social media team creates content that builds brands and drives real business results.</p>`,
    },
    {
      title: "The Complete Guide to Logo Design and Brand Identity",
      slug: "complete-guide-logo-design-brand-identity",
      excerpt: "Everything you need to know about creating a powerful brand identity — from logo design principles to color psychology and brand guidelines.",
      category: "Design & Branding",
      heroImage: "/assets/blog-branding-hero.webp",
      metaTitle: "The Complete Guide to Logo Design and Brand Identity | Devoria Tech",
      metaDescription: "Everything you need to know about creating a powerful brand identity — from logo design principles to color psychology and brand guidelines.",
      metaKeywords: "logo design, brand identity, branding, color psychology, brand guidelines, visual identity",
      published: true,
      publishedAt: new Date("2026-02-28"),
      content: `<h2>Why Your Brand Identity Matters</h2>
<p>Your brand is more than a logo — it's the complete visual and emotional experience customers have with your business. A strong brand identity builds recognition, trust, and loyalty.</p>
<h2>Core Elements of Brand Identity</h2>
<ul>
<li><strong>Logo:</strong> The face of your brand — must be memorable, scalable, and versatile.</li>
<li><strong>Color Palette:</strong> Colors evoke emotions and should align with your brand values.</li>
<li><strong>Typography:</strong> Font choices communicate your brand's personality.</li>
<li><strong>Visual Style:</strong> Consistent imagery, icons, and design patterns.</li>
<li><strong>Brand Voice:</strong> How your brand speaks — formal, casual, playful, or professional.</li>
</ul>
<h2>Logo Design Principles</h2>
<p>A great logo is simple, memorable, timeless, versatile, and appropriate for your industry. It should work in full color, black and white, and at any size.</p>
<h2>Color Psychology in Branding</h2>
<p>Blue conveys trust and professionalism. Red creates urgency and excitement. Green signals growth and health. Orange suggests creativity and energy. Choose colors that align with what you want customers to feel.</p>
<h2>Conclusion</h2>
<p>A powerful brand identity sets you apart from competitors and creates lasting impressions. Devoria Tech's design team creates brand identities that tell your story and drive business growth.</p>`,
    },
    {
      title: "Video Marketing Strategy: How to Grow Your Business with Video",
      slug: "video-marketing-strategy-grow-business",
      excerpt: "Discover how video marketing can dramatically increase engagement, conversions, and brand awareness for your business in 2026.",
      category: "Video & Content",
      heroImage: "/assets/blog-video-hero.webp",
      metaTitle: "Video Marketing Strategy: Grow Your Business with Video | Devoria Tech",
      metaDescription: "Discover how video marketing can dramatically increase engagement, conversions, and brand awareness for your business in 2026.",
      metaKeywords: "video marketing, video content, YouTube marketing, video strategy, brand video, promotional video",
      published: true,
      publishedAt: new Date("2026-02-25"),
      content: `<h2>Video is the King of Content</h2>
<p>Video content generates 1200% more shares than text and images combined. In 2026, businesses that prioritize video marketing see dramatically higher engagement, longer website sessions, and better conversion rates.</p>
<h2>Types of Videos That Drive Results</h2>
<ul>
<li><strong>Explainer Videos:</strong> Simplify complex products or services for your audience.</li>
<li><strong>Testimonial Videos:</strong> Real customer success stories build trust instantly.</li>
<li><strong>Product Demo Videos:</strong> Show your product in action to reduce purchase hesitation.</li>
<li><strong>Social Media Videos:</strong> Short, engaging Reels and TikToks for brand awareness.</li>
<li><strong>Corporate Videos:</strong> Behind-the-scenes and team culture content.</li>
</ul>
<h2>Where to Distribute Your Videos</h2>
<p>YouTube (the world's second largest search engine), Instagram Reels, TikTok, LinkedIn, and your website are all powerful distribution channels for video content.</p>
<h2>Video SEO Best Practices</h2>
<ul>
<li>Use keywords in titles, descriptions, and tags</li>
<li>Add closed captions for accessibility and SEO</li>
<li>Create compelling thumbnails</li>
<li>Include clear calls to action</li>
</ul>
<h2>Conclusion</h2>
<p>Video marketing is no longer optional — it's essential. Devoria Tech's video production team creates professional videos that capture attention and convert viewers into customers.</p>`,
    },
    {
      title: "AI Automation: How to Eliminate Repetitive Tasks and Scale Your Business",
      slug: "ai-automation-eliminate-repetitive-tasks-scale-business",
      excerpt: "Learn how AI automation tools can save your team hours every week by handling repetitive tasks — from customer support to data processing and marketing.",
      category: "AI & Automation",
      heroImage: "/assets/blog-ai-automation-hero.webp",
      metaTitle: "AI Automation: Eliminate Repetitive Tasks and Scale Your Business | Devoria Tech",
      metaDescription: "Learn how AI automation tools can save your team hours every week by handling repetitive tasks — from customer support to data processing and marketing.",
      metaKeywords: "AI automation, business automation, workflow automation, AI tools, marketing automation, customer service automation",
      published: true,
      publishedAt: new Date("2026-02-22"),
      content: `<h2>Why AI Automation is a Business Priority</h2>
<p>The average employee spends 40% of their workweek on repetitive, manual tasks. AI automation eliminates this waste, freeing your team to focus on high-value, creative work that actually grows your business.</p>
<h2>Business Processes You Can Automate with AI</h2>
<ul>
<li><strong>Customer Support:</strong> AI chatbots handle FAQs, bookings, and complaints 24/7.</li>
<li><strong>Email Marketing:</strong> Automated sequences nurture leads from awareness to purchase.</li>
<li><strong>Data Entry:</strong> AI tools extract, organize, and input data from documents automatically.</li>
<li><strong>Social Media Posting:</strong> Schedule and auto-publish content across all platforms.</li>
<li><strong>Invoice Processing:</strong> Automate billing, reminders, and financial reporting.</li>
</ul>
<h2>Real Business Results from AI Automation</h2>
<p>Businesses that implement AI automation report 30-50% reduction in operational costs, 3x faster response times, and significant improvements in customer satisfaction scores.</p>
<h2>Getting Started with AI Automation</h2>
<p>Start by identifying your most time-consuming repetitive tasks. Then evaluate AI tools or custom automation solutions that can handle those processes. Begin with one workflow, measure the results, and expand.</p>
<h2>Conclusion</h2>
<p>AI automation is the smartest investment a growing business can make. Devoria Tech builds custom AI automation solutions that save time, reduce costs, and scale with your business.</p>`,
    },
  ];

  for (const blog of blogs) {
    await storage.createBlog(blog);
  }
  console.log("Blog posts seeded successfully");
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  await seedBlogs();

  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactSchema.parse(req.body);
      const submission = await storage.createContactSubmission(data);

      try {
        await sendContactEmail(data);
        console.log(`Contact email sent for submission ${submission.id}`);
      } catch (emailError) {
        console.error("Failed to send contact email:", emailError);
      }

      res.json({ success: true, id: submission.id });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ error: "Failed to submit form" });
      }
    }
  });

  app.get("/api/blogs", async (_req, res) => {
    try {
      const blogs = await storage.getAllBlogs();
      res.json(blogs.filter(b => b.published));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  });

  app.get("/api/blogs/:slug", async (req, res) => {
    try {
      const blog = await storage.getBlogBySlug(req.params.slug);
      if (!blog || !blog.published) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(blog);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  app.get("/api/seo/:pageSlug", async (req, res) => {
    try {
      const setting = await storage.getSeoByPageSlug(req.params.pageSlug);
      res.json(setting || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch SEO settings" });
    }
  });

  app.post("/api/admin/login", async (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USERNAME && checkAdminPassword(password)) {
      (req.session as any).adminAuthenticated = true;
      res.json({ success: true });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/admin/me", (req, res) => {
    if ((req.session as any)?.adminAuthenticated) {
      res.json({ authenticated: true, username: ADMIN_USERNAME });
    } else {
      res.status(401).json({ error: "Not authenticated" });
    }
  });

  app.get("/api/admin/contacts", requireAdmin, async (_req, res) => {
    try {
      const contacts = await storage.getContactSubmissions();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  app.get("/api/admin/blogs", requireAdmin, async (_req, res) => {
    try {
      const blogs = await storage.getAllBlogs();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  });

  app.post("/api/admin/blogs", requireAdmin, async (req, res) => {
    try {
      const data = insertBlogSchema.parse(req.body);
      const blog = await storage.createBlog(data);
      res.json(blog);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        console.error("Create blog error:", error);
        res.status(500).json({ error: "Failed to create blog" });
      }
    }
  });

  app.put("/api/admin/blogs/:id", requireAdmin, async (req, res) => {
    try {
      const blog = await storage.updateBlog(req.params.id, req.body);
      res.json(blog);
    } catch (error) {
      console.error("Update blog error:", error);
      res.status(500).json({ error: "Failed to update blog" });
    }
  });

  app.delete("/api/admin/blogs/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteBlog(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete blog" });
    }
  });

  app.get("/api/admin/seo", requireAdmin, async (_req, res) => {
    try {
      const settings = await storage.getAllSeoSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch SEO settings" });
    }
  });

  app.put("/api/admin/seo/:pageSlug", requireAdmin, async (req, res) => {
    try {
      const data = insertSeoSchema.parse({ ...req.body, pageSlug: req.params.pageSlug });
      const setting = await storage.upsertSeoSettings(data);
      res.json(setting);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        console.error("Upsert SEO error:", error);
        res.status(500).json({ error: "Failed to update SEO settings" });
      }
    }
  });

  return httpServer;
}
