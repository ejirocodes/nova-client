import { Globe, Facebook, Twitter, Youtube } from "lucide-react";
import { Card, CardContent, CardFooter } from "~/components/ui/card";

interface ProfileCardProps {
  name: string;
  score: number;
  guessesMade: number;
  guessesLost: number;
  guessesPending: number;
  profileImage: string;
}

export default function ProfileCard({
  name,
  score,
  guessesMade,
  guessesLost,
  guessesPending,
  profileImage,
}: ProfileCardProps) {
  return (
    <Card className="max-w-md pt-0 pb-3 mx-auto overflow-hidden bg-[#1a1a1a] text-gray-200 border-none h-auto">
      <div className="h-40 bg-gradient-to-b from-[hsl(328,100%,54%)] to-[#1a1a1a] relative">
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
          <h2 className="text-lg font-bold text-white">{name}</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-xl font-bold text-white">{score}</p>
            <p className="text-gray-400 text-sm">Score</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-white">{guessesLost}</p>
            <p className="text-gray-400 text-sm">Guesses Lost</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-xl font-bold text-white">{guessesMade}</p>
            <p className="text-gray-400 text-sm">Guesses Made</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-white">{guessesPending}</p>
            <p className="text-gray-400 text-sm">Guesses Pending</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t border-gray-800 flex justify-center space-x-10 py-4">
        <a href="#" className="text-gray-400 hover:text-white">
          <Globe className="h-6 w-6" />
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          <Youtube className="h-6 w-6" />
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          <Facebook className="h-6 w-6" />
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          <Twitter className="h-6 w-6" />
        </a>
      </CardFooter>
    </Card>
  );
}
