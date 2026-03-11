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
  Monitor, Shield, Zap, WifiOff, Settings,
  Code2, Layers, Users, BarChart3,
  Database, Factory, ShoppingBag, Truck,
  Heart, Layout, Server, Wrench,
} from "lucide-react";
import desktopHeroImg from "@assets/desktop-software-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "60+", label: "Desktop Apps Built", icon: Monitor },
  { value: "15+", label: "Industries Served", icon: Layers },
  { value: "99.9%", label: "System Reliability", icon: Shield },
  { value: "5x", label: "Faster Processing", icon: Zap },
];

const benefitSections = [
  {
    icon: Zap,
    title: "High Performance and Speed",
    description: "Desktop software runs directly on the local system, allowing it to process data faster than many web applications. This high performance makes desktop applications ideal for businesses that require complex data processing or real-time operations.",
  },
  {
    icon: Shield,
    title: "Strong Data Security",
    description: "Business data is one of the most valuable assets of any organization. Desktop software allows companies to store sensitive data securely within internal systems. Devoria Tech implements advanced security features such as encryption, authentication systems, and secure databases to ensure business data remains protected.",
  },
  {
    icon: WifiOff,
    title: "Offline Accessibility",
    description: "One of the biggest advantages of desktop applications is their ability to function without constant internet access. Businesses can continue working even if internet connectivity is limited or unavailable. This feature is particularly useful for organizations that operate in remote areas or rely on uninterrupted operations.",
  },
  {
    icon: Settings,
    title: "Custom Business Workflows",
    description: "Desktop software can be designed specifically for the unique workflows of a business. Unlike generic software tools, custom desktop applications align perfectly with business processes and operational requirements.",
  },
];

const customFeatures = [
  "Business management dashboards",
  "Financial and accounting systems",
  "Inventory and warehouse tracking",
  "Production monitoring tools",
  "Employee management systems",
  "Customer data management",
];

const techStack = [
  "C# and .NET development",
  "Java desktop applications",
  "Python-based desktop software",
  "Electron-based applications",
  "Cross-platform desktop solutions",
];

const industrySections = [
  { icon: ShoppingBag, title: "Retail Businesses", description: "Retail companies use desktop applications for managing inventory, sales transactions, billing systems, and customer records." },
  { icon: Factory, title: "Manufacturing Industry", description: "Manufacturing companies rely on desktop software to monitor production processes, manage supply chains, and track raw materials." },
  { icon: BarChart3, title: "Financial & Accounting Firms", description: "Accounting firms require secure desktop software to manage financial records, generate reports, and track transactions." },
  { icon: Heart, title: "Healthcare Organizations", description: "Healthcare providers use desktop systems to manage patient records, administrative tasks, and medical data." },
  { icon: Truck, title: "Logistics & Distribution", description: "Logistics companies use software systems for shipment tracking, warehouse management, and supply chain optimization." },
];

const keyFeatureSections = [
  {
    title: "User-Friendly Interface",
    icon: Layout,
    intro: "We design intuitive user interfaces that make software easy to use for employees and administrators.",
    items: ["Clean navigation design", "Intuitive control layout", "Accessibility compliance", "Modern UI standards"],
  },
  {
    title: "Secure Database Integration",
    icon: Database,
    intro: "Our desktop applications integrate with secure databases to store and manage business data safely.",
    items: ["Encrypted data storage", "Role-based access control", "Automated data backups", "Audit trail logging"],
  },
  {
    title: "Custom Reporting Tools",
    icon: BarChart3,
    intro: "Businesses can generate detailed reports and analytics to monitor performance and make informed decisions.",
    items: ["Custom report templates", "Data visualization charts", "Export to PDF and Excel", "Scheduled report generation"],
  },
  {
    title: "System Integration",
    icon: Server,
    intro: "Desktop applications can integrate with other business systems such as ERP platforms, accounting tools, and cloud services.",
    items: ["ERP integration", "Accounting tool sync", "Cloud service connectivity", "Third-party API support"],
  },
  {
    title: "Scalable Architecture",
    icon: Layers,
    intro: "Our software is built with scalable architecture that allows businesses to expand their systems as operations grow.",
    items: ["Modular system design", "Multi-user support", "Performance optimization", "Future-proof architecture"],
  },
];

