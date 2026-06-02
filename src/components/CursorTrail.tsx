import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; hue: number };

export default function CursorTrail() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
      const count = Math.min(3, Math.floor(dist / 6));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 4,
          y: mouse.y + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6 - 0.2,
          life: 0,
          max: 60 + Math.random() * 40,
          size: 1 + Math.random() * 2,
          hue: 280 + Math.random() * 40,
        });
      }
      if (particles.length > 220) particles.splice(0, particles.length - 220);
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = (t: number) => {
      const dt = Math.min(32, t - last);
      last = t;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 6400) {
            const alpha = (1 - d2 / 6400) * 0.12 * (1 - a.life / a.max);
            ctx.strokeStyle = `hsla(${a.hue},90%,70%,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

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
        const alpha = (1 - t01) * 0.85;
        ctx.beginPath();
        const r = p.size * (1 + t01 * 1.5);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        grad.addColorStop(0, `hsla(${p.hue},95%,75%,${alpha})`);
        grad.addColorStop(1, `hsla(${p.hue},95%,55%,0)`);
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
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
