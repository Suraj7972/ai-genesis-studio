import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import SectionReveal from "./SectionReveal";
import {
  StructEraDemo,
  SmartBhoomiDemo,
  TheCrowsDemo,
  FoodieFlowDemo,
  HotelAIDemo,
  AuctionsDemo,
  ModGuardianDemo,
} from "./ProductDemos";

const tabs = [
  {
    id: "structera",
    label: "StructEra",
    color: "#818cf8",
    title: "Founder OS, reimagined.",
    description:
      "StructEra handles your most tedious tasks — from preparing pitch decks to discovering and tracking grants automatically. Stay focused on building your product while our AI copilot handles operations.",
    subdomain: "https://structera.sraisystems.in",
  },
  {
    id: "smartbhoomi",
    label: "SmartBhoomi",
    color: "#34d399",
    title: "Farming, modernized.",
    description:
      "A multi-lingual AI assistant helping Indian farmers track expenses, predict crop issues, and get live mandi rates without reading complex interfaces. Engineered to work entirely via voice & regional scripts.",
    subdomain: "https://smartbhoomi.sraisystems.in",
  },
  {
    id: "thecrows",
    label: "TheCrows",
    color: "#fb7185",
    title: "Trust, encrypted.",
    description:
      "Safeguard B2B transactions with our privacy-first platform. Generate masked identities, establish secure escrows, and build verifiable trust scores without compromising private business data.",
    subdomain: "https://thecrows.sraisystems.in",
  },
  {
    id: "foodieflow",
    label: "FoodieFlow",
    color: "#38bdf8",
    title: "Hyperlocal food ecosystem.",
    description:
      "Connect local food vendors, restaurants, and foodies across sub-districts with AI discovery, community recommendations, and direct ordering.",
    subdomain: "https://foodieflow.sraisystems.in",
  },
  {
    id: "hotelai",
    label: "Hotel AI",
    color: "#fbbf24",
    title: "All-in-one hotel operations.",
    description:
      "Real-time table tracking, inventory management, staff salary tracking, and automated daily P&L profit calculation for hospitality businesses.",
    subdomain: "https://hotelai.sraisystems.in",
  },
  {
    id: "sraiauctions",
    label: "Auctions",
    color: "#f97316",
    title: "Live competitive bidding.",
    description:
      "Real-time competitive auctions with live countdown timers, instant bid updates, escrow-backed security, and seller trust verification.",
    subdomain: "https://auctions.sraisystems.in",
  },
  {
    id: "modguardian",
    label: "ModGuardian",
    color: "#a78bfa",
    title: "Automated AI moderation.",
    description:
      "High-speed AI moderation pipeline that scans content batches, detects policy violations, logs audit trails, and auto-enforces platform safety rules.",
    subdomain: "https://modguardian.sraisystems.in",
  },
];

const ProductDemosSection = () => {
  const [activeTab, setActiveTab] = useState("structera");
  const [userClicked, setUserClicked] = useState(false);

  // Auto-rotate tabs every 12s unless user clicked
  useEffect(() => {
    if (userClicked) return;
    const interval = setInterval(() => {
      setActiveTab((current) => {
        const idx = tabs.findIndex((t) => t.id === current);
        const nextIdx = (idx + 1) % tabs.length;
        return tabs[nextIdx].id;
      });
    }, 12000);
    return () => clearInterval(interval);
  }, [userClicked]);

  const handleTabClick = (tabId: string) => {
    setUserClicked(true);
    setActiveTab(tabId);
  };

  const activeProduct = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section id="demo-section" className="py-24 relative overflow-hidden bg-background">
      {/* Background Radial Glow in Active Product Accent */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProduct.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 70% 50%, ${activeProduct.color}15, transparent 60%)`,
          }}
        />
      </AnimatePresence>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <SectionReveal>
          <div className="text-center mb-12">
            <span
              className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 block"
              style={{ color: activeProduct.color }}
            >
              LIVE PREVIEW & SIMULATION
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground flex flex-col sm:flex-row justify-center gap-2 font-syne">
              <span>See Our Systems</span>
              <span
                className="relative inline-block w-fit heading-gradient"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${activeProduct.color}, #38bdf8)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                in Action
              </span>
            </h2>
            <p className="text-white/50 text-sm mt-3 max-w-xl mx-auto font-medium">
              Real micro-interactions and operational workflows — powered by production-grade AI.
            </p>
          </div>
        </SectionReveal>

        {/* Sticky Horizontally Scrollable Tab Bar */}
        <div className="sticky top-16 z-40 py-4 bg-background/80 backdrop-blur-xl border-b border-white/5 mb-12">
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto no-scrollbar px-2 justify-start md:justify-center">
            {tabs.map((t) => {
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleTabClick(t.id)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleTabClick(t.id);
                  }}
                  className={`text-xs md:text-sm font-bold relative px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive ? "text-white scale-105" : "text-white/40 hover:text-white/80 hover:bg-white/5"
                  }`}
                  style={{
                    background: isActive ? `${t.color}20` : "transparent",
                    border: isActive ? `1px solid ${t.color}50` : "1px solid transparent",
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: t.color, opacity: isActive ? 1 : 0.4 }}
                    />
                    {t.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="demo-tab-underline"
                      className="absolute -bottom-[17px] left-2 right-2 h-[3px] rounded-t-full"
                      style={{ background: t.color }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Display Content */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Left Column: Product Copy */}
              <div className="flex flex-col justify-center">
                <span
                  className="text-xs font-mono uppercase tracking-widest mb-2 font-bold"
                  style={{ color: activeProduct.color }}
                >
                  SYSTEM :: {activeProduct.id.toUpperCase()}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-syne leading-tight">
                  {activeProduct.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8 text-sm md:text-base">
                  {activeProduct.description}
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href={activeProduct.subdomain}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:brightness-110 shadow-lg group"
                    style={{
                      background: activeProduct.color,
                      boxShadow: `0 0 30px ${activeProduct.color}40`,
                    }}
                  >
                    <span>Visit {activeProduct.label}</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Right Column: Live Demo Simulation */}
              <div className="w-full">
                {activeTab === "structera" && <StructEraDemo isActive={true} />}
                {activeTab === "smartbhoomi" && <SmartBhoomiDemo isActive={true} />}
                {activeTab === "thecrows" && <TheCrowsDemo isActive={true} />}
                {activeTab === "foodieflow" && <FoodieFlowDemo isActive={true} />}
                {activeTab === "hotelai" && <HotelAIDemo isActive={true} />}
                {activeTab === "sraiauctions" && <AuctionsDemo isActive={true} />}
                {activeTab === "modguardian" && <ModGuardianDemo isActive={true} />}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProductDemosSection;
