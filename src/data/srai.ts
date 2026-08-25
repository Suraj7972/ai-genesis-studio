export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  status: string;
  bestFor: string;
  accent: string;
  accentHsl: string;
  themeGradient: string;
  subdomain: string;
  icon: string; // Lucide icon name
  mediaType: "video" | "image";
  mediaSrc: string;
  mediaPoster: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface RoadmapPhase {
  id: string;
  phase: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "upcoming";
}

export interface EngagementModel {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: string;
}

export const products: Product[] = [
  {
    id: "structera",
    name: "StructEra",
    tagline: "The execution operating system for founders",
    description:
      "StructEra is the all-in-one founder OS that helps early-stage founders plan, execute, track progress, stay funded, and move toward investor readiness — through AI guidance, daily execution loops, and smart tools built for the startup grind.",
    features: [
      "AI copilot for planning, fundraising & execution guidance",
      "Founder score & progress tracking dashboard",
      "Daily execution tasks + streak system",
      "Scheme & grant discovery with eligibility + reminders",
    ],
    status: "Flagship Platform",
    bestFor: "Early-stage founders",
    accent: "structera",
    accentHsl: "230 90% 60%",
    themeGradient: "linear-gradient(135deg, hsl(230 90% 55%), hsl(260 80% 50%))",
    subdomain: "https://structera.sraisystems.in",
    icon: "Zap",
    mediaType: "image",
    mediaSrc: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
    mediaPoster: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
  },
  {
    id: "thecrows",
    name: "TheCrows",
    tagline: "Privacy-first trust and transactions",
    description:
      "TheCrows enables anonymous yet trusted interactions using temporary identities, trust scores, escrow transaction lifecycle, secure chat, and anti-abuse systems.",
    features: [
      "Temporary identities",
      "Trust score engine + audit trail",
      "Escrow (fund → start work → release/dispute)",
      "Secure chat linked to transactions",
      "Rate limits + referrals",
    ],
    status: "Active Platform",
    bestFor: "Privacy-conscious users",
    accent: "crows",
    accentHsl: "350 80% 55%",
    themeGradient: "linear-gradient(135deg, hsl(350 80% 50%), hsl(280 70% 45%))",
    subdomain: "https://thecrows.sraisystems.in",
    icon: "Shield",
    mediaType: "image",
    mediaSrc: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80",
    mediaPoster: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
  },
  {
    id: "smartbhoomi",
    name: "SmartBhoomi",
    tagline: "Complete AI-powered farm management for Indian farmers",
    description:
      "SmartBhoomi is a full-featured AI farm management app built specifically for Indian farmers. It covers every aspect of daily farm life — from logging expenses and sales, checking crop health, scanning seeds, getting fertilizer advice, accessing weather forecasts, planning daily tasks, tracking profit/loss, and getting AI-powered advisory — all in Marathi and regional languages.",
    features: [
      "Expense & sale entry (खर्च नोंदवा / विक्री नोंदवा)",
      "Daily task management & work logging (काम जोडा)",
      "AI advisory & crop consultation (सल्ला विचारा)",
      "Seed scanning & quality check (बियाणे तपासा)",
      "Fertilizer & pesticide guidance (खत/औषधे)",
      "Weather forecast with farm tips (हवामान)",
      "Mandi prices & market trends (बाजार)",
      "Profit/loss summary dashboard (नफा/तोटा सारांश)",
      "Government scheme discovery & eligibility (योजना)",
      "Daily tips & farm reminders (दैनिक टिप)",
    ],
    status: "Active",
    bestFor: "Indian farmers & agri-businesses",
    accent: "bhoomi",
    accentHsl: "160 70% 45%",
    themeGradient: "linear-gradient(135deg, hsl(160 70% 40%), hsl(190 80% 40%))",
    subdomain: "https://smartbhoomi.sraisystems.in",
    icon: "Sprout",
    mediaType: "image",
    mediaSrc: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80",
    mediaPoster: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
  },
  {
    id: "foodieflow",
    name: "FoodieFlow",
    tagline: "Connecting local food, restaurants, and communities",
    description:
      "FoodieFlow is a hyperlocal food ecosystem platform for towns/sub-districts enabling discovery, vendor onboarding, and analytics.",
    features: [
      "Hyperlocal food discovery",
      "Vendor onboarding & management",
      "Community-driven recommendations",
      "Analytics dashboard",
    ],
    status: "Regional Rollout",
    bestFor: "Local food businesses",
    accent: "foodie",
    accentHsl: "170 65% 45%",
    themeGradient: "linear-gradient(135deg, hsl(170 65% 40%), hsl(140 60% 40%))",
    subdomain: "https://foodieflow.sraisystems.in",
    icon: "UtensilsCrossed",
    mediaType: "image",
    mediaSrc: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
    mediaPoster: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
  },
  {
    id: "hotelai",
    name: "Hotel Management AI",
    tagline: "One AI system to manage your entire hotel business",
    description:
      "Menu creation, tables, warehouse entry, billing, profit-loss analysis, employee salary/advance tracking + analytics.",
    features: [
      "Menu & table management",
      "Warehouse & inventory tracking",
      "Billing & profit-loss analysis",
      "Employee salary & advance tracking",
      "Unified analytics dashboard",
    ],
    status: "Pilot Ready",
    bestFor: "Hotels & restaurants",
    accent: "hotel",
    accentHsl: "35 85% 55%",
    themeGradient: "linear-gradient(135deg, hsl(35 85% 50%), hsl(25 80% 45%))",
    subdomain: "https://hotelai.sraisystems.in",
    icon: "Building2",
    mediaType: "image",
    mediaSrc: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    mediaPoster: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  },
  {
    id: "sraiauctions",
    name: "SRAI Auctions",
    tagline: "Live competitive auctions for everyone",
    description:
      "SRAI Auctions is an eBay-style auction platform where anyone can create, list, and bid on auctions in real time. Whether you're selling farm produce, equipment, goods, or collectibles — SRAI Auctions brings competitive bidding, trust scores, secure transactions, and live countdown timers to every sale.",
    features: [
      "Create & list auctions in minutes",
      "Real-time live bidding with countdown timers",
      "Secure escrow-backed transactions",
      "Seller & buyer trust scores",
      "Category browsing & smart search",
      "Bid history & auction analytics",
      "Mobile-first design",
    ],
    status: "Coming Soon",
    bestFor: "Sellers, buyers & agri-traders",
    accent: "sraiauctions",
    accentHsl: "45 95% 55%",
    themeGradient: "linear-gradient(135deg, hsl(45 95% 50%), hsl(30 90% 45%))",
    subdomain: "https://auctions.sraisystems.in",
    icon: "Gavel",
    mediaType: "image",
    mediaSrc: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80",
    mediaPoster: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
  },
  {
    id: "modguardian",
    name: "ModGuardian",
    tagline: "Reliable AI moderation with audits and automation",
    description:
      "AI moderation pipeline with rules, audit trail, re-run/backfill, and auto-actions.",
    features: [
      "Rule-based moderation pipeline",
      "Full audit trail",
      "Re-run & backfill capabilities",
      "Automated actions & escalation",
    ],
    status: "Active Development",
    bestFor: "Platforms needing content safety",
    accent: "modguardian",
    accentHsl: "25 90% 55%",
    themeGradient: "linear-gradient(135deg, hsl(25 90% 50%), hsl(15 80% 45%))",
    subdomain: "https://modguardian.sraisystems.in",
    icon: "Lock",
    mediaType: "image",
    mediaSrc: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80",
    mediaPoster: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
  },
];

