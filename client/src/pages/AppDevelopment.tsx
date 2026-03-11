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
  Smartphone, Tablet, Code2, Layers,
  Zap, Shield, Users, Award,
  Layout, Eye, Settings, Globe,
  Paintbrush, Wrench, MonitorSmartphone,
  Cpu, BarChart3,
} from "lucide-react";
import appDevHeroImg from "@assets/app-dev-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "150+", label: "Apps Delivered", icon: Smartphone },
  { value: "50M+", label: "User Downloads", icon: Users },
  { value: "4.8★", label: "Avg. Store Rating", icon: Award },
  { value: "99.5%", label: "Crash-Free Rate", icon: Shield },
];

const serviceOverview = [
  "Android App Development",
  "iOS App Development",
  "Hybrid App Development",
  "Cross Platform Mobile Apps",
  "UI/UX Mobile App Design",
  "App Maintenance and Updates",
];

const sections = [
  {
    title: "Android App Development Services",
    icon: Smartphone,
    intro: "Android is one of the most widely used mobile operating systems in the world. Businesses can reach millions of users through powerful Android applications. Devoria Tech provides professional Android app development services designed to deliver high-performance mobile applications for Android smartphones and tablets. Our Android apps are built with modern development practices to ensure speed, security, and reliability.",
    subSections: [
      {
        title: "Custom Android Applications",
        description: "We develop custom Android applications tailored to specific business needs. Whether it is a service-based application, an eCommerce platform, or a business management tool, our developers create scalable Android solutions.",
      },
      {
        title: "Enterprise Android Apps",
        description: "Many organizations require internal applications for operations and communication. Devoria Tech develops enterprise-level Android apps that help businesses manage tasks efficiently.",
      },
      {
        title: "Android UI/UX Design",
        description: "User experience plays an important role in the success of a mobile app. Our design team creates modern and user-friendly interfaces that provide smooth navigation and engaging experiences.",
      },
    ],
    items: ["Fast performance", "Secure data handling", "User-friendly interface", "Scalable architecture"],
    outro: "These features help businesses provide better digital experiences for their customers.",
  },
  {
    title: "iOS App Development Services",
    icon: Tablet,
    intro: "iOS apps are known for their performance, security, and premium user experience. Devoria Tech provides professional iOS app development services for businesses that want to reach Apple device users. Our iOS developers build powerful mobile applications for iPhone and iPad devices using modern development tools and technologies.",
    subSections: [
      {
        title: "Custom iOS Applications",
        description: "We design and develop custom iOS applications that match business goals and user expectations. Our apps provide smooth performance and high-quality functionality.",
      },
      {
        title: "Business and eCommerce Apps",
        description: "Devoria Tech develops iOS applications for businesses that want to provide mobile shopping experiences, booking systems, or service platforms.",
      },
      {
        title: "Secure and Scalable iOS Development",
        description: "Security is an important aspect of iOS app development. Our developers follow secure coding practices and use reliable architectures to ensure application stability and data protection.",
      },
    ],
    items: ["iPhone application development", "iPad application development", "App performance optimization", "App store ready development"],
    outro: "These applications provide a premium experience for users across Apple devices.",
  },
  {
    title: "Hybrid App Development Services",
    icon: MonitorSmartphone,
    intro: "Hybrid app development allows businesses to build mobile applications that work on both Android and iOS platforms using a single codebase. Devoria Tech develops hybrid applications using modern frameworks such as React Native and Flutter. These technologies allow developers to create powerful cross-platform applications with high performance and faster development time.",
    items: ["Single codebase for both platforms", "Reduced development costs", "Faster time to market", "Native-like performance"],
    outro: "Hybrid apps are an excellent solution for businesses that want to launch applications quickly while reducing development costs.",
  },
  {
    title: "React Native App Development",
    icon: Code2,
    intro: "React Native is a popular framework used for building cross-platform mobile applications. It allows developers to create apps for Android and iOS using a single codebase. Devoria Tech uses React Native to build fast and scalable mobile apps that deliver near-native performance.",
    items: ["Faster development process", "Cross-platform compatibility", "Cost-effective development", "High performance mobile applications"],
    outro: "These apps provide a smooth experience while reducing development time.",
  },
  {
    title: "Flutter App Development",
    icon: Layers,
    intro: "Flutter is another modern framework used for hybrid mobile app development. It allows developers to create beautiful and high-performance applications for multiple platforms. Devoria Tech builds powerful Flutter applications that provide fast performance and modern user interfaces.",
    items: ["One codebase for Android and iOS", "Attractive and modern UI design", "Fast app performance", "Easy maintenance and updates"],
    outro: "These features make Flutter an excellent choice for businesses that want flexible and scalable mobile apps.",
  },
  {
    title: "Mobile App UI/UX Design",
    icon: Paintbrush,
    intro: "The success of a mobile application depends heavily on its design and user experience. Devoria Tech focuses on creating intuitive and engaging mobile app designs that improve usability and customer satisfaction.",
    items: ["User research and analysis", "Wireframes and prototypes", "Modern interface design", "Smooth navigation and usability"],
    outro: "By combining design creativity with user behavior analysis, we create mobile apps that provide enjoyable experiences.",
  },
  {
    title: "Custom Mobile App Solutions",
    icon: Settings,
    intro: "Every business has unique requirements, and Devoria Tech provides custom mobile app development solutions tailored to specific needs. Our team develops mobile apps for different industries.",
    items: ["eCommerce applications", "Business management apps", "Booking and reservation apps", "Educational apps", "Health and fitness apps"],
    outro: "These customized applications help businesses provide better services and improve customer engagement.",
  },
  {
    title: "Mobile App Maintenance and Support",
    icon: Wrench,
    intro: "Launching a mobile application is only the first step. Regular updates and maintenance are essential to ensure smooth performance and security. Devoria Tech provides mobile app maintenance services.",
    items: ["Bug fixing and performance improvements", "App updates and new features", "Security updates", "Compatibility improvements"],
    outro: "Our support services ensure that mobile applications remain stable and efficient.",
  },
];

