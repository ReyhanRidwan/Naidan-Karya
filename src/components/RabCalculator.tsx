/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Calculator, ArrowRight, HelpCircle, Check, Info } from 'lucide-react';

interface RabCalculatorProps {
  onCalculateSubmit?: (data: {
    jenisProyek: string;
    luasBangunan: string;
    lokasiProyek: string;
  }) => void;
}

export default function RabCalculator({ onCalculateSubmit }: RabCalculatorProps) {
  const [jenisProyek, setJenisProyek] = useState<string>('bangun_ruko');
  const [luasBangunan, setLuasBangunan] = useState<number>(100);
  const [jumlahLantai, setJumlahLantai] = useState<number>(2);
  const [kualitasMaterial, setKualitasMaterial] = useState<'standar' | 'menengah' | 'premium'>('menengah');
  const [lokasiProyek, setLokasiProyek] = useState<string>('Jakarta Utara');

  const [estimasiMin, setEstimasiMin] = useState<number>(0);
  const [estimasiMax, setEstimasiMax] = useState<number>(0);
  const [durasiMin, setDurasiMin] = useState<number>(0);
  const [durasiMax, setDurasiMax] = useState<number>(0);

  // Core Jakarta Contractor Rates (IDR per m2)
  const rates: Record<string, { standar: [number, number]; menengah: [number, number]; premium: [number, number] }> = {
    bangun_ruko: {
      standar: [3300000, 3800000],
      menengah: [3800000, 5000000],
      premium: [5000000, 7000000],
    },
    bangun_gudang: {
      standar: [2500000, 3000000],
      menengah: [3000000, 4200000],
      premium: [4200000, 5500000],
    },
    bangun_kantor: {
      standar: [3500000, 4200000],
      menengah: [4200000, 5500000],
      premium: [5500000, 7500000],
    },
    renovasi_ruko: {
      standar: [1200000, 1600000],
      menengah: [1600000, 2500000],
      premium: [2500000, 4000000],
    },
    renovasi_kantor: {
      standar: [1300000, 1800000],
      menengah: [1800000, 2800000],
      premium: [2800000, 4500000],
    },
    interior: {
      standar: [1400000, 2000000],
      menengah: [2000000, 3200000],
      premium: [3200000, 5000000],
    },
    mep: {
      standar: [400000, 600000],
      menengah: [600000, 1000000],
      premium: [1000000, 1600000],
    },
    cctv: {
      standar: [150000, 250000],
      menengah: [250000, 450000],
      premium: [450000, 750000],
    },
  };

  useEffect(() => {
    const activeRates = rates[jenisProyek] || rates.bangun_ruko;
    const selectedRange = activeRates[kualitasMaterial];

    // Floor structural multipliers
    let floorMultiplier = 1.0;
    if (jenisProyek.startsWith('bangun_')) {
      if (jumlahLantai === 2) floorMultiplier = 1.05;
      else if (jumlahLantai === 3) floorMultiplier = 1.10;
      else if (jumlahLantai >= 4) floorMultiplier = 1.15;
    }

    // Calculations
    const totalArea = luasBangunan;
    const rawMin = selectedRange[0] * totalArea * floorMultiplier;
    const rawMax = selectedRange[1] * totalArea * floorMultiplier;

    setEstimasiMin(Math.round(rawMin));
    setEstimasiMax(Math.round(rawMax));

    // Durations calculation logic
    let durationBase = 30; // 30 days minimum
    let factor = 0.35; // days per m2
    if (jenisProyek.startsWith('renovasi_') || jenisProyek === 'interior') {
      durationBase = 14;
      factor = 0.18;
    } else if (jenisProyek === 'mep' || jenisProyek === 'cctv') {
      durationBase = 7;
      factor = 0.1;
    }

    const calculatedDays = durationBase + (luasBangunan * factor * (jumlahLantai * 0.5 + 0.5));
    setDurasiMin(Math.round(calculatedDays * 0.9));
    setDurasiMax(Math.round(calculatedDays * 1.15));

  }, [jenisProyek, luasBangunan, jumlahLantai, kualitasMaterial, lokasiProyek]);

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const handleNextToSurvey = () => {
    if (onCalculateSubmit) {
      // Map raw values to Indonesian labels for survey form prefilling
      const mapProyekLabel: Record<string, string> = {
        bangun_ruko: 'Bangun Ruko',
        bangun_gudang: 'Bangun Gudang',
        bangun_kantor: 'Bangun Kantor',
        renovasi_ruko: 'Renovasi Ruko',
        renovasi_kantor: 'Renovasi Kantor',
        interior: 'Interior',
        mep: 'MEP',
        cctv: 'CCTV',
      };

      onCalculateSubmit({
        jenisProyek: mapProyekLabel[jenisProyek] || 'Bangun Ruko',
        luasBangunan: String(luasBangunan),
        lokasiProyek: lokasiProyek,
      });

      // Scroll smoothly to Survey section
      const surveyElement = document.getElementById('project-survey');
      if (surveyElement) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = surveyElement.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <section id="rab-calculator" className="bg-slate-50 py-20 md:py-28 relative">
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-brand-orange-500 uppercase tracking-widest font-mono">
            KALKULATOR RAB INTERAKTIF
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-blue-900 tracking-tight">
            Hitung Estimasi Anggaran Pembangunan Secara Instan
          </h2>
          <div className="h-1.5 w-24 bg-brand-orange-500 mx-auto rounded-full" />
          <p className="text-slate-600 text-sm md:text-base">
            Dapatkan kisaran realistis biaya konstruksi atau renovasi tempat usaha Anda berdasarkan luas, jumlah lantai, kualitas material, dan lokasi di Jabodetabek.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Form Inputs */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="flex items-center space-x-2 pb-4 border-b border-slate-100">
                <Calculator className="text-brand-orange-500 w-5 h-5" />
                <h3 className="font-display font-extrabold text-lg text-slate-950">
                  Parameter Teknis Bangunan
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Jenis Proyek */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Jenis Pekerjaan Proyek
                  </label>
                  <select
                    value={jenisProyek}
                    onChange={(e) => setJenisProyek(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange-500/20 focus:border-brand-orange-500 font-semibold"
                  >
                    <option value="bangun_ruko">Bangun Ruko Baru</option>
                    <option value="bangun_gudang">Bangun Gudang Baru</option>
                    <option value="bangun_kantor">Bangun Kantor Baru</option>
                    <option value="renovasi_ruko">Renovasi Ruko</option>
                    <option value="renovasi_kantor">Renovasi Kantor</option>
                    <option value="interior">Desain & Pekerjaan Interior</option>
                    <option value="mep">Instalasi MEP</option>
                    <option value="cctv">Instalasi CCTV / Keamanan</option>
                  </select>
                </div>

                {/* Lokasi Proyek */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Lokasi Proyek Bangunan
                  </label>
                  <select
                    value={lokasiProyek}
                    onChange={(e) => setLokasiProyek(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange-500/20 focus:border-brand-orange-500 font-semibold"
                  >
                    <option value="Tanjung Priok">Tanjung Priok (Jakarta Utara)</option>
                    <option value="Penjaringan">Penjaringan (Jakarta Utara)</option>
                    <option value="Pademangan">Pademangan (Jakarta Utara)</option>
                    <option value="Koja">Koja (Jakarta Utara)</option>
                    <option value="Jakarta Pusat">DKI Jakarta Pusat</option>
                    <option value="Jakarta Utara">DKI Jakarta Utara (Umum)</option>
                    <option value="Jabodetabek">Jabodetabek Raya</option>
                  </select>
                </div>

                {/* Luas Bangunan */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex justify-between items-center">
                    <span>Luas Bangunan Total</span>
                    <span className="text-brand-orange-500 font-mono font-bold lowercase">{luasBangunan} m²</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="10"
                      max="5000"
                      value={luasBangunan || ''}
                      onChange={(e) => setLuasBangunan(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange-500/20 focus:border-brand-orange-500 font-mono font-bold"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs font-bold text-slate-400">
                      m²
                    </span>
                  </div>
                </div>

                {/* Jumlah Lantai */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Jumlah Lantai Bangunan
                  </label>
                  <select
                    value={jumlahLantai}
                    disabled={jenisProyek === 'mep' || jenisProyek === 'cctv' || jenisProyek === 'interior'}
                    onChange={(e) => setJumlahLantai(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange-500/20 focus:border-brand-orange-500 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="1">1 Lantai</option>
                    <option value="2">2 Lantai (Standar Ruko/Rukan)</option>
                    <option value="3">3 Lantai (Gedung Niaga)</option>
                    <option value="4">4 Lantai</option>
                  </select>
                </div>

              </div>

              {/* Kualitas Material Block */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Kualitas Spesifikasi Material & Finishing
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      value: 'standar',
                      title: 'Kelas Standar',
                      desc: 'Material SNI ekonomis, ubin keramik, cat standar ruko usaha.',
                    },
                    {
                      value: 'menengah',
                      title: 'Kelas Menengah',
                      desc: 'Bata hebel, ubin granit 60x60, cat Jotun, kusen aluminium tebal.',
                    },
                    {
                      value: 'premium',
                      title: 'Kelas Premium',
                      desc: 'Beton ready mix, ACP fasad, ubin granit mewah, sanitair Toto.',
                    },
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setKualitasMaterial(item.value as any)}
                      className={`text-left p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        kualitasMaterial === item.value
                          ? 'border-brand-orange-500 bg-brand-orange-500/5 text-slate-900 shadow-sm'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-display font-extrabold text-xs sm:text-sm">
                          {item.title}
                        </span>
                        {kualitasMaterial === item.value && (
                          <div className="w-4 h-4 rounded-full bg-brand-orange-500 text-white flex items-center justify-center p-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <p className="text-[10px] sm:text-xs leading-relaxed opacity-85">
                        {item.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-500 flex items-start space-x-2.5 mt-6 border border-slate-100">
              <Info className="w-4 h-4 text-brand-orange-500 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Biaya di atas dipengaruhi oleh kondisi lapangan, akses mobilisasi kendaraan proyek, jenis tanah untuk struktur pondasi, serta fluktuasi harga material konstruksi SNI di Jakarta Utara.
              </p>
            </div>
          </div>

          {/* Right Column: Calculations Outputs */}
          <div className="lg:col-span-5 bg-brand-blue-900 text-white p-6 sm:p-8 rounded-2xl flex flex-col justify-between border border-brand-blue-800 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 grid-overlay-dark opacity-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange-500/10 rounded-full blur-2xl" />

            <div className="space-y-8 relative z-10">
              <div className="flex items-center space-x-2 pb-4 border-b border-brand-blue-800">
                <div className="bg-brand-orange-500 text-white p-1 rounded">EST</div>
                <h3 className="font-display font-extrabold text-lg">
                  Hasil Perhitungan RAB Kasar
                </h3>
              </div>

              {/* Range biayanya */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-brand-orange-500 uppercase font-bold block">
                  ESTIMASI TOTAL ANGGARAN PROYEK
                </span>
                <div className="space-y-1">
                  <div className="text-sm text-slate-300">Minimum estimasi:</div>
                  <div className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                    {formatCurrency(estimasiMin)}
                  </div>
                </div>
                
                <div className="h-0.5 bg-brand-blue-800 my-2" />

                <div className="space-y-1">
                  <div className="text-sm text-slate-300">Maksimum estimasi:</div>
                  <div className="text-2xl sm:text-3xl font-display font-black text-brand-orange-500 tracking-tight">
                    {formatCurrency(estimasiMax)}
                  </div>
                </div>
              </div>

              {/* Durasi pengerjaannya */}
              <div className="bg-brand-blue-800/60 p-4 rounded-xl space-y-2 border border-brand-blue-700/50">
                <span className="text-[9px] font-mono tracking-widest text-brand-orange-500 uppercase font-bold block">
                  ESTIMASI WAKTU PENGERJAAN
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold font-display text-white">
                    {durasiMin} - {durasiMax}
                  </span>
                  <span className="text-xs text-slate-300 font-medium">Hari Kerja Lapangan</span>
                </div>
                <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                  Sudah termasuk masa persiapan lahan, fabrikasi material, pembesian struktur, pengecoran, serta finishing interior/eksterior.
                </p>
              </div>

              {/* Disclaimer */}
              <div className="text-[10px] text-slate-400 leading-relaxed bg-brand-blue-800/30 p-3 rounded-lg border border-brand-blue-800/50 font-sans">
                <strong>Disclaimer:</strong> Estimasi kalkulator ini merupakan perhitungan acuan awal standar SNI kontraktor Jakarta. Harga final disepakati setelah dilakukan **Survey Lokasi Gratis** untuk detail item pekerjaan dan struktur ruko/kantor/gudang yang riil.
              </div>
            </div>

            {/* CTA ke survey */}
            <div className="pt-6 mt-8 border-t border-brand-blue-800 relative z-10">
              <button
                onClick={handleNextToSurvey}
                className="w-full bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-bold py-4 px-6 rounded-xl text-base shadow-lg shadow-brand-orange-500/20 hover:shadow-brand-orange-500/40 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Lanjut Survey Proyek</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
