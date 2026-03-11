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
  Server, Monitor, Cloud, Settings, Code2,
  Shield, Zap, Users, BarChart3, Layers,
  Database, Factory, ShoppingBag, Truck,
  UtensilsCrossed, Wrench, Workflow,
} from "lucide-react";
import businessHeroImg from "@assets/business-software-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "80+", label: "Systems Delivered", icon: Server },
  { value: "50+", label: "Enterprise Clients", icon: Users },
  { value: "99.9%", label: "System Uptime", icon: Shield },
  { value: "3x", label: "Productivity Boost", icon: Zap },
];

const overviewCards = [
  { icon: Database, title: "Inventory Management", desc: "Track stock levels, manage warehouses, and optimize supply chain operations." },
  { icon: BarChart3, title: "Accounting & Finance", desc: "Automate financial processes, generate reports, and manage budgets efficiently." },
  { icon: Users, title: "Employee Management", desc: "Streamline HR operations, attendance tracking, and payroll processing." },
  { icon: Factory, title: "Production Monitoring", desc: "Monitor manufacturing processes, track raw materials, and optimize output." },
  { icon: Layers, title: "Customer Data Management", desc: "Organize customer records, interactions, and relationship tracking." },
  { icon: BarChart3, title: "Reporting & Analytics", desc: "Generate detailed business reports and gain actionable insights from data." },
];

const softwareSections = [
  {
    title: "Desktop Software Development",
    icon: Monitor,
    intro: "Desktop applications are powerful software systems that run directly on computers. These applications provide high performance and strong security, making them ideal for internal business operations.",
    items: ["Accounting systems", "Inventory management tools", "Internal business applications", "High performance processing", "Secure data handling", "Offline capability"],
    outro: "Devoria Tech develops custom desktop software that helps businesses manage operations smoothly and securely.",
  },
  {
    title: "SaaS Application Development",
    icon: Cloud,
    intro: "Software as a Service (SaaS) platforms allow businesses to deliver software through the internet. These cloud-based applications enable users to access software from anywhere without installing it on their devices.",
    subSections: [
      {
        title: "SaaS Platform Features",
        description: "SaaS solutions are widely used for modern business operations and offer significant advantages in terms of accessibility and scalability.",
        items: ["CRM systems", "Project management tools", "Subscription platforms", "Online business tools"],
      },
    ],
    outro: "Devoria Tech builds scalable SaaS platforms designed to support thousands of users while maintaining performance and security.",
  },
  {
    title: "Custom Business Software Development",
    icon: Settings,
    intro: "Every business has unique requirements that cannot always be solved using ready-made software. Custom business software allows companies to build systems designed specifically for their workflows.",
    subSections: [
      {
        title: "Custom Software Solutions",
        description: "Devoria Tech develops tailored software solutions that help businesses automate operations, improve efficiency, and support long-term growth.",
        items: ["Internal management systems", "Enterprise software solutions", "Business dashboards", "Workflow automation platforms"],
      },
    ],
    outro: "These solutions are built according to the specific goals and processes of each business.",
  },
];

const benefitSections = [
  {
    title: "Improved Operational Efficiency",
    icon: Workflow,
    description: "Business software automates repetitive tasks and simplifies workflows, allowing employees to focus on more important work.",
  },
  {
    title: "Better Data Management",
    icon: Database,
    description: "Modern software systems help businesses organize and store data securely. This makes it easier to access information, generate reports, and make informed decisions.",
  },
  {
    title: "Reduced Human Errors",
    icon: Shield,
    description: "Manual processes often lead to mistakes. Software systems reduce errors by automating calculations, tracking data accurately, and standardizing workflows.",
  },
  {
    title: "Scalability for Business Growth",
    icon: Layers,
    description: "As businesses grow, their operational needs become more complex. Scalable software solutions allow organizations to expand their systems without replacing existing infrastructure.",
  },
  {
    title: "Increased Productivity",
    icon: Zap,
    description: "With automated processes and efficient systems, employees can complete tasks faster and manage workloads more effectively.",
  },
];

