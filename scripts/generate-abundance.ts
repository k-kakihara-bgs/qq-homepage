/**
 * QQ ホームページ — 食材の豊かさ・宝庫感 写真生成
 * Reference: La Grande Épicerie de Paris
 * 生鮮10種類以上 × グロッサリー10種類以上の圧倒的な食材感
 *
 * 使い方:
 *   OPENAI_API_KEY=sk-... npx tsx scripts/generate-abundance.ts
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
    key: "a1",
    filename: "abundance_a1.png",
    theme: "素材→料理の連続性——カウンターの手前と奥",
    prompt: `A restaurant counter scene that tells the story from ingredient to plate.
Inspired by La Grande Épicerie de Paris visual style — bright, luminous, abundant.

FOREGROUND (finished dishes, in sharp focus): two beautiful plated dishes —
a pasta with sea urchin cream and bottarga shavings, and a small bowl of clams
in white wine broth with fresh parsley. A glass of natural orange wine beside them.

BACKGROUND (raw ingredients, slightly softer focus but clearly visible):
an abundant display of fresh and grocery items — whole fresh clams, sea urchin shells,
bottarga, cherry tomatoes on vine, fresh herbs (basil, parsley), lemon, figs,
radicchio, Sicilian olive oil bottle, balsamic vinegar, anchovy tin, pasta package,
fig jam jar, capers in brine, Modica chocolate, cantuccini in paper bag, amaretti tin.

The connection between ingredient and dish is the story.
Bright warm natural light. La Grande Épicerie editorial style.
Warm but luminous, not dark. No people.`,
  },
  {
    key: "a2",
    filename: "abundance_a2.png",
    theme: "食材が溢れるレストランカウンター——市場と食卓の間",
    prompt: `A long restaurant counter overflowing with beautiful ingredients and finished dishes,
inspired by La Grande Épicerie de Paris. The counter tells the whole story of the restaurant.

Left side (raw ingredients, abundant): fresh clams in a bowl, whole red sea bream,
sea urchin in shell, bottarga, a bundle of green asparagus, colorful cherry tomatoes
(red, yellow, orange), halved figs showing vivid red interior, fresh herbs in bundles,
whole lemon, radicchio, green olives in a bowl.

Center (grocery items stacked naturally): Sicilian olive oil bottles, balsamic vinegar,
pasta packages, jars of capers and sun-dried tomatoes, anchovy tins, fig jam,
Modica chocolate bars in paper wrappers, cantuccini bag, amaretti tin, natural wine bottles.

Right side (finished dishes): two plated Italian dishes and a glass of chilled wine,
showing what all these ingredients become.

Bright, warm, abundant. The feeling: this restaurant is built around extraordinary ingredients.
La Grande Épicerie visual language. No people. Wide shot.`,
  },
  {
    key: "a3",
    filename: "abundance_a3.png",
    theme: "テーブルの上の発見——料理と食材が共存する食卓",
    prompt: `A generous restaurant table mid-meal, with finished dishes AND beautiful raw/whole
ingredients visible together — like a feast of discovery. Inspired by La Grande Épicerie
de Paris: bright, abundant, joyful.

On the table (finished dishes): pasta with bottarga, a seafood antipasto with fresh clams,
grilled bread with olive oil, a charcuterie board with prosciutto and figs.

Also on the table (whole ingredients as decoration and story): a whole bottarga piece,
a small bowl of capers, fresh cherry tomatoes still on vine, herbs in a small glass of water,
a halved lemon, a bottle of natural wine half-poured, a Sicilian olive oil bottle,
an open jar of fig jam, Modica chocolate partially unwrapped, anchovies in an open tin.

Everything bright, colorful, alive. The table feels like a gourmet discovery at every turn.
Warm natural light, luminous. La Grande Épicerie editorial photography style.
No people, but evidence of a wonderful meal in progress.`,
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

  console.log("🚀 食材の豊かさ・宝庫感 写真生成");
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
  console.log("  a1: 大理石カウンターの食材の宝庫（真俯瞰）");
  console.log("  a2: 木のカウンターに広がる食材（斜め俯瞰）");
  console.log("  a3: 市場のような陳列——棚と台が食材で溢れる");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main().catch(console.error);
