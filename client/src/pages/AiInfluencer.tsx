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
  Sparkles, Palette, Megaphone, Camera, Video,
  Users, Globe, Shield, Zap, TrendingUp,
  BarChart3, Layers, Code2, Settings,
  ShoppingBag, Shirt, Heart, Gamepad2, Tv,
} from "lucide-react";
import aiInfluencerHeroImg from "@assets/ai-influencer-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "50+", label: "AI Influencers Created", icon: Sparkles },
  { value: "10M+", label: "Audience Reach", icon: Globe },
  { value: "100%", label: "Brand Control", icon: Shield },
  { value: "24/7", label: "Content Production", icon: Zap },
];

const influencerUseCases = [
  "Brand promotion",
  "Social media campaigns",
  "Product marketing",
  "Digital storytelling",
  "Influencer marketing collaborations",
];

const whyUseReasons = [
  { icon: Sparkles, title: "Unique and Innovative Marketing", description: "AI influencers allow brands to create unique marketing campaigns that stand out from traditional advertising methods. Their futuristic appeal attracts attention and increases audience engagement." },
  { icon: Shield, title: "Full Brand Control", description: "With AI influencers, brands have complete control over content, messaging, and appearance. This eliminates many of the challenges associated with working with human influencers." },
  { icon: Video, title: "Consistent Content Creation", description: "AI influencers can generate content regularly without scheduling conflicts or personal limitations. This allows brands to maintain consistent marketing campaigns." },
  { icon: TrendingUp, title: "Cost-Effective Influencer Marketing", description: "While traditional influencer marketing can be expensive, AI influencers offer a long-term solution that reduces ongoing marketing costs." },
  { icon: Globe, title: "Global Audience Reach", description: "AI influencers can represent brands across multiple languages, cultures, and markets, allowing businesses to reach global audiences." },
];

const serviceSections = [
  {
    title: "AI Character Design",
    icon: Palette,
    intro: "We design unique virtual characters that represent your brand identity. These characters are created with realistic visuals and customized personality traits.",
    items: ["Realistic character modeling", "Custom personality development", "Brand-aligned visual style", "Unique digital identity creation"],
  },
  {
    title: "AI Influencer Branding",
    icon: Megaphone,
    intro: "Our team develops a complete brand identity for the AI influencer, including visual style, communication tone, and social media strategy.",
    items: ["Visual style development", "Communication tone definition", "Social media strategy planning", "Brand voice guidelines"],
  },
  {
    title: "AI Content Creation",
    icon: Camera,
    intro: "We create engaging content for AI influencers including images, videos, and social media posts designed to attract audience attention.",
    items: ["High-quality image generation", "Video content production", "Social media post creation", "Audience-focused content strategy"],
  },
  {
    title: "Social Media Strategy",
    icon: Users,
    intro: "Devoria Tech helps businesses launch and manage AI influencers on platforms such as Instagram, TikTok, and YouTube.",
    items: ["Instagram profile management", "TikTok content strategy", "YouTube channel development", "Cross-platform engagement"],
  },
  {
    title: "AI Marketing Campaigns",
    icon: BarChart3,
    intro: "Our team designs marketing campaigns that integrate AI influencers into digital advertising strategies and brand promotions.",
    items: ["Digital advertising integration", "Brand promotion campaigns", "Performance tracking", "Campaign optimization"],
  },
];

const techStack = [
  "Artificial intelligence algorithms",
  "Computer-generated imagery (CGI)",
  "Machine learning models",
  "Natural language processing",
  "AI content generation tools",
];

const industrySections = [
  { icon: Shirt, title: "Fashion and Apparel Brands", description: "Fashion brands use AI influencers to showcase clothing collections, promote fashion campaigns, and create stylish digital content." },
  { icon: ShoppingBag, title: "E-commerce Businesses", description: "Online stores use AI influencers to promote products and create engaging marketing campaigns on social media platforms." },
  { icon: Heart, title: "Beauty and Cosmetics Brands", description: "Beauty companies use AI influencers to demonstrate products, create tutorials, and promote brand awareness." },
  { icon: Gamepad2, title: "Technology and Gaming Companies", description: "Technology brands often use AI influencers to represent futuristic innovation and digital culture." },
  { icon: Tv, title: "Entertainment and Media", description: "Media companies use AI influencers for storytelling, brand promotions, and digital entertainment content." },
];

