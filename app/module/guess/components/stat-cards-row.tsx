import { BarChart3, FileText, DollarSign, TrendingUp } from "lucide-react";
import { StatCard } from "./stat-card";

interface StatCardsRowProps {
  score: number;
  lost: number;
  made: number;
  pending: number;
}

export function StatCardsRow({
  score,
  lost,
  made,
  pending,
}: StatCardsRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <StatCard value={score} label="Score" icon={BarChart3} />
      <StatCard value={lost} label="Lost" icon={FileText} />
      <StatCard value={made} label="Made" icon={DollarSign} />
      <StatCard value={pending} label="Pending" icon={TrendingUp} />
    </div>
  );
}
