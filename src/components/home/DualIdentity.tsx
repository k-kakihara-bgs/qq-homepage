import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { IMAGES } from "@/lib/constants";

type IdentityCardProps = {
  imageSrc: string;
  imageAlt: string;
  titleIt: string;
  titleJp: string;
  description: string;
  href: string;
  linkLabel: string;
  delay?: number;
  direction?: "left" | "right";
};

function IdentityCard({
  imageSrc,
  imageAlt,
  titleIt,
  titleJp,
  description,
  href,
  linkLabel,
  delay = 0,
  direction = "left",
}: IdentityCardProps) {
  return (
    <AnimatedSection
      className="relative group overflow-hidden"
      delay={delay}
      direction={direction}
    >
      <div className="relative h-96 md:h-[520px] overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
        <p className="font-heading italic text-gold-light tracking-[0.15em] text-sm mb-2">
          {titleIt}
        </p>
        <h3 className="font-heading-jp text-cream text-2xl md:text-3xl font-light tracking-widest mb-4">
          {titleJp}
        </h3>
        <p className="text-cream/70 text-sm leading-relaxed mb-6 max-w-sm">{description}</p>
        <Link
          href={href}
          className="inline-block text-xs tracking-[0.25em] text-gold-light border-b border-gold/40 pb-1 hover:border-gold-light transition-colors duration-300 font-heading"
        >
          {linkLabel} →
        </Link>
      </div>
    </AnimatedSection>
  );
}

export function DualIdentity() {
  return (
    <section className="bg-cream-dark py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <p className="font-heading text-gold tracking-[0.3em] text-xs mb-4">OUR TWO FACES</p>
          <h2 className="font-heading-jp text-ink text-2xl md:text-3xl font-light tracking-wider">
            ふたつの顔
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <IdentityCard
            imageSrc={IMAGES.quinto}
            imageAlt="Gastronomia Quinto — イタリア食材店"
            titleIt="Gastronomia Quinto"
            titleJp="クィント"
            description="日常を整えるためのイタリア食材店。自家製惣菜、焼きたてフォカッチャ、厳選ワインと食材が並ぶ、毎日訪れたくなるお店。"
            href="/shop"
            linkLabel="ショップを見る"
            delay={0}
            direction="left"
          />
          <IdentityCard
            imageSrc={IMAGES.quinte}
            imageAlt="Degusteria Quinte — レストラン"
            titleIt="Degusteria Quinte"
            titleJp="クィンテ"
            description="非日常の熱気に触れるレストラン。旬の食材とイタリアワインが織りなす、物語のある食体験をお届けします。"
            href="/menu"
            linkLabel="レストランを見る"
            delay={0.15}
            direction="right"
          />
        </div>
      </div>
    </section>
  );
}
