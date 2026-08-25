import { motion } from "framer-motion";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import ProductIcon from "@/components/ProductIcon";
import { services, howWeWork, engagementModels } from "@/data/srai";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Services = () => {
  useEffect(() => {
    document.title = "AI Engineering & Consulting Services | SRAI Systems";
  }, []);
  return (
  <Layout>
    <section className="py-16 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        {/* Services hero banner */}
        <SectionReveal>
          <div className="relative h-[300px] rounded-2xl overflow-hidden mb-12">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
              alt="AI Research"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
            <div className="absolute inset-0 flex items-center p-8 md:p-12">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-3 block">
                  What We Do
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2">
                  AI Research &{" "}
                  <span className="heading-gradient">Consulting</span>
                </h1>
              </div>
            </div>
          </div>
        </SectionReveal>

        <p className="text-muted-foreground mb-12 max-w-2xl">
          We partner with organizations to build production-grade AI systems. Engineering-first, results-driven.
        </p>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {services.map((s, i) => (
            <SectionReveal key={s.id} delay={i * 0.1}>
              <motion.div
                className="glass-premium rounded-xl p-8 h-full group relative overflow-hidden card-accent-line"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(230 90% 60% / 0.05), transparent 60%)" }} />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:bg-primary/20 transition-colors group-hover:shadow-[0_0_20px_hsl(230_90%_60%_/_0.15)]">
                    <ProductIcon name={s.icon} className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>

        <div className="section-divider mx-auto w-full mb-20" />

        {/* How We Work */}
        <SectionReveal>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-3 block">Process</span>
          <h2 className="text-3xl font-bold text-foreground mb-8">How We Work</h2>
        </SectionReveal>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-20">
          {howWeWork.map((step, i) => (
            <SectionReveal key={step.step} delay={i * 0.1}>
              <div className="glass-premium rounded-xl p-6 text-center h-full relative group card-accent-line">
                <span className="text-4xl font-black text-primary/15 block mb-2 group-hover:text-primary/25 transition-colors">{step.step}</span>
                <h3 className="text-lg font-bold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <div className="section-divider mx-auto w-full mb-20" />

        {/* Engagement Models */}
        <SectionReveal>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-3 block">Engagement</span>
          <h2 className="text-3xl font-bold text-foreground mb-2">Engagement Models</h2>
          <p className="text-muted-foreground mb-8">Flexible engagement to match your needs and timeline.</p>
        </SectionReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {engagementModels.map((model, i) => (
            <SectionReveal key={model.id} delay={i * 0.1}>
              <motion.div className="glass-premium rounded-xl p-8 h-full group relative overflow-hidden card-accent-line" whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                <span className="absolute -bottom-2 -right-2 text-8xl font-black text-primary/5 group-hover:text-primary/10 transition-colors pointer-events-none">
                  {i + 1}
                </span>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                    <ProductIcon name={model.icon} className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{model.title}</h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-primary/60 mb-3 block">{model.duration}</span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{model.description}</p>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>

        {/* Case Studies */}
        <SectionReveal>
          <div className="glass-premium rounded-xl p-10 text-center relative overflow-hidden neon-border">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
            <p className="text-muted-foreground mb-4 relative">
              Detailed case studies available on request.
            </p>
            <Link to="/contact"
              className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors btn-glow">
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  </Layout>
  );
};

export default Services;
