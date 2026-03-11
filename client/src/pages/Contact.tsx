import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useSEO } from "@/hooks/use-seo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@/components/SplitText";
import MagneticButton from "@/components/MagneticButton";
import {
  Mail, Phone, Send, Clock, MessageCircle, Loader2,
} from "lucide-react";
import { WhatsAppIcon, FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/SocialIcons";

gsap.registerPlugin(ScrollTrigger);

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Please write at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

const serviceOptions = ["Web Development", "App Development", "Digital Marketing", "Social Media Management", "Graphic Design & Video", "SEO Services", "Other"];
const budgetOptions = ["Under $1,000", "$1,000 - $5,000", "$5,000 - $15,000", "$15,000 - $50,000", "$50,000+"];

const contactInfo = [
  { icon: Mail, label: "Email", value: "info@devoriatech.com" },
  { icon: Phone, label: "Call / WhatsApp", value: "+92 311 7597815" },
  { icon: Clock, label: "Hours", value: "Mon - Sat, 9AM - 6PM" },
];

const socials = [
  { icon: WhatsAppIcon, label: "WhatsApp", href: "https://wa.me/923117597815" },
  { icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/devoriatech/" },
  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/devoriatech/" },
  { icon: LinkedInIcon, label: "LinkedIn", href: "https://www.linkedin.com/company/devoria-tech" },
];

export default function Contact() {
  useSEO({ title: "Get in Touch – Free Consultation for Your Next Project | Devoria Tech", description: "Have a project in mind? Reach out for a free consultation. We respond within 24 hours and would love to hear about what you are building.", keywords: "contact Devoria Tech, free consultation, project quote, hire web developer, hire digital marketing agency, Lahore digital agency", canonical: "https://devoriatech.com/contact" });
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", company: "", service: "", budget: "", message: "" },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
      reset();
    },
    onError: () => {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    },
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".contact-fade").forEach((el, i) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: i * 0.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" } }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[13px] text-white placeholder:text-white/15 focus:outline-none focus:border-cyan-400/30 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(6,182,212,0.05)] transition-all duration-500 font-light";

  return (
    <div className="pt-28 pb-16 noise-bg">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400">Contact Us</span>
            <SplitText
              text="Let's Start a Project"
              as="h1"
              className="mt-4 text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight"
              data-testid="text-contact-title"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-5 text-sm text-white/30 max-w-lg leading-relaxed font-light"
            >
              Have an idea? Fill out the form below and we'll get back to you within 24 hours.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2 space-y-4">
              {contactInfo.map((info, i) => {
                const linkMap: Record<string, string> = {
                  "Email": "mailto:info@devoriatech.com",
                  "Call / WhatsApp": "tel:+923117597815",
                };
                const href = linkMap[info.label];
                const Wrapper = href ? "a" : "div";
                const wrapperProps = href ? { href, target: "_blank" as const, rel: "noopener noreferrer" } : {};
                return (
                  <Wrapper
                    key={info.label}
                    {...wrapperProps}
                    className="contact-fade flex items-start gap-4 p-5 rounded-xl glass-card block"
                    data-testid={`info-${info.label.toLowerCase()}`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center shrink-0">
                      <info.icon className="w-4 h-4 text-cyan-400/60" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/25 uppercase tracking-widest font-medium">{info.label}</p>
                      <p className="text-[13px] text-white font-medium mt-0.5">{info.value}</p>
                    </div>
                  </Wrapper>
                );
              })}

              <div className="contact-fade p-5 rounded-xl glass-card">
                <h4 className="text-[12px] font-semibold text-white mb-3 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-cyan-400/50" />
                  Connect With Us
                </h4>
                <div className="flex gap-3">
                  {socials.map((social) => (
                    <MagneticButton key={social.label} strength={0.3}>
                      <a
                        href={social.href}
                        className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-400/20 flex items-center justify-center text-white/30 hover:text-white transition-all duration-500"
                        data-testid={`link-contact-social-${social.label.toLowerCase()}`}
                      >
                        <social.icon className="w-4 h-4" />
                      </a>
                    </MagneticButton>
                  ))}
                </div>
              </div>
            </div>

            <div ref={formRef} className="lg:col-span-3 contact-fade">
              <form
                onSubmit={handleSubmit((data) => mutation.mutate(data))}
                className="p-7 sm:p-9 rounded-2xl glass-card space-y-5"
                data-testid="form-contact"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-white/30 mb-1.5 font-medium uppercase tracking-widest">Full Name *</label>
                    <input {...register("name")} className={inputClass} placeholder="Your name" data-testid="input-name" />
                    {errors.name && <p className="text-[11px] text-red-400/80 mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] text-white/30 mb-1.5 font-medium uppercase tracking-widest">Email *</label>
                    <input {...register("email")} type="email" className={inputClass} placeholder="your@email.com" data-testid="input-email" />
                    {errors.email && <p className="text-[11px] text-red-400/80 mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-white/30 mb-1.5 font-medium uppercase tracking-widest">Phone</label>
                    <input {...register("phone")} className={inputClass} placeholder="+92 xxx xxxxxxx" data-testid="input-phone" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-white/30 mb-1.5 font-medium uppercase tracking-widest">Company</label>
                    <input {...register("company")} className={inputClass} placeholder="Your company" data-testid="input-company" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-white/30 mb-1.5 font-medium uppercase tracking-widest">Service Needed</label>
                    <select {...register("service")} className={`${inputClass} appearance-none`} data-testid="select-service">
                      <option value="" className="bg-[#0a0f1e]">Select a service</option>
                      {serviceOptions.map((s) => <option key={s} value={s} className="bg-[#0a0f1e]">{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-white/30 mb-1.5 font-medium uppercase tracking-widest">Budget Range</label>
                    <select {...register("budget")} className={`${inputClass} appearance-none`} data-testid="select-budget">
                      <option value="" className="bg-[#0a0f1e]">Select budget</option>
                      {budgetOptions.map((b) => <option key={b} value={b} className="bg-[#0a0f1e]">{b}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-white/30 mb-1.5 font-medium uppercase tracking-widest">Project Details *</label>
                  <textarea {...register("message")} rows={5} className={`${inputClass} resize-none`} placeholder="Tell us about your project..." data-testid="textarea-message" />
                  {errors.message && <p className="text-[11px] text-red-400/80 mt-1">{errors.message.message}</p>}
                </div>

                <MagneticButton strength={0.1} className="w-full">
                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-[13px] font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-[0_0_30px_rgba(37,99,235,0.25)] hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500"
                    data-testid="button-submit-contact"
                  >
                    {mutation.isPending ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="w-4 h-4" /> Send Message</>
                    )}
                  </button>
                </MagneticButton>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
