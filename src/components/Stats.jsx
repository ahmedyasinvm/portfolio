import { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const stats = [
  { value: 3, suffix: '+', label: 'Years of Coding', icon: '🗓️' },
  { value: 5, suffix: '+', label: 'Django Apps Shipped', icon: '🚀' },
  { value: 12, suffix: '+', label: 'Tech Stack Components', icon: '⚙️' },
  { value: 15, suffix: '+', label: 'REST APIs Built', icon: '🔗' },
];

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: 'easeOut',
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return controls.stop;
  }, [inView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="stats-section" ref={ref}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="stat-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="stat-top-bar" />
              <p className="stat-icon">{stat.icon}</p>
              <p className="stat-number">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="stat-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
