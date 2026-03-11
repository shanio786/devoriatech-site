import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSEO } from "@/hooks/use-seo";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import type { BlogPost } from "@shared/schema";

gsap.registerPlugin(ScrollTrigger);

export default function BlogPostDynamic() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, isError } = useQuery<BlogPost>({
    queryKey: ["/api/blogs", slug],
    queryFn: () => fetch(`/api/blogs/${slug}`).then(r => {
      if (!r.ok) throw new Error("Not found");
      return r.json();
    }),
  });

  useSEO({
    title: post?.metaTitle || (post ? `${post.title} | Devoria Tech` : "Blog | Devoria Tech"),
    description: post?.metaDescription || post?.excerpt || "Read the latest insights from Devoria Tech.",
    keywords: post?.metaKeywords || undefined,
    canonical: post ? `https://devoriatech.com/blog/${post.slug}` : undefined,
  });

  useEffect(() => {
    if (!post) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".blog-fade").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          }
        );
      });
    });
    return () => ctx.revert();
  }, [post]);

  if (isLoading) {
    return (
      <div className="pt-28 pb-16 noise-bg min-h-screen flex items-center justify-center">
        <div className="flex gap-2">
          {[0, 150, 300].map((d) => (
            <div key={d} className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: `${d}ms` }} />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="pt-28 pb-16 noise-bg min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-3">Post Not Found</h1>
          <p className="text-white/40 mb-6">This blog post doesn't exist or has been removed.</p>
          <Link href="/blog">
            <a className="text-cyan-400 hover:underline">← Back to Blog</a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16 noise-bg">
      <article className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 text-[12px] text-white/40 hover:text-cyan-400 transition-colors duration-300 mb-8 cursor-pointer" data-testid="link-back-blog">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Blog
            </span>
          </Link>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-[10px] px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400/80 font-medium tracking-wider uppercase" data-testid="badge-category">
                <Tag className="w-3 h-3" />
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-white/30" data-testid="text-date">
                <Calendar className="w-3 h-3" />
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-white/30" data-testid="text-read-time">
                <Clock className="w-3 h-3" />
                {Math.ceil(post.content.replace(/<[^>]+>/g, "").split(" ").length / 200)} min read
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6"
              data-testid="text-blog-title"
            >
              {post.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg text-white/50 leading-relaxed"
            >
              {post.excerpt}
            </motion.p>
          </div>

          {post.heroImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12 rounded-2xl overflow-hidden"
            >
              <img
                src={post.heroImage}
                alt={post.title}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                data-testid="img-hero"
              />
            </motion.div>
          )}

          <div
            className="blog-fade prose prose-invert prose-lg max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-white/65 prose-p:leading-relaxed prose-p:mb-5
              prose-ul:text-white/65 prose-li:mb-2
              prose-strong:text-white prose-em:text-cyan-400/80
              prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
            data-testid="content-blog-body"
          />
        </div>
      </article>
    </div>
  );
}
