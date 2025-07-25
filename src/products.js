const products = [
  {
    id: "001",
    category: "cutlery",
    name: "chamberlain Navy Ceramic",
    description: {
      bodyCopy1:
        "Sip in style with Chamberlain Coffee’s navy ceramic mug and matching cup & saucer—perfect for cozy mornings or café vibes on the move.",
      bodyCopy2:
        "Whether it's a slow home brew or a quick café fix, this set brings elegance to every sip.",
    },
    designer: "Emma Chamberlain",
    price: 12,
    date: "2025-04-06",
    fileType: "PSD",
    previewImg: "product_001.jpeg",
    productImages: ["product_001.jpeg", "product_002.jpeg", "product_003.jpeg"],
    compatibility: "clear",
  },
  {
    id: "002",
    category: "flavoured Coffee",
    name: "Chamberlain Matcha Specials",
    description: {
      bodyCopy1:
        "Awaken your senses with matcha-flavored coffee—where velvety green meets bold roast in a swirl of serenity and kick.",
      bodyCopy2:
        "erfectly balanced for clarity, focus, and just the right amount of kick.",
    },
    designer: "Emma Chamberlain",
    price: 30,
    date: "2025-04-07",
    fileType: "PNG",
    previewImg: "product_007.jpeg",
    productImages: ["product_005.jpeg", "product_007.jpeg", "product_009.jpeg"],
    compatibility: "NOT SUITABLE ,IF ALLERGY",
  },
  {
    id: "003",
    category: "flavoured Coffee",
    name: "strawberry flavoured coffee",
    description: {
      bodyCopy1:
        "Sweet meets bold—strawberry-flavored coffee delivers juicy notes wrapped in a smooth, velvety roast.",
      bodyCopy2:
        "A playful twist on your daily brew, bursting with flavor and just the right hint of indulgence.",
    },
    designer: "Emma Chamberlain",
    price: 10,
    date: "2025-04-08",
    fileType: "JPEG",
    previewImg: "product_008.jpeg",
    productImages: ["product_004.jpeg", "product_006.jpeg", "product_008.jpeg"],
    compatibility: "NOT SUITABLE ,IF ALLERGY",
  },
  {
    id: "004",
    category: "Limited Edition",
    name: "Sea Toffee Collection",
    description: {
      bodyCopy1:
        "Bold like the ocean, sweet like indulgence—Chamberlain Coffee’s Sea Toffee Collection brings smooth caramel depth with a salty kiss...",
      bodyCopy2:
        "Dive into waves of rich toffee flavor, where each sip feels like a coastal escape with a hint of golden luxury.",
    },
    designer: "Chamberlain Labs",
    price: 5,
    date: "2025-04-09",
    fileType: "SVG",
    previewImg: "product_010.jpeg",
    productImages: [
      "product_0010.jpeg",
      "product_011.jpeg",
      "product_012.jpeg",
    ],
    compatibility: "NOT SUITABLE ,IF LACTOSE INTOLRANT",
  },
  {
    id: "005",
    category: "cutlery",
    name: "sea voyager collection",
    description: {
      bodyCopy1:
        "Anchors aweigh! Your Sea Voyager Cutlery Set is being crafted with oceanic elegance and sustainable charm...",
      bodyCopy2:
        "This nautical-inspired design pairs are hand painted, smooth curves with maritime motifs to capture the spirit of coastal indulgence.",
    },
    designer: "chamberlain labs",
    price: 15,
    date: "2025-04-10",
    fileType: "RAW",
    previewImg: "product_013.jpeg",
    productImages: [
      "product_011.jpeg",
      "product_013.jpeg",
      "product_0010.jpeg",
    ],
    compatibility: "clear",
  },
  {
    id: "006",
    category: "Limited Edition",
    name: "Chamberlain DARK COOKIES N CREAM",
    description: {
      bodyCopy1:
        "Indulgence meets sophistication with our limited edition Cookies & Cream collection—mocha, vanilla, and black drinkware set the mood.",
      bodyCopy2:
        "Whether it’s a cozy oatmilk latte or classic coffee blend, every sip whispers elegance, warmth, and nostalgic charm..",
    },
    designer: "Emma Chamberlain",
    price: 20,
    date: "2025-04-11",
    fileType: "JPEG",
    previewImg: "product_018.jpeg",
    productImages: ["product_018.jpeg", "product_017.jpeg", "product_016.jpeg"],
    compatibility: "not suitable for lactose intolrant",
  },
  {
    id: "007",
    category: "Instant Coffee",
    name: "Cold Brew Singles",
    description: {
      bodyCopy1:
        "Bold, creamy, and made for one—Chamberlain Singles bring rich flavor in compact form, perfect for solo indulgence anytime...",
      bodyCopy2:
        "Mocha, vanilla, or oatmilk delight—just stir, sip, and savor sophistication in every sleek, single-serve experience you deserve...",
    },
    designer: "Emma Chamberlain",
    price: 10,
    date: "2025-04-12",
    fileType: "PSD",
    previewImg: "product_014.jpeg",
    productImages: ["product_014.jpeg", "product_015.jpeg", "product_025.jpeg"],
    compatibility: "clear (if used without milk)",
  },
  {
    id: "008",
    category: "Seasonal Special Coffee",
    name: "Holiday Blend",
    description: {
      bodyCopy1:
        "Celebrate the season solo-style—our Holiday Blend brings cozy spices, rich coffee notes, and joyful warmth to every single cup...",
      bodyCopy2:
        "Whether fireside or on the go, Chamberlain Singles deliver festive flavor and elegant indulgence in every comforting sip...",
    },
    designer: "Chamberlain Labs",
    price: 25,
    date: "2025-04-13",
    fileType: "PNG",
    previewImg: "product_019.jpeg",
    productImages: ["product_019.jpeg", "product_020.jpeg", "product_021.jpeg"],
    compatibility: "Clear",
  },
  {
    id: "009",
    category: "Limited Edition",
    name: "Chamberlain Circus",
    description: {
      bodyCopy1:
        "Step right up for a bold brew extravaganza—where rich coffee meets popcorn spice and caramel thrills under the big top...",
      bodyCopy2:
        "Each cup delights with circus magic, daring flavor, and a touch of whimsy to dazzle your solo sip routine...",
    },
    designer: "Emma Chamberlain",
    price: 50,
    date: "2025-04-14",
    fileType: "PNG",
    previewImg: "product_024.jpeg",
    productImages: ["product_024.jpeg", "product_023.jpeg", "product_022.jpeg"],
    compatibility: "NOT SUITABLE FOR LACTOS INTOLRANT",
  },
  {
    id: "010",
    category: "Instant Coffee",
    name: "Oatmilk Latte Cold Coffee",
    description: {
      bodyCopy1:
        "Sip the chill with velvet-smooth oatmilk swirls, mellow espresso notes, and a whisper of natural sweetness—no dairy, all dazzle...",
      bodyCopy2:
        "Perfectly brewed for solo sips on sunny strolls, It’s coffee comfort reimagined in a cool, plant-powered pour...",
    },
    designer: "Future Constructs",
    price: 20,
    date: "2025-04-15",
    fileType: "MP4",
    previewImg: "product_029.jpeg",
    productImages: ["product_029.jpeg", "product_028.jpeg", "product_027.jpeg"],
    compatibility: "not suitable for lactos Intolrant",
  },
  {
    id: "011",
    category: "Instant Coffee",
    name: "Singles Specials Bundle",
    description: {
      bodyCopy1:
        "Cool down with precision—our Cold Brew Sachets deliver bold flavor in a bundle made for solo moments and breezy refreshment...",
      bodyCopy2:
        "Just steep, sip, and savor the smooth chill—conveniently crafted for effortless elegance, one sleek sachet at a time..",
    },
    designer: "Chamberlain Labs",
    price: 12,
    date: "2025-04-16",
    fileType: "PSD",
    previewImg: "product_026.jpeg",
    productImages: ["product_026.jpeg", "product_025.jpeg", "product_014.jpeg"],
    compatibility: "clear",
  },
  {
    id: "012",
    category: "Coffee",
    name: "Chamberlain Originals",
    description: {
      bodyCopy1:
        "Timelessly bold, Chamberlain’s Classic Coffee balances rich depth with smooth clarity in every sip...",
      bodyCopy2:
        " Crafted for pure focus and everyday elegance—where tradition meets modern taste...",
    },
    designer: "Emma Chamberlain",
    price: 20,
    date: "2025-04-17",
    fileType: "PNG",
    previewImg: "product_032.jpeg",
    productImages: ["product_032.jpeg", "product_031.jpeg", "product_030.jpeg"],
    compatibility: "clear",
  },
  {
    id: "013",
    category: "cutlery",
    name: "Travel Containers",
    description: {
      bodyCopy1:
        "Take your brew anywhere—sleek containers designed for spill-proof sipping and thermal control...",
      bodyCopy2:
        "From minimal mugs to insulated tumblers, each crafted to keep your coffee bold and ready on the move...",
    },
    designer: "Emma Chamberlain",
    price: 5,
    date: "2025-04-18",
    fileType: "PNG",
    previewImg: "product_033.jpeg",
    productImages: ["product_033.jpeg", "product_034.jpeg", "product_035.jpeg"],
    compatibility: "clear",
  },
];

export default products;
