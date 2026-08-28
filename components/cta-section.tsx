"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";
import { CopyCommand } from "@/components/ui/copy-command";
import { CornerTicks } from "@/components/ui/frame";

const reach = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
};

const reachTransition = { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const };

export function CtaSection() {
  return (
    <section id="demo" className="relative overflow-hidden pt-24 pb-0 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10 tx-grid opacity-55" />
      <div className="pointer-events-none absolute inset-0 -z-10 tx-dots opacity-40 [mask-image:radial-gradient(ellipse_50%_60%_at_50%_50%,#000,transparent)]" />
      <div className="pointer-events-none absolute bottom-[-190px] left-1/2 -z-10 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-brand/[0.1] blur-[130px]" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[340px] [mask-image:linear-gradient(to_bottom,transparent,#000_55%)]"
      >
        <Image
          src="/scene/wash.webp"
          alt=""
          width={1400}
          height={933}
          className="h-full w-full object-cover object-bottom opacity-70 mix-blend-multiply"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-2xl bg-raised px-6 py-12 text-center shadow-[inset_0_0_0_1px_var(--color-line)] sm:px-10 sm:py-14"
      >
        <CornerTicks />

        <h2 className="text-[34px] leading-[1] text-balance sm:text-[48px]">
          Start debugging together
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-muted text-balance sm:text-[17px]">
          Free to start, no credit card. Ship your first traced run in the next
          five minutes.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="#start" size="lg" className="w-full sm:w-auto">
            Get started
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
        </div>

        <div className="mt-6 flex justify-center">
          <CopyCommand command="pip install -U neatlogs" />
        </div>
      </motion.div>

      <p className="relative mt-10 text-center font-mono text-[10.5px] tracking-[0.2em] text-faint uppercase sm:mt-12">
        debugging is a team sport
      </p>

      <div className="relative mt-6 h-[128px] sm:mt-8 sm:h-[205px] lg:h-[250px]">
        <motion.div
          variants={reach}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={reachTransition}
          className="absolute bottom-0 left-0 w-[164px] sm:w-[292px] lg:w-[380px]"
        >
          <Image
            src="/scene/dev-solo.webp"
            alt="A developer working alone, reaching out"
            width={620}
            height={387}
            className="h-auto w-full"
          />
        </motion.div>

        <motion.div
          variants={reach}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ ...reachTransition, delay: 0.14 }}
          className="absolute right-0 bottom-0 w-[148px] sm:w-[262px] lg:w-[340px]"
        >
          <Image
            src="/scene/team-group.webp"
            alt="A team reaching back, ready to debug together"
            width={760}
            height={589}
            className="h-auto w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
