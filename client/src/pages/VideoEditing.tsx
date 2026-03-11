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
  Sparkles, Video, Film, Camera, Megaphone,
  Users, Globe, Shield, Zap, TrendingUp,
  BarChart3, Layers, Code2, Settings,
  ShoppingBag, MonitorPlay, Clapperboard, GraduationCap, Building2,
} from "lucide-react";
import dvveHeroImg from "@assets/video-editing-hero.webp";
import dvveTypesImg from "@assets/video-editing-types.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "500+", label: "Videos Edited", icon: Video },
  { value: "200+", label: "Clients Served", icon: Users },
  { value: "1M+", label: "Video Views", icon: Globe },
  { value: "98%", label: "Satisfaction Rate", icon: Shield },
];

const whatIsItems = [
  "Cutting and trimming raw footage",
  "Adding transitions and visual effects",
  "Color correction and grading",
  "Sound design and audio mixing",
  "Final rendering and export optimization",
];

const importanceCards = [
  { icon: Users, title: "Higher Audience Engagement", description: "Well-edited videos capture attention and keep viewers watching longer, leading to higher engagement rates across all platforms." },
  { icon: Megaphone, title: "Better Communication", description: "Professional video editing helps convey your message clearly and effectively, making complex ideas easier to understand." },
  { icon: Film, title: "Stronger Brand Storytelling", description: "Video editing transforms raw footage into compelling brand stories that resonate with your target audience." },
  { icon: Globe, title: "Increased Social Media Reach", description: "High-quality edited videos perform better on social media algorithms, increasing your organic reach and visibility." },
  { icon: TrendingUp, title: "Improved Marketing Performance", description: "Professionally edited videos drive better results in marketing campaigns, increasing conversions and return on investment." },
];

const videoTypeSections = [
  {
    title: "Social Media Video Editing",
    icon: MonitorPlay,
    intro: "We create optimized video content for social media platforms including Instagram Reels, TikTok, Facebook, and LinkedIn to maximize engagement and reach.",
    items: ["Instagram Reels and Stories editing", "TikTok video optimization", "Facebook and LinkedIn video content", "Platform-specific format adaptation"],
  },
  {
    title: "YouTube Video Editing",
    icon: Video,
    intro: "Professional YouTube video editing services including intros, outros, transitions, and thumbnail optimization to grow your channel.",
    items: ["Custom intro and outro creation", "Professional transitions and effects", "Thumbnail optimization", "SEO-friendly video structuring"],
  },
  {
    title: "Promotional Video Editing",
    icon: Megaphone,
    intro: "We edit promotional videos that showcase your products, services, and brand story in a compelling and visually appealing format.",
    items: ["Product showcase videos", "Brand story compilation", "Event highlight reels", "Campaign-specific promotional content"],
  },
  {
    title: "Corporate Video Editing",
    icon: Building2,
    intro: "Professional corporate video editing for training materials, presentations, internal communications, and company branding content.",
    items: ["Training and onboarding videos", "Corporate presentation editing", "Internal communication content", "Company culture and branding videos"],
  },
  {
    title: "Advertisement Video Production",
    icon: Clapperboard,
    intro: "We produce high-quality advertisement videos optimized for digital platforms, television, and outdoor display advertising.",
    items: ["Digital ad video production", "Television commercial editing", "Display advertising content", "Multi-platform ad optimization"],
  },
];

const industrySections = [
  { icon: ShoppingBag, title: "E-Commerce", description: "E-commerce brands use professional video editing to create product demos, unboxing videos, and promotional content that drives sales." },
  { icon: Megaphone, title: "Marketing Agencies", description: "Marketing agencies rely on high-quality video editing to deliver compelling campaign content for their diverse client portfolio." },
  { icon: Camera, title: "Content Creators and Influencers", description: "Content creators and influencers need professional video editing to maintain consistent quality and grow their audience." },
  { icon: Code2, title: "Technology Companies", description: "Technology companies use video editing for product launches, explainer videos, and technical demonstrations." },
  { icon: GraduationCap, title: "Educational Platforms", description: "Educational platforms use professional video editing to create engaging course content, tutorials, and training materials." },
];

