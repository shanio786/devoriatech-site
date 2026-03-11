# Devoria Tech - Agency Website

## Overview
Premium digital agency website for Devoria Tech with award-winning level dark theme design, GSAP animations, Lenis smooth scroll, custom cursor, 3D tilt cards, magnetic buttons, horizontal scrolling sections, interactive particle field, parallax effects, marquee ticker, and glassmorphism UI.

## Brand Colors
- Primary: #2563EB (Blue)
- Accent: #06B6D4 (Cyan)
- Dark Background: #0F172A

## Tech Stack
- Frontend: React, Tailwind CSS, Framer Motion, GSAP + ScrollTrigger, Lenis Smooth Scroll
- Backend: Express.js (Node.js)
- Routing: Wouter
- State: TanStack Query
- UI Components: Shadcn/ui
- Fonts: Space Grotesk + Inter

## Project Structure
```
client/src/
  components/
    Navbar.tsx          - Main navigation with mega menu dropdown, animated nav indicator
    Footer.tsx          - Site footer with links, social media, magnetic buttons
    ParticleField.tsx   - Canvas-based interactive particle animation with mouse glow
    CustomCursor.tsx    - Custom cursor with dot + ring, hover state awareness
    SplitText.tsx       - Letter-by-letter GSAP text reveal animation
    MagneticButton.tsx  - GSAP magnetic attraction hover effect
    TiltCard.tsx        - 3D perspective tilt on hover with glare effect
    SmoothScroll.tsx    - Lenis smooth scroll wrapper with ScrollTrigger integration
    Preloader.tsx       - Animated loading screen with progress bar
    JsonLd.tsx          - Structured data (Organization, WebSite, ProfessionalService, FAQ, Breadcrumbs)
    ChatBot.tsx         - Customer support chatbot with knowledge base, quick replies, internal links, floating bottom-right icon
  hooks/
    use-gsap.ts         - GSAP hooks: useTextReveal, useRevealUp, useParallax, useFadeInUp, useScaleIn, useImageReveal, useHorizontalScroll, useLineReveal
    use-seo.ts          - SEO meta tag management (title, description, keywords, canonical, OG)
  pages/
    Home.tsx            - Hero with typing animation, particle background, horizontal scroll portfolio, stats, client logos marquee, 5-step process section, testimonials (3 cards), CTA
    Blog.tsx            - Blog listing with featured card (large) + 3 card grid, each with hero image, linking to individual posts
    BlogPost1.tsx       - "Why Every Business Needs a Professional Website in 2026" (3 images, GSAP bp1-fade)
    BlogPost2.tsx       - "What is Digital Marketing and Why It Is Important" (3 images, GSAP bp2-fade)
    BlogPost3.tsx       - "How AI Is Transforming Modern Businesses" (3 images, GSAP bp3-fade)
    BlogPost4.tsx       - "Top Benefits of Social Media Marketing for Small Businesses" (3 images, GSAP bp4-fade)
    Services.tsx        - Service categories with animated cards, gradient icons, FAQ accordion (6 questions with AnimatePresence), SEO accordion sections
    DigitalMarketing.tsx - Digital Marketing sub-page with hero, stats, service cards, accordion sections (SEO, PPC, Social Media, Content, Email, Data-Driven)
    SEOServices.tsx     - SEO sub-page with hero, stats, "What is SEO" section, 8 accordion sections (Keyword Research, On-Page, Technical, Off-Page, Local, eCommerce, Content, Analytics)
    PaidAdvertising.tsx - Paid Advertising sub-page with hero, stats, "What is PPC" section, 8 accordion sections (Search, Display, Shopping, Facebook, Instagram, YouTube, Targeting, Tracking)
    ContentStrategy.tsx - Content Strategy & Analytics sub-page with hero, stats, "What is Content Strategy" section, 6 accordion sections (Audience Research, SEO Content, Calendar, Distribution, Analytics, Optimization)
    WebDevelopment.tsx  - Web Development page with hero, stats, 7 accordion sections (WordPress, Shopify, Custom Apps, React/Next.js, eCommerce, SEO-friendly, Performance/Security)
    WordPressShopify.tsx - WordPress & Shopify sub-page with hero, stats, WP accordions (Custom, Business, SEO), Shopify accordions (Store, Customization, Performance), WP vs Shopify comparison, eCommerce/Mobile/SEO cards
    CustomApps.tsx      - Custom Web Apps sub-page with hero, stats, React/Next.js sections with sub-sections, Dashboards, SaaS, Portals, Tools, Performance/Security, API Integration, UX Design
    EcommerceSolutions.tsx - E-Commerce Solutions sub-page with hero, stats, overview cards, Shopify/WooCommerce/Custom e-commerce accordions, payment, catalog, mobile, SEO, conversion optimization
    AppDevelopment.tsx  - App Development parent page with hero, stats, overview cards, 8 accordion sections (Android, iOS, Hybrid, React Native, Flutter, UI/UX, Custom Solutions, Maintenance)
    AndroidIos.tsx      - Android & iOS sub-page with hero, stats, overview cards, 4 accordion sections (Android, iOS, UI/UX Design, Testing/QA)
    HybridApps.tsx      - Hybrid Apps sub-page with hero, stats, What is Hybrid, cross-platform benefits, 5 accordion sections (React Native, Flutter, UI/UX, Custom Solutions, Testing)
    Portfolio.tsx       - Filterable project showcase with animated grid, TiltCards
    About.tsx           - Company story, mission/vision, values, team, milestones timeline
    Blog.tsx            - Blog articles with TiltCard grid
    Contact.tsx         - Contact form with service/budget selection, social links
  App.tsx               - Root with SmoothScroll wrapper, CustomCursor, Preloader, JsonLd
server/
  routes.ts             - API endpoints (POST /api/contact)
  storage.ts            - In-memory storage for contact submissions
shared/
  schema.ts             - Data schemas (users, contactSubmissions)
```

