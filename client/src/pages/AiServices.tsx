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
  Bot, Brain, MessageSquare, FileText, Workflow,
  Shield, Zap, Users, BarChart3, Code2,
  Layers, Camera, Sparkles, TrendingUp,
  ShoppingCart, Megaphone, Landmark, Heart, Rocket,
  Settings,
} from "lucide-react";
import aiHeroImg from "@assets/ai-services-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "30+", label: "AI Solutions Deployed", icon: Bot },
  { value: "500K+", label: "AI Interactions Daily", icon: MessageSquare },
  { value: "95%", label: "Accuracy Rate", icon: Brain },
  { value: "10x", label: "Efficiency Boost", icon: Zap },
];

const aiExamples = [
  "Automated customer support chatbots",
  "AI-generated marketing content",
  "Intelligent data analysis tools",
  "Automated workflow systems",
  "AI-generated images and visuals",
];

const aiServiceSections = [
  {
    title: "AI Influencer Creation",
    icon: Sparkles,
    intro: "AI influencers are virtual personalities created using artificial intelligence technology. These digital influencers can promote brands, interact with audiences, and create engaging social media content.",
    description: "Businesses are increasingly using AI influencers to build unique marketing campaigns and reach audiences on platforms like Instagram, TikTok, and YouTube. Devoria Tech helps brands design and develop realistic AI influencers that represent their brand identity and engage with online audiences.",
    items: ["Brand representation on social media", "Unique marketing campaign creation", "Audience engagement strategies", "Cross-platform content production"],
  },
  {
    title: "AI Model Photoshoot",
    icon: Camera,
    intro: "AI model photoshoots allow businesses to create professional product images without traditional photography sessions. Using artificial intelligence, we generate realistic models and product visuals that can be used for marketing campaigns.",
    description: "This technology allows businesses to produce high-quality marketing visuals quickly and at a lower cost.",
    items: ["Fashion brand product shoots", "E-commerce store imagery", "Product marketing campaigns", "Social media advertising visuals"],
  },
  {
    title: "AI Chatbot Development",
    icon: MessageSquare,
    intro: "AI chatbots are intelligent systems that can communicate with users and provide automated customer support. These chatbots use natural language processing to understand user questions and provide relevant responses.",
    description: "Devoria Tech develops smart AI chatbots that can be integrated into websites, mobile apps, and messaging platforms.",
    items: ["24/7 customer support automation", "FAQ response systems", "Purchase guidance chatbots", "Website engagement improvement"],
  },
  {
    title: "AI Content Creation",
    icon: FileText,
    intro: "Content creation is an important part of digital marketing, but producing high-quality content consistently can be challenging. AI content creation tools help businesses generate written content, marketing copy, and social media posts efficiently.",
    description: "These tools help businesses save time while maintaining high-quality content production.",
    items: ["Blog article generation", "Product description writing", "Marketing campaign copy", "Social media content creation", "Website copywriting"],
  },
  {
    title: "AI Automation Solutions",
    icon: Workflow,
    intro: "AI automation allows businesses to automate repetitive tasks and improve operational efficiency. Automation systems can handle workflows, process data, and perform tasks without manual intervention.",
    description: "Devoria Tech builds intelligent automation systems that help businesses improve productivity and reduce operational costs.",
    items: ["Business workflow automation", "Marketing automation systems", "Customer service automation", "Data processing and analysis"],
  },
];

const benefitSections = [
  {
    icon: Zap,
    title: "Increased Productivity",
    description: "AI automation reduces manual tasks and allows employees to focus on higher-value work.",
  },
  {
    icon: Users,
    title: "Better Customer Experience",
    description: "AI-powered chatbots and personalized systems improve customer interactions and provide faster responses.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Decision Making",
    description: "AI systems analyze large amounts of data and provide valuable insights that help businesses make better strategic decisions.",
  },
  {
    icon: TrendingUp,
    title: "Cost Efficiency",
    description: "Automation reduces operational costs by minimizing the need for repetitive manual tasks.",
  },
  {
    icon: Layers,
    title: "Scalable Business Operations",
    description: "AI solutions allow businesses to scale operations without significantly increasing workforce requirements.",
  },
];

