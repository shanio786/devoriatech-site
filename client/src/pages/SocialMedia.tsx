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
  Globe, MessageSquare, FileText, Shield, Zap,
  Users, BarChart3, TrendingUp, Megaphone,
  ShoppingCart, Laptop, UtensilsCrossed, User,
  Code2, Settings, Layers,
} from "lucide-react";
import smHeroImg from "@assets/social-media-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "500+", label: "Campaigns Managed", icon: Megaphone },
  { value: "10M+", label: "Audience Reached", icon: Users },
  { value: "85%", label: "Engagement Increase", icon: TrendingUp },
  { value: "200+", label: "Brands Served", icon: Shield },
];

const smActivities = [
  "Creating engaging content",
  "Scheduling posts",
  "Managing social media accounts",
  "Interacting with followers",
  "Analyzing engagement and performance",
];

const smServiceSections = [
  {
    title: "Platform Management and Growth",
    icon: Globe,
    intro: "Managing multiple social media platforms can be challenging. Devoria Tech helps businesses manage and grow their presence across different platforms.",
    description: "Our goal is to help businesses grow followers, improve engagement, and build strong online communities.",
    items: ["Facebook", "Instagram", "LinkedIn", "TikTok", "YouTube", "Twitter (X)"],
  },
  {
    title: "Content Creation and Scheduling",
    icon: FileText,
    intro: "Content is the foundation of successful social media marketing. Our team creates engaging and visually appealing content that captures audience attention.",
    description: "We also schedule content strategically to ensure consistent posting and maximum audience reach.",
    items: ["Social media graphics", "Promotional posts", "Short videos and reels", "Informative posts", "Brand storytelling content"],
  },
  {
    title: "Community Engagement",
    icon: MessageSquare,
    intro: "Building relationships with followers is essential for successful social media marketing. Devoria Tech helps businesses interact with their audience and maintain strong engagement.",
    description: "Strong engagement helps businesses build trust and improve customer loyalty.",
    items: ["Responding to comments and messages", "Interacting with followers", "Managing brand reputation", "Encouraging community participation"],
  },
];

const benefitSections = [
  { icon: Globe, title: "Increased Brand Awareness", description: "Social media platforms allow businesses to reach large audiences and introduce their brand to potential customers." },
  { icon: MessageSquare, title: "Direct Customer Communication", description: "Businesses can interact directly with customers through comments, messages, and social media conversations." },
  { icon: Shield, title: "Improved Customer Trust", description: "Active social media engagement helps businesses build trust and credibility with their audience." },
  { icon: TrendingUp, title: "Higher Website Traffic", description: "Social media campaigns can drive traffic to websites, landing pages, and online stores." },
  { icon: BarChart3, title: "Better Marketing Insights", description: "Social media analytics help businesses understand audience behavior and improve marketing strategies." },
];

const platformSections = [
  { icon: Users, title: "Facebook Marketing", description: "Facebook is one of the largest social media platforms and provides powerful tools for business marketing." },
  { icon: Megaphone, title: "Instagram Marketing", description: "Instagram is ideal for visual content such as photos, videos, and brand storytelling." },
  { icon: Laptop, title: "LinkedIn Marketing", description: "LinkedIn is the leading platform for B2B marketing and professional networking." },
  { icon: Zap, title: "TikTok Marketing", description: "TikTok is one of the fastest-growing platforms and offers excellent opportunities for viral content." },
  { icon: Globe, title: "YouTube Marketing", description: "Video content on YouTube helps businesses educate audiences and promote products effectively." },
];

const processSections = [
  { num: "01", title: "Brand Analysis", description: "We analyze the business, industry, and target audience to develop an effective social media strategy." },
  { num: "02", title: "Content Strategy Development", description: "Our team creates a content plan designed to attract and engage audiences." },
  { num: "03", title: "Content Creation and Scheduling", description: "We design graphics, write captions, and schedule posts for consistent social media activity." },
  { num: "04", title: "Engagement and Community Management", description: "Our team interacts with followers, responds to comments, and builds relationships with the audience." },
  { num: "05", title: "Performance Monitoring and Optimization", description: "We analyze social media performance and continuously improve strategies to increase engagement and reach." },
];

const whyChooseItems = [
  { icon: Megaphone, label: "Creative social media strategies" },
  { icon: FileText, label: "Professional content creation" },
  { icon: Users, label: "Audience engagement expertise" },
  { icon: BarChart3, label: "Data-driven marketing strategies" },
  { icon: Settings, label: "Consistent account management" },
];

