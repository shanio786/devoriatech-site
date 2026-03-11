import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function AdminBlogs() {
  const { toast } = useToast();

  const { data: blogs = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/blogs"],
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admin/blogs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blogs"] });
      toast({ title: "Blog post deleted" });
    },
    onError: () => toast({ title: "Failed to delete", variant: "destructive" }),
  });

  const togglePublishMutation = useMutation({
    mutationFn: ({ id, published }: { id: string; published: boolean }) =>
      apiRequest("PUT", `/api/admin/blogs/${id}`, { published }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blogs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blogs"] });
    },
    onError: () => toast({ title: "Failed to update", variant: "destructive" }),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-white/40 text-sm mt-1">{blogs.length} posts total</p>
        </div>
        <Link href="/admin/blogs/new">
          <a>
            <Button className="bg-blue-600 hover:bg-blue-500 text-white gap-2" data-testid="button-new-blog">
              <Plus className="w-4 h-4" />
              New Post
            </Button>
          </a>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex gap-2">
            {[0, 150, 300].map((d) => (
              <div key={d} className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: `${d}ms` }} />
            ))}
          </div>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-white/40">No blog posts yet.</p>
          <Link href="/admin/blogs/new">
            <a className="mt-3 inline-block text-blue-400 hover:text-blue-300 text-sm">Create your first post →</a>
          </Link>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 text-white/40 text-xs font-medium uppercase tracking-wider">Title</th>
                <th className="text-left px-6 py-4 text-white/40 text-xs font-medium uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="text-left px-6 py-4 text-white/40 text-xs font-medium uppercase tracking-wider hidden lg:table-cell">Date</th>
                <th className="text-left px-6 py-4 text-white/40 text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-4 text-white/40 text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-white text-sm font-medium line-clamp-1">{blog.title}</p>
                    <p className="text-white/30 text-xs mt-0.5 line-clamp-1">/{blog.slug}</p>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400">{blog.category}</span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <p className="text-white/40 text-xs">
                      {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : "—"}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => togglePublishMutation.mutate({ id: blog.id, published: !blog.published })}
                      className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full transition-all ${
                        blog.published
                          ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                          : "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
                      }`}
                      data-testid={`toggle-publish-${blog.id}`}
                    >
                      {blog.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {blog.published ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/blogs/edit/${blog.id}`}>
                        <a>
                          <Button size="sm" variant="ghost" className="text-white/50 hover:text-white h-8 w-8 p-0" data-testid={`edit-blog-${blog.id}`}>
                            <Edit className="w-3.5 h-3.5" />
                          </Button>
                        </a>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-400/60 hover:text-red-400 h-8 w-8 p-0"
                        onClick={() => {
                          if (confirm("Delete this blog post?")) deleteMutation.mutate(blog.id);
                        }}
                        data-testid={`delete-blog-${blog.id}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
