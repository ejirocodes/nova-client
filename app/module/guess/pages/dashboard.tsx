import { useState } from "react";
import BitcoinChart from "~/components/charts/bitcoin-chart";
import { useGetPrice } from "~/module/price/queries/get-price";
import { BitcoinPricePeriod } from "~/lib/client";
import ProfileCard from "~/module/price/components/profile-card";
import { useUser } from "@clerk/react-router";
import { GuessStatus, StatCardsRow } from "~/module/guess/components";
import { useUserGuessStats } from "~/module/guess/queries/guess-stats";

export function Dashboard() {
  const { user } = useUser();
  const [period, setPeriod] = useState<BitcoinPricePeriod>("24h");
  const { data: price, isLoading, error } = useGetPrice(period);
  const { data: guessStats, refetch: refetchGuessStats } = useUserGuessStats();

  const handlePeriodChange = (newPeriod: BitcoinPricePeriod) => {
    setPeriod(newPeriod);
  };

  const priceData = price
    ? {
        currentPrice: price.price.currentPrice,
        priceChange: price.price.priceChange24h,
        percentChange: price.price.percentChange24h,
        historicalData: price.history.data,
      }
    : undefined;

  return (
    <main className="flex min-h-screen h-full flex-col items-center justify-center text-white p-4 bg-[#121212] w-full max-w-[1400px] mx-auto">
      <StatCardsRow
        score={guessStats?.score || 0}
        lost={guessStats?.guessesLost || 0}
        made={guessStats?.guessesMade || 0}
        activeGuess={guessStats?.activeGuess || 0}
      />
      <div>
        <GuessStatus onGuessComplete={refetchGuessStats} />
      </div>
      <section className="flex justify-center items-start gap-6 w-full">
        <div className="flex-shrink-0">
          <ProfileCard
            profileImage={user?.imageUrl!}
            name={user?.emailAddresses[0].emailAddress!}
            score={guessStats?.score || 0}
            guessesMade={guessStats?.guessesMade || 0}
            guessesLost={guessStats?.guessesLost || 0}
            activeGuess={guessStats?.activeGuess || 0}
          />
        </div>
        <div className="w-full bg-nova-fg py-4 shadow-widget rounded-sm border border-nova">
          <h1 className="text-xl font-bold text-white px-6">Bitcoin/USD</h1>
          <BitcoinChart
            priceData={priceData}
            isLoading={isLoading}
            error={error?.message || null}
            period={period}
            onPeriodChange={handlePeriodChange}
          />
        </div>
      </section>
    </main>
  );
}
