import { useState } from "react";
import Header from "~/components/common/header";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Play } from "lucide-react";

export function meta() {
  return [
    { title: "Nova" },
    { name: "description", content: "Welcome to Nova" },
  ];
}

export default function Home() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="bg-[#121212] text-white">
      <Header />
      <div className="flex flex-col items-center h-screen pt-40">
        <h1 className="text-4xl font-bold">Welcome to Nova</h1>
        <p className="text-lg">
          Predict Bitcoin price and you might win something huge 💰
        </p>
        <div className="flex justify-center mt-4">
          <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="rounded-full z-40 cursor-pointer text-sm h-12 px-8 bg-marketing hover:bg-marketing/40 hover:text-white border border-neutral-700"
              >
                Watch demo
                <Play size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] bg-black border-slate-700">
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <video
                  src="/demo.mp4"
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-5 max-w-3xl w-full px-4">
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-neutral-700">
            <video
              src="/demo.mp4"
              controls
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
