import { lazy, Suspense, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";

const ChatBot = lazy(() => import("@/components/ChatBot"));

const Services = lazy(() => import("@/pages/Services"));
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const About = lazy(() => import("@/pages/About"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost1 = lazy(() => import("@/pages/BlogPost1"));
const BlogPost2 = lazy(() => import("@/pages/BlogPost2"));
const BlogPost3 = lazy(() => import("@/pages/BlogPost3"));
const BlogPost4 = lazy(() => import("@/pages/BlogPost4"));
const BlogPost5 = lazy(() => import("@/pages/BlogPost5"));
const BlogPost6 = lazy(() => import("@/pages/BlogPost6"));
const BlogPost7 = lazy(() => import("@/pages/BlogPost7"));
const BlogPostDynamic = lazy(() => import("@/pages/BlogPostDynamic"));
const Contact = lazy(() => import("@/pages/Contact"));
const DigitalMarketing = lazy(() => import("@/pages/DigitalMarketing"));
const SEOServices = lazy(() => import("@/pages/SEOServices"));
const PaidAdvertising = lazy(() => import("@/pages/PaidAdvertising"));
const ContentStrategy = lazy(() => import("@/pages/ContentStrategy"));
const WebDevelopment = lazy(() => import("@/pages/WebDevelopment"));
const WordPressShopify = lazy(() => import("@/pages/WordPressShopify"));
const CustomApps = lazy(() => import("@/pages/CustomApps"));
const EcommerceSolutions = lazy(() => import("@/pages/EcommerceSolutions"));
const AppDevelopment = lazy(() => import("@/pages/AppDevelopment"));
const AndroidIos = lazy(() => import("@/pages/AndroidIos"));
const HybridApps = lazy(() => import("@/pages/HybridApps"));
const BusinessSoftware = lazy(() => import("@/pages/BusinessSoftware"));
const DesktopSoftware = lazy(() => import("@/pages/DesktopSoftware"));
const SaasApplication = lazy(() => import("@/pages/SaasApplication"));
const CustomBusinessSoftware = lazy(() => import("@/pages/CustomBusinessSoftware"));
const AiServices = lazy(() => import("@/pages/AiServices"));
const AiInfluencer = lazy(() => import("@/pages/AiInfluencer"));
const AiModelPhotoshoot = lazy(() => import("@/pages/AiModelPhotoshoot"));
const AiChatbot = lazy(() => import("@/pages/AiChatbot"));
const AiContentCreation = lazy(() => import("@/pages/AiContentCreation"));
const AiAutomation = lazy(() => import("@/pages/AiAutomation"));
const SocialMedia = lazy(() => import("@/pages/SocialMedia"));
const SocialMediaPlatformManagement = lazy(() => import("@/pages/SocialMediaPlatformManagement"));
const SocialMediaContentCreation = lazy(() => import("@/pages/SocialMediaContentCreation"));
const SocialMediaCommunityEngagement = lazy(() => import("@/pages/SocialMediaCommunityEngagement"));
const DesignVideo = lazy(() => import("@/pages/DesignVideo"));
const LogoBranding = lazy(() => import("@/pages/LogoBranding"));
const MotionGraphics = lazy(() => import("@/pages/MotionGraphics"));
const VideoEditing = lazy(() => import("@/pages/VideoEditing"));
const NotFound = lazy(() => import("@/pages/not-found"));

const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin"));
const AdminGuard = lazy(() => import("@/pages/admin/AdminGuard"));
const AdminLayout = lazy(() => import("@/pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminBlogs = lazy(() => import("@/pages/admin/AdminBlogs"));
const AdminBlogEditor = lazy(() => import("@/pages/admin/AdminBlogEditor"));
const AdminSEO = lazy(() => import("@/pages/admin/AdminSEO"));
const AdminContacts = lazy(() => import("@/pages/admin/AdminContacts"));

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function AdminLoader() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
      <div className="flex gap-2">
        {[0, 150, 300].map((d) => (
          <div key={d} className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: `${d}ms` }} />
        ))}
      </div>
    </div>
  );
}

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

function WithAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<AdminLoader />}>
      <AdminGuard>
        <AdminLayout>
          {children}
        </AdminLayout>
      </AdminGuard>
    </Suspense>
  );
}

