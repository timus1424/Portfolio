import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Mail, Github, Linkedin, FileDown } from 'lucide-react';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const contactLinks = [
    {
      label: 'Email',
      href: 'mailto:timus1424@gmail.com',
      icon: Mail,
    },
    {
      label: 'GitHub',
      href: 'https://github.com/timus1424',
      icon: Github,
    },
    {
      label: 'LinkedIn',
      href: 'www.linkedin.com/in/sumit-mintri-ashborn',
      icon: Linkedin,
    },
    {
      label: 'Resume',
      href: 'https://drive.google.com/file/d/13vhbDXmOfKAAPCVxZqiTFtLrAsO9Y0aC/view?usp=sharing',
      icon: FileDown,
    },
  ];

  return (
    <section id="contact" ref={ref} className="min-h-screen flex items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl w-full"
      >
        <h2 className="text-4xl md:text-5xl mb-16 tracking-tight" style={{ fontWeight: 600 }}>
          Contact
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {contactLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -2 }}
                className="flex items-center gap-4 p-6 border border-border/50 rounded-lg hover:border-accent/50 transition-colors duration-300 group"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted group-hover:bg-accent/10 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
                </div>
                <span className="text-lg text-foreground group-hover:text-accent transition-colors duration-300" style={{ fontWeight: 400 }}>
                  {link.label}
                </span>
              </motion.a>
            );
          })}
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-24 pt-12 border-t border-border/30 text-center"
        >
          <p className="text-muted-foreground/60 text-sm" style={{ fontWeight: 300 }}>
            © {new Date().getFullYear()} Sumit Mintri. Built with precision.
          </p>
        </motion.footer>
      </motion.div>
    </section>
  );
}