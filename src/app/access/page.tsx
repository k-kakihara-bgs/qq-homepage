import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Divider } from "@/components/ui/Divider";
import { ContactForm } from "@/components/access/ContactForm";
import { IMAGES, SITE_INFO, BUSINESS_HOURS } from "@/lib/constants";
import { MapPin, Clock, Train } from "lucide-react";

export const metadata: Metadata = {
  title: "アクセス・お問い合わせ",
  description: "QQ（Quinto.Quinte）へのアクセスと営業時間、お問い合わせについてご案内します。名古屋市千種区池下、東山線池下駅徒歩圏内。",
};

export default function AccessPage() {
  return (
    <>
      <PageHeader
        title="アクセス・お問い合わせ"
        titleIt="Access & Contact"
        imageSrc={IMAGES.about}
        imageAlt="QQ アクセス"
      />

      {/* アクセス情報 */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <AnimatedSection direction="left">
            <h2 className="font-heading-jp text-ink text-xl font-light tracking-wider mb-8">
              店舗情報
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="text-terracotta flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-ink font-medium text-sm mb-1">住所</p>
                  <p className="text-ink-muted text-sm leading-relaxed">{SITE_INFO.address}</p>
                  <Link
                    href={SITE_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-green-soft hover:text-green-deep transition-colors duration-200 mt-1 inline-block"
                  >
                    Google Mapsで開く →
                  </Link>
                </div>
              </div>

              <div className="flex gap-4">
                <Train className="text-terracotta flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-ink font-medium text-sm mb-1">アクセス</p>
                  <p className="text-ink-muted text-sm leading-relaxed">{SITE_INFO.access}</p>
                </div>
              </div>
            </div>

            <Divider className="my-8" />

            {/* 営業時間 */}
            <div className="space-y-8">
              {[BUSINESS_HOURS.quinto, BUSINESS_HOURS.quinte].map((store) => (
                <div key={store.name}>
                  <div className="flex gap-4 mb-3">
                    <Clock className="text-terracotta flex-shrink-0 mt-0.5" size={20} />
                    <p className="text-ink font-medium text-sm">{store.name}</p>
                  </div>
                  <div className="ml-9 space-y-2">
                    {store.hours.map((h) => (
                      <div key={h.day} className="flex justify-between text-sm">
                        <span className="text-ink-muted">{h.day}</span>
                        <span className="text-ink">{h.time}</span>
                      </div>
                    ))}
                    <p className="text-ink-subtle text-xs pt-1">{store.closed}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* 地図 */}
          <AnimatedSection direction="right">
            <h2 className="font-heading-jp text-ink text-xl font-light tracking-wider mb-8">
              地図
            </h2>
            <div className="aspect-square overflow-hidden border border-ink/10">
              <iframe
                src="https://maps.google.com/maps?q=愛知県名古屋市千種区池下1-6-6&hl=it&output=embed&z=17"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mappa — QQ Ikeshita"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* お問い合わせフォーム */}
      <section className="bg-cream-dark py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="font-heading text-gold tracking-[0.3em] text-xs mb-4">CONTACT</p>
            <h2 className="font-heading-jp text-ink text-2xl font-light tracking-wider mb-4">
              お問い合わせ
            </h2>
            <p className="text-ink-muted text-sm">
              ご質問・ご予約のご相談など、お気軽にお問い合わせください。確認後、担当者よりご連絡いたします。
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <ContactForm />
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
