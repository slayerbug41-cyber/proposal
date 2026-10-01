const MOODS = ["deep", "nebula", "city", "rain", "sunrise", "celebrate"];

/** Cross-fading background atmospheres. */
export default function Ambient({ mood }) {
  return (
    <div className="ambient" aria-hidden="true">
      {MOODS.map((m) => (
        <div key={m} className={`ambient__layer ambient--${m} ${mood === m ? "is-on" : ""}`} />
      ))}
    </div>
  );
}
