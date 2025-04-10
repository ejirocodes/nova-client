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
    <Card className="max-w-md pt-0 pb-3 mx-auto overflow-hidden bg-[#22252A] text-[#e3e5e8] border border-[#2e3238] h-auto">
      <div className="h-40 bg-gradient-to-b from-[hsl(328,100%,54%)] to-[#22252A] relative">
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
          <h2 className="text-lg font-bold text-[#e3e5e8]">{name}</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-xl font-semibold text-[#e3e5e8]">{score}</p>
            <p className="text-xs tracking-wider text-[#8f97a3] uppercase">
              Score
            </p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-[#e3e5e8]">
              {guessesLost}
            </p>
            <p className="text-xs tracking-wider text-[#8f97a3] uppercase">
              Guesses Lost
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-xl font-semibold text-[#e3e5e8]">
              {guessesMade}
            </p>
            <p className="text-xs tracking-wider text-[#8f97a3] uppercase">
              Guesses Made
            </p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-[#e3e5e8]">
              {guessesPending}
            </p>
            <p className="text-xs tracking-wider text-[#8f97a3] uppercase">
              Guesses Pending
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t border-[#2e3238] flex justify-center space-x-10 py-4">
        <a href="#" className="text-[#8f97a3] hover:text-[#e3e5e8]">
          <Globe className="h-6 w-6" />
        </a>
        <a href="#" className="text-[#8f97a3] hover:text-[#e3e5e8]">
          <Youtube className="h-6 w-6" />
        </a>
        <a href="#" className="text-[#8f97a3] hover:text-[#e3e5e8]">
          <Facebook className="h-6 w-6" />
        </a>
        <a href="#" className="text-[#8f97a3] hover:text-[#e3e5e8]">
          <Twitter className="h-6 w-6" />
        </a>
      </CardFooter>
    </Card>
  );
}
