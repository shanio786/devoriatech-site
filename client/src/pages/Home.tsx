import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight, ArrowUpRight,
  Globe, Smartphone, TrendingUp, Palette, Share2, Bot, Server,
  Zap, Users, Award, CheckCircle, Code2,
  Star, Quote, Search, Paintbrush, Rocket, Headphones, ChevronLeft, ChevronRight, ChevronDown,
  Monitor, ShoppingCart, Layers, Video,
} from "lucide-react";
import ParticleField from "@/components/ParticleField";
import SplitText from "@/components/SplitText";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import { useSEO } from "@/hooks/use-seo";
import { useFadeInUp, useHorizontalScroll, useImageReveal } from "@/hooks/use-gsap";
import portfolioEcommerce from "@assets/portfolio-ecommerce.webp";
import portfolioFitnessApp from "@assets/portfolio-fitness-app.webp";
import portfolioMarketing from "@assets/portfolio-marketing.webp";
import portfolioSaasDashboard from "@assets/portfolio-saas-dashboard.webp";
import portfolioHealthcareApp from "@assets/portfolio-healthcare-app.webp";

gsap.registerPlugin(ScrollTrigger);

const heroWords = ["Digital Experiences", "Web Applications", "Mobile Apps", "Brand Identity"];

function TypeWriter() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = heroWords[index];
    const timeout = deleting ? 30 : 60;

    if (!deleting && text === word) {
      setTimeout(() => setDeleting(true), 2500);
      return;
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % heroWords.length);
      return;
    }

    const timer = setTimeout(() => {
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, timeout);

    return () => clearTimeout(timer);
  }, [text, deleting, index]);

  return (
    <span className="gradient-text inline-block min-w-[1ch]">
      {text}
      <span className="inline-block w-[3px] h-[0.9em] bg-cyan-400 ml-1 animate-pulse align-middle" />
    </span>
  );
}

const services = [
  { icon: Globe, title: "Web Development", desc: "Custom web apps built with cutting-edge tech for maximum performance and stunning UX.", gradient: "from-blue-500 to-blue-600" },
  { icon: Smartphone, title: "App Development", desc: "Native and hybrid mobile apps that deliver seamless experiences across every device.", gradient: "from-cyan-500 to-teal-500" },
  { icon: TrendingUp, title: "Digital Marketing", desc: "Data-driven SEO, PPC and content strategies that drive measurable growth and ROI.", gradient: "from-violet-500 to-purple-500" },
  { icon: Share2, title: "Social Media", desc: "End-to-end social media management that builds loyal, engaged communities.", gradient: "from-pink-500 to-rose-500" },
  { icon: Palette, title: "Design & Branding", desc: "Visual identities and graphics that make lasting impressions and tell your story.", gradient: "from-amber-500 to-orange-500" },
  { icon: Server, title: "Business Software", desc: "Custom ERP, POS, SaaS, and management systems that streamline your business operations.", gradient: "from-emerald-500 to-green-500" },
  { icon: Bot, title: "AI Services & Automation", desc: "Intelligent AI solutions — influencer creation, chatbots, content, and workflow automation.", gradient: "from-fuchsia-500 to-pink-500" },
];

const portfolioItems = [
  { title: "E-Commerce Platform", category: "Web Development", image: portfolioEcommerce, tech: ["React", "Node.js", "Stripe"] },
  { title: "Fitness Tracking App", category: "App Development", image: portfolioFitnessApp, tech: ["React Native", "Firebase"] },
  { title: "Brand Campaign", category: "Digital Marketing", image: portfolioMarketing, tech: ["SEO", "Google Ads"] },
  { title: "SaaS Dashboard", category: "Web Development", image: portfolioSaasDashboard, tech: ["Next.js", "PostgreSQL"] },
  { title: "Healthcare App", category: "App Development", image: portfolioHealthcareApp, tech: ["Flutter", "Firebase"] },
];

const stats = [
  { value: "150+", label: "Projects Delivered", icon: CheckCircle },
  { value: "50+", label: "Happy Clients", icon: Users },
  { value: "5+", label: "Years Experience", icon: Award },
  { value: "99%", label: "Satisfaction Rate", icon: Zap },
];

const marqueeItems = ["Web Development", "App Development", "SEO", "Digital Marketing", "Social Media", "UI/UX Design", "Branding", "Business Software", "AI Solutions"];

