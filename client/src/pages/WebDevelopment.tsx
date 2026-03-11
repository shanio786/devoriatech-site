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
  Globe, Code2, ShoppingBag, Layers,
  Monitor, Zap, Shield, TrendingUp,
  Users, Award, Search, Settings,
  Lock, Smartphone, BarChart3, Eye,
  FileText, Server, Layout,
} from "lucide-react";
import webDevHeroImg from "@assets/web-dev-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const overviewItems = [
  { icon: Globe, label: "WordPress Website Development" },
  { icon: ShoppingBag, label: "Shopify eCommerce Development" },
  { icon: Code2, label: "Custom Web Applications" },
  { icon: Layers, label: "React & Next.js Development" },
  { icon: Monitor, label: "Business Website Development" },
  { icon: ShoppingBag, label: "eCommerce Website Solutions" },
  { icon: Zap, label: "Website Performance Optimization" },
];

const stats = [
  { value: "500+", label: "Websites Delivered", icon: Award },
  { value: "99.9%", label: "Uptime Guarantee", icon: Shield },
  { value: "3s", label: "Avg. Load Time", icon: Zap },
  { value: "100%", label: "Responsive Design", icon: Smartphone },
];

const webSections = [
  {
    title: "WordPress Website Development",
    icon: Globe,
    intro: "WordPress is one of the most popular content management systems in the world. It powers millions of websites because of its flexibility, ease of use, and powerful customization options. Devoria Tech provides professional WordPress development services for businesses that want a reliable and easy-to-manage website.",
    introExtra: "Our WordPress websites are designed to be fast, secure, and optimized for search engines. This helps businesses attract more visitors and improve their online presence.",
    subSections: [
      {
        title: "Custom WordPress Website Design",
        description: "Every business has unique needs, which is why Devoria Tech creates custom WordPress websites instead of using generic templates.",
        items: ["Professional website design", "Responsive mobile-friendly layouts", "SEO optimized structure", "Custom themes and plugins", "Website speed optimization"],
        outro: "These features ensure your website performs well and provides a great user experience.",
      },
      {
        title: "Business Websites and Corporate Websites",
        description: "Devoria Tech develops professional business websites that represent your brand and communicate your services clearly.",
        items: ["Build trust with customers", "Provide clear service information", "Generate leads and inquiries", "Improve brand credibility"],
        outro: "A professional website helps businesses compete in the digital marketplace.",
      },
    ],
  },
  {
    title: "Shopify Development Services",
    icon: ShoppingBag,
    intro: "For businesses that want to sell products online, Shopify is one of the best eCommerce platforms available today. Devoria Tech provides complete Shopify development services that help businesses create powerful online stores.",
    introExtra: "Our Shopify solutions focus on creating stores that are easy to manage, visually appealing, and optimized for conversions.",
    subSections: [
      {
        title: "Shopify Store Setup",
        description: "Devoria Tech helps businesses launch fully functional Shopify stores quickly and efficiently.",
        items: ["Store configuration", "Product catalog setup", "Payment gateway integration", "Shipping configuration", "Store design customization"],
        outro: "These features ensure your store is ready to start selling online.",
      },
      {
        title: "Shopify Store Customization",
        description: "We also provide advanced Shopify customization to help businesses create unique online stores that stand out from competitors.",
        items: ["Custom store design", "Product page optimization", "Shopify theme customization", "Conversion optimization"],
        outro: "These improvements help increase online sales and improve the customer shopping experience.",
      },
    ],
  },
  {
    title: "Custom Web Application Development",
    icon: Code2,
    intro: "Some businesses require advanced digital platforms that cannot be built using standard website systems. Devoria Tech develops custom web applications using modern technologies such as React and Next.js.",
    introExtra: "Custom web applications provide powerful features and flexibility for businesses that need advanced functionality.",
    items: ["Web applications", "SaaS platforms", "Business management dashboards", "Customer portals", "API integrations"],
    outro: "Custom applications allow businesses to automate processes and create unique digital experiences.",
  },
  {
    title: "React and Next.js Development",
    icon: Layers,
    intro: "React and Next.js are modern JavaScript frameworks used to build fast and scalable web applications. Devoria Tech uses these technologies to create powerful web platforms that deliver excellent performance and user experiences.",
    subSections: [
      {
        title: "React Web Applications",
        description: "React is widely used for building dynamic user interfaces and interactive web applications.",
        items: ["Single page applications", "Dynamic web platforms", "Interactive dashboards", "Custom front-end development"],
        outro: "React allows developers to create fast and responsive applications.",
      },
      {
        title: "Next.js Development",
        description: "Next.js is a powerful framework that improves website speed, performance, and search engine optimization. Devoria Tech uses Next.js to build websites that load quickly and perform well on search engines.",
        items: ["Faster website performance", "SEO-friendly architecture", "Server-side rendering", "Scalable web applications"],
        outro: "These features make Next.js ideal for modern business websites.",
      },
    ],
  },
  {
    title: "E-Commerce Website Development",
    icon: ShoppingBag,
    intro: "Online shopping has become one of the fastest growing industries in the digital world. Devoria Tech provides professional eCommerce development services that help businesses create powerful online stores.",
    introExtra: "Our eCommerce websites are designed to provide smooth shopping experiences and secure transactions.",
    subSections: [
      {
        title: "Custom Online Store Development",
        description: "We develop custom online stores tailored to your business needs. Our eCommerce websites include modern design, powerful features, and secure payment systems.",
        items: ["Mobile-friendly shopping experience", "Secure payment gateway integration", "Product catalog management", "Order management systems", "Customer account features"],
        outro: "These features help businesses manage online sales efficiently.",
      },
      {
        title: "eCommerce Optimization",
        description: "Devoria Tech also focuses on optimizing eCommerce websites for better performance and conversions.",
        items: ["Product page SEO optimization", "Faster website loading speed", "User experience improvements", "Checkout process optimization"],
        outro: "These improvements help businesses increase sales and improve customer satisfaction.",
      },
    ],
  },
  {
    title: "SEO Friendly Web Development",
    icon: Search,
    intro: "A website should not only look good but also perform well on search engines. Devoria Tech develops websites using SEO best practices to ensure they can rank higher on Google and other search engines.",
    items: ["Clean and optimized code structure", "Mobile responsive design", "Fast loading speed", "Search engine friendly URLs", "Optimized content structure"],
    outro: "These elements help websites attract organic traffic and improve search visibility.",
  },
  {
    title: "Website Performance and Security",
    icon: Shield,
    intro: "Website performance and security are essential for providing a safe and smooth user experience. Devoria Tech ensures that every website we build follows modern security standards and performance optimization techniques.",
    items: ["Website speed optimization", "Image and code optimization", "Secure hosting configuration", "SSL security integration", "Regular website updates"],
    outro: "These measures protect websites from security threats and improve reliability.",
  },
];

