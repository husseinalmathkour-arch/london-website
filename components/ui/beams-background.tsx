"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

function createBeam(width: number, height: number): Beam {
  const angle = -35 + Math.random() * 10;
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 30 + Math.random() * 60,
    length: height * 2.5,
    angle,
    speed: 0.6 + Math.random() * 1.2,
    // Gold hues: 30–50
    hue: 30 + Math.random() * 20,
    opacity: 0.08 + Math.random() * 0.12,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
  };
}

interface BeamsCanvasProps {
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
}

// Standalone canvas layer — drop it as an absolute background inside any container
export function BeamsCanvas({ className, intensity = "medium" }: BeamsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const rafRef = useRef<number>(0);
  const visibleRef = useRef<boolean>(true);

  const opacityMap = { subtle: 0.6, medium: 0.8, strong: 1 };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.parentElement?.clientWidth || window.innerWidth;
      const h = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
      beamsRef.current = Array.from({ length: 30 }, () => createBeam(w, h));
    };

    resize();
    window.addEventListener("resize", resize);

    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting },
      { threshold: 0 }
    );
    observer.observe(canvas);

    function resetBeam(beam: Beam, index: number, total: number, w: number, h: number) {
      const col = index % 3;
      const spacing = w / 3;
      beam.y = h + 100;
      beam.x = col * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
      beam.width = 80 + Math.random() * 80;
      beam.speed = 0.4 + Math.random() * 0.5;
      beam.hue = 30 + (index * 20) / total;
      beam.opacity = 0.07 + Math.random() * 0.1;
      return beam;
    }

    function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);
      const pulsing = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2) * opacityMap[intensity];
      const grad = ctx.createLinearGradient(0, 0, 0, beam.length);
      grad.addColorStop(0, `hsla(${beam.hue}, 70%, 65%, 0)`);
      grad.addColorStop(0.1, `hsla(${beam.hue}, 70%, 65%, ${pulsing * 0.5})`);
      grad.addColorStop(0.4, `hsla(${beam.hue}, 70%, 65%, ${pulsing})`);
      grad.addColorStop(0.6, `hsla(${beam.hue}, 70%, 65%, ${pulsing})`);
      grad.addColorStop(0.9, `hsla(${beam.hue}, 70%, 65%, ${pulsing * 0.5})`);
      grad.addColorStop(1, `hsla(${beam.hue}, 70%, 65%, 0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    }

    function animate() {
      if (!canvas || !ctx) return;
      if (visibleRef.current) {
        const w = canvas.width / (window.devicePixelRatio || 1);
        const h = canvas.height / (window.devicePixelRatio || 1);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const total = beamsRef.current.length;
        beamsRef.current.forEach((beam, i) => {
          beam.y -= beam.speed;
          beam.pulse += beam.pulseSpeed;
          if (beam.y + beam.length < -100) resetBeam(beam, i, total, w, h);
          drawBeam(ctx, beam);
        });
      }
      rafRef.current = requestAnimationFrame(animate);
    }

    animate();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [intensity]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={cn("absolute inset-0 pointer-events-none", className)}
        style={{ filter: "blur(15px)", willChange: "transform" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: "rgba(61,13,20,0.18)" }}
      />
    </>
  );
}

// Full-page wrapper (for standalone use)
export function BeamsBackground({ className, intensity = "strong" }: BeamsCanvasProps & { children?: React.ReactNode }) {
  return (
    <div className={cn("relative min-h-screen w-full overflow-hidden", className)} style={{ backgroundColor: "#70212c" }}>
      <BeamsCanvas intensity={intensity} />
    </div>
  );
}
