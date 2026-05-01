import React, { useState, useEffect, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface RotatingTextProps {
  texts: string[];
  mainClassName?: string;
  staggerFrom?: "first" | "last" | "center" | number;
  initial?: any;
  animate?: any;
  exit?: any;
  staggerDuration?: number;
  splitLevelClassName?: string;
  transition?: any;
  rotationInterval?: number;
}

const RotatingText = forwardRef<HTMLSpanElement, RotatingTextProps>((props, ref) => {
  const {
    texts,
    transition = { type: "spring", damping: 30, stiffness: 400 },
    initial = { y: "100%" },
    animate = { y: 0 },
    exit = { y: "-120%" },
    staggerDuration = 0.025,
    staggerFrom = "first",
    rotationInterval = 2000,
    mainClassName = "",
    splitLevelClassName = "",
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);
    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  const elements = texts[currentTextIndex].split("");

  return (
    <span
      ref={ref}
      className={`inline-flex overflow-hidden ${mainClassName}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTextIndex}
          className={`flex ${splitLevelClassName}`}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {elements.map((char, index) => {
            let delay = index * staggerDuration;
            if (staggerFrom === "last") {
              delay = (elements.length - 1 - index) * staggerDuration;
            } else if (staggerFrom === "center") {
              const center = Math.floor(elements.length / 2);
              delay = Math.abs(center - index) * staggerDuration;
            } else if (typeof staggerFrom === "number") {
              delay = Math.abs(staggerFrom - index) * staggerDuration;
            }

            return (
              <motion.span
                key={index}
                variants={{
                  initial,
                  animate,
                  exit,
                }}
                transition={{
                  ...transition,
                  delay,
                }}
                className={char === " " ? "w-[0.5ex]" : "inline-block"}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </span>
  );
});

RotatingText.displayName = "RotatingText";
export default RotatingText;
