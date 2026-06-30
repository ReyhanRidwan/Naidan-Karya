/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, Check, ChevronRight, ChevronLeft, Printer, Info, 
  Layers, Sliders, Scaling, Paintbrush, Lightbulb, FileText, CheckCircle2, Sparkles
} from 'lucide-react';

// Design styles config
const STYLE_THEMES = {
  'Modern Minimalis': {
    primary: '#f59e0b', // amber-500
    primaryDark: '#b45309', // amber-700
    woodLight: '#fef3c7', // amber-100
    woodMed: '#f59e0b',
    sofa: '#64748b', // slate-500
    bgTheme: 'bg-amber-500',
    textTheme: 'text-amber-700',
  },
  'Japandi Natural': {
    primary: '#ca8a04', // yellow-600
    primaryDark: '#854d0e', // yellow-800
    woodLight: '#fef9c3', // yellow-100
    woodMed: '#ca8a04',
    sofa: '#cbd5e1', // slate-300 beige
    bgTheme: 'bg-yellow-600',
    textTheme: 'text-yellow-700',
  },
  'Classic Luxury': {
    primary: '#b45309', // amber-700
    primaryDark: '#78350f', // amber-900
    woodLight: '#ffedd5', // orange-100
    woodMed: '#7c2d12', // mahogany
    sofa: '#1e293b', // deep navy
    bgTheme: 'bg-amber-800',
    textTheme: 'text-amber-900',
  },
  'Industrial': {
    primary: '#d97706', // amber-600
    primaryDark: '#451a03', // brown-900
    woodLight: '#fed7aa', // orange-200
    woodMed: '#451a03', // ironwood
    sofa: '#7c2d12', // tan leather
    bgTheme: 'bg-stone-800',
    textTheme: 'text-amber-800',
  }
};

type StyleType = keyof typeof STYLE_THEMES;

