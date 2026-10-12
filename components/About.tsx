import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries";
import Reveal from "./Reveal";

export default function About({ t }: { t: Dictionary["about"] }) {
  return (
    <section id="a-propos" className="section bg-canvas">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">{t.eyebrow}</p>
            <h2 className="font-wide mt-5 text-[clamp(28px,3.4vw,42px)] leading-[1.15]">
              {t.title}
            </h2>
            <p className="mt-6 max-w-[540px] text-[18px] leading-[1.5] text-ash">
              {t.text}
            </p>

            <div className="mt-10 flex items-center gap-5">
              <Image
                src="/logo-emblem.png"
                alt=""
                width={165}
                height={384}
                className="h-12 w-auto"
              />
              <div className="text-[14px] leading-[1.45] text-ash">
                <p className="text-ivory">Tunicare Solutions</p>
                <p>{t.place}</p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-3">
            {t.values.map((value, i) => (
              <Reveal key={value.title} delay={i * 100}>
                <div className="card p-8">
                  <h3 className="font-wide text-[21px] leading-[1.2]">{value.title}</h3>
                  <p className="mt-3 text-ash">{value.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
