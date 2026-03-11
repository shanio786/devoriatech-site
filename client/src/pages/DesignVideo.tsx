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
  Palette, Sparkles, Video, Shield, Film,
  Users, Globe, Zap, TrendingUp, BarChart3,
  Layers, Code2, Settings,
  ShoppingCart, Monitor, Rocket, Megaphone, Camera,
  Eye, MessageSquare, Target,
} from "lucide-react";
import dvHeroImg from "@assets/design-video-hero.webp";
import dvLogoBrandingImg from "@assets/design-logo-branding.webp";
import dvMotionGraphicsImg from "@assets/design-motion-graphics.webp";
import dvVideoEditingImg from "@assets/design-video-editing.webp";
import dvCreativeProcessImg from "@assets/design-creative-process.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "300+", label: "Projects Delivered", icon: Palette },
  { value: "100+", label: "Brands Designed", icon: Sparkles },
  { value: "500+", label: "Videos Produced", icon: Video },
  { value: "95%", label: "Client Satisfaction", icon: Shield },
];

const importanceCards = [
  { icon: Eye, title: "Strong Brand Identity", description: "Consistent visual design helps businesses build a recognizable brand identity that customers remember." },
  { icon: Users, title: "Higher Audience Engagement", description: "Video and visual content attract more attention on social media platforms and websites." },
  { icon: MessageSquare, title: "Better Communication", description: "Visual storytelling allows businesses to communicate complex ideas quickly and clearly." },
  { icon: Target, title: "Increased Marketing Effectiveness", description: "Marketing campaigns that include professional visuals and videos often perform better." },
  { icon: Globe, title: "Improved Online Presence", description: "High-quality design and video content strengthen a brand's digital presence across websites and social media platforms." },
];

const accordionSections = [
  {
    title: "Logo and Branding",
    icon: Palette,
    intro: "A strong brand identity begins with a professionally designed logo and consistent visual elements. Devoria Tech helps businesses develop unique logos and complete branding systems that reflect their values and personality.",
    description: "These elements help businesses maintain consistent branding across all marketing channels.",
    items: ["Logo design", "Brand identity design", "Color palette development", "Typography selection", "Brand guidelines"],
    image: dvLogoBrandingImg,
    imageAlt: "Logo and branding design services",
  },
  {
    title: "Motion Graphics",
    icon: Film,
    intro: "Motion graphics combine animation and design to create dynamic visual content. Motion graphics are widely used in marketing videos, advertisements, presentations, and social media content.",
    description: "Devoria Tech creates professional motion graphics that help businesses explain ideas, promote products, and engage audiences effectively.",
    items: ["Animated marketing videos", "Promotional animations", "Explainer videos", "Animated social media content"],
    image: dvMotionGraphicsImg,
    imageAlt: "Motion graphics design services",
  },
  {
    title: "Video Editing",
    icon: Video,
    intro: "Video is one of the most powerful forms of digital content. Businesses use videos to promote products, educate audiences, and build brand awareness.",
    description: "Devoria Tech provides professional video editing services that transform raw footage into polished and engaging video content.",
    items: ["Promotional video editing", "Social media video editing", "YouTube video editing", "Advertisement video production", "Short-form video content"],
    image: dvVideoEditingImg,
    imageAlt: "Professional video editing services",
  },
];

const industrySections = [
  { icon: ShoppingCart, title: "E-Commerce", description: "Online stores use visual content to promote products and create engaging marketing campaigns." },
  { icon: Monitor, title: "Technology Companies", description: "Tech companies use motion graphics and videos to explain products and demonstrate features." },
  { icon: Rocket, title: "Startups and New Brands", description: "Startups use branding and visual identity to establish their presence in the market." },
  { icon: Megaphone, title: "Marketing Agencies", description: "Agencies use creative visuals and videos to deliver effective campaigns for their clients." },
  { icon: Camera, title: "Content Creators and Influencers", description: "Influencers rely on video editing and motion graphics to produce engaging social media content." },
];

