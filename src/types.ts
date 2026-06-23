/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceItem {
  id: string;
  title: string;
  category: 'kontraktor' | 'renovasi' | 'interior' | 'mep' | 'cctv';
  description: string;
  items: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'ruko' | 'gudang' | 'kantor' | 'baja' | 'interior' | 'cctv_mep';
  categoryLabel: string;
  description: string;
  location: string;
  specifications: string[];
  imageSrc: string;
  featured?: boolean;
}

export interface SurveyState {
  jenisProyek: string;
  luasBangunan: string; // in m2
  lokasiProyek: string;
  budget: string;
  targetMulai: string;
  nama: string;
  nomorWhatsapp: string;
}

export interface RabInput {
  jenisProyek: 'ruko' | 'gudang' | 'kantor' | 'renovasi_ruko' | 'renovasi_kantor' | 'interior' | 'mep' | 'cctv';
  tipePekerjaan: 'baru' | 'renovasi';
  luasBangunan: number;
  jumlahLantai: number;
  kualitasMaterial: 'standar' | 'menengah' | 'premium';
  lokasiProyek: string;
}

export interface RabResult {
  estimasiMin: number;
  estimasiMax: number;
  durasiMin: number;
  durasiMax: number;
  breakdown: {
    pekerjaanPersiapan: number;
    struktur: number;
    arsitekturFinishing: number;
    mepCctv: number;
  };
}
