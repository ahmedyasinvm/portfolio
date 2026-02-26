import { useState, Suspense } from 'react';

import LenisScroll from './components/LenisScroll';
import CanvasLayer from './components/CanvasLayer';
import TerminalIntro from './components/TerminalIntro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Skills from './components/Skills';
import Stats from './components/Stats';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <LenisScroll>
      {/* ──────────────────────────────────────
          Terminal Boot Intro (on top of everything)
      ────────────────────────────────────── */}
      <TerminalIntro onComplete={() => setIntroComplete(true)} />

      {/* ──────────────────────────────────────
          Layer 1: Fixed WebGL Canvas (background)
      ────────────────────────────────────── */}
      <Suspense fallback={null}>
        <CanvasLayer />
      </Suspense>

      {/* ──────────────────────────────────────
          Layer 2: DOM UI (transparent overlay)
      ────────────────────────────────────── */}
      <div className="ui-layer">
        <Navbar />

        <main>
          <Hero visible={introComplete} />
          <Marquee />
          <About />
          <Skills />
          <Stats />
          <Experience />
          <Projects />
          <Contact />
        </main>

        <Footer />
      </div>
    </LenisScroll>
  );
}
