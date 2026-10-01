/** Moon with soft light rays — sits on the far parallax layer. */
export default function Moon({ className = "" }) {
  return (
    <div className={`moon-wrap ${className}`} aria-hidden="true">
      <div className="moon__rays" />
      <div className="moon">
        <span className="moon__crater moon__crater--1" />
        <span className="moon__crater moon__crater--2" />
        <span className="moon__crater moon__crater--3" />
      </div>
    </div>
  );
}
