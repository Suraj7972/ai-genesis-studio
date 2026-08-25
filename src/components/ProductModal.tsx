import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, MessageSquare, Copy, Check } from "lucide-react";
import { Product } from "@/data/srai";
import { Link } from "react-router-dom";
import ProductIcon from "./ProductIcon";
import {
  StructEraDemo,
  SmartBhoomiDemo,
  TheCrowsDemo,
  FoodieFlowDemo,
  HotelAIDemo,
  AuctionsDemo,
  ModGuardianDemo,
} from "./ProductDemos";

interface Props {
  product: Product | null;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: Props) => {
  const [copied, setCopied] = useState(false);

  const copySubdomain = () => {
    if (!product) return;
    navigator.clipboard.writeText(product.subdomain);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4"
          style={{ background: "hsl(220 20% 5% / 0.85)", backdropFilter: "blur(20px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.92, y: 30, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-premium rounded-2xl max-w-lg w-full relative max-h-[85vh] overflow-y-auto"
            style={{ boxShadow: `0 0 80px hsl(${product.accentHsl} / 0.15)` }}
          >
            {/* Hero media with real image */}
            <div className="relative h-48 overflow-hidden rounded-t-2xl">
              <img
                src={product.mediaSrc}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
              {/* Colored accent overlay */}
              <div
                className="absolute inset-0 opacity-30 mix-blend-overlay"
                style={{ background: product.themeGradient }}
              />
              {/* Grid texture */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(hsl(${product.accentHsl} / 0.15) 1px, transparent 1px),
                    linear-gradient(90deg, hsl(${product.accentHsl} / 0.15) 1px, transparent 1px)
                  `,
                  backgroundSize: "30px 30px",
                }}
              />
              {/* Scan line */}
              <motion.div
                className="absolute left-0 right-0 h-[1px]"
                style={{ background: `linear-gradient(90deg, transparent, hsl(${product.accentHsl} / 0.6), transparent)` }}
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
              {/* Product icon in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center backdrop-blur-xl"
                  style={{
                    background: `hsl(${product.accentHsl} / 0.2)`,
                    border: `1px solid hsl(${product.accentHsl} / 0.3)`,
                    boxShadow: `0 0 40px hsl(${product.accentHsl} / 0.3)`,
                  }}
                >
                  <ProductIcon
                    name={product.icon}
                    className="w-9 h-9"
                    style={{ color: `hsl(${product.accentHsl})` }}
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[hsl(220_18%_9%)] to-transparent" />
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="p-6 pt-4">
              {/* Chips */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span
                  className="text-[9px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{
                    background: `hsl(${product.accentHsl} / 0.1)`,
                    color: `hsl(${product.accentHsl})`,
                    border: `1px solid hsl(${product.accentHsl} / 0.15)`,
                  }}
                >
                  {product.status}
                </span>
                <span className="text-[9px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">
                  {product.bestFor}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-1 font-syne">{product.name}</h2>
              <p style={{ color: `hsl(${product.accentHsl})` }} className="font-medium text-sm mb-4">
                {product.tagline}
              </p>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Live Demo Simulation */}
              <div className="mb-6 border-t border-b border-white/5 py-4">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Simulation
                </h4>
                <div>
                  {product.id === "structera" && <StructEraDemo isActive={true} />}
                  {product.id === "smartbhoomi" && <SmartBhoomiDemo isActive={true} />}
                  {product.id === "thecrows" && <TheCrowsDemo isActive={true} />}
                  {product.id === "foodieflow" && <FoodieFlowDemo isActive={true} />}
                  {product.id === "hotelai" && <HotelAIDemo isActive={true} />}
                  {product.id === "sraiauctions" && <AuctionsDemo isActive={true} />}
                  {product.id === "modguardian" && <ModGuardianDemo isActive={true} />}
                </div>
              </div>

              {product.features.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: `hsl(${product.accentHsl})` }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col gap-2.5">
                <a
                  href={product.subdomain}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-primary-foreground font-semibold text-sm transition-all hover:brightness-110 shadow-lg"
                  style={{
                    background: `hsl(${product.accentHsl})`,
                    boxShadow: `0 0 20px hsl(${product.accentHsl} / 0.25)`,
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Product
                </a>
                <div className="flex gap-2.5">
                  <Link
                    to={`/contact?product=${product.id}`}
                    onClick={onClose}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition-colors border border-border/30"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Request Demo
                  </Link>
                  <button
                    onClick={copySubdomain}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition-colors border border-border/30"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied" : "Copy Link"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
