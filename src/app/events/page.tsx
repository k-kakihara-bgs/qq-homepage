import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Divider } from "@/components/ui/Divider";
import { IMAGES, SITE_INFO } from "@/lib/constants";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "イベント・お知らせ",
  description: "QQ（Quinto.Quinte）のイベント情報とお知らせをご覧ください。オープニングイベントやグランドオープンの最新情報をお届けします。",
};

const events = [
  {
    date: "2026年6月",
    category: "採用",
    title: "オープニングスタッフ募集開始",
    description: "採用面接・説明会を開催予定。詳細は追ってお知らせします。まずはお気軽にお問い合わせください。",
    link: { href: "/recruit", label: "採用情報を見る" },
  },
  {
    date: "2026年7月",
    category: "イベント",
    title: "プレオープニングイベント（予定）",
    description: "関係者向けプレオープン。内容詳細は近日公開。SNSやメールマガジンでいち早くお知らせします。",
    link: null,
  },
  {
    date: "2026年8月",
    category: "オープン",
    title: "グランドオープン予定",
    description: "池下の路地裏に、新しい場所が生まれます。イタリア食材店「Gastronomia Quinto（クイント）」とレストラン「Degusteria Quinte（クインテ）」が併設するQQ（クイント・クインテ）がオープン。",
    link: { href: "/access", label: "アクセスを確認する" },
  },
];

const categoryColors: Record<string, string> = {
  採用: "border-terracotta text-terracotta",
  イベント: "border-gold text-gold",
  オープン: "border-green-soft text-green-soft",
};

export default function EventsPage() {
  return (
    <>
      <PageHeader
        title="イベント・お知らせ"
        titleIt="Events & News"
        subtitle="QQ（クイント・クインテ）からの最新情報をお届けします"
        imageSrc={IMAGES.events}
        imageAlt="QQイベント・お知らせ"
      />

      {/* イベント一覧 */}
      <section className="bg-cream py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="mb-14">
            <p className="font-heading text-gold tracking-[0.3em] text-xs mb-4">UPCOMING</p>
            <h2 className="font-heading-jp text-ink text-2xl font-light tracking-wider mb-4">
              今後の予定
            </h2>
            <Divider />
          </AnimatedSection>

          <div className="space-y-0">
            {events.map((event, i) => (
              <AnimatedSection key={event.title} delay={i * 0.12}>
                <div className="py-10 border-t border-ink/10 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6">
                  <div className="flex-shrink-0">
                    <p className="font-heading text-gold text-sm tracking-widest mb-2">
                      {event.date}
                    </p>
                    <span
                      className={`inline-block text-xs px-2 py-0.5 border tracking-widest ${categoryColors[event.category] ?? "border-ink-subtle text-ink-subtle"}`}
                    >
                      {event.category}
                    </span>
                  </div>
                  <div>
                    <p className="font-heading-jp text-ink text-lg font-medium mb-3">
                      {event.title}
                    </p>
                    <p className="text-ink-muted text-sm leading-relaxed mb-4">
                      {event.description}
                    </p>
                    {event.link ? (
                      <Link
                        href={event.link.href}
                        className="text-xs tracking-[0.2em] text-green-soft border-b border-green-soft/40 pb-1 hover:border-green-soft transition-colors duration-200 font-heading"
                      >
                        {event.link.label} →
                      </Link>
                    ) : null}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* お知らせ登録CTA */}
      <section className="bg-ink text-cream py-20 px-6 text-center">
        <AnimatedSection>
          <p className="font-heading text-gold tracking-[0.3em] text-xs mb-6">STAY CONNECTED</p>
          <h2 className="font-heading-jp text-2xl font-light tracking-wider mb-6">
            最新情報をお届けします
          </h2>
          <p className="text-cream/70 text-sm mb-10 max-w-md mx-auto leading-relaxed">
            イベントの詳細やオープン情報など、最新のお知らせはメールでご案内します。
            お気軽にご連絡ください。
          </p>
          <a
            href={`mailto:${SITE_INFO.email}?subject=QQイベント情報希望`}
            className="inline-flex items-center gap-3 px-10 py-4 border border-gold-light text-gold-light font-heading tracking-[0.15em] text-sm hover:bg-gold-light hover:text-ink transition-all duration-300"
          >
            <Mail size={16} />
            メールで問い合わせる
          </a>
        </AnimatedSection>
      </section>

      {/* 採用情報へのリンク */}
      <section className="bg-cream-dark py-16 px-6 text-center">
        <AnimatedSection>
          <p className="font-heading-jp text-ink text-base mb-2">
            一緒に働く仲間も募集しています
          </p>
          <p className="text-ink-muted text-sm mb-6">
            オープニングスタッフとして、新しい場所づくりに参加しませんか。
          </p>
          <Link
            href="/recruit"
            className="inline-block px-8 py-3 bg-green-deep text-cream font-heading tracking-[0.15em] text-sm hover:bg-green-mid transition-colors duration-300"
          >
            採用情報を見る
          </Link>
        </AnimatedSection>
      </section>
    </>
  );
}
