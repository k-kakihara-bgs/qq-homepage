/**
 * QQ ホームページ — Quinte「舞台袖」コンセプト写真 第2稿
 * ブランド設計書を踏まえた再考版
 *
 * コンセプトの核心：
 * - 「完成された舞台」ではなく、一皿が命を吹き込まれる直前の「舞台袖」
 * - 調理の鼓動が漏れ聞こえる至近距離の体験
 * - お客様は観客ではなく「物語の参加者」
 * - 余白・未完成・ログアウト
 *
 * 使い方:
 *   OPENAI_API_KEY=sk-... npx tsx scripts/generate-quinte-concept.ts
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
    key: "c1",
    filename: "quinte_c1.png",
    theme: "カウンター越し——調理の鼓動が漏れ聞こえる",
    prompt: `An intimate restaurant counter — the guest sits just inches from where the chef works.
Warm amber light illuminates a single white plate being finished: a chef's hands (blurred,
in motion) delicately placing a last element on a pasta dish. Steam rises. The counter is dark
wood, worn smooth. A half-poured glass of natural wine sits to one side. Through the pass,
the kitchen glows with orange flame. The feeling: you are not watching a performance —
you have been invited backstage, into the heartbeat of the kitchen.
Cinematic, warm, intimate. Shallow depth of field. No full face visible.`,
  },
  {
    key: "c2",
    filename: "quinte_c2.png",
    theme: "命を吹き込まれる直前——皿が旅立つ瞬間",
    prompt: `A single white ceramic plate on a dark stone pass, just before it is carried to the table.
The dish is complete: handmade pasta with bottarga shavings and a pool of bright green herb oil,
beautiful and precise. The kitchen behind is warm, slightly blurred — copper pots, flames, steam.
The dining room ahead is soft, candlelit, waiting. The plate exists at the threshold between
the hidden world and the stage. The moment before the curtain rises.
Dramatic side lighting, warm kitchen tones, cinematic composition. No people visible.`,
  },
  {
    key: "c3",
    filename: "quinte_c3.png",
    theme: "余白——ログアウトした後の静けさ",
    prompt: `A small intimate table in a dimly but warmly lit Italian restaurant corner —
dark walls, a single low pendant light casting a warm circle. On the table: an almost-empty
glass of red wine, a folded napkin, a small candle, a worn leather-covered menu left open.
The seat across is empty — the guest has stepped away, or hasn't arrived yet.
The scene suggests: this is a place where you can exhale. Stop performing. Just be.
A sense of generous emptiness — 余白 — like a blank page waiting to be written on.
Cinematic, intimate, quietly theatrical. Very warm, not dark. No people.`,
  },
  {
    key: "c4",
    filename: "quinte_c4.png",
    theme: "開店前の仕込み——幕が上がる前の舞台袖",
    prompt: `A professional kitchen counter just before service begins — the quiet backstage
before the performance. Mise en place arranged with care but not perfectly staged:
fresh handmade pasta dusted with flour, a small bowl of bottarga, a copper saucepan,
a bunch of fresh herbs, a halved lemon, a bottle of Sicilian olive oil with a simple label,
a chef's worn knife on a wooden board. Natural and warm kitchen light — bright enough
to see every detail clearly. The scene feels real and lived-in, not stylized.
The feeling: this is the hidden world that makes the magic possible.
The backstage before the curtain rises. Warm, grounded, honest. No people.`,
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

  console.log("🚀 Quinte「舞台袖」コンセプト写真 第2稿");
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
  console.log("  c1: カウンター越し——調理の鼓動が漏れ聞こえる");
  console.log("  c2: 命を吹き込まれる直前——皿が旅立つ瞬間");
  console.log("  c3: 余白——ログアウトした後の静けさ");
  console.log("  c4: 開店前の仕込み——幕が上がる前の舞台袖");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main().catch(console.error);
