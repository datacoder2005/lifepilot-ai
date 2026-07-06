'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Compass, 
  Sparkles, 
  ShieldAlert, 
  Map, 
  CheckSquare, 
  ArrowRight,
  TrendingUp,
  Brain,
  Activity,
  Mail,
  Scale,
  Calendar
} from 'lucide-react';

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const features = [
    {
      icon: <Calendar className="w-6 h-6 text-indigo-400" />,
      title: "AI Planner Agent",
      description: "Break complex multi-day goals into prioritized tasks and dynamic, automated hourly schedules."
    },
    {
      icon: <Map className="w-6 h-6 text-teal-400" />,
      title: "Research Roadmap Agent",
      description: "Enter any learning topic and instantly generate structured milestones, summaries, and resources."
    },
    {
      icon: <Scale className="w-6 h-6 text-amber-400" />,
      title: "Decision Assistant",
      description: "Compare paths with risk levels, pro/con analysis, and weighted AI confidence scores."
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-rose-400" />,
      title: "Emergency Mode",
      description: "Feeling overloaded? One click archives low-priority tasks and drafts a calming, minimal survival list."
    },
    {
      icon: <Activity className="w-6 h-6 text-emerald-400" />,
      title: "Wellness & Balance Coach",
      description: "Receive real-time micro-break suggestions, wrist exercises, and hydration trackers to avoid burnout."
    },
    {
      icon: <Brain className="w-6 h-6 text-purple-400" />,
      title: "Smart Notes & Summarizer",
      description: "Type or paste raw thoughts to instantly extract action items and synthesize clean markdown summaries."
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#030014] text-white overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-brand-900/20 blur-[150px] pointer-events-none" />
      
      {/* Nav bar */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 shadow-lg shadow-brand-500/25">
            <Compass className="w-6 h-6 text-white animate-spin-slow" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            LifePilot <span className="text-brand-400">AI</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#about" className="hover:text-white transition-colors">Agents for Good</a>
          <a href="#security" className="hover:text-white transition-colors">Architecture</a>
        </nav>
        <div>
          <Link 
            href="/dashboard"
            className="px-5 py-2.5 rounded-xl text-sm font-medium glass-panel bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center gap-2 group"
          >
            Launch Console
            <ArrowRight className="w-4 h-4 text-brand-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/30 border border-brand-500/30 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Kaggle Intensive Capstone Showcase
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1] font-outfit"
          >
            Your Self-Driving
            <span className="block mt-2 bg-gradient-to-r from-brand-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Life Operations System
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-gray-400 text-lg sm:text-xl mb-10 leading-relaxed font-light"
          >
            Ditch rigid checklists. LifePilot uses autonomous AI agents to break down multi-day goals, research topics, balance physical health, and filter noise when stress levels peak.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-medium hover:shadow-xl hover:shadow-brand-500/20 transition-all flex items-center justify-center gap-2 group"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#features"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-gray-300 font-medium text-center"
            >
              Explore Agents
            </a>
          </motion.div>
        </motion.div>

        {/* Dashboard Preview Box */}
        <motion.div 
          className="mt-20 relative rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <div className="absolute top-0 inset-x-0 h-12 bg-white/5 border-b border-white/5 flex items-center px-6 gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <div className="ml-4 text-xs text-gray-500 font-mono">lifepilot-ai.vercel.app/dashboard</div>
          </div>
          <div className="pt-16 pb-12 px-6 sm:px-12 flex flex-col md:flex-row gap-8 items-center bg-gradient-to-b from-brand-950/20 to-black/40">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/30 px-2.5 py-1 rounded-md border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Agent: Planner Co-Pilot
              </div>
              <h3 className="text-3xl font-bold font-outfit">Dynamic Planning & Decomposition</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Watch LifePilot organize a vague goal like "Learn Rust basics" into weekly milestones, allocate time chunks based on your daily energy curves, and prompt hydration alerts during deep-focus blocks.
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
                <span className="flex items-center gap-1"><CheckSquare className="w-4 h-4 text-brand-400" /> Autocomplete checklist</span>
                <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4 text-teal-400" /> Analytics overlays</span>
              </div>
            </div>
            
            {/* Visual Glass Box */}
            <div className="w-full md:w-96 glass-panel rounded-2xl p-6 border border-white/10 relative overflow-hidden space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-pulse" />
                  <span className="text-xs font-mono text-gray-400">Agent Output Summary</span>
                </div>
                <span className="text-[10px] text-gray-500 font-mono">Confidence: 94%</span>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-xs">
                  <div className="font-semibold text-brand-300">Phase 1: Environment Setup</div>
                  <div className="text-gray-400 mt-1">Configure Cargo, write first hello_world, explain memory models.</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-xs opacity-80">
                  <div className="font-semibold text-brand-300">Phase 2: Ownership Principles</div>
                  <div className="text-gray-400 mt-1">Understand references, borrowing constraints, heap allocation lifetimes.</div>
                </div>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-gradient-to-r from-brand-500 to-indigo-500" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <section id="features" className="mt-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-outfit mb-4">Complete Agent Suite</h2>
            <p className="text-gray-400">LifePilot is equipped with 9 modular autonomous agents designed to support work-life productivity and cognitive balance.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, i) => (
              <motion.div 
                key={i} 
                className="glass-panel glass-panel-hover p-8 rounded-2xl border border-white/10 flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    {feat.icon}
                  </div>
                  <h4 className="text-xl font-bold font-outfit mb-3">{feat.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{feat.description}</p>
                </div>
                <div className="text-xs font-mono text-brand-400 flex items-center gap-1 cursor-pointer group">
                  Learn more 
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-32 glass-panel rounded-3xl p-8 sm:p-16 border border-white/10 relative overflow-hidden bg-gradient-to-r from-brand-950/20 via-black/10 to-indigo-950/20 text-center">
          <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-brand-500/10 blur-xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-indigo-500/10 blur-xl pointer-events-none" />
          <div className="relative z-10 max-w-xl mx-auto space-y-6">
            <h3 className="text-3xl font-bold font-outfit">Empower Your Life Flow</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Join thousands of developers, researchers, and creators using autonomous agents to prioritize well-being and get things done.
            </p>
            <div className="pt-4">
              <Link 
                href="/dashboard"
                className="inline-flex px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-gray-100 transition-all gap-2 items-center"
              >
                Get Started Now
                <ArrowRight className="w-4 h-4 text-brand-600" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 relative z-10 py-12 text-center text-sm text-gray-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-brand-400" />
            <span className="font-semibold text-gray-300">LifePilot AI</span>
          </div>
          <div>
            Built for Kaggle AI Agents Intensive Capstone (Agents for Good track)
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300">GitHub</a>
            <a href="#" className="hover:text-gray-300">Kaggle</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
