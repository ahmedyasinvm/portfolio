import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero({ visible }) {
  return (
    <section className="hero-section" id="home" style={{ position: 'relative' }}>
      {/* Ambient floating orbs */}
      <div className="orb-scene">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={visible ? 'show' : 'hidden'}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <motion.div className="hero-eyebrow" variants={itemVariants}>
          Available for Full-Stack roles
        </motion.div>

        <motion.h1 className="hero-title" variants={itemVariants}>
          Building the Web with{' '}
          <span className="name-highlight">Ahmed Yasin</span>
        </motion.h1>

        <motion.p className="hero-sub" variants={itemVariants}>
          Python &amp; Django Full-Stack Developer — crafting scalable APIs,
          interactive frontends, and real-world solutions from Kerala, India.
        </motion.p>

        <motion.div className="hero-actions" variants={itemVariants}>
          <a href="/resume.pdf" download className="btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download Resume
          </a>
          <a href="#projects" className="btn-ghost">View My Work</a>
        </motion.div>
      </motion.div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
