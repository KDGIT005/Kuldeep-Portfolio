import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; hue: number };
type Burst = { x: number; y: number; life: number; max: number; hue: number };
type Ring = { x: number; y: number; life: number; max: number; hue: number };

export default function CursorTrail() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Skip on touch devices
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: P[] = [];
    const bursts: Burst[] = [];
    const rings: Ring[] = [];
    let mouse = { x: -1000, y: -1000, px: -1000, py: -1000 };
    let raf = 0;
    let last = 0;

    const onMove = (e: MouseEvent) => {
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const dx = mouse.x - mouse.px;
      const dy = mouse.y - mouse.py;
      const dist = Math.hypot(dx, dy);
      // Spawn fewer particles — max 2 per move event
      const count = Math.min(2, Math.floor(dist / 10));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 4,
          y: mouse.y + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5 - 0.15,
          life: 0,
          max: 50 + Math.random() * 30,
          size: 1.5 + Math.random() * 1.5,
          hue: 280 + Math.random() * 40,
        });
      }
      // Tighter cap on particle count
      if (particles.length > 80) particles.splice(0, particles.length - 80);
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // Click burst — spawn ring of particles + expanding ring
    const onClick = (e: MouseEvent) => {
      const cx = e.clientX;
      const cy = e.clientY;
      const burstHue = 280 + Math.random() * 40;
      // Spawn 12 particles in a ring pattern
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12;
        const speed = 1.5 + Math.random() * 1;
        bursts.push({
          x: cx,
          y: cy,
          life: 0,
          max: 40 + Math.random() * 20,
          hue: burstHue + (Math.random() - 0.5) * 20,
        });
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          max: 35 + Math.random() * 15,
          size: 2 + Math.random() * 1.5,
          hue: burstHue + (Math.random() - 0.5) * 20,
        });
      }
      // Expanding ring
      rings.push({ x: cx, y: cy, life: 0, max: 30, hue: burstHue });
      if (particles.length > 120) particles.splice(0, particles.length - 120);
    };
    window.addEventListener("click", onClick, { passive: true });

    const tick = (t: number) => {
      const dt = Math.min(32, t - last);
      last = t;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Simple dot rendering — no connecting lines, no per-particle gradients
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt * 0.06;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.002;
        const t01 = p.life / p.max;
        if (t01 >= 1) {
          particles.splice(i, 1);
          continue;
        }
        const alpha = (1 - t01) * 0.7;
        const r = p.size * (1 + t01 * 0.8);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = `hsl(${p.hue}, 90%, 70%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render expanding click rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.life += dt * 0.08;
        const t01 = ring.life / ring.max;
        if (t01 >= 1) {
          rings.splice(i, 1);
          continue;
        }
        const radius = t01 * 40;
        const alpha = (1 - t01) * 0.5;
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = `hsl(${ring.hue}, 90%, 70%)`;
        ctx.lineWidth = 2 * (1 - t01);
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-screen"
    />
  );
}
