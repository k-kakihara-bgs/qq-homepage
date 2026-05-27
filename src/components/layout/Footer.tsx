import Link from "next/link";
import { Share2, Mail } from "lucide-react";
import { SITE_INFO, NAV_LINKS, BUSINESS_HOURS } from "@/lib/constants";
import { Divider } from "@/components/ui/Divider";

export function Footer() {
  return (
    <footer className="bg-green-deep text-cream/80">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* ロゴ・コンセプト */}
          <div className="space-y-4">
            <div>
              <p className="font-heading text-3xl text-gold-light tracking-[0.15em]">QQ</p>
              <p className="font-heading italic text-cream/50 text-sm tracking-[0.1em]">
                Quinto.Quinte
              </p>
            </div>
            <p className="text-sm leading-relaxed text-cream/60">
              池下の路地裏から届ける、
              <br />
              日常の余白、5番目の場所。
            </p>
            <div className="flex gap-3 pt-2">
              {SITE_INFO.instagramUrl ? (
                <a
                  href={SITE_INFO.instagramUrl}
                  aria-label="Instagram"
                  className="p-2 rounded-full border border-cream/20 hover:border-gold/60 hover:text-gold-light transition-colors duration-300"
                >
                  <Share2 size={16} />
                </a>
              ) : null}
              <a
                href={`mailto:${SITE_INFO.email}`}
                aria-label="メールで問い合わせ"
                className="p-2 rounded-full border border-cream/20 hover:border-gold/60 hover:text-gold-light transition-colors duration-300"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* ナビゲーション */}
          <div className="space-y-4">
            <h3 className="text-xs tracking-[0.3em] text-gold font-medium">MENU</h3>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:text-cream transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* 営業時間・アクセス */}
          <div className="space-y-4">
            <h3 className="text-xs tracking-[0.3em] text-gold font-medium">ACCESS</h3>
            <p className="text-sm leading-relaxed">
              {SITE_INFO.address}
              <br />
              <span className="text-cream/50 text-xs">{SITE_INFO.access}</span>
            </p>
            <div className="space-y-2">
              {BUSINESS_HOURS.quinte.hours.map((h) => (
                <div key={h.day} className="flex justify-between text-xs text-cream/60">
                  <span>{h.day}</span>
                  <span>{h.time}</span>
                </div>
              ))}
              <p className="text-xs text-cream/40">{BUSINESS_HOURS.quinte.closed}</p>
            </div>
          </div>
        </div>

        <Divider className="my-10" gold />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream/40">
          <p>© 2026 QQ / Quinto.Quinte. 株式会社BGS</p>
          <p className="font-heading italic">
            &ldquo;見慣れた世界の輪郭を、描き直していく&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
