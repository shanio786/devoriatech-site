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
  Image, FileText, Video, BookOpen, MessageSquare,
  Users, Globe, Shield, Zap, TrendingUp,
  BarChart3, Layers, Palette, Calendar, Clock,
  ShoppingBag, Briefcase, Cpu, UtensilsCrossed, UserCircle,
  Settings, PenTool,
} from "lucide-react";
import smcsHeroImg from "@assets/social-media-content-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "10K+", label: "Posts Created", icon: FileText },
  { value: "500+", label: "Brands Served", icon: Users },
  { value: "3x", label: "Engagement Boost", icon: TrendingUp },
  { value: "95%", label: "Client Satisfaction", icon: Shield },
];

const contentActivities = [
  "Capture audience attention",
  "Communicate brand messages clearly",
  "Encourage interaction and engagement",
  "Provide value to followers",
];

const importanceCards = [
  { icon: Users, title: "Increased Audience Engagement", description: "Posting engaging content regularly encourages followers to like, comment, and share posts." },
  { icon: Globe, title: "Improved Brand Awareness", description: "Consistent content helps audiences recognize and remember a brand." },
  { icon: TrendingUp, title: "Higher Social Media Reach", description: "Social media algorithms often promote accounts that maintain consistent activity." },
  { icon: MessageSquare, title: "Better Customer Communication", description: "Regular posts allow businesses to share updates, announcements, and promotional offers with their audience." },
  { icon: BarChart3, title: "Long-Term Audience Growth", description: "Consistent content strategies help businesses attract new followers over time." },
];

const contentTypeSections = [
  {
    title: "Social Media Graphics",
    icon: Image,
    intro: "Visual content is one of the most effective ways to attract attention on social media platforms. Our designers create professional graphics that represent the brand's identity.",
    items: ["Brand-aligned visual designs", "Platform-optimized image sizes", "Eye-catching color schemes", "Professional typography and layouts"],
  },
  {
    title: "Promotional Posts",
    icon: Zap,
    intro: "Promotional content highlights products, services, offers, and special campaigns designed to drive conversions and sales.",
    items: ["Product highlight posts", "Service showcase content", "Special offer announcements", "Campaign-specific promotions"],
  },
  {
    title: "Informational and Educational Posts",
    icon: BookOpen,
    intro: "Educational content helps businesses provide value to their audience by sharing useful information, tips, and insights.",
    items: ["Industry tips and insights", "How-to guides and tutorials", "Informative infographics", "Expert advice posts"],
  },
  {
    title: "Short Video Content and Reels",
    icon: Video,
    intro: "Short videos and reels are among the most engaging forms of social media content. Devoria Tech helps businesses create creative video content designed to increase reach.",
    items: ["Instagram Reels creation", "TikTok video content", "YouTube Shorts production", "Engaging motion graphics"],
  },
  {
    title: "Brand Storytelling Content",
    icon: BookOpen,
    intro: "Storytelling content helps businesses share their journey, mission, and brand values with their audience in an authentic way.",
    items: ["Brand origin stories", "Behind-the-scenes content", "Customer success stories", "Mission and values posts"],
  },
];

const schedulingAdvantages = [
  { icon: Calendar, title: "Consistent Posting", description: "Scheduling ensures that social media accounts remain active even during busy periods." },
  { icon: Clock, title: "Strategic Timing", description: "Posts can be scheduled during peak audience activity times to increase engagement." },
  { icon: Layers, title: "Efficient Content Management", description: "Businesses can plan weeks or months of content in advance." },
  { icon: BarChart3, title: "Organized Marketing Campaigns", description: "Content calendars allow businesses to plan promotional campaigns effectively." },
];

const contentStrategyCards = [
  { icon: Users, title: "Audience Research", description: "We analyze the target audience to understand their interests, behavior, and preferences." },
  { icon: FileText, title: "Content Planning", description: "Our team creates a content plan that includes different types of posts designed to engage followers." },
  { icon: Palette, title: "Creative Design", description: "Professional designers create high-quality visuals that represent the brand identity." },
  { icon: PenTool, title: "Caption Writing", description: "We write engaging captions designed to encourage audience interaction." },
  { icon: Calendar, title: "Content Scheduling and Publishing", description: "Posts are scheduled using professional social media tools to ensure consistent posting." },
];

const platformCards = [
  { icon: Globe, title: "Facebook Content", description: "Facebook posts include graphics, promotional posts, and community engagement content." },
  { icon: Image, title: "Instagram Content", description: "Instagram content focuses on visual storytelling, reels, and brand aesthetics." },
  { icon: Briefcase, title: "LinkedIn Content", description: "LinkedIn posts are designed for professional audiences and B2B marketing." },
  { icon: Video, title: "TikTok Content", description: "TikTok content focuses on short videos designed to capture audience attention quickly." },
  { icon: Video, title: "YouTube Content", description: "YouTube content includes video ideas, thumbnails, and channel branding strategies." },
];

