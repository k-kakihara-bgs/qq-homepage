/**
 * ショップ商品イラスト生成スクリプト
 * 実行: npx tsx scripts/generate-shop-illustrations.ts
 * 前提: OPENAI_API_KEY が環境変数に設定済みであること
 * 推定コスト: 12枚 × $0.04 ≒ $0.48
 */

import OpenAI from "openai";
import * as fs from "fs";
import * as path from "path";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const BASE_STYLE =
  "Delicate Italian-style watercolor food illustration, soft warm tones, white background, " +
  "elegant minimalist style, no text, no labels, suitable for a boutique Italian gastronomia. " +
  "Square format, centered composition, generous white space around the subject.";

const illustrations: { file: string; subject: string }[] = [
  {
    file: "souzai.png",
    subject:
      "Italian deli antipasti selection, small rustic ceramic plates with colorful garnishes, " +
      "delicate arrangement of various small bites, warm amber tones.",
  },
  {
    file: "focaccia.png",
    subject:
      "Freshly baked focaccia bread with olive oil sheen, golden dimpled crust, sprigs of rosemary, " +
      "sea salt crystals, torn piece showing airy interior.",
  },
  {
    file: "aragosta.png",
    subject:
      "Aragosta lobster-tail choux pastry, golden crispy laminated shell curved like a lobster tail, " +
      "cream filling visible at one end, dusted with powdered sugar, elegant pastry.",
  },
  {
    file: "zuppa.png",
    subject:
      "Rustic Italian soup in a ceramic bowl, steam rising gently, colorful seasonal vegetables, " +
      "wooden spoon resting on the side, warm earthy tones.",
  },
  {
    file: "parmigiano.png",
    subject:
      "Parmigiano Reggiano cheese wedge with crystalline granular texture, amber and straw-yellow hues, " +
      "crumbly broken edge showing the aged interior.",
  },
  {
    file: "grana.png",
    subject:
      "Grana Padano hard cheese wedge with a small cheese knife, pale golden interior, " +
      "smooth rind, delicate crystalline texture.",
  },
  {
    file: "prosciutto.png",
    subject:
      "Prosciutto di Parma thinly sliced, delicate rose-pink translucent cured ham, " +
      "gently draped and folded, marbled fat visible, elegant.",
  },
  {
    file: "salumi.png",
    subject:
      "Italian salumi selection, sliced salami rounds and cured meats on a small wooden board, " +
      "rich earthy deep red tones, rustic arrangement.",
  },
  {
    file: "wine.png",
    subject:
      "Elegant Italian wine bottle with a glass of deep ruby red wine beside it, " +
      "a few scattered grape leaves, warm candlelight atmosphere, Tuscan style.",
  },
  {
    file: "oliveoil.png",
    subject:
      "Olive oil bottle with golden liquid, a small branch of green olives with leaves, " +
      "golden-green tones, Mediterranean light, Sicilian style.",
  },
  {
    file: "balsamico.png",
    subject:
      "Balsamic vinegar dark glass bottle, rich dark mahogany drops drizzled, " +
      "a small sprig of herbs beside it, Modena heritage.",
  },
  {
    file: "sottolio.png",
    subject:
      "Assorted Italian preserved foods in small glass jars, artichoke hearts, sun-dried tomatoes, " +
      "tuna sott'olio, arranged together, warm golden tones.",
  },
];

const OUTPUT_DIR = path.join(
  process.cwd(),
  "public",
  "images",
  "shop"
);

async function generateIllustration(file: string, subject: string): Promise<void> {
  const outputPath = path.join(OUTPUT_DIR, file);

  if (fs.existsSync(outputPath)) {
    console.log(`  スキップ（既存）: ${file}`);
    return;
  }

  console.log(`  生成中: ${file}...`);

  const response = await client.images.generate({
    model: "gpt-image-1",
    prompt: `${BASE_STYLE} ${subject}`,
    size: "1024x1024",
    quality: "standard",
    n: 1,
  });

  const imageData = response.data?.[0];
  if (!imageData) throw new Error(`No image data for ${file}`);

  if (imageData.b64_json) {
    // base64レスポンスの場合
    const buffer = Buffer.from(imageData.b64_json, "base64");
    fs.writeFileSync(outputPath, buffer);
  } else if (imageData.url) {
    // URLレスポンスの場合
    const res = await fetch(imageData.url);
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(outputPath, buffer);
  } else {
    throw new Error(`No image data (b64_json or url) for ${file}`);
  }

  console.log(`  完了: ${file}`);
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("エラー: OPENAI_API_KEY が設定されていません。");
    process.exit(1);
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`ショップ商品イラストを生成します（全${illustrations.length}枚）\n`);

  for (const { file, subject } of illustrations) {
    try {
      await generateIllustration(file, subject);
    } catch (err) {
      console.error(`  エラー: ${file} -`, err);
    }
  }

  console.log("\n完了しました！public/images/shop/ を確認してください。");
  console.log("その後 ~/.local/bin/vercel --prod でデプロイしてください。");
}

main();
