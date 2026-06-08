import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="min-h-screen flex items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl"
      >
        <h2 className="text-4xl md:text-5xl mb-8 tracking-tight" style={{ fontWeight: 600 }}>
          About
        </h2>
        <div className="space-y-6 text-lg md:text-xl leading-relaxed text-muted-foreground">
          <p>
            I’m a Computer Science student interested in building practical systems that combine usability, automation, and analytical thinking. My work ranges from AI-assisted applications and hackathon projects to operational leadership in student organizations.
          </p>
          <p>
            Beyond technical projects, I’ve worked in research-heavy and execution-driven environments through SMITMUN, NCC, and campus event management. These experiences strengthened my ability to coordinate teams, adapt under pressure, and approach problems systematically.
          </p>
          <p>
            I’m currently exploring AI workflows, system design, and product-focused development while continuously improving my technical and problem-solving skills.
          </p>
        </div>
      </motion.div>
    </section>
  );
}