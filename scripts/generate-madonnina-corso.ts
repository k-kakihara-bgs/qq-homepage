/**
 * QQ ホームページ — Quinte 写真 最終稿 v2
 * Reference A: La Grande Épicerie de Paris（食材の宝庫感・豊かさ・グロッサリー）
 * Reference B: Trattoria Madonnina Milano（伝統的で素朴なミラノのフルコースディナー）
 *
 * 使い方:
 *   OPENAI_API_KEY=sk-... npx tsx scripts/generate-madonnina-corso.ts
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
    key: "c1",
    filename: "corso_c1.png",
    theme: "フルコースの食卓——伝統的ミラノの夕食と食材の宝庫",
    prompt: `A traditional Milanese trattoria dinner table, inspired by Trattoria Madonnina Milano —
honest, rustic, generous, and deeply traditional. The table shows a full Italian dinner in progress.

ON THE TABLE (full course dishes):
- Antipasto: vitello tonnato with thin slices of veal and tuna sauce, a plate of sliced salumi
- Primo: risotto alla milanese, golden and creamy with saffron, steaming gently
- Secondo: cotoletta milanese, golden-breaded veal cutlet, slightly overlapping the plate
- Contorno: sautéed seasonal vegetables with olive oil
- Side: rustic bread, a carafe of house red wine poured into short glasses

ALSO ON AND AROUND THE TABLE (La Grande Épicerie abundance — grocery and specialty items):
Sicilian olive oil bottle, balsamic vinegar aged, pasta packages (Mancini-style), saffron threads
in a small jar, anchovy tin open, capers in brine, fig jam jar, Modica chocolate bar, amaretti
tin, cantuccini bag, natural wine bottle. Fresh items: cherry tomatoes, rosemary, lemon, garlic.

White tablecloth, slightly worn. Rustic wooden chairs. Warm amber candlelight mixed with soft
overhead light — warm, intimate, traditional. The table feels abundant, generous, and deeply real.
This is not a modern restaurant — it is honest, family-style, deeply Italian.
Wide shot, slightly from above. No people.`,
  },
  {
    key: "c2",
    filename: "corso_c2.png",
    theme: "食材棚とミラノの食卓——宝庫が生んだ伝統料理",
    prompt: `A warm and generous scene: a rustic Italian trattoria interior combining La Grande Épicerie
abundance with Trattoria Madonnina Milano's traditional, full-course dinner atmosphere.

BACKGROUND — shelves and counter full of specialty products (La Grande Épicerie abundance):
Dense rows of artisanal Italian grocery items: Sicilian olive oil bottles with handwritten labels,
balsamic vinegar bottles, pasta packages, jars of saffron, capers, sun-dried tomatoes, anchovy tins,
fig jam, bergamot marmalade, Modica chocolate bars, amaretti tins, cantuccini bags, natural wine
bottles, dried porcini in cellophane. At least 15 distinct items clearly visible.

FOREGROUND — the dining table (Trattoria Madonnina full-course):
A set table mid-dinner: steaming risotto alla milanese in a wide bowl, a golden cotoletta milanese,
vitello tonnato antipasto plate, a small cheese selection, rustic bread, short glass of red wine.
White tablecloth, candle flickering, warm light.

The connection is clear: the extraordinary ingredients on the shelves become the extraordinary meal
on the table. Warm amber light throughout. Rustic, honest, traditional. No people.`,
  },
  {
    key: "c3",
    filename: "corso_c3.png",
    theme: "宝庫のカウンター——ミラノ料理の仕込みと素材",
    prompt: `A warm, generous trattoria-style counter scene combining La Grande Épicerie de Paris
visual abundance with the rustic, traditional soul of Trattoria Madonnina Milano.

LEFT SIDE — raw ingredients and specialty grocery items (La Grande Épicerie abundance):
A counter overflowing with: fresh vegetables (radicchio, asparagus, cherry tomatoes on vine),
whole garlic, rosemary, fresh figs halved showing ruby interior, a whole bottarga,
fresh clams still wet, a piece of aged Parmigiano Reggiano, a jar of saffron,
Sicilian olive oil bottle, balsamic vinegar, pasta packages, anchovy tins open,
capers in a jar, fig jam, Modica chocolate bar, amaretti tin, cantuccini bag.
At least 18 different items densely and beautifully arranged.

RIGHT SIDE — traditional Milanese dishes, plated and ready:
Risotto alla milanese (golden, creamy), vitello tonnato (delicate, classic),
cotoletta milanese (breaded, golden), a small antipasto of salumi and pickled vegetables.
A glass of amber natural wine catching the warm light.

Rustic wooden counter. Warm overhead light, slightly soft shadows. Traditional and abundant.
The feeling: everything you need for a perfect traditional Italian dinner, all in one place.
No people. Wide shot.`,
  },
  {
    key: "c4",
    filename: "corso_c4.png",
    theme: "テーブルの物語——コース料理の途中と食材の豊かさ",
    prompt: `A mid-dinner table scene at a traditional Italian trattoria — warm, generous, and abundant —
combining La Grande Épicerie visual richness with the full-course tradition of Trattoria Madonnina Milano.

The table is a long rustic wooden table with a white linen cloth, mid-meal, showing evidence of
a wonderful dinner in progress. Multiple courses visible simultaneously:

DISHES ON TABLE:
- A half-finished risotto alla milanese (golden, saffron-yellow, the spoon resting in it)
- Vitello tonnato slices, a few remaining on the plate
- A golden cotoletta milanese just served, breaking the crust visible at the edge
- A plate of seasonal salad with oil and vinegar
- A cheese plate: Parmigiano, Taleggio, one aged pecorino
- Rustic bread, torn pieces, olive oil dish
- A carafe of natural red wine and two short glasses, one half-drunk
- A small dessert: panna cotta with fig jam

SPECIALTY ITEMS ON TABLE (La Grande Épicerie abundance — as part of the dinner setting):
Open anchovy tin, capers in a small dish, a bottle of extra virgin olive oil half-used,
balsamic vinegar, a Modica chocolate bar partially broken, a cantuccini tin open,
a small jar of saffron, cherry tomatoes still on vine as centerpiece.

Warm candlelight. Rustic, generous, deeply Italian. No people. Slightly overhead angle.`,
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

  console.log("🚀 Quinte 写真 — La Grande Épicerie × Trattoria Madonnina（フルコース版）");
  console.log("   食材の宝庫感 × 伝統的で素朴なミラノのフルコースディナー");
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
  console.log("  c1: フルコースの食卓——伝統的ミラノの夕食と食材の宝庫");
  console.log("  c2: 食材棚とミラノの食卓——宝庫が生んだ伝統料理");
  console.log("  c3: 宝庫のカウンター——ミラノ料理の仕込みと素材");
  console.log("  c4: テーブルの物語——コース料理の途中と食材の豊かさ");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("\n実行コマンド（OPENAI_API_KEYをターミナルで設定してください）:");
  console.log("  OPENAI_API_KEY=sk-... npx tsx scripts/generate-madonnina-corso.ts");
}

main().catch(console.error);
