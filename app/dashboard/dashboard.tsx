import { useState } from "react";
import BitcoinChart from "~/components/charts/bitcoin-chart";
import { useGetPrice } from "~/module/price/queries/get-price";
import { BitcoinPricePeriod } from "~/lib/client";
import ProfileCard from "~/module/price/components/profile-card";
import { useUser } from "@clerk/react-router";
import { Button } from "~/components/ui/button";
import GuessDirectionControl from "~/module/guess/components/guess-direction-control";
import { StatCardsRow } from "~/module/guess/components/stat-cards-row";
import { useGuessPrice } from "~/module/guess/mutations/guess-price";

export function Dashboard() {
  const { isSignedIn, user, isLoaded } = useUser();

  const [period, setPeriod] = useState<BitcoinPricePeriod>("24h");
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [result, setResult] = useState<string | null>(null);

  const { data: price, isLoading, error } = useGetPrice(period);

  const { mutate: createGuess, isPending } = useGuessPrice();

  const handleGuess = () => {
    createGuess({ direction });
  };

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
      <StatCardsRow score={347} lost={34} made={8} pending={70} />
      <div>
        <div className="flex flex-col items-center space-y-6 p-6">
          <div className="space-y-2">
            <p className="text-sm text-white">
              Will the price of Bitcoin go up or down?
            </p>
            <GuessDirectionControl
              onSelectionChange={setDirection}
              defaultValue="up"
            />
          </div>

          <Button onClick={handleGuess} className="cursor-pointer">
            Submit Guess
          </Button>

          {result && (
            <div className="mt-4 rounded-lg bg-muted p-4 text-black text-center">
              <p>{result}</p>
              <p className="text-sm ">
                You guessed: <span className="font-medium">{direction}</span>
              </p>
            </div>
          )}
        </div>
      </div>
      <section className="flex justify-center items-start gap-6 w-full">
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
