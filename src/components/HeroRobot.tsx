import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const HeroRobot = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setMouseOffset({
        x: (e.clientX - cx) / rect.width,
        y: (e.clientY - cy) / rect.height,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420px] md:h-[520px] flex items-center justify-center select-none"
    >
      {/* Deep aurora glow layers */}
      <div className="absolute w-80 h-80 rounded-full blur-[120px] opacity-30 bg-primary animate-pulse_glow" />
      <div
        className="absolute w-60 h-60 rounded-full blur-[100px] opacity-20"
        style={{ background: "hsl(260 80% 60%)" }}
      />
      <div
        className="absolute w-40 h-40 rounded-full blur-[80px] opacity-15"
        style={{ background: "hsl(190 90% 50%)" }}
      />

      {/* Orbiting rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: `${280 + i * 60}px`,
            height: `${280 + i * 60}px`,
            borderColor: `hsl(230 90% 60% / ${0.15 - i * 0.03})`,
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{
            duration: 16 + i * 6,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Orbiting dot */}
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_hsl(230_90%_60%)]"
            style={{ top: "-4px", left: "50%", marginLeft: "-4px" }}
          />
        </motion.div>
      ))}

      {/* Hex grid pattern behind robot */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 15v22L30 52 0 37V15z' fill='none' stroke='%236366f1' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 52px",
        }}
      />

      {/* Main robot body — interactive parallax */}
      <motion.div
        className="relative z-10"
        animate={{
          y: [-8, 8, -8],
          rotateY: mouseOffset.x * 8,
          rotateX: -mouseOffset.y * 5,
        }}
        transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, rotateY: { duration: 0.3 }, rotateX: { duration: 0.3 } }}
        style={{ perspective: 800 }}
      >
        {/* Antenna */}
        <div className="flex justify-center mb-0">
          <div className="relative">
            <div className="w-[2px] h-6 mx-auto bg-gradient-to-t from-primary/50 to-transparent" />
            <motion.div
              className="w-3 h-3 rounded-full bg-primary mx-auto -mt-1"
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ boxShadow: "0 0 16px hsl(230 90% 60% / 0.7)" }}
            />
          </div>
        </div>

        {/* Head */}
        <div className="w-28 h-28 md:w-36 md:h-36 mx-auto rounded-2xl relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(230 90% 60% / 0.9), hsl(260 80% 50% / 0.7))",
            border: "1px solid hsl(230 90% 60% / 0.4)",
            boxShadow: "inset 0 2px 20px hsl(230 90% 60% / 0.2), 0 0 40px hsl(230 90% 60% / 0.15)",
          }}
        >
          {/* Face plate */}
          <div className="absolute inset-2 rounded-xl bg-background/30 backdrop-blur-sm border border-primary/10">
            {/* Eyes */}
            <motion.div
              className="absolute top-[30%] left-[20%] w-4 h-4 md:w-5 md:h-5 rounded-full"
              style={{
                background: "radial-gradient(circle, hsl(190 100% 80%), hsl(230 90% 60%))",
                boxShadow: "0 0 20px hsl(190 100% 70% / 0.8), 0 0 40px hsl(230 90% 60% / 0.4)",
              }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-[30%] right-[20%] w-4 h-4 md:w-5 md:h-5 rounded-full"
              style={{
                background: "radial-gradient(circle, hsl(190 100% 80%), hsl(230 90% 60%))",
                boxShadow: "0 0 20px hsl(190 100% 70% / 0.8), 0 0 40px hsl(230 90% 60% / 0.4)",
              }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            />
            {/* Visor */}
            <div className="absolute top-[28%] left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            {/* Mouth — animated bar */}
            <motion.div
              className="absolute bottom-[22%] left-1/2 -translate-x-1/2 h-[3px] rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, hsl(190 100% 70%), transparent)" }}
              animate={{ width: ["30px", "20px", "40px", "30px"] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        </div>

        {/* Neck connector */}
        <div className="w-8 h-5 mx-auto bg-gradient-to-b from-secondary to-card border-x border-border/40" />

        {/* Torso */}
        <div
          className="w-40 h-24 md:w-52 md:h-28 mx-auto rounded-xl relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, hsl(220 18% 12%), hsl(220 18% 8%))",
            border: "1px solid hsl(220 15% 20%)",
            boxShadow: "0 8px 32px hsl(230 90% 60% / 0.08)",
          }}
        >
          {/* Core reactor */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(230 90% 60% / 0.8), hsl(260 80% 50% / 0.3))",
              boxShadow: "0 0 30px hsl(230 90% 60% / 0.5), 0 0 60px hsl(230 90% 60% / 0.2)",
            }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.85, 1.1, 0.85] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          {/* Inner ring */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-primary/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          {/* Panel lines */}
          <div className="absolute top-3 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-border/40 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-border/40 to-transparent" />
          {/* Side vents */}
          {[0, 1, 2].map((i) => (
            <div key={`l${i}`} className="absolute h-[2px] w-3 bg-primary/20 rounded" style={{ left: 6, top: `${40 + i * 12}%` }} />
          ))}
          {[0, 1, 2].map((i) => (
            <div key={`r${i}`} className="absolute h-[2px] w-3 bg-primary/20 rounded" style={{ right: 6, top: `${40 + i * 12}%` }} />
          ))}
        </div>

        {/* Arms */}
        <motion.div
          className="absolute top-[58%] -left-3 md:-left-5 w-5 h-16 rounded-full"
          style={{ background: "linear-gradient(180deg, hsl(220 15% 16%), hsl(220 18% 10%))", border: "1px solid hsl(220 15% 20%)" }}
          animate={{ rotateZ: [-3, 3, -3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[58%] -right-3 md:-right-5 w-5 h-16 rounded-full"
          style={{ background: "linear-gradient(180deg, hsl(220 15% 16%), hsl(220 18% 10%))", border: "1px solid hsl(220 15% 20%)" }}
          animate={{ rotateZ: [3, -3, 3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </motion.div>

      {/* Floating data particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            top: `${15 + Math.random() * 70}%`,
            left: `${5 + Math.random() * 90}%`,
            background: i % 3 === 0 ? "hsl(230 90% 60%)" : i % 3 === 1 ? "hsl(190 90% 60%)" : "hsl(260 80% 60%)",
          }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [-10, -50 - Math.random() * 30],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2.5 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Holographic scan line */}
      <motion.div
        className="absolute left-[15%] right-[15%] h-[1px] z-20 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(230 90% 60% / 0.4), transparent)",
        }}
        animate={{ top: ["20%", "80%", "20%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default HeroRobot;
