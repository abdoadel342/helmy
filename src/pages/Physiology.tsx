import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { ShinyText } from '../components/react-bits/ShinyText';

export default function Physiology() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      {/* Header Section */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/20">
        <div className="flex items-center p-4 justify-between max-w-2xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="text-slate-900 dark:text-slate-100 p-2 hover:bg-primary/20 rounded-full transition-colors flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-2xl">arrow_forward</span>
          </button>
          <h1 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight flex-1 text-center">فسيولوجية الرياضة</h1>
          <div className="w-10"></div> {/* Spacer for balance */}
        </div>
      </header>

      <main className="max-w-2xl mx-auto pb-12 w-full">
        {/* Hero Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="@container">
            <div className="px-4 py-4">
              <div 
                className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl min-h-64 shadow-2xl shadow-primary/20 border border-primary/30" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB6hQY4nK8mNbkex_d7q6eGYWwdvMPfSsqRb_QJKdoltJ4HeWcouP8PW2V2tmBkXW6VqvT3M_IG6iPgFQj9mlMdS3Hp4CxuHWbnj39v8ViwWvPtm7s7V8n4wqAAIOZmp6PNowoeHk_2iQ1xdy4a8Trcw4xjy9WnzjVkBodzbEY2Y_0h80ZtV2i4eToTEXhuJ_g5rAPEs01PK5eMXYSZF_73cqHaTFYupzXpiyvpCVWR7WhM6yk-knsEv8Qfkm2K0dkIMA1I8jQE8psT")' }}
              >
                <div className="bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent p-6">
                  <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider">الدرس الأول</span>
                  <h2 className="text-white text-3xl font-bold leading-tight mb-2">
                    <ShinyText text="مقدمة في فسيولوجية الرياضة" disabled={false} speed={3} className="text-white" />
                  </h2>
                  <p className="text-slate-200 text-sm font-normal leading-relaxed opacity-90">
                    تدرس فسيولوجية الرياضة كيفية استجابة الجسم وتكيفه مع الجهد البدني، وكيفية عمل الأعضاء والأنظمة المختلفة تحت الضغط الحركي لتحسين الأداء الرياضي.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Section 1: Energy Systems */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 pt-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-primary/20 p-2 rounded-lg">
                <span className="material-symbols-outlined text-primary font-bold">bolt</span>
              </div>
              <h3 className="text-slate-900 dark:text-slate-100 text-xl font-bold">أنظمة إنتاج الطاقة</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Anaerobic */}
              <SpotlightCard className="bg-white dark:bg-primary/10 border border-primary/20 rounded-xl p-5" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-slate-900 dark:text-slate-100">النظام اللاهوائي</span>
                  <span className="material-symbols-outlined text-red-500 dark:text-red-400">timer</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">يعتمد على مصادر الطاقة المخزنة في العضلات دون الحاجة للأكسجين. مثالي للأنشطة عالية الكثافة والقصيرة.</p>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-3/4"></div>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">كثافة عالية (0-2 دقيقة)</span>
              </SpotlightCard>
              
              {/* Aerobic */}
              <SpotlightCard className="bg-white dark:bg-primary/10 border border-primary/20 rounded-xl p-5" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-slate-900 dark:text-slate-100">النظام الهوائي</span>
                  <span className="material-symbols-outlined text-cyan-500 dark:text-cyan-400">air</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">يعتمد على الأكسجين لحرق الكربوهيدرات والدهون لإنتاج طاقة مستدامة. مثالي للأنشطة طويلة المدى.</p>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                  <div className="bg-cyan-500 h-2 rounded-full w-full"></div>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">كثافة متوسطة (أكثر من 2 دقيقة)</span>
              </SpotlightCard>
            </div>
          </section>
        </FadeContent>

        {/* Section 2: Cardiovascular */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 pt-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-primary/20 p-2 rounded-lg">
                <span className="material-symbols-outlined text-primary font-bold">favorite</span>
              </div>
              <h3 className="text-slate-900 dark:text-slate-100 text-xl font-bold">التكيف القلبي الوعائي</h3>
            </div>
            <div className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-background-dark border border-primary/20 p-1">
              <div 
                className="aspect-video w-full rounded-lg overflow-hidden relative" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAToUR5Tgwc9S1OOM67P8yuEQAR8VVy_7fNYH7JpgzF3eyhgRykwHrsu5-CoA8lSXglVTPPqUTXM8JF6H2ckt-cdc6SVeYEf0C5JFnHA6gORaefCk6EHgCYPRHYzmxqc2vQ368AcoQUPaz-YhfNOolVL89vZU9HUYln13vZ7nl094__jPbeGOt_m4eJF0mPJwvVkWktmJmrGv0w93Mmoxdq7kc2Z3ez0niCw6FoaqFKv0TOOfs22oKcQRGnswZDUe-DMneBkHSKDsKC")', backgroundSize: 'cover' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-background-dark/80 to-transparent flex flex-col justify-center p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-slate-100">
                      <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span>
                      <span className="text-sm font-medium">زيادة حجم ضربة القلب (Stroke Volume)</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-100">
                      <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span>
                      <span className="text-sm font-medium">انخفاض معدل ضربات القلب أثناء الراحة</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-100">
                      <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span>
                      <span className="text-sm font-medium">تحسين كفاءة الشعيرات الدموية</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Section 3: Hormonal & Muscular */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 pt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hormonal Response */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-primary font-bold">science</span>
                </div>
                <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold">الاستجابة الهرمونية</h3>
              </div>
              <div className="space-y-3">
                <SpotlightCard className="bg-white dark:bg-primary/5 p-3 rounded-lg flex items-center justify-between border border-primary/10" spotlightColor="rgba(115, 17, 212, 0.15)">
                  <div>
                    <span className="text-sm font-bold block text-slate-900 dark:text-slate-100">تستوستيرون</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">تحفيز البناء العضلي والتعافي</span>
                  </div>
                  <span className="material-symbols-outlined text-primary">trending_up</span>
                </SpotlightCard>
                <SpotlightCard className="bg-white dark:bg-primary/5 p-3 rounded-lg flex items-center justify-between border border-primary/10" spotlightColor="rgba(115, 17, 212, 0.15)">
                  <div>
                    <span className="text-sm font-bold block text-slate-900 dark:text-slate-100">الكورتيزول</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">تنظيم استهلاك الطاقة خلال الإجهاد</span>
                  </div>
                  <span className="material-symbols-outlined text-orange-500 dark:text-orange-400">warning</span>
                </SpotlightCard>
              </div>
            </section>

            {/* Muscular Adaptation */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-primary font-bold">fitness_center</span>
                </div>
                <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold">التكيف العضلي</h3>
              </div>
              <div 
                className="relative rounded-xl overflow-hidden h-32 border border-primary/20" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB_wIdWvGktOdq9NTJRdJfdvfUNvmSDE_1gbKNfMGnLSzQUnQaRDau6ZSwO08n3HQ5CI0gJJkW7wjGtb-TdahK4H00PVL-s7bj5RR03sg4bzJH68j3yM7Cx29YsjpktoYdyLxKMa-LK06MhFTpBU0xWNQ_R8jXwGrqH-6jtkjWt2Y8-8Jloj6gk4kP-huYbyHZrMDQm7opCd4hHcUEwOIexMYLGRvnSRSOYLY44SSd8G5xtur6IoaGvZ5EWbg-LVmmNRwALQwmMzh7T")', backgroundSize: 'cover' }}
              >
                <div className="absolute inset-0 bg-primary/60 dark:bg-primary/40 flex items-center justify-center">
                  <p className="text-center text-white px-4 text-xs font-bold leading-relaxed">تضخم الألياف العضلية وزيادة عدد الميتوكوندريا لإنتاج طاقة أكبر.</p>
                </div>
              </div>
            </section>
          </div>
        </FadeContent>

        {/* Call to Action / Assessment */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="mx-4 mt-12 mb-8 p-6 bg-primary rounded-2xl flex flex-col items-center text-center shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-white text-4xl mb-3">quiz</span>
            <h4 className="text-white text-xl font-bold mb-2">اختبر معلوماتك</h4>
            <p className="text-white/80 text-sm mb-5">هل أنت مستعد لتقييم فهمك لمبادئ الفسيولوجيا الرياضية؟</p>
            <button className="bg-white text-primary font-bold py-3 px-8 rounded-xl w-full hover:bg-slate-50 transition-colors shadow-md">
              ابدأ الاختبار القصير
            </button>
          </div>
        </FadeContent>
      </main>
    </div>
  );
}
