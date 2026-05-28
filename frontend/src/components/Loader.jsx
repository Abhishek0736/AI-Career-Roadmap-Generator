"use client";

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

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

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % loadingSteps.length;
      setLoadingText(loadingSteps[index]);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-6">
      <div className="flex flex-col items-center justify-center text-center mb-10">
        <div className="relative mb-4">
          {/* Pulsing ring animation */}
          <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-brand-slate/10 animate-ping" />
          <div className="w-12 h-12 rounded-2xl bg-brand-slate flex items-center justify-center text-brand-cream relative">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
        </div>
        <h4 className="text-lg font-bold text-brand-slate tracking-tight animate-pulse">
          {loadingText}
        </h4>
        <p className="text-xs text-brand-slate/50 mt-1">
          Building your professional career trajectory. Please stand by.
        </p>
      </div>

      {/* Shimmer Cards */}
      <div className="border-l-2 border-brand-accent/30 ml-8 pl-12 space-y-10">
        {[1, 2].map((num) => (
          <div key={num} className="relative animate-pulse">
            {/* Pseudo-bullet node */}
            <div className="absolute -left-[61px] top-1.5 w-8 h-8 rounded-full bg-brand-accent/50 border-4 border-brand-cream" />
            
            {/* Shimmer box */}
            <div className="bg-brand-card/40 border border-brand-accent/30 p-6 rounded-[2rem] space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-3 w-16 bg-brand-accent/60 rounded-full" />
                <div className="h-6 w-20 bg-brand-accent/60 rounded-full" />
              </div>
              <div className="h-5 w-2/3 bg-brand-accent/80 rounded-md" />
              <div className="h-4 w-full bg-brand-accent/40 rounded-md" />
              
              <div className="space-y-2 pt-2">
                <div className="h-3 w-20 bg-brand-accent/50 rounded-full" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-brand-accent/40 rounded-lg" />
                  <div className="h-6 w-20 bg-brand-accent/40 rounded-lg" />
                  <div className="h-6 w-24 bg-brand-accent/40 rounded-lg" />
                </div>
              </div>

              <div className="bg-brand-cream/50 rounded-xl p-3 flex gap-3 mt-4 border border-brand-accent/20">
                <div className="w-8 h-8 rounded-lg bg-brand-accent/60 shrink-0" />
                <div className="space-y-2 w-full">
                  <div className="h-3 w-1/3 bg-brand-accent/60 rounded-md" />
                  <div className="h-3 w-3/4 bg-brand-accent/40 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
