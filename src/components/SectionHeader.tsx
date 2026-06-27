import { motion } from "framer-motion";

const sectionFade = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function SectionHeader({ num, title, kicker }: { num: string; title: string; kicker?: string }) {
  return (
    <motion.div
      variants={sectionFade}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mb-14"
    >
      <div className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-3">{num} — {kicker ?? title}</div>
      <div className="flex items-end gap-6">
        <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight">
          {title.split(" ").map((w, i, arr) => (
            <span key={i} className={i === arr.length - 1 ? "gradient-text" : ""}>
              {w}{i < arr.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-accent/40 to-transparent mb-3" />
      </div>
    </motion.div>
  );
}
