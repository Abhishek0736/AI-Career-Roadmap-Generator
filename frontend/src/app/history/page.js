"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft, Search, Archive, Compass, Sparkles, X, LayoutGrid } from "lucide-react";
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
    <div className="flex flex-col min-h-screen bg-brand-cream">
      <Navbar />

      <main className="flex-grow max-w-6xl w-full mx-auto px-6 py-12">
        {/* Back Link & Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-slate/50 hover:text-brand-slate uppercase tracking-wider mb-3 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Generator
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-slate tracking-tight">
              Roadmap Archive
            </h1>
            <p className="text-sm text-brand-slate/60 mt-1.5">
              Review and manage your generated career pathways.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-brand-slate/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by career role..."
              className="w-full pl-11 pr-4 py-3 bg-brand-card/50 border border-brand-accent/80 focus:border-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-accent/40 rounded-2xl text-xs transition-all text-brand-slate placeholder-brand-slate/40"
            />
          </div>
        </div>

        {/* Content list */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-[220px] bg-brand-card/40 border border-brand-accent/40 rounded-[2rem] animate-pulse" />
            ))}
          </div>
        ) : filteredRoadmaps.length === 0 ? (
          /* Empty State */
          <div className="glass-panel p-16 rounded-[2.5rem] border border-dashed border-brand-accent text-center flex flex-col items-center max-w-xl mx-auto my-12">
            <div className="w-12 h-12 rounded-2xl bg-brand-card flex items-center justify-center text-brand-slate/40 mb-4 border border-brand-accent">
              <Archive className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-brand-slate">No roadmaps matched</h4>
            <p className="text-xs text-brand-slate/60 mt-1.5 max-w-xs leading-relaxed">
              {searchQuery ? "Try searching for a different career role keywords." : "You haven't generated any roadmaps yet. Go back to generator to build one."}
            </p>
            {!searchQuery && (
              <Link 
                href="/#generator"
                className="glossy-btn text-brand-cream px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider mt-6"
              >
                Create Now
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredRoadmaps.map((item) => (
              <HistoryCard
                key={item._id}
                roadmap={item}
                onView={(roadmap) => setSelectedRoadmap(roadmap)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Roadmap Detail Modal Backdrop */}
      {selectedRoadmap && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex justify-end transition-all duration-300 page-transition"
          onClick={() => setSelectedRoadmap(null)}
        >
          {/* Modal Drawer */}
          <div 
            className="w-full max-w-2xl bg-brand-cream h-full overflow-y-auto shadow-2xl p-6 sm:p-10 border-l border-brand-accent/60 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-brand-accent/40 pb-6 mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border bg-brand-card text-brand-slate border-brand-accent/60">
                  {selectedRoadmap.experienceLevel}
                </span>
                <h2 className="text-2xl font-extrabold text-brand-slate mt-2">
                  {selectedRoadmap.role}
                </h2>
                <p className="text-xs text-brand-slate/50 mt-1">
                  Skills: {selectedRoadmap.skills?.join(", ")}
                </p>
              </div>
              <button
                onClick={() => setSelectedRoadmap(null)}
                className="p-2 rounded-xl hover:bg-brand-card border border-brand-accent/40 text-brand-slate/60 hover:text-brand-slate transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Detailed Timeline */}
            <div className="flex-grow">
              <Timeline 
                roadmap={selectedRoadmap.generatedRoadmap} 
                currentSkills={selectedRoadmap.skills} 
              />
            </div>

            {/* Footer */}
            <div className="border-t border-brand-accent/40 pt-6 mt-8 flex justify-end">
              <button
                onClick={() => setSelectedRoadmap(null)}
                className="glossy-btn text-brand-cream px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
