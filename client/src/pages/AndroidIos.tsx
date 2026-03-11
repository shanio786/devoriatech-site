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
  Smartphone, Tablet, Shield, Zap,
  Users, Award, Eye, Layout,
  Settings, Bug, MonitorSmartphone,
  Paintbrush, Lock, Gauge,
} from "lucide-react";
import androidIosHeroImg from "@assets/android-ios-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "200+", label: "Native Apps Built", icon: Smartphone },
  { value: "30M+", label: "Total Downloads", icon: Users },
  { value: "4.9★", label: "Avg. App Rating", icon: Award },
  { value: "100%", label: "Store Approval Rate", icon: Shield },
];

const serviceOverview = [
  "Custom mobile application development",
  "Business mobile apps",
  "eCommerce mobile apps",
  "App UI/UX design",
  "App testing and quality assurance",
  "App maintenance and updates",
];

const sections = [
  {
    title: "Android App Development",
    icon: Smartphone,
    intro: "Android is the most widely used mobile operating system in the world. Businesses can reach millions of users by developing high-quality Android applications. Devoria Tech provides professional Android app development services that focus on building powerful and user-friendly applications. Our Android development process ensures that applications are optimized for performance and compatibility across different Android devices.",
    subSections: [
      {
        title: "Custom Android Applications",
        description: "Every business has unique needs. Devoria Tech develops custom Android applications designed to meet specific business goals and user requirements. These applications can include service platforms, online stores, booking systems, and business management tools.",
      },
      {
        title: "Android App Performance Optimization",
        description: "Performance plays a key role in the success of a mobile application. Our developers optimize Android apps to ensure fast loading speed and smooth performance across multiple devices.",
      },
      {
        title: "Secure Android Development",
        description: "Security is an important part of mobile application development. Devoria Tech implements secure coding practices and advanced security measures to protect user data and application functionality.",
      },
    ],
  },
  {
    title: "iOS App Development",
    icon: Tablet,
    intro: "iOS applications provide a premium experience for users and are widely used across Apple devices such as iPhones and iPads. Devoria Tech develops high-quality iOS applications designed to deliver powerful functionality and smooth user experiences. Our iOS developers create applications that follow Apple's design standards and development guidelines to ensure optimal performance.",
    subSections: [
      {
        title: "Custom iOS Application Development",
        description: "We build custom iOS apps tailored to business requirements. These apps provide advanced functionality and high performance across Apple devices.",
      },
      {
        title: "Business and eCommerce iOS Apps",
        description: "Devoria Tech develops iOS applications for businesses that want to provide mobile shopping experiences, service platforms, or digital tools for customers.",
      },
      {
        title: "High Performance and Security",
        description: "Our iOS applications are built with a strong focus on security and performance. We use modern development practices to ensure applications run smoothly and protect user information.",
      },
    ],
  },
  {
    title: "UI/UX Design for Mobile Applications",
    icon: Paintbrush,
    intro: "The success of a mobile app depends greatly on its design and user experience. Devoria Tech focuses on creating mobile app designs that are easy to use, visually attractive, and highly engaging.",
    items: ["User research and planning", "Wireframe and prototype development", "Modern interface design", "Smooth navigation and interaction"],
    outro: "A well-designed mobile application improves user satisfaction and encourages long-term engagement.",
  },
  {
    title: "Mobile App Testing and Quality Assurance",
    icon: Bug,
    intro: "Before launching any mobile application, it is important to ensure that the app works perfectly on different devices and operating systems. Devoria Tech performs complete testing and quality assurance to identify and fix potential issues before release.",
    items: ["Performance testing", "Security testing", "Device compatibility testing", "Bug detection and fixing"],
    outro: "This process ensures that mobile apps provide a stable and reliable experience for users.",
  },
];

const whyChooseItems = [
  { icon: Users, label: "Experienced mobile app developers" },
  { icon: Settings, label: "Modern development technologies" },
  { icon: Eye, label: "User-focused mobile app design" },
  { icon: Shield, label: "Secure and scalable applications" },
  { icon: Zap, label: "Reliable support and maintenance" },
];

