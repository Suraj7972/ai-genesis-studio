import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import { products, Product } from "@/data/srai";
import ProductIcon from "@/components/ProductIcon";

const filters = ["All", ...products.map((p) => p.name)];

const Products = () => {
  useEffect(() => {
    document.title = "Our AI Platforms — StructEra, SmartBhoomi & More | SRAI Systems";
  }, []);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const structera = products[0];

  const filtered =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.name === activeFilter);

  return (
    <Layout>
      <section className="py-20 min-h-screen">
        <div className="container mx-auto px-4 md:px-8">
          {/* Products page hero */}
          <SectionReveal>
            <div className="relative h-[300px] rounded-2xl overflow-hidden mb-12">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80"
                alt="AI Technology"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
              <div className="absolute inset-0 flex items-center p-8 md:p-12">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-3 block">
                    Our Ecosystem
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2">
                    7 AI Platforms.<br />
                    <span className="heading-gradient">One Mission.</span>
                  </h1>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Featured StructEra */}
          <SectionReveal delay={0.05}>
            <motion.div
              onClick={() => setSelectedProduct(structera)}
              className="cursor-pointer glass-premium rounded-2xl p-6 md:p-8 mb-8 overflow-hidden relative group"
              whileHover={{ y: -2 }}
              style={{ boxShadow: `0 0 40px hsl(${structera.accentHsl} / 0.08)` }}
            >
              <motion.div className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 80% 50%, hsl(${structera.accentHsl} / 0.06), transparent 60%)` }} />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `hsl(${structera.accentHsl} / 0.1)`, border: `1px solid hsl(${structera.accentHsl} / 0.2)`, boxShadow: `0 0 25px hsl(${structera.accentHsl} / 0.15)` }}>
                  <ProductIcon name={structera.icon} className="w-8 h-8" style={{ color: `hsl(${structera.accentHsl})` }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ background: `hsl(${structera.accentHsl} / 0.1)`, color: `hsl(${structera.accentHsl})` }}>
                      ★ Featured
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                      {structera.status}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{structera.name}</h2>
                  <p className="text-sm text-muted-foreground">{structera.tagline}</p>
                </div>
                <a href={structera.subdomain} target="_blank" rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="shrink-0 px-5 py-2.5 rounded-lg text-primary-foreground font-medium text-sm transition-all hover:brightness-110"
                  style={{ background: `hsl(${structera.accentHsl})`, boxShadow: `0 0 15px hsl(${structera.accentHsl} / 0.2)` }}>
                  Visit StructEra
                </a>
              </div>
            </motion.div>
          </SectionReveal>

          {/* Filter chips */}
          <SectionReveal delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-10">
              {filters.map((f) => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeFilter === f
                      ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(230_90%_60%_/_0.2)]"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}>
                  {f}
                </button>
              ))}
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} onSelect={setSelectedProduct} index={i} />
            ))}
          </div>
        </div>
      </section>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </Layout>
  );
};

export default Products;
