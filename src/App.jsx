import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { SoundProvider } from "./context/SoundContext";
import StarField from "./components/StarField";
import Ambient from "./components/Ambient";
import LoadingScreen from "./components/LoadingScreen";
import ProgressIndicator from "./components/ProgressIndicator";
import SoundToggle from "./components/SoundToggle";
import CursorGlow from "./components/CursorGlow";
import TouchRipple from "./components/TouchRipple";
import CinematicIntro from "./sections/CinematicIntro";
import Journey from "./sections/Journey";
import MemoryTimeline from "./sections/MemoryTimeline";
import PhotoGallery from "./sections/PhotoGallery";
import ReasonsSection from "./sections/ReasonsSection";
import MiniGame from "./sections/MiniGame";
import ProposalQuestion from "./sections/ProposalQuestion";
import YesCelebration from "./sections/YesCelebration";
import MaybeEnding from "./sections/MaybeEnding";
import NoEnding from "./sections/NoEnding";
import { setStars } from "./lib/stars";
import { startPointerTracking } from "./lib/pointer";

// Story order. Endings live outside the linear flow.
const FLOW = ["intro", "journey", "moments", "gallery", "why", "game", "question"];

const STARS = {
  intro: { speed: 0.2, brightness: 0.6 },
  journey: { speed: 0.45, brightness: 1 },
  moments: { speed: 0.3, brightness: 1 },
  gallery: { speed: 0.25, brightness: 0.75 },
  why: { speed: 0.1, brightness: 0.45 },
  game: { speed: 0.4, brightness: 0.9 },
  question: { speed: 0.04, brightness: 0.12 },
  yes: { speed: 0.02, brightness: 0.02 },
  maybe: { speed: 0.03, brightness: 0.14 },
  no: { speed: 0.02, brightness: 0 },
};

const MOODS = {
  intro: "deep",
  journey: "city",
  moments: "nebula",
  gallery: "nebula",
  why: "deep",
  game: "nebula",
  question: "deep",
  yes: "deep",
  maybe: "rain",
  no: "sunrise",
};

function Scene({ scene, go, restart }) {
  switch (scene) {
    case "intro":
      return <CinematicIntro onOpen={() => go("journey")} />;
    case "journey":
      return <Journey onNext={() => go("moments")} />;
    case "moments":
      return <MemoryTimeline onNext={() => go("gallery")} />;
    case "gallery":
      return <PhotoGallery onNext={() => go("why")} />;
    case "why":
      return <ReasonsSection onNext={() => go("game")} />;
    case "game":
      return <MiniGame onNext={() => go("question")} />;
    case "question":
      return <ProposalQuestion onAnswer={(a) => go(a)} />;
    case "yes":
      return <YesCelebration onRestart={restart} />;
    case "maybe":
      return <MaybeEnding onRestart={restart} onRevisit={() => go("question")} />;
    case "no":
      return <NoEnding onRestart={restart} />;
    default:
      return null;
  }
}

// Each scene is a browser-history entry, so the phone's back gesture steps back
// through the story instead of leaving it, and a reload resumes the same scene.
const savedScene = () => {
  try {
    const s = window.history.state?.scene;
    return s in STARS ? s : "intro";
  } catch {
    return "intro";
  }
};

const remember = (scene, replace = false) => {
  try {
    window.history[replace ? "replaceState" : "pushState"]({ scene }, "");
  } catch {
    /* history unavailable (sandboxed iframe) — the story still works */
  }
};

export default function App() {
  const [ready, setReady] = useState(false);
  const [scene, setScene] = useState(savedScene);
  const [run, setRun] = useState(0);

  useEffect(() => startPointerTracking(), []);

  useEffect(() => {
    remember(savedScene(), true);
    const onPop = (e) => setScene(e.state?.scene in STARS ? e.state.scene : "intro");
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (ready) setStars(STARS[scene]);
    document.documentElement.dataset.scene = scene;
  }, [scene, run, ready]);

  const go = useCallback((next) => {
    setScene(next);
    remember(next);
  }, []);
  const restart = useCallback(() => {
    setRun((r) => r + 1);
    setScene("intro");
    remember("intro");
  }, []);
  const onLoaded = useCallback(() => setReady(true), []);

  const chapter = FLOW.indexOf(scene);
  const back = useCallback(() => {
    if (chapter > 0) go(FLOW[chapter - 1]);
  }, [chapter, go]);

  return (
    <SoundProvider>
      <MotionConfig reducedMotion="user">
        <Ambient mood={ready ? MOODS[scene] : "deep"} />
        <StarField />
        <main className="stage">
          <AnimatePresence mode="wait">{ready && <Scene key={`${run}-${scene}`} scene={scene} go={go} restart={restart} />}</AnimatePresence>
        </main>
        <div className="vignette" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <ProgressIndicator visible={ready && chapter >= 1 && chapter <= 5} chapter={chapter} onBack={back} />
        <SoundToggle />
        <CursorGlow />
        <TouchRipple />
        <AnimatePresence>{!ready && <LoadingScreen key="loading" onDone={onLoaded} />}</AnimatePresence>
      </MotionConfig>
    </SoundProvider>
  );
}
