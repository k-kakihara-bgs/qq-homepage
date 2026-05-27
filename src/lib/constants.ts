export const SITE_INFO = {
  name: "QQ | Quinto.Quinte",
  nameShort: "QQ",
  tagline: "池下の路地裏で、イタリアの『おいしい』を自由にハシゴする。",
  address: "愛知県名古屋市千種区池下1-6-6",
  access: "名古屋市営地下鉄東山線「池下駅」徒歩圏内",
  tel: "",
  email: "k-kakihara@bgs-jpn.net",
  instagramUrl: "https://www.instagram.com/qq.ikeshita/",
  googleMapsUrl: "https://maps.google.com/?q=愛知県名古屋市千種区池下1-6-6",
};

export const BUSINESS_HOURS = {
  quinto: {
    name: "Gastronomia Quinto（食材店）",
    hours: [
      { day: "月〜金", time: "10:00 〜 19:00" },
      { day: "土・日・祝", time: "10:00 〜 20:00" },
    ],
    closed: "不定休（お知らせをご確認ください）",
  },
  quinte: {
    name: "Degusteria Quinte（レストラン）",
    hours: [
      { day: "ランチ", time: "11:30 〜 14:00（L.O. 13:30）" },
      { day: "ディナー", time: "18:00 〜 22:00（L.O. 21:00）" },
    ],
    closed: "月曜定休（祝日の場合は翌火曜）",
  },
};

export const NAV_LINKS = [
  { href: "/about", label: "コンセプト" },
  { href: "/shop", label: "ショップ" },
  { href: "/menu", label: "レストラン" },
  { href: "/access", label: "アクセス・お問い合わせ" },
  { href: "/events", label: "イベント" },
  { href: "/recruit", label: "採用情報" },
];

export const IMAGES = {
  hero: "/images/concept.png",
  heroSub: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
  quinto: "/images/quinto.png",
  quinte: "/images/quinte.png",
  about: "/images/access.png",
  concept: "/images/concept.png",
  events: "/images/events.png",
  recruit: "/images/recruit.png",
};
