import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Divider } from "@/components/ui/Divider";
import { IMAGES, SITE_INFO } from "@/lib/constants";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "採用情報",
  description: "QQ（Quinto.Quinte）では一緒に働く仲間を募集しています。オープニングスタッフとして、新しいスタイルの店舗づくりに参加しませんか。",
};

const styles = [
  {
    en: "Bridge",
    description:
      "国内と海外、生産者とゲスト。いつの間にか引かれた境界を、私たちは「食」という共通言語で溶かしていきます。単にモノを運ぶのではなく、その背後にある「まっすぐな愛着」や「大切にしている心地よさ」を物語として編み直し、ゲストと共に、その更に続きを綴っていきます。",
  },
  {
    en: "Gather",
    description:
      "誰でも「Ciao!」と気軽に出入りする、イタリアの広場のような場所を創ります。計算されたサービスを超えて、偶然の出会いや予期せぬ会話が生まれる「磁力」を大切に。ヒトとヒトが惹かれ合うホットなコミュニティをデザインします。",
  },
  {
    en: "Savor",
    description:
      "私たちは、完成されたマニュアルに安住しません。最新の知性を柔軟に取り入れながら、昨日よりも心地よい関わり方、昨日よりも鮮やかな体験を追求します。変化を恐れず、未完を楽しみながら、今この瞬間に生まれる答えのない時間を、ゲストと共に味わい尽くしていきます。",
  },
];

const jobs = [
  {
    title: "サービススタッフ（物語の案内人）",
    type: "正社員",
    salary: "月給 300,000円 〜 480,000円",
    salaryNote: "試用期間3ヶ月・本採用と同条件",
    duties: [
      "レストラン「Degusteria Quinte」でのホールサービス・ワイン提案",
      "食材店「Gastronomia Quinto」での販売・ショップ運営",
      "VMD（ディスプレイ）によるライフスタイル提案",
      "インポーター・生産者の「食の物語」をゲストへ伝える接客",
    ],
    requirements: [
      "「美味しいもの」や食のストーリーに知的好奇心がある方",
      "マニュアルにとらわれない、温かみのある接客がしたい方",
      "職種・業界未経験歓迎（知識は入社後に習得できます）",
    ],
    welcome: [
      "飲食・ホテル・カフェでのサービス経験者",
      "ワインショップ・高級食材店・デパ地下などの物販経験者",
      "ソムリエ・ワインエキスパート・チーズプロフェッショナル資格保有者",
    ],
  },
  {
    title: "キッチンスタッフ",
    type: "正社員",
    salary: "月給 330,000円 〜 480,000円",
    salaryNote: "経験・スキルに応じて優遇｜試用期間3ヶ月・本採用と同条件",
    duties: [
      "イタリアンレストラン「Degusteria Quinte」での調理全般",
      "地元食材（知多・三河産）とイタリア直輸入食材を活かした料理",
      "テイクアウト惣菜・フォカッチャなどショップ向け商品の製造",
      "食材ロスを次の「美味しい」へつなぐクリエイティブな仕込み",
    ],
    requirements: [
      "調理経験必須",
      "食材・食の背景にある物語を大切にできる方",
    ],
    welcome: [
      "イタリアンレストランでの経験者",
      "パスタ・ピッツァなどイタリア料理の技術をお持ちの方",
      "食材店やデリ・惣菜製造の経験者",
    ],
  },
  {
    title: "ホールサービス兼販売スタッフ",
    type: "アルバイト・パート",
    salary: "時給 1,250円 〜 1,400円",
    salaryNote: "おもてなし経験・スキルに応じて優遇",
    duties: [
      "レストランでのホールサービス",
      "食材店での商品説明・レジ対応",
      "自家製惣菜・フォカッチャの販売補助",
      "ワイン・イタリア食材の魅力のご案内",
    ],
    requirements: [
      "年齢・経験年数不問（未経験・ブランク歓迎）",
      "丁寧な言葉遣い、笑顔での対応ができる方",
      "「食」や「ワイン」に関心がある方",
    ],
    welcome: [
      "アパレル・雑貨販売、ホテル、受付等の経験者",
      "週3日・1日4時間〜等、柔軟に応相談",
      "イタリア人スタッフなど本場の空気感を伝えられる方",
    ],
  },
];

