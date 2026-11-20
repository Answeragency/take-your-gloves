import Image from "next/image";
import PlaceholderImage from "./placeholder-image";

type Props = {
  src?: string;
  alt: string;
  label: string;
  variant?: "dark" | "red" | "gold";
  className?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  sizes?: string;
  /** Point focal du recadrage (CSS object-position), ex : "center 85%". */
  position?: string;
};

export default function Photo({
  src,
  alt,
  label,
  variant = "dark",
  className = "",
  priority = false,
  fit = "cover",
  sizes = "(max-width: 768px) 100vw, 50vw",
  position,
}: Props) {
  if (!src) {
    return <PlaceholderImage label={label} variant={variant} className={className} />;
  }

  return (
    <div className={`relative overflow-hidden ${fit === "contain" ? "bg-surface-2" : ""} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={position ? { objectPosition: position } : undefined}
        className={fit === "contain" ? "object-contain" : "object-cover"}
      />
    </div>
  );
}
