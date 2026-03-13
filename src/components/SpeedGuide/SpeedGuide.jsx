import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../common/SectionWrapper';
import './SpeedGuide.css';

const GUIDE_SECTIONS = [
  {
    id: 'training',
    title: '🎯 How to Train Your Ears for Faster Playback',
    content: [
      'Start at 1.25x for a week, then gradually increase by 0.1x increments',
      'Your brain adapts surprisingly fast — what sounds rushed today will feel normal in days',
      'Practice with familiar content first (podcasts, re-reads) before tackling new material',
      'Take breaks when it feels tiring — speed listening is a skill that builds over time',
      'Use variable speeds: faster for intros/outros, slower for complex concepts'
    ]
  },
  {
    id: 'genre',
    title: '📚 Speed Recommendations by Genre',
    content: [
      '<strong>Fiction & Literary:</strong> 1.0x–1.3x — Savor the prose, voice acting, and atmosphere',
      '<strong>Non-fiction & Memoirs:</strong> 1.5x–1.75x — Absorb information efficiently',
      '<strong>Self-help & Business:</strong> 1.75x–2x — Get to actionable insights faster',
      '<strong>Technical & Educational:</strong> 1.25x–1.5x — Balance speed with comprehension',
      '<strong>Thrillers & Mystery:</strong> 1.5x–1.75x — Keep the pace while catching plot details',
      '<strong>Re-listens:</strong> 2x–2.5x — Speed through familiar content'
    ]
  },
  {
    id: 'science',
    title: '🧠 The Science of Speed Listening',
    content: [
      '<strong>Comprehension stays high:</strong> Studies show retention at 1.5x–2x is nearly identical to 1x',
      '<strong>Your brain compensates:</strong> The auditory cortex adapts to compressed speech within minutes',
      '<strong>Time perception shifts:</strong> Normal speed will feel sluggish after a week at 1.5x',
      '<strong>Attention improves:</strong> Faster speeds reduce mind-wandering and increase focus',
      '<strong>Not for everyone:</strong> 10-15% of people prefer 1x, and that\'s perfectly fine'
    ]
  },
  {
    id: 'tips',
    title: '💡 Pro Tips & Best Practices',
    content: [
      'Use bookmarks/notes for passages you want to revisit — don\'t slow down mid-book',
      'Match speed to context: slower when tired, faster during mindless tasks',
      'Consider narrator speed — some speak slowly (speed up), others rush (slow down)',
      'Pause frequently for complex ideas rather than rewinding at slower speeds',
      'Track your "comfort speed" for different genres and adjust accordingly',
      'Remember: the goal is efficiency AND enjoyment — don\'t sacrifice one for the other'
    ]
  }
];

export default function SpeedGuide() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <SectionWrapper id="speed-guide">
      <h2 className="section-title">Speed Listening Guide</h2>
      <p className="section-description">
        Everything you need to know about faster audiobook playback
      </p>

      <div className="guide-container">
        {GUIDE_SECTIONS.map((section, index) => (
          <motion.div
            key={section.id}
            className="guide-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              className={`guide-header ${openSection === section.id ? 'open' : ''}`}
              onClick={() => toggleSection(section.id)}
            >
              <span className="guide-title">{section.title}</span>
              <span className="guide-icon">{openSection === section.id ? '−' : '+'}</span>
            </button>

            <AnimatePresence>
              {openSection === section.id && (
                <motion.div
                  className="guide-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ul className="guide-list">
                    {section.content.map((item, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="guide-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <p className="footer-text">
          <strong>Remember:</strong> Speed listening is a personal journey. Start slow, experiment often,
          and find what works best for you. The "perfect" speed is the one that keeps you engaged and
          enjoying your books. Happy listening! 🎧
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
