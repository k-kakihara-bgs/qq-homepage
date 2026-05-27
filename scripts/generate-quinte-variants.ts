/**
 * QQ ホームページ — Quinte（レストラン）写真 複数案生成スクリプト
 * 4パターンのプロンプトで候補画像を生成し、public/images/preview/ に保存する
 *
 * 使い方:
 *   OPENAI_API_KEY=sk-... npx tsx scripts/generate-quinte-variants.ts
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
    filename: "quinte_v1.png",
    theme: "温かみのある夜の食卓（メインビジュアル）",
    prompt: `Intimate Italian restaurant table setting, warm candlelight and soft ambient light —
not dark, warm and inviting. A beautifully plated primi piatti: fresh hand-rolled pasta
with truffle shavings on a white ceramic plate. A glass of deep red Barolo wine beside it.
Rustic wooden table with a folded linen napkin, a small candle, simple silver cutlery.
Soft bokeh background suggesting a cozy trattoria. Deep terracotta and warm cream tones.
Cinematic food photography, natural feel, not overly staged. No people.`,
  },
  {
    key: "v2",
    filename: "quinte_v2.png",
    theme: "明るめのランチ・昼の食卓",
    prompt: `Bright and airy Italian restaurant lunch scene. Natural daylight through tall windows.
A beautifully presented pasta dish on a white plate — tagliolini with bottarga and lemon zest.
A glass of white wine (Vermentino). Linen tablecloth, simple Italian ceramic, a small vase
with a single wildflower. Warm white walls, soft shadow. Feels like a relaxed Italian osteria
at lunchtime. Editorial food photography, bright, not dark. No people.`,
  },
  {
    key: "v3",
    filename: "quinte_v3.png",
    theme: "ワインと前菜のテーブル（複数皿）",
    prompt: `Warm, inviting Italian restaurant table with multiple small dishes — an antipasto spread.
A board with prosciutto and fresh figs, a small bowl of marinated olives, bruschetta with
San Marzano tomatoes, a glass of natural orange wine catching the light. Rustic ceramic dishes.
Soft candlelight and warm amber overhead light — bright enough to see all details clearly.
Natural linen, dark wooden table. Feels convivial and generous. Cinematic but not overly styled.
No people.`,
  },
  {
    key: "v4",
    filename: "quinte_v4.png",
    theme: "レストラン内観（雰囲気・空間）",
    prompt: `Cozy Italian restaurant interior, warm evening light. A few empty tables set with white
linen and simple glassware, soft candlelight on each table. Exposed brick wall or warm plaster,
dark wooden furniture. A shelf with wine bottles in the background. Soft, warm, intimate
atmosphere — like a beloved neighborhood trattoria in a quiet Italian town. Bright enough
to feel welcoming, not dark or moody. Cinematic interior photography. No people.`,
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
    console.error("   OPENAI_API_KEY=sk-... npx tsx scripts/generate-quinte-variants.ts");
    process.exit(1);
  }

  console.log("🚀 Quinte レストラン写真 複数案生成スクリプト");
  console.log(`   出力先: ${OUTPUT_DIR}`);
  console.log(`   生成枚数: ${variants.length}枚`);
  console.log(`   モデル: gpt-image-1 high (1536×1024)`);
  console.log(`   推定コスト: $${(variants.length * 0.19).toFixed(2)}\n`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
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
  console.log("  v1: 温かみのある夜の食卓（メインビジュアル）");
  console.log("  v2: 明るめのランチ・昼の食卓");
  console.log("  v3: ワインと前菜のテーブル（複数皿）");
  console.log("  v4: レストラン内観（雰囲気・空間）");
  console.log("");
  console.log("  気に入った番号をClaudeに教えてください！");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main().catch(console.error);
