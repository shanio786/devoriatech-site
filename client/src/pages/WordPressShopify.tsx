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
  Globe, ShoppingBag, Search, Zap,
  Shield, Smartphone, Users, Award,
  Code2, Layers, Lock, Settings,
  BarChart3, Eye, Monitor, Layout,
} from "lucide-react";
import wpShopifyHeroImg from "@assets/wp-shopify-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "400+", label: "WordPress Sites Built", icon: Globe },
  { value: "200+", label: "Shopify Stores Launched", icon: ShoppingBag },
  { value: "99%", label: "Client Satisfaction", icon: Award },
  { value: "<2s", label: "Avg. Load Time", icon: Zap },
];

const wpSections = [
  {
    title: "Custom WordPress Website Development",
    icon: Globe,
    intro: "Every business has unique goals, which is why Devoria Tech develops custom WordPress websites tailored to each client's needs.",
    items: ["Custom website design", "SEO optimized website structure", "Responsive mobile-friendly layout", "Custom WordPress themes", "Plugin development and customization", "Website performance optimization"],
    outro: "These features ensure your website performs efficiently and provides an excellent experience for visitors.",
  },
  {
    title: "Business Website Development",
    icon: Monitor,
    intro: "A professional website is essential for building trust with customers. Devoria Tech develops business websites that represent your brand and communicate your services clearly.",
    items: ["Present your services professionally", "Improve brand credibility", "Generate leads and customer inquiries", "Provide valuable information for visitors"],
    outro: "With a professional WordPress website, businesses can establish a strong online presence and reach more customers.",
  },
  {
    title: "WordPress SEO Optimization",
    icon: Search,
    intro: "Search engine optimization is essential for increasing website visibility and attracting organic traffic. Devoria Tech builds WordPress websites using SEO best practices to help businesses rank higher on search engines.",
    items: ["SEO-friendly website structure", "Fast loading speed", "Optimized images and content", "Clean and structured code", "Mobile responsive design"],
    outro: "These improvements help websites perform better in search engine results.",
  },
];

const shopifySections = [
  {
    title: "Shopify Store Development",
    icon: ShoppingBag,
    intro: "Devoria Tech helps businesses launch fully functional Shopify stores with professional design and powerful features.",
    items: ["Shopify store setup and configuration", "Product catalog setup", "Payment gateway integration", "Shipping and tax configuration", "Mobile responsive store design"],
    outro: "These features ensure your online store is ready to sell products worldwide.",
  },
  {
    title: "Shopify Store Customization",
    icon: Layout,
    intro: "Every online business needs a unique brand identity. Devoria Tech customizes Shopify stores to create visually appealing and highly functional eCommerce websites.",
    items: ["Custom Shopify themes", "Product page design optimization", "Store layout improvements", "Checkout process optimization", "App integrations"],
    outro: "These improvements help businesses create a professional online store that stands out from competitors.",
  },
  {
    title: "Shopify Performance Optimization",
    icon: Zap,
    intro: "Website speed and performance are critical factors in eCommerce success. Devoria Tech optimizes Shopify stores to ensure fast loading times and smooth performance.",
    items: ["Speed optimization", "Mobile responsiveness improvements", "Image compression and optimization", "Code optimization"],
    outro: "A faster website improves customer experience and increases sales conversions.",
  },
];

const wpIdealFor = ["Business websites", "Service websites", "Blogs and content websites", "Custom website projects"];
const shopifyIdealFor = ["Online stores", "eCommerce businesses", "Product-based companies", "Businesses selling worldwide"];

const ecommerceFeatures = ["Secure payment gateway integration", "Product catalog management", "Customer account features", "Inventory management systems", "Order tracking systems"];
const mobileFeatures = ["Responsive design layouts", "Touch-friendly navigation", "Fast mobile loading speed", "Optimized mobile user interface"];
const seoFeatures = ["Clean code structure", "Fast loading performance", "Optimized headings and content", "SEO-friendly URLs", "Internal linking structure"];

