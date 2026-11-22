import { useEffect, useRef, useState, type ComponentType } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import asciiPortrait from '@/assets/sumit-ascii-gold.png';
import ashbornLogo from '@/assets/ashborn-mark.png';

type SceneProps = {
  progress: MotionValue<number>;
  onReady: () => void;
  onFallback: () => void;
};

function canUpgradeToWebGL() {
  if (typeof window === 'undefined' || window.innerWidth < 760) return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

  const browser = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  if (browser.connection?.saveData) return false;
  if (browser.deviceMemory !== undefined && browser.deviceMemory < 4) return false;
  if (browser.hardwareConcurrency !== undefined && browser.hardwareConcurrency < 4) return false;

  const probe = document.createElement('canvas');
  const context = probe.getContext('webgl2', { failIfMajorPerformanceCaveat: true });
  if (!context) return false;
  context.getExtension('WEBGL_lose_context')?.loseContext();
  return true;
}

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [Scene, setScene] = useState<ComponentType<SceneProps> | null>(null);
  const [sceneReady, setSceneReady] = useState(false);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end start'],
  });
  const reducedMotion = useReducedMotion();
  const posterRotateY = useTransform(scrollYProgress, [0, 1], [0, 22]);
  const posterRotateX = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const crestRotateY = useTransform(scrollYProgress, [0, 1], [0, 165]);
  const crestRotateX = useTransform(scrollYProgress, [0, 1], [0, 16]);

  useEffect(() => {
    if (!canUpgradeToWebGL()) return;
    let active = true;
    const frame = requestAnimationFrame(() => {
      import('./PhoenixScene')
        .then(({ PhoenixScene }) => {
          if (active) setScene(() => PhoenixScene);
        })
        .catch(() => setScene(null));
    });

    return () => {
      active = false;
      cancelAnimationFrame(frame);
    };
  }, []);

  const usePoster = () => {
    setSceneReady(false);
    setScene(null);
  };

  return (
    <div ref={stageRef} className="hero-stage">
      <section className="hero sticky top-0 isolate min-h-[100svh] h-[100svh] overflow-hidden px-6 pb-16 pt-8 md:px-12">
        <motion.figure
          className="hero-portrait"
          data-scene-ready={sceneReady}
          style={{ rotateY: reducedMotion ? 0 : posterRotateY, rotateX: reducedMotion ? 0 : posterRotateX }}
          aria-label="ASCII art portrait of Sumit Mintri"
        >
          <img src={asciiPortrait} alt="" fetchpriority="high" style={{ opacity: sceneReady ? 0.52 : 1 }} />
          <motion.div
            className="hero-css-crest"
            style={{ rotateY: reducedMotion ? 0 : crestRotateY, rotateX: reducedMotion ? 0 : crestRotateX, opacity: sceneReady ? 0 : 1 }}
            aria-hidden="true"
          >
            <span className="hero-css-crest__frame hero-css-crest__frame--outer" />
            <span className="hero-css-crest__frame hero-css-crest__frame--inner" />
            <span className="hero-css-crest__axis hero-css-crest__axis--horizontal" />
            <span className="hero-css-crest__axis hero-css-crest__axis--vertical" />
            <span className="hero-css-crest__core" />
          </motion.div>
          {Scene && (
            <div className="hero-webgl" style={{ opacity: sceneReady ? 1 : 0 }}>
              <Scene
                progress={scrollYProgress}
                onReady={() => setSceneReady(true)}
                onFallback={usePoster}
              />
            </div>
          )}
          <figcaption>SCROLL STUDY / THREE.JS + CSS FALLBACK</figcaption>
        </motion.figure>

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between">
          <header className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <a href="#top" aria-label="Ashborn home" className="hero-brand"><img src={ashbornLogo} alt="" /></a>
            <span className="hidden sm:inline">Independent mind · India</span>
            <a href="#contact" className="group flex items-center gap-2 text-foreground transition-colors hover:text-accent">
              Let’s talk <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </header>

          <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(250px,0.55fr)]">
            <div className="max-w-4xl">
              <p className="hero-kicker mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-accent">
                <span className="h-px w-8 bg-accent" /> <span className="hero-twinkle">Building with intent</span>
              </p>
              <h1 className="hero-title text-foreground">
                Sumit<br /><span className="hero-title__second">Mintri<span className="text-accent">.</span></span>
              </h1>
              <p className="mt-8 max-w-[20rem] text-base leading-7 text-muted-foreground md:text-lg">
                Computer science student turning complex ideas into thoughtful digital products, useful systems, and better ways of working.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <a href="#projects" className="inline-flex items-center gap-3 rounded-full bg-accent px-5 py-3 text-sm font-medium text-[#17130b] transition-transform hover:-translate-y-0.5">
                  Explore selected work <ArrowDownRight size={16} />
                </a>
                <a href="#about" className="text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground">A little about me</a>
              </div>
            </div>

            <aside className="hero-note hidden border-l border-border pl-6 pb-2 lg:block">
              <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Currently exploring</p>
              <p className="max-w-xs text-sm leading-6 text-foreground">AI workflows, product thinking, and the small details that make technology feel human.</p>
              <a href="#projects" className="mt-7 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-accent">View the work <ArrowUpRight size={13} /></a>
            </aside>
          </div>

          <footer className="flex items-center justify-between border-t border-border pt-5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <span>Portfolio · Main</span>
            <span className="inline-flex items-center gap-2"><span className="hero-scroll-dot" /> Scroll to explore</span>
            <span className="hidden sm:inline">27°10'57.4"N — 88°30′07.9"E</span>
          </footer>
        </div>
      </section>
    </div>
  );
}
