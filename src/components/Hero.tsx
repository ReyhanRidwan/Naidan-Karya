/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Calculator, Calendar, ArrowRight, Shield, Clock, Compass, FileText } from 'lucide-react';

const backgroundImages = [
  'https://res.cloudinary.com/di6ziqvtp/image/upload/v1782823479/interior_lantai_parket_mugzli.png',
  'https://res.cloudinary.com/di6ziqvtp/image/upload/v1782826238/renovasi_bangunan_komersial_txmahd.jpg'
];

export default function Hero() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // Berganti setiap 5 detik
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 bg-slate-950">
      
      {/* Background Slideshow with Layered Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {backgroundImages.map((src, index) => (
          <img 
            key={src}
            src={src} 
            alt={`Proyek Naidan Karya Makmur Background ${index + 1}`} 
            className={`absolute inset-0 w-full h-full object-cover object-center md:object-right filter brightness-[0.75] contrast-[1.05] transition-opacity duration-1000 ease-in-out ${
              index === bgIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            referrerPolicy="no-referrer"
          />
        ))}
        {/* Horizontal gradient overlay: dark on the left (for text readability), fading to transparent/light on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 md:via-slate-950/60 md:to-transparent z-10" />
        {/* Subtle vertical gradient to blend with the rest of the dark sections */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 z-10" />
      </div>

      {/* Subtle Grid Overlay Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(245,158,11,0.02)_1px,transparent_1px)] [background-size:32px_32px] z-10 opacity-70" />

      {/* Hero Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-20 w-full text-left flex flex-col items-start">
        
        {/* Kicker/Top Badge */}
        <div className="inline-flex items-center space-x-2 bg-slate-900/85 backdrop-blur-md border border-amber-500/20 px-4 py-2 rounded-full mb-8 hover:border-amber-500/40 transition-all duration-500">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs md:text-sm font-medium tracking-[0.2em] text-amber-500 uppercase font-sans">
            KONTRAKTOR TERPERCAYA • JAKARTA UTARA
          </span>
        </div>

        {/* Main Heading (H1) */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-light tracking-tight text-white leading-[1.15] max-w-4xl text-left">
          Kontraktor Bangunan & Renovasi dengan{' '}
          <span className="font-medium bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent italic">
            RAB Transparan
          </span>{' '}
          & Pengawasan Profesional
        </h1>

        {/* Subheading/Description */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl font-light leading-relaxed text-left">
          Melayani pembangunan, renovasi, interior, instalasi MEP, serta sistem keamanan untuk ruko, kantor, gudang, dan bangunan komersial di Jakarta dan sekitarnya.
        </p>

        {/* Call to Actions (Buttons) */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-start w-full max-w-md">
          <button
            onClick={() => scrollToSection('rab-calculator')}
            className="group relative bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-base"
          >
            <Calculator className="w-5 h-5 transition-transform group-hover:rotate-6" />
            <span>Hitung Estimasi RAB</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={() => scrollToSection('project-survey')}
            className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:-translate-y-0.5 hover:border-white/40 transition-all duration-300 cursor-pointer text-base backdrop-blur-sm"
          >
            <Calendar className="w-5 h-5 text-amber-500" />
            <span>Survey Lokasi Gratis</span>
          </button>
        </div>

        {/* Trust Badges (Bottom Row) */}
        <div className="w-full mt-24 pt-8 border-t border-white/5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="flex items-center space-x-3 justify-start">
              <FileText className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <span className="text-xs font-medium tracking-wider text-slate-300 uppercase text-left leading-snug">
                RAB Jelas Tanpa Biaya Tersembunyi
              </span>
            </div>

            <div className="flex items-center space-x-3 justify-start">
              <Shield className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <span className="text-xs font-medium tracking-wider text-slate-300 uppercase text-left leading-snug">
                Garansi Pekerjaan & Pengawasan Harian
              </span>
            </div>

            <div className="flex items-center space-x-3 justify-start">
              <Compass className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <span className="text-xs font-medium tracking-wider text-slate-300 uppercase text-left leading-snug">
                Gratis Survey Lokasi & Desain Awal
              </span>
            </div>

            <div className="flex items-center space-x-3 justify-start">
              <Clock className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <span className="text-xs font-medium tracking-wider text-slate-300 uppercase text-left leading-snug">
                Pengalaman Proyek Nyata & Legalitas Resmi
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
