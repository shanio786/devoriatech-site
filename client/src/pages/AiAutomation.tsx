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
  Workflow, Bot, Zap, TrendingUp, Shield,
  Users, BarChart3, Database, Layers, Settings,
  Code2, Globe, Lock, Brain, Target,
  ShoppingCart, Megaphone, Landmark, Heart, Truck,
} from "lucide-react";
import aiAutomationHeroImg from "@assets/ai-automation-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "80+", label: "Automation Systems Built", icon: Workflow },
  { value: "60%", label: "Cost Reduction", icon: TrendingUp },
  { value: "10x", label: "Faster Processing", icon: Zap },
  { value: "99%", label: "Accuracy Rate", icon: Target },
];

const automationExamples = [
  "Automated customer support systems",
  "Workflow automation tools",
  "Data processing automation",
  "Marketing automation platforms",
  "Intelligent reporting systems",
];

const benefitSections = [
  { icon: Zap, title: "Increased Operational Efficiency", description: "Automation allows businesses to complete repetitive tasks faster and with greater accuracy. This improves productivity across departments." },
  { icon: TrendingUp, title: "Reduced Operational Costs", description: "Automating processes reduces the need for manual labor and helps businesses lower operational expenses." },
  { icon: Target, title: "Improved Accuracy", description: "AI systems process data with high precision, reducing errors that often occur during manual operations." },
  { icon: Workflow, title: "Faster Business Processes", description: "Automation allows companies to process tasks and workflows much faster than traditional manual systems." },
  { icon: Brain, title: "Better Decision Making", description: "AI systems analyze large amounts of data and provide insights that help businesses make informed decisions." },
];

const automationTypes = [
  {
    title: "Workflow Automation",
    icon: Workflow,
    intro: "Workflow automation systems help businesses automate internal processes such as approvals, notifications, and task management. These systems improve operational efficiency by reducing manual steps in business processes.",
    items: ["Approval process automation", "Notification systems", "Task management automation", "Internal process optimization"],
  },
  {
    title: "Marketing Automation",
    icon: Megaphone,
    intro: "Marketing automation tools help businesses manage digital marketing campaigns efficiently. These systems automate tasks such as email marketing, social media posting, lead management, and customer engagement tracking.",
    items: ["Email marketing campaigns", "Social media posting automation", "Lead management systems", "Customer engagement tracking"],
  },
  {
    title: "Customer Service Automation",
    icon: Users,
    intro: "AI-powered automation systems help businesses handle customer support requests efficiently. These systems include AI chatbots, automated response systems, and customer inquiry management. Automation improves response times and customer satisfaction.",
    items: ["AI chatbot integration", "Automated response systems", "Customer inquiry management", "Response time optimization"],
  },
  {
    title: "Data Processing Automation",
    icon: Database,
    intro: "Businesses handle large amounts of data daily. AI automation systems can analyze, organize, and process data automatically. These solutions help companies generate reports, track performance metrics, and identify trends.",
    items: ["Automated report generation", "Performance metric tracking", "Trend identification systems", "Data organization tools"],
  },
  {
    title: "Business Process Automation",
    icon: Settings,
    intro: "Business process automation systems integrate different business tools and automate workflows across departments. These systems help organizations streamline operations and improve coordination between teams.",
    items: ["Cross-department workflow integration", "Business tool connectivity", "Operations streamlining", "Team coordination systems"],
  },
];

const industrySections = [
  { icon: ShoppingCart, title: "E-Commerce Businesses", description: "Online stores use automation systems for order processing, inventory updates, and customer communication." },
  { icon: Megaphone, title: "Digital Marketing Agencies", description: "Marketing companies use automation tools to manage campaigns, track analytics, and optimize advertising strategies." },
  { icon: Landmark, title: "Financial Services", description: "Financial institutions use automation for transaction processing, fraud detection, and compliance monitoring." },
  { icon: Heart, title: "Healthcare Organizations", description: "Healthcare providers use automation systems for appointment scheduling, patient management, and administrative tasks." },
  { icon: Truck, title: "Logistics and Supply Chain", description: "Logistics companies use AI automation to manage shipments, optimize routes, and monitor supply chain operations." },
];

