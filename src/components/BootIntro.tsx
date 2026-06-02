import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BOOT_LINES = [
  { cmd: "$ initializing portfolio.kernel --user=kuldeep", out: "[ ok ] kernel handshake established" },
  { cmd: "$ load ai.modules --gpu --tensor", out: "[ ok ] 14 neural modules online" },
  { cmd: "$ connect cloud.services --region=ap-south-1", out: "[ ok ] aws · gcp · azure linked" },
  { cmd: "$ compile spring-boot://backend --opt", out: "[ ok ] 312 classes compiled in 1.42s" },
  { cmd: "$ deploy experience --target=hero", out: "[ ok ] welcome, kuldeep ✦" },
];

function CodeRain() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);
    const chars = "01░▒▓<>/{}[]=+*#$ABCDEF".split("");
    const fontSize = 14 * dpr;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = new Array(cols).fill(0).map(() => Math.random() * -50);
    const draw = () => {
      ctx.fillStyle = "rgba(8, 4, 20, 0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillStyle = Math.random() > 0.97 ? "rgba(232,180,255,0.95)" : "rgba(168,85,247,0.55)";
        ctx.fillText(ch, x, y);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.6;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 opacity-40" aria-hidden />;
}

function TypingLine({ text, onDone, speed = 22 }: { text: string; onDone?: () => void; speed?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i >= text.length) {
      onDone?.();
      return;
    }
    const t = setTimeout(() => setI(i + 1), speed + Math.random() * 18);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, text]);
  return (
    <span>
      {text.slice(0, i)}
      <span className="inline-block w-[7px] h-[1em] align-[-2px] bg-[#a855f7] ml-[2px] animate-pulse" />
    </span>
  );
}

export default function BootIntro({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"typing" | "out" | "done">("typing");
  const [pct, setPct] = useState(0);
  const [exit, setExit] = useState(false);

  // Loading percentage tied to total progress
  useEffect(() => {
    const total = BOOT_LINES.length * 2;
    const progressed = step * 2 + (phase === "out" ? 1 : 0);
    const target = Math.min(100, Math.round((progressed / total) * 100));
    let cur = pct;
    const id = setInterval(() => {
      cur = Math.min(target, cur + 2);
      setPct(cur);
      if (cur >= target) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, phase]);

  useEffect(() => {
    if (phase !== "done") return;
    const t = setTimeout(() => setExit(true), 550);
    const t2 = setTimeout(() => onFinish(), 1250);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [phase, onFinish]);

  // Skip on click / key
  useEffect(() => {
    const skip = () => {
      setPct(100);
      setPhase("done");
    };
    window.addEventListener("keydown", skip, { once: true });
    return () => window.removeEventListener("keydown", skip);
  }, []);

  const current = BOOT_LINES[step];
  const completed = useMemo(() => BOOT_LINES.slice(0, step), [step]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)", scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
          className="fixed inset-0 z-[100] overflow-hidden bg-[#070314] text-foreground"
          onClick={() => {
            setPct(100);
            setPhase("done");
          }}
        >
          {/* animated grid */}
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(168,85,247,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.25) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            }}
          />
          {/* radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.25),_transparent_60%)]" />
          <CodeRain />

          {/* scanline */}
          <motion.div
            initial={{ y: "-10%" }}
            animate={{ y: "110%" }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-[#a855f7]/15 to-transparent blur-md"
          />

          {/* terminal */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-auto flex min-h-screen max-w-3xl items-center px-4 sm:px-6"
          >
            <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_30px_120px_-20px_rgba(168,85,247,0.55)]">
              {/* header */}
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="font-mono text-[11px] tracking-[0.25em] text-white/50">
                  kuldeep@portfolio — zsh — 80×24
                </div>
                <div className="font-mono text-[11px] text-[#a855f7]">●&nbsp;LIVE</div>
              </div>

              {/* body */}
              <div className="px-5 py-6 font-mono text-[13px] sm:text-sm leading-relaxed text-white/85 min-h-[340px]">
                <div className="text-white/40 mb-3">
                  ▲ boot.sequence v2.4.1 · loading portfolio runtime…
                </div>
                {completed.map((l, idx) => (
                  <div key={idx} className="space-y-0.5 mb-2">
                    <div>
                      <span className="text-[#c084fc]">➜</span>{" "}
                      <span className="text-white/90">{l.cmd}</span>
                    </div>
                    <div className="text-[#86efac]">{l.out}</div>
                  </div>
                ))}
                {current && phase !== "done" && (
                  <div className="space-y-0.5 mb-2">
                    <div>
                      <span className="text-[#c084fc]">➜</span>{" "}
                      {phase === "typing" ? (
                        <TypingLine
                          text={current.cmd}
                          onDone={() => setTimeout(() => setPhase("out"), 220)}
                        />
                      ) : (
                        <span className="text-white/90">{current.cmd}</span>
                      )}
                    </div>
                    {phase === "out" && (
                      <motion.div
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25 }}
                        onAnimationComplete={() => {
                          setTimeout(() => {
                            if (step + 1 >= BOOT_LINES.length) setPhase("done");
                            else {
                              setStep(step + 1);
                              setPhase("typing");
                            }
                          }, 180);
                        }}
                        className="text-[#86efac]"
                      >
                        {current.out}
                      </motion.div>
                    )}
                  </div>
                )}

                {phase === "done" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-center"
                  >
                    <div className="font-display text-2xl sm:text-3xl tracking-tight">
                      <span className="bg-gradient-to-r from-[#e8b4ff] via-[#a855f7] to-[#7c3aed] bg-clip-text text-transparent">
                        Welcome, Kuldeep
                      </span>
                    </div>
                    <div className="mt-1 text-[11px] tracking-[0.3em] text-white/40">
                      ENTERING PORTFOLIO
                    </div>
                  </motion.div>
                )}
              </div>

              {/* progress */}
              <div className="border-t border-white/10 px-5 py-3">
                <div className="flex items-center justify-between font-mono text-[11px] text-white/50 mb-2">
                  <span>loading runtime</span>
                  <span className="text-[#a855f7]">{pct.toString().padStart(3, "0")}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#e8b4ff] shadow-[0_0_18px_rgba(168,85,247,0.8)]"
                  />
                </div>
                <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-white/35">
                  <span>press any key · click to skip</span>
                  <span>node · jvm · cuda · edge</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
