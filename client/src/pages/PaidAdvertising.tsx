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
  Megaphone, DollarSign, Play, Eye,
  Users, BarChart3, Zap, Shield,
  Monitor, ShoppingBag, MousePointerClick,
  Layers, Award, Mail,
} from "lucide-react";
import paidAdsHeroImg from "@assets/paid-ads-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const overviewItems = [
  { icon: Search, label: "Google Ads Campaign Management" },
  { icon: Megaphone, label: "Meta Ads (Facebook & Instagram)" },
  { icon: Play, label: "YouTube Video Advertising" },
  { icon: Target, label: "PPC Campaign Strategy" },
  { icon: Layers, label: "Ad Creative Development" },
  { icon: BarChart3, label: "Conversion Tracking & Optimization" },
];

const stats = [
  { value: "10x", label: "Avg. Return on Ad Spend", icon: TrendingUp },
  { value: "500+", label: "Campaigns Managed", icon: Award },
  { value: "2M+", label: "Leads Generated", icon: Users },
  { value: "98%", label: "Client Satisfaction", icon: Shield },
];

const adSections = [
  {
    title: "Google Ads Search Campaigns",
    icon: Search,
    intro: "Search ads appear at the top of Google search results when users search for specific keywords. For example, if someone searches for \"web development services\" or \"digital marketing agency,\" your business can appear at the top of the results.",
    items: ["Keyword research and targeting", "Ad copywriting and optimization", "Campaign setup and management", "Budget optimization", "Conversion tracking"],
    outro: "Search ads are ideal for businesses that want to attract customers who are actively searching for their services.",
  },
  {
    title: "Google Display Ads",
    icon: Monitor,
    intro: "Google Display Ads allow businesses to show visual advertisements across millions of websites and apps. These ads help increase brand awareness and reach potential customers even when they are not actively searching.",
    items: ["Banner advertisements", "Image ads", "Retargeting campaigns", "Brand awareness campaigns"],
    outro: "Devoria Tech designs engaging display ads that capture attention and increase brand recognition.",
  },
  {
    title: "Google Shopping Ads",
    icon: ShoppingBag,
    intro: "For eCommerce businesses, Google Shopping Ads provide a powerful way to promote products directly in search results. Shopping ads display product images, prices, and store information, making it easier for customers to compare products and make purchasing decisions.",
    items: ["Product feed optimization", "Campaign setup", "Product keyword targeting", "Shopping ad performance optimization"],
    outro: "These ads help online stores attract buyers who are ready to purchase.",
  },
  {
    title: "Facebook Advertising",
    icon: Users,
    intro: "Facebook remains one of the largest social media platforms in the world, making it an excellent channel for reaching potential customers.",
    items: ["Audience targeting and segmentation", "Creative ad design", "Campaign setup and management", "Lead generation campaigns", "Conversion tracking"],
    outro: "Facebook ads help businesses reach new customers and build strong brand awareness.",
  },
  {
    title: "Instagram Advertising",
    icon: Eye,
    intro: "Instagram is a visually driven platform that allows businesses to promote products and services through engaging visual content. Devoria Tech creates Instagram ad campaigns that attract attention and encourage interaction.",
    items: ["Image ads", "Video ads", "Carousel ads", "Story ads", "Reels advertising"],
    outro: "These ads help businesses connect with younger and highly engaged audiences.",
  },
  {
    title: "YouTube Video Advertising",
    icon: Play,
    intro: "YouTube is the second largest search engine in the world and one of the most powerful platforms for video marketing. Devoria Tech helps businesses promote their brand through professional YouTube advertising campaigns.",
    subSections: [
      { title: "In-Stream Video Ads", items: ["Brand awareness", "Product promotion", "Storytelling marketing"] },
      { title: "Video Discovery Ads", items: ["Promoted in YouTube search results", "Recommended video placements", "Topic-targeted content discovery"] },
      { title: "YouTube Retargeting Ads", items: ["Re-engage website visitors", "Remind potential customers", "Increase conversion rates"] },
    ],
    outro: "Video advertising allows businesses to deliver powerful messages and capture audience attention through engaging content.",
  },
  {
    title: "Advanced Audience Targeting",
    icon: Target,
    intro: "One of the biggest advantages of paid advertising is the ability to target very specific audiences. Devoria Tech uses advanced targeting strategies to ensure your ads reach the most relevant users.",
    items: ["Geographic targeting", "Interest-based targeting", "Demographic targeting", "Behavioral targeting", "Custom audiences", "Lookalike audiences"],
    outro: "These strategies help businesses focus their advertising budget on the people most likely to convert.",
  },
  {
    title: "Conversion Tracking & Campaign Optimization",
    icon: BarChart3,
    intro: "Running ads is only the first step. Continuous optimization is essential to ensure campaigns deliver strong results. Devoria Tech tracks campaign performance using advanced analytics tools.",
    items: ["Click-through rates", "Conversion rates", "Cost per click", "Return on ad spend", "Customer engagement"],
    outro: "Based on this data, we optimize campaigns to improve performance and maximize advertising results.",
  },
];

const whyChooseItems = [
  { icon: Users, label: "Experienced PPC specialists" },
  { icon: BarChart3, label: "Data-driven advertising strategies" },
  { icon: Target, label: "Advanced audience targeting" },
  { icon: Layers, label: "Creative ad design and copywriting" },
  { icon: Zap, label: "Continuous campaign optimization" },
  { icon: Eye, label: "Transparent performance reporting" },
];

const benefitItems = [
  "Immediate traffic to your website",
  "Highly targeted audience reach",
  "Increased brand visibility",
  "Faster lead generation",
  "Measurable campaign performance",
];