const whyChooseItems = [
  { icon: Users, label: "Experienced mobile app developers" },
  { icon: Cpu, label: "Modern development technologies" },
  { icon: Settings, label: "Custom mobile app solutions" },
  { icon: Shield, label: "High performance and secure applications" },
  { icon: Layers, label: "Scalable and future-ready development" },
];

function AppSection({ section, index }: { section: typeof sections[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="ad-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`ad-section-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`ad-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-ad-section-${index}`}
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
        id={`ad-content-${index}`}
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

export default function AppDevelopment() {
  useSEO({
    title: "Mobile App Development – Android, iOS & Cross-Platform Apps | Devoria Tech",
    description: "Need a mobile app? We build Android, iOS, and cross-platform apps using React Native and Flutter. Smooth performance, great design, and apps your users will love.",
    keywords: "mobile app development, Android app development, iOS app development, hybrid app development, React Native, Flutter, cross-platform apps, mobile UI/UX design, custom mobile apps, app maintenance, mobile solutions",
    canonical: "https://devoriatech.com/services/app-development",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".ad-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-ad-hero">
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
                  App Development
                </span>
              </motion.div>

              <SplitText
                text="Mobile App Development Services – Android, iOS & Hybrid Apps"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-ad-title"
              />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light">
                Mobile applications have become an essential part of modern businesses. Devoria Tech provides professional mobile app development services designed to help businesses build powerful and scalable mobile applications for Android, iOS, and cross-platform environments.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8">
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-ad-hero-cta">
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
                <img loading="lazy" src={appDevHeroImg} alt="Mobile app development for Android, iOS, and hybrid platforms" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ad-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-ad-${i}`}>
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
          <div className="ad-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Overview</span>
            <SplitText text="Professional Mobile App Development Company" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="ad-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Devoria Tech is a modern mobile app development company providing custom mobile solutions for startups, businesses, and enterprises worldwide.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Our mobile app development process focuses on innovation, performance, and scalability. We use modern frameworks, advanced development tools, and industry best practices to create applications that perform efficiently across multiple devices.
            </p>
          </div>
          <div className="ad-fade grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-3xl mx-auto mb-16">
            {serviceOverview.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] neon-border" data-testid={`ad-overview-${i}`}>
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
          <div className="ad-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">In Detail</span>
            <SplitText text="Our App Development Services" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>

          <div className="ad-fade mb-8 text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center space-y-3">
            <p>Our expert developers create high-performance mobile apps for Android, iOS, and cross-platform environments using modern technologies. Whether you need a business application, an eCommerce app, or a custom mobile solution, Devoria Tech delivers reliable and user-friendly mobile apps.</p>
            <p>We focus on performance, security, and modern design to ensure every mobile application provides a seamless user experience.</p>
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
          <div className="ad-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="ad-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for App Development</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Choosing the right mobile app development company is essential for building successful digital products. Devoria Tech focuses on delivering reliable and scalable mobile solutions that help businesses grow.
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
              Our team works closely with clients to ensure every application meets business goals and user expectations.
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
              <SplitText text="Start Your Mobile App Project with Devoria Tech" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>Mobile applications have become an important part of digital business growth. With the right development strategy, businesses can reach customers more effectively and improve user engagement.</p>
                <p>Whether you need an Android app, iOS application, or hybrid mobile app using React Native or Flutter, our team is ready to help you transform your ideas into successful mobile solutions.</p>
                <p>Partner with Devoria Tech today and build innovative mobile applications that drive business growth and customer engagement.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-ad-cta">
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
