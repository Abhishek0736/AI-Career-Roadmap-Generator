"use client";

import { motion } from "framer-motion";
import { Clock, CheckCircle2, Trophy, ArrowRight, Lightbulb } from "lucide-react";

export default function Timeline({ roadmap, currentSkills = [] }) {
  if (!roadmap || !roadmap.phases || roadmap.phases.length === 0) {
    return null;
  }

  // Clean the current skills to check matches
  const normalizedSkills = currentSkills.map(s => s.toLowerCase().trim());

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      <div className="text-center mb-10">
        <span className="text-xs font-extrabold uppercase tracking-widest text-brand-slate/40">Generated Timeline</span>
        <h3 className="text-3xl font-extrabold text-brand-slate mt-1">Your Learning Pathway</h3>
        <div className="w-12 h-1 bg-brand-slate mx-auto mt-3 rounded-full" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative border-l-2 border-brand-accent/50 ml-4 sm:ml-8 pl-8 sm:pl-12 space-y-12"
      >
        {roadmap.phases.map((phase, index) => {
          return (
            <motion.div 
              key={index} 
              variants={cardVariants}
              className="relative"
            >
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[45px] sm:-left-[61px] top-1.5 w-8 h-8 rounded-full bg-brand-slate border-4 border-brand-cream flex items-center justify-center text-brand-cream font-bold text-xs shadow-md">
                {index + 1}
              </div>

              {/* Phase Card */}
              <div className="glass-panel p-6 sm:p-8 rounded-[2rem] hover:shadow-lg transition-all duration-300 border border-brand-accent/60 group relative hover:border-brand-slate/30">
                
                {/* Header info */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold text-brand-slate/50 uppercase tracking-widest">
                    Phase {index + 1}
                  </span>
                  <div className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-accent/40 text-brand-slate">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{phase.duration || "Self-Paced"}</span>
                  </div>
                </div>

                {/* Phase Title */}
                <h4 className="text-xl font-bold text-brand-slate mb-3 group-hover:text-black transition-colors">
                  {phase.title}
                </h4>

                {/* Description - Optional field check */}
                {phase.description && (
                  <p className="text-sm text-brand-slate/75 leading-relaxed mb-4">
                    {phase.description}
                  </p>
                )}

                {/* Topics / Tech Stack */}
                <div className="mb-6">
                  <span className="text-xs font-bold text-brand-slate/60 uppercase tracking-wider block mb-2">Core Tech Stack</span>
                  <div className="flex flex-wrap gap-2">
                    {phase.topics && phase.topics.map((topic, tIdx) => {
                      const hasSkill = normalizedSkills.includes(topic.toLowerCase().trim()) || 
                                       normalizedSkills.some(skill => topic.toLowerCase().includes(skill));
                      return (
                        <div 
                          key={tIdx} 
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs border transition-colors ${
                            hasSkill 
                              ? "bg-emerald-50 border-emerald-200 text-emerald-800 font-medium" 
                              : "bg-brand-cream/60 border-brand-accent text-brand-slate/80"
                          }`}
                        >
                          {hasSkill && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                          <span>{topic}</span>
                          {hasSkill && <span className="text-[9px] uppercase tracking-wide opacity-80">(Skill Base Match)</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Hands-On Milestone Project */}
                {phase.project && (
                  <div className="bg-brand-cream/70 rounded-2xl p-4 border border-brand-accent/40 flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-brand-slate text-brand-cream mt-0.5">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-slate/40 flex items-center gap-1">
                        <Lightbulb className="w-3 h-3 text-brand-slate/50" />
                        Milestone Project
                      </span>
                      <h5 className="text-sm font-bold text-brand-slate mt-0.5">
                        {typeof phase.project === 'object' ? phase.project.title : phase.project}
                      </h5>
                      <p className="text-xs text-brand-slate/60 mt-1 leading-relaxed">
                        {typeof phase.project === 'object' ? phase.project.description : `Build a professional-grade project to validate and demonstrate your knowledge of ${phase.title} topics.`}
                      </p>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
