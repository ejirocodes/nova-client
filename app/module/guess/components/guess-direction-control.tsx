import { useState } from "react";
import { cn } from "~/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface GuessDirectionControlProps {
  onSelectionChange?: (value: "up" | "down") => void;
  defaultValue?: "up" | "down";
  className?: string;
  disabled?: boolean;
}

export default function GuessDirectionControl({
  onSelectionChange,
  defaultValue,
  className,
  disabled,
}: GuessDirectionControlProps) {
  const [selected, setSelected] = useState<"up" | "down">(defaultValue || "up");

  const handleSelection = (value: "up" | "down") => {
    setSelected(value);
    onSelectionChange?.(value);
  };

  return (
    <div
      className={cn(
        "flex w-full max-w-xs rounded-lg border border-nova shadow-widget",
        className
      )}
    >
      <button
        type="button"
        onClick={() => handleSelection("up")}
        className={cn(
          "flex-1 bg-[#2F2F2F] text-white cursor-pointer rounded-l-lg px-4 py-2 text-center text-sm font-medium transition-all flex items-center justify-center gap-2",
          selected === "up"
            ? ""
            : "bg-nova hover:bg-nova-border text-nova-primary"
        )}
        aria-pressed={selected === "up"}
        disabled={disabled}
      >
        <span className="text-nowrap">Guess up</span>
        <div className={selected === "up" ? " p-1" : ""}>
          <ArrowUp className={cn("w-6 h-6 text-green-500 font-bold")} />
        </div>
      </button>
      <button
        type="button"
        onClick={() => handleSelection("down")}
        className={cn(
          "flex-1 bg-[#2F2F2F] text-white cursor-pointer rounded-r-lg px-4 py-2 text-center text-sm font-medium transition-all flex items-center justify-center gap-2",
          selected === "down"
            ? ""
            : "bg-nova hover:bg-nova-border text-nova-primary"
        )}
        aria-pressed={selected === "down"}
        disabled={disabled}
      >
        <span className="text-nowrap">Guess down</span>
        <div className={selected === "down" ? " p-1" : ""}>
          <ArrowDown className={cn("w-6 h-6 text-red-500 font-bold")} />
        </div>
      </button>
    </div>
  );
}
