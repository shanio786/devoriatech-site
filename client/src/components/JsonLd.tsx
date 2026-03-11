import { useEffect } from "react";
import { useLocation } from "wouter";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Devoria Tech",
  "url": "https://devoriatech.com",
  "logo": "https://devoriatech.com/favicon.png",
  "description": "Devoria Tech is a digital agency that helps businesses grow online with web development, mobile apps, digital marketing, and creative design services.",
  "foundingDate": "2020",
  "founder": {
    "@type": "Person",
    "name": "Zeeshan Ahmad",
    "jobTitle": "CEO & Founder"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+923117597815",
    "contactType": "customer service",
    "email": "info@devoriatech.com",
    "availableLanguage": ["English"]
  },
  "sameAs": [
    "https://www.facebook.com/devoriatech/",
    "https://www.instagram.com/devoriatech/",
    "https://www.linkedin.com/company/devoria-tech",
    "https://youtube.com/@devoriatech"
  ],
  "areaServed": ["US", "GB", "CA", "AE", "SA", "AU"],
  "knowsAbout": [
    "Web Development", "Mobile App Development", "Digital Marketing",
    "Search Engine Optimization", "Social Media Management",
    "Graphic Design", "Video Editing", "Business Software",
    "AI Services", "E-Commerce Development"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Devoria Tech",
  "url": "https://devoriatech.com",
  "description": "Digital agency offering web development, app development, SEO, and creative design services.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://devoriatech.com/services?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Devoria Tech",
  "image": "https://devoriatech.com/favicon.png",
  "url": "https://devoriatech.com",
  "telephone": "+923117597815",
  "email": "info@devoriatech.com",
  "priceRange": "$$",
  "openingHours": "Mo-Fr 09:00-18:00",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127",
    "bestRating": "5"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "James Carter" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Devoria Tech transformed our online presence completely. Our traffic increased by 300% within 3 months."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Sarah Mitchell" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "The e-commerce platform they built for us is absolutely stunning. Our sales have skyrocketed since launch."
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Digital Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Development", "description": "Professional websites built with WordPress, Shopify, React, and Next.js" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile App Development", "description": "Native and cross-platform apps for Android and iOS" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO & Digital Marketing", "description": "Search engine optimization, Google Ads, and social media marketing" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Social Media Management", "description": "Content creation, community engagement, and platform management" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Graphic Design & Video", "description": "Logo design, branding, motion graphics, and video editing" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Software", "description": "Custom desktop apps, SaaS platforms, and enterprise solutions" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Services", "description": "AI chatbots, AI content creation, AI influencers, and business automation" } }
    ]
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does it take to build a website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A standard website typically takes 2-4 weeks, while complex web applications can take 6-12 weeks. We provide a detailed timeline based on your specific requirements."
      }
    },
    {
      "@type": "Question",
      "name": "What technologies do you use for web development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We work with React, Next.js, Node.js, TypeScript, WordPress, and Shopify. Our tech stack is chosen based on what best fits your project."
      }
    },
    {
      "@type": "Question",
      "name": "Do you develop mobile apps for both iOS and Android?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we develop native apps for both platforms as well as cross-platform solutions using React Native and Flutter."
      }
    },
    {
      "@type": "Question",
      "name": "How much does a typical project cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A basic website starts from $1,000, while custom web apps range from $5,000-$50,000+. We provide detailed quotes after understanding your requirements."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer ongoing maintenance and support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we offer comprehensive maintenance packages including security updates, performance monitoring, bug fixes, and content updates."
      }
    }
  ]
};

