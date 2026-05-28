"use client";

import { useState } from "react";
import { Calendar, Trash2, ArrowUpRight, Compass, ShieldAlert } from "lucide-react";

export default function HistoryCard({ roadmap, onView, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const formattedDate = new Date(roadmap.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleDelete = async (e) => {
    e.stopPropagation();
    setIsDeleting(true);
    try {
      await onDelete(roadmap._id);
    } catch (err) {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-sky-50 text-sky-800 border-sky-200";
      case "Intermediate":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Advanced":
        return "bg-purple-50 text-purple-800 border-purple-200";
      default:
        return "bg-brand-cream/60 border-brand-accent text-brand-slate";
    }
  };

  return (
    <div 
      className="glass-panel p-6 rounded-[2rem] border border-brand-accent/50 hover:border-brand-slate/30 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group relative overflow-hidden h-full min-h-[220px]"
    >
      {/* Delete Confirmation Overlay */}
      {showConfirm && (
        <div className="absolute inset-0 bg-brand-card/95 backdrop-blur-sm z-10 p-6 flex flex-col justify-between items-center text-center">
          <div className="flex flex-col items-center gap-2 mt-2">
            <div className="p-2 bg-red-50 text-red-600 rounded-full border border-red-200">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <h4 className="text-sm font-bold text-brand-slate">Delete this roadmap?</h4>
            <p className="text-xs text-brand-slate/60 px-4">This action is permanent and cannot be undone.</p>
          </div>
          <div className="flex gap-3 w-full">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowConfirm(false);
              }}
              className="flex-1 py-2 rounded-xl text-xs font-semibold border border-brand-accent bg-brand-cream hover:bg-brand-card text-brand-slate transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors flex items-center justify-center gap-1"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      )}

      {/* Main Card Content */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getDifficultyColor(roadmap.experienceLevel)}`}>
            {roadmap.experienceLevel}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-brand-slate/50">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <h4 className="text-lg font-bold text-brand-slate line-clamp-1 group-hover:text-black transition-colors mb-2">
          {roadmap.role}
        </h4>

        {/* Skills Tag Cloud */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1 max-h-[50px] overflow-hidden relative">
            {roadmap.skills && roadmap.skills.map((skill, idx) => (
              <span 
                key={idx} 
                className="text-[10px] px-2 py-0.5 rounded-lg bg-brand-cream/65 border border-brand-accent/50 text-brand-slate/75"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer controls */}
      <div className="flex items-center justify-between border-t border-brand-accent/30 pt-4 mt-auto">
        <span className="text-xs text-brand-slate/50 font-medium">
          {roadmap.generatedRoadmap?.phases?.length || 0} Phases
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirm(true);
            }}
            className="p-2 text-brand-slate/40 hover:text-red-600 hover:bg-red-50 rounded-xl border border-transparent hover:border-red-100 transition-all"
            title="Delete Roadmap"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onView(roadmap)}
            className="glossy-btn text-brand-cream p-2 px-3.5 rounded-xl text-xs font-semibold flex items-center gap-1"
          >
            <span>View</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
