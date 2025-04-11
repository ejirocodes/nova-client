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
          "flex-1 cursor-pointer rounded-l-lg px-4 py-2 text-center text-sm font-medium transition-all flex items-center justify-center gap-2",
          selected === "up"
            ? "bg-nova-active text-nova-active"
            : "bg-nova hover:bg-nova-border text-nova-primary"
        )}
        aria-pressed={selected === "up"}
        disabled={disabled}
      >
        <span>Up</span>
        <div
          className={selected === "up" ? "bg-nova-icon rounded-full p-1" : ""}
        >
          <ArrowUp
            className={cn(
              "w-4 h-4",
              selected === "up" ? "text-nova-icon-dark" : "text-nova-primary"
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
            ? "bg-nova-active text-nova-active"
            : "bg-nova hover:bg-nova-border text-nova-primary"
        )}
        aria-pressed={selected === "down"}
        disabled={disabled}
      >
        <span>Down</span>
        <div
          className={selected === "down" ? "bg-nova-icon rounded-full p-1" : ""}
        >
          <ArrowDown
            className={cn(
              "w-4 h-4",
              selected === "down" ? "text-nova-icon-dark" : "text-nova-primary"
            )}
          />
        </div>
      </button>
    </div>
  );
}
