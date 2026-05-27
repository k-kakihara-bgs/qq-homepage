/**
 * QQ ホームページ — Quinte 写真 最終稿
 * Reference A: La Grande Épicerie de Paris（食材の宝庫感・豊かさ・明るさ）
 * Reference B: Trattoria Madonnina Milano（シズル感・熱気・今すぐ食べたい本能的引力）
 *
 * 使い方:
 *   OPENAI_API_KEY=sk-... npx tsx scripts/generate-epicerie-madonnina.ts
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
    key: "m1",
    filename: "final_m1.png",
    theme: "食材の宝庫×熱々の一皿——宝庫から生まれる瞬間",
    prompt: `A stunning food scene combining the abundance of La Grande Épicerie de Paris
with the immediate sizzle of Trattoria Madonnina Milano.

FOREGROUND — the sizzle: a just-served steaming pasta dish, glistening with olive oil,
steam visibly rising. The pasta is golden and lustrous, topped with vivid bottarga shavings
and bright green parsley. You can almost smell it. A glass of chilled natural white wine
beside it, condensation on the glass.

BACKGROUND — the abundance: densely packed fresh and grocery items, beautifully arranged
but overflowing. Fresh clams still wet from the sea, whole red sea bream, sea urchin shells,
cherry tomatoes on vine (red, yellow, orange), halved figs, fresh herbs (basil, parsley,
rosemary), asparagus, radicchio, lemon slices. Plus grocery items: Sicilian olive oil bottle,
balsamic vinegar, pasta package (Mancini-style), anchovy tin, fig jam jar, capers,
Modica chocolate, cantuccini bag, amaretti tin, natural wine bottle.

Bright, warm, luminous light. The glistening of the hot dish contrasts with the vivid raw
ingredients. You want to eat it immediately. Real and honest, not over-styled.
Editorial food photography. No people.`,
  },
  {
    key: "m2",
    filename: "final_m2.png",
    theme: "カウンターの饗宴——蒸気と食材が共存する",
    prompt: `A wide restaurant counter scene that combines La Grande Épicerie abundance with
Trattoria Madonnina sizzle. Shot from a slight angle, warm and inviting.

LEFT SIDE — raw abundance: an overflowing display of fresh ingredients — fresh clams
in a wet bowl, whole sea bream on a wooden board, bottarga (whole and sliced),
sea urchin, vibrant cherry tomatoes (multiple colors), halved fresh figs, green asparagus,
fresh basil and parsley in bunches, whole garlic, lemon halves, radicchio leaves.
Grocery items interspersed: olive oil bottle, balsamic, pasta package, anchovy tin,
capers, fig jam, Modica chocolate bar, cantuccini, amaretti tin.

RIGHT SIDE — sizzle and heat: two steaming hot dishes just plated — a pasta with
clam sauce (steam rising visibly), a grilled fish with herbs and olive oil glistening
on the surface. A poured glass of orange natural wine glowing in the light.

The whole scene is bright and warm — natural light mixed with warm overhead restaurant light.
The steam from the hot dishes mingles with the vivid color of raw ingredients.
You feel the abundance and the immediate desire to eat. No people.`,
  },
  {
    key: "m3",
    filename: "final_m3.png",
    theme: "テーブルの上の物語——食材と完成皿が混在する豊かな食卓",
    prompt: `A generous restaurant table that tells the whole story — from ingredient to finished dish —
combining La Grande Épicerie de Paris visual richness with Trattoria Madonnina's raw appetite appeal.

ON THE TABLE: multiple finished dishes steaming hot — a pasta glistening with olive oil and
bottarga, a bowl of clams in golden broth with steam rising, grilled bread charred and shining.

ALSO ON THE TABLE (whole ingredients as part of the feast): fresh cherry tomatoes still on vine,
a halved lemon, whole fresh clams in a small bowl, a piece of bottarga, fresh herbs,
a bottle of Sicilian olive oil half-used, a jar of capers open, Modica chocolate partially
unwrapped, anchovy tin open, balsamic vinegar bottle, natural wine bottle and two poured glasses
— one orange, one pale yellow.

Everything is bright, abundant, and immediate. Steam rises from hot dishes. Oil glistens.
The wine glows. You can feel the heat, the texture, the smell.
Inspired by La Grande Épicerie and Trattoria Madonnina — generous, real, luminous.
Warm overhead light, no dark shadows. Shot slightly from above. No people.`,
  },
  {
    key: "m4",
    filename: "final_m4.png",
    theme: "クローズアップの誘惑——照りと蒸気と食材の密度",
    prompt: `A close-up, densely packed food scene combining the sensory immediacy of Trattoria
Madonnina with the ingredient richness of La Grande Épicerie de Paris.

CENTER: a steaming hot pasta dish — spaghetti with sea urchin cream, bottarga shavings,
bright herb oil pooling around it. The pasta is glistening, the steam is visible,
the bottarga is clearly textured. Shot close enough to feel the heat.

SURROUNDING the plate, packed tightly: fresh clams (some open, glistening), halved cherry
tomatoes showing vivid red interior, a drizzle of olive oil catching the light, fresh
basil leaves, a lemon half squeezed, capers scattered, anchovy fillets draped, fig jam
in a small open jar, a piece of Modica chocolate, a cantuccini biscuit, a small glass
of chilled orange wine condensating.

The image is dense, lush, immediate. Every element is at peak visual appeal.
Bright warm light that makes everything glisten. Inspired by La Grande Épicerie and
Trattoria Madonnina — this is food you need to eat right now. No people.`,
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

  console.log("🚀 Quinte 写真 最終稿");
  console.log("   La Grande Épicerie × Trattoria Madonnina");
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
  console.log("  m1: 食材の宝庫 × 熱々の一皿——宝庫から生まれる瞬間");
  console.log("  m2: カウンターの饗宴——蒸気と食材が共存する");
  console.log("  m3: テーブルの物語——食材と完成皿が混在する豊かな食卓");
  console.log("  m4: クローズアップの誘惑——照りと蒸気と食材の密度");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main().catch(console.error);
