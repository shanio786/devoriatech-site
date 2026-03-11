import { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSEO } from "@/hooks/use-seo";
import SplitText from "@/components/SplitText";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import {
  ArrowRight, ChevronDown, CheckCircle,
  Globe, Smartphone, TrendingUp, Share2, Palette,
  Search, BarChart3, Video, Code2, ShoppingCart,
  Megaphone, MessageCircle, PenTool, Layers, Monitor,
  Bot, Brain, Workflow, Zap, Shield, Users,
  Settings, Target, Rocket, LayoutDashboard, FileText,
  Heart, Eye, Award,
} from "lucide-react";

import servicesHeroImg from "@assets/services-hero.webp";
import dmImg from "@assets/services-digital-marketing.webp";
import smImg from "@assets/services-social-media.webp";
import wdImg from "@assets/services-web-dev.webp";
import adImg from "@assets/services-app-dev.webp";
import bsImg from "@assets/services-business-software.webp";
import aiImg from "@assets/services-ai.webp";
import dvHeroImg from "@assets/design-video-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "500+", label: "Projects Delivered", icon: Award },
  { value: "200+", label: "Happy Clients", icon: Heart },
  { value: "7+", label: "Service Categories", icon: Layers },
  { value: "98%", label: "Client Satisfaction", icon: Shield },
];