const industrySections = [
  { icon: ShoppingCart, title: "E-Commerce Businesses", description: "Online stores use AI for product recommendations, customer support chatbots, and marketing automation." },
  { icon: Megaphone, title: "Digital Marketing Agencies", description: "Marketing companies use AI tools for content creation, audience targeting, and campaign optimization." },
  { icon: Landmark, title: "Financial Services", description: "Financial institutions use AI for fraud detection, risk analysis, and automated customer support." },
  { icon: Heart, title: "Healthcare Industry", description: "Healthcare organizations use AI systems for medical data analysis, patient management, and predictive healthcare solutions." },
  { icon: Rocket, title: "Technology Startups", description: "Startups use AI platforms to build innovative digital products and scalable technology solutions." },
];

const processSections = [
  { num: "01", title: "Business Requirement Analysis", description: "We start by understanding the business challenges and identifying how AI can provide the best solution." },
  { num: "02", title: "AI Strategy and Planning", description: "Our experts design an AI implementation strategy that aligns with business goals." },
  { num: "03", title: "Model Development and Integration", description: "We develop AI models and integrate them into digital platforms such as websites, applications, and business systems." },
  { num: "04", title: "Testing and Optimization", description: "Our team tests AI systems extensively to ensure accuracy, reliability, and performance." },
  { num: "05", title: "Deployment and Continuous Improvement", description: "After deployment, we monitor system performance and continuously improve the AI models." },
];

const whyChooseItems = [
  { icon: Code2, label: "Experienced AI developers and engineers" },
  { icon: Bot, label: "Innovative AI-powered solutions" },
  { icon: Shield, label: "Scalable and secure technology systems" },
  { icon: Settings, label: "Customized AI strategies for businesses" },
  { icon: Layers, label: "Ongoing technical support and optimization" },
];