export default function RabCalculator() {
  const [step, setStep] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // STEP 1: Dimensions
  const [panjang, setPanjang] = useState(4.0);
  const [lebar, setLebar] = useState(3.0);
  const [tinggi, setTinggi] = useState(2.8);
  const [gayaDesain, setGayaDesain] = useState<StyleType>('Modern Minimalis');

  // STEP 2: Furniture Custom
  const [isKitchenSet, setIsKitchenSet] = useState(false);
  const [kitchenSetPanjang, setKitchenSetPanjang] = useState(3.0);
  const [kitchenSetHarga, setKitchenSetHarga] = useState(2400000);

  const [isWardrobe, setIsWardrobe] = useState(false);
  const [wardrobePanjang, setWardrobePanjang] = useState(2.0);
  const [wardrobeHarga, setWardrobeHarga] = useState(2600000);

  const [isSofa, setIsSofa] = useState(false);
  const [sofaHarga, setSofaHarga] = useState(6500000);

  const [finishingMaterial, setFinishingMaterial] = useState<'standar' | 'premium' | 'duco'>('standar');
  const [slowMotion, setSlowMotion] = useState(false);
  const [ledStrip, setLedStrip] = useState(false);

  // STEP 3: Wall, Floor, Ceiling
  const [isLantai, setIsLantai] = useState(false);
  const [lantaiHarga, setLantaiHarga] = useState(2200000); // per m2 standard rate scaled

  const [isDinding, setIsDinding] = useState(false);
  const [dindingLuas, setDindingLuas] = useState(15);
  const [dindingHarga, setDindingHarga] = useState(85000);

  const [isPlafond, setIsPlafond] = useState(false);
  const [plafondHarga, setPlafondHarga] = useState(160000);

  // STEP 4: MEP
  const [isDownlight, setIsDownlight] = useState(false);
  const [downlightQty, setDownlightQty] = useState(4);
  const [downlightHarga, setDownlightHarga] = useState(65000);

  const [isStopKontak, setIsStopKontak] = useState(false);
  const [stopKontakQty, setStopKontakQty] = useState(4);
  const [stopKontakHarga, setStopKontakHarga] = useState(45000);

  const [isChandelier, setIsChandelier] = useState(false);
  const [chandelierQty, setChandelierQty] = useState(1);
  const [chandelierHarga, setChandelierHarga] = useState(850000);

  // Multipliers
  const finishingMultiplier = finishingMaterial === 'duco' ? 1.40 : finishingMaterial === 'premium' ? 1.15 : 1.0;
  const optExtra = (slowMotion ? 150000 : 0) + (ledStrip ? 95000 : 0);

  // Clamp furniture lengths to room size limits when room dimensions shrink
  useEffect(() => {
    if (kitchenSetPanjang > panjang) setKitchenSetPanjang(parseFloat(panjang.toFixed(1)));
  }, [panjang]);

  useEffect(() => {
    if (wardrobePanjang > lebar) setWardrobePanjang(parseFloat(lebar.toFixed(1)));
  }, [lebar]);

  // Volume parameters
  const luasLantai = panjang * lebar;
  const maxDindingLuas = ((panjang * 2) + (lebar * 2)) * tinggi;

  useEffect(() => {
    if (dindingLuas > maxDindingLuas) setDindingLuas(parseFloat(maxDindingLuas.toFixed(1)));
  }, [panjang, lebar, tinggi, maxDindingLuas]);

  // Real-time pricing calculations
  const calculateItems = () => {
    const list = [];
    
    if (isKitchenSet) {
      const rate = (kitchenSetHarga * finishingMultiplier) + optExtra;
      list.push({
        id: 'kitchen',
        name: 'Kitchen Set (Kabinet Atas & Bawah)',
        volume: kitchenSetPanjang,
        unit: 'm¹',
        rate: rate,
        total: kitchenSetPanjang * rate
      });
    }

    if (isWardrobe) {
      const rate = (wardrobeHarga * finishingMultiplier) + optExtra;
      list.push({
        id: 'wardrobe',
        name: 'Wardrobe / Lemari Pakaian Full-Plafond',
        volume: wardrobePanjang,
        unit: 'm¹',
        rate: rate,
        total: wardrobePanjang * rate
      });
    }

    if (isSofa) {
      list.push({
        id: 'sofa',
        name: 'Sofa Minimalis & Coffee Table Set',
        volume: 1,
        unit: 'Set',
        rate: sofaHarga,
        total: sofaHarga
      });
    }

    if (isLantai) {
      list.push({
        id: 'lantai',
        name: 'Pemasangan Lantai Vinyl / Parket Kayu',
        volume: parseFloat(luasLantai.toFixed(2)),
        unit: 'm²',
        rate: lantaiHarga,
        total: luasLantai * lantaiHarga
      });
    }

    if (isDinding) {
      list.push({
        id: 'dinding',
        name: 'Finishing Wallpaper / Wall Panel Dinding',
        volume: dindingLuas,
        unit: 'm²',
        rate: dindingHarga,
        total: dindingLuas * dindingHarga
      });
    }

    if (isPlafond) {
      list.push({
        id: 'plafond',
        name: 'Pembuatan Plafond Drop Ceiling',
        volume: parseFloat(luasLantai.toFixed(2)),
        unit: 'm²',
        rate: plafondHarga,
        total: luasLantai * plafondHarga
      });
    }

    if (isDownlight) {
      list.push({
        id: 'downlight',
        name: 'Titik Lampu Downlight LED (Premium)',
        volume: downlightQty,
        unit: 'Unit',
        rate: downlightHarga,
        total: downlightQty * downlightHarga
      });
    }

    if (isStopKontak) {
      list.push({
        id: 'stopkontak',
        name: 'Stop Kontak & Saklar Tambahan',
        volume: stopKontakQty,
        unit: 'Unit',
        rate: stopKontakHarga,
        total: stopKontakQty * stopKontakHarga
      });
    }

    if (isChandelier) {
      list.push({
        id: 'chandelier',
        name: 'Lampu Gantung Hias (Chandelier/Pendant)',
        volume: chandelierQty,
        unit: 'Unit',
        rate: chandelierHarga,
        total: chandelierQty * chandelierHarga
      });
    }

    return list;
  };

  const calculatedItems = calculateItems();
  const grandTotal = calculatedItems.reduce((acc, curr) => acc + curr.total, 0);

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const currentTheme = STYLE_THEMES[gayaDesain];

  // SVG Dimension Scale Factors (maps meters to visual pixels)
  // Max room size is 8m, visual canvas is roughly 250px inside 400px container
  const scale = 26; 
  const roomW = panjang * scale;
  const roomH = lebar * scale;
  const rectX = 200 - (roomW / 2);
  const rectY = 115 - (roomH / 2);

  return (
    <section id="rab-calculator" className="bg-slate-50 py-12 md:py-20 relative">
      <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />

      {/* STICKY BAR FOR MOBILE & TABLET */}
      <div className="sticky top-14 md:top-[56px] z-30 lg:hidden w-full bg-white border-b border-slate-200 shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center space-x-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
            <span>{panjang.toFixed(1)}m × {lebar.toFixed(1)}m × {tinggi.toFixed(1)}m</span>
            <span className="text-slate-300">•</span>
            <span className="text-amber-700">{gayaDesain}</span>
          </div>
          <div className="text-base font-black text-amber-600 font-display">
            {formatIDR(grandTotal)}
          </div>
        </div>
        <button 
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-mono text-[11px] font-bold px-3 py-2 rounded-lg transition-colors flex items-center space-x-1 shadow-sm"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{isDrawerOpen ? 'Tutup Denah' : 'Lihat Denah'}</span>
        </button>
      </div>

      {/* MOBILE DRAWER CONTAINER */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden w-full bg-white border-b border-slate-200 overflow-hidden shadow-inner px-4 py-5 space-y-4"
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700 tracking-wider font-mono uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> LIVE SCHEMATIC 2D
              </span>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-600 font-mono underline"
              >
                Sembunyikan
              </button>
            </div>
            {/* Renders the blueprint inside the drawer */}
            <div className="bg-white border border-slate-200 rounded-xl p-3 overflow-hidden shadow-sm">
              <BlueprintVisualizer 
                panjang={panjang}
                lebar={lebar}
                tinggi={tinggi}
                gayaDesain={gayaDesain}
                isKitchenSet={isKitchenSet}
                kitchenSetPanjang={kitchenSetPanjang}
                isWardrobe={isWardrobe}
                wardrobePanjang={wardrobePanjang}
                isSofa={isSofa}
                isPlafond={isPlafond}
                isLantai={isLantai}
                currentTheme={currentTheme}
                roomW={roomW}
                roomH={roomH}
                rectX={rectX}
                rectY={rectY}
                scale={scale}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Seksi */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 space-y-3">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest font-mono flex items-center justify-center gap-1.5">
            <Calculator className="w-4 h-4" /> ESTIMATOR DESIGN INTERIOR
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
            Kalkulator RAB Interior & Custom Furniture
          </h2>
          <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full" />
          <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
            Rencanakan layout furniture, lantai, plafond hingga sistem elektrikal secara visual dan dapatkan penawaran RAB transparan dalam 5 tahap interaktif.
          </p>
        </div>

        {/* SPLIT SCREEN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start">
          
          {/* PANEL KIRI (STAYS PINNED ON DESKTOP) */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6 lg:sticky lg:top-24 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <h3 className="text-sm font-bold font-mono text-slate-800 uppercase tracking-wider">
                  Diagram 2D Reaktif (CAD Blueprint)
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase">
                Skala Real-Time
              </span>
            </div>

            <BlueprintVisualizer 
              panjang={panjang}
              lebar={lebar}
              tinggi={tinggi}
              gayaDesain={gayaDesain}
              isKitchenSet={isKitchenSet}
              kitchenSetPanjang={kitchenSetPanjang}
              isWardrobe={isWardrobe}
              wardrobePanjang={wardrobePanjang}
              isSofa={isSofa}
              isPlafond={isPlafond}
              isLantai={isLantai}
              currentTheme={currentTheme}
              roomW={roomW}
              roomH={roomH}
              rectX={rectX}
              rectY={rectY}
              scale={scale}
            />

            <div className="bg-slate-50 p-4 rounded-xl text-[11px] text-slate-500 space-y-1.5 border border-slate-100">
              <div className="font-bold text-slate-700 flex items-center gap-1 font-mono uppercase">
                <Info className="w-3.5 h-3.5 text-amber-500" /> Keterangan Gambar
              </div>
              <p className="leading-relaxed">
                Dimensi ruangan direpresentasikan dalam rasio meter aktual. Item furniture seperti <span className="text-amber-700 font-semibold">Kitchen Set</span> dan <span className="text-amber-700 font-semibold">Lemari Wardrobe</span> diplot secara presisi pada Dinding A & D dengan kedalaman 0.6m.
              </p>
            </div>
          </div>

          {/* PANEL KANAN: MULTI-STEP FORM */}
          <div className="lg:col-span-7 xl:col-span-6 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
            
            {/* Step Indicators Header */}
            <div className="bg-slate-50 border-b border-slate-100 px-6 py-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                  Progress Pendaftaran RAB
                </span>
                <span className="text-xs font-mono font-extrabold text-amber-600">
                  Langkah {step} dari 5
                </span>
              </div>
              <div className="flex items-center space-x-1.5 mt-3">
                {[1, 2, 3, 4, 5].map((idx) => (
                  <div key={idx} className="flex-1 h-1.5 rounded-full overflow-hidden bg-slate-200 relative">
                    {step >= idx && (
                      <motion.div 
                        layoutId="bar-progress" 
                        className="absolute inset-0 bg-amber-500"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Form Fields wrapper with AnimatePresence */}
            <div className="p-6 min-h-[420px] sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* STEP 1: DIMENSIONS */}
                  {step === 1 && (
                    <div className="space-y-5">
                      <div className="space-y-1">
                        <h4 className="text-lg font-display font-extrabold text-slate-800 flex items-center gap-2">
                          <Scaling className="w-5 h-5 text-amber-500" /> Tentukan Ukuran & Fungsi Ruang
                        </h4>
                        <p className="text-xs text-slate-500">
                          Masukkan dimensi presisi ruangan Anda dalam meter (Gunakan tombol atau input manual).
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                        {/* Panjang */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                            Panjang Ruangan (Dinding A & C)
                          </label>
                          <div className="flex items-center space-x-2">
                            <button 
                              type="button"
                              onClick={() => setPanjang(Math.max(1, parseFloat((panjang - 0.5).toFixed(1))))}
                              className="w-10 h-10 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 rounded-lg font-bold text-lg"
                            >
                              -
                            </button>
                            <input 
                              type="number"
                              min={1.0}
                              max={8.0}
                              step={0.1}
                              value={panjang}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value);
                                if (!isNaN(val)) setPanjang(Math.min(8, Math.max(1, val)));
                              }}
                              className="flex-1 text-center bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                            />
                            <button 
                              type="button"
                              onClick={() => setPanjang(Math.min(8, parseFloat((panjang + 0.5).toFixed(1))))}
                              className="w-10 h-10 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 rounded-lg font-bold text-lg"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[10px] text-slate-400 block italic">Minimal 1.0m - Maksimal 8.0m</span>
                        </div>

                        {/* Lebar */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                            Lebar Ruangan (Dinding B & D)
                          </label>
                          <div className="flex items-center space-x-2">
                            <button 
                              type="button"
                              onClick={() => setLebar(Math.max(1, parseFloat((lebar - 0.5).toFixed(1))))}
                              className="w-10 h-10 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 rounded-lg font-bold text-lg"
                            >
                              -
                            </button>
                            <input 
                              type="number"
                              min={1.0}
                              max={8.0}
                              step={0.1}
                              value={lebar}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value);
                                if (!isNaN(val)) setLebar(Math.min(8, Math.max(1, val)));
                              }}
                              className="flex-1 text-center bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                            />
                            <button 
                              type="button"
                              onClick={() => setLebar(Math.min(8, parseFloat((lebar + 0.5).toFixed(1))))}
                              className="w-10 h-10 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 rounded-lg font-bold text-lg"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[10px] text-slate-400 block italic">Minimal 1.0m - Maksimal 8.0m</span>
                        </div>

                        {/* Tinggi Plafond */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                            Tinggi Plafond Ruangan
                          </label>
                          <div className="flex items-center space-x-2">
                            <button 
                              type="button"
                              onClick={() => setTinggi(Math.max(2.5, parseFloat((tinggi - 0.1).toFixed(1))))}
                              className="w-10 h-10 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 rounded-lg font-bold text-lg"
                            >
                              -
                            </button>
                            <input 
                              type="number"
                              min={2.5}
                              max={3.5}
                              step={0.1}
                              value={tinggi}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value);
                                if (!isNaN(val)) setTinggi(Math.min(3.5, Math.max(2.5, val)));
                              }}
                              className="flex-1 text-center bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                            />
                            <button 
                              type="button"
                              onClick={() => setTinggi(Math.min(3.5, parseFloat((tinggi + 0.1).toFixed(1))))}
                              className="w-10 h-10 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 rounded-lg font-bold text-lg"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[10px] text-slate-400 block italic">Rentang Standar 2.5m - 3.5m</span>
                        </div>

                        {/* Gaya Desain */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                            Gaya Arsitektur Desain
                          </label>
                          <select
                            value={gayaDesain}
                            onChange={(e) => setGayaDesain(e.target.value as StyleType)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold text-slate-800"
                          >
                            <option value="Modern Minimalis">Modern Minimalis (Madu Amber & Slate)</option>
                            <option value="Japandi Natural">Japandi Natural (Oak & Cream)</option>
                            <option value="Classic Luxury">Classic Luxury (Walnut Deep Wood)</option>
                            <option value="Industrial">Industrial (Besi Hitam & Kulit Tan)</option>
                          </select>
                          <span className="text-[10px] text-slate-400 block italic">Mempengaruhi warna rendering CAD panel kiri</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: CUSTOM CABINETS */}
                  {step === 2 && (
                    <div className="space-y-5">
                      <div className="space-y-1">
                        <h4 className="text-lg font-display font-extrabold text-slate-800 flex items-center gap-2">
                          <Sliders className="w-5 h-5 text-amber-500" /> Kustomisasi Kabinet & Furniture
                        </h4>
                        <p className="text-xs text-slate-500">
                          Tentukan furniture borongan custom untuk diposisikan secara otomatis ke dalam denah.
                        </p>
                      </div>

                      <div className="space-y-5 divide-y divide-slate-100">
                        {/* KITCHEN SET */}
                        <div className="pt-2 space-y-3">
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input 
                              type="checkbox"
                              checked={isKitchenSet}
                              onChange={(e) => setIsKitchenSet(e.target.checked)}
                              className="w-5 h-5 accent-amber-500 rounded border-slate-300"
                            />
                            <span className="font-display font-extrabold text-sm text-slate-800">
                              Kitchen Set (Kabinet Atas & Bawah)
                            </span>
                          </label>

                          {isKitchenSet && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 space-y-4 ml-8"
                            >
                              {/* Kitchen set length */}
                              <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-semibold text-slate-700">
                                  <span>Panjang Kitchen Set:</span>
                                  <span className="font-mono text-amber-700 font-bold">{kitchenSetPanjang.toFixed(1)} meter lari</span>
                                </div>
                                <input 
                                  type="range"
                                  min={1.0}
                                  max={panjang}
                                  step={0.1}
                                  value={kitchenSetPanjang}
                                  onChange={(e) => setKitchenSetPanjang(parseFloat(e.target.value))}
                                  className="w-full accent-amber-500 cursor-ew-resize"
                                />
                                <span className="text-[10px] text-slate-400 block">Dibatasi oleh panjang Dinding A ({panjang}m)</span>
                              </div>

                              {/* Kitchen set unit price */}
                              <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-semibold text-slate-700">
                                  <span>Harga Bahan Dasar (per m¹):</span>
                                  <span className="font-mono text-amber-700 font-bold">{formatIDR(kitchenSetHarga)}</span>
                                </div>
                                <input 
                                  type="range"
                                  min={1800000}
                                  max={3500000}
                                  step={100000}
                                  value={kitchenSetHarga}
                                  onChange={(e) => setKitchenSetHarga(parseInt(e.target.value))}
                                  className="w-full accent-amber-500 cursor-ew-resize"
                                />
                                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                                  <span>Rp 1.8 Mtk</span>
                                  <span>Rp 3.5 Mtk</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* WARDROBE CABINET */}
                        <div className="pt-4 space-y-3">
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input 
                              type="checkbox"
                              checked={isWardrobe}
                              onChange={(e) => setIsWardrobe(e.target.checked)}
                              className="w-5 h-5 accent-amber-500 rounded border-slate-300"
                            />
                            <span className="font-display font-extrabold text-sm text-slate-800">
                              Wardrobe / Lemari Pakaian Full Plafond
                            </span>
                          </label>

                          {isWardrobe && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 space-y-4 ml-8"
                            >
                              {/* Wardrobe length */}
                              <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-semibold text-slate-700">
                                  <span>Panjang Wardrobe:</span>
                                  <span className="font-mono text-amber-700 font-bold">{wardrobePanjang.toFixed(1)} meter lari</span>
                                </div>
                                <input 
                                  type="range"
                                  min={1.0}
                                  max={lebar}
                                  step={0.1}
                                  value={wardrobePanjang}
                                  onChange={(e) => setWardrobePanjang(parseFloat(e.target.value))}
                                  className="w-full accent-amber-500 cursor-ew-resize"
                                />
                                <span className="text-[10px] text-slate-400 block">Dibatasi oleh lebar Dinding D ({lebar}m)</span>
                              </div>

                              {/* Wardrobe unit price */}
                              <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-semibold text-slate-700">
                                  <span>Harga Bahan Dasar (per m¹):</span>
                                  <span className="font-mono text-amber-700 font-bold">{formatIDR(wardrobeHarga)}</span>
                                </div>
                                <input 
                                  type="range"
                                  min={2000000}
                                  max={4000000}
                                  step={100000}
                                  value={wardrobeHarga}
                                  onChange={(e) => setWardrobeHarga(parseInt(e.target.value))}
                                  className="w-full accent-amber-500 cursor-ew-resize"
                                />
                                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                                  <span>Rp 2.0 Mtk</span>
                                  <span>Rp 4.0 Mtk</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* SOFA & COFFEE TABLE */}
                        <div className="pt-4 space-y-3">
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input 
                              type="checkbox"
                              checked={isSofa}
                              onChange={(e) => setIsSofa(e.target.checked)}
                              className="w-5 h-5 accent-amber-500 rounded border-slate-300"
                            />
                            <span className="font-display font-extrabold text-sm text-slate-800">
                              Sofa Set & Coffee Table (Area Dinding C)
                            </span>
                          </label>

                          {isSofa && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 space-y-4 ml-8"
                            >
                              <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-semibold text-slate-700">
                                  <span>Harga Sofa & Table (1 Set):</span>
                                  <span className="font-mono text-amber-700 font-bold">{formatIDR(sofaHarga)}</span>
                                </div>
                                <input 
                                  type="range"
                                  min={4500000}
                                  max={12000000}
                                  step={250000}
                                  value={sofaHarga}
                                  onChange={(e) => setSofaHarga(parseInt(e.target.value))}
                                  className="w-full accent-amber-500 cursor-ew-resize"
                                />
                                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                                  <span>Rp 4.5 Juta</span>
                                  <span>Rp 12.0 Juta</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* GLOBAL MATERIAL FINISHING */}
                      {(isKitchenSet || isWardrobe) && (
                        <div className="pt-4 mt-4 border-t border-slate-100 space-y-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                              Bahan Pelapis Finishing Lemari / Kabinet
                            </label>
                            <select
                              value={finishingMaterial}
                              onChange={(e) => setFinishingMaterial(e.target.value as any)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold text-slate-800"
                            >
                              <option value="standar">HPL Standar (Faktor Pengali x1.0)</option>
                              <option value="premium">HPL Premium / Tekstur Kayu Riil (Faktor Pengali x1.15)</option>
                              <option value="duco">Cat Duco Mewah (Faktor Pengali x1.40)</option>
                            </select>
                          </div>

                          {/* MICRO OPTIONS CHECKBOXES */}
                          <div className="space-y-3 pt-1">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                              Fitur Tambahan Kabinet (Opsi Mikro)
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <label className="flex items-center space-x-2.5 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs">
                                <input 
                                  type="checkbox"
                                  checked={slowMotion}
                                  onChange={(e) => setSlowMotion(e.target.checked)}
                                  className="w-4.5 h-4.5 accent-amber-500"
                                />
                                <span className="font-semibold text-slate-700 leading-tight">
                                  Rel & Engsel Slow-motion (+Rp 150rb/m¹)
                                </span>
                              </label>

                              <label className="flex items-center space-x-2.5 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs">
                                <input 
                                  type="checkbox"
                                  checked={ledStrip}
                                  onChange={(e) => setLedStrip(e.target.checked)}
                                  className="w-4.5 h-4.5 accent-amber-500"
                                />
                                <span className="font-semibold text-slate-700 leading-tight">
                                  Lampu LED Strip Tersembunyi (+Rp 95rb/m¹)
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 3: SURFACES */}
                  {step === 3 && (
                    <div className="space-y-5">
                      <div className="space-y-1">
                        <h4 className="text-lg font-display font-extrabold text-slate-800 flex items-center gap-2">
                          <Paintbrush className="w-5 h-5 text-amber-500" /> Pelapis Permukaan & Estetika Ruang
                        </h4>
                        <p className="text-xs text-slate-500">
                          Hitung biaya finishing lantai, dekorasi dinding, serta pembuatan langit-langit (plafond).
                        </p>
                      </div>

                      <div className="space-y-4 divide-y divide-slate-100">
                        {/* LANTAI */}
                        <div className="pt-2 space-y-3">
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input 
                              type="checkbox"
                              checked={isLantai}
                              onChange={(e) => setIsLantai(e.target.checked)}
                              className="w-5 h-5 accent-amber-500 rounded border-slate-300"
                            />
                            <span className="font-display font-extrabold text-sm text-slate-800">
                              Pemasangan Lantai Vinyl / Parket Kayu
                            </span>
                          </label>

                          {isLantai && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 space-y-3 ml-8"
                            >
                              <div className="flex justify-between text-xs font-semibold text-slate-700 font-mono">
                                <span>Volume Lantai (P × L):</span>
                                <span className="font-bold text-amber-700">{luasLantai.toFixed(2)} m²</span>
                              </div>

                              <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-semibold text-slate-700">
                                  <span>Harga Borongan Lantai (per m²):</span>
                                  <span className="font-mono text-amber-700 font-bold">{formatIDR(lantaiHarga)}</span>
                                </div>
                                <input 
                                  type="range"
                                  min={150000}
                                  max={400000}
                                  step={10000}
                                  value={lantaiHarga}
                                  onChange={(e) => setLantaiHarga(parseInt(e.target.value))}
                                  className="w-full accent-amber-500 cursor-ew-resize"
                                />
                                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                                  <span>Rp 150.000</span>
                                  <span>Rp 400.000</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* WALLPAPER / WALL PANEL */}
                        <div className="pt-4 space-y-3">
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input 
                              type="checkbox"
                              checked={isDinding}
                              onChange={(e) => setIsDinding(e.target.checked)}
                              className="w-5 h-5 accent-amber-500 rounded border-slate-300"
                            />
                            <span className="font-display font-extrabold text-sm text-slate-800">
                              Finishing Wallpaper / Wall Panel Dinding
                            </span>
                          </label>

                          {isDinding && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 space-y-4 ml-8"
                            >
                              <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-semibold text-slate-700">
                                  <span>Luas Dinding yang Dipasang:</span>
                                  <span className="font-mono text-amber-700 font-bold">{dindingLuas.toFixed(1)} m²</span>
                                </div>
                                <input 
                                  type="range"
                                  min={1.0}
                                  max={maxDindingLuas}
                                  step={0.5}
                                  value={dindingLuas}
                                  onChange={(e) => setDindingLuas(parseFloat(e.target.value))}
                                  className="w-full accent-amber-500 cursor-ew-resize"
                                />
                                <span className="text-[10px] text-slate-400 block">
                                  Maksimal luas semua dinding: {maxDindingLuas.toFixed(1)} m²
                                </span>
                              </div>

                              <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-semibold text-slate-700">
                                  <span>Harga Wallpaper / Panel (per m²):</span>
                                  <span className="font-mono text-amber-700 font-bold">{formatIDR(dindingHarga)}</span>
                                </div>
                                <input 
                                  type="range"
                                  min={60000}
                                  max={350000}
                                  step={5000}
                                  value={dindingHarga}
                                  onChange={(e) => setDindingHarga(parseInt(e.target.value))}
                                  className="w-full accent-amber-500 cursor-ew-resize"
                                />
                                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                                  <span>Rp 60.000</span>
                                  <span>Rp 350.000</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* PLAFOND */}
                        <div className="pt-4 space-y-3">
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input 
                              type="checkbox"
                              checked={isPlafond}
                              onChange={(e) => setIsPlafond(e.target.checked)}
                              className="w-5 h-5 accent-amber-500 rounded border-slate-300"
                            />
                            <span className="font-display font-extrabold text-sm text-slate-800">
                              Pembuatan Plafond Drop Ceiling (Langit-langit)
                            </span>
                          </label>

                          {isPlafond && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 space-y-3 ml-8"
                            >
                              <div className="flex justify-between text-xs font-semibold text-slate-700 font-mono">
                                <span>Volume Plafond (Sesuai Luas Lantai):</span>
                                <span className="font-bold text-amber-700">{luasLantai.toFixed(2)} m²</span>
                              </div>

                              <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-semibold text-slate-700">
                                  <span>Harga Drop Ceiling (per m²):</span>
                                  <span className="font-mono text-amber-700 font-bold">{formatIDR(plafondHarga)}</span>
                                </div>
                                <input 
                                  type="range"
                                  min={120000}
                                  max={250000}
                                  step={5000}
                                  value={plafondHarga}
                                  onChange={(e) => setPlafondHarga(parseInt(e.target.value))}
                                  className="w-full accent-amber-500 cursor-ew-resize"
                                />
                                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                                  <span>Rp 120.000</span>
                                  <span>Rp 250.000</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: MEP LIGHTING */}
                  {step === 4 && (
                    <div className="space-y-5">
                      <div className="space-y-1">
                        <h4 className="text-lg font-display font-extrabold text-slate-800 flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-amber-500" /> Pencahayaan & Titik Daya (MEP)
                        </h4>
                        <p className="text-xs text-slate-500">
                          Rencanakan titik stopkontak, downlight tertanam, hingga pemasangan lampu gantung hias.
                        </p>
                      </div>

                      <div className="space-y-4 divide-y divide-slate-100">
                        {/* DOWNLIGHT */}
                        <div className="pt-2 space-y-3">
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input 
                              type="checkbox"
                              checked={isDownlight}
                              onChange={(e) => setIsDownlight(e.target.checked)}
                              className="w-5 h-5 accent-amber-500 rounded border-slate-300"
                            />
                            <span className="font-display font-extrabold text-sm text-slate-800">
                              Titik Lampu Downlight LED (Termasuk Kabel)
                            </span>
                          </label>

                          {isDownlight && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 space-y-4 ml-8"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-slate-700">Jumlah Titik Lampu:</span>
                                <div className="flex items-center space-x-2">
                                  <button 
                                    type="button"
                                    onClick={() => setDownlightQty(Math.max(1, downlightQty - 1))}
                                    className="w-8 h-8 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded font-bold text-sm"
                                  >
                                    -
                                  </button>
                                  <span className="font-mono text-sm font-bold text-slate-800 w-8 text-center">{downlightQty}</span>
                                  <button 
                                    type="button"
                                    onClick={() => setDownlightQty(Math.min(30, downlightQty + 1))}
                                    className="w-8 h-8 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded font-bold text-sm"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>

                              <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-semibold text-slate-700">
                                  <span>Harga per Titik (Downlight):</span>
                                  <span className="font-mono text-amber-700 font-bold">{formatIDR(downlightHarga)}</span>
                                </div>
                                <input 
                                  type="range"
                                  min={45000}
                                  max={120000}
                                  step={5000}
                                  value={downlightHarga}
                                  onChange={(e) => setDownlightHarga(parseInt(e.target.value))}
                                  className="w-full accent-amber-500 cursor-ew-resize"
                                />
                                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                                  <span>Rp 45.000</span>
                                  <span>Rp 120.000</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* STOP KONTAK */}
                        <div className="pt-4 space-y-3">
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input 
                              type="checkbox"
                              checked={isStopKontak}
                              onChange={(e) => setIsStopKontak(e.target.checked)}
                              className="w-5 h-5 accent-amber-500 rounded border-slate-300"
                            />
                            <span className="font-display font-extrabold text-sm text-slate-800">
                              Stop Kontak & Saklar Tambahan (Merek Premium)
                            </span>
                          </label>

                          {isStopKontak && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 space-y-4 ml-8"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-slate-700">Jumlah Stop Kontak:</span>
                                <div className="flex items-center space-x-2">
                                  <button 
                                    type="button"
                                    onClick={() => setStopKontakQty(Math.max(1, stopKontakQty - 1))}
                                    className="w-8 h-8 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded font-bold text-sm"
                                  >
                                    -
                                  </button>
                                  <span className="font-mono text-sm font-bold text-slate-800 w-8 text-center">{stopKontakQty}</span>
                                  <button 
                                    type="button"
                                    onClick={() => setStopKontakQty(Math.min(30, stopKontakQty + 1))}
                                    className="w-8 h-8 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded font-bold text-sm"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>

                              <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-semibold text-slate-700">
                                  <span>Harga per Titik Stop Kontak:</span>
                                  <span className="font-mono text-amber-700 font-bold">{formatIDR(stopKontakHarga)}</span>
                                </div>
                                <input 
                                  type="range"
                                  min={35000}
                                  max={90000}
                                  step={5000}
                                  value={stopKontakHarga}
                                  onChange={(e) => setStopKontakHarga(parseInt(e.target.value))}
                                  className="w-full accent-amber-500 cursor-ew-resize"
                                />
                                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                                  <span>Rp 35.000</span>
                                  <span>Rp 90.000</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* CHANDELIER */}
                        <div className="pt-4 space-y-3">
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input 
                              type="checkbox"
                              checked={isChandelier}
                              onChange={(e) => setIsChandelier(e.target.checked)}
                              className="w-5 h-5 accent-amber-500 rounded border-slate-300"
                            />
                            <span className="font-display font-extrabold text-sm text-slate-800">
                              Lampu Gantung Hias (Chandelier / Pendant)
                            </span>
                          </label>

                          {isChandelier && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 space-y-4 ml-8"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-slate-700">Jumlah Lampu Hias:</span>
                                <div className="flex items-center space-x-2">
                                  <button 
                                    type="button"
                                    onClick={() => setChandelierQty(Math.max(1, chandelierQty - 1))}
                                    className="w-8 h-8 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded font-bold text-sm"
                                  >
                                    -
                                  </button>
                                  <span className="font-mono text-sm font-bold text-slate-800 w-8 text-center">{chandelierQty}</span>
                                  <button 
                                    type="button"
                                    onClick={() => setChandelierQty(Math.min(10, chandelierQty + 1))}
                                    className="w-8 h-8 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded font-bold text-sm"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>

                              <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-semibold text-slate-700">
                                  <span>Harga per Set (Lampu + Jasa Pasang):</span>
                                  <span className="font-mono text-amber-700 font-bold">{formatIDR(chandelierHarga)}</span>
                                </div>
                                <input 
                                  type="range"
                                  min={350000}
                                  max={2500000}
                                  step={50000}
                                  value={chandelierHarga}
                                  onChange={(e) => setChandelierHarga(parseInt(e.target.value))}
                                  className="w-full accent-amber-500 cursor-ew-resize"
                                />
                                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                                  <span>Rp 350.000</span>
                                  <span>Rp 2.500.000</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 5: BREAKDOWN TABLE */}
                  {step === 5 && (
                    <div id="rab-printable-area" className="space-y-5">
                      <div className="space-y-1">
                        <h4 className="text-lg font-display font-extrabold text-slate-800 flex items-center gap-2">
                          <FileText className="w-5 h-5 text-amber-500" /> Ringkasan Rencana Anggaran Biaya (RAB)
                        </h4>
                        <p className="text-xs text-slate-500">
                          Berikut adalah daftar rincian volume kerja, satuan, dan total estimasi berdasarkan kalkulasi real-time.
                        </p>
                      </div>

                      {calculatedItems.length === 0 ? (
                        <div className="bg-slate-50 rounded-xl p-8 text-center border border-dashed border-slate-300">
                          <p className="text-sm text-slate-500 font-semibold">
                            Tidak ada item pekerjaan yang dicentang. Kembali ke langkah sebelumnya untuk memilih item.
                          </p>
                        </div>
                      ) : (
                        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className="bg-slate-50 text-slate-600 font-mono border-b border-slate-100">
                                  <th className="p-3 font-bold">Item Pekerjaan</th>
                                  <th className="p-3 text-right font-bold">Volume</th>
                                  <th className="p-3 text-center font-bold">Sat</th>
                                  <th className="p-3 text-right font-bold">Harga Satuan</th>
                                  <th className="p-3 text-right font-bold">Total</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 text-slate-700 font-sans">
                                {calculatedItems.map((item) => (
                                  <tr key={item.id} className="hover:bg-slate-50/50">
                                    <td className="p-3 font-semibold text-slate-900 leading-tight">
                                      {item.name}
                                    </td>
                                    <td className="p-3 text-right font-mono font-semibold">
                                      {item.volume}
                                    </td>
                                    <td className="p-3 text-center font-semibold text-slate-500">
                                      {item.unit}
                                    </td>
                                    <td className="p-3 text-right font-mono font-semibold text-slate-600">
                                      {formatIDR(item.rate)}
                                    </td>
                                    <td className="p-3 text-right font-mono font-bold text-slate-900">
                                      {formatIDR(item.total)}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          
                          {/* Grand total indicator inside card */}
                          <div className="bg-amber-50/70 border-t border-slate-200 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div>
                              <span className="text-[10px] font-mono tracking-wider text-amber-700 uppercase font-bold block">
                                TOTAL ESTIMASI RENCANA ANGGARAN
                              </span>
                              <span className="text-slate-400 text-[10px]">Harga acuan standar kontraktor NKM</span>
                            </div>
                            <div className="text-xl sm:text-2xl font-black text-amber-600 font-display">
                              {formatIDR(grandTotal)}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-start space-x-2.5 text-xs text-slate-500 leading-relaxed">
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong>Rekomendasi Langkah Berikutnya:</strong> Silakan simpan estimasi ini sebagai file PDF atau cetak untuk didiskusikan langsung dengan tim arsitek kami saat survey lokasi gratis.
                        </div>
                      </div>

                      {calculatedItems.length > 0 && (
                        <button 
                          onClick={() => window.print()}
                          className="w-full bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-colors flex items-center justify-center space-x-2 shadow-md cursor-pointer mt-4"
                        >
                          <Printer className="w-4 h-4 text-amber-500" />
                          <span>Cetak RAB / Simpan PDF</span>
                        </button>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex justify-between items-center">
              <button
                type="button"
                disabled={step === 1}
                onClick={() => setStep(step - 1)}
                className="bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 font-bold py-2.5 px-5 rounded-lg text-xs flex items-center space-x-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>

              <div className="hidden sm:flex text-xs font-semibold text-slate-400 font-mono">
                Desain: <span className="text-slate-700 ml-1">{gayaDesain}</span>
              </div>

              {step < 5 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 px-5 rounded-lg text-xs flex items-center space-x-1.5 transition-colors shadow-sm cursor-pointer"
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="text-xs text-emerald-600 font-bold flex items-center gap-1 font-mono uppercase bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg">
                  <Check className="w-3.5 h-3.5" /> RAB Terhitung
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* STYLESHEET SPECIAL FOR PRINTING ISO SEAMLESS BLUEPRINTS */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #rab-printable-area, #rab-printable-area * {
            visibility: visible;
          }
          #rab-printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            padding: 20px;
          }
          /* Hide print button during printing */
          #rab-printable-area button {
            display: none !important;
          }
        }
      `}</style>

    </section>
  );
}

// Internal component for the reactive Blueprint Visualizer SVG 2D layout
interface BlueprintProps {
  panjang: number;
  lebar: number;
  tinggi: number;
  gayaDesain: StyleType;
  isKitchenSet: boolean;
  kitchenSetPanjang: number;
  isWardrobe: boolean;
  wardrobePanjang: number;
  isSofa: boolean;
  isPlafond: boolean;
  isLantai: boolean;
  currentTheme: typeof STYLE_THEMES['Modern Minimalis'];
  roomW: number;
  roomH: number;
  rectX: number;
  rectY: number;
  scale: number;
}

function BlueprintVisualizer({
  panjang,
  lebar,
  tinggi,
  isKitchenSet,
  kitchenSetPanjang,
  isWardrobe,
  wardrobePanjang,
  isSofa,
  isPlafond,
  isLantai,
  currentTheme,
  roomW,
  roomH,
  rectX,
  rectY,
  scale
}: BlueprintProps) {
  // Kitchen set drawing coordinates (runs along Dinding A - Top edge)
  const kitchenSetW = kitchenSetPanjang * scale;
  const cabinetDepth = 0.6 * scale; // 0.6m scaled

  // Wardrobe drawing coordinates (runs along Dinding D - Left edge)
  const wardrobeH = wardrobePanjang * scale;

  return (
    <div className="space-y-4 bg-white">
      {/* DIAGRAM DENAH ATAS (60% Height Area) */}
      <div className="relative border border-slate-200 rounded-xl overflow-hidden shadow-sm" style={{ height: '240px' }}>
        <svg className="w-full h-full bg-white text-slate-400" viewBox="0 0 400 240">
          <defs>
            {/* Elegant Technical Blueprint Grid */}
            <pattern id="micro-grid" width="5" height="5" patternUnits="userSpaceOnUse">
              <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#f1f5f9" strokeWidth="0.5" />
            </pattern>
            <pattern id="main-grid" width="25" height="25" patternUnits="userSpaceOnUse">
              <rect width="25" height="25" fill="url(#micro-grid)" />
              <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
            </pattern>
            {/* Wood Grain Hatching */}
            <pattern id="wood-grain" width="10" height="10" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="10" stroke={currentTheme.woodLight} strokeWidth="1" />
              <line x1="5" y1="0" x2="5" y2="10" stroke={currentTheme.woodMed} strokeWidth="0.5" opacity="0.4" />
            </pattern>
            <pattern id="parquet" width="12" height="12" patternTransform="rotate(15)" patternUnits="userSpaceOnUse">
              <rect width="12" height="12" fill="none" stroke="#fed7aa" strokeWidth="0.5" />
              <line x1="0" y1="4" x2="12" y2="4" stroke="#fdba74" strokeWidth="0.4" />
              <line x1="0" y1="8" x2="12" y2="8" stroke="#fdba74" strokeWidth="0.4" />
            </pattern>
          </defs>

          {/* Grid background */}
          <rect width="100%" height="100%" fill="url(#main-grid)" />

          {/* ROOM FLOOR FILL (IF LANTAI SELECTED) */}
          {isLantai ? (
            <rect 
              x={rectX} 
              y={rectY} 
              width={roomW} 
              height={roomH} 
              fill="url(#parquet)" 
              className="transition-all duration-300"
            />
          ) : (
            <rect 
              x={rectX} 
              y={rectY} 
              width={roomW} 
              height={roomH} 
              fill="#fafaf9" 
              className="transition-all duration-300"
            />
          )}

          {/* DINDING OUTER BOUNDARIES (BLACK CAD LINE) */}
          <rect 
            x={rectX} 
            y={rectY} 
            width={roomW} 
            height={roomH} 
            fill="none" 
            stroke="#1e293b" 
            strokeWidth="3" 
            className="transition-all duration-300"
          />

          {/* DINDING LABELS */}
          <text x="200" y={rectY - 26} textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-500">Dinding A (Atas)</text>
          <text x={rectX + roomW + 28} y="115" textAnchor="middle" transform={`rotate(90, ${rectX + roomW + 28}, 115)`} className="text-[10px] font-mono font-bold fill-slate-500">Dinding B (Kanan)</text>
          <text x="200" y={rectY + roomH + 34} textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-500">Dinding C (Bawah)</text>
          <text x={rectX - 28} y="115" textAnchor="middle" transform={`rotate(-90, ${rectX - 28}, 115)`} className="text-[10px] font-mono font-bold fill-slate-500">Dinding D (Kiri)</text>

          {/* DYNAMIC TEXT DIMENSIONS outside wall boundaries */}
          <text x="200" y={rectY - 10} textAnchor="middle" className="text-[11px] font-mono font-black fill-amber-700 transition-all">{panjang.toFixed(2)}m</text>
          <text x={rectX + roomW + 12} y="119" className="text-[11px] font-mono font-black fill-amber-700 transition-all">{lebar.toFixed(2)}m</text>

          {/* ACTIVE FURNITURE: KITCHEN SET */}
          {isKitchenSet && (
            <g className="transition-all duration-300">
              <rect 
                x={rectX} 
                y={rectY} 
                width={kitchenSetW} 
                height={cabinetDepth} 
                fill="url(#wood-grain)" 
                stroke={currentTheme.primaryDark} 
                strokeWidth="1"
              />
              {/* Draws a micro sink inside kitchen set */}
              {kitchenSetW > 40 && (
                <g transform={`translate(${rectX + 10}, ${rectY + 3})`}>
                  <rect width="18" height="10" rx="2" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.7" />
                  <circle cx="9" cy="5" r="3" fill="#cbd5e1" />
                  <path d="M 9 2 Q 9 -1, 11 -1" fill="none" stroke="#475569" strokeWidth="0.5" />
                </g>
              )}
              {/* Draws a micro stove circles */}
              {kitchenSetW > 80 && (
                <g transform={`translate(${rectX + kitchenSetW - 35}, ${rectY + 3})`}>
                  <rect width="20" height="10" rx="1" fill="#334155" />
                  <circle cx="5" cy="5" r="3" fill="none" stroke="#cbd5e1" strokeWidth="0.5" />
                  <circle cx="15" cy="5" r="3" fill="none" stroke="#cbd5e1" strokeWidth="0.5" />
                </g>
              )}
              <text x={rectX + kitchenSetW / 2} y={rectY + cabinetDepth / 2 + 3} textAnchor="middle" className="text-[7px] font-bold font-mono fill-slate-900 bg-white/70">KITCHEN</text>
            </g>
          )}

          {/* ACTIVE FURNITURE: WARDROBE CABINET */}
          {isWardrobe && (
            <g className="transition-all duration-300">
              <rect 
                x={rectX} 
                y={rectY} 
                width={cabinetDepth} 
                height={wardrobeH} 
                fill="url(#wood-grain)" 
                stroke={currentTheme.primaryDark} 
                strokeWidth="1"
              />
              {/* Wardrobe shelving details */}
              <line x1={rectX + 2} y1={rectY + wardrobeH * 0.3} x2={rectX + cabinetDepth - 2} y2={rectY + wardrobeH * 0.3} stroke={currentTheme.primaryDark} strokeWidth="0.6" strokeDasharray="1,1" />
              <line x1={rectX + 2} y1={rectY + wardrobeH * 0.6} x2={rectX + cabinetDepth - 2} y2={rectY + wardrobeH * 0.6} stroke={currentTheme.primaryDark} strokeWidth="0.6" strokeDasharray="1,1" />
              <text x={rectX + cabinetDepth / 2} y={rectY + wardrobeH / 2} textAnchor="middle" transform={`rotate(-90, ${rectX + cabinetDepth / 2}, ${rectY + wardrobeH / 2})`} className="text-[7px] font-bold font-mono fill-slate-900">WARDROBE</text>
            </g>
          )}

          {/* ACTIVE FURNITURE: SOFA & COFFEE TABLE */}
          {isSofa && (
            <g className="transition-all duration-300" transform={`translate(${rectX + roomW / 2 - 25}, ${rectY + roomH - 35})`}>
              {/* Sofa Backrest */}
              <rect x="0" y="16" width="50" height="10" rx="2" fill={currentTheme.sofa} stroke="#1e293b" strokeWidth="0.5" />
              {/* Sofa Main Seat Cushion */}
              <rect x="3" y="6" width="44" height="12" rx="1.5" fill={currentTheme.sofa} opacity="0.9" stroke="#1e293b" strokeWidth="0.5" />
              {/* Sofa Armrests */}
              <rect x="0" y="6" width="4" height="16" rx="1" fill={currentTheme.sofa} stroke="#1e293b" strokeWidth="0.5" />
              <rect x="46" y="6" width="4" height="16" rx="1" fill={currentTheme.sofa} stroke="#1e293b" strokeWidth="0.5" />
              {/* Coffee table */}
              <rect x="12" y="-5" width="26" height="7" rx="1" fill="#f8fafc" stroke="#64748b" strokeWidth="0.5" />
              <text x="25" y="13" textAnchor="middle" className="text-[6px] fill-white font-bold font-mono uppercase">Sofa Set</text>
            </g>
          )}

          {/* Blueprint Title Banner */}
          <rect x="8" y="8" width="90" height="26" rx="3" fill="#0f172a" opacity="0.9" />
          <text x="14" y="18" className="text-[7px] font-bold font-mono fill-amber-500 uppercase tracking-widest">NKM Blueprint</text>
          <text x="14" y="27" className="text-[6px] font-medium font-mono fill-slate-400">SCALE: 1:50 TO 2D</text>
        </svg>
      </div>

      {/* DIAGRAM POTONGAN VERTIKAL (40% Height Area) */}
      <div className="relative border border-slate-200 rounded-xl overflow-hidden shadow-sm" style={{ height: '145px' }}>
        <svg className="w-full h-full bg-white text-slate-400" viewBox="0 0 400 145">
          <rect width="100%" height="100%" fill="url(#main-grid)" />

          {/* DYNAMIC HEIGHT FORMULATION */}
          {/* Ceiling line and height scale */}
          {/* tinggi ranges from 2.5m to 3.5m. Let's map floor = 115px, 1 meter = 24px */}
          {/* 3.5m is 84px height, 2.5m is 60px height. */}
          {/* ceiling_y is 115 - (tinggi * 24). For 2.8m, ceiling_y is 115 - 67.2 = 47.8px */}
          {/* Let's define ceiling_y mathematically: */}
          {(() => {
            const floorY = 115;
            const hMeter = tinggi * 21.5;
            const ceilingY = floorY - hMeter;

            return (
              <g className="transition-all duration-300">
                {/* FLOOR LINE */}
                <line x1="20" y1={floorY} x2="380" y2={floorY} stroke="#1e293b" strokeWidth="2.5" />
                <text x="45" y={floorY + 12} className="text-[8px] font-mono font-bold fill-slate-500">LANTAI (FINISH ±0.00)</text>

                {/* CEILING LINE: PLAFOND DROP CEILING OR FLAT */}
                {isPlafond ? (
                  <g>
                    {/* Glowing yellow background representation for drop ceiling light */}
                    <path d={`M 50 ${ceilingY} L 110 ${ceilingY} L 115 ${ceilingY - 6} L 285 ${ceilingY - 6} L 290 ${ceilingY} L 350 ${ceilingY}`} fill="none" stroke="#fef08a" strokeWidth="8" opacity="0.6" className="animate-pulse" />
                    {/* Drop Ceiling profile */}
                    <path d={`M 50 ${ceilingY} L 110 ${ceilingY} L 110 ${ceilingY - 6} L 290 ${ceilingY - 6} L 290 ${ceilingY} L 350 ${ceilingY}`} fill="none" stroke="#334155" strokeWidth="2" />
                    {/* Glow light effect under drop edges */}
                    <circle cx="112" cy={ceilingY - 3} r="2" fill="#fbbf24" />
                    <circle cx="288" cy={ceilingY - 3} r="2" fill="#fbbf24" />
                    <text x="200" y={ceilingY - 12} textAnchor="middle" className="text-[8px] font-mono font-bold fill-amber-700">DROP CEILING COVE LIGHT (LED)</text>
                  </g>
                ) : (
                  <line x1="50" y1={ceilingY} x2="350" y2={ceilingY} stroke="#475569" strokeWidth="1.5" />
                )}
                <text x="350" y={ceilingY - 8} textAnchor="end" className="text-[8px] font-mono font-bold fill-slate-500">PLAFOND (H: {tinggi.toFixed(2)}m)</text>

                {/* DIMENSION HEIGHT MEASURE LINE ON LEFT */}
                <g transform="translate(30, 0)">
                  <line x1="5" y1={ceilingY} x2="5" y2={floorY} stroke="#b45309" strokeWidth="0.8" />
                  {/* Ticks */}
                  <line x1="1" y1={ceilingY + 2} x2="9" y2={ceilingY - 2} stroke="#b45309" strokeWidth="1.2" />
                  <line x1="1" y1={floorY + 2} x2="9" y2={floorY - 2} stroke="#b45309" strokeWidth="1.2" />
                  <text x="10" y={ceilingY + (floorY - ceilingY) / 2 + 3} className="text-[9px] font-mono font-black fill-amber-700">{tinggi.toFixed(2)}m</text>
                </g>

                {/* FRONT ELEVATION CABINET REPRESENTATIONS */}
                {isKitchenSet && (
                  <g transform="translate(130, 0)" className="transition-all duration-300">
                    {/* Lower Cabinet (H: 0.85m -> 18.2px scaled) */}
                    {/* from floorY = 115 upwards */}
                    <rect x="0" y={floorY - 18.2} width="140" height="18.2" fill="url(#wood-grain)" stroke={currentTheme.primaryDark} strokeWidth="1" />
                    {/* Countertop layer */}
                    <rect x="0" y={floorY - 20.2} width="140" height="2" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.5" />
                    {/* Cabinet division doors */}
                    <line x1="35" y1={floorY - 18.2} x2="35" y2={floorY} stroke={currentTheme.primaryDark} strokeWidth="0.5" />
                    <line x1="70" y1={floorY - 18.2} x2="70" y2={floorY} stroke={currentTheme.primaryDark} strokeWidth="0.5" />
                    <line x1="105" y1={floorY - 18.2} x2="105" y2={floorY} stroke={currentTheme.primaryDark} strokeWidth="0.5" />

                    {/* Backsplash empty height gap (H: 0.6m -> 12.9px scaled) */}
                    <rect x="0" y={floorY - 33.1} width="140" height="12.9" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2,2" />
                    <text x="70" y={floorY - 25} textAnchor="middle" className="text-[6px] fill-slate-400 font-mono">BACKSPLASH TILE (0.6m)</text>

                    {/* Upper Cabinet (H: 0.8m -> 17.2px scaled) */}
                    <rect x="0" y={floorY - 50.3} width="140" height="17.2" fill="url(#wood-grain)" stroke={currentTheme.primaryDark} strokeWidth="1" />
                    {/* Upper Cabinet door lines */}
                    <line x1="46" y1={floorY - 50.3} x2="46" y2={floorY - 33.1} stroke={currentTheme.primaryDark} strokeWidth="0.5" />
                    <line x1="93" y1={floorY - 50.3} x2="93" y2={floorY - 33.1} stroke={currentTheme.primaryDark} strokeWidth="0.5" />

                    <text x="70" y={floorY - 40} textAnchor="middle" className="text-[7px] font-bold font-mono fill-slate-900 bg-white/60">KITCHEN SET ELEVASI</text>
                  </g>
                )}
              </g>
            );
          })()}

          {/* Section banner */}
          <rect x="8" y="8" width="95" height="14" rx="2" fill="#1e293b" opacity="0.9" />
          <text x="12" y="17" className="text-[6px] font-bold font-mono fill-amber-400 uppercase tracking-wider">WALL ELEVATION SECTION</text>
        </svg>
      </div>
    </div>
  );
}