## Design System
- Hero images show on all viewports (desktop: side-by-side grid, mobile: stacked below text with mt-8)
- `glass` / `glass-card` - Glassmorphism with backdrop-blur
- `neon-border` - Hover-activated gradient border glow
- `gradient-text` / `gradient-text-static` - Blue-cyan gradient text
- `hero-gradient-bg` - Radial gradient hero background
- `grid-bg` - Subtle grid overlay
- `noise-bg` - Noise texture overlay
- `animate-marquee` - Continuous marquee scrolling
- `animate-orbit` - Orbital ring animation
- `animate-pulse-glow` - Pulsing glow effect
- `cursor: none` on desktop (custom cursor handles display)

## Pages
- **Home** (/) - Full hero with typing animation, particle background, services grid, horizontal scroll portfolio, stats, client logos marquee, 5-step process, testimonials, CTA
- **Services** (/services) - Premium redesigned page: hero with parallax image, stats section, 7 service category cards with images (alternating layout), expandable details with internal linking to all sub-pages, process steps, why choose section, industries served, FAQ accordion, CTA
  - **Digital Marketing** (/services/digital-marketing) - Premium hero, stats, service cards, SEO/PPC/Social/Content/Email marketing
    - **SEO Services** (/services/seo) - Professional SEO page with hero, stats, keyword research, on-page, technical, off-page, local, eCommerce SEO
    - **Paid Advertising** (/services/paid-advertising) - Google Ads, Meta Ads, YouTube Ads with hero, stats, 8 accordion sections, benefits, why choose
    - **Content Strategy** (/services/content-strategy) - Data-driven content marketing with hero, stats, 6 accordion sections, benefits, why choose
  - **Web Development** (/services/web-development) - WordPress, Shopify, React, Next.js, eCommerce, 7 accordion sections with nested sub-sections
    - **WordPress & Shopify** (/services/web-development/wordpress-shopify) - WordPress dev, Shopify dev, WP vs Shopify comparison, eCommerce, mobile, SEO
    - **Custom Apps** (/services/web-development/custom-apps) - React & Next.js development, SaaS, dashboards, portals, API integration, UX design
    - **E-Commerce Solutions** (/services/web-development/ecommerce-solutions) - Shopify, WooCommerce, custom e-commerce, payments, catalog, mobile, SEO, conversion
  - **App Development** (/services/app-development) - Android, iOS, Hybrid, React Native, Flutter, UI/UX design, custom solutions, maintenance
    - **Android & iOS** (/services/app-development/android-ios) - Native Android & iOS development, UI/UX design, testing & QA
    - **Hybrid Apps** (/services/app-development/hybrid-apps) - React Native, Flutter, cross-platform, UI/UX, custom solutions, testing
  - **Business Software Solutions** (/services/business-software) - Desktop Software, SaaS Applications, Custom Business Software, benefits, industries, development process
    - **Desktop Software** (/services/business-software/desktop-software) - Desktop apps, C#/.NET, Java, Python, Electron, offline capability, security, industries, features, process
    - **SaaS Application** (/services/business-software/saas-application) - Cloud SaaS platforms, multi-tenant, subscription billing, startups & enterprise, React/Next.js/Node.js, industries, process
    - **Custom Business Software** (/services/business-software/custom-business-software) - Enterprise solutions, business management, workflow automation, CRM, analytics, industries, process
  - **AI Services / AI Solutions** (/services/ai-services) - AI Influencer Creation, AI Model Photoshoot, AI Chatbot Development, AI Content Creation, AI Automation Solutions, benefits, industries, process
    - **AI Influencer Creation** (/services/ai-services/ai-influencer) - Virtual influencer design, branding, content creation, social media strategy, marketing campaigns, industries, benefits, process
    - **AI Model Photoshoot** (/services/ai-services/ai-model-photoshoot) - AI-generated model images, fashion photoshoot, e-commerce product visuals, marketing campaigns, industries, process
    - **AI Chatbot Development** (/services/ai-services/ai-chatbot) - Website/e-commerce/social media/sales chatbots, NLP, multi-platform integration, industries, features, process
    - **AI Content Creation** (/services/ai-services/ai-content-creation) - Blog articles, website copy, product descriptions, social media content, marketing copy, SEO optimization, industries, process
    - **AI Automation Solutions** (/services/ai-services/ai-automation) - Workflow automation, marketing automation, customer service automation, data processing, business process automation, industries, features, process
  - **Social Media** (/services/social-media) - Platform management, content creation, community engagement, benefits, platforms, process
    - **Platform Management & Growth** (/services/social-media/platform-management) - Facebook/Instagram/LinkedIn/TikTok/YouTube management, growth strategy, multi-platform, analytics, industries, process
    - **Content Creation & Scheduling** (/services/social-media/content-creation) - Social media graphics, promotional posts, short videos, content calendars, platform-specific content, industries, process
    - **Community Engagement** (/services/social-media/community-engagement) - Comment management, DM handling, audience interaction, reputation management, customer support, industries, process
  - **Design & Video** (/services/design-video) - Logo/branding, motion graphics, video editing, extra images in accordions and visual breaks, benefits, industries, process
    - **Logo & Branding** (/services/design-video/logo-branding) - Custom/modern/minimalist/icon/typography logos, brand identity, color palette, typography, guidelines, industries, process
    - **Motion Graphics** (/services/design-video/motion-graphics) - Explainer videos, social media animations, promotional videos, animated logos, infographic animations, industries, process
    - **Video Editing** (/services/design-video/video-editing) - Social media/YouTube/promotional/corporate/advertisement video editing, industries, features, process
