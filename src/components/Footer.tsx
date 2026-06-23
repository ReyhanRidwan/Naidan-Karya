/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Phone, MapPin, Clock, ShieldCheck, Mail, Calendar, Compass } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (id: string) => {
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

  const areas = [
    'Tanjung Priok', 'Penjaringan', 'Pademangan', 'Koja', 
    'Jakarta Pusat', 'Jakarta Utara', 'Jabodetabek'
  ];

  const keywords = [
    'kontraktor jakarta utara', 'jasa renovasi ruko jakarta', 
    'kontraktor gudang jakarta', 'jasa interior kantor jakarta', 
    'kontraktor bangunan jakarta utara', 'instalasi CCTV jakarta', 
    'jasa MEP jakarta'
  ];

  return (
    <footer className="bg-brand-blue-900 text-white relative border-t-4 border-brand-orange-500 overflow-hidden">
      
      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 grid-overlay-dark opacity-5 pointer-events-none" />

      {/* Main Footer Upper Directory */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Column 1: Brand details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="bg-brand-orange-500 text-white p-2 rounded-lg font-display font-bold text-xl tracking-tight">
                NK
              </div>
              <div>
                <span className="font-display font-bold text-xl tracking-wide block leading-none">
                  NAIDAN KARYA
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-brand-orange-500 block mt-1">
                  MAKMUR
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 font-light leading-relaxed">
              Naidan Karya Makmur adalah perusahaan jasa kontraktor tepercaya yang berbasis di Jakarta Utara. Berbekal pengalaman lebih dari 10 tahun, kami berkomitmen menghadirkan hasil konstruksi ruko, gudang, kantor, renovasi, MEP, dan CCTV berkualitas bergaransi dengan RAB transparan.
            </p>

            <div className="flex items-center space-x-3 text-brand-orange-500">
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">
                LEGALITAS RESMI & BERGARANSI
              </span>
            </div>
          </div>

          {/* Column 2: Navigation links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-brand-orange-500 border-b border-brand-blue-800 pb-2">
              Navigasi Menu
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {[
                { label: 'Home', id: 'home' },
                { label: 'Tentang Kami', id: 'about' },
                { label: 'Layanan Utama', id: 'services' },
                { label: 'Proyek Portofolio', id: 'portfolio' },
                { label: 'Kalkulator RAB', id: 'rab-calculator' },
                { label: 'Survey Proyek', id: 'project-survey' }
              ].map((link, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => handleScrollTo(link.id)}
                    className="hover:text-brand-orange-500 hover:translate-x-1 transition-all cursor-pointer block text-left"
                  >
                    › {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Service Areas */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-brand-orange-500 border-b border-brand-blue-800 pb-2">
              Wilayah Layanan
            </h4>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Kami melayani survey lokasi gratis dan pengerjaan proyek konstruksi ruko/kantor/gudang di wilayah:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {areas.map((area, idx) => (
                <span 
                  key={idx} 
                  className="bg-brand-blue-800 border border-brand-blue-700/60 text-slate-200 text-[10px] font-medium py-1 px-2.5 rounded-md"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Column 4: Contact details & Hours */}
          <div className="lg:col-span-3 space-y-4 text-xs">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-brand-orange-500 border-b border-brand-blue-800 pb-2">
              Kantor & Operasional
            </h4>
            
            <div className="space-y-3.5 text-slate-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-brand-orange-500 flex-shrink-0 mt-0.5" />
                <span>Papanggo, Tanjung Priok, Jakarta Utara, DKI Jakarta</span>
              </div>

              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-brand-orange-500 flex-shrink-0" />
                <a href="tel:+6285280135252" className="hover:text-brand-orange-500 transition-colors font-semibold font-mono">
                  +62 852-8013-5252
                </a>
              </div>

              <div className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-brand-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Jam Kerja Operasional:</div>
                  <div className="mt-1 font-light">Senin – Jumat: 08.00 – 17.00 WIB</div>
                  <div className="font-light">Sabtu: 08.00 – 14.00 WIB</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* SEO Keywords Block - Beautiful Natural Text Panel */}
        <div className="border-t border-brand-blue-800 mt-16 pt-8">
          <div className="bg-brand-blue-900/60 border border-brand-blue-800 p-6 rounded-2xl space-y-3">
            <h5 className="font-display font-bold text-xs uppercase tracking-widest text-brand-orange-500 flex items-center">
              <Compass className="w-3.5 h-3.5 mr-2" />
              <span>SEO INDEX DIRECTORY (NAIDAN KARYA MAKMUR)</span>
            </h5>
            <p className="text-[11px] text-slate-400 leading-relaxed font-light">
              Sebagai pelaku konstruksi lokal berpengalaman, kami fokus mengoptimasi penelusuran digital untuk memenuhi kebutuhan Anda. Kami terdaftar resmi sebagai penyedia layanan terpercaya untuk kata kunci industri: 
              {keywords.map((kw, idx) => (
                <span key={idx} className="font-mono text-slate-300 italic">
                  {' '}"{kw}"{idx < keywords.length - 1 ? ',' : '.'}
                </span>
              ))}
              {' '}Layanan satu pintu kami mencakup pengerjaan sipil, arsitektural ruko niaga, struktur rangka baja gudang, mekanikal elektrikal plumbing (MEP) gedung kantor, serta pengamanan terintegrasi IP Camera CCTV untuk perlindungan aset bisnis Anda di Jakarta Utara, Jakarta Pusat, dan Jabodetabek.
            </p>
          </div>
        </div>

        {/* Copyright Panel */}
        <div className="border-t border-brand-blue-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-slate-400 text-xs gap-4 font-mono">
          <div>
            © {currentYear} Naidan Karya Makmur. All Rights Reserved.
          </div>
          <div className="flex space-x-4">
            <span>Sesuai Standar SNI Konstruksi Indonesia</span>
            <span>•</span>
            <span className="text-brand-orange-500">Jakarta Utara</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
