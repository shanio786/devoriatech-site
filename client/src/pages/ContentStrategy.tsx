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
  Search, Target, TrendingUp, FileText,
  BarChart3, Zap, Shield, Eye, Users,
  Award, Calendar, Share2, PenTool,
  BookOpen, Layers, LineChart, Globe,
  MessageSquare, Mail,
} from "lucide-react";
import contentHeroImg from "@assets/content-strategy-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const overviewItems = [
  { icon: Search, label: "Content Research & Planning" },
  { icon: Users, label: "Audience Analysis & Targeting" },
  { icon: Calendar, label: "Content Calendar Development" },
  { icon: FileText, label: "SEO Content Strategy" },
  { icon: PenTool, label: "Brand Messaging & Storytelling" },
  { icon: Share2, label: "Content Distribution Planning" },
];

const stats = [
  { value: "3x", label: "Avg. Engagement Increase", icon: TrendingUp },
  { value: "200+", label: "Content Strategies Delivered", icon: Award },
  { value: "5M+", label: "Audience Reach Generated", icon: Users },
  { value: "150%", label: "Avg. Traffic Growth", icon: LineChart },
];

const contentSections = [
  {
    title: "Audience Research and Content Planning",
    icon: Users,
    intro: "Understanding the target audience is the foundation of an effective content strategy. Devoria Tech conducts detailed audience research to understand customer needs, preferences, and online behavior.",
    items: ["Customer demographics", "Audience interests", "Online behavior patterns", "Industry trends", "Competitor content strategies"],
    outro: "This information helps us create content that resonates with the target audience and encourages engagement. Content planning also includes identifying the most valuable topics and formats that will deliver the best results.",
  },
  {
    title: "SEO Content Strategy",
    icon: Search,
    intro: "Search engine optimization plays an important role in content marketing. Devoria Tech creates SEO-friendly content strategies that help businesses improve search engine rankings and attract organic traffic.",
    items: ["Keyword research and topic analysis", "SEO optimized blog content", "Website page optimization", "Content structure improvement", "Internal linking strategy"],
    outro: "By combining SEO techniques with valuable content, we help businesses create content that both users and search engines appreciate. This approach improves visibility on search engines while providing useful information to readers.",
  },
  {
    title: "Content Creation and Content Calendar",
    icon: Calendar,
    intro: "Consistency is essential in content marketing. Devoria Tech develops structured content calendars that help businesses maintain a regular publishing schedule. A content calendar ensures that businesses publish the right content at the right time across different platforms.",
    items: ["Blog article scheduling", "Social media content planning", "Video content planning", "Marketing campaign content", "Seasonal and promotional content"],
    outro: "This structured approach helps businesses maintain consistency while aligning content with marketing campaigns and business goals.",
  },
  {
    title: "Content Distribution Strategy",
    icon: Share2,
    intro: "Creating great content is only the first step. Effective distribution ensures that content reaches the right audience through the right channels. Devoria Tech develops content distribution strategies that maximize content reach and engagement.",
    items: ["Websites and blogs", "Social media platforms", "Email marketing campaigns", "Video platforms such as YouTube", "Digital advertising campaigns"],
    outro: "By distributing content strategically, businesses can increase brand awareness and attract more potential customers.",
  },
  {
    title: "Content Analytics and Performance Tracking",
    icon: BarChart3,
    intro: "Content analytics helps businesses understand how their content performs and how audiences interact with it. Devoria Tech uses advanced analytics tools to measure the effectiveness of content marketing campaigns.",
    items: ["Website traffic", "User engagement", "Content performance", "Social media reach", "Conversion rates"],
    outro: "By analyzing these metrics, we identify what type of content works best and how strategies can be improved. Data-driven insights allow businesses to continuously improve their content marketing efforts.",
  },
  {
    title: "Data Driven Content Optimization",
    icon: LineChart,
    intro: "Content optimization is an ongoing process that ensures content remains relevant and effective. Devoria Tech continuously analyzes content performance and makes improvements based on real data.",
    items: ["Updating existing content", "Improving keyword targeting", "Enhancing readability and structure", "Adding new information and insights", "Improving internal linking"],
    outro: "These improvements help businesses maintain strong search engine rankings and increase audience engagement over time.",
  },
];

const whyChooseItems = [
  { icon: Users, label: "Experienced content strategists" },
  { icon: BarChart3, label: "Data-driven marketing approach" },
  { icon: Search, label: "SEO optimized content planning" },
  { icon: MessageSquare, label: "Audience focused storytelling" },
  { icon: Eye, label: "Transparent reporting and analytics" },
];

const benefitItems = [
  "Improved search engine rankings",
  "Increased website traffic",
  "Stronger brand authority",
  "Better audience engagement",
  "Higher conversion rates",
];

const contentStrategyHelps = [
  "Build brand authority",
  "Improve search engine rankings",
  "Attract targeted audiences",
  "Increase engagement and conversions",
  "Support long-term digital marketing goals",
];

const supportsChannels = [
  "Search Engine Optimization (SEO)",
  "Social Media Marketing",
  "Email Marketing",
  "Paid Advertising",
  "Brand Marketing",
];