const benefitSections = [
  { icon: Users, title: "Increased Audience Engagement", description: "AI influencers attract attention because they combine technology with creativity, making content more engaging." },
  { icon: Sparkles, title: "Innovative Brand Image", description: "Using AI influencers positions a brand as innovative and forward-thinking." },
  { icon: Layers, title: "Scalable Content Production", description: "AI tools allow brands to produce large amounts of content quickly and efficiently." },
  { icon: BarChart3, title: "Data-Driven Marketing", description: "AI influencer campaigns can be optimized using data insights to improve engagement and reach." },
  { icon: Shield, title: "Long-Term Brand Assets", description: "Unlike traditional influencer partnerships, AI influencers become long-term brand assets that businesses fully control." },
];

const processSections = [
  { num: "01", title: "Brand Strategy and Planning", description: "We begin by understanding the brand identity, target audience, and marketing goals." },
  { num: "02", title: "AI Character Design", description: "Our designers create unique virtual characters that represent the brand." },
  { num: "03", title: "Content Creation", description: "We produce high-quality images, videos, and social media content for the AI influencer." },
  { num: "04", title: "Platform Launch", description: "The AI influencer is launched on selected social media platforms with a strategic content plan." },
  { num: "05", title: "Campaign Optimization", description: "Our team continuously analyzes campaign performance and optimizes content for better engagement." },
];

const whyChooseItems = [
  { icon: Palette, label: "Creative AI character design" },
  { icon: Code2, label: "Advanced AI content generation" },
  { icon: Megaphone, label: "Strategic influencer marketing campaigns" },
  { icon: Settings, label: "Customized branding solutions" },
  { icon: Layers, label: "Ongoing marketing support" },
];

