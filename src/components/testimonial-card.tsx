import Reveal from "./reveal";

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-3 w-3 fill-gold text-gold" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/20 ring-1 ring-accent/30">
      <span className="font-display text-xs text-accent-bright">{initials}</span>
    </div>
  );
}

export default function TestimonialCard({
  name,
  role,
  quote,
  index = 0,
}: {
  name: string;
  role: string;
  quote: string;
  index?: number;
}) {
  return (
    <Reveal delay={index * 0.08} className="h-full">
      <div className="relative flex h-full flex-col rounded-2xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-gold/25">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent rounded-t-2xl" />
        <Stars />
        <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
          &ldquo;{quote}&rdquo;
        </p>
        <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
          <Avatar name={name} />
          <div>
            <p className="font-display text-sm uppercase tracking-[0.08em] text-foreground">
              {name}
            </p>
            <p className="text-xs text-muted">{role}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
