import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/* ─── Neural network node canvas ─── */
const NeuralCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface Node {
      x: number; y: number; vx: number; vy: number;
      radius: number; pulsePhase: number; active: boolean;
    }

    const nodes: Node[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: 1.5 + Math.random() * 2,
      pulsePhase: Math.random() * Math.PI * 2,
      active: Math.random() > 0.7,
    }));

    let t = 0;
    let rafId: number;
    const animate = () => {
      t += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.12;
            const pulse = nodes[i].active || nodes[j].active ? alpha * 2 : alpha;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${pulse})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        const pulse = Math.sin(t * 2 + node.pulsePhase) * 0.5 + 0.5;
        const alpha = node.active ? 0.5 + pulse * 0.5 : 0.15 + pulse * 0.1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.active
          ? `rgba(99, 102, 241, ${alpha})`
          : `rgba(148, 163, 184, ${alpha * 0.4})`;
        ctx.fill();

        if (node.active) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99, 102, 241, ${0.04 * pulse})`;
          ctx.fill();
        }
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
};

/* ─── Live status ticker ─── */
const LiveTicker = () => {
  const items = [
    "SmartBhoomi: Active — AI farm management",
    "StructEra: Flagship — Founder OS",
    "TheCrows: Active — Privacy-first trust",
    "ModGuardian: In development",
    "SRAI Auctions: Coming soon",
  ];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="inline-flex items-center gap-2.5 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground px-4 py-2.5 rounded-full border border-border/40 bg-card/40 backdrop-blur-md">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400/60 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="text-foreground/70"
        >
          {items[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

/* ─── System Core — AI Command Center ─── */
const SystemCore = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-200, 200], [5, -5]);
  const rotateY = useTransform(x, [-200, 200], [-5, 5]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const products_mini = [
    { label: "StructEra", color: "#818cf8", angle: 0 },
    { label: "SmartBhoomi", color: "#34d399", angle: 51 },
    { label: "TheCrows", color: "#fb7185", angle: 103 },
    { label: "FoodieFlow", color: "#38bdf8", angle: 154 },
    { label: "Hotel AI", color: "#fbbf24", angle: 206 },
    { label: "Auctions", color: "#f97316", angle: 257 },
    { label: "ModGuardian", color: "#a78bfa", angle: 308 },
  ];

  return (
    <motion.div 
      className="relative w-[400px] h-[400px] mx-auto filter drop-shadow-[0_0_30px_rgba(99,102,241,0.2)]"
      style={{ perspective: 1000, rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer orbits: 140, 200, 260px rings, mapped to absolute 280, 400, 520 if these were diameters, but lets use inset to control sizes from the 400px container.
          Container is 400x400. Center is 200,200.
          Ring 140px diameter -> radius 70. Inset = 200 - 70 = 130px.
          Ring 200px diameter -> radius 100. Inset = 200 - 100 = 100px.
          Ring 260px diameter -> radius 130. Inset = 200 - 130 = 70px.
      */}
      <motion.div className="absolute inset-[70px] rounded-full border border-primary/15 border-dashed"
        animate={{ rotate: 360 }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} />
      <motion.div className="absolute inset-[100px] rounded-full border border-[rgba(99,102,241,0.10)]"
        animate={{ rotate: -360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} />
      <motion.div className="absolute inset-[130px] rounded-full border border-[rgba(99,102,241,0.20)]"
        animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />

      {/* Radar sweep */}
      <motion.div className="absolute inset-[70px] rounded-full overflow-hidden pointer-events-none"
        animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-1/2 left-1/2 w-[260px] h-[260px] origin-top-left"
          style={{ background: 'conic-gradient(from 180deg at 0 0, transparent 0deg, rgba(99,102,241,0.04) 90deg, transparent 90deg)' }} />
      </motion.div>

      {/* Orbiting Products (on 260px ring = 130 radius) */}
      {products_mini.map((p, i) => {
        const rad = (p.angle * Math.PI) / 180;
        const radius = 130;
        const posX = Math.cos(rad) * radius;
        const posY = Math.sin(rad) * radius;
        return (
          <motion.div key={p.label} className="absolute left-1/2 top-1/2 flex flex-col items-center justify-center cursor-pointer group"
            style={{ x: posX - 19, y: posY - 19 }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}>
            <div className="w-[38px] h-[38px] rounded-[10px] flex flex-col items-center justify-center text-[10px] font-bold backdrop-blur-md relative z-10 transition-shadow duration-300"
              style={{ background: `${p.color}26`, border: `1px solid ${p.color}`, boxShadow: `0 0 15px ${p.color}40`, color: p.color }}>
              {p.label.slice(0, 2).toUpperCase()}
            </div>
            {/* Tooltip on hover */}
            <div className="absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background border border-border/50 px-2 py-1 rounded text-[9px] whitespace-nowrap z-20 pointer-events-none">
              <span style={{ color: p.color }}>SYS_{p.label.toUpperCase()}</span>
            </div>
            {/* Connecting line */}
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10" width="400" height="400" style={{ overflow: "visible" }}>
              <line x1="0" y1="0" x2={-posX} y2={-posY} stroke={p.color} strokeWidth="1" strokeOpacity="0.12" strokeDasharray="3 3" />
            </svg>
          </motion.div>
        );
      })}

      {/* Core Unit (88px) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div className="w-[88px] h-[88px] rounded-full flex flex-col items-center justify-center relative z-10"
          style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", boxShadow: "0 0 60px rgba(99,102,241,0.5), 0 0 120px rgba(99,102,241,0.2)" }}
          animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <span className="text-3xl font-black font-syne text-white">SR</span>
        </motion.div>
      </div>

      {/* Floating data points (8-10 dots) */}
      {[...Array(10)].map((_, i) => {
        // Random position within 200px (100px radius)
        const rad = Math.random() * Math.PI * 2;
        const distance = Math.random() * 80;
        return (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-0.5 h-0.5 rounded-full"
            style={{ 
              left: 200 + Math.cos(rad) * distance, 
              top: 200 + Math.sin(rad) * distance,
              backgroundColor: products_mini[i % products_mini.length].color
            }}
            animate={{ y: [-10, 10, -10], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: Math.random() }}
          />
        );
      })}
    </motion.div>
  );
};

const HeroDemoWindow = () => {
  const [screen, setScreen] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const t = setInterval(() => setScreen((s) => (s + 1) % 3), 3000);
    return () => clearInterval(t);
  }, [isHovered]);

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto">
      <motion.div
        animate={{ rotate: isHovered ? 0 : -2, y: 0 }}
        transition={{ duration: 0.4 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full cursor-pointer"
        style={{ boxShadow: '0 40px 120px rgba(99,102,241,0.3)' }}
      >
        <div className="glass-premium rounded-xl overflow-hidden flex flex-col bg-[#0d101d] border border-white/10 relative h-[380px]">
          {/* Chrome */}
          <div className="h-8 bg-[#1a1d2d] border-b border-white/5 flex items-center px-4 gap-2 shrink-0">
            <div className="flex gap-[6px]">
              <div className="w-[10px] h-[10px] rounded-full bg-[#ef4444]" />
              <div className="w-[10px] h-[10px] rounded-full bg-[#f59e0b]" />
              <div className="w-[10px] h-[10px] rounded-full bg-[#22c55e]" />
            </div>
            <div className="mx-auto flex justify-center w-[60%] bg-black/40 rounded py-1 text-[11px] text-gray-500 tracking-wide font-sans">
              structera.sraisystems.in
            </div>
          </div>

          {/* Screens */}
          <div className="relative flex-1 bg-[#0a0c16] overflow-hidden">
            {/* Animated Cursor Dot */}
            <motion.div
              key={`cursor-${screen}`}
              initial={{ left: "20%", top: "80%", opacity: 0 }}
              animate={{
                left: screen === 0 ? ["20%", "65%"] : screen === 1 ? ["20%", "72%"] : ["20%", "85%"],
                top: screen === 0 ? ["80%", "45%"] : screen === 1 ? ["80%", "32%"] : ["80%", "38%"],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 1.8, times: [0, 0.4, 0.8, 1] }}
              className="absolute pointer-events-none z-30 flex items-center justify-center"
            >
              <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_12px_#ffffff] border border-black/40" />
              <motion.div
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute w-4 h-4 rounded-full border-2 border-indigo-400 pointer-events-none"
              />
            </motion.div>

            <AnimatePresence mode="popLayout">
              {screen === 0 && (
                <motion.div key="sc1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 p-6 flex flex-col justify-center">
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[8px] font-mono uppercase bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full border border-green-500/20">
                     <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" /> LIVE
                  </div>
                  <div className="flex gap-6 mb-8 mt-2 items-center">
                    <div className="w-20 h-20 rounded-full border-[4px] border-[#1e2336] flex items-center justify-center relative bg-[#131726]">
                      <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle cx="36" cy="36" r="34" fill="none" strokeWidth="4" stroke="hsl(230 90% 60%)" strokeDasharray="213" strokeDashoffset="38" />
                      </svg>
                      <div className="text-center">
                        <div className="text-xl font-black text-white leading-tight">82<span className="text-[10px] text-white/50">/100</span></div>
                        <div className="text-[8px] text-indigo-300">Founder Score</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-white mb-2">Today</div>
                      <div className="space-y-1">
                         <div className="flex items-center gap-2 text-xs text-muted-foreground"><div className="w-1.5 h-1.5 rounded-full bg-green-400" /> Prepare pitch deck</div>
                         <div className="flex items-center gap-2 text-xs text-muted-foreground"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Find grants</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {screen === 1 && (
                <motion.div key="sc2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs text-white">AI</div>
                    <span className="font-bold text-sm text-white">AI Copilot</span>
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="self-end bg-primary/20 text-indigo-100 p-3 rounded-2xl rounded-tr-sm text-xs max-w-[80%]">
                      Help me prepare for investor meeting.
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                      className="self-start bg-white/[0.05] text-muted-foreground p-3 rounded-2xl rounded-tl-sm text-xs max-w-[80%] flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                      Analyzing your current traction metrics...
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {screen === 2 && (
                <motion.div key="sc3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 p-6 flex flex-col justify-center">
                  <h3 className="font-bold text-sm mb-4 text-white">Scheme Discovery</h3>
                  <div className="space-y-4">
                    {[
                      { name: "PM MUDRA Loan", grant: "₹10L", match: "87%" },
                      { name: "Startup India Seed Fund", grant: "₹20L", match: "64%" },
                      { name: "MSME ZED Certification", grant: "Subsidy", match: "92%" }
                    ].map((sch, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }}
                        className="p-3 rounded-lg bg-gradient-to-r from-indigo-500/10 to-transparent border border-indigo-500/20 flex justify-between items-center"
                      >
                        <div>
                          <div className="font-bold text-xs text-indigo-300">{sch.name}</div>
                          <div className="text-[10px] text-muted-foreground">Match: <span className="text-green-400">{sch.match}</span></div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-white">{sch.grant}</span>
                          <div className="px-3 py-1 bg-indigo-500 text-white rounded text-[10px] font-bold">Apply</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Screen Dots Indicator */}
      <div className="flex items-center justify-center gap-2 mt-3">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={() => setScreen(i)}
            aria-label={`Jump to screen ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              screen === i ? "w-6 bg-indigo-400" : "w-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
      
      <div className="mt-3 text-center">
        <a href="#structera" onClick={(e) => { e.preventDefault() }}
           className="text-xs font-mono text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-wider inline-flex items-center gap-1">
          Live preview of StructEra OS <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

