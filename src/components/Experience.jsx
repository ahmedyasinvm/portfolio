import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const experiences = [
  {
    company: 'Luminar Technolab',
    role: 'Python Django Full-Stack Developer Trainee',
    period: 'Jun 2025 – Dec 2025',
    bullets: [
      'Engineered end-to-end web applications using Django for backend logic and React for frontend rendering.',
      'Established seamless data exchange between server and client via custom REST APIs.',
      'Integrated secure user authentication, session management, and CRUD functionality within admin panels.',
      'Crafted mobile-responsive UI layouts leveraging Bootstrap and reusable React components.',
      'Refined database performance via Django ORM query optimization.',
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <h2 className="section-title">Professional Log</h2>
        </motion.div>

        <div className="experience-timeline">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              className="exp-card"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              transition={{ delay: i * 0.15 }}
            >
              {/* Index badge */}
              <span className="exp-index">0{i + 1}</span>

              <div className="exp-header">
                <h3 className="exp-company">{exp.company}</h3>
                <span className="exp-badge">{exp.period}</span>
              </div>
              <p className="exp-role">{exp.role}</p>
              <ul className="exp-list">
                {exp.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
