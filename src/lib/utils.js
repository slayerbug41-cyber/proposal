export const EASE = [0.22, 1, 0.36, 1];
export const EASE_IN = [0.7, 0, 0.84, 0];

export const HEART_PATH =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

// Resolves "/images/x.jpg" against Vite's base so it works on any host / sub-folder.
export function asset(path) {
  if (!path) return path;
  if (/^(https?:|data:|blob:)/.test(path)) return path;
  return import.meta.env.BASE_URL + path.replace(/^\//, "");
}

export const hasRealName = (name) => !!name && name.trim() !== "" && name.trim().toUpperCase() !== "HER_NAME";

export function whatsappLink(number, text) {
  const digits = String(number || "").replace(/\D/g, "");
  const q = `text=${encodeURIComponent(text)}`;
  return digits.length >= 8 ? `https://wa.me/${digits}?${q}` : `https://wa.me/?${q}`;
}

export const mq = (query) =>
  typeof window !== "undefined" && !!window.matchMedia && window.matchMedia(query).matches;

let segmenter;
// Splits text into user-perceived characters so emoji and accents type in whole pieces.
export function graphemes(text) {
  try {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      segmenter ||= new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (s) => s.segment);
    }
  } catch {
    /* fall through */
  }
  return Array.from(text);
}

export const pad2 = (n) => String(n).padStart(2, "0");
