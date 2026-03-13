import { motion } from 'framer-motion';
import './SectionWrapper.css';

/**
 * Wrapper component for each page section with scroll-reveal animation
 */
export default function SectionWrapper({ children, id, className = '', dark = false }) {
  return (
    <motion.section
      id={id}
      className={`section-wrapper ${className} ${dark ? 'dark' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="section-content">
        {children}
      </div>
    </motion.section>
  );
}
