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
  Settings, Shield, Zap, Layers, Code2,
  Users, BarChart3, Database, Layout,
  Server, Lock, Workflow, FileText,
  ShoppingBag, Factory, Heart, Landmark, Truck,
  TrendingUp, Wrench,
} from "lucide-react";
import customSoftwareHeroImg from "@assets/custom-business-software-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "70+", label: "Custom Solutions Built", icon: Settings },
  { value: "40+", label: "Industries Covered", icon: Layers },
  { value: "100%", label: "Tailored Solutions", icon: Code2 },
  { value: "24/7", label: "Technical Support", icon: Shield },
];

const useCases = [
  "Customer relationship management",
  "Employee management systems",
  "Accounting and finance platforms",
  "Inventory and warehouse management",
  "Workflow automation systems",
  "Data analysis and reporting platforms",
];

const whyCustomReasons = [
  {
    icon: Workflow,
    title: "Tailored Business Workflows",
    description: "Custom software is built around your specific business processes. This ensures that the software supports the way your organization operates instead of forcing your team to adapt to generic tools.",
  },
  {
    icon: Zap,
    title: "Better Operational Efficiency",
    description: "Custom software automates repetitive tasks and simplifies workflows, allowing employees to complete tasks faster and with fewer errors.",
  },
  {
    icon: Layers,
    title: "Scalability for Business Growth",
    description: "As businesses expand, their software systems must evolve. Custom software can be scaled and upgraded easily to accommodate new requirements and increased workloads.",
  },
  {
    icon: Shield,
    title: "Enhanced Security",
    description: "Businesses often deal with sensitive data that must remain secure. Custom software solutions allow organizations to implement advanced security features tailored to their systems.",
  },
  {
    icon: TrendingUp,
    title: "Competitive Advantage",
    description: "Companies with custom-built software systems often operate more efficiently than competitors using standard software tools. This advantage helps businesses deliver better services and improve customer experiences.",
  },
];

const softwareTypes = [
  {
    title: "Enterprise Software Solutions",
    icon: Server,
    intro: "Enterprise software systems help large organizations manage complex operations such as finance, human resources, and supply chain management. These systems integrate multiple business processes into a single platform that improves coordination and operational efficiency.",
    items: ["Multi-department integration", "Finance & HR management", "Supply chain coordination", "Centralized data access"],
  },
  {
    title: "Business Management Systems",
    icon: BarChart3,
    intro: "Business management software allows companies to monitor operations, track performance, and manage resources effectively. These platforms may include dashboards, analytics tools, and workflow management systems.",
    items: ["Real-time dashboards", "Performance tracking", "Resource management", "Workflow optimization"],
  },
  {
    title: "Workflow Automation Software",
    icon: Workflow,
    intro: "Automation software reduces manual work by automatically performing repetitive tasks. Automation helps businesses save time and improve operational accuracy.",
    items: ["Automated reporting systems", "Document processing tools", "Automated notifications and alerts", "Task management platforms"],
  },
  {
    title: "Customer Management Systems",
    icon: Users,
    intro: "Customer management software helps businesses track customer interactions, manage client data, and improve customer service. These platforms help companies build stronger relationships with customers and improve sales performance.",
    items: ["Customer interaction tracking", "Client data management", "Sales pipeline management", "Service ticket systems"],
  },
  {
    title: "Data Analytics and Reporting Platforms",
    icon: BarChart3,
    intro: "Businesses rely on data to make informed decisions. Custom analytics platforms allow organizations to monitor performance metrics, analyze trends, and generate reports. Devoria Tech develops powerful reporting tools that help businesses gain valuable insights into their operations.",
    items: ["Performance metric monitoring", "Trend analysis tools", "Custom report generation", "Data visualization dashboards"],
  },
];