const serviceCategories = [
  {
    num: "01",
    title: "Digital Marketing",
    slug: "digital-marketing",
    href: "/services/digital-marketing",
    icon: TrendingUp,
    gradient: "from-blue-500 to-indigo-600",
    glowColor: "rgba(59,130,246,0.3)",
    image: dmImg,
    desc: "Data-driven digital marketing strategies designed to maximize your online presence, increase website traffic, and deliver measurable return on investment for businesses of all sizes.",
    longDesc: "Digital marketing plays a critical role in helping businesses reach their target audience and achieve their marketing goals. Devoria Tech provides complete digital marketing services including search engine optimization, paid advertising campaigns, and content marketing strategies that drive real business results.",
    subPages: [
      { label: "SEO Services (On-Page, Off-Page, Technical)", href: "/services/digital-marketing/seo", icon: Search },
      { label: "Paid Advertising (Meta, Google, YouTube Ads)", href: "/services/digital-marketing/paid-advertising", icon: Megaphone },
      { label: "Content Strategy & Analytics", href: "/services/digital-marketing/content-strategy", icon: BarChart3 },
    ],
    highlights: ["Keyword research and SEO optimization", "Google Ads and Meta Ads management", "Performance tracking and analytics", "Conversion rate optimization"],
  },
  {
    num: "02",
    title: "Social Media Management",
    slug: "social-media",
    href: "/services/social-media",
    icon: Share2,
    gradient: "from-orange-500 to-amber-500",
    glowColor: "rgba(249,115,22,0.3)",
    image: smImg,
    desc: "Professional social media management services that help businesses grow their brand presence, build strong relationships with customers, and create engaging content across all major platforms.",
    longDesc: "Social media has become one of the most powerful platforms for businesses to connect with customers and drive sales. Devoria Tech provides professional social media management that includes platform management, content creation, community engagement, and growth strategies tailored to your business goals.",
    subPages: [
      { label: "Platform Management & Growth", href: "/services/social-media/platform-management", icon: Globe },
      { label: "Content Creation & Scheduling", href: "/services/social-media/content-creation", icon: PenTool },
      { label: "Community Engagement", href: "/services/social-media/community-engagement", icon: MessageCircle },
    ],
    highlights: ["Facebook, Instagram, LinkedIn, TikTok management", "Content creation and scheduling", "Community engagement and growth", "Social media analytics and reporting"],
  },
  {
    num: "03",
    title: "Web Development",
    slug: "web-development",
    href: "/services/web-development",
    icon: Globe,
    gradient: "from-cyan-500 to-blue-500",
    glowColor: "rgba(6,182,212,0.3)",
    image: wdImg,
    desc: "Modern, fast, and SEO-friendly websites designed to deliver excellent user experiences, support business growth, and provide powerful functionality using the latest web technologies.",
    longDesc: "A professional website is the foundation of any successful digital presence. Devoria Tech builds modern websites using technologies like WordPress, Shopify, React, and Next.js. Our web development services focus on performance, responsive design, and scalability to ensure your website supports long-term business growth.",
    subPages: [
      { label: "WordPress & Shopify Development", href: "/services/web-development/wordpress-shopify", icon: Monitor },
      { label: "Custom Web Apps (React, Next.js)", href: "/services/web-development/custom-apps", icon: Code2 },
      { label: "E-Commerce Solutions", href: "/services/web-development/ecommerce-solutions", icon: ShoppingCart },
    ],
    highlights: ["Responsive and mobile-friendly design", "SEO-optimized website structure", "E-commerce platform development", "Custom web application development"],
  },
  {
    num: "04",
    title: "App Development",
    slug: "app-development",
    href: "/services/app-development",
    icon: Smartphone,
    gradient: "from-teal-500 to-emerald-500",
    glowColor: "rgba(20,184,166,0.3)",
    image: adImg,
    desc: "High-performance mobile applications for Android, iOS, and cross-platform development using modern frameworks like React Native and Flutter for smooth user experiences.",
    longDesc: "Mobile applications allow businesses to connect with customers directly through smartphones. Devoria Tech develops native and hybrid mobile apps that deliver high performance, reliability, and seamless user experiences across all major platforms.",
    subPages: [
      { label: "Android & iOS Native Apps", href: "/services/app-development/android-ios", icon: Smartphone },
      { label: "Hybrid Apps (React Native & Flutter)", href: "/services/app-development/hybrid-apps", icon: Layers },
    ],
    highlights: ["Native Android and iOS development", "Cross-platform with React Native and Flutter", "App Store and Play Store deployment", "Push notifications and analytics"],
  },
  {
    num: "05",
    title: "Design & Video",
    slug: "design-video",
    href: "/services/design-video",
    icon: Palette,
    gradient: "from-violet-500 to-purple-500",
    glowColor: "rgba(139,92,246,0.3)",
    image: dvHeroImg,
    desc: "Creative graphic design, professional logo and branding, motion graphics, and video editing services that help businesses build strong visual identities and engaging multimedia content.",
    longDesc: "Visual content plays a critical role in building strong brands and engaging audiences. Devoria Tech provides professional design and video services including logo design, brand identity systems, motion graphics, and professional video editing that help businesses stand out in competitive markets.",
    subPages: [
      { label: "Logo & Branding Design", href: "/services/design-video/logo-branding", icon: PenTool },
      { label: "Motion Graphics & Animation", href: "/services/design-video/motion-graphics", icon: Video },
      { label: "Video Editing Services", href: "/services/design-video/video-editing", icon: Palette },
    ],
    highlights: ["Custom logo and brand identity design", "Motion graphics and animations", "Social media and YouTube video editing", "Brand guidelines and visual assets"],
  },
  {
    num: "06",
    title: "Business Software Solutions",
    slug: "business-software",
    href: "/services/business-software",
    icon: LayoutDashboard,
    gradient: "from-emerald-500 to-green-600",
    glowColor: "rgba(16,185,129,0.3)",
    image: bsImg,
    desc: "Custom business software development including desktop applications, SaaS platforms, and enterprise solutions designed to streamline operations and improve business efficiency.",
    longDesc: "Businesses often need specialized software solutions that off-the-shelf products cannot provide. Devoria Tech develops custom business software including desktop applications, cloud-based SaaS platforms, CRM systems, and enterprise workflow automation tools that help organizations operate more efficiently and scale their operations.",
    subPages: [
      { label: "Desktop Software Development", href: "/services/business-software/desktop-software", icon: Monitor },
      { label: "SaaS Application Development", href: "/services/business-software/saas-application", icon: LayoutDashboard },
      { label: "Custom Business Software", href: "/services/business-software/custom-business-software", icon: Settings },
    ],
    highlights: ["Desktop application development", "Cloud SaaS platform development", "CRM and ERP solutions", "Workflow automation systems"],
  },
  {
    num: "07",
    title: "AI Services & Solutions",
    slug: "ai-services",
    href: "/services/ai-services",
    icon: Bot,
    gradient: "from-fuchsia-500 to-pink-500",
    glowColor: "rgba(192,38,211,0.3)",
    image: aiImg,
    desc: "Advanced artificial intelligence services including AI influencer creation, AI model photoshoots, intelligent chatbot development, AI content creation, and business automation solutions.",
    longDesc: "Artificial intelligence is transforming the way businesses operate, market products, and interact with customers. Devoria Tech provides advanced AI services that help businesses leverage intelligent automation, AI-generated content, virtual influencers, and smart chatbot systems to improve productivity and create innovative marketing campaigns.",
    subPages: [
      { label: "AI Influencer Creation", href: "/services/ai-services/ai-influencer", icon: Users },
      { label: "AI Model Photoshoot", href: "/services/ai-services/ai-model-photoshoot", icon: Eye },
      { label: "AI Chatbot Development", href: "/services/ai-services/ai-chatbot", icon: MessageCircle },
      { label: "AI Content Creation", href: "/services/ai-services/ai-content-creation", icon: FileText },
      { label: "AI Automation Solutions", href: "/services/ai-services/ai-automation", icon: Workflow },
    ],
    highlights: ["AI influencer and virtual model creation", "Intelligent chatbot development", "AI-powered content generation", "Business process automation"],
  },
];

