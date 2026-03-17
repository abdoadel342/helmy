import React from 'react';
import { motion } from 'motion/react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 3, className = '' }) => {
  const animationProps = {
    initial: { backgroundPosition: '100% 50%' },
    animate: { backgroundPosition: '0% 50%' },
    transition: {
      repeat: Infinity,
      duration: speed,
      ease: 'linear',
    },
  };

  return (
    <motion.div
      className={`text-[#b5b5b5a4] bg-clip-text inline-block ${disabled ? '' : 'animate-shine'} ${className}`}
      style={{
        backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
      }}
      {...(disabled ? {} : animationProps)}
    >
      {text}
    </motion.div>
  );
};