const processSections = [
  { num: "01", title: "Brand Research and Analysis", description: "We begin by understanding the brand identity, target audience, and marketing goals." },
  { num: "02", title: "Creative Concept Development", description: "Our designers develop creative concepts that align with the brand's message and visual style." },
  { num: "03", title: "Design and Production", description: "Using modern design tools, we create high-quality visual content and videos." },
  { num: "04", title: "Feedback and Revisions", description: "Clients review the designs and provide feedback for improvements." },
  { num: "05", title: "Final Delivery", description: "The final designs and videos are delivered in formats suitable for websites, social media, and marketing campaigns." },
];

const benefitSections = [
  { icon: Sparkles, title: "Stronger Brand Recognition", description: "Professional branding helps businesses stand out and become recognizable." },
  { icon: Users, title: "Better Audience Engagement", description: "Visual and video content attract attention and encourage interaction." },
  { icon: TrendingUp, title: "More Effective Marketing Campaigns", description: "Marketing campaigns that include professional visuals often perform better." },
  { icon: Zap, title: "Improved Customer Experience", description: "High-quality visuals create a more professional and trustworthy brand image." },
  { icon: Layers, title: "Long-Term Brand Value", description: "Strong branding and creative content help businesses build long-term brand value." },
];

const whyChooseItems = [
  { icon: Palette, label: "Professional branding solutions" },
  { icon: Film, label: "Creative motion graphics design" },
  { icon: Video, label: "High-quality video editing" },
  { icon: Settings, label: "Modern design tools and techniques" },
  { icon: Code2, label: "Customized creative strategies" },
];

