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
  MessageSquare, Shield, Users, TrendingUp,
  BarChart3, Globe, Heart, Zap, ThumbsUp,
  Headphones, Eye, Star, Clock,
  ShoppingCart, Briefcase, Cpu, UtensilsCrossed, UserCheck,
  Code2, Settings, Layers,
} from "lucide-react";
import smceHeroImg from "@assets/social-media-community-hero.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "1M+", label: "Interactions Managed", icon: MessageSquare },
  { value: "98%", label: "Response Rate", icon: ThumbsUp },
  { value: "50+", label: "Communities Built", icon: Users },
  { value: "24/7", label: "Active Monitoring", icon: Clock },
];

const engagementActivities = [
  "Responding to comments and messages",
  "Interacting with followers and fans",
  "Managing brand reputation online",
  "Encouraging community participation",
  "Building long-term audience relationships",
];

const importanceCards = [
  { icon: Shield, title: "Builds Trust and Credibility", description: "Active community engagement shows your audience that your brand cares about their opinions and feedback, building trust and credibility over time." },
  { icon: Heart, title: "Improves Customer Relationships", description: "Regular interaction with followers strengthens customer relationships and creates loyal brand advocates who promote your business organically." },
  { icon: TrendingUp, title: "Increases Social Media Reach", description: "Engaged communities help expand your social media reach through shares, comments, and interactions that boost algorithmic visibility." },
  { icon: Star, title: "Encourages Brand Loyalty", description: "When customers feel heard and valued through active engagement, they develop stronger loyalty to your brand and become repeat customers." },
  { icon: Headphones, title: "Enhances Customer Support", description: "Social media community engagement provides an additional channel for customer support, allowing quick resolution of issues and inquiries." },
];

const serviceSections = [
  {
    title: "Comment Management",
    icon: MessageSquare,
    intro: "Professional comment management ensures every comment on your social media posts receives timely and appropriate responses that reflect your brand voice.",
    items: ["Responding to positive comments", "Addressing negative feedback professionally", "Moderating spam and inappropriate content", "Encouraging meaningful conversations"],
  },
  {
    title: "Direct Message Handling",
    icon: Globe,
    intro: "We manage your brand's direct messages across all social media platforms, ensuring prompt and professional responses to customer inquiries.",
    items: ["Customer inquiry responses", "Lead generation through DMs", "Appointment and order management", "Personalized customer communication"],
  },
  {
    title: "Audience Interaction",
    icon: Users,
    intro: "Active audience interaction helps build a vibrant community around your brand by engaging followers with meaningful content and conversations.",
    items: ["Polls and interactive content", "Community discussions and threads", "User-generated content promotion", "Follower appreciation campaigns"],
  },
  {
    title: "Customer Support via Social Media",
    icon: Headphones,
    intro: "We provide professional customer support through social media channels, helping resolve customer issues quickly and maintaining positive brand sentiment.",
    items: ["Issue resolution and troubleshooting", "Product and service inquiries", "Order tracking and updates", "Escalation management"],
  },
  {
    title: "Reputation Management",
    icon: Shield,
    intro: "Our reputation management services monitor and protect your brand's online presence by addressing concerns and promoting positive brand sentiment.",
    items: ["Online review monitoring", "Crisis communication management", "Brand sentiment analysis", "Proactive reputation building"],
  },
];

const platformEngagementCards = [
  { icon: Globe, title: "Facebook Community Engagement", description: "We manage Facebook groups, respond to comments, and interact with your audience to build a strong Facebook community." },
  { icon: Heart, title: "Instagram Engagement", description: "Our team handles Instagram comments, DMs, story interactions, and community building to grow your Instagram presence." },
  { icon: Briefcase, title: "LinkedIn Engagement", description: "Professional LinkedIn engagement including comment management, connection building, and industry discussion participation." },
  { icon: Zap, title: "TikTok Engagement", description: "Active TikTok community management with comment responses, duet interactions, and trend participation." },
  { icon: Eye, title: "YouTube Community Interaction", description: "YouTube comment management, community post engagement, and subscriber interaction to build a loyal viewer community." },
];

