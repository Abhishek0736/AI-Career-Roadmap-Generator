import { Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-brand-accent/30 py-8 px-6 bg-brand-cream/40 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-brand-slate flex items-center justify-center text-brand-cream">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-bold tracking-tight text-brand-slate">
            Margdarshak AI
          </span>
        </div>
        <p className="text-xs text-brand-slate/50">
          &copy; {new Date().getFullYear()} Margdarshak AI. All rights reserved. Crafted for elite developers.
        </p>
      </div>
    </footer>
  );
}
