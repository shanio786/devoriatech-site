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
  Sparkles, Palette, Megaphone, Image, Eye,
  Users, Globe, Shield, Zap, TrendingUp,
  BarChart3, Layers, Code2, Settings,
  Rocket, Building2, ShoppingBag, Briefcase, User,
} from "lucide-react";
import dvlbHeroImg from "@assets/logo-branding-hero.webp";
import dvlbServicesImg from "@assets/logo-branding-services.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "200+", label: "Logos Designed", icon: Palette },
  { value: "150+", label: "Brands Created", icon: Sparkles },
  { value: "100%", label: "Custom Designs", icon: Shield },
  { value: "50+", label: "Industries Served", icon: Globe },
];

const whatIsItems = [
  "Custom logo creation for businesses",
  "Complete brand identity development",
  "Color palette and typography design",
  "Brand guidelines and style systems",
  "Marketing visual asset creation",
];

const importanceCards = [
  { icon: Eye, title: "Creates Strong First Impression", description: "A well-designed logo and brand identity create an immediate positive impression that helps your business stand out from competitors." },
  { icon: Sparkles, title: "Builds Brand Recognition", description: "Consistent branding elements make your business instantly recognizable across all platforms and marketing channels." },
  { icon: Megaphone, title: "Communicates Brand Values", description: "Your logo and branding visually communicate your company's values, mission, and personality to your target audience." },
  { icon: Shield, title: "Increases Customer Trust", description: "Professional branding builds credibility and trust with potential customers, making them more likely to choose your business." },
  { icon: TrendingUp, title: "Supports Marketing Efforts", description: "Strong branding provides a foundation for all marketing campaigns, ensuring consistency and effectiveness across channels." },
];

const logoServiceSections = [
  {
    title: "Custom Logo Design",
    icon: Palette,
    intro: "We create unique, custom logos that perfectly represent your brand identity and resonate with your target audience.",
    items: ["Original concept development", "Multiple design variations", "Vector format delivery", "Unlimited revisions"],
  },
  {
    title: "Modern Logo Design",
    icon: Sparkles,
    intro: "Our modern logo designs incorporate current design trends while maintaining timeless appeal for long-term brand value.",
    items: ["Contemporary design aesthetics", "Clean and minimal approach", "Trend-aware styling", "Future-proof designs"],
  },
  {
    title: "Minimalist Logo Design",
    icon: Layers,
    intro: "Simple yet powerful minimalist logos that communicate your brand message with clarity and elegance.",
    items: ["Simplified visual elements", "Clean typography", "Memorable simplicity", "Versatile applications"],
  },
  {
    title: "Icon-Based Logo Design",
    icon: Image,
    intro: "Distinctive icon-based logos that create strong visual symbols for your brand recognition.",
    items: ["Custom icon creation", "Symbolic representation", "Scalable graphics", "Brand symbol development"],
  },
  {
    title: "Typography Logo Design",
    icon: Code2,
    intro: "Typography-focused logos that use custom lettering and fonts to create distinctive brand identities.",
    items: ["Custom lettering design", "Font selection and pairing", "Wordmark development", "Typographic brand marks"],
  },
];

const brandingSolutions = [
  { icon: Palette, title: "Brand Color Palette", description: "Strategic color selection that reflects your brand personality and creates emotional connections with your audience." },
  { icon: Code2, title: "Typography System", description: "Carefully selected font combinations that enhance readability and reinforce your brand identity across all materials." },
  { icon: Layers, title: "Brand Style Guidelines", description: "Comprehensive guidelines that ensure consistent brand application across all platforms and marketing materials." },
  { icon: Image, title: "Marketing Visual Assets", description: "Complete set of visual assets including social media templates, business cards, and marketing collateral." },
  { icon: Briefcase, title: "Brand Identity Packages", description: "All-inclusive brand identity packages that provide everything needed to establish a professional brand presence." },
];

