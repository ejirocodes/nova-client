import { useState, useEffect } from "react";
import BitcoinChart from "~/components/charts/bitcoin-chart";
import { useGetPrice } from "~/module/price/queries/get-price";
import { BitcoinPricePeriod } from "~/lib/client";
import ProfileCard from "~/module/price/components/profile-card";
import { useUser } from "@clerk/react-router";
import { Button } from "~/components/ui/button";
import GuessDirectionControl from "~/module/guess/components/guess-direction-control";
import { StatCardsRow } from "~/module/guess/components/stat-cards-row";
import { useGuessPrice } from "~/module/guess/mutations/guess-price";
import { useUserActiveGuess } from "~/module/guess/queries/guess-stats";
import { useGuessStatus } from "~/module/guess/queries/guess-status";

export function Dashboard() {
  const { user } = useUser();

  const [period, setPeriod] = useState<BitcoinPricePeriod>("24h");
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [result, setResult] = useState<string | null>(null);
  const [guessId, setGuessId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: price, isLoading, error } = useGetPrice(period);

  const { mutate: createGuess, isPending } = useGuessPrice();

  const { data: guessStats, refetch: refetchGuessStats } = useUserActiveGuess();

  const { data: guessStatus, refetch: refetchGuessStatus } = useGuessStatus(
    guessId || ""
  );

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (guessId && !guessStatus?.resolved) {
      intervalId = setInterval(() => {
        refetchGuessStatus();
      }, 3000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [guessId, guessStatus?.resolved, refetchGuessStatus]);

  useEffect(() => {
    if (guessStatus?.resolved && guessId) {
      setResult(guessStatus.result);
      setIsSubmitting(false);
      refetchGuessStats();
    }
  }, [guessStatus, guessId, refetchGuessStats]);

  const handleGuess = () => {
    setIsSubmitting(true);

    createGuess(
      { direction },
      {
        onSuccess: (data) => {
          setGuessId(data.id);
          refetchGuessStats();

          setTimeout(() => {
            if (!guessStatus?.resolved) {
              setIsSubmitting(false);
            }
          }, 60000);
        },
        onError: () => {
          setIsSubmitting(false);
        },
      }
    );
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
      <StatCardsRow
        score={guessStats?.score || 0}
        lost={guessStats?.guessesLost || 0}
        made={guessStats?.guessesMade || 0}
        pending={guessStats?.guessesPending || 0}
        activeGuess={guessStats?.activeGuess || 0}
      />
      <div>
        <div className="flex flex-col items-center space-y-6 p-6">
          <div className="space-y-2">
            <p className="text-sm text-white">
              Will the price of Bitcoin go up or down?
            </p>
            <GuessDirectionControl
              disabled={
                isSubmitting || isPending || guessStats?.activeGuess > 0
              }
              onSelectionChange={setDirection}
              defaultValue="up"
            />
          </div>

          <Button
            onClick={handleGuess}
            disabled={isSubmitting || isPending || guessStats?.activeGuess > 0}
            className="cursor-pointer"
          >
            {isSubmitting && !guessStatus?.resolved
              ? "Waiting for result..."
              : "Submit Guess"}
          </Button>

          {guessId && !guessStatus?.resolved && (
            <div className="mt-4 rounded-lg bg-muted p-4 text-black text-center">
              <p>Your guess is pending resolution...</p>
              <p className="text-sm">
                You guessed: <span className="font-medium">{direction}</span>
              </p>
            </div>
          )}

          {guessStatus?.resolved && result && (
            <div
              className={`mt-4 rounded-lg p-4 text-white text-center ${
                result === "correct" ? "bg-green-800" : "bg-red-800"
              }`}
            >
              <p>Your guess was {result}!</p>
              <p className="text-sm">
                You guessed:{" "}
                <span className="font-medium">{guessStatus.direction}</span>
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
            score={guessStats?.score || 0}
            guessesMade={guessStats?.guessesMade || 0}
            guessesLost={guessStats?.guessesLost || 0}
            guessesPending={guessStats?.guessesPending || 0}
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