function ServiceAccordion({ section, index }: { section: typeof serviceSections[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="aif-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`aif-service-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`aif-service-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-aif-service-${index}`}
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500/15 to-violet-500/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
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
        id={`aif-service-content-${index}`}
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

export default function AiInfluencer() {
  useSEO({
    title: "AI Influencer Creation – Virtual Brand Ambassadors That Work 24/7 | Devoria Tech",
    description: "Professional AI influencer creation services by Devoria Tech. Build virtual influencers for brand promotion, social media campaigns, product marketing, and digital storytelling. Custom AI character design, content creation, and marketing strategy.",
    keywords: "AI influencer, virtual influencer, AI character design, AI influencer creation, digital marketing, AI content creation, social media influencer, brand promotion, influencer marketing, AI marketing",
    canonical: "https://devoriatech.com/services/ai-services/ai-influencer",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".aif-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-aif-hero">
        <div className="absolute inset-0 hero-gradient-bg" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-fuchsia-600/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03]">
          <div className="absolute inset-0 rounded-full border border-white/10 animate-orbit" style={{ animationDuration: "25s" }}>
            <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-fuchsia-500/40 blur-sm" />
          </div>
          <div className="absolute inset-8 rounded-full border border-white/5 animate-orbit" style={{ animationDuration: "35s", animationDirection: "reverse" }}>
            <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-violet-400/40 blur-sm" />
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
                  AI Influencer
                </span>
              </motion.div>

              <SplitText
                text="AI Influencer Creation Services for Modern Digital Marketing"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-aif-title"
              />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light">
                Devoria Tech provides professional AI influencer creation services that help businesses build unique digital personalities for marketing and brand promotion. These virtual influencers can create content, interact with audiences, and represent brands across platforms such as Instagram, TikTok, YouTube, and other social media networks.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8">
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-aif-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(192,38,211,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Start Your AI Influencer Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </span>
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }} className="mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden neon-border">
                <img loading="lazy" src={aiInfluencerHeroImg} alt="AI influencer creation services" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aif-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-aif-${i}`}>
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
          <div className="aif-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Understanding AI Influencers</span>
            <SplitText text="What is an AI Influencer" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="aif-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              An AI influencer is a digital personality created using artificial intelligence and computer-generated imagery. These virtual characters look realistic and can interact with audiences through social media content, videos, images, and marketing campaigns.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              AI influencers are designed to represent brands in a creative and engaging way. They can be customized with unique personalities, styles, and content strategies to match the target audience of a brand. Many global brands are already using AI influencers as part of their digital marketing strategies.
            </p>
          </div>
          <div className="aif-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {influencerUseCases.map((useCase, i) => (
              <div key={i} className="flex items-center gap-2.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle className="w-3.5 h-3.5 text-fuchsia-400/40 shrink-0" />
                <span className="text-[12px] text-white/30 font-light">{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aif-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Key Advantages</span>
            <SplitText text="Why Businesses Are Using AI Influencers" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="aif-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyUseReasons.map((reason, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`reason-aif-${i}`}>
                <reason.icon className="w-5 h-5 text-fuchsia-400/50 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-2">{reason.title}</h3>
                <p className="text-[11px] text-white/25 leading-relaxed font-light">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aif-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Our Services</span>
            <SplitText text="Our AI Influencer Creation Services" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="aif-fade mb-8 text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center">
            <p>Devoria Tech provides complete AI influencer development services for businesses that want to create innovative marketing strategies.</p>
          </div>
          <div className="space-y-5">
            {serviceSections.map((section, i) => (
              <ServiceAccordion key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aif-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">How It Works</span>
            <SplitText text="How AI Influencers Work" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="aif-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              AI influencers combine several advanced technologies to create realistic digital personalities. By combining these technologies, businesses can create virtual influencers that interact with audiences in a natural and engaging way.
            </p>
            <p className="text-[13px] text-white/25 leading-[1.8] font-light">
              These influencers can post social media content, respond to comments, promote products, and even collaborate with real influencers or brands.
            </p>
          </div>
          <div className="aif-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {techStack.map((tech, i) => (
              <div key={i} className="flex items-center gap-2.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle className="w-3.5 h-3.5 text-fuchsia-400/40 shrink-0" />
                <span className="text-[12px] text-white/30 font-light">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aif-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Industries</span>
            <SplitText text="Industries Using AI Influencers" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="aif-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>AI influencers are becoming popular in many industries because they offer creative marketing opportunities.</p>
          </div>
          <div className="aif-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industrySections.map((industry, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border" data-testid={`industry-aif-${i}`}>
                <div className="p-5">
                  <industry.icon className="w-5 h-5 text-fuchsia-400/50 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-1">{industry.title}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed font-light">{industry.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
          <div className="aif-fade text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto text-center mt-6">
            <p>Devoria Tech helps businesses create AI influencers tailored to their industry and target audience.</p>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aif-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Marketing Benefits</span>
            <SplitText text="Benefits of AI Influencer Marketing" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="aif-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>AI influencer marketing provides many advantages for brands that want to stay ahead in digital marketing.</p>
          </div>
          <div className="aif-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefitSections.map((benefit, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`benefit-aif-${i}`}>
                <benefit.icon className="w-5 h-5 text-fuchsia-400/50 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-[11px] text-white/25 leading-relaxed font-light">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aif-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Our Process</span>
            <SplitText text="Our AI Influencer Development Process" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="aif-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech follows a structured approach to develop successful AI influencers.</p>
          </div>
          <div className="aif-fade space-y-4 max-w-3xl mx-auto">
            {processSections.map((step, i) => (
              <div key={i} className="flex items-start gap-5 p-5 rounded-2xl neon-border bg-white/[0.01]" data-testid={`process-aif-${i}`}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500/15 to-violet-500/15 flex items-center justify-center shrink-0">
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
          <div className="aif-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="aif-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for AI Influencer Creation</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech combines creativity, technology, and marketing expertise to create powerful AI influencer solutions. Our goal is to help businesses create innovative marketing experiences that attract and engage digital audiences.
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
          <div className="aif-fade rounded-2xl neon-border p-8 bg-white/[0.01]" data-testid="aif-future">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">The Future of AI Influencers</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light max-w-2xl mx-auto">
                AI influencers represent the future of digital marketing. As artificial intelligence continues to evolve, virtual influencers will become more realistic, interactive, and influential in online communities.
              </p>
              <p className="text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto mt-3">
                Brands that adopt AI influencer marketing early will gain a competitive advantage by creating unique and memorable digital experiences. Devoria Tech helps businesses stay ahead of this trend by developing advanced AI influencer solutions designed for the future of marketing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative p-14 sm:p-20 rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/10 via-transparent to-violet-500/10" />
            <div className="absolute inset-0 border border-white/[0.06] rounded-[2rem]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-fuchsia-400/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent" />
            <div className="relative z-10">
              <SplitText text="Start Your AI Influencer Project" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>If your brand wants to create innovative marketing campaigns using AI influencers, Devoria Tech can help.</p>
                <p>Our AI influencer creation services are designed to help businesses build powerful digital personalities that promote brands, engage audiences, and drive marketing success.</p>
                <p>Contact Devoria Tech today to create your own AI influencer and transform your digital marketing strategy.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-aif-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(192,38,211,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your AI Influencer Project <ArrowRight className="w-4 h-4" />
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
