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
  FileText, PenTool, Search, Zap, TrendingUp,
  Shield, Layers, Users, BarChart3, Globe,
  Settings, Code2, BookOpen, Sparkles,
  ShoppingCart, Megaphone, Cpu, GraduationCap, Building2,
} from "lucide-react";
import aiContentHeroImg from "@assets/ai-content-creation-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "10K+", label: "Articles Generated", icon: FileText },
  { value: "500+", label: "Clients Served", icon: Users },
  { value: "3x", label: "Faster Production", icon: Zap },
  { value: "100%", label: "SEO Optimized", icon: Search },
];

const contentTypes = [
  "Blog articles",
  "Website content",
  "Marketing copy",
  "Product descriptions",
  "Social media captions",
  "Email marketing campaigns",
];

const benefitSections = [
  { icon: Zap, title: "Faster Content Production", description: "AI tools allow businesses to generate content quickly, helping marketing teams produce articles and marketing materials more efficiently." },
  { icon: Layers, title: "Consistent Content Strategy", description: "Maintaining consistent content publishing is important for digital marketing success. AI content tools help businesses produce regular blog posts and marketing content." },
  { icon: Search, title: "SEO Optimization", description: "AI content tools can help generate SEO-friendly content that includes relevant keywords and optimized structure." },
  { icon: TrendingUp, title: "Cost-Effective Marketing", description: "Creating content manually can require large teams of writers. AI technology allows businesses to reduce costs while maintaining high content output." },
  { icon: BarChart3, title: "Scalable Content Marketing", description: "AI systems allow businesses to produce large volumes of content for websites, blogs, and social media platforms." },
];

const contentServiceSections = [
  {
    title: "Blog Article Writing",
    icon: BookOpen,
    intro: "Blog content helps businesses attract website traffic and improve search engine rankings. We create SEO-optimized blog articles designed to engage readers and rank well in search results.",
    items: ["SEO-optimized articles", "Engaging reader content", "Search ranking improvement", "Topic authority building"],
  },
  {
    title: "Website Content Writing",
    icon: Globe,
    intro: "Professional website content helps businesses communicate their services clearly and effectively. We generate AI-assisted website copy designed to convert visitors into customers.",
    items: ["Service page content", "Landing page copy", "About page writing", "Conversion-focused messaging"],
  },
  {
    title: "Product Description Writing",
    icon: ShoppingCart,
    intro: "E-commerce stores require compelling product descriptions that highlight features and benefits. Our AI tools generate optimized product descriptions designed to improve sales.",
    items: ["Feature highlighting", "Benefit-focused writing", "E-commerce optimization", "Conversion-driven descriptions"],
  },
  {
    title: "Social Media Content",
    icon: Users,
    intro: "Social media platforms require engaging and creative content. We create captions, posts, and marketing messages designed to attract audience engagement.",
    items: ["Platform-specific captions", "Engagement-focused posts", "Creative marketing messages", "Audience-targeted content"],
  },
  {
    title: "Marketing and Advertising Copy",
    icon: Megaphone,
    intro: "AI tools can generate persuasive marketing messages used for advertisements, landing pages, and promotional campaigns.",
    items: ["Advertisement copywriting", "Landing page messaging", "Promotional campaign copy", "Persuasive marketing content"],
  },
];

const seoItems = [
  "Keyword optimization",
  "Structured headings",
  "Optimized content formatting",
  "Relevant topic coverage",
];

const industrySections = [
  { icon: ShoppingCart, title: "E-Commerce Businesses", description: "Online stores use AI-generated product descriptions, marketing copy, and blog content to attract customers." },
  { icon: Megaphone, title: "Digital Marketing Agencies", description: "Marketing agencies use AI tools to generate blog articles, advertising copy, and social media content for clients." },
  { icon: Cpu, title: "Technology Companies", description: "Tech companies use AI-generated content to explain products, publish industry insights, and create technical documentation." },
  { icon: GraduationCap, title: "Education Platforms", description: "Educational organizations use AI content tools to produce learning materials, course descriptions, and blog posts." },
  { icon: Building2, title: "Corporate Businesses", description: "Corporate organizations use AI-generated content for internal documentation, reports, and marketing communications." },
];

