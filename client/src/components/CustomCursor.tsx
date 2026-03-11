import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    let rafId = 0;
    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        gsap.to(dot, {
          x: posRef.current.x,
          y: posRef.current.y,
          duration: 0.1,
          ease: "power2.out",
          overwrite: true,
        });
        gsap.to(cursor, {
          x: posRef.current.x,
          y: posRef.current.y,
          duration: 0.5,
          ease: "power3.out",
          overwrite: true,
        });
      });
    };

    const onMouseEnter = () => setIsHidden(false);
    const onMouseLeave = () => setIsHidden(true);

    const hoverSelector = "a, button, [role='button'], input, textarea, select, [data-cursor-hover]";

    const onDelegatedOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest(hoverSelector)) setIsHovering(true);
    };
    const onDelegatedOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest(hoverSelector)) setIsHovering(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onDelegatedOver);
    document.addEventListener("mouseout", onDelegatedOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onDelegatedOver);
      document.removeEventListener("mouseout", onDelegatedOut);
    };
  }, []);

  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ opacity: isHidden ? 0 : 1, transition: "opacity 0.3s" }}
      >
        <div
          className="rounded-full border transition-all duration-300 ease-out"
          style={{
            width: isHovering ? 60 : 40,
            height: isHovering ? 60 : 40,
            borderColor: isHovering ? "rgba(6, 182, 212, 0.8)" : "rgba(255, 255, 255, 0.5)",
            backgroundColor: isHovering ? "rgba(6, 182, 212, 0.08)" : "transparent",
            backdropFilter: isHovering ? "blur(4px)" : "none",
          }}
        />
      </div>
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: isHidden ? 0 : 1, transition: "opacity 0.3s" }}
      >
        <div
          className="rounded-full transition-all duration-200"
          style={{
            width: isHovering ? 6 : 4,
            height: isHovering ? 6 : 4,
            backgroundColor: isHovering ? "#06B6D4" : "#fff",
            boxShadow: isHovering ? "0 0 15px rgba(6, 182, 212, 0.6)" : "none",
          }}
        />
      </div>
    </>
  );
}
