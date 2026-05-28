"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, BookOpen, Layers, ArrowRight, AlertCircle } from "lucide-react";

export default function RoadmapForm({ onSubmit, isLoading }) {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Beginner");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!role.trim()) {
      newErrors.role = "Target career role is required";
    } else if (role.trim().length < 3) {
      newErrors.role = "Role name must be at least 3 characters";
    }

    if (!skills.trim()) {
      newErrors.skills = "Please enter at least one current skill";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const skillsList = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    onSubmit({
      role: role.trim(),
      skills: skillsList,
      experienceLevel,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div 
      className="w-full max-w-3xl mx-auto"
      id="generator"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="card-premium p-8 md:p-12 rounded-2xl relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-brand-accent/30 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Header */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-gradient-to-br from-brand-accent/20 to-brand-accent/10">
                <Sparkles className="w-5 h-5 text-brand-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">
                Generate Your Roadmap
              </h2>
            </div>
            <p className="text-brand-text text-lg">
              Define your career goal and current skills. We&apos;ll create a personalized learning path.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Target Role */}
            <FormField
              label="Target Career Role"
              icon={Layers}
              error={errors.role}
              delay={0.2}
            >
              <input
                type="text"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  if (errors.role) setErrors((prev) => ({ ...prev, role: "" }));
                }}
                placeholder="e.g. Frontend Developer, DevOps Engineer"
                className={`w-full px-5 py-4 bg-brand-bg border-2 transition-all duration-300 rounded-xl text-base focus:outline-none ${
                  errors.role 
                    ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100" 
                    : "border-brand-border hover:border-brand-accent/40 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/10"
                } text-brand-primary placeholder-brand-text/50 disabled:opacity-50`}
                disabled={isLoading}
              />
            </FormField>

            {/* Current Skills */}
            <FormField
              label="Current Skills"
              icon={Zap}
              error={errors.skills}
              hint="Enter skills separated by commas"
              delay={0.3}
            >
              <input
                type="text"
                value={skills}
                onChange={(e) => {
                  setSkills(e.target.value);
                  if (errors.skills) setErrors((prev) => ({ ...prev, skills: "" }));
                }}
                placeholder="e.g. HTML, CSS, JavaScript, React"
                className={`w-full px-5 py-4 bg-brand-bg border-2 transition-all duration-300 rounded-xl text-base focus:outline-none ${
                  errors.skills 
                    ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100" 
                    : "border-brand-border hover:border-brand-accent/40 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/10"
                } text-brand-primary placeholder-brand-text/50 disabled:opacity-50`}
                disabled={isLoading}
              />
            </FormField>

            {/* Experience Level & Submit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end pt-2">
              <FormField
                label="Experience Level"
                icon={BookOpen}
                delay={0.4}
                inline
              >
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full px-5 py-4 bg-brand-bg border-2 border-brand-border hover:border-brand-accent/40 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/10 rounded-xl text-base focus:outline-none appearance-none transition-all duration-300 cursor-pointer text-brand-primary disabled:opacity-50"
                  disabled={isLoading}
                >
                  <option value="Beginner">Beginner (0-1 years)</option>
                  <option value="Intermediate">Intermediate (1-3 years)</option>
                  <option value="Advanced">Advanced (3+ years)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-brand-text">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </FormField>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary text-white px-8 py-4 rounded-xl text-base font-semibold tracking-wide flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed w-full md:col-span-1 h-14 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Path</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

function FormField({ label, icon: Icon, error, hint, delay = 0, inline = false, children }) {
  return (
    <motion.div 
      className="space-y-2.5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <label className="block text-sm font-semibold text-brand-primary flex items-center gap-2">
        <Icon className="w-4 h-4 text-brand-accent" />
        {label}
      </label>
      <div className="relative">
        {children}
      </div>
      {error && (
        <motion.p 
          className="text-sm text-red-500 font-medium flex items-center gap-1"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="w-4 h-4" />
          {error}
        </motion.p>
      )}
      {hint && !error && (
        <p className="text-sm text-brand-text/60">{hint}</p>
      )}
    </motion.div>
  );
}
