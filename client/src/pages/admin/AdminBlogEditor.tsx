import { useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers and hyphens"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
  heroImage: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  published: z.boolean().default(true),
});

type BlogForm = z.infer<typeof blogSchema>;

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function AdminBlogEditor() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const isEditing = Boolean(id);

  const { data: blog, isLoading } = useQuery<BlogPost>({
    queryKey: ["/api/admin/blogs", id],
    queryFn: () => fetch(`/api/admin/blogs`).then(r => r.json()).then((blogs: BlogPost[]) => blogs.find(b => b.id === id)!),
    enabled: isEditing,
  });

  const form = useForm<BlogForm>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "", slug: "", excerpt: "", content: "", category: "",
      heroImage: "", metaTitle: "", metaDescription: "", metaKeywords: "", published: true,
    },
  });

  useEffect(() => {
    if (blog) {
      form.reset({
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        category: blog.category,
        heroImage: blog.heroImage || "",
        metaTitle: blog.metaTitle || "",
        metaDescription: blog.metaDescription || "",
        metaKeywords: blog.metaKeywords || "",
        published: blog.published,
      });
    }
  }, [blog]);

  const titleValue = form.watch("title");
  useEffect(() => {
    if (!isEditing && titleValue) {
      form.setValue("slug", slugify(titleValue), { shouldDirty: true });
    }
  }, [titleValue, isEditing]);

  const createMutation = useMutation({
    mutationFn: (data: BlogForm) => apiRequest("POST", "/api/admin/blogs", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blogs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blogs"] });
      toast({ title: "Blog post created!" });
      navigate("/admin/blogs");
    },
    onError: (e: any) => toast({ title: "Failed to create", description: e.message, variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: (data: BlogForm) => apiRequest("PUT", `/api/admin/blogs/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blogs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blogs"] });
      toast({ title: "Blog post updated!" });
      navigate("/admin/blogs");
    },
    onError: (e: any) => toast({ title: "Failed to update", description: e.message, variant: "destructive" }),
  });

  const onSubmit = (data: BlogForm) => {
    if (isEditing) updateMutation.mutate(data);
    else createMutation.mutate(data);
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  if (isEditing && isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex gap-2">
          {[0, 150, 300].map((d) => (
            <div key={d} className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: `${d}ms` }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/blogs">
          <a className="text-white/40 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </a>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{isEditing ? "Edit Blog Post" : "New Blog Post"}</h1>
          <p className="text-white/40 text-sm mt-1">{isEditing ? "Update existing post" : "Create a new blog article"}</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider">Content</h2>

            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/70">Title *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Blog post title..." className="bg-white/5 border-white/10 text-white placeholder:text-white/20" data-testid="input-title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField control={form.control} name="slug" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/70">Slug *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="url-slug" className="bg-white/5 border-white/10 text-white placeholder:text-white/20 font-mono text-sm" data-testid="input-slug" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/70">Category *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. Web Development" className="bg-white/5 border-white/10 text-white placeholder:text-white/20" data-testid="input-category" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="excerpt" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/70">Excerpt *</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Short summary shown in blog listing..." rows={2} className="bg-white/5 border-white/10 text-white placeholder:text-white/20 resize-none" data-testid="input-excerpt" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="content" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/70">Content (HTML) *</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="<h2>Section Title</h2><p>Your content here...</p>" rows={16} className="bg-white/5 border-white/10 text-white placeholder:text-white/20 resize-y font-mono text-sm" data-testid="input-content" />
                </FormControl>
                <p className="text-white/30 text-xs">You can use HTML tags: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;em&gt;</p>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="heroImage" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/70">Hero Image URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://... or /assets/image.webp" className="bg-white/5 border-white/10 text-white placeholder:text-white/20" data-testid="input-hero-image" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider">SEO Settings</h2>

            <FormField control={form.control} name="metaTitle" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/70">Meta Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="SEO title (leave empty to use post title)" className="bg-white/5 border-white/10 text-white placeholder:text-white/20" data-testid="input-meta-title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="metaDescription" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/70">Meta Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="155 character description for Google..." rows={3} className="bg-white/5 border-white/10 text-white placeholder:text-white/20 resize-none" data-testid="input-meta-desc" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="metaKeywords" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/70">Meta Keywords</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="keyword1, keyword2, keyword3" className="bg-white/5 border-white/10 text-white placeholder:text-white/20" data-testid="input-meta-keywords" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <FormField control={form.control} name="published" render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <div>
                  <FormLabel className="text-white font-medium">Publish Post</FormLabel>
                  <p className="text-white/40 text-sm">Make this post visible on the website</p>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} data-testid="toggle-published" />
                </FormControl>
              </FormItem>
            )} />
          </div>

          <div className="flex gap-3 pb-6">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white gap-2" disabled={isPending} data-testid="button-save">
              <Save className="w-4 h-4" />
              {isPending ? "Saving..." : isEditing ? "Save Changes" : "Create Post"}
            </Button>
            <Link href="/admin/blogs">
              <a>
                <Button type="button" variant="ghost" className="text-white/50 hover:text-white">Cancel</Button>
              </a>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
