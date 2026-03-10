import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          ref={ref}
        >
          <h2 className="section-title">The Human Behind the Code</h2>
        </motion.div>

        <motion.div
          className="about-grid"
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {/* Avatar card */}
          <motion.div className="about-avatar-card" variants={fadeUp}>
            <div className="avatar-ring">
              <div className="avatar-img">
                <img
                  src="/pro.png"
                  alt="Ahmed Yasin - Python Django Developer"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <span
                  className="avatar-initials"
                  style={{
                    display: 'none',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  AY
                </span>
              </div>
            </div>
            <p className="about-name">Ahmed Yasin</p>
            <p className="about-role">Python Django Full-Stack Developer</p>
            <div className="available-badge">
              <span className="status-dot" />
              Open to opportunities
            </div>
            <p className="about-location">
              📍 Kerala, India
            </p>
          </motion.div>

          {/* Bio card */}
          <motion.div className="about-bio-card" variants={fadeUp}>
            <p>
              I got into coding in 2022 when I tried — and failed — to build my own game.
              That failure hooked me. I rebuilt it, then rebuilt it again, and somewhere along the way
              I discovered that what I actually love is engineering
              <strong style={{ color: 'var(--text-primary)' }}> systems that solve real problems</strong> — not just writing code.
            </p>
            <p>
              Today I specialize in{' '}
              <strong style={{ color: 'var(--text-primary)' }}>Python & Django</strong> for backend architecture,
              paired with <strong style={{ color: 'var(--text-primary)' }}>React</strong> on the frontend.
              I care about clean APIs, readable code, and shipping things that actually work.
            </p>

            <div className="divider" />

            <div className="education-block">
              <h5>Education</h5>
              <div className="edu-item">
                <div className="edu-icon">🎓</div>
                <div className="edu-text">
                  <strong>Bachelor of Computer Applications (BCA)</strong>
                  <span>Mahatma Gandhi University (MGU), Kottayam &mdash; 2022–2025</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <a href="/resume.pdf" download className="btn-primary">
                Download Resume
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