const industrySections = [
  { icon: Rocket, title: "Startups", description: "New businesses need strong branding to establish credibility and make a memorable first impression in competitive markets." },
  { icon: Zap, title: "Technology", description: "Technology companies require modern, innovative branding that reflects their cutting-edge solutions and digital expertise." },
  { icon: ShoppingBag, title: "E-Commerce", description: "Online stores need distinctive branding that builds trust and creates a consistent shopping experience across platforms." },
  { icon: Building2, title: "Corporate", description: "Established companies need professional branding that communicates authority, reliability, and industry leadership." },
  { icon: User, title: "Personal Brands", description: "Individuals building personal brands need unique visual identities that reflect their personality and professional expertise." },
];

const featureCards = [
  { icon: Palette, title: "Unique Custom Designs", description: "Every logo and brand element is designed from scratch to ensure your brand stands out with originality." },
  { icon: Layers, title: "Scalable Vector Graphics", description: "All designs are delivered in vector format, ensuring perfect quality at any size from business cards to billboards." },
  { icon: Settings, title: "Multiple File Formats", description: "We deliver your brand assets in all necessary file formats for print, digital, and social media applications." },
  { icon: Shield, title: "Brand Consistency", description: "Our comprehensive brand guidelines ensure consistent application of your brand identity across all touchpoints." },
  { icon: TrendingUp, title: "Long-Term Brand Value", description: "We design timeless brand identities that maintain their relevance and value as your business grows." },
];

const processSections = [
  { num: "01", title: "Brand Research", description: "We research your industry, competitors, and target audience to understand what makes your brand unique." },
  { num: "02", title: "Concept Development", description: "Our designers create multiple logo concepts and brand direction options based on research insights." },
  { num: "03", title: "Design Refinement", description: "We refine the selected concept through multiple iterations until it perfectly represents your brand." },
  { num: "04", title: "Brand Identity Development", description: "We develop the complete brand identity system including colors, typography, and visual guidelines." },
  { num: "05", title: "Final Delivery", description: "All brand assets are delivered in multiple formats with comprehensive brand guidelines documentation." },
];

const whyChooseItems = [
  { icon: Palette, label: "Professional custom logo design" },
  { icon: Sparkles, label: "Creative brand identity development" },
  { icon: Layers, label: "Comprehensive brand guidelines" },
  { icon: Settings, label: "Modern design tools and techniques" },
  { icon: BarChart3, label: "Strategic branding solutions" },
];

