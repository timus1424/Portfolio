import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";

import exampleImage from "figma:asset/c52c4d6bd9bff84a4fe27080ff430c32313e5c28.png";

// Declare spline-viewer custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': any;
    }
  }
}

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const splineRef = useRef<any>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
    
    // Load Spline viewer script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.12.45/build/spline-viewer.js';
    script.onload = () => {
      console.log('Spline viewer script loaded');
      setSplineLoaded(true);
    };
    script.onerror = () => {
      console.error('Failed to load Spline viewer');
      setSplineError(true);
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Initialize Spline scene and set up cursor tracking
  useEffect(() => {
    if (!splineLoaded || splineError) return;

    const splineViewer = document.querySelector('spline-viewer');
    if (!splineViewer) return;

    // Wait for Spline scene to load
    const onSplineLoad = (e: any) => {
      console.log('Spline scene loaded');
      splineRef.current = e.target;
      
      // Log all objects in the scene to find the head
      setTimeout(() => {
        if (splineRef.current) {
          console.log('Spline scene objects:', splineRef.current);
        }
      }, 1000);
    };

    splineViewer.addEventListener('load', onSplineLoad);

    return () => {
      splineViewer.removeEventListener('load', onSplineLoad);
    };
  }, [splineLoaded, splineError]);

  // Track cursor movement and rotate robot head
  useEffect(() => {
    if (!splineLoaded || splineError) return;

    let animationFrameId: number;
    let lastUpdateTime = 0;
    const updateInterval = 1000 / 60; // 60fps limit

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      mousePosition.current = { x, y };
    };

    const animate = (currentTime: number) => {
      // Throttle updates to 60fps
      if (currentTime - lastUpdateTime < updateInterval) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastUpdateTime = currentTime;

      const splineViewer = document.querySelector('spline-viewer') as any;
      
      if (splineViewer && splineViewer.scene) {
        try {
          const { x, y } = mousePosition.current;
          
          // Try to find the robot head or relevant objects
          // Common names: 'Head', 'head', 'Robot Head', 'Character', 'Neck'
          const possibleNames = ['Head', 'head', 'Robot Head', 'robot head', 'Character', 'character', 'Neck', 'neck', 'Face', 'face'];
          
          let headObject = null;
          for (const name of possibleNames) {
            headObject = splineViewer.scene.findObjectByName(name);
            if (headObject) {
              break;
            }
          }

          if (headObject) {
            // Smooth rotation based on cursor position
            const targetRotationY = x * 0.5; // Horizontal rotation (left-right)
            const targetRotationX = y * 0.3; // Vertical rotation (up-down)
            
            // Smooth interpolation for natural movement
            if (headObject.rotation) {
              headObject.rotation.y += (targetRotationY - headObject.rotation.y) * 0.1;
              headObject.rotation.x += (targetRotationX - headObject.rotation.x) * 0.1;
            }
          } else {
            // If no head found, try to rotate the camera subtly
            const camera = splineViewer.scene.findObjectByName('Camera');
            if (camera && camera.rotation) {
              const targetRotationY = x * 0.15;
              const targetRotationX = y * 0.1;
              
              camera.rotation.y += (targetRotationY - camera.rotation.y) * 0.05;
              camera.rotation.x += (targetRotationX - camera.rotation.x) * 0.05;
            }
          }
        } catch (error) {
          // Silently handle errors to avoid console spam
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [splineLoaded, splineError]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Spline 3D Robot Background with Fallback */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {!splineError && splineLoaded ? (
          <spline-viewer 
            url="https://prod.spline.design/ahlgb9x4HVCJja6Q/scene.splinecode"
            events-target="global"
            style={{
              width: '100%',
              height: '100%',
              pointerEvents: 'auto'
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-background">
            <img
              src={exampleImage}
              alt="Robot"
              className="object-contain max-w-2xl opacity-20"
            />
          </div>
        )}
      </div>

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/30 to-black/60 pointer-events-none" />

      {/* Content Overlay */}
      <div className="relative z-20 flex items-center justify-center h-full px-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            isLoaded
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-center max-w-4xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={
              isLoaded
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6"
            style={{
              fontWeight: 600,
              letterSpacing: "-0.03em",
            }}
          >
            SUMIT MINTRI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={
              isLoaded
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-lg md:text-xl text-muted-foreground mb-4"
            style={{ fontWeight: 400 }}
          >
            Computer Science & Engineering Undergraduate
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={
              isLoaded
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto"
            style={{ fontWeight: 300 }}
          >
Engineering student focused on AI-assisted systems, research, and execution-driven problem solving.          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}