const benefitCards = [
  { icon: Clock, title: "Faster Customer Response", description: "Professional community management ensures faster response times to customer inquiries and comments across all platforms." },
  { icon: Shield, title: "Stronger Brand Image", description: "Consistent and professional engagement strengthens your brand image and builds positive perception among your audience." },
  { icon: TrendingUp, title: "Higher Engagement Rates", description: "Active community management leads to higher engagement rates, boosting your content visibility and reach." },
  { icon: BarChart3, title: "Better Customer Insights", description: "Community interactions provide valuable insights into customer preferences, needs, and feedback for business improvement." },
  { icon: Star, title: "Improved Customer Retention", description: "Engaged customers are more likely to remain loyal to your brand and continue purchasing your products or services." },
];

const strategyCards = [
  { icon: Eye, title: "Monitoring Social Media Activity", description: "We continuously monitor your social media channels for comments, mentions, and messages that require attention." },
  { icon: MessageSquare, title: "Professional Response Management", description: "Our team crafts professional responses that reflect your brand voice and maintain positive customer relationships." },
  { icon: Users, title: "Encouraging Audience Participation", description: "We create interactive content and campaigns that encourage your audience to participate and engage with your brand." },
  { icon: ThumbsUp, title: "Handling Customer Feedback", description: "We professionally handle both positive and negative customer feedback, turning challenges into opportunities." },
  { icon: BarChart3, title: "Engagement Reporting", description: "Regular engagement reports provide insights into community growth, sentiment trends, and interaction metrics." },
];

const industrySections = [
  { icon: ShoppingCart, title: "E-Commerce Businesses", description: "E-commerce brands benefit from active community engagement that builds trust, answers product questions, and encourages purchases." },
  { icon: Briefcase, title: "Service-Based Businesses", description: "Service providers use community engagement to build relationships, showcase expertise, and generate leads through social interactions." },
  { icon: Cpu, title: "Technology Companies", description: "Tech companies leverage community engagement for product feedback, support, and building developer and user communities." },
  { icon: UtensilsCrossed, title: "Restaurants and Hospitality", description: "Restaurants and hospitality businesses use social engagement to respond to reviews, share experiences, and build local communities." },
  { icon: UserCheck, title: "Personal Brands and Influencers", description: "Personal brands and influencers rely on community engagement to maintain authentic connections with their audience." },
];

const processSections = [
  { num: "01", title: "Community Audit and Analysis", description: "We analyze your current social media community, engagement levels, and audience sentiment to identify opportunities." },
  { num: "02", title: "Engagement Strategy Development", description: "Our team develops a customized engagement strategy aligned with your brand voice and community goals." },
  { num: "03", title: "Active Community Management", description: "We implement daily community management including comment responses, DM handling, and audience interaction." },
  { num: "04", title: "Feedback Monitoring and Response", description: "Continuous monitoring of customer feedback with professional responses that maintain positive brand sentiment." },
  { num: "05", title: "Performance Analysis and Optimization", description: "Regular analysis of engagement metrics to optimize strategies and improve community growth and satisfaction." },
];

const whyChooseItems = [
  { icon: MessageSquare, label: "Professional community management expertise" },
  { icon: Code2, label: "Data-driven engagement strategies" },
  { icon: Shield, label: "Brand reputation protection" },
  { icon: Settings, label: "Customized engagement solutions" },
  { icon: Layers, label: "Ongoing community growth support" },
];

