import { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSEO } from "@/hooks/use-seo";
import SplitText from "@/components/SplitText";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import {
  ArrowRight, ChevronDown, CheckCircle,
  Globe, Users, Shield, Zap, TrendingUp,
  BarChart3, Layers, Code2, Settings,
  Eye, Target, Calendar, Search,
  ShoppingCart, Briefcase, Cpu, UtensilsCrossed, UserCheck,
} from "lucide-react";
import spmHeroImg from "@assets/social-media-management-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "100+", label: "Platforms Managed", icon: Globe },
  { value: "5M+", label: "Followers Grown", icon: Users },
  { value: "90%", label: "Engagement Rate", icon: TrendingUp },
  { value: "150+", label: "Brands Served", icon: Shield },
];

const platformMgmtItems = [
  "Setting up and optimizing social media profiles",
  "Developing platform-specific growth strategies",
  "Managing content publishing across platforms",
  "Monitoring audience engagement and interactions",
  "Analyzing platform performance and metrics",
];

const importanceCards = [
  { icon: Eye, title: "Increased Brand Visibility", description: "Professional platform management ensures your brand maintains a strong and consistent presence across all social media channels, increasing visibility among target audiences." },
  { icon: Users, title: "Better Customer Relationships", description: "Active platform management allows businesses to build meaningful relationships with customers through regular engagement and responsive communication." },
  { icon: TrendingUp, title: "Increased Website Traffic", description: "Well-managed social media platforms drive consistent traffic to your website, improving lead generation and conversion opportunities." },
  { icon: BarChart3, title: "Improved Marketing Results", description: "Strategic platform management leads to better marketing outcomes by ensuring content reaches the right audience at the right time." },
  { icon: Shield, title: "Competitive Advantage", description: "Businesses with professionally managed social media platforms gain a competitive edge by maintaining an active and engaging online presence." },
];

const platformSections = [
  {
    title: "Facebook Business Management",
    icon: Globe,
    intro: "We manage Facebook business pages to increase brand visibility, grow audience engagement, and drive business results through strategic content and community management.",
    items: ["Business page optimization", "Content strategy and publishing", "Audience growth campaigns", "Facebook Ads integration"],
  },
  {
    title: "Instagram Growth Management",
    icon: Eye,
    intro: "Our Instagram management services focus on growing your follower base, increasing engagement rates, and creating visually compelling content that resonates with your audience.",
    items: ["Profile optimization and branding", "Content creation and scheduling", "Hashtag strategy development", "Stories and Reels management"],
  },
  {
    title: "LinkedIn Business Management",
    icon: Briefcase,
    intro: "We help businesses establish professional authority on LinkedIn through strategic content, networking, and thought leadership campaigns.",
    items: ["Company page optimization", "Professional content creation", "Network growth strategies", "B2B engagement campaigns"],
  },
  {
    title: "TikTok Growth Strategy",
    icon: Zap,
    intro: "Our TikTok management services help brands create trending content, grow their audience, and leverage the platform's algorithm for maximum visibility.",
    items: ["Trending content creation", "Algorithm optimization", "Audience targeting strategies", "Viral content campaigns"],
  },
  {
    title: "YouTube Channel Management",
    icon: Layers,
    intro: "We manage YouTube channels to grow subscribers, increase video views, and build a strong video content strategy that supports your brand goals.",
    items: ["Channel optimization and branding", "Video content strategy", "SEO and discoverability", "Audience engagement management"],
  },
];

const growthStrategyCards = [
  { icon: Search, title: "Profile Optimization", description: "We optimize your social media profiles with professional branding, strategic keywords, and compelling descriptions to attract and retain followers." },
  { icon: Target, title: "Content Strategy Development", description: "Our team develops data-driven content strategies tailored to each platform's audience and algorithm requirements." },
  { icon: Calendar, title: "Consistent Posting Schedule", description: "We maintain a consistent posting schedule to keep your audience engaged and ensure your brand stays visible in social media feeds." },
  { icon: Users, title: "Audience Targeting", description: "We identify and target your ideal audience segments to maximize engagement and grow your follower base with quality connections." },
  { icon: BarChart3, title: "Performance Monitoring", description: "Our team continuously monitors platform performance metrics to identify opportunities and optimize strategies for better results." },
];

const featureCards = [
  { icon: Globe, title: "Multi-Platform Management", description: "We manage your brand presence across all major social media platforms from a single strategic approach." },
  { icon: TrendingUp, title: "Data-Driven Growth Strategies", description: "Our growth strategies are backed by data analysis and performance insights to ensure measurable results." },
  { icon: Shield, title: "Brand Consistency", description: "We maintain consistent brand messaging, visual identity, and communication tone across all platforms." },
  { icon: Eye, title: "Audience Engagement Monitoring", description: "We actively monitor audience interactions and engagement patterns to optimize content and response strategies." },
  { icon: BarChart3, title: "Growth Tracking and Reporting", description: "Regular reports provide detailed insights into follower growth, engagement rates, and overall platform performance." },
];

