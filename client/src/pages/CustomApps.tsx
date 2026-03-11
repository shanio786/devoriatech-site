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
  Code2, Layers, Zap, Shield, Search,
  Users, Award, Monitor, Layout,
  BarChart3, Globe, Lock, Server,
  Settings, Smartphone, Eye, MousePointerClick,
  Workflow, Database, Link2,
} from "lucide-react";
import customAppsHeroImg from "@assets/custom-apps-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "100+", label: "Apps Delivered", icon: Code2 },
  { value: "50+", label: "SaaS Platforms Built", icon: Layers },
  { value: "99.9%", label: "Uptime Guarantee", icon: Shield },
  { value: "<1s", label: "Avg. Response Time", icon: Zap },
];

const appSections = [
  {
    title: "React Development Services",
    icon: Code2,
    intro: "React is one of the most popular JavaScript libraries used for building dynamic and interactive user interfaces. It is widely used by modern companies to create fast and responsive web applications. Devoria Tech provides professional React development services to build modern web platforms that deliver excellent user experiences.",
    subSections: [
      {
        title: "Interactive Web Applications",
        description: "React allows developers to build highly interactive web applications with smooth user interfaces. Our team uses React to create modern applications that respond quickly to user actions.",
        items: ["Dynamic content updates", "Interactive dashboards", "Real-time data display"],
      },
      {
        title: "Single Page Applications (SPA)",
        description: "Single Page Applications are web applications that load a single HTML page and dynamically update content without refreshing the entire page. React is ideal for building these applications because it provides fast rendering and efficient performance.",
        items: ["Faster user experience", "Smooth navigation", "Improved application performance", "Better user engagement"],
        outro: "Devoria Tech develops high-performance SPAs that provide seamless digital experiences.",
      },
      {
        title: "React Front-End Development",
        description: "The front-end of an application is the part that users interact with directly. Devoria Tech uses React to build visually attractive and responsive user interfaces.",
        items: ["Usability optimization", "Performance-focused design", "Modern design standards"],
      },
    ],
  },
  {
    title: "Next.js Development Services",
    icon: Layers,
    intro: "Next.js is a powerful framework built on top of React that helps developers create fast and SEO-friendly web applications. Devoria Tech uses Next.js to build modern web platforms that deliver excellent performance and scalability.",
    subSections: [
      {
        title: "High Performance Web Applications",
        description: "Next.js improves website performance by using advanced techniques such as server-side rendering and optimized page loading. Faster websites also perform better on search engines, which improves online visibility.",
        items: ["Server-side rendering", "Optimized page loading", "Faster load times", "Smoother user experiences"],
      },
      {
        title: "SEO Friendly Web Applications",
        description: "One of the biggest advantages of Next.js is its ability to improve search engine optimization. Many traditional web applications have difficulty ranking on search engines because their content is loaded dynamically. Next.js solves this problem by allowing search engines to easily crawl and index website content.",
        items: ["Search engine crawlable content", "Dynamic meta tags", "Structured data support", "Fast indexing"],
      },
      {
        title: "Scalable Web Platforms",
        description: "Next.js is designed to handle large-scale web applications that require high performance and reliability. Devoria Tech builds scalable web platforms that can grow with your business.",
        items: ["Handle increasing users", "Scalable data architecture", "High availability", "Enterprise-grade reliability"],
      },
    ],
  },
  {
    title: "Business Management Dashboards",
    icon: BarChart3,
    intro: "Many businesses need dashboards to manage data, track performance, and monitor operations. We develop custom dashboards that provide real-time information and advanced reporting tools.",
    items: ["Real-time data visualization", "Performance tracking", "Operations monitoring", "Advanced reporting tools", "Custom analytics views"],
  },
  {
    title: "SaaS Platform Development",
    icon: Globe,
    intro: "Software as a Service platforms allow businesses to provide online software services to customers. Devoria Tech develops scalable SaaS applications with secure user authentication, subscription systems, and advanced functionality.",
    items: ["Secure user authentication", "Subscription management systems", "Multi-tenant architecture", "Payment integration", "Admin dashboards"],
  },
  {
    title: "Customer Portals",
    icon: Users,
    intro: "Customer portals allow businesses to provide personalized experiences for users. These portals may include account management, order tracking, document access, and communication tools.",
    items: ["Account management", "Order tracking", "Document access", "Communication tools", "Personalized dashboards"],
  },
  {
    title: "Web Based Tools and Platforms",
    icon: Workflow,
    intro: "We also develop custom web tools that help businesses automate tasks and improve productivity. These tools can include booking systems, project management platforms, and workflow automation solutions.",
    items: ["Booking systems", "Project management platforms", "Workflow automation", "Task management tools", "Custom business tools"],
  },
  {
    title: "Performance and Security Optimization",
    icon: Shield,
    intro: "Custom web applications must be optimized for both performance and security. Devoria Tech ensures that every application we develop follows modern development standards.",
    performanceItems: ["Fast application loading speed", "Efficient data processing", "Optimized code structure", "Scalable server architecture"],
    securityItems: ["Secure authentication systems", "Data protection techniques", "Secure API integrations", "Regular security updates"],
    outro: "These measures ensure that applications remain reliable and protected.",
  },
  {
    title: "API Integration and System Connectivity",
    icon: Link2,
    intro: "Many modern web applications need to connect with external platforms and services. Devoria Tech provides API integration services that allow applications to communicate with other systems.",
    items: ["Payment gateways", "CRM systems", "Third-party APIs", "Marketing platforms", "Data analytics tools"],
    outro: "These integrations allow businesses to automate processes and improve operational efficiency.",
  },
  {
    title: "User Experience and Interface Design",
    icon: Layout,
    intro: "A successful web application must provide a smooth and intuitive user experience. Devoria Tech focuses on building applications that are easy to use and visually appealing.",
    items: ["Clear navigation structure", "Responsive interface design", "Fast interaction speed", "Modern UI design standards"],
    outro: "These elements help users interact with applications easily and efficiently.",
  },
];

