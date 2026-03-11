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
  Camera, Image, Palette, Sparkles, Zap,
  TrendingUp, Shield, Layers, Users, BarChart3,
  ShoppingBag, Shirt, Heart, Megaphone, Video,
  Settings, Code2, Monitor,
} from "lucide-react";
import aiPhotoshootHeroImg from "@assets/ai-model-photoshoot-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "5K+", label: "AI Images Generated", icon: Camera },
  { value: "200+", label: "Brands Served", icon: ShoppingBag },
  { value: "90%", label: "Cost Reduction", icon: TrendingUp },
  { value: "10x", label: "Faster Production", icon: Zap },
];

const benefitSections = [
  { icon: TrendingUp, title: "Cost-Effective Content Production", description: "Traditional photoshoots require photographers, studios, models, and equipment, which can be expensive. AI photoshoots significantly reduce production costs." },
  { icon: Zap, title: "Faster Image Creation", description: "AI tools allow businesses to generate professional images within minutes. This helps brands create marketing campaigns quickly." },
  { icon: Sparkles, title: "Unlimited Creative Possibilities", description: "With AI photoshoots, brands can experiment with different model styles, clothing designs, lighting conditions, and backgrounds." },
  { icon: Shield, title: "Consistent Brand Identity", description: "AI-generated visuals allow businesses to maintain a consistent style and brand identity across marketing campaigns." },
  { icon: Layers, title: "Scalable Content for Marketing", description: "AI technology allows brands to produce large amounts of marketing visuals for websites, social media, and advertising platforms." },
];

const ecommerceItems = [
  "Clothing brands",
  "Fashion stores",
  "Jewelry brands",
  "Beauty products",
  "Accessories and lifestyle products",
];

const fashionItems = [
  "Showcase clothing collections",
  "Create lookbooks",
  "Produce marketing campaigns",
  "Generate social media visuals",
  "Launch seasonal fashion promotions",
];

const productItems = [
  "Social media advertising",
  "Website banners",
  "Product promotions",
  "Marketing campaigns",
  "Digital advertisements",
];

const featureSections = [
  {
    title: "Realistic AI Models",
    icon: Users,
    intro: "We create highly realistic AI models that look natural and professional in marketing visuals.",
    items: ["Natural appearance", "Professional quality", "Diverse model options", "Brand-aligned visuals"],
  },
  {
    title: "Custom Styling and Poses",
    icon: Palette,
    intro: "Businesses can customize model appearance, clothing styles, poses, and visual aesthetics to match their brand identity.",
    items: ["Custom clothing styling", "Adjustable poses", "Brand-specific aesthetics", "Visual identity matching"],
  },
  {
    title: "Multiple Background Options",
    icon: Image,
    intro: "AI technology allows brands to generate images in different environments such as studios, outdoor locations, and creative backgrounds.",
    items: ["Studio environments", "Outdoor locations", "Creative backgrounds", "Custom scene design"],
  },
  {
    title: "High-Resolution Images",
    icon: Monitor,
    intro: "Our AI photoshoot services deliver high-resolution images suitable for websites, advertising campaigns, and print media.",
    items: ["Print-ready quality", "Web-optimized formats", "Advertising resolution", "Multi-format delivery"],
  },
  {
    title: "Social Media Ready Content",
    icon: Video,
    intro: "We create AI visuals optimized for social media platforms such as Instagram, TikTok, and Facebook.",
    items: ["Instagram-optimized", "TikTok-ready content", "Facebook ad formats", "Cross-platform sizing"],
  },
];

const industrySections = [
  { icon: Shirt, title: "Fashion and Apparel Brands", description: "Fashion companies use AI models to display clothing collections and promote seasonal campaigns." },
  { icon: Heart, title: "Beauty and Cosmetics Industry", description: "Beauty brands create AI-generated visuals to showcase makeup products and skincare lines." },
  { icon: ShoppingBag, title: "E-Commerce Stores", description: "Online retailers use AI model images for product listings and advertising campaigns." },
  { icon: Megaphone, title: "Marketing and Advertising Agencies", description: "Agencies use AI visuals to create innovative marketing campaigns for clients." },
  { icon: Users, title: "Social Media Influencers and Creators", description: "Content creators use AI visuals to produce creative digital content for social media platforms." },
];

const processSections = [
  { num: "01", title: "Brand and Campaign Analysis", description: "We start by understanding the brand identity, marketing goals, and target audience." },
  { num: "02", title: "Model Design and Visual Style", description: "Our designers create AI models and define the visual style of the campaign." },
  { num: "03", title: "AI Image Generation", description: "Using advanced AI tools, we generate high-quality images with different poses, lighting styles, and backgrounds." },
  { num: "04", title: "Image Optimization", description: "We optimize the images for marketing use, websites, and social media platforms." },
  { num: "05", title: "Campaign Delivery", description: "The final visuals are delivered in multiple formats suitable for digital marketing campaigns." },
];

