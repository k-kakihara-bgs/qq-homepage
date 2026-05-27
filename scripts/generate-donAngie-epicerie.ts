/**
 * QQ ホームページ — Quinte 写真 最終稿 v3
 * Reference A: La Grande Épicerie de Paris（食材の宝庫感・グロッサリーの豊かさ）
 * Reference B: Don Angie NYC（クリエイティブなイタリアンの調理光景・エネルギー・遊び心）
 *
 * 使い方:
 *   OPENAI_API_KEY=sk-... npx tsx scripts/generate-donAngie-epicerie.ts
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
    key: "da1",
    filename: "da_da1.png",
    theme: "創作パスタの調理瞬間——食材が踊るキッチン",
    prompt: `A vibrant, creative Italian cooking scene inspired by Don Angie NYC —
energetic, artful, and full of appetite. Combined with the ingredient abundance of
La Grande Épicerie de Paris.

CENTER — the cooking moment (Don Angie energy):
A chef's hands finishing a bold, creative pasta dish: spicy rigatoni in a vivid,
deeply reduced tomato sauce with crispy capers and anchovy breadcrumbs on top.
Beside it on the counter: a cast iron pan with a bubbling sauce, fresh pasta sheets
dusted with semolina flour, a copper pot of steaming shellfish broth.
The cooking is creative, confident, and visually stunning.

SURROUNDING — abundant ingredients (La Grande Épicerie richness):
Cherry tomatoes on vine (multiple colors), fresh basil in abundance, whole garlic,
chili peppers, a halved lemon, bottarga, fresh clams in a wet bowl, fresh ricotta
in a container, aged Parmigiano Reggiano being grated, anchovies in an open tin.
Grocery items: Sicilian olive oil bottle, San Marzano tomato can, dried pasta package,
balsamic vinegar, capers jar, fig jam, Modica chocolate bar, cantuccini bag.
At least 15 distinct items visible.

Bright warm kitchen light — not dark, not moody. Energetic, joyful, creative.
The counter is marble or light stone, slightly flour-dusted. No faces visible.
Editorial food and cooking photography. Wide shot.`,
  },
  {
    key: "da2",
    filename: "da_da2.png",
    theme: "オープンキッチンの活気——創作とグロッサリーの共存",
    prompt: `A bright, energetic open kitchen scene combining Don Angie NYC's creative cooking
energy with La Grande Épicerie de Paris ingredient abundance.

KITCHEN (background, active and bright):
An open kitchen at work — a chef's hands plating a beautiful, creative Italian dish:
pasta in a vivid sauce with herbed breadcrumbs and a perfectly placed garnish.
Steam rising from a copper pan. A pizza peel with a charred, creative focaccia.
Bright overhead kitchen lights. Everything is in motion, creative, confident.

COUNTER/PASS (foreground, abundant):
The pass between kitchen and dining room is covered in beautiful items:
Fresh rigatoni and handmade pasta ready to be cooked, a ramekin of vivid red sauce,
fresh herbs in abundance (basil, parsley, oregano), cherry tomatoes just halved,
fresh ricotta, a piece of aged cheese, open anchovy tin.

ALSO ON THE COUNTER — La Grande Épicerie grocery abundance:
Sicilian olive oil bottle, San Marzano canned tomatoes, pasta packages, balsamic vinegar,
capers, fig jam jar, Modica chocolate bar, amaretti tin, cantuccini bag, natural wine bottle,
saffron jar, dried porcini in a bag. At least 14 distinct grocery items clearly visible.

Bright, warm, creative. The energy of a skilled creative kitchen mixed with the richness
of an extraordinary ingredient selection. No faces. Wide shot.`,
  },
  {
    key: "da3",
    filename: "da_da3.png",
    theme: "皿の創造性——盛り付けの瞬間と食材の密度",
    prompt: `A close-up, densely composed scene of creative Italian cooking and plating,
combining Don Angie NYC's artful playfulness with La Grande Épicerie de Paris ingredient richness.

CENTER — the creative dish (Don Angie style):
A beautiful, creative Italian plate being finished: a bold spicy rigatoni with deeply reduced
tomato sauce, topped with crispy anchovy breadcrumbs and fresh torn basil — garnished with
a drizzle of herb oil and grated aged Parmigiano. Beside it: charred sourdough with olive oil
and anchovy butter, and a small cast iron ramekin of bubbling clam sauce.
Everything is vibrant, playful, and immediately appetizing.

SURROUNDING the plate — tightly packed ingredients and grocery items (La Grande Épicerie):
Cherry tomatoes cut to show vivid interior, fresh basil leaves, whole garlic cloves,
chili flakes in a small dish, a halved lemon, capers scattered, anchovies draped,
a wedge of Parmigiano Reggiano, fresh pasta dusted with semolina.
Grocery items: Sicilian olive oil bottle catching the light, San Marzano tomato can open,
pasta package, balsamic vinegar, fig jam jar open, Modica chocolate piece, cantuccini.

Bright warm light — every element glistening. Dense, lush, creative.
You want to eat this right now. No people. Shot slightly from above.`,
  },
  {
    key: "da4",
    filename: "da_da4.png",
    theme: "宝庫のカウンター——創作料理と食材が共存する世界",
    prompt: `A wide, generous counter scene that combines the creative Italian energy of Don Angie NYC
with the extraordinary ingredient abundance of La Grande Épicerie de Paris.

LEFT SIDE — creative Italian dishes (Don Angie energy):
Three plated creative Italian dishes:
1. Spicy rigatoni in a deeply reduced tomato sauce with crispy anchovy breadcrumbs on top
2. A creative hand-torn pasta with fresh clams, bottarga shavings, and herb oil
3. A seared branzino fillet on a vivid romesco sauce with charred vegetables and capers
A glass of orange natural wine beside them, glowing warm.

RIGHT SIDE — ingredient and grocery abundance (La Grande Épicerie):
A generous overflow of specialty items — fresh and packaged:
Fresh: cherry tomatoes (multiple colors) on vine, whole clams in a bowl, fresh ricotta,
Parmigiano chunk, fresh herbs (basil, parsley), chili peppers, garlic, lemon, bottarga.
Grocery: Sicilian olive oil bottle, San Marzano canned tomatoes, pasta packages (2 types),
balsamic vinegar, capers jar, anchovy tin open, fig jam, Modica chocolate bar, cantuccini bag,
amaretti tin, saffron jar, dried pasta sheets, natural wine bottle. At least 16 items visible.

The scene is bright, creative, and abundant. The dishes look playful and skillfully made.
The ingredients look extraordinary and carefully sourced. Warm overhead light.
No people. Wide shot.`,
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

  console.log("🚀 Quinte 写真 — La Grande Épicerie × Don Angie NYC");
  console.log("   食材の宝庫感 × クリエイティブなイタリアンの調理光景");
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
  console.log("  da1: 創作パスタの調理瞬間——食材が踊るキッチン");
  console.log("  da2: オープンキッチンの活気——創作とグロッサリーの共存");
  console.log("  da3: 皿の創造性——盛り付けの瞬間と食材の密度");
  console.log("  da4: 宝庫のカウンター——創作料理と食材が共存する世界");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main().catch(console.error);
