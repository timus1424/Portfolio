import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const experiences = [
    {
      role: 'Cadet',
      organization: 'NCC',
      period: '2024 –– Present',
      responsibilities: [
        'Participated in National Camps for Leadership, Trekking, and Rafting',
        'Completed rigorous fitness drills, building endurance and resilience.',
        'Trained in teamwork & discipline earning multiple certifications and badges',
      ],
    },
    {
      role: 'Deputy Director of Finance; Intern',
      organization: 'SMITMUN',
      period: 'Jan 2025 –– Present',
      responsibilities: [
        'Promoted from Intern to Deputy Director of Finance based on operational performance and organizational contribution.',
        'Assisted in financial coordination, sponsorship outreach, and event planning for large-scale MUN operations.',
        'Conducted candidate interviews and evaluation processes for Executive Board recruitment',
        'Managed reports, spreadsheets, and documentation to support organizational planning and decision-making.',
        'Collaborated with cross-functional teams to improve workflow organization, research accuracy, and event execution',
      ],
    },
    {
      role: 'Member',
      organization: 'Sports Council',
      period: '2025',
      responsibilities: [
        'Coordinated inter-college football tournaments, managing registrations, schedules, and on-field logistics.',
        'Organized marathons with route planning, participant coordination, and volunteer management.',
        'Managed multiple sports events end-to-end, ensuring smooth execution and high participation.',
      ],
    },
    
  ];

  return (
    <section id="experience" ref={ref} className="min-h-screen flex items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl w-full"
      >
        <h2 className="text-4xl md:text-5xl mb-16 tracking-tight" style={{ fontWeight: 600 }}>
          Experience
        </h2>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.organization}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border-l-2 border-accent/30 pl-6 pb-8 last:pb-0"
            >
              <div className="mb-4">
                <h3 className="text-2xl text-foreground mb-1" style={{ fontWeight: 500 }}>
                  {exp.role}
                </h3>
                <div className="flex flex-col md:flex-row md:items-center md:gap-3 text-muted-foreground">
                  <span style={{ fontWeight: 400 }}>{exp.organization}</span>
                  <span className="hidden md:block">•</span>
                  <span className="text-sm text-muted-foreground/70">{exp.period}</span>
                </div>
              </div>

              <ul className="space-y-2">
                {exp.responsibilities.map((resp) => (
                  <li
                    key={resp}
                    className="text-muted-foreground flex items-start"
                    style={{ fontWeight: 400 }}
                  >
                    <span className="mr-3 mt-2 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                    <span>{resp}</span>
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