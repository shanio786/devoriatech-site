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
  ShoppingCart, CreditCard, Package, Search,
  Smartphone, BarChart3, Shield, Users,
  Globe, Layers, Zap, Award, Eye,
  Lock, Settings, Layout, ShoppingBag,
  TrendingUp, MousePointerClick,
} from "lucide-react";
import ecommerceHeroImg from "@assets/ecommerce-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "300+", label: "Stores Launched", icon: ShoppingCart },
  { value: "$50M+", label: "Revenue Generated", icon: TrendingUp },
  { value: "99%", label: "Client Satisfaction", icon: Award },
  { value: "3x", label: "Avg. Conversion Lift", icon: BarChart3 },
];

const completeSolutions = [
  "Online store design and development",
  "Shopify e-commerce development",
  "WooCommerce store development",
  "Custom e-commerce platform development",
  "Payment gateway integration",
  "Product catalog management",
  "Shopping cart and checkout optimization",
];

const sections = [
  {
    title: "Shopify E-Commerce Development",
    icon: ShoppingBag,
    intro: "Shopify is one of the most popular e-commerce platforms used by businesses around the world. It provides powerful tools that allow companies to manage products, process payments, and handle orders easily. Devoria Tech provides complete Shopify development services for businesses that want to build modern online stores.",
    subSections: [
      {
        title: "Shopify Store Setup",
        description: "We help businesses launch fully functional Shopify stores with professional design and advanced features.",
        items: ["Store configuration and setup", "Product catalog creation", "Payment gateway integration", "Shipping and tax settings", "Mobile responsive design"],
        outro: "These features ensure your Shopify store is ready to start selling products globally.",
      },
      {
        title: "Shopify Store Customization",
        description: "Every business has unique branding and design requirements. Devoria Tech customizes Shopify stores to create visually appealing and high-performing online shops.",
        items: ["Custom Shopify theme design", "Product page optimization", "Store layout improvements", "App integration and customization", "Conversion rate optimization"],
        outro: "These improvements help businesses create online stores that attract customers and increase sales.",
      },
    ],
  },
  {
    title: "WooCommerce Development Services",
    icon: Globe,
    intro: "WooCommerce is a powerful e-commerce platform built for WordPress websites. It allows businesses to convert their websites into fully functional online stores. Devoria Tech provides professional WooCommerce development services that help businesses create flexible and scalable e-commerce platforms.",
    subSections: [
      {
        title: "WooCommerce Store Development",
        description: "Our WooCommerce development services cover everything from initial setup to full customization.",
        items: ["WooCommerce store setup", "Custom store design", "Product page optimization", "Payment gateway integration", "Shipping configuration"],
        outro: "WooCommerce provides excellent flexibility for businesses that want complete control over their online stores.",
      },
      {
        title: "WooCommerce Customization",
        description: "Devoria Tech customizes WooCommerce stores to provide unique features and improved user experiences.",
        items: ["Custom WooCommerce themes", "Plugin integration and development", "Custom product pages", "Store performance optimization"],
        outro: "These improvements help businesses create powerful and unique online stores.",
      },
    ],
  },
  {
    title: "Custom E-Commerce Website Development",
    icon: Layers,
    intro: "Some businesses require advanced e-commerce platforms with custom functionality. Devoria Tech develops custom e-commerce websites tailored to specific business needs. Custom e-commerce platforms provide greater flexibility and allow businesses to implement unique features and workflows.",
    items: ["Custom shopping platforms", "Marketplace development", "Subscription-based e-commerce systems", "Advanced inventory management", "Custom checkout systems"],
    outro: "These solutions help businesses build scalable digital commerce platforms.",
  },
  {
    title: "Secure Payment Gateway Integration",
    icon: CreditCard,
    intro: "A secure payment system is one of the most important elements of an online store. Customers must feel confident when making purchases online. Devoria Tech integrates trusted payment gateways that ensure safe and secure transactions.",
    items: ["Credit and debit card payments", "Online payment gateways", "Digital wallet integration", "Secure checkout systems"],
    outro: "These features allow businesses to accept payments from customers around the world.",
  },
  {
    title: "Product Catalog and Inventory Management",
    icon: Package,
    intro: "Managing products efficiently is essential for successful e-commerce operations. Devoria Tech develops systems that allow businesses to manage their product catalogs easily.",
    items: ["Product category organization", "Product descriptions and images", "Inventory tracking systems", "Product search functionality", "Order management systems"],
    outro: "These features help businesses manage their online stores efficiently.",
  },
  {
    title: "Mobile Friendly Online Stores",
    icon: Smartphone,
    intro: "A large percentage of online shoppers use mobile devices to browse and purchase products. Devoria Tech ensures that every e-commerce website is fully optimized for mobile users.",
    items: ["Responsive design layouts", "Fast mobile loading speed", "Easy navigation on smartphones", "Mobile optimized checkout systems"],
    outro: "These improvements enhance user experience and increase conversion rates.",
  },
  {
    title: "SEO for E-Commerce Websites",
    icon: Search,
    intro: "Search engine optimization is essential for attracting organic traffic to online stores. Devoria Tech develops e-commerce websites using SEO best practices to improve search engine rankings.",
    items: ["SEO optimized product pages", "Keyword optimized product descriptions", "Search engine friendly URLs", "Internal linking structure", "Fast website performance"],
    outro: "These techniques help online stores rank higher on search engines and attract more potential customers.",
  },
  {
    title: "Conversion Optimization for Online Stores",
    icon: MousePointerClick,
    intro: "Driving traffic to an online store is important, but converting visitors into customers is equally important. Devoria Tech focuses on conversion rate optimization to improve sales performance.",
    items: ["User friendly navigation", "Clear product information", "Fast checkout process", "Trust signals and secure payment badges", "High quality product images"],
    outro: "These elements encourage visitors to complete purchases and increase revenue.",
  },
];

