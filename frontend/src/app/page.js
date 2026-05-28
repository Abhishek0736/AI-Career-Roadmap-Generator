"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { ArrowRight } from "lucide-react";
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
    <div className="flex flex-col min-h-screen bg-brand-bg">
      {/* Navigation */}
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Generator Section */}
        <section className="py-20 px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <RoadmapForm onSubmit={handleGenerate} isLoading={isLoading} />
          </div>
        </section>

        {/* Output Preview */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loader"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-b from-brand-bg to-brand-card/50 border-t border-brand-border/40"
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
              className="border-t border-brand-border/40 bg-gradient-to-b from-brand-bg via-brand-bg to-brand-card/30"
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                {/* Meta Details Banner */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card-premium p-6 md:p-8 rounded-xl mb-8 border-2 border-brand-border"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex-1">
                      <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">Preview</span>
                      <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mt-2">{activeRoadmap.role}</h2>
                      <div className="flex flex-wrap items-center gap-4 mt-4">
                        <div>
                          <p className="text-xs text-brand-text/60 uppercase tracking-wider">Experience Level</p>
                          <p className="text-sm font-semibold text-brand-primary">{activeRoadmap.experienceLevel}</p>
                        </div>
                        <div className="h-4 w-px bg-brand-border" />
                        <div>
                          <p className="text-xs text-brand-text/60 uppercase tracking-wider">Current Skills</p>
                          <p className="text-sm font-semibold text-brand-primary">{activeRoadmap.skills?.length} skills</p>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setActiveRoadmap(null);
                        toast.success("Preview closed");
                      }}
                      className="btn-secondary px-6 py-3 rounded-lg text-sm font-semibold transition-all w-full md:w-auto"
                    >
                      Close Preview
                    </motion.button>
                  </div>
                </motion.div>

                <Timeline roadmap={activeRoadmap.generatedRoadmap} currentSkills={activeRoadmap.skills} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recent Roadmaps Section */}
        {!isFetchingHistory && history.length > 0 && (
          <section className="py-20 px-6 lg:px-8 border-t border-brand-border/40 bg-brand-bg">
            <div className="max-w-7xl mx-auto">
              <motion.div 
                className="flex justify-between items-end mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-text/60">Your Library</span>
                  <h3 className="text-4xl font-bold text-brand-primary mt-2">Recent Roadmaps</h3>
                  <p className="text-brand-text/70 mt-2">Quick access to your saved career paths</p>
                </div>
                {history.length > 3 && (
                  <Link 
                    href="/history" 
                    className="group flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-brand-border hover:border-brand-accent bg-brand-card hover:bg-brand-accent/5 transition-all"
                  >
                    <span className="text-sm font-semibold text-brand-primary">View All</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </motion.div>

              {isFetchingHistory ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((n) => (
                    <motion.div
                      key={n}
                      className="h-64 bg-brand-border/20 rounded-xl animate-pulse"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: n * 0.1 }}
                    />
                  ))}
                </div>
              ) : history.length === 0 ? null : (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, staggerChildren: 0.1 }}
                >
                  {history.slice(0, 3).map((roadmap, idx) => (
                    <motion.div
                      key={roadmap._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      <HistoryCard
                        roadmap={roadmap}
                        onView={setActiveRoadmap}
                        onDelete={handleDeleteRoadmap}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
