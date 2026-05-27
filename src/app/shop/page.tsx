import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Divider } from "@/components/ui/Divider";
import { IMAGES } from "@/lib/constants";
import { shopCategories } from "@/lib/data/shop";

export const metadata: Metadata = {
  title: "ショップ",
  description: "Gastronomia Quintoの商品をご紹介します。自家製惣菜、焼きたてフォカッチャ、厳選チーズ・生ハム、イタリア食材とワインが揃います。",
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        title="Quinto"
        titleReading="クイント"
        titleIt="Gastronomia"
        subtitle="厨房の即興から届くデリを、棚のユニークなグロッサリーと重ねて持ち帰る食材店"
        imageSrc={IMAGES.quinto}
        imageAlt="Gastronomia Quinto 食材店"
      />

      {/* ショップコンセプト */}
      <section className="bg-ink text-cream py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedSection>
            <p className="font-heading italic text-gold-light text-2xl md:text-3xl mb-8 leading-relaxed">
              &ldquo;美味しい循環&rdquo;
            </p>
            <p className="text-cream/70 text-sm leading-[2.2]">
              厨房の仕込みから生まれる一期一会のデリと、まだ見ぬ土地の記憶を宿すグロッサリー。
              <br />
              選び抜かれた素材や調味料は、時にマーケットの棚に並び、時にディナーの一皿へと溶け込んでいく。
              <br />
              レストランと物販が境界なく響き合う、QQの「美味しい循環」。
              <br />
              あなたの食卓に、そっと心地よい余白を広げます。
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 商品カテゴリー */}
      {shopCategories.map((category, ci) => (
        <section
          key={category.id}
          className={`py-20 px-6 ${ci % 2 === 0 ? "bg-cream" : "bg-cream-dark"}`}
        >
          <div className="max-w-5xl mx-auto">
            <AnimatedSection className="mb-12">
              <p className="font-heading italic text-gold tracking-wide text-sm mb-1">
                {category.titleIt}
              </p>
              <h2 className="font-heading-jp text-ink text-2xl font-light tracking-wider mb-3">
                {category.title}
              </h2>
              <p className="text-ink-muted text-sm leading-relaxed">
                {category.description
                  .split("。")
                  .filter(Boolean)
                  .map((sentence, i, arr) => (
                    <span key={i}>
                      {sentence}。{i < arr.length - 1 && <br />}
                    </span>
                  ))}
              </p>
              <Divider className="mt-6" />
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {category.products.map((product, i) => (
                <AnimatedSection key={product.name} delay={i * 0.1}>
                  <div className="bg-white/50 p-6 h-full flex flex-col">
                    {product.illustration && (
                      <div className="mb-4 -mx-6 -mt-6 overflow-hidden aspect-video">
                        <Image
                          src={product.illustration}
                          alt={product.name}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-heading-jp text-ink font-medium mb-1">{product.name}</p>
                      {product.nameIt ? (
                        <p className="font-heading italic text-ink-subtle text-xs mb-3">
                          {product.nameIt}
                        </p>
                      ) : null}
                      <p className="text-ink-muted text-sm leading-relaxed">{product.description}</p>
                      {product.note ? (
                        <p className="text-ink-subtle text-xs mt-3">※ {product.note}</p>
                      ) : null}
                    </div>
                    <div className="mt-4 pt-4 border-t border-ink/10 flex justify-end">
                      <p className="font-heading text-green-deep">{product.price}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* 注意事項 */}
      <section className="bg-cream py-12 px-6">
        <AnimatedSection className="max-w-3xl mx-auto">
          <div className="border border-ink/10 p-8 text-center">
            <p className="font-heading-jp text-ink text-sm mb-4">ご来店にあたって</p>
            <Divider className="mb-6 max-w-xs mx-auto" />
            <div className="space-y-2 text-ink-muted text-xs leading-relaxed">
              <p>惣菜・フォカッチャは売り切れ次第終了となります。お早めのご来店をお勧めします。</p>
              <p>商品の内容は仕入れ状況により変わる場合があります。</p>
              <p>価格はすべて税込表示です。</p>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
