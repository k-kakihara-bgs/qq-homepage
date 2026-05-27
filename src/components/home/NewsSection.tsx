import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Divider } from "@/components/ui/Divider";

const news = [
  {
    date: "2026.06",
    category: "お知らせ",
    title: "QQ（クイント・クインテ）オープニングスタッフ募集中",
    href: "/recruit",
  },
  {
    date: "2026.07",
    category: "イベント",
    title: "オープニングイベント開催予定（詳細近日公開）",
    href: "/events",
  },
  {
    date: "2026.08",
    category: "お知らせ",
    title: "グランドオープン予定",
    href: "/events",
  },
];

export function NewsSection() {
  return (
    <section className="bg-green-deep text-cream py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="flex items-center justify-between mb-12">
          <div>
            <p className="font-heading text-gold tracking-[0.3em] text-xs mb-3">INFORMATION</p>
            <h2 className="font-heading-jp text-2xl font-light tracking-wider">お知らせ</h2>
          </div>
          <Link
            href="/events"
            className="text-xs tracking-[0.2em] text-gold-light border-b border-gold/40 pb-1 hover:border-gold-light transition-colors duration-300 font-heading hidden md:block"
          >
            すべて見る →
          </Link>
        </AnimatedSection>

        <div className="space-y-0">
          {news.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.1}>
              <Link href={item.href} className="group block">
                <div className="py-6 flex items-start gap-6 border-t border-cream/10 hover:border-cream/20 transition-colors duration-300">
                  <div className="flex-shrink-0 text-left">
                    <p className="text-gold/70 text-xs font-heading tracking-widest">{item.date}</p>
                    <span className="inline-block mt-1 text-xs px-2 py-0.5 border border-cream/20 text-cream/50 tracking-widest">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-cream/80 group-hover:text-cream transition-colors duration-200 leading-relaxed">
                    {item.title}
                  </p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-8 md:hidden text-center">
          <Link
            href="/events"
            className="text-xs tracking-[0.2em] text-gold-light border-b border-gold/40 pb-1 hover:border-gold-light transition-colors duration-300 font-heading"
          >
            すべて見る →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
