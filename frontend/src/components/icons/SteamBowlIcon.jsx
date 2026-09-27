// One custom mark, reused three places (brand mark, empty state, loading
// state) instead of three different icons - this is the app's one
// deliberate visual signature rather than scattered decoration.
export default function SteamBowlIcon({ className, animated = false }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 20c0 7.2 7.2 13 16 13s16-5.8 16-13" />
      <path d="M6 20h36" />
      <path d="M14 20c-2.5-3-1.5-5.5-.5-7.5s1-4.5-1-6.5" className={animated ? "steam steam-1" : undefined} />
      <path d="M24 20c-2.5-3-1.5-5.5-.5-7.5s1-4.5-1-6.5" className={animated ? "steam steam-2" : undefined} />
      <path d="M34 20c-2.5-3-1.5-5.5-.5-7.5s1-4.5-1-6.5" className={animated ? "steam steam-3" : undefined} />
    </svg>
  );
}
