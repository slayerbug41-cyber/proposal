# PROJECT HER ❤️

> Every story starts somewhere…

A short interactive "film" built for one person: seven chapters, a question, and three endings. Every ending treats her answer with respect.

**Stack:** React + Vite + Framer Motion + Lucide icons. Fonts (Playfair Display, Inter and Caveat, Latin subsets only) are self-hosted, so the site makes no third-party requests. There is no backend, no tracking, no cookies and no analytics.

---

## 1. Run it locally

You need Node.js 18 or newer.

```bash
npm install
npm run dev        # opens on http://localhost:5173 (and on your Wi-Fi IP, so you can test on your phone)
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

To test on your phone, connect it to the same Wi-Fi and open the `Network:` URL that `npm run dev` prints.

---

## 2. Personalize it (one file)

Open **`src/data/config.js`**. Everything she reads is in that file.

| Field | What it does |
| --- | --- |
| `WHATSAPP_NUMBER` | Your number with country code, digits only, e.g. `"8801712345678"`. If you leave it as `"YOUR_NUMBER"`, the coffee button opens WhatsApp's share screen so she can choose your chat. |
| `herName` | Her name, shown just before the big question. It stays hidden while it is still `"HER_NAME"`. |
| `myName` | Shown on the loading screen ("A FILM BY …"). |
| `memories` | Chapter 02. Add or remove as many `{ title, text }` items as you like. |
| `photos` / `photoCaptions` | Chapter 03 photos and their handwritten captions. |
| `reasons` | Chapter 04. One sentence at a time. |
| `game` | Chapter 05: the three choices, a reaction for each, and the "real answer" revealed in the Yes ending. |
| `question`, `yes`, `maybe`, `no` | The question and all three endings, including the pre-filled WhatsApp messages. |
| `replyLinkOnEveryEnding` | Shows a small, clearly optional "let him know" WhatsApp link on the Maybe and No endings. Set it to `false` to hide it. |

### Photos

Put your photos in `public/images/` as `photo1.jpg`, `photo2.jpg` and `photo3.jpg`, or change the paths in `photos`.

- Portrait photos (4:5) fit the Polaroid frame best.
- Keep each photo under about 400 KB so it loads quickly on mobile data. https://squoosh.app works well for this.
- If a photo is missing or fails to load, an illustrated placeholder appears in its place. Nothing breaks.
- Until you add your photos, the browser console will show a "404" for each missing file. This is expected and goes away once the files exist.

### Music (optional)

Put a track you have the rights to at `public/music/romantic.mp3`. Sound is **off by default**. It only starts when she taps the 🔇 button in the top-right corner. The heartbeat, whoosh and chime effects are generated in the browser, so they work even without a music file.

---

## 3. Deploy for free

`vite.config.js` uses `base: "./"`, so the same build works on all three hosts below without changes.

### Option 1: GitHub → Vercel (recommended)

```bash
git init
git add .
git commit -m "PROJECT HER"
git branch -M main
git remote add origin https://github.com/<you>/project-her.git
git push -u origin main
```

1. Go to https://vercel.com and sign in with GitHub.
2. Click **Add New → Project** and import `project-her`.
3. Vercel detects Vite automatically (build: `npm run build`, output: `dist`). Click **Deploy**.
4. You get a URL like `https://project-her.vercel.app`.

### Option 2: GitHub Pages

The repo already includes `.github/workflows/deploy.yml`.

1. Push the project to GitHub as shown above. This folder must be the repository root.
2. On GitHub, open **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
3. Every push to `main` now builds and deploys the site to `https://<you>.github.io/project-her/`.

To deploy by hand instead:

```bash
npm run build
npx gh-pages -d dist
```

Then set **Settings → Pages → Source** to the `gh-pages` branch.

### Option 3: Netlify

- **Drag and drop:** run `npm run build`, then drag the `dist/` folder onto https://app.netlify.com/drop.
- **From GitHub:** click **Add new site → Import from Git**. `netlify.toml` already sets the build command (`npm run build`) and the publish folder (`dist`).

### Before you send the link

- [ ] Walk through all three endings on your own phone: Yes, Maybe and No.
- [ ] Check that the coffee button opens WhatsApp with your number and the right message.
- [ ] Make sure there are no typos in `config.js`. She will read every word.
- [ ] If you want a nicer WhatsApp link preview, add a 1200×630 image at `public/og.jpg` and add `<meta property="og:image" content="https://YOUR-URL/og.jpg" />` to `index.html`. The URL must be absolute.

---

## 4. Project structure

```
proposal/
├── public/
│   ├── images/            ← your photos
│   ├── music/             ← optional romantic.mp3
│   └── favicon.svg
├── src/
│   ├── data/config.js     ← ✏️ edit this
│   ├── App.jsx            ← scene state machine + global layers
│   ├── main.jsx
│   ├── sections/          ← one file per chapter / ending
│   │   ├── CinematicIntro.jsx     (00 The Secret)
│   │   ├── Journey.jsx            (01 The Journey)
│   │   ├── MemoryTimeline.jsx     (02 Little Moments)
│   │   ├── PhotoGallery.jsx       (03 Memory Gallery)
│   │   ├── ReasonsSection.jsx     (04 Why You?)
│   │   ├── MiniGame.jsx           (05 A Tiny Test)
│   │   ├── ProposalQuestion.jsx   (06 The Question)
│   │   ├── YesCelebration.jsx / MaybeEnding.jsx / NoEnding.jsx
│   │   └── EndingActions.jsx
│   ├── components/        ← StarField, ChapterTransition, CelebrationCanvas, RainCanvas,
│   │                        TiltCard, Typewriter, RevealText, GlowHeart, SoundToggle,
│   │                        ProgressIndicator, CityScape, Moon, LoadingScreen, …
│   ├── context/SoundContext.jsx   ← muted-by-default music + synthesized effects
│   ├── hooks/useSequence.js       ← the timing engine behind every dramatic pause
│   ├── lib/                       ← star/pointer state shared without React re-renders
│   └── styles/global.css
├── .github/workflows/deploy.yml
├── netlify.toml
├── vite.config.js
└── package.json
```

### How it works

- **Timing:** each scene describes its pauses as an array of milliseconds (`useSequence`). To change how long a line stays on screen, edit the `TIMELINE` at the top of that section file. Tapping the screen skips ahead on timed steps.
- **Performance:** the stars, rain and celebration are each drawn on a single `<canvas>` with `requestAnimationFrame`. Parallax is driven by CSS variables. None of these cause React re-renders.
- **Navigation:** every scene is a browser-history entry, so the phone's back gesture steps back one chapter instead of closing the site, and a refresh resumes where she left off. On timed scenes, a tap anywhere (or Space / Enter / →) skips ahead.
- **Accessibility:** everything works with the keyboard and has visible focus rings and screen-reader text. With `prefers-reduced-motion` turned on, warp, parallax, grain and the particle bursts are switched off.
- **Respect, by design:** all three answers are always visible, readable and full-size buttons. Nothing moves away from her finger, there are no timers, nothing is pre-selected and nobody asks "are you sure?".

---

Made with ❤️ by Purnendu.