const processSteps = [
  { num: "01", icon: Search, title: "Discovery", desc: "We analyze your business, audience, and competition to build a winning strategy." },
  { num: "02", icon: Paintbrush, title: "Design", desc: "Our designers create stunning mockups and prototypes that bring your vision to life." },
  { num: "03", icon: Code2, title: "Development", desc: "Our engineers build your product using cutting-edge technologies and best practices." },
  { num: "04", icon: Rocket, title: "Launch", desc: "We deploy, test, and optimize your product for peak performance and scalability." },
  { num: "05", icon: Headphones, title: "Support", desc: "Ongoing maintenance, analytics, and strategic updates to keep you ahead." },
];

const testimonials = [
  { name: "James Carter", role: "CEO, TechVentures", quote: "Devoria Tech transformed our online presence completely. Our traffic increased by 300% within 3 months and our conversion rate doubled. Their team is incredibly talented and professional.", rating: 5 },
  { name: "Sarah Mitchell", role: "Founder, StyleHub", quote: "The e-commerce platform they built for us is absolutely stunning. User-friendly, fast, and our sales have skyrocketed since launch. Best investment we've made!", rating: 5 },
  { name: "Michael Reynolds", role: "CMO, GrowthEdge", quote: "Their digital marketing strategy was a game-changer. The ROI on our Google Ads campaign exceeded our expectations by 200%. Highly recommend their services.", rating: 5 },
];

const clientLogos = ["TechVentures", "StyleHub", "GrowthEdge", "NextGen Labs", "CloudSync", "DataPulse", "InnovateCo", "DigitalWave"];