const featureSections = [
  { icon: Search, title: "SEO-Optimized Content", description: "Our content includes keyword optimization and structured formatting to improve search engine rankings." },
  { icon: PenTool, title: "Human-Reviewed Content", description: "Although AI generates the initial content, our team reviews and improves the content to ensure quality and accuracy." },
  { icon: Globe, title: "Multi-Platform Content", description: "We create content suitable for websites, blogs, social media platforms, and marketing campaigns." },
  { icon: Sparkles, title: "Brand Voice Customization", description: "Content is customized to match the brand voice, tone, and communication style of each business." },
  { icon: Layers, title: "High-Quality Content Structure", description: "Our content follows professional structure with headings, clear sections, and easy readability." },
];

const processSections = [
  { num: "01", title: "Content Strategy Planning", description: "We analyze the business goals, target audience, and marketing strategy." },
  { num: "02", title: "Keyword Research and Topic Selection", description: "Our team identifies relevant keywords and content topics that attract search traffic." },
  { num: "03", title: "AI Content Generation", description: "Using advanced AI tools, we generate structured content based on the selected topics." },
  { num: "04", title: "Content Editing and Optimization", description: "Our team reviews the content to ensure quality, accuracy, and SEO optimization." },
  { num: "05", title: "Content Delivery and Publishing", description: "The final content is delivered and optimized for publishing on websites or marketing platforms." },
];

const whyChooseItems = [
  { icon: Code2, label: "Advanced AI content generation tools" },
  { icon: Search, label: "SEO-optimized content strategies" },
  { icon: FileText, label: "High-quality marketing content" },
  { icon: Layers, label: "Scalable content production" },
  { icon: Settings, label: "Customized content solutions" },
];

