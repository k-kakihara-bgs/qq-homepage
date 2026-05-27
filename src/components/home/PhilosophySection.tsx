import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Divider } from "@/components/ui/Divider";

const philosophies = [
  {
    en: "Bridge",
    jp: "ブリッジ",
    description:
      "国内と海外、生産者とゲスト。いつの間にか引かれた境界を、私たちは「食」という共通言語で溶かしていきます。その背後にある「まっすぐな愛着」を物語として編み直し、ゲストと共に続きを綴っていきます。",
    icon: "◇",
  },
  {
    en: "Gather",
    jp: "ギャザー",
    description:
      "誰でも「Ciao!」と気軽に出入りする、イタリアの広場のような場所を創ります。計算されたサービスを超えて、偶然の出会いや予期せぬ会話が生まれる「磁力」を大切に。",
    icon: "◇",
  },
  {
    en: "Savor",
    jp: "セイバー",
    description:
      "私たちは、完成されたマニュアルに安住しません。昨日よりも心地よい関わり方、昨日よりも鮮やかな体験を追求します。変化を恐れず、未完を楽しみながら。",
    icon: "◇",
  },
];

export function PhilosophySection() {
  return (
    <section className="bg-cream py-24 md:py-36 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="font-heading text-gold tracking-[0.3em] text-xs mb-4">OUR STYLE — BGS</p>
          <h2 className="font-heading-jp text-ink text-2xl md:text-3xl font-light tracking-wider mb-4">
            私たちのスタイル
          </h2>
          <Divider className="max-w-xs mx-auto mt-6" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {philosophies.map((item, i) => (
            <AnimatedSection key={item.en} delay={i * 0.15}>
              <div className="text-center space-y-5">
                <div className="text-gold text-2xl">{item.icon}</div>
                <div>
                  <p className="font-heading text-green-deep text-2xl md:text-3xl tracking-wide">
                    {item.en}
                  </p>
                  <p className="text-ink-subtle text-xs tracking-[0.2em] mt-1">{item.jp}</p>
                </div>
                <div className="w-px h-8 bg-gold/30 mx-auto" />
                <p className="text-ink-muted text-sm leading-relaxed">{item.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
