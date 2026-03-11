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
import { Edit, X, Check } from "lucide-react";
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

const seoFormSchema = z.object({
  pageTitle: z.string().min(1, "Page title is required"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
});

type SeoForm = z.infer<typeof seoFormSchema>;

function SeoEditModal({ page, existing, onClose }: { page: typeof ALL_PAGES[0]; existing?: SeoSetting; onClose: () => void }) {
  const { toast } = useToast();

  const form = useForm<SeoForm>({
    resolver: zodResolver(seoFormSchema),
    defaultValues: {
      pageTitle: existing?.pageTitle || page.label,
      metaTitle: existing?.metaTitle || "",
      metaDescription: existing?.metaDescription || "",
      metaKeywords: existing?.metaKeywords || "",
    },
  });

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-[#0F172A] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-white font-bold text-lg">{page.label}</h2>
            <p className="text-white/40 text-xs mt-0.5">{page.path}</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
            <FormField control={form.control} name="pageTitle" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/70">Page Title *</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white/5 border-white/10 text-white placeholder:text-white/20" data-testid="input-page-title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="metaTitle" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/70">Meta Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Title shown in Google results..." className="bg-white/5 border-white/10 text-white placeholder:text-white/20" data-testid="input-seo-meta-title" />
                </FormControl>
                <p className="text-white/30 text-xs">Recommended: 50–60 characters</p>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="metaDescription" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/70">Meta Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Description shown below title in Google..." rows={3} className="bg-white/5 border-white/10 text-white placeholder:text-white/20 resize-none" data-testid="input-seo-meta-desc" />
                </FormControl>
                <p className="text-white/30 text-xs">Recommended: 140–160 characters</p>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="metaKeywords" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/70">Meta Keywords</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="keyword1, keyword2, keyword3" className="bg-white/5 border-white/10 text-white placeholder:text-white/20" data-testid="input-seo-keywords" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="flex gap-3 pt-2">
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
  );
}

export default function AdminSEO() {
  const [editingPage, setEditingPage] = useState<typeof ALL_PAGES[0] | null>(null);

  const { data: seoSettings = [] } = useQuery<SeoSetting[]>({
    queryKey: ["/api/admin/seo"],
  });

  const seoMap = Object.fromEntries(seoSettings.map(s => [s.pageSlug, s]));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">SEO Settings</h1>
        <p className="text-white/40 text-sm mt-1">Manage meta titles and descriptions for every page</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left px-6 py-4 text-white/40 text-xs font-medium uppercase tracking-wider">Page</th>
              <th className="text-left px-6 py-4 text-white/40 text-xs font-medium uppercase tracking-wider hidden md:table-cell">Meta Title</th>
              <th className="text-left px-6 py-4 text-white/40 text-xs font-medium uppercase tracking-wider hidden lg:table-cell">Status</th>
              <th className="text-right px-6 py-4 text-white/40 text-xs font-medium uppercase tracking-wider">Edit</th>
            </tr>
          </thead>
          <tbody>
            {ALL_PAGES.map((page) => {
              const existing = seoMap[page.slug];
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
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className={`text-xs px-2 py-1 rounded-full ${existing ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                      {existing ? "Configured" : "Default"}
                    </span>
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