export default function RecruitPage() {
  return (
    <>
      <PageHeader
        title="採用情報"
        titleIt="Recruit"
        subtitle="あたたかな人間味を大切にしながら、ゲストと共に心地よい物語を綴っていく仲間を募集します"
        imageSrc={IMAGES.recruit}
        imageAlt="QQ採用情報"
      />

      {/* BGSのスタイル */}
      <section className="bg-ink text-cream py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <p className="font-heading text-gold tracking-[0.3em] text-xs mb-4">
              STYLE — 株式会社BGS
            </p>
            <h2 className="font-heading-jp text-cream text-2xl font-light tracking-wider">
              私たちのスタイル
            </h2>
            <p className="text-cream/60 text-sm mt-4">
              &ldquo;見慣れた世界の輪郭を、描き直していく&rdquo;
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {styles.map((item, i) => (
              <AnimatedSection key={item.en} delay={i * 0.15}>
                <div className="bg-white/5 border border-cream/10 p-8 h-full">
                  <p className="font-heading text-gold-light text-2xl tracking-wide mb-4">
                    {item.en}
                  </p>
                  <div className="w-8 h-px bg-gold/40 mb-6" />
                  <p className="text-cream/70 text-sm leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 採用メッセージ（ミッション統合） */}
      <section className="bg-cream py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection>
            <p className="font-heading text-gold tracking-[0.3em] text-xs mb-6">RECRUIT MESSAGE</p>
            <h2 className="font-heading-jp text-ink text-2xl font-light tracking-wider mb-8">
              一緒に働く仲間へ
            </h2>
            <Divider className="mb-10" />
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="space-y-5 text-ink-muted leading-[2] text-sm md:text-base">
              <p>
                効率と正解に溢れた世界のなかで、私たちは「人生の余白」を肯定します。
                とりとめもない会話や、物語の温度に触れて心がほどける瞬間。
                そうした「答えのない時間」に身を委ねるひとときが、人を本来の姿に立ち返らせると信じているからです。
              </p>
              <p>
                「大人」としての顔を少しおいて、自分を閉じ込めていた静かな壁を飛び越える。
                等身大の関わりの中で、ヒト本来の好奇心や喜びを引き出していく——
                そんな温かな響き合いが生まれる場所を、私たちはつくり続けます。
              </p>
              <div className="w-8 h-px bg-gold/30 my-2" />
              <p>
                レストランとショップが心地よくつながる、新しいお店のカタチ。
                一箇所に留まらないからこそ、「美味しいワインの知識」も「愛されるショップの運営スキル」も、
                どちらも欲張りに身につけられる楽しさがあります。
              </p>
              <p>
                しっかりとした土台があるからこそ、その先にある——
                目の前のお客様との心地よい会話や、あなたらしい自然な笑顔を、
                一番大切にできる環境です。
              </p>
              <p>
                経験よりも、<strong className="text-ink font-medium">「人」を大切にする採用</strong>をしています。
                未経験の方、ブランクのある方も、ぜひご応募ください。
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 求人票 */}
      <section className="bg-cream-dark py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <p className="font-heading text-gold tracking-[0.3em] text-xs mb-4">JOB OPENINGS</p>
            <h2 className="font-heading-jp text-ink text-2xl font-light tracking-wider">
              募集職種
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job, i) => (
              <AnimatedSection key={job.title} delay={i * 0.15}>
                <div className="bg-cream h-full flex flex-col">
                  <div className="bg-green-deep text-cream p-6">
                    <span className="text-xs text-gold tracking-[0.2em]">{job.type}</span>
                    <h3 className="font-heading-jp text-xl mt-2 tracking-wide">{job.title}</h3>
                  </div>
                  <div className="p-6 flex-1 space-y-6">
                    <div>
                      <p className="text-xs tracking-[0.2em] text-ink-muted mb-2">給与</p>
                      <p className="font-heading text-green-deep text-lg">{job.salary}</p>
                      <p className="text-ink-subtle text-xs mt-1">{job.salaryNote}</p>
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.2em] text-ink-muted mb-3">仕事内容</p>
                      <ul className="space-y-1">
                        {job.duties.map((d) => (
                          <li key={d} className="text-sm text-ink-muted flex gap-2">
                            <span className="text-gold flex-shrink-0">—</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.2em] text-ink-muted mb-3">応募条件</p>
                      <ul className="space-y-1">
                        {job.requirements.map((r) => (
                          <li key={r} className="text-sm text-ink-muted flex gap-2">
                            <span className="text-terracotta flex-shrink-0">◆</span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.2em] text-ink-muted mb-3">歓迎条件</p>
                      <ul className="space-y-1">
                        {job.welcome.map((w) => (
                          <li key={w} className="text-sm text-ink-muted flex gap-2">
                            <span className="text-gold-light flex-shrink-0">★</span>
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* 待遇 */}
          <AnimatedSection delay={0.3} className="mt-12">
            <div className="bg-cream p-8 border-l-4 border-gold">
              <p className="font-heading-jp text-ink text-base mb-4">待遇・福利厚生</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "昇給あり",
                  "賞与（正社員：業績連動）",
                  "交通費支給",
                  "社会保険完備",
                  "こだわりのまかない（食事補助）",
                  "制服貸与",
                  "資格取得支援（ソムリエ等）",
                  "有給休暇・各種休暇制度",
                ].map((item) => (
                  <div key={item} className="flex gap-2 text-sm text-ink-muted">
                    <span className="text-gold flex-shrink-0">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 応募CTA */}
      <section className="bg-ink text-cream py-20 px-6 text-center">
        <AnimatedSection>
          <p className="font-heading text-gold tracking-[0.3em] text-xs mb-6">APPLICATION</p>
          <h2 className="font-heading-jp text-2xl font-light tracking-wider mb-6">ご応募・お問い合わせ</h2>
          <p className="text-cream/70 text-sm mb-10 max-w-md mx-auto leading-relaxed">
            履歴書（書式自由）を添付の上、メールにてお送りください。
            まずはお気軽にお問い合わせだけでも歓迎します。
          </p>
          <a
            href={`mailto:${SITE_INFO.email}?subject=QQ求人応募`}
            className="inline-flex items-center gap-3 px-10 py-4 bg-terracotta text-cream font-heading tracking-[0.15em] text-sm hover:bg-terracotta-light transition-colors duration-300"
          >
            <Mail size={16} />
            {SITE_INFO.email}
          </a>
          <p className="text-cream/40 text-xs mt-4">採用担当：柿原</p>
        </AnimatedSection>
      </section>

    </>
  );
}
