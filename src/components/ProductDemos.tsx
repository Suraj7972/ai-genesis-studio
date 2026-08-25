import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Lock, User, Sparkles, TrendingUp, Search, Star, ShoppingCart, Table, DollarSign, Clock, ShieldCheck, AlertCircle } from "lucide-react";

/* ─── 1. StructEra Demo ─── */
export const StructEraDemo = ({ isActive = true }: { isActive?: boolean }) => {
  const [feature, setFeature] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const t = setInterval(() => setFeature((f) => (f + 1) % 4), 4000);
    return () => clearInterval(t);
  }, [isActive]);

  const pills = ["Founder Score", "Task Streaks", "AI Copilot", "Investor Readiness"];

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="glass-premium rounded-2xl overflow-hidden flex flex-col bg-[#0d101d] border border-indigo-500/20 relative h-[380px] shadow-[0_20px_80px_rgba(99,102,241,0.15)]">
        {/* Chrome header */}
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

        {/* Screen Content */}
        <div className="relative flex-1 overflow-hidden p-6" style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.08), rgba(99,102,241,0.04))', border: '1px solid rgba(99,102,241,0.2)' }}>
          <AnimatePresence mode="wait">
            {feature === 0 && (
              <motion.div key="f0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="flex flex-col items-center justify-center h-full">
                <div className="text-xs font-mono uppercase tracking-wider text-indigo-300 mb-6">Your Founder Score</div>
                <div className="w-32 h-32 rounded-full border-[4px] border-[#1e2336] flex items-center justify-center relative bg-[#131726]">
                  <motion.svg className="absolute inset-0 w-full h-full -rotate-90">
                    <motion.circle cx="60" cy="60" r="56" fill="none" strokeWidth="6" stroke="#818cf8" strokeDasharray="351"
                      initial={{ strokeDashoffset: 351 }} animate={{ strokeDashoffset: 63 }} transition={{ duration: 1.5, ease: "easeOut" }} />
                  </motion.svg>
                  <div className="text-center">
                    <motion.div className="text-3xl font-black text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                      82<span className="text-sm text-white/50">/100</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {feature === 1 && (
              <motion.div key="f1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="flex flex-col justify-center h-full gap-3">
                <h3 className="font-bold text-white/90 text-base mb-2">Today's Tasks</h3>
                {[
                  { label: "Update cap table", done: true },
                  { label: "Review term sheet", done: true },
                  { label: "Pitch deck iterations", done: false },
                ].map((t, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded flex items-center justify-center ${t.done ? 'bg-indigo-500/30 text-[#818cf8]' : 'border border-white/20'}`}>
                        {t.done && <CheckCircle className="w-3.5 h-3.5" />}
                      </div>
                      <span className={`text-sm ${t.done ? 'text-white/50 line-through' : 'text-white font-medium'}`}>{t.label}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {feature === 2 && (
              <motion.div key="f2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} className="flex flex-col justify-center h-full gap-4">
                <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs text-white">AI</div>
                  <span className="font-bold text-sm text-white">AI Copilot</span>
                </div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/[0.05] text-white p-4 rounded-2xl rounded-tl-sm text-sm border border-white/10 shadow-lg">
                  <span className="text-[#818cf8] font-bold block mb-1">Focus on your pitch deck today</span>
                  Your investor meeting is in 3 days. I've highlighted 2 slides that need updated retention metrics.
                </motion.div>
              </motion.div>
            )}

            {feature === 3 && (
              <motion.div key="f3" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="flex flex-col justify-center h-full gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">Investor Readiness</h3>
                  <span className="text-xs font-mono font-bold text-[#818cf8]">74%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/10">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-400"
                    initial={{ width: "0%" }} animate={{ width: "74%" }} transition={{ duration: 1.2, ease: "easeOut" }} />
                </div>

                {/* Checklist items */}
                <div className="space-y-2 mt-2">
                  {[
                    { text: "Pitch deck reviewed", status: "check" },
                    { text: "Financial model ready", status: "check" },
                    { text: "Cap table pending", status: "pending" }
                  ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.2 }}
                      className="flex items-center gap-2.5 text-xs text-white/80 p-2 rounded-lg bg-white/[0.02]"
                    >
                      {item.status === "check" ? (
                        <span className="text-emerald-400 font-bold">✓</span>
                      ) : (
                        <span className="text-amber-400 font-bold">○</span>
                      )}
                      <span className={item.status === "pending" ? "text-white/60" : "text-white font-medium"}>{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {pills.map((p, i) => (
          <button key={i} onClick={() => setFeature(i)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
            style={feature === i
              ? { background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.5)', color: '#818cf8' }
              : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid transparent' }}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ─── 2. SmartBhoomi Demo ─── */
export const SmartBhoomiDemo = ({ isActive = true }: { isActive?: boolean }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const t = setInterval(() => setStep((s) => (s + 1) % 3), 4000);
    return () => clearInterval(t);
  }, [isActive]);

  const pills = ["खर्च नोंद (Expenses)", "कृषी सल्ला (Advisory)", "बाजार भाव (Mandi)"];

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-[280px] h-[400px] bg-[#090b14] rounded-[36px] border-[5px] border-[#1e2336] relative overflow-hidden shadow-[0_20px_80px_rgba(52,211,153,0.15)]"
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#1e2336] rounded-b-xl z-20" />

        <div className="relative w-full h-full pt-8 px-4 bg-gradient-to-b from-[#0f1423] to-[#090b14]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="flex flex-col h-full justify-center">
                <div className="text-center font-bold text-emerald-400 mb-4 text-base">खर्च नोंद करा</div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-white/50 uppercase tracking-wider">Details</label>
                    <div className="h-9 rounded-lg bg-white/5 border border-white/10 flex items-center px-3">
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xs text-white">बियाणे — ₹2,400</motion.span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-white/50 uppercase tracking-wider">Amount (₹)</label>
                    <div className="h-9 rounded-lg bg-white/5 border border-white/10 flex items-center px-3">
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-xs text-white font-mono">2,400</motion.span>
                    </div>
                  </div>
                  <div className="relative pt-2">
                    <motion.button initial={{ scale: 1 }} animate={{ scale: [1, 0.95, 1] }} transition={{ delay: 1.6, duration: 0.4 }} className="w-full py-2.5 bg-emerald-500 rounded-lg font-bold text-white text-xs shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                      जतन करा
                    </motion.button>
                    {/* Ripple */}
                    <motion.span initial={{ scale: 0, opacity: 0.8 }} animate={{ scale: 2, opacity: 0 }} transition={{ delay: 1.6, duration: 0.6 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-emerald-300 pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="flex flex-col justify-center h-full">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-amber-900/30 border border-amber-500/40 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3 border border-amber-500/50">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div className="text-[10px] text-amber-400 font-bold mb-1 uppercase tracking-wider">Krishi Alert</div>
                  <div className="text-lg font-bold text-white mb-2 leading-tight">आज पाऊस — फवारणी टाळा</div>
                  <div className="text-xs text-white/70">Weather forecast: Heavy rain expected. Delay pesticide spraying.</div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="flex flex-col h-full justify-center pt-2">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-sm font-bold text-white">Mandi Prices</div>
                    <div className="text-[10px] text-white/50">Nagpur Today</div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    ▲ +2.4%
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { crop: "सोयाबीन", price: "₹4,850", width: "70%" },
                    { crop: "कापूस", price: "₹7,200", width: "95%" },
                    { crop: "तूर", price: "₹9,100", width: "85%" },
                  ].map((item, i) => (
                    <div key={i} className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                      <div className="flex justify-between text-xs text-white mb-1 font-medium">
                        <span>{item.crop}</span>
                        <span className="font-mono text-emerald-300">{item.price}</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div className="h-full bg-emerald-400 rounded-full" initial={{ width: "0%" }} animate={{ width: item.width }} transition={{ duration: 0.8, delay: i * 0.2 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {pills.map((p, i) => (
          <button key={i} onClick={() => setStep(i)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
            style={step === i
              ? { background: 'rgba(52,211,153,0.2)', border: '1px solid rgba(52,211,153,0.5)', color: '#34d399' }
              : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid transparent' }}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ─── 3. TheCrows Demo ─── */
export const TheCrowsDemo = ({ isActive = true }: { isActive?: boolean }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const t = setInterval(() => setStep((s) => (s + 1) % 3), 4000);
    return () => clearInterval(t);
  }, [isActive]);

  const pills = ["Masked Identity", "Smart Escrow", "Trust Engine"];

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="glass-premium rounded-2xl overflow-hidden flex flex-col bg-[#0d101d] border border-rose-500/20 relative h-[380px] shadow-[0_20px_80px_rgba(251,113,133,0.15)]">
        {/* Chrome */}
        <div className="h-8 bg-[#1a1d2d] border-b border-white/5 flex items-center px-4 gap-2 shrink-0">
          <div className="flex gap-[6px]">
            <div className="w-[10px] h-[10px] rounded-full bg-[#ef4444]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#f59e0b]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#22c55e]" />
          </div>
          <div className="mx-auto flex justify-center w-[60%] bg-black/40 rounded py-1 text-[11px] text-gray-500 tracking-wide font-sans">
            thecrows.sraisystems.in
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden p-6 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(244,63,94,0.08), rgba(251,113,133,0.04))', border: '1px solid rgba(251,113,133,0.2)' }}>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="c0" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} className="w-full max-w-xs p-5 rounded-2xl bg-white/[0.04] border border-rose-500/30 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3 border border-rose-500/40">
                  <User size={22} />
                </div>
                <div className="h-6 flex items-center justify-center mb-1">
                  <motion.span initial={{ filter: "blur(0px)", opacity: 1 }} animate={{ filter: "blur(6px)", opacity: 0 }} transition={{ delay: 1, duration: 0.5 }} className="absolute text-sm font-bold text-white">
                    Rahul P.
                  </motion.span>
                  <motion.span initial={{ filter: "blur(6px)", opacity: 0 }} animate={{ filter: "blur(0px)", opacity: 1 }} transition={{ delay: 1.5, duration: 0.5 }} className="text-sm font-mono font-bold text-rose-300 tracking-wider">
                    USER_7X9K2
                  </motion.span>
                </div>
                <span className="text-[10px] font-mono text-rose-400/80 uppercase tracking-widest bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20 mt-2">
                  🔒 Identity Masked
                </span>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="c1" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="w-full max-w-xs p-5 rounded-2xl bg-white/[0.04] border border-rose-500/40">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <Lock size={16} className="text-rose-400" />
                    <span className="text-sm font-bold text-white">Escrow Contract</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/50">#8492</span>
                </div>
                <div className="text-2xl font-mono font-bold text-white mb-2">₹15,000</div>
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300 font-medium">
                  <span>Funds Protected ✓</span>
                  <span className="text-[10px] text-emerald-400/70 font-mono">LOCKED</span>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="c2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} className="w-full max-w-xs p-5 rounded-2xl bg-gradient-to-br from-rose-500/15 to-purple-900/30 border border-rose-500/40 text-center">
                <div className="text-xs text-rose-300 uppercase tracking-wider mb-2 font-mono">Party Verification</div>
                <div className="flex justify-center gap-1.5 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.div key={star} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: star * 0.15 }} className="text-amber-400 text-lg">
                      ★
                    </motion.div>
                  ))}
                </div>
                <div className="text-xl font-bold text-white mb-2 font-syne">Trust Score 94</div>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                  <CheckCircle size={10} /> Verified Seller
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {pills.map((p, i) => (
          <button key={i} onClick={() => setStep(i)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
            style={step === i
              ? { background: 'rgba(251,113,133,0.2)', border: '1px solid rgba(251,113,133,0.5)', color: '#fb7185' }
              : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid transparent' }}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ─── 4. FoodieFlow Demo ─── */
export const FoodieFlowDemo = ({ isActive = true }: { isActive?: boolean }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const t = setInterval(() => setStep((s) => (s + 1) % 2), 5000);
    return () => clearInterval(t);
  }, [isActive]);

  const pills = ["Hyperlocal Search", "Community Picks", "Instant Orders"];

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="glass-premium rounded-2xl overflow-hidden flex flex-col bg-[#0d101d] border border-sky-500/20 relative h-[380px] shadow-[0_20px_80px_rgba(56,189,248,0.15)]">
        {/* Chrome */}
        <div className="h-8 bg-[#1a1d2d] border-b border-white/5 flex items-center px-4 gap-2 shrink-0">
          <div className="flex gap-[6px]">
            <div className="w-[10px] h-[10px] rounded-full bg-[#ef4444]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#f59e0b]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#22c55e]" />
          </div>
          <div className="mx-auto flex justify-center w-[60%] bg-black/40 rounded py-1 text-[11px] text-gray-500 tracking-wide font-sans">
            foodieflow.sraisystems.in
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden p-5 flex flex-col justify-center" style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.08), rgba(56,189,248,0.04))', border: '1px solid rgba(56,189,248,0.2)' }}>
          {/* Animated Search Bar */}
          <div className="mb-4">
            <div className="h-9 rounded-xl bg-white/5 border border-white/10 flex items-center px-3 text-xs text-white/80 gap-2">
              <Search className="w-3.5 h-3.5 text-sky-400" />
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="font-mono text-sky-200">
                biryani near me
              </motion.span>
            </div>
          </div>

          {/* Restaurant Cards */}
          <div className="space-y-2.5">
            {[
              { emoji: "🍲", name: "Aroma Biryani House", rating: "★ 4.6", dist: "1.2 km", badge: true },
              { emoji: "🍛", name: "Royal Spice Hub", rating: "★ 4.4", dist: "2.5 km", badge: false },
              { emoji: "🥘", name: "Zaika Express", rating: "★ 4.8", dist: "0.8 km", badge: false },
            ].map((res, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.2 }}
                className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between relative overflow-hidden"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{res.emoji}</span>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      {res.name}
                      {res.badge && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 1 }}
                          className="text-[9px] bg-sky-500/20 text-sky-300 border border-sky-500/40 px-1.5 py-0.5 rounded font-mono font-bold"
                        >
                          Community Pick 🏆
                        </motion.span>
                      )}
                    </div>
                    <div className="text-[10px] text-white/50">{res.rating} · {res.dist}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pulse WhatsApp button */}
          <motion.div className="mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
            <motion.button animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 2, repeat: Infinity }}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2"
            >
              <span>Order via WhatsApp 💬</span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {pills.map((p, i) => (
          <button key={i} onClick={() => setStep(i)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
            style={step === i
              ? { background: 'rgba(56,189,248,0.2)', border: '1px solid rgba(56,189,248,0.5)', color: '#38bdf8' }
              : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid transparent' }}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ─── 5. Hotel Management AI Demo ─── */
export const HotelAIDemo = ({ isActive = true }: { isActive?: boolean }) => {
  const [screen, setScreen] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const t = setInterval(() => setScreen((s) => (s + 1) % 2), 4000);
    return () => clearInterval(t);
  }, [isActive]);

  const pills = ["Table Grid", "Daily P&L"];

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="glass-premium rounded-2xl overflow-hidden flex flex-col bg-[#0d101d] border border-amber-500/20 relative h-[380px] shadow-[0_20px_80px_rgba(251,191,36,0.15)]">
        {/* Chrome */}
        <div className="h-8 bg-[#1a1d2d] border-b border-white/5 flex items-center px-4 gap-2 shrink-0">
          <div className="flex gap-[6px]">
            <div className="w-[10px] h-[10px] rounded-full bg-[#ef4444]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#f59e0b]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#22c55e]" />
          </div>
          <div className="mx-auto flex justify-center w-[60%] bg-black/40 rounded py-1 text-[11px] text-gray-500 tracking-wide font-sans">
            hotelai.sraisystems.in
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden p-5 flex flex-col justify-center" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(251,191,36,0.04))', border: '1px solid rgba(251,191,36,0.2)' }}>
          <AnimatePresence mode="wait">
            {screen === 0 && (
              <motion.div key="h0" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="flex flex-col h-full justify-center">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-white">Floor Plan</span>
                  <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    Occupied: 5/12 → 8/12
                  </span>
                </div>
                {/* 4x3 Grid */}
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 12 }).map((_, idx) => {
                    const isFlipping = idx === 2 || idx === 6 || idx === 9;
                    const isOccupied = idx < 5 || isFlipping;
                    return (
                      <motion.div key={idx} initial={{ scale: 1 }} animate={isFlipping ? { scale: [1, 1.1, 1] } : {}} transition={{ delay: 0.5 + idx * 0.1 }}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all ${isOccupied ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}
                      >
                        <Table className="w-4 h-4" />
                        <span className="text-[10px] font-mono font-bold">T{idx + 1}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {screen === 1 && (
              <motion.div key="h1" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="flex flex-col justify-center h-full gap-3 max-w-sm mx-auto w-full">
                <div className="text-xs uppercase tracking-wider text-amber-400 font-mono font-bold">Daily P&L Analytics</div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="text-[10px] text-white/50 mb-0.5">Today's Revenue</div>
                  <motion.div className="text-2xl font-mono font-bold text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    ₹48,250
                  </motion.div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-white/70 px-1">
                    <span>Kitchen costs</span>
                    <span className="font-mono text-rose-300">- ₹12,400</span>
                  </div>
                  <div className="flex justify-between text-xs text-white/70 px-1">
                    <span>Staff & Advance</span>
                    <span className="font-mono text-rose-300">- ₹8,200</span>
                  </div>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                    className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex justify-between items-center text-emerald-300 font-bold text-xs"
                  >
                    <span>Net Profit</span>
                    <span className="font-mono text-sm text-emerald-400">₹27,650 ✓</span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {pills.map((p, i) => (
          <button key={i} onClick={() => setScreen(i)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
            style={screen === i
              ? { background: 'rgba(251,191,36,0.2)', border: '1px solid rgba(251,191,36,0.5)', color: '#fbbf24' }
              : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid transparent' }}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ─── 6. SRAI Auctions Demo ─── */
export const AuctionsDemo = ({ isActive = true }: { isActive?: boolean }) => {
  const [seconds, setSeconds] = useState(14);
  const [bids, setBids] = useState([
    { name: "Rahul_K", amount: 3400, time: "Just now" }
  ]);
  const [currentBid, setCurrentBid] = useState(3400);
  const [isSold, setIsSold] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          setIsSold(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  useEffect(() => {
    if (!isActive || isSold) return;

    const bidTimer = setInterval(() => {
      setCurrentBid((prev) => {
        const nextBid = prev + 250;
        setBids((b) => [{ name: nextBid > 3600 ? "Priya_M" : "Amit_S", amount: nextBid, time: "Just now" }, ...b.slice(0, 1)]);
        return nextBid;
      });
    }, 2500);

    return () => clearInterval(bidTimer);
  }, [isActive, isSold]);

  // Reset loop when sold
  useEffect(() => {
    if (isSold) {
      const reset = setTimeout(() => {
        setIsSold(false);
        setSeconds(14);
        setCurrentBid(3200);
        setBids([{ name: "Rahul_K", amount: 3400, time: "Just now" }]);
      }, 2500);
      return () => clearTimeout(reset);
    }
  }, [isSold]);

  const pills = ["Live Bidding", "Escrow Protection"];

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="glass-premium rounded-2xl overflow-hidden flex flex-col bg-[#0d101d] border border-orange-500/20 relative h-[380px] shadow-[0_20px_80px_rgba(249,115,22,0.15)]">
        {/* Chrome */}
        <div className="h-8 bg-[#1a1d2d] border-b border-white/5 flex items-center px-4 gap-2 shrink-0">
          <div className="flex gap-[6px]">
            <div className="w-[10px] h-[10px] rounded-full bg-[#ef4444]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#f59e0b]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#22c55e]" />
          </div>
          <div className="mx-auto flex justify-center w-[60%] bg-black/40 rounded py-1 text-[11px] text-gray-500 tracking-wide font-sans">
            auctions.sraisystems.in
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden p-5 flex flex-col justify-center" style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(251,146,60,0.04))', border: '1px solid rgba(249,115,22,0.2)' }}>
          {isSold ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center h-full text-center p-4">
              <div className="w-14 h-14 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 flex items-center justify-center mb-3">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">SOLD ✓</h3>
              <p className="text-xs text-orange-300 font-mono mb-3">Winning Bid: ₹{currentBid}</p>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30">
                Escrow Initiated
              </span>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {/* Top Item Card Header */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-mono uppercase text-orange-400 font-bold mb-1">Lot #402</div>
                  <h3 className="text-base font-bold text-white">Antique Brass Lamp</h3>
                </div>
                <div className="flex items-center gap-1.5 bg-rose-500/20 border border-rose-500/30 text-rose-300 px-2.5 py-1 rounded-full font-mono text-xs font-bold">
                  <Clock size={12} className="animate-pulse" />
                  00:{seconds < 10 ? `0${seconds}` : seconds}
                </div>
              </div>

              {/* Price Pop */}
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-white/50 block">Current High Bid</span>
                  <motion.span key={currentBid} initial={{ scale: 1.2, color: "#f97316" }} animate={{ scale: 1, color: "#ffffff" }} className="text-2xl font-mono font-bold">
                    ₹{currentBid.toLocaleString()}
                  </motion.span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  Reserve Met
                </span>
              </div>

              {/* Live Bids Feed */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-mono text-white/40 uppercase">Recent Bids</div>
                {bids.map((b, idx) => (
                  <motion.div key={`${b.name}-${b.amount}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20 flex justify-between items-center text-xs"
                  >
                    <span className="font-mono text-orange-200 font-medium">{b.name} bid</span>
                    <span className="font-mono font-bold text-white">₹{b.amount.toLocaleString()}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {pills.map((p, i) => (
          <button key={i} className="px-3 py-1.5 rounded-full text-xs font-medium bg-orange-500/20 border border-orange-500/40 text-[#f97316]">
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ─── 7. ModGuardian Demo ─── */
export const ModGuardianDemo = ({ isActive = true }: { isActive?: boolean }) => {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const t = setInterval(() => setLineIndex((l) => (l + 1) % 5), 2500);
    return () => clearInterval(t);
  }, [isActive]);

  const pills = ["Live Scanner", "Auto Audit"];

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="glass-premium rounded-2xl overflow-hidden flex flex-col bg-[#080912] border border-purple-500/20 relative h-[380px] shadow-[0_20px_80px_rgba(167,139,250,0.15)] font-mono">
        {/* Header stat row */}
        <div className="h-9 bg-[#121324] border-b border-white/10 flex items-center justify-between px-4 text-[11px] shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-300 font-bold">ModGuardian CLI</span>
          </div>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="text-emerald-400 flex items-center gap-1">● 99.2% clean</span>
            <span className="text-rose-400 flex items-center gap-1">● 0.8% flagged</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-4 flex-1 text-xs space-y-2 overflow-hidden flex flex-col justify-center">
          {lineIndex >= 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/60">
              &gt; scanning content batch #4,092...
            </motion.div>
          )}
          {lineIndex >= 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/80">
              &gt; 128 items processed
            </motion.div>
          )}
          {lineIndex >= 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-rose-400 font-bold">
              &gt; flagged: 3 (hate speech: 1, spam: 2)
            </motion.div>
          )}
          {lineIndex >= 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-400 font-bold">
              &gt; action: auto-removed · audit logged ✓
            </motion.div>
          )}
          {lineIndex >= 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-purple-300">
              &gt; batch completed in 14ms. standby...
            </motion.div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {pills.map((p, i) => (
          <button key={i} className="px-3 py-1.5 rounded-full text-xs font-medium bg-purple-500/20 border border-purple-500/40 text-[#a78bfa]">
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};
