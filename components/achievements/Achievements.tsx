"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { achievements } from "@/data/achievements";
import { Award, Trophy, Star, ExternalLink } from "lucide-react";
import { matrixReveal } from "@/lib/animations";

const iconMap: Record<string, React.ReactNode> = {
  "Smart India Hackathon 2024 [Finalist]": <Award size={14} />,
  "Ideathon 2025 [Winner]": <Trophy size={14} />,
  "Industry-Academia Conclave [Winner]": <Trophy size={14} />,
  "Dynamic Hackathon 2025 [Finalist]": <Award size={14} />,
  "PSG iTech Tech Expo [Winner]": <Trophy size={14} />,
};

const logPrefixes = ["FINAL", "WIN", "WIN", "FINAL", "WIN"];
const logColors = [
  "text-accent",
  "text-amber-400",
  "text-accent",
  "text-accent",
  "text-amber-400",
];

export default function Achievements() {
  return (
    <section id="achievements" className="relative z-10">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-clash text-3xl font-bold text-white md:text-5xl">
            <span className="gradient-text">Achievements</span>
          </h2>
          <p className="mt-2 font-jetbrains text-xs text-white/30">
            <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-accent" />
            {achievements.length} ENTRIES — HIGHLIGHTED:{" "}
            {achievements.filter((a) => a.highlight).length}
          </p>
        </motion.div>

        {/* Console wrapper */}
        <div className="rounded-xl border border-white/[0.06] bg-surface/40 p-4 backdrop-blur-sm md:p-6">
          {/* Console header bar */}
          <div className="mb-4 flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
            <span className="ml-2 font-jetbrains text-[10px] text-white/20">
              achievements.log
            </span>
          </div>

          {/* Log entries */}
          <div className="space-y-2">
            {achievements.map((achievement, i) => (
              <LogEntry
                key={achievement.title}
                achievement={achievement}
                index={i}
                prefix={logPrefixes[i]}
                color={logColors[i]}
              />
            ))}
          </div>

          {/* Blinking cursor */}
          <div className="mt-4 flex items-center gap-2 border-t border-white/[0.06] pt-3">
            <span className="font-jetbrains text-xs text-accent/60">&gt;</span>
            <span className="inline-block h-4 w-2 animate-pulse bg-accent/60" />
          </div>
        </div>
      </div>
    </section>
  );
}

function LogEntry({
  achievement,
  index,
  prefix,
  color,
}: {
  achievement: (typeof achievements)[number];
  index: number;
  prefix: string;
  color: string;
}) {
  const titleRef = useRef<HTMLSpanElement>(null);
  const [revealed, setRevealed] = useState(!achievement.highlight);

  const animateReveal = useCallback(() => {
    if (!titleRef.current || !achievement.highlight) return;
    setRevealed(false);
    matrixReveal(titleRef.current, achievement.title, {
      duration: 1.2,
      delay: index * 0.15,
      onComplete: () => setRevealed(true),
    });
  }, [achievement.highlight, achievement.title, index]);

  useEffect(() => {
    if (!achievement.highlight || !titleRef.current) return;
    const el = titleRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateReveal();
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [achievement.highlight, animateReveal]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group flex items-start gap-3 rounded-lg border border-amber-500/20 p-3 transition-all duration-300 hover:bg-amber-500/[0.04] hover:border-amber-500/30"
    >
      {/* Log prefix */}
      <span
        className={`flex-shrink-0 font-jetbrains text-[10px] font-medium ${color}`}
      >
        [{prefix}]
      </span>

      {/* Icon */}
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-amber-500/10 text-amber-400">
        {iconMap[achievement.title] || <Star size={14} />}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            ref={titleRef}
            className={`font-clash text-sm font-semibold transition-colors duration-300 ${
              revealed ? "text-white group-hover:text-primary" : "text-white"
            }`}
          >
            {achievement.highlight ? "" : achievement.title}
          </span>
          {achievement.highlight && !revealed && (
            <span className="font-jetbrains text-[10px] text-white/20">
              [DECRYPTING...]
            </span>
          )}
          {achievement.highlight && revealed && (
            <span className="font-jetbrains text-[10px] text-accent/50">
              [DECRYPTED]
            </span>
          )}
        </div>
        <p className="mt-0.5 font-inter text-xs text-white/35 leading-relaxed">
          {achievement.description}
        </p>
        {achievement.link && (
          <a
            href={achievement.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1.5 inline-flex items-center gap-1 font-jetbrains text-[10px] text-accent/60 transition-colors hover:text-accent"
          >
            <ExternalLink size={10} />
            View on LinkedIn
          </a>
        )}
      </div>

      {/* Timestamp */}
      <span className="flex-shrink-0 font-jetbrains text-[10px] text-white/15">
        {`${String(index + 1).padStart(2, "0")}:${String(index * 7 + 3).padStart(2, "0")}`}
      </span>
    </motion.div>
  );
}