function AiServiceSection({ section, index }: { section: typeof aiServiceSections[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="ai-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`ai-service-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`ai-service-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-ai-service-${index}`}
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500/15 to-pink-500/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
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
        id={`ai-service-content-${index}`}
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ maxHeight: isOpen ? "5000px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-4">
          <p className="text-[13px] text-white/30 leading-[1.8] font-light">{section.intro}</p>
          <p className="text-[13px] text-white/25 leading-[1.8] font-light">{section.description}</p>
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

export default function AiServices() {
  useSEO({
    title: "AI Services – Chatbots, Automation & AI Content for Your Business | Devoria Tech",
    description: "Put AI to work for your business. We build chatbots, create AI-generated content, develop virtual influencers, and automate repetitive tasks to save you time and money.",
    keywords: "AI services, AI solutions, artificial intelligence, AI chatbot, AI influencer, AI model photoshoot, AI content creation, AI automation, machine learning, business AI, intelligent automation",
    canonical: "https://devoriatech.com/services/ai-services",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".ai-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-ai-hero">
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
          <Link href="/services">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-cyan-400/60 hover:text-cyan-400 font-medium tracking-wider uppercase transition-colors duration-300 mb-8 cursor-pointer" data-testid="link-back-services">
              <ArrowRight className="w-3 h-3 rotate-180" /> Back to Services
            </span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] text-fuchsia-400 mb-6 tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
                  AI Services
                </span>
              </motion.div>

              <SplitText
                text="AI Services and AI Solutions for Modern Businesses"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-ai-title"
              />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light">
                Artificial Intelligence is transforming the way businesses operate, market their products, and interact with customers. Devoria Tech provides advanced AI services and AI solutions designed to help businesses leverage the power of artificial intelligence.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8">
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-ai-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-pink-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-fuchsia-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(192,38,211,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Start Your AI Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </span>
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }} className="mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden neon-border">
                <img loading="lazy" src={aiHeroImg} alt="AI services and artificial intelligence solutions" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ai-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-ai-${i}`}>
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
          <div className="ai-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Understanding AI</span>
            <SplitText text="What Are AI Services" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="ai-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              AI services refer to digital solutions powered by artificial intelligence technologies that allow systems to analyze data, automate processes, and perform tasks that normally require human intelligence.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              These technologies include machine learning, natural language processing, computer vision, and intelligent automation. Businesses use AI services to improve efficiency, enhance decision-making, and deliver better user experiences. Devoria Tech helps businesses integrate these AI technologies into their operations through powerful and scalable AI solutions.
            </p>
          </div>
          <div className="ai-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {aiExamples.map((example, i) => (
              <div key={i} className="flex items-center gap-2.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle className="w-3.5 h-3.5 text-fuchsia-400/40 shrink-0" />
                <span className="text-[12px] text-white/30 font-light">{example}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ai-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Our AI Services</span>
            <SplitText text="Advanced AI Solutions We Offer" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="ai-fade mb-8 text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center">
            <p>Devoria Tech offers a range of advanced AI services designed to help businesses use artificial intelligence effectively.</p>
          </div>
          <div className="space-y-5">
            {aiServiceSections.map((section, i) => (
              <AiServiceSection key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ai-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Key Benefits</span>
            <SplitText text="Benefits of AI Solutions for Businesses" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="ai-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Artificial intelligence offers numerous benefits that help businesses improve performance and stay competitive.</p>
          </div>
          <div className="ai-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefitSections.map((benefit, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`benefit-ai-${i}`}>
                <benefit.icon className="w-5 h-5 text-fuchsia-400/50 mb-3" />
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
          <div className="ai-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Industries We Serve</span>
            <SplitText text="AI Solutions for Different Industries" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="ai-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Artificial intelligence is transforming many industries by improving efficiency and creating new digital capabilities.</p>
          </div>
          <div className="ai-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industrySections.map((industry, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border" data-testid={`industry-ai-${i}`}>
                <div className="p-5">
                  <industry.icon className="w-5 h-5 text-fuchsia-400/50 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-1">{industry.title}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed font-light">{industry.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
          <div className="ai-fade text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto text-center mt-6">
            <p>Devoria Tech develops AI solutions tailored to the specific needs of different industries.</p>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ai-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Our Process</span>
            <SplitText text="Our AI Development Process" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="ai-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech follows a structured process to build reliable and scalable AI solutions.</p>
          </div>
          <div className="ai-fade space-y-4 max-w-3xl mx-auto">
            {processSections.map((step, i) => (
              <div key={i} className="flex items-start gap-5 p-5 rounded-2xl neon-border bg-white/[0.01]" data-testid={`process-ai-${i}`}>
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
          <div className="ai-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="ai-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for AI Services</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech is a modern digital agency specializing in advanced technology solutions including artificial intelligence. Our mission is to help businesses adopt artificial intelligence and transform their operations with smart digital technologies.
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
          <div className="ai-fade rounded-2xl neon-border p-8 bg-white/[0.01]" data-testid="ai-future">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">Future of AI in Business</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light max-w-2xl mx-auto">
                Artificial intelligence is rapidly becoming one of the most important technologies for modern businesses. Companies that adopt AI solutions early gain a competitive advantage by improving efficiency, enhancing customer experiences, and automating complex processes.
              </p>
              <p className="text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto mt-3">
                The future of business technology will increasingly rely on AI-powered systems that analyze data, automate workflows, and support decision-making. Devoria Tech helps businesses prepare for this future by developing intelligent AI solutions designed for long-term growth.
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
              <SplitText text="Start Your AI Project with Devoria Tech" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>If you want to use artificial intelligence to improve your business operations, marketing strategies, or customer experiences, Devoria Tech can help.</p>
                <p>Our AI services are designed to create powerful digital solutions that help businesses grow, innovate, and succeed in the modern technology landscape.</p>
                <p>Contact Devoria Tech today to start building intelligent AI solutions that transform your business.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-ai-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-pink-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(192,38,211,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your AI Project <ArrowRight className="w-4 h-4" />
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
