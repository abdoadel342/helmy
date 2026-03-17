import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    'home': 'الرئيسية',
    'education': 'التعليم',
    'programs': 'التمارين',
    'nutrition': 'التغذية',
    'profile': 'الحساب',
    'settings': 'الإعدادات',
    'language': 'اللغة',
    'english': 'English',
    'arabic': 'العربية',
    'overview': 'نظرة عامة',
    'about_program': 'عن البرنامج والأهداف',
    'program_desc': 'نحن نهدف إلى تقديم أفضل المناهج التعليمية الرياضية والبرامج الغذائية المخصصة لتحقيق أهدافك البدنية بأعلى معايير الجودة العلمية.',
    'completed_program': 'برنامج منجز',
    'goal_achieved': 'تحقيق الهدف',
    'continuous_days': 'يوم متواصل',
    'main_menu': 'القائمة الرئيسية',
    'view_all': 'عرض الكل',
    'app_goals': 'أهداف التطبيق',
    'goal_1': 'تمكين الرياضيين من الوصول لخطط تدريب احترافية.',
    'goal_2': 'نشر الوعي الثقافي حول التغذية الرياضية الصحيحة.',
    'goal_3': 'خلق مجتمع رياضي تفاعلي لتحفيز الاستمرارية.',
    'contact_us': 'تواصل معنا',
    'follow_us': 'تابعنا على',
    'logout': 'تسجيل الخروج',
  },
  en: {
    'home': 'Home',
    'education': 'Education',
    'programs': 'Programs',
    'nutrition': 'Nutrition',
    'profile': 'Profile',
    'settings': 'Settings',
    'language': 'Language',
    'english': 'English',
    'arabic': 'العربية',
    'overview': 'Overview',
    'about_program': 'About Program & Goals',
    'program_desc': 'We aim to provide the best sports educational curricula and customized nutritional programs to achieve your physical goals with the highest standards of scientific quality.',
    'completed_program': 'Completed',
    'goal_achieved': 'Goal Achieved',
    'continuous_days': 'Streak Days',
    'main_menu': 'Main Menu',
    'view_all': 'View All',
    'app_goals': 'App Goals',
    'goal_1': 'Empower athletes with professional training plans.',
    'goal_2': 'Spread cultural awareness about proper sports nutrition.',
    'goal_3': 'Create an interactive sports community to motivate continuity.',
    'contact_us': 'Contact Us',
    'follow_us': 'Follow Us',
    'logout': 'Logout',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
