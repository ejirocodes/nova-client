import { useState } from "react";
import { cn } from "~/lib/utils";

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
    <div className={cn("flex w-full max-w-xs rounded-lg border", className)}>
      <button
        type="button"
        onClick={() => handleSelection("up")}
        className={cn(
          "flex-1 cursor-pointer rounded-l-lg px-4 py-2 text-center text-sm font-medium transition-all",
          selected === "up"
            ? "bg-primary text-primary-foreground"
            : "bg-background hover:bg-muted text-black"
        )}
        aria-pressed={selected === "up"}
      >
        Up
      </button>
      <button
        type="button"
        onClick={() => handleSelection("down")}
        className={cn(
          "flex-1 cursor-pointer rounded-r-lg px-4 py-2 text-center text-sm font-medium transition-all",
          selected === "down"
            ? "bg-primary text-primary-foreground"
            : "bg-background hover:bg-muted text-black"
        )}
        aria-pressed={selected === "down"}
      >
        Down
      </button>
    </div>
  );
}
