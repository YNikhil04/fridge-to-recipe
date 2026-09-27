export default function SwapPicker({ options, activeName, onSelect }) {
  if (!options || options.length === 0) return null;

  return (
    <div className="swap-picker">
      <span className="swap-label">Swap:</span>
      <div className="swap-options">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className={`swap-chip ${activeName === opt ? "active" : ""}`}
            onClick={() => onSelect(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
