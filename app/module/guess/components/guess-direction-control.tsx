import { useState } from "react";
import { cn } from "~/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface GuessDirectionControlProps {
  onSelectionChange?: (value: "up" | "down") => void;
  defaultValue?: "up" | "down";
  className?: string;
}

export default function GuessDirectionControl({
  onSelectionChange,
  defaultValue,
  className,
}: GuessDirectionControlProps) {
  const [selected, setSelected] = useState<"up" | "down">(defaultValue || "up");

  const handleSelection = (value: "up" | "down") => {
    setSelected(value);
    onSelectionChange?.(value);
  };

  return (
    <div
      className={cn(
        "flex w-full max-w-xs rounded-lg border border-[#2e3238]",
        className
      )}
    >
      <button
        type="button"
        onClick={() => handleSelection("up")}
        className={cn(
          "flex-1 cursor-pointer rounded-l-lg px-4 py-2 text-center text-sm font-medium transition-all flex items-center justify-center gap-2",
          selected === "up"
            ? "bg-[#8b98a9] text-[#17181c]"
            : "bg-[#22252A] hover:bg-[#2e3238] text-[#e3e5e8]"
        )}
        aria-pressed={selected === "up"}
      >
        <span>Up</span>
        <div
          className={selected === "up" ? "bg-[#17181c] rounded-full p-1" : ""}
        >
          <ArrowUp
            className={cn(
              "w-4 h-4",
              selected === "up" ? "text-[#8b98a9]" : "text-[#e3e5e8]"
            )}
          />
        </div>
      </button>
      <button
        type="button"
        onClick={() => handleSelection("down")}
        className={cn(
          "flex-1 cursor-pointer rounded-r-lg px-4 py-2 text-center text-sm font-medium transition-all flex items-center justify-center gap-2",
          selected === "down"
            ? "bg-[#8b98a9] text-[#17181c]"
            : "bg-[#22252A] hover:bg-[#2e3238] text-[#e3e5e8]"
        )}
        aria-pressed={selected === "down"}
      >
        <span>Down</span>
        <div
          className={selected === "down" ? "bg-[#17181c] rounded-full p-1" : ""}
        >
          <ArrowDown
            className={cn(
              "w-4 h-4",
              selected === "down" ? "text-[#8b98a9]" : "text-[#e3e5e8]"
            )}
          />
        </div>
      </button>
    </div>
  );
}