const keyFeatureSections = [
  {
    title: "User-Friendly Interface",
    icon: Layout,
    description: "Our software solutions include intuitive user interfaces that make it easy for employees to use the system without extensive training.",
  },
  {
    title: "Secure Data Management",
    icon: Lock,
    description: "Security is a priority in every software project. We implement advanced security systems to protect business data from unauthorized access.",
  },
  {
    title: "Integration with Existing Systems",
    icon: Server,
    description: "Our custom software solutions can integrate with existing platforms such as ERP systems, accounting software, and cloud services.",
  },
  {
    title: "Scalable System Architecture",
    icon: Layers,
    description: "Our applications are designed with scalable architecture that allows businesses to expand their systems as their operations grow.",
  },
  {
    title: "Real-Time Reporting and Analytics",
    icon: BarChart3,
    description: "Our software platforms provide real-time insights that help businesses monitor performance and make data-driven decisions.",
  },
];

const industrySections = [
  { icon: ShoppingBag, title: "Retail & E-commerce", description: "Retail businesses use custom software for inventory tracking, sales management, and customer data management." },
  { icon: Factory, title: "Manufacturing Industry", description: "Manufacturing companies use custom platforms to manage production workflows, monitor supply chains, and track raw materials." },
  { icon: Heart, title: "Healthcare Organizations", description: "Healthcare providers use software systems to manage patient data, appointments, and administrative operations." },
  { icon: Landmark, title: "Financial Services", description: "Financial institutions require secure platforms for managing transactions, financial records, and compliance reporting." },
  { icon: Truck, title: "Logistics & Transportation", description: "Logistics companies use custom systems to track shipments, manage fleets, and optimize delivery operations." },
];

const processSections = [
  { num: "01", title: "Requirement Analysis", description: "We begin by understanding the client's business operations, challenges, and project goals." },
  { num: "02", title: "System Architecture Design", description: "Our experts design the system architecture to ensure scalability, performance, and security." },
  { num: "03", title: "Software Development", description: "Our developers build the software using modern programming technologies and optimized coding practices." },
  { num: "04", title: "Testing and Quality Assurance", description: "Every application undergoes extensive testing to ensure stability, reliability, and security." },
  { num: "05", title: "Deployment and Ongoing Support", description: "After deployment, our team provides maintenance, updates, and technical support to ensure smooth operations." },
];

const whyChooseItems = [
  { icon: Code2, label: "Experienced software developers" },
  { icon: Settings, label: "Customized digital solutions" },
  { icon: Shield, label: "Secure and scalable software architecture" },
  { icon: Database, label: "Modern development technologies" },
  { icon: Wrench, label: "Ongoing technical support" },
];

