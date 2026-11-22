import { Navigation } from '@/app/components/Navigation';
import { Hero } from '@/app/components/Hero';
import { About } from '@/app/components/About';
import { Skills } from '@/app/components/Skills';
import { Experience } from '@/app/components/Experience';
import { Projects } from '@/app/components/Projects';
import { Education } from '@/app/components/Education';
import { Contact } from '@/app/components/Contact';
import { Workflow } from '@/app/components/Workflow';

export default function App() {
  return (
    <main id="top" className="bg-background text-foreground">
      <Navigation />
      <Hero />
      <About />
      <Workflow />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
    </main>
  );
}
