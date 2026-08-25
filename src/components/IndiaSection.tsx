import { motion } from "framer-motion";
import { Server, Grid, Languages, Calendar, MapPin, Zap } from "lucide-react";
import SectionReveal from "./SectionReveal";

const IndiaSection = () => {
  const cityString = ["Hyderabad", "Chennai", "Nagpur", "Pune", "Mumbai", "Bengaluru", "Delhi", "Kolkata", "Ahmedabad", "Jaipur"].join(" · ");
  
  const stats = [
    { value: "7", label: "AI Platforms", icon: <Server size={20} />, color: "#818cf8" },
    { value: "4+", label: "Verticals", icon: <Grid size={20} />, color: "#34d399" },
    { value: "Marathi", label: "Native NLP", icon: <Languages size={20} />, color: "#f472b6" },
    { value: "2024", label: "Founded", icon: <Calendar size={20} />, color: "#fbbf24" },
    { value: "Nagpur", label: "Headquarters", icon: <MapPin size={20} />, color: "#38bdf8" },
    { value: "Free", label: "Early Access", icon: <Zap size={20} />, color: "#a78bfa" },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#05050A]">
      {/* Subtle tint gradient on the left */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-indigo-900/10 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Column */}
          <div className="flex flex-col justify-center">
            <SectionReveal>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] font-syne mb-6 tracking-tight">
                Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-green-500">India</span>.<br/>
                Engineered for the World.
              </h2>
              <p className="text-lg text-muted-foreground mb-12 max-w-lg leading-relaxed">
                We're aggressively building the AI infrastructure that Indian businesses actually need. Direct, native, and deeply integrated into daily operations.
              </p>
              
              {/* Animated City Ticker */}
              <div className="relative overflow-hidden w-full h-8 flex items-center border-l-2 border-indigo-500/50 pl-4">
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#05050A] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#05050A] to-transparent z-10" />
                
                <motion.div 
                  className="flex w-max whitespace-nowrap opacity-50"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  <span className="font-mono text-sm tracking-widest text-white/80 pr-8">
                    {cityString} ·
                  </span>
                  <span className="font-mono text-sm tracking-widest text-white/80 pr-8">
                    {cityString} ·
                  </span>
                </motion.div>
              </div>
            </SectionReveal>
          </div>

          {/* Right Column */}
          <div>
             <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
               {stats.map((stat, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1, duration: 0.5 }}
                   className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
                 >
                   <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ background: stat.color }} />
                   
                   <div className="relative z-10 flex flex-col h-full">
                     <div className="mb-4 text-white/40 group-hover:text-white transition-colors duration-300" style={{ color: stat.color }}>
                       {stat.icon}
                     </div>
                     <div className="mt-auto">
                       <div className="text-3xl font-black text-white mb-1 font-syne tracking-tight group-hover:scale-105 transform origin-left transition-transform duration-300">{stat.value}</div>
                       <div className="text-xs font-bold text-white/50 uppercase tracking-wider">{stat.label}</div>
                     </div>
                   </div>
                 </motion.div>
               ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IndiaSection;
