export type VideoSource =
  | { type: "vimeo"; id: string; hash?: string; startTime?: number; endTime?: number }
  | { type: "youtube"; id: string }
  | { type: "mp4"; url: string };

export type HeroMedia =
  | VideoSource
  | { type: "image"; url: string; alt?: string };

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: number;
  client: string;
  description: string;
  hero: HeroMedia;
  thumbnail: string; // poster image URL for the hero section
  caseStudy: {
    overview: string;
    role: string[];
    challenge: string;
    solution: string;
    sections: CaseStudySection[];
  };
}

export type CaseStudySection =
  | { type: "text"; heading: string; body: string }
  | { type: "video"; source: VideoSource; caption?: string; autoplay?: boolean; controls?: boolean; muted?: boolean; loop?: boolean }
  | { type: "image"; url: string; alt: string; caption?: string }
  | { type: "pair"; images: [{ url: string; alt: string }, { url: string; alt: string }]; caption?: string; small?: boolean; tall?: boolean }
  | { type: "grid"; images: { url: string; alt: string }[]; caption?: string; cols?: number }
  | { type: "carousel"; images: { url: string; alt: string }[]; caption?: string }
  | { type: "stats"; items: { label: string; value: string }[] }
  | { type: "splitStack"; left: { url: string; alt: string }; right: { url: string; alt: string }[]; caption?: string }
  | { type: "stackLeft"; left: { url: string; alt: string }[]; right: { url: string; alt: string }; caption?: string };

