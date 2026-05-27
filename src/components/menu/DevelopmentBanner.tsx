import { ExternalLink } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SITE_INFO } from "@/lib/constants";

export function DevelopmentBanner() {
  return (
    <section className="bg-[#1E3A2F] text-white py-16 px-6">
      <AnimatedSection className="max-w-2xl mx-auto text-center">
        {/* 英語見出し */}
        <p className="font-heading italic text-[#D4AF37] tracking-[0.25em] text-sm mb-4">
          The Story Is Being Written
        </p>

        {/* 日本語見出し */}
        <h2 className="font-heading-jp text-xl font-light tracking-wider text-white mb-6">
          物語は、いまつくられています。
        </h2>

        {/* 区切り線 */}
        <div className="w-12 h-px bg-[#B8960C] mx-auto mb-8" />

        {/* 本文 */}
        <p className="text-white/75 text-sm leading-loose tracking-wide mb-10">
          メニューのイメージが、少しずつ形になってきました。
          <br className="hidden sm:block" />
          食材との対話、レシピの試行錯誤、器選び——
          <br className="hidden sm:block" />
          その一つひとつの過程を、Instagramでお届けしています。
        </p>

        {/* CTA */}
        {SITE_INFO.instagramUrl && (
          <a
            href={SITE_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#D4AF37] text-sm tracking-widest
                       border-b border-[#D4AF37]/50 pb-0.5 hover:border-[#D4AF37]
                       transition-colors duration-200"
          >
            Instagramで開発の様子を見る
            <ExternalLink size={13} />
          </a>
        )}
      </AnimatedSection>
    </section>
  );
}
