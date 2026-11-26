import Link from "next/link";
import { Bell, BookOpen, GraduationCap, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { isExternal } from "@/lib/utils";

export type ActionBarItem = {
  label: string;
  href: string;
  icon: "courses" | "notices" | "apply" | "whatsapp" | "call";
  badge?: boolean;
};

const icons: Record<ActionBarItem["icon"], LucideIcon> = {
  courses: BookOpen,
  notices: Bell,
  apply: GraduationCap,
  whatsapp: MessageCircle,
  call: Phone,
};

/** Thumb-reachable shortcuts on phones: the four things most visitors come for. */
export function MobileActionBar({ items }: { items: ActionBarItem[] }) {
  const base = "flex flex-col items-center justify-center gap-1 rounded-xl py-2 text-[0.68rem] font-medium transition-colors";
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-2 bottom-2 z-30 rounded-2xl bg-ink-950/95 p-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] text-white shadow-[0_20px_40px_-12px_rgba(15,15,15,0.5)] backdrop-blur-xl lg:hidden"
    >
      <ul className="grid grid-cols-4 gap-1">
        {items.map((item) => {
          const Icon = icons[item.icon];
          const highlight = item.icon === "apply";
          const className = `${base} ${highlight ? "bg-gold-400 text-ink-950 active:bg-gold-300" : "active:bg-white/10"}`;
          const content = (
            <>
              <span className="relative">
                <Icon className={`size-5 ${highlight ? "" : "text-white/80"}`} aria-hidden />
                {item.badge && <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-gold-400 ring-2 ring-ink-950" aria-label="New" />}
              </span>
              {item.label}
            </>
          );
          return (
            <li key={item.label}>
              {isExternal(item.href) ? (
                <a href={item.href} className={className} {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  {content}
                </a>
              ) : (
                <Link href={item.href} className={className}>
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
