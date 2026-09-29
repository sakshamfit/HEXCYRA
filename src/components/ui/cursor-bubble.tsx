"use client";

import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import React, {
  type ComponentPropsWithoutRef,
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const DEFAULT_LABEL = "click";
const CURSOR_OFFSET_X = 13;
const CURSOR_OFFSET_Y = -43;
const FOLLOW_DURATION = 0.5;
const POP_IN_DURATION = 1.7;
const POP_IN_DELAY = 0.1;
const POP_OUT_DURATION = 0.3;
const RESTING_ROTATION = -30;

interface CursorBubbleContextValue {
  hide: () => void;
  show: (label: string) => void;
}

const CursorBubbleContext = createContext<CursorBubbleContextValue | null>(
  null
);

function useCursorBubbleContext() {
  const context = useContext(CursorBubbleContext);

  if (!context) {
    throw new Error(
      "CursorBubbleTarget must be used within a CursorBubble provider."
    );
  }

  return context;
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    update();
    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  return prefersReducedMotion;
}

function useCoarsePointer() {
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(pointer: coarse)");

    const update = () => {
      setIsCoarsePointer(mediaQuery.matches);
    };

    update();
    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  return isCoarsePointer;
}

export interface CursorBubbleProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Extra classes applied to the floating bubble itself (color, padding, shape, etc). */
  bubbleClassName?: string;
  children?: ReactNode;
}

function CursorBubble({
  bubbleClassName,
  children,
  className,
  ...props
}: CursorBubbleProps) {
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const showRef = useRef<(label: string) => void>(() => undefined);
  const hideRef = useRef<() => void>(() => undefined);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isCoarsePointer = useCoarsePointer();
  const disabled = prefersReducedMotion || isCoarsePointer;

  useGSAP(
    () => {
      const bubble = bubbleRef.current;
      if (!bubble || disabled) {
        return;
      }

      const xTo = gsap.quickTo(bubble, "x", {
        duration: FOLLOW_DURATION,
        ease: "power3",
      });
      const yTo = gsap.quickTo(bubble, "y", {
        duration: FOLLOW_DURATION,
        ease: "power3",
      });

      gsap.set(bubble, { rotation: RESTING_ROTATION });

      showRef.current = (label: string) => {
        bubble.textContent = label;
        gsap.killTweensOf(bubble, "opacity,scale,rotation");
        gsap.to(bubble, {
          duration: POP_IN_DURATION,
          delay: POP_IN_DELAY,
          ease: "elastic.out(1, 0.4)",
          opacity: 1,
          rotation: 0,
          scale: 1,
        });
      };

      hideRef.current = () => {
        gsap.killTweensOf(bubble, "opacity,scale,rotation");
        gsap.to(bubble, {
          duration: POP_OUT_DURATION,
          ease: "sine.inOut",
          opacity: 1,
          rotation: RESTING_ROTATION,
          scale: 0,
        });
      };

      const handlePointerMove = (event: PointerEvent) => {
        xTo(event.clientX + CURSOR_OFFSET_X);
        yTo(event.clientY + CURSOR_OFFSET_Y);
      };

      window.addEventListener("pointermove", handlePointerMove);

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        showRef.current = () => undefined;
        hideRef.current = () => undefined;
      };
    },
    { dependencies: [disabled] }
  );

  const contextValue = useMemo(
    () => ({
      hide: () => hideRef.current(),
      show: (label: string) => showRef.current(label),
    }),
    []
  );

  return (
    <CursorBubbleContext.Provider value={contextValue}>
      <div className={cn("relative", className)} {...props}>
        {children}
        {disabled ? null : (
          <span
            ref={bubbleRef}
            aria-hidden="true"
            className={cn(
              "pointer-events-none fixed top-0 left-0 z-50 origin-bottom-left scale-0 select-none rounded-full bg-slate-900 text-white px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider opacity-0 shadow-2xl border border-white/20 backdrop-blur-md ring-2 ring-fuchsia-500/40",
              bubbleClassName
            )}
          />
        )}
      </div>
    </CursorBubbleContext.Provider>
  );
}

export interface CursorBubbleTargetProps
  extends Omit<ComponentPropsWithoutRef<"span">, "children"> {
  children?: ReactNode;
  /** Text shown in the bubble while hovering this target. @default "click" */
  label?: string;
}

function CursorBubbleTarget({
  children,
  label = DEFAULT_LABEL,
  className,
  ...props
}: CursorBubbleTargetProps) {
  const { hide, show } = useCursorBubbleContext();

  return (
    <span
      className={cn("inline-block cursor-pointer", className)}
      onMouseEnter={() => show(label)}
      onMouseLeave={hide}
      {...props}
    >
      {children}
    </span>
  );
}

export { CursorBubble, CursorBubbleTarget };
export default CursorBubble;
