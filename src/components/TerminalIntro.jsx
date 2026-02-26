import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const lines = [
  'Initializing system ...',
  'Loading developer profile ...',
  'Launching portfolio ...',
];

export default function TerminalIntro({ onComplete }) {
  const [displayed, setDisplayed] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (lineIdx >= lines.length) {
      const timeout = setTimeout(() => {
        setDone(true);
        setTimeout(onComplete, 800);
      }, 600);
      return () => clearTimeout(timeout);
    }

    const current = lines[lineIdx];
    if (charIdx < current.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + current[charIdx]);
        setCharIdx((c) => c + 1);
      }, 28);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + '\n');
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [charIdx, lineIdx, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="terminal-overlay"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <pre className="terminal-text" style={{ whiteSpace: 'pre-wrap' }}>
            {displayed}
          </pre>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
