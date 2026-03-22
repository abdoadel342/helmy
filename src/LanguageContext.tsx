import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Menu & Navigation
    'home': 'الرئيسية',
    'education': 'التعليم',
    'programs': 'البرامج',
    'nutrition': 'التغذية',
    'profile': 'الحساب',
    'settings': 'الإعدادات',
    'language': 'اللغة',
    'english': 'English',
    'arabic': 'العربية',
    'main_menu': 'القائمة الرئيسية',
    'view_all': 'عرض الكل',
    'logout': 'تسجيل الخروج',
    'back': 'الرجوع',
    'back_to_programs': 'العودة للبرامج',
    
    // Home Page
    'overview': 'نظرة عامة',
    'about_program': 'عن البرنامج والأهداف',
    'program_desc': 'نحن نهدف إلى تقديم أفضل المناهج التعليمية الرياضية والبرامج الغذائية المخصصة لتحقيق أهدافك البدنية بأعلى معايير الجودة العلمية.',
    'app_goals': 'أهداف التطبيق',
    'goal_1': 'تمكين الرياضيين من الوصول لخطط تدريب احترافية.',
    'goal_2': 'نشر الوعي الثقافي حول التغذية الرياضية الصحيحة.',
    'goal_3': 'خلق مجتمع رياضي تفاعلي لتحفيز الاستمرارية.',
    'contact_us': 'تواصل معنا',
    
    // Programs Page
    'training_programs': 'البرامج التدريبية',
    'choose_path': 'اختر مساراً متخصصاً بناءً على أهدافك الحالية.',
    'goal': 'الهدف',
    'duration': 'المدة',
    'level': 'المستوى',
    'weeks': 'الأسابيع',
    
    // Plyometrics (Prog 004)
    'comprehensive_guide': 'دليل تدريبي شامل',
    'scientific_terms': 'التعريفات والمفاهيم الأساسية',
    'ssc_title': 'دورة التمدد والتقلص (SSC) — الأساس العلمي',
    'ssc_desc': 'تعتمد تمارين البليومتريك على مبدأ علمي يُعرف بدورة التمدد والتقلص. تعمل هذه العملية على تخزين الطاقة المرنة في العضلات، ثم إطلاقها بشكل مفاجئ لتعزيز القدرة على القفز.',
    'eccentric_phase': 'المرحلة اللامركزية',
    'amortization_phase': 'مرحلة الإطفاء',
    'concentric_phase': 'المرحلة المركزية',
    'exercise_library': 'مكتبة التمارين البليومترية',
    'lower_body': 'تمارين الجزء السفلي',
    'upper_body': 'تمارين الجزء العلوي والجذع',
    'training_protocol': 'بروتوكول التدريب الأسبوعي',
    'reset': 'إعادة تعيين',
    'sets': 'المجموعات',
    'reps': 'التكرارات',
    'target_muscles': 'العضلات العاملة في التدريب البليومتري',
    'primary_movers': 'الطرف السفلي (محركات أولية)',
    'core_muscles': 'العضلات المساعدة (الجذع)',
    'upper_extremity': 'الطرف العلوي',
    'safety_guidelines': 'إرشادات السلامة والتأهيل',
    'prerequisites': 'متطلبات ما قبل التدريب',
    'golden_rules': 'قواعد السلامة الذهبية',
    'pro_tips': 'نصائح المحترفين',
    'tempo': 'الرتم',
    'coach_note': 'نصيحة المدرب',
    'complete_workout': 'إنهاء التمرين وحفظ التقدم',
    'workout_completed': 'تم إنجاز تمرين اليوم بنجاح!',
    'complete_rest': 'تأكيد إتمام يوم الراحة',
    'rest_time': 'الراحة',
    'weight_perc': '%1RM',
    'rpe': 'RPE',
    'type': 'النوع',
    'set_num': 'المجموعة',
    
    // Week control
    'add_week': '+ أسبوع',
    'remove_week': '- أسبوع',
    'week_label': 'الأسبوع'
  },
  en: {
    // Menu & Navigation
    'home': 'Home',
    'education': 'Education',
    'programs': 'Programs',
    'nutrition': 'Nutrition',
    'profile': 'Profile',
    'settings': 'Settings',
    'language': 'Language',
    'english': 'English',
    'arabic': 'العربية',
    'main_menu': 'Main Menu',
    'view_all': 'View All',
    'logout': 'Logout',
    'back': 'Back',
    'back_to_programs': 'Back to Programs',
    
    // Home Page
    'overview': 'Overview',
    'about_program': 'About Program & Goals',
    'program_desc': 'We aim to provide the best sports educational curricula and customized nutritional programs to achieve your physical goals with the highest standards of scientific quality.',
    'app_goals': 'App Goals',
    'goal_1': 'Empower athletes with professional training plans.',
    'goal_2': 'Spread cultural awareness about proper sports nutrition.',
    'goal_3': 'Create an interactive sports community to motivate continuity.',
    'contact_us': 'Contact Us',

    // Programs Page
    'training_programs': 'Training Programs',
    'choose_path': 'Choose a specialized path based on your current goals.',
    'goal': 'Goal',
    'duration': 'Duration',
    'level': 'Level',
    'weeks': 'Weeks',
    
    // Plyometrics (Prog 004)
    'comprehensive_guide': 'Comprehensive Training Guide',
    'scientific_terms': 'Definitions & Basic Concepts',
    'ssc_title': 'Stretch-Shortening Cycle (SSC) — Scientific Basis',
    'ssc_desc': 'Plyometric exercises rely on a scientific principle known as the stretch-shortening cycle. This process stores elastic energy in muscles, then releases it suddenly to enhance jumping ability.',
    'eccentric_phase': 'Eccentric Phase',
    'amortization_phase': 'Amortization Phase',
    'concentric_phase': 'Concentric Phase',
    'exercise_library': 'Plyometric Exercise Library',
    'lower_body': 'Lower Body Exercises',
    'upper_body': 'Upper Body & Core Exercises',
    'training_protocol': 'Weekly Training Protocol',
    'reset': 'Reset',
    'sets': 'Sets',
    'reps': 'Reps',
    'target_muscles': 'Target Muscles in Plyometric Training',
    'primary_movers': 'Lower Extremity (Primary Movers)',
    'core_muscles': 'Assisting Muscles (Core)',
    'upper_extremity': 'Upper Extremity',
    'safety_guidelines': 'Safety & Conditioning Guidelines',
    'prerequisites': 'Pre-Training Prerequisites',
    'golden_rules': 'Golden Safety Rules',
    'pro_tips': 'Pro Tips',
    'tempo': 'Tempo',
    'coach_note': 'Coach Note',
    'complete_workout': 'Finish Workout & Save Progress',
    'workout_completed': 'Today\'s workout completed successfully!',
    'complete_rest': 'Confirm Rest Day Completion',
    'rest_time': 'Rest',
    'weight_perc': '%1RM',
    'rpe': 'RPE',
    'type': 'Type',
    'set_num': 'Set',
    
    // Week control
    'add_week': '+ Week',
    'remove_week': '- Week',
    'week_label': 'Week'
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