function AdSection({ section, index }: { section: typeof adSections[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="ppc-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`ppc-section-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`ppc-section-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-ppc-section-${index}`}
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
        id={`ppc-section-content-${index}`}
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ maxHeight: isOpen ? "3000px" : "0px", opacity: isOpen ? 1 : 0 }}
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
            <div key={si} className="rounded-xl bg-white/[0.015] border border-white/[0.04] p-4 sm:p-5">
              <h4 className="text-[13px] font-semibold text-white/45 mb-3">{sub.title}</h4>
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

export default function PaidAdvertising() {
  useSEO({
    title: "Google Ads, Facebook Ads & YouTube Ads That Bring Results | Devoria Tech",
    description: "Run ads that bring real customers. We manage Google Ads, Facebook Ads, Instagram Ads, and YouTube campaigns that are built to convert and deliver strong ROI.",
    keywords: "paid advertising, PPC, Google Ads, Meta Ads, Facebook Ads, Instagram Ads, YouTube Ads, pay per click, ad campaign management, conversion tracking, display ads, shopping ads, retargeting, audience targeting, digital advertising",
    canonical: "https://devoriatech.com/services/digital-marketing/paid-advertising",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".ppc-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-ppc-hero">
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
                  Paid Advertising
                </span>
              </motion.div>

              <SplitText
                text="Paid Advertising Services – Google Ads, Meta Ads & YouTube Ads"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-ppc-title"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light"
              >
                Paid advertising is one of the fastest and most effective ways to reach potential customers online. Devoria Tech provides professional paid advertising services that help businesses generate targeted traffic, increase brand visibility, and drive more conversions.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-8 flex flex-col sm:flex-row items-start gap-4"
              >
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-ppc-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Get Free PPC Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                <img loading="lazy" src={paidAdsHeroImg} alt="Paid advertising campaign management dashboard visualization" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ppc-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-ppc-${i}`}>
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
          <div className="ppc-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Understanding PPC</span>
            <SplitText text="What is Paid Advertising?" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="ppc-fade max-w-3xl mx-auto text-center space-y-4 mb-16">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Paid advertising, also known as Pay-Per-Click (PPC) marketing, is a digital marketing strategy where businesses pay to display ads on search engines and social media platforms. These ads appear in front of users who are searching for specific products or services or who match a particular audience profile.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Unlike traditional marketing methods, paid advertising allows businesses to target audiences based on interests, location, behavior, demographics, and search intent. This makes advertising campaigns more effective and measurable.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              With the right strategy and optimization, paid advertising can generate immediate traffic, increase leads, and improve overall business growth. Devoria Tech provides professional PPC campaign management that helps businesses maximize their advertising budget and achieve higher returns on investment.
            </p>
          </div>

          <div className="ppc-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">What We Offer</span>
            <SplitText text="Our Paid Advertising Services" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
            <p className="mt-5 text-[13px] text-white/30 max-w-xl mx-auto leading-relaxed font-light">
              Devoria Tech offers complete paid advertising services across the most powerful digital platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {overviewItems.map((svc, i) => (
              <TiltCard key={i} className="ppc-fade rounded-2xl neon-border" data-testid={`card-ppc-overview-${i}`}>
                <div className="p-5 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 h-full flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                    <svc.icon className="w-4 h-4 text-cyan-400/70" />
                  </div>
                  <span className="text-[12px] font-medium text-white/50">{svc.label}</span>
                </div>
              </TiltCard>
            ))}
          </div>
          <p className="ppc-fade text-[12px] text-white/20 leading-[1.8] font-light text-center max-w-2xl mx-auto">
            Our team carefully plans each campaign to ensure it targets the right audience and delivers measurable results.
          </p>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ppc-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">In Detail</span>
            <SplitText text="Explore Our Advertising Services" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>

          <div className="ppc-fade mb-8 text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center space-y-3">
            <p>In today's competitive digital environment, businesses cannot rely only on organic traffic. Paid advertising allows companies to promote their products and services directly to the right audience at the right time.</p>
            <p>Platforms such as Google, Facebook, Instagram, and YouTube offer powerful advertising tools that help businesses reach millions of users worldwide. Devoria Tech specializes in creating and managing high-performance advertising campaigns across multiple platforms.</p>
          </div>

          <div className="space-y-5">
            {adSections.map((section, i) => (
              <AdSection key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ppc-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="ppc-benefits">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Benefits of Paid Advertising</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Paid advertising provides several advantages for businesses looking to grow quickly online. Unlike traditional marketing, digital advertising provides detailed analytics that help businesses track results and improve strategies.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {benefitItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <CheckCircle className="w-4 h-4 text-cyan-400/50 shrink-0" />
                  <span className="text-[13px] text-white/35 font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ppc-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="ppc-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for Paid Advertising</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech focuses on creating advertising campaigns that deliver real business results.
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
              Our goal is to help businesses maximize their advertising investment and achieve sustainable growth.
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
              <SplitText text="Start Your Paid Advertising Campaign" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>If you want to generate more leads, increase website traffic, and grow your business faster, paid advertising is one of the most effective strategies.</p>
                <p>Devoria Tech helps businesses launch and manage powerful advertising campaigns across Google, Facebook, Instagram, and YouTube. Our team works closely with clients to understand their goals and develop customized advertising strategies that deliver measurable results.</p>
                <p>Partner with Devoria Tech today and take advantage of professional paid advertising services designed to help your business grow in the global digital marketplace.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-ppc-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Launch Your Campaign <ArrowRight className="w-4 h-4" />
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
