import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Product } from "@/data/srai";
import ProductIcon from "./ProductIcon";

interface Props {
  product: Product;
  onSelect: (product: Product) => void;
  index: number;
  featured?: boolean;
}

const ProductCard = ({ product, onSelect, index }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [hasHovered, setHasHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const percentMatch = product.id === "structera" ? 94 : product.id === "thecrows" ? 91 : product.id === "smartbhoomi" ? 87 : product.id === "foodieflow" ? 82 : product.id === "hotelai" ? 89 : product.id === "sraiauctions" ? 75 : product.id === "modguardian" ? 78 : 88;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * 14, y: (x - 0.5) * -14 });
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setHovering(true); setHasHovered(true); }}
      onMouseLeave={() => { setHovering(false); setTilt({ x: 0, y: 0 }); }}
      onClick={() => onSelect(product)}
      className="group cursor-pointer rounded-2xl overflow-hidden relative"
      style={{
        transform: hovering
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
          : "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)",
        transition: hovering ? "transform 0.1s ease" : "transform 0.5s ease",
        boxShadow: hovering
          ? `0 30px 80px hsl(${product.accentHsl} / 0.25), 0 8px 32px hsl(0 0% 0% / 0.5)`
          : "0 4px 24px hsl(0 0% 0% / 0.3)",
      }}
    >
      {/* Mouse spotlight on card */}
      {hovering && (
        <div
          className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, hsl(${product.accentHsl} / 0.12), transparent 60%)`,
          }}
        />
      )}

      {/* Premium border transition on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-30 transition-all duration-500 ease-in-out"
        style={{
          boxShadow: hovering ? `inset 0 0 0 1px hsl(${product.accentHsl} / 0.3)` : "inset 0 0 0 1px rgba(255,255,255,0.06)"
        }}
      />

      {/* Header with real image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={product.mediaPoster}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
        />
        {/* Gradient sweep on hover */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-10 pointer-events-none mix-blend-overlay"
        />
        {/* Vignette overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-10 transition-colors duration-500 mix-blend-multiply"
          style={{ 
            background: hovering 
              ? 'radial-gradient(circle, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.9) 100%)' 
              : 'radial-gradient(circle, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.95) 100%)' 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{ background: product.themeGradient }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(hsl(0 0% 100% / 0.1) 1px, transparent 1px),
              linear-gradient(90deg, hsl(0 0% 100% / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Scan line */}
        <motion.div
          className="absolute left-0 right-0 h-[1px] opacity-30"
          style={{ background: `linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.6), transparent)` }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Product icon + name in bottom-left */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2.5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-xl"
            style={{
              background: `hsl(0 0% 100% / 0.15)`,
              border: `1px solid hsl(0 0% 100% / 0.2)`,
              boxShadow: `0 0 20px hsl(${product.accentHsl} / 0.3)`,
            }}
          >
            <ProductIcon name={product.icon} className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-tight" style={{ textShadow: `0 0 10px hsl(${product.accentHsl} / 0.8)` }}>{product.name}</h3>
            <p className="text-[10px] text-white/60" style={{ textShadow: `0 0 8px hsl(${product.accentHsl} / 0.8)` }}>{product.bestFor}</p>
          </div>
        </div>

        {/* Status badge */}
        <span
          className="absolute top-3 right-3 text-[8px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full backdrop-blur-sm z-10"
          style={{
            background: `hsl(0 0% 100% / 0.15)`,
            color: `hsl(0 0% 100% / 0.9)`,
            border: `1px solid hsl(0 0% 100% / 0.2)`,
          }}
        >
          {product.status}
        </span>
      </div>

      {/* Card body */}
      <div className="p-5 relative" style={{
        background: "hsl(var(--card) / 0.95)",
        borderTop: "1px solid hsl(var(--border) / 0.3)",
      }}>
        {/* Animated bottom accent line / loading bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] transition-all duration-[700ms] ease-in-out z-20"
          style={{
            background: `linear-gradient(90deg, hsl(${product.accentHsl}), hsl(${product.accentHsl} / 0.8))`,
            width: hovering ? `${percentMatch}%` : "0%",
            boxShadow: hovering ? `0 0 8px hsl(${product.accentHsl} / 0.5)` : "none"
          }}
        />

        <p className="text-sm font-medium mb-3" style={{ color: `hsl(${product.accentHsl})` }}>
          {product.tagline}
        </p>

        {/* Features */}
        <div className="space-y-1.5 mb-4">
          {product.features.slice(0, 3).map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
              <span
                className="mt-1 w-1 h-1 rounded-full shrink-0"
                style={{ background: `hsl(${product.accentHsl})` }}
              />
              <span className="line-clamp-1">{f}</span>
            </div>
          ))}
          {product.features.length > 3 && (
            <span className="text-[10px] text-muted-foreground/60 ml-3">
              +{product.features.length - 3} more features
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
            {product.bestFor}
          </span>
          <span className="text-[12px] font-medium inline-flex items-center gap-1 transition-all opacity-70 group-hover:opacity-100" style={{ color: `hsl(${product.accentHsl})` }}>
            View details <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
