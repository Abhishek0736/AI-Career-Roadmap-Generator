"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Target, Compass } from "lucide-react";

const SIMULATIONS = [
  { role: "Full Stack Engineer", action: "Mapping MERN stack architecture...", skill: "Next.js & Node" },
  { role: "Data Scientist", action: "Optimizing Machine Learning paths...", skill: "Python & TensorFlow" },
  { role: "DevOps Specialist", action: "Configuring cloud native workflow...", skill: "Docker & AWS" },
  { role: "UI/UX Designer", action: "Structuring user-centric design principles...", skill: "Figma & Interaction" }
];

export default function Hero() {
  const [simIdx, setSimIdx] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStep(s => {
        if (s >= 3) {
          setSimIdx(prev => (prev + 1) % SIMULATIONS.length);
          return 0;
        }
        return s + 1;
      });
    }, 1800);
    return () => clearInterval(stepInterval);
  }, []);

  const activeSim = SIMULATIONS[simIdx];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const floatVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative overflow-hidden pt-24 pb-20 px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <motion.div 
          animate={{ 
            y: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-br from-brand-accent/20 via-transparent to-transparent rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            y: [0, -50, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 25, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-brand-accent/15 via-transparent to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Premium Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-border bg-white/50 backdrop-blur-sm"
          >
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-accent animate-spin" style={{ animationDuration: "3s" }} />
              <span className="text-sm font-semibold text-brand-primary">PathCraft AI v1.0 — Now Live</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            variants={itemVariants}
            className="mt-8 mb-6 text-5xl md:text-7xl font-bold tracking-tight text-brand-primary leading-[1.1]"
          >
            Architect Your
            <motion.span 
              className="block text-transparent bg-gradient-to-r from-brand-accent via-amber-500 to-brand-accent bg-clip-text mt-2"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              style={{ backgroundSize: "200% 200%" }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              Career Path
            </motion.span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-brand-text max-w-2xl leading-relaxed font-light"
          >
            Stop guessing. Start building. Generate AI-powered, personalized career roadmaps that adapt to your experience level and target role—instantly.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto sm:justify-center"
          >
            <a
              href="#generator"
              className="btn-primary text-white px-8 py-4 rounded-xl text-base font-semibold tracking-wide flex items-center justify-center gap-2 group"
            >
              <Zap className="w-5 h-5" />
              Generate Roadmap
              <ArrowRight className="w-5 h-5 transition-all group-hover:translate-x-1" />
            </a>
            <a
              href="/history"
              className="btn-secondary px-8 py-4 rounded-xl text-base font-semibold tracking-wide flex items-center justify-center gap-2"
            >
              <Compass className="w-5 h-5" />
              View Examples
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl"
          >
            <TrustBadge 
              icon={Zap}
              title="AI-Powered" 
              description="Intelligent path generation"
            />
            <TrustBadge 
              icon={Target}
              title="Personalized" 
              description="Adapted to your level"
            />
            <TrustBadge 
              icon={Compass}
              title="Practical" 
              description="Real-world projects"
            />
          </motion.div>

          {/* AI Simulation Widget */}
          <motion.div
            variants={floatVariants}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="mt-20 w-full max-w-2xl mx-auto"
          >
            <div className="card-premium rounded-2xl overflow-hidden shadow-2xl relative">
              {/* Header */}
              <div className="px-6 py-4 border-b border-brand-border/40 flex items-center justify-between bg-brand-bg/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-accent/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-brand-accent animate-pulse" />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-brand-primary uppercase">PathCraft AI Engine</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500" /></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /></div>
                </div>
              </div>
              
              {/* Body */}
              <div className="p-6 md:p-8 font-mono text-sm space-y-4 min-h-[260px] relative text-left">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={`${simIdx}-0`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, filter: "blur(4px)", x: 20 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-3 text-brand-text/80"
                  >
                    <span className="text-brand-accent font-bold">{'>'}</span> 
                    <span>Initializing query for: <strong className="text-brand-primary">{activeSim.role}</strong></span>
                  </motion.div>

                  {step >= 1 && (
                    <motion.div
                      key={`${simIdx}-1`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, filter: "blur(4px)", x: 20 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-center gap-3 text-brand-text/80"
                    >
                      <span className="text-brand-accent font-bold">{'>'}</span> 
                      <span>{activeSim.action}</span>
                    </motion.div>
                  )}

                  {step >= 2 && (
                    <motion.div
                      key={`${simIdx}-2`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, filter: "blur(4px)", x: 20 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-center gap-3 text-brand-text/80"
                    >
                      <span className="text-brand-accent font-bold">{'>'}</span> 
                      <span>Injecting modern requirements: <span className="px-2 py-0.5 rounded bg-brand-accent/10 text-brand-accent border border-brand-accent/20">{activeSim.skill}</span></span>
                    </motion.div>
                  )}

                  {step >= 3 && (
                    <motion.div
                      key={`${simIdx}-3`}
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, filter: "blur(4px)", scale: 0.95 }}
                      transition={{ duration: 0.5, type: "spring" }}
                      className="mt-6 p-4 rounded-xl border border-brand-accent/30 bg-gradient-to-r from-brand-accent/10 to-transparent flex items-center gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center shadow-[0_0_15px_rgba(var(--brand-accent),0.5)]">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-brand-primary font-bold font-sans">Career Roadmap Generated Successfully</div>
                        <div className="text-brand-accent font-mono text-xs mt-1 font-semibold tracking-wider uppercase">Ready for Deployment</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Blinking cursor */}
                {step < 3 && (
                  <motion.div 
                    animate={{ opacity: [1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2.5 h-5 bg-brand-accent inline-block align-middle ml-2 shadow-[0_0_8px_rgba(var(--brand-accent),0.6)]"
                  />
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustBadge({ icon: Icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="flex flex-col items-center gap-3"
    >
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-accent/20 to-brand-accent/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-brand-accent" />
      </div>
      <div>
        <h4 className="font-semibold text-brand-primary text-sm">{title}</h4>
        <p className="text-xs text-brand-text">{description}</p>
      </div>
    </motion.div>
  );
}