function ContentAccordion({ section, index }: { section: typeof contentServiceSections[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="acc-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`acc-service-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`acc-service-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-acc-service-${index}`}
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500/15 to-magenta-500/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
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
        id={`acc-service-content-${index}`}
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

export default function AiContentCreation() {
  useSEO({
    title: "AI Content Creation – Blog Posts, Marketing Copy & More | Devoria Tech",
    description: "Professional AI content creation services by Devoria Tech. Generate SEO-optimized blog articles, website content, product descriptions, social media posts, and marketing copy. Scalable, high-quality AI-powered content solutions.",
    keywords: "AI content creation, AI writing, SEO content, blog writing, product descriptions, social media content, marketing copy, AI content generation, digital marketing content, content strategy",
    canonical: "https://devoriatech.com/services/ai-services/ai-content-creation",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".acc-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-acc-hero">
        <div className="absolute inset-0 hero-gradient-bg" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-fuchsia-600/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-pink-500/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03]">
          <div className="absolute inset-0 rounded-full border border-white/10 animate-orbit" style={{ animationDuration: "25s" }}>
            <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-fuchsia-500/40 blur-sm" />
          </div>
          <div className="absolute inset-8 rounded-full border border-white/5 animate-orbit" style={{ animationDuration: "35s", animationDirection: "reverse" }}>
            <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-pink-400/40 blur-sm" />
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
                  AI Content
                </span>
              </motion.div>

              <SplitText
                text="AI Content Creation Services for Digital Marketing and Business Growth"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-acc-title"
              />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light">
                Devoria Tech provides professional AI content creation services designed to help businesses produce high-quality digital content quickly and efficiently. Using advanced artificial intelligence technologies, we help companies generate marketing content, blog articles, website copy, product descriptions, and social media posts.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8">
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-acc-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-pink-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-fuchsia-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(192,38,211,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Start Your Content Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </span>
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }} className="mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden neon-border">
                <img loading="lazy" src={aiContentHeroImg} alt="AI content creation services" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="acc-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-acc-${i}`}>
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
          <div className="acc-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Understanding AI Content</span>
            <SplitText text="What is AI Content Creation" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="acc-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              AI content creation refers to the use of artificial intelligence technologies to generate written content, marketing copy, and digital media automatically. AI systems analyze data, language patterns, and user behavior to produce relevant and engaging content.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              AI-powered content tools help businesses create content faster while maintaining consistency across digital platforms. However, successful AI content creation requires proper strategy and optimization. Devoria Tech ensures that AI-generated content is structured, engaging, and optimized for search engines.
            </p>
          </div>
          <div className="acc-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {contentTypes.map((type, i) => (
              <div key={i} className="flex items-center gap-2.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle className="w-3.5 h-3.5 text-fuchsia-400/40 shrink-0" />
                <span className="text-[12px] text-white/30 font-light">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="acc-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Key Benefits</span>
            <SplitText text="Benefits of AI Content Creation for Businesses" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="acc-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>AI content technology provides several advantages that help businesses improve their marketing efforts.</p>
          </div>
          <div className="acc-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefitSections.map((benefit, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`benefit-acc-${i}`}>
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
          <div className="acc-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Content Services</span>
            <SplitText text="Types of AI Content We Create" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="acc-fade mb-8 text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center">
            <p>Devoria Tech provides AI-powered content creation services for multiple types of digital marketing content.</p>
          </div>
          <div className="space-y-5">
            {contentServiceSections.map((section, i) => (
              <ContentAccordion key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="acc-fade rounded-2xl neon-border p-8 bg-white/[0.01]" data-testid="acc-seo">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">AI Content Creation for SEO</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Search engine optimization (SEO) is one of the most important benefits of AI content creation. High-quality content helps websites rank higher in search engine results and attract organic traffic. By combining AI technology with SEO strategies, we help businesses improve their search visibility and online presence.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
              {seoItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <CheckCircle className="w-3.5 h-3.5 text-fuchsia-400/40 shrink-0" />
                  <span className="text-[12px] text-white/30 font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="acc-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Industries</span>
            <SplitText text="AI Content Creation for Different Industries" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="acc-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>AI-powered content creation is useful for businesses in many industries.</p>
          </div>
          <div className="acc-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industrySections.map((industry, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border" data-testid={`industry-acc-${i}`}>
                <div className="p-5">
                  <industry.icon className="w-5 h-5 text-fuchsia-400/50 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-1">{industry.title}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed font-light">{industry.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
          <div className="acc-fade text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto text-center mt-6">
            <p>Devoria Tech develops industry-specific content strategies tailored to business goals.</p>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="acc-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Service Features</span>
            <SplitText text="Features of Our AI Content Creation Services" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="acc-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech provides advanced AI content solutions designed for modern digital marketing needs.</p>
          </div>
          <div className="acc-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureSections.map((feature, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`feature-acc-${i}`}>
                <feature.icon className="w-5 h-5 text-fuchsia-400/50 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-[11px] text-white/25 leading-relaxed font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="acc-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Our Process</span>
            <SplitText text="Our AI Content Creation Process" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="acc-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech follows a structured process to deliver high-quality content.</p>
          </div>
          <div className="acc-fade space-y-4 max-w-3xl mx-auto">
            {processSections.map((step, i) => (
              <div key={i} className="flex items-start gap-5 p-5 rounded-2xl neon-border bg-white/[0.01]" data-testid={`process-acc-${i}`}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500/15 to-pink-500/15 flex items-center justify-center shrink-0">
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
          <div className="acc-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="acc-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for AI Content Creation</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech combines artificial intelligence technology with professional digital marketing expertise to deliver high-quality content solutions. Our goal is to help businesses create engaging digital content that drives traffic, improves visibility, and supports marketing success.
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
          <div className="acc-fade rounded-2xl neon-border p-8 bg-white/[0.01]" data-testid="acc-future">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">The Future of AI Content Marketing</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light max-w-2xl mx-auto">
                Artificial intelligence is rapidly transforming the world of digital marketing. Businesses are increasingly using AI tools to generate content, analyze audience behavior, and optimize marketing strategies.
              </p>
              <p className="text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto mt-3">
                As AI technology continues to evolve, content creation will become faster, smarter, and more personalized. Businesses that adopt AI-powered content strategies will gain a competitive advantage in digital marketing. Devoria Tech helps businesses stay ahead by providing advanced AI content creation solutions that support long-term marketing success.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative p-14 sm:p-20 rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/10 via-transparent to-pink-500/10" />
            <div className="absolute inset-0 border border-white/[0.06] rounded-[2rem]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-fuchsia-400/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-pink-400/20 to-transparent" />
            <div className="relative z-10">
              <SplitText text="Start Your AI Content Creation Project" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>If your business needs high-quality content for marketing, SEO, and digital branding, Devoria Tech can help.</p>
                <p>Our AI content creation services allow businesses to produce engaging and optimized content for websites, blogs, and social media platforms.</p>
                <p>Contact Devoria Tech today to create powerful AI-driven content that helps your business grow online.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-acc-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-pink-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(192,38,211,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your Content Project <ArrowRight className="w-4 h-4" />
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
