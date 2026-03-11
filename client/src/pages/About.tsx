import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSEO } from "@/hooks/use-seo";
import SplitText from "@/components/SplitText";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import {
  ArrowRight, Target, Eye, Heart, Lightbulb, Users,
  Rocket, Shield, Award, Globe, Code2, TrendingUp,
  ChevronDown, CheckCircle, Smartphone, Megaphone, Palette,
  Mail, Sparkles, Zap, Star,
} from "lucide-react";
import aboutOffice from "@assets/about-office.webp";
import ceoPhoto from "@assets/ceo-zeeshan-ahmad.webp";

gsap.registerPlugin(ScrollTrigger);

const values = [
  { icon: Lightbulb, title: "Innovation", desc: "We embrace cutting-edge technologies and creative approaches to deliver forward-thinking solutions." },
  { icon: Shield, title: "Quality", desc: "Every pixel, every line of code, every strategy is crafted to the highest standards of excellence." },
  { icon: Heart, title: "Passion", desc: "We're genuinely passionate about digital technology and helping businesses succeed online." },
  { icon: Users, title: "Collaboration", desc: "We work closely with our clients, treating every project as a true partnership." },
];

const milestones = [
  { year: "2020", title: "Founded", desc: "Zeeshan Ahmad founded Devoria Tech with a vision to build premium digital experiences." },
  { year: "2021", title: "50 Projects", desc: "Reached our first major milestone of 50 completed projects." },
  { year: "2023", title: "Global Reach", desc: "Expanded to serve clients across 10+ countries worldwide." },
  { year: "2025", title: "150+ Projects", desc: "Crossed 150 projects with 99% client satisfaction rate." },
];

const whyChooseReasons = [
  { icon: Shield, text: "Professional and experienced digital experts" },
  { icon: Code2, text: "Modern development technologies" },
  { icon: TrendingUp, text: "SEO-friendly digital solutions" },
  { icon: Palette, text: "Creative and user-focused design" },
  { icon: Target, text: "Data-driven marketing strategies" },
  { icon: Users, text: "Reliable communication and support" },
  { icon: Zap, text: "Fast delivery and scalable solutions" },
  { icon: Star, text: "99% client satisfaction rate" },
];

const expertiseItems = [
  {
    icon: Code2,
    title: "Web Development",
    desc: "We create modern, responsive, and SEO-friendly websites that help businesses establish a strong online presence. Our web development services include WordPress development, Shopify and WooCommerce eCommerce solutions, and custom web development using modern frameworks.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Our development team builds powerful mobile applications for Android and iOS platforms. We also develop hybrid mobile applications using technologies such as React Native and Flutter to provide efficient cross-platform solutions.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    desc: "Devoria Tech helps businesses reach their target audience through effective digital marketing strategies. Our services include search engine optimization (SEO), paid advertising campaigns, and social media marketing designed to increase traffic and conversions.",
  },
  {
    icon: Palette,
    title: "Creative Design Solutions",
    desc: "Our creative team provides professional graphic design, branding, and video editing services that help businesses build strong and memorable brand identities.",
  },
];

