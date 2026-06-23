/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import HowWeWork from './components/HowWeWork';
import Portfolio from './components/Portfolio';
import RabCalculator from './components/RabCalculator';
import ProjectSurvey from './components/ProjectSurvey';
import ContactFAQ from './components/ContactFAQ';
import Footer from './components/Footer';

export default function App() {
  // State to hold parameters passed from RAB Calculator to the Lead Survey
  const [prefilledSurvey, setPrefilledSurvey] = useState<{
    jenisProyek: string;
    luasBangunan: string;
    lokasiProyek: string;
  } | null>(null);

  const handleCalculateSubmit = (data: {
    jenisProyek: string;
    luasBangunan: string;
    lokasiProyek: string;
  }) => {
    setPrefilledSurvey(data);
  };

  const handleServiceSelect = (jenisProyek: string) => {
    setPrefilledSurvey({
      jenisProyek: jenisProyek,
      luasBangunan: '100',
      lokasiProyek: 'Jakarta Utara',
    });
    
    setTimeout(() => {
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
    }, 100);
  };

  return (
    <div className="relative min-h-screen bg-[#fcfcfd] flex flex-col justify-between selection:bg-brand-orange-500 selection:text-white">
      
      {/* Header and Nav system */}
      <Navbar />

      {/* Main Page Layout modules */}
      <main className="flex-grow">
        
        {/* Hero Banner block */}
        <Hero />

        {/* Core Metrics and Guarantees */}
        <Stats />

        {/* Company profile & Brand Identity */}
        <AboutUs />

        {/* Services tabs catalog */}
        <Services onServiceSelect={handleServiceSelect} />

        {/* 6-step roadmap system */}
        <HowWeWork />

        {/* Project documentation masonry gallery with modals */}
        <Portfolio />

        {/* Interactive RAB Calculator */}
        <RabCalculator onCalculateSubmit={handleCalculateSubmit} />

        {/* Lead Generation survey wizard */}
        <ProjectSurvey 
          prefilledData={prefilledSurvey} 
          onClearPrefilled={() => setPrefilledSurvey(null)} 
        />

        {/* Operating hours, contact cards, and SEO FAQs */}
        <ContactFAQ />

      </main>

      {/* Footer block with SEO indexes */}
      <Footer />

    </div>
  );
}
