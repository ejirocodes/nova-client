import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import GuessDirectionControl from "./guess-direction-control";
import { useGuessPrice } from "../mutations/guess-price";
import { useUserGuessStats } from "../queries/guess-stats";
import { useGuessStatus } from "../queries/guess-status";
import { useUserActiveGuess } from "../queries/active-guess";
import { TIME_LEFT, TIME_LEFT_MS } from "../constants";
import { formatCurrency } from "~/lib/utils/currency-formatter";

interface GuessStatusProps {
  onGuessComplete?: () => void;
}

export default function GuessStatus({ onGuessComplete }: GuessStatusProps) {
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [result, setResult] = useState<string | null>(null);
  const [guessId, setGuessId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_LEFT);
  const [guessStartPrice, setGuessStartPrice] = useState<number | null>(null);
  const { mutate: createGuess, isPending } = useGuessPrice();
  const { data: guessStats, refetch: refetchGuessStats } = useUserGuessStats();
  const { data: guessStatus, refetch: refetchGuessStatus } = useGuessStatus(
    guessId || ""
  );

  const { data: activeGuess, refetch: refetchActiveGuess } = useUserActiveGuess(
    !!guessStats?.activeGuess
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
      setTimeLeft(TIME_LEFT);
      if (onGuessComplete) {
        onGuessComplete();
      }
    }
  }, [guessStatus, guessId, refetchGuessStats, onGuessComplete]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (isSubmitting && !guessStatus?.resolved && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isSubmitting, guessStatus?.resolved, timeLeft]);

  const handleGuess = () => {
    setResult(null);
    setGuessId(null);
    setGuessStartPrice(null);

    setIsSubmitting(true);
    setTimeLeft(TIME_LEFT);

    createGuess(
      { direction },
      {
        onSuccess: (data) => {
          setGuessId(data.id);
          refetchGuessStats();
          setGuessStartPrice(data.startPrice);
          setTimeout(() => {
            if (!guessStatus?.resolved) {
              setIsSubmitting(false);
            }
          }, TIME_LEFT_MS);
        },
        onError: () => {
          setIsSubmitting(false);
          setTimeLeft(TIME_LEFT);
        },
      }
    );
  };

  // useEffect(() => {
  //   // Here, we are getting active guesses and checking their status on page refresh
  //   if (guessStats?.activeGuess && guessStats.activeGuess > 0 && !isPending) {
  //     refetchActiveGuess();
  //     if (activeGuess?.[0].id) {
  //       setGuessId(activeGuess?.[0].id);
  //       refetchGuessStatus();
  //     }
  //   }
  // }, [guessStats, activeGuess]);

  return (
    <div className="flex flex-col items-center space-y-3 p-4.5 rounded-sm bg-nova border border-nova shadow-widget">
      <p className="text-lg text-white">
        Will the price of Bitcoin go up or down?
      </p>
      {guessStats?.activeGuess ? (
        <p>Active Guess: {guessStats.activeGuess}</p>
      ) : (
        <p>No active guess</p>
      )}
      <div>
        <GuessDirectionControl
          disabled={
            isSubmitting || isPending || (guessStats?.activeGuess ?? 0) > 0
          }
          onSelectionChange={setDirection}
          defaultValue="up"
        />
      </div>

      <Button
        onClick={handleGuess}
        variant={"outline"}
        disabled={
          isSubmitting || isPending || (guessStats?.activeGuess ?? 0) > 0
        }
        className="cursor-pointer text-black"
      >
        {isSubmitting && !guessStatus?.resolved
          ? "Waiting for result..."
          : "Submit Guess"}
      </Button>

      {guessStartPrice && <p>Start Price: {formatCurrency(guessStartPrice)}</p>}

      {guessId && !guessStatus?.resolved && (
        <div className="mt-4 rounded-lg bg-muted p-4 text-white text-center bg-nova-fg">
          <p>Your guess is pending resolution </p>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
              <div
                className="bg-[#ff1492] h-2.5 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${(timeLeft / 60) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm mt-1 font-medium transition-all">
              {timeLeft} seconds remaining
            </p>
          </div>
          <p className="text-sm mt-2">
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
            <p>Start Price: {formatCurrency(guessStatus.startPrice)}</p>
            <p>End Price: {formatCurrency(guessStatus.endPrice)}</p>
            <p className="italic">
              {/* we want to say went up or down by the amount */}
              Result: The price of Bitcoin went{" "}
              {guessStatus.startPrice < guessStatus.endPrice
                ? "up"
                : "down"} by{" "}
              {Math.abs(guessStatus.startPrice - guessStatus.endPrice)} USD
            </p>
          </p>
        </div>
      )}
    </div>
  );
}
