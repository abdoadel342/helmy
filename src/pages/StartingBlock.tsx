import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { ShinyText } from '../components/react-bits/ShinyText';
import { StarBorder } from '../components/react-bits/StarBorder';
import { useStartWorkout } from '../useStartWorkout';

export default function StartingBlock() {
  const navigate = useNavigate();
  const { isStarting, workoutStarted, handleStartWorkout } = useStartWorkout();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-x-hidden font-display">
      {/* Header */}
      <header className="flex items-center bg-background-light dark:bg-background-dark p-4 sticky top-0 z-50 border-b border-primary/10">
        <button 
          onClick={() => navigate(-1)}
          className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-primary/20 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-slate-900 dark:text-white">arrow_forward</span>
        </button>
        <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight flex-1 text-center mr-[-40px]">تمارين الانطلاق من البدء</h1>
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold text-sm tracking-widest">HELMY</span>
        </div>
      </header>

      <main className="flex-1 pb-12 max-w-2xl mx-auto w-full">
        {/* Hero Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="@container px-4 py-3">
            <div 
              className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-slate-800 rounded-xl min-h-[300px] relative group border border-primary/20 shadow-2xl" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAd0PXXf97gVtexpRDYSqUJEjJZ3hpY3x94ZwoF9tsNfwH8YXVUc1v0lJClz8bcnnxjDtwN2Z-C4zrQ376hhVUdjr9tcCDNx-MuqPrw9WRtkMDMhWGVXAttM7lLMCu0P2PIoc5FdWXTRZTc6RFcMp8gGuqjI0mo7yJF1bYAKYJiEX0t9rqOQG9I4sxZcTGYNbcyyvTPwjOywTEDDE0eZ72MnAE022Ua75jjo0OqPOj91gZZ-LceKyhYsxgBklUi9JOxLr_3E8gtbJMK")' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80"></div>
              <div className="relative p-6">
                <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-2">
                  <ShinyText text="دليل تقني" disabled={false} speed={3} className="text-white" />
                </span>
                <h2 className="text-white text-3xl font-bold leading-tight">إتقان وضعية البدء</h2>
                <p className="text-slate-300 text-sm mt-1">تعلّم تقنيات الانطلاق السريع من المكعبات</p>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* The Three Commands Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="p-4">
            <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight mb-4">الأوامر الثلاثة</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Take your marks */}
              <SpotlightCard className="!p-5 !bg-white dark:!bg-primary/5 !border-primary/20 hover:!border-primary/40 transition-colors !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex flex-col gap-3">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">hail</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold">خذ مكانك</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">ثبّت القدمين بقوة على المكعبات، الركبة الخلفية تلمس الأرض، واليدين خلف خط البداية باتساع الكتفين.</p>
                  </div>
                </div>
              </SpotlightCard>

              {/* Set */}
              <SpotlightCard className="!p-5 !bg-white dark:!bg-primary/5 !border-primary/20 hover:!border-primary/40 transition-colors !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex flex-col gap-3">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">trending_up</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold">استعد</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">ارفع الحوض تدريجياً، زاوية الركبة الأمامية 90 درجة والخلفية 120 درجة. حافظ على سكونك التام.</p>
                  </div>
                </div>
              </SpotlightCard>

              {/* Go */}
              <SpotlightCard className="!p-5 !bg-white dark:!bg-primary/5 !border-primary/20 hover:!border-primary/40 transition-colors !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex flex-col gap-3">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">bolt</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold">انطلق</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">دفع انفجاري من المكعبات مع مرجحة قوية للذراعين. حافظ على وضعية الرأس منخفضة في أول 10 أمتار.</p>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </section>
        </FadeContent>

        {/* Anatomy of the start */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="p-4 bg-primary/5 my-4 mx-4 rounded-2xl border border-primary/10">
            <h3 className="text-slate-900 dark:text-white text-xl font-bold leading-tight mb-4">تشريح وضعية الانطلاق</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div 
                className="relative rounded-xl overflow-hidden aspect-video bg-slate-900 shadow-lg" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAMe3mJq-1-L2aMrg9yKx6lqiKXjwL7hb2I1gGGON56ucKMpfdfEsobRumJznTkLODrZgzHt1E97RhatWLz8OyMVVN7Lg3w1E8SeYeTgZNbAzrgn3buK1G2lGrd8v-wY_JdtZ3bkr9Vg4qvrSkrld6IiOYqPPeJna52jZhDm1llHk4F5y02jQIB0LP7s05IsnTLYihAolJoGCaZaCkdGIlPj4h88NZOwfqAEtQeeCcTVF2vXz0HtsFLwnLzHJifBUbBvBoZS5lhNHcs')", backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="absolute inset-0 bg-primary/10"></div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-1">1</span>
                  <div>
                    <p className="font-bold dark:text-white">زوايا الركبة</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">90 درجة للرجل القائدة و120 درجة للرجل الخلفية لتوليد أقصى قوة دفع.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-1">2</span>
                  <div>
                    <p className="font-bold dark:text-white">تمركز الذراعين</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">يجب أن تكون اليدين أوسع قليلاً من الكتفين مع توزيع الوزن على الأصابع (شكل جسر).</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-1">3</span>
                  <div>
                    <p className="font-bold dark:text-white">وضعية الرأس</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">النظر للأسفل قليلاً أمام خط البداية. تجنب رفع الرأس للأعلى لعدم إعاقة انسيابية الجسم.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Reaction Time Drills */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="p-4">
            <h3 className="text-slate-900 dark:text-white text-xl font-bold leading-tight mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">timer</span>
              تمارين سرعة الاستجابة
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <SpotlightCard className="!p-4 !bg-white dark:!bg-primary/10 !border-primary/10 hover:!border-primary/30 transition-colors !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                <p className="text-primary font-bold mb-1">صافرة مفاجئة</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">الانطلاق عند سماع صوت عشوائي لتحسين زمن الفعل.</p>
              </SpotlightCard>
              <SpotlightCard className="!p-4 !bg-white dark:!bg-primary/10 !border-primary/10 hover:!border-primary/30 transition-colors !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                <p className="text-primary font-bold mb-1">استجابة بصرية</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">الانطلاق عند رؤية وميض ضوئي أو إشارة بصرية.</p>
              </SpotlightCard>
            </div>
          </section>
        </FadeContent>

        {/* Common Mistakes */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="p-4">
            <div className="bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 rounded-xl p-5">
              <h3 className="text-red-600 dark:text-red-500 text-lg font-bold mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined">warning</span>
                أخطاء شائعة يجب تجنبها
              </h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex gap-2">
                  <span className="text-red-500">•</span>
                  رفع الحوض عالياً جداً في وضعية "استعد" مما يقلل قوة الدفع.
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">•</span>
                  الوقوف المباشر بعد الانطلاق (Pop-up) بدلاً من البقاء بوضعية مائلة.
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">•</span>
                  توزيع الوزن بالكامل على اليدين مما يسبب اختلال التوازن.
                </li>
              </ul>
            </div>
          </section>
        </FadeContent>

        {/* Action Button */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 pb-8 mt-4">
            <StarBorder as="button" color={workoutStarted ? '#10b981' : '#7311d4'} speed="4s" className="w-full" onClick={() => handleStartWorkout('برنامج السرعة واللياقة', 'تمارين الانطلاق من البدء')} disabled={isStarting || workoutStarted}>
              <div className="flex items-center justify-center gap-2 font-bold">
                {isStarting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : workoutStarted ? (
                  <><span className="material-symbols-outlined">check_circle</span><span>تم تسجيل التدريب بنجاح!</span></>
                ) : (
                  <><span className="material-symbols-outlined">directions_run</span><span>ابدأ التدريب الآن</span></>
                )}
              </div>
            </StarBorder>
          </div>
        </FadeContent>
      </main>
    </div>
  );
}
