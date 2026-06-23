/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PhoneCall, FileSpreadsheet, FileSignature, HardHat, ClipboardCheck, Award } from 'lucide-react';

interface StepData {
  number: string;
  title: string;
  description: string;
  icon: any;
  highlight: string;
}

export default function HowWeWork() {
  const steps: StepData[] = [
    {
      number: '01',
      title: 'Konsultasi & Survey Gratis',
      description: 'Kami mengunjungi lokasi ruko, gudang, atau kantor Anda untuk pengukuran detail, memeriksa kondisi eksisting, dan memahami fungsionalitas ruang yang diinginkan.',
      icon: PhoneCall,
      highlight: 'Survey Gratis & Tanpa Komitmen',
    },
    {
      number: '02',
      title: 'Penyusunan RAB Transparan',
      description: 'Penyusunan Rencana Anggaran Biaya (RAB) terperinci per item pekerjaan, lengkap dengan spesifikasi material. Jaminan harga jujur tanpa biaya tersembunyi.',
      icon: FileSpreadsheet,
      highlight: 'RAB Transparan & Sesuai Budget',
    },
    {
      number: '03',
      title: 'Kontrak Kerja Resmi',
      description: 'Penandatanganan Surat Perjanjian Kerja (SPK) yang berkekuatan hukum, mengikat jadwal penyelesaian proyek, metode pembayaran termin, dan jaminan kualitas.',
      icon: FileSignature,
      highlight: 'Ikatan Hukum & Jadwal Jelas',
    },
    {
      number: '04',
      title: 'Pelaksanaan Proyek Profesional',
      description: 'Mobilisasi bahan bangunan pilihan dan tenaga tukang ahli yang berpengalaman. Pekerjaan dikerjakan secara sistematis sesuai standar K3.',
      icon: HardHat,
      highlight: 'Tukang Ahli & Disiplin K3',
    },
    {
      number: '05',
      title: 'Pengawasan Proyek Harian',
      description: 'Mandor / Site Supervisor kami mengawasi jalannya proyek setiap hari. Kami mengirimkan laporan progres mingguan lengkap dengan foto aktual lapangan.',
      icon: ClipboardCheck,
      highlight: 'Laporan Foto Rutin via WhatsApp',
    },
    {
      number: '06',
      title: 'Serah Terima & Garansi Retensi',
      description: 'Uji fungsi akhir (checklist) bersama Anda. Setelah semua sesuai standar, kunci diserahterimakan bersamaan dengan masa pemeliharaan bergaransi kami.',
      icon: Award,
      highlight: 'Garansi Mutu Konstruksi Retensi',
    },
  ];

  return (
    <section className="bg-brand-blue-900 text-white py-20 md:py-28 relative overflow-hidden">
      {/* Blueprint Grid Overlay Background */}
      <div className="absolute inset-0 grid-overlay-dark opacity-5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-orange-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-brand-orange-500 uppercase tracking-widest font-mono">
            ALUR KERJA PROFESIONAL
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
            Bagaimana Kami Menyelesaikan Proyek Anda Tepat Waktu?
          </h2>
          <div className="h-1.5 w-24 bg-brand-orange-500 mx-auto rounded-full" />
          <p className="text-slate-300 text-sm md:text-base">
            Komitmen kami adalah menghadirkan ketenangan bagi pemilik ruko, kantor, dan gudang melalui prosedur konstruksi yang sistematis, transparan, dan legal sejak hari pertama.
          </p>
        </div>

        {/* Steps Road Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.number}
                className="bg-brand-blue-800/40 border border-brand-blue-700/60 hover:border-brand-orange-500/50 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between"
              >
                {/* Step number absolute badge */}
                <span className="absolute top-4 right-6 text-4xl sm:text-5xl font-display font-black text-white/5 group-hover:text-brand-orange-500/10 transition-colors leading-none select-none">
                  {step.number}
                </span>

                <div className="space-y-4">
                  {/* Icon wrap */}
                  <div className="bg-brand-orange-500/15 text-brand-orange-500 w-12 h-12 rounded-xl flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display font-extrabold text-lg sm:text-xl text-white group-hover:text-brand-orange-500 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Micro badge indicator */}
                <div className="mt-6 pt-4 border-t border-brand-blue-700/60 flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest text-brand-orange-500 uppercase font-bold">
                    {step.highlight}
                  </span>
                  <div className="w-1.5 h-1.5 bg-brand-orange-500 rounded-full group-hover:scale-150 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