const whyChooseItems = [
  { icon: Code2, title: "Expert Development Team", desc: "Our team includes experienced developers, designers, and marketing professionals who deliver high-quality digital solutions." },
  { icon: Target, title: "Results-Driven Approach", desc: "Every project is designed to deliver measurable results that support business growth and marketing success." },
  { icon: Settings, title: "Custom Solutions", desc: "We develop tailored solutions that match your specific business needs rather than offering one-size-fits-all products." },
  { icon: Zap, title: "Modern Technologies", desc: "We use the latest technologies and industry best practices to build fast, secure, and scalable digital products." },
  { icon: Shield, title: "Reliable Support", desc: "Our team provides ongoing support and maintenance to ensure your digital products perform optimally." },
  { icon: Rocket, title: "SEO-Focused Development", desc: "All our websites and applications are built with SEO best practices to improve search engine visibility and organic traffic." },
];

const processSteps = [
  { num: "01", title: "Discovery & Analysis", desc: "We analyze your business goals, target audience, and market position to develop the right strategy." },
  { num: "02", title: "Strategy & Planning", desc: "Our team creates a detailed project plan with clear milestones, timelines, and deliverables." },
  { num: "03", title: "Design & Development", desc: "We design and build your solution using modern tools, creative design, and clean code." },
  { num: "04", title: "Testing & Optimization", desc: "Every project is thoroughly tested for performance, security, and user experience before launch." },
  { num: "05", title: "Launch & Support", desc: "We deploy your project and provide ongoing support to ensure long-term success." },
];

const faqs = [
  { q: "How long does it take to build a website?", a: "A standard website typically takes 2-4 weeks, while complex web applications can take 6-12 weeks. During our discovery phase, we provide a detailed timeline based on your specific requirements, features, and complexity." },
  { q: "What technologies do you use for web development?", a: "We work with modern technologies including React, Next.js, Node.js, and TypeScript for custom applications. For CMS-based sites, we use WordPress and Shopify. Our tech stack is always chosen based on what best fits your project needs." },
  { q: "Do you offer ongoing maintenance and support?", a: "Yes, we offer comprehensive maintenance packages that include security updates, performance monitoring, bug fixes, content updates, and strategic improvements. Our support team is available to ensure your digital products run smoothly." },
  { q: "How much does a typical project cost?", a: "Project costs vary based on scope and complexity. A basic website starts from $1,000, while custom web apps range from $5,000-$50,000+. We provide detailed quotes after understanding your requirements during our free consultation." },
  { q: "Can you help with SEO and digital marketing?", a: "Absolutely. We offer comprehensive SEO services including on-page optimization, technical SEO, content strategy, link building, and paid advertising campaigns across Google, Meta, YouTube, and TikTok. Our data-driven approach ensures measurable results." },
  { q: "Do you develop mobile apps for both iOS and Android?", a: "Yes, we develop native apps for both platforms as well as cross-platform solutions using React Native and Flutter. Cross-platform development allows us to build for both iOS and Android simultaneously, reducing time and cost." },
];

