"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, History, Sparkles } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full px-6 py-4 bg-brand-cream/80 backdrop-blur-md border-b border-brand-accent/30 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-brand-slate flex items-center justify-center text-brand-cream transition-transform duration-300 group-hover:scale-105">
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-brand-slate flex items-center gap-1.5">
            Margdarshak<span className="text-sm font-semibold px-2 py-0.5 rounded-full bg-brand-accent/50 text-brand-slate/80">AI</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link 
            href="/" 
            className={`transition-colors duration-200 ${isActive("/") ? "text-brand-slate font-semibold" : "text-brand-slate/60 hover:text-brand-slate"}`}
          >
            Generator
          </Link>
          <Link 
            href="/history" 
            className={`transition-colors duration-200 flex items-center gap-1.5 ${isActive("/history") ? "text-brand-slate font-semibold" : "text-brand-slate/60 hover:text-brand-slate"}`}
          >
            <History className="w-4 h-4" />
            Saved Roadmaps
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link 
            href="/history"
            className="md:hidden p-2 rounded-xl border border-brand-accent/50 text-brand-slate hover:bg-brand-card transition-colors"
            title="View History"
          >
            <History className="w-5 h-5" />
          </Link>
          <a
            href="#generator"
            className="glossy-btn text-brand-cream px-4 py-2 rounded-xl text-xs font-semibold tracking-wide uppercase flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Build Roadmap
          </a>
        </div>
      </div>
    </header>
  );
}
