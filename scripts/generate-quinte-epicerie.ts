/**
 * QQ ホームページ — Quinte 写真 第5稿
 * Reference: La Grande Épicerie de Paris
 * 明るく・食材が主役・今すぐ食べたい鮮度感・本物感
 *
 * 使い方:
 *   OPENAI_API_KEY=sk-... npx tsx scripts/generate-quinte-epicerie.ts
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
    key: "e1",
    filename: "quinte_e1.png",
    theme: "今すぐ食べたい一皿——本物の鮮度感",
    prompt: `A single beautiful restaurant plate shot in the style of La Grande Épicerie de Paris —
bright, luminous, appetizing. The dish: handmade tagliolini with Mikawa Bay sea urchin
cream and bottarga shavings, finished with bright green herb oil. Shot on a white marble
counter with soft natural light from the left. The pasta is golden, the uni cream is vivid,
the bottarga is visibly textured. A small glass of chilled white wine is in the background,
slightly out of focus. The image feels immediate and alive — you can almost taste it.
Clean, bright, European gourmet editorial style. No dark shadows. No people.`,
  },
  {
    key: "e2",
    filename: "quinte_e2.png",
    theme: "食材の饗宴——テーブルの上の豊かさ",
    prompt: `A generous, abundant restaurant table spread in bright warm light, inspired by
La Grande Épicerie de Paris visual style. On a linen tablecloth: a beautiful antipasto
spread — thin slices of local prosciutto draped naturally, fresh burrata with vivid
orange Mikawa tomatoes and basil, grilled bread glistening with olive oil, a small jar
of fig jam, a glass of amber natural wine catching the light, a bottle of Sicilian olive oil.
Everything looks incredibly fresh and real — not styled, but abundant and alive.
Bright, warm, luminous. Shot from slightly above. No dark tones. No people.`,
  },
  {
    key: "e3",
    filename: "quinte_e3.png",
    theme: "ワインと料理の出会い——選ぶ喜び",
    prompt: `A bright and inviting restaurant scene: three different natural wines in beautiful
glasses — one orange, one pale yellow, one light red — each catching warm natural light
and glowing. Beside them: a small tasting plate with three bites, each pairing with a wine.
The counter is light wood, warm and clean. The wine colors are vivid and translucent.
Inspired by the luminous, gourmet visual language of La Grande Épicerie de Paris.
Bright, clean, joyful. The image communicates: discovering unique wines is part of the
experience here. No dark shadows. No people.`,
  },
  {
    key: "e4",
    filename: "quinte_e4.png",
    theme: "カウンターの全景——活気あるレストランの昼",
    prompt: `A bright, lively Italian restaurant counter during lunch service — the view from
a guest's perspective. Clean white plates being prepared on the pass, fresh herbs and
ingredients visible on the counter, two or three dishes in various stages, steam rising
from a pan in the background. The counter is light marble or stone, well-lit by warm
overhead lights and natural light. A glass of white wine and a bread basket are in the
foreground. The scene feels alive, skilled, and genuinely appetizing.
Inspired by La Grande Épicerie de Paris — bright, European, honest quality.
No dramatic shadows. No people's faces visible.`,
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

  console.log("🚀 Quinte 写真 第5稿");
  console.log("   Reference: La Grande Épicerie de Paris");
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
  console.log("  e1: 今すぐ食べたい一皿——本物の鮮度感");
  console.log("  e2: 食材の饗宴——テーブルの上の豊かさ");
  console.log("  e3: ワインと料理の出会い——選ぶ喜び");
  console.log("  e4: カウンターの全景——活気あるレストランの昼");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main().catch(console.error);
