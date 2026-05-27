/**
 * QQ コンセプトビジュアル生成スクリプト
 * 「皮のブックカバー＋型抜き栞」— QQのブランドメタファーを一枚に
 *
 * 使い方:
 *   OPENAI_API_KEY=sk-... npx tsx scripts/generate-qq-concept.ts
 *
 * 生成後: public/images/preview/ に保存されます
 */

import OpenAI from "openai";
import * as fs from "fs";
import * as path from "path";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const OUTPUT_DIR = path.join(process.cwd(), "public", "images", "preview");

const variants = [
  {
    filename: "concept_book_16x9.png",
    size: "1536x1024" as const,
    label: "TOPヒーロー用 (16:9)",
    prompt: `A well-loved leather-bound book placed face down on a worn wooden table, as if the reader has just stepped away and will return soon. The book is closed, resting on its open pages. From between the pages, many die-cut shaped ribbon bookmarks peek out in a fan — each bookmark is a different warm color and cut into a distinct silhouette: a wine bottle shape, a gelato cone shape, a leg of prosciutto shape, an olive oil bottle shape, a wedge of cheese shape, a focaccia loaf shape. The leather cover is rich, dark brown, supple and well-used. Warm afternoon light falls across the table. The atmosphere is intimate and unhurried — someone will return to this book. Pen and ink architectural sketch style with warm watercolor wash, loose expressive line work, ochre and deep brown tones, cream background. Wide landscape composition, centered.`,
  },
  {
    filename: "concept_book_3x1.png",
    size: "1536x512" as const,
    label: "コンセプトページヘッダー用 (3:1)",
    prompt: `A well-loved leather-bound book placed face down on a worn wooden table, as if the reader has just stepped away and will return soon. The book is closed, resting on its open pages. From between the pages, many die-cut shaped ribbon bookmarks peek out in a fan — each bookmark is a different warm color and cut into a distinct silhouette: a wine bottle shape, a gelato cone shape, a leg of prosciutto shape, an olive oil bottle shape, a wedge of cheese shape, a focaccia loaf shape. The leather cover is rich, dark brown, supple and well-used. Warm afternoon light falls across the table. The atmosphere is intimate and unhurried — someone will return to this book. Pen and ink architectural sketch style with warm watercolor wash, loose expressive line work, ochre and deep brown tones, cream background. Extra wide panoramic composition, book centered, generous empty space on both sides.`,
  },
];

async function generate(spec: (typeof variants)[0]): Promise<void> {
  console.log(`\n🎨 生成中: ${spec.label}`);
  console.log(`   サイズ: ${spec.size}`);
  console.log(`   ファイル: ${spec.filename}`);

  const response = await client.images.generate({
    model: "gpt-image-1",
    prompt: spec.prompt,
    n: 1,
    size: spec.size,
    quality: "high",
  });

  const b64 = response.data?.[0]?.b64_json;
  if (!b64) throw new Error("画像データが取得できませんでした");

  const outputPath = path.join(OUTPUT_DIR, spec.filename);
  fs.writeFileSync(outputPath, Buffer.from(b64, "base64"));
  console.log(`   ✅ 保存完了: ${outputPath}`);
}

async function main(): Promise<void> {
  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY が設定されていません");
    console.error("   OPENAI_API_KEY=sk-... npx tsx scripts/generate-qq-concept.ts");
    process.exit(1);
  }

  console.log("🚀 QQ コンセプトビジュアル生成");
  console.log(`   出力先: ${OUTPUT_DIR}`);
  console.log(`   生成枚数: ${variants.length}枚（16:9 と 3:1）`);
  console.log(`   推定コスト: $${(variants.length * 0.19).toFixed(2)}\n`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const spec of variants) {
    try {
      await generate(spec);
    } catch (err) {
      console.error(`❌ 失敗:`, err);
    }
  }

  console.log("\n🎉 完了！");
  console.log(`   open ${OUTPUT_DIR}`);
  console.log("   concept_book_16x9.png → TOPヒーロー候補");
  console.log("   concept_book_3x1.png  → コンセプトページヘッダー候補");
}

main().catch(console.error);
