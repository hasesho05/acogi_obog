"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

export const TypewriterEffectLines = ({
  lines,
  className,
  lineClassName,
  cursorClassName,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  cursorClassName?: string;
}) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      const animateLines = async () => {
        for (let i = 0; i < lines.length; i++) {
          await animate(
            `.line-${i}`,
            {
              width: "100%",
              opacity: 1,
            },
            {
              duration: 2,
              ease: "easeInOut",
            }
          );
        }
      };
      animateLines();
    }
  }, [isInView, animate, lines.length]);

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
          <motion.div
            className={`line-${lineIndex} overflow-hidden`}
            initial={{
              width: "0%",
              opacity: 0,
            }}
            style={{
              whiteSpace: "nowrap",
            }}
          >
            <span className="inline-block">{line}</span>
          </motion.div>
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
                "inline-block ml-1 w-[4px] h-8 md:h-12 bg-[#9f8f7c]",
                cursorClassName
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};