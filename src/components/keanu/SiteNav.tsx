import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SCENES, useDoor } from "./DoorTheater";

const LINKS: { label: string; scene: number }[] = [
  { label: "How it works", scene: 1 },
  { label: "Projects", scene: 2 },
];

export function SiteNav() {
  const { goTo } = useDoor();
  const [open, setOpen] = useState(false);

  return (
    <header className="pointer-events-auto relative z-20 w-full px-6 py-5 lg:px-8">
      <div className="mx-auto flex max-w-[520px] items-center justify-between">
        <button
          type="button"
          onClick={() => goTo(0)}
          className="flex items-center gap-2 text-fg"
          aria-label="Keanu — home"
        >
          <img src="/keanu-logo.svg" alt="" className="size-6 shrink-0" />
          <span className="font-display text-sm font-medium tracking-[0.22em]">
            KEANU
          </span>
        </button>

        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => goTo(link.scene)}
              className="text-sm text-fg/90 transition-opacity hover:opacity-70"
            >
              {link.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(3)}
          className="liquid-glass hidden rounded-full px-4 py-2 text-sm text-fg lg:inline-flex"
        >
          Start a project
        </button>

        <button
          type="button"
          className="liquid-glass flex size-11 items-center justify-center rounded-full lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative size-5">
            <Menu
              className={cn(
                "absolute inset-0 size-5 text-fg transition-all duration-300",
                open ? "scale-75 rotate-90 opacity-0" : "scale-100 opacity-100",
              )}
            />
            <X
              className={cn(
                "absolute inset-0 size-5 text-fg transition-all duration-300",
                open ? "scale-100 opacity-100" : "scale-75 -rotate-90 opacity-0",
              )}
            />
          </span>
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-80 pt-4" : "max-h-0",
        )}
      >
        <div className="flex flex-col gap-1">
          {LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              className="rounded-xl px-4 py-3 text-left text-fg/90 hover:bg-fg/5"
              onClick={() => {
                setOpen(false);
                goTo(link.scene);
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            className="liquid-glass mt-2 rounded-full px-4 py-3 text-fg"
            onClick={() => {
              setOpen(false);
              goTo(3);
            }}
          >
            Start a project
          </button>
        </div>
      </div>
    </header>
  );
}

export function SceneHint({ label = "Scroll to enter" }: { label?: string }) {
  const { goTo, index } = useDoor();
  if (index >= SCENES.length - 1) return null;
  return (
    <button
      type="button"
      onClick={() => goTo(index + 1)}
      className="group mx-auto flex flex-col items-center gap-2 text-fg/50 transition-colors hover:text-fg/80"
    >
      <span className="text-xs tracking-[0.18em] uppercase">{label}</span>
      <span className="block h-8 w-px bg-fg/30 group-hover:bg-fg/70" />
    </button>
  );
}
