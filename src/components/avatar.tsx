import Image from "next/image";
import { profile } from "@/lib/site";

// The profile photo has a transparent background, so it sits on a warm circle.
export function Avatar({
  size,
  priority,
  className = "",
}: {
  size: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`block shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-amber-200 via-amber-300 to-orange-400 ${className}`}
    >
      <Image
        src={profile.avatar}
        alt={profile.name}
        width={size}
        height={size}
        priority={priority}
        className="size-full object-cover"
      />
    </span>
  );
}