function ServiceAccordion({ section, index }: { section: typeof logoServiceSections[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="dvlb-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`dvlb-service-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`dvlb-service-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-dvlb-service-${index}`}
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/15 to-rose-500/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
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
        id={`dvlb-service-content-${index}`}
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

export default function LogoBranding() {
  useSEO({
    title: "Logo Design & Brand Identity – Make a Lasting First Impression | Devoria Tech",
    description: "Professional logo and branding design services by Devoria Tech. Custom logo design, brand identity development, color palette creation, typography selection, and comprehensive brand guidelines for businesses of all sizes.",
    keywords: "logo design, branding, brand identity, custom logo, brand guidelines, typography, color palette, visual identity, brand design, logo branding services",
    canonical: "https://devoriatech.com/services/design-video/logo-branding",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".dvlb-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-dvlb-hero">
        <div className="absolute inset-0 hero-gradient-bg" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-rose-500/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03]">
          <div className="absolute inset-0 rounded-full border border-white/10 animate-orbit" style={{ animationDuration: "25s" }}>
            <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-violet-500/40 blur-sm" />
          </div>
          <div className="absolute inset-8 rounded-full border border-white/5 animate-orbit" style={{ animationDuration: "35s", animationDirection: "reverse" }}>
            <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-rose-400/40 blur-sm" />
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
                  Logo & Branding
                </span>
              </motion.div>

              <SplitText
                text="Logo and Branding Design Services for Businesses"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-dvlb-title"
              />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light">
                Devoria Tech provides professional logo and branding design services that help businesses build strong visual identities. Our custom designs create memorable brand experiences that resonate with your target audience and establish lasting brand recognition across all platforms.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8">
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-dvlb-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(139,92,246,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Start Your Branding Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </span>
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }} className="mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden neon-border">
                <img loading="lazy" src={dvlbHeroImg} alt="Logo and branding design services" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dvlb-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-dvlb-${i}`}>
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
          <div className="dvlb-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Understanding Branding</span>
            <SplitText text="What is Logo and Branding Design" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="dvlb-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Logo and branding design is the process of creating a visual identity system that represents your business. It includes designing a unique logo, selecting brand colors and typography, and developing comprehensive guidelines that ensure consistency across all marketing materials.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              A strong brand identity helps businesses communicate their values, build trust with customers, and differentiate themselves from competitors. Professional branding creates a cohesive visual language that strengthens every customer interaction.
            </p>
          </div>
          <div className="dvlb-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
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
          <div className="dvlb-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Key Advantages</span>
            <SplitText text="Importance of Professional Branding" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="dvlb-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {importanceCards.map((card, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`importance-dvlb-${i}`}>
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
          <div className="dvlb-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Our Services</span>
            <SplitText text="Our Logo Design Services" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="dvlb-fade mb-8 text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center">
            <p>Devoria Tech provides comprehensive logo design services tailored to create unique visual identities for businesses of all sizes.</p>
          </div>
          <div className="space-y-5">
            {logoServiceSections.map((section, i) => (
              <ServiceAccordion key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dvlb-fade text-center mb-10">
            <div className="relative rounded-2xl overflow-hidden neon-border max-w-4xl mx-auto">
              <img loading="lazy" src={dvlbServicesImg} alt="Our Brand Identity Portfolio" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-sm text-white/50 font-light tracking-wide">Our Brand Identity Portfolio</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dvlb-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Branding Solutions</span>
            <SplitText text="Complete Branding Solutions" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="dvlb-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {brandingSolutions.map((solution, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`solution-dvlb-${i}`}>
                <solution.icon className="w-5 h-5 text-violet-400/50 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-2">{solution.title}</h3>
                <p className="text-[11px] text-white/25 leading-relaxed font-light">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dvlb-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Industries</span>
            <SplitText text="Industries We Serve" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="dvlb-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Our logo and branding design services help businesses across many industries build strong visual identities.</p>
          </div>
          <div className="dvlb-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industrySections.map((industry, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border" data-testid={`industry-dvlb-${i}`}>
                <div className="p-5">
                  <industry.icon className="w-5 h-5 text-violet-400/50 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-1">{industry.title}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed font-light">{industry.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
          <div className="dvlb-fade text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto text-center mt-6">
            <p>Devoria Tech creates customized branding solutions tailored to your specific industry and business needs.</p>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dvlb-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Features</span>
            <SplitText text="What Makes Our Branding Stand Out" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="dvlb-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Our branding services combine creativity with strategic thinking to deliver designs that drive business results.</p>
          </div>
          <div className="dvlb-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureCards.map((feature, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`feature-dvlb-${i}`}>
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
          <div className="dvlb-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Our Process</span>
            <SplitText text="Our Branding Design Process" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="dvlb-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech follows a structured approach to create impactful brand identities.</p>
          </div>
          <div className="dvlb-fade space-y-4 max-w-3xl mx-auto">
            {processSections.map((step, i) => (
              <div key={i} className="flex items-start gap-5 p-5 rounded-2xl neon-border bg-white/[0.01]" data-testid={`process-dvlb-${i}`}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/15 to-rose-500/15 flex items-center justify-center shrink-0">
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
          <div className="dvlb-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="dvlb-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for Logo and Branding</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech combines creative expertise with strategic branding knowledge to deliver professional brand identities that help businesses grow. Our team creates designs that are both visually stunning and strategically effective.
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

      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative p-14 sm:p-20 rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-rose-500/10" />
            <div className="absolute inset-0 border border-white/[0.06] rounded-[2rem]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-rose-400/20 to-transparent" />
            <div className="relative z-10">
              <SplitText text="Build a Powerful Brand Identity" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>If your business needs a professional logo and brand identity that makes a lasting impression, Devoria Tech can help.</p>
                <p>Our logo and branding design services are crafted to help businesses build strong visual identities that attract customers and establish market authority.</p>
                <p>Contact Devoria Tech today to create a brand identity that sets your business apart from the competition.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-dvlb-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(139,92,246,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Build a Powerful Brand Identity <ArrowRight className="w-4 h-4" />
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