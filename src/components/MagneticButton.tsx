import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  as?: "button" | "a" | "div";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

const MagneticButton = ({ children, className = "", as = "button", href, target, rel, onClick }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.25,
      y: (e.clientY - rect.top - rect.height / 2) * 0.25,
    });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const Tag = as === "a" ? "a" : as === "div" ? "div" : "button";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 250, damping: 15, mass: 0.5 }}
      className="inline-block"
    >
      <Tag
        className={className}
        {...(as === "a" ? { href, target, rel } : {})}
        onClick={onClick}
      >
        {children}
      </Tag>
    </motion.div>
  );
};

export default MagneticButton;
