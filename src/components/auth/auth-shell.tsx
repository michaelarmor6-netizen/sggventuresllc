import Link from "next/link";

/**
 * Plain auth screen: white canvas, large headline, one-line subtitle,
 * content hanging from the top, generous air. No card, no shadow.
 */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <section className="bg-white">
      <div className="container-x flex justify-center pb-24 pt-14 md:pt-20">
        <div className="w-full max-w-[26rem]">
          <h1 className="font-display text-display text-midnight">{title}</h1>
          {subtitle && (
            <p className="mt-3 text-[17px] leading-[1.47] text-slateink">{subtitle}</p>
          )}
          <div className="mt-9">{children}</div>
          {footer && (
            <div className="mt-8 border-t border-linehair pt-6 text-[15px] text-slateink">
              {footer}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function AuthLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-royal underline-offset-4 hover:underline">
      {children}
    </Link>
  );
}

/** Status message box. Colour only for status, per the design rules. */
export function AuthNotice({
  tone,
  children,
  id,
}: {
  tone: "error" | "success" | "info";
  children: React.ReactNode;
  id?: string;
}) {
  const styles = {
    error: "border-red-200 bg-red-50 text-red-900",
    success: "border-green-200 bg-green-50 text-green-900",
    info: "border-linehair bg-coolgray text-ink",
  }[tone];
  return (
    <div
      id={id}
      role={tone === "error" ? "alert" : "status"}
      tabIndex={-1}
      className={`rounded-xl border p-4 text-[15px] leading-[1.47] outline-none ${styles}`}
    >
      {children}
    </div>
  );
}
