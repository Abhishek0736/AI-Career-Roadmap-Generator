"use client";

import { useState } from "react";
import { Sparkles, Terminal, BookOpen, Layers } from "lucide-react";

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

    // Split skills by commas and clean whitespaces
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

  return (
    <div className="w-full max-w-2xl mx-auto" id="generator">
      <div className="glass-panel p-8 sm:p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
        {/* Glow Element */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/30 rounded-full blur-xl pointer-events-none" />

        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-brand-slate flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-slate" />
            Generate Custom Roadmap
          </h2>
          <p className="text-sm text-brand-slate/60 mt-1">
            Fill in the parameters below to outline your tailored engineering path.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Target Role */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-slate/85 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Target Career Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                if (errors.role) setErrors((prev) => ({ ...prev, role: "" }));
              }}
              placeholder="e.g. Frontend Developer, DevOps Engineer, UI/UX Designer"
              className={`w-full px-4 py-3.5 bg-brand-cream/50 border ${
                errors.role ? "border-red-400 focus:ring-red-200" : "border-brand-accent/80 focus:border-brand-slate"
              } rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/40 transition-all text-brand-slate placeholder-brand-slate/40`}
              disabled={isLoading}
            />
            {errors.role && (
              <p className="text-xs text-red-500 font-medium pl-1">{errors.role}</p>
            )}
          </div>

          {/* Current Skills */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-slate/85 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              Current Skills
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => {
                setSkills(e.target.value);
                if (errors.skills) setErrors((prev) => ({ ...prev, skills: "" }));
              }}
              placeholder="e.g. HTML, CSS, Basic JavaScript (comma separated)"
              className={`w-full px-4 py-3.5 bg-brand-cream/50 border ${
                errors.skills ? "border-red-400 focus:ring-red-200" : "border-brand-accent/80 focus:border-brand-slate"
              } rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/40 transition-all text-brand-slate placeholder-brand-slate/40`}
              disabled={isLoading}
            />
            {errors.skills && (
              <p className="text-xs text-red-500 font-medium pl-1">{errors.skills}</p>
            )}
            <p className="text-[11px] text-brand-slate/50 pl-1">
              Adding existing skills allows the generator to customize which modules you skip or reinforce.
            </p>
          </div>

          {/* Experience level & Button */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-slate/85 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Experience Level
              </label>
              <div className="relative">
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full px-4 py-3.5 bg-brand-cream/50 border border-brand-accent/80 focus:border-brand-slate rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/40 appearance-none text-brand-slate cursor-pointer"
                  disabled={isLoading}
                >
                  <option value="Beginner">Beginner (0 - 1 years)</option>
                  <option value="Intermediate">Intermediate (1 - 3 years)</option>
                  <option value="Advanced">Advanced (3+ years)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-slate/60">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full glossy-btn text-brand-cream py-3.5 px-6 rounded-2xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-brand-cream border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate AI Roadmap
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
