import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

export default function NotFound() {
  useSEO({
    title: "Page Not Found – 404 | Devoria Tech",
    description: "The page you are looking for does not exist or has been moved. Browse our services or return to the homepage.",
    keywords: "404, page not found, Devoria Tech",
    canonical: "https://devoriatech.com/404",
  });

  return (
    <div className="min-h-screen flex items-center justify-center noise-bg pt-20 pb-16" data-testid="page-not-found">
      <div className="text-center max-w-lg mx-auto px-4">
        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400" data-testid="text-404-label">Error 404</span>
        <h1 className="mt-4 text-6xl sm:text-8xl font-bold text-white tracking-tight" data-testid="text-404-heading">
          4<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">0</span>4
        </h1>
        <p className="mt-4 text-sm text-white/30 leading-relaxed font-light" data-testid="text-404-description">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/">
            <MagneticButton strength={0.2}>
              <span className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-semibold text-white cursor-pointer overflow-hidden group" data-testid="link-404-home">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                <span className="relative z-10 flex items-center gap-2">
                  Back to Home
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </span>
            </MagneticButton>
          </Link>
          <Link href="/services">
            <span className="text-[13px] text-white/40 hover:text-white/70 transition-colors cursor-pointer font-medium" data-testid="link-404-services">
              View Services
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
