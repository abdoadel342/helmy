import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { BackButton } from '../components/BackButton';
import SplitText from '../components/react-bits/SplitText';

export const articlesData = [
  {
    title: "تشريح الجهاز العضلي",
    description: "الدليل التقني المتكامل للرياضيين",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
    path: "/education/anatomy",
    icon: "anatomy",
    badge: "أساسي",
    badgeColor: "#ef4444"
  },
  {
    title: "الميكانيكية وعلم الحركة",
    description: "تعلم أساسيات حركة الجسم وتفاعل القوى",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80",
    path: "/education/biomechanics",
    icon: "engineering",
    badge: "متقدم",
    badgeColor: "#8b5cf6"
  },
  {
    title: "التغذية للرياضيين",
    description: "دليلك الشامل للغذاء الصحي والأداء العالي",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
    path: "/education/sports-nutrition",
    icon: "restaurant",
    badge: "مهم",
    badgeColor: "#22c55e"
  },
  {
    title: "التدريب الرياضي",
    description: "منهجيات التدريب الحديثة لرفع الكفاءة البدنية",
    image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80",
    path: "/education/training",
    icon: "fitness_center",
    badge: "أساسي",
    badgeColor: "#ef4444"
  },
  {
    title: "فسيولوجية الرياضة",
    description: "استجابة وتكيف أجهزة الجسم للجهد البدني",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80",
    path: "/education/physiology",
    icon: "monitor_heart",
    badge: "متقدم",
    badgeColor: "#8b5cf6"
  },
  {
    title: "سيكولوجية الرياضة",
    description: "العوامل النفسية المؤثرة على الأداء الرياضي",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=800&q=80",
    path: "/education/psychology",
    icon: "psychology",
    badge: "مميز",
    badgeColor: "#f59e0b"
  }
];

export default function Education() {
  const navigate = useNavigate();

  const articles = articlesData;

  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Header Section */}
      <header className="sticky top-0 z-10 glass border-b border-primary/10">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-slate-100" style={{ fontFamily: 'var(--font-heading)' }}>التعليم</h1>
          <BackButton />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {/* Hero Title */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 pt-8 pb-6">
            <SplitText
              text="المقالات التعليمية"
              className="text-3xl md:text-4xl font-black tracking-tight text-white animate-text-glow"
              delay={50} duration={1} ease="power3.out" splitType="words"
              from={{ opacity: 0, y: 30 }} to={{ opacity: 1, y: 0 }}
              threshold={0.1} rootMargin="-50px" textAlign="right" showCallback={false}
            />
            <p className="text-slate-500 dark:text-primary/60 mt-3 text-sm md:text-base leading-relaxed animate-text-slide-up" style={{ fontFamily: 'var(--font-body)' }}>
              اكتشف أحدث المعارف في العلوم الرياضية — من التشريح إلى السيكولوجيا
            </p>

            {/* Stats mini bar */}
            <div className="flex items-center gap-4 mt-5">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
                <span className="font-bold text-primary">{articles.length}</span> مقالات
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-700" />
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                محتوى علمي موثق
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Articles Grid - Web Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-4">
          {articles.map((article, index) => (
            <FadeContent key={index} blur={true} duration={1000} initialOpacity={0} delay={index * 100}>
              <div 
                className="web-card overflow-hidden cursor-pointer group h-full flex flex-col"
                onClick={() => article.path !== '#' && navigate(article.path)}
              >
                {/* Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#191022] via-transparent to-transparent" />
                  
                  {/* Badge */}
                  <span 
                    className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-lg text-white backdrop-blur-sm"
                    style={{ backgroundColor: `${article.badgeColor}cc` }}
                  >
                    {article.badge}
                  </span>

                  {/* Icon overlay */}
                  <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl glass-light flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>{article.icon}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-black text-white leading-tight group-hover:text-primary transition-colors mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-xs font-medium line-clamp-2 flex-1 leading-relaxed">
                    {article.description}
                  </p>
                  
                  {/* Action row */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-primary/5">
                    <div className="flex items-center gap-1.5 text-xs text-primary font-bold group-hover:gap-2.5 transition-all">
                      <span>اقرأ المزيد</span>
                      <span className="material-symbols-outlined text-sm">arrow_back</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-600">
                      <span className="material-symbols-outlined text-xs">schedule</span>
                      قراءة 5 دقائق
                    </div>
                  </div>
                </div>
              </div>
            </FadeContent>
          ))}
        </div>
      </main>
    </div>
  );
}
