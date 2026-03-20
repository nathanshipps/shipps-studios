export type VideoSource =
  | { type: "vimeo"; id: string; hash?: string; startTime?: number; endTime?: number }
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
  | { type: "video"; source: VideoSource; caption?: string }
  | { type: "image"; url: string; alt: string; caption?: string }
  | { type: "pair"; images: [{ url: string; alt: string }, { url: string; alt: string }]; caption?: string; small?: boolean }
  | { type: "grid"; images: { url: string; alt: string }[]; caption?: string }
  | { type: "carousel"; images: { url: string; alt: string }[]; caption?: string }
  | { type: "stats"; items: { label: string; value: string }[] };

export const projects: Project[] = [
  {
    slug: "riffle-ranch",
    title: "Riffle Ranch",
    category: "Brand Film",
    year: 2025,
    client: "Riffle Ranch",
    description:
      "A cinematic portrait of a working ranch — land, livestock, and the people who tend both.",
    thumbnail: "/images/riffle-ranch.png",
    hero: { type: "vimeo", id: "1106263702", hash: "b3042e8f6d", startTime: 20, endTime: 27 },
    caseStudy: {
      overview:
        "Riffle Ranch is a place defined by its relationship to the land. This film was built to capture that — the pace, the light, the quiet labor that doesn't make it into the brochure.",
      role: ["Director", "Director of Photography", "Editor"],
      challenge:
        "Ranch life doesn't perform for cameras. The challenge was earning enough trust to be invisible — to document real work without turning it into a production.",
      solution:
        "We spent time on the property before we ever picked up a camera. When we did shoot, we kept the crew small, moved with the day rather than against it, and let the landscape do the heavy lifting.",
      sections: [
        {
          type: "text",
          heading: "The Approach",
          body: "No shot lists. No call sheets beyond sunrise. We followed the rhythm of the ranch and found the film inside it.",
        },
        {
          type: "stats",
          items: [
            { label: "Shoot Days", value: "4" },
            { label: "Crew Size", value: "3" },
            { label: "Location", value: "On-Site" },
            { label: "Deliverables", value: "1 Film" },
          ],
        },
      ],
    },
  },
  {
    slug: "the-columbian",
    title: "The Columbian",
    category: "Brand Campaign",
    year: 2025,
    client: "The Columbian",
    description:
      "A brand campaign for one of the Pacific Northwest's oldest newspapers — showing the paper as part of people's lives, not a relic of the past.",
    thumbnail: "/images/ColumbianBrandShoot-28.jpg",
    hero: { type: "vimeo", id: "1146056329" },
    caseStudy: {
      overview:
        "The Columbian has been telling the Pacific Northwest's story for over 130 years. They needed a brand campaign that honored that history without getting buried by it — content that showed the paper as part of people's lives, not a relic of the past.",
      role: ["Director", "Director of Photography", "Photographer"],
      challenge:
        "Legacy institutions face a specific problem: the equity they've built can start to feel like weight. The Columbian is deeply trusted, but trust alone doesn't attract new readers. The challenge was making the paper feel alive — something people actually reach for.",
      solution:
        "We shot real readers in their real environments. No newsroom, no spokesperson. Just people with the paper — at the kitchen table, in the garden, in a study at night. The campaign argument was simple: this paper fits your life.",
      sections: [
        {
          type: "pair",
          images: [
            { url: "/images/ColumbianBrandShoot-18.jpg", alt: "Woman reading The Columbian at kitchen table" },
            { url: "/images/ColumbianBrandShoot-28.jpg", alt: "The Columbian newspaper with coffee — still life" },
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
          type: "pair",
          images: [
            { url: "/images/ColumbianBrandShoot-50.jpg", alt: "Two men reading The Columbian at a restaurant" },
            { url: "/images/ColumbianBrandShoot-14.jpg", alt: "Woman on staircase reading The Columbian" },
          ],
        },
        {
          type: "stats",
          items: [
            { label: "Est.", value: "1890" },
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
    category: "Narrative Short",
    year: 2024,
    client: "Independent",
    description:
      "A short film about a young girl navigating the border between imagination and the world around her.",
    thumbnail: "/images/dtm-still-02.png",
    hero: { type: "vimeo", id: "1033218792" },
    caseStudy: {
      overview:
        "Dream The Museum follows a young girl whose interior world is as vivid and real as anything outside it. Shot over several days across a handful of intimate locations, the film is built around observation — catching a child in the act of being fully, completely herself.",
      role: ["Director", "Director of Photography", "Editor"],
      challenge:
        "Working with a child lead means giving up control of the frame. You can set everything up perfectly and the moment will still belong to her. The challenge was building a structure loose enough to let that happen — then being ready when it did.",
      solution:
        "We kept the crew small, the camera low, and the days unscheduled enough to follow whatever was actually happening. Most of the film's best moments weren't planned. They were found.",
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
          body: "Shooting on location in a real family's home and garden meant working around the rhythms of an actual life. We didn't bring much in. The rocket ship was already there.",
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
            { label: "Shoot Days", value: "3" },
            { label: "Crew Size", value: "5" },
            { label: "Locations", value: "2" },
            { label: "Format", value: "Digital" },
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
      "A single-take visual journey through a decommissioned brutalist power station, scored to an unreleased track.",
    thumbnail: "/images/onWaterLogo.png",
    hero: { type: "vimeo", id: "1152006062" },
    caseStudy: {
      overview:
        "The band wanted something uncompromising and structural — a video that felt as considered as the music. We had one location, one take, and one chance to get it right.",
      role: ["Director", "Director of Photography"],
      challenge:
        "Executing a true oner in a space with no controllable power, extreme temperature variation, and a crew of 40 people who all had to be invisible to camera.",
      solution:
        "Four months of rehearsal. We mapped every inch of the building, choreographed lighting cues triggered by timecode, and rehearsed the camera move — a two-kilometer dolly track — until it was muscle memory.",
      sections: [
        {
          type: "text",
          heading: "The Single Take",
          body: "We had 12 hours in the building on shoot day. We ran the take 9 times. The version in the video is take 7 — imperfect in ways that made it true.",
        },
        {
          type: "stats",
          items: [
            { label: "Rehearsal Days", value: "22" },
            { label: "Takes on Shoot Day", value: "9" },
            { label: "Dolly Track", value: "2km" },
            { label: "Crew", value: "40" },
          ],
        },
      ],
    },
  },
  {
    slug: "terra",
    title: "Terra",
    category: "Brand Film",
    year: 2024,
    client: "Patagonia",
    description:
      "A cinematic brand film exploring Patagonia's commitment to regenerative agriculture and land stewardship.",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80",
    hero: { type: "vimeo", id: "148751763" },
    caseStudy: {
      overview:
        "Patagonia needed a film that could anchor their environmental campaign — something that felt earned and real, not corporate. We spent three weeks embedded on farms across Montana, California, and Patagonia.",
      role: ["Director", "Director of Photography", "Producer"],
      challenge:
        "Environmental brand films can feel like greenwashing. The challenge was making something that advocates without preaching, and trusts the audience to draw their own conclusions.",
      solution:
        "We led with the farmers and the land, not the brand. Patagonia appears once, in the closing card. Everything else is observation — real people, real work, real consequences.",
      sections: [
        {
          type: "text",
          heading: "Production Philosophy",
          body: "We traveled with a crew of four. No lights, no art department, no interference. We worked with what each location gave us and let the subjects lead. The film was cut from 180 hours of observational footage.",
        },
        {
          type: "stats",
          items: [
            { label: "Shoot Days", value: "21" },
            { label: "Locations", value: "3 States + Patagonia" },
            { label: "Crew Size", value: "4" },
            { label: "Hours Shot", value: "180" },
          ],
        },
        {
          type: "text",
          heading: "Impact",
          body: "The film was used as a centerpiece for Patagonia's regenerative organic certified launch, screened at the United Nations Environment Assembly, and has been translated into 14 languages.",
        },
      ],
    },
  },
  {
    slug: "wool-and-prince",
    title: "Wool & Prince",
    category: "Brand Campaign",
    year: 2024,
    client: "Wool & Prince",
    description: "A grounded brand campaign for clothing built to be worn hard — shot on a working farm in the Pacific Northwest.",
    thumbnail: "/images/w&p - test shoot-27.jpg",
    hero: { type: "image", url: "/images/w&p - test shoot-09.jpg", alt: "Wool & Prince campaign" },
    caseStudy: {
      overview: "Wool & Prince makes clothing from merino wool and natural fibers — built to wear hard, wash less, and get better with age. They needed content that matched the product's honesty. No mountain peaks, no golden hour. Just real clothes doing real things.",
      role: ["Director", "Photographer", "Creative Direction", "Digital Design"],
      challenge: "Most clothing brands default to aspirational fantasy. Wool & Prince's audience doesn't buy that — they buy things that last. The challenge was making functional clothing feel genuinely compelling without reaching for clichés.",
      solution: "We shot on a working farm in the Pacific Northwest over two days. Muddy ground, overcast skies, sheep that had no interest in our shot list. We put the clothes through it and photographed what happened honestly.",
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
          body: "We didn't art direct the mud. We didn't move the animals. We found the frames that already existed inside the chaos of a working farm and let the product sit inside them. The result is images that feel like evidence rather than advertising.",
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
          body: "Beyond the shoot, we designed the landing page and product pages that the content would live inside. The goal was the same as the photography: make the clothes the center of gravity, not the chrome around them. Clean typography, generous white space, photography doing the selling.",
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
            { label: "Shoot Days", value: "2" },
            { label: "Images Delivered", value: "80+" },
            { label: "Digital Ads", value: "4" },
            { label: "Location", value: "PNW" },
          ],
        },
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
