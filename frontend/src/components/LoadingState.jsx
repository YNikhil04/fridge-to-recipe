import SteamBowlIcon from "./icons/SteamBowlIcon";

export default function LoadingState() {
  return (
    <div className="state-card loading-card" role="status" aria-live="polite">
      <SteamBowlIcon className="state-icon" animated />
      <p>Simmering your recipe…</p>
    </div>
  );
}