const seoServiceSections = [
  {
    icon: Globe, title: "Professional Web Development Services", gradient: "from-blue-500 to-blue-600",
    intro: "A website is the foundation of any successful online business. Devoria Tech builds modern, fast, and SEO-friendly websites designed to deliver the best user experience. Our web development services focus on performance, security, and scalability.",
    subsections: [
      { title: "WordPress Website Development", content: "WordPress is one of the most popular content management systems in the world. Devoria Tech provides professional WordPress development services for businesses that want flexible and easy-to-manage websites. Our WordPress services include custom website design, business websites, blog development, landing pages, speed optimization, and SEO-friendly structure. We build WordPress websites that are fully responsive, fast loading, and optimized for search engines." },
      { title: "Shopify & WooCommerce Development", content: "For businesses that want to sell products online, Devoria Tech provides powerful eCommerce development services using Shopify and WooCommerce. Our eCommerce solutions help businesses create secure and scalable online stores with smooth shopping experiences including Shopify store development, WooCommerce store development, product page optimization, payment gateway integration, mobile-friendly eCommerce design, and conversion optimization. With our eCommerce solutions, businesses can reach global customers and increase online sales." },
      { title: "Custom Web Development", content: "Some businesses require advanced web solutions beyond standard platforms. Devoria Tech builds custom websites using modern technologies such as React, Node.js, and Next.js. Custom web development allows businesses to create powerful digital platforms with advanced features and high performance including web applications, SaaS platforms, business dashboards, custom portals, and API integrations. Our development team ensures every website is secure, scalable, and optimized for performance." },
    ],
  },
  {
    icon: Smartphone, title: "Mobile App Development Services", gradient: "from-cyan-500 to-teal-500",
    intro: "Mobile apps are essential for businesses that want to provide better user experiences and reach customers on mobile devices. Devoria Tech develops high-quality mobile applications for Android and iOS platforms with focus on performance, security, and modern design.",
    subsections: [
      { title: "Android & iOS App Development", content: "We build powerful native mobile applications designed for speed and reliability. Our team develops apps that provide seamless performance across different devices. Features of our mobile apps include user-friendly interface, high performance, secure architecture, scalable backend systems, and modern UI/UX design." },
      { title: "Hybrid App Development", content: "Devoria Tech also develops hybrid applications using modern frameworks like React Native and Flutter. Hybrid apps allow businesses to launch apps faster while reducing development costs. Hybrid app development provides cross-platform compatibility, faster development time, lower maintenance cost, and high performance applications that work smoothly on both Android and iOS devices." },
    ],
  },
  {
    icon: TrendingUp, title: "Digital Marketing Services", gradient: "from-violet-500 to-purple-500",
    intro: "A strong digital marketing strategy helps businesses attract customers and build brand awareness. Devoria Tech provides complete digital marketing solutions designed to increase traffic, leads, and conversions with data-driven results and long-term growth.",
    subsections: [
      { title: "Search Engine Optimization (SEO)", content: "SEO is one of the most effective ways to increase organic traffic from search engines. Devoria Tech provides professional SEO services that help websites rank higher on Google and other search engines. Our SEO services include keyword research, on-page SEO optimization, technical SEO, off-page SEO and link building, SEO content strategy, and website performance optimization. By improving search rankings, businesses can attract more targeted visitors and generate more leads." },
      { title: "Paid Advertising (PPC)", content: "Paid advertising helps businesses reach potential customers quickly. Devoria Tech manages high-performance advertising campaigns on major platforms. Our PPC services include Google Ads campaigns, Meta Ads (Facebook & Instagram), YouTube advertising, TikTok ads, and conversion tracking and optimization. We create data-driven campaigns that maximize return on investment." },
    ],
  },
  {
    icon: Share2, title: "Social Media Management Services", gradient: "from-pink-500 to-rose-500",
    intro: "Social media plays an important role in building brand awareness and customer engagement. Devoria Tech helps businesses manage and grow their social media presence across all major platforms.",
    subsections: [
      { title: "Complete Social Media Solutions", content: "Our social media services include Facebook account management, Instagram marketing, LinkedIn marketing, TikTok marketing, and YouTube channel management. We create engaging content and strategic campaigns that help brands connect with their audience, build loyal communities, and drive measurable business results through social platforms." },
    ],
  },
  {
    icon: Palette, title: "Creative Graphic Design & Branding", gradient: "from-amber-500 to-orange-500",
    intro: "Strong branding helps businesses build trust and recognition. Devoria Tech provides creative graphic design services that help businesses create a professional brand identity.",
    subsections: [
      { title: "Brand Identity & Design", content: "Our design services include logo design, brand identity design, social media graphics, marketing materials, and digital banners and ads. Our designers focus on creativity, consistency, and brand storytelling to create visual identities that make lasting impressions and communicate your brand message effectively." },
    ],
  },
  {
    icon: Video, title: "Video Editing & Motion Graphics", gradient: "from-emerald-500 to-green-500",
    intro: "Video content is one of the most powerful ways to engage audiences online. Devoria Tech provides professional video editing and motion graphics services for businesses and brands.",
    subsections: [
      { title: "Professional Video Production", content: "Our video services include social media video editing, YouTube video editing, advertising video production, motion graphics and animations, and promotional videos. High-quality video content helps businesses capture attention, increase engagement, and deliver compelling brand stories across all digital platforms." },
    ],
  },
  {
    icon: Server, title: "Business Software Solutions", gradient: "from-teal-500 to-emerald-500",
    intro: "Devoria Tech provides advanced business software solutions designed to improve efficiency, automation, and business performance. Our custom software development services help companies manage operations, reduce manual work, and increase productivity.",
    subsections: [
      { title: "Desktop Software & SaaS Platforms", content: "We develop powerful desktop applications for businesses that require secure and high-performance systems, as well as scalable SaaS platforms designed for global users. Our solutions include fast and secure desktop applications, customized business workflows, database integration, reporting and analytics systems, cloud-based software platforms, subscription systems, user management, and secure online dashboards." },
      { title: "POS, ERP & Inventory Management", content: "We build smart POS systems for retail stores and restaurants, comprehensive ERP software for managing multiple operations, and inventory management systems that track stock levels and optimize supply chains. Features include billing and checkout, sales reporting, multi-store management, finance, HR, production management, warehouse management, and order tracking." },
      { title: "Restaurant & Production Management", content: "Devoria Tech builds restaurant management systems that simplify operations with order management, POS integration, kitchen management, and billing. We also develop production management software for manufacturing businesses to monitor production processes, track raw materials, and optimize operations. Plus custom business software tailored specifically to your unique requirements." },
    ],
  },
  {
    icon: Bot, title: "AI Services & AI Automation Solutions", gradient: "from-fuchsia-500 to-pink-500",
    intro: "Artificial Intelligence is transforming the way businesses operate. Devoria Tech provides advanced AI solutions that help companies automate tasks, improve customer experiences, and create innovative digital products.",
    subsections: [
      { title: "AI Influencer & AI Model Photoshoot", content: "AI influencers are digital personalities created using artificial intelligence. Devoria Tech helps brands create realistic AI influencers that can represent their brand on social media platforms, build unique brand identities, create viral marketing campaigns, and engage audiences. AI model photoshoots allow brands to create professional product images without expensive studio shoots — perfect for fashion brands, eCommerce stores, and product marketing campaigns." },
      { title: "AI Chatbot & AI Content Creation", content: "AI chatbots help businesses provide instant customer support and automate communication. Our intelligent chatbots answer customer questions, provide product information, automate customer support, and improve website engagement. AI-powered content creation helps businesses produce high-quality marketing content faster including blog articles, marketing copy, social media content, and product descriptions." },
      { title: "AI Automation Solutions", content: "AI automation helps businesses streamline repetitive tasks and improve operational efficiency. Devoria Tech builds AI automation systems for business workflows, marketing automation, data processing, and customer service automation. These intelligent systems help businesses save time and improve productivity." },
    ],
  },
];

