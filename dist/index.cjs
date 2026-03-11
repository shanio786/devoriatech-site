"use strict";var G=Object.create;var I=Object.defineProperty;var J=Object.getOwnPropertyDescriptor;var Q=Object.getOwnPropertyNames;var X=Object.getPrototypeOf,Z=Object.prototype.hasOwnProperty;var q=(i,e)=>{for(var t in e)I(i,t,{get:e[t],enumerable:!0})},M=(i,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of Q(e))!Z.call(i,o)&&o!==t&&I(i,o,{get:()=>e[o],enumerable:!(s=J(e,o))||s.enumerable});return i};var p=(i,e,t)=>(t=i!=null?G(X(i)):{},M(e||!i||!i.__esModule?I(t,"default",{value:i,enumerable:!0}):t,i)),ee=i=>M(I({},"__esModule",{value:!0}),i);var ce={};q(ce,{log:()=>_});module.exports=ee(ce);var B=p(require("express"),1),H=p(require("express-session"),1);var R=require("drizzle-orm/node-postgres"),N=p(require("pg"),1);var D={};q(D,{blogPosts:()=>c,contactSubmissions:()=>w,insertBlogSchema:()=>P,insertContactSchema:()=>x,insertSeoSchema:()=>T,insertUserSchema:()=>te,seoSettings:()=>g,users:()=>h});var S=require("drizzle-orm"),r=require("drizzle-orm/pg-core"),A=require("drizzle-zod"),h=(0,r.pgTable)("users",{id:(0,r.varchar)("id").primaryKey().default(S.sql`gen_random_uuid()`),username:(0,r.text)("username").notNull().unique(),password:(0,r.text)("password").notNull()}),te=(0,A.createInsertSchema)(h).pick({username:!0,password:!0}),w=(0,r.pgTable)("contact_submissions",{id:(0,r.varchar)("id").primaryKey().default(S.sql`gen_random_uuid()`),name:(0,r.text)("name").notNull(),email:(0,r.text)("email").notNull(),phone:(0,r.text)("phone"),company:(0,r.text)("company"),service:(0,r.text)("service"),budget:(0,r.text)("budget"),message:(0,r.text)("message").notNull(),createdAt:(0,r.timestamp)("created_at").defaultNow()}),x=(0,A.createInsertSchema)(w).omit({id:!0,createdAt:!0}),c=(0,r.pgTable)("blog_posts",{id:(0,r.varchar)("id").primaryKey().default(S.sql`gen_random_uuid()`),title:(0,r.text)("title").notNull(),slug:(0,r.text)("slug").notNull().unique(),excerpt:(0,r.text)("excerpt").notNull(),content:(0,r.text)("content").notNull(),category:(0,r.text)("category").notNull(),heroImage:(0,r.text)("hero_image"),metaTitle:(0,r.text)("meta_title"),metaDescription:(0,r.text)("meta_description"),metaKeywords:(0,r.text)("meta_keywords"),published:(0,r.boolean)("published").notNull().default(!0),publishedAt:(0,r.timestamp)("published_at").defaultNow(),createdAt:(0,r.timestamp)("created_at").defaultNow(),updatedAt:(0,r.timestamp)("updated_at").defaultNow()}),P=(0,A.createInsertSchema)(c).omit({id:!0,createdAt:!0,updatedAt:!0}),g=(0,r.pgTable)("seo_settings",{id:(0,r.varchar)("id").primaryKey().default(S.sql`gen_random_uuid()`),pageSlug:(0,r.text)("page_slug").notNull().unique(),pageTitle:(0,r.text)("page_title").notNull(),metaTitle:(0,r.text)("meta_title"),metaDescription:(0,r.text)("meta_description"),metaKeywords:(0,r.text)("meta_keywords"),focusKeyword:(0,r.text)("focus_keyword"),canonicalUrl:(0,r.text)("canonical_url"),ogTitle:(0,r.text)("og_title"),ogDescription:(0,r.text)("og_description"),ogImage:(0,r.text)("og_image"),twitterTitle:(0,r.text)("twitter_title"),twitterDescription:(0,r.text)("twitter_description"),noIndex:(0,r.boolean)("no_index").default(!1),schemaType:(0,r.text)("schema_type").default("WebPage"),updatedAt:(0,r.timestamp)("updated_at").defaultNow()}),T=(0,A.createInsertSchema)(g).omit({id:!0,updatedAt:!0});if(!process.env.DATABASE_URL)throw new Error("DATABASE_URL is required");var se=new N.default.Pool({connectionString:process.env.DATABASE_URL}),a=(0,R.drizzle)(se,{schema:D});var d=require("drizzle-orm"),C=class{async getUser(e){let[t]=await a.select().from(h).where((0,d.eq)(h.id,e));return t}async getUserByUsername(e){let[t]=await a.select().from(h).where((0,d.eq)(h.username,e));return t}async createUser(e){let[t]=await a.insert(h).values(e).returning();return t}async createContactSubmission(e){let[t]=await a.insert(w).values(e).returning();return t}async getContactSubmissions(){return await a.select().from(w).orderBy((0,d.desc)(w.createdAt))}async getAllBlogs(){return await a.select().from(c).orderBy((0,d.desc)(c.publishedAt))}async getBlogBySlug(e){let[t]=await a.select().from(c).where((0,d.eq)(c.slug,e));return t}async getBlogById(e){let[t]=await a.select().from(c).where((0,d.eq)(c.id,e));return t}async createBlog(e){let[t]=await a.insert(c).values(e).returning();return t}async updateBlog(e,t){let[s]=await a.update(c).set({...t,updatedAt:new Date}).where((0,d.eq)(c.id,e)).returning();return s}async deleteBlog(e){await a.delete(c).where((0,d.eq)(c.id,e))}async getAllSeoSettings(){return await a.select().from(g).orderBy(g.pageSlug)}async getSeoByPageSlug(e){let[t]=await a.select().from(g).where((0,d.eq)(g.pageSlug,e));return t}async upsertSeoSettings(e){if(await this.getSeoByPageSlug(e.pageSlug)){let[s]=await a.update(g).set({...e,updatedAt:new Date}).where((0,d.eq)(g.pageSlug,e.pageSlug)).returning();return s}else{let[s]=await a.insert(g).values(e).returning();return s}}},l=new C;var k=require("zod"),U=p(require("nodemailer"),1),O=p(require("crypto"),1),$=process.env.ADMIN_USERNAME||"admin",j=process.env.ADMIN_PASSWORD_HASH||"",oe=process.env.ADMIN_PASSWORD||"devoria2026";function ie(i){return O.default.createHash("sha256").update(i).digest("hex")}function re(i){return j?ie(i)===j:i===oe}function b(i,e,t){if(i.session?.adminAuthenticated)return t();e.status(401).json({error:"Unauthorized"})}var ne=U.default.createTransport({host:process.env.SMTP_HOST||"smtp.hostinger.com",port:parseInt(process.env.SMTP_PORT||"465"),secure:!0,auth:{user:process.env.SMTP_USER||"info@devoriatech.com",pass:process.env.SMTP_PASS||""}});async function ae(i){let e=`
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0f1e; color: #ffffff; padding: 30px; border-radius: 12px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #06b6d4; margin: 0;">New Contact Form Submission</h1>
        <p style="color: #ffffff80; font-size: 14px;">Devoria Tech Website</p>
      </div>
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="border-bottom: 1px solid #ffffff10;">
          <td style="padding: 12px; color: #06b6d4; font-weight: bold; width: 130px;">Name</td>
          <td style="padding: 12px; color: #fff;">${i.name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #ffffff10;">
          <td style="padding: 12px; color: #06b6d4; font-weight: bold;">Email</td>
          <td style="padding: 12px; color: #fff;"><a href="mailto:${i.email}" style="color: #38bdf8;">${i.email}</a></td>
        </tr>
        ${i.phone?`<tr style="border-bottom: 1px solid #ffffff10;"><td style="padding: 12px; color: #06b6d4; font-weight: bold;">Phone</td><td style="padding: 12px; color: #fff;">${i.phone}</td></tr>`:""}
        ${i.company?`<tr style="border-bottom: 1px solid #ffffff10;"><td style="padding: 12px; color: #06b6d4; font-weight: bold;">Company</td><td style="padding: 12px; color: #fff;">${i.company}</td></tr>`:""}
        ${i.service?`<tr style="border-bottom: 1px solid #ffffff10;"><td style="padding: 12px; color: #06b6d4; font-weight: bold;">Service</td><td style="padding: 12px; color: #fff;">${i.service}</td></tr>`:""}
        ${i.budget?`<tr style="border-bottom: 1px solid #ffffff10;"><td style="padding: 12px; color: #06b6d4; font-weight: bold;">Budget</td><td style="padding: 12px; color: #fff;">${i.budget}</td></tr>`:""}
        <tr>
          <td style="padding: 12px; color: #06b6d4; font-weight: bold; vertical-align: top;">Message</td>
          <td style="padding: 12px; color: #fff; line-height: 1.6;">${i.message.replace(/\n/g,"<br>")}</td>
        </tr>
      </table>
      <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #ffffff10; text-align: center;">
        <p style="color: #ffffff40; font-size: 12px;">Reply directly to this email to respond to ${i.name}</p>
      </div>
    </div>
  `;await ne.sendMail({from:`"Devoria Tech Website" <${process.env.SMTP_USER||"info@devoriatech.com"}>`,to:process.env.CONTACT_EMAIL||"info@devoriatech.com",replyTo:i.email,subject:`New Inquiry from ${i.name}${i.service?` - ${i.service}`:""}`,html:e})}async function le(){if((await l.getAllBlogs()).length>0)return;let e=[{title:"Why Every Business Needs a Professional Website in 2026",slug:"why-every-business-needs-professional-website-2026",excerpt:"Discover why having a professional website is essential for businesses in 2026. Learn how a modern website builds trust, attracts customers, and improves marketing results.",category:"Web Development",heroImage:"/assets/blog-website-hero.webp",metaTitle:"Why Every Business Needs a Professional Website in 2026 | Devoria Tech",metaDescription:"Discover why having a professional website is essential for businesses in 2026. Learn how a modern website builds trust, attracts customers, and improves marketing results.",metaKeywords:"professional website, business website 2026, website importance, web development, SEO website, mobile-friendly website",published:!0,publishedAt:new Date("2026-03-08"),content:`<h2>Your Website is Your Digital Storefront</h2>
<p>In 2026, a professional website is no longer optional \u2014 it's the foundation of every successful business. Whether you're a small local shop or a growing enterprise, your website is the first thing potential customers see when they search for your services online.</p>
<h2>Why a Professional Website Matters</h2>
<ul>
<li><strong>Builds Trust:</strong> 75% of users judge a company's credibility based on its website design.</li>
<li><strong>24/7 Marketing:</strong> Your website works around the clock, even when you're asleep.</li>
<li><strong>Wider Reach:</strong> Reach customers beyond your local area with a globally accessible website.</li>
<li><strong>SEO Visibility:</strong> A well-optimized website ranks on Google and brings you free organic traffic.</li>
</ul>
<h2>Mobile-First Design is Essential</h2>
<p>Over 60% of web traffic now comes from mobile devices. A mobile-first, responsive design ensures your site looks perfect on every screen size \u2014 from smartphones to large desktop monitors.</p>
<h2>Key Features of a Professional Website</h2>
<ul>
<li>Fast loading speed (under 3 seconds)</li>
<li>Clear call-to-action buttons</li>
<li>SSL certificate (https://)</li>
<li>Contact forms and live chat</li>
<li>SEO-optimized content and structure</li>
</ul>
<h2>Conclusion</h2>
<p>Investing in a professional website is one of the highest ROI decisions a business can make. At Devoria Tech, we build fast, beautiful, and SEO-optimized websites that drive real results for your business.</p>`},{title:"What is Digital Marketing and Why It Is Important for Businesses",slug:"what-is-digital-marketing-why-important-for-businesses",excerpt:"Understand what digital marketing is and why it's crucial for business growth in the digital age. Explore SEO, social media, PPC, and content marketing strategies.",category:"Digital Marketing",heroImage:"/assets/blog-digital-marketing-hero.webp",metaTitle:"What is Digital Marketing and Why It Is Important | Devoria Tech",metaDescription:"Understand what digital marketing is and why it's crucial for business growth in the digital age. Explore SEO, social media, PPC, and content marketing strategies.",metaKeywords:"digital marketing, SEO, social media marketing, PPC, content marketing, online marketing",published:!0,publishedAt:new Date("2026-03-06"),content:`<h2>What is Digital Marketing?</h2>
<p>Digital marketing is the promotion of products and services through digital channels \u2014 including search engines, social media, email, and websites. It's how modern businesses connect with their target audience online.</p>
<h2>Core Components of Digital Marketing</h2>
<ul>
<li><strong>SEO (Search Engine Optimization):</strong> Optimizing your website to rank higher on Google.</li>
<li><strong>PPC (Pay-Per-Click):</strong> Paid ads on Google, Facebook, and other platforms.</li>
<li><strong>Social Media Marketing:</strong> Building brand presence on Instagram, Facebook, LinkedIn, and TikTok.</li>
<li><strong>Content Marketing:</strong> Creating valuable blogs, videos, and infographics to attract customers.</li>
<li><strong>Email Marketing:</strong> Nurturing leads and customers through targeted email campaigns.</li>
</ul>
<h2>Why Digital Marketing is Essential in 2026</h2>
<p>With over 5 billion internet users worldwide, digital marketing allows businesses of all sizes to reach their ideal customers at the right time with the right message \u2014 and measure every result.</p>
<h2>Benefits of Digital Marketing</h2>
<ul>
<li>Cost-effective compared to traditional advertising</li>
<li>Highly targeted \u2014 reach specific demographics</li>
<li>Measurable ROI with real-time analytics</li>
<li>Builds long-term brand authority</li>
</ul>
<h2>Conclusion</h2>
<p>Digital marketing is the engine of modern business growth. Devoria Tech offers full-service digital marketing solutions tailored to your business goals.</p>`},{title:"How Artificial Intelligence Is Transforming Modern Businesses",slug:"how-artificial-intelligence-transforming-modern-businesses",excerpt:"Explore how AI is revolutionizing industries with automation, chatbots, predictive analytics, and personalization \u2014 and how your business can benefit.",category:"AI & Technology",heroImage:"/assets/blog-ai-hero.webp",metaTitle:"How AI Is Transforming Modern Businesses | Devoria Tech",metaDescription:"Explore how AI is revolutionizing industries with automation, chatbots, predictive analytics, and personalization \u2014 and how your business can benefit.",metaKeywords:"artificial intelligence, AI business, AI automation, chatbots, machine learning, AI transformation",published:!0,publishedAt:new Date("2026-03-04"),content:`<h2>AI: The Biggest Business Revolution of Our Time</h2>
<p>Artificial Intelligence is no longer a futuristic concept \u2014 it's actively reshaping how businesses operate, compete, and grow. From customer service chatbots to predictive analytics, AI is delivering measurable results across every industry.</p>
<h2>How AI is Being Used in Business Today</h2>
<ul>
<li><strong>AI Chatbots:</strong> Handle customer inquiries 24/7 without human intervention.</li>
<li><strong>Predictive Analytics:</strong> Forecast sales trends and customer behavior with data-driven insights.</li>
<li><strong>Marketing Automation:</strong> Personalize email campaigns and ad targeting at scale.</li>
<li><strong>Content Creation:</strong> Generate blog posts, product descriptions, and social media content faster.</li>
<li><strong>Process Automation:</strong> Eliminate repetitive tasks and reduce operational costs.</li>
</ul>
<h2>Industries Being Transformed by AI</h2>
<p>Retail, healthcare, finance, education, and manufacturing are all experiencing significant AI-driven transformation. Businesses that adopt AI early gain a major competitive advantage.</p>
<h2>Getting Started with AI for Your Business</h2>
<p>You don't need a tech giant budget to leverage AI. Start small with chatbots, automated email sequences, or AI content tools \u2014 then scale as you see results.</p>
<h2>Conclusion</h2>
<p>AI is the future, and the future is now. Devoria Tech specializes in custom AI solutions that help businesses automate, grow, and outperform the competition.</p>`},{title:"Top Benefits of Social Media Marketing for Small Businesses",slug:"top-benefits-social-media-marketing-small-businesses",excerpt:"Learn how social media marketing can help small businesses grow their brand, attract new customers, and compete with larger companies on a budget.",category:"Social Media",heroImage:"/assets/blog-social-media-hero.webp",metaTitle:"Top Benefits of Social Media Marketing for Small Businesses | Devoria Tech",metaDescription:"Learn how social media marketing can help small businesses grow their brand, attract new customers, and compete with larger companies on a budget.",metaKeywords:"social media marketing, small business marketing, Instagram marketing, Facebook marketing, brand awareness",published:!0,publishedAt:new Date("2026-03-02"),content:`<h2>Why Social Media is a Game-Changer for Small Businesses</h2>
<p>Social media has leveled the playing field. Small businesses can now compete with large corporations by building authentic relationships with their audience \u2014 at a fraction of the cost of traditional advertising.</p>
<h2>Top Benefits of Social Media Marketing</h2>
<ul>
<li><strong>Brand Awareness:</strong> Reach thousands of potential customers organically and through paid ads.</li>
<li><strong>Customer Engagement:</strong> Build real relationships through comments, DMs, and community interaction.</li>
<li><strong>Cost-Effective:</strong> Even a small budget can yield significant results with targeted ads.</li>
<li><strong>Drive Website Traffic:</strong> Social posts and stories can funnel users directly to your website.</li>
<li><strong>Competitor Insights:</strong> Monitor what your competitors are doing and stay ahead.</li>
</ul>
<h2>Which Platforms Should You Focus On?</h2>
<p>The right platform depends on your audience. Instagram and TikTok work best for visual brands targeting younger demographics. LinkedIn is ideal for B2B businesses. Facebook remains powerful for local businesses targeting adults.</p>
<h2>Content that Performs on Social Media</h2>
<ul>
<li>Short-form videos (Reels, TikTok)</li>
<li>Behind-the-scenes content</li>
<li>Customer testimonials and case studies</li>
<li>Educational tips and how-to posts</li>
</ul>
<h2>Conclusion</h2>
<p>Social media is one of the most powerful tools available to small businesses today. Devoria Tech's social media team creates content that builds brands and drives real business results.</p>`},{title:"The Complete Guide to Logo Design and Brand Identity",slug:"complete-guide-logo-design-brand-identity",excerpt:"Everything you need to know about creating a powerful brand identity \u2014 from logo design principles to color psychology and brand guidelines.",category:"Design & Branding",heroImage:"/assets/blog-branding-hero.webp",metaTitle:"The Complete Guide to Logo Design and Brand Identity | Devoria Tech",metaDescription:"Everything you need to know about creating a powerful brand identity \u2014 from logo design principles to color psychology and brand guidelines.",metaKeywords:"logo design, brand identity, branding, color psychology, brand guidelines, visual identity",published:!0,publishedAt:new Date("2026-02-28"),content:`<h2>Why Your Brand Identity Matters</h2>
<p>Your brand is more than a logo \u2014 it's the complete visual and emotional experience customers have with your business. A strong brand identity builds recognition, trust, and loyalty.</p>
<h2>Core Elements of Brand Identity</h2>
<ul>
<li><strong>Logo:</strong> The face of your brand \u2014 must be memorable, scalable, and versatile.</li>
<li><strong>Color Palette:</strong> Colors evoke emotions and should align with your brand values.</li>
<li><strong>Typography:</strong> Font choices communicate your brand's personality.</li>
<li><strong>Visual Style:</strong> Consistent imagery, icons, and design patterns.</li>
<li><strong>Brand Voice:</strong> How your brand speaks \u2014 formal, casual, playful, or professional.</li>
</ul>
<h2>Logo Design Principles</h2>
<p>A great logo is simple, memorable, timeless, versatile, and appropriate for your industry. It should work in full color, black and white, and at any size.</p>
<h2>Color Psychology in Branding</h2>
<p>Blue conveys trust and professionalism. Red creates urgency and excitement. Green signals growth and health. Orange suggests creativity and energy. Choose colors that align with what you want customers to feel.</p>
<h2>Conclusion</h2>
<p>A powerful brand identity sets you apart from competitors and creates lasting impressions. Devoria Tech's design team creates brand identities that tell your story and drive business growth.</p>`},{title:"Video Marketing Strategy: How to Grow Your Business with Video",slug:"video-marketing-strategy-grow-business",excerpt:"Discover how video marketing can dramatically increase engagement, conversions, and brand awareness for your business in 2026.",category:"Video & Content",heroImage:"/assets/blog-video-hero.webp",metaTitle:"Video Marketing Strategy: Grow Your Business with Video | Devoria Tech",metaDescription:"Discover how video marketing can dramatically increase engagement, conversions, and brand awareness for your business in 2026.",metaKeywords:"video marketing, video content, YouTube marketing, video strategy, brand video, promotional video",published:!0,publishedAt:new Date("2026-02-25"),content:`<h2>Video is the King of Content</h2>
<p>Video content generates 1200% more shares than text and images combined. In 2026, businesses that prioritize video marketing see dramatically higher engagement, longer website sessions, and better conversion rates.</p>
<h2>Types of Videos That Drive Results</h2>
<ul>
<li><strong>Explainer Videos:</strong> Simplify complex products or services for your audience.</li>
<li><strong>Testimonial Videos:</strong> Real customer success stories build trust instantly.</li>
<li><strong>Product Demo Videos:</strong> Show your product in action to reduce purchase hesitation.</li>
<li><strong>Social Media Videos:</strong> Short, engaging Reels and TikToks for brand awareness.</li>
<li><strong>Corporate Videos:</strong> Behind-the-scenes and team culture content.</li>
</ul>
<h2>Where to Distribute Your Videos</h2>
<p>YouTube (the world's second largest search engine), Instagram Reels, TikTok, LinkedIn, and your website are all powerful distribution channels for video content.</p>
<h2>Video SEO Best Practices</h2>
<ul>
<li>Use keywords in titles, descriptions, and tags</li>
<li>Add closed captions for accessibility and SEO</li>
<li>Create compelling thumbnails</li>
<li>Include clear calls to action</li>
</ul>
<h2>Conclusion</h2>
<p>Video marketing is no longer optional \u2014 it's essential. Devoria Tech's video production team creates professional videos that capture attention and convert viewers into customers.</p>`},{title:"AI Automation: How to Eliminate Repetitive Tasks and Scale Your Business",slug:"ai-automation-eliminate-repetitive-tasks-scale-business",excerpt:"Learn how AI automation tools can save your team hours every week by handling repetitive tasks \u2014 from customer support to data processing and marketing.",category:"AI & Automation",heroImage:"/assets/blog-ai-automation-hero.webp",metaTitle:"AI Automation: Eliminate Repetitive Tasks and Scale Your Business | Devoria Tech",metaDescription:"Learn how AI automation tools can save your team hours every week by handling repetitive tasks \u2014 from customer support to data processing and marketing.",metaKeywords:"AI automation, business automation, workflow automation, AI tools, marketing automation, customer service automation",published:!0,publishedAt:new Date("2026-02-22"),content:`<h2>Why AI Automation is a Business Priority</h2>
<p>The average employee spends 40% of their workweek on repetitive, manual tasks. AI automation eliminates this waste, freeing your team to focus on high-value, creative work that actually grows your business.</p>
<h2>Business Processes You Can Automate with AI</h2>
<ul>
<li><strong>Customer Support:</strong> AI chatbots handle FAQs, bookings, and complaints 24/7.</li>
<li><strong>Email Marketing:</strong> Automated sequences nurture leads from awareness to purchase.</li>
<li><strong>Data Entry:</strong> AI tools extract, organize, and input data from documents automatically.</li>
<li><strong>Social Media Posting:</strong> Schedule and auto-publish content across all platforms.</li>
<li><strong>Invoice Processing:</strong> Automate billing, reminders, and financial reporting.</li>
</ul>
<h2>Real Business Results from AI Automation</h2>
<p>Businesses that implement AI automation report 30-50% reduction in operational costs, 3x faster response times, and significant improvements in customer satisfaction scores.</p>
<h2>Getting Started with AI Automation</h2>
<p>Start by identifying your most time-consuming repetitive tasks. Then evaluate AI tools or custom automation solutions that can handle those processes. Begin with one workflow, measure the results, and expand.</p>
<h2>Conclusion</h2>
<p>AI automation is the smartest investment a growing business can make. Devoria Tech builds custom AI automation solutions that save time, reduce costs, and scale with your business.</p>`}];for(let t of e)await l.createBlog(t);console.log("Blog posts seeded successfully")}async function W(i,e){return await le(),e.post("/api/contact",async(t,s)=>{try{let o=x.parse(t.body),n=await l.createContactSubmission(o);try{await ae(o),console.log(`Contact email sent for submission ${n.id}`)}catch(y){console.error("Failed to send contact email:",y)}s.json({success:!0,id:n.id})}catch(o){o instanceof k.ZodError?s.status(400).json({error:"Invalid form data",details:o.errors}):(console.error("Contact form error:",o),s.status(500).json({error:"Failed to submit form"}))}}),e.get("/api/blogs",async(t,s)=>{try{let o=await l.getAllBlogs();s.json(o.filter(n=>n.published))}catch{s.status(500).json({error:"Failed to fetch blogs"})}}),e.get("/api/blogs/:slug",async(t,s)=>{try{let o=await l.getBlogBySlug(t.params.slug);if(!o||!o.published)return s.status(404).json({error:"Blog post not found"});s.json(o)}catch{s.status(500).json({error:"Failed to fetch blog post"})}}),e.get("/sitemap.xml",async(t,s)=>{let o="https://devoriatech.com",n=new Date().toISOString().split("T")[0],y=[{url:"/",priority:"1.0",changefreq:"weekly"},{url:"/services",priority:"0.9",changefreq:"monthly"},{url:"/services/digital-marketing",priority:"0.8",changefreq:"monthly"},{url:"/services/seo",priority:"0.8",changefreq:"monthly"},{url:"/services/paid-advertising",priority:"0.8",changefreq:"monthly"},{url:"/services/content-strategy",priority:"0.8",changefreq:"monthly"},{url:"/services/web-development",priority:"0.8",changefreq:"monthly"},{url:"/services/web-development/wordpress-shopify",priority:"0.7",changefreq:"monthly"},{url:"/services/web-development/custom-apps",priority:"0.7",changefreq:"monthly"},{url:"/services/web-development/ecommerce-solutions",priority:"0.7",changefreq:"monthly"},{url:"/services/app-development",priority:"0.8",changefreq:"monthly"},{url:"/services/app-development/android-ios",priority:"0.7",changefreq:"monthly"},{url:"/services/app-development/hybrid-apps",priority:"0.7",changefreq:"monthly"},{url:"/services/business-software",priority:"0.8",changefreq:"monthly"},{url:"/services/business-software/desktop-software",priority:"0.7",changefreq:"monthly"},{url:"/services/business-software/saas-application",priority:"0.7",changefreq:"monthly"},{url:"/services/business-software/custom-business-software",priority:"0.7",changefreq:"monthly"},{url:"/services/ai-services",priority:"0.8",changefreq:"monthly"},{url:"/services/ai-services/ai-influencer",priority:"0.7",changefreq:"monthly"},{url:"/services/ai-services/ai-model-photoshoot",priority:"0.7",changefreq:"monthly"},{url:"/services/ai-services/ai-chatbot",priority:"0.7",changefreq:"monthly"},{url:"/services/ai-services/ai-content-creation",priority:"0.7",changefreq:"monthly"},{url:"/services/ai-services/ai-automation",priority:"0.7",changefreq:"monthly"},{url:"/services/social-media",priority:"0.8",changefreq:"monthly"},{url:"/services/social-media/platform-management",priority:"0.7",changefreq:"monthly"},{url:"/services/social-media/content-creation",priority:"0.7",changefreq:"monthly"},{url:"/services/social-media/community-engagement",priority:"0.7",changefreq:"monthly"},{url:"/services/design-video",priority:"0.8",changefreq:"monthly"},{url:"/services/design-video/logo-branding",priority:"0.7",changefreq:"monthly"},{url:"/services/design-video/motion-graphics",priority:"0.7",changefreq:"monthly"},{url:"/services/design-video/video-editing",priority:"0.7",changefreq:"monthly"},{url:"/portfolio",priority:"0.8",changefreq:"monthly"},{url:"/about",priority:"0.7",changefreq:"monthly"},{url:"/blog",priority:"0.8",changefreq:"weekly"},{url:"/contact",priority:"0.7",changefreq:"monthly"}],m=[];try{m=await l.getAllBlogs(),m=m.filter(u=>u.published)}catch{}let Y=`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...y.map(u=>`
  <url>
    <loc>${o}${u.url}</loc>
    <lastmod>${n}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`),...m.map(u=>`
  <url>
    <loc>${o}/blog/${u.slug}</loc>
    <lastmod>${new Date(u.updatedAt||u.publishedAt||n).toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`)].join("")}
</urlset>`;s.setHeader("Content-Type","application/xml"),s.send(Y)}),e.get("/api/seo/:pageSlug",async(t,s)=>{try{let o=await l.getSeoByPageSlug(t.params.pageSlug);s.json(o||null)}catch{s.status(500).json({error:"Failed to fetch SEO settings"})}}),e.use("/admin",(t,s,o)=>{s.setHeader("X-Robots-Tag","noindex, nofollow"),o()}),e.post("/api/admin/login",async(t,s)=>{let{username:o,password:n}=t.body;o===$&&re(n)?(t.session.adminAuthenticated=!0,s.json({success:!0})):s.status(401).json({error:"Invalid credentials"})}),e.post("/api/admin/logout",(t,s)=>{t.session.destroy(()=>{s.json({success:!0})})}),e.get("/api/admin/me",(t,s)=>{t.session?.adminAuthenticated?s.json({authenticated:!0,username:$}):s.status(401).json({error:"Not authenticated"})}),e.get("/api/admin/contacts",b,async(t,s)=>{try{let o=await l.getContactSubmissions();s.json(o)}catch{s.status(500).json({error:"Failed to fetch contacts"})}}),e.get("/api/admin/blogs",b,async(t,s)=>{try{let o=await l.getAllBlogs();s.json(o)}catch{s.status(500).json({error:"Failed to fetch blogs"})}}),e.post("/api/admin/blogs",b,async(t,s)=>{try{let o=P.parse(t.body),n=await l.createBlog(o);s.json(n)}catch(o){o instanceof k.ZodError?s.status(400).json({error:"Invalid data",details:o.errors}):(console.error("Create blog error:",o),s.status(500).json({error:"Failed to create blog"}))}}),e.put("/api/admin/blogs/:id",b,async(t,s)=>{try{let o=await l.updateBlog(t.params.id,t.body);s.json(o)}catch(o){console.error("Update blog error:",o),s.status(500).json({error:"Failed to update blog"})}}),e.delete("/api/admin/blogs/:id",b,async(t,s)=>{try{await l.deleteBlog(t.params.id),s.json({success:!0})}catch{s.status(500).json({error:"Failed to delete blog"})}}),e.get("/api/admin/seo",b,async(t,s)=>{try{let o=await l.getAllSeoSettings();s.json(o)}catch{s.status(500).json({error:"Failed to fetch SEO settings"})}}),e.put("/api/admin/seo/:pageSlug",b,async(t,s)=>{try{let o=T.parse({...t.body,pageSlug:t.params.pageSlug}),n=await l.upsertSeoSettings(o);s.json(n)}catch(o){o instanceof k.ZodError?s.status(400).json({error:"Invalid data",details:o.errors}):(console.error("Upsert SEO error:",o),s.status(500).json({error:"Failed to update SEO settings"}))}}),i}var F=p(require("express"),1),z=p(require("fs"),1),E=p(require("path"),1);function V(i){let e=E.default.resolve(__dirname,"public");if(!z.default.existsSync(e))throw new Error(`Could not find the build directory: ${e}, make sure to build the client first`);i.use(F.default.static(e)),i.use("/{*path}",(t,s)=>{s.sendFile(E.default.resolve(e,"index.html"))})}var K=require("http"),f=(0,B.default)(),L=(0,K.createServer)(f);f.use(B.default.json({verify:(i,e,t)=>{i.rawBody=t}}));f.use(B.default.urlencoded({extended:!1}));f.use((0,H.default)({secret:process.env.SESSION_SECRET||"devoria-admin-secret-2026",resave:!1,saveUninitialized:!1,cookie:{secure:!0,httpOnly:!0,maxAge:1440*60*1e3}}));function _(i,e="express"){let t=new Date().toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0});console.log(`${t} [${e}] ${i}`)}f.use((i,e,t)=>{let s=Date.now(),o=i.path,n,y=e.json;e.json=function(m,...v){return n=m,y.apply(e,[m,...v])},e.on("finish",()=>{let m=Date.now()-s;if(o.startsWith("/api")){let v=`${i.method} ${o} ${e.statusCode} in ${m}ms`;n&&(v+=` :: ${JSON.stringify(n)}`),_(v)}}),t()});(async()=>{await W(L,f),f.use((e,t,s,o)=>{let n=e.status||e.statusCode||500,y=e.message||"Internal Server Error";return console.error("Internal Server Error:",e),s.headersSent?o(e):s.status(n).json({message:y})}),V(f);let i=parseInt(process.env.PORT||"5000",10);L.listen({port:i,host:"0.0.0.0",reusePort:!0},()=>{_(`serving on port ${i}`)})})();0&&(module.exports={log});
