import { Capabilities } from "@/components/capabilities";
import { ContrastSection } from "@/components/contrast-section";
import { CtaSection } from "@/components/cta-section";
import { Faq } from "@/components/faq";
import { FrameworkMarquee } from "@/components/framework-marquee";
import { Hero } from "@/components/hero";
import { Integrations } from "@/components/integrations";
import { LoopSection } from "@/components/loop-section";
import { SetupSection } from "@/components/setup-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { SmoothAnchors } from "@/components/smooth-anchors";
import { TraceWorkspace } from "@/components/trace-workspace";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <FrameworkMarquee />
        <ContrastSection />
        <TraceWorkspace />
        <LoopSection />
        <Capabilities />
        <SetupSection />
        <Integrations />
        <Faq />
        <CtaSection />
      </main>
      <SiteFooter />
      <SmoothAnchors />
    </>
  );
}
