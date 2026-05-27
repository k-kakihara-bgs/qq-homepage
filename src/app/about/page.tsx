import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Divider } from "@/components/ui/Divider";
import { IMAGES } from "@/lib/constants";
import { DualIdentity } from "@/components/home/DualIdentity";

export const metadata: Metadata = {
  title: "コンセプト・About",
  description: "QQ（Quinto.Quinte）のブランドストーリーと、株式会社BGSの理念についてご紹介します。",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="コンセプト"
        titleIt="About QQ"
        imageSrc={IMAGES.concept}
        imageAlt="QQのコンセプト"
      />

      {/* ブランドストーリー */}
      <section className="bg-cream py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection>
            <p className="font-heading text-gold tracking-[0.3em] text-xs mb-6">BRAND STORY</p>
            <h2 className="font-heading-jp text-ink text-2xl md:text-3xl font-light tracking-wider mb-8">
              QQ誕生の背景
            </h2>
            <Divider className="mb-10" />
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="space-y-6 text-ink-muted leading-[2] text-sm md:text-base">
              <p>
                効率化と速度が求められるこの現代において、私たちは問いを立てました。
                <br />
                日常の役割から一度ログアウトして、自然な呼吸を取り戻せる場所は、どこにあるのだろう？
              </p>
              <p>
                家でも、職場や学校でも、よく行くカフェでも、バーチャルな場所でもない——
                <br />
                <strong className="text-ink font-medium">「5番目の場所」</strong>。それがQQ（クイント・クインテ）のはじまりです。
              </p>
              <p>
                レストランで見つけた面白い味やアイデアを、マーケットの棚から選んで、家で気ままに試してみる。そんな風に、非日常のワクワクをいつもの暮らしへと地続きで持ち帰るスタイルが、知らず知らずのうちに、呼吸をすっきりと整えていくということもあるのかもしれない。
              </p>
              <p>
                食材店「<strong className="text-green-deep font-medium">Quinto（クイント）</strong>」と、レストラン「<strong className="text-green-deep font-medium">Quinte（クインテ）</strong>」。ふたつが一つになり、流動的に循環するこの新しいスタイルの店舗を、名古屋・池下にオープンします。
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ブックカバーのメタファー */}
      <section className="bg-ink text-cream py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-cream/70 text-sm md:text-base mb-4">たとえば、それは</p>
            <p className="font-heading italic text-gold-light text-2xl md:text-3xl mb-10 leading-relaxed">
              &ldquo;本の中の自由を包み込むブックカバーのように、
              <br />
              暮らしに「余白という自由」をくれる場所&rdquo;。
            </p>
            <Divider gold className="mb-10 max-w-xs mx-auto" />
            <div className="space-y-6 text-cream/70 leading-[2.2] text-sm md:text-base text-left max-w-2xl mx-auto">
              <p>
                その日の気分で気ままに着せ替えられるその自由を、イタリアの豊かな歴史と、軽やかなユーモアがそっと支えています。
              </p>
              <p>
                一枚のカバーが本と過ごす景色を変えてしまうように。レストランとマーケットを気ままに行き来するうちに、あなたの日常という物語の中身まで、いつの間にか新しく着せ替えられていくということもあるのかもしれない。
              </p>
              <p>
                QQは、そんな静かな変化のそばに、そっと佇む場所でありたいと思っています。
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ふたつの顔 */}
      <DualIdentity />

    </>
  );
}
