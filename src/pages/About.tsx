import { motion } from "framer-motion";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { roadmap, principles } from "@/data/srai";
import { Target, Eye, Shield, Code, Server, Database, Lock } from "lucide-react";

const stackItems = [
  { title: "AWS-First", desc: "Cloud infrastructure built on AWS for scale and reliability.", icon: Server },
  { title: "CV & NLP", desc: "Computer vision and natural language processing at the core.", icon: Eye },
  { title: "Data Pipelines", desc: "Robust data engineering for real-time and batch workloads.", icon: Database },
  { title: "Security Mindset", desc: "Security-first design across every product and service.", icon: Lock },
];

const statusColor = (status: string) => {
  if (status === "completed") return "hsl(160 70% 45%)";
  if (status === "in-progress") return "hsl(230 90% 60%)";
  return "hsl(215 15% 35%)";
};

const About = () => {
  useEffect(() => {
    document.title = "About SRAI Systems — Built in Nagpur, India";
  }, []);
  return (
  <Layout>
    <section className="py-16 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        {/* Story with floating accent */}
        <SectionReveal>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-3 block">
            Who We Are
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            About SRAI{" "}
            <span className="heading-gradient">Systems</span>
          </h1>
          <div className="glass-premium rounded-xl p-8 mb-12 max-w-3xl relative overflow-hidden neon-border">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(230 90% 60% / 0.06), transparent 70%)", filter: "blur(40px)" }} />
            <p className="text-muted-foreground leading-relaxed mb-4 relative">
              SRAI Systems is a product studio building AI-native platforms that solve real problems. We're engineers and researchers who believe technology should be practical, trustworthy, and accessible — especially in contexts that most tech companies overlook.
            </p>
            <p className="text-muted-foreground leading-relaxed relative">
              We build for India's unique challenges: infrastructure constraints, language diversity, and the need for solutions that work at every scale — from a single farmer to an entire supply chain.
            </p>
          </div>
        </SectionReveal>

        {/* Visual banner */}
        <SectionReveal delay={0.1}>
          <div className="relative h-[300px] rounded-2xl overflow-hidden mb-20">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
              alt="SRAI Systems mission"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-center p-8 md:p-12">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-2">Our Philosophy</p>
                <blockquote className="text-2xl md:text-3xl font-bold text-foreground max-w-md">
                  "Build real products.<br />Not pitch decks."
                </blockquote>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Mission & Vision */}
        <SectionReveal>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-3 block">Purpose</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
            <motion.div className="glass-premium rounded-xl p-8 group card-accent-line" whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                Build production-grade AI products that create real value for underserved markets and communities.
              </p>
            </motion.div>
            <motion.div className="glass-premium rounded-xl p-8 group card-accent-line" whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Eye className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                An ecosystem of interconnected AI platforms that empower founders, farmers, businesses, and communities across India.
              </p>
            </motion.div>
          </div>
        </SectionReveal>

        <div className="section-divider mx-auto w-full mb-20" />

        {/* Systems Philosophy */}
        <SectionReveal>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-3 block">Philosophy</span>
          <h2 className="text-3xl font-bold text-foreground mb-3">Systems Thinking</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            We believe in building structured systems, not fragile prototypes. Our approach combines three pillars:
          </p>
        </SectionReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {[
            { title: "Structure", desc: "Every product starts with a clear architecture and execution framework. We plan before we build.", icon: Code },
            { title: "Trust", desc: "Privacy-first design, audit trails, and transparent systems. We earn trust through engineering, not marketing.", icon: Shield },
            { title: "Practical AI", desc: "AI that works in the real world — with constraints, imperfect data, and diverse users. No lab-only demos.", icon: Target },
          ].map((item, i) => (
            <SectionReveal key={item.title} delay={i * 0.1}>
              <motion.div className="glass-premium rounded-xl p-7 h-full group card-accent-line" whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            </SectionReveal>
          ))}
        </div>

        <div className="section-divider mx-auto w-full mb-20" />

        {/* Principles */}
        <SectionReveal>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-3 block">Values</span>
          <h2 className="text-3xl font-bold text-foreground mb-8">Principles</h2>
        </SectionReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {principles.map((p, i) => (
            <SectionReveal key={p.title} delay={i * 0.08}>
              <div className="glass-premium rounded-xl p-6 group hover:border-primary/20 transition-all duration-500 relative overflow-hidden card-accent-line"
                style={{ borderLeft: `3px solid hsl(230 90% 60% / 0.3)` }}>
                <span className="absolute top-2 right-4 text-5xl font-black text-primary/5 group-hover:text-primary/10 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors relative">{p.title}</h3>
                <p className="text-sm text-muted-foreground relative">{p.description}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <div className="section-divider mx-auto w-full mb-20" />

        {/* Roadmap Timeline */}
        <SectionReveal>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-3 block">Journey</span>
          <h2 className="text-3xl font-bold text-foreground mb-8">Roadmap</h2>
        </SectionReveal>
        <div className="relative mb-20">
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/30 via-primary/10 to-transparent hidden md:block" />
          <div className="space-y-5">
            {roadmap.map((phase, i) => (
              <SectionReveal key={phase.id} delay={i * 0.1}>
                <div className="flex items-start gap-6">
                  <div className="hidden md:flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full shrink-0 ring-4 ring-background`}
                      style={{
                        background: statusColor(phase.status),
                        boxShadow: phase.status === "in-progress" ? `0 0 12px ${statusColor(phase.status)}` : "none",
                      }}
                    />
                  </div>
                  <motion.div className="glass-premium rounded-xl p-6 flex-1 group card-accent-line" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}
                    style={{ borderLeft: `3px solid ${statusColor(phase.status)}` }}>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {phase.phase}: {phase.title}
                      </h3>
                      <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{
                          background: `${statusColor(phase.status)}20`,
                          color: statusColor(phase.status),
                        }}>
                        {phase.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{phase.description}</p>
                  </motion.div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>

        <div className="section-divider mx-auto w-full mb-20" />

        {/* Stack */}
        <SectionReveal>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-3 block">Technology</span>
          <h2 className="text-3xl font-bold text-foreground mb-8">Stack & Approach</h2>
        </SectionReveal>

        {/* Infrastructure image card */}
        <SectionReveal delay={0.05}>
          <div className="relative h-[200px] rounded-2xl overflow-hidden mb-8">
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80"
              alt="Server infrastructure"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
            <div className="absolute inset-0 flex items-center p-8">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-2">Infrastructure</p>
                <p className="text-xl font-bold text-foreground">AWS-First · AI-Native · Production-Grade</p>
              </div>
            </div>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {stackItems.map((item, i) => (
            <SectionReveal key={item.title} delay={i * 0.08}>
              <motion.div className="glass-premium rounded-xl p-6 text-center h-full group card-accent-line" whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  </Layout>
  );
};

export default About;
