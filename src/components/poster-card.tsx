import Link from "next/link";
import Reveal from "./reveal";
import Photo from "./photo";
import { CalendarEvent, statusStyles, categoryVariant } from "@/lib/calendar";

/** Carte « affiche d'abord » pour la grille du calendrier. Pas de zoom : un léger soulèvement net. */
export default function PosterCard({ event, index = 0 }: { event: CalendarEvent; index?: number }) {
  return (
    <Reveal delay={(index % 3) * 0.07} className="h-full">
      <Link
        href={`/evenements/${event.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-xl hover:shadow-black/40"
      >
        <div className="relative aspect-[707/1000] overflow-hidden bg-surface-2">
          <Photo
            src={event.image}
            alt={event.title}
            label={event.title}
            variant={categoryVariant[event.category] ?? "dark"}
            fit="cover"
            className="h-full w-full"
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px"
          />
          <span className="absolute right-3 top-3 rounded-full border border-line bg-background/80 px-3 py-1 font-display text-xs uppercase tracking-[0.12em] text-foreground backdrop-blur">
            {event.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg leading-snug tracking-tight text-foreground">{event.title}</h3>
          <p className="mt-1.5 text-xs uppercase tracking-[0.1em] text-muted">
            {event.dateLabel} · {event.location}
          </p>
          {event.status && (
            <span
              className={`mt-3 w-fit rounded-full border px-2 py-0.5 text-[0.625rem] uppercase tracking-[0.06em] ${statusStyles[event.statusType]}`}
            >
              {event.status.replace(/\.$/, "")}
            </span>
          )}
          <span className="mt-auto inline-flex items-center gap-2 pt-5 font-display text-xs uppercase tracking-[0.15em] text-white transition-colors group-hover:text-accent">
            Voir le programme
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