const industrySections = [
  { icon: ShoppingCart, title: "E-Commerce Businesses", description: "Online stores use platform management to showcase products, engage customers, and drive sales through social media channels." },
  { icon: Briefcase, title: "Service-Based Businesses", description: "Service providers leverage social media management to build trust, generate leads, and maintain customer relationships." },
  { icon: Cpu, title: "Technology Companies", description: "Tech companies use platform management to establish thought leadership, share innovations, and connect with their target audience." },
  { icon: UtensilsCrossed, title: "Restaurants and Hospitality", description: "Food and hospitality businesses use social media to showcase experiences, promote offers, and engage with local communities." },
  { icon: UserCheck, title: "Personal Brands and Influencers", description: "Personal brands and influencers use professional management to grow their audience, increase engagement, and monetize their presence." },
];

const processSections = [
  { num: "01", title: "Business Analysis", description: "We begin by analyzing your business goals, target audience, and current social media presence to develop a strategic foundation." },
  { num: "02", title: "Platform Strategy Development", description: "Our team creates a comprehensive platform strategy that aligns with your business objectives and audience preferences." },
  { num: "03", title: "Content Planning and Scheduling", description: "We develop a content calendar and schedule posts strategically to maximize reach and engagement across platforms." },
  { num: "04", title: "Engagement Monitoring", description: "Our team actively monitors audience interactions, responds to comments, and manages community engagement." },
  { num: "05", title: "Performance Optimization", description: "We continuously analyze performance data and optimize strategies to improve growth and engagement results." },
];

const whyChooseItems = [
  { icon: Globe, label: "Multi-platform management expertise" },
  { icon: Code2, label: "Data-driven growth strategies" },
  { icon: Target, label: "Targeted audience development" },
  { icon: Settings, label: "Customized platform strategies" },
  { icon: Layers, label: "Ongoing performance optimization" },
];

