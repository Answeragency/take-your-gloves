type Props = {
  label: string;
  className?: string;
  variant?: "dark" | "red" | "gold";
};

const variants = {
  dark: "from-[#32251c] via-[#1c1410] to-[#32251c]",
  red: "from-[#4a2414] via-[#1c1410] to-[#32251c]",
  gold: "from-[#3a2c17] via-[#1c1410] to-[#32251c]",
};

export default function PlaceholderImage({
  label,
  className = "",
  variant = "dark",
}: Props) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${variants[variant]} ${className}`}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(244,241,234,0.04) 0px, rgba(244,241,234,0.04) 2px, transparent 2px, transparent 14px)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-xs uppercase tracking-[0.3em] text-foreground/60">
          {label}
        </span>
      </div>
      <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
    </div>
  );
}
