import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { products } from "@/data/srai";
import ProductIcon from "./ProductIcon";

/* HUD rings behind the spotlight */
const HudOverlay = ({ accentHsl }: { accentHsl: string }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <motion.div
      className="absolute top-1/2 right-0 md:right-12 -translate-y-1/2 w-64 h-64 rounded-full border opacity-[0.06]"
      style={{ borderColor: `hsl(${accentHsl})` }}
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute top-1/2 right-4 md:right-16 -translate-y-1/2 w-48 h-48 rounded-full border opacity-[0.04]"
      style={{ borderColor: `hsl(${accentHsl})` }}
      animate={{ rotate: -360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute left-0 right-0 h-[1px]"
      style={{ background: `linear-gradient(90deg, transparent, hsl(${accentHsl} / 0.15), transparent)` }}
      animate={{ top: ["20%", "80%", "20%"] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
    <div className="absolute top-1/2 right-8 md:right-20 -translate-y-1/2 w-36 h-36 rounded-full border border-dashed opacity-[0.04]"
      style={{ borderColor: `hsl(${accentHsl})` }}
    />
  </div>
);

const SpotlightCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [progress, setProgress] = useState(0);
  const product = products[current];
  const intervalRef = useRef<number>(0);

  useEffect(() => {
    if (!autoplay) { setProgress(0); return; }
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(elapsed / 5000, 1));
      if (elapsed >= 5000) {
        setCurrent((c) => (c + 1) % products.length);
        startAnimatedProgress();
        return;
      }
      intervalRef.current = requestAnimationFrame(tick);
    };
    const startAnimatedProgress = () => {
        intervalRef.current = requestAnimationFrame(tick);
    };
    intervalRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(intervalRef.current);
  }, [autoplay, current]);

  const next = useCallback(() => { setAutoplay(false); setCurrent((c) => (c + 1) % products.length); }, []);
  const prev = useCallback(() => { setAutoplay(false); setCurrent((c) => (c - 1 + products.length) % products.length); }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  return (
    <div className="relative glass-premium rounded-2xl p-8 md:p-12 overflow-hidden min-h-[400px] group">
      {/* Autoplay progress bar at TOP */}
      {autoplay && (
        <div className="absolute top-0 left-0 right-0 h-[2px] z-20">
          <div
            className="h-full transition-none"
            style={{
              width: `${progress * 100}%`,
              background: `linear-gradient(90deg, hsl(${product.accentHsl}), hsl(${product.accentHsl} / 0.8))`,
              boxShadow: `0 0 10px hsl(${product.accentHsl})`
            }}
          />
        </div>
      )}

      {/* Real image background with overlay */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={product.id}
            src={product.mediaPoster}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover object-center brightness-90"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
        {/* Heavy dark overlay */}
        <div className="absolute inset-0" style={{ background: "rgba(5, 5, 15, 0.55)" }} />
        {/* Colored tint */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: `radial-gradient(ellipse at 70% 50%, hsl(${product.accentHsl} / 0.15), transparent 60%)`,
          }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <HudOverlay accentHsl={product.accentHsl} />

      <div className="relative z-10 flex flex-col lg:flex-row h-full gap-8">
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                exit: { opacity: 0, transition: { duration: 0.3 } }
              }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-4 mb-5">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
                    exit: { opacity: 0, x: -20 }
                  }}
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: `hsl(${product.accentHsl} / 0.1)`,
                    border: `1px solid hsl(${product.accentHsl} / 0.2)`,
                    boxShadow: `0 0 20px hsl(${product.accentHsl} / 0.15)`,
                  }}
                >
                  <ProductIcon
                    name={product.icon}
                    className="w-7 h-7"
                    style={{ color: `hsl(${product.accentHsl})` }}
                  />
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                    exit: { opacity: 0, x: -10 }
                  }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    {product.name}
                  </h3>
                  <div className="flex gap-2 mt-1">
                    <span
                      className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        background: `hsl(${product.accentHsl} / 0.1)`,
                        color: `hsl(${product.accentHsl})`,
                      }}
                    >
                      {product.status}
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                      {product.bestFor}
                    </span>
                  </div>
                </motion.div>
              </div>

              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: 10 }
                }}
                style={{ color: `hsl(${product.accentHsl})` }} 
                className="font-medium mb-3 text-sm"
              >
                {product.tagline}
              </motion.p>
              
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: 10 }
                }}
                className="text-muted-foreground text-sm max-w-2xl leading-relaxed mb-7"
              >
                {product.description}
              </motion.p>
              
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: 10 }
                }}
              >
                <a
                  href={product.subdomain}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-primary-foreground font-medium text-sm transition-all hover:brightness-110"
                  style={{
                    background: `hsl(${product.accentHsl})`,
                    boxShadow: `0 0 20px hsl(${product.accentHsl} / 0.25)`,
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit {product.name}
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Filmstrip Navigation (Desktop) */}
        <div className="hidden lg:flex flex-col gap-2.5 pt-2 pl-4 border-l border-white/5 relative">
          {products.map((p, i) => {
            const isActive = i === current;
            return (
              <button
                key={p.id}
                onClick={() => { setAutoplay(false); setCurrent(i); }}
                className={`relative min-w-[64px] min-h-[64px] w-[64px] h-[64px] rounded-lg overflow-hidden transition-all duration-300 shrink-0 ${
                  isActive ? "border-[2px] scale-105 z-10" : "opacity-50 hover:opacity-100 grayscale hover:grayscale-0"
                }`}
                style={{
                  borderColor: isActive ? `hsl(${p.accentHsl})` : "transparent",
                  boxShadow: isActive ? `0 0 15px hsl(${p.accentHsl} / 0.3)` : "none",
                  backgroundColor: `hsl(${p.accentHsl} / 0.2)`
                }}
              >
                <img src={p.mediaPoster} alt={p.name} className="absolute inset-0 w-full h-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
                <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <ProductIcon name={p.icon} className="w-6 h-6 text-white" />
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* Navigation Arrows (Large Thin Hover style) */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-20 hover:scale-110"
      >
        <ChevronLeft className="w-10 h-10" strokeWidth={1} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 lg:right-[100px] top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-20 hover:scale-110"
      >
        <ChevronRight className="w-10 h-10" strokeWidth={1} />
      </button>

      {/* Mobile dots navigation */}
      <div className="flex lg:hidden items-center justify-center gap-1.5 mt-8 relative z-10">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => { setAutoplay(false); setCurrent(i); }}
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: i === current ? "28px" : "8px",
              background: i === current ? `hsl(${product.accentHsl})` : "hsl(220 15% 25%)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SpotlightCarousel;
