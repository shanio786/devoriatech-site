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
  Sparkles, Film, Video, Shield, Zap, TrendingUp,
  BarChart3, Layers, Code2, Settings,
  Monitor, Megaphone, ShoppingBag, GraduationCap, Building2,
  Eye, MessageSquare, Palette, Globe, Users,
} from "lucide-react";
import dvmgHeroImg from "@assets/motion-graphics-hero.webp";
import dvmgTypesImg from "@assets/motion-graphics-types.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "200+", label: "Animations Created", icon: Film },
  { value: "100+", label: "Brands Served", icon: Sparkles },
  { value: "50+", label: "Explainer Videos", icon: Video },
  { value: "95%", label: "Client Satisfaction", icon: Shield },
];

const motionExamples = [
  "Animated explainer videos",
  "Animated social media posts",
  "Promotional video graphics",
  "Animated brand logos",
  "Infographic animations",
];

const importanceCards = [
  { icon: TrendingUp, title: "Higher Audience Engagement", description: "Animated content often receives more views and interactions on social media platforms." },
  { icon: MessageSquare, title: "Better Storytelling", description: "Motion graphics help businesses tell stories about their brand, products, and services in an engaging format." },
  { icon: Layers, title: "Simplifies Complex Information", description: "Animation makes it easier to explain complicated concepts and technical information." },
  { icon: Sparkles, title: "Stronger Brand Presentation", description: "Animated visuals create a more professional and modern brand image." },
  { icon: BarChart3, title: "Improved Marketing Results", description: "Marketing campaigns that include motion graphics often perform better because they attract attention and keep viewers engaged." },
];

const motionTypes = [
  {
    title: "Animated Explainer Videos",
    icon: Video,
    intro: "Explainer videos help businesses introduce products, services, or ideas using animated visuals and storytelling.",
    items: ["Product introduction animations", "Service explanation videos", "Concept visualization", "Animated tutorials"],
  },
  {
    title: "Social Media Motion Graphics",
    icon: Globe,
    intro: "Short animated graphics designed for social media platforms such as Instagram, Facebook, and TikTok.",
    items: ["Instagram story animations", "TikTok motion content", "Facebook video graphics", "Social media ad animations"],
  },
  {
    title: "Promotional Animation Videos",
    icon: Megaphone,
    intro: "Animated marketing videos used in advertisements and promotional campaigns.",
    items: ["Advertisement animations", "Campaign promotional videos", "Product launch animations", "Brand promotion content"],
  },
  {
    title: "Animated Logo Intros",
    icon: Palette,
    intro: "Animated logo intros add professional branding to videos and digital presentations.",
    items: ["Logo reveal animations", "Brand intro sequences", "Video opener animations", "Digital presentation intros"],
  },
  {
    title: "Infographic Animations",
    icon: BarChart3,
    intro: "Animated infographics help businesses present data and statistics in a visually engaging format.",
    items: ["Data visualization animations", "Statistical infographics", "Process flow animations", "Animated charts and graphs"],
  },
];

const industrySections = [
  { icon: Monitor, title: "Technology Companies", description: "Tech companies use animated visuals to explain software products and technical concepts." },
  { icon: Megaphone, title: "Marketing Agencies", description: "Marketing agencies use motion graphics for advertising campaigns and promotional videos." },
  { icon: ShoppingBag, title: "E-Commerce", description: "Online stores use animated content to promote products and create engaging advertisements." },
  { icon: GraduationCap, title: "Education Platforms", description: "Educational platforms use animated videos to explain lessons and learning materials." },
  { icon: Building2, title: "Corporate Businesses", description: "Corporations use motion graphics for presentations, training materials, and brand storytelling." },
];

const featureCards = [
  { icon: Film, title: "High-Quality Animation", description: "We use modern animation tools to create smooth and visually appealing motion graphics." },
  { icon: MessageSquare, title: "Creative Visual Storytelling", description: "Our team focuses on storytelling to ensure the animation communicates the message clearly." },
  { icon: Globe, title: "Social Media Optimization", description: "Motion graphics are optimized for platforms such as Instagram, TikTok, YouTube, and Facebook." },
  { icon: Palette, title: "Brand-Focused Design", description: "Every animation reflects the brand's identity and visual style." },
  { icon: Layers, title: "Multi-Platform Compatibility", description: "Animations are delivered in formats suitable for websites, marketing campaigns, and presentations." },
];

const benefitCards = [
  { icon: Eye, title: "Captures Audience Attention", description: "Animated visuals attract viewers quickly and keep them engaged longer." },
  { icon: TrendingUp, title: "Enhances Marketing Campaigns", description: "Motion graphics make advertisements and promotional campaigns more dynamic." },
  { icon: Zap, title: "Improves Message Clarity", description: "Complex ideas can be explained more easily through animated visuals." },
  { icon: Users, title: "Boosts Social Media Engagement", description: "Animated content often receives higher engagement on social platforms." },
  { icon: Shield, title: "Strengthens Brand Identity", description: "Consistent animated visuals reinforce brand recognition." },
];

