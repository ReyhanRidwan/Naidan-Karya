/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Award, Briefcase, Smile, ClipboardCheck, ShieldAlert, FileText } from 'lucide-react';

export default function Stats() {
  const stats = [
    {
      id: 'stat-experience',
      value: '10+ Tahun',
      label: 'Pengalaman Lapangan',
      description: 'Menangani berbagai skala proyek konstruksi & renovasi ruko dan kantor.',
      icon: Award,
    },
    {
      id: 'stat-projects',
      value: '150+',
      label: 'Proyek Selesai',
      description: 'Dari pembangunan ruko baru hingga renovasi interior kantor kecil-menengah.',
      icon: Briefcase,
    },
    {
      id: 'stat-satisfaction',
      value: '98%',
      label: 'Tingkat Kepuasan',
      description: 'Klien puas dengan hasil pekerjaan yang presisi dan transparansi budget kami.',
      icon: Smile,
    },
  ];

  const badges = [
    {
      id: 'badge-survey',
      title: 'Gratis Survey Lokasi',
      description: 'Kami mengunjungi lokasi ruko, gudang, atau kantor Anda tanpa biaya sepeser pun.',
      icon: ClipboardCheck,
    },
    {
      id: 'badge-warranty',
      title: 'Garansi Pekerjaan',
      description: 'Jaminan kualitas dengan masa retensi/pemeliharaan setelah serah terima proyek.',
      icon: ShieldAlert,
    },
    {
      id: 'badge-progress',
      title: 'Laporan Progres Berkala',
      description: 'Laporan harian/mingguan lengkap dengan foto aktual untuk ketenangan Anda.',
      icon: FileText,
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24 relative overflow-hidden">
      {/* Light background texture */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.id}
                id={stat.id}
                className="bg-slate-50 border border-slate-200/60 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 relative group overflow-hidden"
              >
                {/* Visual accent bar */}
                <div className="absolute top-0 left-0 w-2 h-full bg-brand-orange-500 transition-transform duration-300 transform -translate-y-full group-hover:translate-y-0" />
                
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-brand-blue-900/10 p-3 rounded-xl text-brand-blue-900 group-hover:bg-brand-orange-500 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-extrabold text-brand-blue-900 font-display tracking-tight">
                    {stat.value}
                  </span>
                </div>
                
                <h3 className="font-display font-bold text-lg text-slate-900 mb-2">
                  {stat.label}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Separator Line */}
        <div className="border-t border-slate-100 my-12" />

        {/* Value Guarantees Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-bold text-brand-orange-500 uppercase tracking-widest font-mono">
              NK MAKMUR ADVANTAGES
            </span>
            <h2 className="text-3xl font-display font-extrabold text-brand-blue-900 tracking-tight leading-tight">
              Kredibilitas Kerja dengan Kepastian Hasil
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Sebagai kontraktor yang berakar kuat di Jakarta Utara, kami melayani ruko, rukan, gudang, dan kantor dengan komitmen keselamatan, kepatuhan mutu, dan kejujuran anggaran.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div 
                  key={badge.id}
                  id={badge.id}
                  className="bg-white border border-slate-200/50 p-6 rounded-xl hover:border-brand-orange-500/40 transition-colors duration-300"
                >
                  <div className="text-brand-orange-500 mb-4 bg-brand-orange-500/10 w-10 h-10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-base text-slate-900 mb-2">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
