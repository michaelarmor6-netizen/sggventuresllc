import { cn } from "@/lib/classnames";

/** Editorial section heading with eyebrow + display title + lead text. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "dark",
  align = "left",
  as: Tag = "h2",
  className,
  id,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className={cn("eyebrow", tone === "light" && "text-azure-light")}>
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={cn(
          "mt-3 font-display",
          Tag === "h2" ? "text-display lg:text-display-lg" : "text-display-lg",
          tone === "light" ? "text-white" : "text-midnight",
        )}
      >
        {title}
      </Tag>
      {lead && (
        <p
          className={cn(
            "mt-4 text-[16.5px] leading-relaxed",
            tone === "light" ? "text-white/70" : "text-slateink",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
