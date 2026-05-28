"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowDown, Award, TrendingUp, Cpu } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative overflow-hidden pt-20 pb-16 px-6 bg-gradient-to-b from-[#FDFBF7] via-[#FBF9F3] to-[#F9F6EE]">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-brand-accent/20 blur-[100px] rounded-full -z-10 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Tagline Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-accent bg-brand-card/60 backdrop-blur-sm text-xs font-semibold text-brand-slate/80 mb-6 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-slate" />
            <span>Introducing PathCraft AI v1.0</span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-brand-slate leading-[1.1] mb-6 max-w-3xl"
          >
            Architect Your Career <br />
            <span className="bg-gradient-to-r from-brand-slate via-slate-800 to-zinc-600 bg-clip-text text-transparent">
              With Logical precision.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg text-brand-slate/70 max-w-2xl mb-8 leading-relaxed font-normal"
          >
            Stop guessing your learning path. Input your target role and current skills to generate an interactive, phase-by-phase professional development roadmap backed by modern software engineering standards.
          </motion.p>

          {/* Action CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <a
              href="#generator"
              className="glossy-btn text-brand-cream px-8 py-3.5 rounded-2xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 group"
            >
              Start Generating
              <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a
              href="/history"
              className="px-8 py-3.5 rounded-2xl text-sm font-semibold border border-brand-accent/80 hover:border-brand-slate bg-brand-cream/40 backdrop-blur-sm text-brand-slate transition-all hover:bg-brand-card flex items-center justify-center gap-2"
            >
              View Saved Paths
            </a>
          </motion.div>

          {/* Trust points */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 sm:gap-12 py-6 border-t border-b border-brand-accent/40 w-full max-w-3xl text-left"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-brand-card text-brand-slate">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-brand-slate">Intelligent Logic</h4>
                <p className="text-[10px] sm:text-xs text-brand-slate/60">Structured learning phases</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-brand-card text-brand-slate">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-brand-slate">Practical Projects</h4>
                <p className="text-[10px] sm:text-xs text-brand-slate/60">Hands-on milestone checks</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-brand-card text-brand-slate">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-brand-slate">Experience Adapted</h4>
                <p className="text-[10px] sm:text-xs text-brand-slate/60">Tailored difficulty scales</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
