"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IMAGES } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <Image
        src={IMAGES.hero}
        alt="QQ Quinto.Quinte — 池下のイタリアン複合型店舗"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink/70" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-gold-light tracking-[0.3em] text-sm md:text-base mb-6"
        >
          Nagoya, Ikeshita — Opening Soon
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-heading-jp text-cream text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-widest mb-6"
        >
          池下の路地裏で、
          <br className="hidden md:block" />
          イタリアの&ldquo;おいしい&rdquo;を
          <br />
          自由にハシゴする。
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-cream/70 text-sm md:text-base tracking-wider mb-12 max-w-xl mx-auto"
        >
          食材店 Quinto（クイント） と、レストラン Quinte（クインテ）。
          <br className="hidden md:block" />
          ふたつの顔が、ひとつになる新しい場所。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/shop"
            className="px-8 py-3 border border-gold-light text-gold-light font-heading tracking-[0.15em] text-sm hover:bg-gold-light hover:text-ink transition-all duration-300"
          >
            Gastronomia Quinto
          </Link>
          <Link
            href="/menu"
            className="px-8 py-3 bg-terracotta text-cream font-heading tracking-[0.15em] text-sm hover:bg-terracotta-light transition-all duration-300"
          >
            Degusteria Quinte
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-cream/40 text-xs tracking-[0.3em]">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-cream/40 to-transparent" />
      </motion.div>
    </section>
  );
}
