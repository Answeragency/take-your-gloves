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
};

export default function Photo({
  src,
  alt,
  label,
  variant = "dark",
  className = "",
  priority = false,
  fit = "cover",
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
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
        className={fit === "contain" ? "object-contain" : "object-cover"}
      />
    </div>
  );
}