const featureCards = [
  { icon: Film, title: "High-Quality Video Production", description: "We deliver professionally edited videos with stunning visual quality that meets industry standards." },
  { icon: Sparkles, title: "Creative Storytelling", description: "Our editors craft compelling narratives from raw footage, creating engaging stories that captivate audiences." },
  { icon: MonitorPlay, title: "Platform Optimization", description: "Every video is optimized for its target platform, ensuring the best performance across social media and web." },
  { icon: Layers, title: "Professional Visual Effects", description: "We add professional visual effects, motion graphics, and transitions that enhance your video content." },
  { icon: Zap, title: "Fast Turnaround Time", description: "Our efficient workflow ensures quick delivery without compromising on quality or creative excellence." },
];

const benefitCards = [
  { icon: Video, title: "Stronger Visual Content", description: "Professional editing transforms ordinary footage into powerful visual content that represents your brand." },
  { icon: Users, title: "Increased Audience Retention", description: "Well-edited videos keep viewers engaged longer, improving watch time and audience retention metrics." },
  { icon: TrendingUp, title: "Better Marketing Campaigns", description: "High-quality video content improves marketing campaign performance and drives better business results." },
  { icon: Shield, title: "Improved Brand Image", description: "Consistent, professionally edited videos establish credibility and strengthen your brand image." },
  { icon: BarChart3, title: "Higher Social Media Engagement", description: "Optimized video content generates more likes, shares, and comments across social media platforms." },
];

const processSections = [
  { num: "01", title: "Footage Review", description: "We review all raw footage and assets to understand the project scope and creative direction." },
  { num: "02", title: "Video Structure Planning", description: "Our team creates a detailed editing plan including sequence, pacing, and visual style." },
  { num: "03", title: "Editing and Visual Effects", description: "Professional editing with transitions, effects, and motion graphics to create a polished video." },
  { num: "04", title: "Color Correction and Sound Editing", description: "We apply color grading and sound design to ensure professional quality across all elements." },
  { num: "05", title: "Final Export and Delivery", description: "The completed video is exported in optimized formats for your target platforms and delivered." },
];

const whyChooseItems = [
  { icon: Film, label: "Professional video editing expertise" },
  { icon: Sparkles, label: "Creative storytelling and narrative design" },
  { icon: MonitorPlay, label: "Multi-platform video optimization" },
  { icon: Settings, label: "Advanced editing tools and techniques" },
  { icon: Layers, label: "Comprehensive post-production services" },
];

