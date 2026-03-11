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
  Cloud, Globe, CreditCard, RefreshCw, Layers,
  Shield, Zap, Users, BarChart3, Code2,
  Database, Settings, Lock, Server,
  Megaphone, Landmark, GraduationCap, Heart, Briefcase,
  Rocket,
} from "lucide-react";
import saasHeroImg from "@assets/saas-development-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "40+", label: "SaaS Platforms Built", icon: Cloud },
  { value: "1M+", label: "End Users Served", icon: Users },
  { value: "99.99%", label: "Platform Uptime", icon: Shield },
  { value: "10x", label: "Faster Deployment", icon: Zap },
];

const benefitSections = [
  {
    icon: Globe,
    title: "Global Accessibility",
    description: "Users can access SaaS platforms from anywhere in the world using any internet-connected device. This flexibility allows businesses to serve customers across multiple regions and markets.",
  },
  {
    icon: CreditCard,
    title: "Lower Software Maintenance Costs",
    description: "Traditional software requires installation, updates, and maintenance on individual systems. SaaS platforms allow businesses to manage software centrally, which significantly reduces maintenance costs.",
  },
  {
    icon: RefreshCw,
    title: "Automatic Updates",
    description: "SaaS platforms allow developers to release updates and improvements without requiring users to reinstall software. This ensures users always have access to the latest version of the platform.",
  },
  {
    icon: Layers,
    title: "Scalable Infrastructure",
    description: "Cloud-based SaaS applications can scale easily as user demand grows. Businesses can support thousands or even millions of users without affecting system performance.",
  },
  {
    icon: BarChart3,
    title: "Subscription-Based Revenue Model",
    description: "SaaS platforms allow businesses to generate recurring revenue through subscription plans. This model provides predictable income and long-term customer relationships.",
  },
];

const customFeatures = [
  "Multi-user dashboards",
  "Subscription and billing systems",
  "Customer management tools",
  "Analytics and reporting systems",
  "Workflow automation tools",
  "Cloud-based business management systems",
];

const startupFeatures = [
  "SaaS product development",
  "MVP development for SaaS startups",
  "Cloud infrastructure setup",
  "User subscription systems",
];

const enterpriseFeatures = [
  "Business management software",
  "Enterprise resource planning systems",
  "Corporate collaboration platforms",
  "Advanced analytics tools",
];

const keyFeatureSections = [
  {
    title: "Multi-Tenant Architecture",
    icon: Server,
    intro: "Multi-tenant architecture allows multiple users or organizations to use the same platform while keeping their data secure and separate.",
    items: ["Isolated data storage per tenant", "Shared infrastructure efficiency", "Custom tenant configurations", "Secure data separation"],
  },
  {
    title: "Secure Authentication Systems",
    icon: Lock,
    intro: "Security is essential for SaaS platforms. We implement secure authentication systems such as role-based access control and encrypted login systems.",
    items: ["Role-based access control", "Two-factor authentication", "Encrypted login systems", "Session management"],
  },
  {
    title: "Subscription and Billing Systems",
    icon: CreditCard,
    intro: "SaaS platforms often use subscription models. We develop billing systems that support monthly or yearly subscriptions and integrate payment gateways.",
    items: ["Monthly/yearly subscription plans", "Payment gateway integration", "Invoice generation", "Usage-based billing"],
  },
  {
    title: "Cloud-Based Data Management",
    icon: Database,
    intro: "Our SaaS applications use secure cloud infrastructure to store and manage user data efficiently.",
    items: ["Encrypted cloud storage", "Automated data backups", "Data migration tools", "Real-time data sync"],
  },
  {
    title: "High Performance and Speed",
    icon: Zap,
    intro: "We optimize SaaS platforms to handle large numbers of users while maintaining fast response times and reliable performance.",
    items: ["CDN optimization", "Load balancing", "Caching strategies", "Database query optimization"],
  },
];

const techStack = [
  "React and Next.js for frontend development",
  "Node.js and Python for backend systems",
  "Cloud infrastructure such as AWS and Google Cloud",
  "Secure database systems",
  "REST API and third-party integrations",
];

