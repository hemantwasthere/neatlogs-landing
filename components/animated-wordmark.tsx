"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";

import {
  wordmarkColumns,
  wordmarkGlyphs,
  wordmarkLines,
  wordmarkPath,
  wordmarkViewBox,
} from "@/lib/wordmark";

const liveRadius = 0.5;
const restGlyphs = wordmarkGlyphs.map((glyph) => wordmarkPath(0.38, glyph));
const liveGlyphs = wordmarkGlyphs.map((glyph) => wordmarkPath(liveRadius, glyph));

const spotRadius = wordmarkLines * 0.62;

export function AnimatedWordmark() {
  const ref = React.useRef<HTMLDivElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const spotRef = React.useRef<SVGRadialGradientElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [live, setLive] = React.useState(false);

  const pointerX = useMotionValue(wordmarkColumns / 2);
  const pointerY = useMotionValue(wordmarkLines / 2);
  const spotX = useSpring(pointerX, { stiffness: 240, damping: 28, mass: 0.5 });
  const spotY = useSpring(pointerY, { stiffness: 240, damping: 28, mass: 0.5 });

  React.useEffect(() => {
    const sync = () => {
      const spot = spotRef.current;

      if (!spot) return;

      spot.setAttribute("cx", spotX.get().toFixed(2));
      spot.setAttribute("cy", spotY.get().toFixed(2));
    };

    sync();

    const unsubscribe = [spotX.on("change", sync), spotY.on("change", sync)];

    return () => unsubscribe.forEach((stop) => stop());
  }, [spotX, spotY]);

  const trackPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const box = svgRef.current?.getBoundingClientRect();

    if (!box || box.width === 0) return;

    pointerX.set(((event.clientX - box.left) / box.width) * wordmarkColumns);
    pointerY.set(((event.clientY - box.top) / box.height) * wordmarkLines);
    setLive(true);
  };

  return (
    <div
      ref={ref}
      onPointerMove={trackPointer}
      onPointerLeave={() => setLive(false)}
      className="relative overflow-hidden px-5 pt-10 pb-12 sm:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 tx-hatch opacity-20"
      />

      <svg
        ref={svgRef}
        viewBox={wordmarkViewBox(liveRadius)}
        role="img"
        aria-label="neatlogs"
        className="relative mx-auto block w-full max-w-6xl select-none"
      >
        <defs>
          <radialGradient
            ref={spotRef}
            id="wordmark-spot"
            gradientUnits="userSpaceOnUse"
            r={spotRadius}
          >
            <stop offset="0%" stopColor="#fff" />
            <stop offset="45%" stopColor="#fff" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>

          <mask id="wordmark-spot-mask">
            <rect
              width={wordmarkColumns}
              height={wordmarkLines}
              fill="url(#wordmark-spot)"
            />
          </mask>
        </defs>

        {restGlyphs.map((glyph, index) => (
          <motion.g
            key={index}
            initial={{ opacity: 0, y: 1.4 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{
              delay: index * 0.07,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <path d={glyph} className="fill-ink/[0.11]" />
            <path
              d={liveGlyphs[index]}
              mask="url(#wordmark-spot-mask)"
              className="fill-brand transition-opacity duration-500"
              style={{ opacity: live ? 1 : 0 }}
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
