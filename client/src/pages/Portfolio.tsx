import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, CheckCircle, Megaphone, ShoppingCart, GraduationCap, Building2, User, Rocket } from "lucide-react";
import { Link } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSEO } from "@/hooks/use-seo";
import SplitText from "@/components/SplitText";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";

import portfolioWebsite from "@assets/portfolio-website-project.webp";
import portfolioEcommerce from "@assets/portfolio-ecommerce-project.webp";
import portfolioMobileApp from "@assets/portfolio-mobile-app-project.webp";
import portfolioAiChatbot from "@assets/portfolio-ai-chatbot-project.webp";
import portfolioSocialMedia from "@assets/portfolio-social-media-project.webp";
import portfolioBranding from "@assets/portfolio-branding-project.webp";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Web Development", "App Development", "AI Solutions", "Digital Marketing", "Branding"];

const projects = [
  {
    title: "Business Website Development",
    category: "Web Development",
    industry: "Corporate Business",
    desc: "We designed and developed a modern business website with a responsive layout, fast loading speed, and SEO-friendly structure. The website helps the client establish a strong online presence and attract new customers.",
    image: portfolioWebsite,
    tech: ["React", "Node.js", "SEO"],
    features: ["Modern responsive design", "Optimized user experience", "SEO-friendly website structure", "Fast performance and security"],
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "E-Commerce Website",
    category: "Web Development",
    industry: "Online Store",
    desc: "Devoria Tech developed a professional eCommerce store that allows the client to sell products online with secure payment integration and smooth user experience.",
    image: portfolioEcommerce,
    tech: ["Shopify", "WooCommerce", "Stripe"],
    features: ["Product catalog system", "Secure payment gateway", "Mobile-friendly design", "Optimized shopping experience"],
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "Mobile Application Development",
    category: "App Development",
    industry: "Service-Based Business",
    desc: "Our team developed a mobile application that helps users access services easily from their smartphones with a clean, intuitive interface and reliable performance.",
    image: portfolioMobileApp,
    tech: ["React Native", "Firebase", "REST API"],
    features: ["User-friendly mobile interface", "Secure login system", "Fast and reliable performance", "Scalable app architecture"],
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    title: "AI Chatbot Development",
    category: "AI Solutions",
    industry: "Online Business",
    desc: "Devoria Tech created an AI-powered chatbot that provides automated customer support and improves communication with website visitors.",
    image: portfolioAiChatbot,
    tech: ["AI/ML", "NLP", "Python"],
    features: ["Automated customer responses", "Natural language processing", "Integration with website platform", "Improved customer engagement"],
    gradient: "from-fuchsia-500/20 to-pink-500/20",
  },
  {
    title: "Social Media Marketing Campaign",
    category: "Digital Marketing",
    industry: "Brand Marketing",
    desc: "Our team managed social media campaigns that helped the client increase brand visibility and audience engagement across multiple platforms.",
    image: portfolioSocialMedia,
    tech: ["Meta Ads", "Content Strategy", "Analytics"],
    features: ["Content creation strategy", "Social media growth campaigns", "Audience engagement", "Performance analytics"],
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    title: "Logo and Brand Identity Design",
    category: "Branding",
    industry: "Startup Company",
    desc: "Devoria Tech created a modern logo and complete brand identity system designed to help the startup establish a strong visual presence.",
    image: portfolioBranding,
    tech: ["Brand Strategy", "Visual Identity", "Design"],
    features: ["Custom logo design", "Brand color palette", "Typography system", "Social media branding assets"],
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
];

const processSteps = [
  { num: "01", title: "Discovery", desc: "Understanding the client's goals, audience, and requirements to define a clear project scope." },
  { num: "02", title: "Strategy", desc: "Planning the project approach, technology stack, and timeline for optimal results." },
  { num: "03", title: "Design", desc: "Creating modern, user-friendly designs that align with brand identity and user expectations." },
  { num: "04", title: "Development", desc: "Building secure, scalable, and high-performance digital products using modern technologies." },
  { num: "05", title: "Launch", desc: "Testing, optimizing, and deploying the final product with ongoing support and analytics." },
];

const industries = [
  { icon: Rocket, label: "Technology Startups" },
  { icon: ShoppingCart, label: "eCommerce Businesses" },
  { icon: Building2, label: "Corporate Organizations" },
  { icon: Megaphone, label: "Marketing Agencies" },
  { icon: GraduationCap, label: "Education Platforms" },
  { icon: User, label: "Personal Brands" },
];

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "10+", label: "Countries Served" },
  { value: "99%", label: "Client Satisfaction" },
  { value: "6+", label: "Service Categories" },
];

