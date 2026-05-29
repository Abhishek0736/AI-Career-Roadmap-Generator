"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";


const loadingSteps = [
  "Analyzing parameters...",
  "Matching current skillset...",
  "Structuring progressive milestones...",
  "Compiling hands-on project briefs...",
  "Assembling custom learning modules...",
  "Polishing the final roadmap...",
];

export default function Loader() {
  const [loadingText, setLoadingText] = useState("Analyzing parameters...");
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % loadingSteps.length);
      setLoadingText(loadingSteps[(stepIndex + 1) % loadingSteps.length]);
    }, 1800);

    return () => clearInterval(interval);
  }, [stepIndex]);

  return (
    <section className="w-full py-20 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Loading Animation */}
        <motion.div 
          className="flex flex-col items-center justify-center text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Animated Icon */}
          <div className="relative mb-8">
            {/* Outer rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-24 h-24"
            >
              <div className="w-full h-full rounded-full border-3 border-transparent border-t-brand-accent border-r-brand-accent/60" />
            </motion.div>

            {/* Inner pulsing circle */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-accent/20 to-brand-accent/5 flex items-center justify-center relative"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 rounded-lg bg-gradient-to-br from-brand-primary to-brand-text flex items-center justify-center"
              >
                <Sparkles className="w-7 h-7 text-white" />
              </motion.div>
            </motion.div>
          </div>

          {/* Loading Text */}
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-brand-primary mb-3">
              Generating Your Path
            </h3>
            <p className="text-lg text-brand-text/80 mb-4">{loadingText}</p>
            <p className="text-sm text-brand-text/60">
              Our AI is crafting a personalized roadmap tailored to your goals
            </p>
          </motion.div>
        </motion.div>

        {/* Progress Steps */}
        <div className="space-y-4">
          {loadingSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0.5, x: -20 }}
              animate={{
                opacity: idx <= stepIndex ? 1 : 0.3,
                x: 0,
              }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                idx < stepIndex
                  ? "bg-gradient-to-r from-green-50 to-emerald-50 border border-emerald-200"
                  : idx === stepIndex
                  ? "bg-gradient-to-r from-brand-accent/10 to-amber-50 border border-brand-accent/40"
                  : "bg-brand-bg border border-brand-border/30"
              }`}
            >
              <motion.div
                animate={idx < stepIndex ? { scale: [1.2, 1] } : idx === stepIndex ? { rotate: 360 } : {}}
                transition={{
                  duration: idx < stepIndex ? 0.4 : 2,
                  repeat: idx === stepIndex ? Infinity : undefined,
                }}
                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-semibold text-sm ${
                  idx < stepIndex
                    ? "bg-emerald-500 text-white"
                    : idx === stepIndex
                    ? "bg-brand-accent text-white"
                    : "bg-brand-border text-brand-text"
                }`}
              >
                {idx < stepIndex ? "✓" : idx === stepIndex ? <Zap className="w-4 h-4" /> : idx + 1}
              </motion.div>
              <span
                className={`text-sm font-medium ${
                  idx < stepIndex
                    ? "text-emerald-700"
                    : idx === stepIndex
                    ? "text-brand-primary"
                    : "text-brand-text/60"
                }`}
              >
                {step}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom encouragement */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center mt-12"
        >
          <p className="text-sm text-brand-text/50">
            Building excellence... this should take 10-30 seconds
          </p>
        </motion.div>
      </div>
    </section>
  );
}
