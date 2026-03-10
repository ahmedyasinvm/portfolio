import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const projects = [
  {
    icon: '🔍',
    title: 'Lost and Found Application',
    year: '2026',
    tech: ['Django', 'MySQL', 'Bootstrap'],
    desc: 'A full-stack web platform to facilitate the reporting and recovery of missing items, featuring secure user accounts, advanced search filtering, and admin verification workflows.',
  },
  {
    icon: '🎮',
    title: 'Game Shopping Site',
    year: '2025',
    tech: ['Django', 'MySQL', 'JavaScript'],
    desc: 'An e-commerce marketplace enabling users to browse and purchase physical or digital video games, with a relational database schema optimized via Django ORM and a modular JS UI.',
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
            <motion.div
              key={project.title}
              className="project-card"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
            >
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
