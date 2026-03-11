import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  stagger?: number;
  scrollTrigger?: boolean;
  "data-testid"?: string;
}

export default function SplitText({
  text,
  className = "",
  as: Tag = "h2",
  delay = 0,
  stagger = 0.03,
  scrollTrigger = true,
  ...props
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars = el.querySelectorAll(".s-char");

    const config: gsap.TweenVars = {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.8,
      stagger,
      delay,
      ease: "power3.out",
    };

    if (scrollTrigger) {
      config.scrollTrigger = {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
      };
    }

    gsap.fromTo(
      chars,
      { y: 50, opacity: 0, rotateX: -30 },
      config
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [text, delay, stagger, scrollTrigger]);

  const words = text.split(" ");

  return (
    <Tag
      ref={ref as any}
      className={`${className}`}
      style={{ perspective: "600px" }}
      {...props}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => (
            <span
              key={`${wi}-${ci}`}
              className="s-char inline-block"
              style={{
                opacity: 0,
                transformOrigin: "bottom center",
                willChange: "transform, opacity",
              }}
            >
              {char}
            </span>
          ))}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
