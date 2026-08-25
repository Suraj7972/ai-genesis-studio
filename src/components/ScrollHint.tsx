import { motion } from "framer-motion";

const ScrollHint = () => (
  <motion.div
    className="flex flex-col items-center gap-2 mt-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.5 }}
  >
    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
      Scroll to explore
    </span>
    <motion.div
      className="w-[1px] h-8 bg-gradient-to-b from-primary/60 to-transparent"
      animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.div>
);

export default ScrollHint;
