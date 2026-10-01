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
  subtitle: "একটা গল্প শুরু করার আগে…",

  // CHAPTER 00 — THE SECRET
  intro: {
    teaser: "একটা secret বলব?",
    lines: [
      "তোমাকে একটা কথা বলার ছিল…",
      "কিন্তু chat-এ লিখে বললে ব্যাপারটা boring হয়ে যায়।",
    ],
    button: "OPEN THE SECRET ✨",
  },

  // CHAPTER 01 — THE JOURNEY (exactly 3 lines; the last one is highlighted)
  journey: [
    "তোমার সাথে কথা বলতে বলতে একটা অদ্ভুত ব্যাপার হয়েছে…",
    "তুমি আমার দিনের একটা ছোট্ট অংশ থেকে…",
    "আমার দিনের একটা সুন্দর অংশ হয়ে গেছো।",
  ],

  // CHAPTER 02 — OUR LITTLE MOMENTS (add or remove as many as you like)
  memories: [
    {
      title: "প্রথম কথাগুলো",
      text: "সেদিনের সেই সাধারণ conversation-টা এতটা মনে থাকবে ভাবিনি।",
    },
    {
      title: "তোমার হাসি",
      text: "তোমার একটা ছোট্ট হাসি কখন যে আমার favourite notification হয়ে গেল…",
    },
    {
      title: "অকারণ অপেক্ষা",
      text: "কখনও কখনও ফোনটা কোনো কারণ ছাড়াই check করি।",
    },
    {
      title: "আর পাঁচ মিনিট",
      text: "“আর পাঁচ মিনিট” বলে কতবার যে এক ঘণ্টা পার হয়ে গেছে, হিসেব নেই।",
    },
  ],

  // CHAPTER 03 — MEMORY GALLERY
  // Put your images in /public/images/. Missing images show a placeholder.
  photos: ["/images/photo1.jpg", "/images/photo2.jpg", "/images/photo3.jpg"],
  photoCaptions: [
    "এই মুহূর্তটা মনে আছে?",
    "কিছু দিন এমনিই সুন্দর হয়…",
    "আর এটা? এটা আমার favourite 🙂",
  ],

  // CHAPTER 04 — WHY YOU? (shown one at a time)
  reasons: [
    "তুমি সুন্দর বলে শুধু তোমাকে ভালো লাগে না।",
    "তোমার সাথে কথা বললে আমি নিজের মতো থাকতে পারি।",
    "তোমার ছোট ছোট ব্যাপারগুলো আমার মনে থেকে যায়।",
  ],
  reasonsBridge: "আর সত্যি বলতে…",
  reasonsFinal: "তোমাকে আরও জানতে ইচ্ছে করে। ❤️",

  // CHAPTER 05 — MINI GAME (every answer gets a playful reaction, never "wrong")
  game: {
    title: "একটা ছোট্ট test 😏",
    question: "আমার সম্পর্কে একটা জিনিস guess করো…",
    choices: [
      "আমি রাতে বেশি active",
      "আমি coding নিয়ে একটু বেশি obsessed",
      "আমি তোমার message-এর reply আসলে secretly smile করি",
    ],
    reactions: [
      "রাতের তারাগুলো এটা confirm-ও করবে না, deny-ও করবে না 🌙",
      "এই website-টা দেখার পর এটা guess করা একটু সহজ ছিল, মানছি 😅",
      "এটা আপাতত classified information… 🤫",
    ],
    response: "Hmm… interesting choice 👀",
    later: "আচ্ছা, আসল answerটা পরে বলব।",
    reveal: "তিনটেই 😌", // revealed only in the "Yes" ending
  },

  // CHAPTER 06 — THE QUESTION
  question: {
    lead: ["আচ্ছা…", "এতক্ষণ তো আমি বললাম।", "এবার তোমার পালা।"],
    ask: "তুমি কি আমার সাথে একটা গল্প শুরু করতে চাও?",
    promise: [
      "আমি কোনো perfect relationship-এর promise করছি না।",
      "শুধু honest থাকা, respect করা, আর একসাথে সুন্দর কিছু memories তৈরি করার চেষ্টা করব।",
    ],
    yes: "হ্যাঁ",
    maybe: "আমি একটু ভাবতে চাই",
    no: "না — এবং সেটাও completely okay.",
  },

  yes: {
    wow: "WAIT… SERIOUSLY? 😭❤️",
    chapter: "তাহলে আজ থেকে একটা নতুন chapter শুরু হলো।",
    remember: "আজকের তারিখটা মনে রাখলাম।",
    date: "প্রথম official date-এর জন্য প্রস্তুত তো? ☕",
    button: "একটা coffee date plan করি ☕",
    whatsappMessage: "হ্যাঁ ❤️ PROJECT HER দেখলাম… তাহলে coffee date কবে? ☕",
  },

  maybe: {
    lines: [
      "অবশ্যই।",
      "তোমাকে কোনো তাড়াহুড়ো করে উত্তর দিতে হবে না।",
      "তোমার honest answer-টাই আমার কাছে important।",
      "Take your time. ❤️",
    ],
    whatsappMessage: "PROJECT HER দেখলাম 🌙 একটু ভেবে তোমাকে জানাব।",
  },

  no: {
    lines: [
      "ধন্যবাদ সত্যিটা বলার জন্য।",
      "সব গল্প relationship হয়ে শেষ হয় না।",
      "কিছু মানুষ আমাদের জীবনে আসে সুন্দর একটা chapter হয়ে।",
      "তুমি ভালো থেকো। ❤️",
    ],
    whatsappMessage: "PROJECT HER দেখলাম। সুন্দর বানিয়েছ 🙂 তবে আমার উত্তরটা না।",
  },

  // Shows a small, optional "let him know" WhatsApp link on the Maybe / No
  // endings, so she can answer without typing it out. Set to false to hide it.
  replyLinkOnEveryEnding: true,

  // Optional background music (starts muted). Put the file at /public/music/romantic.mp3
  music: "/music/romantic.mp3",
};
