import { useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight, ArrowRight, Calendar } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSEO } from "@/hooks/use-seo";
import SplitText from "@/components/SplitText";
import MagneticButton from "@/components/MagneticButton";
import type { BlogPost } from "@shared/schema";

gsap.registerPlugin(ScrollTrigger);

function readTime(content: string) {
  const words = content.replace(/<[^>]+>/g, "").split(" ").length;
  return `${Math.ceil(words / 200)} min read`;
}

export default function Blog() {
  useSEO({
    title: "Blog – Tips on Web Development, SEO & Digital Marketing | Devoria Tech",
    description: "Helpful articles on web development, SEO, digital marketing, AI, and business growth. Written by our team to help you make better decisions online.",
    keywords: "web development blog, SEO tips, digital marketing articles, AI business, social media marketing, tech blog, Devoria Tech blog",
    canonical: "https://devoriatech.com/blog",
  });

  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blogs"],
  });

  useEffect(() => {
    if (isLoading) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".blog-fade").forEach((el, i) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: i * 0.06, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" } }
        );
      });
    });
    return () => ctx.revert();
  }, [isLoading]);

  return (
    <div className="pt-28 pb-16 noise-bg">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Blog</span>
            <SplitText
              text="Insights & Articles"
              as="h1"
              className="mt-4 text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight"
              data-testid="text-blog-title"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-5 text-sm text-white/30 max-w-lg leading-relaxed font-light"
            >
              Stay updated with the latest trends, tips, and strategies in web development, digital marketing, AI, and business growth.
            </motion.p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-32">
              <div className="flex gap-2">
                {[0, 150, 300].map((d) => (
                  <div key={d} className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: `${d}ms` }} />
                ))}
              </div>
            </div>
          ) : (
            <>
              {blogPosts[0] && (
                <Link href={`/blog/${blogPosts[0].slug}`}>
                  <div className="blog-fade mb-10 rounded-2xl neon-border overflow-hidden cursor-pointer group" data-testid="card-blog-featured">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                        {blogPosts[0].heroImage ? (
                          <img
                            src={blogPosts[0].heroImage}
                            alt={blogPosts[0].title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-cyan-500/20" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0F172A]/80 hidden lg:block" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent lg:hidden" />
                        <div className="absolute top-4 left-4">
                          <span className="text-[9px] px-3 py-1.5 rounded-full bg-cyan-400/15 backdrop-blur-md text-cyan-400 font-semibold uppercase tracking-wider border border-cyan-400/20">
                            Featured
                          </span>
                        </div>
                        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                          <ArrowUpRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="p-8 sm:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-[10px] px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-medium tracking-wider uppercase border border-blue-500/20">
                            {blogPosts[0].category}
                          </span>
                          <span className="text-[10px] text-white/20 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {readTime(blogPosts[0].content)}
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4 group-hover:text-cyan-300 transition-colors duration-500 leading-tight">
                          {blogPosts[0].title}
                        </h2>
                        <p className="text-[13px] text-white/30 leading-relaxed font-light mb-5">{blogPosts[0].excerpt}</p>
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] text-white/20 flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            {blogPosts[0].publishedAt ? new Date(blogPosts[0].publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
                          </span>
                        </div>
                        <div className="mt-5">
                          <span className="text-[12px] text-cyan-400/70 font-medium flex items-center gap-1.5 group-hover:text-cyan-400 transition-colors">
                            Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {blogPosts.slice(1).map((post, i) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <div
                      className="blog-fade rounded-2xl neon-border overflow-hidden cursor-pointer group h-full"
                      data-testid={`card-blog-${i + 1}`}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {post.heroImage ? (
                          <img
                            src={post.heroImage}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-500/10" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/30 to-transparent" />
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                          <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[9px] px-2.5 py-0.5 rounded-full bg-cyan-400/8 text-cyan-400/70 font-medium tracking-wider uppercase">
                            {post.category}
                          </span>
                          <span className="text-[10px] text-white/20 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {readTime(post.content)}
                          </span>
                        </div>
                        <h3 className="text-[15px] font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-500 line-clamp-2 tracking-tight leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-[12px] text-white/25 line-clamp-2 font-light leading-relaxed">{post.excerpt}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-[10px] text-white/20 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                          </span>
                          <span className="text-[11px] text-cyan-400/60 font-medium flex items-center gap-1 group-hover:text-cyan-400 transition-colors">
                            Read <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          <div className="mt-24 blog-fade">
            <div className="relative rounded-3xl overflow-hidden neon-border">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-500/5 to-violet-500/10" />
              <div className="relative text-center py-14 sm:py-18 px-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
                  Want to Learn More?
                </h2>
                <p className="text-[13px] text-white/30 max-w-md mx-auto mb-6 font-light leading-relaxed">
                  Explore our services and discover how Devoria Tech can help your business grow online.
                </p>
                <Link href="/services">
                  <MagneticButton strength={0.25} data-testid="button-blog-services">
                    <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                      <span className="relative z-10 flex items-center gap-2">
                        Explore Services <ArrowRight className="w-4 h-4" />
                      </span>
                    </span>
                  </MagneticButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
