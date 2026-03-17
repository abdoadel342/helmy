import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { ShinyText } from '../components/react-bits/ShinyText';

export default function Biomechanics() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 selection:bg-primary/30">
      {/* Top App Bar */}
      <header className="flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 sticky top-0 z-50 border-b border-primary/10">
        <button 
          onClick={() => navigate(-1)}
          className="text-primary flex size-10 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-primary/10 transition-colors"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>arrow_forward</span>
        </button>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 mr-4">الميكانيكية وعلم الحركة</h2>
        <button className="text-primary flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-primary/10 rounded-full transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>share</span>
        </button>
      </header>

      <div className="flex-1 pb-12">
        {/* Hero Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="@container">
            <div className="@[480px]:px-4 @[480px]:py-6">
              <div 
                className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-primary/20 @[480px]:rounded-2xl min-h-72 relative group shadow-lg" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA4b5HnyIozkdfc_5d0pX3CIE_8ongjp6LmP9RL7Yk9bUvZUBwPsxsT2y7x_7i1jmJjCFcy7lQ4c8oC39UZg6YS5L64AEAVtS_EjlByfUEECvnwm94Pp-e2yPO1E_lGEkwAw9e52Q2DWZNNUfHBufTde1H824-gomospRrfB3PLCrlbHVRXODyf3jMvCMPSPV0tWTPQyprVt5GSN8fAyut_bp_A66yeImlkceTXm3s_MeKXxegb4dXPL4bsOMF1Fm0fffdliOeElmW1")' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                <div className="relative p-6 z-10">
                  <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-3 shadow-sm">
                    دليل الخبراء
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold leading-tight text-white mb-2">
                    <ShinyText text="ما هي الميكانيكا الحيوية؟" disabled={false} speed={3} className="text-white" />
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Introduction */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-6 max-w-3xl mx-auto">
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              الميكانيكا الحيوية هي دراسة بنية ووظيفة الأنظمة البيولوجية باستخدام أساليب الميكانيكا. في الرياضة، تساعدنا على فهم كيفية تحرك الجسم وكيفية تحسين الأداء وتقليل مخاطر الإصابة من خلال تحليل القوى المؤثرة على الجسم.
            </p>
          </section>
        </FadeContent>

        {/* Key Concepts Grid */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-4 max-w-3xl mx-auto">
            <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-primary rounded-full"></span>
              المفاهيم الأساسية
            </h2>
            <div className="grid gap-4">
              {/* Card 1 */}
              <SpotlightCard className="bg-white dark:bg-primary/5 border border-primary/10 rounded-xl p-5 flex gap-4 items-start h-full" spotlightColor="rgba(115, 17, 212, 0.1)">
                <div className="bg-primary/10 p-3 rounded-lg text-primary shrink-0">
                  <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>speed</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">قوانين الحركة</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">تطبيق قوانين نيوتن لفهم كيفية توليد القوة والسرعة في التمارين الرياضية المختلفة مثل الجري والقفز.</p>
                </div>
              </SpotlightCard>
              
              {/* Card 2 */}
              <SpotlightCard className="bg-white dark:bg-primary/5 border border-primary/10 rounded-xl p-5 flex gap-4 items-start h-full" spotlightColor="rgba(115, 17, 212, 0.1)">
                <div className="bg-primary/10 p-3 rounded-lg text-primary shrink-0">
                  <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>fitness_center</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">الروافع والقوة العضلية</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">فهم كيفية عمل المفاصل كأنظمة روافع لزيادة الكفاءة الميكانيكية وتقليل العبء على الأوتار.</p>
                </div>
              </SpotlightCard>

              {/* Card 3 */}
              <SpotlightCard className="bg-white dark:bg-primary/5 border border-primary/10 rounded-xl p-5 flex gap-4 items-start h-full" spotlightColor="rgba(115, 17, 212, 0.1)">
                <div className="bg-primary/10 p-3 rounded-lg text-primary shrink-0">
                  <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>balance</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">مركز الثقل والتوازن</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">كيفية الحفاظ على الاستقرار أثناء الحركات المعقدة بتعديل وضعية الجسم بالنسبة لمركز الجاذبية.</p>
                </div>
              </SpotlightCard>
            </div>
          </section>
        </FadeContent>

        {/* Practical Application */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="mt-8 px-4 max-w-3xl mx-auto">
            <div className="bg-primary rounded-2xl p-6 text-white overflow-hidden relative shadow-xl">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-2xl">lightbulb</span>
                  التطبيق العملي
                </h2>
                <p className="text-white/90 mb-6 text-sm leading-relaxed">
                  استخدم هذه المبادئ لتحسين تكنيك التمرين الخاص بك:
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-white/70 shrink-0 mt-0.5">check_circle</span>
                    <span className="text-sm font-medium">عدل وضعية قدميك لتوسيع قاعدة الارتكاز وزيادة التوازن.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-white/70 shrink-0 mt-0.5">check_circle</span>
                    <span className="text-sm font-medium">استخدم المدى الحركي الكامل لتعظيم عمل الروافع العضلية.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-white/70 shrink-0 mt-0.5">check_circle</span>
                    <span className="text-sm font-medium">ركز على توزيع الوزن بالتساوي لتقليل الضغط على المفاصل.</span>
                  </li>
                </ul>
                
                <button className="mt-8 w-full py-3 bg-white text-primary font-bold rounded-xl hover:bg-slate-100 transition-colors shadow-md">
                  ابدأ تحليل حركتك الآن
                </button>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Detailed Content List */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-8 max-w-3xl mx-auto">
            <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold mb-4">مقالات ذات صلة</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-primary/5 dark:bg-primary/10 rounded-lg border-r-4 border-primary cursor-pointer hover:bg-primary/10 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">menu_book</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">تحليل القرفصاء (Squat) ميكانيكياً</span>
                </div>
                <span className="material-symbols-outlined text-slate-400">chevron_left</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-primary/5 dark:bg-primary/10 rounded-lg border-r-4 border-primary cursor-pointer hover:bg-primary/10 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">menu_book</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">ديناميكا السوائل في السباحة</span>
                </div>
                <span className="material-symbols-outlined text-slate-400">chevron_left</span>
              </div>
            </div>
          </section>
        </FadeContent>
      </div>
    </div>
  );
}

