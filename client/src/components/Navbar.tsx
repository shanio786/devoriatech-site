import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import gsap from "gsap";
import MagneticButton from "./MagneticButton";
import logoImg from "@assets/devoria-logo.webp";

const services = [
  {
    title: "Digital Marketing",
    href: "/services/digital-marketing",
    items: [
      { label: "SEO (On-Page, Off-Page, Technical)", href: "/services/digital-marketing/seo" },
      { label: "Paid Advertising (Meta, Google, YouTube)", href: "/services/digital-marketing/paid-advertising" },
      { label: "Content Strategy & Analytics", href: "/services/digital-marketing/content-strategy" },
    ],
  },
  {
    title: "Social Media",
    href: "/services/social-media",
    items: [
      { label: "Platform Management & Growth", href: "/services/social-media/platform-management" },
      { label: "Content Creation & Scheduling", href: "/services/social-media/content-creation" },
      { label: "Community Engagement", href: "/services/social-media/community-engagement" },
    ],
  },
  {
    title: "Web Development",
    href: "/services/web-development",
    items: [
      { label: "WordPress & Shopify", href: "/services/web-development/wordpress-shopify" },
      { label: "Custom Apps (React, Next.js)", href: "/services/web-development/custom-apps" },
      { label: "E-Commerce Solutions", href: "/services/web-development/ecommerce-solutions" },
    ],
  },
  {
    title: "App Development",
    href: "/services/app-development",
    items: [
      { label: "Android & iOS Apps", href: "/services/app-development/android-ios" },
      { label: "Hybrid Apps (React Native & Flutter)", href: "/services/app-development/hybrid-apps" },
    ],
  },
  {
    title: "Design & Video",
    href: "/services/design-video",
    items: [
      { label: "Logo & Branding", href: "/services/design-video/logo-branding" },
      { label: "Motion Graphics", href: "/services/design-video/motion-graphics" },
      { label: "Video Editing", href: "/services/design-video/video-editing" },
    ],
  },
  {
    title: "Business Software Solutions",
    href: "/services/business-software",
    items: [
      { label: "Desktop Software Development", href: "/services/business-software/desktop-software" },
      { label: "SaaS Application Development", href: "/services/business-software/saas-application" },
      { label: "Custom Business Software", href: "/services/business-software/custom-business-software" },
    ],
  },
  {
    title: "AI Services / AI Solutions",
    href: "/services/ai-services",
    items: [
      { label: "AI Influencer Creation", href: "/services/ai-services/ai-influencer" },
      { label: "AI Model Photoshoot", href: "/services/ai-services/ai-model-photoshoot" },
      { label: "AI Chatbot Development", href: "/services/ai-services/ai-chatbot" },
      { label: "AI Content Creation", href: "/services/ai-services/ai-content-creation" },
      { label: "AI Automation Solutions", href: "/services/ai-services/ai-automation" },
    ],
  },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", hasDropdown: true },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
  const [location] = useLocation();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
    setMobileExpandedCat(null);
  }, [location]);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass py-2" : "bg-transparent py-4"
        }`}
        data-testid="navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" data-testid="link-home-logo">
              <MagneticButton strength={0.15}>
                <img src={logoImg} alt="Devoria Tech" className="h-12 lg:h-14 w-auto" />
              </MagneticButton>
            </Link>

            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setServicesOpen(true)}
                  onMouseLeave={() => link.hasDropdown && setServicesOpen(false)}
                >
                  <Link href={link.href}>
                    <MagneticButton strength={0.15}>
                      <span
                        className={`relative px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 cursor-pointer flex items-center gap-1 ${
                          location === link.href
                            ? "text-white"
                            : "text-white/50 hover:text-white"
                        }`}
                        data-testid={`link-nav-${link.label.toLowerCase()}`}
                      >
                        {link.label}
                        {link.hasDropdown && (
                          <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
                        )}
                        {location === link.href && (
                          <motion.div
                            layoutId="nav-indicator"
                            className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/[0.08]"
                            style={{ zIndex: -1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                      </span>
                    </MagneticButton>
                  </Link>

                  {link.hasDropdown && (
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 15, scale: 0.96 }}
                          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                        >
                          <div className="rounded-2xl p-5 w-[780px] max-h-[75vh] overflow-y-auto grid grid-cols-3 gap-4 shadow-2xl" style={{ background: 'rgba(10, 15, 30, 0.95)', backdropFilter: 'blur(24px) saturate(1.5)', WebkitBackdropFilter: 'blur(24px) saturate(1.5)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            {services.map((service) => (
                              <div key={service.title} className="space-y-1.5">
                                <h4 className="text-[11px] font-semibold text-white tracking-wide flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shrink-0" />
                                  {service.href ? (
                                    <Link href={service.href}>
                                      <span className="hover:text-cyan-300 transition-colors cursor-pointer" data-testid={`link-service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                                        {service.title}
                                      </span>
                                    </Link>
                                  ) : service.title}
                                </h4>
                                <ul className="space-y-1">
                                  {service.items.map((item) => (
                                    <li
                                      key={item.label}
                                      className="pl-3.5 leading-relaxed"
                                    >
                                      {item.href ? (
                                        <Link href={item.href}>
                                          <span className="text-[10px] text-cyan-400/60 hover:text-cyan-300 transition-colors cursor-pointer font-medium" data-testid={`link-service-item-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                                            {item.label}
                                          </span>
                                        </Link>
                                      ) : (
                                        <span className="text-[10px] text-white/35 hover:text-white/70 transition-colors cursor-pointer">
                                          {item.label}
                                        </span>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                            <div className="col-span-3 pt-3 border-t border-white/5">
                              <Link href="/services">
                                <span className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer font-medium" data-testid="link-view-all-services">
                                  View All Services <ArrowRight className="w-3 h-3" />
                                </span>
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden lg:block">
              <Link href="/contact">
                <MagneticButton strength={0.2} data-testid="button-start-project">
                  <span className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold text-white cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Project
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </span>
                </MagneticButton>
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-white"
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[#060a14]/98 backdrop-blur-2xl lg:hidden"
            data-testid="mobile-menu"
          >
            <div className="pt-24 px-6 space-y-1 max-h-[calc(100vh-6rem)] overflow-y-auto pb-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                >
                  {link.hasDropdown ? (
                    <div>
                      <div className={`flex items-center justify-between w-full px-4 py-4 ${
                        mobileServicesOpen ? "text-white" : "text-white/30"
                      }`}>
                        <Link href="/services">
                          <span
                            onClick={() => setMobileOpen(false)}
                            className="text-2xl font-medium hover:text-cyan-400 transition-colors cursor-pointer"
                            data-testid="link-mobile-services-page"
                          >
                            {link.label}
                          </span>
                        </Link>
                        <button
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className="p-2 -mr-2"
                          data-testid="button-mobile-services"
                          aria-label="Toggle services menu"
                        >
                          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                        </button>
                      </div>
                      <div
                        className="overflow-hidden transition-all duration-500 ease-out"
                        style={{ maxHeight: mobileServicesOpen ? "5000px" : "0px", opacity: mobileServicesOpen ? 1 : 0 }}
                      >
                        <div className="pl-4 pb-2 space-y-1">
                          {services.map((service) => {
                            const isCatOpen = mobileExpandedCat === service.title;
                            return (
                              <div key={service.title}>
                                <div className="flex items-center justify-between w-full px-4 py-2.5">
                                  <span className="flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-cyan-400/50" />
                                    {service.href ? (
                                      <Link href={service.href}>
                                        <span className="text-sm font-semibold text-cyan-400/70 hover:text-cyan-300 transition-colors cursor-pointer" data-testid={`link-mobile-cat-${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                                          {service.title}
                                        </span>
                                      </Link>
                                    ) : (
                                      <span className="text-sm font-semibold text-white/50">{service.title}</span>
                                    )}
                                  </span>
                                  <button
                                    onClick={() => setMobileExpandedCat(isCatOpen ? null : service.title)}
                                    className="p-1.5 -mr-1.5"
                                    data-testid={`button-mobile-cat-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                                    aria-label={`Expand ${service.title}`}
                                  >
                                    <ChevronDown className={`w-3.5 h-3.5 text-white/30 transition-transform duration-300 ${isCatOpen ? "rotate-180" : ""}`} />
                                  </button>
                                </div>
                                <div
                                  className="overflow-hidden transition-all duration-400 ease-out"
                                  style={{ maxHeight: isCatOpen ? "2000px" : "0px", opacity: isCatOpen ? 1 : 0 }}
                                >
                                  <div className="pl-7 pb-2 space-y-0.5">
                                    {service.items.map((item) => (
                                      <div key={item.label}>
                                        {item.href ? (
                                          <Link href={item.href}>
                                            <span className="block px-3 py-2 text-[12px] text-cyan-400/50 hover:text-cyan-300 transition-colors cursor-pointer font-medium">
                                              {item.label}
                                            </span>
                                          </Link>
                                        ) : (
                                          <span className="block px-3 py-2 text-[12px] text-white/25 hover:text-white/50 transition-colors cursor-pointer">
                                            {item.label}
                                          </span>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          <div className="px-4 pt-2">
                            <Link href="/services">
                              <span className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer font-medium">
                                View All Services <ArrowRight className="w-3 h-3" />
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link href={link.href}>
                      <span
                        className={`block px-4 py-4 text-2xl font-medium transition-all cursor-pointer ${
                          location === link.href
                            ? "text-white"
                            : "text-white/30 hover:text-white/70"
                        }`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-8"
              >
                <Link href="/contact">
                  <span className="block text-center px-6 py-4 rounded-2xl text-base font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white cursor-pointer">
                    Start Project
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
