import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Edit, X, Check, Globe, Share2, Twitter, Search, AlertCircle, CheckCircle2, Info, Eye, EyeOff } from "lucide-react";
import type { SeoSetting } from "@shared/schema";

const ALL_PAGES = [
  { slug: "home", label: "Home", path: "/" },
  { slug: "services", label: "Services", path: "/services" },
  { slug: "digital-marketing", label: "Digital Marketing", path: "/services/digital-marketing" },
  { slug: "seo-services", label: "SEO Services", path: "/services/seo" },
  { slug: "paid-advertising", label: "Paid Advertising", path: "/services/paid-advertising" },
  { slug: "content-strategy", label: "Content Strategy", path: "/services/content-strategy" },
  { slug: "web-development", label: "Web Development", path: "/services/web-development" },
  { slug: "wordpress-shopify", label: "WordPress & Shopify", path: "/services/web-development/wordpress-shopify" },
  { slug: "custom-apps", label: "Custom Apps", path: "/services/web-development/custom-apps" },
  { slug: "ecommerce-solutions", label: "E-Commerce Solutions", path: "/services/web-development/ecommerce-solutions" },
  { slug: "app-development", label: "App Development", path: "/services/app-development" },
  { slug: "android-ios", label: "Android & iOS", path: "/services/app-development/android-ios" },
  { slug: "hybrid-apps", label: "Hybrid Apps", path: "/services/app-development/hybrid-apps" },
  { slug: "business-software", label: "Business Software", path: "/services/business-software" },
  { slug: "desktop-software", label: "Desktop Software", path: "/services/business-software/desktop-software" },
  { slug: "saas-application", label: "SaaS Application", path: "/services/business-software/saas-application" },
  { slug: "custom-business-software", label: "Custom Business Software", path: "/services/business-software/custom-business-software" },
  { slug: "ai-services", label: "AI Services", path: "/services/ai-services" },
  { slug: "ai-influencer", label: "AI Influencer Creation", path: "/services/ai-services/ai-influencer" },
  { slug: "ai-model-photoshoot", label: "AI Model Photoshoot", path: "/services/ai-services/ai-model-photoshoot" },
  { slug: "ai-chatbot", label: "AI Chatbot Development", path: "/services/ai-services/ai-chatbot" },
  { slug: "ai-content-creation", label: "AI Content Creation", path: "/services/ai-services/ai-content-creation" },
  { slug: "ai-automation", label: "AI Automation", path: "/services/ai-services/ai-automation" },
  { slug: "social-media", label: "Social Media", path: "/services/social-media" },
  { slug: "platform-management", label: "Platform Management", path: "/services/social-media/platform-management" },
  { slug: "social-content-creation", label: "Social Content Creation", path: "/services/social-media/content-creation" },
  { slug: "community-engagement", label: "Community Engagement", path: "/services/social-media/community-engagement" },
  { slug: "design-video", label: "Design & Video", path: "/services/design-video" },
  { slug: "logo-branding", label: "Logo & Branding", path: "/services/design-video/logo-branding" },
  { slug: "motion-graphics", label: "Motion Graphics", path: "/services/design-video/motion-graphics" },
  { slug: "video-editing", label: "Video Editing", path: "/services/design-video/video-editing" },
  { slug: "portfolio", label: "Portfolio", path: "/portfolio" },
  { slug: "about", label: "About", path: "/about" },
  { slug: "blog", label: "Blog", path: "/blog" },
  { slug: "contact", label: "Contact", path: "/contact" },
];

const SCHEMA_TYPES = [
  "WebPage", "AboutPage", "ContactPage", "ServicePage", "BlogPosting",
  "Organization", "LocalBusiness", "Product", "FAQPage",
];

const seoFormSchema = z.object({
  pageTitle: z.string().min(1, "Page title is required"),
  focusKeyword: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  canonicalUrl: z.string().optional(),
  noIndex: z.boolean().optional(),
  schemaType: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
});

type SeoForm = z.infer<typeof seoFormSchema>;

