import { DollarSign, HandCoins, Flame, Dice6 } from "lucide-react";
import { StatCard } from "./stat-card";

interface StatCardsRowProps {
  score: number;
  lost: number;
  made: number;
  activeGuess: number;
}

export function StatCardsRow({
  score,
  lost,
  made,
  activeGuess,
}: StatCardsRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <StatCard value={score} label="Score" icon={DollarSign} />
      <StatCard value={lost} label="Lost" icon={HandCoins} />
      <StatCard value={made} label="Made" icon={Dice6} />
      <StatCard value={activeGuess} label="Active Guess" icon={Flame} />
    </div>
  );
}
