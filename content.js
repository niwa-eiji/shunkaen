/* Shunkaen — content, i18n, static data */
const CONTENT = {
  en: {
    nav: {
      collection: "Collection",
      experiences: "Experiences",
      master: "The Master",
      visit: "Visit",
      gallery: "Gallery",
      book: "Reserve"
    },
    hero: {
      eyebrow: "Bonsai Garden & Museum — Est. 1993",
      title: ["Stillness, one thousand years deep."],
      sub: "Founded by master Kunio Kobayashi, Shunkaen cares for bonsai older than empires — and opens their quiet world to visitors from every country.",
      ctaPrimary: "Reserve an experience",
      ctaSecondary: "Walk the garden"
    },
    meta: [
      { num: "1000+", label: "Oldest tree (yrs)" },
      { num: "1000", label: "Bonsai in care" },
      { num: "EN · JP", label: "Staff languages" }
    ],
    collection: {
      num: "01",
      kicker: "Collection",
      title: "Trees that outlive\ndynasties.",
      titleJp: "名品 — Meihin",
      lead: "A living archive of Japan's most celebrated bonsai. Centuries of patient hands, now under our care — open for you to meet.",
      stats: [
        { big: "1000", unit: "yrs", cap: "Oldest", desc: "Our eldest Juniperus, trained across four generations of masters." },
        { big: "4", unit: "Prime Ministers' Awards", cap: "Honors", desc: "Kokufu-ten highest prize — the nation's most rigorous exhibition." },
        { big: "¥100M", unit: "class", cap: "Rare", desc: "Masterpieces valued among the highest-grade specimens in Japan." }
      ]
    },
    experiences: {
      num: "02",
      kicker: "Experiences",
      title: "Hands on the\nliving art.",
      titleJp: "体験 — Taiken",
      lead: "Small groups. English-capable instructors. Every experience begins with tea and ends with something you have shaped yourself.",
      rows: [
        { no: "01", title: "Bonsai Workshop", titleJp: "盆栽体験", desc: "Wire, prune, and style your own bonsai under a master's guidance. Leave with the tree.", price: "¥13,200", meta: "90 min · incl. tree" },
        { no: "02", title: "Tea Ceremony", titleJp: "茶道", desc: "A quiet hour of chadō in the garden tea room, with seasonal wagashi.", price: "¥11,000", meta: "60 min · incl. sweets" },
        { no: "03", title: "Calligraphy", titleJp: "書道", desc: "Grind ink, hold the brush, and write a kanji that will travel home with you.", price: "¥8,800", meta: "60 min · incl. materials" },
        { no: "04", title: "Kimono & Garden", titleJp: "着物散策", desc: "Dress in kimono and stroll the bonsai garden with a professional dresser and photographer on call.", price: "¥16,500", meta: "120 min · dresser incl." }
      ]
    },
    master: {
      num: "03",
      kicker: "The Master",
      title: "Kunio Kobayashi",
      titleJp: "小林 國雄",
      quote: "\"A bonsai is time you can hold in both hands. My task is to listen — to what the tree already knows.\"",
      body1: "Four Prime Minister's Awards at the Kokufu-ten. The founder of Shunkaen. For more than forty years, Kobayashi has shaped — and been shaped by — trees far older than himself.",
      body2: "He travels little now. But at Shunkaen, if you come quietly, you may see him among the trees in the early hours, as he has been for decades.",
      name: "小林 國雄",
      role: "Founder · 盆栽士 Bonsai Master"
    },
    visit: {
      num: "04",
      kicker: "Visit",
      title: "Open daily,\nexcept the quiet day.",
      titleJp: "ご案内",
      lead: "Ten minutes from Mizue Station, forty minutes from central Tokyo. Walk-ins welcome for the garden; experiences by reservation.",
      info: [
        { label: "Hours", value: "10:00 — 17:00", sub: "Last entry 16:30" },
        { label: "Closed", value: "Mondays", sub: "Open if Monday is a holiday" },
        { label: "Admission", value: "¥1,000 / Adult", sub: "Free under 12" },
        { label: "Address", value: "1-29-16 Niihori, Edogawa, Tokyo", sub: "〒133-0042" },
        { label: "Access", value: "Mizue Stn, Toei Shinjuku Line", sub: "10 min on foot" },
        { label: "Contact", value: "+81 3-3670-8622", sub: "info@shunkaen-en.jp" }
      ]
    },
    booking: {
      num: "05",
      kicker: "Reserve",
      title: "Hold a place\nfor you.",
      titleJp: "仮予約",
      lead: "This is a tentative reservation. We will reply personally within 24 hours to confirm, arrange details, and welcome you.",
      steps: ["Course", "People", "When", "You"],
      step1: { h: "Which experience?", sub: "Select one. You can add more after we confirm." },
      step2: { h: "How many will come?", sub: "We keep groups small — maximum 8 per session." },
      step3: { h: "When would you like to visit?", sub: "Pick a preferred date and time window. We'll confirm availability by email." },
      step4: { h: "How shall we reach you?", sub: "Just the essentials — we'll follow up with the rest." },
      labels: {
        people: "Guests",
        country: "Country of residence",
        selectCountry: "Select country",
        name: "Full name",
        email: "Email address",
        notes: "Anything we should know? (optional)",
        back: "Back",
        next: "Continue",
        submit: "Send tentative reservation",
        newBooking: "Start another",
        total: "Estimated total",
        perGuest: "per guest"
      },
      note: "Tentative only — a member of our team will email you within 24 hours from info@shunkaen-en.jp to confirm. No payment is taken at this step.",
      success: {
        h: "Thank you.",
        sub: "We have received your tentative reservation.",
        body: "Our team will reply to your email within 24 hours. If you do not see our message, please check your spam folder.",
        ref: "Reference"
      }
    },
    gallery: {
      num: "06",
      kicker: "Gallery",
      title: "Four seasons,\none garden.",
      titleJp: "四季",
      lead: "Spring plum, summer shade, autumn fire, winter silence — each season rearranges the garden entirely."
    },
    testimonials: {
      num: "07",
      kicker: "Voices",
      title: "From our guests\n& the press.",
      titleJp: "お声",
      items: [
        { q: "The calmest hour of our trip to Japan. The master spoke little, but we understood everything.", who: "Claire M.", country: "France" },
        { q: "Seeing a thousand-year-old tree up close changes your sense of time. Book this before anything else in Tokyo.", who: "David L.", country: "USA" },
        { q: "A rare, uncompromised encounter with living Japanese art. Kobayashi-sensei's garden is a national treasure.", who: "The Japan Times", country: "Press" }
      ]
    },
    faq: {
      num: "08",
      kicker: "Questions",
      title: "Before you come.",
      titleJp: "よくあるご質問",
      items: [
        { q: "Is English spoken at Shunkaen?", a: "Yes — our experience instructors teach in English, and the reception desk can assist in English and Japanese. Additional languages are available on request with advance notice." },
        { q: "How early should I reserve an experience?", a: "We recommend booking at least 3 days in advance. Popular dates (cherry blossom season, autumn leaves, weekends) fill faster — 2–3 weeks ahead is safer." },
        { q: "What is your cancellation policy?", a: "Free cancellation up to 48 hours before your reservation. Within 48 hours, a 50% fee applies. No-shows are charged in full." },
        { q: "Can I take home the bonsai I work on?", a: "Yes — the bonsai workshop includes the tree you shape. We can arrange international phytosanitary certificates for an additional fee, though export restrictions apply to some destinations." },
        { q: "Is the garden accessible?", a: "The main paths are wheelchair accessible. Some tea room and workshop areas involve traditional tatami seating; please note any accessibility needs in the reservation form." }
      ]
    },
    footer: {
      huge: "春花園",
      hugeEn: "Shunkaen Bonsai Museum",
      tagline: "A quiet garden in east Tokyo, caring for some of the world's oldest living bonsai — and welcoming visitors from every country to meet them.",
      cols: [
        { h: "Visit", links: ["Hours & access", "Admission", "Gallery", "Press"] },
        { h: "Experiences", links: ["Bonsai workshop", "Tea ceremony", "Calligraphy", "Kimono stroll"] },
        { h: "Connect", links: ["Reserve", "Instagram", "YouTube", "Contact"] }
      ],
      legal: "© 2026 Shunkaen Bonsai Museum · 春花園"
    }
  },

  jp: {
    nav: {
      collection: "名品",
      experiences: "体験",
      master: "小林國雄",
      visit: "ご案内",
      gallery: "庭景",
      book: "ご予約"
    },
    hero: {
      eyebrow: "盆栽園・美術館 — 1993年創設",
      title: ["千年の静けさが、ここにある。"],
      sub: "盆栽師・小林國雄が創設した春花園。樹齢千年を超える盆栽と共に、日本文化の深さを世界の皆さまにお伝えします。",
      ctaPrimary: "体験を予約する",
      ctaSecondary: "庭園を見る"
    },
    meta: [
      { num: "1000+", label: "最古の樹齢" },
      { num: "千", label: "所蔵本数" },
      { num: "日英", label: "対応言語" }
    ],
    collection: {
      num: "01",
      kicker: "名品",
      title: "千年を超えて\n生き続ける。",
      titleJp: "Meihin",
      lead: "国宝級の名品盆栽を数多く所蔵。何世代もの師の手を経て、今ここに静かに立つ樹々と、ご対面いただけます。",
      stats: [
        { big: "1000", unit: "年", cap: "最古", desc: "四代にわたる盆栽師に育てられた真柏の銘木。" },
        { big: "4", unit: "回 内閣総理大臣賞", cap: "受賞", desc: "国風盆栽展における最高賞。日本最高峰の展覧会での栄誉。" },
        { big: "一億円", unit: "級", cap: "至宝", desc: "日本国内でも最高級に位置づけられる名品を含む。" }
      ]
    },
    experiences: {
      num: "02",
      kicker: "体験",
      title: "手で触れる、\n生きた芸術。",
      titleJp: "Taiken",
      lead: "少人数制。英語対応の講師が丁寧にご案内します。すべての体験は一服のお茶から始まり、ご自身の手で仕上げた作品で締めくくられます。",
      rows: [
        { no: "01", title: "盆栽体験", titleJp: "Bonsai", desc: "針金かけ・剪定・樹形づくりを盆栽師の指導のもと体験。作品は持ち帰り可。", price: "¥13,200", meta: "90分・苗木付き" },
        { no: "02", title: "茶道", titleJp: "Chadō", desc: "庭園の茶室にて、季節の和菓子とともに一服の茶を。", price: "¥11,000", meta: "60分・和菓子付き" },
        { no: "03", title: "書道", titleJp: "Shodō", desc: "墨をすり、筆を持ち、心に残る一文字を書き上げます。", price: "¥8,800", meta: "60分・道具一式付き" },
        { no: "04", title: "着物散策", titleJp: "Kimono", desc: "着物をまとい、専属の着付師と共に盆栽園をゆるやかに散策。", price: "¥16,500", meta: "120分・着付込み" }
      ]
    },
    master: {
      num: "03",
      kicker: "小林 國雄",
      title: "小林 國雄",
      titleJp: "Kunio Kobayashi",
      quote: "「盆栽は、両手で抱きしめられる時間です。私の仕事はただ、樹が既に知っていることに耳を澄ますこと。」",
      body1: "国風盆栽展にて内閣総理大臣賞を四度受賞。春花園の創設者として、四十年以上にわたり自分より遥かに年老いた樹々と向き合い続けてきた盆栽師。",
      body2: "今はあまり遠出をしません。しかし春花園に静かに訪れれば、早朝の庭園で樹々と語らう先生の姿に、今もお会いできるかもしれません。",
      name: "小林 國雄",
      role: "創設者・盆栽士"
    },
    visit: {
      num: "04",
      kicker: "ご案内",
      title: "毎日開園、\n月曜のみ休園。",
      titleJp: "Visit",
      lead: "瑞江駅より徒歩10分、都心より約40分。庭園は予約不要、体験はご予約制となります。",
      info: [
        { label: "開園時間", value: "10:00 〜 17:00", sub: "最終入園 16:30" },
        { label: "休園日", value: "月曜日", sub: "祝日の場合は開園" },
        { label: "入園料", value: "大人 ¥1,000", sub: "12歳未満 無料" },
        { label: "所在地", value: "東京都江戸川区新堀1-29-16", sub: "〒133-0042" },
        { label: "アクセス", value: "都営新宿線 瑞江駅", sub: "徒歩10分" },
        { label: "お問合せ", value: "03-3670-8622", sub: "info@shunkaen-en.jp" }
      ]
    },
    booking: {
      num: "05",
      kicker: "ご予約",
      title: "仮予約を\n承ります。",
      titleJp: "Reserve",
      lead: "こちらは仮予約となります。24時間以内に、担当者よりメールにてご連絡申し上げます。",
      steps: ["コース", "人数", "日時", "ご連絡先"],
      step1: { h: "ご希望のコース", sub: "ひとつお選びください。確定後に追加も可能です。" },
      step2: { h: "ご人数", sub: "少人数制にて承っております(最大8名まで)。" },
      step3: { h: "ご希望日時", sub: "第一希望の日時をお選びください。空き状況を確認のうえ、メールにてご連絡いたします。" },
      step4: { h: "ご連絡先", sub: "必要最低限のみ。詳細は折り返しご相談させていただきます。" },
      labels: {
        people: "人数",
        country: "お住まいの国",
        selectCountry: "選択してください",
        name: "お名前",
        email: "メールアドレス",
        notes: "ご要望など(任意)",
        back: "戻る",
        next: "次へ",
        submit: "仮予約を送信",
        newBooking: "もう一度",
        total: "合計(目安)",
        perGuest: "お一人様"
      },
      note: "こちらは仮予約です。24時間以内に info@shunkaen-en.jp より確認のご連絡をいたします。この段階でのお支払いはございません。",
      success: {
        h: "お申込みありがとうございました。",
        sub: "仮予約を承りました。",
        body: "24時間以内に担当者よりメールにてご連絡申し上げます。メールが届かない場合は、迷惑メールフォルダもご確認ください。",
        ref: "予約番号"
      }
    },
    gallery: {
      num: "06",
      kicker: "庭景",
      title: "四季に出会う、\nひとつの庭。",
      titleJp: "Shiki",
      lead: "春の梅、夏の緑陰、秋の紅、冬の静寂。季節ごとに表情を変える庭の美しさを、どうぞご覧ください。"
    },
    testimonials: {
      num: "07",
      kicker: "お声",
      title: "お客様の声と、\n報道より。",
      titleJp: "Voices",
      items: [
        { q: "日本滞在中、最も静謐なひととき。先生は多くを語られませんでしたが、すべてが伝わってきました。", who: "クレール M.", country: "フランス" },
        { q: "樹齢千年の盆栽を前にすると、時間の感覚が変わります。東京で何より先に予約すべき体験です。", who: "デヴィッド L.", country: "アメリカ" },
        { q: "妥協なき生きた日本芸術との出会い。小林先生の庭は、まさに国の宝である。", who: "The Japan Times", country: "報道" }
      ]
    },
    faq: {
      num: "08",
      kicker: "よくあるご質問",
      title: "お越しになる前に。",
      titleJp: "FAQ",
      items: [
        { q: "英語での対応は可能ですか?", a: "はい。体験は英語でも承っております。受付は日本語・英語の両方で対応可能です。その他言語は事前のご相談により対応いたします。" },
        { q: "どのくらい前に予約すればよいですか?", a: "3日前までのご予約を推奨しております。桜の季節、紅葉の時期、週末は混み合いますので、2〜3週間前のご予約が安心です。" },
        { q: "キャンセルポリシーを教えてください。", a: "ご予約の48時間前までは無料でキャンセル可能です。48時間以内は料金の50%、当日無連絡の場合は全額を申し受けます。" },
        { q: "作った盆栽は持ち帰れますか?", a: "はい。盆栽体験でお作りいただいた作品はお持ち帰りいただけます。海外への輸出手続き(植物検疫)も別料金にて承りますが、国によっては輸出制限がございます。" },
        { q: "バリアフリー対応はありますか?", a: "主要な通路は車いすでもご通行いただけます。一部茶室や体験場は和室となりますので、必要に応じて予約時にお知らせください。" }
      ]
    },
    footer: {
      huge: "春花園",
      hugeEn: "Shunkaen Bonsai Museum",
      tagline: "東京東郊の静かな盆栽園。世界有数の樹齢を誇る盆栽を守り、世界中のお客様を心よりお迎えいたします。",
      cols: [
        { h: "ご案内", links: ["開園時間・アクセス", "入園料", "庭景", "報道" ] },
        { h: "体験", links: ["盆栽体験", "茶道", "書道", "着物散策"] },
        { h: "お問合せ", links: ["ご予約", "Instagram", "YouTube", "お問合せ"] }
      ],
      legal: "© 2026 春花園盆栽美術館 · Shunkaen"
    }
  }
};

const COUNTRIES = [
  "Japan · 日本",
  "United States",
  "United Kingdom",
  "France",
  "Germany",
  "Italy",
  "Spain",
  "Canada",
  "Australia",
  "China · 中国",
  "Hong Kong",
  "Taiwan · 台湾",
  "Korea · 韓国",
  "Singapore",
  "Thailand",
  "Vietnam",
  "Philippines",
  "Indonesia",
  "India",
  "Brazil",
  "Mexico",
  "Other"
];

window.SHUNKAEN_CONTENT = CONTENT;
window.SHUNKAEN_COUNTRIES = COUNTRIES;
