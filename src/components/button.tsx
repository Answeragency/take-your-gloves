import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
};

const base =
  "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-4 font-display text-sm uppercase tracking-[0.05em] transition-all duration-300";

const variants = {
  primary:
    "bg-accent-fill text-foreground hover:bg-accent-fill-hover hover:scale-[1.03] hover:shadow-[0_0_32px_rgba(49,82,140,0.55)] active:scale-[0.97]",
  outline:
    "border border-foreground/25 text-foreground hover:border-accent/70 hover:text-accent hover:bg-accent/5 hover:shadow-[0_0_18px_rgba(49,82,140,0.22)] active:scale-[0.97]",
  ghost: "text-foreground/80 hover:text-foreground",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: Props) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {/* shimmer sweep, visible on primary */}
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-500 group-hover:translate-x-full"
        />
      )}
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
