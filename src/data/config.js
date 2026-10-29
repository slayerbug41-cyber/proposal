/**
 * ─────────────────────────────────────────────────────────────
 *  PROJECT HER ❤️ — personalization
 *  Everything she reads lives in this one file. Edit freely.
 * ─────────────────────────────────────────────────────────────
 */

// WhatsApp number with country code, digits only.
// e.g. "8801712345678" (Bangladesh) or "919876543210" (India).
// If you leave it as "YOUR_NUMBER", the coffee button opens WhatsApp's
// share screen instead, so she can still pick your chat herself.
export const WHATSAPP_NUMBER = "918945989997";

export const proposalConfig = {
  herName: "Arshi", // stays hidden while it's "HER_NAME"
  myName: "Purnendu",
  whatsappNumber: WHATSAPP_NUMBER,

  title: "PROJECT HER",
  subtitle: "Every story starts somewhere…",

  // CHAPTER 00 — THE SECRET
  intro: {
    teaser: "Can I tell you a secret?",
    lines: [
      "There's something I've been meaning to tell you…",
      "but a text message just didn't feel like enough.",
    ],
    button: "OPEN THE SECRET ✨",
  },

  // CHAPTER 01 — THE JOURNEY (exactly 3 lines; the last one is highlighted)
  journey: [
    "Somewhere between all our late-night conversations, something changed…",
    "you went from being a small part of my day…",
    "to the most beautiful part of it.",
  ],

  // CHAPTER 02 — OUR LITTLE MOMENTS (add or remove as many as you like)
  memories: [
    {
      title: "The first words",
      text: "Such an ordinary conversation. I never imagined I'd still remember every word.",
    },
    {
      title: "Your smile",
      text: "Somewhere along the way, your smile became my favourite notification…",
    },
    {
      title: "Waiting for nothing",
      text: "Sometimes I check my phone for no reason at all. Okay — hoping it's you.",
    },
    {
      title: "Just five more minutes",
      text: "I've lost count of how many “five more minutes” quietly became an hour.",
    },
  ],

  // CHAPTER 03 — MEMORY GALLERY
  // Put your images in /public/images/. Missing images show a placeholder.
  photos: ["/images/photo1.jpg", "/images/photo2.jpg", "/images/photo3.jpg"],
  photoCaptions: [
    "Remember this moment?",
    "Some days are simply beautiful…",
    "And this one? Secretly my favourite 🙂",
  ],

  // CHAPTER 04 — WHY YOU? (shown one at a time)
  reasons: [
    "It isn't only that you're beautiful.",
    "With you, I never have to pretend to be anyone else.",
    "The little things you do stay with me long after.",
  ],
  reasonsBridge: "And if I'm being honest…",
  reasonsFinal: "I'd love to know you even more. ❤️",

  // CHAPTER 05 — MINI GAME (every answer gets a playful reaction, never "wrong")
  game: {
    title: "A tiny test 😏",
    question: "Take a guess — which one is true about me?",
    choices: [
      "I come alive after midnight",
      "I'm a little too obsessed with code",
      "I secretly smile every time you reply",
    ],
    reactions: [
      "The stars can neither confirm nor deny this 🌙",
      "Fair — after this website, that one was a little too easy 😅",
      "That's classified information… for now 🤫",
    ],
    response: "Hmm… interesting choice 👀",
    later: "I'll tell you the real answer… later.",
    reveal: "All three 😌", // revealed only in the "Yes" ending
  },

  // CHAPTER 06 — THE QUESTION
  question: {
    lead: ["So…", "I've done all the talking so far.", "Now it's your turn."],
    ask: "Would you like to start a story with me?",
    promise: [
      "I can't promise you something perfect.",
      "But I can promise honesty, respect, and a real effort to make beautiful memories together.",
    ],
    yes: "Yes",
    maybe: "Let me think about it",
    no: "No — and that's completely okay.",
  },

  yes: {
    wow: "WAIT… SERIOUSLY? 😭❤️",
    chapter: "Then today, a brand-new chapter begins.",
    remember: "I'm keeping today's date forever.",
    date: "So… ready for our first official date? ☕",
    button: "Let's plan a coffee date",
    whatsappMessage: "Yes ❤️ I just watched PROJECT HER… so, when are you taking me for coffee? ☕",
  },

  maybe: {
    lines: [
      "Of course.",
      "There's no rush, no pressure.",
      "An honest answer means more to me than a quick one.",
      "Take your time. ❤️",
    ],
    whatsappMessage: "I watched PROJECT HER 🌙 Give me a little time — I'll let you know.",
  },

  no: {
    lines: [
      "Thank you for being honest with me.",
      "Not every story is meant to become a love story.",
      "Some people arrive in our lives as one beautiful chapter — and that's enough.",
      "Be happy, always. ❤️",
    ],
    whatsappMessage: "I watched PROJECT HER. It's really beautiful 🙂 but my answer is no.",
  },

  // Shows a small, optional "let him know" WhatsApp link on the Maybe / No
  // endings, so she can answer without typing it out. Set to false to hide it.
  replyLinkOnEveryEnding: true,

  // Optional background music (starts muted). Put the file at /public/music/romantic.mp3
  music: "/music/romantic.mp3",
};
