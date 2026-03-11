import { Link } from "wouter";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { WhatsAppIcon, FacebookIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from "./SocialIcons";
import MagneticButton from "./MagneticButton";
import logoImg from "@assets/devoria-logo.webp";

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Web Development", href: "/services" },
      { label: "App Development", href: "/services" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      { label: "Graphic Design", href: "/services" },
    ],
  },
];

const socials = [
  { icon: WhatsAppIcon, label: "WhatsApp", href: "https://wa.me/923117597815" },
  { icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/devoriatech/" },
  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/devoriatech/" },
  { icon: LinkedInIcon, label: "LinkedIn", href: "https://www.linkedin.com/company/devoria-tech" },
  { icon: YouTubeIcon, label: "YouTube", href: "https://youtube.com/@devoriatech" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.04]" data-testid="footer">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/">
              <img src={logoImg} alt="Devoria Tech" className="h-14 w-auto mb-4 cursor-pointer" />
            </Link>
            <p className="text-[13px] text-white/25 max-w-sm leading-relaxed font-light">
              Premium digital agency specializing in web development, app development, digital marketing, and creative design solutions.
            </p>
            <div className="flex gap-2 mt-6">
              {socials.map((social) => (
                <MagneticButton key={social.label} strength={0.3}>
                  <a
                    href={social.href}
                    target={social.href !== "#" ? "_blank" : undefined}
                    rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                    className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.05] hover:border-cyan-400/20 flex items-center justify-center text-white/20 hover:text-white/60 transition-all duration-500"
                    data-testid={`link-footer-social-${social.label.toLowerCase()}`}
                  >
                    <social.icon className="w-3.5 h-3.5" />
                  </a>
                </MagneticButton>
              ))}
            </div>
            <div className="mt-5 space-y-2">
              <a href="mailto:info@devoriatech.com" className="flex items-center gap-2 text-[12px] text-white/20 hover:text-white/50 transition-colors font-light" data-testid="link-footer-email">
                <Mail className="w-3.5 h-3.5" /> info@devoriatech.com
              </a>
              <a href="https://wa.me/923117597815" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[12px] text-white/20 hover:text-white/50 transition-colors font-light" data-testid="link-footer-phone">
                <Phone className="w-3.5 h-3.5" /> +92 311 7597815
              </a>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-[11px] font-semibold text-white/50 uppercase tracking-[0.2em] mb-4">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <span className="text-[13px] text-white/20 hover:text-white/50 transition-colors cursor-pointer font-light flex items-center gap-1 group">
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/15 font-light">
            &copy; {new Date().getFullYear()} Devoria Tech. All rights reserved.
          </p>
          <MagneticButton strength={0.2}>
            <button
              onClick={scrollToTop}
              className="text-[10px] text-white/20 hover:text-white/40 uppercase tracking-widest font-medium transition-colors flex items-center gap-1.5"
              data-testid="button-back-to-top"
            >
              Back to Top
              <span className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center">
                <span className="block w-0 h-0 border-l-[3px] border-r-[3px] border-b-[4px] border-transparent border-b-white/30" />
              </span>
            </button>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
