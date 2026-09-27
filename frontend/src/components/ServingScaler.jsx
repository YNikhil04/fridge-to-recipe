export default function ServingScaler({ servings, onChange }) {
  return (
    <div className="serving-scaler">
      <span className="serving-label">Servings</span>
      <div className="scaler-controls">
        <button
          type="button"
          className="scaler-btn"
          onClick={() => onChange(Math.max(1, servings - 1))}
          aria-label="Decrease servings"
        >
          −
        </button>
        <span className="scaler-value">{servings}</span>
        <button
          type="button"
          className="scaler-btn"
          onClick={() => onChange(servings + 1)}
          aria-label="Increase servings"
        >
          +
        </button>
      </div>
    </div>
  );
}