export const projects: Project[] = [
  {
    slug: "the-columbian",
    title: "The Columbian",
    category: "Brand Campaign",
    year: 2025,
    client: "The Columbian",
    description:
      "A brand campaign for one of the Pacific Northwest's oldest newspapers — showing the paper as part of people's lives, not a relic of the past.",
    thumbnail: "/images/ColumbianBrandShoot-18.jpg",
    hero: { type: "vimeo", id: "1146056329" },
    caseStudy: {
      overview:
        "The Columbian has been telling the Pacific Northwest's story for over 130 years. They needed a brand campaign that honored that history without getting buried by it — content that showed the paper as part of people's lives, not a relic of the past.",
      role: ["Director", "Director of Photography", "Photographer"],
      challenge:
        "The Columbian needed to speak to two audiences at once — the loyal print readers who've had it on their doorstep for decades, and a younger generation that's never thought of a newspaper as part of their day. At the same time, the digital edition needed to be surfaced without undercutting the print product. The challenge was building a campaign that honored the physical paper while opening a door for people who'd only ever known news on a screen.",
      solution:
        "We leaned into a slower moment — the weight of the paper in your hands, the ritual of the morning read, a reminder of a time before every headline was fighting for your attention on a glowing rectangle. The campaign romanticized that tangible experience: real people, real homes, the paper as an object worth holding. Woven through it was the story of The Columbian itself — 130 years of showing up for this region, every morning, without fail. That legacy wasn't background. It was the argument.",
      sections: [
        {
          type: "splitStack",
          left: { url: "/images/ColumbianBrandShoot-18.jpg", alt: "Woman reading The Columbian at kitchen table" },
          right: [
            { url: "/images/ColumbianBrandShoot-28.jpg", alt: "The Columbian newspaper with coffee — still life" },
            { url: "/images/ColumbianBrandShoot-50.jpg", alt: "Two men reading The Columbian at a restaurant" },
          ],
        },
        {
          type: "text",
          heading: "The Approach",
          body: "We didn't build sets or cast talent. Every location was a real home, every reader a real person. The paper had to earn its place in the frame the same way it earns its place on a doorstep — by being worth something.",
        },
        {
          type: "pair",
          images: [
            { url: "/images/ColumbianBrandShoot-07.jpg", alt: "Woman reading The Columbian in living room" },
            { url: "/images/ColumbianBrandShoot-27.jpg", alt: "Man reading The Columbian in study with American flag" },
          ],
        },
        {
          type: "image",
          url: "/images/ColumbianBrandShoot-88.jpg",
          alt: "Man reading The Columbian inside the printing press facility",
          caption: "The press floor — where it starts.",
        },
        {
          type: "pair",
          images: [
            { url: "/images/ColumbianBrandShoot-37.jpg", alt: "Woman reading The Columbian outdoors in garden" },
            { url: "/images/ColumbianBrandShoot-39.jpg", alt: "Woman reading The Columbian outside a house" },
          ],
        },
        {
          type: "stackLeft",
          left: [
            { url: "/images/ColumbianBrandShoot-25.jpg", alt: "The Columbian" },
            { url: "/images/ColumbianBrandShoot-44.jpg", alt: "The Columbian" },
          ],
          right: { url: "/images/ColumbianBrandShoot-14.jpg", alt: "Woman on staircase reading The Columbian" },
        },
        {
          type: "carousel",
          images: [
            { url: "/images/ColumbianBTS-1.jpg", alt: "Behind the scenes — The Columbian shoot" },
            { url: "/images/ColumbianBTS-2.jpg", alt: "Behind the scenes — The Columbian shoot" },
            { url: "/images/ColumbianBTS-3.jpg", alt: "Behind the scenes — The Columbian shoot" },
            { url: "/images/ColumbianBTS-4.jpg", alt: "Behind the scenes — The Columbian shoot" },
            { url: "/images/ColumbianBTS-5.jpg", alt: "Behind the scenes — The Columbian shoot" },
          ],
          caption: "Behind the scenes.",
        },
        {
          type: "stats",
          items: [
            { label: "Crew Size", value: "3" },
            { label: "Shoot Days", value: "3" },
            { label: "Locations", value: "6" },
            { label: "Deliverables", value: "Film + Photos" },
          ],
        },
      ],
    },
  },
  {
    slug: "dream-the-museum",
    title: "Dream The Museum",
    category: "Campaign Film",
    year: 2024,
    client: "Columbia Play Project",
    description:
      "A campaign film made to inspire a community to dream up a kids museum in Vancouver, WA. Told through the eyes of a child who's already living inside it.",
    thumbnail: "/images/dtm-still-02.png",
    hero: { type: "vimeo", id: "1033218792" },
    caseStudy: {
      overview:
        "Vancouver, WA doesn't have a kids museum. Dream The Museum is the campaign built to change that. This film was made to show the community what could exist, not through renderings or fundraising decks, but through the imagination of a child who's already dreaming it up.",
      role: ["Director", "Director of Photography", "Editor"],
      challenge:
        "The ask was to get a community excited about something that doesn't exist yet. Concept art and capital campaigns don't do that. Feeling does. The challenge was making something emotionally true enough that people in Vancouver could watch it and think: we need this here.",
      solution:
        "We built every frame around the feeling of childhood imagination, not by stepping back, but by carefully crafting each moment to feel effortless. The creative direction was precise: the right environments, the right sequences, the right light — all in service of a specific kind of whimsy, soft and dreamy and completely sincere. The goal was to make wonder look inevitable. If the film does its job, you don't see the direction. You just feel the dream.",
      sections: [
        {
          type: "image",
          url: "/images/dtm-still-07.png",
          alt: "Dream The Museum title card with glowing light",
        },
        {
          type: "pair",
          images: [
            { url: "/images/dtm-still-01.png", alt: "Girl lying in bed looking up" },
            { url: "/images/dtm-still-02.png", alt: "Girl with magnifying glass in garden" },
          ],
        },
        {
          type: "pair",
          images: [
            { url: "/images/dtm-still-03.png", alt: "Girl drawing with crayons on the floor" },
            { url: "/images/dtm-still-04.png", alt: "Figure in rocket ship playhouse with flashlight" },
          ],
        },
        {
          type: "pair",
          images: [
            { url: "/images/dtm-still-05.png", alt: "Girl sitting with art supplies" },
            { url: "/images/dtm-still-06.png", alt: "Girl in overalls holding something up toward camera" },
          ],
          caption: "Selected frames.",
        },
        {
          type: "text",
          heading: "Behind the Lens",
          body: "Small crew, limited time. We came in prepared but stayed loose — ready to adapt when the day called for it.",
        },
        {
          type: "carousel",
          images: [
            { url: "/images/dtm-bts-04.png", alt: "Director at camera in garden" },
            { url: "/images/dtm-bts-02.png", alt: "Crew setting up outside" },
            { url: "/images/dtm-bts-01.png", alt: "Low angle camera setup in garden" },
            { url: "/images/dtm-bts-03.png", alt: "Camera operator inside the house" },
            { url: "/images/dtm-bts-05.png", alt: "Monitor showing girl with magnifying glass" },
          ],
          caption: "Behind the scenes.",
        },
        {
          type: "stats",
          items: [
            { label: "Shoot Days", value: "1" },
            { label: "Crew Size", value: "5" },
            { label: "Locations", value: "1" },
            { label: "Format", value: "Digital" },
          ],
        },
      ],
    },
  },
  {
    slug: "wool-and-prince",
    title: "Wool & Prince",
    category: "Brand Campaign",
    year: 2025,
    client: "Wool & Prince",
    description: "A grounded brand campaign for clothing built to be worn hard — shot on a working farm in the Pacific Northwest.",
    thumbnail: "/images/w&p - test shoot-27.jpg",
    hero: { type: "image", url: "/images/w&p - test shoot-09.jpg", alt: "Wool & Prince campaign" },
    caseStudy: {
      overview: "Wool & Prince makes clothing from merino wool and natural fibers — built to wear hard, wash less, and get better with age. They needed content that matched the product's honesty. No mountain peaks, no golden hour. Just real clothes doing real things.",
      role: ["Director", "Creative Direction", "Design", "Strategy"],
      challenge: "Most clothing brands default to aspirational fantasy. Wool & Prince's audience doesn't buy that — they buy things that last. The challenge was making functional clothing feel genuinely compelling without reaching for clichés.",
      solution: "I started with a full brand audit — dug into how Wool & Prince was showing up, where the messaging was falling flat, and what the brand actually stood for at its core. From that I built the strategy and concepted the photo shoot as the first place to put it into practice. I shot on a working farm in the Pacific Northwest. Muddy ground, overcast skies, sheep that had no interest in my shot list. I put the clothes through it and photographed what happened honestly.",
      sections: [
        {
          type: "pair",
          images: [
            { url: "/images/w&p - test shoot-02.jpg", alt: "Wool & Prince fleece vest lifestyle" },
            { url: "/images/w&p - test shoot-13.jpg", alt: "Wool & Prince plaid shirt at barn" },
          ],
        },
        {
          type: "text",
          heading: "The Shoot",
          body: "I didn't art direct the mud. I didn't move the animals. I found the frames that already existed inside the chaos of a working farm and let the product sit inside them. The result is images that feel like evidence rather than advertising.",
        },
        {
          type: "pair",
          images: [
            { url: "/images/w&p - test shoot-11.jpg", alt: "Wool & Prince fleece vest on fence" },
            { url: "/images/w&p - test shoot-01.jpg", alt: "Wool & Prince fleece zipper detail" },
          ],
          caption: "Fleece Vest — details.",
        },
        {
          type: "image",
          url: "/images/w&p - test shoot-35.jpg",
          alt: "Wool & Prince tee on a hanger with sheep",
          caption: "The brief: wear it hard.",
        },
        {
          type: "text",
          heading: "Digital Design",
          body: "Beyond the shoot, I designed the landing page and product pages that the content would live inside. The goal was the same as the photography: make the clothes the center of gravity, not the chrome around them. Clean typography, generous white space, photography doing the selling.",
        },
        {
          type: "pair",
          images: [
            { url: "/images/Landing Page ALT.png", alt: "Wool & Prince landing page" },
            { url: "/images/FleeceProductPage.png", alt: "Fleece Vest product page" },
          ],
          caption: "Landing page + product page.",
        },
        {
          type: "text",
          heading: "Social",
          body: "The shoot also fed a set of direct-response Instagram ads. Each ad was built around a single use case — work, travel, play, everyday — keeping the copy as spare as the photography. Performance-oriented but never loud.",
        },
        {
          type: "grid",
          images: [
            { url: "/images/IG_W&P_Ad_01.png", alt: "Your new everyday pants — Instagram ad" },
            { url: "/images/IG_W&P_Ad_02.png", alt: "Wool & Work — Instagram ad" },
            { url: "/images/IG_W&P_Ad_03.png", alt: "Wool & Travel — Instagram ad" },
            { url: "/images/IG_W&P_Ad_04.png", alt: "Wool & Play — Instagram ad" },
          ],
          caption: "Instagram ads — four variations.",
        },
        {
          type: "stats",
          items: [
            { label: "Shoot Days", value: "1" },
            { label: "Images Delivered", value: "80+" },
            { label: "Digital Ads", value: "8" },
            { label: "Location", value: "Portland" },
          ],
        },
      ],
    },
  },
  {
    slug: "on-water",
    title: "onWater",
    category: "Brand Film",
    year: 2025,
    client: "onWater",
    description:
      "Motion design and art direction for onWater Fish — built to capture attention in a crowded outdoor recreation market.",
    thumbnail: "/images/onWaterLogo.png",
    hero: { type: "vimeo", id: "1152006062" },
    caseStudy: {
      overview:
        "onWater Fish is one of the most powerful tools on the market for serious anglers. I handled motion design and art direction across paid social, product launches, and in-app experience — building a visual language that could sell the app, launch new features, and feel at home inside it.",
      role: ["Motion Design", "Art Direction"],
      challenge:
        "Outdoor and fishing brands compete hard for the same audience. Most content looks the same. The challenge was making ads that performed, a launch video that landed, and in-app motion that felt considered — all while keeping a consistent visual identity across very different contexts.",
      solution:
        "I created a monthly cadence of paid social ads, directed and designed the GTM launch video for their new AI product, and built the motion design system used inside the app itself. Each piece had a different job, but they all pulled from the same aesthetic — precise, dynamic, and built for people who take fishing seriously.",
      sections: [
        {
          type: "video",
          source: { type: "vimeo", id: "1123007021" },
          autoplay: true,
          controls: false,
          muted: true,
          loop: true,
        },
        {
          type: "video",
          source: { type: "vimeo", id: "1001387254" },
          autoplay: true,
          controls: false,
          muted: true,
          loop: true,
        },
        {
          type: "stats",
          items: [
            { label: "Deliverable", value: "Motion" },
            { label: "Market", value: "Outdoor" },
            { label: "Services", value: "Motion Design" },
          ],
        },
      ],
    },
  },
  {
    slug: "terra",
    title: "The River Sessions",
    category: "Concert Film",
    year: 2024,
    client: "River Sessions",
    description:
      "A film series bringing artists into the open air along the Columbia River — part concert, part campfire, part creative ritual.",
    thumbnail: "/images/RiverSessions_01.jpg",
    hero: { type: "youtube", id: "hXpXr1F-vt4" },
    caseStudy: {
      overview:
        "We invite artists to share a song and a story — out of traditional venues and into something more personal. Set against the cinematic backdrop of the Columbia River, each session is part concert, part campfire, part creative ritual. Music, story, and landscape folding naturally into place.",
      role: ["Director", "Director of Photography", "Producer"],
      challenge:
        "Most live music content is built for stages and crowds. The challenge here was the opposite — stripping everything back until the artist, the song, and the landscape were the only things left in the frame. No production for production's sake.",
      solution:
        "We kept the crew small and the footprint light. Each session included a live performance film and an intimate artist conversation — a rare peek behind the curtain into the creative soul behind the song. The kind of thing you usually only hear in tour vans or on back porches.",
      sections: [
        {
          type: "video",
          source: { type: "youtube", id: "cXEAwzbkc1o" },
          controls: true,
          autoplay: false,
          muted: false,
          loop: false,
        },
        {
          type: "text",
          heading: "The Experience",
          body: "Beyond the film, each River Session is a curated gathering — musicians, locals, and travelers brought together by a shared appreciation for place. Hospitality meets creative expression, shaped by the spirit of the Pacific Northwest.",
        },
        {
          type: "stats",
          items: [
            { label: "Platform", value: "YouTube" },
            { label: "Episodes", value: "4" },
            { label: "Location", value: "Pacific Northwest" },
          ],
        },
      ],
    },
  },
  {
    slug: "riffle-ranch",
    title: "Riffle Ranch",
    category: "Brand Film",
    year: 2025,
    client: "Riffle Ranch",
    description:
      "A brand film for a Central Oregon ranch that hosts veterans — built around the land, the river, and the quiet that makes the place worth the trip.",
    thumbnail: "/images/Still 2026-03-20 160941_1.1.1.png",
    hero: { type: "vimeo", id: "1106263702", hash: "b3042e8f6d", startTime: 20, endTime: 27 },
    caseStudy: {
      overview:
        "Riffle Ranch sits along a river in Central Oregon and opens its doors to veterans looking for somewhere to decompress. The fly fishing is world-class. They needed a film that showed guests what to expect — a showcase of everything the property has to offer.",
      role: ["Director", "Director of Photography", "Editor"],
      challenge:
        "A place like this sells itself if you can get people to feel it. The challenge was translating something that's mostly about stillness and space into something that works on a screen.",
      solution:
        "We let the land lead. Wide water, open sky, a fly rod cutting through morning light. We kept the crew small, stayed out of the way, and trusted that the place was interesting enough to carry the film.",
      sections: [
        {
          type: "grid",
          cols: 3,
          images: [
            { url: "/images/Still 2026-04-01 174305_1.14.1.jpg", alt: "The river running through the Riffle Ranch property in Central Oregon" },
            { url: "/images/Still 2026-04-01 174305_1.2.1.jpg", alt: "Angler fly fishing in the river" },
            { url: "/images/Still 2026-04-01 174305_1.29.1.jpg", alt: "Two men watching anglers on the river at dusk" },
            { url: "/images/Still 2026-04-01 174305_1.4.1.jpg", alt: "Hands holding a rainbow trout" },
            { url: "/images/Still 2026-04-01 174305_1.16.1.jpg", alt: "Releasing a trout back into the river" },
            { url: "/images/Still 2026-04-01 174305_1.28.1.jpg", alt: "Guest at glamping tent on the ranch property" },
          ],
        },
        {
          type: "stats",
          items: [
            { label: "Shoot Days", value: "2" },
            { label: "Crew Size", value: "3" },
            { label: "Location", value: "Oregon" },
            { label: "Deliverables", value: "1 Film" },
          ],
        },
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
