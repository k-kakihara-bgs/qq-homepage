// コースの各料理
export type CourseDish = {
  course: string; // "Antipasto" / "Primo Piatto" など
  name: string;   // 料理名
};

// コースセット（場面）
export type CourseSet = {
  scene: number;         // 場面番号 (1/2/3)
  titleIt: string;       // イタリア語タイトル
  titleJp: string;       // 日本語タイトル
  narrative: string;     // 詩的な説明文（PDF全文）
  narrativeSub: string;  // 説明文後段（ダッシュ以降の要約）
  dishes: CourseDish[];  // 含まれる料理一覧
  dolce: string;         // デザート表記
  price: string;         // 価格
  suggestion: string;    // 「物語を広げるなら」提案
};

// アラカルトメニュー
export type MenuItem = {
  name: string;
  nameIt?: string;
  description: string; // 詩的なサブタイトル
  poetryText: string;  // PDFの2行詩テキスト（\n区切り）
  price: string;
  note?: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  titleIt: string;
  items: MenuItem[];
};

// ── コースセット（3場面）──────────────────────────────
export const courseSets: CourseSet[] = [
  {
    scene: 1,
    titleIt: "Incrocio dei mari del sud",
    titleJp: "南の海の交差点",
    narrative:
      "深い青に溺れる前に、漁師は一度だけ岸を振り返る。その時、月明かりに照らされた銀色の魚と、潮風が運んできた黄金の果実が混ざり合った。",
    narrativeSub:
      "三河湾の瑞々しさと柑橘の光を纏った、透き通るような海のプロローグ。",
    dishes: [
      {
        course: "Stuzzichino",
        name: "南知多しらすのブルスケッタ　キャビア添え",
      },
      {
        course: "Antipasto",
        name: "「三河湾魚介」の炙りと海のコンソメジュレ　冷製カクテル仕立て",
      },
      {
        course: "Primo Piatto",
        name: "「三河湾産 殻付きウニ」とカラスミのクリーム・スパゲティ",
      },
    ],
    dolce: "本日のデザート2種・小菓子・お飲み物",
    price: "¥3,900",
    suggestion: "深い海底の静寂を足すなら、鮑のコンフィを。",
  },
  {
    scene: 2,
    titleIt: "Aroma d'erba e di terra",
    titleJp: "草いきれと大地の香",
    narrative:
      "古い石造りの貯蔵庫で、熟成を待つのは時間そのもの。土を蹴る牛の力強さと、雨上がりの森が放つ深い溜息が、静かに一皿へ溶けていく。",
    narrativeSub:
      "噛みしめるほどに記憶が呼び起こされる、生命力に満ちた大地の章。",
    dishes: [
      {
        course: "Antipasto",
        name: "イタリア産ブッラータと自家製山羊のリコッタ　季節のフルーツと生ハム",
      },
      {
        course: "Secondo Piatto",
        name: "「みかわ牛ゴールド」の炭焼き　赤ワインソースと炭仕立てのキャッサバ添え",
      },
    ],
    dolce: "本日のデザート2種・小菓子・お飲み物",
    price: "¥4,200",
    suggestion: "肉の対話をさらに深めるなら、知多牛ラグーのアニョロッティを。",
  },
  {
    scene: 3,
    titleIt: "Primo Fila dietro le Quinte",
    titleJp: "舞台袖の特等席",
    narrative:
      "カーテンが上がる直前、舞台袖は最も濃密な予感に包まれる。磨かれた銀食器の触れ合う音が合図となり、今、誰も知らない祝祭が幕を開ける。",
    narrativeSub:
      "厳選された素材たちが主役を演じる、贅沢なライブ感溢れるメインストーリー。",
    dishes: [
      {
        course: "Stuzzichino",
        name: "南知多しらすのブルスケッタ　キャビア添え",
      },
      {
        course: "Antipasto",
        name: "「三河湾魚介」の炙りと海のコンソメジュレ　冷製カクテル仕立て",
      },
      {
        course: "Secondo Piatto",
        name: "「みかわ牛ゴールド」の炭焼き　赤ワインソースと炭仕立てのキャッサバ添え",
      },
    ],
    dolce: "本日のデザート3種・小菓子・お飲み物",
    price: "¥5,000",
    suggestion: "大理石の街の潮風を挟むなら、ボンゴレビアンコを。",
  },
];