export default function Portfolio() {
  useSEO({
    title: "Our Portfolio – Websites, Apps & Campaigns We've Built | Devoria Tech",
    description: "Explore our portfolio of websites, mobile apps, AI solutions, branding, and digital marketing campaigns. Real projects with real results for businesses worldwide.",
    keywords: "portfolio, case studies, web development projects, app development portfolio, digital marketing results, e-commerce website, AI chatbot, brand identity design, Devoria Tech projects",
    canonical: "https://devoriatech.com/portfolio",
  });

  const [active, setActive] = useState("All");
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".port-fade").forEach((el, i) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: i * 0.05, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" } }
        );
      });
    });
    return () => ctx.revert();
  }, [active]);

  return (
    <div className="pt-28 pb-16 noise-bg">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Portfolio</span>
            <SplitText
              text="Our Portfolio"
              as="h1"
              className="mt-4 text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight"
              data-testid="text-portfolio-page-title"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-5 text-sm text-white/30 max-w-2xl leading-relaxed font-light"
            >
              At Devoria Tech, we specialize in building powerful digital solutions that help businesses grow and succeed online. From modern websites and mobile applications to AI solutions, branding, and digital marketing campaigns, our work demonstrates our commitment to quality and innovation.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-16"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-5 rounded-xl glass-card" data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, '-')}`}>
                <div className="text-2xl sm:text-3xl font-bold gradient-text-static">{stat.value}</div>
                <div className="text-[10px] text-white/30 uppercase tracking-widest mt-1.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">Featured Projects</h2>
            <p className="text-[13px] text-white/30 font-light">Projects developed by Devoria Tech showcasing our expertise across multiple digital disciplines.</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {categories.map((cat) => (
              <MagneticButton key={cat} strength={0.15}>
                <button
                  onClick={() => { setActive(cat); setExpandedProject(null); }}
                  className={`px-5 py-2.5 rounded-full text-[12px] font-medium transition-all duration-500 ${
                    active === cat
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                      : "bg-white/[0.03] text-white/35 hover:text-white/60 border border-white/[0.06] hover:border-white/[0.12]"
                  }`}
                  data-testid={`button-filter-${cat.toLowerCase().replace(/\s/g, '-')}`}
                >
                  {cat}
                </button>
              </MagneticButton>
            ))}
          </motion.div>

          <motion.div layout className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, idx) => {
                const isExpanded = expandedProject === idx;
                const globalIdx = projects.indexOf(project);
                const isEven = globalIdx % 2 === 0;
                return (
                  <motion.div
                    key={project.title}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    className="port-fade"
                  >
                    <div
                      className="rounded-2xl neon-border overflow-hidden group cursor-pointer"
                      onClick={() => setExpandedProject(isExpanded ? null : idx)}
                      data-testid={`card-project-${project.title.toLowerCase().replace(/\s/g, '-')}`}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className={`relative aspect-[4/3] lg:aspect-auto overflow-hidden ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                          <img
                            src={project.image}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className={`absolute inset-0 ${isEven ? "bg-gradient-to-r" : "bg-gradient-to-l"} from-transparent to-[#0F172A]/80 hidden lg:block`} />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent lg:hidden" />
                          <div className="absolute top-4 left-4">
                            <span className="text-[9px] px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white/70 font-medium uppercase tracking-wider border border-white/10">
                              {project.industry}
                            </span>
                          </div>
                          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                            <ArrowUpRight className="w-4 h-4 text-white" />
                          </div>
                        </div>

                        <div className={`p-7 sm:p-9 flex flex-col justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                          <span className="text-[10px] text-cyan-400/70 font-semibold tracking-[0.2em] uppercase mb-3">{project.category}</span>
                          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors duration-500 mb-3">
                            {project.title}
                          </h3>
                          <p className="text-[13px] text-white/30 leading-relaxed font-light mb-5">{project.desc}</p>

                          <div className="flex flex-wrap gap-2 mb-5">
                            {project.tech.map((t) => (
                              <span key={t} className="text-[10px] px-3 py-1 rounded-full bg-white/[0.04] text-white/40 border border-white/[0.06] font-medium">
                                {t}
                              </span>
                            ))}
                          </div>

                          <div
                            className="overflow-hidden transition-all duration-500 ease-out"
                            style={{ maxHeight: isExpanded ? "300px" : "0px", opacity: isExpanded ? 1 : 0 }}
                          >
                            <div className={`p-5 rounded-xl bg-gradient-to-br ${project.gradient} mb-4`}>
                              <h4 className="text-[11px] font-semibold text-white/60 uppercase tracking-widest mb-3">Key Features</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {project.features.map((f, fi) => (
                                  <div key={fi} className="flex items-start gap-2">
                                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400/60 mt-0.5 shrink-0" />
                                    <span className="text-[12px] text-white/45 font-light">{f}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <button className="text-[11px] text-cyan-400/60 hover:text-cyan-400 font-medium transition-colors flex items-center gap-1" data-testid={`button-expand-${idx}`}>
                            {isExpanded ? "Show Less" : "View Details"}
                            <ArrowRight className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? "-rotate-90" : "rotate-90"}`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="port-fade text-center mb-14">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Process</span>
            <SplitText text="Our Creative Process" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
            <p className="mt-5 text-[13px] text-white/30 max-w-xl mx-auto leading-relaxed font-light">
              Every project follows a structured and strategic process to ensure the highest quality results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {processSteps.map((step, i) => (
              <TiltCard key={step.num} className="port-fade rounded-2xl neon-border overflow-hidden" data-testid={`process-step-${i}`}>
                <div className="p-6 text-center h-full flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold gradient-text-static mb-3">{step.num}</span>
                  <h3 className="text-sm font-semibold text-white mb-2 tracking-tight">{step.title}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed font-light">{step.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="port-fade text-center mb-14">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Industries</span>
            <SplitText text="Industries We Work With" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
            <p className="mt-5 text-[13px] text-white/30 max-w-xl mx-auto leading-relaxed font-light">
              Our experience across different industries allows us to create customized digital solutions for every client.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {industries.map((ind, i) => (
              <div key={ind.label} className="port-fade text-center p-5 rounded-xl glass-card group hover:border-cyan-400/20 transition-all duration-500" data-testid={`industry-${i}`}>
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center mx-auto mb-3 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-all duration-500">
                  <ind.icon className="w-5 h-5 text-cyan-400/60" />
                </div>
                <p className="text-[11px] text-white/35 font-light">{ind.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="port-fade relative rounded-3xl overflow-hidden neon-border">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-500/5 to-violet-500/10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="relative text-center py-16 sm:py-20 px-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
                Start Your Next Project
              </h2>
              <p className="text-sm text-white/30 max-w-lg mx-auto mb-8 font-light leading-relaxed">
                If you are looking for a reliable digital agency to build your website, develop an application, or create a powerful digital brand, Devoria Tech is ready to help.
              </p>
              <Link href="/contact">
                <MagneticButton strength={0.25} data-testid="button-portfolio-contact">
                  <span className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                    <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Contact Devoria Tech <ArrowRight className="w-4 h-4" />
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
