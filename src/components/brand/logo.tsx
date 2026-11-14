/**
 * Approved SGG Ventures LLC lockup (`public/sgglogo.png`): the interlocking
 * hexagon mark with the aligned wordmark. The file is a 2172×724 transparent
 * export, so it is cropped to its visible bounds to keep the lockup tight.
 * Geometry and proportions are never altered — only scaled.
 */
const SOURCE = { width: 2172, height: 724 };
const CROP = { x: 168, y: 124, width: 1694, height: 452 };

export type LogoProps = {
  /**
   * dark  = straight onto a light surface (header).
   * light = on a white plate, so the navy lettering never sits on navy.
   */
  tone?: "dark" | "light";
  className?: string;
  /** Set when a parent link already names the brand. */
  decorative?: boolean;
  priority?: boolean;
};

export function Logo({
  tone = "dark",
  className = "",
  decorative = false,
  priority = false,
}: LogoProps) {
  const framed = tone === "light";

  return (
    <span
      className={`inline-flex max-w-full ${
        framed ? "rounded-lg bg-white px-3 py-2" : ""
      } ${className}`}
    >
      <span
        className="relative block h-8 overflow-hidden md:h-9"
        style={{ aspectRatio: `${CROP.width} / ${CROP.height}` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- crop offsets need a raw img, not next/image sizing */}
        <img
          src="/sgglogo.png"
          alt={decorative ? "" : "SGG Ventures LLC"}
          width={SOURCE.width}
          height={SOURCE.height}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className="pointer-events-none absolute max-w-none select-none"
          style={{
            width: `${(SOURCE.width / CROP.width) * 100}%`,
            height: "auto",
            left: `${(-CROP.x / CROP.width) * 100}%`,
            top: `${(-CROP.y / CROP.height) * 100}%`,
          }}
        />
      </span>
    </span>
  );
}
