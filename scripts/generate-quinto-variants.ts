/**
 * QQ ホームページ — Quinto（ショップ）写真 複数案生成スクリプト
 * 4パターンのプロンプトで候補画像を生成し、public/images/preview/ に保存する
 *
 * 使い方:
 *   OPENAI_API_KEY=sk-... npx tsx scripts/generate-quinto-variants.ts
 *
 * 生成後: Finder で public/images/preview/ を開いて4枚を比較し、
 * 好みの番号をClaudeに伝えてください。
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
    key: "v1",
    filename: "quinto_v1.png",
    theme: "明るいフラットレイ（俯瞰）",
    prompt: `Bright overhead flat-lay of artisanal Italian specialty food products on a rustic
wooden surface. Bright natural daylight. Products include: traditional cantuccini cookies
in a brown paper bag, Modica-style chocolate bars with classic paper wrappers, small jars
of artisanal jam (fig-balsamic, bergamot marmalade), dried artisanal pasta bundles,
capers in a small glass jar, crackers in vintage packaging, small bottle of Sicilian olive oil.
Styled loosely and naturally — not perfectly staged. Some crumbs, a folded linen napkin.
Warm but very bright, editorial food photography. Shot from directly above. No people.`,
  },
  {
    key: "v2",
    filename: "quinto_v2.png",
    theme: "明るいショップカウンター・棚",
    prompt: `Bright and airy Italian specialty food boutique interior. Warm natural light from a
large window. Rustic wooden shelves and counter with a curated, intimate selection of
artisanal products: glass jars of Sicilian olive oil with handwritten labels, artisanal
pasta packages (Mancini-style), balsamic vinegar bottles, fig and almond jam, Modica-style
chocolate bars, amaretti cookies tin, canned anchovies with vintage Italian labels, capers.
Small-batch rare imports feel — not a supermarket, a curated boutique. Bright, not dark.
Editorial lifestyle photography. No people.`,
  },
  {
    key: "v3",
    filename: "quinto_v3.png",
    theme: "バスケット演出・自然な散らかし",
    prompt: `Warm, bright editorial photo of Italian specialty grocery items spilling naturally from
a rustic wicker basket onto a white linen cloth on a light stone surface. Items include:
cantuccini biscotti, a small jar of Sicilian jam, a piece of bottarga, capers in brine,
a bundle of dried pasta tied with twine, mini sfoglie crackers in a vintage paper pouch,
bergamot marmalade jar, a folded paper with Italian text, fig-balsamic jam.
Daylight from the side, soft shadows. Natural, slightly imperfect arrangement —
like someone just unpacked a delivery. Food styling for a boutique Italian grocer.
Very bright and airy. No people.`,
  },
  {
    key: "v4",
    filename: "quinto_v4.png",
    theme: "窓光差し込む棚・光溢れる空間",
    prompt: `Sunlight streaming through a window behind rustic aged wooden shelves in a small Italian
specialty food shop. Shelves filled with a thoughtful curated selection: olive oil bottles
with classic Sicilian labels catching the light, balsamic vinegar, artisanal pasta packages,
fig and almond jam jars, Modica-style chocolate bars, amaretti tin, cantuccini in a glass
jar. Dust motes in the light. Warm golden tones, very bright and luminous atmosphere.
Feels like a beloved neighbourhood Italian deli. No people.`,
  },
];

async function generateVariant(spec: ImageSpec): Promise<void> {
  console.log(`\n🎨 生成中: ${spec.key} — ${spec.theme}`);
  console.log(`   ファイル: ${spec.filename}`);

  const response = await client.images.generate({
    model: "gpt-image-1",
    prompt: spec.prompt,
    n: 1,
    size: "1536x1024",
    quality: "high",
  });

  const b64 = response.data?.[0]?.b64_json;
  if (!b64) {
    throw new Error(`${spec.key}: 画像データが取得できませんでした`);
  }

  const outputPath = path.join(OUTPUT_DIR, spec.filename);
  fs.writeFileSync(outputPath, Buffer.from(b64, "base64"));
  console.log(`   ✅ 保存完了: ${outputPath}`);
}

async function main(): Promise<void> {
  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ エラー: OPENAI_API_KEY が設定されていません");
    console.error("   OPENAI_API_KEY=sk-... npx tsx scripts/generate-quinto-variants.ts");
    process.exit(1);
  }

  console.log("🚀 Quinto ショップ写真 複数案生成スクリプト");
  console.log(`   出力先: ${OUTPUT_DIR}`);
  console.log(`   生成枚数: ${variants.length}枚`);
  console.log(`   モデル: gpt-image-1 high (1536×1024)`);
  console.log(`   推定コスト: $${(variants.length * 0.19).toFixed(2)}\n`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`   📁 フォルダ作成: ${OUTPUT_DIR}`);
  }

  console.log("候補案:");
  for (const v of variants) {
    console.log(`   ${v.key}: ${v.theme}`);
  }

  for (const spec of variants) {
    try {
      await generateVariant(spec);
    } catch (error) {
      console.error(`❌ ${spec.key} の生成に失敗:`, error);
    }
  }

  console.log("\n🎉 完了！");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("次のステップ:");
  console.log("  Finderで以下を開いて4枚を比較してください:");
  console.log(`  open ${OUTPUT_DIR}`);
  console.log("");
  console.log("  v1: 明るいフラットレイ（俯瞰）");
  console.log("  v2: 明るいショップカウンター・棚");
  console.log("  v3: バスケット演出・自然な散らかし");
  console.log("  v4: 窓光差し込む棚・光溢れる空間");
  console.log("");
  console.log("  気に入った番号をClaudeに教えてください！");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main().catch(console.error);