const whyChooseItems = [
  { icon: Code2, label: "Experienced React and Next.js developers" },
  { icon: Settings, label: "Modern development technologies" },
  { icon: Layers, label: "Scalable application architecture" },
  { icon: Shield, label: "Secure and reliable solutions" },
  { icon: Eye, label: "User-focused application design" },
];

function AppSection({ section, index }: { section: typeof appSections[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="ca-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`ca-section-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`ca-section-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-ca-section-${index}`}
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
        id={`ca-section-content-${index}`}
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

          {section.performanceItems && (
            <div className="rounded-xl bg-white/[0.015] border border-white/[0.04] p-4 sm:p-5 space-y-3">
              <h4 className="text-[13px] font-semibold text-white/45">Performance Optimization</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {section.performanceItems.map((item, ii) => (
                  <div key={ii} className="flex items-start gap-2.5 p-2 rounded-lg">
                    <CheckCircle className="w-3 h-3 text-cyan-400/30 mt-0.5 shrink-0" />
                    <span className="text-[11px] text-white/25 font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section.securityItems && (
            <div className="rounded-xl bg-white/[0.015] border border-white/[0.04] p-4 sm:p-5 space-y-3">
              <h4 className="text-[13px] font-semibold text-white/45">Security Measures</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {section.securityItems.map((item, ii) => (
                  <div key={ii} className="flex items-start gap-2.5 p-2 rounded-lg">
                    <CheckCircle className="w-3 h-3 text-cyan-400/30 mt-0.5 shrink-0" />
                    <span className="text-[11px] text-white/25 font-light">{item}</span>
                  </div>
                ))}
              </div>
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
              {sub.outro && (
                <p className="text-[11px] text-white/20 leading-[1.8] font-light">{sub.outro}</p>
              )}
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

export default function CustomApps() {
  useSEO({
    title: "Custom Web Apps Built with React & Next.js | Devoria Tech",
    description: "Professional custom web application development using React and Next.js. Build SaaS platforms, business dashboards, customer portals, and interactive web applications. Devoria Tech delivers scalable, secure, and high-performance solutions.",
    keywords: "custom web application, React development, Next.js development, SaaS platform, business dashboard, customer portal, single page application, web app development, API integration, front-end development, scalable web applications",
    canonical: "https://devoriatech.com/services/web-development/custom-apps",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".ca-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-ca-hero">
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
          <Link href="/services/web-development">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-cyan-400/60 hover:text-cyan-400 font-medium tracking-wider uppercase transition-colors duration-300 mb-8 cursor-pointer" data-testid="link-back-wd">
              <ArrowRight className="w-3 h-3 rotate-180" /> Back to Web Development
            </span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] text-cyan-400 mb-6 tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Custom Web Apps
                </span>
              </motion.div>

              <SplitText
                text="Custom Web App Development – React & Next.js Solutions"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-ca-title"
              />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light">
                Devoria Tech provides professional custom web application development services using modern technologies such as React and Next.js. Our development team builds powerful, scalable, and high-performance web applications designed to help businesses streamline operations, improve user experiences, and support long-term growth.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8">
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-ca-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
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
                <img loading="lazy" src={customAppsHeroImg} alt="Custom web application development with React and Next.js" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ca-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-ca-${i}`}>
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
          <div className="ca-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Understanding Custom Apps</span>
            <SplitText text="What is Custom Web Application Development?" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="ca-fade max-w-3xl mx-auto text-center space-y-4 mb-16">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Custom web application development is the process of building software applications that run on web browsers and are specifically designed for a business's unique needs.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Unlike traditional websites, web applications provide advanced features such as user accounts, real-time data processing, dashboards, automation tools, and interactive interfaces.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Businesses use custom web applications to improve productivity, manage operations, and provide better services to customers. Devoria Tech builds custom applications that are scalable, secure, and designed to grow with your business.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ca-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">In Detail</span>
            <SplitText text="Our Custom App Development Services" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>

          <div className="ca-fade mb-8 text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center space-y-3">
            <p>In today's digital world, many businesses require more than a standard website. They need advanced digital platforms that can manage data, automate processes, and deliver dynamic user experiences.</p>
            <p>At Devoria Tech, we specialize in developing modern web applications that are fast, secure, and optimized for performance. Using advanced frameworks like React and Next.js, we build applications that deliver smooth user interfaces and reliable functionality.</p>
          </div>

          <div className="space-y-5">
            {appSections.map((section, i) => (
              <AppSection key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ca-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="ca-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for Custom App Development</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech focuses on delivering high-quality web applications that meet the needs of modern businesses.
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
              Our team works closely with clients to understand their goals and create custom applications that deliver real value.
            </p>
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
              <SplitText text="Build Your Custom Web Application with Devoria Tech" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>Custom web applications can transform the way businesses operate and interact with customers. Devoria Tech helps businesses build powerful digital platforms using modern technologies like React and Next.js.</p>
                <p>Whether you need a SaaS platform, a business dashboard, or a custom web tool, our development team provides the expertise needed to deliver high-performance applications.</p>
                <p>Start your custom app development project with Devoria Tech and create digital solutions that support your business growth and innovation.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-ca-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your App Project <ArrowRight className="w-4 h-4" />
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
