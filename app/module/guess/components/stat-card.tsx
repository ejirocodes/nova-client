import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  value: string | number;
  label: string;
  icon: LucideIcon;
}

export function StatCard({ value, label, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-[#22252A] border border-[#2e3238] w-full rounded-sm p-3.5 flex justify-between items-center">
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-[#e3e5e8] leading-tight">
          {value}
        </span>
        <span className="text-xs tracking-wider text-[#8f97a3] uppercase mt-1">
          {label}
        </span>
      </div>
      <div className="bg-[#8b98a9] w-10 h-10 rounded-full flex items-center justify-center">
        <Icon className="w-6 h-6 text-[#17181c]" />
      </div>
    </div>
  );
}
