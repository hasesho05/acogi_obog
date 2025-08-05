"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

export const TypewriterEffectLines = ({
  lines,
  className,
  lineClassName,
  cursorClassName,
  speed = 0.1,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  cursorClassName?: string;
  speed?: number;
}) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      const animateText = async () => {
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
          const chars = lines[lineIndex].split("");
          
          // Animate each character in the line
          await animate(
            `.line-${lineIndex} .char`,
            {
              opacity: 1,
              display: "inline-block",
            },
            {
              duration: speed,
              delay: stagger(speed, { startDelay: 0.1 }),
            }
          );
          
          // Small pause between lines
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      };
      animateText();
    }
  }, [isInView, animate, lines, speed]);

  return (
    <div ref={scope} className={cn("flex flex-col items-center", className)}>
      {lines.map((line, lineIndex) => (
        <div
          key={`line-${lineIndex}`}
          className={cn(
            "flex items-center justify-center mb-2",
            lineClassName
          )}
        >
          <div className={`line-${lineIndex} flex`}>
            {line.split("").map((char, charIndex) => (
              <motion.span
                key={`char-${charIndex}`}
                className="char opacity-0 hidden text-white/60"
                initial={{ opacity: 0 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
          {lineIndex === lines.length - 1 && (
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className={cn(
                "inline-block ml-1 w-[4px] h-8 md:h-12 bg-white",
                cursorClassName
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};