function SEOAboutContent() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const sections = [
    {
      title: "Our Expertise",
      hasExpertise: true,
      content: [
        "Devoria Tech provides a wide range of professional digital services designed to help businesses succeed in the competitive online environment.",
      ],
    },
    {
      title: "Why Businesses Choose Devoria Tech",
      hasReasons: true,
      content: [
        "Businesses choose Devoria Tech because we focus on quality, innovation, and measurable results. We understand that every business has unique goals, and we create customized digital solutions that align with those goals.",
        "Our team works closely with clients throughout the entire process to ensure every project meets expectations and delivers real value.",
      ],
    },
    {
      title: "Our Global Approach",
      content: [
        "Devoria Tech works with businesses from different industries and countries around the world. Our global approach allows us to understand different markets and create digital solutions that work effectively for international audiences.",
        "Whether you are launching a startup, growing an eCommerce store, or expanding an established company, Devoria Tech provides the expertise needed to succeed in the digital landscape.",
      ],
    },
    {
      title: "Partner with Devoria Tech",
      content: [
        "Devoria Tech is more than just a digital agency. We are a technology partner that helps businesses transform ideas into successful digital products.",
        "If you are looking for a reliable digital agency for web development, mobile app development, digital marketing, or creative design, Devoria Tech is ready to help you achieve your digital goals.",
        "Together, we can build powerful digital experiences that drive growth and success for your business.",
      ],
    },
  ];

  return (
    <section className="py-20 lg:py-28 relative" data-testid="section-seo-about">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Learn More</span>
          <p className="mt-5 text-[13px] text-white/30 max-w-xl mx-auto leading-relaxed font-light">
            Devoria Tech combines technology, creativity, and strategic thinking to deliver digital solutions that help businesses achieve real results.
          </p>
        </div>

        <div className="space-y-2">
          {sections.map((section, i) => {
            const isOpen = openSection === i;
            return (
              <div key={i} className="rounded-xl bg-white/[0.015] border border-white/[0.04] overflow-hidden" data-testid={`seo-about-${i}`}>
                <button
                  onClick={() => setOpenSection(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`seo-about-content-${i}`}
                  className="w-full flex items-center justify-between p-5 text-left group"
                  data-testid={`button-seo-about-${i}`}
                >
                  <h2 className="text-[14px] font-semibold text-white/50 group-hover:text-white/70 transition-colors duration-300">
                    {section.title}
                  </h2>
                  <ChevronDown className={`w-4 h-4 text-cyan-400/40 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div
                  id={`seo-about-content-${i}`}
                  className="overflow-hidden transition-all duration-500 ease-out"
                  style={{ maxHeight: isOpen ? "2000px" : "0px", opacity: isOpen ? 1 : 0 }}
                >
                  <div className="px-5 pb-5 space-y-3">
                    {section.content.map((p, pi) => (
                      <p key={pi} className="text-[12px] text-white/25 leading-[1.8] font-light">{p}</p>
                    ))}

                    {section.hasExpertise && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                        {expertiseItems.map((item, ei) => (
                          <div key={ei} className="flex items-start gap-3 p-4 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                            <item.icon className="w-4 h-4 text-cyan-400/50 mt-0.5 shrink-0" />
                            <div>
                              <h3 className="text-[12px] font-semibold text-white/45 mb-1">{item.title}</h3>
                              <p className="text-[11px] text-white/20 leading-[1.8] font-light">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.hasReasons && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                        {whyChooseReasons.map((reason, ri) => (
                          <div key={ri} className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                            <CheckCircle className="w-3.5 h-3.5 text-cyan-400/50 mt-0.5 shrink-0" />
                            <span className="text-[11px] text-white/30 font-light leading-relaxed">{reason.text}</span>
                          </div>
                        ))}
                      </div>
                    )}
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

export default function About() {
  useSEO({
    title: "About Us – Our Story and What Drives Us | Devoria Tech",
    description: "Devoria Tech is a digital agency founded by Zeeshan Ahmad, specializing in building websites, mobile apps, and marketing strategies for businesses worldwide. Learn about our story, values, and vision.",
    keywords: "about Devoria Tech, Zeeshan Ahmad, digital agency team, web development company, app development agency, digital marketing experts, our story, company values, CEO Devoria Tech",
    canonical: "https://devoriatech.com/about",
  });

  const [storyExpanded, setStoryExpanded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".about-fade").forEach((el) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } }
        );
      });

      gsap.utils.toArray<HTMLElement>(".value-card").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, delay: i * 0.08, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" } }
        );
      });

      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item, i) => {
        gsap.fromTo(item,
          { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 88%", toggleActions: "play none none none" } }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-28 pb-16 noise-bg">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">About Us</span>
            <SplitText
              text="About Devoria Tech – Premium Digital Agency for Modern Businesses"
              as="h1"
              className="mt-4 text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight"
              data-testid="text-about-title"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-5 text-sm text-white/30 max-w-lg leading-relaxed font-light"
            >
              Our goal is to help companies build a strong digital presence and grow successfully in the modern online world through innovative technology, powerful marketing strategies, and professional design.
            </motion.p>
          </div>

          <div className="about-fade mb-32">
            <div className="relative rounded-3xl overflow-hidden neon-border">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-cyan-500/5 to-violet-500/5" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

              <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-0 items-center">
                <div className="lg:col-span-2 flex justify-center p-8 lg:p-12">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/30 via-cyan-400/20 to-violet-500/30 rounded-2xl blur-sm" />
                    <div className="relative w-64 h-80 sm:w-72 sm:h-[22rem] lg:w-80 lg:h-[26rem] rounded-2xl overflow-hidden border border-white/10">
                      <img
                        src={ceoPhoto}
                        alt="Zeeshan Ahmad – Founder & CEO of Devoria Tech"
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                        data-testid="img-ceo-photo"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60" />
                    </div>
                    <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                      <Sparkles className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3 p-8 lg:p-12 lg:pl-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 mb-5">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-[0.2em]">Founder & CEO</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-2" data-testid="text-ceo-name">
                    Zeeshan Ahmad
                  </h2>
                  <p className="text-sm text-cyan-400/70 font-medium mb-6">Founder & CEO – Devoria Tech</p>

                  <div className="space-y-4 text-[13px] text-white/40 leading-[1.9] font-light">
                    <p>
                      Zeeshan Ahmad is the Founder and CEO of Devoria Tech, a premium digital agency dedicated to delivering innovative technology and marketing solutions for businesses worldwide. With a strong passion for digital transformation and modern technology, he established Devoria Tech with the vision of helping companies grow and succeed in the digital era.
                    </p>
                    <p>
                      As a technology-driven entrepreneur, Zeeshan Ahmad focuses on combining creativity, strategy, and advanced technology to build powerful digital solutions. Under his leadership, Devoria Tech provides a wide range of services including web development, mobile app development, digital marketing, artificial intelligence solutions, business software development, and creative design services.
                    </p>
                    <p>
                      His goal is to empower businesses with smart digital systems that improve efficiency, strengthen online presence, and support long-term growth. By focusing on innovation and client success, Zeeshan Ahmad continues to guide Devoria Tech toward becoming a trusted global digital partner for startups, entrepreneurs, and enterprises.
                    </p>
                    <p>
                      Through dedication, strategic thinking, and a commitment to quality, he aims to help brands build strong digital foundations and achieve sustainable success in an increasingly competitive digital world.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-8">
                    <a
                      href="mailto:info@devoriatech.com"
                      className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-cyan-400/30 flex items-center justify-center text-white/30 hover:text-cyan-400 transition-all duration-500"
                      data-testid="link-ceo-email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <Link href="/contact">
                      <MagneticButton strength={0.2}>
                        <span className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-semibold text-white cursor-pointer overflow-hidden group" data-testid="button-ceo-contact">
                          <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                          <span className="relative z-10 flex items-center gap-1.5">
                            Get in Touch <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </span>
                      </MagneticButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
            <div className="about-fade">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-5">
                <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-[0.2em]">Our Story</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">How It All Started</h2>
              <div className="space-y-4 text-[13px] text-white/35 leading-[1.8] font-light">
                <p>
                  Founded in 2020 by Zeeshan Ahmad, Devoria Tech started with a simple mission: to bridge the gap between exceptional design and powerful technology. Our team consists of skilled developers, designers, and digital marketing experts who work together to create high-quality digital products.
                </p>
                <div
                  id="story-expanded-content"
                  className="overflow-hidden transition-all duration-500 ease-out space-y-4"
                  style={{ maxHeight: storyExpanded ? "500px" : "0px", opacity: storyExpanded ? 1 : 0 }}
                >
                  <p>
                    Today, we've grown into a full-service digital agency serving clients across the globe. From building responsive websites to launching powerful mobile applications and executing successful marketing campaigns, Devoria Tech focuses on delivering reliable and scalable solutions.
                  </p>
                  <p>
                    We believe that every business deserves access to modern technology and smart digital strategies. That is why we work with startups, small businesses, and established companies across different industries to help them grow online.
                  </p>
                </div>
                <button
                  onClick={() => setStoryExpanded(!storyExpanded)}
                  aria-expanded={storyExpanded}
                  aria-controls="story-expanded-content"
                  className="inline-flex items-center gap-1.5 text-[12px] text-cyan-400/70 hover:text-cyan-400 font-medium transition-colors duration-300 mt-2"
                  data-testid="button-read-more-story"
                >
                  {storyExpanded ? "Read Less" : "Read More"}
                  <ArrowRight className={`w-3 h-3 transition-transform duration-300 ${storyExpanded ? "rotate-[-90deg]" : "rotate-90"}`} />
                </button>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { icon: Globe, value: "10+", label: "Countries" },
                  { icon: Code2, value: "150+", label: "Projects" },
                  { icon: TrendingUp, value: "99%", label: "Satisfaction" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-xl glass-card">
                    <stat.icon className="w-4 h-4 text-cyan-400/50 mx-auto mb-2" />
                    <div className="text-xl font-bold gradient-text-static">{stat.value}</div>
                    <div className="text-[9px] text-white/30 uppercase tracking-widest mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-fade grid grid-cols-2 gap-3">
              {[
                { icon: Target, title: "Our Mission", desc: "To help businesses succeed in the digital world by providing innovative, reliable, and results-driven digital solutions that improve brand visibility and generate growth.", gradient: "from-blue-600/15 to-transparent", color: "text-blue-400" },
                { icon: Eye, title: "Our Vision", desc: "To become a globally trusted digital agency that empowers companies through technology and innovation, making digital success accessible to every business.", gradient: "from-violet-600/15 to-transparent", color: "text-violet-400" },
                { icon: Rocket, title: "Our Goal", desc: "To simplify digital transformation and empower businesses with smart systems that strengthen online presence and support long-term growth.", gradient: "from-cyan-600/15 to-transparent", color: "text-cyan-400" },
                { icon: Award, title: "Excellence", desc: "Quality over quantity in everything we do — every pixel, every strategy, every solution crafted to the highest standards.", gradient: "from-amber-600/15 to-transparent", color: "text-amber-400" },
              ].map((item, i) => (
                <TiltCard key={item.title} className={`rounded-2xl neon-border overflow-hidden ${i === 0 || i === 3 ? "aspect-square" : ""}`}>
                  <div className={`p-6 h-full bg-gradient-to-br ${item.gradient} flex flex-col justify-end`}>
                    <item.icon className={`w-7 h-7 ${item.color} mb-3`} />
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                    <p className="text-[11px] text-white/30 mt-1 leading-relaxed font-light">{item.desc}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>

          <div className="about-fade mb-32 rounded-2xl overflow-hidden neon-border">
            <div className="relative aspect-[21/9]">
              <img loading="lazy" src={aboutOffice} alt="Devoria Tech workspace" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-xs text-white/40 font-light">Where innovation meets execution</p>
              </div>
            </div>
          </div>

          <div className="about-fade mb-32">
            <div className="text-center mb-14">
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Why Us</span>
              <SplitText text="Why Choose Devoria Tech" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
              <p className="mt-5 text-[13px] text-white/30 max-w-xl mx-auto leading-relaxed font-light">
                Businesses choose Devoria Tech because we focus on quality, innovation, and measurable results. Here is what sets us apart.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {whyChooseReasons.map((reason, i) => (
                <div key={i} className="flex items-start gap-3 p-5 rounded-xl glass-card group hover:border-cyan-400/20 transition-all duration-500" data-testid={`reason-${i}`}>
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center shrink-0 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-all duration-500">
                    <reason.icon className="w-4 h-4 text-cyan-400/60" />
                  </div>
                  <p className="text-[12px] text-white/35 leading-relaxed font-light mt-1.5">{reason.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-32">
            <div className="about-fade text-center mb-14">
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Core Values</span>
              <SplitText text="What Drives Us" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {values.map((value, i) => (
                <TiltCard key={value.title} className="value-card rounded-2xl neon-border text-center" data-testid={`card-value-${i}`}>
                  <div className="p-7">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-500/15 flex items-center justify-center mx-auto mb-5">
                      <value.icon className="w-5 h-5 text-cyan-400/70" />
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2 tracking-tight">{value.title}</h3>
                    <p className="text-[12px] text-white/30 leading-relaxed font-light">{value.desc}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>

          <div className="mb-32">
            <div className="about-fade text-center mb-14">
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Journey</span>
              <SplitText text="Our Milestones" as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" />
            </div>
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/30 via-cyan-500/20 to-transparent" />
              {milestones.map((m, i) => (
                <div key={m.year} className={`timeline-item relative flex items-start gap-6 mb-12 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "sm:text-right" : "sm:text-left"} hidden sm:block`}>
                    {i % 2 === 0 && (
                      <div className="p-6 rounded-xl glass-card">
                        <span className="text-lg font-bold gradient-text-static">{m.year}</span>
                        <h4 className="text-white font-semibold mt-1 tracking-tight">{m.title}</h4>
                        <p className="text-[12px] text-white/30 mt-1 font-light">{m.desc}</p>
                      </div>
                    )}
                  </div>
                  <div className="relative z-10 w-3 h-3 rounded-full bg-cyan-400 mt-3 shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.4)] hidden sm:block" />
                  <div className="flex-1 hidden sm:block">
                    {i % 2 !== 0 && (
                      <div className="p-6 rounded-xl glass-card">
                        <span className="text-lg font-bold gradient-text-static">{m.year}</span>
                        <h4 className="text-white font-semibold mt-1 tracking-tight">{m.title}</h4>
                        <p className="text-[12px] text-white/30 mt-1 font-light">{m.desc}</p>
                      </div>
                    )}
                  </div>
                  <div className="sm:hidden pl-10 flex-1">
                    <div className="absolute left-2.5 top-2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]" />
                    <div className="p-6 rounded-xl glass-card">
                      <span className="text-lg font-bold gradient-text-static">{m.year}</span>
                      <h4 className="text-white font-semibold mt-1 tracking-tight">{m.title}</h4>
                      <p className="text-[12px] text-white/30 mt-1 font-light">{m.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <SEOAboutContent />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SplitText text="Ready to Build Something Great?" as="h2" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" />
          <p className="text-sm text-white/30 max-w-md mx-auto mb-8 font-light">
            Let's work together to bring your digital vision to life. Get in touch for a free consultation.
          </p>
          <Link href="/contact">
            <MagneticButton strength={0.25} data-testid="button-cta-contact">
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
      </section>
    </div>
  );
}