function AdminRoutes() {
  return (
    <Switch>
      <Route path="/admin/login">
        <Suspense fallback={<AdminLoader />}>
          <AdminLogin />
        </Suspense>
      </Route>
      <Route path="/admin/blogs/new">
        <WithAdminLayout><AdminBlogEditor /></WithAdminLayout>
      </Route>
      <Route path="/admin/blogs/edit/:id">
        <WithAdminLayout><AdminBlogEditor /></WithAdminLayout>
      </Route>
      <Route path="/admin/blogs">
        <WithAdminLayout><AdminBlogs /></WithAdminLayout>
      </Route>
      <Route path="/admin/seo">
        <WithAdminLayout><AdminSEO /></WithAdminLayout>
      </Route>
      <Route path="/admin/contacts">
        <WithAdminLayout><AdminContacts /></WithAdminLayout>
      </Route>
      <Route path="/admin">
        <WithAdminLayout><AdminDashboard /></WithAdminLayout>
      </Route>
    </Switch>
  );
}

function PublicRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/services/digital-marketing" component={DigitalMarketing} />
      <Route path="/services/digital-marketing/seo" component={SEOServices} />
      <Route path="/services/digital-marketing/paid-advertising" component={PaidAdvertising} />
      <Route path="/services/digital-marketing/content-strategy" component={ContentStrategy} />
      <Route path="/services/web-development" component={WebDevelopment} />
      <Route path="/services/web-development/wordpress-shopify" component={WordPressShopify} />
      <Route path="/services/web-development/custom-apps" component={CustomApps} />
      <Route path="/services/web-development/ecommerce-solutions" component={EcommerceSolutions} />
      <Route path="/services/app-development" component={AppDevelopment} />
      <Route path="/services/app-development/android-ios" component={AndroidIos} />
      <Route path="/services/app-development/hybrid-apps" component={HybridApps} />
      <Route path="/services/business-software" component={BusinessSoftware} />
      <Route path="/services/business-software/desktop-software" component={DesktopSoftware} />
      <Route path="/services/business-software/saas-application" component={SaasApplication} />
      <Route path="/services/business-software/custom-business-software" component={CustomBusinessSoftware} />
      <Route path="/services/ai-services" component={AiServices} />
      <Route path="/services/ai-services/ai-influencer" component={AiInfluencer} />
      <Route path="/services/ai-services/ai-model-photoshoot" component={AiModelPhotoshoot} />
      <Route path="/services/ai-services/ai-chatbot" component={AiChatbot} />
      <Route path="/services/ai-services/ai-content-creation" component={AiContentCreation} />
      <Route path="/services/ai-services/ai-automation" component={AiAutomation} />
      <Route path="/services/social-media" component={SocialMedia} />
      <Route path="/services/social-media/platform-management" component={SocialMediaPlatformManagement} />
      <Route path="/services/social-media/content-creation" component={SocialMediaContentCreation} />
      <Route path="/services/social-media/community-engagement" component={SocialMediaCommunityEngagement} />
      <Route path="/services/design-video" component={DesignVideo} />
      <Route path="/services/design-video/logo-branding" component={LogoBranding} />
      <Route path="/services/design-video/motion-graphics" component={MotionGraphics} />
      <Route path="/services/design-video/video-editing" component={VideoEditing} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/about" component={About} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/why-every-business-needs-professional-website-2026" component={BlogPost1} />
      <Route path="/blog/what-is-digital-marketing-why-important-for-businesses" component={BlogPost2} />
      <Route path="/blog/how-artificial-intelligence-transforming-modern-businesses" component={BlogPost3} />
      <Route path="/blog/top-benefits-social-media-marketing-small-businesses" component={BlogPost4} />
      <Route path="/blog/why-branding-is-important-for-business-success" component={BlogPost5} />
      <Route path="/blog/future-of-ai-automation-in-business-operations" component={BlogPost6} />
      <Route path="/blog/how-professional-video-content-helps-businesses-grow" component={BlogPost7} />
      <Route path="/blog/:slug" component={BlogPostDynamic} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/admin");

  if (isAdmin) {
    return <AdminRoutes />;
  }

  return (
    <>
      <Preloader />
      <JsonLd />
      <CustomCursor />
      <ScrollToTop />
      <SmoothScroll>
        <div className="min-h-screen bg-background flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <PublicRoutes />
            </Suspense>
          </main>
          <Footer />
          <Suspense fallback={null}>
            <ChatBot />
          </Suspense>
        </div>
      </SmoothScroll>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
