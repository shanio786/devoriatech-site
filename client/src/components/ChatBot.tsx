import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import logoImg from "@assets/devoria-logo.webp";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  links?: { label: string; href: string }[];
  quickReplies?: string[];
}

const knowledgeBase: Record<string, { answer: string; links?: { label: string; href: string }[]; quickReplies?: string[] }> = {
  greeting: {
    answer: "Hello! Welcome to Devoria Tech. I'm here to help you learn about our services and answer your questions. What can I help you with today?",
    quickReplies: ["What services do you offer?", "I need a website", "Tell me about pricing", "How can I contact you?"],
  },
  services: {
    answer: "We offer a complete range of digital services:\n\n• Digital Marketing (SEO, PPC, Content Strategy)\n• Social Media Management\n• Web Development (WordPress, Shopify, React, Next.js)\n• Mobile App Development (Android, iOS, React Native, Flutter)\n• Graphic Design & Video Editing\n• Business Software Solutions (Desktop, SaaS, Custom)\n• AI Services (Chatbots, AI Influencers, Automation)\n\nWhich service interests you?",
    links: [{ label: "View All Services", href: "/services" }],
    quickReplies: ["Web Development", "Digital Marketing", "App Development", "AI Services"],
  },
  web: {
    answer: "We build modern, fast, and SEO-friendly websites using the latest technologies:\n\n• WordPress & Shopify Development\n• Custom Web Apps with React & Next.js\n• E-Commerce Solutions\n• Landing Pages & Business Websites\n\nOur websites are fully responsive, secure, and optimized for search engines. A standard website takes 2-4 weeks to complete.",
    links: [
      { label: "Web Development Services", href: "/services/web-development" },
      { label: "WordPress & Shopify", href: "/services/web-development/wordpress-shopify" },
      { label: "E-Commerce Solutions", href: "/services/web-development/ecommerce-solutions" },
    ],
    quickReplies: ["How much does a website cost?", "What about e-commerce?", "Contact the team"],
  },
  marketing: {
    answer: "Our digital marketing services help businesses grow their online presence and generate quality leads:\n\n• Search Engine Optimization (SEO)\n• Google Ads & Meta Ads (PPC)\n• Content Marketing & Strategy\n• YouTube & TikTok Advertising\n\nWe focus on data-driven strategies that deliver measurable ROI for your business.",
    links: [
      { label: "Digital Marketing Services", href: "/services/digital-marketing" },
      { label: "SEO Services", href: "/services/digital-marketing/seo" },
      { label: "Paid Advertising", href: "/services/digital-marketing/paid-advertising" },
    ],
    quickReplies: ["Tell me about SEO", "How much does marketing cost?", "Contact the team"],
  },
  seo: {
    answer: "Our SEO services cover everything you need to rank higher on search engines:\n\n• Keyword Research & Strategy\n• On-Page SEO Optimization\n• Technical SEO Improvements\n• Link Building & Off-Page SEO\n• Local SEO & Google Business Profile\n• E-Commerce SEO\n\nWe use proven strategies to improve your search rankings and drive organic traffic.",
    links: [{ label: "SEO Services", href: "/services/digital-marketing/seo" }],
    quickReplies: ["How long does SEO take?", "SEO pricing", "Contact the team"],
  },
  app: {
    answer: "We develop high-performance mobile apps for all platforms:\n\n• Native Android Apps\n• Native iOS Apps\n• Cross-Platform Apps (React Native & Flutter)\n• App Store Optimization\n• App Maintenance & Support\n\nOur apps are designed for smooth performance and excellent user experiences.",
    links: [
      { label: "App Development", href: "/services/app-development" },
      { label: "Android & iOS Apps", href: "/services/app-development/android-ios" },
      { label: "Hybrid Apps", href: "/services/app-development/hybrid-apps" },
    ],
    quickReplies: ["App development cost", "React Native or Flutter?", "Contact the team"],
  },
  ai: {
    answer: "We offer cutting-edge AI services for modern businesses:\n\n• AI Influencer Creation\n• AI Model Photoshoots\n• AI Chatbot Development\n• AI Content Creation\n• AI Business Automation\n\nOur AI solutions help businesses reduce costs, improve efficiency, and create innovative marketing campaigns.",
    links: [
      { label: "AI Services", href: "/services/ai-services" },
      { label: "AI Chatbot Development", href: "/services/ai-services/ai-chatbot" },
      { label: "AI Automation", href: "/services/ai-services/ai-automation" },
    ],
    quickReplies: ["AI chatbot details", "AI for my business", "Contact the team"],
  },
  social: {
    answer: "Our social media management services help brands grow their online presence:\n\n• Facebook, Instagram, LinkedIn, TikTok Management\n• Content Creation & Scheduling\n• Community Engagement & Growth\n• Social Media Analytics & Reporting\n• Paid Social Campaigns\n\nWe create engaging content and manage your social profiles professionally.",
    links: [
      { label: "Social Media Services", href: "/services/social-media" },
      { label: "Content Creation", href: "/services/social-media/content-creation" },
    ],
    quickReplies: ["Social media pricing", "Content creation", "Contact the team"],
  },
  design: {
    answer: "We provide creative design and video services:\n\n• Logo & Brand Identity Design\n• Motion Graphics & Animation\n• Video Editing (YouTube, Reels, Ads)\n• Social Media Graphics\n• Marketing Banners & Ads\n\nOur creative team delivers visually appealing content that helps your brand stand out.",
    links: [
      { label: "Design & Video Services", href: "/services/design-video" },
      { label: "Logo & Branding", href: "/services/design-video/logo-branding" },
    ],
    quickReplies: ["Logo design cost", "Video editing", "Contact the team"],
  },
  software: {
    answer: "We develop custom business software solutions:\n\n• Desktop Applications\n• Cloud SaaS Platforms\n• Custom Enterprise Software\n• CRM & ERP Systems\n• Workflow Automation Tools\n\nOur software solutions are built for performance, security, and scalability.",
    links: [
      { label: "Business Software", href: "/services/business-software" },
      { label: "SaaS Development", href: "/services/business-software/saas-application" },
    ],
    quickReplies: ["SaaS development", "Custom software cost", "Contact the team"],
  },
  pricing: {
    answer: "Our pricing varies based on project scope and complexity:\n\n• Basic Website: Starting from $1,000\n• E-Commerce Store: Starting from $2,500\n• Custom Web App: $5,000 - $50,000+\n• Mobile App: $5,000 - $40,000+\n• SEO & Marketing: Starting from $500/month\n• Logo & Branding: Starting from $300\n\nWe provide detailed quotes after understanding your specific requirements. Get a free consultation to discuss your project!",
    links: [{ label: "Get Free Quote", href: "/contact" }],
    quickReplies: ["Website pricing details", "App pricing details", "Get a free consultation"],
  },
  contact: {
    answer: "You can reach us through multiple channels:\n\n• Email: info@devoriatech.com\n• WhatsApp / Call: +92 311 7597815\n• Visit our Contact page for a quick form\n\nWe typically respond within 24 hours. We also offer free consultations to discuss your project requirements!",
    links: [{ label: "Contact Us", href: "/contact" }],
    quickReplies: ["What services do you offer?", "Tell me about pricing"],
  },
  portfolio: {
    answer: "We have successfully delivered 500+ projects across various industries including e-commerce, healthcare, education, fintech, and startups. Our portfolio showcases websites, mobile apps, branding projects, and marketing campaigns.\n\nCheck out our work to see the quality we deliver!",
    links: [{ label: "View Portfolio", href: "/portfolio" }],
    quickReplies: ["What services do you offer?", "Tell me about pricing", "Contact the team"],
  },
  about: {
    answer: "Devoria Tech is a professional digital agency specializing in web development, app development, digital marketing, and creative design. We have delivered 500+ projects with a 98% client satisfaction rate.\n\nOur team combines creative design, modern technology, and strategic marketing to help businesses grow their online presence and achieve measurable results.",
    links: [{ label: "About Us", href: "/about" }],
    quickReplies: ["What services do you offer?", "View portfolio", "Contact the team"],
  },
  timeline: {
    answer: "Project timelines depend on complexity:\n\n• Basic Website: 2-4 weeks\n• E-Commerce Store: 3-6 weeks\n• Custom Web App: 6-12 weeks\n• Mobile App: 8-16 weeks\n• SEO Results: 3-6 months\n• Logo & Branding: 1-2 weeks\n\nDuring our free consultation, we provide a detailed timeline based on your specific requirements.",
    links: [{ label: "Start a Project", href: "/contact" }],
    quickReplies: ["Tell me about pricing", "What services do you offer?"],
  },
  ecommerce: {
    answer: "We build powerful online stores using:\n\n• Shopify (hosted, easy to manage)\n• WooCommerce (WordPress-based, flexible)\n• Custom E-Commerce (for complex needs)\n\nAll our stores include secure payment integration, mobile-friendly design, product catalog management, and SEO optimization to help you sell more online.",
    links: [
      { label: "E-Commerce Solutions", href: "/services/web-development/ecommerce-solutions" },
      { label: "WordPress & Shopify", href: "/services/web-development/wordpress-shopify" },
    ],
    quickReplies: ["E-commerce pricing", "Shopify vs WooCommerce", "Contact the team"],
  },
  default: {
    answer: "I appreciate your question! While I may not have the exact answer, our team can definitely help you. Here are some things I can tell you about:\n\n• Our services and capabilities\n• Pricing and project timelines\n• How to get started with a project\n\nOr you can contact our team directly for a personalized response!",
    links: [{ label: "Contact Our Team", href: "/contact" }],
    quickReplies: ["What services do you offer?", "Tell me about pricing", "How can I contact you?"],
  },
};

