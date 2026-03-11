import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSEO } from "@/hooks/use-seo";
import SplitText from "@/components/SplitText";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import blogAiAutomationHero from "@assets/blog-ai-automation-hero.webp";
import blogAiAutomationWorkflow from "@assets/blog-ai-automation-workflow.webp";
import blogAiAutomationSmb from "@assets/blog-ai-automation-smb.webp";

gsap.registerPlugin(ScrollTrigger);

const relatedPosts = [
  {
    title: "Why Branding Is Important for Business Success",
    category: "Branding & Design",
    href: "/blog/why-branding-is-important-for-business-success",
  },
  {
    title: "How Professional Video Content Helps Businesses Grow Online",
    category: "Video Marketing",
    href: "/blog/how-professional-video-content-helps-businesses-grow",
  },
  {
    title: "How Artificial Intelligence Is Transforming Modern Businesses",
    category: "AI & Technology",
    href: "/blog/how-artificial-intelligence-transforming-modern-businesses",
  },
];

export default function BlogPost6() {
  useSEO({
    title: "The Future of AI Automation in Business Operations | Devoria Tech",
    description: "Explore how AI automation is transforming business operations. Learn about automated customer support, marketing, workflows, data analysis, and the future of automation.",
    keywords: "AI automation, business automation, artificial intelligence, automated workflows, AI customer support, marketing automation, data analysis, Devoria Tech",
    canonical: "https://devoriatech.com/blog/future-of-ai-automation-in-business-operations",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".bp6-fade").forEach((el) => {
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
                AI & Automation
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-white/30" data-testid="text-date">
                <Calendar className="w-3 h-3" />
                February 15, 2026
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-white/30" data-testid="text-read-time">
                <Clock className="w-3 h-3" />
                10 min read
              </span>
            </div>

            <SplitText
              text="The Future of AI Automation in Business Operations"
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
              Artificial Intelligence is rapidly transforming the way businesses operate. Discover how AI automation allows companies to perform tasks faster, reduce manual work, and improve overall efficiency.
            </motion.p>
          </div>

          <div className="bp6-fade mb-14 rounded-2xl overflow-hidden neon-border">
            <div className="relative aspect-[16/9]">
              <img
                src={blogAiAutomationHero}
                alt="AI automation transforming business operations"
                className="w-full h-full object-cover"
                data-testid="img-hero"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40" />
            </div>
          </div>

          <div className="space-y-12">
            <section className="bp6-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">Introduction</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Artificial Intelligence (AI) is rapidly transforming the way businesses operate around the world. One of the most powerful applications of AI technology is automation. AI automation allows companies to perform tasks faster, reduce manual work, and improve overall efficiency.
                </p>
                <p>
                  In modern business environments, organizations handle large amounts of data and complex processes every day. Managing these processes manually can be time-consuming and prone to errors. AI automation provides a solution by allowing businesses to automate repetitive tasks and streamline workflows.
                </p>
                <p>
                  From customer service and marketing to financial reporting and inventory management, AI automation is becoming an essential tool for companies that want to stay competitive in the digital economy.
                </p>
                <p>
                  Businesses that adopt automation technologies can improve productivity, reduce operational costs, and focus more on innovation and strategic growth.
                </p>
              </div>
            </section>

            <section className="bp6-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">Understanding AI Automation</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  AI automation refers to the use of artificial intelligence technologies to perform tasks automatically without constant human intervention.
                </p>
                <p>
                  These systems analyze data, make decisions, and execute actions based on predefined rules or machine learning algorithms.
                </p>
                <p>AI automation combines several technologies such as:</p>
                <ul className="list-none space-y-2 pl-4">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Machine learning</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Natural language processing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Data analytics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Robotic process automation</span>
                  </li>
                </ul>
                <p>
                  These technologies allow businesses to automate tasks that were previously handled by employees. Automation systems are capable of learning from data and improving their performance over time.
                </p>
              </div>
            </section>

            <section className="bp6-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">Why Businesses Are Adopting AI Automation</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Many organizations are adopting AI automation because it offers significant advantages compared to traditional manual processes.
                </p>
                <p>
                  Businesses today face increasing demands for efficiency and productivity. Automation allows companies to handle larger workloads without increasing operational costs.
                </p>
                <p>Some key reasons businesses adopt AI automation include:</p>
                <ul className="list-none space-y-2 pl-4">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Reducing human error</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Improving speed and accuracy</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Increasing operational efficiency</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Managing large volumes of data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Improving decision-making processes</span>
                  </li>
                </ul>
                <p>
                  Companies that successfully integrate automation into their operations often gain a competitive advantage.
                </p>
              </div>
            </section>

            <section className="bp6-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">AI Automation in Customer Support</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Customer support is one of the most common areas where businesses use AI automation.
                </p>
                <p>
                  AI-powered chatbots and virtual assistants can handle customer inquiries instantly. These systems can answer common questions, guide users through processes, and provide helpful information without requiring human agents.
                </p>
                <p>Benefits of automated customer support include:</p>
                <ul className="list-none space-y-2 pl-4">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>24/7 availability</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Faster response times</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Reduced workload for support teams</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Improved customer satisfaction</span>
                  </li>
                </ul>
                <p>
                  Businesses can use automation to provide consistent customer experiences while reducing operational costs.
                </p>
              </div>
            </section>

            <section className="bp6-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">AI Automation in Marketing</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Marketing departments also benefit significantly from automation technologies. AI tools can analyze customer data and automate marketing campaigns.
                </p>
                <p>For example, automation systems can:</p>
                <ul className="list-none space-y-2 pl-4">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Schedule social media posts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Send personalized email campaigns</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Analyze marketing performance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Recommend content strategies</span>
                  </li>
                </ul>
                <p>
                  These systems allow marketing teams to focus on strategy and creativity while automation handles repetitive tasks. AI-driven marketing automation also helps businesses deliver personalized experiences to customers.
                </p>
              </div>
            </section>

            <div className="bp6-fade rounded-2xl overflow-hidden neon-border">
              <div className="relative aspect-[16/9]">
                <img
                  src={blogAiAutomationWorkflow}
                  alt="AI automation streamlining business workflows"
                  className="w-full h-full object-cover"
                  data-testid="img-workflow"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40" />
              </div>
              <div className="p-4">
                <p className="text-[11px] text-white/25 font-light text-center">AI-powered workflow automation helps businesses streamline processes and improve efficiency</p>
              </div>
            </div>

            <section className="bp6-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">AI Automation in Business Workflows</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Many businesses use automation to improve internal workflows. Workflow automation helps organizations streamline processes across different departments.
                </p>
                <p>Examples of automated workflows include:</p>
                <ul className="list-none space-y-2 pl-4">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Document processing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Approval systems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Financial reporting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Employee onboarding</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Inventory management</span>
                  </li>
                </ul>
                <p>
                  Automation ensures that tasks are completed quickly and consistently. This improves overall productivity and reduces delays caused by manual processes.
                </p>
              </div>
            </section>

            <section className="bp6-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">AI Automation in Data Analysis</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  Modern businesses generate vast amounts of data. Analyzing this data manually can be challenging and time-consuming.
                </p>
                <p>
                  AI automation systems help businesses process and analyze data more efficiently. These systems can identify patterns, trends, and insights that help businesses make better decisions.
                </p>
                <p>For example, AI analytics tools can help companies:</p>
                <ul className="list-none space-y-2 pl-4">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Understand customer behavior</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Predict market trends</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Optimize pricing strategies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Identify operational inefficiencies</span>
                  </li>
                </ul>
                <p>
                  Data-driven insights allow businesses to develop more effective strategies.
                </p>
              </div>
            </section>

            <section className="bp6-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">Benefits of AI Automation for Businesses</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  AI automation provides several benefits that help businesses improve their operations.
                </p>
                <p>
                  <strong className="text-white/70">Increased Productivity</strong> — Automation systems can perform tasks much faster than manual processes. This allows businesses to handle more work with fewer resources.
                </p>
                <p>
                  <strong className="text-white/70">Reduced Operational Costs</strong> — By automating repetitive tasks, businesses can reduce labor costs and minimize errors that require correction.
                </p>
                <p>
                  <strong className="text-white/70">Improved Accuracy</strong> — AI systems process information with high precision, which reduces the risk of human errors.
                </p>
                <p>
                  <strong className="text-white/70">Better Customer Experience</strong> — Automation allows businesses to respond to customer inquiries quickly and provide consistent service.
                </p>
                <p>
                  <strong className="text-white/70">Scalability</strong> — Automation systems can easily scale as businesses grow and handle increased workloads.
                </p>
              </div>
            </section>

            <section className="bp6-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">Challenges of Implementing AI Automation</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  While AI automation offers many benefits, businesses must also consider potential challenges.
                </p>
                <p>Implementing automation technologies may require:</p>
                <ul className="list-none space-y-2 pl-4">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Investment in technology infrastructure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Employee training</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Integration with existing systems</span>
                  </li>
                </ul>
                <p>
                  Companies must carefully plan their automation strategies to ensure successful implementation. It is also important to maintain a balance between automation and human expertise.
                </p>
                <p>
                  Human employees remain essential for tasks that require creativity, emotional intelligence, and complex decision-making.
                </p>
              </div>
            </section>

            <section className="bp6-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">The Role of AI Automation in Future Businesses</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  As technology continues to advance, AI automation will become even more important for businesses.
                </p>
                <p>Future developments in artificial intelligence may include:</p>
                <ul className="list-none space-y-2 pl-4">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Advanced robotic automation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Predictive analytics systems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Intelligent decision-making platforms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Fully automated business processes</span>
                  </li>
                </ul>
                <p>
                  Businesses that embrace automation early will be better prepared to adapt to these changes. Automation will allow companies to operate more efficiently while focusing on innovation and strategic growth.
                </p>
              </div>
            </section>

            <div className="bp6-fade rounded-2xl overflow-hidden neon-border">
              <div className="relative aspect-[16/9]">
                <img
                  src={blogAiAutomationSmb}
                  alt="AI automation for small and medium businesses"
                  className="w-full h-full object-cover"
                  data-testid="img-smb"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40" />
              </div>
              <div className="p-4">
                <p className="text-[11px] text-white/25 font-light text-center">Small and medium businesses can leverage AI automation tools to compete more effectively</p>
              </div>
            </div>

            <section className="bp6-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">AI Automation for Small and Medium Businesses</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  AI automation is not only beneficial for large corporations. Small and medium-sized businesses can also take advantage of automation technologies.
                </p>
                <p>
                  Automation tools are becoming more accessible and affordable for smaller organizations.
                </p>
                <p>For example, small businesses can automate tasks such as:</p>
                <ul className="list-none space-y-2 pl-4">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Email marketing campaigns</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Appointment scheduling</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Customer inquiries</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2.5 shrink-0" />
                    <span>Accounting processes</span>
                  </li>
                </ul>
                <p>
                  By adopting automation, smaller businesses can compete more effectively with larger companies. Automation helps them improve efficiency while maintaining high-quality services.
                </p>
              </div>
            </section>

            <section className="bp6-fade">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">Conclusion</h2>
              <div className="space-y-4 text-[14px] text-white/40 leading-[2] font-light">
                <p>
                  AI automation is transforming the future of business operations. Companies across industries are using automation technologies to improve productivity, reduce costs, and enhance customer experiences.
                </p>
                <p>
                  From marketing and customer support to workflow management and data analysis, AI automation offers powerful solutions for modern businesses.
                </p>
                <p>
                  Organizations that invest in automation technologies will gain a strong advantage in the competitive digital marketplace.
                </p>
                <p>
                  As artificial intelligence continues to evolve, automation will become an essential component of successful business strategies. Businesses that embrace these technologies today will be better positioned for growth and innovation in the future.
                </p>
              </div>
            </section>

            <div className="bp6-fade mt-16 pt-12 border-t border-white/[0.06]">
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

            <div className="bp6-fade mt-12 p-8 rounded-2xl bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-violet-500/10 border border-white/[0.06] text-center">
              <h3 className="text-xl font-bold text-white mb-3">Ready to Automate Your Business?</h3>
              <p className="text-[13px] text-white/40 font-light mb-6 max-w-lg mx-auto leading-relaxed">
                Devoria Tech builds intelligent AI automation solutions that help businesses streamline operations, reduce costs, and scale efficiently. Let us help you embrace the future of automation.
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