function VideoTypeAccordion({ section, index }: { section: typeof videoTypeSections[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="dvve-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`dvve-type-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`dvve-type-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-dvve-type-${index}`}
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/15 to-amber-500/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
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
        id={`dvve-type-content-${index}`}
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

export default function VideoEditing() {
  useSEO({
    title: "Video Editing for YouTube, Reels & Ads – Clean, Fast, Professional | Devoria Tech",
    description: "Professional video editing services by Devoria Tech. Social media video editing, YouTube video editing, promotional videos, corporate videos, and advertisement video production. High-quality editing for businesses and creators.",
    keywords: "video editing, professional video editing, social media video, YouTube video editing, promotional video, corporate video, advertisement video, video production, video post-production",
    canonical: "https://devoriatech.com/services/design-video/video-editing",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".dvve-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-dvve-hero">
        <div className="absolute inset-0 hero-gradient-bg" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03]">
          <div className="absolute inset-0 rounded-full border border-white/10 animate-orbit" style={{ animationDuration: "25s" }}>
            <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-violet-500/40 blur-sm" />
          </div>
          <div className="absolute inset-8 rounded-full border border-white/5 animate-orbit" style={{ animationDuration: "35s", animationDirection: "reverse" }}>
            <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-amber-400/40 blur-sm" />
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
                  Video Editing
                </span>
              </motion.div>

              <SplitText
                text="Professional Video Editing Services for Businesses and Creators"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-dvve-title"
              />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light">
                Devoria Tech provides professional video editing services that help businesses and content creators produce high-quality video content. From social media clips to corporate presentations and advertisement videos, our team delivers polished, engaging video content that drives results.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8">
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-dvve-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(139,92,246,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Start Your Video Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </span>
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }} className="mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden neon-border">
                <img loading="lazy" src={dvveHeroImg} alt="Professional video editing services" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dvve-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-dvve-${i}`}>
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
          <div className="dvve-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Understanding Video Editing</span>
            <SplitText text="What is Video Editing" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="dvve-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Video editing is the process of transforming raw footage into polished, professional video content. It involves cutting, arranging, and enhancing video clips with transitions, effects, color correction, and sound design to create compelling visual stories.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Professional video editing is essential for businesses, content creators, and brands that want to produce high-quality video content for marketing, social media, corporate communications, and advertising campaigns.
            </p>
          </div>
          <div className="dvve-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {whatIsItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle className="w-3.5 h-3.5 text-violet-400/40 shrink-0" />
                <span className="text-[12px] text-white/30 font-light">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dvve-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Key Advantages</span>
            <SplitText text="Why Video Editing Matters for Your Business" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="dvve-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {importanceCards.map((card, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`importance-dvve-${i}`}>
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
          <div className="dvve-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Our Services</span>
            <SplitText text="Our Video Editing Services" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="dvve-fade mb-8 text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center">
            <p>Devoria Tech provides comprehensive video editing services for businesses and creators who want professional, engaging video content.</p>
          </div>
          <div className="space-y-5">
            {videoTypeSections.map((section, i) => (
              <VideoTypeAccordion key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dvve-fade text-center">
            <div className="relative rounded-2xl overflow-hidden neon-border">
              <img loading="lazy" src={dvveTypesImg} alt="Our video portfolio" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-l from-background/30 to-transparent" />
            </div>
            <p className="text-[12px] text-white/25 mt-4 font-light tracking-wider uppercase">Our Video Portfolio</p>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dvve-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Industries</span>
            <SplitText text="Industries We Serve" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="dvve-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Our video editing services help businesses across many industries create professional content that drives results.</p>
          </div>
          <div className="dvve-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industrySections.map((industry, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border" data-testid={`industry-dvve-${i}`}>
                <div className="p-5">
                  <industry.icon className="w-5 h-5 text-violet-400/50 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-1">{industry.title}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed font-light">{industry.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
          <div className="dvve-fade text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto text-center mt-6">
            <p>Devoria Tech delivers video editing solutions tailored to your industry and content goals.</p>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dvve-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Key Features</span>
            <SplitText text="What Makes Our Video Editing Stand Out" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="dvve-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Our video editing services combine technical expertise with creative vision to deliver exceptional results.</p>
          </div>
          <div className="dvve-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureCards.map((feature, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`feature-dvve-${i}`}>
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
          <div className="dvve-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Benefits</span>
            <SplitText text="Benefits of Professional Video Editing" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="dvve-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Professional video editing provides significant advantages for businesses looking to strengthen their digital presence.</p>
          </div>
          <div className="dvve-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefitCards.map((benefit, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`benefit-dvve-${i}`}>
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
          <div className="dvve-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Our Process</span>
            <SplitText text="Our Video Editing Process" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="dvve-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech follows a structured workflow to deliver professional video editing results.</p>
          </div>
          <div className="dvve-fade space-y-4 max-w-3xl mx-auto">
            {processSections.map((step, i) => (
              <div key={i} className="flex items-start gap-5 p-5 rounded-2xl neon-border bg-white/[0.01]" data-testid={`process-dvve-${i}`}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/15 to-amber-500/15 flex items-center justify-center shrink-0">
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
          <div className="dvve-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="dvve-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for Video Editing</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech combines technical expertise with creative vision to deliver outstanding video editing services. Our team is committed to helping businesses and creators produce video content that engages audiences and drives results.
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
          <div className="dvve-fade rounded-2xl neon-border p-8 bg-white/[0.01]" data-testid="dvve-future">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">The Future of Video Content</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light max-w-2xl mx-auto">
                Video content continues to dominate digital marketing and communication. As platforms evolve and audiences demand more engaging visual experiences, professional video editing will become even more critical for business success.
              </p>
              <p className="text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto mt-3">
                Brands that invest in high-quality video content today will build stronger connections with their audiences and gain a competitive advantage. Devoria Tech helps businesses stay ahead by delivering professional video editing services designed for the future of digital content.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative p-14 sm:p-20 rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-amber-500/10" />
            <div className="absolute inset-0 border border-white/[0.06] rounded-[2rem]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
            <div className="relative z-10">
              <SplitText text="Start Your Video Editing Project" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>If your business needs professional video editing services, Devoria Tech can help you create compelling video content.</p>
                <p>Our video editing services are designed to help businesses and creators produce high-quality videos that engage audiences and drive marketing success.</p>
                <p>Contact Devoria Tech today to start your video editing project and elevate your visual content strategy.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-dvve-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(139,92,246,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your Video Editing Project <ArrowRight className="w-4 h-4" />
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
