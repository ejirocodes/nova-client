import { Globe, Facebook, Twitter, Youtube } from "lucide-react";
import { Card, CardContent, CardFooter } from "~/components/ui/card";

interface ProfileCardProps {
  name: string;
  affiliation: string;
  trades: number;
  issuers: number;
  volume: string;
  lastTraded: string;
  profileImage: string;
}

export default function ProfileCard({
  name,
  affiliation,
  trades,
  issuers,
  volume,
  lastTraded,
  profileImage,
}: ProfileCardProps) {
  return (
    <Card className="max-w-md mx-auto overflow-hidden bg-[#1a1a1a] text-gray-200 border-none">
      <div className="h-40 bg-gradient-to-b from-red-900 to-[#1a1a1a] relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 top-20">
          <div className="rounded-full border-4 border-red-800 overflow-hidden h-24 w-24 bg-red-800">
            <img
              src={profileImage || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <CardContent className="pt-16 pb-4 text-center space-y-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-white">{name}</h2>
          <p className="text-gray-400">{affiliation}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">{trades}</p>
            <p className="text-gray-400">Trades</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">{issuers}</p>
            <p className="text-gray-400">Issuers</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">{volume}</p>
            <p className="text-gray-400">Volume</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">{lastTraded}</p>
            <p className="text-gray-400">Last Traded</p>
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
