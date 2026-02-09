export function HeroStraightGrid() {
  return (
    <div
      className="absolute inset-0 z-[5] overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="straightRainbowH" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="20%" stopColor="#f97316" />
            <stop offset="40%" stopColor="#eab308" />
            <stop offset="60%" stopColor="#22c55e" />
            <stop offset="80%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="straightRainbowV" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        {/* Straight vertical lines */}
        {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((x) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1={0}
            x2={x}
            y2={100}
            stroke="url(#straightRainbowV)"
            strokeWidth="0.06"
            opacity="0.6"
          />
        ))}
        {/* Straight horizontal lines */}
        {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((y) => (
          <line
            key={`h-${y}`}
            x1={0}
            y1={y}
            x2={100}
            y2={y}
            stroke="url(#straightRainbowH)"
            strokeWidth="0.06"
            opacity="0.6"
          />
        ))}
      </svg>
    </div>
  );
}