const featureSections = [
  { icon: Bot, title: "Intelligent Task Automation", description: "Our AI systems automate repetitive tasks and workflows, allowing employees to focus on strategic work." },
  { icon: Database, title: "Data Integration", description: "Automation platforms can integrate with existing software systems, databases, and cloud services." },
  { icon: BarChart3, title: "Real-Time Analytics", description: "Our systems provide real-time insights into business performance and operational metrics." },
  { icon: Layers, title: "Scalable Architecture", description: "Automation systems are designed to scale as businesses grow and operational requirements increase." },
  { icon: Lock, title: "Secure Data Handling", description: "We implement strong security systems to protect sensitive business data during automated processes." },
];

const processSections = [
  { num: "01", title: "Business Process Analysis", description: "We analyze existing workflows and identify opportunities where automation can improve efficiency." },
  { num: "02", title: "Automation Strategy Design", description: "Our experts design automation strategies that align with business goals." },
  { num: "03", title: "AI System Development", description: "We develop AI-powered automation systems using modern technologies and frameworks." },
  { num: "04", title: "Testing and Optimization", description: "Automation systems are tested to ensure accuracy, reliability, and performance." },
  { num: "05", title: "Deployment and Monitoring", description: "After deployment, we monitor system performance and continuously optimize automation workflows." },
];

const whyChooseItems = [
  { icon: Code2, label: "Advanced AI automation technologies" },
  { icon: Settings, label: "Customized automation solutions" },
  { icon: Shield, label: "Scalable and secure systems" },
  { icon: Globe, label: "Integration with existing business tools" },
  { icon: Layers, label: "Ongoing technical support" },
];