/* ─── Main Hero ─── */
const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["Trustworthy", "Practical", "India-Built", "Production-Grade"];

  useEffect(() => {
    const t = setInterval(() => setWordIndex((i) => (i + 1) % words.length), 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative flex items-center overflow-hidden" style={{ minHeight: '100svh' }}>
      {/* Subtle real background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
          alt=""
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.08]"
        />
      </div>

      {/* Neural canvas background */}
      <div className="absolute inset-0 pointer-events-none">
        <NeuralCanvas />
      </div>

      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 mesh-bg pointer-events-none" />

      {/* HUD grid — command center feel */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />

      {/* Corner HUD brackets */}
      <div className="absolute top-8 left-8 w-16 h-16 hud-bracket-tl pointer-events-none hidden lg:block" />
      <div className="absolute top-8 right-8 w-16 h-16 hud-bracket-tr pointer-events-none hidden lg:block" />
      <div className="absolute bottom-16 left-8 w-16 h-16 hud-bracket-bl pointer-events-none hidden lg:block" />
      <div className="absolute bottom-16 right-8 w-16 h-16 hud-bracket-br pointer-events-none hidden lg:block" />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, hsl(var(--background)), transparent)" }}
      />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
        {/* Left */}
        <div className="order-2 lg:order-1 flex flex-col justify-center">
          {/* Eyebrow Pill */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="mb-6">
            <div className="inline-flex items-center text-[11px] font-mono tracking-wide text-foreground px-4 py-2 rounded-full border border-border/40 bg-card/40 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)]">
               ● SRAI Systems · AI Product Studio · Nagpur, India
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="mb-6">
            <h1 className="flex flex-col text-7xl md:text-8xl lg:text-9xl font-black leading-[1.05] tracking-[-0.03em] font-syne">
              <span className="text-white/95">Engineering</span>
              <span className="relative w-fit" style={{
                minHeight: '1.2em',
                display: 'flex',
                alignItems: 'center',
                backgroundImage: "linear-gradient(135deg, #818cf8 0%, #38bdf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundSize: "200% 200%",
              }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, filter: "blur(8px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(8px)" }}
                    transition={{ duration: 0.35 }}
                    className="absolute left-0 w-full"
                    style={{ display: "inline-block" }}
                  >
                    {words[wordIndex]}.
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="text-white/85">AI Systems</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg font-medium md:whitespace-nowrap"
          >
            7 AI platforms. Built in India. Production-grade, not demos.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-wrap gap-4 mb-12">
            <Link
              to="/products"
              className="group relative inline-flex items-center justify-center gap-2.5 px-8 h-[48px] rounded-xl font-semibold text-sm text-white overflow-hidden transition-all shadow-lg shimmer-sweep"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                boxShadow: "0 0 30px rgba(99,102,241,0.3)",
              }}
            >
              <span className="relative z-10">Explore Our Platforms</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2.5 px-8 h-[48px] rounded-xl font-semibold text-sm text-foreground transition-all hover:bg-white/5 backdrop-blur-sm"
            >
              Get Early Access
            </Link>
          </motion.div>

          {/* Stats Bar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
               <div className="glass-premium rounded-xl p-4 text-center hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(129,140,248,0.2)] transition-all">
                  <div className="text-xl md:text-2xl font-black text-[#818cf8] mb-1">7</div>
                  <div className="text-[10px] uppercase font-mono text-muted-foreground tracking-wider">AI Platforms</div>
               </div>
               <div className="glass-premium rounded-xl p-4 text-center hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(52,211,153,0.2)] transition-all">
                  <div className="text-xl md:text-2xl font-black text-[#34d399] mb-1">4+</div>
                  <div className="text-[10px] uppercase font-mono text-muted-foreground tracking-wider">Industries</div>
               </div>
               <div className="glass-premium rounded-xl p-4 text-center hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(251,113,133,0.2)] transition-all">
                  <div className="text-xl md:text-2xl font-black text-[#fb7185] mb-1">India</div>
                  <div className="text-[10px] uppercase font-mono text-muted-foreground tracking-wider">Built For</div>
               </div>
               <div className="glass-premium rounded-xl p-4 text-center hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(251,191,36,0.2)] transition-all">
                  <div className="text-xl md:text-2xl font-black text-[#fbbf24] mb-1">Free</div>
                  <div className="text-[10px] uppercase font-mono text-muted-foreground tracking-wider">Early Access</div>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Demo window */}
        <motion.div
          className="order-1 lg:order-2 flex items-center justify-center relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroDemoWindow />
          {/* Decorative System Core top right */}
          <div className="absolute top-[-100px] right-[-40px] pointer-events-none z-10 opacity-40 hidden lg:block origin-top-right transform scale-[0.6]">
             <SystemCore />
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, hsl(var(--background)), transparent)" }}
      />

      {/* Premium metrics bar at bottom */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-0 left-0 right-0 border-t border-border/10 bg-background/50 backdrop-blur-md z-20 hidden md:block py-2"
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-center text-[10px] font-mono text-white/40 uppercase tracking-wider gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse box-shadow-[0_0_8px_#22c55e]" />
            SYS_OP: NOMINAL
          </div>
          <div>·</div>
          <div>LATENCY: 12MS</div>
          <div>·</div>
          <div>NODES: 4,092 ACTIVE</div>
          <div>·</div>
          <div>UPTIME 99.99%</div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
