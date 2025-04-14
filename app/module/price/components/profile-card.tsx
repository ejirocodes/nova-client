import { Card, CardContent } from "~/components/ui/card";

interface ProfileCardProps {
  name: string;
  score: number;
  guessesMade: number;
  guessesLost: number;
  activeGuess: number;
  guessesWon: number;
  profileImage: string;
}

export default function ProfileCard({
  name,
  score,
  guessesMade,
  guessesLost,
  activeGuess,
  guessesWon,
  profileImage,
}: ProfileCardProps) {
  return (
    <Card className="max-w-md pt-0 rounded-sm bg-nova-fg pb-3 mx-auto overflow-hidden text-nova-primary border border-nova h-auto shadow-widget">
      <div className="h-40 bg-gradient-to-b from-[hsl(328,100%,54%)] to-nova-bg relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 top-20">
          <div className="rounded-full overflow-hidden h-20 w-20">
            <img
              src={profileImage || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <CardContent className="pt-2 pb-4 text-center space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-nova-primary">{name}</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-xl font-semibold text-[#ff1492]">{score}</p>
            <p className="text-xs tracking-wider text-nova-secondary uppercase">
              Score
            </p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-[#ff1492]">
              {guessesLost}
            </p>
            <p className="text-xs tracking-wider text-nova-secondary uppercase">
              Guesses Lost
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-xl font-semibold text-[#ff1492]">
              {guessesMade}
            </p>
            <p className="text-xs tracking-wider text-nova-secondary uppercase">
              Guesses Made
            </p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-[#ff1492]">
              {activeGuess}
            </p>
            <p className="text-xs tracking-wider text-nova-secondary uppercase">
              Active Guess
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-xl font-semibold text-[#ff1492]">{guessesWon}</p>
            <p className="text-xs tracking-wider text-nova-secondary uppercase">
              Guesses Won
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
