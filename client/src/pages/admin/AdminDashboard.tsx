import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { FileText, Mail, Search, Plus, ArrowRight } from "lucide-react";
import type { BlogPost, ContactSubmission } from "@shared/schema";

export default function AdminDashboard() {
  const { data: blogs = [] } = useQuery<BlogPost[]>({ queryKey: ["/api/admin/blogs"] });
  const { data: contacts = [] } = useQuery<ContactSubmission[]>({ queryKey: ["/api/admin/contacts"] });

  const stats = [
    { label: "Total Blog Posts", value: blogs.length, icon: FileText, href: "/admin/blogs", color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Contact Messages", value: contacts.length, icon: Mail, href: "/admin/contacts", color: "text-cyan-400", bg: "bg-cyan-500/10" },
  ];

  const recentContacts = contacts.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">Welcome back, Zeeshan</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map(({ label, value, icon: Icon, href, color, bg }) => (
          <Link key={label} href={href}>
            <a className="block bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/40 text-sm">{label}</p>
                  <p className="text-3xl font-bold text-white mt-1">{value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold">Quick Actions</h2>
          </div>
          <div className="space-y-3">
            <Link href="/admin/blogs/new">
              <a className="flex items-center gap-3 px-4 py-3 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-300 hover:bg-blue-600/30 transition-all text-sm" data-testid="link-new-blog">
                <Plus className="w-4 h-4" />
                Write New Blog Post
              </a>
            </Link>
            <Link href="/admin/seo">
              <a className="flex items-center gap-3 px-4 py-3 bg-cyan-600/20 border border-cyan-500/30 rounded-xl text-cyan-300 hover:bg-cyan-600/30 transition-all text-sm" data-testid="link-seo">
                <Search className="w-4 h-4" />
                Update SEO Settings
              </a>
            </Link>
            <Link href="/admin/contacts">
              <a className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:bg-white/10 transition-all text-sm" data-testid="link-contacts">
                <Mail className="w-4 h-4" />
                View Contact Messages
              </a>
            </Link>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold">Recent Messages</h2>
            <Link href="/admin/contacts">
              <a className="text-xs text-white/40 hover:text-white flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></a>
            </Link>
          </div>
          {recentContacts.length === 0 ? (
            <p className="text-white/30 text-sm text-center py-6">No messages yet</p>
          ) : (
            <div className="space-y-3">
              {recentContacts.map((c) => (
                <div key={c.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-white text-sm font-medium">{c.name}</p>
                    <p className="text-white/40 text-xs">{c.service || "General Inquiry"}</p>
                  </div>
                  <p className="text-white/30 text-xs">
                    {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ""}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
