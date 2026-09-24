import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Navbar, type SectionId } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WorkbenchSection } from './components/WorkbenchSection';
import { FeaturesSection } from './components/FeaturesSection';
import { FaqSection } from './components/FaqSection';
import { WorkbenchDashboard } from './pages/WorkbenchDashboard';
import { DocsPage } from './pages/DocsPage';

export function LandingPage() {
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark');
  const [activeSection, setActiveSection] = useState<SectionId>('hero');

  // Parallax Scroll Controller & Theme Transition
  useEffect(() => {
    const handleScroll = () => {
      const featuresEl = document.getElementById('features');
      const faqsEl = document.getElementById('faqs');
      const workbenchEl = document.getElementById('workbench');

      // Dynamic Navbar Theme Switcher (Dark for Hero & Workbench, Light for Features & FAQs)
      if (featuresEl) {
        const featRect = featuresEl.getBoundingClientRect();
        if (featRect.top <= 70) {
          setCurrentTheme('light');
        } else {
          setCurrentTheme('dark');
        }
      }

      // Active Section Detection (Follows each section on scroll)
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 90;

      if (isBottom || (faqsEl && faqsEl.getBoundingClientRect().top <= 140)) {
        setActiveSection('faqs');
      } else if (featuresEl && featuresEl.getBoundingClientRect().top <= 140) {
        setActiveSection('features');
      } else if (workbenchEl && workbenchEl.getBoundingClientRect().top <= 140) {
        setActiveSection('workbench');
      } else {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: SectionId) => {
    let targetEl: HTMLElement | null = null;
    if (sectionId === 'hero') {
      targetEl = document.getElementById('hero');
    } else if (sectionId === 'workbench') {
      targetEl = document.getElementById('workbench');
    } else if (sectionId === 'features') {
      targetEl = document.getElementById('features');
    } else if (sectionId === 'faqs') {
      targetEl = document.getElementById('faqs');
    }

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigate = useNavigate();

  const handleLaunchApp = () => {
    navigate('/workbench');
  };

  return (
    <div className="relative w-full bg-[#000000] text-white selection:bg-white selection:text-black min-h-screen">
      {/* Dynamic Sticky Header following active section */}
      <Navbar
        theme={currentTheme}
        activeSection={activeSection}
        onNavClick={handleNavClick}
        onLaunchClick={handleLaunchApp}
      />

      {/* Main Multi-Section Landing Page */}
      <main className="w-full flex flex-col">
        {/* Section 01: Hero Section */}
        <HeroSection />

        {/* Section 02: Investigator Workbench — Sticky Pinned at Top (z-10) */}
        <div
          id="workbench"
          className="sticky top-0 w-full h-screen z-10 overflow-hidden bg-black flex flex-col justify-center"
        >
          <WorkbenchSection />
        </div>

        {/* Section 03 & 04: Features & FAQs — Elevated White Editorial Sheet Overlapping the Workbench */}
        <div className="relative z-20 bg-white shadow-[0_-30px_90px_rgba(0,0,0,0.85)] border-t border-black/10">
          {/* Section 03: Features with 6 Art Plates */}
          <FeaturesSection />

          {/* Section 04: FAQs Accordion */}
          <FaqSection />

          {/* Global Minimalist Footer */}
          <footer className="w-full bg-white text-black border-t border-black/10 py-8 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono tracking-wider">
            <div className="flex items-center gap-2">
              <span>ZYGØS</span>
              <span className="text-zinc-400">•</span>
              <span className="text-zinc-500">AUTONOMOUS FRAUD INVESTIGATION PLATFORM</span>
            </div>
            <div className="text-zinc-500">
              POWERED BY TIGERGRAPH SAVANNA & NEURO-SYMBOLIC REASONING
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/workbench/*" element={<WorkbenchDashboard />} />
      <Route path="/docs" element={<DocsPage />} />
    </Routes>
  );
}

export default App;
