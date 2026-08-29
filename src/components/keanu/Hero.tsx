import { useDoor } from "./DoorTheater";
import { SiteNav, SceneHint } from "./SiteNav";

export function Hero() {
  const { goTo } = useDoor();

  return (
    <section className="relative flex min-h-dvh flex-col overflow-hidden bg-bg">
      <img
        src="/keanu-portal.jpg?v=2"
        alt=""
        className="portal-still pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,transparent_36%,rgb(4_2_10_/_0.55)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg/80 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg/90 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-dvh flex-col">
        <SiteNav />
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <p className="mb-3 text-[11px] font-medium tracking-[0.28em] text-violet uppercase">
            AI specialist
          </p>
          <h1 className="font-display max-w-[16ch] text-[40px] leading-[1.08] font-normal tracking-tight text-fg sm:text-[52px] md:text-[64px]">
            Workflow automation
          </h1>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-hero-sub/80 sm:text-base">
            Automation engineering for operators who need the system to run.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 px-6 pb-7">
          <button
            type="button"
            onClick={() => goTo(3)}
            className="liquid-glass rounded-full px-8 py-3.5 text-sm text-fg transition-transform duration-150 active:scale-[0.96]"
          >
            Start a project
          </button>
          <SceneHint label="Enter the door" />
        </div>
      </div>
    </section>
  );
}
