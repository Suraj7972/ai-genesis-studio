import { ReactNode } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import CursorGlow from "./CursorGlow";
import BackgroundEffects from "./BackgroundEffects";
import Constellation from "./Constellation";

const Layout = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ x: 30, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -30, opacity: 0 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="relative min-h-screen scanlines noise-overlay"
  >
    <Constellation />
    <BackgroundEffects />
    <CursorGlow />
    <ScrollProgress />
    <Header />
    <main className="relative z-10 pt-16">{children}</main>
    <Footer />
  </motion.div>
);

export default Layout;
