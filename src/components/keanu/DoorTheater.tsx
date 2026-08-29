import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export const SCENES = ["hero", "how", "work", "close"] as const;
export type SceneId = (typeof SCENES)[number];

const DURATION_WARP = 2400;
const DURATION_ROOM = 1600;

function clamp(n: number, a = 0, b = 1) {
  return Math.max(a, Math.min(b, n));
}

function smoothstep(a: number, b: number, x: number) {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function isTypingTarget(el: EventTarget | null) {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    el.isContentEditable
  );
}

type DoorApi = {
  goTo: (i: number) => void;
  index: number;
  busy: boolean;
};

const DoorApiContext = createContext<DoorApi>({
  goTo: () => undefined,
  index: 0,
  busy: false,
});

export function useDoor() {
  return useContext(DoorApiContext);
}

type Props = {
  children: Record<SceneId, ReactNode>;
};

export function DoorTheater({ children }: Props) {
  const [index, setIndex] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const [fromIndex, setFromIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isBusy, setIsBusy] = useState(false);
  const busy = useRef(false);
  const raf = useRef(0);
  const touchY = useRef<number | null>(null);
  const indexRef = useRef(0);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const warpVideoRef = useRef<HTMLVideoElement>(null);
  indexRef.current = index;

  const goTo = useCallback((next: number) => {
    if (busy.current) return;
    const from = indexRef.current;
    const clamped = Math.max(0, Math.min(SCENES.length - 1, next));
    if (clamped === from) return;

    if (prefersReducedMotion()) {
      setIndex(clamped);
      setIncoming(null);
      setProgress(0);
      return;
    }

    const duration = from === 0 ? DURATION_WARP : DURATION_ROOM;
    busy.current = true;
    setIsBusy(true);
    setFromIndex(from);
    setIncoming(clamped);
    setProgress(0);

    const vid = warpVideoRef.current;
    if (vid && from === 0) {
      vid.currentTime = 0;
      vid.playbackRate = 6 / (DURATION_WARP / 1000);
      void vid.play().catch(() => undefined);
    }

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(t);
      if (t < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setIndex(clamped);
        setIncoming(null);
        setProgress(0);
        busy.current = false;
        setIsBusy(false);
        if (vid) {
          vid.pause();
          vid.currentTime = 0;
        }
      }
    };
    raf.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  useEffect(() => {
    const scrollerOf = () => sceneRefs.current[indexRef.current];

    const atBoundary = (delta: number) => {
      const scroller = scrollerOf();
      if (!scroller) return true;
      const { scrollTop, scrollHeight, clientHeight } = scroller;
      const atTop = scrollTop <= 1;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 2;
      if (delta > 0) return atBottom;
      return atTop;
    };

    const onWheel = (e: WheelEvent) => {
      if (busy.current) {
        e.preventDefault();
        return;
      }
      if (!atBoundary(e.deltaY)) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      const next = indexRef.current + dir;
      if (next < 0 || next >= SCENES.length) return;
      if (Math.abs(e.deltaY) < 18) return;
      e.preventDefault();
      goTo(next);
    };

    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        goTo(indexRef.current + 1);
      }
      if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        goTo(indexRef.current - 1);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchY.current = e.touches[0]?.clientY ?? null;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchY.current == null) return;
      const y = e.changedTouches[0]?.clientY ?? touchY.current;
      const dy = touchY.current - y;
      touchY.current = null;
      if (Math.abs(dy) < 42) return;
      if (busy.current) return;
      if (!atBoundary(dy)) return;
      goTo(indexRef.current + (dy > 0 ? 1 : -1));
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [goTo]);

  const transitioning = incoming != null;
  const fromHero = fromIndex === 0;
  const leavingScale = 1 + Math.pow(progress, 1.05) * (fromHero ? 2.8 : 1.6);
  const leavingOpacity = 1 - smoothstep(0.04, fromHero ? 0.38 : 0.48, progress);
  const enteringScale = 0.18 + smoothstep(0.42, 1, progress) * 0.82;
  const enteringOpacity = smoothstep(0.5, 0.86, progress);
  const enteringBright = 1.7 - smoothstep(0.55, 1, progress) * 0.7;
  const vignette = 4.2 * progress * (1 - progress);
  const bloom = 3.6 * progress * (1 - progress);
  const videoOpacity = fromHero
    ? smoothstep(0.02, 0.12, progress) * (1 - smoothstep(0.72, 0.96, progress))
    : 0;

  const api = useMemo<DoorApi>(
    () => ({ goTo, index, busy: isBusy }),
    [goTo, index, isBusy],
  );

  return (
    <DoorApiContext.Provider value={api}>
      <div className="relative h-dvh w-full overflow-hidden bg-bg text-fg">
        <div className="sr-only" aria-live="polite">
          {incoming != null ? `Entering ${SCENES[incoming]}` : null}
        </div>

        <div className="absolute inset-0">
          {SCENES.map((id, i) => {
            const isLeave = i === index;
            const isEnter = incoming != null && i === incoming;
            const mounted = isLeave || isEnter;
            if (!mounted) return null;

            const layerStyle: CSSProperties = isEnter
              ? {
                  transform: `scale(${enteringScale})`,
                  opacity: enteringOpacity,
                  filter: `brightness(${enteringBright})`,
                }
              : {
                  transform: `scale(${leavingScale})`,
                  opacity: leavingOpacity,
                };

            return (
              <div
                key={id}
                ref={(el) => {
                  sceneRefs.current[i] = el;
                }}
                className={cn(
                  "absolute inset-0 overflow-x-hidden overflow-y-auto",
                  isEnter ? "z-[1]" : "z-[2]",
                  (isEnter || transitioning) && "pointer-events-none",
                )}
                aria-hidden={!isLeave || transitioning}
              >
                <div
                  className="min-h-full origin-center will-change-transform"
                  style={transitioning ? layerStyle : undefined}
                >
                  {children[id]}
                </div>
              </div>
            );
          })}

          <video
            ref={warpVideoRef}
            className="pointer-events-none absolute inset-0 z-30 h-full w-full object-cover"
            src="/keanu-warp.mp4?v=2"
            muted
            playsInline
            preload="auto"
            aria-hidden
            style={{ opacity: transitioning ? videoOpacity : 0 }}
          />

          {transitioning ? <WarpCanvas active progress={progress} /> : null}

          <div
            className="pointer-events-none absolute inset-0 z-[45]"
            style={{
              opacity: transitioning ? bloom : 0,
              background:
                "radial-gradient(circle at 50% 52%, rgb(252 211 77 / 0.28) 0%, rgb(139 124 255 / 0.22) 22%, transparent 58%)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-50"
            style={{
              opacity: transitioning ? vignette : 0,
              background:
                "radial-gradient(ellipse at 50% 52%, transparent 18%, rgb(4 1 12 / 0.88) 100%)",
            }}
            aria-hidden
          />
        </div>

        <nav
          className="pointer-events-auto absolute top-1/2 right-4 z-50 hidden -translate-y-1/2 flex-col gap-2 lg:flex"
          aria-label="Rooms"
        >
          {SCENES.map((id, i) => (
            <button
              key={id}
              type="button"
              aria-label={id}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
              className={cn(
                "h-2 w-2 rounded-full transition-[transform,background-color] duration-300",
                i === index ? "scale-125 bg-fg" : "bg-fg/30 hover:bg-fg/70",
              )}
            />
          ))}
        </nav>
      </div>
    </DoorApiContext.Provider>
  );
}

type Star = {
  x: number;
  y: number;
  z: number;
  pz: number;
  gold: boolean;
  size: number;
};

function WarpCanvas({ active, progress }: { active: boolean; progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const spawn = (): Star => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: Math.random(),
      pz: 1,
      gold: Math.random() > 0.62,
      size: 0.6 + Math.random() * 1.6,
    });

    if (starsRef.current.length === 0) {
      starsRef.current = Array.from({ length: 520 }, spawn);
    }

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      if (!active && progressRef.current <= 0) {
        raf = requestAnimationFrame(draw);
        return;
      }
      const p = progressRef.current;
      const warp = 0.006 + p * p * 0.09;
      const cx = w * 0.5;
      const cy = h * 0.52;
      const fade = smoothstep(0.02, 0.14, p) * (1 - smoothstep(0.82, 1, p));
      ctx.globalAlpha = fade;

      for (const star of starsRef.current) {
        star.pz = star.z;
        star.z -= warp;
        if (star.z < 0.04) {
          const n = spawn();
          star.x = n.x;
          star.y = n.y;
          star.z = 0.95 + Math.random() * 0.2;
          star.pz = star.z;
          star.gold = n.gold;
          star.size = n.size;
        }
        const k = 0.55 / star.z;
        const sx = cx + star.x * w * k * 0.55;
        const sy = cy + star.y * h * k * 0.55;
        const pk = 0.55 / Math.max(0.04, star.pz);
        const px = cx + star.x * w * pk * 0.55;
        const py = cy + star.y * h * pk * 0.55;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = star.gold ? "rgba(252,211,77,0.9)" : "rgba(167,151,255,0.85)";
        ctx.lineWidth = star.size * (0.7 + p * 2.4);
        ctx.stroke();
      }

      ctx.globalAlpha = fade * 0.55;
      ctx.strokeStyle = "rgba(139,124,255,0.55)";
      ctx.lineWidth = 1.2;
      const ring = 8;
      for (let i = 0; i < ring; i++) {
        const a1 = (i / ring) * Math.PI * 2 + p * 4;
        const a2 = ((i + 1) / ring) * Math.PI * 2 + p * 4;
        const r = (1 - p) * Math.min(w, h) * 0.28 + 12;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a1) * r, cy + Math.sin(a1) * r);
        ctx.lineTo(cx + Math.cos(a2) * r, cy + Math.sin(a2) * r);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-40 h-full w-full"
      aria-hidden
      style={{ opacity: active ? 1 : 0 }}
    />
  );
}
