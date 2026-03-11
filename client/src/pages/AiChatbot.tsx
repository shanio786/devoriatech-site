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
  MessageSquare, Bot, Brain, Zap, Shield,
  Users, BarChart3, Clock, TrendingUp, Layers,
  Globe, Settings, Code2, Headphones, Database,
  ShoppingCart, Heart, Landmark, Plane, GraduationCap,
} from "lucide-react";
import aiChatbotHeroImg from "@assets/ai-chatbot-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "100+", label: "Chatbots Deployed", icon: Bot },
  { value: "24/7", label: "Customer Support", icon: Clock },
  { value: "95%", label: "Resolution Rate", icon: Brain },
  { value: "50%", label: "Cost Reduction", icon: TrendingUp },
];

const chatbotUseCases = [
  "Customer support automation",
  "Answering frequently asked questions",
  "Assisting customers with purchases",
  "Booking appointments",
  "Providing product information",
];

const benefitSections = [
  { icon: Clock, title: "24/7 Customer Support", description: "AI chatbots allow businesses to provide customer support at any time of the day. Customers can receive assistance even outside business hours." },
  { icon: Zap, title: "Faster Response Times", description: "Customers expect quick responses when they contact a business online. AI chatbots can answer questions instantly, improving customer satisfaction." },
  { icon: TrendingUp, title: "Reduced Support Costs", description: "Automating customer support reduces the need for large support teams. Businesses can handle large volumes of inquiries without increasing operational costs." },
  { icon: Users, title: "Improved Customer Experience", description: "AI chatbots provide fast and consistent responses that improve the overall user experience." },
  { icon: BarChart3, title: "Lead Generation and Sales Assistance", description: "Chatbots can guide visitors through product information, recommend services, and collect contact information for sales teams." },
];

const chatbotTypes = [
  {
    title: "Website Chatbots",
    icon: Globe,
    intro: "Website chatbots help businesses interact with visitors in real time. These chatbots answer questions, provide product details, and guide users through website pages.",
    items: ["Real-time visitor interaction", "Product detail assistance", "Page navigation guidance", "Lead capture forms"],
  },
  {
    title: "Customer Support Chatbots",
    icon: Headphones,
    intro: "Customer support chatbots handle common inquiries such as product information, order tracking, and troubleshooting assistance.",
    items: ["Product inquiry handling", "Order tracking support", "Troubleshooting assistance", "FAQ automation"],
  },
  {
    title: "E-commerce Chatbots",
    icon: ShoppingCart,
    intro: "Online stores use AI chatbots to assist customers during shopping. These chatbots can recommend products, answer questions, and help users complete purchases.",
    items: ["Product recommendations", "Purchase assistance", "Shopping cart support", "Order status updates"],
  },
  {
    title: "Social Media Chatbots",
    icon: MessageSquare,
    intro: "Social media chatbots operate on platforms such as Facebook Messenger, Instagram, and WhatsApp to communicate with customers and provide automated responses.",
    items: ["Facebook Messenger integration", "Instagram DM automation", "WhatsApp business support", "Cross-platform messaging"],
  },
  {
    title: "AI Sales Chatbots",
    icon: TrendingUp,
    intro: "Sales chatbots help businesses capture leads and convert visitors into customers by providing product recommendations and guiding users through purchasing decisions.",
    items: ["Lead capture automation", "Product recommendation engine", "Purchase decision guidance", "Sales funnel optimization"],
  },
];

const featureSections = [
  { icon: Brain, title: "Natural Language Processing", description: "Our chatbots use advanced natural language processing technology to understand user questions and provide relevant responses." },
  { icon: Globe, title: "Multi-Platform Integration", description: "AI chatbots can be integrated into websites, mobile applications, and messaging platforms to provide seamless communication across different channels." },
  { icon: Layers, title: "Smart Conversation Flows", description: "Our chatbots are designed with intelligent conversation flows that guide users toward solutions quickly." },
  { icon: Database, title: "Data Collection and Analytics", description: "Chatbots collect valuable customer interaction data that businesses can use to improve services and marketing strategies." },
  { icon: Settings, title: "Customizable Chatbot Behavior", description: "Businesses can customize chatbot responses, tone of communication, and conversation flows according to brand identity." },
];

