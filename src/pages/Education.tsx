import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { BackButton } from '../components/BackButton';

export default function Education() {
  const navigate = useNavigate();

  const articles = [
    {
      title: "تشريح الجهاز العضلي",
      description: "الدليل التقني المتكامل للرياضيين",
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
      path: "/education/anatomy"
    },
    {
      title: "الميكانيكية وعلم الحركة",
      description: "تعلم أساسيات حركة الجسم وتفاعل القوى",
      image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80",
      path: "/education/biomechanics"
    },
    {
      title: "التغذية للرياضيين",
      description: "دليلك الشامل للغذاء الصحي والأداء العالي",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
      path: "/education/sports-nutrition"
    },
    {
      title: "التدريب الرياضي",
      description: "منهجيات التدريب الحديثة لرفع الكفاءة البدنية",
      image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80",
      path: "/education/training"
    },
    {
      title: "فسيولوجية الرياضة",
      description: "استجابة وتكيف أجهزة الجسم للجهد البدني",
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80",
      path: "/education/physiology"
    },
    {
      title: "سيكولوجية الرياضة",
      description: "العوامل النفسية المؤثرة على الأداء الرياضي",
      image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=800&q=80",
      path: "/education/psychology"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Header Section */}
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">التعليم</h1>
          <BackButton />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {/* Hero Title */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 pt-8 pb-6">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">المقالات التعليمية</h2>
            <p className="text-slate-500 dark:text-primary/60 mt-2">اكتشف أحدث المعارف في العلوم الرياضية</p>
          </div>
        </FadeContent>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {articles.map((article, index) => (
            <FadeContent key={index} blur={true} duration={1000} initialOpacity={0} delay={index * 100}>
              <SpotlightCard 
                className="flex items-center gap-4 bg-white dark:bg-primary/5 p-4 rounded-2xl border border-primary/10 cursor-pointer group h-full"
                spotlightColor="rgba(115, 17, 212, 0.15)"
                onClick={() => article.path !== '#' && navigate(article.path)}
              >
                <div className="relative shrink-0">
                  <div 
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl size-20 shadow-lg shadow-primary/10 group-hover:shadow-primary/30 transition-shadow" 
                    style={{ backgroundImage: `url("${article.image}")` }}
                  ></div>
                </div>
                <div className="flex flex-col flex-1 justify-center">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-slate-900 dark:text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors">{article.title}</p>
                    <span className="material-symbols-outlined text-primary/50 group-hover:text-primary transition-colors text-xl">chevron_left</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-normal line-clamp-2">{article.description}</p>
                </div>
              </SpotlightCard>
            </FadeContent>
          ))}
        </div>
      </main>
    </div>
  );
}
