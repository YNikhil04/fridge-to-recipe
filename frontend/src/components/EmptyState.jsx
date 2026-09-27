import SteamBowlIcon from "./icons/SteamBowlIcon";

export default function EmptyState() {
  return (
    <div className="state-card empty-card">
      <SteamBowlIcon className="state-icon" />
      <p>Add what's in your fridge on the left, and your recipe will show up here.</p>
    </div>
  );
}
