import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { ShinyText } from '../components/react-bits/ShinyText';

export default function Training() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-primary/10">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">التدريب الرياضي</h1>
        </div>
        <button className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
          <span className="material-symbols-outlined">share</span>
        </button>
      </header>

      <main className="max-w-4xl mx-auto pb-24 w-full">
        {/* Hero Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 py-4">
            <div className="relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden shadow-2xl border border-primary/20">
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10"></div>
              <img 
                alt="Professional athlete training" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjstB-7WiLJtOONG6H5qpbWY4Ogft8DYaFNzr8F2_imIz9wZjiIpj2PTWnzr3dRKembcfaRqHA3UlP7ZDjnfqsEkpzalyrwUND4JJJOk5y55fJesTMc8Nv45cgx8WPUlH-wfCCTLnn3Ss7iDlxRIgPT30twbIRxK6zSaF9BvyRqK-QFeQxQtkILdfOKvi_EUak4la4fFDJoUJeWfROmC4MvbRJmLNBwlvCokJuyfSKnlhPIv-l5bxVGtID2FqKdtUSwcKJ1ec1JzA1"
              />
              <div className="absolute bottom-4 right-4 z-20">
                <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  <ShinyText text="دليل المحترفين" disabled={false} speed={3} className="text-white" />
                </span>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Section: Training Principles */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">analytics</span>
              <h2 className="text-2xl font-bold">مبادئ التدريب الرياضي</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Principle 1 */}
              <SpotlightCard className="flex flex-col gap-3 rounded-xl border border-primary/20 bg-white dark:bg-primary/5 p-5 transition-all hover:border-primary/40" spotlightColor="rgba(115, 17, 212, 0.15)">
                <span className="material-symbols-outlined text-primary text-3xl">trending_up</span>
                <div>
                  <h3 className="text-lg font-bold">زيادة الحمل التدريجي</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-1">تطوير الجسم عبر زيادة شدة ومدة التمرين بشكل مدروس ومنتظم.</p>
                </div>
              </SpotlightCard>
              {/* Principle 2 */}
              <SpotlightCard className="flex flex-col gap-3 rounded-xl border border-primary/20 bg-white dark:bg-primary/5 p-5 transition-all hover:border-primary/40" spotlightColor="rgba(115, 17, 212, 0.15)">
                <span className="material-symbols-outlined text-primary text-3xl">target</span>
                <div>
                  <h3 className="text-lg font-bold">التخصص</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-1">توجيه التمارين لتناسب نوع الرياضة أو العضلة المستهدفة بدقة.</p>
                </div>
              </SpotlightCard>
              {/* Principle 3 */}
              <SpotlightCard className="flex flex-col gap-3 rounded-xl border border-primary/20 bg-white dark:bg-primary/5 p-5 transition-all hover:border-primary/40" spotlightColor="rgba(115, 17, 212, 0.15)">
                <span className="material-symbols-outlined text-primary text-3xl">battery_charging_full</span>
                <div>
                  <h3 className="text-lg font-bold">الاستشفاء</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-1">منح الجسم الوقت الكافي لإصلاح الأنسجة وتعويض الطاقة المستهلكة.</p>
                </div>
              </SpotlightCard>
            </div>
          </section>
        </FadeContent>

        {/* Section: Training Load */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-6 bg-primary/5 my-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">fitness_center</span>
              <h2 className="text-2xl font-bold">الحمل التدريبي</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">يتكون الحمل التدريبي من عنصرين أساسيين يحددان مدى تطورك البدني:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-background-dark p-6 rounded-xl border-r-4 border-primary shadow-sm">
                <h4 className="text-primary font-bold text-xl mb-2">حجم التدريب (Volume)</h4>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">يشير إلى الكمية الإجمالية للعمل، مثل عدد الجولات، التكرارات، أو المسافة المقطوعة بالكيلومترات.</p>
              </div>
              <div className="bg-white dark:bg-background-dark p-6 rounded-xl border-r-4 border-primary shadow-sm">
                <h4 className="text-primary font-bold text-xl mb-2">شدة التدريب (Intensity)</h4>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">تعبر عن مستوى الجهد المبذول، مثل الوزن المستخدم (نسبة من الحد الأقصى) أو سرعة الركض.</p>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Section: Training Phases */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">timer</span>
              <h2 className="text-2xl font-bold">مراحل الوحدة التدريبية</h2>
            </div>
            <div className="space-y-4">
              {/* Phase 1 */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="bg-primary/20 text-primary size-10 flex items-center justify-center rounded-lg font-bold shrink-0">١</div>
                <div>
                  <h4 className="font-bold text-lg">الإحماء (Warm-up)</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">تحضير الجهاز الدوري والعضلي لتقليل خطر الإصابة (٥-١٥ دقيقة).</p>
                </div>
              </div>
              {/* Phase 2 */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="bg-primary/20 text-primary size-10 flex items-center justify-center rounded-lg font-bold shrink-0">٢</div>
                <div>
                  <h4 className="font-bold text-lg">الجزء الرئيسي (Main Part)</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">تنفيذ التمارين الأساسية لتحقيق هدف الوحدة (قوة، تحمل، مهارة).</p>
                </div>
              </div>
              {/* Phase 3 */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="bg-primary/20 text-primary size-10 flex items-center justify-center rounded-lg font-bold shrink-0">٣</div>
                <div>
                  <h4 className="font-bold text-lg">التهدئة (Cool-down)</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">إعادة ضربات القلب لمستواها الطبيعي والتخلص من الفضلات العضلية.</p>
                </div>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* CTA Button */}
        <div className="p-4 mt-8">
          <button 
            onClick={() => navigate('/education/training/speed')}
            className="w-full max-w-4xl mx-auto bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-lg shadow-primary/25"
          >
            <span>ابدأ خطتك التدريبية</span>
            <span className="material-symbols-outlined">rocket_launch</span>
          </button>
        </div>
      </main>
    </div>
  );
}
