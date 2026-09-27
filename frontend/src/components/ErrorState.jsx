export default function ErrorState({ message, onRetry }) {
  return (
    <div className="state-card error-card" role="alert">
      <span className="error-mark" aria-hidden="true">!</span>
      <p>{message}</p>
      <button type="button" className="btn btn-secondary" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}
