import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const projects = [
  {
    icon: '🔍',
    title: 'Lost and Found Application',
    year: '2026',
    tech: ['Django', 'MySQL', 'Bootstrap'],
    desc: 'A full-stack web platform to facilitate the reporting and recovery of missing items, featuring secure user accounts, advanced search filtering, and admin verification workflows.',
    github: 'https://github.com/ahmedyasinvm',
  },
  {
    icon: '🎮',
    title: 'Game Shopping Site',
    year: '2025',
    tech: ['Django', 'MySQL', 'JavaScript'],
    desc: 'An e-commerce marketplace enabling users to browse and purchase physical or digital video games, with a relational database schema optimized via Django ORM and a modular JS UI.',
    github: 'https://github.com/ahmedyasinvm',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.97 },
  show: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 },
  }),
};

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="section-title">Mission Files</h2>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              className="project-card"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            >
              {/* Shimmer overlay */}
              <div className="card-shimmer" />

              <div className="project-card-top">
                <div className="project-icon">{project.icon}</div>
                <div className="project-arrow">↗</div>
              </div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.desc}</p>

              <ul className="project-tech-tags">
                <li className="tech-tag">{project.year}</li>
                {project.tech.map((t) => (
                  <li key={t} className="tech-tag">{t}</li>
                ))}
              </ul>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="projects-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="https://github.com/ahmedyasinvm"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
              <path d="M9 19c-5 1-5-3-7-4m14 8v-3.87a3.37 3.37 0 0 0-.94-2.6c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            See all projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
