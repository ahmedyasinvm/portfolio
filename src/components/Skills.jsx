import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const categories = [
  {
    icon: '⚙️',
    name: 'Backend & Languages',
    skills: ['Python', 'Django', 'Django REST Framework', 'SQL'],
  },
  {
    icon: '🎨',
    name: 'Frontend',
    skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
  },
  {
    icon: '🛠️',
    name: 'Tools & Databases',
    skills: ['MySQL', 'SQLite', 'Git', 'GitHub', 'VS Code'],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="section-title">Tech Arsenal</h2>
        </motion.div>

        <div className="skills-grid">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              className="skill-category-card"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
            >
              <div className="skill-category-icon">{cat.icon}</div>
              <p className="skill-category-name">{cat.name}</p>
              <ul className="skill-list">
                {cat.skills.map((skill) => (
                  <li key={skill} className="skill-pill">{skill}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
