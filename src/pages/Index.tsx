import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowRight, CheckCircle, Search, Hammer, Code, Rocket, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import HeroSection from "@/components/HeroSection";
import SpotlightCarousel from "@/components/SpotlightCarousel";
import ProductDemosSection from "@/components/ProductDemosSection";
import IndiaSection from "@/components/IndiaSection";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import ParallaxSection from "@/components/ParallaxSection";
import ProductIcon from "@/components/ProductIcon";
import { products, howWeWork, principles, Product } from "@/data/srai";

const AnimatedCounter = ({ endValue, duration, suffix }: { endValue: number | string, duration: number, suffix: string }) => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [count, setCount] = useState(prefersReduced ? (typeof endValue === "number" ? endValue : 0) : 0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (prefersReduced) return;
    
    if (inView && typeof endValue === "number") {
      let start = 0;
      const step = endValue / (duration * 60);
      const tick = () => {
        start += step;
        if (start < endValue) {
          setCount(Math.ceil(start));
          requestAnimationFrame(tick);
        } else {
          setCount(endValue);
        }
      };
      requestAnimationFrame(tick);
    }
  }, [inView, endValue, duration, prefersReduced]);

  return <span ref={ref}>{typeof endValue === "number" ? count : endValue}{suffix}</span>;
};

