/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calculator, Calendar, ArrowRight, CheckCircle, Shield } from 'lucide-react';
import heroBg from '../assets/images/hero_ruko_indonesia_1782231371472.jpg';

export default function Hero() {
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
    <section id="home" className="relative bg-brand-blue-900 min-h-[90vh] flex items-center overflow-hidden">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Proyek Naidan Karya Makmur Jakarta Utara" 
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.35] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        {/* Subtle geometric gradient overlay to direct attention left */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-900 via-brand-blue-900/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-900 via-transparent to-transparent z-10 opacity-60" />
      </div>

      {/* Grid Overlay Texture */}
      <div className="absolute inset-0 grid-overlay-dark opacity-10 z-10" />

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8 text-white">
            
            {/* Trust Badge */}
            <div className="inline-flex items-center space-x-2 bg-brand-orange-500/15 border border-brand-orange-500/35 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-brand-orange-500 animate-pulse" />
              <span className="text-xs md:text-sm font-semibold tracking-wide text-brand-orange-500 uppercase font-display">
                Kontraktor Terpercaya • Jakarta Utara
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight">
              Kontraktor Bangunan & Renovasi dengan{' '}
              <span className="text-brand-orange-500 underline decoration-brand-orange-500/40 decoration-wavy">
                RAB Transparan
              </span>{' '}
              & Pengawasan Profesional
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
              Melayani pembangunan, renovasi, interior, instalasi MEP, serta sistem keamanan untuk ruko, kantor, gudang, dan bangunan komersial di Jakarta dan sekitarnya.
            </p>

            {/* Benefit Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-200">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-brand-orange-500 flex-shrink-0" />
                <span>RAB Jelas Tanpa Biaya Tersembunyi</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-brand-orange-500 flex-shrink-0" />
                <span>Garansi Pekerjaan & Pengawasan Harian</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-brand-orange-500 flex-shrink-0" />
                <span>Gratis Survey Lokasi & Desain Awal</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-brand-orange-500 flex-shrink-0" />
                <span>Pengalaman Proyek Nyata & Legalitas Resmi</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => scrollToSection('rab-calculator')}
                className="bg-brand-orange-500 hover:bg-brand-orange-600 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-brand-orange-500/20 hover:shadow-brand-orange-500/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-base"
              >
                <Calculator className="w-5 h-5" />
                <span>Hitung Estimasi RAB</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => scrollToSection('project-survey')}
                className="bg-brand-blue-800/80 hover:bg-brand-blue-700/90 text-white border border-slate-500/30 px-8 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-base backdrop-blur-sm"
              >
                <Calendar className="w-5 h-5 text-brand-orange-500" />
                <span>Survey Lokasi Gratis</span>
              </button>
            </div>

          </div>

          {/* Right Floating Badge / Graphic Column */}
          <div className="lg:col-span-5 hidden lg:flex justify-end relative">
            <div className="glass-panel-dark text-white p-8 rounded-2xl max-w-sm border-brand-orange-500/30 shadow-2xl relative overflow-hidden">
              {/* Construction accent element */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange-500/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-8 bg-brand-orange-500/20 -skew-x-12 translate-y-4 -translate-x-8" />
              
              <h3 className="font-display font-bold text-xl mb-6 flex items-center space-x-2">
                <span className="bg-brand-orange-500 text-white p-1 rounded">NK</span>
                <span>Naidan Karya Makmur</span>
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="text-3xl font-extrabold text-brand-orange-500 font-display">10+ Tahun</div>
                  <div className="text-sm text-slate-300">Pengalaman Konstruksi Lapangan</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-brand-orange-500 font-display">150+ Proyek</div>
                  <div className="text-sm text-slate-300">Ruko, Gudang, Kantor & Renovasi Selesai</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-brand-orange-500 font-display">98%</div>
                  <div className="text-sm text-slate-300">Tingkat Kepuasan & Rekomendasi Klien</div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-brand-blue-700/60 flex items-center justify-between text-xs text-slate-400">
                <span>Standar Konstruksi Indonesia</span>
                <span className="text-brand-orange-500 font-bold font-mono text-[10px] tracking-wider">SNI 2026</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
