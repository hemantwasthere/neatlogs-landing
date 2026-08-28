"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { CopyCommand } from "@/components/ui/copy-command";
import { HeroTrace } from "@/components/hero-trace";
import { ArrowRight } from "@/components/ui/icons";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const transition = { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const };

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-0 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 -z-20 tx-grid opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[420px] tx-dots opacity-40 [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
      <div className="pointer-events-none absolute top-[-220px] left-1/2 -z-10 h-[460px] w-[900px] -translate-x-1/2 rounded-full bg-brand/[0.09] blur-[130px]" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 hidden w-[1152px] -translate-x-1/2 lg:block"
      >
        <span className="absolute inset-y-0 left-0 w-px bg-line/70" />
        <span className="absolute inset-y-0 right-0 w-px bg-line/70" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.09 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeUp} transition={transition}>
            <a
              href="#loop"
              className="group inline-flex items-center gap-2 bg-raised py-1 pr-2.5 pl-1 font-mono text-[11px] tracking-[0.06em] text-muted uppercase shadow-[inset_0_0_0_1px_var(--color-line)] transition-colors hover:text-ink"
            >
              <span className="bg-brand px-1.5 py-0.5 text-[10px] font-bold text-raised">
                New
              </span>
              Root-cause analysis on every failing trace
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={transition}
            className="mt-7 text-[42px] leading-[0.95] font-black text-balance sm:text-[64px] lg:text-[76px]"
          >
            From feedback to fix,
            <span className="relative ml-3 inline-block">
              <span className="relative z-10 text-brand">fast</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: 0.75,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-x-0 bottom-[0.04em] z-0 h-[0.1em] origin-left bg-brand"
              />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={transition}
            className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-muted text-balance sm:text-[17.5px]"
          >
            Neatlogs is the collaborative debugging workspace for AI agents. Trace
            every run, align on what actually failed, and ship the fix — without
            leaving the thread.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={transition}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button href="#start" size="lg" className="w-full sm:w-auto">
              Start free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button
              href="#demo"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Book a demo
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={transition}
            className="mt-6 flex flex-col items-center gap-2.5"
          >
            <CopyCommand command="pip install -U neatlogs" />
            <p className="font-mono text-[10.5px] tracking-[0.1em] text-faint uppercase">
              two lines to your first trace · no credit card
            </p>
          </motion.div>
        </motion.div>

        <div className="mx-auto mt-16 max-w-4xl sm:mt-20">
          <HeroTrace />
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none mt-12 sm:mt-16">
        <Image
          src="/scene/skyline.webp"
          alt=""
          width={2400}
          height={224}
          sizes="100vw"
          className="h-auto w-full opacity-[0.5] grayscale-[0.8] [mask-image:linear-gradient(to_right,transparent,#000_14%,#000_86%,transparent)]"
        />
      </div>
    </section>
  );
}
