import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  className?: string;
  onClick?: () => void;
}

export function BackButton({ className = '', onClick }: BackButtonProps) {
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <button 
      onClick={handleBack}
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer ${className}`}
      aria-label="الرجوع"
    >
      <span className="material-symbols-outlined">arrow_forward</span>
    </button>
  );
}
