import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = ['About', 'Skills', 'Experience', 'Projects', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracker via IntersectionObserver
  useEffect(() => {
    const observers = [];
    navItems.forEach((item) => {
      const el = document.getElementById(item.toLowerCase());
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(item.toLowerCase());
        },
        { threshold: 0.3, rootMargin: '-60px 0px -40% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
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
        {navItems.map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className={activeSection === item.toLowerCase() ? 'active' : ''}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
              {activeSection === item.toLowerCase() && (
                <motion.span
                  className="nav-underline"
                  layoutId="nav-underline"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <a href="mailto:ahmedyasin.git@gmail.com" className="navbar-cta">
          Hire Me ↗
        </a>
        <button
          className={`hamburger ${mobileMenuOpen ? 'is-open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="ham-bar" />
          <span className="ham-bar" />
          <span className="ham-bar" />
        </button>
      </div>
    </motion.nav>
  );
}
