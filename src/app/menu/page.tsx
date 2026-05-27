import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { IMAGES } from "@/lib/constants";
import { menuCategories, courseSets, wineList, type CourseSet } from "@/lib/data/menu";
import { DevelopmentBanner } from "@/components/menu/DevelopmentBanner";

export const metadata: Metadata = {
  title: "メニュー",
  description: "Degusteria Quinteのメニューをご紹介します。旬の食材とイタリアワインが織りなす、物語のある食体験をお届けします。",
};

export default function MenuPage() {
  return (
    <>
      <PageHeader
        title="Quinte"
        titleReading="クインテ"
        titleIt="Degusteria"
        subtitle="素材が皿へと飛び出す舞台袖で、シェフの自由な手仕事とワインの対話にふれるレストラン"
        imageSrc={IMAGES.quinte}
        imageAlt="Degusteria Quinte レストラン"
      />

      {/* ─── DINNER 大ブロック（bg-ink で統一） ─── */}
      <div className="bg-ink text-cream">

        {/* ── DINNER 大見出し ── */}
        <section className="pt-20 pb-10 px-6 text-center">
          <AnimatedSection>
            <h2 className="font-heading text-cream tracking-[0.5em] text-3xl mb-6">
              DINNER
            </h2>
            <div className="w-16 h-px bg-gold/40 mx-auto" />
          </AnimatedSection>
        </section>

        {/* ── 導入：テキスト + イラスト ── */}
        <section className="pt-8 pb-20 px-6 max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

              {/* 左: テキスト */}
              <div>
                <p className="font-heading-jp text-cream/60 text-xs leading-relaxed mb-8">
                  現在、シェフとプロデューサーがこの物語を書き上げている最中です。
                  <br />
                  メニューの内容は変更になる場合があります。
                </p>
                <div className="w-8 h-px bg-gold/30 mb-8" />
                <p className="font-heading-jp text-cream/75 text-sm leading-[2.4] tracking-wide">
                  1番ではなく、5番目くらい。
                  <br />
                  そのくらいの距離感が、きっといちばん呼吸しやすいから。
                  <br />
                  池下の路地の奥、イタリア食材店「Quinto」を通り抜けた先に
                  <br />
                  広がるのは、舞台裏の鼓動までが垣間見える場所
                  <br />
                  「Quinte（クインテ）」。
                  <br />
                  ここは、店に並ぶ素材たちがシェフの手によって
                  <br />
                  「一皿」という表舞台へ飛び出す直前の、
                  <br />
                  熱気に満ちた特等席（舞台袖）です。
                  <br />
                  まずは3つのテーマから、今夜のあなたの物語の
                  <br />
                  「始まり」をお選びください。
                  <br />
                  その先に続く「余白」をどう彩るかは、あなた次第。
                  <br />
                  自由に行き来しながら、あなただけの物語を
                  <br />
                  ここで見つけてみてください。
                </p>
              </div>

              {/* 右: イラスト */}
              <div className="flex justify-center">
                <div className="relative w-full max-w-sm">
                  <Image
                    src="/images/menu-intro-illustration.png"
                    alt="Quinte — 舞台袖の特等席"
                    width={550}
                    height={614}
                    className="w-full object-contain"
                    style={{ mixBlendMode: "lighten" }}
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* ── ① 今夜の物語、そのはじまり（THE STORY BEGINS） ── */}
        <section className="border-t border-cream/10 py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection className="text-center mb-14">
              <p className="font-heading italic text-gold tracking-[0.3em] text-sm mb-3">
                THE STORY BEGINS
              </p>
              <h2 className="font-heading-jp text-2xl font-light tracking-wider mb-3">
                今夜の物語、そのはじまり
              </h2>
              <p className="text-cream/80 text-xs tracking-wide">
                まずは3つのコースからお好きなはじまりをお選びください
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courseSets.map((course: CourseSet, i: number) => (
                <AnimatedSection key={course.scene} delay={i * 0.12}>
                  <div className="border border-cream/10 p-8 h-full flex flex-col">
                    {/* 場面番号 */}
                    <p className="font-heading text-cream/55 text-xs tracking-[0.3em] mb-4">
                      Scene {String(course.scene).padStart(2, "0")}
                    </p>

                    {/* イタリア語タイトル */}
                    <p className="font-heading italic text-gold-light text-base tracking-wide leading-snug mb-1">
                      {course.titleIt}
                    </p>

                    {/* 日本語タイトル */}
                    <p className="font-heading-jp text-cream text-sm font-light mb-5">
                      {course.titleJp}
                    </p>

                    {/* ナラティブ */}
                    <div className="border-l border-gold/20 pl-3 mb-6">
                      <p className="text-cream/85 text-xs leading-relaxed italic">
                        {course.narrative}
                      </p>
                      <p className="text-gold/75 text-xs leading-relaxed mt-2">
                        {course.narrativeSub}
                      </p>
                    </div>

                    {/* 料理一覧 */}
                    <div className="space-y-3 mb-6 flex-1">
                      {course.dishes.map((dish) => (
                        <div key={dish.course + dish.name}>
                          <p className="font-heading text-gold/80 text-xs tracking-[0.2em] uppercase mb-0.5">
                            {dish.course}
                          </p>
                          <p className="text-cream/85 text-xs leading-relaxed">{dish.name}</p>
                        </div>
                      ))}
                      <div>
                        <p className="font-heading text-gold/80 text-xs tracking-[0.2em] uppercase mb-0.5">
                          Dolce &amp; Caffè
                        </p>
                        <p className="text-cream/70 text-xs leading-relaxed">{course.dolce}</p>
                      </div>
                    </div>

                    {/* 価格 */}
                    <div className="pt-4 border-t border-cream/10">
                      <p className="font-heading text-2xl text-cream">{course.price}</p>
                    </div>

                    {/* 「物語を広げるなら」提案 */}
                    <p className="text-cream/70 text-xs leading-relaxed mt-3">
                      + {course.suggestion}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.4} className="mt-8 text-center">
              <p className="text-cream/75 text-xs tracking-wide">
                ※ 価格はすべて税込・サービス料10%別途。パン・おしぼり等含む。アレルギーのある方はスタッフにお知らせください。
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* ── ② この物語を広げるなら…（アラカルト） ── */}
        <section className="border-t border-cream/10 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection className="text-center mb-14">
              <p className="font-heading italic text-gold tracking-[0.3em] text-xs mb-3">
                À la carte
              </p>
              <h2 className="font-heading-jp text-2xl font-light tracking-wider mb-3">
                この物語を広げるなら…
              </h2>
              <p className="text-cream/80 text-sm leading-[2] tracking-wide max-w-xl mx-auto mt-4">
                物語を広げる、情景の断片 ――<br />
                選んだ「はじまり」の行間に、あなただけの情景を。<br />
                ここにあるのは、物語に奥行きを与えるためのピースです。<br />
                一皿書き加えるごとに、今夜の物語はより鮮やかに、
                あなたらしく彩られていきます。
              </p>
            </AnimatedSection>

            {/* 4列コンパクト表示 */}
            <AnimatedSection>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
                {menuCategories.map((category) => (
                  <div key={category.id}>
                    {/* カテゴリヘッダー */}
                    <p className="font-heading-jp text-cream text-sm font-medium tracking-wide mb-1">
                      {category.title}
                    </p>
                    <p className="font-heading italic text-gold/70 text-xs mb-3">
                      {category.titleIt}
                    </p>
                    <div className="w-full h-px bg-gold/20 mb-4" />

                    {/* アイテムリスト */}
                    <div className="space-y-4">
                      {category.items.map((item) => (
                        <div key={item.name} className="pb-3 border-b border-cream/10">
                          <p className="text-cream/85 text-xs leading-relaxed mb-0.5">
                            {item.name}
                          </p>
                          <p className="font-heading italic text-cream/80 text-xs mb-1">
                            「{item.description}」
                          </p>
                          <p className="text-cream/80 text-xs leading-relaxed whitespace-pre-line mb-1">
                            {item.poetryText}
                          </p>
                          <p className="font-heading text-gold text-sm">
                            {item.price}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* フッターノート */}
            <AnimatedSection className="mt-14 text-center">
              <p className="font-heading-jp text-cream/60 text-xs leading-relaxed">
                ここは、あなたが書き加えるための場所。
                <br />
                今夜、一番心に残った一皿に、あなただけの名前をつけてみてください。
              </p>
            </AnimatedSection>
          </div>
        </section>

      </div>
      {/* ─── DINNER 大ブロック 終わり ─── */}

      {/* 開発中バナー（Instagramへの導線） */}
      <DevelopmentBanner />

      {/* 準備中エリア */}
      <section className="bg-cream-dark py-16 px-6 text-center">
        <AnimatedSection className="max-w-md mx-auto">
          <p className="font-heading text-ink-subtle tracking-[0.25em] text-xs mb-6">
            COMING SOON
          </p>
          <p className="font-heading-jp text-ink text-lg font-light tracking-wider mb-8">
            現在、準備を進めています
          </p>
          <div className="space-y-4 text-left max-w-xs mx-auto">
            <div className="flex justify-between items-center py-3 border-b border-ink/10">
              <p className="font-heading-jp text-ink-muted text-sm">ランチメニュー</p>
              <p className="font-heading text-ink-subtle text-xs tracking-wider">近日公開予定</p>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-ink/10">
              <p className="font-heading-jp text-ink-muted text-sm">ワインセレクション</p>
              <p className="font-heading text-ink-subtle text-xs tracking-wider">近日公開予定</p>
            </div>
          </div>
          <p className="text-ink-subtle text-xs mt-8 leading-relaxed">
            ※ 価格はすべて税込。サービス料10%別途。パン・おしぼり等含む。
            <br />
            アレルギーのある方はスタッフにお知らせください。
          </p>
        </AnimatedSection>
      </section>

      {/* 予約（準備中） */}
      <section className="bg-cream py-16 px-6 text-center">
        <AnimatedSection>
          <p className="font-heading-jp text-ink text-xl mb-3">ご予約</p>
          <p className="font-heading italic text-ink-subtle text-sm tracking-wide mb-2">Reservations</p>
          <p className="text-ink-muted text-sm">準備中です</p>
        </AnimatedSection>
      </section>
    </>
  );
}