const featureCards = [
  { icon: Palette, title: "Professional Graphic Design", description: "Our designers create visually appealing content that attracts audience attention." },
  { icon: Shield, title: "Brand-Focused Content", description: "Every piece of content reflects the brand identity and communication style." },
  { icon: Calendar, title: "Content Calendar Planning", description: "We develop organized content calendars that ensure consistent posting." },
  { icon: MessageSquare, title: "Engagement-Oriented Posts", description: "Our content is designed to encourage likes, comments, and shares." },
  { icon: Layers, title: "Multi-Platform Content Strategy", description: "Content is optimized for different social media platforms to maximize performance." },
];

const industrySections = [
  { icon: ShoppingBag, title: "E-Commerce Brands", description: "Online stores use social media content to promote products and attract customers." },
  { icon: Briefcase, title: "Service-Based Businesses", description: "Service companies use social media to showcase expertise and build credibility." },
  { icon: Cpu, title: "Technology Companies", description: "Tech companies share product updates and industry insights through social media content." },
  { icon: UtensilsCrossed, title: "Restaurants and Hospitality", description: "Restaurants use visual content to promote menus, offers, and customer experiences." },
  { icon: UserCircle, title: "Personal Brands and Influencers", description: "Content creators rely on consistent content to grow their audiences." },
];

const whyChooseItems = [
  { icon: Palette, label: "Creative and professional graphics" },
  { icon: FileText, label: "Strategic content planning" },
  { icon: Calendar, label: "Consistent social media posting" },
  { icon: Users, label: "Audience-focused content strategies" },
  { icon: Settings, label: "Brand-centered communication" },
];

