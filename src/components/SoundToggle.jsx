import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "../context/SoundContext";

export default function SoundToggle() {
  const { enabled, toggle } = useSound();
  return (
    <button
      type="button"
      className={`icon-btn sound-toggle ${enabled ? "is-on" : ""}`}
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Sound বন্ধ করো" : "Sound চালু করো"}
    >
      {enabled ? <Volume2 size={18} aria-hidden="true" /> : <VolumeX size={18} aria-hidden="true" />}
      {enabled && (
        <span className="sound-bars" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      )}
    </button>
  );
}
