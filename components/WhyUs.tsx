import type { Dictionary } from "@/lib/dictionaries";
import Reveal from "./Reveal";
import BlurText from "./BlurText";
import SpotlightCard from "./SpotlightCard";

export default function WhyUs({ t }: { t: Dictionary["why"] }) {
  return (
    <section id="pourquoi" className="section">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal className="max-w-[640px]">
          <p className="eyebrow section-eyebrow">{t.eyebrow}</p>
          <BlurText
            text={t.title}
            className="font-wide mt-5 text-[clamp(28px,3.4vw,42px)] leading-[1.15]"
          />
        </Reveal>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {t.reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 90} className="h-full">
              <SpotlightCard className="flex h-full flex-col p-8">
                <span aria-hidden className="block h-px w-8 bg-brand" />
                <h3 className="font-wide mt-6 text-[21px] leading-[1.2]">{reason.title}</h3>
                <p className="mt-3 text-ash">{reason.text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
