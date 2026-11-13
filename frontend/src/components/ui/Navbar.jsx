import React, { useState, useEffect } from 'react';
import { Menu, X, Bot, MessageSquare, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS } from '../../data/portfolioData';
import { PLACEHOLDERS } from '../../data/placeholders';

/**
 * Navbar - Standard, Professional Full-Width Website Header
 */
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((link) => link.id);
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#030712]/95 backdrop-blur-md border-b border-slate-800/80 shadow-md">
      <div className="w-full px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-cyan/20 to-cyber-violet/30 border border-cyber-cyan/50 flex items-center justify-center text-cyber-cyan font-gaming font-bold text-base shadow-glow-subtle group-hover:scale-105 transition-transform">
            SA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-gaming font-bold text-base tracking-wider uppercase text-white group-hover:text-cyber-cyan transition-colors">
                SHERYAR AMIR
              </span>
            </div>
            <div className="text-[11px] font-sans text-slate-400">
              Game Developer &bull; 3D Artist
            </div>
          </div>
        </a>

        {/* Center: Generic & Typical Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                className={`text-sm font-sans transition-colors relative py-1 ${
                  isActive
                    ? 'text-cyber-cyan font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyber-cyan after:rounded-full'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Quick Contact & Assistant Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={PLACEHOLDERS.WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500 hover:text-black font-gaming font-semibold text-xs tracking-wide transition-all flex items-center gap-1.5"
          >
            <span>💬</span>
            <span>WHATSAPP</span>
          </a>

          <a
            href="#ai-assistant"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('ai-assistant');
            }}
            className="px-3.5 py-1.5 rounded-lg bg-cyber-cyan/15 border border-cyber-cyan/40 text-cyber-cyan hover:bg-cyber-cyan hover:text-space-dark font-gaming font-semibold text-xs tracking-wide transition-all flex items-center gap-1.5 shadow-glow-subtle"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI ASSISTANT</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-space-dark/98 border-b border-space-border px-6 py-5 space-y-3">
          <div className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                className={`py-2 px-3 rounded-lg text-sm font-sans ${
                  activeSection === link.id
                    ? 'text-cyber-cyan bg-cyber-cyan/10 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <a
              href={PLACEHOLDERS.WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-center text-xs font-gaming font-bold flex items-center justify-center gap-2"
            >
              <span>💬</span>
              <span>CHAT ON WHATSAPP (+923351810651)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
