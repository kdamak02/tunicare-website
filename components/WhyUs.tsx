import type { Dictionary } from "@/lib/dictionaries";
import Reveal from "./Reveal";

export default function WhyUs({ t }: { t: Dictionary["why"] }) {
  return (
    <section className="section bg-canvas">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal className="max-w-[640px]">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="font-wide mt-5 text-[clamp(28px,3.4vw,42px)] leading-[1.15]">
            {t.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {t.reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 90} className="h-full">
              <div className="card flex h-full flex-col p-8">
                <span aria-hidden className="block h-px w-8 bg-brand" />
                <h3 className="font-wide mt-6 text-[21px] leading-[1.2]">{reason.title}</h3>
                <p className="mt-3 text-ash">{reason.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
