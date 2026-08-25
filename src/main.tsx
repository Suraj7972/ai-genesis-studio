import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Lazy image fade-in observer
document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver(() => {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      if ((img as HTMLImageElement).complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
      }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
});

createRoot(document.getElementById("root")!).render(<App />);