export const services: Service[] = [
  {
    id: "ai-product-engineering",
    title: "AI Product Engineering",
    description:
      "End-to-end AI product development from ideation through deployment. We build production-grade AI systems that solve real problems.",
    icon: "Cpu",
  },
  {
    id: "cv-nlp",
    title: "Computer Vision & NLP",
    description:
      "Custom computer vision and natural language processing solutions tailored to your domain and data requirements.",
    icon: "Eye",
  },
  {
    id: "cloud-ai-architecture",
    title: "Cloud AI Architecture",
    description:
      "AWS-first cloud architecture design for AI workloads. Scalable, cost-efficient, and production-ready infrastructure.",
    icon: "Cloud",
  },
  {
    id: "data-pipelines",
    title: "Data Pipelines & Analytics",
    description:
      "Robust data pipeline design and analytics infrastructure. From raw data ingestion to actionable insights.",
    icon: "Database",
  },
];

export const engagementModels: EngagementModel[] = [
  {
    id: "pilot",
    title: "Pilot",
    description: "Short-term proof of concept to validate feasibility and fit. Typically 4–8 weeks.",
    duration: "4–8 weeks",
    icon: "FlaskConical",
  },
  {
    id: "build",
    title: "Build",
    description: "Full product development cycle from architecture to deployment and handoff.",
    duration: "3–6 months",
    icon: "Hammer",
  },
  {
    id: "retainer",
    title: "Retainer",
    description: "Ongoing engineering and research support. Dedicated bandwidth for your AI initiatives.",
    duration: "Ongoing",
    icon: "Handshake",
  },
];

export const roadmap: RoadmapPhase[] = [
  {
    id: "phase-1",
    phase: "Phase 1",
    title: "Foundation",
    description:
      "Core platform development, initial product launches, and establishing engineering practices.",
    status: "completed",
  },
  {
    id: "phase-2",
    phase: "Phase 2",
    title: "Growth & Refinement",
    description:
      "Expanding product capabilities, onboarding early users, and iterating based on real feedback.",
    status: "in-progress",
  },
  {
    id: "phase-3",
    phase: "Phase 3",
    title: "Scale & Partnerships",
    description:
      "Scaling infrastructure, forming strategic partnerships, and preparing for institutional engagement.",
    status: "upcoming",
  },
  {
    id: "phase-4",
    phase: "Phase 4",
    title: "Ecosystem Integration",
    description:
      "Cross-platform synergies, API ecosystem, and expanding into adjacent verticals.",
    status: "upcoming",
  },
];

export const howWeWork = [
  {
    step: 1,
    title: "Discover",
    description: "Deep-dive into your problem space, constraints, and goals.",
  },
  {
    step: 2,
    title: "Prototype",
    description: "Rapid prototyping with real data and user feedback loops.",
  },
  {
    step: 3,
    title: "Build",
    description: "Production-grade engineering with security and scale in mind.",
  },
  {
    step: 4,
    title: "Deploy & Support",
    description: "Continuous deployment, monitoring, and iteration.",
  },
];

export const principles = [
  {
    title: "Trust Over Hype",
    description: "We ship real products, not pitch decks. Every claim we make is backed by working software.",
  },
  {
    title: "Practicality First",
    description: "Technology should solve real problems for real people. We build for impact, not impressions.",
  },
  {
    title: "Engineering + Research",
    description: "We combine rigorous engineering with applied AI research to build systems that last.",
  },
  {
    title: "Local Context",
    description: "We build for India's unique challenges — infrastructure, language, and scale.",
  },
];
