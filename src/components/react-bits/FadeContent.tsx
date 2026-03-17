import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface FadeContentProps {
  children: React.ReactNode;
  blur?: boolean;
  duration?: number;
  initialOpacity?: number;
  threshold?: number;
  className?: string;
}

export const FadeContent: React.FC<FadeContentProps> = ({
  children,
  blur = false,
  duration = 1000,
  initialOpacity = 0,
  threshold = 0.1,
  className = '',
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: initialOpacity, filter: blur ? 'blur(10px)' : 'none', y: 20 }}
      animate={
        inView
          ? { opacity: 1, filter: 'blur(0px)', y: 0 }
          : { opacity: initialOpacity, filter: blur ? 'blur(10px)' : 'none', y: 20 }
      }
      transition={{ duration: duration / 1000, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
