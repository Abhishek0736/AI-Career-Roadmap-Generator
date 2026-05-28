"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Compass, Sparkles, History, ArrowRight } from "lucide-react";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RoadmapForm from "@/components/RoadmapForm";
import Timeline from "@/components/Timeline";
import HistoryCard from "@/components/HistoryCard";
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";

import { roadmapService } from "@/services/api";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeRoadmap, setActiveRoadmap] = useState(null);
  const [history, setHistory] = useState([]);
  const [isFetchingHistory, setIsFetchingHistory] = useState(true);

  // Fetch history on component mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await roadmapService.getAll();
        setHistory(data);
        // Auto-display the absolute newest roadmap if nothing is active
        if (data.length > 0 && !activeRoadmap) {
          setActiveRoadmap(data[0]);
        }
      } catch (err) {
        console.error("Error loading roadmap history:", err);
      } finally {
        setIsFetchingHistory(false);
      }
    };

    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenerate = async (formData) => {
    setIsLoading(true);
    setActiveRoadmap(null);

    // Dynamic toast message
    const toastId = toast.loading("Connecting to generator engine...");
    
    try {
      const result = await roadmapService.generate(formData);
      
      toast.success("Roadmap generated and saved successfully!", { id: toastId });
      
      setActiveRoadmap(result);
      // Prepend to local history state
      setHistory((prev) => [result, ...prev]);

      // Scroll smoothly to timeline preview
      setTimeout(() => {
        const previewElement = document.getElementById("timeline-preview");
        if (previewElement) {
          previewElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    } catch (err) {
      toast.error(err.message || "Failed to generate roadmap.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRoadmap = async (id) => {
    try {
      await roadmapService.delete(id);
      toast.success("Roadmap deleted successfully");
      
      // Update states
      setHistory((prev) => prev.filter((item) => item._id !== id));
      if (activeRoadmap && activeRoadmap._id === id) {
        setActiveRoadmap(null);
      }
    } catch (err) {
      toast.error(err.message || "Failed to delete roadmap");
      throw err;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream">
      {/* Navigation */}
      <Navbar />

      <main className="flex-grow">
        {/* Animated Hero Section */}
        <Hero />

        {/* Form Container */}
        <div className="py-16 px-6 max-w-6xl mx-auto">
          <RoadmapForm onSubmit={handleGenerate} isLoading={isLoading} />
        </div>

        {/* Generator Output Preview */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loader"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-12 bg-[#F9F6EE] border-t border-b border-brand-accent/20"
            >
              <Loader />
            </motion.div>
          )}

          {!isLoading && activeRoadmap && (
            <motion.div
              key="timeline"
              id="timeline-preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-16 bg-[#F9F6EE] border-t border-b border-brand-accent/20 px-6"
            >
              <div className="max-w-4xl mx-auto">
                {/* Meta details banner */}
                <div className="glass-panel p-6 rounded-3xl mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-xs font-bold text-brand-slate/40 uppercase tracking-widest">Active Preview</span>
                    <h2 className="text-2xl font-extrabold text-brand-slate">{activeRoadmap.role}</h2>
                    <p className="text-xs text-brand-slate/60 mt-1">
                      Experience: <strong className="text-brand-slate">{activeRoadmap.experienceLevel}</strong> &bull; 
                      Generated for: <strong className="text-brand-slate">{activeRoadmap.skills?.join(", ")}</strong>
                    </p>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <button 
                      onClick={() => {
                        setActiveRoadmap(null);
                        toast.success("Preview closed");
                      }}
                      className="px-4 py-2 border border-brand-accent/80 hover:border-brand-slate bg-brand-cream text-brand-slate text-xs font-semibold rounded-xl transition-all"
                    >
                      Close Preview
                    </button>
                  </div>
                </div>

                <Timeline roadmap={activeRoadmap.generatedRoadmap} currentSkills={activeRoadmap.skills} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Quick History (Recent 3 roadmaps) */}
        <section className="py-16 px-6 max-w-6xl mx-auto border-t border-brand-accent/30">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-slate/40">Dashboard History</span>
              <h3 className="text-2xl font-extrabold text-brand-slate mt-1">Recent Roadmap Library</h3>
            </div>
            {history.length > 3 && (
              <Link 
                href="/history" 
                className="group flex items-center gap-1 text-sm font-bold text-brand-slate hover:opacity-80 transition-opacity"
              >
                <span>View All History</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )}
          </div>

          {isFetchingHistory ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-[220px] bg-brand-card/40 border border-brand-accent/40 rounded-[2rem] animate-pulse" />
              ))}
            </div>
          ) : history.length === 0 ? (
            /* Empty State */
            <div className="glass-panel p-12 rounded-[2.5rem] border border-dashed border-brand-accent text-center flex flex-col items-center max-w-xl mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-brand-card flex items-center justify-center text-brand-slate/40 mb-4 border border-brand-accent">
                <History className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-brand-slate">No roadmaps generated yet</h4>
              <p className="text-xs text-brand-slate/60 mt-1.5 max-w-sm leading-relaxed">
                Your generated roadmaps will appear here for quick access. Use the generator form above to build your first learning timeline.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {history.slice(0, 3).map((item) => (
                <HistoryCard
                  key={item._id}
                  roadmap={item}
                  onView={(roadmap) => {
                    setActiveRoadmap(roadmap);
                    // Scroll smoothly to timeline
                    setTimeout(() => {
                      const timelineEl = document.getElementById("timeline-preview");
                      if (timelineEl) {
                        timelineEl.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }, 100);
                  }}
                  onDelete={handleDeleteRoadmap}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