const whyChooseReasons = [
  "Experienced digital experts with 5+ years of industry experience",
  "Modern technology solutions using React, Node.js, Flutter, and more",
  "SEO-friendly development that ranks on Google",
  "Scalable digital products built for long-term growth",
  "Data-driven marketing strategies with measurable ROI",
  "Reliable support and communication throughout every project",
];

function SEOServiceDetails() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [expandedSub, setExpandedSub] = useState<string | null>(null);

  return (
    <section className="py-20 lg:py-28 relative" data-testid="section-seo-services">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Our Expertise</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">Complete Digital Solutions for Modern Businesses</h2>
          <p className="mt-5 text-[13px] text-white/30 max-w-xl mx-auto leading-relaxed font-light">
            Devoria Tech offers a full range of digital services that help businesses grow online. From website development to advanced digital marketing campaigns, our services are designed to deliver measurable results.
          </p>
        </div>

        <div className="space-y-3">
          {seoServiceSections.map((section, i) => {
            const isOpen = expandedSection === i;
            return (
              <div key={section.title} className="rounded-xl neon-border overflow-hidden bg-white/[0.01]" data-testid={`seo-service-${i}`}>
                <button
                  onClick={() => { setExpandedSection(isOpen ? null : i); setExpandedSub(null); }}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-4 p-5 text-left"
                  data-testid={`button-seo-service-${i}`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shrink-0`}>
                    <section.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-[15px] font-semibold text-white/80 tracking-tight">{section.title}</h2>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-cyan-400/40 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div
                  className="overflow-hidden transition-all duration-500 ease-out"
                  style={{ maxHeight: isOpen ? "2000px" : "0px", opacity: isOpen ? 1 : 0 }}
                >
                  <div className="px-5 pb-5 space-y-4">
                    <p className="text-[12px] text-white/25 leading-[1.8] font-light">{section.intro}</p>
                    {section.subsections.map((sub) => {
                      const subOpen = expandedSub === `${i}-${sub.title}`;
                      return (
                        <div key={sub.title} className="rounded-lg bg-white/[0.015] border border-white/[0.04] overflow-hidden">
                          <button
                            onClick={() => setExpandedSub(subOpen ? null : `${i}-${sub.title}`)}
                            aria-expanded={subOpen}
                            className="w-full flex items-center justify-between p-4 text-left"
                          >
                            <h3 className="text-[13px] font-medium text-white/60">{sub.title}</h3>
                            <ChevronDown className={`w-3.5 h-3.5 text-white/20 shrink-0 transition-transform duration-300 ${subOpen ? "rotate-180" : ""}`} />
                          </button>
                          <div
                            className="overflow-hidden transition-all duration-400 ease-out"
                            style={{ maxHeight: subOpen ? "500px" : "0px", opacity: subOpen ? 1 : 0 }}
                          >
                            <p className="px-4 pb-4 text-[11px] text-white/20 leading-[1.9] font-light">{sub.content}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyChooseSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="py-20 lg:py-28 relative" data-testid="section-why-choose">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Why Us</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">Why Choose Devoria Tech</h2>
          <p className="mt-5 text-[13px] text-white/30 max-w-xl mx-auto leading-relaxed font-light">
            Businesses choose Devoria Tech because we focus on quality, innovation, and results. Our team works closely with clients to understand their goals and deliver solutions that create real impact.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {whyChooseReasons.map((reason, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.015] border border-white/[0.04]">
              <CheckCircle className="w-4 h-4 text-cyan-400/50 mt-0.5 shrink-0" />
              <span className="text-[12px] text-white/35 font-light leading-relaxed">{reason}</span>
            </div>
          ))}
        </div>

        <div
          className="overflow-hidden transition-all duration-500 ease-out"
          style={{ maxHeight: expanded ? "500px" : "0px", opacity: expanded ? 1 : 0 }}
        >
          <div className="space-y-4 mb-4">
            <div className="rounded-xl bg-white/[0.01] border border-white/[0.04] p-5">
              <h2 className="text-[14px] font-semibold text-white/60 mb-2">Helping Businesses Grow Worldwide</h2>
              <p className="text-[12px] text-white/25 leading-[1.8] font-light">
                Devoria Tech works with businesses from different industries across the world. Our global approach allows us to create digital solutions that work for different markets and audiences. Whether you are a startup launching your first website or an established company looking to expand online, Devoria Tech provides the expertise needed to succeed in the digital world.
              </p>
            </div>
            <div className="rounded-xl bg-white/[0.01] border border-white/[0.04] p-5">
              <p className="text-[12px] text-white/25 leading-[1.8] font-light">
                Our solutions are designed to help businesses increase online visibility, attract targeted customers, improve user experience, and grow digital revenue. We believe in building long-term partnerships with our clients by delivering exceptional digital services.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            className="inline-flex items-center gap-1.5 text-[12px] text-cyan-400/60 hover:text-cyan-400 font-medium transition-colors duration-300"
            data-testid="button-why-choose-more"
          >
            {expanded ? "Show Less" : "Learn More About Us"}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
    </section>
  );
}

function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setActive((p) => (p + 1) % testimonials.length), []);
  const prev = useCallback(() => setActive((p) => (p - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [next]);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 5000);
  }, [next]);

  const t = testimonials[active];

  return (
    <section className="py-28 lg:py-36 relative" data-testid="section-testimonials">
      <div className="absolute inset-0 hero-gradient-bg opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Testimonials</span>
          <SplitText
            text="What Clients Say"
            as="h2"
            className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight"
            data-testid="text-testimonials-title"
          />
        </div>

        <div className="max-w-2xl mx-auto relative" role="region" aria-label="Client testimonials" aria-roledescription="carousel">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="rounded-2xl neon-border p-8 sm:p-10 text-center"
              role="group"
              aria-label={`Testimonial ${active + 1} of ${testimonials.length}`}
              data-testid={`card-testimonial-${active}`}
            >
              <Quote className="w-10 h-10 text-cyan-400/15 mx-auto mb-6" />
              <p className="text-[14px] sm:text-[15px] text-white/40 leading-[1.9] font-light italic">"{t.quote}"</p>
              <div className="flex items-center gap-1 justify-center mt-6 mb-4">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="flex items-center gap-3 justify-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center shrink-0">
                  <span className="text-[11px] font-bold text-white/50">{t.name.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <div className="text-left">
                  <p className="text-[13px] text-white font-medium">{t.name}</p>
                  <p className="text-[10px] text-white/25">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={() => { prev(); resetTimer(); }}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-14 w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-white hover:border-white/20 transition-all duration-300"
            data-testid="button-testimonial-prev"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => { next(); resetTimer(); }}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-14 w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-white hover:border-white/20 transition-all duration-300"
            data-testid="button-testimonial-next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-2 mt-8" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={active === i}
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => { setActive(i); resetTimer(); }}
                className={`rounded-full transition-all duration-500 ${active === i ? "w-8 h-2 bg-gradient-to-r from-blue-500 to-cyan-400" : "w-2 h-2 bg-white/15 hover:bg-white/30"}`}
                data-testid={`button-testimonial-dot-${i}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useSEO({ title: "Devoria Tech – Web Development, App Development & Digital Marketing Agency", description: "We help businesses grow online with professional web development, mobile apps, SEO, social media management, and creative design. Our team has delivered 500+ projects with a focus on quality and results.", keywords: "digital agency, web development company, app development, digital marketing agency, SEO company, social media management, graphic design, video editing, WordPress, Shopify, React, Flutter, ecommerce development, SaaS, business software", canonical: "https://devoriatech.com" });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);

  const { containerRef: hScrollContainer, scrollRef: hScrollContent } = useHorizontalScroll();

  const sectionHeadRef1 = useFadeInUp();
  const sectionHeadRef2 = useFadeInUp();
  const ctaRef = useFadeInUp();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, rotateX: -5 },
          {
            y: 0, opacity: 1, rotateX: 0,
            duration: 0.8,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".stat-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1, opacity: 1,
            duration: 0.7,
            delay: i * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden noise-bg">
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center hero-gradient-bg" data-testid="section-hero">
        <ParticleField />
        <div className="absolute inset-0 grid-bg z-[2] opacity-40" />

        <div className="absolute top-[15%] left-[15%] w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-cyan-500/6 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[40%] right-[30%] w-[200px] h-[200px] bg-violet-500/5 rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: "4s" }} />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-[3]">
          <div className="absolute inset-0 rounded-full border border-white/[0.03] animate-orbit" style={{ animationDuration: "25s" }}>
            <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-blue-500/30 blur-sm" />
          </div>
          <div className="absolute inset-8 rounded-full border border-white/[0.02] animate-orbit" style={{ animationDuration: "35s", animationDirection: "reverse" }}>
            <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-cyan-400/30 blur-sm" />
          </div>
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 max-w-5xl mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] text-cyan-400 mb-8 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Premium Digital Agency
            </span>
          </motion.div>

          <SplitText
            text="We Build"
            as="h1"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight mb-2"
            scrollTrigger={false}
            delay={0.3}
            data-testid="text-hero-title"
          />
          <span className="sr-only">Devoria Tech – Premium Digital Agency for Web Development, App Development & Digital Marketing</span>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8"
          >
            <TypeWriter />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="text-sm sm:text-base text-white/35 max-w-lg mx-auto leading-relaxed font-light"
            data-testid="text-hero-subtitle"
          >
            Devoria Tech is a premium digital agency that helps businesses grow with powerful web development, app development, digital marketing, and creative design solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/contact">
              <MagneticButton strength={0.2} data-testid="button-hero-start-project">
                <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)] group-hover:shadow-[0_0_50px_rgba(6,182,212,0.4)] transition-shadow duration-700" />
                  <span className="relative z-10 flex items-center gap-2">
                    Start Your Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </span>
              </MagneticButton>
            </Link>
            <Link href="/portfolio">
              <MagneticButton strength={0.2} data-testid="button-hero-view-work">
                <span className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white/70 cursor-pointer border border-white/[0.08] hover:border-white/20 hover:text-white hover:bg-white/[0.03] transition-all duration-500">
                  View Our Work
                </span>
              </MagneticButton>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 2 }}
            className="mt-20 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1.5"
            >
              <motion.div
                animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-0.5 h-2 rounded-full bg-white/30"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-4 overflow-hidden border-y border-white/[0.04] relative" data-testid="section-marquee">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="mx-8 text-sm font-medium text-white/15 uppercase tracking-[0.2em] flex items-center gap-4">
              {item}
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/20" />
            </span>
          ))}
        </div>
      </section>

      <section className="py-28 lg:py-40 relative" data-testid="section-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={sectionHeadRef1} className="mb-20">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">What We Do</span>
            <SplitText
              text="Our Services"
              as="h2"
              className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight"
              data-testid="text-services-title"
            />
            <p className="mt-5 text-sm text-white/30 max-w-md leading-relaxed font-light">
              End-to-end digital solutions tailored to elevate your brand and accelerate growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, i) => (
              <Link key={service.title} href="/services">
                <TiltCard
                  className="service-card rounded-2xl neon-border cursor-pointer h-full"
                  data-testid={`card-service-${i}`}
                >
                  <div className="p-7 h-full">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                      <service.icon className="w-5.5 h-5.5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">{service.title}</h3>
                    <p className="text-[13px] text-white/30 leading-relaxed font-light">{service.desc}</p>
                    <div className="mt-5 flex items-center gap-1.5 text-[11px] text-cyan-400/60 font-medium tracking-wide uppercase group-hover:text-cyan-400 transition-colors">
                      Explore <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </TiltCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SEOServiceDetails />

      <div ref={hScrollContainer} className="relative" data-testid="section-portfolio">
        <div className="absolute top-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pt-10 z-10 max-w-7xl mx-auto">
          <div ref={sectionHeadRef2}>
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Our Work</span>
            <SplitText
              text="Featured Projects"
              as="h2"
              className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight"
              data-testid="text-portfolio-title"
            />
          </div>
        </div>

        <div ref={hScrollContent} className="horizontal-scroll-section pt-32 pb-20 px-8">
          {portfolioItems.map((item, i) => (
            <div key={item.title} className="w-[70vw] sm:w-[50vw] lg:w-[35vw] flex-shrink-0">
              <TiltCard
                className="rounded-2xl neon-border overflow-hidden h-full cursor-pointer group"
                data-testid={`card-portfolio-${i}`}
              >
                <div className="aspect-[4/3] w-full relative overflow-hidden">
                  <img src={item.image} alt={item.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-70" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[10px] text-cyan-400 font-medium tracking-wider uppercase">{item.category}</span>
                    <h3 className="text-xl font-bold text-white mt-1 tracking-tight">{item.title}</h3>
                    <div className="flex gap-2 mt-3">
                      {item.tech.map((t) => (
                        <span key={t} className="text-[9px] px-2.5 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/[0.06] uppercase tracking-wider">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
          <div className="w-[30vw] flex-shrink-0 flex items-center justify-center">
            <Link href="/portfolio">
              <MagneticButton strength={0.3}>
                <div className="w-32 h-32 rounded-full border border-white/10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-cyan-400/30 transition-colors group">
                  <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-cyan-400 transition-colors" />
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-medium group-hover:text-cyan-400 transition-colors">View All</span>
                </div>
              </MagneticButton>
            </Link>
          </div>
        </div>
      </div>

      <section className="py-28 lg:py-36 relative" data-testid="section-stats">
        <div className="absolute inset-0 hero-gradient-bg opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="stat-card text-center p-8 rounded-2xl glass-card"
                data-testid={`stat-${i}`}
              >
                <stat.icon className="w-5 h-5 text-cyan-400/60 mx-auto mb-4" />
                <div className="text-4xl lg:text-5xl font-bold gradient-text-static tracking-tight">{stat.value}</div>
                <div className="text-[11px] text-white/30 mt-2 uppercase tracking-widest font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 overflow-hidden" data-testid="section-client-logos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[10px] text-white/20 uppercase tracking-[0.3em] font-medium mb-10">Trusted by Leading Brands</p>
          <div className="flex animate-marquee whitespace-nowrap">
            {[...clientLogos, ...clientLogos, ...clientLogos].map((name, i) => (
              <span
                key={i}
                className="mx-10 text-xl sm:text-2xl font-bold text-white/[0.06] tracking-tight flex items-center"
                data-testid={`logo-client-${i}`}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 lg:py-36 relative" data-testid="section-process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">How We Work</span>
            <SplitText
              text="Our Process"
              as="h2"
              className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight"
              data-testid="text-process-title"
            />
            <p className="mt-5 text-sm text-white/30 max-w-md mx-auto leading-relaxed font-light">
              A proven methodology that delivers results, every single time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {processSteps.map((step, i) => (
              <TiltCard
                key={step.title}
                className="process-card rounded-2xl neon-border text-center relative overflow-hidden"
                data-testid={`card-process-${i}`}
              >
                <div className="p-6 relative z-10">
                  <span className="text-4xl font-bold text-white/[0.04] absolute top-3 right-4">{step.num}</span>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-5 h-5 text-cyan-400/70" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2 tracking-tight">{step.title}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed font-light">{step.desc}</p>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-gradient-to-r from-white/10 to-transparent z-20" />
                )}
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsCarousel />

      <WhyChooseSection />

      <section className="py-28 lg:py-36 relative" data-testid="section-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" ref={ctaRef}>
          <div className="relative p-14 sm:p-20 rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-500/5 to-violet-500/10" />
            <div className="absolute inset-0 border border-white/[0.06] rounded-[2rem]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />

            <div className="relative z-10">
              <SplitText
                text="Start Your Project with Devoria Tech"
                as="h2"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
                data-testid="text-cta-title"
              />
              <p className="text-sm text-white/30 max-w-md mx-auto mt-6 mb-10 leading-relaxed font-light">
                Looking for a reliable digital agency to build your website, develop an app, or grow your online presence? Contact Devoria Tech today and start building your digital future.
              </p>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-cta-get-started">
                  <span className="relative inline-flex items-center gap-2 px-9 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_40px_rgba(37,99,235,0.3)] group-hover:shadow-[0_0_60px_rgba(6,182,212,0.4)] transition-shadow duration-700" />
                    <span className="relative z-10 flex items-center gap-2">
                      Get Started Today
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
