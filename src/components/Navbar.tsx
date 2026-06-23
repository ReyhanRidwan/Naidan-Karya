/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, Phone, ShieldCheck, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Tentang Kami', id: 'about' },
    { label: 'Layanan', id: 'services' },
    { label: 'Proyek', id: 'portfolio' },
    { label: 'Kalkulator RAB', id: 'rab-calculator' },
    { label: 'Survey Proyek', id: 'project-survey' },
    { label: 'Kontak', id: 'contact' },
  ];

  return (
    <>
      {/* Top Banner */}
      <div id="top-banner-bar" className="bg-brand-blue-900 text-white text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-sans">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-slate-300">
              <MapPin className="w-3.5 h-3.5 mr-1.5 text-brand-orange-500" />
              Papanggo, Tanjung Priok, Jakarta Utara
            </span>
            <span className="flex items-center text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-brand-orange-500" />
              Kontraktor Bergaransi & RAB Transparan
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-300">Jam Kerja: Sen-Sab (08:00 - 17:00 WIB)</span>
            <a 
              href="tel:+6285280135252" 
              className="text-brand-orange-500 hover:text-white font-medium flex items-center transition-colors"
            >
              <Phone className="w-3 h-3 mr-1" />
              +62 852-8013-5252
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        id="main-navigation-bar"
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-brand-blue-900/95 text-white shadow-lg backdrop-blur-md py-3' 
            : 'bg-white/95 text-brand-blue-900 shadow-md md:shadow-none md:bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo and Brand Name */}
            <div 
              className="flex-shrink-0 cursor-pointer flex items-center space-x-3" 
              onClick={() => scrollToSection('home')}
            >
              <div className="bg-brand-orange-500 text-white p-2 rounded-lg flex items-center justify-center font-display font-bold text-xl tracking-tight shadow-md">
                NK
              </div>
              <div>
                <span className={`font-display font-bold text-lg md:text-xl tracking-wide block leading-none ${
                  isScrolled ? 'text-white' : 'text-brand-blue-900'
                }`}>
                  NAIDAN KARYA
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-brand-orange-500 block mt-1">
                  MAKMUR
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 text-sm font-semibold rounded-md transition-all cursor-pointer ${
                    isScrolled 
                      ? 'text-slate-300 hover:text-brand-orange-500 hover:bg-white/5' 
                      : 'text-slate-700 hover:text-brand-orange-500 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA Desktop */}
            <div className="hidden lg:block">
              <button
                onClick={() => scrollToSection('project-survey')}
                className="bg-brand-orange-500 hover:bg-brand-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                Konsultasi Gratis
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-md ${
                  isScrolled ? 'text-white hover:bg-white/10' : 'text-brand-blue-900 hover:bg-slate-100'
                } focus:outline-none transition-colors cursor-pointer`}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-brand-blue-900 border-t border-brand-blue-800 text-white"
            >
              <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-4 py-3 rounded-md text-base font-semibold text-slate-300 hover:text-brand-orange-500 hover:bg-brand-blue-800/50 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-4 px-4">
                  <button
                    onClick={() => scrollToSection('project-survey')}
                    className="w-full text-center bg-brand-orange-500 hover:bg-brand-orange-600 text-white py-3 rounded-lg font-bold shadow-md transition-colors block"
                  >
                    Konsultasi Gratis
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