const industrySections = [
  { icon: ShoppingBag, title: "Retail Businesses", description: "Retail companies use software systems for inventory management, sales tracking, billing systems, and customer records." },
  { icon: Factory, title: "Manufacturing Companies", description: "Manufacturing businesses rely on software systems to monitor production processes, track raw materials, and manage supply chains." },
  { icon: Wrench, title: "Service-Based Businesses", description: "Service companies use software platforms for customer management, appointment scheduling, and operational workflows." },
  { icon: UtensilsCrossed, title: "Restaurants & Hospitality", description: "Restaurants use management software to handle orders, billing, staff management, and inventory tracking." },
  { icon: Truck, title: "Logistics & Supply Chain", description: "Logistics companies require advanced systems to track shipments, manage warehouses, and optimize transportation operations." },
];

const processSections = [
  { num: "01", title: "Requirement Analysis", description: "Our team works with clients to understand their business needs, challenges, and operational workflows." },
  { num: "02", title: "Software Architecture Planning", description: "We design a strong system architecture that ensures scalability, security, and performance." },
  { num: "03", title: "Development and Coding", description: "Our developers build the software using modern programming technologies and best development practices." },
  { num: "04", title: "Testing and Quality Assurance", description: "Before launching the software, we perform extensive testing to ensure stability, performance, and security." },
  { num: "05", title: "Deployment and Ongoing Support", description: "After deployment, our team provides technical support, maintenance, and system updates to ensure smooth operations." },
];

const whyChooseItems = [
  { icon: Code2, label: "Experienced software developers" },
  { icon: Settings, label: "Customized software solutions" },
  { icon: Layers, label: "Scalable and secure systems" },
  { icon: Monitor, label: "Modern development technologies" },
  { icon: Shield, label: "Long-term technical support" },
];

