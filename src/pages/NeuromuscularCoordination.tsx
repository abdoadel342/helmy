import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { ShinyText } from '../components/react-bits/ShinyText';
import { StarBorder } from '../components/react-bits/StarBorder';

export default function NeuromuscularCoordination() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-x-hidden font-display">
      {/* TopAppBar */}
      <header className="flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 sticky top-0 z-50 border-b border-primary/10 justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <h1 className="text-lg font-bold leading-tight tracking-[-0.015em]">التوافق العصبي العضلي</h1>
        </div>
        <button className="p-2 hover:bg-primary/10 rounded-full transition-colors">
          <span className="material-symbols-outlined">share</span>
        </button>
      </header>

      <main className="flex-1 pb-12 max-w-4xl mx-auto w-full">
        {/* Hero Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="@container px-4 py-4">
            <div 
              className="relative w-full aspect-video @[480px]:rounded-xl overflow-hidden shadow-2xl shadow-primary/20 group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10"></div>
              <div 
                className="w-full h-full bg-center bg-no-repeat bg-cover transform group-hover:scale-105 transition-transform duration-700" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC48ZJJ_VhYoiUFPcTQ6v6G8_Il2e2Jl-S4H6M0YH4sJtMYhZQkX3KzfWQSzFP6xX-yfrbnvKuh_77YmInhNtqYWkPOYCWWwnDrgDLrC2MDXOk5YtJNZESjqb49c6IpizmaEOsLDFCylQ8zUD3EirqO_qXHuGKL_vKtWuMpLRcpu3f6SqnIWj09CMRDHN4Ol8Klc4w0c_qEj2BlcRmNfVRu5x7DoSkUFUL1_KmkGERlWpW1nYQKZ6NLdughdlIueCuXr_nvOFnslvIf")' }}
              ></div>
              <div className="absolute bottom-4 right-4 z-20">
                <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  <ShinyText text="تدريب متقدم" disabled={false} speed={3} className="text-white" />
                </span>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Definition Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-6">
            <div className="bg-primary/5 border-r-4 border-primary p-6 rounded-l-lg">
              <h2 className="text-primary text-xl font-bold leading-tight tracking-[-0.015em] mb-3">ما هو التوافق العصبي العضلي؟</h2>
              <p className="text-slate-700 dark:text-slate-300 text-base font-normal leading-relaxed">
                هو مدى قدرة الجهاز العصبي على إرسال إشارات دقيقة للعضلات لتنفيذ حركة معينة بتناغم وتوقيت مثالي. يمثل "الجسر" الذي يربط بين العقل والجسم، مما يعزز الكفاءة الحركية ويقلل من خطر الإصابات عبر تحسين الاستجابة اللحظية للمؤثرات الخارجية.
              </p>
            </div>
          </section>
        </FadeContent>

        {/* Core Exercises */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-6">
            <h2 className="text-slate-900 dark:text-slate-100 text-[22px] font-bold leading-tight tracking-[-0.015em] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">fitness_center</span>
              التمارين الأساسية
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1 */}
              <SpotlightCard className="!p-4 !bg-primary/10 dark:!bg-primary/5 !border-primary/20 hover:!border-primary/50 transition-all !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-primary p-2 rounded-lg text-white flex items-center justify-center">
                    <span className="material-symbols-outlined">directions_run</span>
                  </div>
                  <h3 className="font-bold text-lg">الحركات المتقاطعة</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">تنشيط نصفي الدماغ من خلال حركات اليد والقدم المتقاطعة لزيادة التركيز العصبي.</p>
              </SpotlightCard>

              {/* Card 2 */}
              <SpotlightCard className="!p-4 !bg-primary/10 dark:!bg-primary/5 !border-primary/20 hover:!border-primary/50 transition-all !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-primary p-2 rounded-lg text-white flex items-center justify-center">
                    <span className="material-symbols-outlined">balance</span>
                  </div>
                  <h3 className="font-bold text-lg">التوازن الأحادي</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">تمارين الثبات على قدم واحدة مع إضافة حركات لليدين لتحدي استقرار الجذع.</p>
              </SpotlightCard>

              {/* Card 3 */}
              <SpotlightCard className="!p-4 !bg-primary/10 dark:!bg-primary/5 !border-primary/20 hover:!border-primary/50 transition-all !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-primary p-2 rounded-lg text-white flex items-center justify-center">
                    <span className="material-symbols-outlined">bolt</span>
                  </div>
                  <h3 className="font-bold text-lg">سرعة رد الفعل</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">استخدام الأقماع الملونة أو إشارات صوتية للاستجابة السريعة وتغيير الاتجاه.</p>
              </SpotlightCard>

              {/* Card 4 */}
              <SpotlightCard className="!p-4 !bg-primary/10 dark:!bg-primary/5 !border-primary/20 hover:!border-primary/50 transition-all !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-primary p-2 rounded-lg text-white flex items-center justify-center">
                    <span className="material-symbols-outlined">open_with</span>
                  </div>
                  <h3 className="font-bold text-lg">الحركات المتعددة</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">تغيير الحركة في محاور هندسية مختلفة (أمامي، جانبي، دوراني) في تمرين واحد.</p>
              </SpotlightCard>
            </div>
          </section>
        </FadeContent>

        {/* Training Protocol */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-6">
            <h2 className="text-slate-900 dark:text-slate-100 text-[22px] font-bold leading-tight tracking-[-0.015em] mb-6">بروتوكول التدريب</h2>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl text-center border border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 mb-1">المجموعات</p>
                <p className="text-xl font-bold text-primary">3 - 4</p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl text-center border border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 mb-1">التكرار</p>
                <p className="text-xl font-bold text-primary">10 - 12</p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl text-center border border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 mb-1">الراحة</p>
                <p className="text-xl font-bold text-primary">60 ثانية</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-500 italic text-center">التركيز هنا على جودة الحركة ودقة التنفيذ بدلاً من السرعة القصوى أو الوزن.</p>
          </section>
        </FadeContent>

        {/* Pro Tips */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/20 rounded-full -translate-x-16 -translate-y-16 blur-2xl"></div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10">
                <span className="material-symbols-outlined text-primary">lightbulb</span>
                نصائح الخبراء (Pro Tips)
              </h2>
              <ul className="space-y-4 relative z-10">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                  <p className="text-sm">حافظ على تركيز ذهني كامل؛ تخيل المسارات العصبية وهي تعمل أثناء التمرين.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                  <p className="text-sm">ابدأ بحركات بطيئة ومحكومة تماماً قبل زيادة السرعة تدريجياً.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                  <p className="text-sm">الاستمرارية هي المفتاح؛ المسارات العصبية تقوى بالتكرار اليومي المنتظم.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                  <p className="text-sm">يفضل أداء هذه التمارين في بداية الحصة التدريبية عندما يكون الجهاز العصبي في قمة نشاطه.</p>
                </li>
              </ul>
            </div>
          </section>
        </FadeContent>

        {/* CTA Action */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 pt-4">
            <StarBorder as="button" color="#7311d4" speed="4s" className="w-full">
              <div className="flex items-center justify-center gap-2 font-bold text-lg">
                <span>ابدأ التدريب الآن</span>
                <span className="material-symbols-outlined">play_arrow</span>
              </div>
            </StarBorder>
          </div>
        </FadeContent>
      </main>
    </div>
  );
}