function CharCounter({ value, min, max }: { value: string; min: number; max: number }) {
  const len = (value || "").length;
  const good = len >= min && len <= max;
  const over = len > max;
  return (
    <span className={`text-xs ${over ? "text-red-400" : good ? "text-green-400" : "text-white/30"}`}>
      {len}/{max}
    </span>
  );
}

function SeoScore({ title, description, keyword }: { title: string; description: string; keyword: string }) {
  const checks = [
    { label: "Meta title set", pass: (title || "").length > 0 },
    { label: "Title length (50–60 chars)", pass: (title || "").length >= 50 && (title || "").length <= 60 },
    { label: "Meta description set", pass: (description || "").length > 0 },
    { label: "Description length (140–160 chars)", pass: (description || "").length >= 140 && (description || "").length <= 160 },
    { label: "Focus keyword set", pass: (keyword || "").length > 0 },
    { label: "Keyword in title", pass: keyword ? (title || "").toLowerCase().includes(keyword.toLowerCase()) : false },
    { label: "Keyword in description", pass: keyword ? (description || "").toLowerCase().includes(keyword.toLowerCase()) : false },
  ];
  const passed = checks.filter(c => c.pass).length;
  const score = Math.round((passed / checks.length) * 100);
  const color = score >= 80 ? "text-green-400" : score >= 50 ? "text-yellow-400" : "text-red-400";
  const barColor = score >= 80 ? "bg-green-500" : score >= 50 ? "bg-yellow-500" : "bg-red-500";
  const label = score >= 80 ? "Good" : score >= 50 ? "Needs Work" : "Poor";

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-white/70 text-sm font-medium flex items-center gap-2"><Search className="w-4 h-4" />SEO Score</span>
        <span className={`text-lg font-bold ${color}`}>{score}% <span className="text-sm font-normal">{label}</span></span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <div className={`${barColor} h-2 rounded-full transition-all`} style={{ width: `${score}%` }} />
      </div>
      <div className="grid grid-cols-1 gap-1.5 mt-2">
        {checks.map((c, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            {c.pass
              ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
              : <AlertCircle className="w-3.5 h-3.5 text-white/20 flex-shrink-0" />}
            <span className={c.pass ? "text-white/60" : "text-white/25"}>{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GooglePreview({ title, description, path }: { title: string; description: string; path: string }) {
  const displayTitle = title || "Page Title — Devoria Tech";
  const displayDesc = description || "Page description will appear here in Google search results.";
  const displayUrl = `devoriatech.com${path}`;
  return (
    <div className="bg-white rounded-xl p-4 space-y-1">
      <p className="text-xs text-green-700 truncate">{displayUrl}</p>
      <p className="text-blue-700 text-base font-medium leading-tight line-clamp-1 hover:underline cursor-pointer">
        {displayTitle.slice(0, 60)}
      </p>
      <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed">{displayDesc.slice(0, 160)}</p>
    </div>
  );
}

function SeoEditModal({ page, existing, onClose }: { page: typeof ALL_PAGES[0]; existing?: SeoSetting; onClose: () => void }) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"general" | "social" | "advanced">("general");

  const form = useForm<SeoForm>({
    resolver: zodResolver(seoFormSchema),
    defaultValues: {
      pageTitle: existing?.pageTitle || page.label,
      focusKeyword: existing?.focusKeyword || "",
      metaTitle: existing?.metaTitle || "",
      metaDescription: existing?.metaDescription || "",
      metaKeywords: existing?.metaKeywords || "",
      canonicalUrl: existing?.canonicalUrl || "",
      noIndex: existing?.noIndex ?? false,
      schemaType: existing?.schemaType || "WebPage",
      ogTitle: existing?.ogTitle || "",
      ogDescription: existing?.ogDescription || "",
      ogImage: existing?.ogImage || "",
      twitterTitle: existing?.twitterTitle || "",
      twitterDescription: existing?.twitterDescription || "",
    },
  });

  const watchedTitle = form.watch("metaTitle") || "";
  const watchedDesc = form.watch("metaDescription") || "";
  const watchedKeyword = form.watch("focusKeyword") || "";
  const watchedNoIndex = form.watch("noIndex");

  const mutation = useMutation({
    mutationFn: (data: SeoForm) =>
      apiRequest("PUT", `/api/admin/seo/${page.slug}`, { ...data, pageSlug: page.slug }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo"] });
      queryClient.invalidateQueries({ queryKey: ["/api/seo", page.slug] });
      toast({ title: "SEO settings saved!" });
      onClose();
    },
    onError: () => toast({ title: "Failed to save", variant: "destructive" }),
  });

  const tabs = [
    { id: "general", label: "General", icon: Search },
    { id: "social", label: "Social", icon: Share2 },
    { id: "advanced", label: "Advanced", icon: Globe },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-[#0F172A] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-hidden z-10 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <h2 className="text-white font-bold text-lg">{page.label}</h2>
            <p className="text-white/40 text-xs mt-0.5">{page.path}</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b border-white/10">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors ${
                activeTab === id ? "text-blue-400 border-b-2 border-blue-400" : "text-white/40 hover:text-white"
              }`}
              data-testid={`tab-${id}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="overflow-y-auto flex-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit((d) => mutation.mutate(d))} className="p-6 space-y-5">
              {activeTab === "general" && (
                <>
                  <div className="mb-1">
                    <p className="text-white/40 text-xs mb-2">Google Preview</p>
                    <GooglePreview title={watchedTitle} description={watchedDesc} path={page.path} />
                  </div>

                  <SeoScore title={watchedTitle} description={watchedDesc} keyword={watchedKeyword} />

                  <FormField control={form.control} name="focusKeyword" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Focus Keyword</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. web development Pakistan" className="bg-white/5 border-white/10 text-white placeholder:text-white/20" data-testid="input-focus-keyword" />
                      </FormControl>
                      <p className="text-white/30 text-xs">The main keyword you want this page to rank for</p>
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="metaTitle" render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-white/70">Meta Title</FormLabel>
                        <CharCounter value={field.value || ""} min={50} max={60} />
                      </div>
                      <FormControl>
                        <Input {...field} placeholder="Title shown in Google — include focus keyword" className="bg-white/5 border-white/10 text-white placeholder:text-white/20" data-testid="input-seo-meta-title" />
                      </FormControl>
                      <p className="text-white/30 text-xs">Ideal: 50–60 characters</p>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="metaDescription" render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-white/70">Meta Description</FormLabel>
                        <CharCounter value={field.value || ""} min={140} max={160} />
                      </div>
                      <FormControl>
                        <Textarea {...field} placeholder="Compelling description shown under title in Google — include focus keyword" rows={3} className="bg-white/5 border-white/10 text-white placeholder:text-white/20 resize-none" data-testid="input-seo-meta-desc" />
                      </FormControl>
                      <p className="text-white/30 text-xs">Ideal: 140–160 characters</p>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="metaKeywords" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Meta Keywords</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="keyword1, keyword2, keyword3" className="bg-white/5 border-white/10 text-white placeholder:text-white/20" data-testid="input-seo-keywords" />
                      </FormControl>
                      <p className="text-white/30 text-xs">Comma-separated keywords (secondary ranking signals)</p>
                    </FormItem>
                  )} />
                </>
              )}

              {activeTab === "social" && (
                <>
                  <div className="space-y-1 mb-2">
                    <p className="text-white font-medium text-sm flex items-center gap-2"><Share2 className="w-4 h-4 text-blue-400" />Facebook / Open Graph</p>
                    <p className="text-white/30 text-xs">Controls how this page looks when shared on Facebook, WhatsApp, LinkedIn</p>
                  </div>

                  <FormField control={form.control} name="ogTitle" render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-white/70">OG Title</FormLabel>
                        <CharCounter value={field.value || ""} min={40} max={60} />
                      </div>
                      <FormControl>
                        <Input {...field} placeholder="Leave empty to use meta title" className="bg-white/5 border-white/10 text-white placeholder:text-white/20" data-testid="input-og-title" />
                      </FormControl>
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="ogDescription" render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-white/70">OG Description</FormLabel>
                        <CharCounter value={field.value || ""} min={100} max={200} />
                      </div>
                      <FormControl>
                        <Textarea {...field} placeholder="Leave empty to use meta description" rows={2} className="bg-white/5 border-white/10 text-white placeholder:text-white/20 resize-none" data-testid="input-og-desc" />
                      </FormControl>
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="ogImage" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">OG Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://devoriatech.com/assets/og-image.jpg" className="bg-white/5 border-white/10 text-white placeholder:text-white/20" data-testid="input-og-image" />
                      </FormControl>
                      <p className="text-white/30 text-xs">Recommended: 1200×630px. Use absolute URL.</p>
                    </FormItem>
                  )} />

                  <div className="border-t border-white/10 pt-4 space-y-1">
                    <p className="text-white font-medium text-sm flex items-center gap-2"><Twitter className="w-4 h-4 text-sky-400" />Twitter / X Card</p>
                    <p className="text-white/30 text-xs">Controls how this page looks when shared on Twitter/X</p>
                  </div>

                  <FormField control={form.control} name="twitterTitle" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Twitter Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Leave empty to use OG title" className="bg-white/5 border-white/10 text-white placeholder:text-white/20" data-testid="input-twitter-title" />
                      </FormControl>
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="twitterDescription" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Twitter Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Leave empty to use OG description" rows={2} className="bg-white/5 border-white/10 text-white placeholder:text-white/20 resize-none" data-testid="input-twitter-desc" />
                      </FormControl>
                    </FormItem>
                  )} />
                </>
              )}

              {activeTab === "advanced" && (
                <>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex gap-2">
                    <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-amber-300/80 text-xs">These are advanced settings. Only change if you know what you're doing.</p>
                  </div>

                  <FormField control={form.control} name="noIndex" render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          {field.value ? <EyeOff className="w-5 h-5 text-red-400" /> : <Eye className="w-5 h-5 text-green-400" />}
                          <div>
                            <p className="text-white text-sm font-medium">Block Search Engines</p>
                            <p className="text-white/30 text-xs">{field.value ? "Page will NOT appear in Google (noindex)" : "Page is indexable by Google"}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => field.onChange(!field.value)}
                          className={`relative w-11 h-6 rounded-full transition-colors ${field.value ? "bg-red-500" : "bg-white/20"}`}
                          data-testid="toggle-noindex"
                        >
                          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${field.value ? "left-6" : "left-1"}`} />
                        </button>
                      </div>
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="canonicalUrl" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Canonical URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://devoriatech.com/page — leave empty for default" className="bg-white/5 border-white/10 text-white placeholder:text-white/20" data-testid="input-canonical" />
                      </FormControl>
                      <p className="text-white/30 text-xs">Prevents duplicate content issues. Usually leave empty.</p>
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="schemaType" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Schema Type (Structured Data)</FormLabel>
                      <FormControl>
                        <select {...field} className="w-full bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm" data-testid="select-schema-type">
                          {SCHEMA_TYPES.map(t => <option key={t} value={t} className="bg-[#0F172A]">{t}</option>)}
                        </select>
                      </FormControl>
                      <p className="text-white/30 text-xs">Helps Google understand the page content type</p>
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="pageTitle" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Internal Page Label</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-white/5 border-white/10 text-white" data-testid="input-page-title" />
                      </FormControl>
                      <p className="text-white/30 text-xs">Used internally in admin panel only</p>
                      <FormMessage />
                    </FormItem>
                  )} />
                </>
              )}

              <div className="flex gap-3 pt-2 border-t border-white/10">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white gap-2 flex-1" disabled={mutation.isPending} data-testid="button-save-seo">
                  <Check className="w-4 h-4" />
                  {mutation.isPending ? "Saving..." : "Save SEO Settings"}
                </Button>
                <Button type="button" variant="ghost" className="text-white/50 hover:text-white" onClick={onClose}>Cancel</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default function AdminSEO() {
  const [editingPage, setEditingPage] = useState<typeof ALL_PAGES[0] | null>(null);
  const [search, setSearch] = useState("");

  const { data: seoSettings = [] } = useQuery<SeoSetting[]>({
    queryKey: ["/api/admin/seo"],
  });

  const seoMap = Object.fromEntries(seoSettings.map(s => [s.pageSlug, s]));
  const configured = seoSettings.length;
  const total = ALL_PAGES.length;

  const filtered = ALL_PAGES.filter(p =>
    p.label.toLowerCase().includes(search.toLowerCase()) ||
    p.path.toLowerCase().includes(search.toLowerCase())
  );

  function getPageScore(slug: string) {
    const s = seoMap[slug];
    if (!s) return 0;
    let score = 0;
    if (s.metaTitle && s.metaTitle.length >= 50 && s.metaTitle.length <= 60) score += 2;
    else if (s.metaTitle) score += 1;
    if (s.metaDescription && s.metaDescription.length >= 140 && s.metaDescription.length <= 160) score += 2;
    else if (s.metaDescription) score += 1;
    if (s.focusKeyword) score += 1;
    if (s.focusKeyword && s.metaTitle?.toLowerCase().includes(s.focusKeyword.toLowerCase())) score += 1;
    return Math.round((score / 6) * 100);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-white">SEO Settings</h1>
          <p className="text-white/40 text-sm mt-1">Rank Math-style SEO management for every page</p>
        </div>
        <div className="flex gap-3 text-center">
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2">
            <p className="text-2xl font-bold text-white">{configured}</p>
            <p className="text-white/30 text-xs">Configured</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2">
            <p className="text-2xl font-bold text-yellow-400">{total - configured}</p>
            <p className="text-white/30 text-xs">Default</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2">
            <p className="text-2xl font-bold text-blue-400">{total}</p>
            <p className="text-white/30 text-xs">Total Pages</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 flex gap-2">
        <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-blue-300/80 text-xs">Admin pages are automatically blocked from Google (noindex). Only public pages are indexed.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search pages..."
          className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-blue-500"
          data-testid="input-search-pages"
        />
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left px-6 py-4 text-white/40 text-xs font-medium uppercase tracking-wider">Page</th>
              <th className="text-left px-6 py-4 text-white/40 text-xs font-medium uppercase tracking-wider hidden md:table-cell">Meta Title</th>
              <th className="text-left px-6 py-4 text-white/40 text-xs font-medium uppercase tracking-wider hidden lg:table-cell">Score</th>
              <th className="text-left px-6 py-4 text-white/40 text-xs font-medium uppercase tracking-wider hidden lg:table-cell">Status</th>
              <th className="text-right px-6 py-4 text-white/40 text-xs font-medium uppercase tracking-wider">Edit</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((page) => {
              const existing = seoMap[page.slug];
              const score = getPageScore(page.slug);
              const scoreColor = score >= 80 ? "text-green-400" : score >= 50 ? "text-yellow-400" : "text-red-400";
              return (
                <tr key={page.slug} className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-white text-sm font-medium">{page.label}</p>
                    <p className="text-white/30 text-xs mt-0.5">{page.path}</p>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <p className="text-white/50 text-xs line-clamp-1 max-w-xs">
                      {existing?.metaTitle || <span className="text-white/20 italic">Not set</span>}
                    </p>
                    {existing?.focusKeyword && (
                      <p className="text-blue-400/60 text-xs mt-0.5">🔑 {existing.focusKeyword}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    {existing ? (
                      <span className={`text-xs font-bold ${scoreColor}`}>{score}%</span>
                    ) : (
                      <span className="text-white/20 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs px-2 py-1 rounded-full ${existing ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                        {existing ? "Configured" : "Default"}
                      </span>
                      {existing?.noIndex && (
                        <span className="text-xs px-2 py-1 rounded-full bg-red-500/10 text-red-400">noindex</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white/40 hover:text-white gap-1.5 text-xs"
                      onClick={() => setEditingPage(page)}
                      data-testid={`edit-seo-${page.slug}`}
                    >
                      <Edit className="w-3.5 h-3.5" />
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {editingPage && (
        <SeoEditModal
          page={editingPage}
          existing={seoMap[editingPage.slug]}
          onClose={() => setEditingPage(null)}
        />
      )}
    </div>
  );
}
