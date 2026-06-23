/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shield, CheckCircle, Award, CheckCircle2, ClipboardCheck } from 'lucide-react';

export default function AboutUs() {
  const points = [
    {
      title: 'Transparansi RAB Mutlak',
      description: 'Kami menyusun anggaran biaya (RAB) sangat detail per item pekerjaan tanpa menyembunyikan biaya tambahan di kemudian hari.',
      icon: ClipboardCheck,
    },
    {
      title: 'Pengawasan Proyek Konsisten',
      description: 'Setiap proyek dijaga langsung oleh Mandor & Site Supervisor berpengalaman demi memastikan kualitas presisi tinggi.',
      icon: Shield,
    },
    {
      title: 'Layanan Satu Pintu (One-Stop Service)',
      description: 'Mulai dari gambar desain awal, perijinan sipil, struktur bangunan, interior, MEP, hingga CCTV kami koordinasikan penuh.',
      icon: Award,
    },
  ];

  return (
    <section id="about" className="bg-white py-20 md:py-28 relative overflow-hidden border-b border-slate-100">
      <div className="absolute inset-0 grid-overlay opacity-25 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Grid: Company Mission and Background */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-brand-orange-500 uppercase tracking-widest font-mono">
              TENTANG KAMI
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-blue-900 tracking-tight leading-tight">
              Naidan Karya Makmur: <span className="text-brand-orange-500">Kredibilitas Kokoh</span> Sejak Lebih dari Satu Dekade
            </h2>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
              Naidan Karya Makmur adalah kontraktor terpercaya yang berbasis di Jakarta Utara dengan pengalaman lebih dari 10 tahun dalam menangani proyek konstruksi, renovasi, interior, MEP, dan sistem keamanan bangunan.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
              Dengan lebih dari <strong>150 proyek</strong> yang telah diselesaikan dan tingkat kepuasan pelanggan mencapai <strong>98%</strong>, kami berkomitmen menghadirkan hasil pekerjaan yang berkualitas, tepat waktu, dan transparan.
            </p>

            <div className="bg-brand-blue-900/5 border border-brand-blue-900/10 p-5 rounded-2xl space-y-2">
              <span className="text-[10px] font-mono tracking-wider text-brand-orange-500 font-bold uppercase block">
                TAGLINE PERUSAHAAN
              </span>
              <p className="text-brand-blue-900 font-display font-extrabold text-base sm:text-lg italic">
                "Solusi Konstruksi, Renovasi, dan Interior dengan RAB Transparan"
              </p>
            </div>

            {/* Quick checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-sm text-slate-700 font-medium">
              {[
                'Spesialis Ruko & Bangunan Usaha',
                'Konstruksi Struktur Baja Ringan & Berat',
                'Instalasi Kelistrikan & Utilitas MEP SNI',
                'Sistem Keamanan CCTV Monitoring HP',
                'Area Layanan Jakarta & Jabodetabek',
                'Garansi Retensi Pemeliharaan Proyek'
              ].map((text, idx) => (
                <div key={idx} className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange-500 flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Cards Grid: Why Choose Us Items */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 border border-slate-200/80 p-6 sm:p-8 rounded-2xl relative shadow-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange-500/10 rounded-full blur-2xl" />
              <h3 className="font-display font-extrabold text-lg sm:text-xl text-brand-blue-900 mb-6 pb-3 border-b border-slate-200">
                Mengapa Memilih Kami?
              </h3>

              <div className="space-y-6">
                {points.map((pt, idx) => {
                  const Icon = pt.icon;
                  return (
                    <div key={idx} className="flex items-start space-x-4">
                      <div className="bg-brand-orange-500/10 text-brand-orange-500 p-2.5 rounded-xl flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 leading-tight">
                          {pt.title}
                        </h4>
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-light">
                          {pt.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