const whyChooseItems = [
  { icon: Code2, label: "Advanced AI image generation technology" },
  { icon: Palette, label: "Creative visual design expertise" },
  { icon: Camera, label: "High-quality marketing visuals" },
  { icon: Layers, label: "Scalable content production" },
  { icon: Settings, label: "Customized branding solutions" },
];

function FeatureAccordion({ section, index }: { section: typeof featureSections[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="amp-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`amp-feature-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`amp-feature-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-amp-feature-${index}`}
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500/15 to-rose-500/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-5 h-5 text-fuchsia-400/70" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-fuchsia-300 transition-colors duration-500">
            {section.title}
          </h3>
          <p className="text-[12px] text-white/25 mt-1 font-light line-clamp-1">{section.intro}</p>
        </div>
        <ChevronDown className={`w-5 h-5 text-fuchsia-400/40 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div
        id={`amp-feature-content-${index}`}
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ maxHeight: isOpen ? "5000px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-4">
          <p className="text-[13px] text-white/30 leading-[1.8] font-light">{section.intro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {section.items.map((item, ii) => (
              <div key={ii} className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                <CheckCircle className="w-3.5 h-3.5 text-fuchsia-400/40 mt-0.5 shrink-0" />
                <span className="text-[12px] text-white/25 font-light">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AiModelPhotoshoot() {
  useSEO({
    title: "AI Model Photoshoots – Product Images Without a Studio | Devoria Tech",
    description: "Professional AI model photoshoot services by Devoria Tech. Generate realistic AI model images for fashion brands, e-commerce stores, product marketing, and social media. Cost-effective, scalable, and high-quality AI photography solutions.",
    keywords: "AI model photoshoot, AI photography, AI-generated models, fashion photoshoot AI, e-commerce product images, AI visual content, virtual model photoshoot, AI marketing visuals, product photography AI, brand photoshoot",
    canonical: "https://devoriatech.com/services/ai-services/ai-model-photoshoot",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".amp-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-amp-hero">
        <div className="absolute inset-0 hero-gradient-bg" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-fuchsia-600/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-rose-500/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03]">
          <div className="absolute inset-0 rounded-full border border-white/10 animate-orbit" style={{ animationDuration: "25s" }}>
            <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-fuchsia-500/40 blur-sm" />
          </div>
          <div className="absolute inset-8 rounded-full border border-white/5 animate-orbit" style={{ animationDuration: "35s", animationDirection: "reverse" }}>
            <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-rose-400/40 blur-sm" />
          </div>
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
          <Link href="/services/ai-services">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-cyan-400/60 hover:text-cyan-400 font-medium tracking-wider uppercase transition-colors duration-300 mb-8 cursor-pointer" data-testid="link-back-ai">
              <ArrowRight className="w-3 h-3 rotate-180" /> Back to AI Services
            </span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] text-fuchsia-400 mb-6 tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
                  AI Photoshoot
                </span>
              </motion.div>

              <SplitText
                text="AI Model Photoshoot Services for Brands and E-Commerce"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-amp-title"
              />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light">
                Devoria Tech offers professional AI model photoshoot services designed for brands, e-commerce businesses, fashion companies, and digital marketers. Our AI technology allows businesses to generate realistic model images and high-quality product visuals without the need for traditional photoshoots.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8">
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-amp-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-rose-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-rose-500 to-fuchsia-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(192,38,211,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Start Your AI Photoshoot <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </span>
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }} className="mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden neon-border">
                <img loading="lazy" src={aiPhotoshootHeroImg} alt="AI model photoshoot services" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="amp-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-amp-${i}`}>
                <div className="p-6">
                  <stat.icon className="w-5 h-5 text-fuchsia-400/50 mx-auto mb-3" />
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
          <div className="amp-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Understanding AI Photography</span>
            <SplitText text="What is an AI Model Photoshoot" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="amp-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              An AI model photoshoot is a process that uses artificial intelligence technology to generate realistic model images for marketing and promotional purposes. Instead of hiring real models and organizing a physical photoshoot, AI technology creates digital models and environments.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              These AI-generated visuals can look extremely realistic and can be customized based on the brand's marketing requirements. Businesses can control the model's appearance, style, clothing, poses, and background settings. Brands can generate thousands of creative images quickly while maintaining high visual quality.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="amp-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Key Advantages</span>
            <SplitText text="Benefits of AI Model Photoshoots" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="amp-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>AI photoshoot technology provides many advantages for businesses that want to create marketing visuals efficiently.</p>
          </div>
          <div className="amp-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefitSections.map((benefit, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`benefit-amp-${i}`}>
                <benefit.icon className="w-5 h-5 text-fuchsia-400/50 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-[11px] text-white/25 leading-relaxed font-light">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="amp-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">E-Commerce Solutions</span>
            <SplitText text="AI Model Photoshoots for E-Commerce" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="amp-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              E-commerce businesses rely heavily on high-quality product images to attract customers. AI model photoshoots provide an efficient way to create professional product images for online stores. Online retailers can showcase their products on AI-generated models without arranging physical photoshoots.
            </p>
          </div>
          <div className="amp-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto mb-10">
            {ecommerceItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle className="w-3.5 h-3.5 text-fuchsia-400/40 shrink-0" />
                <span className="text-[12px] text-white/30 font-light">{item}</span>
              </div>
            ))}
          </div>
          <div className="amp-fade text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto text-center">
            <p>Devoria Tech helps e-commerce businesses create visually appealing product images that improve online store engagement and increase conversions.</p>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="amp-fade rounded-2xl neon-border p-8 bg-white/[0.01]" data-testid="amp-fashion">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">AI Fashion Model Photoshoot</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mb-6">
                Fashion brands are among the biggest adopters of AI model technology. AI-generated fashion models allow brands to display clothing collections creatively and efficiently. Fashion companies can generate different models representing various styles, body types, and looks.
              </p>
              <div className="space-y-2">
                {fashionItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                    <CheckCircle className="w-3.5 h-3.5 text-fuchsia-400/40 shrink-0" />
                    <span className="text-[12px] text-white/25 font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="amp-fade rounded-2xl neon-border p-8 bg-white/[0.01]" data-testid="amp-product">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">AI Product Photoshoot for Marketing</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mb-6">
                Marketing campaigns require eye-catching visuals that attract audience attention. AI photoshoot technology allows brands to generate creative promotional images for advertising campaigns without the limitations of traditional photography.
              </p>
              <div className="space-y-2">
                {productItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                    <CheckCircle className="w-3.5 h-3.5 text-fuchsia-400/40 shrink-0" />
                    <span className="text-[12px] text-white/25 font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="amp-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Service Features</span>
            <SplitText text="Features of Our AI Model Photoshoot Services" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="amp-fade mb-8 text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center">
            <p>Devoria Tech provides advanced AI model photoshoot solutions with powerful features designed for modern marketing needs.</p>
          </div>
          <div className="space-y-5">
            {featureSections.map((section, i) => (
              <FeatureAccordion key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="amp-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Industries</span>
            <SplitText text="Industries Using AI Model Photoshoots" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="amp-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>AI photoshoot technology is widely used in multiple industries.</p>
          </div>
          <div className="amp-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industrySections.map((industry, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border" data-testid={`industry-amp-${i}`}>
                <div className="p-5">
                  <industry.icon className="w-5 h-5 text-fuchsia-400/50 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-1">{industry.title}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed font-light">{industry.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
          <div className="amp-fade text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto text-center mt-6">
            <p>Devoria Tech helps businesses from different industries leverage AI photoshoot technology for marketing success.</p>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="amp-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Our Process</span>
            <SplitText text="Our AI Photoshoot Development Process" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="amp-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech follows a professional process to create high-quality AI photoshoot visuals.</p>
          </div>
          <div className="amp-fade space-y-4 max-w-3xl mx-auto">
            {processSections.map((step, i) => (
              <div key={i} className="flex items-start gap-5 p-5 rounded-2xl neon-border bg-white/[0.01]" data-testid={`process-amp-${i}`}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500/15 to-rose-500/15 flex items-center justify-center shrink-0">
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
          <div className="amp-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="amp-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for AI Photoshoot Services</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech provides innovative AI solutions that help businesses create modern digital marketing content. Our goal is to help brands produce powerful marketing visuals using modern artificial intelligence technology.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {whyChooseItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <item.icon className="w-4 h-4 text-fuchsia-400/50 shrink-0" />
                  <span className="text-[13px] text-white/35 font-light">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="amp-fade rounded-2xl neon-border p-8 bg-white/[0.01]" data-testid="amp-future">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">The Future of AI Photography</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light max-w-2xl mx-auto">
                AI photography is rapidly becoming one of the most powerful tools in digital marketing. As artificial intelligence technology continues to improve, AI-generated visuals will become even more realistic and creative.
              </p>
              <p className="text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto mt-3">
                Businesses that adopt AI photoshoot technology early will gain a competitive advantage by producing high-quality marketing content quickly and efficiently. Devoria Tech helps brands stay ahead by offering advanced AI photoshoot solutions that support innovative marketing strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative p-14 sm:p-20 rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/10 via-transparent to-rose-500/10" />
            <div className="absolute inset-0 border border-white/[0.06] rounded-[2rem]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-fuchsia-400/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-rose-400/20 to-transparent" />
            <div className="relative z-10">
              <SplitText text="Start Your AI Model Photoshoot Project" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>If your brand wants to create professional marketing visuals without traditional photoshoot costs, Devoria Tech can help.</p>
                <p>Our AI model photoshoot services allow businesses to generate stunning images for marketing campaigns, e-commerce stores, and social media platforms.</p>
                <p>Contact Devoria Tech today to start creating powerful AI-generated visuals for your brand.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-amp-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-rose-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(192,38,211,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your AI Photoshoot Project <ArrowRight className="w-4 h-4" />
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