function ContentSection({ section, index }: { section: typeof contentSections[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="cs-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`cs-section-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`cs-section-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-cs-section-${index}`}
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
        id={`cs-section-content-${index}`}
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

          {section.outro && (
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">{section.outro}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ContentStrategy() {
  useSEO({
    title: "Content Strategy That Drives Traffic and Builds Trust | Devoria Tech",
    description: "Professional content strategy and analytics services including content planning, audience research, SEO content strategy, content calendar development, distribution planning, and performance tracking. Devoria Tech delivers data-driven content marketing.",
    keywords: "content strategy, content analytics, content marketing, SEO content, content planning, audience research, content calendar, content distribution, content optimization, data-driven marketing, brand storytelling, content performance tracking",
    canonical: "https://devoriatech.com/services/digital-marketing/content-strategy",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".cs-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-cs-hero">
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
                  Content Strategy & Analytics
                </span>
              </motion.div>

              <SplitText
                text="Content Strategy & Analytics Services – Data-Driven Content Marketing"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-cs-title"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light"
              >
                Content is one of the most powerful tools in digital marketing. Devoria Tech provides professional Content Strategy and Analytics services designed to help businesses create effective content that delivers measurable results. However, simply creating content is not enough — without a clear strategy and proper analytics, content may not achieve its full potential.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-8 flex flex-col sm:flex-row items-start gap-4"
              >
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-cs-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Get Free Content Audit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                <img loading="lazy" src={contentHeroImg} alt="Content strategy analytics dashboard and performance tracking visualization" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="cs-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-cs-${i}`}>
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
          <div className="cs-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Understanding Content Strategy</span>
            <SplitText text="What is Content Strategy?" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="cs-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Content strategy is the process of planning, creating, managing, and optimizing content to achieve specific business objectives. A strong content strategy ensures that businesses deliver the right message to the right audience at the right time.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Instead of publishing random content, a well-designed strategy focuses on understanding customer needs, identifying valuable topics, and delivering consistent and meaningful information.
            </p>
          </div>

          <div className="cs-fade max-w-2xl mx-auto mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light text-center mb-4">Devoria Tech develops content strategies that help businesses:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {contentStrategyHelps.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400/40 shrink-0" />
                  <span className="text-[12px] text-white/25 font-light">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-white/20 leading-[1.8] font-light text-center mt-4">
              A structured content strategy ensures that every piece of content contributes to overall business growth.
            </p>
          </div>

          <div className="cs-fade text-center mb-8">
            <SplitText text="Importance of Content Strategy in Digital Marketing" as="h2" className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="cs-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Content strategy plays a critical role in digital marketing success. Businesses that use strategic content marketing can attract customers, build trust, and improve their online visibility.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Search engines such as Google prioritize websites that publish high-quality and informative content. This means that businesses with strong content strategies have better chances of ranking higher in search results.
            </p>
          </div>
          <div className="cs-fade max-w-2xl mx-auto mb-16">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light text-center mb-4">Content strategy also supports other digital marketing channels including:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {supportsChannels.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                  <Zap className="w-3.5 h-3.5 text-cyan-400/40 shrink-0" />
                  <span className="text-[12px] text-white/25 font-light">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-white/20 leading-[1.8] font-light text-center mt-4">
              By integrating content strategy into digital marketing campaigns, businesses can create a consistent and effective online presence.
            </p>
          </div>

          <div className="cs-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">What We Offer</span>
            <SplitText text="Our Content Strategy Services" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
            <p className="mt-5 text-[13px] text-white/30 max-w-xl mx-auto leading-relaxed font-light">
              Devoria Tech provides comprehensive content strategy services designed to help businesses create effective content that supports marketing and business objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {overviewItems.map((svc, i) => (
              <TiltCard key={i} className="cs-fade rounded-2xl neon-border" data-testid={`card-cs-overview-${i}`}>
                <div className="p-5 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 h-full flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                    <svc.icon className="w-4 h-4 text-cyan-400/70" />
                  </div>
                  <span className="text-[12px] font-medium text-white/50">{svc.label}</span>
                </div>
              </TiltCard>
            ))}
          </div>
          <p className="cs-fade text-[12px] text-white/20 leading-[1.8] font-light text-center max-w-2xl mx-auto">
            These services ensure that every piece of content aligns with the business vision and marketing goals.
          </p>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="cs-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">In Detail</span>
            <SplitText text="Explore Our Content Services" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>

          <div className="cs-fade mb-8 text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center space-y-3">
            <p>In the modern digital landscape, content is everywhere. From website pages and blogs to social media posts and video content, businesses must consistently provide valuable information to their audience.</p>
            <p>Devoria Tech helps businesses develop a structured content strategy based on research, audience insights, and performance data. By combining strategic planning with advanced analytics, we ensure that every piece of content contributes to brand growth, audience engagement, and improved conversions.</p>
          </div>

          <div className="space-y-5">
            {contentSections.map((section, i) => (
              <ContentSection key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="cs-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="cs-benefits">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Benefits of Content Strategy & Analytics</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                A strong content strategy combined with accurate analytics provides several advantages for businesses. Businesses that use strategic content marketing are more likely to build long-term relationships with their audience and achieve sustainable growth.
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
          <div className="cs-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="cs-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for Content Strategy</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech focuses on creating content strategies that are both creative and data-driven. Our team combines marketing expertise with analytics insights to develop strategies that deliver real results.
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
              Our goal is to help businesses transform their content into a powerful marketing asset.
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
              <SplitText text="Transform Your Content Strategy with Devoria Tech" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>Content marketing continues to evolve as businesses compete for audience attention in the digital world. Devoria Tech helps businesses stay ahead by creating powerful content strategies supported by advanced analytics.</p>
                <p>Whether you want to improve your website content, develop a long-term content marketing strategy, or analyze the performance of existing campaigns, our team is ready to help.</p>
                <p>With Devoria Tech as your digital partner, you can create meaningful content that attracts audiences, builds trust, and drives business growth. Start your content strategy journey with Devoria Tech and unlock the full potential of data-driven content marketing.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-cs-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your Content Strategy <ArrowRight className="w-4 h-4" />
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