const industrySections = [
  { icon: ShoppingCart, title: "E-Commerce Businesses", description: "Online stores use AI chatbots to answer product questions, recommend items, and assist customers during the purchasing process." },
  { icon: Heart, title: "Healthcare Organizations", description: "Healthcare providers use chatbots for appointment scheduling, patient support, and providing medical information." },
  { icon: Landmark, title: "Financial Services", description: "Banks and financial companies use chatbots to assist customers with account inquiries, transaction information, and financial services." },
  { icon: Plane, title: "Travel and Hospitality", description: "Hotels and travel agencies use chatbots for booking assistance, travel information, and customer service." },
  { icon: GraduationCap, title: "Educational Institutions", description: "Educational platforms use AI chatbots to assist students with course information, enrollment processes, and learning resources." },
];

const processSections = [
  { num: "01", title: "Business Requirement Analysis", description: "We begin by understanding the communication needs of the business and identifying key areas where automation can help." },
  { num: "02", title: "Chatbot Strategy Design", description: "Our team designs conversation flows and chatbot behavior that align with business goals and customer needs." },
  { num: "03", title: "Chatbot Development", description: "Using advanced AI technologies, we develop chatbots that can understand and respond to user queries effectively." },
  { num: "04", title: "Testing and Optimization", description: "Before deployment, chatbots undergo extensive testing to ensure accuracy, reliability, and smooth user interactions." },
  { num: "05", title: "Deployment and Continuous Improvement", description: "After deployment, we monitor chatbot performance and continuously optimize responses based on user interactions." },
];

const whyChooseItems = [
  { icon: Code2, label: "Experienced AI developers" },
  { icon: Brain, label: "Intelligent chatbot technology" },
  { icon: Settings, label: "Customized chatbot solutions" },
  { icon: Globe, label: "Multi-platform chatbot integration" },
  { icon: Shield, label: "Ongoing support and optimization" },
];

