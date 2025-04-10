import { useState } from "react";
import BitcoinChart from "~/components/charts/bitcoin-chart";
import { useGetPrice } from "~/module/price/queries/get-price";
import { BitcoinPricePeriod } from "~/lib/client";
import ProfileCard from "~/module/price/components/profile-card";
import { useUser } from "@clerk/react-router";

export function Dashboard() {
  const { isSignedIn, user, isLoaded } = useUser();

  const [period, setPeriod] = useState<BitcoinPricePeriod>("24h");
  const { data: price, isLoading, error } = useGetPrice(period);

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
    <main className="flex min-h-screen h-full flex-col items-center justify-center text-white p-4 bg-[#121212]">
      <section className="flex justify-center items-start gap-8 w-full">
        <div className="flex-shrink-0">
          <ProfileCard
            profileImage={user?.imageUrl!}
            name={user?.emailAddresses[0].emailAddress!}
            score={2}
            guessesMade={10}
            guessesLost={8}
            guessesPending={1}
          />
        </div>
        <div className="w-full max-w-6xl">
          <h1 className="text-2xl font-bold text-white">Bitcoin/USD</h1>
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
