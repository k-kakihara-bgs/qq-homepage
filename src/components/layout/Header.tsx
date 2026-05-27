"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isTop = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isTransparent = isTop && !scrolled && !menuOpen;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isTransparent
          ? "bg-transparent"
          : "bg-green-deep/95 backdrop-blur-md shadow-lg"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex flex-col items-start">
          <span
            className={cn(
              "font-heading text-2xl md:text-3xl font-light tracking-[0.15em] transition-colors duration-500",
              isTransparent ? "text-cream" : "text-gold-light"
            )}
          >
            QQ
          </span>
          <span
            className={cn(
              "font-heading italic text-xs tracking-[0.1em] transition-colors duration-500",
              isTransparent ? "text-cream/70" : "text-cream/60"
            )}
          >
            Quinto.Quinte
          </span>
        </Link>

        {/* デスクトップナビ */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm tracking-[0.1em] transition-colors duration-300 relative group",
                isTransparent ? "text-cream/90" : "text-cream/80",
                pathname === link.href
                  ? "text-gold-light"
                  : "hover:text-gold-light"
              )}
            >
              {link.label}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-px bg-gold-light transition-all duration-300",
                  pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                )}
              />
            </Link>
          ))}
        </nav>

        {/* モバイルメニューボタン */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={cn(
            "md:hidden p-2 transition-colors duration-300",
            isTransparent ? "text-cream" : "text-cream"
          )}
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* モバイルメニュー */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 bg-green-deep",
          menuOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="flex flex-col px-6 pb-6 gap-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm tracking-[0.1em] border-b border-cream/10 pb-4",
                pathname === link.href ? "text-gold-light" : "text-cream/80"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
