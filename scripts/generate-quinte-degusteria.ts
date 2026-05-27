/**
 * QQ ホームページ — Quinte「Degusteria」写真 第4稿
 * 地元生鮮 × イタリア食材・飲料の楽しさを視覚的に表現
 *
 * 使い方:
 *   OPENAI_API_KEY=sk-... npx tsx scripts/generate-quinte-degusteria.ts
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
    key: "d1",
    filename: "quinte_d1.png",
    theme: "カウンターに並ぶ小皿——発見の連続",
    prompt: `A series of small tasting plates arranged along a warm wooden counter, each one
different and surprising. Dishes include: fresh clams with a bright green herb sauce,
a small pasta with bottarga and lemon zest, a tiny bowl of marinated local seafood,
a piece of grilled fish with Sicilian capers and tomato. Between the plates: a glass
of chilled natural orange wine and a small carafe of mineral water. Each plate is
beautifully composed but not over-precious — alive and inviting. Warm overhead light,
bright enough to see every detail and color. The feeling: a tasting journey through
local Japanese ingredients prepared with Italian soul. No people.`,
  },
  {
    key: "d2",
    filename: "quinte_d2.png",
    theme: "地元の貝×イタリアの技——皿の上の出会い",
    prompt: `A beautifully plated dish on a white ceramic plate, shot on a restaurant counter
in warm natural light. The dish: fresh Mikawa Bay clams and mussels in a golden saffron
and white wine broth, garnished with fresh Italian parsley, a drizzle of Sicilian olive oil,
and grilled sourdough on the side. The shellfish are gleaming, the broth is vivid and golden,
herbs are bright green. A glass of chilled Vermentino white wine sits beside the plate,
catching the light. The image is bright, appetizing, and full of life. The ingredients
tell a story: Japanese sea, Italian technique. No people.`,
  },
  {
    key: "d3",
    filename: "quinte_d3.png",
    theme: "ナチュラルワインと一皿——飲み物が主役",
    prompt: `A restaurant table scene centered on an interesting bottle of Italian natural wine —
a skin-contact orange wine with a handwritten label — being poured into a stemless glass.
The wine is a vivid amber color catching the warm light. Beside it: a plate with a composed
antipasto — thin slices of local prosciutto, a smear of fig jam, grilled focaccia,
a few Sicilian green olives, a small piece of aged Parmigiano. The table is warm wood,
slightly worn. Everything feels carefully chosen and unique — not generic restaurant food.
Bright warm light, vivid colors, appetizing. No people.`,
  },
  {
    key: "d4",
    filename: "quinte_d4.png",
    theme: "食事中の賑わい——複数の皿と会話の温度",
    prompt: `A restaurant table mid-meal — the warm evidence of a wonderful dinner in progress.
Multiple plates at various stages: a half-finished pasta with bottarga, a shared board
of salumi and local vegetables, a bottle of natural Sicilian red wine half-empty,
two glasses with different wines, a torn piece of focaccia, a small olive oil dish.
Everything is bright and warm under gentle overhead restaurant lighting. The scene
feels convivial, generous, and alive — you can feel the good conversation happening.
Unique and carefully chosen ingredients are visible throughout. Bright, not dark.
Shot slightly from above. No people visible, just the evidence of their presence.`,
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

  console.log("🚀 Quinte「Degusteria」写真 第4稿");
  console.log("   地元生鮮 × イタリア食材・飲料の楽しさを視覚化");
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
  console.log("  d1: カウンターに並ぶ小皿——発見の連続");
  console.log("  d2: 地元の貝×イタリアの技——皿の上の出会い");
  console.log("  d3: ナチュラルワインと一皿——飲み物が主役");
  console.log("  d4: 食事中の賑わい——複数の皿と会話の温度");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main().catch(console.error);
