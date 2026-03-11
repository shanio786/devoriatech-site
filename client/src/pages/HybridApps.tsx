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
  Code2, Layers, Zap,
  Shield, Users, Award, Eye,
  Settings, Bug, MonitorSmartphone,
  Paintbrush,
} from "lucide-react";
import hybridHeroImg from "@assets/hybrid-apps-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "120+", label: "Hybrid Apps Built", icon: MonitorSmartphone },
  { value: "2x", label: "Faster Development", icon: Zap },
  { value: "40%", label: "Cost Savings Avg.", icon: Award },
  { value: "99%", label: "Cross-Platform Parity", icon: Layers },
];

const crossPlatformBenefits = [
  "Faster application development",
  "Lower development costs",
  "Single codebase for multiple platforms",
  "Easier updates and maintenance",
  "Consistent user experience across devices",
];

const sections = [
  {
    title: "React Native App Development",
    icon: Code2,
    intro: "React Native is one of the most popular frameworks for hybrid mobile app development. It allows developers to create high-performance applications that work on both Android and iOS platforms. Devoria Tech provides professional React Native app development services for businesses that want powerful cross-platform mobile apps.",
    subSections: [
      {
        title: "Fast and Efficient Development",
        description: "React Native allows developers to reuse code across multiple platforms, which speeds up the development process and reduces project costs.",
      },
      {
        title: "High Performance Applications",
        description: "React Native apps deliver performance that is close to native mobile applications. This ensures smooth functionality and a responsive user experience.",
      },
      {
        title: "Scalable Mobile Solutions",
        description: "Our React Native applications are designed with scalability in mind. Businesses can easily add new features and expand their mobile platforms as they grow.",
      },
    ],
    outro: "These advantages make React Native a strong choice for modern mobile app development.",
  },
  {
    title: "Flutter App Development",
    icon: Layers,
    intro: "Flutter is another powerful framework used for hybrid mobile application development. It is known for its ability to create visually attractive and high-performance applications. Devoria Tech provides professional Flutter app development services for businesses that want modern cross-platform mobile applications.",
    subSections: [
      {
        title: "Beautiful User Interfaces",
        description: "Flutter allows developers to create visually appealing mobile apps with modern design elements and smooth animations.",
      },
      {
        title: "High Speed Performance",
        description: "Flutter applications are compiled directly into native code, which allows them to deliver fast and smooth performance.",
      },
      {
        title: "Single Codebase Development",
        description: "With Flutter, developers can build applications for Android and iOS using one codebase, reducing development complexity and maintenance effort.",
      },
    ],
    outro: "Flutter is an excellent choice for businesses that want flexible and modern mobile applications.",
  },
  {
    title: "Hybrid App UI/UX Design",
    icon: Paintbrush,
    intro: "User experience is one of the most important factors in mobile app success. Devoria Tech focuses on designing hybrid applications that are easy to use, visually attractive, and highly engaging.",
    items: ["User behavior analysis", "Mobile app wireframes", "Interactive prototypes", "Modern interface design", "Smooth navigation structure"],
    outro: "By combining creativity with user-focused design strategies, we create mobile apps that deliver excellent user experiences.",
  },
  {
    title: "Custom Hybrid Mobile App Solutions",
    icon: Settings,
    intro: "Every business has unique requirements, and Devoria Tech develops custom hybrid mobile apps designed to meet specific business needs. Our hybrid mobile applications are used across different industries.",
    items: ["eCommerce platforms", "Business management systems", "Booking and reservation applications", "Education and learning platforms", "Health and fitness applications"],
    outro: "These customized solutions help businesses improve digital services and provide better user engagement.",
  },
  {
    title: "Hybrid App Testing and Optimization",
    icon: Bug,
    intro: "Before launching any hybrid mobile application, Devoria Tech performs complete testing and optimization to ensure reliable performance.",
    items: ["Performance testing", "Cross-device compatibility testing", "Security testing", "Bug fixing and optimization"],
    outro: "This ensures that hybrid mobile apps work smoothly across multiple devices and operating systems.",
  },
];

