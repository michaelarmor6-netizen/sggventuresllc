import { cn } from "@/lib/classnames";

/** Section headline with optional lead. Weight and size do the work. */
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
        <p className={cn("eyebrow mb-3", tone === "light" && "text-white/75")}>
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={cn(
          "font-display",
          Tag === "h2" ? "text-display" : "text-display-lg",
          tone === "light" ? "text-white" : "text-midnight",
        )}
      >
        {title}
      </Tag>
      {lead && (
        <p
          className={cn(
            "mt-4 text-[19px] leading-[1.42]",
            align === "center" && "mx-auto max-w-2xl",
            tone === "light" ? "text-white/80" : "text-slateink",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