function ServiceAccordion({ section, index }: { section: typeof serviceSections[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="smce-fade rounded-2xl neon-border overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`smce-service-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`smce-service-content-${index}`}
        className="w-full flex items-center gap-5 p-6 sm:p-8 text-left group"
        data-testid={`button-smce-service-${index}`}
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/15 to-cyan-500/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
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
        id={`smce-service-content-${index}`}
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

export default function SocialMediaCommunityEngagement() {
  useSEO({
    title: "Build a Loyal Community – Social Media Engagement Services | Devoria Tech",
    description: "Professional social media community engagement services by Devoria Tech. Build trust, improve customer relationships, and grow your online community through active comment management, direct message handling, audience interaction, and reputation management.",
    keywords: "social media community engagement, community management, social media engagement, comment management, direct message handling, audience interaction, reputation management, brand engagement, customer support social media",
    canonical: "https://devoriatech.com/services/social-media/community-engagement",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".smce-fade").forEach((el) => {
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="section-smce-hero">
        <div className="absolute inset-0 hero-gradient-bg" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-orange-600/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03]">
          <div className="absolute inset-0 rounded-full border border-white/10 animate-orbit" style={{ animationDuration: "25s" }}>
            <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-orange-500/40 blur-sm" />
          </div>
          <div className="absolute inset-8 rounded-full border border-white/5 animate-orbit" style={{ animationDuration: "35s", animationDirection: "reverse" }}>
            <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-cyan-400/40 blur-sm" />
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
                  Community Engagement
                </span>
              </motion.div>

              <SplitText
                text="Social Media Community Engagement Services"
                as="h1"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                data-testid="text-smce-title"
              />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-6 text-sm text-white/35 max-w-lg leading-relaxed font-light">
                Devoria Tech provides professional social media community engagement services that help businesses build strong online communities, manage customer interactions, and create meaningful connections with their audience across all social media platforms.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8">
                <Link href="/contact">
                  <MagneticButton strength={0.2} data-testid="button-smce-hero-cta">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-cyan-500 rounded-full" />
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-orange-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Start Building Your Community <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </span>
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }} className="mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden neon-border">
                <img loading="lazy" src={smceHeroImg} alt="Social media community engagement services" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="smce-fade grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border text-center" data-testid={`stat-smce-${i}`}>
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
          <div className="smce-fade text-center mb-8">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Understanding Community Engagement</span>
            <SplitText text="What is Social Media Community Engagement" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
          </div>
          <div className="smce-fade max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Social media community engagement refers to the process of actively interacting with your audience on social media platforms. It involves responding to comments, messages, and mentions while building meaningful relationships with followers.
            </p>
            <p className="text-[13px] text-white/30 leading-[1.8] font-light">
              Effective community engagement goes beyond simply posting content. It requires active participation in conversations, addressing customer concerns, and creating an environment where your audience feels valued and connected to your brand.
            </p>
          </div>
          <div className="smce-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {engagementActivities.map((activity, i) => (
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
          <div className="smce-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Why It Matters</span>
            <SplitText text="Importance of Community Engagement" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="smce-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {importanceCards.map((card, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`importance-smce-${i}`}>
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
          <div className="smce-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Our Services</span>
            <SplitText text="Our Community Engagement Services" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="smce-fade mb-8 text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center">
            <p>Devoria Tech provides comprehensive community engagement services designed to build strong relationships between your brand and audience.</p>
          </div>
          <div className="space-y-5">
            {serviceSections.map((section, i) => (
              <ServiceAccordion key={i} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="smce-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Platform Engagement</span>
            <SplitText text="Community Engagement Across Platforms" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="smce-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>We manage community engagement across all major social media platforms to ensure consistent brand communication.</p>
          </div>
          <div className="smce-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {platformEngagementCards.map((card, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`platform-smce-${i}`}>
                <card.icon className="w-5 h-5 text-orange-400/50 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-[11px] text-white/25 leading-relaxed font-light">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="smce-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Key Benefits</span>
            <SplitText text="Benefits of Professional Community Management" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="smce-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Professional community management provides numerous advantages that help businesses build stronger online presence and customer relationships.</p>
          </div>
          <div className="smce-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefitCards.map((benefit, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`benefit-smce-${i}`}>
                <benefit.icon className="w-5 h-5 text-orange-400/50 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-[11px] text-white/25 leading-relaxed font-light">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="smce-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Our Strategies</span>
            <SplitText text="Our Community Engagement Strategies" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="smce-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {strategyCards.map((strategy, i) => (
              <div key={i} className="rounded-2xl neon-border p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500" data-testid={`strategy-smce-${i}`}>
                <strategy.icon className="w-5 h-5 text-orange-400/50 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-2">{strategy.title}</h3>
                <p className="text-[11px] text-white/25 leading-relaxed font-light">{strategy.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="smce-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Industries</span>
            <SplitText text="Industries That Benefit from Community Engagement" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="smce-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Community engagement is essential for businesses across various industries to build strong customer relationships.</p>
          </div>
          <div className="smce-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industrySections.map((industry, i) => (
              <TiltCard key={i} className="rounded-2xl neon-border" data-testid={`industry-smce-${i}`}>
                <div className="p-5">
                  <industry.icon className="w-5 h-5 text-orange-400/50 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-1">{industry.title}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed font-light">{industry.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
          <div className="smce-fade text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto text-center mt-6">
            <p>Devoria Tech helps businesses across all industries build and manage strong social media communities.</p>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="smce-fade text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-400">Our Process</span>
            <SplitText text="Our Community Engagement Process" as="h2" className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" />
          </div>
          <div className="smce-fade text-[13px] text-white/25 leading-[1.8] font-light max-w-2xl mx-auto text-center mb-10">
            <p>Devoria Tech follows a structured approach to build and manage thriving social media communities.</p>
          </div>
          <div className="smce-fade space-y-4 max-w-3xl mx-auto">
            {processSections.map((step, i) => (
              <div key={i} className="flex items-start gap-5 p-5 rounded-2xl neon-border bg-white/[0.01]" data-testid={`process-smce-${i}`}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/15 to-cyan-500/15 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold gradient-text-static">{step.num}</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{step.title}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed font-light">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="smce-fade rounded-2xl neon-border p-8 sm:p-12 bg-white/[0.01]" data-testid="smce-why-choose">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why Choose Devoria Tech for Community Engagement</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light mt-3 max-w-2xl mx-auto">
                Devoria Tech combines social media expertise with community management strategies to help businesses build engaged and loyal online communities that drive growth and brand loyalty.
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

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="smce-fade rounded-2xl neon-border p-8 bg-white/[0.01]" data-testid="smce-future">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">The Future of Social Media Community Engagement</h2>
              <p className="text-[13px] text-white/30 leading-[1.8] font-light max-w-2xl mx-auto">
                As social media platforms continue to evolve, community engagement will become even more important for businesses. Brands that invest in building strong online communities will have a significant competitive advantage in customer loyalty and brand advocacy.
              </p>
              <p className="text-[12px] text-white/20 leading-[1.8] font-light max-w-2xl mx-auto mt-3">
                Devoria Tech helps businesses stay ahead by implementing advanced community engagement strategies that leverage the latest social media trends and technologies to build lasting customer relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative p-14 sm:p-20 rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-transparent to-cyan-500/10" />
            <div className="absolute inset-0 border border-white/[0.06] rounded-[2rem]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
            <div className="relative z-10">
              <SplitText text="Build a Strong Social Media Community" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
              <div className="text-sm text-white/30 max-w-lg mx-auto mb-8 leading-relaxed font-light space-y-3">
                <p>If your brand wants to build a strong and engaged social media community, Devoria Tech can help.</p>
                <p>Our community engagement services are designed to help businesses create meaningful connections with their audience, improve customer relationships, and drive long-term brand loyalty.</p>
                <p>Contact Devoria Tech today to start building your social media community and transform your online presence.</p>
              </div>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-smce-cta">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-cyan-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Build a Strong Social Media Community <ArrowRight className="w-4 h-4" />
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