const whyChooseItems = [
  { icon: Users, label: "Experienced mobile app developers" },
  { icon: Code2, label: "Modern frameworks such as React Native and Flutter" },
  { icon: Zap, label: "High performance cross-platform applications" },
  { icon: Eye, label: "User-focused design and development" },
  { icon: Shield, label: "Reliable support and maintenance" },
];

function HybridSection({ section, index }: { section: typeof sections[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="ha-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`ha-section-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`ha-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-ha-section-${index}`}
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
        id={`ha-content-${index}`}
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

export default function HybridApps() {
  useSEO({
    title: "React Native & Flutter Apps – One Codebase, Every Platform | Devoria Tech",
    description: "Professional hybrid app development services using React Native and Flutter. Cross-platform mobile apps for Android and iOS, UI/UX design, custom solutions, and app testing. Devoria Tech builds scalable hybrid mobile applications for businesses worldwide.",
    keywords: "hybrid app development, React Native development, Flutter development, cross-platform apps, mobile app development, hybrid mobile apps, React Native apps, Flutter apps, cross-platform mobile development, mobile UI/UX design",
    canonical: "https://devoriatech.com/services/app-development/hybrid-apps",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".ha-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-ha-hero">
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
                  Hybrid Apps
                </span>
              </motion.div>

              <SplitText
                text="Hybrid App Development Services – React Native & Flutter Apps"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-ha-title"
              />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light">
                Hybrid mobile applications have become a popular solution for businesses that want to launch mobile apps quickly and efficiently. Devoria Tech provides professional hybrid app development services using modern frameworks such as React Native and Flutter, reducing development time while reaching a larger audience.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8">
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-ha-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Build Your Hybrid App <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </span>
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }} className="mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden neon-border">
                <img loading="lazy" src={hybridHeroImg} alt="Hybrid app development with React Native and Flutter" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ha-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-ha-${i}`}>
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
          <div className="ha-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Understanding Hybrid</span>
            <SplitText text="What is Hybrid App Development?" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="ha-fade max-w-3xl mx-auto text-center space-y-4 mb-16">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Hybrid app development is a method of building mobile applications that can run on multiple platforms such as Android and iOS using a single codebase.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Instead of developing separate applications for each platform, developers use modern frameworks that allow apps to function across multiple operating systems. This approach helps businesses save development time and maintenance costs while still delivering a high-quality mobile experience.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Hybrid apps combine the advantages of native mobile apps and web technologies. They provide smooth performance while maintaining flexibility and scalability. Devoria Tech specializes in hybrid mobile app development using advanced frameworks such as React Native and Flutter to build reliable and powerful applications.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ha-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Cross Platform</span>
            <SplitText text="Cross Platform Mobile App Development" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="ha-fade max-w-2xl mx-auto text-center mb-8">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Cross-platform development allows businesses to reach a larger audience by launching applications on both Android and iOS devices simultaneously. Devoria Tech builds cross-platform mobile apps that provide consistent performance across multiple devices and operating systems.
            </p>
          </div>
          <div className="ha-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto mb-16">
            {crossPlatformBenefits.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] neon-border" data-testid={`ha-benefit-${i}`}>
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
          <div className="ha-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">In Detail</span>
            <SplitText text="Our Hybrid App Development Services" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>

          <div className="space-y-5">
            {sections.map((section, i) => (
              <HybridSection key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ha-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="ha-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for Hybrid App Development</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech focuses on building high-quality hybrid mobile applications that provide performance, scalability, and reliability.
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
              Our goal is to deliver mobile applications that help businesses expand their digital presence and reach a wider audience.
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
              <SplitText text="Build Cross Platform Apps with Devoria Tech" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>Hybrid mobile applications provide businesses with a powerful way to reach customers across multiple platforms while reducing development costs.</p>
                <p>Devoria Tech offers professional hybrid app development services using React Native and Flutter to build scalable and modern mobile applications.</p>
                <p>If you are looking for a reliable hybrid mobile app development company, Devoria Tech is ready to help you create powerful cross-platform applications that support business growth and innovation.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-ha-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Build Your Hybrid App <ArrowRight className="w-4 h-4" />
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
