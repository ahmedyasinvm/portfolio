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
          <a href="#projects" className="btn-primary">View My Work</a>
          <a href="#contact" className="btn-ghost">Get in Touch</a>
        </motion.div>
      </motion.div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
