"use client";

import { useRef } from "react";
import Photo from "./photo";

export default function PhotoCarousel({ photos, label }: { photos: string[]; label: string }) {
  const track = useRef<HTMLDivElement>(null);
  if (photos.length === 0) return null;

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative" role="region" aria-roledescription="carrousel" aria-label={`Photos : ${label}`}>
      <div
        ref={track}
        data-lenis-prevent
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((src, i) => (
          <div
            key={src}
            className="relative aspect-[4/3] w-[85%] shrink-0 snap-start overflow-hidden rounded-2xl border border-line sm:w-[62%]"
          >
            <Photo
              src={src}
              alt={`${label}, photo ${i + 1}`}
              label={label}
              className="h-full w-full"
              sizes="(max-width: 640px) 85vw, 480px"
            />
          </div>
        ))}
      </div>
      {photos.length > 1 && (
        <div className="mt-4 flex justify-end gap-3">
          {(["prev", "next"] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => scroll(d === "prev" ? -1 : 1)}
              aria-label={d === "prev" ? "Photo précédente" : "Photo suivante"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path
                  d={d === "prev" ? "M11 3L5 9l6 6" : "M7 3l6 6-6 6"}
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