function matchIntent(input: string): string {
  const lower = input.toLowerCase().trim();

  if (/^(hi|hello|hey|good morning|good evening|assalam|salam|greetings)/.test(lower)) return "greeting";
  if (/service|what.*offer|what.*do you do|capabilities/.test(lower)) return "services";
  if (/web.*dev|website|wordpress|shopify|react|next\.?js|landing page|web app/.test(lower)) return "web";
  if (/seo|search engine|rank|ranking|organic|keyword/.test(lower)) return "seo";
  if (/marketing|digital market|ppc|google ads|meta ads|advertis|campaign/.test(lower)) return "marketing";
  if (/app.*dev|mobile.*app|android|ios|react native|flutter|hybrid/.test(lower)) return "app";
  if (/ai|artificial|chatbot|automation|influencer|machine learning/.test(lower)) return "ai";
  if (/social.*media|facebook|instagram|tiktok|linkedin|youtube|content creat/.test(lower)) return "social";
  if (/design|logo|brand|graphic|video|edit|motion|animation/.test(lower)) return "design";
  if (/software|desktop|saas|crm|erp|enterprise|custom.*software/.test(lower)) return "software";
  if (/price|cost|how much|budget|rate|package|quote|affordable/.test(lower)) return "pricing";
  if (/contact|reach|email|phone|call|message|talk|consult/.test(lower)) return "contact";
  if (/portfolio|work|case stud|project|example|showcase/.test(lower)) return "portfolio";
  if (/about|who.*are|company|team|history|story/.test(lower)) return "about";
  if (/time|how long|timeline|duration|deadline|turnaround/.test(lower)) return "timeline";
  if (/ecommerce|e-commerce|online store|shop|sell online|payment/.test(lower)) return "ecommerce";

  return "default";
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  let msgIdCounter = useRef(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !hasInteracted) {
      setHasInteracted(true);
      const greeting = knowledgeBase.greeting;
      setMessages([{
        id: msgIdCounter.current++,
        text: greeting.answer,
        sender: "bot",
        quickReplies: greeting.quickReplies,
      }]);
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: msgIdCounter.current++, text: text.trim(), sender: "user" };
    setMessages((prev) => [...prev.map(m => ({ ...m, quickReplies: undefined })), userMsg]);
    setInput("");
    setIsTyping(true);

    const intent = matchIntent(text);
    const response = knowledgeBase[intent] || knowledgeBase.default;

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, {
        id: msgIdCounter.current++,
        text: response.answer,
        sender: "bot",
        links: response.links,
        quickReplies: response.quickReplies,
      }]);
    }, 600 + Math.random() * 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 z-[60] w-[calc(100vw-2rem)] sm:w-[400px] max-h-[75vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            data-testid="chatbot-window"
          >
            <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 p-4 flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                <img src={logoImg} alt="Devoria Tech" className="w-8 h-8 rounded-lg object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white">Devoria Tech Support</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[11px] text-white/80">Online — Ready to help</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                data-testid="button-chatbot-close"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0a0f1e] min-h-[300px] max-h-[50vh]">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex items-start gap-2 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${msg.sender === "bot" ? "bg-gradient-to-br from-blue-600 to-cyan-500" : "bg-white/10"}`}>
                      {msg.sender === "bot" ? <Bot className="w-3.5 h-3.5 text-white" /> : <User className="w-3.5 h-3.5 text-white/60" />}
                    </div>
                    <div>
                      <div className={`rounded-xl px-3.5 py-2.5 text-[12.5px] leading-relaxed ${msg.sender === "bot" ? "bg-white/[0.06] text-white/70 border border-white/[0.06]" : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"}`} style={{ whiteSpace: "pre-line" }}>
                        {msg.text}
                      </div>
                      {msg.links && msg.links.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {msg.links.map((link, i) => (
                            <Link key={i} href={link.href}>
                              <span
                                onClick={() => setIsOpen(false)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[11px] text-cyan-400 hover:bg-blue-500/20 hover:text-cyan-300 transition-all cursor-pointer font-medium"
                                data-testid={`link-chatbot-${i}`}
                              >
                                {link.label} <ArrowRight className="w-3 h-3" />
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                      {msg.quickReplies && msg.quickReplies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {msg.quickReplies.map((qr, i) => (
                            <button
                              key={i}
                              onClick={() => sendMessage(qr)}
                              className="px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] text-white/50 hover:text-white/70 hover:bg-white/[0.08] hover:border-white/[0.15] transition-all font-medium"
                              data-testid={`button-chatbot-qr-${i}`}
                            >
                              {qr}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="rounded-xl px-4 py-3 bg-white/[0.06] border border-white/[0.06]">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-3 bg-[#0a0f1e] border-t border-white/[0.06] shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-[12.5px] text-white/80 placeholder:text-white/20 outline-none focus:border-cyan-400/30 transition-colors"
                  data-testid="input-chatbot-message"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center disabled:opacity-30 hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                  data-testid="button-chatbot-send"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 sm:right-6 z-[60] w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-110 transition-all"
        whileTap={{ scale: 0.9 }}
        data-testid="button-chatbot-toggle"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {!isOpen && !hasInteracted && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
            <span className="text-[9px] text-white font-bold">1</span>
          </span>
        )}
      </motion.button>
    </>
  );
}