function AppSection({ section, index }: { section: typeof sections[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="ai-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`ai-section-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`ai-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-ai-section-${index}`}
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
        id={`ai-content-${index}`}
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ maxHeight: isOpen ? "5000px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-4">
          <p className="text-[13px] text-white/30 leading-[1.8] font-light">{section.intro}</p>

          {section.subSections && section.subSections.map((sub, si) => (
            <div key={si} className="rounded-xl bg-white/[0.015] border border-white/[0.04] p-4 sm:p-5 space-y-3">
              <h4 className="text-[13px] font-semibold text-white/45">{sub.title}</h4>
              <p className="text-[12px] text-white/25 leading-[1.8] font-light">{sub.description}</p>
            </div>
          ))}

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

          {section.outro && (
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">{section.outro}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AndroidIos() {
  useSEO({
    title: "Android & iOS Apps – Native Mobile Development Done Right | Devoria Tech",
    description: "Professional Android and iOS app development services. Custom mobile applications, business apps, eCommerce apps, UI/UX design, testing, and maintenance. Devoria Tech builds high-performance native mobile apps for businesses worldwide.",
    keywords: "Android app development, iOS app development, mobile app development, custom mobile apps, business apps, eCommerce apps, mobile UI/UX design, app testing, app maintenance, native mobile development",
    canonical: "https://devoriatech.com/services/app-development/android-ios",
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
          <Link href="/services/app-development">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-cyan-400/60 hover:text-cyan-400 font-medium tracking-wider uppercase transition-colors duration-300 mb-8 cursor-pointer" data-testid="link-back-ad">
              <ArrowRight className="w-3 h-3 rotate-180" /> Back to App Development
            </span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] text-cyan-400 mb-6 tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Android & iOS
                </span>
              </motion.div>

              <SplitText
                text="Android & iOS App Development Services"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-ai-title"
              />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light">
                Mobile applications have become an important part of modern digital businesses. Devoria Tech provides professional Android and iOS app development services designed to help businesses build powerful and reliable mobile applications that deliver excellent performance.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8">
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-ai-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Build Your App <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </span>
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }} className="mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden neon-border">
                <img loading="lazy" src={androidIosHeroImg} alt="Android and iOS mobile app development" className="w-full h-auto object-cover aspect-video" />
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
          <div className="ai-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Overview</span>
            <SplitText text="Professional Android and iOS App Development Company" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="ai-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Devoria Tech is a modern mobile app development company that specializes in building applications for both Android and iOS platforms. Our developers have experience creating mobile applications that provide smooth performance, secure functionality, and attractive user interfaces.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              We use modern development frameworks and tools to build mobile apps that are optimized for speed, usability, and scalability. Our development process focuses on understanding business requirements and creating applications that solve real user problems.
            </p>
          </div>
          <div className="ai-fade grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-3xl mx-auto mb-16">
            {serviceOverview.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] neon-border" data-testid={`ai-overview-${i}`}>
                <CheckCircle className="w-4 h-4 text-cyan-400/40 shrink-0" />
                <span className="text-[12px] text-white/30 font-light">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ai-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">In Detail</span>
            <SplitText text="Our Android & iOS Development Services" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>

          <div className="space-y-5">
            {sections.map((section, i) => (
              <AppSection key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ai-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="ai-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for Android & iOS Development</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech focuses on delivering high-quality mobile applications that help businesses grow and succeed in the digital world.
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
              Our team works closely with clients to understand their business goals and deliver mobile solutions that create real value.
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
              <SplitText text="Build Your Mobile App with Devoria Tech" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>Mobile applications provide businesses with powerful tools to reach customers and improve digital services. With the right mobile development partner, companies can create innovative apps that enhance user engagement and drive business growth.</p>
                <p>Devoria Tech offers professional Android and iOS app development services designed to transform ideas into powerful mobile solutions.</p>
                <p>If you are looking for a reliable mobile app development company, Devoria Tech is ready to help you build high-quality mobile applications that deliver excellent user experiences.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-ai-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Build Your App <ArrowRight className="w-4 h-4" />
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
