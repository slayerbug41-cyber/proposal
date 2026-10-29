import { useState } from "react";
import { motion } from "framer-motion";
import ChapterTransition from "../components/ChapterTransition";
import RevealText from "../components/RevealText";
import NextButton from "../components/NextButton";
import TiltCard from "../components/TiltCard";
import PhotoPlaceholder from "../components/PhotoPlaceholder";
import { proposalConfig } from "../data/config";
import { asset, EASE, pad2 } from "../lib/utils";

const ROTATIONS = [-5, 4, -2.5, 3.5, -4];

function Photo({ src, alt, index }) {
  const [state, setState] = useState(src ? "loading" : "error");
  return (
    <div className="photo">
      {state !== "ok" && <PhotoPlaceholder index={index} />}
      {state !== "error" && (
        <img
          src={asset(src)}
          alt={alt}
          loading="lazy"
          decoding="async"
          draggable="false"
          className={state === "ok" ? "is-loaded" : ""}
          onLoad={() => setState("ok")}
          onError={() => setState("error")}
        />
      )}
    </div>
  );
}

function Polaroid({ photo, index, focused, onToggle }) {
  const rot = ROTATIONS[index % ROTATIONS.length];
  return (
    <motion.figure
      className={`polaroid-slot ${focused ? "is-focused" : ""}`}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.1, ease: EASE, delay: (index % 3) * 0.12 }}
    >
      <motion.div
        className="polaroid-pose"
        animate={{ rotate: focused ? 0 : rot, scale: focused ? 1.06 : 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
      >
        <div className="polaroid-float" style={{ animationDelay: `${index * -2.1}s` }}>
          <TiltCard className="polaroid" role="button" tabIndex={0} aria-pressed={focused} aria-label={photo.caption || `Photo ${index + 1}`} onClick={onToggle} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onToggle())}>
            <Photo src={photo.src} alt={photo.caption || `Our moment ${index + 1}`} index={index} />
            <p className="polaroid__caption">{photo.caption}</p>
            <span className="polaroid__frame" aria-hidden="true">
              FRAME {pad2(index + 1)}
            </span>
          </TiltCard>
        </div>
      </motion.div>
    </motion.figure>
  );
}

function GalleryContent({ onNext }) {
  const photos = proposalConfig.photos.map((p, i) =>
    typeof p === "string" ? { src: p, caption: proposalConfig.photoCaptions?.[i] || "" } : p
  );
  const [focused, setFocused] = useState(null);
  return (
    <div className="scene__content gallery-scene">
      <header className="section-head">
        <p className="eyebrow">MEMORY GALLERY</p>
        <RevealText as="h2" className="section-title" text="A few frames, a few moments" />
        <motion.p className="section-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          Tap a photo — it comes to life 📸
        </motion.p>
      </header>
      <div className="gallery">
        {photos.map((p, i) => (
          <Polaroid key={i} photo={p} index={i} focused={focused === i} onToggle={() => setFocused((f) => (f === i ? null : i))} />
        ))}
      </div>
      <NextButton onClick={onNext} />
    </div>
  );
}

export default function PhotoGallery({ onNext }) {
  return (
    <ChapterTransition chapter="03" title="MEMORY GALLERY" subtitle="A few frames, a few moments">
      <GalleryContent onNext={onNext} />
    </ChapterTransition>
  );
}
