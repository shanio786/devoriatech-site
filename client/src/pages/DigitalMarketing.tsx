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
  Search, Target, BarChart3, TrendingUp, Mail,
  Megaphone, Share2, PenTool, LineChart, Globe,
  MousePointerClick, Users, Zap,
} from "lucide-react";
import dmHeroImg from "@assets/dm-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const heroServices = [
  { icon: Search, label: "Search Engine Optimization (SEO)", color: "from-blue-500/20 to-blue-600/10" },
  { icon: MousePointerClick, label: "Pay Per Click Advertising (PPC)", color: "from-violet-500/20 to-violet-600/10" },
  { icon: Share2, label: "Social Media Marketing", color: "from-pink-500/20 to-pink-600/10" },
  { icon: PenTool, label: "Content Marketing", color: "from-cyan-500/20 to-cyan-600/10" },
  { icon: Mail, label: "Email Marketing", color: "from-amber-500/20 to-amber-600/10" },
  { icon: Target, label: "Online Branding Strategy", color: "from-emerald-500/20 to-emerald-600/10" },
];

const stats = [
  { value: "300%", label: "Avg. Traffic Increase", icon: TrendingUp },
  { value: "10x", label: "ROI on Ad Spend", icon: BarChart3 },
  { value: "50+", label: "Marketing Campaigns", icon: Megaphone },
  { value: "95%", label: "Client Retention", icon: Users },
];

const seoSections = [
  {
    title: "Search Engine Optimization (SEO) Services",
    icon: Search,
    intro: "Search Engine Optimization is one of the most effective ways to increase organic traffic and improve website rankings on search engines like Google.",
    introExtra: "Devoria Tech provides professional SEO services that help businesses rank higher in search results and attract more targeted visitors. Our SEO strategy focuses on long-term growth and sustainable results. Instead of short-term tricks, we implement proven techniques that follow search engine guidelines.",
    subsections: [
      {
        title: "Keyword Research and Strategy",
        desc: "Keyword research is the foundation of every successful SEO campaign. Our team analyzes search trends, user behavior, and industry competition to identify the best keywords for your business.",
        outro: "By targeting the right keywords, businesses can reach potential customers who are actively searching for their products or services.",
      },
      {
        title: "On-Page SEO Optimization",
        desc: "On-page SEO improves the structure and content of your website so search engines can easily understand it.",
        items: ["Meta title and meta description optimization", "SEO-friendly headings and content", "Image optimization", "Internal linking strategy", "URL structure optimization"],
        outro: "These improvements help search engines rank your website higher.",
      },
      {
        title: "Technical SEO",
        desc: "Technical SEO ensures that your website performs well and loads quickly.",
        items: ["Website speed optimization", "Mobile-friendly design improvements", "Fixing indexing and crawling issues", "Structured data implementation", "Core Web Vitals optimization"],
        outro: "A technically optimized website provides a better user experience and improves search rankings.",
      },
      {
        title: "Off-Page SEO and Link Building",
        desc: "Off-page SEO focuses on building authority and trust for your website. Devoria Tech builds high-quality backlinks and brand mentions to improve your website's credibility in search engines. Strong backlinks help websites rank higher and gain more visibility.",
      },
    ],
  },
  {
    title: "Pay Per Click (PPC) Advertising",
    icon: MousePointerClick,
    intro: "Pay Per Click advertising allows businesses to generate traffic quickly by displaying ads on search engines and social media platforms.",
    introExtra: "Devoria Tech manages high-performance advertising campaigns that help businesses reach the right audience at the right time. Our PPC services focus on maximizing return on investment while reducing unnecessary ad spending.",
    subsections: [
      {
        title: "Google Ads Campaign Management",
        desc: "Google Ads is one of the most powerful advertising platforms for reaching customers who are actively searching for products and services.",
        items: ["Keyword targeting", "Ad copy creation", "Campaign setup and optimization", "Conversion tracking", "Performance analysis"],
        outro: "These campaigns help businesses generate immediate traffic and leads.",
      },
      {
        title: "Social Media Advertising",
        desc: "Social media advertising allows businesses to reach specific audiences based on interests, demographics, and behavior. Devoria Tech manages advertising campaigns on platforms such as:",
        items: ["Facebook Ads", "Instagram Ads", "LinkedIn Ads", "TikTok Ads", "YouTube Ads"],
        outro: "Our goal is to create engaging advertisements that attract attention and convert viewers into customers.",
      },
    ],
  },
  {
    title: "Social Media Marketing Services",
    icon: Share2,
    intro: "Social media platforms have become essential tools for brand growth and customer engagement. Devoria Tech provides professional social media marketing services that help businesses build strong relationships with their audience.",
    introExtra: "Our team creates social media strategies that increase followers, engagement, and brand awareness.",
    subsections: [
      {
        title: "Social Media Strategy Development",
        desc: "Every successful social media campaign starts with a clear strategy. We analyze your industry, competitors, and target audience to create a customized social media marketing plan.",
      },
      {
        title: "Content Creation and Branding",
        desc: "High-quality content is the key to success on social media platforms. Devoria Tech creates engaging posts, graphics, videos, and promotional content designed to capture attention.",
      },
      {
        title: "Social Media Account Management",
        desc: "Our team manages social media profiles to ensure consistent posting, audience engagement, and brand messaging.",
        items: ["Content scheduling", "Comment and message management", "Audience engagement", "Performance monitoring"],
      },
      {
        title: "Social Media Analytics and Growth",
        desc: "We track performance metrics such as reach, engagement, and follower growth to measure campaign success and improve future strategies.",
      },
    ],
  },
  {
    title: "Content Marketing",
    icon: PenTool,
    intro: "Content marketing helps businesses educate their audience, build trust, and improve search engine rankings. Devoria Tech creates high-quality content that attracts visitors and encourages them to take action.",
    subsections: [],
    items: ["Blog writing and SEO content", "Website content optimization", "Marketing copywriting", "Product descriptions", "Educational articles"],
    outro: "Quality content improves brand authority and helps businesses rank higher on search engines.",
  },
  {
    title: "Email Marketing Campaigns",
    icon: Mail,
    intro: "Email marketing remains one of the most effective digital marketing strategies for building customer relationships and increasing sales. Devoria Tech creates targeted email campaigns designed to engage subscribers and drive conversions.",
    subsections: [],
    items: ["Email campaign strategy", "Newsletter design", "Automated email sequences", "Customer engagement campaigns", "Performance tracking"],
    outro: "These campaigns help businesses stay connected with customers and promote products or services effectively.",
  },
  {
    title: "Data-Driven Marketing Strategy",
    icon: LineChart,
    intro: "Successful digital marketing campaigns rely on accurate data and continuous improvement. Devoria Tech uses advanced analytics tools to monitor campaign performance and identify opportunities for growth.",
    subsections: [],
    items: ["Website traffic", "Conversion rates", "Customer behavior", "Advertising performance"],
    outro: "By analyzing this data, we optimize marketing campaigns and improve results over time.",
  },
];

