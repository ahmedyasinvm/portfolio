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

const techStack = [
  { label: 'Python', emoji: '🐍' },
  { label: 'Django', emoji: '🟩' },
  { label: 'React', emoji: '⚛️' },
  { label: 'REST API', emoji: '🔗' },
  { label: 'MySQL', emoji: '🗄️' },
];

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
        className="hero-content"
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

        {/* Tech Stack Pills */}
        <motion.div className="hero-tech-row" variants={itemVariants}>
          {techStack.map((tech) => (
            <span key={tech.label} className="hero-tech-pill">
              <span>{tech.emoji}</span>
              {tech.label}
            </span>
          ))}
        </motion.div>

        <motion.div className="hero-actions" variants={itemVariants}>
          <a href="/resume.pdf" download className="btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', flexShrink: 0 }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </a>
          <a href="#projects" className="btn-ghost">View My Work →</a>
        </motion.div>
      </motion.div>

      {visible && (
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span>Scroll</span>
          <div className="scroll-line" />
        </motion.div>
      )}
    </section>
  );
}
