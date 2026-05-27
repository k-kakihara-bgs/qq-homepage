/**
 * QQ ホームページ — Quinte 写真 第3稿
 * 「健康的・素材感・躍動感」への方向転換
 *
 * 前稿の課題: 暗すぎ・寂しすぎ
 * 新方針: 明るい自然光 × 生き生きとした素材 × 熱気・動き
 *
 * 使い方:
 *   OPENAI_API_KEY=sk-... npx tsx scripts/generate-quinte-vibrant.ts
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
    theme: "生パスタを打つ——粉が舞い、手が踊る",
    prompt: `A chef's hands kneading fresh pasta dough on a well-lit wooden counter dusted with flour.
Flour particles floating in warm natural light from a nearby window. The dough is golden and
smooth, full of texture. Nearby: a pasta wheel, a bowl of semolina, a bunch of fresh basil,
a halved lemon catching the light. The scene is bright, warm, and full of life and motion.
You can almost feel the texture of the dough. The energy is focused and skilled.
Natural daylight, warm tones. Bright, not dark. Food editorial photography. No people's face.`,
  },
  {
    key: "v2",
    filename: "quinte_v2.png",
    theme: "食材の生命力——三河・知多の素材が並ぶ",
    prompt: `A bright, beautiful spread of fresh seasonal Italian and Japanese local ingredients
on a light stone or marble counter, bathed in natural window light.
Fresh clams from Mikawa Bay glistening with water, a whole bottarga, vibrant green herbs
(parsley, basil, rosemary), yellow and red cherry tomatoes, a lemon sliced open showing
its vivid interior, strands of fresh handmade pasta, a small copper pot.
Abundant, alive, full of color and texture. The light catches every surface.
Bright editorial food photography, overhead or slight angle. No people.`,
  },
  {
    key: "v3",
    filename: "quinte_v3.png",
    theme: "仕上げの瞬間——炎と躍動",
    prompt: `A chef finishing a dish at a bright professional kitchen counter — close-up on hands
and the plate. The kitchen is well-lit and active: warm overhead lighting, a gas flame
visible in the background, steam rising from a copper pan. The plate holds a vibrant,
beautifully composed pasta dish with a pool of vivid herb oil, bottarga shavings,
fresh herbs on top. The scene feels alive and energetic — this is a kitchen at work,
full of skill and heat and passion. Bright warm light, not dark.
Cinematic but grounded. No face visible.`,
  },
  {
    key: "v4",
    filename: "quinte_v4.png",
    theme: "カウンター席から見える厨房の活気",
    prompt: `View from a warm counter seat looking toward an open kitchen in a small Italian restaurant.
The kitchen is brightly lit and active — chefs (blurred, in motion) working at the pass,
steam rising, copper pans gleaming under strong overhead lights. In the foreground:
a glass of natural white wine and a small amuse-bouche on a white plate, both in sharp focus.
The counter is dark wood, worn and warm. The contrast between the intimate foreground
and the energetic kitchen behind creates a sense of being at the center of something alive.
Bright, warm, vibrant. You are a participant, not just an observer. No clear faces.`,
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

  console.log("🚀 Quinte 写真 第3稿（健康的・素材感・躍動感）");
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
  console.log("  v1: 生パスタを打つ——粉が舞い、手が踊る");
  console.log("  v2: 食材の生命力——三河・知多の素材が並ぶ");
  console.log("  v3: 仕上げの瞬間——炎と躍動");
  console.log("  v4: カウンター席から見える厨房の活気");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main().catch(console.error);