const QuoteCycler = () => {
  const [q, setQ] = useState(0);
  const quotes = [
    "We don't build demos. We ship systems.",
    "Every product solves a problem we've personally felt.",
    "India deserves AI built for India, not adapted from elsewhere."
  ];
  useEffect(() => {
    const t = setInterval(() => setQ(x => (x + 1) % quotes.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative px-8 min-h-[100px] flex items-center justify-center text-center mt-10">
      {/* Left Bracket */}
      <svg className="absolute left-0 top-0 bottom-0 h-full w-4 text-primary opacity-60" viewBox="0 0 16 100" preserveAspectRatio="none">
        <path d="M 16 0 L 2 0 L 2 100 L 16 100" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      
      <AnimatePresence mode="wait">
        <motion.p
          key={q}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="text-xl md:text-2xl font-bold text-white leading-relaxed font-syne"
        >
          {quotes[q]}
        </motion.p>
      </AnimatePresence>

      {/* Right Bracket */}
      <svg className="absolute right-0 top-0 bottom-0 h-full w-4 text-primary opacity-60" viewBox="0 0 16 100" preserveAspectRatio="none">
        <path d="M 0 0 L 14 0 L 14 100 L 0 100" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  );
};

const Index = () => {
  useEffect(() => {
    document.title = "SRAI Systems — AI Product Studio | India";
  }, []);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const structera = products[0];

  return (
    <Layout>
      <HeroSection />

      <div className="section-divider-gradient" />

      {/* Why StructEra is Flagship */}
      <section className="pt-16 pb-8 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.06), transparent 60%)` }} />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <SectionReveal>
            <div className="glass-premium rounded-2xl p-8 md:p-12 overflow-hidden relative border border-primary/10">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-3 block">
                    Flagship Product
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 flex flex-col gap-1">
                    <span>Why</span>
                    <span className="relative inline-block w-fit" style={{
                       backgroundImage: "linear-gradient(135deg, #818cf8 0%, #38bdf8 100%)",
                       WebkitBackgroundClip: "text",
                       WebkitTextFillColor: "transparent",
                       backgroundClip: "text",
                    }}>StructEra</span>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {structera.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {structera.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: `hsl(${structera.accentHsl})` }} />
                        {f}
                      </div>
                    ))}
                  </div>
                  <a href={structera.subdomain} target="_blank" rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium text-sm transition-all overflow-hidden"
                    style={{ background: `hsl(${structera.accentHsl})`, boxShadow: `0 0 20px hsl(${structera.accentHsl} / 0.25)` }}>
                    <span className="relative z-10">Explore StructEra</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </a>
                </div>
                {/* Mock dashboard card */}
                <div className="flex items-center justify-center relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)', filter: 'blur(40px)' }} />
                  <div className="relative w-full max-w-md transition-transform duration-500 ease-in-out [transform:rotate(-1.5deg)_translateY(-4px)] hover:[transform:rotate(0deg)_translateY(0px)] z-10">
                    {/* Animated rings */}
                    <motion.div className="absolute -inset-8 rounded-full border border-primary/10 pointer-events-none"
                      animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
                    <motion.div className="absolute -inset-4 rounded-full border border-primary/[0.06] border-dashed pointer-events-none"
                      animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
                    {/* Mock dashboard card rebuilt for SaaS mockup */}
                    <div className="glass-premium rounded-xl p-0 relative overflow-hidden flex flex-col bg-[#0d101d] h-72" style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.2)' }}>
                      {/* Fake Browser Chrome */}
                      <div className="h-8 bg-[#1a1d2d] border-b border-white/5 flex items-center px-4 gap-2 shrink-0">
                        <div className="flex gap-[6px]">
                          <div className="w-[10px] h-[10px] rounded-full bg-[#ef4444]" />
                          <div className="w-[10px] h-[10px] rounded-full bg-[#f59e0b]" />
                          <div className="w-[10px] h-[10px] rounded-full bg-[#22c55e]" />
                        </div>
                        <div className="mx-auto flex justify-center w-[60%] bg-black/40 rounded py-1 text-[11px] text-gray-500 tracking-wide font-sans">structera.sraisystems.in</div>
                      </div>

                      <div className="flex flex-1 overflow-hidden">
                        {/* Sidebar */}
                        <div className="w-[100px] border-r border-border/20 p-4 shrink-0 flex flex-col gap-4 bg-[#0a0c16]">
                          <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center mb-2">
                            <ProductIcon name="box" className="w-4 h-4 text-primary" />
                          </div>
                          {["Dashboard", "Tasks", "Funding", "Schemes", "Analytics"].map((item, i) => (
                            <div key={item} className={`text-[9px] font-medium ${i===0 ? "text-primary" : "text-muted-foreground"}`}>{item}</div>
                          ))}
                        </div>
                        
                        {/* Main Content Area */}
                        <div className="flex-1 p-5 relative overflow-hidden">
                          <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[8px] font-mono uppercase bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full border border-green-500/20">
                             <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" /> LIVE
                          </div>
                          <div className="text-sm font-bold text-white mb-4">Overview</div>
                        
                        {/* Founder Score Gauge & Focus Card */}
                        <div className="flex gap-4 mb-5">
                           <div className="w-16 h-16 rounded-full border-[3px] border-[#1e2336] flex items-center justify-center relative bg-[#131726] shrink-0">
                              <svg className="absolute inset-0 w-full h-full -rotate-90">
                                <circle cx="32" cy="32" r="30.5" fill="none" strokeWidth="3" stroke="hsl(230 90% 60%)" strokeDasharray="191" strokeDashoffset="34" className="text-primary" />
                              </svg>
                              <div className="text-center">
                                <div className="text-sm font-black text-white leading-tight">82<span className="text-[8px] font-normal text-white/50">/100</span></div>
                              </div>
                           </div>
                           
                           {/* Today's Focus Card */}
                           <div className="flex-1 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 p-3 relative flex flex-col justify-center">
                              <div className="text-[10px] font-bold text-indigo-300 mb-1">Today's Focus</div>
                              <div className="text-[9px] text-indigo-200/70 leading-relaxed">AI suggests prioritizing pitch deck over scheme discovery.</div>
                              <div className="absolute top-2 right-2 flex items-center gap-1 bg-indigo-500/20 rounded px-1.5 py-0.5">
                                <span className="w-1 h-1 rounded-full bg-indigo-400 animate-bounce" />
                                <span className="text-[7px] text-indigo-300 font-mono">Assisted</span>
                              </div>
                           </div>
                        </div>

                        {/* Task List rows */}
                        {/* Task List rows */}
                        <div className="space-y-1.5">
                           {[
                             { label: "AI Copilot session", done: true, time: "09:14" },
                             { label: "Pitch deck review", done: true, time: "11:30" },
                             { label: "Scheme discovery", done: false, time: "Today" },
                           ].map((task, i) => (
                             <div key={i} className="flex items-center justify-between p-2 rounded bg-white/[0.02] border border-white/[0.03] text-[10px]">
                               <div className="flex items-center gap-2">
                                 <div className={`w-3 h-3 rounded flex items-center justify-center ${task.done ? "bg-indigo-500/30 text-indigo-400" : "border border-muted-foreground/30"}`}>
                                   {task.done && <CheckCircle className="w-2 h-2" />}
                                 </div>
                                 <span className={task.done ? "text-muted-foreground line-through" : "text-foreground"}>{task.label}</span>
                               </div>
                               <span className="text-muted-foreground/60 font-mono text-[8px]">{task.time}</span>
                             </div>
                           ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* Spotlight Carousel */}
      <section className="pt-4 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <SectionReveal>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-3 block">Ecosystem</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 flex flex-col gap-1">
              <span>Featured</span>
              <span className="relative inline-block w-fit" style={{
                backgroundImage: "linear-gradient(135deg, #818cf8 0%, #38bdf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Platforms</span>
            </h2>
            <p className="text-muted-foreground mb-12">Explore our product ecosystem</p>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <SpotlightCarousel />
          </SectionReveal>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* ─── Product Demos Section ─── */}
      <ProductDemosSection />

      {/* ─── India Section ─── */}
      <IndiaSection />

      <div className="section-divider-gradient" />

      {/* ─── Industries We Impact ─── */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <SectionReveal>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-3 block">Verticals</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 flex flex-col gap-1">
              <span>Industries</span>
              <span className="relative inline-block w-fit" style={{
                backgroundImage: "linear-gradient(135deg, #818cf8 0%, #38bdf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>We Impact</span>
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              {
                icon: "🌾",
                label: "Agriculture",
                desc: "AI farm management",
                product: "SmartBhoomi",
                color: "#34d399",
                img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=70",
                dir: { x: -30, y: 0 },
                features: ["Expense tracking in Marathi", "Crop advisory AI", "Mandi price alerts"]
              },
              {
                icon: "🚀",
                label: "Startups",
                desc: "Founder OS",
                product: "StructEra",
                color: "#818cf8",
                img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=70",
                dir: { x: 0, y: 30 },
                features: ["AI Copilot", "Investor CRM", "Automated Schemes"]
              },
              {
                icon: "🏨",
                label: "Hospitality",
                desc: "End-to-end hotel AI",
                product: "Hotel Management AI",
                color: "#fbbf24",
                img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=70",
                dir: { x: 30, y: 0 },
                features: ["Inventory prediction", "Staff scheduling", "Dynamic pricing"]
              },
              {
                icon: "🔒",
                label: "Privacy",
                desc: "Secure transactions",
                product: "TheCrows",
                color: "#fb7185",
                img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=70",
                dir: { x: 0, y: 30 },
                features: ["Zero-knowledge proof", "Escrow contracts", "Identity masking"]
              },
              {
                icon: "🍽",
                label: "Food & Restaurants",
                desc: "Hyperlocal food ecosystem",
                product: "FoodieFlow",
                color: "#38bdf8",
                img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=70",
                dir: { x: 30, y: 30 },
                features: ["Local supply chain", "Automated ordering", "Demand prediction"]
              },
            ].map((industry, i) => (
              <motion.div 
                key={industry.label}
                initial={{ opacity: 0, x: industry.dir.x, y: industry.dir.y }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                className="relative h-[280px] hover:h-[300px] mb-[-20px] hover:mb-0 transition-all duration-500 rounded-xl overflow-hidden group cursor-pointer border border-border/20"
              >
                {/* Real image */}
                <img src={industry.img} alt={industry.label} loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

                {/* Colored accent glow */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `linear-gradient(to top, ${industry.color}30, transparent)` }} />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col justify-end h-full">
                  <div className="transform group-hover:-translate-y-2 transition-transform duration-500">
                    <p className="text-2xl mb-1">{industry.icon}</p>
                    <h3 className="text-lg font-bold text-white mb-1">{industry.label}</h3>
                    <p className="text-xs text-white/60 mb-2">{industry.desc}</p>
                    <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ background: `${industry.color}20`, color: industry.color }}>
                      {industry.product}
                    </span>
                  </div>
                  
                  {/* Expanding Features List */}
                  <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mt-3 transition-all duration-500 overflow-hidden space-y-1.5">
                    {industry.features.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[10px] text-white/80">
                        <CheckCircle className="w-3 h-3" style={{ color: industry.color }} />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top border line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: industry.color }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Products Grid */}
      <ParallaxSection className="py-16" speed={0.05}>
        <div className="container mx-auto px-4 md:px-8">
          <SectionReveal>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-3 block">Products</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 flex flex-col gap-1">
              <span>7 Systems.</span>
              <span className="relative inline-block w-fit" style={{
                backgroundImage: "linear-gradient(135deg, #818cf8 0%, #38bdf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>One India.</span>
            </h2>
            <p className="text-muted-foreground mb-12">Seven products, one mission — AI that works.</p>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} onSelect={setSelectedProduct} index={i} />
            ))}
          </div>
        </div>
      </ParallaxSection>

      <div className="section-divider-gradient" />

      {/* Social Proof / Trust Strip */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <SectionReveal>
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground/60 mb-8">
              Powering founders, farmers & businesses across India
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["Founders", "Farmers", "Restaurants", "Traders", "Enterprises"].map((label, i) => (
                <motion.div key={label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-premium text-sm text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                  {label}
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* ─── Impact Numbers ─── */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative">
          <SectionReveal>
             <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-3 block">Impact</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 flex flex-col gap-1">
              <span>Built to scale</span>
              <span className="relative inline-block w-fit" style={{
                backgroundImage: "linear-gradient(135deg, #818cf8 0%, #38bdf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>across India</span>
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { number: 7, duration: 1.5, suffix: "", label: "AI Platforms", sub: "Live & in development", color: "#818cf8" },
              { number: 4, duration: 1.2, suffix: "+", label: "Verticals", sub: "Agri, Startup, Food, Hospitality", color: "#34d399" },
              { number: 100, duration: 2.0, suffix: "%", label: "India-First", sub: "Built for local challenges", color: "#fb7185" },
              { number: "Free", duration: 1.0, suffix: "", label: "Early Access", sub: "Start free, scale when ready", color: "#fbbf24" },
            ].map((item, i) => (
              <SectionReveal key={item.label} delay={i * 0.1}>
                <div className="glass-premium rounded-2xl p-6 text-center relative overflow-hidden group card-accent-line" style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 80%, ${item.color}14, transparent 60%)` }} />
                  <div className="text-4xl md:text-5xl font-black mb-2 relative transform transition-transform duration-500 group-hover:-translate-y-1.5" style={{ color: item.color, transform: "translateZ(20px)" }}>
                    <AnimatedCounter endValue={item.number} duration={item.duration} suffix={item.suffix} />
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1 relative" style={{ transform: "translateZ(10px)" }}>{item.label}</h3>
                  <p className="text-xs text-muted-foreground relative mb-3" style={{ transform: "translateZ(5px)" }}>{item.sub}</p>
                  
                  {/* Underline */}
                  <div className="w-10 h-0.5 mx-auto rounded-full" style={{ background: item.color, transform: "translateZ(10px)" }} />
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* How We Work */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative">
          <SectionReveal>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-3 block">Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 flex flex-col gap-1">
              <span>How We</span>
              <span className="relative inline-block w-fit" style={{
                backgroundImage: "linear-gradient(135deg, #818cf8 0%, #38bdf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Work</span>
            </h2>
          </SectionReveal>
          
          <div className="relative">
            {/* Connecting horizontal dashed line with chevrons */}
            <div className="hidden md:flex absolute top-[40px] left-[12%] right-[12%] items-center pointer-events-none z-0">
               <div className="flex-1 h-[2px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjIiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIyIiBmaWxsPSJyZ2JhKDEyOSwxNDAsMjQ4LDAuNSkiLz4KPC9zdmc+')] bg-repeat-x opacity-40" />
               <ChevronRight className="w-4 h-4 text-primary/50 mx-2" />
               <div className="flex-1 h-[2px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjIiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIyIiBmaWxsPSJyZ2JhKDUyLDIxMSwxNTMsMC41KSIvPgo8L3N2Zz4=')] bg-repeat-x opacity-40" />
               <ChevronRight className="w-4 h-4 text-emerald-400/50 mx-2" />
               <div className="flex-1 h-[2px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjIiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIyIiBmaWxsPSJyZ2JhKDI1MSwxMTMsMTMzLDAuNSkiLz4KPC9zdmc+')] bg-repeat-x opacity-40" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {howWeWork.map((step, i) => {
                const cColors = ["#818cf8", "#34d399", "#fb7185", "#fbbf24"];
                const SVGIcons = [Search, Hammer, Code, Rocket];
                const Icon = SVGIcons[i];
                return (
                  <SectionReveal key={step.step} delay={i * 0.1}>
                    <div className="glass-premium rounded-xl p-7 h-full relative group transition-all duration-500 overflow-hidden mt-8 md:mt-0 bg-[#0d101d] hover:bg-[#121626]">
                      <span className="absolute -bottom-4 -right-2 text-8xl font-black transition-colors pointer-events-none select-none opacity-5 group-hover:opacity-10" style={{ color: cColors[i] }}>
                        {step.step}
                      </span>
                      
                      {/* Full Circle on the line */}
                      <div className="relative mx-auto md:mx-0 z-10 w-16 h-16 rounded-full flex items-center justify-center text-white mb-6 shadow-xl transition-transform duration-500 group-hover:scale-110" 
                        style={{ background: `linear-gradient(135deg, ${cColors[i]}, ${cColors[i]}60)`, boxShadow: `0 10px 30px ${cColors[i]}40` }}>
                        <Icon className="w-6 h-6 absolute" style={{ opacity: 0.2 }} strokeWidth={3} />
                        <span className="font-syne font-black text-2xl relative z-10 drop-shadow-md">{step.step}</span>
                      </div>

                      <h3 className="text-lg font-bold font-syne text-white mb-2 relative">{step.title}</h3>
                      <p className="text-sm text-muted-foreground relative leading-relaxed">{step.description}</p>
                      <div className="absolute bottom-0 left-0 right-0 h-[3px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: cColors[i] }} />
                    </div>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* Principles */}
      <ParallaxSection className="py-16" speed={0.05}>
        <div className="container mx-auto px-4 md:px-8">
          <SectionReveal>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-3 block">Values</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 flex flex-col gap-1">
              <span>Our</span>
              <span className="relative inline-block w-fit" style={{
                backgroundImage: "linear-gradient(135deg, #818cf8 0%, #38bdf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Principles</span>
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {principles.map((p, i) => {
              const borderColors = [
                { border: "#818cf8", glow: "rgba(129,140,248,0.15)" },
                { border: "#34d399", glow: "rgba(52,211,153,0.15)" },
                { border: "#fb7185", glow: "rgba(251,113,133,0.15)" },
                { border: "#fbbf24", glow: "rgba(251,191,36,0.15)" }
              ];
              const theme = borderColors[i % borderColors.length];
              return (
                <SectionReveal key={p.title} delay={i * 0.08}>
                  <div className="glass-premium rounded-xl p-7 group transition-all duration-500 relative overflow-hidden"
                    style={{ borderLeft: `3px solid ${theme.border}40`, background: `radial-gradient(ellipse at center, rgba(30,30,40,0.4) 0%, transparent 100%)` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = theme.border;
                      e.currentTarget.style.boxShadow = `0 0 30px ${theme.glow}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `hsl(var(--border) / 0.5)`;
                      e.currentTarget.style.borderLeftColor = `${theme.border}40`;
                      e.currentTarget.style.boxShadow = `none`;
                    }}
                  >
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(circle, ${theme.border}10, transparent 70%)` }} />
                    <span className="absolute -top-4 -right-2 text-8xl font-black font-syne pointer-events-none transition-all duration-500 opacity-[0.04] group-hover:opacity-[0.12]"
                      style={{ color: theme.border }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-bold font-syne text-foreground mb-2 group-hover:text-white transition-colors relative">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed relative">{p.description}</p>
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                      style={{ background: `linear-gradient(90deg, ${theme.border}, transparent)` }} />
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </ParallaxSection>

      <div className="section-divider-gradient" />

      {/* ─── Founder Story ─── */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <SectionReveal direction="left">
              <div className="relative rounded-2xl overflow-hidden h-[400px]">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=85"
                  alt="SRAI Systems engineering"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                {/* Decorative corner frame */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t-[3px] border-l-[3px] border-[#f59e0b]/60 rounded-tl-lg" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-[3px] border-r-[3px] border-[#f59e0b]/60 rounded-br-lg" />

                {/* Label */}
                <div className="absolute bottom-5 left-5 text-[10px] font-mono uppercase tracking-wider text-[#fbbf24] bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-[#f59e0b]/20 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#f59e0b] shadow-[0_0_10px_#f59e0b]" />
                  Est. 2024 · Nagpur, MH
                </div>
              </div>
            </SectionReveal>
            {/* Story text */}
            <SectionReveal>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-3 block">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 flex flex-col gap-1">
                <span>Built by builders,</span>
                <span className="relative inline-block w-fit" style={{
                  backgroundImage: "linear-gradient(135deg, #818cf8 0%, #38bdf8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>for builders.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                SRAI Systems started with a simple frustration — India has incredible problems worth solving, but most AI tools are built for Silicon Valley, not Maharashtra.
              </p>
              
              <QuoteCycler />

              <div className="mt-8 text-[11px] font-mono uppercase tracking-widest text-muted-foreground/60">
                 Building from India 🇮🇳
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* ─── Final CTA ─── */}
      <section className="py-16 relative overflow-hidden">
        {/* Animated panning grid background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0",
          animation: "pan-grid 20s linear infinite"
        }} />
        <style>{`
          @keyframes pan-grid {
            0% { background-position: 0 0; }
            100% { background-position: 40px 40px; }
          }
        `}</style>
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse at 50% 50%, hsl(230 90% 60% / 0.08), transparent 60%)",
          }} />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative">
          <SectionReveal>
            <div className="glass-premium rounded-2xl p-12 md:p-20 text-center relative overflow-hidden neon-border">
              <div className="absolute inset-0 pointer-events-none opacity-20" style={{
                background: "radial-gradient(ellipse at 50% 100%, hsl(230 90% 60% / 0.3), transparent 70%)",
              }} />

              {/* Pulsing radial glow behind text */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />

              <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-4 px-4 py-1.5 rounded-full border border-primary/20 relative">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Now Accepting Early Access
              </span>

              <h2 className="text-6xl md:text-8xl font-black text-foreground mb-5 relative flex flex-col gap-1 items-center leading-none">
                <span>Ready to Build the</span>
                <span className="relative inline-block w-fit mt-2 pb-2" style={{
                  backgroundImage: "linear-gradient(135deg, #818cf8 0%, #38bdf8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>Future?</span>
              </h2>

              <p className="text-muted-foreground mb-10 max-w-lg mx-auto relative">
                Join India's most ambitious AI product ecosystem. Get early access to our platforms or partner with us.
              </p>

              <div className="flex flex-wrap gap-4 justify-center relative mb-6">
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(99,102,241,0.3)",
                      "0 0 50px rgba(99,102,241,0.7)",
                      "0 0 20px rgba(99,102,241,0.3)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="rounded-xl"
                >
                  <Link to="/contact"
                    className="btn-glow group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-sm text-primary-foreground transition-all"
                    style={{
                      background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                    }}>
                    Request Early Access
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-xl" />
                  </Link>
                </motion.div>
                <Link to="/partnerships"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm text-foreground border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all backdrop-blur-sm">
                  Explore Partnerships
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                {["SOC2 Type II", "ISO 27001", "Bank-Grade Security", "99.99% Uptime"].map((trust) => (
                  <div key={trust} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase font-mono tracking-wider text-white/60 flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-400/80" />
                    {trust}
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </Layout>
  );
};

export default Index;
