import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';

export default function FatLossPlan() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 px-4 py-4 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20"
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <h1 className="text-lg font-bold">خطة خسارة الدهون</h1>
        <div className="w-10 flex items-center justify-center text-primary font-bold text-xl italic">
          HELMY
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6 space-y-6">
        {/* Macros Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">الأهداف اليومية (الماكروز)</h2>
              <span className="text-xs text-slate-500">تم استهلاك 70% اليوم</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex flex-col items-center">
                <div className="relative w-16 h-16 flex items-center justify-center mb-2">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-primary/10" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="4"></circle>
                    <circle className="text-primary" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeDasharray="175.9" strokeDashoffset="52.7" strokeWidth="4"></circle>
                  </svg>
                  <span className="absolute text-xs font-bold">1800</span>
                </div>
                <p className="text-sm font-medium opacity-80">السعرات</p>
              </div>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex flex-col items-center">
                <div className="relative w-16 h-16 flex items-center justify-center mb-2">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-primary/10" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="4"></circle>
                    <circle className="text-primary" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeDasharray="175.9" strokeDashoffset="35.1" strokeWidth="4"></circle>
                  </svg>
                  <span className="absolute text-xs font-bold">150 جم</span>
                </div>
                <p className="text-sm font-medium opacity-80">بروتين</p>
              </div>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex flex-col items-center">
                <div className="relative w-16 h-16 flex items-center justify-center mb-2">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-primary/10" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="4"></circle>
                    <circle className="text-primary" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeDasharray="175.9" strokeDashoffset="87.9" strokeWidth="4"></circle>
                  </svg>
                  <span className="absolute text-xs font-bold">120 جم</span>
                </div>
                <p className="text-sm font-medium opacity-80">كارب</p>
              </div>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex flex-col items-center">
                <div className="relative w-16 h-16 flex items-center justify-center mb-2">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-primary/10" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="4"></circle>
                    <circle className="text-primary" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeDasharray="175.9" strokeDashoffset="105.5" strokeWidth="4"></circle>
                  </svg>
                  <span className="absolute text-xs font-bold">60 جم</span>
                </div>
                <p className="text-sm font-medium opacity-80">دهون</p>
              </div>
            </div>
            <div className="mt-6 bg-primary/10 p-4 rounded-xl space-y-2">
              <div className="flex justify-between text-sm">
                <span>إجمالي السعرات المستهلكة</span>
                <span>1260 / 1800 سعرة</span>
              </div>
              <div className="w-full bg-primary/20 h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[70%]"></div>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Meal Schedule */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section>
            <h2 className="text-xl font-bold mb-4">وجبات اليوم</h2>
            <div className="space-y-4 relative before:content-[''] before:absolute before:right-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-primary/20">
              {/* Breakfast */}
              <div className="relative pr-8">
                <div className="absolute right-1.5 top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-background-light dark:ring-background-dark"></div>
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-primary">الإفطار</h3>
                    <span className="text-xs opacity-60">08:00 AM</span>
                  </div>
                  <p className="text-sm leading-relaxed">أومليت بالخضار مع قطعة صغيرة من خبز القمح الكامل.</p>
                </div>
              </div>
              {/* Snack 1 */}
              <div className="relative pr-8">
                <div className="absolute right-1.5 top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-background-light dark:ring-background-dark"></div>
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-primary">وجبة خفيفة 1</h3>
                    <span className="text-xs opacity-60">11:00 AM</span>
                  </div>
                  <p className="text-sm leading-relaxed">حفنة من المكسرات أو حبة فاكهة واحدة.</p>
                </div>
              </div>
              {/* Lunch */}
              <div className="relative pr-8">
                <div className="absolute right-1.5 top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-background-light dark:ring-background-dark"></div>
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-primary">الغداء</h3>
                    <span className="text-xs opacity-60">02:00 PM</span>
                  </div>
                  <p className="text-sm leading-relaxed">صدر دجاج مشوي مع سلطة وحصة صغيرة من الأرز البني.</p>
                </div>
              </div>
              {/* Pre-workout */}
              <div className="relative pr-8">
                <div className="absolute right-1.5 top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-background-light dark:ring-background-dark"></div>
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-primary">وجبة ما قبل التمرين</h3>
                    <span className="text-xs opacity-60">05:00 PM</span>
                  </div>
                  <p className="text-sm leading-relaxed">قهوة سوداء مع حبة تمر واحدة.</p>
                </div>
              </div>
              {/* Dinner */}
              <div className="relative pr-8">
                <div className="absolute right-1.5 top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-background-light dark:ring-background-dark"></div>
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-primary">العشاء</h3>
                    <span className="text-xs opacity-60">08:30 PM</span>
                  </div>
                  <p className="text-sm leading-relaxed">سمك أبيض مشوي أو تونة مع سلطة خضراء كبيرة.</p>
                </div>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Tips Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="bg-primary/20 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">lightbulb</span>
              نصائح خسارة الدهون
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1 text-sm">check_circle</span>
                <p className="text-sm">زيادة تناول الألياف لتحسين الهضم والشعور بالشبع.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1 text-sm">check_circle</span>
                <p className="text-sm">زيادة عدد الخطوات اليومية (على الأقل 10 آلاف خطوة).</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1 text-sm">check_circle</span>
                <p className="text-sm">الالتزام بشرب الماء باستمرار طوال اليوم.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1 text-sm">check_circle</span>
                <p className="text-sm">إعطاء الأولوية للنوم الكافي (7-8 ساعات) لضبط الهرمونات.</p>
              </li>
            </ul>
          </section>
        </FadeContent>
      </div>
    </div>
  );
}
