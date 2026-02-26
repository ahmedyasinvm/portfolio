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
          <p className="eyebrow" style={{ marginBottom: '12px' }}>01 — About</p>
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
                  alt="Ahmed Yasin"
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
              Results-driven Full-Stack Developer specializing in{' '}
              <strong style={{ color: 'var(--text-primary)' }}>Python and Django</strong>{' '}
              with a proven ability to engineer scalable, responsive web solutions. My expertise
              encompasses designing intuitive interfaces, managing complex relational databases,
              and implementing secure RESTful APIs.
            </p>
            <p>
              Proficient in{' '}
              <strong style={{ color: 'var(--text-primary)' }}>React, MySQL, and Bootstrap</strong>,
              with a commitment to writing efficient code and delivering practical, high-quality
              software that solves real problems.
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
