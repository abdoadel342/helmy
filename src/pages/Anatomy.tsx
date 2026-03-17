import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { ShinyText } from '../components/react-bits/ShinyText';

export default function Anatomy() {
  const navigate = useNavigate();
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center justify-center size-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
        >
          <span className="material-symbols-outlined text-primary">arrow_forward</span>
        </button>
        <h1 className="text-lg font-bold tracking-tight text-primary">HELMY Anatomy</h1>
        <div className="size-10"></div> {/* Spacer for balance */}
      </nav>

      {/* Hero Section */}
      <FadeContent blur={true} duration={1000} initialOpacity={0}>
        <header className="relative w-full h-80 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10"></div>
          <div 
            className="w-full h-full bg-center bg-no-repeat bg-cover" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBdsB3v7QMUiU7p2jNyIvMjz9Ofa-7HFX7-mse3vfYsXgLsqs8balOcoN5bBt-0J9KyNKglLSW8aQtfKMmZ7IFmucNKdj327OdtfC18N8F4sw-Z2EWO0OamD2jq2RXvRZdeyLlSgpqUIC7tQ0jtNMsiRY5Z8XV36-og8b6FY-Z13nmQYEiBwl6pMfJLX1Z4AbIA-TfnfEPXM6LIcNylfyv5jvFXYKjKIjW_78a98YbgLzGsGfi7MjAoPVJ142NkZU10qxwP6Fj5NjyW")' }}
          ></div>
          <div className="absolute bottom-6 right-6 z-20">
            <h2 className="text-4xl font-bold text-slate-100">
              <ShinyText text="تشريح الجهاز العضلي" disabled={false} speed={3} className="text-slate-100" />
            </h2>
            <p className="text-primary font-medium mt-1">الدليل التقني المتكامل للرياضيين</p>
          </div>
        </header>
      </FadeContent>

      <main className="max-w-4xl mx-auto p-4 space-y-10 pb-20 w-full">
        {/* Types of Muscles Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">category</span>
              <h3 className="text-2xl font-bold">أنواع العضلات</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SpotlightCard className="bg-primary/5 backdrop-blur-md border border-primary/20 p-5 rounded-xl flex flex-col gap-3" spotlightColor="rgba(115, 17, 212, 0.15)">
                <span className="material-symbols-outlined text-primary text-3xl">accessibility_new</span>
                <h4 className="text-lg font-bold">العضلات الهيكلية</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">ترتبط بالعظام عبر الأوتار وتتحكم في الحركات الإرادية. هي النوع الذي يستجيب لتدريبات القوة والضخامة.</p>
              </SpotlightCard>
              <SpotlightCard className="bg-primary/5 backdrop-blur-md border border-primary/20 p-5 rounded-xl flex flex-col gap-3" spotlightColor="rgba(115, 17, 212, 0.15)">
                <span className="material-symbols-outlined text-primary text-3xl">settings_accessibility</span>
                <h4 className="text-lg font-bold">العضلات الملساء</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">عضلات لا إرادية تتواجد في جدران الأمعاء والأوعية الدموية، تعمل على تنظيم العمليات الحيوية الداخلية.</p>
              </SpotlightCard>
              <SpotlightCard className="bg-primary/5 backdrop-blur-md border border-primary/40 p-5 rounded-xl flex flex-col gap-3" spotlightColor="rgba(115, 17, 212, 0.15)">
                <span className="material-symbols-outlined text-primary text-3xl">favorite</span>
                <h4 className="text-lg font-bold">العضلات القلبية</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">نسيج عضلي متخصص يوجد فقط في القلب، يتميز بقدرته العالية على التحمل والعمل المستمر دون تعب.</p>
              </SpotlightCard>
            </div>
          </section>
        </FadeContent>

        {/* Muscle Fiber Types Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">biotech</span>
              <h3 className="text-2xl font-bold">أنواع الألياف العضلية</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="size-3 rounded-full bg-red-500"></div>
                  <h4 className="font-bold text-xl">الألياف بطيئة الانقباض (Type I)</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-7">تعتمد على الأكسجين لإنتاج الطاقة (هوائية). تتميز بمقاومة عالية للتعب ولكنها تنتج قوة منخفضة. مثالية لتمارين التحمل مثل الماراثون.</p>
                <div className="bg-white dark:bg-background-dark/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="text-xs text-primary font-bold block mb-1">الميزة الأساسية</span>
                  <span className="text-sm text-slate-700 dark:text-slate-300">كثافة عالية من الميتوكوندريا والشعيرات الدموية.</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="size-3 rounded-full bg-primary"></div>
                  <h4 className="font-bold text-xl">الألياف سريعة الانقباض (Type II)</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-7">تنتج طاقة هائلة في وقت قصير (لاهوائية). تتعب بسرعة لكنها المسؤولة عن الانفجار العضلي والنمو الملحوظ في الحجم.</p>
                <div className="bg-white dark:bg-background-dark/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="text-xs text-primary font-bold block mb-1">الميزة الأساسية</span>
                  <span className="text-sm text-slate-700 dark:text-slate-300">قدرة عالية على تخزين الجليكوجين وتوليد القوة القصوى.</span>
                </div>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Major Muscle Groups Breakdown */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">fitness_center</span>
              <h3 className="text-2xl font-bold">المجموعات العضلية الرئيسية</h3>
            </div>
            <div className="space-y-4">
              {/* Muscle Group Item: Chest */}
              <div className="group border border-primary/10 rounded-xl overflow-hidden hover:border-primary/40 transition-all bg-white dark:bg-transparent">
                <div 
                  className="flex items-center justify-between p-4 bg-primary/5 cursor-pointer"
                  onClick={() => toggleAccordion(0)}
                >
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">shield</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">عضلات الصدر (Pectorals)</h4>
                      <p className="text-xs text-slate-500 italic uppercase">Pectoralis Major &amp; Minor</p>
                    </div>
                  </div>
                  <span className={`material-symbols-outlined text-slate-500 group-hover:text-primary transition-transform ${openAccordion === 0 ? 'rotate-180' : ''}`}>expand_more</span>
                </div>
                {openAccordion === 0 && (
                  <div className="p-4 bg-slate-50 dark:bg-background-dark/40 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-primary/10">
                    الوظيفة الأساسية هي دفع الأوزان بعيداً عن الجسم وضم الذراعين للداخل. خلال التمرين، تعمل كمحرك أساسي في تمارين (Bench Press) والضغط، وتتطلب توازناً بين الألياف العلوية والسفلية.
                  </div>
                )}
              </div>

              {/* Muscle Group Item: Back */}
              <div className="group border border-primary/10 rounded-xl overflow-hidden hover:border-primary/40 transition-all bg-white dark:bg-transparent">
                <div 
                  className="flex items-center justify-between p-4 bg-primary/5 cursor-pointer"
                  onClick={() => toggleAccordion(1)}
                >
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">format_align_justify</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">عضلات الظهر (Latissimus Dorsi)</h4>
                      <p className="text-xs text-slate-500 italic uppercase">Lats, Rhomboids, Traps</p>
                    </div>
                  </div>
                  <span className={`material-symbols-outlined text-slate-500 group-hover:text-primary transition-transform ${openAccordion === 1 ? 'rotate-180' : ''}`}>expand_more</span>
                </div>
                {openAccordion === 1 && (
                  <div className="p-4 bg-slate-50 dark:bg-background-dark/40 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-primary/10">
                    أكبر مجموعة عضلية في الجزء العلوي، مسؤولة عن عمليات السحب وتثبيت العمود الفقري. تمارين (Deadlift) و (Pull-ups) هي الأفضل لاستهداف العرض والكثافة العضلية.
                  </div>
                )}
              </div>

              {/* Muscle Group Item: Legs */}
              <div className="group border border-primary/10 rounded-xl overflow-hidden hover:border-primary/40 transition-all bg-white dark:bg-transparent">
                <div 
                  className="flex items-center justify-between p-4 bg-primary/5 cursor-pointer"
                  onClick={() => toggleAccordion(2)}
                >
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">directions_run</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">عضلات الأرجل (Quadriceps &amp; Hamstrings)</h4>
                      <p className="text-xs text-slate-500 italic uppercase">Quads, Glutes, Calves</p>
                    </div>
                  </div>
                  <span className={`material-symbols-outlined text-slate-500 group-hover:text-primary transition-transform ${openAccordion === 2 ? 'rotate-180' : ''}`}>expand_more</span>
                </div>
                {openAccordion === 2 && (
                  <div className="p-4 bg-slate-50 dark:bg-background-dark/40 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-primary/10">
                    تمثل قاعدة القوة للجسم بالكامل. عضلة الكوادز مسؤولة عن مد الركبة، بينما الهامسترنج مسؤولة عن ثنيها. تمرين (Squat) هو الملك هنا لتحفيز إفراز هرمونات النمو.
                  </div>
                )}
              </div>

              {/* Muscle Group Item: Shoulders */}
              <div className="group border border-primary/10 rounded-xl overflow-hidden hover:border-primary/40 transition-all bg-white dark:bg-transparent">
                <div 
                  className="flex items-center justify-between p-4 bg-primary/5 cursor-pointer"
                  onClick={() => toggleAccordion(3)}
                >
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">ad</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">عضلات الأكتاف (Deltoids)</h4>
                      <p className="text-xs text-slate-500 italic uppercase">Anterior, Lateral, Posterior</p>
                    </div>
                  </div>
                  <span className={`material-symbols-outlined text-slate-500 group-hover:text-primary transition-transform ${openAccordion === 3 ? 'rotate-180' : ''}`}>expand_more</span>
                </div>
                {openAccordion === 3 && (
                  <div className="p-4 bg-slate-50 dark:bg-background-dark/40 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-primary/10">
                    تتكون من ثلاثة رؤوس تمنح الجسم شكل (V-taper). هي العضلة الأكثر حركية وتعقيداً، وتتطلب زوايا تدريب مختلفة (أمامية، جانبية، وخلفية) لضمان التناسق ومنع الإصابات.
                  </div>
                )}
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Professional Footer Note */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <footer className="text-center pt-8 border-t border-primary/10">
            <p className="text-slate-500 text-sm">
              تمت مراجعة هذه المادة العلمية من قبل خبراء في التربية البدنية والتشريح لضمان دقة المعلومات المقدمة في تطبيق 
              <span className="text-primary font-bold mx-1">HELMY</span>.
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <div className="size-2 rounded-full bg-primary/30"></div>
              <div className="size-2 rounded-full bg-primary/60"></div>
              <div className="size-2 rounded-full bg-primary"></div>
            </div>
          </footer>
        </FadeContent>
      </main>
    </div>
  );
}
