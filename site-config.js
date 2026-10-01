/**
 * ============================================================
 *  MISTER ROUND — SITE CONFIGURATION FILE
 *  ============================================================
 *
 *  THIS IS THE ONLY FILE YOU NEED TO EDIT.
 *  Change anything here and the website updates automatically.
 *
 *  HOW TO EDIT:
 *  - Text:   Replace the string between the quotes " "
 *  - Images: Put new images in the /assets/ folder, then
 *            update the path (e.g. "assets/my-photo.jpg")
 *  - Videos: Put .mp4 files in /assets/videos/ folder, then
 *            update the path (e.g. "assets/videos/clip.mp4")
 *  - Colors: Use any hex color code (e.g. "#FF0000" for red)
 *  - Show/Hide sections: Set `enabled: false` to hide a section
 *
 *  TIPS:
 *  - Don't remove the commas after each item
 *  - Don't remove the quotes around text
 *  - Save the file and refresh the browser to see changes
 * ============================================================
 */

const SITE_CONFIG = {

  /* ══════════════════════════════════════════════════════════
     BRANDING
     Change name, logo, and tagline here.
     Logo: put your image in assets/ and update the path.
     ══════════════════════════════════════════════════════════ */
  brand: {
    name:       "Mister Round",
    logo:       "assets/logo.jpg",    // path to logo image
    tagline:    "Elite training & fitness programs. Real boxing. Real coaching. Real results.",
    favicon:    "assets/logo.jpg",    // browser tab icon
  },

  /* ══════════════════════════════════════════════════════════
     THEME COLORS
     Change these to rebrand the entire site instantly.
     Use any valid hex color code.
     ══════════════════════════════════════════════════════════ */
  theme: {
    colorPrimary:    "#D32F2F",   // clean athletic red accent
    colorGold:       "#D4AF37",   // warm subtle gold accent
    colorBackground: "#121316",   // warm charcoal page background
    colorDark:       "#18191E",   // elevated charcoal section background
    colorDark2:      "#1E2026",   // soft charcoal card background
    colorDark3:      "#252830",   // input & subtle highlight background
    colorText:       "#F8F9FA",   // clean crisp off-white text
    colorTextMuted:  "#B4B9C4",   // high-readability secondary text
    colorTextGray:   "#8A909E",   // subtle text
  },

  /* ══════════════════════════════════════════════════════════
     NAVIGATION
     Clean, low cognitive load.
     ══════════════════════════════════════════════════════════ */
  nav: {
    cta: { label: "FREE TRIAL CLASS", href: "#contact" },
    links: [
      { label: "ABOUT MR. ROUND", href: "#about",    enabled: true },
      { label: "PROGRAMS",        href: "#programs", enabled: true },
      { label: "SCOPES BOXING",   href: "#scopes",   enabled: true },
      { label: "FAQ",             href: "#faq",      enabled: true },
      { label: "LOCATION",        href: "#contact",  enabled: true },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     HERO SLIDER
     Mister Round Project: Umbrella platform for specialized fitness.
     ══════════════════════════════════════════════════════════ */
  hero: {
    autoplayInterval: 6000,
    slides: [
      {
        image:    "assets/class.jpg",
        eyebrow:  "THE MISTER ROUND PROJECT",
        title:    "ONE MINDSET.<br/>MULTIPLE DISCIPLINES.",
        subtitle: "Mister Round develops purposeful training programs centered on humility, progress, and respect. Featuring our active flagship: Scopes Boxing Club.",
        caption:  { tag: "The Mister Round Project", text: "Diverse training disciplines united under one code: show up, work hard, support your teammates." },
        buttons: [
          { label: "EXPLORE SCOPES BOXING", href: "#scopes",   style: "primary" },
          { label: "VIEW ALL PROGRAMS",     href: "#programs", style: "ghost"   },
        ],
      },
      {
        image:    "assets/wrap.jpg",
        eyebrow:  "FLAGSHIP PROGRAM: SCOPES BOXING CLUB",
        title:    "BOXING FOR<br/>EVERY BODY.",
        subtitle: "Ages 6 to 75+. Beginners, youth, seniors, and every body type. From junior fundamentals to beginner foundation and community sparring — your first class is 100% free.",
        caption:  { tag: "862 Merivale Rd, Ottawa", text: "Open 7 days a week. Safe technique and individual pacing always come first." },
        buttons: [
          { label: "CLAIM YOUR FREE CLASS", href: "#contact", style: "primary" },
          { label: "DISCOVER THE METHOD",   href: "#scopes",  style: "ghost"   },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     STATS STRIP
     4 clean verified facts — no clutter.
     ══════════════════════════════════════════════════════════ */
  stats: [
    { number: 6,   suffix: "to 75+", label: "Ages Welcome" },
    { number: 7,   suffix: "Days",   label: "Open Every Week" },
    { number: 100, suffix: "% Free", label: "First Trial Class" },
  ],

  /* ══════════════════════════════════════════════════════════
     ABOUT SECTION
     The Mister Round Project & Core Mindset.
     ══════════════════════════════════════════════════════════ */
  about: {
    enabled:  true,
    eyebrow:  "THE PROJECT",
    title:    "We Care About Your Mindset. Not Your Shape.",
    image:    "assets/wrap.jpg",
    paragraphs: [
      "Mister Round is a dedicated fitness and athletic training project built on a simple rule: physical training belongs to everyone. Not just the already-fit, not just the young, and not just people with a certain look.",
      "Under the Mister Round project, we develop and host distinct athletic disciplines — beginning with Scopes Boxing Club. On our floor, you'll find kids as young as 6 learning respect, teenagers training beside a 70-year-old, and beginners discovering their strength. No judgment. No ego. No exceptions.",
    ],
    valuesList: [
      { name: "Hard Work", desc: "Honest effort every round" },
      { name: "Respect",   desc: "Everyone is equal on our floor" },
      { name: "Altruism",  desc: "We lift each other up" },
      { name: "Support",   desc: "Teammates, not competitors" },
      { name: "Progress",  desc: "Your only benchmark was yesterday" },
      { name: "Humility",  desc: "We check our egos at the door" },
      { name: "Safety",    desc: "100% supervised, certified gear" },
    ],
    pillars: [
      { icon: "star",    title: "Hard Work & Humility", desc: "No egos. We celebrate showing up and giving your personal best." },
      { icon: "award",   title: "Safety & Technique",   desc: "Official Boxing Ontario facility. Certified coaching, full gear, and zero recklessness." },
      { icon: "users",   title: "Support & Altruism",   desc: "The person next to you is your teammate. We cheer for every round, every breakthrough." },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     PROGRAMS UNDER MISTER ROUND
     Showcasing Scopes Boxing alongside upcoming programs.
     ══════════════════════════════════════════════════════════ */
  programs: {
    enabled: true,
    eyebrow: "MISTER ROUND PROGRAMS",
    title:   "Disciplines Under The Project",
    subtitle: "Mister Round brings together specialized training disciplines under one roof, unified by one code: hard work, respect, and safety. Discover our active flagship and programs in development.",
    items: [
      {
        id:       "scopes-boxing",
        number:   "01",
        title:    "Scopes Boxing Club",
        desc:     "Ottawa's premier boxing club at 862 Merivale Rd. Official Boxing Ontario facility. Health and fitness in every punch — featuring the 5-step boxing method, kids & junior classes (ages 6–18), foundation, and sparring.",
        image:    "assets/scopes-method.png",
        status:   "live",
        featured: true,
        badge:    "FLAGSHIP • NOW LIVE",
        features: [
          "Kids & Youth classes (Ages 6–18)",
          "Beginner Foundation (All adults & seniors)",
          "5 Core Training Pillars for guaranteed results",
          "Open 7 days a week • 100% Free first trial",
        ],
        cta:  { label: "EXPLORE SCOPES BOXING ↓", href: "#scopes" },
      },
      {
        id:       "strength-conditioning",
        number:   "02",
        title:    "Strength & Conditioning",
        desc:     "Building functional horsepower and movement integrity. Progressive strength, core stability, and athletic longevity designed to support combat sports and everyday vitality.",
        image:    "",
        status:   "coming-soon",
        featured: false,
        badge:    "IN DEVELOPMENT",
        features: [
          "Functional compound movements",
          "Injury prevention & joint health",
          "Custom pacing for all fitness levels",
        ],
        cta:  { label: "GET NOTIFIED", href: "#contact" },
      },
      {
        id:       "hiit-cardio",
        number:   "03",
        title:    "Cardio & Functional HIIT",
        desc:     "High-energy conditioning designed around athletic interval training. Boost lung capacity and endurance with zero burnout.",
        image:    "",
        status:   "coming-soon",
        featured: false,
        badge:    "IN DEVELOPMENT",
        features: [
          "Cardiovascular endurance & stamina",
          "Heart-rate guided pacing",
          "No prior experience needed",
        ],
        cta:  { label: "GET NOTIFIED", href: "#contact" },
      },
      {
        id:       "recovery-mobility",
        number:   "04",
        title:    "Mobility & Longevity",
        desc:     "Restoring range of motion, spine health, and decompression. Supporting recovery so you can train consistently without aches.",
        image:    "",
        status:   "coming-soon",
        featured: false,
        badge:    "IN DEVELOPMENT",
        features: [
          "Active recovery & joint mobility",
          "Rotational flexibility & posture",
          "Seniors & rehabilitation friendly",
        ],
        cta:  { label: "GET NOTIFIED", href: "#contact" },
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     SCOPES BOXING SPOTLIGHT
     Driven by the official Scopes Boxing Method flyer.
     ══════════════════════════════════════════════════════════ */
  scopes: {
    enabled:     true,
    eyebrow:     "FLAGSHIP PROGRAM SPOTLIGHT",
    title:       "Scopes Boxing Club",
    subtitle:    "Where you can always do better. The flagship boxing program under the Mister Round project. 862 Merivale Rd, Ottawa.",
    posterImage: "assets/scopes-method.png",
    motto:       "Have fun! When you love the process you will always want to improve.",
    tagline:     "Fitness and Health in Every Punch",
    features: [
      {
        number: "01",
        tag:    "FOCUS",
        title:  "Eyes Speed",
        desc:   "Boosts focus and reaction speed for attack, defense, work, play, even cooking.",
      },
      {
        number: "02",
        tag:    "ENDURANCE",
        title:  "Lungs Capacity",
        desc:   "Bigger lungs, better stamina and endurance in boxing and everyday life.",
      },
      {
        number: "03",
        tag:    "POWER",
        title:  "Upper Body Strength",
        desc:   "Functional strength and tone to reach your goals when the moment comes.",
      },
      {
        number: "04",
        tag:    "STABILITY",
        title:  "Lower Body Strength",
        desc:   "Strong legs keep you moving smoothly and standing tall without fading.",
      },
      {
        number: "05",
        tag:    "MASTERY",
        title:  "Technical Skills",
        desc:   "Master clean boxing technique to do much more with far less effort.",
      },
    ],
    classes: [
      {
        id:       "youth",
        name:     "Youth & Juniors (Ages 6–18)",
        level:    "AGES 6 TO 18",
        duration: "60 MIN",
        desc:     "Specially designed for kids and teens from ages 6 up to 18. We teach real boxing fundamentals, self-discipline, respect, motor skills, and confidence in a safe, fun, coach-led environment. Zero ego, maximum encouragement.",
        details:  ["Ages 6 to 18 (tailored groups)", "Discipline, motor skills & confidence", "Strict anti-bullying & respect code", "100% coach supervision & safety gear"],
        featured: false,
      },
      {
        id:       "foundation",
        name:     "Foundation",
        level:    "ALL LEVELS",
        duration: "60 MIN",
        desc:     "The safest and most welcoming entry point into boxing. We break everything down — stance, breathing, guard, basic punches. Zero pressure. Zero judgment. 100% support. Perfect if it's your very first time.",
        details:  ["No experience needed — ever", "Full technique focus, zero intensity pressure", "All body types and fitness levels", "Protective gear provided"],
        featured: false,
      },
      {
        id:       "champ",
        name:     "Become a Champ",
        level:    "COMMUNITY FAVOURITE",
        duration: "60–90 MIN",
        desc:     "Our signature class. Boxing drills, functional movement, and conditioning — done together, at your own pace. A 60-year-old and a 20-year-old finish the same workout. Both will feel like champions.",
        details:  ["Adapted for every fitness level", "Community atmosphere — no one gets left behind", "You go at your pace, coaches adapt to you", "Available in 60 or 90 min"],
        featured: true,
      },
      {
        id:       "sparring",
        name:     "Sparring Sessions",
        level:    "WHEN YOU'RE READY",
        duration: "75 MIN",
        desc:     "Fully supervised, fully geared, fully safe. Sparring is introduced only when coaches decide you're ready — not before. Respect between partners is the first rule. This is about learning, not fighting.",
        details:  ["Coach-supervised at all times", "Full protective gear mandatory", "Mutual respect enforced strictly", "Never before coaches say you're ready"],
        featured: false,
      },
    ],
    info: {
      address:  "862 Merivale Road, Ottawa, ON K1Z 5Z6",
      phone:    "(613) 219-2440",
      email:    "scopesboxingclub@hotmail.com",
      hours:    "Open 7 Days a Week",
      days:     "Open 7 days a week",
      location: "862 Merivale Rd, Ottawa, ON",
      mapsUrl:  "https://maps.google.com/?q=Scopes+Boxing+Club+862+Merivale+Road+Ottawa+ON",
    },
    facebookUrl: "https://www.facebook.com/p/Scopes-Boxing-club-100090041123871/",
    mapsUrl:     "https://maps.google.com/?q=Scopes+Boxing+Club+862+Merivale+Road+Ottawa+ON",
  },

  /* ══════════════════════════════════════════════════════════
     COACHES SECTION (Disabled as requested)
     ══════════════════════════════════════════════════════════ */
  coaches: {
    enabled: false,
    eyebrow: "THE TEAM",
    title:   "Meet Your Coaches",
    subtitle: "Always smiling, calm, and welcoming. Master technicians who lead with positive energy, patience, and zero ego.",
    items: [],
  },

  /* ══════════════════════════════════════════════════════════
     GALLERY
     Add photos and videos here.
     enabled: false = hide the entire gallery section

     For PHOTOS:
       { type: "photo", src: "assets/my-photo.jpg", caption: "My caption" }

     For VIDEOS (put .mp4 files in assets/videos/):
       { type: "video", src: "assets/videos/clip.mp4", poster: "assets/thumb.jpg", caption: "My video" }

     For YOUTUBE videos:
       { type: "youtube", src: "https://www.youtube.com/watch?v=VIDEO_ID", caption: "My video" }

     tip: add a comma after each item except the last one
     ══════════════════════════════════════════════════════════ */
  gallery: {
    enabled:  true,
    eyebrow:  "THE GYM",
    title:    "In the Ring",
    subtitle: "Real training. Real moments. Real people.",
    items: [
      // ── Real photos from Scopes Boxing Ottawa ─────────────
      {
        type:    "photo",
        src:     "assets/gm-ring.jpg",
        caption: "Inside Scopes Boxing — the ring, wood floors, heavy bags and custom lighting",
      },
      {
        type:    "photo",
        src:     "assets/gm-padwork.jpg",
        caption: "Head coach guiding a boxer through 1-on-1 pad work",
      },
      {
        type:    "photo",
        src:     "assets/gm-sparring.jpg",
        caption: "Live sparring inside the official Scopes Boxing regulation ring",
      },
      {
        type:    "photo",
        src:     "assets/gm-group-class.jpg",
        caption: "Group class in action — footwork drills and bag combos",
      },
      {
        type:    "photo",
        src:     "assets/gm-heavy-bag.jpg",
        caption: "Member hitting the heavy bag — warm gym lights, total focus",
      },
      {
        type:    "photo",
        src:     "assets/gm-speed-bags.jpg",
        caption: "Speed bags and reflex double-end bags — the precision training zone",
      },
      {
        type:    "photo",
        src:     "assets/gm-blue-zone.jpg",
        caption: "Blue-lit bag zone and artistic gym space — Scopes has its own culture",
      },
      {
        type:    "photo",
        src:     "assets/gm-gloves.jpg",
        caption: "Gloves and gear — every detail at Scopes Boxing is intentional",
      },
      {
        type:    "photo",
        src:     "assets/gm-exterior.jpg",
        caption: "Exterior mural — \"Health and Fitness in Every Punch\" • Ottawa, Ontario, Canada",
      },
      // ── Keep the official method poster ──────────────────
      {
        type:    "photo",
        src:     "assets/scopes-method.png",
        caption: "The Official Scopes Boxing Method — 5 Exercises That Guarantee Results",
      },
      {
        type:    "photo",
        src:     "assets/scopes-banner.png",
        caption: "Scopes Boxing Club — Want to be good at anything? Try boxing!",
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     HOW IT WORKS (Disabled for streamlined layout)
     ══════════════════════════════════════════════════════════ */
  howItWorks: {
    enabled: false,
    eyebrow: "THE PROCESS",
    title:   "Your First Round,\nStep by Step",
    steps: [],
  },

  /* ══════════════════════════════════════════════════════════
     COACHING CALLOUT BANNER (Disabled for lightweight layout)
     ══════════════════════════════════════════════════════════ */
  callout: {
    enabled:  false,
    image:    "assets/coaching.jpg",
    eyebrow:  "THE COACHES' PROMISE",
    title:    "No One Gets Left Behind.",
    desc:     "",
  },

  /* ══════════════════════════════════════════════════════════
     TESTIMONIALS
     Add or remove reviews here.
     ══════════════════════════════════════════════════════════ */
  testimonials: {
    enabled: true,
    eyebrow: "COMMUNITY VOICES",
    title:   "What Our Members Say",
    items: [
      {
        text:     "I'm 64 years old and I've tried every gym in Ottawa. Nothing comes close to this. The coaches treat you like an athlete no matter your age. I leave every class feeling ten years younger.",
        author:   "Richard T.",
        role:     "Member, age 64",
        initials: "RT",
        stars:    5,
      },
      {
        text:     "My daughter started at 12 and I started at 40, same gym, same coaches. Watching her grow into this confident young fighter is something I'll never forget. Best thing we ever did together.",
        author:   "Amira K.",
        role:     "Member & Parent",
        initials: "AK",
        stars:    5,
      },
      {
        text:     "I moved from the Philippines two years ago and didn't know anyone in Ottawa. This gym became my first real community here. The coaches make everyone feel like they belong.",
        author:   "Marcus R.",
        role:     "Scopes Boxing Member",
        initials: "MR",
        stars:    5,
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     FAQ (QUICK ANSWERS)
     Reduces mental load with instant, honest answers.
     ══════════════════════════════════════════════════════════ */
  faq: {
    enabled:  true,
    eyebrow:  "EASY ANSWERS",
    title:    "Everything You Need To Know",
    subtitle: "No guessing. No intimidation. Here is what to expect before stepping in.",
    items: [
      {
        q: "Do I need to be in shape before I start?",
        a: "Never! You get in shape by showing up. Our coaches adapt every exercise to your individual pace, whether you haven't worked out in years or are active.",
      },
      {
        q: "What should I wear and bring to my first class?",
        a: "Just comfortable gym clothes (t-shirt and shorts or track pants) and clean running shoes. Bring a water bottle. We provide gloves, wraps, and all necessary gear for your free trial.",
      },
      {
        q: "Can kids and teenagers join (Ages 6 to 18)?",
        a: "Yes! We run dedicated Youth & Junior training for ages 6 up to 18. Training focuses on confidence, self-discipline, motor skills, and respect in a safe, coach-supervised environment.",
      },
      {
        q: "Is the first class really 100% free?",
        a: "Yes, 100% free with zero pressure, zero commitment, and no contract required. Come experience the gym, meet the coaches, and see if it's the right fit for you.",
      },
      {
        q: "Where is the gym located and when is it open?",
        a: "Scopes Boxing Club is located at 862 Merivale Road in Ottawa (free parking available). We are open 7 days a week starting at 11:00 AM daily.",
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     CONTACT SECTION
     Update location, hours, and social links here.
     ══════════════════════════════════════════════════════════ */
  contact: {
    enabled:  true,
    eyebrow:  "GET IN TOUCH",
    title:    "Ready to Start\nYour Journey?",
    subtitle: "Your first class at Scopes Boxing is free. No experience needed — just the will to show up. Fill in the form and we'll get you booked in.",
    details: [
      { icon: "map-pin", label: "862 Merivale Rd, Ottawa, ON K1Z 5Z6",  sub: "Scopes Boxing Club — Open in Google Maps", link: "https://maps.google.com/?q=Scopes+Boxing+Club+862+Merivale+Road+Ottawa+ON" },
      { icon: "phone",   label: "(613) 219-2440",                         sub: "Call or text for inquiries & booking",     link: "tel:6132192440" },
      { icon: "mail",    label: "scopesboxingclub@hotmail.com",           sub: "Email us anytime with questions",          link: "mailto:scopesboxingclub@hotmail.com" },
      { icon: "clock",   label: "Open 7 Days a Week",                     sub: "From 11 AM daily • Walk-ins & members" },
    ],
    socials: [
      { platform: "facebook",  url: "https://www.facebook.com/p/Scopes-Boxing-club-100090041123871/", enabled: true  },
      { platform: "instagram", url: "https://www.instagram.com/scopesboxing/",                        enabled: true  },
    ],
    form: {
      programOptions: [
        "Scopes Boxing (All Levels / Adults)",
        "Kids & Youth Boxing (Ages 6–18)",
        "Strength & Conditioning (Coming Soon)",
        "HIIT & Cardio Boxing (Coming Soon)",
      ],
      submitLabel:    "BOOK MY FREE CLASS →",
      successMessage: "We'll be in touch within 24 hours to confirm your booking.",
    },
  },

  /* ══════════════════════════════════════════════════════════
     FOOTER
     ══════════════════════════════════════════════════════════ */
  footer: {
    copyright:   "© 2024 Mister Round. All rights reserved.",
    partnerText: "Home of",
    partnerName: "Scopes Boxing Club",
    partnerUrl:  "https://maps.google.com/?q=Scopes+Boxing+Club+862+Merivale+Road+Ottawa+ON",
    partnerSub:  "862 Merivale Rd, Ottawa, ON • (613) 219-2440",
  },

}; // ← Don't remove this closing brace

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_CONFIG;
}
