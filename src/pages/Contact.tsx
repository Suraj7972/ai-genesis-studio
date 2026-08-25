import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Mail, Copy, Check } from "lucide-react";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import ProductIcon from "@/components/ProductIcon";
import { products } from "@/data/srai";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({ name: "", email: "", company: "", product: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(() => {
    document.title = "Contact SRAI Systems — Start Building with Us";
    const productParam = searchParams.get("product");
    if (productParam) {
      if (productParam === "pitch-deck") {
        setForm((f) => ({ ...f, product: "pitch-deck", message: "I'd like to request your pitch deck." }));
      } else {
        setForm((f) => ({ ...f, product: productParam }));
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`SRAI Systems Inquiry — ${form.product || "General"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:contact@sraisystems.in?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

  const copyEmail = () => { navigator.clipboard.writeText("contact@sraisystems.in"); setEmailCopied(true); setTimeout(() => setEmailCopied(false), 2000); };

  const productOptions = [
    { id: "pitch-deck", name: "Pitch Deck Request", icon: "Rocket" },
    ...products.map((p) => ({ id: p.id, name: p.name, icon: p.icon })),
  ];

  const intentChips = [
    { label: "🚀 Early Access", value: "early-access" },
    { label: "🤝 Partnership", value: "partnership" },
    { label: "💼 Investor Inquiry", value: "investor" },
    { label: "💬 General", value: "general" },
  ];

  return (
    <Layout>
      <section className="py-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Visual panel — only on desktop */}
            <div className="hidden lg:block">
              <SectionReveal direction="left">
                <div className="relative h-full min-h-[600px] rounded-2xl overflow-hidden glass-premium border border-primary/20 bg-[#0a0c16]">
                  {/* Signal Graphic Background */}
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-60">
                    <motion.div className="w-[800px] h-[800px] rounded-full border-[2px] border-primary/5 absolute" animate={{ scale: [0, 2], opacity: [1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
                    <motion.div className="w-[800px] h-[800px] rounded-full border-[2px] border-primary/10 absolute" animate={{ scale: [0, 2], opacity: [1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }} />
                    <motion.div className="w-[800px] h-[800px] rounded-full border-[2px] border-primary/20 absolute" animate={{ scale: [0, 2], opacity: [1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }} />
                    <motion.div className="w-[800px] h-[800px] rounded-full border-[2px] border-primary/30 absolute" animate={{ scale: [0, 2], opacity: [1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 3 }} />
                    <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_30px_#4f46e5] relative z-10" />
                    
                    {/* Vertical & Horizontal Crosshairs */}
                    <div className="absolute w-[1px] h-full bg-primary/10" />
                    <div className="absolute w-full h-[1px] bg-primary/10" />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c16] via-[#0a0c16]/50 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-2">SRAI Systems</p>
                    <h2 className="text-2xl font-bold text-foreground mb-3">
                      Let's build something real together
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      We typically respond within 24 hours. For urgent inquiries, email us directly.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4 text-primary" />
                      contact@sraisystems.in
                    </div>
                  </div>
                </div>
              </SectionReveal>
            </div>

            {/* Right: Form */}
            <div>
              <SectionReveal>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-3 block">
                  Get In Touch
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  Start Building{" "}
                  <span className="heading-gradient">With Us</span>
                </h1>
                <p className="text-muted-foreground mb-4">
                  Early access, partnerships, investor inquiries, or just saying hello — we're building in public and we want to hear from you.
                </p>
                <button onClick={copyEmail}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                  <Mail className="w-4 h-4" />
                  contact@sraisystems.in
                  {emailCopied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </SectionReveal>

              {/* Quick intent chips */}
              <SectionReveal delay={0.05}>
                <div className="flex flex-wrap gap-2 mb-6">
                  {intentChips.map((chip) => (
                    <button
                      key={chip.value}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, product: chip.value }))}
                      className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                      style={{
                        background: form.product === chip.value ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)",
                        border: form.product === chip.value ? "1px solid rgba(99,102,241,0.5)" : "1px solid rgba(255,255,255,0.08)",
                        color: form.product === chip.value ? "#818cf8" : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </SectionReveal>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="glass-premium rounded-2xl p-12 text-center">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-foreground mb-2">Message Received</h2>
                    <p className="text-muted-foreground">Thanks for reaching out. We'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit} className="glass-premium rounded-2xl p-8 space-y-6">

                    {/* Quick product chips */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-3 block">I'm interested in...</label>
                      <div className="flex flex-wrap gap-2">
                        {productOptions.map((p) => (
                          <button key={p.id} type="button"
                            onClick={() => setForm((f) => ({ ...f, product: p.id }))}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                              form.product === p.id
                                ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(230_90%_60%_/_0.2)]"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            }`}>
                            <ProductIcon name={p.icon} className="w-3 h-3" />
                            {p.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Name *</label>
                        <input required type="text" value={form.name}
                          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          placeholder="Your name" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                        <input required type="email" value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          placeholder="you@company.com" />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Role / Company</label>
                      <input type="text" value={form.company}
                        onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="Optional" />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Message *</label>
                      <textarea required rows={4} value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                        placeholder="Tell us what you're looking for..." />
                    </div>

                    <button type="submit"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_hsl(230_90%_60%_/_0.2)]">
                      <Send className="w-4 h-4" /> Send Message
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
              {/* Nagpur HQ Card */}
              <SectionReveal delay={0.2}>
                <div className="flex items-center justify-between p-4 rounded-xl border border-border/30 bg-secondary/30 mt-6 backdrop-blur-sm group hover:border-border/60 transition-colors">
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-lg bg-[#0a0c16] border border-white/5 relative overflow-hidden flex items-center justify-center">
                       {/* Abstract Map Outline */}
                       <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-30 absolute pb-2 text-primary pointer-events-none">
                         <path d="M 35 10 L 45 5 L 55 10 L 60 20 L 70 25 L 85 28 L 95 35 L 80 45 L 75 55 L 65 65 L 55 85 L 50 95 L 45 85 L 35 65 L 25 55 L 10 50 L 5 45 L 15 40 L 25 42 L 30 30 L 30 20 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                       </svg>
                       {/* Dot for Nagpur */}
                       <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_#4f46e5] mt-[-2px]">
                         <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                       </div>
                     </div>
                     <div>
                       <div className="text-sm font-bold text-foreground">SRAI Systems HQ</div>
                       <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono">Nagpur, Central India</div>
                     </div>
                   </div>
                   <div className="flex flex-col items-end gap-1">
                     <span className="flex items-center gap-1.5 text-[9px] font-mono uppercase text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                       <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_5px_#4ade80]" />
                       Online 24/7
                     </span>
                     <span className="text-[9px] text-muted-foreground font-mono">SYS_OP: NOMINAL</span>
                   </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