function AccordionSection({ section, index }: { section: typeof accordionSections[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="dv-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`dv-service-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`dv-service-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-dv-service-${index}`}
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/15 to-purple-500/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
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
        id={`dv-service-content-${index}`}
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ maxHeight: isOpen ? "5000px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-4">
          <div className="relative rounded-2xl overflow-hidden neon-border">
            <img src={section.image} alt={section.imageAlt} className="w-full h-auto object-cover aspect-video" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
          </div>
          <p className="text-[13px] text-white/30 leading-[1.8] font-light">{section.intro}</p>
          <p className="text-[13px] text-white/25 leading-[1.8] font-light">{section.description}</p>
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

export default function DesignVideo() {
  useSEO({
    title: "Graphic Design & Video Editing for Brands That Want to Stand Out | Devoria Tech",
    description: "Devoria Tech provides professional design and video services including logo design, branding, motion graphics, and video editing. Build a strong visual brand identity with our creative team.",
    keywords: "design services, video services, logo design, branding, motion graphics, video editing, visual content, brand identity, creative design, digital branding",
    canonical: "https://devoriatech.com/services/design-video",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".dv-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-dv-hero">
        <div className="absolute inset-0 hero-gradient-bg" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03]">
          <div className="absolute inset-0 rounded-full border border-white/10 animate-orbit" style={{ animationDuration: "25s" }}>
            <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-violet-500/40 blur-sm" />
          </div>
          <div className="absolute inset-8 rounded-full border border-white/5 animate-orbit" style={{ animationDuration: "35s", animationDirection: "reverse" }}>
            <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-purple-400/40 blur-sm" />
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
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] text-violet-400 mb-6 tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  Design & Video
                </span>
              </motion.div>

              <SplitText
                text="Design and Video Services for Modern Digital Brands"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-dv-title"
              />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light">
                Visual content plays a critical role in building strong brands and engaging audiences in today's digital world. Devoria Tech provides professional design and video services designed to help businesses build strong visual brands and create engaging multimedia content.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8">
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-dv-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(139,92,246,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Start Your Creative Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </span>
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }} className="mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden neon-border">
                <img loading="lazy" src={dvHeroImg} alt="Design and video services for modern digital brands" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dv-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-dv-${i}`}>
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
          <div className="dv-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Why It Matters</span>
            <SplitText text="Importance of Design and Video" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="dv-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Design and video content have become essential components of successful marketing strategies. Visual content is processed faster by audiences and often generates higher engagement compared to text-only content.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Professional design and video production help businesses achieve several important marketing goals. In a competitive digital marketplace, businesses need more than just text-based marketing.
            </p>
          </div>
          <div className="dv-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {importanceCards.map((card, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`importance-dv-${i}`}>
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
          <div className="dv-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Our Services</span>
            <SplitText text="Our Design and Video Services" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="dv-fade mb-8 text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center">
            <p>Devoria Tech offers a wide range of creative services designed to support modern digital marketing and branding needs.</p>
          </div>
          <div className="space-y-5">
            {accordionSections.map((section, i) => (
              <AccordionSection key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dv-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Our Work</span>
            <SplitText text="Our Creative Portfolio" as="h2" className="mt-4 text-2xl sm:text-3xl font-bold text-white tracking-tight" />
          </div>
          <div className="dv-fade relative rounded-2xl overflow-hidden neon-border">
            <img loading="lazy" src={dvCreativeProcessImg} alt="Our creative portfolio and design process" className="w-full h-auto object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-l from-background/30 to-transparent" />
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dv-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Industries We Serve</span>
            <SplitText text="Design and Video for Different Industries" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="dv-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Design and video services are valuable for businesses across many industries.</p>
          </div>
          <div className="dv-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industrySections.map((industry, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border" data-testid={`industry-dv-${i}`}>
                <div className="p-5">
                  <industry.icon className="w-5 h-5 text-violet-400/50 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-1">{industry.title}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed font-light">{industry.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
          <div className="dv-fade text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto text-center mt-6">
            <p>Devoria Tech creates customized visual content strategies tailored to each industry.</p>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dv-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Our Process</span>
            <SplitText text="Our Creative Design Process" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="dv-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech follows a structured process to deliver high-quality design and video content.</p>
          </div>
          <div className="dv-fade space-y-4 max-w-3xl mx-auto">
            {processSections.map((step, i) => (
              <div key={i} className="flex items-start gap-5 p-5 rounded-2xl neon-border bg-white/[0.01]" data-testid={`process-dv-${i}`}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/15 to-purple-500/15 flex items-center justify-center shrink-0">
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

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dv-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-400">Key Benefits</span>
            <SplitText text="Benefits of Professional Design and Video" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="dv-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Businesses that invest in professional design and video services often achieve better marketing results.</p>
          </div>
          <div className="dv-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefitSections.map((benefit, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`benefit-dv-${i}`}>
                <benefit.icon className="w-5 h-5 text-violet-400/50 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-[11px] text-white/25 leading-relaxed font-light">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dv-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="dv-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for Design and Video</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech combines creative design expertise with modern digital tools to deliver powerful visual content. Our goal is to help businesses create compelling visual content that strengthens their brand and improves marketing results.
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
          <div className="dv-fade rounded-2xl neon-border p-8 bg-white/[0.01]" data-testid="dv-future">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">The Future of Visual Content</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light max-w-2xl mx-auto">
                Visual content continues to grow as one of the most important elements of digital marketing. Social media platforms, websites, and online advertising rely heavily on engaging visuals and videos.
              </p>
              <p className="text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto mt-3">
                Businesses that invest in professional design and video production gain a competitive advantage by capturing audience attention and communicating their message effectively. Devoria Tech helps businesses stay ahead by creating modern visual content designed for today's digital platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative p-14 sm:p-20 rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-purple-500/10" />
            <div className="absolute inset-0 border border-white/[0.06] rounded-[2rem]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent" />
            <div className="relative z-10">
              <SplitText text="Start Your Design and Video Project" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>If your business wants to build a strong brand identity or create engaging video content, Devoria Tech can help.</p>
                <p>Our design and video services are designed to help businesses communicate their message clearly, attract audiences, and strengthen their digital presence.</p>
                <p>Contact Devoria Tech today to start creating professional designs and videos that support your business growth.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-dv-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(139,92,246,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your Design and Video Project <ArrowRight className="w-4 h-4" />
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