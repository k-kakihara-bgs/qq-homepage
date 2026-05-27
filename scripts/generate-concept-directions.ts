/**
 * QQ コンセプトページ — ビジュアル方向性 4案 生成スクリプト
 *
 * 使い方:
 *   OPENAI_API_KEY=sk-... npx tsx scripts/generate-concept-directions.ts
 *
 * 生成後: Finder で public/images/preview/ を開いて4枚を比較し、
 * 好みの方向性をClaudeに伝えてください。
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
    key: "A",
    filename: "concept_A_alley.png",
    theme: "路地の奥の灯り — 偶然たどり着く5番目の場所",
    prompt: `A narrow Japanese back-alley at twilight. At the end of the lane, a single warmly lit shop window glows softly — a tiny Italian specialty deli tucked away, barely visible signage, potted herbs at the entrance, warm amber light spilling onto damp cobblestones. The feeling of stumbling upon a hidden secret place. Deep atmospheric perspective drawing the eye into the distance. Watercolor illustration style, soft painterly brushwork, rich deep shadows contrasting with warm interior glow, muted indigo and amber palette. Wide landscape composition, centered focal point. No people.`,
  },
  {
    key: "B",
    filename: "concept_B_book.png",
    theme: "本とテーブル — お気に入りのブックカバー",
    prompt: `A beautiful linen-bound hardcover book resting on a worn wooden table, its cover a deep forest green. Beside it: a small glass of deep ruby red wine catching the afternoon light, and a thin sliver of aged Parmigiano. Late golden afternoon sunlight through a half-open window casts long soft shadows. The book is the quiet hero of the scene — it holds something precious inside. Literary, intimate, contemplative mood. Watercolor illustration style, warm muted earth tones, soft brushwork. Wide landscape composition, centered. No people.`,
  },
  {
    key: "C",
    filename: "concept_C_backstage.png",
    theme: "舞台袖のキッチン — 特等席から見る非日常の扉",
    prompt: `A heavy wooden door slightly ajar, revealing a warm glowing kitchen beyond — the backstage of a small Italian restaurant. Through the gap: a white chef's apron hanging on a hook, fresh pasta dough on a floured counter, a copper pot, bundles of herbs, the soft chaos of preparation. Viewpoint is from outside looking in, like peeking behind the theater curtain. The contrast between the cooler corridor outside and the warm golden world within. Painterly watercolor illustration style, theatrical light and shadow, earthy tones. Wide landscape composition, centered. No people.`,
  },
  {
    key: "D",
    filename: "concept_D_quiet.png",
    theme: "静かなひとりの時間 — 日常をログアウトする余白",
    prompt: `A single wooden chair beside a tall window in a quiet sun-lit room. On the small table: one glass of pale golden white wine, an open notebook with a few handwritten lines, a small sprig of fresh rosemary. Outside the window, the soft impressionistic blur of a city street. Everything is still. The atmosphere is one of exhaling slowly — a private moment of unhurried rest. Watercolor illustration style, minimal composition, soft pale warm light, calm and meditative. Wide landscape composition, centered. No people.`,
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
    console.error("   OPENAI_API_KEY=sk-... npx tsx scripts/generate-concept-directions.ts");
    process.exit(1);
  }

  console.log("🚀 QQ コンセプト ビジュアル方向性 4案 生成スクリプト");
  console.log(`   出力先: ${OUTPUT_DIR}`);
  console.log(`   生成枚数: ${variants.length}枚`);
  console.log(`   モデル: gpt-image-1 high (1536×1024)`);
  console.log(`   推定コスト: $${(variants.length * 0.19).toFixed(2)}\n`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`   📁 フォルダ作成: ${OUTPUT_DIR}`);
  }

  console.log("方向性 4案:");
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
  console.log("  A: 路地の奥の灯り");
  console.log("  B: 本とテーブル（ブックカバーメタファー）");
  console.log("  C: 舞台袖のキッチン");
  console.log("  D: 静かなひとりの時間");
  console.log("");
  console.log("  気に入った方向性（A/B/C/D）をClaudeに教えてください！");
  console.log("  複数選んでもOKです。");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main().catch(console.error);
