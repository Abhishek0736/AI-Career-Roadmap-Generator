"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Lightbulb, Code, BookOpen, Trophy, ArrowRight } from "lucide-react";

export default function Timeline({ roadmap, currentSkills = [] }) {
  if (!roadmap || !roadmap.phases || roadmap.phases.length === 0) {
    return null;
  }

  const normalizedSkills = currentSkills.map(s => s.toLowerCase().trim());

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section className="relative py-20 px-6 lg:px-8" id="timeline-preview">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-brand-accent/10 via-transparent to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-brand-text/60">Your Learning Journey</span>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-primary mt-3 mb-4">
            Phase-by-Phase Roadmap
          </h2>
          <p className="text-lg text-brand-text max-w-2xl mx-auto">
            A structured path with milestones, skills, and projects tailored to your goal
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Vertical connector line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="hidden md:block absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-accent via-brand-accent/50 to-transparent origin-top"
          />

          <div className="space-y-8">
            {roadmap.phases.map((phase, index) => (
              <PhaseCard 
                key={index}
                phase={phase}
                index={index}
                normalizedSkills={normalizedSkills}
                variants={cardVariants}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PhaseCard({ phase, index, normalizedSkills, variants }) {
  const getPhaseIcon = () => {
    const icons = [Lightbulb, Code, BookOpen, Trophy, CheckCircle2];
    return icons[index % icons.length];
  };

  const PhaseIcon = getPhaseIcon();

  return (
    <motion.div 
      variants={variants}
      className="relative"
    >
      <div className="flex gap-0 md:gap-8">
        {/* Timeline Node */}
        <motion.div 
          className="hidden md:flex flex-col items-center flex-shrink-0"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-accent to-amber-500 flex items-center justify-center text-white shadow-lg border-4 border-brand-bg relative z-10">
            <PhaseIcon className="w-7 h-7" />
          </div>
          {index < 3 && (
            <div className="h-12 w-1 bg-brand-border/40 mt-2" />
          )}
        </motion.div>

        {/* Phase Content */}
        <div className="flex-1 pt-2">
          <motion.div
            whileHover={{ y: -4 }}
            className="card-premium p-8 md:p-10 rounded-xl relative overflow-hidden group"
          >
            {/* Card accent */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-accent to-transparent" />

            <div className="relative">
              {/* Phase Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">Phase {index + 1}</span>
                    {phase.duration && (
                      <span className="text-xs px-2 py-1 rounded-lg bg-brand-border/40 text-brand-text font-medium">
                        {phase.duration}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-primary mb-2 group-hover:text-brand-accent transition-colors">
                    {phase.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              {phase.description && (
                <p className="text-brand-text text-base leading-relaxed mb-6">
                  {phase.description}
                </p>
              )}

              {/* Topics Grid */}
              {phase.topics && phase.topics.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-brand-primary/70 mb-3 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Core Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {phase.topics.map((topic, tIdx) => {
                      const hasSkill = normalizedSkills.includes(topic.toLowerCase().trim()) || 
                                       normalizedSkills.some(skill => topic.toLowerCase().includes(skill));
                      return (
                        <motion.div
                          key={tIdx}
                          whileHover={{ scale: 1.05 }}
                          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all border-2 ${
                            hasSkill 
                              ? "bg-gradient-to-r from-emerald-50 to-emerald-50 border-emerald-300 text-emerald-700" 
                              : "bg-brand-bg border-brand-border hover:border-brand-accent/60 text-brand-primary"
                          }`}
                        >
                          {hasSkill && <span className="mr-1">✓</span>}
                          {topic}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Projects */}
              {phase.projects && phase.projects.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-brand-primary/70 mb-3 flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    Milestone Projects
                  </h4>
                  <div className="space-y-2">
                    {phase.projects.map((project, pIdx) => (
                      <motion.div
                        key={pIdx}
                        whileHover={{ x: 4 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-brand-bg/60 hover:bg-brand-bg transition-colors"
                      >
                        <ArrowRight className="w-4 h-4 text-brand-accent mt-0.5 flex-shrink-0" />
                        <span className="text-brand-text">{project}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