function SmServiceSection({ section, index }: { section: typeof smServiceSections[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="sm-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`sm-service-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`sm-service-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-sm-service-${index}`}
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/15 to-amber-500/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
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
        id={`sm-service-content-${index}`}
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ maxHeight: isOpen ? "5000px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-4">
          <p className="text-[13px] text-white/30 leading-[1.8] font-light">{section.intro}</p>
          <p className="text-[13px] text-white/25 leading-[1.8] font-light">{section.description}</p>
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

export default function SocialMedia() {
  useSEO({
    title: "Social Media Management – Grow Your Brand Online | Devoria Tech",
    description: "Devoria Tech provides professional social media management services including platform management, content creation, scheduling, and community engagement. Grow your online presence and build strong digital brands.",
    keywords: "social media management, social media marketing, content creation, community engagement, platform management, Facebook marketing, Instagram marketing, LinkedIn marketing, TikTok marketing, YouTube marketing",
    canonical: "https://devoriatech.com/services/social-media",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".sm-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-sm-hero">
        <div className="absolute inset-0 hero-gradient-bg" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-orange-600/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03]">
          <div className="absolute inset-0 rounded-full border border-white/10 animate-orbit" style={{ animationDuration: "25s" }}>
            <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-orange-500/40 blur-sm" />
          </div>
          <div className="absolute inset-8 rounded-full border border-white/5 animate-orbit" style={{ animationDuration: "35s", animationDirection: "reverse" }}>
            <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-amber-400/40 blur-sm" />
          </div>
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
          <Link href="/services">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-cyan-400/60 hover:text-cyan-400 font-medium tracking-wider uppercase transition-colors duration-300 mb-8 cursor-pointer" data-testid="link-back-services">
              <ArrowRight className="w-3 h-3 rotate-180" /> Back to Services
            </span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] text-orange-400 mb-6 tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                  Social Media
                </span>
              </motion.div>

              <SplitText
                text="Social Media Management Services for Business Growth"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-sm-title"
              />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light">
                Social media has become one of the most powerful platforms for businesses to connect with customers, build brand awareness, and drive sales. Devoria Tech provides professional social media management services designed to help businesses grow their online presence and achieve marketing success.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8">
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-sm-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Start Your Social Media Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </span>
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }} className="mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden neon-border">
                <img loading="lazy" src={smHeroImg} alt="Social media management services" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sm-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-sm-${i}`}>
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
          <div className="sm-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Understanding Social Media</span>
            <SplitText text="What is Social Media Management" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="sm-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Social media management involves creating, publishing, and managing content on social media platforms while interacting with followers and analyzing performance metrics.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Professional social media management helps businesses maintain consistent communication with their audience and improve brand visibility. Devoria Tech develops customized social media strategies designed to help businesses achieve their marketing goals.
            </p>
          </div>
          <div className="sm-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {smActivities.map((activity, i) => (
              <div key={i} className="flex items-center gap-2.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle className="w-3.5 h-3.5 text-orange-400/40 shrink-0" />
                <span className="text-[12px] text-white/30 font-light">{activity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sm-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Our Services</span>
            <SplitText text="Our Social Media Management Services" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="sm-fade mb-8 text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center">
            <p>Devoria Tech offers a complete range of social media management services designed to help businesses build strong online communities and increase brand awareness.</p>
          </div>
          <div className="space-y-5">
            {smServiceSections.map((section, i) => (
              <SmServiceSection key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sm-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Key Benefits</span>
            <SplitText text="Benefits of Social Media Marketing for Businesses" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="sm-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Social media marketing offers many benefits for businesses that want to grow their digital presence.</p>
          </div>
          <div className="sm-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefitSections.map((benefit, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`benefit-sm-${i}`}>
                <benefit.icon className="w-5 h-5 text-orange-400/50 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-[11px] text-white/25 leading-relaxed font-light">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sm-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Platforms We Manage</span>
            <SplitText text="Social Media Platforms We Manage" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="sm-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech manages social media accounts across multiple platforms depending on the needs of the business.</p>
          </div>
          <div className="sm-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {platformSections.map((platform, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border" data-testid={`platform-sm-${i}`}>
                <div className="p-5">
                  <platform.icon className="w-5 h-5 text-orange-400/50 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-1">{platform.title}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed font-light">{platform.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
          <div className="sm-fade text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto text-center mt-6">
            <p>Devoria Tech helps businesses choose the right platforms based on their target audience and marketing goals.</p>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sm-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Our Process</span>
            <SplitText text="Our Social Media Strategy Process" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="sm-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech follows a strategic approach to social media management.</p>
          </div>
          <div className="sm-fade space-y-4 max-w-3xl mx-auto">
            {processSections.map((step, i) => (
              <div key={i} className="flex items-start gap-5 p-5 rounded-2xl neon-border bg-white/[0.01]" data-testid={`process-sm-${i}`}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/15 to-amber-500/15 flex items-center justify-center shrink-0">
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
          <div className="sm-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="sm-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for Social Media Management</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech provides professional social media management services designed to help businesses grow their online presence. Our goal is to help businesses build strong digital brands and connect with their audience effectively.
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
          <div className="sm-fade rounded-2xl neon-border p-8 bg-white/[0.01]" data-testid="sm-future">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">The Future of Social Media Marketing</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light max-w-2xl mx-auto">
                Social media continues to evolve as one of the most important digital marketing channels. Businesses that invest in social media marketing gain a competitive advantage by building stronger relationships with customers.
              </p>
              <p className="text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto mt-3">
                Modern marketing strategies now focus on creating engaging content, building online communities, and delivering personalized experiences. Devoria Tech helps businesses stay ahead by developing innovative social media strategies designed for long-term growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative p-14 sm:p-20 rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-transparent to-amber-500/10" />
            <div className="absolute inset-0 border border-white/[0.06] rounded-[2rem]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
            <div className="relative z-10">
              <SplitText text="Start Growing Your Social Media Presence" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>If your business wants to increase brand awareness, attract customers, and grow online communities, Devoria Tech can help.</p>
                <p>Our social media management services help businesses create powerful digital marketing campaigns that drive engagement and growth.</p>
                <p>Contact Devoria Tech today to start building a strong and successful social media presence.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-sm-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Growing Your Social Media Presence <ArrowRight className="w-4 h-4" />
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
