/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, ArrowRight, ArrowLeft, CheckCircle2, Send, 
  MapPin, Coins, Calendar, User, Phone, Check, HelpCircle 
} from 'lucide-react';
import { SurveyState } from '../types';

interface ProjectSurveyProps {
  prefilledData: {
    jenisProyek: string;
    luasBangunan: string;
    lokasiProyek: string;
  } | null;
  onClearPrefilled?: () => void;
}

const INITIAL_STATE: SurveyState = {
  jenisProyek: '',
  luasBangunan: '',
  lokasiProyek: '',
  budget: '',
  targetMulai: '',
  nama: '',
  nomorWhatsapp: '',
};

export default function ProjectSurvey({ prefilledData, onClearPrefilled }: ProjectSurveyProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<SurveyState>(INITIAL_STATE);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>('');

  // Handle prefilled data from RAB Calculator
  useEffect(() => {
    if (prefilledData) {
      setFormData((prev) => ({
        ...prev,
        jenisProyek: prefilledData.jenisProyek,
        luasBangunan: prefilledData.luasBangunan,
        lokasiProyek: prefilledData.lokasiProyek,
      }));
      // Jump directly to Step 4 (Budget) as Steps 1, 2, and 3 are filled
      setCurrentStep(4);
      if (onClearPrefilled) onClearPrefilled();
    }
  }, [prefilledData]);

  const handleSelectOption = (field: keyof SurveyState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors('');
  };

  const handleInputChange = (field: keyof SurveyState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors('');
  };

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.jenisProyek) {
          setErrors('Silakan pilih salah satu jenis proyek.');
          return false;
        }
        return true;
      case 2:
        if (!formData.luasBangunan || Number(formData.luasBangunan) <= 0) {
          setErrors('Silakan isi luas bangunan yang valid.');
          return false;
        }
        return true;
      case 3:
        if (!formData.lokasiProyek.trim()) {
          setErrors('Silakan isi lokasi rencana pembangunan / renovasi.');
          return false;
        }
        return true;
      case 4:
        if (!formData.budget) {
          setErrors('Silakan pilih rentang anggaran proyek Anda.');
          return false;
        }
        return true;
      case 5:
        if (!formData.targetMulai) {
          setErrors('Silakan pilih target waktu mulai pengerjaan.');
          return false;
        }
        return true;
      case 6:
        if (!formData.nama.trim()) {
          setErrors('Silakan masukkan nama lengkap Anda.');
          return false;
        }
        return true;
      case 7:
        // Basic phone validation (Indonesian number starts with 08 or +62 or 62)
        const cleanPhone = formData.nomorWhatsapp.replace(/[^0-9]/g, '');
        if (!formData.nomorWhatsapp.trim() || cleanPhone.length < 9) {
          setErrors('Silakan masukkan nomor WhatsApp aktif yang valid.');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      setErrors('');
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setErrors('');
    setCurrentStep((prev) => prev - 1);
  };

  const handleFinalSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      setIsSubmitted(true);
      // Scroll to top of survey container
      const container = document.getElementById('project-survey');
      if (container) {
        container.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_STATE);
    setCurrentStep(1);
    setIsSubmitted(false);
  };

  const buildWhatsAppUrl = () => {
    const message = `Halo Naidan Karya Makmur,\n\nSaya telah mengisi survey proyek.\n\nNama:\n${formData.nama}\n\nJenis Proyek:\n${formData.jenisProyek}\n\nLokasi:\n${formData.lokasiProyek}\n\nLuas:\n${formData.luasBangunan} m²\n\nBudget:\n${formData.budget}\n\nTarget Mulai:\n${formData.targetMulai}\n\nMohon konsultasi lebih lanjut.`;
    return `https://wa.me/6285280135252?text=${encodeURIComponent(message)}`;
  };

  // Steps Information
  const totalSteps = 7;
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  const jenisProyekOptions = [
    { label: 'Bangun Ruko', value: 'Bangun Ruko', desc: 'Ruko niaga 2-4 lantai baru' },
    { label: 'Bangun Gudang', value: 'Bangun Gudang', desc: 'Gudang baja / komersial kecil' },
    { label: 'Bangun Kantor', value: 'Bangun Kantor', desc: 'Kantor ruko atau rukan baru' },
    { label: 'Renovasi Ruko', value: 'Renovasi Ruko', desc: 'Perbaikan fasad, atap, tata lantai ruko' },
    { label: 'Renovasi Kantor', value: 'Renovasi Kantor', desc: 'Tata ulang layout, cat ulang, sekat kaca' },
    { label: 'Desain & Konstruksi Interior', value: 'Interior', desc: 'Interior ruko, toko, kantor fungsional' },
    { label: 'Instalasi CCTV', value: 'CCTV', desc: 'Sistem pengawasan kamera IP & monitor HP' },
    { label: 'Pekerjaan MEP', value: 'MEP', desc: 'Instalasi panel listrik, AC & plumbing pipa' },
    { label: 'Pekerjaan Lainnya', value: 'Lainnya', desc: 'Struktur baja ringan, waterproofing dak' },
  ];

  const budgetOptions = [
    { label: 'Di bawah Rp 100 Juta', value: '<100 juta' },
    { label: 'Rp 100 - 300 Juta', value: '100-300 juta' },
    { label: 'Rp 300 - 500 Juta', value: '300-500 juta' },
    { label: 'Rp 500 Juta - Rp 1 Miliar', value: '500 juta - 1 M' },
    { label: 'Di atas Rp 1 Miliar', value: '> 1 M' },
  ];

  const targetOptions = [
    { label: 'Secepatnya (Minggu ini)', value: 'Secepatnya' },
    { label: 'Dalam 1 Bulan ke depan', value: '1 Bulan' },
    { label: 'Dalam 3 Bulan ke depan', value: '3 Bulan' },
    { label: 'Dalam 6 Bulan ke depan', value: '6 Bulan' },
  ];

  return (
    <section id="project-survey" className="bg-white py-20 md:py-28 relative scroll-mt-20">
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold text-brand-orange-500 uppercase tracking-widest font-mono">
            KUALIFIKASI KLIEN & KONSULTASI
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-blue-900 tracking-tight">
            Formulir Survey & Rencana Proyek
          </h2>
          <div className="h-1.5 w-24 bg-brand-orange-500 mx-auto rounded-full" />
          <p className="text-slate-600 text-sm">
            Mohon isi survei teknis singkat ini terlebih dahulu. Sistem kami menyaring detail data proyek Anda sebelum mengarahkan ke nomor WhatsApp Konsultan Teknik untuk penjadwalan survey lokasi.
          </p>
        </div>

        {/* Multi-step Interactive Container */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <div key="survey-wizard">
                
                {/* Progress bar and text */}
                <div className="mb-8 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold font-mono text-slate-500">
                    <span className="text-brand-orange-500 uppercase">STEP {currentStep} OF {totalSteps}</span>
                    <span>{progressPercent}% LENGKAP</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-orange-500 transition-all duration-300 rounded-full" 
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Form fields depending on Step */}
                <form onSubmit={handleFinalSubmit} className="min-h-[280px] flex flex-col justify-between">
                  
                  {/* STEP 1: Jenis Proyek */}
                  {currentStep === 1 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg sm:text-xl font-display font-extrabold text-brand-blue-900 flex items-center space-x-2">
                        <Building2 className="w-5 h-5 text-brand-orange-500" />
                        <span>Apa Jenis Pekerjaan Proyek Anda?</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500">Pilih lingkup pengerjaan konstruksi atau renovasi tempat usaha Anda.</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                        {jenisProyekOptions.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleSelectOption('jenisProyek', opt.value)}
                            className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                              formData.jenisProyek === opt.value
                                ? 'border-brand-orange-500 bg-brand-orange-500/10 text-brand-blue-900 font-semibold shadow-sm'
                                : 'border-slate-200 bg-white hover:bg-slate-100/50 text-slate-600'
                            }`}
                          >
                            <span className="block text-sm font-bold font-display">{opt.label}</span>
                            <span className="block text-[10px] text-slate-400 font-light leading-snug mt-1">{opt.desc}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Luas Bangunan */}
                  {currentStep === 2 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg sm:text-xl font-display font-extrabold text-brand-blue-900 flex items-center space-x-2">
                        <Building2 className="w-5 h-5 text-brand-orange-500" />
                        <span>Berapa Luas Bangunan Proyek Anda?</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500">Taksiran total luas bangunan dalam meter persegi (m²). Untuk renovasi, masukkan perkiraan luas area pekerjaan.</p>
                      
                      <div className="pt-4 max-w-sm">
                        <div className="relative">
                          <input
                            type="number"
                            min="1"
                            max="9999"
                            placeholder="Contoh: 150"
                            value={formData.luasBangunan}
                            onChange={(e) => handleInputChange('luasBangunan', e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-xl p-4 pr-16 text-lg font-mono font-bold focus:outline-none focus:ring-2 focus:ring-brand-orange-500/20 focus:border-brand-orange-500"
                            autoFocus
                          />
                          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm font-bold text-slate-400 font-mono">
                            m²
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Lokasi Proyek */}
                  {currentStep === 3 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg sm:text-xl font-display font-extrabold text-brand-blue-900 flex items-center space-x-2">
                        <MapPin className="w-5 h-5 text-brand-orange-500" />
                        <span>Di Mana Lokasi Spesifik Proyek Anda?</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500">Sebutkan nama jalan, kompleks ruko, atau kecamatan lokasi pengerjaan (Utamakan Jabodetabek).</p>
                      
                      <div className="pt-4">
                        <input
                          type="text"
                          placeholder="Contoh: Jl. Papanggo Raya No. 12, Tanjung Priok, Jakarta Utara"
                          value={formData.lokasiProyek}
                          onChange={(e) => handleInputChange('lokasiProyek', e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-xl p-4 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-brand-orange-500/20 focus:border-brand-orange-500"
                          autoFocus
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: Budget */}
                  {currentStep === 4 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg sm:text-xl font-display font-extrabold text-brand-blue-900 flex items-center space-x-2">
                        <Coins className="w-5 h-5 text-brand-orange-500" />
                        <span>Berapa Alokasi Anggaran (Budget) Proyek Anda?</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500">Ini membantu kami merancang spesifikasi material SNI terbaik yang tidak melampaui kemampuan dana Anda.</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {budgetOptions.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleSelectOption('budget', opt.label)}
                            className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                              formData.budget === opt.label
                                ? 'border-brand-orange-500 bg-brand-orange-500/10 text-brand-blue-900 font-bold shadow-sm animate-none'
                                : 'border-slate-200 bg-white hover:bg-slate-100/50 text-slate-600'
                            }`}
                          >
                            <span className="block text-sm">{opt.label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 5: Target Mulai */}
                  {currentStep === 5 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg sm:text-xl font-display font-extrabold text-brand-blue-900 flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-brand-orange-500" />
                        <span>Kapan Rencana Proyek ini Mulai Dikerjakan?</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500">Tentukan kesiapan waktu pengerjaan untuk antrean pengawasan tim mandor Naidan Karya Makmur.</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {targetOptions.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleSelectOption('targetMulai', opt.label)}
                            className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                              formData.targetMulai === opt.label
                                ? 'border-brand-orange-500 bg-brand-orange-500/10 text-brand-blue-900 font-bold shadow-sm'
                                : 'border-slate-200 bg-white hover:bg-slate-100/50 text-slate-600'
                            }`}
                          >
                            <span className="block text-sm">{opt.label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 6: Nama */}
                  {currentStep === 6 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg sm:text-xl font-display font-extrabold text-brand-blue-900 flex items-center space-x-2">
                        <User className="w-5 h-5 text-brand-orange-500" />
                        <span>Siapa Nama Lengkap Anda?</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500">Tulis nama lengkap Anda untuk dicantumkan pada lampiran berkas penawaran dan penjadwalan survey.</p>
                      
                      <div className="pt-4">
                        <input
                          type="text"
                          placeholder="Masukkan nama lengkap Anda"
                          value={formData.nama}
                          onChange={(e) => handleInputChange('nama', e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-xl p-4 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-brand-orange-500/20 focus:border-brand-orange-500"
                          autoFocus
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 7: Nomor WhatsApp */}
                  {currentStep === 7 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg sm:text-xl font-display font-extrabold text-brand-blue-900 flex items-center space-x-2">
                        <Phone className="w-5 h-5 text-brand-orange-500" />
                        <span>Berapa Nomor WhatsApp Aktif Anda?</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500">Nomor ini akan dihubungi oleh tim teknik kami untuk konfirmasi tanggal survey lokasi dan pengiriman draft RAB awal.</p>
                      
                      <div className="pt-4 max-w-sm">
                        <input
                          type="tel"
                          placeholder="Contoh: 081234567890"
                          value={formData.nomorWhatsapp}
                          onChange={(e) => handleInputChange('nomorWhatsapp', e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-xl p-4 text-base font-mono font-bold focus:outline-none focus:ring-2 focus:ring-brand-orange-500/20 focus:border-brand-orange-500"
                          autoFocus
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Error Message rendering */}
                  {errors && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs font-semibold mt-4 bg-red-50 border border-red-100 p-3 rounded-lg flex items-center"
                    >
                      <span className="mr-2">⚠️</span>
                      {errors}
                    </motion.div>
                  )}

                  {/* Wizard Bottom Actions Buttons */}
                  <div className="flex justify-between items-center pt-8 mt-8 border-t border-slate-200/60">
                    <div>
                      {currentStep > 1 && (
                        <button
                          type="button"
                          onClick={handlePrev}
                          className="px-5 py-3 rounded-xl border border-slate-300 text-slate-600 bg-white hover:bg-slate-100 text-sm font-bold flex items-center space-x-2 transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Kembali</span>
                        </button>
                      )}
                    </div>

                    <div>
                      {currentStep < totalSteps ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="px-6 py-3 rounded-xl bg-brand-blue-900 hover:bg-brand-blue-800 text-white text-sm font-bold flex items-center space-x-2 shadow-md transition-colors cursor-pointer"
                        >
                          <span>Selanjutnya</span>
                          <ArrowRight className="w-4 h-4 text-brand-orange-500" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="px-6 py-3 rounded-xl bg-brand-orange-500 hover:bg-brand-orange-600 text-white text-sm font-bold flex items-center space-x-2 shadow-lg hover:shadow-brand-orange-500/20 transition-all cursor-pointer"
                        >
                          <span>Kalkulasi & Selesaikan Survey</span>
                          <Send className="w-4 h-4 text-white" />
                        </button>
                      )}
                    </div>
                  </div>

                </form>

              </div>
            ) : (
              // STEP AFTER SUBMISSION: DISPLAY SUMMARY AND WHATSAPP REDIRECT BUTTON
              <motion.div 
                key="survey-summary"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                
                {/* Success Banner */}
                <div className="bg-emerald-500 text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 border border-emerald-400/30">
                  <div className="bg-white/25 p-3 rounded-full text-white">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-display font-extrabold text-lg sm:text-xl">
                      Survei Proyek Berhasil Diselesaikan!
                    </h3>
                    <p className="text-emerald-100 text-xs sm:text-sm font-light leading-relaxed">
                      Data spesifikasi rencana pembangunan Anda telah divalidasi dan dikunci. Silakan klik tombol di bawah untuk melanjutkan konsultasi ke WhatsApp Konsultan Naidan Karya Makmur.
                    </p>
                  </div>
                </div>

                {/* Summary Table of User Survey Data */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <h4 className="font-display font-bold text-slate-800 text-base pb-3 border-b border-slate-100 uppercase tracking-wider">
                    Ringkasan Spesifikasi Rencana Proyek Anda:
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 font-medium">Nama Lengkap:</span>
                      <span className="text-slate-800 font-bold">{formData.nama}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 font-medium">Jenis Pekerjaan:</span>
                      <span className="text-slate-800 font-bold text-brand-orange-500">{formData.jenisProyek}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 font-medium">Luas Bangunan:</span>
                      <span className="text-slate-800 font-bold font-mono">{formData.luasBangunan} m²</span>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 font-medium">Lokasi Proyek:</span>
                      <span className="text-slate-800 font-bold truncate max-w-[150px]">{formData.lokasiProyek}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 font-medium">Alokasi Budget:</span>
                      <span className="text-slate-800 font-bold">{formData.budget}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 font-medium">Target Mulai:</span>
                      <span className="text-slate-800 font-bold">{formData.targetMulai}</span>
                    </div>
                  </div>
                </div>

                {/* Final Actions Block */}
                <div className="flex flex-col sm:flex-row gap-4 items-center pt-4">
                  
                  {/* WhatsApp Action Button */}
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold py-4 px-6 rounded-xl shadow-lg hover:shadow-[#25D366]/25 hover:-translate-y-0.5 transition-all text-center flex items-center justify-center space-x-2 cursor-pointer text-base"
                  >
                    <Send className="w-5 h-5 text-white stroke-[2.5]" />
                    <span>Kirim Spesifikasi ke WhatsApp</span>
                  </a>

                  {/* Reset/New Survey Button */}
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-4 rounded-xl border border-slate-300 text-slate-600 bg-white hover:bg-slate-100 font-bold text-sm transition-colors cursor-pointer text-center"
                  >
                    Ulangi Survey Baru
                  </button>

                </div>

                {/* Secure Trust Badge */}
                <div className="text-[11px] text-slate-400 font-light flex items-center justify-center space-x-1">
                  <span>🔒 Data disalurkan dengan aman melalui enkripsi SSL resmi ke WhatsApp NKM.</span>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
