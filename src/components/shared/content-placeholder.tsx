import { Lock } from "lucide-react";

/**
 * Editable placeholder presentation — used where corporate information is
 * not yet verified. Deliberately dignified: placeholders explain what will
 * appear and why it is withheld, never lorem ipsum.
 */
const Root = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`mx-auto max-w-2xl rounded-2xl border border-azure/30 bg-mist p-8 text-center ${className ?? ""}`}>
    {children}
  </div>
);

const Icon = ({ children }: { children: React.ReactNode }) => (
  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-royal text-white">
    {children}
  </span>
);

const Title = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-4 font-display text-[20px] font-bold tracking-tight text-midnight">
    {children}
  </h2>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-2.5 text-[14px] leading-relaxed text-slateink">{children}</p>
);

const Note = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-4 flex items-start justify-center gap-2 border-t border-azure/20 pt-4 text-left text-[12.5px] leading-relaxed text-slateink/85">
    <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-royal/70" aria-hidden />
    {children}
  </p>
);

export const ContentPlaceholder = { Root, Icon, Title, Body, Note };
