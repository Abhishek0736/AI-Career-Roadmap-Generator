"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Trash2, Eye, AlertTriangle, Zap, TrendingUp, BookOpen } from "lucide-react";


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
        return { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", icon: BookOpen };
      case "Intermediate":
        return { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", icon: TrendingUp };
      case "Advanced":
        return { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", icon: Zap };
      default:
        return { bg: "bg-brand-bg", border: "border-brand-border", text: "text-brand-primary", icon: BookOpen };
    }
  };

  const difficulty = getDifficultyColor(roadmap.experienceLevel);
  const DifficultyIcon = difficulty.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <div className="card-premium p-6 md:p-8 rounded-xl border-2 border-brand-border hover:border-brand-accent/50 transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden group"
      >
        {/* Accent border top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-accent via-brand-accent/50 to-transparent" />

        {/* Delete Confirmation Overlay */}
        <AnimatePresence>
          {showConfirm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 p-6 flex flex-col justify-between rounded-xl"
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                  className="p-3 bg-red-100 text-red-600 rounded-full border-2 border-red-200"
                >
                  <AlertTriangle className="w-6 h-6" />
                </motion.div>
                <h4 className="text-base font-bold text-brand-primary">Delete Roadmap?</h4>
                <p className="text-sm text-brand-text">This action cannot be undone.</p>
              </div>
              <div className="flex gap-3 w-full">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowConfirm(false);
                  }}
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold border-2 border-brand-border bg-brand-bg hover:bg-brand-border/20 text-brand-primary transition-all"
                >
                  Keep It
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-red-600 hover:bg-red-700 text-white transition-all disabled:opacity-60 flex items-center justify-center gap-1"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-6">
            <div className="flex-1">
              <motion.div
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 font-semibold text-xs mb-4 ${difficulty.bg} ${difficulty.border} ${difficulty.text}`}
              >
                <DifficultyIcon className="w-3.5 h-3.5" />
                {roadmap.experienceLevel}
              </motion.div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-primary group-hover:text-brand-accent transition-colors line-clamp-2">
                {roadmap.role}
              </h3>
            </div>
          </div>

          {/* Metadata */}
          <div className="space-y-4 mb-6 pb-6 border-b border-brand-border/40">
            <div className="flex items-center gap-2 text-sm text-brand-text">
              <Calendar className="w-4 h-4 text-brand-accent" />
              <span>{formattedDate}</span>
            </div>

            {/* Skills preview */}
            {roadmap.skills && roadmap.skills.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-primary/60">Current Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {roadmap.skills.slice(0, 3).map((skill, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="px-2.5 py-1 rounded-md bg-brand-bg text-brand-text text-xs font-medium border border-brand-border/60"
                    >
                      {skill}
                    </motion.span>
                  ))}
                  {roadmap.skills.length > 3 && (
                    <span className="px-2.5 py-1 rounded-md bg-brand-bg text-brand-text text-xs font-medium border border-brand-border/60">
                      +{roadmap.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Phase count */}
            {roadmap.phases && (
              <div className="text-xs text-brand-text/80">
                <span className="font-semibold">{roadmap.phases.length}</span> phases to master your path
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onView(roadmap)}
            className="flex-1 btn-primary text-white px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 group"
          >
            <Eye className="w-4 h-4" />
            <span>View Path</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirm(true);
            }}
            className="px-3 py-2.5 rounded-lg border-2 border-red-200 hover:bg-red-50 text-red-600 transition-all"
            title="Delete roadmap"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
