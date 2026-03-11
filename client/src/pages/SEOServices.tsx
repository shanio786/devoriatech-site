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
  Search, Target, Globe, TrendingUp,
  Settings, Link2, MapPin, ShoppingBag,
  FileText, BarChart3, Zap, Shield,
  Eye, Users, Award,
} from "lucide-react";
import seoHeroImg from "@assets/seo-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const seoOverviewItems = [
  { icon: Search, label: "Keyword Research & SEO Strategy" },
  { icon: FileText, label: "On Page SEO Optimization" },
  { icon: Settings, label: "Technical SEO Improvements" },
  { icon: Link2, label: "Off Page SEO & Link Building" },
  { icon: MapPin, label: "Local SEO Optimization" },
  { icon: ShoppingBag, label: "eCommerce SEO Services" },
  { icon: FileText, label: "SEO Content Marketing" },
];

const stats = [
  { value: "500%", label: "Avg. Organic Growth", icon: TrendingUp },
  { value: "Top 10", label: "Rankings Achieved", icon: Award },
  { value: "1M+", label: "Organic Visitors Generated", icon: Users },
  { value: "200+", label: "Keywords Ranked", icon: Search },
];

const seoSections = [
  {
    title: "Keyword Research and SEO Strategy",
    icon: Search,
    intro: "Keyword research is the foundation of a successful SEO campaign. Devoria Tech conducts detailed keyword research to identify the search terms that potential customers use when looking for products or services.",
    analyzeItems: ["Search volume", "Competition level", "User intent", "Industry trends"],
    outro: "By targeting the right keywords, businesses can attract highly relevant traffic that is more likely to convert into customers. A strong SEO strategy ensures that your website content matches what users are searching for online.",
  },
  {
    title: "On Page SEO Optimization",
    icon: FileText,
    intro: "On page SEO focuses on optimizing individual web pages so they rank higher in search results and provide better user experiences. Devoria Tech improves on-page elements that help search engines understand your website content.",
    items: ["SEO optimized titles and meta descriptions", "Proper heading structure (H1, H2, H3)", "Keyword optimization in content", "Image optimization with alt tags", "Internal linking strategy", "SEO friendly URLs"],
    outro: "These improvements help search engines crawl and index your website more effectively.",
  },
  {
    title: "Technical SEO Services",
    icon: Settings,
    intro: "Technical SEO focuses on improving the performance and structure of a website to make it easier for search engines to crawl and index pages. A technically optimized website loads faster, works smoothly on mobile devices, and provides a better user experience.",
    items: ["Website speed optimization", "Mobile responsiveness improvements", "Fixing crawl errors and broken links", "XML sitemap creation", "Robots.txt optimization", "Core Web Vitals improvements"],
    outro: "These technical improvements help search engines rank websites higher while improving user satisfaction.",
  },
  {
    title: "Off Page SEO and Link Building",
    icon: Link2,
    intro: "Off page SEO focuses on building authority and trust for your website through external signals such as backlinks. Backlinks are links from other websites that point to your site. Search engines consider high-quality backlinks as a signal that your website is trustworthy and valuable.",
    introExtra: "Devoria Tech builds strong backlinks through ethical and white-hat SEO techniques.",
    items: ["High-quality backlink building", "Guest posting strategies", "Business directory submissions", "Brand mentions and citations", "Outreach campaigns"],
    outro: "These strategies help increase domain authority and improve search engine rankings.",
  },
  {
    title: "Local SEO Services",
    icon: MapPin,
    intro: "Local SEO helps businesses appear in search results when people search for services in their area. This is especially important for businesses that serve specific cities or regions. Devoria Tech optimizes business profiles and local search signals to help companies rank higher in local search results.",
    items: ["Google Business Profile optimization", "Local keyword targeting", "Location based SEO strategies", "Local citations and directory listings", "Customer review management"],
    outro: "Local SEO helps businesses attract nearby customers who are actively searching for their services.",
  },
  {
    title: "eCommerce SEO",
    icon: ShoppingBag,
    intro: "For online stores, SEO plays a critical role in attracting customers and increasing product sales. Devoria Tech provides specialized eCommerce SEO services for platforms such as Shopify, WooCommerce, and custom eCommerce websites.",
    items: ["Product page optimization", "Category page SEO", "eCommerce keyword research", "Product description optimization", "Technical optimization for online stores"],
    outro: "These improvements help online stores rank higher for product searches and attract more buyers.",
  },
  {
    title: "SEO Content Marketing",
    icon: FileText,
    intro: "Content is one of the most important factors in search engine optimization. High-quality content helps websites rank higher while providing valuable information to users. Devoria Tech creates SEO optimized content that targets important keywords and provides useful information for readers.",
    items: ["Blog writing and SEO articles", "Website page content optimization", "Landing page copywriting", "Educational content creation"],
    outro: "By combining strong content with keyword strategy, we help businesses build authority and attract organic traffic.",
  },
  {
    title: "SEO Analytics and Performance Tracking",
    icon: BarChart3,
    intro: "SEO is an ongoing process that requires monitoring and improvement. Devoria Tech tracks important metrics to measure SEO performance and identify growth opportunities.",
    items: ["Organic traffic growth", "Keyword ranking improvements", "User behavior and engagement", "Conversion rates"],
    outro: "These insights help us optimize SEO campaigns and achieve better results over time.",
  },
];

const whyChooseItems = [
  { icon: Users, label: "Experienced SEO specialists" },
  { icon: Target, label: "Proven SEO strategies" },
  { icon: Shield, label: "White-hat SEO techniques" },
  { icon: BarChart3, label: "Data-driven optimization" },
  { icon: Eye, label: "Transparent reporting and communication" },
];

