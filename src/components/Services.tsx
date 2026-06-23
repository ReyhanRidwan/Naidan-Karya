/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Home, RefreshCw, Layers, Cpu, Eye, Check } from 'lucide-react';
import { motion } from 'motion/react';
const heroBg = '/images/hero_ruko_indonesia_1782231371472.jpg';
const renovBg = '/images/renovasi_komersial_1782231391194.jpg';

interface ServiceData {
  id: string;
  surveyValue: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  icon: any;
  imageSrc: string;
  imageStyleClass: string;
  items: string[];
  ctaText: string;
  badge: string;
  overlayLabel: string;
  overlaySub: string;
  isCctv?: boolean;
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
      imageSrc: heroBg,
      imageStyleClass: 'brightness-[0.75] contrast-[1.0] saturate-[1.1]',
      items: [
        'Pembangunan ruko (rumah toko) 2-4 lantai',
        'Pembangunan kantor kecil hingga menengah',
        'Konstruksi gudang penyimpanan komersial',
        'Pembangunan klinik, resto, dan retail',
        'Pengerjaan struktur beton & pondasi bore pile',
      ],
      ctaText: 'Rencanakan Bangun Baru',
      badge: 'DOKUMENTASI AKTUAL NKM',
      overlayLabel: 'PEKERJAAN STRUKTUR UTAMA',
      overlaySub: 'Konstruksi Sipil & Pondasi Bore Pile',
    },
    {
      id: 'renovasi',
      surveyValue: 'Renovasi Ruko',
      title: 'Renovasi & Retrofitting',
      subtitle: 'Peremajaan & Penguatan Gedung',
      shortDesc: 'Kembalikan fungsi prima dan keindahan bangunan Anda dengan renovasi struktural maupun arsitektural.',
      icon: RefreshCw,
      imageSrc: renovBg,
      imageStyleClass: 'brightness-[0.7] contrast-[1.05] saturate-[1.1]',
      items: [
        'Renovasi ruko fungsional untuk toko & kantor',
        'Renovasi interior & eksterior kantor (re-layout)',
        'Perbaikan atap bocor, dinding retak, & sasis',
        'Peningkatan kekuatan struktur (retrofitting)',
        'Pekerjaan pengecatan eksterior tahan cuaca',
      ],
      ctaText: 'Rencanakan Renovasi',
      badge: 'DOKUMENTASI AKTUAL NKM',
      overlayLabel: 'RESTRUKTURISASI BANGUNAN',
      overlaySub: 'Peremajaan Fasad & Penguatan Dinding',
    },
    {
      id: 'interior',
      surveyValue: 'Interior',
      title: 'Desain & Konstruksi Interior',
      subtitle: 'Fungsional, Ergonomis & Estetis',
      shortDesc: 'Maksimalkan produktivitas kerja dan kenyamanan pelanggan dengan interior yang ergonomis.',
      icon: Layers,
      imageSrc: renovBg,
      imageStyleClass: 'brightness-[0.75] contrast-[1.1] sepia-[10%] saturate-[1.15] scale-[1.15] origin-bottom',
      items: [
        'Interior kantor, kubikal staf, & ruang direksi',
        'Interior ruang usaha, showroom, dan butik ruko',
        'Instalasi custom furniture & backdrop fungsional',
        'Pekerjaan partisi gypsum & kaca tempered',
        'Desain plafon drop ceiling & lighting hangat',
      ],
      ctaText: 'Rencanakan Interior',
      badge: 'REALSITE FINISHING',
      overlayLabel: 'PROSES FINISHING INTERIOR',
      overlaySub: 'Instalasi Partisi, Plafon, & Wood Panel',
    },
    {
      id: 'mep',
      surveyValue: 'MEP',
      title: 'Mekanikal Elektrikal Plumbing',
      subtitle: 'Instalasi Utilitas Gedung Vital',
      shortDesc: 'Instalasi utilitas vital bangunan yang aman, tertata rapi, dan sesuai dengan standar keselamatan.',
      icon: Cpu,
      imageSrc: heroBg,
      imageStyleClass: 'brightness-[0.6] contrast-[1.2] saturate-[0.8] hue-rotate-[185deg] scale-[1.2] origin-top',
      items: [
        'Instalasi panel listrik utama & distribusi ruko',
        'Instalasi AC Cassette, Split Duct & ventilasi',
        'Sistem pembuangan air kotor & air bersih',
        'Instalasi pompa booster, torn air & grounding',
        'Peremajaan kabel listrik lama rawan korsleting',
      ],
      ctaText: 'Rencanakan MEP',
      badge: 'TECHNICAL SERVICE INTEGRITY',
      overlayLabel: 'JARINGAN LISTRIK & SANITASI',
      overlaySub: 'Pemasangan Utilitas & Distribusi Daya',
    },
    {
      id: 'cctv',
      surveyValue: 'CCTV',
      title: 'CCTV & Sistem Keamanan',
      subtitle: 'Sistem Pengawasan & Akses Kontrol',
      shortDesc: 'Proteksi maksimal aset berharga Anda dengan integrasi sistem kamera pemantau & kontrol akses.',
      icon: Eye,
      imageSrc: renovBg,
      imageStyleClass: 'brightness-[0.55] contrast-[1.25] saturate-[1.2] hue-rotate-[320deg] scale-[1.25] origin-center',
      items: [
        'Pemasangan CCTV IP Camera resolusi tinggi',
        'Sistem monitoring online HP & integrasi NVR',
        'Kontrol akses pintu ruko (fingerprint & RFID)',
        'Pemasangan pipa conduit pelindung kabel baja',
        'Layanan maintenance berkala perangkat kamera',
      ],
      ctaText: 'Rencanakan Keamanan',
      badge: 'ACTIVE LIVE STREAMING',
      overlayLabel: 'SISTEM DETEKSI OPTIK',
      overlaySub: 'Integrasi Keamanan Pintar Ruko & Kantor',
      isCctv: true,
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
    return (
      <div className="h-52 relative overflow-hidden bg-brand-blue-950 border-b border-slate-100">
        <img 
          src={service.imageSrc} 
          alt={service.title} 
          className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${service.imageStyleClass}`}
          referrerPolicy="no-referrer"
        />
        
        {/* Realistic HUD overlays based on type */}
        {service.isCctv && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.5))] pointer-events-none">
            <div className="absolute top-4 right-4 flex items-center space-x-1.5 bg-red-600/90 text-white font-mono text-[8px] font-bold px-2 py-0.5 rounded animate-pulse shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white block" />
              <span>REC LIVE</span>
            </div>
            <div className="absolute inset-0 border-[0.5px] border-white/10 pointer-events-none m-3 rounded flex flex-col justify-between p-2">
              <div className="flex justify-between text-white/40 font-mono text-[6px]">
                <span>[ CH 05 ]</span>
                <span>CAM_INTR_01</span>
              </div>
              <div className="flex justify-between text-white/40 font-mono text-[6px]">
                <span>1080P 30FPS</span>
                <span>NKM SEC</span>
              </div>
            </div>
          </div>
        )}

        {service.id === 'mep' && (
          <div className="absolute inset-0 bg-sky-500/10 mix-blend-color pointer-events-none">
            <div className="absolute inset-0 grid-overlay-dark opacity-20" />
            <div className="absolute inset-0 border-[0.5px] border-sky-400/20 pointer-events-none m-4 flex flex-col justify-between p-2">
              <div className="flex justify-between text-sky-400/60 font-mono text-[7px]">
                <span>VOLTAGE: OK</span>
                <span>GRID: CONNECTED</span>
              </div>
              <div className="flex justify-between text-sky-400/60 font-mono text-[7px]">
                <span>AMP FEED: BALANCED</span>
                <span>NKM UTILITIES</span>
              </div>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-950/80 via-black/20 to-transparent" />
        
        <div className="absolute top-4 left-4 bg-brand-orange-500 text-white font-mono text-[9px] px-2.5 py-1 rounded inline-block leading-none uppercase tracking-wider font-bold shadow-md z-10">
          {service.badge}
        </div>
        
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <span className="text-[9px] uppercase font-mono tracking-widest text-slate-300 font-bold block">
            {service.overlayLabel}
          </span>
          <span className="text-white text-xs font-display font-extrabold block mt-0.5 drop-shadow-sm">
            {service.overlaySub}
          </span>
        </div>
      </div>
    );
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
