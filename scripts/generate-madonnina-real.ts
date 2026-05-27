/**
 * QQ ホームページ — Quinte 写真 最終稿 v5
 * Reference A: La Grande Épicerie de Paris（個性的な食材・グロッサリーの宝庫感）
 * Reference B: Trattoria Madonnina Milano Instagram
 *   — 白いテーブルクロス・温かいアンバー光・個性的な器・素朴な盛り付け
 *   — 伝統的なイタリアンディナー・食材も器も個性が際立つ
 *
 * 使い方:
 *   OPENAI_API_KEY=sk-... npx tsx scripts/generate-madonnina-real.ts
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
    key: "mr1",
    filename: "mr_mr1.png",
    theme: "乾杯と個性的な器——複雑な料理と希少食材の食卓",
    prompt: `A warm, convivial Italian dinner table inspired by Trattoria Madonnina Milano —
white linen tablecloth, warm amber candlelight, generous and deeply traditional.
Combined with La Grande Épicerie de Paris ingredient character and abundance.

VESSELS AND COMPLEX DISHES — each vessel utterly different, each dish multi-layered:

- A thick uneven hand-thrown ceramic bowl (olive-green ash glaze, rough exterior):
  Risotto nero alla milanese — jet-black squid ink risotto, its surface broken by a mound
  of diced raw scallop marinated in colatura di alici, topped with whole bottarga shaved
  paper-thin into translucent curls, a pool of vivid saffron oil drizzled around the edge,
  fresh sea herbs scattered. Dramatically dark against the green glaze.

- An antique porcelain plate (cream, scattered hand-painted violet wildflowers, chipped rim):
  Vitello tonnato reimagined — translucent veal slices fanned in a wide arc, each one
  draped with a ribbon of dense tuna-anchovy cream, then scattered with fried capers
  (burst open, crispy), thin-sliced Tropea onion pickled vivid magenta, a quenelle of
  bottarga butter melting at the center, herb oil pooled in a crescent.

- A well-seasoned black cast iron skillet, still faintly sizzling:
  Gnocco fritto with accompaniments — golden blistered dough puffs piled high, alongside
  a ramekin of warm 'nduja whipped with stracciatella (vivid orange-red against white),
  a small copper dish of Castelmagno fonduta, and pickled Treviso radicchio in a curl.

- A dark slate board:
  Three-cheese composition — Castelmagno crumbled into shards, Taleggio sliced showing
  the runny interior, aged Parmigiano broken roughly. Honeycomb pooling into the gaps,
  borlotti beans roasted and scattered, fig mostarda in a ramekin, walnut halves arranged.

DISTINCTIVE INGREDIENTS on the table (La Grande Épicerie):
Whole bottarga di muggine (amber, wax-sealed), saffron pistils jar, Treviso radicchio bundle,
violet artichokes halved, borlotti bean pods, colatura di alici bottle, 'nduja terracotta jar,
fig mostarda, Modica chocolate unwrapped, cantuccini bag, natural wine bottle.
At least 14 distinct characterful items visible.

Two large wide-bowled wine glasses — deep ruby, hands clinking in a toast.
Rustic wooden furniture in background. Shot slightly from above. No faces.`,
  },
  {
    key: "mr2",
    filename: "mr_mr2.png",
    theme: "個性的な器の競演——複層的な料理と希少食材の饗宴",
    prompt: `A richly textured Italian dinner table combining Trattoria Madonnina Milano's rustic
tradition with La Grande Épicerie de Paris ingredient character.
Every vessel is UNIQUE. Every dish is MULTI-LAYERED and visually complex.

VESSELS AND COMPLEX DISHES — all mismatched, each dish dramatically composed:

- A deep cobalt-blue majolica bowl (painted lemons and leaves, Sicilian):
  Paccheri al ragù di polpo — wide tube pasta in a deeply reduced octopus ragù
  (near-black, glossy), each pacchero standing upright to show its hollow interior,
  a tangle of crispy fried calamari on top, a smear of vivid green pistachio pesto
  around the rim, bottarga shaved over everything, wild herb oil drizzled in arcs.

- A small hammered copper cocotte (patina worn to rose-gold, lid beside it):
  Ossobuco alla milanese — the cross-cut veal shank filling the vessel, marrowbone
  upright at the center, the sauce deeply reduced and mahogany-dark, gremolata scattered
  (bright lemon zest, parsley, raw garlic) creating vivid green-yellow contrast against
  the dark meat, a smear of saffron risotto pressed against one side.

- A shallow terracotta tray (rough, fire-marked, dark):
  Violet artichokes three ways — one charred whole (blackened exterior, split to reveal
  golden interior), one braised with anchovy butter (glistening, soft), one raw and shaved
  paper-thin into a fan. Colatura di alici in a tiny ceramic cup for dipping.

- A vintage enamel plate (white with dark blue rim, slightly dented):
  Polenta e funghi — soft golden polenta as a base, a tower of mixed wild mushrooms
  (fresh porcini sliced thick, black trumpets, golden chanterelles) sautéed in herbs,
  Castelmagno crumbled over the top melting into the heat, aged balsamic in dark drops.

- A worn wooden board:
  Gnocco fritto piled high and golden, a ramekin of 'nduja whipped with stracciatella
  (vivid orange-red swirled into white), Tropea onion jam, fig mostarda, pickled vegetables.

DISTINCTIVE INGREDIENTS (La Grande Épicerie): Whole bottarga, saffron vial, Treviso radicchio,
fresh porcini, borlotti pods, colatura di alici, fig mostarda, Castelmagno, Modica chocolate,
cantuccini bag, skin-contact wine bottle. At least 15 items.

White tablecloth. Warm amber candlelight. Shot slightly from above. No faces.`,
  },
  {
    key: "mr3",
    filename: "mr_mr3.png",
    theme: "食材棚と個性派テーブル——希少な宝庫から生まれる複雑な料理",
    prompt: `A warm, wide scene combining La Grande Épicerie de Paris ingredient character
with Trattoria Madonnina Milano's traditional rustic dinner atmosphere.
Both vessels and ingredients are distinctly individual. Every dish is visually complex.

BACKGROUND — specialty shelves (La Grande Épicerie, deeply characterful):
Rustic wooden shelves densely stocked: whole bottarga di muggine (wax-sealed, amber),
colatura di alici bottles (dark amber, tiny), Castelmagno wedge, saffron pistils in glass jars,
Treviso radicchio bundles (deep ruby), violet artichokes, borlotti beans in vivid speckled pods,
fresh porcini mushrooms, 'nduja in a terracotta jar, fig mostarda, Tropea onion jam,
Modica chocolate bars, cantuccini bags, amaretti tins, skin-contact wine bottles,
unusual pasta packages (trofie, malloreddus, paccheri, spaghetti alla chitarra). 16+ items.

FOREGROUND — dinner table with mismatched vessels, each dish multi-layered and complex:

- A cobalt majolica bowl (lemon-leaf pattern): Risotto with squid ink base (jet-black,
  glossy), topped with a tower of sautéed scampi, vivid saffron oil in arcs around the rim,
  whole bottarga shaved into translucent curls over the top, a drizzle of colatura di alici.

- An antique floral porcelain plate (chipped, pale cream with painted wildflowers):
  Vitello tonnato — translucent veal fanned precisely, fried caper buds scattered (burst
  and crispy), Tropea onion pickled vivid magenta, anchovy-tuna cream in a ribbon,
  a quenelle of bottarga butter melting at the center, tiny herb flowers.

- A cast iron skillet, slightly smoking:
  Gnocco fritto piled golden, ramekin of 'nduja-stracciatella swirl (orange-red into white),
  Castelmagno fonduta in a small copper cup, pickled Treviso radicchio curl.

- A dark slate board:
  Aged Parmigiano shards, Castelmagno crumbled, Taleggio slice showing runny interior,
  honeycomb pooling, fig mostarda, prosciutto draped over a wedge of still-warm focaccia.

Two large wine glasses — deep ruby and vivid amber skin-contact. Shot wide. No faces.`,
  },
  {
    key: "mr4",
    filename: "mr_mr4.png",
    theme: "食事の途中——個性的な器と複雑な料理が混在する豊かな食卓",
    prompt: `A mid-dinner table scene at a traditional Italian trattoria — warm, abundant,
deeply characterful. Inspired by Trattoria Madonnina Milano and La Grande Épicerie de Paris.
Every vessel is different. Every dish is visually complex and multi-layered. Nothing is generic.

Shot from slightly above. White linen tablecloth. Warm amber and golden candlelight.

DISHES IN MISMATCHED VESSELS — each one complex and dramatically composed:

- A hand-thrown stoneware bowl (matte stone-grey, uneven rim, partly eaten):
  Pasta e ceci — thick and creamy, a tangle of crispy fried sage leaves on top,
  colatura di alici in a dark thread drizzled across the surface, wild boar guanciale
  lardons rendered and scattered, fresh borlotti beans added whole at the end,
  black pepper cracked visibly.

- A small fat terracotta pot with two handles (steam still rising):
  Risotto alla milanese — saffron-gold, mantecato to a wave-like consistency,
  whole bottarga being shaved at the table mid-service (the bottarga piece resting
  on the rim of the pot, a shaving tool beside it), gold leaf on one side.

- A vintage enamel tray (butter-yellow, rim chips showing iron underneath):
  Gnocco fritto piled high and golden — alongside a ramekin of 'nduja whipped with
  stracciatella (vivid orange-red swirled into white cream), a small copper cup of
  warm Castelmagno fonduta, Tropea onion mostarda, pickled violet artichoke quarters.

- An antique porcelain plate (hand-painted wild herbs, early 20th century, slightly worn):
  Carpaccio di manzo — paper-thin beef fanned across the full plate, underneath a layer
  of rocket, on top: Parmigiano shaved in wide translucent ribbons, fried capers burst
  open and crispy, Tropea onion pickled vivid pink, truffle oil in gold drops, sea salt.

- A dark slate board:
  Three cheese progression — young Castelmagno (crumbled and milky), aged Castelmagno
  (darker, crumbled into amber shards), Taleggio (runny interior exposed by cutting),
  chestnut honey pooling into the gaps, borlotti beans roasted as decoration,
  prosciutto layered with still-warm focaccia, fig mostarda.

DISTINCTIVE SPECIALTY ITEMS WOVEN IN (La Grande Épicerie):
Whole bottarga piece, saffron vial, Treviso radicchio, fresh porcini sliced open,
colatura di alici bottle, fig mostarda, 'nduja terracotta jar, Modica chocolate broken,
cantuccini bag, Tropea onion vivid purple, violet artichoke halved, handwritten-label wine bottle.
At least 12 characterful items visible.

No matching vessels. No faces. Arms may be partially visible. Warm and generous.`,
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

  console.log("🚀 Quinte 写真 — La Grande Épicerie × Trattoria Madonnina（実写参考版）");
  console.log("   食材の宝庫感 × 伝統的で素朴なイタリアンディナー（アンバー光・白クロス・複数皿）");
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
  console.log("  mr1: 乾杯と伝統料理——アンバー光の食卓と食材の豊かさ");
  console.log("  mr2: 木のボードとテーブルの饗宴——伝統的アンティパストと宝庫感");
  console.log("  mr3: 食材棚とトラットリアの食卓——宝庫から生まれる伝統料理");
  console.log("  mr4: 食事の途中——複数の皿とグロッサリーが共存する伝統的な食卓");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main().catch(console.error);
