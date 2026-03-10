import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const LinkedInIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <line x1="8" y1="11" x2="8" y2="16" />
    <circle cx="8" cy="8" r="1" />
    <path d="M12 16v-3c0-1 1-2 2.5-2s2.5 1 2.5 3v3" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 19c-5 1-5-3-7-4m14 8v-3.87a3.37 3.37 0 0 0-.94-2.6c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" ref={ref}>
      <div className="container">
        <motion.div
          className="contact-inner"
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <motion.div className="contact-left" variants={fadeUp}>
            <h2 className="section-title" style={{ marginBottom: '16px' }}>
              Establish Connection
            </h2>
            <p>
              Open to full-stack opportunities, freelance projects, and collaborations.
              Drop me a line — I usually respond within 24 hours.
            </p>
            <a href="mailto:ahmedyasin.git@gmail.com" className="contact-link">
              ✉ ahmedyasin.git@gmail.com
            </a>
          </motion.div>

          <motion.div className="contact-socials" variants={stagger}>
            <motion.a
              href="https://linkedin.com/in/ahmed-yasin-vm"
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
              variants={fadeUp}
            >
              <div className="social-icon-wrap" style={{ color: 'var(--accent)' }}>
                <LinkedInIcon />
              </div>
              <div className="social-card-text">
                <strong>LinkedIn</strong>
                <span>ahmed-yasin-vm</span>
              </div>
            </motion.a>

            <motion.a
              href="https://github.com/ahmedyasinvm"
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
              variants={fadeUp}
            >
              <div className="social-icon-wrap" style={{ color: 'var(--accent)' }}>
                <GitHubIcon />
              </div>
              <div className="social-card-text">
                <strong>GitHub</strong>
                <span>ahmedyasinvm</span>
              </div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
