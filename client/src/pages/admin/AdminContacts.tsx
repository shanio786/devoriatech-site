import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ChevronDown, ChevronUp, Mail, Phone, Building, Briefcase, DollarSign } from "lucide-react";
import type { ContactSubmission } from "@shared/schema";

export default function AdminContacts() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: contacts = [], isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/admin/contacts"],
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Contact Messages</h1>
        <p className="text-white/40 text-sm mt-1">{contacts.length} total submissions</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex gap-2">
            {[0, 150, 300].map((d) => (
              <div key={d} className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: `${d}ms` }} />
            ))}
          </div>
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-white/40">No contact submissions yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-all"
                onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}
                data-testid={`contact-row-${contact.id}`}
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 text-sm font-bold">{contact.name[0].toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{contact.name}</p>
                    <p className="text-white/40 text-xs mt-0.5">{contact.email}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-3 ml-4">
                    {contact.service && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400">{contact.service}</span>
                    )}
                    {contact.budget && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400">{contact.budget}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/30 text-xs hidden md:block">
                    {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                  </span>
                  {expandedId === contact.id ? (
                    <ChevronUp className="w-4 h-4 text-white/30" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-white/30" />
                  )}
                </div>
              </button>

              {expandedId === contact.id && (
                <div className="px-6 pb-6 border-t border-white/10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-5">
                    {contact.email && (
                      <div className="flex items-center gap-2.5 text-sm">
                        <Mail className="w-4 h-4 text-white/30" />
                        <a href={`mailto:${contact.email}`} className="text-blue-400 hover:underline">{contact.email}</a>
                      </div>
                    )}
                    {contact.phone && (
                      <div className="flex items-center gap-2.5 text-sm">
                        <Phone className="w-4 h-4 text-white/30" />
                        <span className="text-white/70">{contact.phone}</span>
                      </div>
                    )}
                    {contact.company && (
                      <div className="flex items-center gap-2.5 text-sm">
                        <Building className="w-4 h-4 text-white/30" />
                        <span className="text-white/70">{contact.company}</span>
                      </div>
                    )}
                    {contact.service && (
                      <div className="flex items-center gap-2.5 text-sm">
                        <Briefcase className="w-4 h-4 text-white/30" />
                        <span className="text-white/70">{contact.service}</span>
                      </div>
                    )}
                    {contact.budget && (
                      <div className="flex items-center gap-2.5 text-sm">
                        <DollarSign className="w-4 h-4 text-white/30" />
                        <span className="text-white/70">{contact.budget}</span>
                      </div>
                    )}
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-2">Message</p>
                    <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">{contact.message}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