function SoftwareTypeSection({ section, index }: { section: typeof softwareTypes[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="cb-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`cb-type-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`cb-type-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-cb-type-${index}`}
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
        id={`cb-type-content-${index}`}
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

export default function CustomBusinessSoftware() {
  useSEO({
    title: "Custom Software Solutions – Built Exactly How You Need It | Devoria Tech",
    description: "Professional custom business software development by Devoria Tech. Build tailored enterprise solutions, business management systems, workflow automation, CRM platforms, and analytics tools. Scalable, secure, and high-performance software for modern businesses.",
    keywords: "custom business software, enterprise software development, business management system, workflow automation, CRM software, custom software solutions, data analytics platform, business software development, tailored software, scalable software",
    canonical: "https://devoriatech.com/services/business-software/custom-business-software",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".cb-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-cb-hero">
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
                  Custom Software
                </span>
              </motion.div>

              <SplitText
                text="Custom Business Software Development Services"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-cb-title"
              />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light">
                Modern businesses require technology solutions that match their unique workflows and operational needs. Devoria Tech provides professional custom business software development services designed to create tailored software solutions for companies worldwide.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8">
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-cb-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(20,184,166,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Discuss Your Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </span>
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }} className="mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden neon-border">
                <img loading="lazy" src={customSoftwareHeroImg} alt="Custom business software development services" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="cb-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-cb-${i}`}>
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
          <div className="cb-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Understanding Custom Software</span>
            <SplitText text="What is Custom Business Software" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="cb-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Custom business software is a software solution that is designed and developed specifically for a particular business or organization. Unlike ready-made software products, custom software is tailored to meet the exact requirements of the company.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              By developing software tailored to their operations, companies can improve efficiency and eliminate limitations found in generic software systems. Devoria Tech helps businesses build custom digital solutions that align perfectly with their operational needs.
            </p>
          </div>
          <div className="cb-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {useCases.map((useCase, i) => (
              <div key={i} className="flex items-center gap-2.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400/40 shrink-0" />
                <span className="text-[12px] text-white/30 font-light">{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="cb-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Key Advantages</span>
            <SplitText text="Why Businesses Choose Custom Software" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="cb-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Many companies initially use off-the-shelf software solutions, but as their operations grow, they often face limitations. Custom software solves these challenges by providing flexibility and full control over system features.</p>
          </div>
          <div className="cb-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyCustomReasons.map((reason, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`reason-cb-${i}`}>
                <reason.icon className="w-5 h-5 text-cyan-400/50 mb-3" />
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
          <div className="cb-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Software Types</span>
            <SplitText text="Types of Custom Business Software We Develop" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="cb-fade mb-8 text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center">
            <p>Devoria Tech develops a wide range of custom software solutions designed to meet different business requirements.</p>
          </div>
          <div className="space-y-5">
            {softwareTypes.map((section, i) => (
              <SoftwareTypeSection key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="cb-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Platform Capabilities</span>
            <SplitText text="Key Features of Our Custom Software Solutions" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="cb-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech focuses on developing business software that is reliable, scalable, and easy to use.</p>
          </div>
          <div className="cb-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {keyFeatureSections.map((feature, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`feature-cb-${i}`}>
                <feature.icon className="w-5 h-5 text-cyan-400/50 mb-3" />
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
          <div className="cb-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Industries We Serve</span>
            <SplitText text="Industries That Benefit from Custom Software" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="cb-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Custom software solutions are valuable for organizations across many industries.</p>
          </div>
          <div className="cb-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industrySections.map((industry, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border" data-testid={`industry-cb-${i}`}>
                <div className="p-5">
                  <industry.icon className="w-5 h-5 text-cyan-400/50 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-1">{industry.title}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed font-light">{industry.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
          <div className="cb-fade text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto text-center mt-6">
            <p>Devoria Tech builds software solutions tailored to the unique needs of each industry.</p>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="cb-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Our Process</span>
            <SplitText text="Our Custom Software Development Process" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="cb-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech follows a structured development process to ensure every software solution meets the highest quality standards.</p>
          </div>
          <div className="cb-fade space-y-4 max-w-3xl mx-auto">
            {processSections.map((step, i) => (
              <div key={i} className="flex items-start gap-5 p-5 rounded-2xl neon-border bg-white/[0.01]" data-testid={`process-cb-${i}`}>
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
          <div className="cb-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="cb-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for Custom Software</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech is a trusted digital agency specializing in business software development and digital solutions. Our team works closely with clients to deliver software solutions that solve real business challenges and improve operational performance.
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

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="cb-fade rounded-2xl neon-border p-8 bg-white/[0.01]" data-testid="cb-future">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">Future of Custom Business Software</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light max-w-2xl mx-auto">
                Technology continues to evolve, and businesses must adopt modern digital systems to remain competitive. Custom business software is becoming increasingly important as companies seek to automate operations, manage data effectively, and integrate advanced technologies.
              </p>
              <p className="text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto mt-3">
                Modern software solutions now incorporate cloud computing, artificial intelligence, and automation to improve efficiency and provide better user experiences. Devoria Tech helps businesses stay ahead of technological changes by building modern software systems designed for long-term growth.
              </p>
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
              <SplitText text="Start Your Custom Software Project" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>If your business needs a powerful software solution designed specifically for your operations, Devoria Tech can help.</p>
                <p>Our custom business software development services are designed to create reliable systems that improve productivity, simplify workflows, and support business growth.</p>
                <p>Contact Devoria Tech today to build a custom software solution that helps your business operate smarter and achieve long-term success.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-cb-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(20,184,166,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your Custom Software Project <ArrowRight className="w-4 h-4" />
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