const industrySections = [
  { icon: Megaphone, title: "Marketing & Advertising", description: "Marketing agencies use SaaS tools for campaign management, analytics, and marketing automation." },
  { icon: Landmark, title: "Financial Technology", description: "Fintech companies use SaaS platforms for payment processing, financial management, and transaction monitoring." },
  { icon: GraduationCap, title: "Education Technology", description: "Online education platforms use SaaS systems to manage courses, student accounts, and digital learning tools." },
  { icon: Heart, title: "Healthcare Management", description: "Healthcare providers use SaaS systems for patient management, appointment scheduling, and medical record systems." },
  { icon: Briefcase, title: "Business Productivity", description: "Many organizations use SaaS platforms for project management, collaboration, and workflow automation." },
];

const processSections = [
  { num: "01", title: "Business and Product Planning", description: "We start by understanding the product idea, target audience, and business goals." },
  { num: "02", title: "SaaS Architecture Design", description: "Our team designs a scalable system architecture that supports high traffic and secure data management." },
  { num: "03", title: "Platform Development", description: "Our developers build the SaaS platform using modern technologies and optimized coding practices." },
  { num: "04", title: "Testing and Quality Assurance", description: "Before launch, the platform undergoes extensive testing to ensure stability, security, and performance." },
  { num: "05", title: "Deployment and Maintenance", description: "After deployment, we provide ongoing support, updates, and system maintenance." },
];

const whyChooseItems = [
  { icon: Code2, label: "Experienced SaaS developers" },
  { icon: Cloud, label: "Scalable cloud architecture" },
  { icon: Shield, label: "Secure and reliable software systems" },
  { icon: Settings, label: "Customized SaaS platforms" },
  { icon: Layers, label: "Ongoing technical support" },
];