- **Portfolio** (/portfolio) - Filterable project showcase with AnimatePresence
- **About** (/about) - Company story, mission/vision, values, team, milestones timeline
- **Blog** (/blog) - Article cards with categories and TiltCards
- **Contact** (/contact) - Multi-field contact form with validation

## SEO
- Full meta tags (title, description, keywords, OG, Twitter) per page via useSEO hook
- JSON-LD structured data (Organization, WebSite, LocalBusiness) via JsonLd component
- Canonical URLs set per page
- Semantic HTML structure

## Admin Panel
- URL: `/admin` (login at `/admin/login`)
- Default credentials: username `admin`, password `devoria2026`
- To change password: set `ADMIN_PASSWORD` environment variable
- Features:
  - Dashboard with stats overview
  - Blog post manager (create, edit, delete, publish/draft toggle)
  - SEO settings per page (meta title, description, keywords)
  - Contact submissions viewer

## API Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/blogs` - All published blogs
- `GET /api/blogs/:slug` - Single blog post
- `GET /api/seo/:pageSlug` - SEO settings for a page
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/me` - Check admin auth status
- `GET /api/admin/blogs` - All blogs (admin)
- `POST /api/admin/blogs` - Create blog
- `PUT /api/admin/blogs/:id` - Update blog
- `DELETE /api/admin/blogs/:id` - Delete blog
- `GET /api/admin/seo` - All SEO settings
- `PUT /api/admin/seo/:pageSlug` - Update SEO settings
- `GET /api/admin/contacts` - All contact submissions

## Key Dependencies
- gsap + ScrollTrigger (scroll animations, horizontal scroll, text reveals)
- @studio-freight/lenis (smooth scroll)
- framer-motion (page transitions, layout animations)
- react-icons (social media icons)
- react-hook-form + zod (form handling)

## Contact Info
- CEO & Founder: Zeeshan Ahmad
- Email: info@devoriatech.com
- WhatsApp / Phone: +92 311 7597815
- Location: Lahore, Pakistan

## Generated Assets
- 10 AI-generated images for hero, portfolio projects, and about page
- Logo at `attached_assets/Devoria_tech_logo_1773132676300.png` (referenced as `@assets/...`)
