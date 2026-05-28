import {
  Compass,
  Code,
  Mail,
  ExternalLink,
  GitBranch
} from "lucide-react";
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-brand-border/40 py-12 px-6 lg:px-8 bg-brand-bg/60 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-primary to-brand-text flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-primary">PathCraft</h3>
                <p className="text-xs text-brand-accent font-semibold">AI</p>
              </div>
            </div>
            <p className="text-sm text-brand-text/70 leading-relaxed">
              Generate AI-powered career roadmaps tailored to your experience and aspirations.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-bold text-brand-primary mb-4 uppercase tracking-wider">Product</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-brand-text hover:text-brand-accent transition-colors flex items-center gap-1.5 group">
                  <span>Features</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-brand-text hover:text-brand-accent transition-colors flex items-center gap-1.5 group">
                  <span>Pricing</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-brand-text hover:text-brand-accent transition-colors flex items-center gap-1.5 group">
                  <span>Roadmaps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-bold text-brand-primary mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-brand-text hover:text-brand-accent transition-colors flex items-center gap-1.5 group">
                  <span>About</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-brand-text hover:text-brand-accent transition-colors flex items-center gap-1.5 group">
                  <span>Blog</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-brand-text hover:text-brand-accent transition-colors flex items-center gap-1.5 group">
                  <span>Contact</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-bold text-brand-primary mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-brand-text hover:text-brand-accent transition-colors flex items-center gap-1.5 group">
                  <span>Privacy</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-brand-text hover:text-brand-accent transition-colors flex items-center gap-1.5 group">
                  <span>Terms</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-brand-text hover:text-brand-accent transition-colors flex items-center gap-1.5 group">
                  <span>Cookies</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-brand-border/40 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Copyright */}
            <p className="text-sm text-brand-text/60">
              &copy; {currentYear} PathCraft AI. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="p-2.5 rounded-lg hover:bg-brand-border/30 text-brand-text hover:text-brand-accent transition-all"
                title="GitHub"
              >
                <Code className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-lg hover:bg-brand-border/30 text-brand-text hover:text-brand-accent transition-all"
                title="LinkedIn"
              >
                <GitBranch className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-lg hover:bg-brand-border/30 text-brand-text hover:text-brand-accent transition-all"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
