/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Phone, MapPin, Clock, HelpCircle, ChevronDown, MessageSquare, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function ContactFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'Apakah survey lokasi benar-benar gratis?',
      answer: 'Ya, survey lokasi di seluruh area Jakarta Utara, Jakarta Pusat, dan Jabodetabek 100% gratis tanpa biaya komitmen apa pun. Tim ahli kami akan datang langsung mengukur ruang dan berdiskusi secara riil mengenai kebutuhan Anda.',
    },
    {
      question: 'Berapa lama proses penyusunan Rencana Anggaran Biaya (RAB)?',
      answer: 'Tergantung kompleksitas dan skala proyek. Untuk ruko standar, ruko renovasi, atau interior kantor skala kecil-menengah, draft RAB transparan dan detail biasanya kami rampungkan dalam kurun waktu 2-4 hari kerja setelah pelaksanaan survey lokasi.',
    },
    {
      question: 'Bagaimana jika ada biaya tak terduga di tengah jalannya proyek?',
      answer: 'Kami menggaransi harga yang disepakati dalam Surat Perjanjian Kerja (SPK) bersifat mengikat. Naidan Karya Makmur TIDAK AKAN memunculkan tagihan biaya tambahan siluman, kecuali ada permintaan tertulis dari Anda untuk merubah kualitas material atau menambah item pekerjaan di lapangan.',
    },
    {
      question: 'Bagaimana cara memantau progres harian proyek saya?',
      answer: 'Kami membuat grup koordinasi WhatsApp khusus proyek Anda yang beranggotakan Anda, mandor lapangan, dan konsultan teknik kami. Setiap sore, pengawas proyek kami akan mengirimkan laporan foto aktual harian beserta catatan progres pengerjaan lapangan.',
    },
    {
      question: 'Apakah pekerjaan konstruksi ini dilindungi garansi?',
      answer: 'Tentu saja. Setelah pekerjaan 100% selesai dan serah terima kunci dilakukan, proyek Anda dilindungi oleh Masa Pemeliharaan (Garansi Retensi) selama 30 hingga 90 hari untuk menjamin keandalan struktur, kerapian finishing, waterproofing atap, serta instalasi utilitas listrik plumbing (MEP).',
    },
  ];

  const handleScrollToSurvey = () => {
    const element = document.getElementById('project-survey');
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
    <section id="contact" className="bg-slate-50 py-20 md:py-28 relative scroll-mt-20">
      <div className="absolute inset-0 grid-overlay opacity-25 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: FAQ Accordions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold text-brand-orange-500 uppercase tracking-widest font-mono">
                INFORMASI & FAQ
              </span>
              <h2 className="text-3xl font-display font-extrabold text-brand-blue-900 tracking-tight leading-tight">
                Pertanyaan yang Sering Diajukan Calon Klien kami
              </h2>
              <div className="h-1.5 w-16 bg-brand-orange-500 rounded-full" />
            </div>

            <div className="space-y-3.5 pt-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div 
                    key={idx}
                    className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-5 flex items-center justify-between font-display font-extrabold text-sm sm:text-base text-slate-900 hover:text-brand-orange-500 transition-colors cursor-pointer"
                    >
                      <span className="pr-4">{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${
                        isOpen ? 'transform rotate-180 text-brand-orange-500' : ''
                      }`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t border-slate-100"
                        >
                          <p className="p-5 text-slate-600 text-xs sm:text-sm leading-relaxed font-light">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Physical Contact & Operating Hours Card */}
          <div className="lg:col-span-5 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-md space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange-500/10 rounded-full blur-2xl" />
            
            <div className="space-y-3">
              <h3 className="font-display font-extrabold text-xl text-brand-blue-900">
                Informasi Kontak & Survey
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Butuh bantuan koordinasi atau konsultasi cepat? Silakan hubungi kami atau langsung jadwalkan survey lokasi proyek gratis Anda melalui form di bawah.
              </p>
            </div>

            {/* Structured Contact Block */}
            <div className="space-y-4">
              
              <div className="flex items-start space-x-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="bg-brand-orange-500/15 text-brand-orange-500 p-2 rounded-lg flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs text-slate-400 block font-medium">Kantor Kami</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    Papanggo, Tanjung Priok, Jakarta Utara, DKI Jakarta
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="bg-brand-orange-500/15 text-brand-orange-500 p-2 rounded-lg flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs text-slate-400 block font-medium">Nomor Layanan WhatsApp</span>
                  <a href="tel:+6285280135252" className="text-xs sm:text-sm font-bold text-slate-800 hover:text-brand-orange-500 transition-colors font-mono">
                    +62 852-8013-5252
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="bg-brand-orange-500/15 text-brand-orange-500 p-2 rounded-lg flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-slate-400 block font-medium">Jam Kerja Operasional</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                    Senin – Jumat: 08.00 – 17.00 WIB
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                    Sabtu: 08.00 – 14.00 WIB
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium block">
                    *Hari Minggu & Libur Nasional: Tutup (Kecuali Janji Khusus)
                  </span>
                </div>
              </div>

            </div>

            {/* Prompt CTA to Survey Form */}
            <div className="pt-4 border-t border-slate-100 text-center">
              <button
                onClick={handleScrollToSurvey}
                className="w-full bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-brand-orange-500/25 hover:-translate-y-0.5 transition-all text-xs sm:text-sm cursor-pointer flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Isi Survey Untuk Jadwalkan Lokasi</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