const breadcrumbRoutes: Record<string, { name: string; parent?: string }> = {
  "/": { name: "Home" },
  "/services": { name: "Services", parent: "/" },
  "/services/digital-marketing": { name: "Digital Marketing", parent: "/services" },
  "/services/digital-marketing/seo": { name: "SEO Services", parent: "/services/digital-marketing" },
  "/services/digital-marketing/paid-advertising": { name: "Paid Advertising", parent: "/services/digital-marketing" },
  "/services/digital-marketing/content-strategy": { name: "Content Strategy", parent: "/services/digital-marketing" },
  "/services/web-development": { name: "Web Development", parent: "/services" },
  "/services/web-development/wordpress-shopify": { name: "WordPress & Shopify", parent: "/services/web-development" },
  "/services/web-development/custom-apps": { name: "Custom Web Apps", parent: "/services/web-development" },
  "/services/web-development/ecommerce-solutions": { name: "E-Commerce Solutions", parent: "/services/web-development" },
  "/services/app-development": { name: "App Development", parent: "/services" },
  "/services/app-development/android-ios": { name: "Android & iOS", parent: "/services/app-development" },
  "/services/app-development/hybrid-apps": { name: "Hybrid Apps", parent: "/services/app-development" },
  "/services/social-media": { name: "Social Media", parent: "/services" },
  "/services/social-media/platform-management": { name: "Platform Management", parent: "/services/social-media" },
  "/services/social-media/content-creation": { name: "Content Creation", parent: "/services/social-media" },
  "/services/social-media/community-engagement": { name: "Community Engagement", parent: "/services/social-media" },
  "/services/design-video": { name: "Design & Video", parent: "/services" },
  "/services/design-video/logo-branding": { name: "Logo & Branding", parent: "/services/design-video" },
  "/services/design-video/motion-graphics": { name: "Motion Graphics", parent: "/services/design-video" },
  "/services/design-video/video-editing": { name: "Video Editing", parent: "/services/design-video" },
  "/services/business-software": { name: "Business Software", parent: "/services" },
  "/services/business-software/desktop-software": { name: "Desktop Software", parent: "/services/business-software" },
  "/services/business-software/saas-application": { name: "SaaS Application", parent: "/services/business-software" },
  "/services/business-software/custom-business-software": { name: "Custom Software", parent: "/services/business-software" },
  "/services/ai-services": { name: "AI Services", parent: "/services" },
  "/services/ai-services/ai-influencer": { name: "AI Influencer", parent: "/services/ai-services" },
  "/services/ai-services/ai-model-photoshoot": { name: "AI Model Photoshoot", parent: "/services/ai-services" },
  "/services/ai-services/ai-chatbot": { name: "AI Chatbot", parent: "/services/ai-services" },
  "/services/ai-services/ai-content-creation": { name: "AI Content Creation", parent: "/services/ai-services" },
  "/services/ai-services/ai-automation": { name: "AI Automation", parent: "/services/ai-services" },
  "/portfolio": { name: "Portfolio", parent: "/" },
  "/about": { name: "About", parent: "/" },
  "/blog": { name: "Blog", parent: "/" },
  "/contact": { name: "Contact", parent: "/" },
};

function buildBreadcrumb(path: string) {
  const route = breadcrumbRoutes[path];
  if (!route) return null;

  const items: { name: string; url: string }[] = [];
  let current: string | undefined = path;
  while (current && breadcrumbRoutes[current]) {
    items.unshift({ name: breadcrumbRoutes[current].name, url: `https://devoriatech.com${current === "/" ? "" : current}` });
    current = breadcrumbRoutes[current].parent;
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

export default function JsonLd() {
  const [location] = useLocation();

  useEffect(() => {
    const schemas: object[] = [organizationSchema, websiteSchema, professionalServiceSchema];

    if (location === "/" || location === "/services") {
      schemas.push(faqSchema);
    }

    const breadcrumb = buildBreadcrumb(location);
    if (breadcrumb) {
      schemas.push(breadcrumb);
    }

    const scripts: HTMLScriptElement[] = [];
    schemas.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
      scripts.push(script);
    });

    return () => {
      scripts.forEach((script) => {
        if (script.parentNode) script.parentNode.removeChild(script);
      });
    };
  }, [location]);

  return null;
}
