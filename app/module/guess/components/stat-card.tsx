import type { LucideIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface StatCardProps {
  value: number;
  label: string;
  icon: LucideIcon;
}

export function StatCard({ value, label, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-nova border border-nova w-full rounded-sm p-3.5 flex justify-between items-center shadow-widget">
      <div className="flex flex-col">
        <span
          className={cn(
            "text-lg font-semibold leading-tight",
            value < 0 ? "text-danger" : "text-nova-primary"
          )}
          style={{ color: value < 0 ? "#ff4d4d" : "" }}
        >
          {value}
        </span>
        <span className="text-xs tracking-wider text-nova-secondary uppercase mt-1">
          {label}
        </span>
      </div>
      <div className="bg-nova-icon w-10 h-10 rounded-full flex items-center justify-center">
        <Icon className="w-6 h-6 text-nova-icon" />
      </div>
    </div>
  );
}
