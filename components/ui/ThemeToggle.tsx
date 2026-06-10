"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <button
      type="button"
      className={cn(
        "inline-flex size-10 cursor-pointer items-center justify-center rounded-sm border border-border text-ivory transition-colors",
        "hover:border-gold/40 hover:text-gold active:scale-[0.98]",
        "disabled:cursor-not-allowed",
        className,
      )}
      aria-label={
        mounted
          ? theme === "light"
            ? "Switch to dark mode"
            : "Switch to light mode"
          : "Toggle color theme"
      }
      onClick={toggleTheme}
      disabled={!mounted}
    >
      {mounted && theme === "light" ? (
        <Moon className="size-4" strokeWidth={1.5} aria-hidden />
      ) : (
        <Sun className="size-4" strokeWidth={1.5} aria-hidden />
      )}
    </button>
  );
}
