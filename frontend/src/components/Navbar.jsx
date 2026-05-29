"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Compass, History, Sparkles, Menu, X, ArrowRight } from "lucide-react";


export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => pathname === path;

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "glass-navbar scrolled border-b border-brand-border/40" 
          : "glass-navbar border-b border-brand-border/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-text flex items-center justify-center text-white transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-brand-primary flex items-center gap-2">
                PathCraft
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-brand-accent to-amber-500 text-white">
                  AI
                </span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink 
              href="/" 
              label="Generator" 
              icon={Sparkles}
              isActive={isActive("/")}
            />
            <NavLink 
              href="/history" 
              label="Saved Roadmaps" 
              icon={History}
              isActive={isActive("/history")}
            />
          </nav>

          {/* Desktop CTA */}
          <motion.div
            className="hidden md:flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <a
              href="#generator"
              className="btn-primary text-white px-6 py-2.5 rounded-xl text-sm font-semibold tracking-wide flex items-center gap-2 group"
            >
              <Sparkles className="w-4 h-4" />
              Generate
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-brand-border/20 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-brand-primary" />
            ) : (
              <Menu className="w-6 h-6 text-brand-primary" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-4 pt-4 border-t border-brand-border/20"
          >
            <div className="flex flex-col gap-3">
              <MobileNavLink 
                href="/" 
                label="Generator" 
                icon={Sparkles}
              />
              <MobileNavLink 
                href="/history" 
                label="Saved Roadmaps" 
                icon={History}
              />
              <a
                href="#generator"
                className="btn-primary text-white px-6 py-2.5 rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 w-full"
              >
                <Sparkles className="w-4 h-4" />
                Generate Roadmap
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}

function NavLink({ href, label, icon: Icon, isActive }) {
  return (
    <Link href={href} className="relative group">
      <span className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors duration-300 ${
        isActive 
          ? "text-brand-primary font-semibold bg-brand-border/20" 
          : "text-brand-text hover:text-brand-primary"
      }`}>
        <Icon className="w-4 h-4" />
        {label}
      </span>
      {isActive && (
        <motion.div
          layoutId="navbar-indicator"
          className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-accent rounded-full"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
}

function MobileNavLink({ href, label, icon: Icon }) {
  return (
    <Link href={href} className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-brand-border/20 transition-colors text-brand-primary font-medium">
      <Icon className="w-4 h-4" />
      {label}
    </Link>
  );
}
