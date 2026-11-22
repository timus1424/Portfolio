import { useEffect, useRef } from 'react';
import type { MotionValue } from 'motion/react';
import * as THREE from 'three';

type PhoenixSceneProps = {
  progress: MotionValue<number>;
  onReady: () => void;
  onFallback: () => void;
};

export function PhoenixScene({ progress, onReady, onFallback }: PhoenixSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgress = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
    } catch {
      onFallback();
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
    camera.position.set(0, 0, 10.8);
    renderer.setClearColor(0x09090b, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;

    scene.add(new THREE.AmbientLight(0xf4e8d2, 1.55));
    const keyLight = new THREE.PointLight(0xff8a3d, 42, 12);
    keyLight.position.set(-3, 2.8, 4.5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xffc96b, 28, 10);
    rimLight.position.set(3, -1, 3);
    scene.add(rimLight);

    const study = new THREE.Group();
    scene.add(study);
    const gold = new THREE.LineBasicMaterial({ color: 0xffc66e, transparent: true, opacity: 0.92 });
    const ember = new THREE.LineBasicMaterial({ color: 0xf36d3d, transparent: true, opacity: 0.8 });
    [3.2, 2.45, 1.7].forEach((size, index) => {
      const frameGeometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(size, size, size * 0.22));
      const frame = new THREE.LineSegments(frameGeometry, index === 1 ? ember : gold);
      frame.rotation.z = index % 2 === 0 ? Math.PI / 4 : -Math.PI / 4;
      frame.rotation.x = index === 1 ? Math.PI / 7 : -Math.PI / 10;
      frame.position.z = (index - 1) * 0.18;
      study.add(frame);
    });
    const core = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.32, 0),
      new THREE.MeshStandardMaterial({ color: 0xffb45e, emissive: 0x7c3015, emissiveIntensity: 1.4, metalness: 0.65, roughness: 0.24 }),
    );
    study.add(core);
    onReady();

    let width = 0;
    let height = 0;
    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      const scale = Math.min(1, height / 430);
      study.scale.setScalar(scale);
      study.position.x = width < 520 ? 0.12 : 0.08;
    };
    const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(resize);
    resizeObserver?.observe(host);
    resize();

    let raf = 0;
    let running = false;
    let inView = false;
    let startTime = 0;
    let probeFrames = 0;
    let probeComplete = false;
    const render = (now: number) => {
      if (!running) return;
      if (!startTime) startTime = now;
      probeFrames += 1;
      const elapsed = now - startTime;
      const scroll = scrollProgress.current;
      study.rotation.y = 0.14 + scroll * 2.05 + elapsed * 0.00007;
      study.rotation.x = 0.035 + Math.sin(scroll * Math.PI) * 0.09;
      renderer.render(scene, camera);

      if (!probeComplete && elapsed >= 1000) {
        probeComplete = true;
        if (probeFrames * 1000 / elapsed < 40) {
          running = false;
          onFallback();
          return;
        }
      }
      raf = requestAnimationFrame(render);
    };
    const start = () => {
      if (running || !inView || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(render);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    }, { threshold: 0.01 });
    if (observer) observer.observe(host);
    else {
      inView = true;
      start();
    }
    const visibilityChange = () => document.hidden ? stop() : start();
    const contextLost = (event: Event) => {
      event.preventDefault();
      stop();
      onFallback();
    };
    canvas.addEventListener('webglcontextlost', contextLost, false);
    document.addEventListener('visibilitychange', visibilityChange);
    const unsubscribe = progress.on('change', (value) => {
      scrollProgress.current = value;
    });
    scrollProgress.current = progress.get();

    return () => {
      stop();
      unsubscribe();
      observer?.disconnect();
      resizeObserver?.disconnect();
      canvas.removeEventListener('webglcontextlost', contextLost);
      document.removeEventListener('visibilitychange', visibilityChange);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, [progress]);

  return <canvas ref={canvasRef} className="hero-webgl__canvas" aria-hidden="true" />;
}
