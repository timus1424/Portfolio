import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const education = [
    {
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'Sikkim Manipal Institute of Technology',
      year: 'Present',
    },
    {
      degree: 'Higher Secondary',
      institution: 'Birla Divya Jyoti, Siliguri; 80%',
      year: 'Completed on 2024',
    },
    {
      degree: 'Senior Secondary',
      institution: 'Don Bosco, Siliguri; 90%',
      year: 'Completed on 2022',
    },
  ];

  return (
    <section id="education" ref={ref} className="min-h-screen flex items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl w-full"
      >
        <h2 className="text-4xl md:text-5xl mb-16 tracking-tight" style={{ fontWeight: 600 }}>
          Education
        </h2>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 pb-8 border-b border-border/50 last:border-b-0"
            >
              <div>
                <h3 className="text-xl text-foreground mb-1" style={{ fontWeight: 500 }}>
                  {edu.degree}
                </h3>
                <p className="text-muted-foreground" style={{ fontWeight: 400 }}>
                  {edu.institution}
                </p>
              </div>
              <span className="text-muted-foreground/70 text-sm md:text-base whitespace-nowrap">
                {edu.year}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}