function ServiceCard({ cat, index }: { cat: typeof serviceCategories[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <div className="svc-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`card-service-${index}`}>
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${!isEven ? "lg:grid-flow-dense" : ""}`}>
        <div className={`relative overflow-hidden ${!isEven ? "lg:col-start-2" : ""}`}>
          <Link href={cat.href}>
            <div className="relative aspect-video lg:aspect-auto lg:h-full cursor-pointer group" data-testid={`link-service-img-${cat.slug}`}>
              <img src={cat.image} alt={`${cat.title} services by Devoria Tech`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className={`absolute inset-0 bg-gradient-to-${isEven ? "r" : "l"} from-background/60 to-transparent hidden lg:block`} />
              <div className={`absolute bottom-4 ${isEven ? "left-4" : "right-4"} flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] backdrop-blur-sm`}>
                <span className="text-[10px] text-white/50 font-medium tracking-wider uppercase">{cat.num}</span>
              </div>
            </div>
          </Link>
        </div>

        <div className={`p-6 sm:p-8 lg:p-10 flex flex-col justify-center ${!isEven ? "lg:col-start-1 lg:row-start-1" : ""}`}>
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-4 shadow-lg`}>
            <cat.icon className="w-6 h-6 text-white" />
          </div>

          <Link href={cat.href}>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight hover:text-cyan-300 transition-colors duration-300 cursor-pointer" data-testid={`link-service-title-${cat.slug}`}>
              {cat.title}
            </h2>
          </Link>

          <p className="text-[13px] text-white/35 leading-relaxed font-light mt-3">{cat.desc}</p>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            className="flex items-center gap-2 mt-4 text-[12px] text-cyan-400/60 hover:text-cyan-400 font-medium tracking-wider uppercase transition-colors duration-300"
            data-testid={`button-service-expand-${index}`}
          >
            {isOpen ? "Show Less" : "Learn More"}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
          </button>

          <div className="overflow-hidden transition-all duration-500 ease-out" style={{ maxHeight: isOpen ? "5000px" : "0px", opacity: isOpen ? 1 : 0 }}>
            <div className="pt-4 space-y-4">
              <p className="text-[12px] text-white/25 leading-[1.8] font-light">{cat.longDesc}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {cat.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                    <CheckCircle className="w-3 h-3 text-cyan-400/40 mt-0.5 shrink-0" />
                    <span className="text-[11px] text-white/25 font-light">{h}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] text-white/20 font-semibold tracking-[0.2em] uppercase">Explore Services</span>
                {cat.subPages.map((sub, si) => (
                  <Link key={si} href={sub.href}>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-cyan-400/20 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer group" data-testid={`link-service-sub-${cat.slug}-${si}`}>
                      <sub.icon className="w-4 h-4 text-cyan-400/50 shrink-0 group-hover:text-cyan-400 transition-colors" />
                      <span className="text-[12px] text-white/35 font-medium group-hover:text-cyan-300 transition-colors flex-1">{sub.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white/15 group-hover:text-cyan-400/60 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>

              <Link href={cat.href}>
                <span className="inline-flex items-center gap-2 mt-2 text-[12px] text-cyan-400/70 hover:text-cyan-300 font-medium transition-colors cursor-pointer" data-testid={`link-service-view-${cat.slug}`}>
                  View All {cat.title} Services <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 relative" data-testid="section-faq">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="svc-fade text-center mb-14">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">FAQ</span>
          <SplitText text="Frequently Asked Questions" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          <p className="mt-5 text-sm text-white/30 max-w-md mx-auto leading-relaxed font-light">
            Common questions about our services, process, and pricing.
          </p>
        </div>
        <div className="svc-fade max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl neon-border overflow-hidden bg-white/[0.01] transition-all duration-500" data-testid={`faq-item-${i}`}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
                data-testid={`button-faq-${i}`}
              >
                <span className="text-[14px] text-white/70 font-medium pr-4">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-cyan-400/50 shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-[13px] text-white/30 leading-[1.8] font-light">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  useSEO({
    title: "Our Services – Everything We Can Do for Your Business | Devoria Tech",
    description: "From websites and mobile apps to SEO, social media, and AI-powered solutions — we offer everything your business needs to grow online. See how we can help.",
    keywords: "digital marketing services, SEO services, social media management, web development, WordPress, Shopify, custom web apps, React, Next.js, mobile app development, Android, iOS, React Native, Flutter, graphic design, logo design, video editing, motion graphics, business software, SaaS development, AI services, AI chatbot, AI automation, branding",
    canonical: "https://devoriatech.com/services",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".svc-fade").forEach((el) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="noise-bg">
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-services-hero">
        <div className="absolute inset-0 hero-gradient-bg" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-violet-500/3 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03]">
          <div className="absolute inset-0 rounded-full border border-white/10 animate-orbit" style={{ animationDuration: "25s" }}>
            <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-blue-500/40 blur-sm" />
          </div>
          <div className="absolute inset-8 rounded-full border border-white/5 animate-orbit" style={{ animationDuration: "35s", animationDirection: "reverse" }}>
            <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-cyan-400/40 blur-sm" />
          </div>
          <div className="absolute inset-16 rounded-full border border-white/5 animate-orbit" style={{ animationDuration: "45s" }}>
            <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-violet-400/30 blur-sm" />
          </div>
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] text-cyan-400 mb-6 tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Our Services
                </span>
              </motion.div>

              <SplitText
                text="Professional Digital Services for Business Growth"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-services-title"
              />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light">
                Devoria Tech delivers complete digital solutions for businesses worldwide. From digital marketing and web development to AI-powered automation and creative design, we help brands grow their online presence and achieve measurable business results.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-services-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Get Free Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </span>
                  </MagneticButton>
                </Link>
                <Link href="/portfolio">
                  <span className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-white/50 border border-white/[0.08] hover:border-white/[0.15] hover:text-white/70 transition-all cursor-pointer" data-testid="link-services-portfolio">
                    View Our Work <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }} className="mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden neon-border">
                <img loading="lazy" src={servicesHeroImg} alt="Devoria Tech professional digital services" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="svc-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-svc-${i}`}>
                <div className="p-6">
                  <stat.icon className="w-5 h-5 text-cyan-400/50 mx-auto mb-3" />
                  <div className="text-2xl sm:text-3xl font-bold gradient-text-static">{stat.value}</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="svc-fade text-center mb-6">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">What We Do</span>
            <SplitText text="Complete Digital Solutions Under One Roof" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
            <p className="mt-5 text-[13px] text-white/30 max-w-2xl mx-auto leading-relaxed font-light">
              Devoria Tech offers a complete range of digital services designed to help businesses grow their online presence, improve customer engagement, and achieve their marketing and technology goals. Our team combines creative design, modern development, and strategic marketing to deliver powerful digital experiences.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {serviceCategories.map((cat, i) => (
              <ServiceCard key={cat.slug} cat={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="svc-fade text-center mb-14">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Our Process</span>
            <SplitText text="How We Work With Clients" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
            <p className="mt-5 text-[13px] text-white/30 max-w-xl mx-auto leading-relaxed font-light">
              Devoria Tech follows a structured process to ensure every project is delivered on time and meets the highest quality standards.
            </p>
          </div>
          <div className="svc-fade space-y-4 max-w-3xl mx-auto">
            {processSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-5 p-5 rounded-2xl neon-border bg-white/[0.01]" data-testid={`process-svc-${i}`}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-500/15 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold gradient-text-static">{step.num}</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{step.title}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed font-light">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="svc-fade text-center mb-14">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Why Choose Us</span>
            <SplitText text="Why Businesses Choose Devoria Tech" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
            <p className="mt-5 text-[13px] text-white/30 max-w-xl mx-auto leading-relaxed font-light">
              Choosing the right digital agency is important for business success. Devoria Tech focuses on delivering high-quality digital solutions that help businesses grow and achieve their goals.
            </p>
          </div>
          <div className="svc-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyChooseItems.map((item, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`why-choose-${i}`}>
                <item.icon className="w-5 h-5 text-cyan-400/50 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-[11px] text-white/25 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="svc-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Industries We Serve</span>
            <SplitText text="Digital Solutions Across Industries" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="svc-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: ShoppingCart, title: "E-Commerce & Retail", desc: "Online stores, product marketing, and e-commerce solutions that drive sales and customer engagement." },
              { icon: Rocket, title: "Startups & Tech Companies", desc: "Digital products, SaaS platforms, and marketing strategies that help startups grow and scale." },
              { icon: LayoutDashboard, title: "Corporate & Enterprise", desc: "Enterprise software, business automation, and corporate branding solutions for large organizations." },
              { icon: Heart, title: "Healthcare & Wellness", desc: "Healthcare websites, patient management systems, and digital marketing for medical practices." },
              { icon: Brain, title: "Education & E-Learning", desc: "Educational platforms, online courses, and learning management systems for modern education." },
              { icon: Users, title: "Service-Based Businesses", desc: "Professional websites, lead generation, and digital marketing for service providers." },
            ].map((ind, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border" data-testid={`industry-svc-${i}`}>
                <div className="p-5">
                  <ind.icon className="w-5 h-5 text-cyan-400/50 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-1">{ind.title}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed font-light">{ind.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />

      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative p-14 sm:p-20 rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-500/10" />
            <div className="absolute inset-0 border border-white/[0.06] rounded-[2rem]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
            <div className="relative z-10">
              <SplitText text="Start Your Digital Transformation" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>Whether you need a professional website, a mobile application, a complete digital marketing strategy, or AI-powered business solutions, Devoria Tech is ready to help you succeed.</p>
                <p>Our team of developers, designers, and marketing experts work together to deliver customized digital solutions that create real business value and support long-term growth.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-services-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Get Free Consultation <ArrowRight className="w-4 h-4" />
                    </span>
                  </span>
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