// ── アラカルト（4カテゴリ）──────────────────────────────
export const menuCategories: MenuCategory[] = [
  {
    id: "antipasti",
    title: "彩りを添える一皿",
    titleIt: "Antipasti",
    items: [
      {
        name: "師崎産 鮑のコンフィと夏トリュフのカルパッチョ",
        description: "深海と森の邂逅",
        poetryText: "漁師が夜明け前に見上げた月と、\n黒いダイヤモンドの香り。",
        price: "¥2,000",
      },
      {
        name: "愛知産 絹姫サーモンとキャビアのズッキーニ包み",
        description: "アマルフィの明るい昼下がり",
        poetryText: "陽光を緑の膜で閉じ込めて。\n宝石を散りばめた海岸線。",
        price: "¥1,800",
      },
      {
        name: "イタリア産ブッラータと自家製山羊のリコッタ　季節のフルーツと生ハム",
        description: "乳白色の休息",
        poetryText: "柔らかな口当たりが、\n張り詰めた日常をほどいていく。",
        price: "¥1,800",
      },
      {
        name: "「本日の舞台裏から」シェフ厳選の冷・温菜盛り合わせ",
        description: "即興のパレット",
        poetryText: "その時、最も状態の良い素材たちが演じる、\n賑やかな幕間。",
        price: "¥1,800",
      },
    ],
  },
  {
    id: "primi",
    title: "物語に深みを与えるパスタ・リゾット",
    titleIt: "Primi Piatti",
    items: [
      {
        name: '三河湾あさりとハマグリのボンゴレビアンコ "ピエトラサンタ"',
        description: "彫刻家の休息",
        poetryText: "大理石の街を吹き抜ける潮風。\nシンプルで力強い、真っ白な味わい。",
        price: "¥1,800",
      },
      {
        name: "自家製グァンチャーレのアマトリチャーナ（手打ちキタッラ）",
        description: "ある仕立て屋のこだわり",
        poetryText: "一本筋の通った職人気質な一皿。\n熟成の旨味が物語を加速させる。",
        price: "¥1,800",
      },
      {
        name: "知多牛ラグーの「アニョロッティ・ダル・プリン」",
        description: "舞台裏の秘密の贈り物",
        poetryText: "小さなパスタに詰まった知多牛の記憶。\n指先でつまむ親密な動作。",
        price: "¥1,800",
      },
      {
        name: "フランス産ポルチーニ茸のリゾット",
        description: "森の深呼吸",
        poetryText: "芳醇な香りが立ち上り、\n物語を静かな昂ぶりへと導く。",
        price: "¥2,000",
      },
    ],
  },
  {
    id: "secondi",
    title: "物語の核心を突く主菜",
    titleIt: "Secondi Piatti",
    items: [
      {
        name: "みかわ牛ゴールドの炭焼き　赤ワインソースと炭仕立てのキャッサバ添え",
        description: "火の洗礼",
        poetryText: "炭の香りを纏った肉の咆哮。\nソースの一滴までが、作者の確かな意志。",
        price: "¥3,000",
      },
      {
        name: "名古屋コーチンとポルチーニのインボルティーニ",
        description: "故郷を愛した貴族の晩餐",
        poetryText: "郷土愛と贅が交差する、\n情熱的な結末。",
        price: "¥1,800",
      },
    ],
  },
  {
    id: "formaggi",
    title: "思考を深める余韻",
    titleIt: "Formaggi",
    items: [
      {
        name: "本日のイタリア産チーズ盛り合わせ",
        description: "静寂と発酵",
        poetryText: "物語を反芻するひととき。\nワインと共に、ゆっくりと着地する。",
        price: "¥1,500",
      },
    ],
  },
];

// ── ワインリスト──────────────────────────────
export const wineList = [
  {
    category: "スパークリング",
    categoryIt: "Spumante",
    items: [
      { name: "プロセッコ（グラス）", region: "ヴェネト", price: "¥900〜" },
      { name: "フランチャコルタ（グラス）", region: "ロンバルディア", price: "¥1,400〜" },
    ],
  },
  {
    category: "白ワイン",
    categoryIt: "Vino Bianco",
    items: [
      { name: "グリッロ（グラス）", region: "シチリア", price: "¥900〜" },
      { name: "ヴェルメンティーノ（グラス）", region: "サルデーニャ", price: "¥1,000〜" },
    ],
  },
  {
    category: "赤ワイン",
    categoryIt: "Vino Rosso",
    items: [
      { name: "ネロ・ダーヴォラ（グラス）", region: "シチリア", price: "¥900〜" },
      { name: "キャンティ（グラス）", region: "トスカーナ", price: "¥1,100〜" },
    ],
  },
];