const whyChooseItems = [
  { icon: Users, label: "Experienced web developers" },
  { icon: Code2, label: "Modern technologies and frameworks" },
  { icon: Search, label: "SEO optimized website structure" },
  { icon: Zap, label: "Fast and responsive website design" },
  { icon: Layers, label: "Scalable development solutions" },
  { icon: Shield, label: "Reliable technical support" },
];

function WebSection({ section, index }: { section: typeof webSections[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="wd-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`wd-section-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`wd-section-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-wd-section-${index}`}
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
        id={`wd-section-content-${index}`}
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ maxHeight: isOpen ? "5000px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-4">
          <p className="text-[13px] text-white/30 leading-[1.8] font-light">{section.intro}</p>
          {section.introExtra && (
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">{section.introExtra}</p>
          )}

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

export default function WebDevelopment() {
  useSEO({
    title: "Web Development – Fast, Modern Websites Built Right | Devoria Tech",
    description: "We build fast, modern websites using WordPress, Shopify, React, and Next.js. Whether you need a simple site or a complex web app, we have got you covered.",
    keywords: "web development, website development, WordPress development, Shopify development, React development, Next.js development, custom web applications, eCommerce development, responsive design, SEO friendly websites, website optimization, web developer",
    canonical: "https://devoriatech.com/services/web-development",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".wd-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-wd-hero">
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
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] text-cyan-400 mb-6 tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Web Development
                </span>
              </motion.div>

              <SplitText
                text="Web Development Services – Professional Website Development"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-wd-title"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light"
              >
                A professional website is the foundation of every successful online business. Devoria Tech provides modern web development services designed to help businesses build powerful digital platforms that attract visitors, engage users, and generate revenue.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-8 flex flex-col sm:flex-row items-start gap-4"
              >
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-wd-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Start Your Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </span>
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="mt-8 lg:mt-0"
            >
              <div className="relative rounded-2xl overflow-hidden neon-border">
                <img loading="lazy" src={webDevHeroImg} alt="Modern web development technologies and code visualization" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="wd-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-wd-${i}`}>
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
          <div className="wd-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">What We Offer</span>
            <SplitText text="Complete Web Development Solutions" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
            <p className="mt-5 text-[13px] text-white/30 max-w-2xl mx-auto leading-relaxed font-light">
              Devoria Tech offers a full range of website development services for businesses worldwide. Our goal is to create websites that are visually attractive, technically strong, and optimized for search engines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
            {overviewItems.map((svc, i) => (
              <TiltCard key={i} className="wd-fade rounded-2xl neon-border" data-testid={`card-wd-overview-${i}`}>
                <div className="p-5 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 h-full flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                    <svc.icon className="w-4 h-4 text-cyan-400/70" />
                  </div>
                  <span className="text-[12px] font-medium text-white/50">{svc.label}</span>
                </div>
              </TiltCard>
            ))}
          </div>
          <p className="wd-fade text-[12px] text-white/20 leading-[1.8] font-light text-center max-w-2xl mx-auto">
            By combining creative design with modern technology, we help businesses build websites that support growth and digital success.
          </p>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="wd-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">In Detail</span>
            <SplitText text="Explore Our Web Development Services" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>

          <div className="wd-fade mb-8 text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center space-y-3">
            <p>In today's competitive digital environment, businesses need websites that are fast, responsive, secure, and optimized for search engines. A well-developed website not only improves online visibility but also builds trust with potential customers.</p>
            <p>Devoria Tech specializes in building high-performance websites using modern technologies and industry best practices. Our web development solutions are designed to deliver excellent user experiences, strong functionality, and long-term scalability.</p>
          </div>

          <div className="space-y-5">
            {webSections.map((section, i) => (
              <WebSection key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="wd-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="wd-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for Web Development</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech focuses on delivering high-quality web development solutions that help businesses grow online.
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
              Our team works closely with clients to ensure every project meets business goals and provides long-term value.
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
              <SplitText text="Build Your Website with Devoria Tech" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>A powerful website can transform your business and open new opportunities in the digital world. Devoria Tech helps businesses create professional websites that attract customers and drive growth.</p>
                <p>Whether you need a WordPress website, a Shopify store, or a custom web application built with React or Next.js, our team provides the expertise needed to deliver exceptional results.</p>
                <p>Start your web development project with Devoria Tech and build a digital platform that supports your business success.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-wd-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your Web Project <ArrowRight className="w-4 h-4" />
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
