export default function StepChecklist({ steps, completedSteps, onToggle }) {
  const doneCount = completedSteps.size;
  const percent = steps.length > 0 ? Math.round((doneCount / steps.length) * 100) : 0;

  return (
    <div className="step-checklist">
      <div className="steps-progress-row">
        <div className="progress-track" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
        <span className="steps-progress-label">{doneCount} / {steps.length}</span>
      </div>

      <ul>
        {steps.map((step, idx) => {
          const isDone = completedSteps.has(step.id);
          return (
            <li key={step.id} className={`step-item ${isDone ? "done" : ""}`}>
              <label>
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => onToggle(step.id)}
                />
                <span className="step-check" aria-hidden="true">
                  {isDone ? "✓" : idx + 1}
                </span>
                <span className="step-text">{step.text}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