function PlatformAccordion({ section, index }: { section: typeof platformSections[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="spm-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`spm-platform-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`spm-platform-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-spm-platform-${index}`}
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/15 to-teal-500/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-5 h-5 text-orange-400/70" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-orange-300 transition-colors duration-500">
            {section.title}
          </h3>
          <p className="text-[12px] text-white/25 mt-1 font-light line-clamp-1">{section.intro}</p>
        </div>
        <ChevronDown className={`w-5 h-5 text-orange-400/40 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div
        id={`spm-platform-content-${index}`}
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ maxHeight: isOpen ? "5000px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-4">
          <p className="text-[13px] text-white/30 leading-[1.8] font-light">{section.intro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {section.items.map((item, ii) => (
              <div key={ii} className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                <CheckCircle className="w-3.5 h-3.5 text-orange-400/40 mt-0.5 shrink-0" />
                <span className="text-[12px] text-white/25 font-light">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SocialMediaPlatformManagement() {
  useSEO({
    title: "We Manage Your Social Media So You Can Focus on Business | Devoria Tech",
    description: "Professional social media platform management and growth services by Devoria Tech. We manage Facebook, Instagram, LinkedIn, TikTok, and YouTube to grow your brand presence, increase engagement, and drive business results.",
    keywords: "social media management, platform management, social media growth, Facebook management, Instagram growth, LinkedIn management, TikTok strategy, YouTube management, social media marketing, brand growth",
    canonical: "https://devoriatech.com/services/social-media/platform-management",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".spm-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-spm-hero">
        <div className="absolute inset-0 hero-gradient-bg" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-orange-600/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-teal-500/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03]">
          <div className="absolute inset-0 rounded-full border border-white/10 animate-orbit" style={{ animationDuration: "25s" }}>
            <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-orange-500/40 blur-sm" />
          </div>
          <div className="absolute inset-8 rounded-full border border-white/5 animate-orbit" style={{ animationDuration: "35s", animationDirection: "reverse" }}>
            <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-teal-400/40 blur-sm" />
          </div>
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
          <Link href="/services/social-media">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-cyan-400/60 hover:text-cyan-400 font-medium tracking-wider uppercase transition-colors duration-300 mb-8 cursor-pointer" data-testid="link-back-sm">
              <ArrowRight className="w-3 h-3 rotate-180" /> Back to Social Media
            </span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] text-orange-400 mb-6 tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                  Platform Management
                </span>
              </motion.div>

              <SplitText
                text="Social Media Platform Management and Growth Services"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-spm-title"
              />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light">
                Devoria Tech provides professional social media platform management and growth services that help businesses build a strong online presence, grow their audience, and increase engagement across all major social media platforms including Facebook, Instagram, LinkedIn, TikTok, and YouTube.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8">
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-spm-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-teal-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-teal-500 to-orange-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Start Your Platform Growth <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </span>
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }} className="mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden neon-border">
                <img loading="lazy" src={spmHeroImg} alt="Social media platform management and growth services" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="spm-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-spm-${i}`}>
                <div className="p-6">
                  <stat.icon className="w-5 h-5 text-orange-400/50 mx-auto mb-3" />
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
          <div className="spm-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Understanding Platform Management</span>
            <SplitText text="What is Social Media Platform Management" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="spm-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Social media platform management is the process of managing, optimizing, and growing a brand's presence across social media platforms. It involves creating and publishing content, engaging with audiences, monitoring performance, and implementing growth strategies.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Professional platform management ensures that businesses maintain a consistent and active presence on social media, helping them build stronger relationships with their audience and achieve their marketing goals. Devoria Tech provides comprehensive platform management services that cover all aspects of social media growth.
            </p>
          </div>
          <div className="spm-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {platformMgmtItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle className="w-3.5 h-3.5 text-orange-400/40 shrink-0" />
                <span className="text-[12px] text-white/30 font-light">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="spm-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Why It Matters</span>
            <SplitText text="Importance of Social Media Platform Management" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="spm-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {importanceCards.map((card, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`importance-spm-${i}`}>
                <card.icon className="w-5 h-5 text-orange-400/50 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-[11px] text-white/25 leading-relaxed font-light">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="spm-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Platform Services</span>
            <SplitText text="Our Platform Management Services" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="spm-fade mb-8 text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center">
            <p>Devoria Tech provides specialized management services for each major social media platform to help businesses maximize their growth potential.</p>
          </div>
          <div className="space-y-5">
            {platformSections.map((section, i) => (
              <PlatformAccordion key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="spm-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Growth Strategies</span>
            <SplitText text="Social Media Growth Strategies" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="spm-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Our growth strategies are designed to help businesses build a strong and engaged audience across social media platforms.</p>
          </div>
          <div className="spm-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {growthStrategyCards.map((card, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`growth-spm-${i}`}>
                <card.icon className="w-5 h-5 text-orange-400/50 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-[11px] text-white/25 leading-relaxed font-light">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="spm-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Key Features</span>
            <SplitText text="Platform Management Features" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="spm-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureCards.map((card, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`feature-spm-${i}`}>
                <card.icon className="w-5 h-5 text-orange-400/50 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-[11px] text-white/25 leading-relaxed font-light">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="spm-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Industries</span>
            <SplitText text="Industries We Serve" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="spm-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Our platform management services help businesses across various industries grow their social media presence.</p>
          </div>
          <div className="spm-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industrySections.map((industry, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border" data-testid={`industry-spm-${i}`}>
                <div className="p-5">
                  <industry.icon className="w-5 h-5 text-orange-400/50 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-1">{industry.title}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed font-light">{industry.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
          <div className="spm-fade text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto text-center mt-6">
            <p>Devoria Tech develops platform management strategies tailored to the specific needs of different industries.</p>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="spm-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Our Process</span>
            <SplitText text="Our Platform Management Process" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="spm-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech follows a structured approach to manage and grow your social media platforms effectively.</p>
          </div>
          <div className="spm-fade space-y-4 max-w-3xl mx-auto">
            {processSections.map((step, i) => (
              <div key={i} className="flex items-start gap-5 p-5 rounded-2xl neon-border bg-white/[0.01]" data-testid={`process-spm-${i}`}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/15 to-teal-500/15 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold gradient-text-static">{step.num}</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{step.title}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed font-light">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="spm-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="spm-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for Platform Management</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech combines strategic expertise, creative content solutions, and data-driven approaches to help businesses grow their social media platforms effectively. Our team is dedicated to delivering measurable results and building strong online communities.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {whyChooseItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <item.icon className="w-4 h-4 text-orange-400/50 shrink-0" />
                  <span className="text-[13px] text-white/35 font-light">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="spm-fade rounded-2xl neon-border p-8 bg-white/[0.01]" data-testid="spm-future">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">The Future of Social Media Platform Growth</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light max-w-2xl mx-auto">
                Social media platforms continue to evolve with new features, algorithms, and audience behaviors. Businesses that invest in professional platform management will be better positioned to adapt to these changes and maintain strong growth.
              </p>
              <p className="text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto mt-3">
                Devoria Tech stays ahead of social media trends and platform updates to ensure our clients always have the most effective strategies for growing their online presence. Our commitment to continuous improvement helps businesses achieve long-term social media success.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative p-14 sm:p-20 rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-transparent to-teal-500/10" />
            <div className="absolute inset-0 border border-white/[0.06] rounded-[2rem]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-teal-400/20 to-transparent" />
            <div className="relative z-10">
              <SplitText text="Start Growing Your Social Media Platforms" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>If your business wants to build a strong social media presence and grow your audience across platforms, Devoria Tech can help.</p>
                <p>Our platform management services are designed to help businesses achieve consistent growth, increase engagement, and build powerful online communities.</p>
                <p>Contact Devoria Tech today to start growing your social media platforms and transforming your digital presence.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-spm-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-teal-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Growing Your Social Media Platforms <ArrowRight className="w-4 h-4" />
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