function SEOSection({ section, index }: { section: typeof seoSections[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="seo-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`seo-section-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`seo-section-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-seo-section-${index}`}
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
        id={`seo-section-content-${index}`}
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ maxHeight: isOpen ? "3000px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-4">
          <p className="text-[13px] text-white/30 leading-[1.8] font-light">{section.intro}</p>
          {section.introExtra && (
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">{section.introExtra}</p>
          )}

          {section.analyzeItems && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {section.analyzeItems.map((item, ii) => (
                <div key={ii} className="text-center p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-[11px] text-white/30 font-light">{item}</span>
                </div>
              ))}
            </div>
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

          {section.outro && (
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">{section.outro}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SEOServices() {
  useSEO({
    title: "SEO Services – Get Found on Google & Drive Real Traffic | Devoria Tech",
    description: "Want more organic traffic from Google? Our SEO services cover keyword research, on-page optimization, technical fixes, and link building to help your site rank higher.",
    keywords: "SEO services, search engine optimization, keyword research, on-page SEO, technical SEO, link building, local SEO, eCommerce SEO, Google ranking, organic traffic, SEO agency, SEO company, backlinks, content marketing, Core Web Vitals, website optimization",
    canonical: "https://devoriatech.com/services/digital-marketing/seo",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".seo-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-seo-hero">
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
          <Link href="/services/digital-marketing">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-cyan-400/60 hover:text-cyan-400 font-medium tracking-wider uppercase transition-colors duration-300 mb-8 cursor-pointer" data-testid="link-back-dm">
              <ArrowRight className="w-3 h-3 rotate-180" /> Back to Digital Marketing
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
                  Search Engine Optimization
                </span>
              </motion.div>

              <SplitText
                text="SEO Services – Professional Search Engine Optimization"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-seo-title"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light"
              >
                Search Engine Optimization (SEO) is one of the most effective ways to grow a business online. Devoria Tech provides professional SEO services that help websites rank higher on Google, attract targeted traffic, and generate more leads.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-8 flex flex-col sm:flex-row items-start gap-4"
              >
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-seo-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Get Free SEO Audit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                <img loading="lazy" src={seoHeroImg} alt="SEO analytics and search ranking visualization" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="seo-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-seo-${i}`}>
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
          <div className="seo-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Understanding SEO</span>
            <SplitText text="What is Search Engine Optimization?" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="seo-fade max-w-3xl mx-auto text-center space-y-4 mb-16">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Search Engine Optimization is the process of improving a website so it can rank higher in search engine results pages. The goal of SEO is to make a website more visible to people who are searching for related products or services.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              SEO involves optimizing website content, improving technical performance, and building authority through high-quality backlinks. When a website follows SEO best practices, search engines like Google can easily understand its content and show it to users who are searching for relevant information.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Devoria Tech provides complete SEO solutions that help businesses increase website traffic, improve search rankings, and build long-term online visibility.
            </p>
          </div>

          <div className="seo-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">What We Offer</span>
            <SplitText text="Our Complete SEO Services" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
            <p className="mt-5 text-[13px] text-white/30 max-w-xl mx-auto leading-relaxed font-light">
              Devoria Tech offers a wide range of SEO services designed to improve website performance and search engine rankings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
            {seoOverviewItems.map((svc, i) => (
              <TiltCard key={i} className="seo-fade rounded-2xl neon-border" data-testid={`card-seo-overview-${i}`}>
                <div className="p-5 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 h-full flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                    <svc.icon className="w-4 h-4 text-cyan-400/70" />
                  </div>
                  <span className="text-[12px] font-medium text-white/50">{svc.label}</span>
                </div>
              </TiltCard>
            ))}
          </div>
          <p className="seo-fade text-[12px] text-white/20 leading-[1.8] font-light text-center max-w-2xl mx-auto">
            These services work together to create a strong SEO foundation that helps businesses rank higher on search engines.
          </p>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="seo-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">In Detail</span>
            <SplitText text="Explore Our SEO Services" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>

          <div className="seo-fade mb-8 text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center space-y-3">
            <p>Today, millions of people search online for products, services, and information. If your website does not appear on the first page of search results, your business may miss valuable opportunities.</p>
            <p>Our SEO experts use modern tools, keyword research, technical optimization, and high-quality content strategies to improve website rankings and increase organic traffic. Whether you run a small business, an eCommerce store, or a large company, our SEO services help you reach the right audience.</p>
          </div>

          <div className="space-y-5">
            {seoSections.map((section, i) => (
              <SEOSection key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="seo-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="seo-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech SEO Services</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Choosing the right SEO agency can make a major difference in your online success. Devoria Tech focuses on delivering long-term SEO strategies that generate sustainable results.
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
              Our goal is to help businesses grow their online visibility and attract customers through organic search.
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
              <SplitText text="Start Ranking Higher with Devoria Tech" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>If you want your website to appear on the first page of search engines, professional SEO services are essential. Devoria Tech provides complete search engine optimization solutions designed to help businesses grow online.</p>
                <p>Our team works closely with clients to understand their industry, target audience, and business goals. Based on this information, we create customized SEO strategies that improve rankings and increase traffic.</p>
                <p>With Devoria Tech as your SEO partner, you can build a strong online presence and achieve long-term digital success.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-seo-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Get Your Free SEO Audit <ArrowRight className="w-4 h-4" />
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