function SoftwareSection({ section, index }: { section: typeof softwareSections[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="bs-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`bs-section-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`bs-section-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-bs-section-${index}`}
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
        id={`bs-section-content-${index}`}
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ maxHeight: isOpen ? "5000px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-4">
          <p className="text-[13px] text-white/30 leading-[1.8] font-light">{section.intro}</p>

          {section.items && section.items.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {section.items.map((item, ii) => (
                <div key={ii} className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400/40 mt-0.5 shrink-0" />
                  <span className="text-[12px] text-white/25 font-light">{item}</span>
                </div>
              ))}
            </div>
          )}

          {section.subSections && section.subSections.map((sub, si) => (
            <div key={si} className="rounded-xl bg-white/[0.015] border border-white/[0.04] p-4 sm:p-5 space-y-3">
              <h4 className="text-[13px] font-semibold text-white/45">{sub.title}</h4>
              {sub.description && (
                <p className="text-[12px] text-white/25 leading-[1.8] font-light">{sub.description}</p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sub.items.map((item, ii) => (
                  <div key={ii} className="flex items-start gap-2.5 p-2 rounded-lg">
                    <CheckCircle className="w-3 h-3 text-cyan-400/30 mt-0.5 shrink-0" />
                    <span className="text-[11px] text-white/25 font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {section.outro && (
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">{section.outro}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BusinessSoftware() {
  useSEO({
    title: "Business Software – Custom Apps & SaaS Platforms Built for You | Devoria Tech",
    description: "We build custom software that fits your business — desktop apps, SaaS platforms, CRM systems, and workflow tools that save time and boost productivity.",
    keywords: "business software solutions, desktop software development, SaaS application, custom business software, enterprise software, ERP software, inventory management, business automation, software development company",
    canonical: "https://devoriatech.com/services/business-software",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".bs-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-bs-hero">
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
          <Link href="/services">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-cyan-400/60 hover:text-cyan-400 font-medium tracking-wider uppercase transition-colors duration-300 mb-8 cursor-pointer" data-testid="link-back-services">
              <ArrowRight className="w-3 h-3 rotate-180" /> Back to Services
            </span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] text-cyan-400 mb-6 tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Business Software
                </span>
              </motion.div>

              <SplitText
                text="Business Software Solutions for Modern Companies"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-bs-title"
              />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light">
                Businesses today rely on technology to manage operations, improve efficiency, and stay competitive in the digital market. Devoria Tech provides advanced business software solutions designed to help companies automate processes, manage data, and improve productivity.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8">
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-bs-hero-cta">
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
                <img loading="lazy" src={businessHeroImg} alt="Business software solutions and enterprise management systems" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bs-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-bs-${i}`}>
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
          <div className="bs-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Understanding Business Software</span>
            <SplitText text="What Are Business Software Solutions" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="bs-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Business software solutions are digital systems designed to help organizations manage various business operations efficiently. These solutions allow companies to automate repetitive tasks, organize business data, and improve overall productivity.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              By implementing the right software systems, businesses can save time, reduce human errors, and improve operational efficiency. Devoria Tech develops powerful business software that helps companies build organized and automated workflows.
            </p>
          </div>
          <div className="bs-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {overviewCards.map((card, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border" data-testid={`overview-bs-${i}`}>
                <div className="p-5">
                  <card.icon className="w-5 h-5 text-cyan-400/50 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-1">{card.title}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed font-light">{card.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bs-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Our Services</span>
            <SplitText text="Business Software Development Services" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>

          <div className="bs-fade mb-8 text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center space-y-3">
            <p>Devoria Tech offers a wide range of business software development services designed to meet the needs of modern organizations.</p>
            <p>Our team builds secure, scalable, and high-performance software systems that help businesses operate more efficiently.</p>
          </div>

          <div className="space-y-5">
            {softwareSections.map((section, i) => (
              <SoftwareSection key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bs-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Key Benefits</span>
            <SplitText text="Benefits of Business Software Solutions" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="bs-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Implementing the right business software can significantly improve how a company operates. Businesses that adopt digital software systems often experience higher productivity and better operational control.</p>
          </div>
          <div className="bs-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefitSections.map((benefit, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`benefit-bs-${i}`}>
                <benefit.icon className="w-5 h-5 text-cyan-400/50 mb-3" />
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
          <div className="bs-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Industries We Serve</span>
            <SplitText text="Industries That Benefit from Business Software" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="bs-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industrySections.map((industry, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border" data-testid={`industry-bs-${i}`}>
                <div className="p-5">
                  <industry.icon className="w-5 h-5 text-cyan-400/50 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-1">{industry.title}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed font-light">{industry.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
          <div className="bs-fade text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto text-center mt-6">
            <p>Devoria Tech develops software solutions tailored to the needs of these industries.</p>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bs-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Our Process</span>
            <SplitText text="Our Business Software Development Process" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="bs-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech follows a structured development process to ensure high-quality software solutions.</p>
          </div>
          <div className="bs-fade space-y-4 max-w-3xl mx-auto">
            {processSections.map((step, i) => (
              <div key={i} className="flex items-start gap-5 p-5 rounded-2xl neon-border bg-white/[0.01]" data-testid={`process-bs-${i}`}>
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
          <div className="bs-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="bs-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for Business Software</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech is committed to delivering reliable and innovative software solutions that help businesses grow in the digital world.
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
            <p className="text-[12px] text-white/20 leading-[1.8] font-light text-center">
              Our goal is to help businesses build powerful software systems that improve efficiency and support digital transformation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bs-fade rounded-2xl neon-border p-8 bg-white/[0.01]" data-testid="bs-future">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">Future of Business Software Solutions</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light max-w-2xl mx-auto">
                Technology is constantly evolving, and businesses must adapt to stay competitive. Modern business software now includes advanced technologies such as cloud computing, artificial intelligence, and automation. Companies that invest in digital software solutions gain a strong competitive advantage by improving efficiency and delivering better services to their customers.
              </p>
              <p className="text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto mt-3">
                Devoria Tech helps businesses stay ahead by building modern software systems designed for future growth.
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
              <SplitText text="Start Your Business Software Project" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>If your company is looking to automate operations and build powerful digital systems, Devoria Tech can help.</p>
                <p>Our business software solutions are designed to improve productivity, simplify workflows, and support business growth.</p>
                <p>Contact Devoria Tech today to develop custom software solutions that help your business operate smarter and grow faster in the digital world.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-bs-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(20,184,166,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your Software Project <ArrowRight className="w-4 h-4" />
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