function FeatureSection({ section, index }: { section: typeof keyFeatureSections[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="sa-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`sa-feature-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`sa-feature-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-sa-feature-${index}`}
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-500/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
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
        id={`sa-feature-content-${index}`}
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

export default function SaasApplication() {
  useSEO({
    title: "SaaS Development – Build Your Cloud Software Platform | Devoria Tech",
    description: "Professional SaaS application development services by Devoria Tech. Build scalable cloud-based software platforms with multi-tenant architecture, subscription billing, secure authentication, and high-performance infrastructure for startups and enterprises.",
    keywords: "SaaS application development, SaaS platform, cloud software development, subscription software, multi-tenant architecture, SaaS startup, cloud infrastructure, scalable software, SaaS billing system, enterprise SaaS",
    canonical: "https://devoriatech.com/services/business-software/saas-application",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".sa-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-sa-hero">
        <div className="absolute inset-0 hero-gradient-bg" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03]">
          <div className="absolute inset-0 rounded-full border border-white/10 animate-orbit" style={{ animationDuration: "25s" }}>
            <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-blue-500/40 blur-sm" />
          </div>
          <div className="absolute inset-8 rounded-full border border-white/5 animate-orbit" style={{ animationDuration: "35s", animationDirection: "reverse" }}>
            <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-cyan-400/40 blur-sm" />
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
                  SaaS Development
                </span>
              </motion.div>

              <SplitText
                text="SaaS Application Development Services for Scalable Cloud Software"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-sa-title"
              />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light">
                SaaS applications allow users to access software directly from a web browser without installing it on their devices. Devoria Tech helps businesses design, develop, and launch powerful SaaS platforms that are secure, scalable, and optimized for performance.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8">
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-sa-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Launch Your SaaS Platform <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </span>
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }} className="mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden neon-border">
                <img loading="lazy" src={saasHeroImg} alt="SaaS application development and cloud software platform" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sa-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-sa-${i}`}>
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
          <div className="sa-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Understanding SaaS</span>
            <SplitText text="What is SaaS Application Development" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="sa-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              SaaS application development is the process of building software platforms that are hosted on cloud infrastructure and accessed through the internet. Instead of installing software on individual devices, users access SaaS platforms through web browsers or mobile applications.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              This software model allows businesses to deliver services to customers worldwide while maintaining centralized control over updates, security, and data management. Many successful global platforms operate using the SaaS model.
            </p>
          </div>
          <div className="sa-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {["CRM systems", "Project management platforms", "Marketing automation tools", "Accounting software", "Collaboration & communication tools"].map((example, i) => (
              <div key={i} className="flex items-center gap-2.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400/40 shrink-0" />
                <span className="text-[12px] text-white/30 font-light">{example}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sa-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Key Advantages</span>
            <SplitText text="Benefits of SaaS Applications for Businesses" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="sa-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>SaaS platforms offer several advantages that make them attractive for both businesses and users.</p>
          </div>
          <div className="sa-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefitSections.map((benefit, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`benefit-sa-${i}`}>
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
          <div className="sa-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Custom Solutions</span>
            <SplitText text="Custom SaaS Platform Development" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="sa-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Every business has unique requirements when it comes to software solutions. Devoria Tech provides custom SaaS application development services that allow companies to build platforms tailored to their specific needs.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              By developing tailored SaaS platforms, businesses can create unique digital products that provide real value to users.
            </p>
          </div>
          <div className="sa-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
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
          <div className="sa-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">For All Business Sizes</span>
            <SplitText text="SaaS Solutions for Startups and Enterprises" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="sa-fade grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl neon-border p-6 sm:p-8 bg-white/[0.01]" data-testid="sa-startups">
              <div className="flex items-center gap-3 mb-4">
                <Rocket className="w-5 h-5 text-cyan-400/60" />
                <h3 className="text-lg font-bold text-white">SaaS Development for Startups</h3>
              </div>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mb-4">
                Startups often use SaaS platforms to launch innovative software products and reach global markets quickly. Our team helps startups design scalable platforms that support rapid growth.
              </p>
              <div className="space-y-2">
                {startupFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400/40 shrink-0" />
                    <span className="text-[12px] text-white/25 font-light">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl neon-border p-6 sm:p-8 bg-white/[0.01]" data-testid="sa-enterprises">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-5 h-5 text-cyan-400/60" />
                <h3 className="text-lg font-bold text-white">SaaS Development for Enterprises</h3>
              </div>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mb-4">
                Large organizations also use SaaS solutions to improve internal systems and deliver software services to customers. Devoria Tech develops enterprise SaaS platforms that support high traffic, complex workflows, and secure data management.
              </p>
              <div className="space-y-2">
                {enterpriseFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400/40 shrink-0" />
                    <span className="text-[12px] text-white/25 font-light">{feature}</span>
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
          <div className="sa-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Platform Features</span>
            <SplitText text="Key Features of Our SaaS Applications" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="sa-fade mb-8 text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center">
            <p>Our SaaS platforms include modern features designed to support business growth and provide excellent user experiences.</p>
          </div>
          <div className="space-y-5">
            {keyFeatureSections.map((section, i) => (
              <FeatureSection key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sa-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Tech Stack</span>
            <SplitText text="Technologies We Use for SaaS Development" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="sa-fade max-w-2xl mx-auto text-center mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">Devoria Tech uses modern development technologies to build high-performance SaaS platforms. These technologies ensure that SaaS platforms remain scalable, secure, and future-ready.</p>
          </div>
          <div className="sa-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {techStack.map((tech, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl neon-border bg-white/[0.01]" data-testid={`tech-sa-${i}`}>
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
          <div className="sa-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Industries We Serve</span>
            <SplitText text="SaaS Applications for Different Industries" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="sa-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industrySections.map((industry, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border" data-testid={`industry-sa-${i}`}>
                <div className="p-5">
                  <industry.icon className="w-5 h-5 text-cyan-400/50 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-1">{industry.title}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed font-light">{industry.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
          <div className="sa-fade text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto text-center mt-6">
            <p>Devoria Tech develops SaaS solutions tailored to the needs of each industry.</p>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sa-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Our Process</span>
            <SplitText text="Our SaaS Development Process" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="sa-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech follows a structured approach to SaaS development to ensure high-quality results.</p>
          </div>
          <div className="sa-fade space-y-4 max-w-3xl mx-auto">
            {processSections.map((step, i) => (
              <div key={i} className="flex items-start gap-5 p-5 rounded-2xl neon-border bg-white/[0.01]" data-testid={`process-sa-${i}`}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-500/15 flex items-center justify-center shrink-0">
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
          <div className="sa-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="sa-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for SaaS Development</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech is a trusted digital agency specializing in cloud software and SaaS development. Our goal is to help businesses build successful SaaS products that attract users and generate long-term revenue.
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
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-500/10" />
            <div className="absolute inset-0 border border-white/[0.06] rounded-[2rem]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
            <div className="relative z-10">
              <SplitText text="Launch Your SaaS Platform with Devoria Tech" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>If you want to build a cloud-based software platform or launch a SaaS product, Devoria Tech can help you turn your idea into a powerful digital solution.</p>
                <p>Our SaaS application development services are designed to create scalable platforms that support global users and long-term business growth.</p>
                <p>Contact Devoria Tech today to start developing a secure and high-performance SaaS platform for your business.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-sa-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your SaaS Project <ArrowRight className="w-4 h-4" />
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