function AutomationAccordion({ section, index }: { section: typeof automationTypes[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="aat-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`aat-type-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`aat-type-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-aat-type-${index}`}
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500/15 to-indigo-500/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
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
        id={`aat-type-content-${index}`}
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

export default function AiAutomation() {
  useSEO({
    title: "AI Automation – Save Time by Automating Repetitive Tasks | Devoria Tech",
    description: "Professional AI automation solutions by Devoria Tech. Automate workflows, marketing, customer service, data processing, and business processes. Reduce costs, improve efficiency, and transform operations with intelligent automation.",
    keywords: "AI automation, business automation, workflow automation, marketing automation, customer service automation, data processing, business process automation, intelligent automation, RPA, AI solutions",
    canonical: "https://devoriatech.com/services/ai-services/ai-automation",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".aat-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-aat-hero">
        <div className="absolute inset-0 hero-gradient-bg" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-fuchsia-600/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03]">
          <div className="absolute inset-0 rounded-full border border-white/10 animate-orbit" style={{ animationDuration: "25s" }}>
            <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-fuchsia-500/40 blur-sm" />
          </div>
          <div className="absolute inset-8 rounded-full border border-white/5 animate-orbit" style={{ animationDuration: "35s", animationDirection: "reverse" }}>
            <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-indigo-400/40 blur-sm" />
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
                  AI Automation
                </span>
              </motion.div>

              <SplitText
                text="AI Automation Solutions for Smart Business Operations"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-aat-title"
              />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light">
                Devoria Tech provides advanced AI automation solutions designed to help businesses automate processes, manage data efficiently, and improve decision-making. By integrating artificial intelligence into business systems, companies can reduce operational costs and increase overall efficiency.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8">
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-aat-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-indigo-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-fuchsia-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(192,38,211,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Automate Your Business <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </span>
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }} className="mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden neon-border">
                <img loading="lazy" src={aiAutomationHeroImg} alt="AI automation solutions for business" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aat-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-aat-${i}`}>
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
          <div className="aat-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Understanding AI Automation</span>
            <SplitText text="What is AI Automation" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="aat-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              AI automation refers to the use of artificial intelligence technologies to automate tasks and processes that normally require human intervention. These systems analyze data, make decisions, and execute tasks automatically based on predefined rules or machine learning models.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              AI automation is widely used across industries to improve efficiency and reduce manual workload. Businesses that implement AI automation solutions can improve operational efficiency while minimizing human errors.
            </p>
          </div>
          <div className="aat-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {automationExamples.map((example, i) => (
              <div key={i} className="flex items-center gap-2.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle className="w-3.5 h-3.5 text-fuchsia-400/40 shrink-0" />
                <span className="text-[12px] text-white/30 font-light">{example}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aat-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Key Benefits</span>
            <SplitText text="Benefits of AI Automation for Businesses" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="aat-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>AI automation provides many advantages for organizations looking to improve efficiency and productivity.</p>
          </div>
          <div className="aat-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefitSections.map((benefit, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`benefit-aat-${i}`}>
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
          <div className="aat-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Automation Types</span>
            <SplitText text="Types of AI Automation Solutions We Provide" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="aat-fade mb-8 text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center">
            <p>Devoria Tech develops a variety of AI automation systems designed for different business needs.</p>
          </div>
          <div className="space-y-5">
            {automationTypes.map((section, i) => (
              <AutomationAccordion key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aat-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Industries</span>
            <SplitText text="AI Automation for Different Industries" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="aat-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>AI automation technology is transforming many industries by improving efficiency and reducing manual work.</p>
          </div>
          <div className="aat-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industrySections.map((industry, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border" data-testid={`industry-aat-${i}`}>
                <div className="p-5">
                  <industry.icon className="w-5 h-5 text-fuchsia-400/50 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-1">{industry.title}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed font-light">{industry.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
          <div className="aat-fade text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto text-center mt-6">
            <p>Devoria Tech develops AI automation systems tailored to the needs of each industry.</p>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aat-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Platform Capabilities</span>
            <SplitText text="Features of Our AI Automation Solutions" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="aat-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech builds intelligent automation systems with powerful features that support business growth.</p>
          </div>
          <div className="aat-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureSections.map((feature, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`feature-aat-${i}`}>
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
          <div className="aat-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-fuchsia-400">Our Process</span>
            <SplitText text="Our AI Automation Development Process" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="aat-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech follows a structured approach to developing automation solutions.</p>
          </div>
          <div className="aat-fade space-y-4 max-w-3xl mx-auto">
            {processSections.map((step, i) => (
              <div key={i} className="flex items-start gap-5 p-5 rounded-2xl neon-border bg-white/[0.01]" data-testid={`process-aat-${i}`}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500/15 to-indigo-500/15 flex items-center justify-center shrink-0">
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
          <div className="aat-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="aat-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for AI Automation Solutions</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech provides innovative AI automation services designed to help businesses improve productivity and efficiency. Our mission is to help businesses transform their operations through intelligent automation.
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
          <div className="aat-fade rounded-2xl neon-border p-8 bg-white/[0.01]" data-testid="aat-future">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">The Future of AI Automation</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light max-w-2xl mx-auto">
                Artificial intelligence and automation are shaping the future of business operations. As technology continues to evolve, more organizations will rely on intelligent automation systems to manage workflows and improve productivity.
              </p>
              <p className="text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto mt-3">
                Businesses that adopt AI automation early will gain a competitive advantage by reducing costs, improving efficiency, and delivering better customer experiences. Devoria Tech helps businesses stay ahead of this transformation by providing advanced AI automation solutions designed for modern digital operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative p-14 sm:p-20 rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/10 via-transparent to-indigo-500/10" />
            <div className="absolute inset-0 border border-white/[0.06] rounded-[2rem]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-fuchsia-400/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent" />
            <div className="relative z-10">
              <SplitText text="Start Your AI Automation Project" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>If your business wants to automate workflows, improve efficiency, and reduce operational costs, Devoria Tech can help.</p>
                <p>Our AI automation solutions are designed to streamline operations, improve productivity, and support digital transformation.</p>
                <p>Contact Devoria Tech today to implement powerful AI automation systems that help your business operate smarter and grow faster.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-aat-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-indigo-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(192,38,211,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your Automation Project <ArrowRight className="w-4 h-4" />
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