const whyChooseItems = [
  { icon: Users, label: "Experienced e-commerce developers" },
  { icon: Layers, label: "Modern and scalable store development" },
  { icon: Search, label: "SEO optimized e-commerce platforms" },
  { icon: Lock, label: "Secure payment and checkout systems" },
  { icon: Eye, label: "Custom design and branding" },
];

function EcomSection({ section, index }: { section: typeof sections[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="ec-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`ec-section-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`ec-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-ec-section-${index}`}
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
        id={`ec-content-${index}`}
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

export default function EcommerceSolutions() {
  useSEO({
    title: "Online Stores That Sell – Shopify, WooCommerce & Custom E-Commerce | Devoria Tech",
    description: "Professional e-commerce development services. Shopify stores, WooCommerce websites, custom e-commerce platforms, payment integration, SEO optimization, and conversion rate optimization. Devoria Tech builds scalable online stores for businesses worldwide.",
    keywords: "e-commerce development, online store, Shopify development, WooCommerce development, custom e-commerce, payment gateway, product catalog, mobile commerce, e-commerce SEO, conversion optimization, shopping cart, checkout optimization",
    canonical: "https://devoriatech.com/services/web-development/ecommerce-solutions",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".ec-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-ec-hero">
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
                  E-Commerce Solutions
                </span>
              </motion.div>

              <SplitText
                text="E-Commerce Solutions – Professional Online Store Development"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-ec-title"
              />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light">
                E-commerce has transformed the way businesses sell products and connect with customers. Devoria Tech provides professional e-commerce solutions designed to help businesses build modern, secure, and high-performing online stores that reach global markets and increase sales.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8">
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-ec-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Launch Your Store <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </span>
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }} className="mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden neon-border">
                <img loading="lazy" src={ecommerceHeroImg} alt="Professional e-commerce online store development" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ec-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-ec-${i}`}>
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
          <div className="ec-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Overview</span>
            <SplitText text="Complete E-Commerce Development Services" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="ec-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Devoria Tech offers a wide range of e-commerce development services that help businesses sell products online effectively. Our e-commerce development services focus on creating user-friendly platforms that provide seamless shopping experiences.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              From product browsing to secure payment processing, every element of an online store must be optimized for performance and conversions.
            </p>
          </div>
          <div className="ec-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto mb-16">
            {completeSolutions.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] neon-border" data-testid={`ec-overview-${i}`}>
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
          <div className="ec-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">In Detail</span>
            <SplitText text="Our E-Commerce Services" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>

          <div className="space-y-5">
            {sections.map((section, i) => (
              <EcomSection key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ec-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="ec-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for E-Commerce Development</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech focuses on delivering high-quality e-commerce solutions that help businesses succeed in the digital marketplace.
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
              Our goal is to build online stores that provide excellent user experiences and support long-term business growth.
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
              <SplitText text="Start Your E-Commerce Project with Devoria Tech" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>Launching a successful online store requires the right combination of design, technology, and strategy. Devoria Tech helps businesses create powerful e-commerce platforms that attract customers and increase sales.</p>
                <p>Whether you need a Shopify store, a WooCommerce website, or a custom e-commerce platform, our development team provides professional solutions tailored to your business needs.</p>
                <p>Start your e-commerce journey with Devoria Tech and build an online store that reaches customers worldwide and supports your business growth.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-ec-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Launch Your Store <ArrowRight className="w-4 h-4" />
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
