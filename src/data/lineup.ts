export type Category = "DJs" | "Live" | "Collectives";

export interface Act {
  name: string;
  soundcloud?: string;
  bandcamp?: string;
  // For billed acts with no streaming presence at all (e.g. visual artists).
  website?: string;
}

export interface Artist extends Act {
  category: Category;
  // Poster-style b2b billings: each member keeps their own streams.
  members?: Act[];
}

// ZAP Campout 2026 lineup. Streaming links were verified against Resident
// Advisor, Bandcamp, official sites, and label/press coverage (the festival
// is rooted in the DC / Baltimore / Philly / NYC underground club + DIY scene).
// Acts with no confirmed profile are left link-less and render as "TBA"; acts
// that have a site but no streams carry `website` and render as "INFO".
// Re-verified 2026-08-25 against the RA lineup announcement (ra.co/news/85754):
// every link below resolves and its profile name matches the billed name.
// That round also cleared CHELLE (soundcloud "Chelle"), CRY and POLARVIEW,
// and added seven acts the first pass missed.
// Still medium-confidence — worth a final eyeball:
//   SEAN CHAPPELL (common name; handle is a real "sean.chappell" but
//   unconfirmed as this DJ), MIRA MIRA (an unrelated Melbourne duo shares
//   the name; linked profile is the NYC/Pittsburgh one).
export const ARTISTS: Artist[] = [
  // DJs
  { name: "BABYPUFFF", category: "DJs", soundcloud: "https://soundcloud.com/babypufff" },
  { name: "BLACK GREALISH", category: "DJs", soundcloud: "https://soundcloud.com/smiggins" },
  { name: "CHELLE", category: "DJs", soundcloud: "https://soundcloud.com/dj_chelle" },
  { name: "CHEF CARL", category: "DJs" },
  {
    name: "CRASH COURSE: GUM.MP3 B2B SWAMI SOUND",
    category: "DJs",
    members: [
      {
        name: "GUM.MP3",
        soundcloud: "https://soundcloud.com/gum_mp3",
        bandcamp: "https://gumstudio.bandcamp.com/",
      },
      { name: "SWAMI SOUND", soundcloud: "https://soundcloud.com/masutaswami" },
    ],
  },
  { name: "DJ DIASPORA", category: "DJs" },
  { name: "ESHIE", category: "DJs", soundcloud: "https://soundcloud.com/eshied" },
  {
    name: "ETHER PLEASER",
    category: "DJs",
    soundcloud: "https://soundcloud.com/etherpleaser",
  },
  {
    name: "FABIOLA",
    category: "DJs",
    soundcloud: "https://soundcloud.com/cyberfab",
    bandcamp: "https://fabi0la.bandcamp.com/",
  },
  { name: "JACQ JILL", category: "DJs", soundcloud: "https://soundcloud.com/jacq-jill" },
  { name: "JMAL", category: "DJs", soundcloud: "https://soundcloud.com/jmalinthemix" },
  {
    name: "JOYCE LIM",
    category: "DJs",
    soundcloud: "https://soundcloud.com/joyce-lim-2",
    bandcamp: "https://joycelim.bandcamp.com/",
  },
  {
    name: "JUANA",
    category: "DJs",
    soundcloud: "https://soundcloud.com/thatjuana",
    bandcamp: "https://thatjuana.bandcamp.com/",
  },
  {
    name: "KEENAN ORR B2B TOMMY C",
    category: "DJs",
    members: [
      { name: "KEENAN ORR", soundcloud: "https://soundcloud.com/keenanorrdc" },
      { name: "TOMMY C", soundcloud: "https://soundcloud.com/tommycornelis" },
    ],
  },
  {
    name: "KIERNAN LAVEAUX",
    category: "DJs",
    soundcloud: "https://soundcloud.com/kiernan-laveaux",
  },
  {
    name: "KILBOURNE",
    category: "DJs",
    soundcloud: "https://soundcloud.com/kilbourne",
    bandcamp: "https://kilbourne.bandcamp.com/",
  },
  { name: "LIVWUTANG", category: "DJs", soundcloud: "https://soundcloud.com/livwutang" },
  { name: "MALZOF", category: "DJs", soundcloud: "https://soundcloud.com/malzof" },
  { name: "MIRA MIRA", category: "DJs", soundcloud: "https://soundcloud.com/mirasamira" },
  { name: "NATALIEPOPS", category: "DJs", soundcloud: "https://soundcloud.com/nataliepopss" },
  {
    name: "RELAXER",
    category: "DJs",
    soundcloud: "https://soundcloud.com/relaxerelaxer",
    bandcamp: "https://relaxerelaxer.bandcamp.com/",
  },
  {
    name: "SDOT",
    category: "DJs",
    soundcloud: "https://soundcloud.com/sdotmusik",
    bandcamp: "https://sdotmusic1.bandcamp.com/",
  },
  { name: "SEAN CHAPPELL", category: "DJs", soundcloud: "https://soundcloud.com/sean-chappell" },
  {
    name: "SHAI FM",
    category: "DJs",
    soundcloud: "https://soundcloud.com/shaifm",
    bandcamp: "https://shaifm.bandcamp.com/",
  },
  { name: "SOLIDARE", category: "DJs", soundcloud: "https://soundcloud.com/solidare" },
  { name: "SUCCUBASS", category: "DJs", soundcloud: "https://soundcloud.com/succubass" },
  { name: "T.WAN", category: "DJs", soundcloud: "https://soundcloud.com/tiffwanee" },
  { name: "ULTRA NATÉ", category: "DJs", soundcloud: "https://soundcloud.com/ultranatofficial" },

  // Live
  { name: "BELLA HAYES", category: "Live", bandcamp: "https://bellahayes.bandcamp.com/" },
  { name: "COMMITMENT", category: "Live", bandcamp: "https://commitmentphl.bandcamp.com/" },
  { name: "CRY", category: "Live", bandcamp: "https://crymusic1.bandcamp.com/" },
  {
    name: "LIP CRITIC",
    category: "Live",
    soundcloud: "https://soundcloud.com/lipcritic",
    bandcamp: "https://lipcritic.bandcamp.com/",
  },
  {
    name: "LOOSE LEASH",
    category: "Live",
    bandcamp: "https://looseleash.bandcamp.com/",
  },
  { name: "MATMOS", category: "Live", bandcamp: "https://matmos.bandcamp.com/" },
  { name: "MORE CLOWNS", category: "Live" },
  // Community-engaged visual artist (American University), not a music act, so
  // she has no SoundCloud/Bandcamp by design. Category is unverified: the RA
  // announcement does not bill her, so "Live" is inherited from the poster.
  { name: "NAOCO WOWSUGI", category: "Live", website: "https://www.wowsugi.com/" },
  {
    name: "PAMELA_ AND HER SONS",
    category: "Live",
    bandcamp: "https://pamelaandhersons.bandcamp.com/",
  },
  { name: "POLARVIEW", category: "Live", bandcamp: "https://polarview.bandcamp.com/" },
  {
    name: "ROOST.WORLD",
    category: "Live",
    soundcloud: "https://soundcloud.com/user-497978805",
    bandcamp: "https://roost.bandcamp.com/",
  },
  { name: "SLUG BEAT", category: "Live" },
  {
    name: "SHOW ME THE BODY",
    category: "Live",
    soundcloud: "https://soundcloud.com/showmethebody",
    bandcamp: "https://showmethebody.bandcamp.com/",
  },
  // Six-person NYC crew. Confirmed via T.Wan's SoundCloud bio, which reads
  // "1/6 of @spiralgenerator" and lists "9/4 - ZAP Outdoorz (w/ Spiral
  // Generator) @ Camp Tall Timbers, WV". The site matches the booking address
  // in that profile's own bio (hello@spiralgenerator.com).
  // NOT linked: spiralgenerator.bandcamp.com is a different act — an empty
  // placeholder page listed in Switzerland, no tie to this NYC crew.
  {
    name: "SPIRAL GENERATOR",
    category: "Live",
    soundcloud: "https://soundcloud.com/spiralgenerator",
    website: "https://spiralgenerator.com/",
  },
  { name: "SUBWOOFER DUO", category: "Live" },
  {
    name: "TONGUE DEPRESSOR",
    category: "Live",
    bandcamp: "https://tonguedepressor.bandcamp.com/",
  },
  {
    name: "TOTAL WIFE",
    category: "Live",
    bandcamp: "https://totalwife.bandcamp.com/",
  },
  {
    name: "QIUJIANG LEVI LU",
    category: "Live",
    bandcamp: "https://levilu.bandcamp.com/",
  },

  // Collectives (curatorial crews / showcases — no streaming profile)
  { name: "DANCE CLUB", category: "Collectives" },
  { name: "OUTSIDE TIME", category: "Collectives" },
  { name: "UNBOOKING", category: "Collectives" },
];
