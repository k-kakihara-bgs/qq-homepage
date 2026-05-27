/**
 * QQ ホームページ — AI画像生成スクリプト
 * gpt-image-1でブランドイメージに合った写真を生成し、public/imagesに保存する
 *
 * 使い方:
 *   1. .env.local に OPENAI_API_KEY=sk-... を設定
 *   2. npx tsx scripts/generate-images.ts
 */

import OpenAI from "openai";
import * as fs from "fs";
import * as path from "path";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const OUTPUT_DIR = path.join(process.cwd(), "public", "images");

type ImageSpec = {
  key: string;
  filename: string;
  prompt: string;
};

const images: ImageSpec[] = [
  {
    key: "quinte",
    filename: "quinte.png",
    prompt: `Elegant Italian restaurant fine dining scene. Dimly lit with warm candlelight.
Rustic wooden table with a beautifully plated pasta dish — hand-rolled tagliatelle with
truffle shavings and a glass of aged Barolo red wine. Deep green and terracotta tones.
Moody Italian trattoria atmosphere, bokeh background, cinematic food photography style.
Shot on 50mm lens, f/1.4. No people.`,
  },
  {
    key: "quinto",
    filename: "quinto.png",
    prompt: `Artisanal Italian gourmet deli interior. Warm amber lighting, rustic wooden shelves
and countertops filled with aged Parmigiano Reggiano wheels, whole prosciutto legs,
colorful jars of preserved olives and sun-dried tomatoes, bottles of extra virgin olive oil,
Chianti wine. Beautiful product arrangement, editorial food photography style.
Gastronomia aesthetic, deep green and gold accents. No people.`,
  },
];

async function generateImage(spec: ImageSpec): Promise<void> {
  console.log(`\n🎨 生成中: ${spec.key} (${spec.filename})`);
  console.log(`   プロンプト: ${spec.prompt.slice(0, 80)}...`);

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
    console.error("   .env.local に OPENAI_API_KEY=sk-... を追加してください");
    console.error("   または: OPENAI_API_KEY=sk-... npx tsx scripts/generate-images.ts");
    process.exit(1);
  }

  console.log("🚀 QQ ホームページ 画像生成スクリプト");
  console.log(`   出力先: ${OUTPUT_DIR}`);
  console.log(`   生成画像数: ${images.length}枚`);
  console.log(`   モデル: gpt-image-1 high (1536×1024)`);
  console.log(`   推定コスト: $${(images.length * 0.19).toFixed(2)}\n`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const spec of images) {
    try {
      await generateImage(spec);
    } catch (error) {
      console.error(`❌ ${spec.key} の生成に失敗:`, error);
      console.error("   しばらく待ってから再試行してください");
    }
  }

  console.log("\n🎉 完了！");
  console.log("次のステップ:");
  console.log("  1. public/images/ の画像を確認");
  console.log("  2. 問題なければ npm run dev でプレビュー確認");
  console.log("  3. ~/.local/bin/vercel --prod でデプロイ");
}

main().catch(console.error);
