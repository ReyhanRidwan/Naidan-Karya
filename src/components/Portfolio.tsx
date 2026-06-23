/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Eye, MapPin, Layers, Layout, Compass, CheckCircle2, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import heroBg from '../assets/images/hero_ruko_indonesia_1782231371472.jpg';
import renovBg from '../assets/images/renovasi_komersial_1782231391194.jpg';

interface Project {
  id: string;
  title: string;
  category: 'ruko' | 'gudang' | 'kantor' | 'baja' | 'interior' | 'mep_cctv';
  categoryLabel: string;
  location: string;
  luas: string;
  material: string;
  status: '100% Selesai' | 'Masa Pemeliharaan';
  image: string | null;
  blueprintType?: 'gudang' | 'baja' | 'interior' | 'cctv_mep';
  specifications: string[];
}

export default function Portfolio() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filters = [
    { value: 'all', label: 'Semua Proyek' },
    { value: 'ruko', label: 'Bangun Ruko' },
    { value: 'gudang', label: 'Konstruksi Gudang' },
    { value: 'kantor', label: 'Renovasi Kantor' },
    { value: 'baja', label: 'Pekerjaan Baja' },
    { value: 'interior', label: 'Interior' },
    { value: 'mep_cctv', label: 'MEP & CCTV' },
  ];

  const projects: Project[] = [
    {
      id: 'proj-ruko-priok',
      title: 'Pembangunan Ruko 2 Lantai Sederhana',
      category: 'ruko',
      categoryLabel: 'Bangun Ruko',
      location: 'Papanggo, Tanjung Priok, Jakarta Utara',
      luas: '150 m²',
      material: 'Pondasi Bore Pile, Beton K-275, Bata Ringan',
      status: '100% Selesai',
      image: heroBg,
      specifications: [
        'Konstruksi pondasi bore pile kedalaman 12 meter',
        'Struktur kolom dan balok beton bertulang mutu K-275 SNI',
        'Dinding bata ringan/hebel di-aci halus dengan cat cat Dulux Weathershield',
        'Lantai ubin granit tile ukuran 60x60 cm premium tahan beban',
        'Atap konstruksi baja ringan dengan penutup genteng metal berpasir',
      ],
    },
    {
      id: 'proj-gudang-penjaringan',
      title: 'Konstruksi Gudang Logistik Sederhana',
      category: 'gudang',
      categoryLabel: 'Konstruksi Gudang',
      location: 'Penjaringan, Jakarta Utara',
      luas: '450 m²',
      material: 'Pondasi Footplat, Baja WF 250, Spandek 0.45',
      status: '100% Selesai',
      image: null,
      blueprintType: 'gudang',
      specifications: [
        'Sistem pondasi footplat cor beton bertulang K-300 terintegrasi',
        'Struktur utama tiang dan balok baja profil WF 250 berkekuatan tinggi',
        'Dinding keliling bata hebel aci setinggi 3 meter disambung dinding spandek',
        'Atap lembaran spandek zincalume tebal 0.45mm dengan insulasi thermal foil',
        'Lantai kerja tebal 15cm dengan pembesian wiremesh M8 & finishing trowel beton',
      ],
    },
    {
      id: 'proj-renov-kantor-pademangan',
      title: 'Renovasi Interior & Fasad Kantor Niaga',
      category: 'kantor',
      categoryLabel: 'Renovasi Kantor',
      location: 'Pademangan, Jakarta Utara',
      luas: '180 m²',
      material: 'Sekat Partisi Gypsum, Kaca Temper, Cat Dulux',
      status: '100% Selesai',
      image: renovBg,
      specifications: [
        'Pembongkaran sekat ruang lama diganti partisi gypsum akustik kedap suara',
        'Pemasangan pintu & dinding kaca temper tebal 10mm untuk ruang meeting utama',
        'Pengecatan ulang fasad luar dengan cat weather shield Dulux',
        'Pengerjaan plafon model drop ceiling dilengkapi lampu warm white LED stripe',
        'Perapian instalasi stop kontak listrik & kabel jaringan internet tersembunyi',
      ],
    },
    {
      id: 'proj-renov-ruko-koja',
      title: 'Perbaikan Total & Pengecatan Ruko 3 Lantai',
      category: 'ruko',
      categoryLabel: 'Bangun Ruko',
      location: 'Koja, Jakarta Utara',
      luas: '220 m²',
      material: 'Semen Waterproofing Sika, Cat Weather Guard, ACP',
      status: '100% Selesai',
      image: renovBg,
      specifications: [
        'Waterproofing dak atas beton rembes dengan pelapis semen SikaTop-107',
        'Pekerjaan fasad depan ruko menggunakan lembaran Aluminium Composite Panel (ACP)',
        'Perbaikan tangga beton struktural & pemasangan railing stainless steel sus 304',
        'Penggantian folding gate lama dengan rolling door besi otomatis modern',
        'Instalasi kelistrikan baru & pergantian fitting lampu hemat energi LED Philips',
      ],
    },
    {
      id: 'proj-baja-priok',
      title: 'Fabrikasi & Pasang Rangka Baja Ringan Atap',
      category: 'baja',
      categoryLabel: 'Pekerjaan Baja',
      location: 'Tanjung Priok, Jakarta Utara',
      luas: '300 m²',
      material: 'Kanal C-75 tct 0.75mm, Reng 0.45mm',
      status: '100% Selesai',
      image: null,
      blueprintType: 'baja',
      specifications: [
        'Perhitungan struktur bentangan bebas menggunakan software truss berstandar',
        'Kanal baja ringan C-75 tebal asli tct 0.75 mm bergaransi pabrik',
        'Sistem perakitan menggunakan screw truss khusus anti karat berkualitas',
        'Pemasangan reng tebal 0.45 mm presisi untuk mencegah genteng meliuk',
        'Pemasangan talang air fiber tebal dengan penopang besi kokoh',
      ],
    },
    {
      id: 'proj-interior-ruko-priok',
      title: 'Interior Fungsional Counter & Ruang Usaha',
      category: 'interior',
      categoryLabel: 'Interior',
      location: 'Papanggo, Tanjung Priok, Jakarta Utara',
      luas: '80 m²',
      material: 'Multiplex Blockboard, HPL Taco, Plafon Gypsum',
      status: 'Masa Pemeliharaan',
      image: null,
      blueprintType: 'interior',
      specifications: [
        'Pembuatan meja counter resepsionis custom bahan multipleks finishing HPL Taco',
        'Pemasangan rak display barang minimalis berpenerangan lampu strip LED spotlight',
        'Pengerjaan sekat partisi backdrop dengan logo perusahaan 3D akrilik menyala',
        'Lantai vinyl tebal 3mm motif kayu jati alam hangat & anti air',
        'Instalasi kelistrikan stop kontak dan saklar tersembunyi di bawah meja kerja',
      ],
    },
    {
      id: 'proj-cctv-kantor',
      title: 'Instalasi CCTV IP & Akses Pintu Kantor',
      category: 'mep_cctv',
      categoryLabel: 'MEP & CCTV',
      location: 'Jakarta Pusat',
      luas: '120 m²',
      material: 'IP Camera Hikvision, Cat6 Cable, RFID Access Door',
      status: '100% Selesai',
      image: null,
      blueprintType: 'cctv_mep',
      specifications: [
        'Pemasangan 8 unit IP Camera 4 Megapixel Full HD dengan sensor infra-red malam hari',
        'Penarikan kabel UTP Cat6 berkualitas di dalam pipa conduit pelindung PVC',
        'Konstruksi bracket kamera besi custom kuat di area outdoor tinggi',
        'Pemasangan kunci pintu magnetik RFID / fingerprint akses keluar masuk staf',
        'Setting konfigurasi monitoring streaming online via handphone owner ruko',
      ],
    },
    {
      id: 'proj-mep-ruko-priok',
      title: 'Peremajaan Instalasi Listrik & Plumbing Ruko',
      category: 'mep_cctv',
      categoryLabel: 'MEP & CCTV',
      location: 'Tanjung Priok, Jakarta Utara',
      luas: '160 m²',
      material: 'Kabel Supreme SNI, Pipa PVC Rucika AW, MCB Schneider',
      status: '100% Selesai',
      image: null,
      blueprintType: 'cctv_mep',
      specifications: [
        'Pembongkaran kabel lama rawan korsleting, diganti kabel Supreme NYM standar SNI',
        'Pemasangan box panel MCB Schneider baru untuk pembagian beban listrik seimbang',
        'Instalasi jalur pipa air bersih menggunakan pipa PVC tipe AW merk Rucika kuat',
        'Pemasangan pompa dorong (booster pump) untuk distribusi air merata ke 3 lantai',
        'Pemasangan sistem grounding bumi pelindung sambaran petir nilai hambatan < 2 Ohm',
      ],
    },
  ];

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedFilter);

  return (
    <section id="portfolio" className="bg-white py-20 md:py-28 relative">
      <div className="absolute inset-0 grid-overlay opacity-25 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold text-brand-orange-500 uppercase tracking-widest font-mono">
            PORTFOLIO NYATA KAMI
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-blue-900 tracking-tight">
            Dokumentasi Pekerjaan Lapangan & Hasil Konstruksi Kami
          </h2>
          <div className="h-1.5 w-24 bg-brand-orange-500 mx-auto rounded-full" />
          <p className="text-slate-600 text-sm md:text-base">
            Kami menampilkan portofolio riil ruko, gudang, renovasi kantor, pengerjaan struktur rangka baja, serta instalasi MEP & CCTV yang telah kami selesaikan di Jakarta dan sekitarnya.
          </p>
        </div>

        {/* Filters Menu Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedFilter(filter.value)}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg border transition-all duration-300 cursor-pointer flex items-center space-x-1.5 ${
                selectedFilter === filter.value
                  ? 'bg-brand-orange-500 border-brand-orange-500 text-white shadow-md'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {filter.value === 'all' && <Layout className="w-3.5 h-3.5" />}
              {filter.value === 'ruko' && <Compass className="w-3.5 h-3.5" />}
              {filter.value === 'gudang' && <Layers className="w-3.5 h-3.5" />}
              {filter.value === 'kantor' && <Sliders className="w-3.5 h-3.5" />}
              <span>{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Masonry-like Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                id={project.id}
                className="bg-slate-50 border border-slate-200/65 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-[400px]"
              >
                {/* Visual Image / Technical blueprint box */}
                <div className="h-48 relative overflow-hidden bg-brand-blue-900 flex items-center justify-center border-b border-slate-200">
                  {project.image ? (
                    <>
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-75"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  ) : (
                    // Stylized Schematic Draw
                    <div className="absolute inset-0 bg-brand-blue-800 p-6 flex flex-col justify-between overflow-hidden">
                      <div className="absolute inset-0 grid-overlay-dark opacity-10 pointer-events-none" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        {/* Blueprint background symbol */}
                        <svg className="w-36 h-36 text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                          <rect x="10" y="10" width="80" height="80" strokeWidth="0.5" strokeDasharray="1,1" />
                          <line x1="10" y1="10" x2="90" y2="90" strokeWidth="0.5" />
                          <line x1="90" y1="10" x2="10" y2="90" strokeWidth="0.5" />
                          <circle cx="50" cy="50" r="25" strokeWidth="1" />
                        </svg>
                      </div>

                      <div className="z-10 bg-brand-orange-500 text-white font-mono text-[9px] px-2 py-0.5 rounded inline-block self-start font-bold uppercase tracking-wider">
                        BLUEPRINT SCHEMATIC
                      </div>

                      <div className="z-10 font-mono text-[10px] text-slate-300">
                        NK-DWG: {project.id.toUpperCase()}
                      </div>
                    </div>
                  )}

                  {/* Project overlay hover button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-brand-blue-900/40 backdrop-blur-sm">
                    <button
                      onClick={() => setActiveProject(project)}
                      className="bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-bold py-2.5 px-5 rounded-lg text-xs tracking-wide uppercase shadow-lg transition-transform duration-300 transform scale-90 group-hover:scale-100 flex items-center space-x-2 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Lihat Spesifikasi Kerja</span>
                    </button>
                  </div>

                  {/* Category overlay badge */}
                  <span className="absolute top-4 left-4 bg-brand-blue-900/95 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider z-10 shadow-sm border border-white/10">
                    {project.categoryLabel}
                  </span>

                  {/* Status indicator */}
                  <span className={`absolute bottom-4 right-4 text-[10px] font-mono font-bold px-2 py-0.5 rounded z-10 shadow-sm ${
                    project.status === '100% Selesai' 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-amber-500 text-white'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Info block */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center text-[11px] text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-brand-orange-500 flex-shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>
                    <h3 className="font-display font-bold text-slate-900 text-base leading-tight group-hover:text-brand-orange-500 transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-slate-200/50 text-xs text-slate-500 space-y-1">
                    <div className="flex justify-between">
                      <span className="font-medium">Luas Kerja:</span>
                      <span className="text-slate-800 font-semibold font-mono">{project.luas}</span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                      <span className="font-medium flex-shrink-0">Spesifikasi Utama:</span>
                      <span className="text-slate-800 font-semibold truncate text-right">{project.material}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dynamic Project Detail Modal */}
        <AnimatePresence>
          {activeProject && (
            <div className="fixed inset-0 bg-brand-blue-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden"
              >
                
                {/* Modal image / blueprint header */}
                <div className="h-56 relative bg-brand-blue-900 flex items-center justify-center">
                  {activeProject.image ? (
                    <img 
                      src={activeProject.image} 
                      alt={activeProject.title} 
                      className="w-full h-full object-cover brightness-[0.7]"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-brand-blue-800 p-8 flex flex-col justify-between overflow-hidden">
                      <div className="absolute inset-0 grid-overlay-dark opacity-10 pointer-events-none" />
                      <div className="bg-brand-orange-500 text-white font-mono text-xs px-2.5 py-1 rounded inline-block self-start font-bold uppercase tracking-wider">
                        BLUEPRINT DETAIL SCHEMATIC
                      </div>
                      <div className="font-mono text-sm text-slate-300">
                        DOC ID: NKM-SYS-{activeProject.id.toUpperCase()}
                      </div>
                    </div>
                  )}

                  {/* Header metadata overlay */}
                  <div className="absolute bottom-4 left-6 right-6 text-white">
                    <span className="bg-brand-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
                      {activeProject.categoryLabel}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold mt-2 leading-tight drop-shadow-md">
                      {activeProject.title}
                    </h3>
                  </div>

                  {/* Close button top right */}
                  <button
                    onClick={() => setActiveProject(null)}
                    className="absolute top-4 right-4 bg-black/60 hover:bg-black/85 text-white p-2 rounded-full cursor-pointer transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Modal body content */}
                <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                  
                  {/* Quick stats grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 border border-slate-100 p-4 rounded-xl text-xs sm:text-sm">
                    <div>
                      <span className="text-slate-400 block mb-0.5 font-medium">Lokasi</span>
                      <span className="font-semibold text-slate-800 flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-brand-orange-500" />
                        {activeProject.location.split(',')[1] || activeProject.location}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-0.5 font-medium">Luas Bangunan</span>
                      <span className="font-semibold text-slate-800 font-mono">{activeProject.luas}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-0.5 font-medium">Status Pekerjaan</span>
                      <span className="font-semibold text-emerald-600 flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                        {activeProject.status}
                      </span>
                    </div>
                  </div>

                  {/* Detailed Specs Checklist */}
                  <div className="space-y-4">
                    <h4 className="font-display font-extrabold text-brand-blue-900 text-base uppercase tracking-wider">
                      Detail Pengerjaan Lapangan (Scope of Work):
                    </h4>
                    
                    <ul className="space-y-3">
                      {activeProject.specifications.map((spec, idx) => (
                        <li key={idx} className="flex items-start text-sm text-slate-600">
                          <span className="mr-3 bg-brand-orange-500/10 text-brand-orange-500 p-1 rounded-full mt-0.5 font-mono text-[10px] leading-none font-bold w-5 h-5 flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Disclaimer & Survey CTA */}
                  <div className="bg-amber-50 border border-amber-200/50 p-4 rounded-xl text-xs text-amber-800 flex items-start space-x-3">
                    <span className="text-amber-500 text-lg leading-none font-bold mt-0.5">⚠️</span>
                    <p className="leading-relaxed">
                      <strong>Spesifikasi Material:</strong> Seluruh spesifikasi dapat disesuaikan kembali dengan anggaran yang Anda tetapkan dalam Rencana Anggaran Biaya (RAB) final.
                    </p>
                  </div>

                </div>

                {/* Modal footer CTA */}
                <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <span className="text-slate-500 text-xs text-center sm:text-left">
                    Ingin hasil konstruksi berkualitas seperti ini?
                  </span>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        setActiveProject(null);
                        const element = document.getElementById('project-survey');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="w-full sm:w-auto bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-bold py-2.5 px-5 rounded-lg text-sm shadow-md transition-colors cursor-pointer text-center"
                    >
                      Dapatkan Survey Gratis
                    </button>
                    <button
                      onClick={() => setActiveProject(null)}
                      className="w-full sm:w-auto bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2.5 px-5 rounded-lg text-sm transition-colors cursor-pointer text-center"
                    >
                      Tutup
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
