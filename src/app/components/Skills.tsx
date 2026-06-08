import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skillCategories = [
    {
      title: 'Technical',
      skills: ['C', 'C++', 'Java', 'SQL', 'Python', 'HTML', 'AI Workflow Integration'],
    },
    {
      title: 'Research & Analysis',
      skills: ['Critical Thinking', 'Analytical Reasoning', 'Event Management'],
    },
    {
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
        className="max-w-4xl w-full"
      >
        <h2 className="text-4xl md:text-5xl mb-16 tracking-tight" style={{ fontWeight: 600 }}>
          Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: categoryIndex * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h3 className="text-xl mb-6 text-foreground" style={{ fontWeight: 500 }}>
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-muted-foreground"
                    style={{ fontWeight: 400 }}
                  >
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