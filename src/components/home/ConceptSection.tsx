import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Divider } from "@/components/ui/Divider";

export function ConceptSection() {
  return (
    <section className="bg-ink text-cream py-24 md:py-36 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <AnimatedSection>
          <p className="font-heading text-gold tracking-[0.3em] text-xs md:text-sm mb-8">
            THE FIFTH PLACE
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <h2 className="font-heading-jp text-3xl md:text-5xl font-light leading-relaxed tracking-widest mb-10">
            5番目の場所
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.25}>
          <Divider gold className="mb-10" />
        </AnimatedSection>

        <AnimatedSection delay={0.35}>
          <p className="text-cream/70 leading-[2.2] text-sm md:text-base mb-8">
            家、職場、学校、いつものカフェ――
            <br />
            そのどれでもない、ただの自分に戻る場所。
          </p>
          <p className="text-cream/70 leading-[2.2] text-sm md:text-base mb-8">
            日常の役割から一度ログアウトし、
            <br />
            ふっと自然な呼吸を取り戻す。
            <br />
            それが、QQ です。
          </p>
          <p className="font-heading italic text-gold-light text-xl md:text-2xl mt-12 tracking-wide leading-relaxed">
            &ldquo;本の中の自由を包み込むブックカバーのように、
            <br />
            暮らしに「余白という自由」をくれる場所&rdquo;
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
