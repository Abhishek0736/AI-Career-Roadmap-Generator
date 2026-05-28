"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { ArrowLeft, Search, Archive, Sparkles, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import HistoryCard from "@/components/HistoryCard";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";
import { roadmapService } from "@/services/api";

export default function HistoryPage() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      const data = await roadmapService.getAll();
      setRoadmaps(data);
    } catch (err) {
      console.error(err);
      toast.error("Could not fetch roadmaps history.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await roadmapService.delete(id);
      toast.success("Roadmap deleted successfully");
      setRoadmaps((prev) => prev.filter((r) => r._id !== id));
      if (selectedRoadmap && selectedRoadmap._id === id) {
        setSelectedRoadmap(null);
      }
    } catch (err) {
      toast.error(err.message || "Failed to delete roadmap");
      throw err;
    }
  };

  const filteredRoadmaps = roadmaps.filter((r) =>
    r.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg">
      <Navbar />

      <main className="flex-grow py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-brand-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Generator
            </Link>
            <h1 className="text-5xl font-bold text-brand-primary mb-4">
              Roadmap Archive
            </h1>
            <p className="text-xl text-brand-text max-w-2xl">
              Browse and manage your generated career pathways
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12 relative max-w-md"
          >
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-brand-accent" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role..."
              className="w-full pl-12 pr-4 py-3 bg-brand-card border-2 border-brand-border hover:border-brand-accent/60 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/10 rounded-xl text-base transition-all text-brand-primary placeholder-brand-text/50"
            />
          </motion.div>

          {/* Roadmaps Grid */}
          {isLoading ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <motion.div
                  key={n}
                  className="h-64 bg-brand-border/20 rounded-xl animate-pulse"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: n * 0.05 }}
                />
              ))}
            </motion.div>
          ) : filteredRoadmaps.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-premium p-12 md:p-16 rounded-xl text-center max-w-2xl mx-auto border-2 border-dashed border-brand-border"
            >
              <Archive className="w-16 h-16 mx-auto mb-4 text-brand-text/40" />
              <h3 className="text-2xl font-bold text-brand-primary mb-2">
                {searchQuery ? "No Results" : "No Roadmaps Yet"}
              </h3>
              <p className="text-brand-text mb-8">
                {searchQuery 
                  ? "Try searching with different keywords" 
                  : "Start creating career roadmaps to see them here"}
              </p>
              {!searchQuery && (
                <Link 
                  href="/#generator"
                  className="btn-primary text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Create First Roadmap
                </Link>
              )}
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {filteredRoadmaps.map((roadmap, idx) => (
                <motion.div
                  key={roadmap._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <HistoryCard
                    roadmap={roadmap}
                    onView={(roadmap) => setSelectedRoadmap(roadmap)}
                    onDelete={handleDelete}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>

      {/* Modal for Viewing Full Roadmap */}
      <AnimatePresence>
        {selectedRoadmap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelectedRoadmap(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto card-premium rounded-2xl border-2 border-brand-border"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-brand-bg border-b border-brand-border/40 px-8 py-6 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">Detail View</span>
                  <h2 className="text-3xl font-bold text-brand-primary mt-2">{selectedRoadmap.role}</h2>
                  <div className="flex gap-4 mt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-brand-text/60">Level:</span>
                      <span className="text-sm font-semibold text-brand-primary">{selectedRoadmap.experienceLevel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-brand-text/60">Skills:</span>
                      <span className="text-sm font-semibold text-brand-primary">{selectedRoadmap.skills?.length}</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedRoadmap(null)}
                  className="p-3 rounded-lg hover:bg-brand-border/40 transition-colors text-brand-text"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <Timeline 
                  roadmap={selectedRoadmap.generatedRoadmap} 
                  currentSkills={selectedRoadmap.skills} 
                />
              </div>

              {/* Modal Footer */}
              <div className="border-t border-brand-border/40 px-8 py-6 flex justify-end gap-3 bg-brand-card/40">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedRoadmap(null)}
                  className="px-6 py-2.5 rounded-lg border-2 border-brand-border hover:bg-brand-border/20 font-semibold text-brand-primary transition-all"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
