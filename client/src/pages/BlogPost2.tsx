import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSEO } from "@/hooks/use-seo";
import SplitText from "@/components/SplitText";
import MagneticButton from "@/components/MagneticButton";
import { ArrowRight, ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import heroImg from "@assets/blog-digital-marketing-hero.webp";
import socialImg from "@assets/blog-digital-marketing-social.webp";
import emailImg from "@assets/blog-digital-marketing-email.webp";

gsap.registerPlugin(ScrollTrigger);

const relatedPosts = [
  {
    title: "Why Every Business Needs a Professional Website in 2026",
    category: "Web Development",
    href: "/blog/why-every-business-needs-professional-website-2026",
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

export default function BlogPost2() {
  useSEO({
    title: "What is Digital Marketing and Why It Is Important for Businesses | Devoria Tech",
    description: "Learn what digital marketing is and why it is essential for business growth. Explore SEO, social media marketing, content marketing, PPC, and email marketing strategies.",
    keywords: "digital marketing, SEO, social media marketing, content marketing, PPC, email marketing, online marketing, digital marketing strategies, business growth",
    canonical: "https://devoriatech.com/blog/what-is-digital-marketing-why-important-for-businesses",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".bp2-fade").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-28 pb-16 noise-bg">
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/blog">
              <span className="inline-flex items-center gap-1.5 text-[12px] text-cyan-400/70 hover:text-cyan-400 font-medium transition-colors duration-300 cursor-pointer" data-testid="link-back-to-blog">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Blog
              </span>
            </Link>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 flex-wrap mb-6">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.15em] uppercase text-cyan-400" data-testid="text-category">
                <Tag className="w-3 h-3" />
                Digital Marketing
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-white/30 font-light" data-testid="text-date">
                <Calendar className="w-3 h-3" />
                March 5, 2026
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-white/30 font-light" data-testid="text-read-time">
                <Clock className="w-3 h-3" />
                10 min read
              </span>
            </div>

            <SplitText
              text="What is Digital Marketing and Why It Is Important for Businesses"
              as="h1"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
              data-testid="text-blog-title"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-5 text-[14px] text-white/40 max-w-2xl leading-[2] font-light"
            >
              Learn what digital marketing is and why it is essential for business growth. Explore SEO, social media marketing, content marketing, PPC, and email marketing strategies.
            </motion.p>
          </div>

          <div className="bp2-fade mb-16 rounded-2xl overflow-hidden neon-border">
            <div className="relative aspect-[16/9]">
              <img
                src={heroImg}
                alt="Digital marketing strategies for business growth"
                className="w-full h-full object-cover"
                loading="eager"
                data-testid="img-hero"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            </div>
          </div>

          <article className="space-y-12">
            <div className="bp2-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight" data-testid="heading-introduction">Introduction</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  In today's technology-driven world, businesses must adapt to digital platforms in order to remain competitive. One of the most effective ways to reach customers online is through digital marketing. Digital marketing refers to promoting products or services using online channels such as search engines, social media platforms, websites, email campaigns, and online advertisements.
                </p>
                <p>
                  Unlike traditional marketing methods such as print ads or billboards, digital marketing allows businesses to connect with their target audience more efficiently. Companies can track performance, analyze customer behavior, and adjust marketing strategies in real time.
                </p>
                <p>
                  Digital marketing has become an essential strategy for businesses of all sizes. Whether it is a small startup or a large corporation, companies use digital marketing to increase brand awareness, generate leads, and improve sales.
                </p>
              </div>
            </div>

            <div className="bp2-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight" data-testid="heading-understanding">Understanding Digital Marketing</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Digital marketing involves using digital technologies and online platforms to promote businesses, products, or services. It focuses on reaching customers through the internet and engaging them with valuable content and marketing messages.
                </p>
                <p>
                  Businesses use various digital channels to connect with customers, including:
                </p>
                <ul className="space-y-2 pl-6">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Search engines such as Google</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Social media platforms like Facebook and Instagram</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Websites and blogs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Email marketing campaigns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Online advertising networks</span>
                  </li>
                </ul>
                <p>
                  These platforms allow businesses to communicate directly with their audience and create personalized marketing experiences.
                </p>
                <p>
                  Digital marketing is not only about advertising. It also includes building relationships with customers, providing useful information, and creating meaningful interactions that encourage people to trust the brand.
                </p>
              </div>
            </div>

            <div className="bp2-fade mb-12 rounded-2xl overflow-hidden neon-border">
              <div className="relative aspect-[16/9]">
                <img
                  src={socialImg}
                  alt="Social media marketing strategies for businesses"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  data-testid="img-social-marketing"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              </div>
              <div className="p-4">
                <p className="text-[11px] text-white/30 font-light">Social media marketing helps businesses connect with their target audience</p>
              </div>
            </div>

            <div className="bp2-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight" data-testid="heading-types">Types of Digital Marketing</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Digital marketing includes several strategies that help businesses promote their products and services online. Each strategy plays a unique role in attracting customers and building brand awareness.
                </p>
              </div>
            </div>

            <div className="bp2-fade">
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight">Search Engine Optimization (SEO)</h3>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Search Engine Optimization is the process of improving a website so that it appears higher in search engine results. When people search for services or products on Google, businesses with strong SEO strategies have a higher chance of appearing at the top of the search results.
                </p>
                <p>
                  SEO involves optimizing website content, improving site speed, using relevant keywords, and creating high-quality content.
                </p>
                <p>
                  Businesses that invest in SEO often receive consistent organic traffic from search engines.
                </p>
              </div>
            </div>

            <div className="bp2-fade">
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight">Social Media Marketing</h3>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Social media marketing involves promoting products or services on platforms such as Facebook, Instagram, LinkedIn, TikTok, and Twitter.
                </p>
                <p>
                  These platforms allow businesses to share content, interact with customers, and build strong online communities.
                </p>
                <p>Social media marketing helps businesses:</p>
                <ul className="space-y-2 pl-6">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Increase brand visibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Communicate directly with customers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Promote products and services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Build brand loyalty</span>
                  </li>
                </ul>
                <p>
                  By creating engaging posts and interacting with followers, businesses can strengthen their online presence.
                </p>
              </div>
            </div>

            <div className="bp2-fade">
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight">Content Marketing</h3>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Content marketing focuses on creating valuable and informative content to attract and engage audiences.
                </p>
                <p>Examples of content marketing include:</p>
                <ul className="space-y-2 pl-6">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Blog articles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Educational videos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Social media posts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Guides and tutorials</span>
                  </li>
                </ul>
                <p>
                  When businesses provide useful content, customers begin to trust the brand and are more likely to choose its products or services.
                </p>
                <p>
                  Content marketing also improves SEO performance by helping websites rank higher in search engines.
                </p>
              </div>
            </div>

            <div className="bp2-fade">
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight">Pay-Per-Click Advertising (PPC)</h3>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Pay-per-click advertising is a digital marketing strategy where businesses pay for advertisements displayed on search engines or social media platforms.
                </p>
                <p>
                  These advertisements appear when users search for specific keywords related to the business.
                </p>
                <p>
                  For example, a company offering web development services may run Google Ads targeting keywords like "professional website development."
                </p>
                <p>
                  PPC campaigns help businesses attract targeted traffic quickly and generate leads.
                </p>
              </div>
            </div>

            <div className="bp2-fade mb-12 rounded-2xl overflow-hidden neon-border">
              <div className="relative aspect-[16/9]">
                <img
                  src={emailImg}
                  alt="Email marketing campaigns for business engagement"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  data-testid="img-email-marketing"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              </div>
              <div className="p-4">
                <p className="text-[11px] text-white/30 font-light">Email marketing remains one of the most effective digital marketing channels</p>
              </div>
            </div>

            <div className="bp2-fade">
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight">Email Marketing</h3>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Email marketing is one of the most effective ways to maintain communication with customers. Businesses use email campaigns to share updates, promotions, newsletters, and product information.
                </p>
                <p>Email marketing helps businesses:</p>
                <ul className="space-y-2 pl-6">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Maintain customer relationships</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Promote new products or services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Increase repeat purchases</span>
                  </li>
                </ul>
                <p>
                  When used effectively, email marketing can generate strong customer engagement and long-term loyalty.
                </p>
              </div>
            </div>

            <div className="bp2-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight" data-testid="heading-benefits">Benefits of Digital Marketing for Businesses</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Digital marketing provides many advantages that help businesses grow and reach new customers.
                </p>
              </div>
            </div>

            <div className="bp2-fade">
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight">Global Reach</h3>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  One of the biggest advantages of digital marketing is the ability to reach audiences worldwide. Businesses can promote their products and services to customers in different cities or even different countries.
                </p>
                <p>
                  Unlike traditional marketing methods that focus on local audiences, digital marketing allows companies to expand their reach globally.
                </p>
              </div>
            </div>

            <div className="bp2-fade">
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight">Cost-Effective Marketing</h3>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Digital marketing campaigns are often more affordable than traditional advertising methods such as television commercials or newspaper ads.
                </p>
                <p>
                  Small businesses and startups can run targeted marketing campaigns with limited budgets while still reaching large audiences.
                </p>
                <p>
                  This makes digital marketing an excellent option for companies looking to maximize their marketing investment.
                </p>
              </div>
            </div>

            <div className="bp2-fade">
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight">Measurable Results</h3>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Another important advantage of digital marketing is the ability to track performance. Businesses can measure metrics such as:
                </p>
                <ul className="space-y-2 pl-6">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Website traffic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Conversion rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Customer engagement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Campaign performance</span>
                  </li>
                </ul>
                <p>
                  These insights help businesses understand which strategies are working and where improvements are needed.
                </p>
                <p>
                  With accurate data, companies can continuously optimize their marketing efforts.
                </p>
              </div>
            </div>

            <div className="bp2-fade">
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight">Targeted Marketing</h3>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Digital marketing allows businesses to target specific audiences based on demographics, interests, and behavior.
                </p>
                <p>
                  For example, companies can run advertisements targeting users in specific locations or individuals interested in particular products.
                </p>
                <p>
                  Targeted marketing ensures that businesses reach the most relevant audience, which increases the chances of generating leads and sales.
                </p>
              </div>
            </div>

            <div className="bp2-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight" data-testid="heading-growth">How Digital Marketing Helps Businesses Grow</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Businesses that implement effective digital marketing strategies often experience significant growth.
                </p>
                <p>Digital marketing helps businesses:</p>
                <ul className="space-y-2 pl-6">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Attract more website visitors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Generate qualified leads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Increase customer engagement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Build brand authority</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Improve customer relationships</span>
                  </li>
                </ul>
                <p>
                  By combining strategies such as SEO, social media marketing, and content marketing, businesses can create a powerful online presence.
                </p>
                <p>
                  This presence helps them compete with larger companies and reach new markets.
                </p>
              </div>
            </div>

            <div className="bp2-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight" data-testid="heading-small-businesses">Digital Marketing for Small Businesses</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Digital marketing is particularly valuable for small businesses. Traditional marketing methods often require large budgets, which can be challenging for small companies.
                </p>
                <p>
                  With digital marketing, small businesses can compete with larger brands by focusing on targeted strategies.
                </p>
                <p>For example:</p>
                <p>
                  A local service provider can use SEO to appear in search results when customers look for nearby services.
                </p>
                <p>
                  A startup can use social media marketing to introduce its brand and connect with potential customers.
                </p>
                <p>
                  These strategies allow small businesses to grow without requiring massive marketing budgets.
                </p>
              </div>
            </div>

            <div className="bp2-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight" data-testid="heading-future">The Future of Digital Marketing</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Digital marketing continues to evolve as technology advances. Artificial intelligence, automation tools, and data analytics are transforming how businesses approach marketing strategies.
                </p>
                <p>Future digital marketing trends may include:</p>
                <ul className="space-y-2 pl-6">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>AI-powered marketing automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Personalized customer experiences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Voice search optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-2.5 shrink-0" />
                    <span>Advanced data analytics</span>
                  </li>
                </ul>
                <p>
                  Businesses that stay updated with these trends will be better positioned to succeed in the digital marketplace.
                </p>
              </div>
            </div>

            <div className="bp2-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight" data-testid="heading-conclusion">Conclusion</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Digital marketing has become an essential strategy for businesses that want to grow in the modern digital economy. It allows companies to reach global audiences, build strong relationships with customers, and promote products effectively.
                </p>
                <p>
                  By using strategies such as SEO, social media marketing, content marketing, and paid advertising, businesses can attract more customers and increase revenue.
                </p>
                <p>
                  Companies that invest in digital marketing gain a competitive advantage and create stronger connections with their audience.
                </p>
                <p>
                  In the future, digital marketing will continue to play a crucial role in business success as technology and online platforms continue to evolve.
                </p>
              </div>
            </div>
          </article>

          <div className="bp2-fade mt-20 pt-16 border-t border-white/[0.06]">
            <h2 className="text-xl font-bold text-white mb-8 tracking-tight" data-testid="heading-related-posts">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((post, i) => (
                <Link key={i} href={post.href}>
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-400/20 transition-all duration-500 cursor-pointer group" data-testid={`link-related-post-${i}`}>
                    <span className="text-[10px] font-semibold text-cyan-400/60 uppercase tracking-[0.15em]">{post.category}</span>
                    <h3 className="text-[13px] font-semibold text-white/60 group-hover:text-white/80 mt-2 leading-relaxed transition-colors duration-300">{post.title}</h3>
                    <span className="inline-flex items-center gap-1 text-[11px] text-cyan-400/50 mt-3 group-hover:text-cyan-400 transition-colors duration-300">
                      Read More <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bp2-fade mt-16 p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-blue-600/10 via-cyan-500/5 to-violet-500/10 border border-white/[0.06] text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight" data-testid="heading-cta">Ready to Grow Your Business with Digital Marketing?</h2>
            <p className="text-[14px] text-white/40 leading-[2] font-light max-w-xl mx-auto mb-8">
              Devoria Tech offers comprehensive digital marketing services to help your business reach more customers and drive growth.
            </p>
            <Link href="/contact">
              <MagneticButton strength={0.2}>
                <span className="relative inline-flex items-center gap-2 px-7 py-3 rounded-full text-[13px] font-semibold text-white cursor-pointer overflow-hidden group" data-testid="button-cta-contact">
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </span>
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}