const whyChooseItems = [
  { icon: Users, label: "Experienced WordPress and Shopify developers" },
  { icon: Layers, label: "Modern website design and functionality" },
  { icon: Search, label: "SEO optimized website structure" },
  { icon: Zap, label: "Fast and secure development practices" },
  { icon: Shield, label: "Reliable support and maintenance" },
];

function AccordionSection({ title, icon: Icon, intro, items, outro, index, prefix }: {
  title: string; icon: any; intro: string; items: string[]; outro: string; index: number; prefix: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="wps-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`${prefix}-section-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`${prefix}-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-${prefix}-section-${index}`}
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-500/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-5 h-5 text-cyan-400/70" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors duration-500">
            {title}
          </h3>
          <p className="text-[12px] text-white/25 mt-1 font-light line-clamp-1">{intro}</p>
        </div>
        <ChevronDown className={`w-5 h-5 text-cyan-400/40 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div
        id={`${prefix}-content-${index}`}
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ maxHeight: isOpen ? "3000px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-4">
          <p className="text-[13px] text-white/30 leading-[1.8] font-light">{intro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {items.map((item, ii) => (
              <div key={ii} className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400/40 mt-0.5 shrink-0" />
                <span className="text-[12px] text-white/25 font-light">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-[13px] text-white/30 leading-[1.8] font-light">{outro}</p>
        </div>
      </div>
    </div>
  );
}

export default function WordPressShopify() {
  useSEO({
    title: "WordPress & Shopify Websites – Quick Setup, Great Design | Devoria Tech",
    description: "Professional WordPress and Shopify development services. Custom WordPress websites, Shopify store development, eCommerce solutions, SEO optimization, and mobile-friendly design. Devoria Tech builds scalable websites for businesses worldwide.",
    keywords: "WordPress development, Shopify development, WordPress website, Shopify store, eCommerce development, custom WordPress themes, Shopify customization, WooCommerce, website design, SEO optimization, mobile responsive, online store development",
    canonical: "https://devoriatech.com/services/web-development/wordpress-shopify",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".wps-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-wps-hero">
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
                  WordPress & Shopify
                </span>
              </motion.div>

              <SplitText
                text="WordPress & Shopify Development Services"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-wps-title"
              />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light">
                Devoria Tech provides professional WordPress and Shopify development services for businesses that want powerful, scalable, and easy-to-manage websites. Our development team builds modern websites and online stores designed to improve user experience, increase conversions, and support business growth.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8">
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-wps-hero-cta">
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

            <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }} className="mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden neon-border">
                <img loading="lazy" src={wpShopifyHeroImg} alt="WordPress and Shopify development platform visualization" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="wps-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-wps-${i}`}>
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

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="wps-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">WordPress</span>
            <SplitText text="WordPress Development Services" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
            <p className="mt-5 text-[13px] text-white/30 max-w-2xl mx-auto leading-relaxed font-light">
              WordPress powers more than forty percent of websites on the internet. It is one of the most powerful and flexible content management systems available today. Our WordPress solutions are designed for startups, small businesses, and enterprises that want reliable and scalable websites.
            </p>
          </div>

          <div className="space-y-5">
            {wpSections.map((section, i) => (
              <AccordionSection key={i} {...section} index={i} prefix="wp" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="wps-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Shopify</span>
            <SplitText text="Shopify Development Services" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
            <p className="mt-5 text-[13px] text-white/30 max-w-2xl mx-auto leading-relaxed font-light">
              Shopify is one of the leading eCommerce platforms for building online stores. It provides powerful tools that allow businesses to manage products, process payments, and handle orders easily. Our Shopify solutions are designed to provide smooth shopping experiences and maximize online sales.
            </p>
          </div>

          <div className="space-y-5">
            {shopifySections.map((section, i) => (
              <AccordionSection key={i} {...section} index={i} prefix="shopify" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="wps-fade text-center mb-10">
            <SplitText text="WordPress vs Shopify – Choosing the Right Platform" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight" />
            <p className="mt-5 text-[13px] text-white/30 max-w-2xl mx-auto leading-relaxed font-light">
              Many businesses ask whether they should choose WordPress or Shopify. Both platforms are powerful, but they serve different purposes. Devoria Tech helps businesses choose the right platform based on their goals, budget, and business model.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TiltCard className="wps-fade rounded-2xl neon-border" data-testid="card-wp-ideal">
              <div className="p-6 sm:p-8 bg-gradient-to-br from-blue-500/5 to-transparent">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-400/70" />
                  </div>
                  <h3 className="text-lg font-bold text-white">WordPress is ideal for</h3>
                </div>
                <div className="space-y-2">
                  {wpIdealFor.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-400/40 shrink-0" />
                      <span className="text-[12px] text-white/30 font-light">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
            <TiltCard className="wps-fade rounded-2xl neon-border" data-testid="card-shopify-ideal">
              <div className="p-6 sm:p-8 bg-gradient-to-br from-cyan-500/5 to-transparent">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-cyan-400/70" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Shopify is best for</h3>
                </div>
                <div className="space-y-2">
                  {shopifyIdealFor.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400/40 shrink-0" />
                      <span className="text-[12px] text-white/30 font-light">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-10" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="wps-fade rounded-2xl neon-border p-6 sm:p-8 bg-white/[0.01]" data-testid="card-ecommerce">
              <h2 className="text-xl font-bold text-white mb-3">eCommerce Solutions</h2>
              <p className="text-[12px] text-white/25 leading-[1.8] font-light mb-4">For businesses that want to sell products online using WordPress WooCommerce and Shopify platforms.</p>
              <div className="space-y-2">
                {ecommerceFeatures.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-white/[0.02]">
                    <CheckCircle className="w-3 h-3 text-cyan-400/30 mt-0.5 shrink-0" />
                    <span className="text-[11px] text-white/25 font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="wps-fade rounded-2xl neon-border p-6 sm:p-8 bg-white/[0.01]" data-testid="card-mobile">
              <h2 className="text-xl font-bold text-white mb-3">Mobile Friendly Development</h2>
              <p className="text-[12px] text-white/25 leading-[1.8] font-light mb-4">More than half of internet users access websites from mobile devices. Every website we build is fully responsive.</p>
              <div className="space-y-2">
                {mobileFeatures.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-white/[0.02]">
                    <CheckCircle className="w-3 h-3 text-cyan-400/30 mt-0.5 shrink-0" />
                    <span className="text-[11px] text-white/25 font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="wps-fade rounded-2xl neon-border p-6 sm:p-8 bg-white/[0.01]" data-testid="card-seo-dev">
              <h2 className="text-xl font-bold text-white mb-3">SEO Friendly Development</h2>
              <p className="text-[12px] text-white/25 leading-[1.8] font-light mb-4">Search engine optimization is built into every website developed by Devoria Tech.</p>
              <div className="space-y-2">
                {seoFeatures.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-white/[0.02]">
                    <CheckCircle className="w-3 h-3 text-cyan-400/30 mt-0.5 shrink-0" />
                    <span className="text-[11px] text-white/25 font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="wps-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="wps-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for WordPress & Shopify</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech focuses on delivering high-quality web development services that help businesses succeed online.
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
              Our goal is to build digital platforms that support long-term business growth.
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
              <SplitText text="Start Your Website Project with Devoria Tech" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>If you are looking for professional WordPress development or Shopify store development, Devoria Tech is ready to help.</p>
                <p>Our team creates websites and online stores that combine design, technology, and performance to deliver excellent results.</p>
                <p>Whether you need a business website, a professional blog, or a fully functional eCommerce store, Devoria Tech provides the expertise needed to build a successful digital platform.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-wps-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your Project <ArrowRight className="w-4 h-4" />
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
