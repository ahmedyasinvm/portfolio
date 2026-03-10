import { useEffect, useRef } from 'react';

const items = [
  'Python · Django · REST APIs',
  'Full-Stack Development',
  'React · JavaScript',
  'MySQL · SQLite',
  'Responsive UI Design',
  'Django ORM · Authentication',
  'Git · GitHub',
  'Web Solutions from Kerala 🇮🇳',
];

export default function Marquee() {
  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {/* Duplicate for seamless loop - aria-hidden to prevent screen reader duplication */}
        {[...items, ...items].map((item, i) => (
          <span 
            key={i} 
            className="marquee-item"
            aria-hidden={i >= items.length ? "true" : undefined}
          >
            {item}
            <span className="marquee-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
