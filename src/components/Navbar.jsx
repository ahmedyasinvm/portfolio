import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 2.8 }}
    >
      <a href="#home" className="navbar-brand">
        Ahmed<span>.</span>
      </a>

      <ul className={`navbar-links ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
          <li key={item}>
            <a 
               href={`#${item.toLowerCase()}`}
               onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <a href="mailto:ahmedyasin.git@gmail.com" className="navbar-cta">
          Hire Me ↗
        </a>
        <button 
          className="hamburger" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </motion.nav>
  );
}
