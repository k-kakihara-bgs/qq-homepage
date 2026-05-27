/**
 * QQ ホームページ — Quinte「舞台袖」コンセプト写真 生成スクリプト
 * "幕が上がる直前の静けさ" をテーマにした4案
 *
 * 使い方:
 *   OPENAI_API_KEY=sk-... npx tsx scripts/generate-quinte-stage.ts
 */

import OpenAI from "openai";
import * as fs from "fs";
import * as path from "path";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const OUTPUT_DIR = path.join(process.cwd(), "public", "images", "preview");

type ImageSpec = {
  key: string;
  filename: string;
  theme: string;
  prompt: string;
};

const variants: ImageSpec[] = [
  {
    key: "s1",
    filename: "quinte_s1.png",
    theme: "開店前の静寂——整えられたテーブル",
    prompt: `An Italian restaurant just before opening — stillness and quiet anticipation.
Perfectly set tables with crisp white linen, polished wine glasses catching soft light,
a single candle not yet lit, a folded napkin. The room is empty but fully ready.
Warm amber light from wall sconces. A sense of theatrical anticipation — the stage
is set, the curtain is about to rise. Like the wings of a theatre, just before the
performance begins. Cinematic, slightly dramatic, warm and intimate. No people.`,
  },
  {
    key: "s2",
    filename: "quinte_s2.png",
    theme: "厨房の扉の隙間——光が漏れる",
    prompt: `A half-open kitchen door in an Italian restaurant, warm golden light spilling
through the gap into a dimly lit corridor or dining room. Through the crack, the blur
of a copper pot, a flame, steam rising. The threshold between the hidden world of
preparation and the stage of the dining room. Mysterious, theatrical, intimate.
Like standing in the wings of a theatre, watching the stage through a gap in the curtain.
Dark and warm tones, cinematic chiaroscuro lighting. No people visible.`,
  },
  {
    key: "s3",
    filename: "quinte_s3.png",
    theme: "ミザンプラス——仕込みの美しさ",
    prompt: `Elegant mise en place on a dark stone kitchen counter — the quiet preparation
before the performance. Artfully arranged: fresh pasta sheets dusted with flour, a small
bowl of truffle shavings, a copper ladle, a glass of red wine half-poured, a sprig of
rosemary, precise knife cuts of ingredients. Professional and beautiful, like a still
life painting. Dramatic side lighting, deep shadows, warm highlights. The art of cooking
as theatre. No people.`,
  },
  {
    key: "s4",
    filename: "quinte_s4.png",
    theme: "ワインセラーの奥——幕裏の世界",
    prompt: `A narrow stone wine cellar corridor in an Italian restaurant, lit by a single
warm pendant light. Rows of bottles on both sides stretching into soft darkness.
A few bottles pulled forward, their labels catching the light. An old wooden stool,
a sommelier's notebook left open. The hidden world behind the restaurant — where
knowledge and passion are stored, away from the stage. Atmospheric, theatrical,
intimate. Warm amber tones against cool stone. No people.`,
  },
];

async function generateVariant(spec: ImageSpec): Promise<void> {
  console.log(`\n🎨 生成中: ${spec.key} — ${spec.theme}`);

  const response = await client.images.generate({
    model: "gpt-image-1",
    prompt: spec.prompt,
    n: 1,
    size: "1536x1024",
    quality: "high",
  });

  const b64 = response.data?.[0]?.b64_json;
  if (!b64) throw new Error(`${spec.key}: 画像データが取得できませんでした`);

  const outputPath = path.join(OUTPUT_DIR, spec.filename);
  fs.writeFileSync(outputPath, Buffer.from(b64, "base64"));
  console.log(`   ✅ 保存完了: ${outputPath}`);
}

async function main(): Promise<void> {
  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY が設定されていません");
    process.exit(1);
  }

  console.log("🚀 Quinte「舞台袖」コンセプト写真 生成スクリプト");
  console.log(`   生成枚数: ${variants.length}枚 / 推定コスト: $${(variants.length * 0.19).toFixed(2)}\n`);

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log("候補案:");
  for (const v of variants) console.log(`   ${v.key}: ${v.theme}`);

  for (const spec of variants) {
    try {
      await generateVariant(spec);
    } catch (error) {
      console.error(`❌ ${spec.key} の生成に失敗:`, error);
    }
  }

  console.log("\n🎉 完了！");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  s1: 開店前の静寂——整えられたテーブル");
  console.log("  s2: 厨房の扉の隙間——光が漏れる");
  console.log("  s3: ミザンプラス——仕込みの美しさ");
  console.log("  s4: ワインセラーの奥——幕裏の世界");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main().catch(console.error);
