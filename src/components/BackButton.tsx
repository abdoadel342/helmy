import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

interface BackButtonProps {
  className?: string;
  onClick?: () => void;
}

import { ArrowRight, ArrowLeft } from 'lucide-react';

export function BackButton({ className = '', onClick }: BackButtonProps) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
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
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 dark:bg-primary/20 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-primary/30 transition-colors cursor-pointer ${className}`}
      aria-label="الرجوع"
    >
      {language === 'ar' ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
    </button>
  );
}