function ChatbotTypeAccordion({ section, index }: { section: typeof chatbotTypes[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="acb-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`acb-type-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`acb-type-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-acb-type-${index}`}
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500/15 to-purple-500/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
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
        id={`acb-type-content-${index}`}
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

export default function AiChatbot() {
  useSEO({
    title: "AI Chatbot Development – Smart Customer Support That Never Sleeps | Devoria Tech",
    description: "Professional AI chatbot development services by Devoria Tech. Build intelligent chatbots for customer support, e-commerce, sales, and social media. NLP-powered, multi-platform integration, 24/7 automated communication solutions.",
    keywords: "AI chatbot, chatbot development, AI customer support, NLP chatbot, e-commerce chatbot, sales chatbot, social media chatbot, automated customer service, intelligent chatbot, conversational AI",
    canonical: "https://devoriatech.com/services/ai-services/ai-chatbot",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".acb-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-acb-hero">
        <div className="absolute inset-0 hero-gradient-bg" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-fuchsia-600/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03]">
          <div className="absolute inset-0 rounded-full border border-white/10 animate-orbit" style={{ animationDuration: "25s" }}>
            <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-fuchsia-500/40 blur-sm" />
          </div>
          <div className="absolute inset-8 rounded-full border border-white/5 animate-orbit" style={{ animationDuration: "35s", animationDirection: "reverse" }}>
            <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-purple-400/40 blur-sm" />
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
                  AI Chatbot
                </span>
              </motion.div>

              <SplitText
                text="AI Chatbot Development Services for Smart Customer Support"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-acb-title"
              />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light">
                Devoria Tech offers professional AI chatbot development services designed to help businesses automate communication, improve customer engagement, and increase operational efficiency. Our AI-powered chatbots can understand user queries, respond intelligently, and provide helpful information without human intervention.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8">
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-acb-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-purple-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(192,38,211,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Build Your AI Chatbot <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </span>
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }} className="mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden neon-border">
                <img loading="lazy" src={aiChatbotHeroImg} alt="AI chatbot development services" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="acb-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-acb-${i}`}>
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
          <div className="acb-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Understanding AI Chatbots</span>
            <SplitText text="What is an AI Chatbot" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="acb-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              An AI chatbot is a software application powered by artificial intelligence that can communicate with users through text or voice conversations. These chatbots are designed to understand user questions and respond with relevant answers using natural language processing technology.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Unlike traditional chatbots that follow simple scripted responses, AI chatbots can analyze conversations, learn from interactions, and provide more accurate responses over time. With AI chatbot technology, businesses can improve communication efficiency and provide instant responses to customer inquiries.
            </p>
          </div>
          <div className="acb-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {chatbotUseCases.map((useCase, i) => (
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
          <div className="acb-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Key Benefits</span>
            <SplitText text="Benefits of AI Chatbots for Businesses" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="acb-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>AI chatbot technology provides many benefits for businesses that want to improve customer service and operational efficiency.</p>
          </div>
          <div className="acb-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefitSections.map((benefit, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`benefit-acb-${i}`}>
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
          <div className="acb-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Chatbot Types</span>
            <SplitText text="Types of AI Chatbots We Develop" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="acb-fade mb-8 text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center">
            <p>Devoria Tech develops several types of AI chatbot solutions depending on business needs.</p>
          </div>
          <div className="space-y-5">
            {chatbotTypes.map((section, i) => (
              <ChatbotTypeAccordion key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="acb-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Platform Capabilities</span>
            <SplitText text="Features of Our AI Chatbot Solutions" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="acb-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech develops AI chatbot systems with powerful features designed to enhance business communication.</p>
          </div>
          <div className="acb-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureSections.map((feature, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`feature-acb-${i}`}>
                <feature.icon className="w-5 h-5 text-fuchsia-400/50 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-[11px] text-white/25 leading-relaxed font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="acb-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Industries</span>
            <SplitText text="AI Chatbots for Different Industries" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="acb-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>AI chatbot technology is used across many industries to improve customer communication and operational efficiency.</p>
          </div>
          <div className="acb-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industrySections.map((industry, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border" data-testid={`industry-acb-${i}`}>
                <div className="p-5">
                  <industry.icon className="w-5 h-5 text-fuchsia-400/50 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-1">{industry.title}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed font-light">{industry.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
          <div className="acb-fade text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto text-center mt-6">
            <p>Devoria Tech develops industry-specific chatbot solutions tailored to business requirements.</p>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="acb-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Our Process</span>
            <SplitText text="Our AI Chatbot Development Process" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="acb-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech follows a structured process to build reliable and effective chatbot solutions.</p>
          </div>
          <div className="acb-fade space-y-4 max-w-3xl mx-auto">
            {processSections.map((step, i) => (
              <div key={i} className="flex items-start gap-5 p-5 rounded-2xl neon-border bg-white/[0.01]" data-testid={`process-acb-${i}`}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500/15 to-purple-500/15 flex items-center justify-center shrink-0">
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
          <div className="acb-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="acb-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for AI Chatbot Development</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech provides advanced AI chatbot solutions that help businesses automate communication and improve customer experiences. Our goal is to help businesses create smarter communication systems that improve efficiency and customer satisfaction.
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
          <div className="acb-fade rounded-2xl neon-border p-8 bg-white/[0.01]" data-testid="acb-future">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">The Future of AI Chatbots</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light max-w-2xl mx-auto">
                AI chatbot technology is evolving rapidly and becoming an essential tool for modern businesses. As artificial intelligence continues to improve, chatbots will become even more capable of understanding complex conversations and providing personalized responses.
              </p>
              <p className="text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto mt-3">
                Businesses that adopt AI chatbot technology early will gain a competitive advantage by improving customer communication and operational efficiency. Devoria Tech helps companies implement advanced chatbot solutions that support the future of digital communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative p-14 sm:p-20 rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/10 via-transparent to-purple-500/10" />
            <div className="absolute inset-0 border border-white/[0.06] rounded-[2rem]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-fuchsia-400/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent" />
            <div className="relative z-10">
              <SplitText text="Start Your AI Chatbot Project" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>If your business wants to automate customer communication and provide faster support, Devoria Tech can help.</p>
                <p>Our AI chatbot development services are designed to create intelligent communication systems that improve customer experiences and increase business efficiency.</p>
                <p>Contact Devoria Tech today to build a powerful AI chatbot for your website, application, or digital platform.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-acb-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-purple-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(192,38,211,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your AI Chatbot Project <ArrowRight className="w-4 h-4" />
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
