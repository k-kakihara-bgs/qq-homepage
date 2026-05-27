export type ShopProduct = {
  name: string;
  nameIt?: string;
  description: string;
  illustration?: string; // "/images/shop/xxx.png"
  price: string;
  note?: string;
};

export type ShopCategory = {
  id: string;
  title: string;
  titleIt: string;
  description: string;
  products: ShopProduct[];
};

export const shopCategories: ShopCategory[] = [
  {
    id: "souzai",
    title: "自家製惣菜・菓子",
    titleIt: "Gastronomia",
    description: "厨房の即興と、マーケットの棚。そのふたつが交差する中から生まれた一期一会のフードたち。棚にあるユニークな食材たちと自由に掛け合わせる、QQ（クイント・クインテ）ならではの「美味しい循環」です。",
    products: [
      {
        name: "本日の自家製惣菜",
        nameIt: "Piatti del Giorno",
        description: "ディナーの厨房から届く、シェフの自由な即興を閉じ込めた一皿。その日のインスピレーションによって表情を変えるデリは、まさに一期一会の味わいです。そのままの完成度を堪能したあとは、マーケットの棚に並ぶユニークなスパイスをそっと一振りしたり、厳選されたワインを傾けたり。あなた自身の感性で、さらなる掛け合わせの妙を自由にお愉しみください。",
        illustration: "/images/shop/souzai.png",
        price: "¥380〜 / 100g",
        note: "内容は日替わりです",
      },
      {
        name: "焼きたてフォカッチャ",
        nameIt: "Focaccia Fresca",
        description: "イタリア産の小麦粉を使い、高加水製法でもっちりと瑞々しく仕上げた独自の食感。シンプルだからこそ、合わせる相手によって無限の表情を見せる味わいのキャンバスです。マーケットの棚に潜む濃厚なペーストを重ねるもよし、生ハムやチーズ、ユニークな調味料たちを自由に掛け合わせて、あなただけの特別な一画を食卓に見つけてみてください。",
        illustration: "/images/shop/focaccia.png",
        price: "¥350 / 1個",
      },
      {
        name: "アラゴスタ",
        nameIt: "Aragosta",
        description: "「伊勢海老の尾」という無骨な名を持つ、彫刻的な造形の菓子。一見すると強固な殻のようですが、内側にはシュー生地とクリームを優しく抱き込んだ、緻密な二重構造を隠し持っています。果実のソースや、冷たいイタリアンジェラートを寄り添わせて。「温と冷」「サクとフワ」が口の中で心地よく衝突する、贅沢な即興劇をどうぞ。",
        illustration: "/images/shop/aragosta.png",
        price: "¥450 / 1個",
      },
      {
        name: "本日のズッパ（スープ）",
        nameIt: "Zuppa del Giorno",
        description: "大地の恵みをそのままに、時間をかけてじんわりと滋味を凝縮させた温かなスープ。季節の移ろいとともに日替わりで届く一品は、一口ごとに身体の強張りを静かに解きほぐしてくれます。焼きたてのフォカッチャをそっと浸して食感の対比を愉しむのはもちろん、棚にある上質なフレーバーオイルをひと回しして、香りの変化に耳を澄ませるひとときも。",
        illustration: "/images/shop/zuppa.png",
        price: "¥550 / 1カップ",
        note: "内容は日替わりです",
      },
    ],
  },
  {
    id: "cheese-meat",
    title: "チーズ・ハム",
    titleIt: "Formaggi e Salumi",
    description: "時間の堆積がもたらす、硬質な旨みと艶やかな脂の香り。そのままワインを傾けるのはもちろん、フォカッチャに重ね、惣菜に寄り添わせることで、食卓の景色を静かに変えていく掛け合わせの主役たちです。",
    products: [
      {
        name: "パルミジャーノ・レッジャーノ",
        nameIt: "Parmigiano Reggiano DOP",
        description: "24ヶ月という歳月がもたらす、ジャリッとしたアミノ酸の白い結晶と、深く乾いた香気。口の中でほろほろと崩れ、噛むほどに鋭い旨みが立ち上がります。そのまま薄く削ってワインのお供にするのはもちろん、本日のスープにひとはねさせたり、棚にある濃厚なハチミツやバルサミコを数滴落として、劇的な変化を静かに愉しむのも一興です。",
        illustration: "/images/shop/parmigiano.png",
        price: "¥680 / 100g",
      },
      {
        name: "グラナ・パダーノ",
        nameIt: "Grana Padano DOP",
        description: "しっとりとした質感と、優しくクリーミーな余韻を持つ北イタリア伝統の硬質チーズ。パルミジャーノに比べて塩気がまろやかなため、どんな料理にも境界なく溶け込む万能さを持っています。手で小さく砕いてフォカッチャに忍ばせたり、お惣菜の仕上げにたっぷりと削りかけたり。日常の食卓をさりげなく満たしてくれる、懐の深い相棒です。",
        illustration: "/images/shop/grana.png",
        price: "¥520 / 100g",
      },
      {
        name: "生ハム・チーズ・フルーツセット",
        nameIt: "Piatto Misto",
        description: "艶やかな生ハムの塩気、みずみずしいフレッシュモッツァレラ、そして季節のフルーツが持つ鮮烈な酸味。異なる温度と質感を一枚の皿の上に美しく調和させた盛り合わせです。パッケージを開ければ、そこはもう小さなレストラン。棚から選んだ上質なオリーブオイルを仕上げにひとはねさせて、ワインとともに流れる時間をただ気ままに。",
        illustration: "/images/shop/prosciutto.png",
        price: "¥1,500 / セット",
      },
      {
        name: "本場サラミの盛り合わせ",
        nameIt: "Misto Salumi",
        description: "フェンネルの種が清涼に香るフィノッキオーナや、なめらかな脂が舌の上で溶けるミラノサラミ。原産地の手仕事を100gから切り出してお届けします。それぞれの脂の融点やスパイスの個性を愉しむのはもちろん、焼きたてのフォカッチャに挟んで、棚のピクルスやオリーブを寄り添わせれば、それだけで特別な一皿が静かに完成します。",
        illustration: "/images/shop/salumi.png",
        price: "¥580〜 / 100g",
      },
    ],
  },
  {
    id: "wine-food",
    title: "ワイン・食材",
    titleIt: "Vini e Prodotti",
    description: "世界各地の風土を映すワインと、食卓の実験を愉しむためのユニークな食材。惣菜やチーズと出逢うことで物語が動き出す、QQ（クイント・クインテ）ならではの「美味しい循環」を支える引き出しです。",
    products: [
      {
        name: "厳選ワイン",
        nameIt: "Vini Selezionati",
        description: "イタリア全20州の個性豊かな土着品種を中心に、世界各地の風土と造り手の呼吸を映したボトルたち。ただグラスに注ぐだけでなく、本日のお惣菜や艶やかな生ハム、あるいはアラゴスタといった異なるテクスチャーと調和させるための流動的なパーツです。その日の気分や食卓の景色に合わせて、最適の一本をスタッフとともに見つける時間もお愉しみください。",
        illustration: "/images/shop/wine.png",
        price: "¥1,800〜 / 本",
      },
      {
        name: "エクストラバージンオリーブオイル",
        nameIt: "Olio EVO",
        description: "シチリアの青いトマトのような早摘みの香りや、トスカーナの硬質でスパイシーな余韻など、イタリア各地の風土を搾り込んだオイル。焼きたてのフォカッチャにたっぷりと染み込ませて生地のみずみずしさを引き立てたり、本日のズッパの仕上げにひとはねさせて香りのレイヤーを重ねたり。一滴で食卓の解像度を鮮烈に変えてくれる、流動的なパーツです。",
        illustration: "/images/shop/oliveoil.png",
        price: "¥1,800〜 / 本",
      },
      {
        name: "バルサミコ酢",
        nameIt: "Aceto Balsamico",
        description: "オークや栗の樽のなかで長い年月を眠り、とろりと漆黒に濃縮されたモデナ産の伝統的なバルサミコ。ブドウの果汁だけが持つ、鋭くもまろやかな酸味と高貴な甘みが特徴です。パルミジャーノ・レッジャーノの結晶の上に静かに滴らせる愉しみはもちろん、ローストしたお惣菜の仕上げに少量まとわせるだけで、お皿の上に豊かな立体感を生み出します。",
        illustration: "/images/shop/balsamico.png",
        price: "¥2,200〜 / 本",
      },
      {
        name: "オイル漬けシリーズ",
        nameIt: "Sott'olio",
        description: "太陽を浴びたドライトマト、大地の滋味を秘めたアーティチョーク、旨みを閉じ込めたツナなどを純度の高いオイルで封じ込めた小瓶。その濃密なテクスチャーは、そのままワインの傍らに置くだけで完成された前菜になります。焼きたてのフォカッチャの切れ目に滑り込ませて、チーズや生ハムとともに、あなただけの即興劇を静かに愉しむのも一興です。",
        illustration: "/images/shop/sottolio.png",
        price: "¥680〜 / 瓶",
      },
    ],
  },
];