const processSections = [
  { num: "01", title: "Concept Development", description: "We begin by understanding the client's message and developing creative animation concepts." },
  { num: "02", title: "Script and Storyboard", description: "Our team prepares a storyboard that outlines how the animation will communicate the message." },
  { num: "03", title: "Visual Design", description: "Designers create illustrations, icons, and visual elements used in the animation." },
  { num: "04", title: "Animation Production", description: "The design elements are animated using professional motion graphics software." },
  { num: "05", title: "Final Editing and Delivery", description: "The final animation is optimized for websites, social media, and marketing platforms." },
];

const whyChooseItems = [
  { icon: Sparkles, label: "Creative animation concepts" },
  { icon: Film, label: "Professional motion design" },
  { icon: Code2, label: "Modern animation tools and techniques" },
  { icon: Settings, label: "Customized visual storytelling" },
  { icon: Layers, label: "High-quality digital content production" },
];

function TypeAccordion({ section, index }: { section: typeof motionTypes[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="dvmg-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`dvmg-type-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`dvmg-type-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-dvmg-type-${index}`}
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/15 to-indigo-500/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-5 h-5 text-violet-400/70" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-violet-300 transition-colors duration-500">
            {section.title}
          </h3>
          <p className="text-[12px] text-white/25 mt-1 font-light line-clamp-1">{section.intro}</p>
        </div>
        <ChevronDown className={`w-5 h-5 text-violet-400/40 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div
        id={`dvmg-type-content-${index}`}
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ maxHeight: isOpen ? "5000px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-4">
          <p className="text-[13px] text-white/30 leading-[1.8] font-light">{section.intro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {section.items.map((item, ii) => (
              <div key={ii} className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                <CheckCircle className="w-3.5 h-3.5 text-violet-400/40 mt-0.5 shrink-0" />
                <span className="text-[12px] text-white/25 font-light">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MotionGraphics() {
  useSEO({
    title: "Motion Graphics & Animation – Bring Your Ideas to Life | Devoria Tech",
    description: "Professional motion graphics design services by Devoria Tech. Create animated explainer videos, social media motion graphics, promotional animations, animated logo intros, and infographic animations for modern digital marketing.",
    keywords: "motion graphics, animation design, explainer videos, animated content, social media animation, promotional videos, motion design, brand animation, infographic animation, digital marketing",
    canonical: "https://devoriatech.com/services/design-video/motion-graphics",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".dvmg-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-dvmg-hero">
        <div className="absolute inset-0 hero-gradient-bg" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03]">
          <div className="absolute inset-0 rounded-full border border-white/10 animate-orbit" style={{ animationDuration: "25s" }}>
            <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-violet-500/40 blur-sm" />
          </div>
          <div className="absolute inset-8 rounded-full border border-white/5 animate-orbit" style={{ animationDuration: "35s", animationDirection: "reverse" }}>
            <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-indigo-400/40 blur-sm" />
          </div>
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
          <Link href="/services/design-video">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-violet-400/60 hover:text-violet-400 font-medium tracking-wider uppercase transition-colors duration-300 mb-8 cursor-pointer" data-testid="link-back-dv">
              <ArrowRight className="w-3 h-3 rotate-180" /> Back to Design & Video
            </span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] text-violet-400 mb-6 tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  Motion Graphics
                </span>
              </motion.div>

              <SplitText
                text="Motion Graphics Design Services for Modern Digital Marketing"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-dvmg-title"
              />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light">
                Devoria Tech provides professional motion graphics design services designed to help businesses create visually appealing animated content for digital platforms. Our creative team produces high-quality animations that enhance marketing campaigns, presentations, advertisements, and social media content.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8">
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-dvmg-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(139,92,246,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Start Your Animation Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </span>
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }} className="mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden neon-border">
                <img loading="lazy" src={dvmgHeroImg} alt="Motion graphics design services" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dvmg-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-dvmg-${i}`}>
                <div className="p-6">
                  <stat.icon className="w-5 h-5 text-violet-400/50 mx-auto mb-3" />
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
          <div className="dvmg-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Understanding Motion Graphics</span>
            <SplitText text="What Are Motion Graphics" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="dvmg-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Motion graphics are animated visual elements used to communicate information or tell stories. These graphics combine animation, text, illustrations, and sound to create dynamic visual content.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Motion graphics are widely used in digital marketing, advertising, and online media because they capture audience attention quickly. They allow businesses to present information in a visually engaging and memorable way.
            </p>
          </div>
          <div className="dvmg-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {motionExamples.map((example, i) => (
              <div key={i} className="flex items-center gap-2.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle className="w-3.5 h-3.5 text-violet-400/40 shrink-0" />
                <span className="text-[12px] text-white/30 font-light">{example}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dvmg-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Key Advantages</span>
            <SplitText text="Importance of Motion Graphics in Digital Marketing" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="dvmg-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {importanceCards.map((card, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`importance-dvmg-${i}`}>
                <card.icon className="w-5 h-5 text-violet-400/50 mb-3" />
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
          <div className="dvmg-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Our Services</span>
            <SplitText text="Types of Motion Graphics We Create" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="dvmg-fade mb-8 text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center">
            <p>Devoria Tech produces different types of motion graphics content depending on business needs.</p>
          </div>
          <div className="space-y-5">
            {motionTypes.map((section, i) => (
              <TypeAccordion key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dvmg-fade text-center">
            <div className="relative rounded-2xl overflow-hidden neon-border">
              <img loading="lazy" src={dvmgTypesImg} alt="Our animation portfolio" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
            </div>
            <p className="text-[11px] text-white/25 mt-4 font-light tracking-wider uppercase">Our Animation Portfolio</p>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dvmg-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Industries</span>
            <SplitText text="Motion Graphics for Different Industries" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="dvmg-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Motion graphics are widely used in many industries for marketing and communication.</p>
          </div>
          <div className="dvmg-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industrySections.map((industry, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border" data-testid={`industry-dvmg-${i}`}>
                <div className="p-5">
                  <industry.icon className="w-5 h-5 text-violet-400/50 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-1">{industry.title}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed font-light">{industry.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
          <div className="dvmg-fade text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto text-center mt-6">
            <p>Devoria Tech develops motion graphics tailored to the specific needs of each industry.</p>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dvmg-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Service Features</span>
            <SplitText text="Features of Our Motion Graphics Services" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="dvmg-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech provides motion graphics services with features designed to deliver professional results.</p>
          </div>
          <div className="dvmg-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureCards.map((feature, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`feature-dvmg-${i}`}>
                <feature.icon className="w-5 h-5 text-violet-400/50 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-[11px] text-white/25 leading-relaxed font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dvmg-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Marketing Benefits</span>
            <SplitText text="Benefits of Motion Graphics for Businesses" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="dvmg-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Motion graphics provide many benefits for businesses that want to improve their marketing strategies.</p>
          </div>
          <div className="dvmg-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefitCards.map((benefit, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`benefit-dvmg-${i}`}>
                <benefit.icon className="w-5 h-5 text-violet-400/50 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-[11px] text-white/25 leading-relaxed font-light">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dvmg-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Our Process</span>
            <SplitText text="Our Motion Graphics Design Process" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="dvmg-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech follows a professional creative process to produce high-quality motion graphics.</p>
          </div>
          <div className="dvmg-fade space-y-4 max-w-3xl mx-auto">
            {processSections.map((step, i) => (
              <div key={i} className="flex items-start gap-5 p-5 rounded-2xl neon-border bg-white/[0.01]" data-testid={`process-dvmg-${i}`}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/15 to-indigo-500/15 flex items-center justify-center shrink-0">
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
          <div className="dvmg-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="dvmg-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for Motion Graphics</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech combines creative design expertise with modern animation technology to produce high-quality motion graphics. Our goal is to help businesses create powerful animated visuals that strengthen marketing campaigns and brand communication.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {whyChooseItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <item.icon className="w-4 h-4 text-violet-400/50 shrink-0" />
                  <span className="text-[13px] text-white/35 font-light">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dvmg-fade rounded-2xl neon-border p-8 bg-white/[0.01]" data-testid="dvmg-future">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">The Future of Motion Graphics</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light max-w-2xl mx-auto">
                Motion graphics continue to grow in importance as digital platforms prioritize video and visual content. Businesses that use animation effectively can communicate their message more clearly and attract larger audiences.
              </p>
              <p className="text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto mt-3">
                As technology evolves, motion graphics will become even more interactive and visually advanced. Brands that adopt animated content strategies will gain a competitive advantage in digital marketing. Devoria Tech helps businesses stay ahead by creating innovative motion graphics designed for modern digital platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative p-14 sm:p-20 rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-indigo-500/10" />
            <div className="absolute inset-0 border border-white/[0.06] rounded-[2rem]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent" />
            <div className="relative z-10">
              <SplitText text="Start Your Motion Graphics Project" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>If your business wants to create engaging animated content for marketing, social media, or advertising, Devoria Tech can help.</p>
                <p>Our motion graphics services are designed to help businesses communicate ideas visually, attract audiences, and strengthen brand identity.</p>
                <p>Contact Devoria Tech today to start creating professional motion graphics for your brand.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-dvmg-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(139,92,246,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your Motion Graphics Project <ArrowRight className="w-4 h-4" />
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
