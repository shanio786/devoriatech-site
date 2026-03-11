import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSEO } from "@/hooks/use-seo";
import SplitText from "@/components/SplitText";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import blogWebsiteHero from "@assets/blog-website-hero.webp";
import blogWebsiteSeo from "@assets/blog-website-seo.webp";
import blogWebsiteMobile from "@assets/blog-website-mobile.webp";

gsap.registerPlugin(ScrollTrigger);

const relatedPosts = [
  {
    title: "What is Digital Marketing and Why It Is Important for Businesses",
    category: "Digital Marketing",
    href: "/blog/what-is-digital-marketing-why-important-for-businesses",
  },
  {
    title: "How Artificial Intelligence Is Transforming Modern Businesses",
    category: "AI & Technology",
    href: "/blog/how-artificial-intelligence-transforming-modern-businesses",
  },
  {
    title: "Top Benefits of Social Media Marketing for Small Businesses",
    category: "Social Media",
    href: "/blog/top-benefits-social-media-marketing-small-businesses",
  },
];

export default function BlogPost1() {
  useSEO({
    title: "Why Every Business Needs a Professional Website in 2026 | Devoria Tech",
    description: "Discover why having a professional website is essential for businesses in 2026. Learn how a modern website builds trust, attracts customers, and improves marketing results.",
    keywords: "professional website, business website 2026, website importance, web development, SEO website, mobile-friendly website, Devoria Tech",
    canonical: "https://devoriatech.com/blog/why-every-business-needs-professional-website-2026",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".bp1-fade").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

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
                Web Development
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-white/30" data-testid="text-date">
                <Calendar className="w-3 h-3" />
                March 8, 2026
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-white/30" data-testid="text-read-time">
                <Clock className="w-3 h-3" />
                8 min read
              </span>
            </div>

            <SplitText
              text="Why Every Business Needs a Professional Website in 2026"
              as="h1"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
              data-testid="text-blog-post-title"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-6 text-[14px] text-white/40 leading-[2] font-light max-w-2xl"
            >
              In the modern digital world, having a professional website is no longer optional for businesses. Discover why a well-designed website is essential for credibility, growth, and success.
            </motion.p>
          </div>

          <div className="bp1-fade mb-14 rounded-2xl overflow-hidden neon-border">
            <div className="relative aspect-[16/9]">
              <img
                src={blogWebsiteHero}
                alt="Professional business website design in 2026"
                className="w-full h-full object-cover"
                data-testid="img-hero"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40" />
            </div>
          </div>

          <div className="space-y-12">
            <section className="bp1-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">Introduction</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  In the modern digital world, having a professional website is no longer optional for businesses. Whether you run a small startup, a local company, or a large enterprise, your website plays a crucial role in how customers perceive your brand. A well-designed website helps businesses establish credibility, attract new customers, and grow their presence online.
                </p>
                <p>
                  Today, most people search for products and services online before making purchasing decisions. If a business does not have a professional website, potential customers may lose trust or choose competitors instead. A website serves as a digital storefront that allows businesses to showcase their products, services, and brand identity to a global audience.
                </p>
                <p>
                  In 2026, businesses must focus on creating strong online experiences. A professional website helps companies communicate their value, connect with customers, and compete effectively in the digital marketplace.
                </p>
              </div>
            </section>

            <section className="bp1-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">The Importance of Having a Business Website</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  A professional website offers several advantages that help businesses grow and remain competitive.
                </p>
                <p>
                  First, it allows companies to establish a strong online presence. Customers often search online before making decisions, and businesses with websites appear more credible and trustworthy.
                </p>
                <p>
                  Second, a website provides a platform where businesses can present detailed information about their services. Customers can easily learn about products, pricing, contact information, and company values.
                </p>
                <p>
                  Third, websites help businesses reach customers beyond their local area. With the help of search engine optimization (SEO), companies can attract visitors from different cities and countries.
                </p>
              </div>
            </section>

            <section className="bp1-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">Building Trust and Credibility</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  One of the biggest benefits of having a professional website is building trust with customers. When people search for a business online, the first thing they often check is the company's website.
                </p>
                <p>
                  A modern and well-designed website creates a positive first impression. It shows that the business is serious about its brand and customer experience. On the other hand, businesses without websites may appear outdated or unreliable.
                </p>
                <p>Professional websites include elements such as:</p>
                <ul className="list-none space-y-2 pl-4">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Clear branding and logo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Detailed service descriptions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Client testimonials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Professional design layout</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Secure browsing experience</span>
                  </li>
                </ul>
                <p>These features help customers feel confident about choosing the business.</p>
              </div>
            </section>

            <section className="bp1-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">Websites Help Businesses Reach a Global Audience</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Unlike traditional physical stores, websites allow businesses to reach customers worldwide. With a professional website, companies can promote their products and services to a global audience.
                </p>
                <p>
                  This is especially important for businesses that offer digital services, online products, or remote solutions. A website allows potential customers from different countries to discover the brand and learn more about what it offers.
                </p>
                <p>
                  With the help of SEO strategies, businesses can improve their website visibility on search engines like Google. When a website ranks higher in search results, it attracts more visitors and potential clients.
                </p>
              </div>
            </section>

            <div className="bp1-fade rounded-2xl overflow-hidden neon-border">
              <div className="relative aspect-[16/9]">
                <img
                  src={blogWebsiteSeo}
                  alt="SEO optimization for business websites"
                  className="w-full h-full object-cover"
                  data-testid="img-seo"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40" />
              </div>
              <div className="p-4">
                <p className="text-[11px] text-white/25 font-light text-center">SEO-friendly websites help businesses attract organic traffic and rank higher in search results</p>
              </div>
            </div>

            <section className="bp1-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">Websites Improve Digital Marketing Results</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Digital marketing strategies work best when businesses have a strong website. Marketing channels such as social media, SEO, email marketing, and paid advertising often direct traffic to a website.
                </p>
                <p>For example:</p>
                <p>
                  Social media campaigns often include links that guide users to a company website.
                </p>
                <p>
                  Search engine optimization helps websites appear in search results when users look for related services.
                </p>
                <p>
                  Paid advertising campaigns drive targeted traffic to landing pages where customers can learn more about the business.
                </p>
                <p>
                  Without a website, businesses lose many opportunities to convert visitors into customers.
                </p>
              </div>
            </section>

            <section className="bp1-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">A Website Works as a 24/7 Marketing Tool</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Another major advantage of having a website is that it works continuously without limitations. Unlike physical stores with operating hours, a website is available to customers 24 hours a day.
                </p>
                <p>
                  This means potential customers can explore services, read information, and contact the business at any time.
                </p>
                <p>A website can include features such as:</p>
                <ul className="list-none space-y-2 pl-4">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Contact forms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Live chat support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Service pages</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Product catalogs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Online booking systems</span>
                  </li>
                </ul>
                <p>These tools help businesses generate leads even when they are not actively working.</p>
              </div>
            </section>

            <section className="bp1-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">Improving Customer Experience</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Customer experience is one of the most important factors in business success. A professional website allows businesses to provide helpful information and guide customers through their decision-making process.
                </p>
                <p>For example, customers can easily:</p>
                <ul className="list-none space-y-2 pl-4">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Explore services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Read blog articles</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Compare product features</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Contact the business directly</span>
                  </li>
                </ul>
                <p>
                  When websites are designed with user-friendly navigation and fast loading speeds, visitors are more likely to stay longer and explore more content.
                </p>
              </div>
            </section>

            <section className="bp1-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">Mobile-Friendly Websites Are Essential</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Today, most internet users browse websites using mobile devices. Smartphones and tablets account for a large percentage of website traffic.
                </p>
                <p>
                  Businesses must ensure their websites are mobile-friendly and responsive. A responsive website adjusts automatically to different screen sizes, providing a smooth experience for users on any device.
                </p>
                <p>
                  Mobile optimization improves user experience and also helps websites rank better in search engine results.
                </p>
              </div>
            </section>

            <div className="bp1-fade rounded-2xl overflow-hidden neon-border">
              <div className="relative aspect-[16/9]">
                <img
                  src={blogWebsiteMobile}
                  alt="Mobile-friendly responsive website design"
                  className="w-full h-full object-cover"
                  data-testid="img-mobile"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40" />
              </div>
              <div className="p-4">
                <p className="text-[11px] text-white/25 font-light text-center">Mobile-friendly websites provide a smooth experience across all devices and screen sizes</p>
              </div>
            </div>

            <section className="bp1-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">SEO Benefits of Having a Website</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Search engine optimization plays a major role in attracting organic traffic. When businesses create SEO-friendly websites, they increase their chances of appearing in search results.
                </p>
                <p>
                  SEO involves optimizing website content, structure, and technical performance so search engines can understand and rank the site.
                </p>
                <p>Some important SEO factors include:</p>
                <ul className="list-none space-y-2 pl-4">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Keyword optimization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Fast website loading speed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>High-quality content</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Secure HTTPS connections</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Mobile-friendly design</span>
                  </li>
                </ul>
                <p>
                  Businesses that invest in SEO-friendly websites often receive consistent traffic from search engines.
                </p>
              </div>
            </section>

            <section className="bp1-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">Competitive Advantage in the Digital Market</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  In competitive industries, businesses must use every available tool to stand out. A professional website provides a strong competitive advantage.
                </p>
                <p>
                  Companies with well-designed websites can showcase their expertise, display portfolios, and share client success stories.
                </p>
                <p>
                  This makes it easier for potential customers to understand why they should choose that business instead of competitors.
                </p>
                <p>
                  Businesses without websites often struggle to compete with companies that have strong online presence.
                </p>
              </div>
            </section>

            <section className="bp1-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">Future of Business Websites</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  As technology continues to evolve, websites will become even more important for business growth. Modern websites now include advanced features such as artificial intelligence chatbots, automation systems, and interactive user experiences.
                </p>
                <p>
                  Businesses that invest in modern websites today will be better prepared for future digital trends.
                </p>
                <p>
                  Websites will continue to play a central role in marketing, communication, and customer engagement.
                </p>
              </div>
            </section>

            <section className="bp1-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">Conclusion</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  A professional website is one of the most important tools for businesses in the digital era. It helps companies build credibility, reach global audiences, and support marketing strategies.
                </p>
                <p>
                  Businesses that invest in modern websites gain a strong competitive advantage and create better experiences for their customers.
                </p>
                <p>
                  In 2026 and beyond, having a professional website will remain essential for businesses that want to grow, attract customers, and succeed in the digital marketplace.
                </p>
              </div>
            </section>

            <div className="bp1-fade mt-16 pt-12 border-t border-white/[0.06]">
              <h3 className="text-lg font-semibold text-white mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPosts.map((post, i) => (
                  <Link key={i} href={post.href}>
                    <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-400/20 transition-all duration-500 cursor-pointer group" data-testid={`link-related-post-${i}`}>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400/70 font-medium tracking-wider uppercase">
                        {post.category}
                      </span>
                      <h4 className="mt-3 text-[13px] font-semibold text-white/70 group-hover:text-white transition-colors duration-300 leading-snug">
                        {post.title}
                      </h4>
                      <span className="mt-3 inline-flex items-center gap-1 text-[11px] text-cyan-400/60 font-medium">
                        Read More <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bp1-fade mt-12 p-8 rounded-2xl bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-violet-500/10 border border-white/[0.06] text-center">
              <h3 className="text-xl font-bold text-white mb-3">Need a Professional Website?</h3>
              <p className="text-[13px] text-white/40 font-light mb-6 max-w-lg mx-auto leading-relaxed">
                Devoria Tech builds modern, SEO-friendly, and responsive websites that help businesses grow online. Let us create a website that represents your brand.
              </p>
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-[13px] font-semibold text-white cursor-pointer" data-testid="button-cta-contact">
                  Get Started <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}