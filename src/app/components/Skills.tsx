import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Code2, Languages, ScanSearch } from 'lucide-react';

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skillCategories = [
    {
    number: '01',
    icon: Code2,
      title: 'Technical',
      skills: ['C', 'C++', 'Java', 'SQL', 'Python', 'HTML', 'AI Workflow Integration'],
    },
    {
    number: '02',
    icon: ScanSearch,
      title: 'Research & Analysis',
      skills: ['Critical Thinking', 'Analytical Reasoning', 'Event Management'],
    },
    {
    number: '03',
    icon: Languages,
      title: 'Language',
      skills: ['English', 'Hindi', 'Nepali'],
    },
  ];

  return (
    <section id="skills" ref={ref} className="min-h-screen flex items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl w-full"
      >
        <div className="mb-12 flex items-end justify-between gap-6 md:mb-16">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-accent">A connected toolkit</p>
            <h2 className="text-4xl tracking-tight text-foreground md:text-6xl" style={{ fontWeight: 600 }}>
              Skills
            </h2>
          </div>
          <span className="hidden pb-2 font-mono text-[10px] tracking-[0.18em] text-muted-foreground sm:block">01 — 03 / CAPABILITIES</span>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="skills-card"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: categoryIndex * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="skills-card__top">
                <span className="skills-card__icon"><category.icon size={19} strokeWidth={1.5} /></span>
                <span className="font-mono text-[10px] tracking-[0.16em] text-accent/80">{category.number} / 03</span>
              </div>
              <h3 className="mb-7 text-xl text-foreground md:text-2xl" style={{ fontWeight: 500 }}>
                {category.title}
              </h3>
              <ul className="skills-card__list">
                {category.skills.map((skill) => (
                  <li key={skill}>
                    <span className="skills-card__dot" aria-hidden="true" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
