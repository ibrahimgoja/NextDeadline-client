export default function NdProgress({ now }) {
  const value = Math.min(100, Math.max(0, Number(now) || 0));
  return (
    <div className="progress nd-progress">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${value}%` }}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
