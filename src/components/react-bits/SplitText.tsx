import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: any;
  to?: any;
  threshold?: number;
  rootMargin?: string;
  textAlign?: string;
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
}

export const SplitText = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'easeOut',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete,
  showCallback = false,
}: SplitTextProps) => {
  const letters = splitType === 'chars' ? text.split('') : splitType === 'words' ? text.split(' ') : text.split('\n');
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { amount: threshold, margin: rootMargin as any });

  return (
    <p ref={ref} className={`split-text flex flex-wrap justify-${textAlign === 'center' ? 'center' : textAlign === 'right' ? 'end' : 'start'} ${className}`}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={from}
          animate={inView ? to : from}
          transition={{ duration, delay: i * (delay / 1000), ease: [0.25, 1, 0.5, 1] }}
          onAnimationComplete={
            i === letters.length - 1 && onLetterAnimationComplete && showCallback
              ? onLetterAnimationComplete
              : undefined
          }
          className={`inline-block whitespace-pre ${splitType === 'chars' ? '' : 'mr-2'}`}
        >
          {letter}
        </motion.span>
      ))}
    </p>
  );
};

export default SplitText;
