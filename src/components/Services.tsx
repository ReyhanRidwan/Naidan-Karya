/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Home, RefreshCw, Layers, Cpu, Eye, Check } from 'lucide-react';
import { motion } from 'motion/react';
import heroBg from '../assets/images/hero_ruko_indonesia_1782231371472.jpg';
import renovBg from '../assets/images/renovasi_komersial_1782231391194.jpg';

interface ServiceData {
  id: string;
  surveyValue: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  icon: any;
  imageType: 'photo' | 'blueprint-interior' | 'blueprint-mep' | 'blueprint-cctv';
  imageSrc?: string;
  items: string[];
  ctaText: string;
  badge: string;
}

interface ServicesProps {
  onServiceSelect?: (jenisProyek: string) => void;
}

export default function Services({ onServiceSelect }: ServicesProps) {
  const services: ServiceData[] = [
    {
      id: 'kontraktor',
      surveyValue: 'Bangun Ruko',
      title: 'Jasa Kontraktor Bangunan',
      subtitle: 'Struktur & Arsitektur Baru',
      shortDesc: 'Pembangunan terstruktur dari pondasi hingga serah terima kunci untuk tempat usaha Anda.',
      icon: Home,
      imageType: 'photo',
      imageSrc: heroBg,
      items: [
        'Pembangunan ruko (rumah toko) 2-4 lantai',
        'Pembangunan kantor kecil hingga menengah',
        'Konstruksi gudang penyimpanan komersial',
        'Pembangunan klinik, resto, dan retail',
        'Pengerjaan struktur beton & pondasi bore pile',
      ],
      ctaText: 'Rencanakan Bangun Baru',
      badge: 'DOKUMENTASI AKTUAL NKM',
    },
    {
      id: 'renovasi',
      surveyValue: 'Renovasi Ruko',
      title: 'Renovasi & Retrofitting',
      subtitle: 'Peremajaan & Penguatan Gedung',
      shortDesc: 'Kembalikan fungsi prima dan keindahan bangunan Anda dengan renovasi struktural maupun arsitektural.',
      icon: RefreshCw,
      imageType: 'photo',
      imageSrc: renovBg,
      items: [
        'Renovasi ruko fungsional untuk toko & kantor',
        'Renovasi interior & eksterior kantor (re-layout)',
        'Perbaikan atap bocor, dinding retak, & sasis',
        'Peningkatan kekuatan struktur (retrofitting)',
        'Pekerjaan pengecatan eksterior tahan cuaca',
      ],
      ctaText: 'Rencanakan Renovasi',
      badge: 'DOKUMENTASI AKTUAL NKM',
    },
    {
      id: 'interior',
      surveyValue: 'Interior',
      title: 'Desain & Konstruksi Interior',
      subtitle: 'Fungsional, Ergonomis & Estetis',
      shortDesc: 'Maksimalkan produktivitas kerja dan kenyamanan pelanggan dengan interior yang ergonomis.',
      icon: Layers,
      imageType: 'blueprint-interior',
      items: [
        'Interior kantor, kubikal staf, & ruang direksi',
        'Interior ruang usaha, showroom, dan butik ruko',
        'Instalasi custom furniture & backdrop fungsional',
        'Pekerjaan partisi gypsum & kaca tempered',
        'Desain plafon drop ceiling & lighting hangat',
      ],
      ctaText: 'Rencanakan Interior',
      badge: 'TECHNICAL ARCHITECTURE CAD',
    },
    {
      id: 'mep',
      surveyValue: 'MEP',
      title: 'Mekanikal Elektrikal Plumbing',
      subtitle: 'Instalasi Utilitas Gedung Vital',
      shortDesc: 'Instalasi utilitas vital bangunan yang aman, tertata rapi, dan sesuai dengan standar keselamatan.',
      icon: Cpu,
      imageType: 'blueprint-mep',
      items: [
        'Instalasi panel listrik utama & distribusi ruko',
        'Instalasi AC Cassette, Split Duct & ventilasi',
        'Sistem pembuangan air kotor & air bersih',
        'Instalasi pompa booster, torn air & grounding',
        'Peremajaan kabel listrik lama rawan korsleting',
      ],
      ctaText: 'Rencanakan MEP',
      badge: 'TECHNICAL UTILITY CAD',
    },
    {
      id: 'cctv',
      surveyValue: 'CCTV',
      title: 'CCTV & Sistem Keamanan',
      subtitle: 'Sistem Pengawasan & Akses Kontrol',
      shortDesc: 'Proteksi maksimal aset berharga Anda dengan integrasi sistem kamera pemantau & kontrol akses.',
      icon: Eye,
      imageType: 'blueprint-cctv',
      items: [
        'Pemasangan CCTV IP Camera resolusi tinggi',
        'Sistem monitoring online HP & integrasi NVR',
        'Kontrol akses pintu ruko (fingerprint & RFID)',
        'Pemasangan pipa conduit pelindung kabel baja',
        'Layanan maintenance berkala perangkat kamera',
      ],
      ctaText: 'Rencanakan Keamanan',
      badge: 'TECHNICAL SECURITY CAD',
    },
  ];

  const handleCtaClick = (surveyValue: string) => {
    if (onServiceSelect) {
      onServiceSelect(surveyValue);
    } else {
      const element = document.getElementById('project-survey');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const renderVisualHeader = (service: ServiceData) => {
    if (service.imageType === 'photo' && service.imageSrc) {
      return (
        <div className="h-52 relative overflow-hidden bg-brand-blue-900 border-b border-slate-100">
          <img 
            src={service.imageSrc} 
            alt={service.title} 
            className="w-full h-full object-cover brightness-[0.7] hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 bg-brand-orange-500 text-white font-mono text-[9px] px-2.5 py-1 rounded inline-block leading-none uppercase tracking-wider font-bold shadow-md">
            {service.badge}
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-300 font-bold block">
              DOKUMENTASI PEKERJAAN
            </span>
            <span className="text-white text-xs font-semibold block mt-0.5 drop-shadow-sm">
              Proyek Riil Lapangan NKM
            </span>
          </div>
        </div>
      );
    }

    if (service.imageType === 'blueprint-interior') {
      return (
        <div className="h-52 relative overflow-hidden bg-[#0b1e36] border-b border-slate-100">
          {/* Engineering blueprint grid */}
          <div className="absolute inset-0 grid-overlay-dark opacity-15 pointer-events-none" />
          
          {/* CAD drawing lines */}
          <svg className="absolute inset-0 w-full h-full text-sky-500/35" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="0.4">
            <line x1="5" y1="5" x2="95" y2="5" strokeDasharray="1,2" />
            <line x1="5" y1="75" x2="95" y2="75" strokeDasharray="1,2" />
            <line x1="5" y1="5" x2="5" y2="75" strokeDasharray="1,2" />
            <line x1="95" y1="5" x2="95" y2="75" strokeDasharray="1,2" />
            
            <rect x="15" y="15" width="70" height="50" strokeWidth="0.8" className="text-sky-400" />
            <line x1="45" y1="15" x2="45" y2="65" strokeWidth="0.6" strokeDasharray="2,2" />
            <path d="M 15 50 A 15 15 0 0 1 30 65" className="text-orange-500" strokeWidth="0.5" />
            <line x1="15" y1="50" x2="15" y2="65" strokeWidth="0.5" />
            <line x1="15" y1="65" x2="30" y2="65" strokeWidth="0.5" />
            
            <rect x="55" y="20" width="20" height="12" />
            <circle cx="65" cy="26" r="3" />
            <rect x="55" y="45" width="20" height="12" />
            <circle cx="65" cy="51" r="3" />
            
            <text x="18" y="25" fill="#f97316" fontSize="3" fontWeight="bold" className="font-mono">RUANG RAPAT</text>
            <text x="49" y="42" fill="#0ea5e9" fontSize="2.5" className="font-mono">AREA STAFF</text>
            
            <line x1="15" y1="70" x2="85" y2="70" strokeWidth="0.3" />
            <polygon points="15,70 18,69 18,71" fill="currentColor" />
            <polygon points="85,70 82,69 82,71" fill="currentColor" />
            <text x="46" y="69" fill="currentColor" fontSize="2.5" className="font-mono">8.50 m</text>
          </svg>
          
          <div className="absolute top-4 left-4 bg-brand-orange-500 text-white font-mono text-[9px] px-2.5 py-1 rounded inline-block leading-none uppercase tracking-wider font-bold shadow-md">
            {service.badge}
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-sm p-2 rounded border border-white/5 space-y-0.5">
            <span className="text-white text-xs font-display font-bold block leading-none">
              LAYOUT INTERIOR RUKO
            </span>
            <span className="text-slate-400 text-[8px] font-mono block">
              CAD SKALA 1:50 - DIMENSI PRESISI
            </span>
          </div>
        </div>
      );
    }

    if (service.imageType === 'blueprint-mep') {
      return (
        <div className="h-52 relative overflow-hidden bg-[#081a30] border-b border-slate-100">
          {/* Engineering blueprint grid */}
          <div className="absolute inset-0 grid-overlay-dark opacity-15 pointer-events-none" />
          
          {/* CAD drawing lines */}
          <svg className="absolute inset-0 w-full h-full text-emerald-500/35" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="0.4">
            <line x1="5" y1="5" x2="95" y2="5" strokeDasharray="1,2" />
            <line x1="5" y1="75" x2="95" y2="75" strokeDasharray="1,2" />
            
            <rect x="20" y="15" width="25" height="40" strokeWidth="0.8" className="text-emerald-400" />
            <line x1="20" y1="25" x2="45" y2="25" />
            <line x1="20" y1="35" x2="45" y2="35" />
            <line x1="20" y1="45" x2="45" y2="45" />
            
            <rect x="25" y="18" width="5" height="4" fill="currentColor" className="text-brand-orange-500/40" />
            <rect x="35" y="18" width="5" height="4" fill="currentColor" className="text-emerald-500/40" />
            <rect x="25" y="28" width="5" height="4" fill="currentColor" className="text-emerald-500/40" />
            <rect x="35" y="28" width="5" height="4" fill="currentColor" className="text-emerald-500/40" />
            
            <circle cx="70" cy="35" r="10" className="text-sky-400" strokeWidth="0.6" />
            <path d="M 55 35 L 85 35" strokeWidth="0.8" className="text-sky-400" />
            <path d="M 70 20 L 70 50" strokeWidth="0.8" className="text-sky-400" />
            <polygon points="73,28 70,24 67,28" fill="#38bdf8" />
            
            <path d="M 55 52 Q 60 48, 65 52 T 75 52" strokeWidth="0.4" className="text-sky-400/40" />
            
            <text x="21" y="52" fill="#34d399" fontSize="2.5" className="font-mono">MAIN MDP PANEL</text>
            <text x="63" y="16" fill="#38bdf8" fontSize="2.5" className="font-mono">POMPA BOOSTER</text>
            
            <path d="M 45 30 Q 55 10, 70 20" strokeWidth="0.4" strokeDasharray="1,1" className="text-amber-400" />
          </svg>
          
          <div className="absolute top-4 left-4 bg-brand-orange-500 text-white font-mono text-[9px] px-2.5 py-1 rounded inline-block leading-none uppercase tracking-wider font-bold shadow-md">
            {service.badge}
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-sm p-2 rounded border border-white/5 space-y-0.5">
            <span className="text-white text-xs font-display font-bold block leading-none">
              INSTALASI UTILITAS MEP
            </span>
            <span className="text-slate-400 text-[8px] font-mono block">
              SISTEM PLUMBING & POWER PANEL
            </span>
          </div>
        </div>
      );
    }

    if (service.imageType === 'blueprint-cctv') {
      return (
        <div className="h-52 relative overflow-hidden bg-[#09152a] border-b border-slate-100">
          {/* Engineering blueprint grid */}
          <div className="absolute inset-0 grid-overlay-dark opacity-15 pointer-events-none" />
          
          {/* CAD drawing lines */}
          <svg className="absolute inset-0 w-full h-full text-orange-500/35" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="0.4">
            <line x1="5" y1="5" x2="95" y2="5" strokeDasharray="1,2" />
            <line x1="5" y1="75" x2="95" y2="75" strokeDasharray="1,2" />
            
            <circle cx="20" cy="20" r="4" fill="currentColor" className="text-brand-orange-500/25" strokeWidth="0.8" />
            <path d="M 20 20 L 45 35 A 30 30 0 0 1 30 48 Z" fill="rgba(249, 115, 22, 0.08)" stroke="#f97316" strokeWidth="0.5" />
            
            <rect x="55" y="15" width="30" height="20" strokeWidth="0.8" className="text-sky-400" />
            <line x1="55" y1="25" x2="85" y2="25" strokeWidth="0.4" />
            <line x1="70" y1="15" x2="70" y2="35" strokeWidth="0.4" />
            
            <circle cx="62" cy="20" r="1.5" fill="#f97316" />
            <circle cx="77" cy="20" r="1.5" fill="#10b981" />
            <circle cx="62" cy="30" r="1.5" fill="#10b981" />
            <circle cx="77" cy="30" r="1.5" fill="#f97316" />
            
            <path d="M 28 20 A 8 8 0 0 1 34 26" strokeWidth="0.6" className="text-orange-400" />
            <path d="M 32 17 A 12 12 0 0 1 40 25" strokeWidth="0.6" className="text-orange-400" />
            
            <text x="14" y="55" fill="#f97316" fontSize="2.5" className="font-mono font-bold">SUDUT DETEKSI 90°</text>
            <text x="56" y="42" fill="#38bdf8" fontSize="2.5" className="font-mono">MULTIVIEW MONITOR</text>
            
            <circle cx="20" cy="20" r="1" fill="#f97316" />
          </svg>
          
          <div className="absolute top-4 left-4 bg-brand-orange-500 text-white font-mono text-[9px] px-2.5 py-1 rounded inline-block leading-none uppercase tracking-wider font-bold shadow-md">
            {service.badge}
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-sm p-2 rounded border border-white/5 space-y-0.5">
            <span className="text-white text-xs font-display font-bold block leading-none">
              MONITORING KEAMANAN
            </span>
            <span className="text-slate-400 text-[8px] font-mono block">
              DETEKSI KAMERA IP & SENTRAL NVR
            </span>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <section id="services" className="bg-slate-50 py-20 md:py-28 relative">
      <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-brand-orange-500 uppercase tracking-widest font-mono">
            LAYANAN UTAMA KAMI
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-blue-900 tracking-tight">
            Layanan Satu Pintu Untuk Semua Kebutuhan Konstruksi Anda
          </h2>
          <div className="h-1.5 w-24 bg-brand-orange-500 mx-auto rounded-full" />
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Kami menghadirkan solusi menyeluruh untuk mendukung jalannya bisnis Anda secara penuh. Semua layanan di bawah ini tersedia lengkap tanpa hambatan, dikelola terpusat demi efisiensi tinggi.
          </p>
        </div>

        {/* 5-Card Dynamic Symmetric Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          
          {services.map((service, index) => {
            const Icon = service.icon;
            
            // Layout classes based on symmetry (First row of 3 cards take 2 cols, second row of 2 cards take 3 cols)
            const isFirstRow = index < 3;
            const colSpanClass = isFirstRow 
              ? 'lg:col-span-2 md:col-span-1 col-span-1' 
              : 'lg:col-span-3 md:col-span-1 col-span-1';

            return (
              <div
                key={service.id}
                className={`${colSpanClass} bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full`}
              >
                <div>
                  {/* Visually stunning header */}
                  {renderVisualHeader(service)}

                  {/* Card Content body */}
                  <div className="p-6 sm:p-7 space-y-5">
                    
                    {/* Header: Icon + Title */}
                    <div className="flex items-start space-x-3.5">
                      <div className="bg-brand-orange-500/10 text-brand-orange-500 p-2.5 rounded-xl flex-shrink-0 mt-0.5">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <h3 className="font-display font-extrabold text-brand-blue-900 text-base leading-tight">
                          {service.title}
                        </h3>
                        <span className="text-brand-orange-500 text-xs font-bold font-mono tracking-wider block uppercase">
                          {service.subtitle}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-light">
                      {service.shortDesc}
                    </p>

                    {/* Scope Checklist Items */}
                    <div className="pt-2.5 border-t border-slate-100 space-y-3">
                      <h4 className="text-[10px] font-mono font-bold text-slate-400 tracking-wider uppercase">
                        CAKUPAN PEKERJAAN LAPANGAN:
                      </h4>
                      <ul className="space-y-2">
                        {service.items.map((item, idx) => (
                          <li key={idx} className="flex items-start text-xs text-slate-600">
                            <span className="mr-2.5 bg-brand-orange-500/10 text-brand-orange-500 p-0.5 rounded-full mt-0.5 flex-shrink-0">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                            <span className="leading-tight">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>

                {/* Footer CTA Triggering Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleCtaClick(service.surveyValue)}
                    className="w-full bg-brand-blue-900 hover:bg-brand-blue-800 text-white font-bold py-3 px-5 rounded-xl text-xs transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <span>{service.ctaText}</span>
                    <span className="text-brand-orange-500 font-bold">→</span>
                  </button>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
