import {
  AppWindow,
  ArrowRight,
  ClipboardList,
  FileCheck2,
  LifeBuoy,
  MessagesSquare,
  Milestone,
  MonitorSmartphone,
  PackageCheck,
  Rocket,
  ShoppingBag,
  Store,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/** Central name → icon registry used by content-driven components. */
const ICONS: Record<string, LucideIcon> = {
  AppWindow,
  ArrowRight,
  ClipboardList,
  FileCheck2,
  LifeBuoy,
  MessagesSquare,
  Milestone,
  MonitorSmartphone,
  PackageCheck,
  Rocket,
  ShoppingBag,
  Store,
  Workflow,
};

export function ContentIcon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  const IconComponent = ICONS[name] ?? ArrowRight;
  return <IconComponent className={className} aria-hidden="true" />;
}
