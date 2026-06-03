/** Tabelog ≈ Japan’s OpenRice (reviews, photos, menus). */
function tabelogSearch(keyword) {
  return `https://tabelog.com/rstLst/?sk=${encodeURIComponent(keyword)}`;
}

/**
 * Curated picks per meal slot.
 * Keys: `${dayId}@${eventTime}`
 */
export const MEAL_RESTAURANTS = {
  "day-1@20:00": [
    {
      name: { en: "Yatai Yamachan", "zh-TW": "屋台 やまちゃん" },
      note: {
        en: "Beloved Nakasu stall — rich Hakata tonkotsu; expect a short queue.",
        "zh-TW": "中洲人氣屋台，濃厚博多豚骨，常需排隊。",
      },
      mapsQuery: "屋台 やまちゃん 福岡 中洲",
      tabelogUrl: "https://tabelog.com/fukuoka/A4001/A400101/40000468/",
    },
    {
      name: { en: "Yatai Tetsunin Tokushu-ken", "zh-TW": "鉄仁 特製軒" },
      note: {
        en: "Classic yatai atmosphere; try ramen or oden depending on the night.",
        "zh-TW": "傳統屋台氛圍，可點拉麵或關東煮。",
      },
      mapsQuery: "鉄仁 特製軒 中洲 屋台",
      tabelogUrl: "https://tabelog.com/fukuoka/A4001/A400101/40000425/",
    },
    {
      name: { en: "Ichiran Nakasu", "zh-TW": "一蘭 中洲店" },
      note: {
        en: "Famous tonkotsu chain (solo booths); good backup if yatai lines are long.",
        "zh-TW": "知名豚骨拉麵（單人隔間），屋台排隊太久時的備選。",
      },
      mapsQuery: "一蘭 中洲 福岡",
      tabelogUrl: "https://tabelog.com/fukuoka/A4001/A400101/40000014/",
    },
  ],
  "day-2@07:00": [
    {
      name: { en: "Shinshodo Main Store", "zh-TW": "進々堂 本店" },
      note: {
        en: "Legendary melon pan — grab bakery items before the Yufuin train.",
        "zh-TW": "名物菠蘿包，出發由布院前適合外帶。",
      },
      mapsQuery: "進々堂 本店 福岡",
      tabelogUrl: "https://tabelog.com/fukuoka/A4001/A400103/40000056/",
    },
    {
      name: { en: "Boulangerie Hidemi", "zh-TW": "ボウランジェリー ヒデミ" },
      note: {
        en: "Highly rated bread near Hakata/Tenjin — croissants and sandwiches.",
        "zh-TW": "博多／天神高人氣麵包店。",
      },
      mapsQuery: "Boulangerie Hidemi Fukuoka",
      tabelogUrl: "https://tabelog.com/fukuoka/A4001/A400103/40010452/",
    },
  ],
  "day-2@18:30": [
    {
      name: { en: "Fukuya Mentai Park Hakata", "zh-TW": "ふくや 明太子パーク博多" },
      note: {
        en: "Iconic mentaiko brand — tasting plates, grilled mentaiko rice.",
        "zh-TW": "明太子名店，試吃與明太子蓋飯。",
      },
      mapsQuery: "ふくや 明太子パーク 博多",
      tabelogUrl: tabelogSearch("ふくや 明太子 博多"),
    },
    {
      name: { en: "Hakata Izakaya Hanamidori", "zh-TW": "博多華味鳥" },
      note: {
        en: "Famous chicken cuisine; good with local shochu after a Yufuin day trip.",
        "zh-TW": "博多名物華味鳥，由布院一日遊後適合搭配燒酎。",
      },
      mapsQuery: "華味鳥 博多 本店",
      tabelogUrl: tabelogSearch("博多華味鳥 本店"),
    },
  ],
  "day-3@07:00": [
    {
      name: { en: "Hakata Station Depachika", "zh-TW": "博多駅 デパ地下" },
      note: {
        en: "Amu Plaza basement — onigiri, bento, and coffee before Shinkansen.",
        "zh-TW": "アミュプラザ地下，新幹線前買飯糰與便當。",
      },
      mapsQuery: "アミュプラザ博多 デパ地下",
      tabelogUrl: "https://tabelog.com/fukuoka/A4001/A400101/40000001/",
    },
  ],
  "day-3@12:30": [
    {
      name: { en: "Kumamoto Ramen Keika", "zh-TW": "熊本ラーメン 桂花" },
      note: {
        en: "City’s signature garlic-tonkotsu ramen near Shimotori.",
        "zh-TW": "熊本代表作——蒜香豚骨拉麵（下通一帶）。",
      },
      mapsQuery: "熊本ラーメン 桂花 本店",
      tabelogUrl: "https://tabelog.com/kumamoto/A1601/A160101/16000023/",
    },
    {
      name: { en: "Ramen Kora", "zh-TW": "ラーメン こら" },
      note: {
        en: "Popular local bowl with rich soup — often ranked top in Kumamoto.",
        "zh-TW": "在地人氣濃湯拉麵，常居排行榜前列。",
      },
      mapsQuery: "ラーメンこら 熊本",
      tabelogUrl: tabelogSearch("ラーメンこら 熊本"),
    },
  ],
  "day-3@19:30": [
    {
      name: { en: "Uotaro Ohori", "zh-TW": "魚太郎 大濠公園店" },
      note: {
        en: "Relaxed seafood izakaya by the park — sashimi sets and small plates.",
        "zh-TW": "大濠公園旁海鮮居酒屋，刺身與小菜。",
      },
      mapsQuery: "魚太郎 大濠公園",
      tabelogUrl: tabelogSearch("魚太郎 大濠公園"),
    },
    {
      name: { en: "Hakata Yatai District (Nakasu)", "zh-TW": "中洲屋台" },
      note: {
        en: "Return to riverside stalls if you want a lighter second dinner.",
        "zh-TW": "若想簡單第二餐，可回中洲屋台。",
      },
      mapsQuery: "中洲 屋台 福岡",
      tabelogUrl: "https://tabelog.com/fukuoka/A4001/A400101/40000003/",
    },
  ],
  "day-4@08:30": [
    {
      name: { en: "Bakeshop Raku", "zh-TW": "ベイクショップ ラク" },
      note: {
        en: "Beloved local bakery — arrive early Sunday for best selection.",
        "zh-TW": "福岡人氣烘焙，週日宜早到。",
      },
      mapsQuery: "ベイクショップ ラク 福岡",
      tabelogUrl: tabelogSearch("ベイクショップラク 福岡"),
    },
  ],
  "day-4@12:00": [
    {
      name: {
        en: "Sushidokoro Nishinokakure",
        "zh-TW": "すし処 西の隠れ",
      },
      note: {
        en: "★ Lunch omakase from ~¥8,800–13,200 (reservation required). “Boku-mae” sushi — best value vs dinner.",
        "zh-TW": "★ 午餐おまかせ約 ¥8,800 起（需預約）。獨創「ぼく前」壽司，比晚餐划算。",
      },
      mapsQuery: "すし処 西の隠れ 福岡 西中洲",
      tabelogUrl: "https://tabelog.com/fukuoka/A4001/A400103/40056954/",
      recommended: true,
    },
    {
      name: { en: "Sushi Sakai", "zh-TW": "鮨 さかい" },
      note: {
        en: "Tenjin counter sushi; check Tabelog for lunch seatings / seasonal lunch course.",
        "zh-TW": "天神板前壽司，請於食べログ確認是否開放午餐。",
      },
      mapsQuery: "鮨 さかい 福岡 天神",
      tabelogUrl: tabelogSearch("鮨 さかい 福岡"),
    },
    {
      name: { en: "Genjyu — The Ritz-Carlton Fukuoka", "zh-TW": "源汁 — 麗思卡爾頓福岡" },
      note: {
        en: "Upscale lunch sushi omakase (~¥16,650) if you want hotel-level service.",
        "zh-TW": "飯店級午餐壽司おまかせ（較高價），適合慶祝。",
      },
      mapsQuery: "ザ・リッツ・カールトン福岡 源汁",
      tabelogUrl: tabelogSearch("源汁 リッツカールトン福岡"),
    },
  ],
  "day-4@19:00": [
    {
      name: { en: "Motsunabe Yamanaka Hakata", "zh-TW": "もつ鍋 やま中 博多店" },
      note: {
        en: "The famous Hakata motsunabe chain — book ahead on weekends.",
        "zh-TW": "博多もつ鍋名店，週末建議預約。",
      },
      mapsQuery: "もつ鍋 やま中 博多",
      tabelogUrl: "https://tabelog.com/fukuoka/A4001/A400101/40055276/",
    },
    {
      name: { en: "Hakata Motsunabe Ooyama", "zh-TW": "もつ鍋 おおやま 天神" },
      note: {
        en: "Another top-rated offal hotpot near Tenjin.",
        "zh-TW": "天神另一家人氣もつ鍋。",
      },
      mapsQuery: "もつ鍋 おおやま 天神",
      tabelogUrl: tabelogSearch("もつ鍋 おおやま 天神"),
    },
  ],
  "day-2@12:00": [
    {
      name: { en: "Yufumabushi Shin", "zh-TW": "由布まぶし心" },
      note: {
        en: "Yufuin wagyu / local beef bowls — very popular; go before noon if possible.",
        "zh-TW": "由布院和牛蓋飯名店，建議正午前抵達。",
      },
      mapsQuery: "由布まぶし心 由布院",
      tabelogUrl: tabelogSearch("由布まぶし心"),
    },
    {
      name: { en: "Tanoaji", "zh-TW": "田のあじ" },
      note: {
        en: "Country-style set meals and soba near Yunotsubo.",
        "zh-TW": "湯之坪附近鄉土定食與蕎麥。",
      },
      mapsQuery: "田のあじ 由布院",
      tabelogUrl: tabelogSearch("田のあじ 由布院"),
    },
  ],
  "day-5@12:30": [
    {
      name: { en: "Itoshima Shokudo Honten", "zh-TW": "糸島食堂 本店" },
      note: {
        en: "Bucket-sized seafood bowls from Nagahama Market fish — arrive before noon.",
        "zh-TW": "長濱市場直送海鮮丼，桶盛豪邁，建議正午前到。",
      },
      mapsQuery: "糸島食堂 本店 糸島市",
      tabelogUrl: "https://tabelog.com/fukuoka/A4009/A400901/40062204/",
    },
    {
      name: { en: "Oyster House Itoshima", "zh-TW": "糸島 かき小屋" },
      note: {
        en: "Grilled oysters (seasonal Jun–Sep); pair with local beer.",
        "zh-TW": "烤牡蠣（約 6–9 月季節限定），可配在地啤酒。",
      },
      mapsQuery: "糸島 牡蠣 福岡",
      tabelogUrl: tabelogSearch("糸島 牡蠣 料理"),
    },
    {
      name: { en: "Uotami Itoshima", "zh-TW": "魚民 糸島店" },
      note: {
        en: "Casual seafood izakaya chain — easy menu with photos.",
        "zh-TW": "連鎖海鮮居酒屋，菜單有圖好點餐。",
      },
      mapsQuery: "魚民 糸島",
      tabelogUrl: tabelogSearch("魚民 糸島"),
    },
  ],
  "day-5@19:00": [
    {
      name: { en: "Ramen Stadium — Ippudo", "zh-TW": "ラーメンスタジアム 一風堂" },
      note: {
        en: "Try half-size bowls to sample multiple Hakata styles in one visit.",
        "zh-TW": "可點小碗多試幾家博多拉麵。",
      },
      mapsQuery: "キャナルシティ博多 ラーメンスタジアム 一風堂",
      tabelogUrl: "https://tabelog.com/fukuoka/A4001/A400101/40025391/",
    },
    {
      name: { en: "Ramen Stadium — Hakata Ikkousha", "zh-TW": "ラーメンスタジアム 一幸舎" },
      note: {
        en: "Rich “tonkotsu” pioneer — good contrast to Ippudo in the same hall.",
        "zh-TW": "濃厚豚骨名店，與一風堂對比品嚐。",
      },
      mapsQuery: "一幸舎 キャナルシティ ラーメンスタジアム",
      tabelogUrl: "https://tabelog.com/fukuoka/A4001/A400101/40000089/",
    },
    {
      name: { en: "Ramen Stadium — Nagahama Keichan", "zh-TW": "長浜ナンバーワン" },
      note: {
        en: "Classic Nagahama-style thin noodles — local favorite stall.",
        "zh-TW": "長浜系細麵，在地人氣攤位。",
      },
      mapsQuery: "長浜ナンバーワン キャナルシティ",
      tabelogUrl: "https://tabelog.com/fukuoka/A4001/A400101/40000156/",
    },
  ],
  "day-6@11:30": [
    {
      name: { en: "Ippudo Hakata Station", "zh-TW": "一風堂 博多駅店" },
      note: {
        en: "Quick, reliable last bowl before the airport line.",
        "zh-TW": "上機前最後一碗的穩健選擇。",
      },
      mapsQuery: "一風堂 博多駅 JR博多シティ",
      tabelogUrl: "https://tabelog.com/fukuoka/A4001/A400101/40025390/",
    },
    {
      name: { en: "Hakata Ippudo Daimyo Honten", "zh-TW": "博多 一風堂 大名本店" },
      note: {
        en: "Original Ippudo (Tenjin) — shop-exclusive bowls if you have time to detour.",
        "zh-TW": "一風堂創業大名本店，有本店限定口味。",
      },
      mapsQuery: "博多一風堂 大名本店",
      tabelogUrl: "https://tabelog.com/fukuoka/A4001/A400103/40025391/",
    },
    {
      name: { en: "Hakata Ramen Nagahama-ya", "zh-TW": "博多ラーメン 長浜や" },
      note: {
        en: "Nagahama-style ramen inside Hakata Station — fast and classic.",
        "zh-TW": "博多站內長浜系拉麵，快速道地。",
      },
      mapsQuery: "博多ラーメン 長浜や 駅",
      tabelogUrl: "https://tabelog.com/fukuoka/A4001/A400101/40000045/",
    },
  ],
};

export function getMealRestaurants(dayId, eventTime) {
  return MEAL_RESTAURANTS[`${dayId}@${eventTime}`] ?? [];
}

export function localizeRestaurant(restaurant, locale) {
  const lang = locale === "zh-TW" ? "zh-TW" : "en";
  return {
    ...restaurant,
    name: restaurant.name[lang] ?? restaurant.name.en,
    note: restaurant.note[lang] ?? restaurant.note.en,
  };
}
