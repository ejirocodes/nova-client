import { useState } from "react";
import BitcoinChart from "~/components/ui/charts/bitcoin-chart";
import { useGetPrice } from "~/module/price/queries/get-price";
import { BitcoinPricePeriod } from "~/lib/client";

export function Dashboard() {
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
      <div className="w-full max-w-6xl">
        <h1 className="text-2xl font-bold text-white mb-6">Bitcoin/USD</h1>
        <BitcoinChart
          priceData={priceData}
          isLoading={isLoading}
          error={error?.message || null}
          period={period}
          onPeriodChange={handlePeriodChange}
        />
      </div>
    </main>
  );
}