function ContentTypeAccordion({ section, index }: { section: typeof contentTypeSections[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="smcs-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`smcs-type-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`smcs-type-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-smcs-type-${index}`}
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/15 to-rose-500/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-5 h-5 text-orange-400/70" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-orange-300 transition-colors duration-500">
            {section.title}
          </h3>
          <p className="text-[12px] text-white/25 mt-1 font-light line-clamp-1">{section.intro}</p>
        </div>
        <ChevronDown className={`w-5 h-5 text-orange-400/40 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div
        id={`smcs-type-content-${index}`}
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ maxHeight: isOpen ? "5000px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-4">
          <p className="text-[13px] text-white/30 leading-[1.8] font-light">{section.intro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {section.items.map((item, ii) => (
              <div key={ii} className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                <CheckCircle className="w-3.5 h-3.5 text-orange-400/40 mt-0.5 shrink-0" />
                <span className="text-[12px] text-white/25 font-light">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SocialMediaContentCreation() {
  useSEO({
    title: "Social Media Content That Gets Likes, Shares & Followers | Devoria Tech",
    description: "Professional social media content creation and scheduling services by Devoria Tech. We create engaging graphics, promotional posts, videos, reels, and brand storytelling content for all major social media platforms.",
    keywords: "social media content creation, content scheduling, social media graphics, promotional posts, video content, reels, brand storytelling, content calendar, social media marketing, content strategy",
    canonical: "https://devoriatech.com/services/social-media/content-creation",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".smcs-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-smcs-hero">
        <div className="absolute inset-0 hero-gradient-bg" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-orange-600/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-rose-500/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03]">
          <div className="absolute inset-0 rounded-full border border-white/10 animate-orbit" style={{ animationDuration: "25s" }}>
            <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-orange-500/40 blur-sm" />
          </div>
          <div className="absolute inset-8 rounded-full border border-white/5 animate-orbit" style={{ animationDuration: "35s", animationDirection: "reverse" }}>
            <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-rose-400/40 blur-sm" />
          </div>
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
          <Link href="/services/social-media">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-cyan-400/60 hover:text-cyan-400 font-medium tracking-wider uppercase transition-colors duration-300 mb-8 cursor-pointer" data-testid="link-back-sm">
              <ArrowRight className="w-3 h-3 rotate-180" /> Back to Social Media
            </span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] text-orange-400 mb-6 tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                  Content Creation
                </span>
              </motion.div>

              <SplitText
                text="Social Media Content Creation and Scheduling Services"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-smcs-title"
              />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light">
                Content is the foundation of successful social media marketing. Devoria Tech provides professional social media content creation and scheduling services designed to help businesses maintain consistent and effective social media activity with visually appealing graphics, engaging captions, and creative posts.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8">
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-smcs-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-rose-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-rose-500 to-orange-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Start Creating Content <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </span>
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }} className="mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden neon-border">
                <img loading="lazy" src={smcsHeroImg} alt="Social media content creation and scheduling services" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="smcs-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-smcs-${i}`}>
                <div className="p-6">
                  <stat.icon className="w-5 h-5 text-orange-400/50 mx-auto mb-3" />
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
          <div className="smcs-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Understanding Content Creation</span>
            <SplitText text="What is Social Media Content Creation" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="smcs-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Social media content creation is the process of producing posts, images, videos, captions, and other digital media designed specifically for social media platforms. Content creation involves designing visuals, writing captions, and creating storytelling posts that represent the brand's voice and personality.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Devoria Tech creates professional social media content that helps businesses communicate effectively with their audience. Successful social media content should:
            </p>
          </div>
          <div className="smcs-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {contentActivities.map((activity, i) => (
              <div key={i} className="flex items-center gap-2.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle className="w-3.5 h-3.5 text-orange-400/40 shrink-0" />
                <span className="text-[12px] text-white/30 font-light">{activity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="smcs-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Why It Matters</span>
            <SplitText text="Importance of Consistent Social Media Content" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="smcs-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Consistency is one of the most important factors in social media success. Platforms such as Instagram, Facebook, and LinkedIn reward accounts that post regularly and maintain active engagement.</p>
          </div>
          <div className="smcs-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {importanceCards.map((card, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`importance-smcs-${i}`}>
                <card.icon className="w-5 h-5 text-orange-400/50 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-[11px] text-white/25 leading-relaxed font-light">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="smcs-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Content Types</span>
            <SplitText text="Types of Social Media Content We Create" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="smcs-fade mb-8 text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center">
            <p>Devoria Tech produces different types of content designed to engage audiences and strengthen brand presence.</p>
          </div>
          <div className="space-y-5">
            {contentTypeSections.map((section, i) => (
              <ContentTypeAccordion key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="smcs-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Content Scheduling</span>
            <SplitText text="Social Media Content Scheduling" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="smcs-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Content scheduling is the process of planning and publishing social media posts at specific times for maximum visibility and engagement. Devoria Tech creates detailed content calendars to ensure that social media posts are published consistently and strategically.</p>
          </div>
          <div className="smcs-fade grid grid-cols-1 sm:grid-cols-2 gap-4">
            {schedulingAdvantages.map((adv, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`scheduling-smcs-${i}`}>
                <adv.icon className="w-5 h-5 text-orange-400/50 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-2">{adv.title}</h3>
                <p className="text-[11px] text-white/25 leading-relaxed font-light">{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="smcs-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Our Strategy</span>
            <SplitText text="Our Social Media Content Strategy" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="smcs-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech develops customized content strategies based on each client's business goals and target audience.</p>
          </div>
          <div className="smcs-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contentStrategyCards.map((card, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`strategy-smcs-${i}`}>
                <card.icon className="w-5 h-5 text-orange-400/50 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-[11px] text-white/25 leading-relaxed font-light">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="smcs-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Platforms</span>
            <SplitText text="Platforms We Create Content For" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="smcs-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech creates social media content for multiple platforms depending on the client's marketing goals.</p>
          </div>
          <div className="smcs-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {platformCards.map((platform, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`platform-smcs-${i}`}>
                <platform.icon className="w-5 h-5 text-orange-400/50 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-2">{platform.title}</h3>
                <p className="text-[11px] text-white/25 leading-relaxed font-light">{platform.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="smcs-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Service Features</span>
            <SplitText text="Features of Our Content Creation Services" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="smcs-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech provides professional content creation services designed to help businesses stand out online.</p>
          </div>
          <div className="smcs-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureCards.map((feature, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`feature-smcs-${i}`}>
                <feature.icon className="w-5 h-5 text-orange-400/50 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-[11px] text-white/25 leading-relaxed font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="smcs-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Industries</span>
            <SplitText text="Industries That Benefit from Social Media Content" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="smcs-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Social media content creation services are valuable for businesses across many industries.</p>
          </div>
          <div className="smcs-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industrySections.map((industry, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border" data-testid={`industry-smcs-${i}`}>
                <div className="p-5">
                  <industry.icon className="w-5 h-5 text-orange-400/50 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-1">{industry.title}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed font-light">{industry.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
          <div className="smcs-fade text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto text-center mt-6">
            <p>Devoria Tech creates customized content strategies for each industry.</p>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="smcs-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="smcs-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for Content Creation</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech combines creativity, design expertise, and digital marketing knowledge to create high-performing social media content. Our goal is to help businesses maintain strong and engaging social media profiles.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {whyChooseItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <item.icon className="w-4 h-4 text-orange-400/50 shrink-0" />
                  <span className="text-[13px] text-white/35 font-light">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative p-14 sm:p-20 rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-transparent to-rose-500/10" />
            <div className="absolute inset-0 border border-white/[0.06] rounded-[2rem]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-rose-400/20 to-transparent" />
            <div className="relative z-10">
              <SplitText text="Start Creating Powerful Social Media Content" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>If your business wants to attract followers, increase engagement, and build a strong digital brand, Devoria Tech can help.</p>
                <p>Our social media content creation and scheduling services ensure that your social media accounts remain active, engaging, and aligned with your marketing goals.</p>
                <p>Contact Devoria Tech today to start creating powerful social media content that helps your business grow online.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-smcs-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-rose-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Creating Powerful Social Media Content <ArrowRight className="w-4 h-4" />
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