const processSections = [
  { num: "01", title: "Business Requirement Analysis", description: "We begin by understanding the client's business goals, operational challenges, and software requirements." },
  { num: "02", title: "System Design and Planning", description: "Our experts design the software architecture and plan the development process to ensure efficiency and scalability." },
  { num: "03", title: "Software Development", description: "Our developers build the application using modern technologies and optimized coding practices." },
  { num: "04", title: "Testing and Quality Assurance", description: "Before deployment, we conduct extensive testing to ensure the software is stable, secure, and free from errors." },
  { num: "05", title: "Deployment and Maintenance", description: "After successful testing, the software is deployed and our team provides ongoing maintenance and support." },
];

const whyChooseItems = [
  { icon: Code2, label: "Experienced software developers" },
  { icon: Settings, label: "Customized business solutions" },
  { icon: Layers, label: "Scalable software architecture" },
  { icon: Shield, label: "Secure and reliable applications" },
  { icon: Wrench, label: "Long-term technical support" },
];

function FeatureSection({ section, index }: { section: typeof keyFeatureSections[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="ds-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`ds-feature-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`ds-feature-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-ds-feature-${index}`}
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/15 to-emerald-500/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-5 h-5 text-cyan-400/70" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors duration-500">
            {section.title}
          </h3>
          <p className="text-[12px] text-white/25 mt-1 font-light line-clamp-1">{section.intro}</p>
        </div>
        <ChevronDown className={`w-5 h-5 text-cyan-400/40 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div
        id={`ds-feature-content-${index}`}
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ maxHeight: isOpen ? "5000px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-4">
          <p className="text-[13px] text-white/30 leading-[1.8] font-light">{section.intro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {section.items.map((item, ii) => (
              <div key={ii} className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400/40 mt-0.5 shrink-0" />
                <span className="text-[12px] text-white/25 font-light">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DesktopSoftware() {
  useSEO({
    title: "Desktop Software Development – Powerful Apps for Your Business | Devoria Tech",
    description: "Professional desktop software development services by Devoria Tech. Custom desktop applications for accounting, inventory management, production monitoring, and enterprise systems. High performance, secure, and offline-capable solutions.",
    keywords: "desktop software development, custom desktop application, business software, inventory management software, accounting software, enterprise desktop application, C# development, .NET application, Java desktop, Electron app, offline software",
    canonical: "https://devoriatech.com/services/business-software/desktop-software",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".ds-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-ds-hero">
        <div className="absolute inset-0 hero-gradient-bg" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-teal-600/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03]">
          <div className="absolute inset-0 rounded-full border border-white/10 animate-orbit" style={{ animationDuration: "25s" }}>
            <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-teal-500/40 blur-sm" />
          </div>
          <div className="absolute inset-8 rounded-full border border-white/5 animate-orbit" style={{ animationDuration: "35s", animationDirection: "reverse" }}>
            <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-emerald-400/40 blur-sm" />
          </div>
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
          <Link href="/services/business-software">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-cyan-400/60 hover:text-cyan-400 font-medium tracking-wider uppercase transition-colors duration-300 mb-8 cursor-pointer" data-testid="link-back-bs">
              <ArrowRight className="w-3 h-3 rotate-180" /> Back to Business Software
            </span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] text-cyan-400 mb-6 tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Desktop Software
                </span>
              </motion.div>

              <SplitText
                text="Desktop Software Development Services for Businesses"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-ds-title"
              />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light">
                Devoria Tech provides professional desktop software development services designed to help companies automate workflows, manage data efficiently, and improve productivity. Unlike web-based applications, desktop software delivers faster performance and stronger security.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8">
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-ds-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(20,184,166,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Start Your Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </span>
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }} className="mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden neon-border">
                <img loading="lazy" src={desktopHeroImg} alt="Desktop software development services for businesses" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ds-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-ds-${i}`}>
                <div className="p-6">
                  <stat.icon className="w-5 h-5 text-cyan-400/50 mx-auto mb-3" />
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
          <div className="ds-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Understanding Desktop Software</span>
            <SplitText text="What is Desktop Software Development" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="ds-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Desktop software development refers to the process of creating applications that run on personal computers or workstations. These applications are installed directly on the system and can operate without relying entirely on internet connectivity.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Desktop applications are widely used in many industries because they provide fast processing speeds, strong data security, and the ability to perform complex operations. Devoria Tech builds desktop software solutions that help businesses operate efficiently and maintain full control over their internal systems.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ds-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Key Advantages</span>
            <SplitText text="Benefits of Desktop Software for Businesses" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="ds-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Desktop applications offer several advantages that make them valuable for many organizations.</p>
          </div>
          <div className="ds-fade grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefitSections.map((benefit, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`benefit-ds-${i}`}>
                <benefit.icon className="w-5 h-5 text-cyan-400/50 mb-3" />
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
          <div className="ds-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Custom Solutions</span>
            <SplitText text="Custom Desktop Software Development" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="ds-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Every business operates differently, which means standard software solutions may not always meet specific needs. Devoria Tech specializes in custom desktop software development designed specifically for each organization.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Our development process focuses on understanding the business structure, workflow challenges, and operational goals of each client. By developing software tailored to your business operations, we help companies improve productivity and streamline complex processes.
            </p>
          </div>
          <div className="ds-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {customFeatures.map((feature, i) => (
              <div key={i} className="flex items-start gap-2.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle className="w-4 h-4 text-cyan-400/40 mt-0.5 shrink-0" />
                <span className="text-[13px] text-white/35 font-light">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ds-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Tech Stack</span>
            <SplitText text="Technologies We Use for Desktop Development" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="ds-fade max-w-2xl mx-auto text-center mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">Devoria Tech uses modern programming technologies to build high-performance desktop applications. Using modern frameworks ensures that our desktop software solutions remain scalable, secure, and easy to maintain.</p>
          </div>
          <div className="ds-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {techStack.map((tech, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl neon-border bg-white/[0.01]" data-testid={`tech-ds-${i}`}>
                <Code2 className="w-4 h-4 text-cyan-400/50 shrink-0" />
                <span className="text-[13px] text-white/35 font-light">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ds-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Industries We Serve</span>
            <SplitText text="Desktop Software for Different Industries" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="ds-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industrySections.map((industry, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border" data-testid={`industry-ds-${i}`}>
                <div className="p-5">
                  <industry.icon className="w-5 h-5 text-cyan-400/50 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-1">{industry.title}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed font-light">{industry.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
          <div className="ds-fade text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto text-center mt-6">
            <p>Devoria Tech designs industry-specific desktop applications that meet the operational needs of each sector.</p>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ds-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Key Features</span>
            <SplitText text="Key Features of Our Desktop Applications" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="ds-fade mb-8 text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center">
            <p>Our desktop software solutions include powerful features that improve operational efficiency and system reliability.</p>
          </div>
          <div className="space-y-5">
            {keyFeatureSections.map((section, i) => (
              <FeatureSection key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ds-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Our Process</span>
            <SplitText text="Our Desktop Software Development Process" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="ds-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech follows a structured development process to ensure high-quality software solutions.</p>
          </div>
          <div className="ds-fade space-y-4 max-w-3xl mx-auto">
            {processSections.map((step, i) => (
              <div key={i} className="flex items-start gap-5 p-5 rounded-2xl neon-border bg-white/[0.01]" data-testid={`process-ds-${i}`}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/15 to-emerald-500/15 flex items-center justify-center shrink-0">
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
          <div className="ds-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="ds-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for Desktop Software</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech is a trusted digital agency specializing in software development and digital solutions. Our development team works closely with clients to deliver desktop applications that solve real business challenges and improve operational efficiency.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {whyChooseItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <item.icon className="w-4 h-4 text-cyan-400/50 shrink-0" />
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
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600/10 via-transparent to-emerald-500/10" />
            <div className="absolute inset-0 border border-white/[0.06] rounded-[2rem]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-teal-400/20 to-transparent" />
            <div className="relative z-10">
              <SplitText text="Start Your Desktop Software Development Project" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>If your business needs powerful desktop software to manage operations, automate workflows, and improve productivity, Devoria Tech is ready to help.</p>
                <p>Our expert developers create high-performance desktop applications designed to support business growth and digital transformation.</p>
                <p>Contact Devoria Tech today to start building custom desktop software that helps your business operate smarter and achieve long-term success.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-ds-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(20,184,166,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your Desktop Software Project <ArrowRight className="w-4 h-4" />
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