const whyChooseItems = [
  "Experienced digital marketing specialists",
  "Data-driven marketing strategies",
  "Transparent communication and reporting",
  "Customized marketing solutions",
  "Focus on long-term growth",
];

function ServiceSection({ section, index }: { section: typeof seoSections[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSub, setOpenSub] = useState<number | null>(null);
  const Icon = section.icon;

  return (
    <div className="svc-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01]" data-testid={`dm-section-${index}`}>
      <button
        onClick={() => { setIsOpen(!isOpen); setOpenSub(null); }}
        aria-expanded={isOpen}
        aria-controls={`dm-section-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-dm-section-${index}`}
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-500/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-5 h-5 text-cyan-400/70" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors duration-500">
            {section.title}
          </h3>
          <p className="text-[12px] text-white/25 mt-1 font-light line-clamp-1">{section.intro}</p>
        </div>
        <ChevronDown className={`w-5 h-5 text-cyan-400/40 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div
        id={`dm-section-content-${index}`}
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

          {section.outro && (
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">{section.outro}</p>
          )}

          {section.subsections && section.subsections.length > 0 && (
            <div className="space-y-2 mt-2">
              {section.subsections.map((sub, si) => {
                const subOpen = openSub === si;
                return (
                  <div key={si} className="rounded-xl bg-white/[0.015] border border-white/[0.04] overflow-hidden">
                    <button
                      onClick={() => setOpenSub(subOpen ? null : si)}
                      aria-expanded={subOpen}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left group"
                      data-testid={`button-dm-sub-${index}-${si}`}
                    >
                      <h4 className="text-[13px] font-semibold text-white/45 group-hover:text-white/60 transition-colors duration-300">
                        {sub.title}
                      </h4>
                      <ChevronDown className={`w-3.5 h-3.5 text-cyan-400/30 shrink-0 transition-transform duration-300 ${subOpen ? "rotate-180" : ""}`} />
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-400 ease-out"
                      style={{ maxHeight: subOpen ? "2000px" : "0px", opacity: subOpen ? 1 : 0 }}
                    >
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 space-y-3">
                        <p className="text-[12px] text-white/25 leading-[1.8] font-light">{sub.desc}</p>
                        {sub.items && sub.items.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {sub.items.map((item, ii) => (
                              <div key={ii} className="flex items-start gap-2 p-2.5 rounded-lg bg-white/[0.02]">
                                <CheckCircle className="w-3 h-3 text-cyan-400/30 mt-0.5 shrink-0" />
                                <span className="text-[11px] text-white/20 font-light">{item}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {sub.outro && (
                          <p className="text-[12px] text-white/25 leading-[1.8] font-light">{sub.outro}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DigitalMarketing() {
  useSEO({
    title: "Digital Marketing That Actually Works – SEO, Ads & Content | Devoria Tech",
    description: "We help businesses get more traffic, leads, and sales through SEO, Google Ads, social media marketing, and content strategies that actually deliver results.",
    keywords: "digital marketing services, SEO services, PPC advertising, Google Ads management, social media marketing, Facebook Ads, Instagram Ads, content marketing, email marketing, link building, keyword research, on-page SEO, technical SEO, online branding, digital marketing agency",
    canonical: "https://devoriatech.com/services/digital-marketing",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".svc-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-dm-hero">
        <div className="absolute inset-0 hero-gradient-bg" />
        <div className="absolute inset-0 grid-bg opacity-30" />

        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />

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
                  Digital Marketing
                </span>
              </motion.div>

              <SplitText
                text="Digital Marketing Services – Grow Your Business with Devoria Tech"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-dm-title"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light"
              >
                Digital marketing has become one of the most powerful ways for businesses to reach customers, build brand awareness, and increase sales. Devoria Tech provides professional digital marketing services designed to help businesses grow in the competitive online world.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-8 flex flex-col sm:flex-row items-start gap-4"
              >
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-dm-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Get Free Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                <img loading="lazy" src={dmHeroImg} alt="Digital marketing analytics dashboard" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="svc-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-dm-${i}`}>
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
          <div className="svc-fade text-center mb-12">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">What We Offer</span>
            <SplitText text="Complete Digital Marketing Solutions" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
            <p className="mt-5 text-[13px] text-white/30 max-w-xl mx-auto leading-relaxed font-light">
              Devoria Tech offers a full range of digital marketing services designed to help businesses succeed online. Our marketing strategies focus on increasing visibility, attracting targeted audiences, and improving conversion rates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {heroServices.map((svc, i) => (
              <TiltCard key={i} className="svc-fade rounded-2xl neon-border" data-testid={`card-dm-service-${i}`}>
                <div className={`p-6 bg-gradient-to-br ${svc.color} h-full`}>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center mb-4">
                    <svc.icon className="w-5 h-5 text-cyan-400/70" />
                  </div>
                  <h3 className="text-[14px] font-semibold text-white/70 mb-1">{svc.label}</h3>
                </div>
              </TiltCard>
            ))}
          </div>
          <p className="text-[12px] text-white/20 leading-[1.8] font-light text-center max-w-2xl mx-auto">
            By combining multiple digital marketing techniques, we help businesses build a strong online presence and reach customers worldwide.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="svc-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">In Detail</span>
            <SplitText text="Explore Our Services" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>

          <div className="svc-fade mb-6 text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center space-y-3">
            <p>Today, customers search for products and services online before making a decision. If your business does not appear in search engines or social media platforms, you may lose valuable opportunities.</p>
            <p>Our digital marketing experts use modern tools, data analysis, and proven strategies to create marketing campaigns that deliver measurable results. We work with startups, small businesses, and global brands to create effective marketing strategies that drive long-term growth.</p>
          </div>

          <div className="space-y-5">
            {seoSections.map((section, i) => (
              <ServiceSection key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient-bg opacity-30" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="svc-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="dm-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for Digital Marketing</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Choosing the right digital marketing agency can significantly impact business success. Devoria Tech focuses on delivering strategies that generate real results.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {whyChooseItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <CheckCircle className="w-4 h-4 text-cyan-400/50 mt-0.5 shrink-0" />
                  <span className="text-[13px] text-white/35 font-light leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-white/20 leading-[1.8] font-light text-center">
              Our team works closely with clients to understand their goals and create marketing campaigns that deliver measurable outcomes.
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
            <div className="relative z-10">
              <SplitText text="Grow Your Business with Devoria Tech" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>Devoria Tech helps businesses unlock their digital potential through powerful marketing strategies and innovative technology.</p>
                <p>Whether you want to improve search engine rankings, increase social media engagement, or launch targeted advertising campaigns, our team is ready to help. By combining creativity, strategy, and advanced marketing tools, Devoria Tech delivers digital marketing solutions that help businesses grow, attract customers, and succeed in the global digital marketplace.</p>
                <p>Start your digital growth journey today with Devoria Tech and transform your online presence into a powerful business asset.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-dm-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your Growth Journey <ArrowRight className="w-4 h-4" />
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
