import { cn } from "@/lib/utils";

type DividerProps = {
  className?: string;
  gold?: boolean;
};

export function Divider({ className, gold = false }: DividerProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className={cn("flex-1 h-px", gold ? "bg-gold/40" : "bg-ink/15")} />
      <span className={cn("text-xs tracking-[0.3em]", gold ? "text-gold" : "text-ink-subtle")}>
        ✦
      </span>
      <div className={cn("flex-1 h-px", gold ? "bg-gold/40" : "bg-ink/15")} />
    </div>
  );
}
