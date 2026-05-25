import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { ShinyText } from '../components/react-bits/ShinyText';
import SplitText from '../components/react-bits/SplitText';
import { BackButton } from '../components/BackButton';

export default function Anatomy() {
  const navigate = useNavigate();
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl border-b border-primary/10">
        <BackButton />
        <h1 className="text-lg font-bold tracking-tight text-primary">HELMY Anatomy</h1>
        <div className="size-10"></div> {/* Spacer for balance */}
      </nav>

      {/* Hero Section */}
      <FadeContent blur={true} duration={1000} initialOpacity={0}>
        <header className="relative w-full h-[400px] overflow-hidden flex items-end">
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent z-10 mix-blend-multiply"></div>
          <div 
            className="w-full h-full absolute inset-0 bg-center bg-no-repeat bg-cover" 
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=80")' }}
          ></div>
          <div className="relative z-20 p-8 w-full max-w-4xl mx-auto">
            <span className="inline-block py-1 px-3 mb-4 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold tracking-widest uppercase">
              Biomechanics & Structure
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
              <SplitText text="تشريح الجهاز العضلي" delay={50} className="text-white" />
            </h2>
            <p className="text-slate-300 font-medium text-sm md:text-base max-w-xl leading-relaxed">
              الدليل التقني المتكامل لفهم آليات الجسد. اكتشف كيف تنزلق الألياف الدقيقة لتوليد القوة، وتعرف على أنواع الانقباضات العضلية لتحقيق أقصى استفادة من تدريبك.
            </p>
          </div>
        </header>
      </FadeContent>

      <main className="max-w-4xl mx-auto p-4 md:p-6 space-y-12 pb-20 w-full">
        
        {/* Types of Contraction & Sliding Filament */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="bg-slate-100/50 dark:bg-zinc-900/50 border border-slate-200/50 dark:border-zinc-800/50 rounded-3xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">science</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black">ميكانيكية الانقباض العضلي</h3>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-bold text-primary mb-3">نظرية الخيوط المنزلقة (Sliding Filament Theory)</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                الأساس العلمي لأي حركة تقوم بها! تنقبض العضلة عندما تنزلق خيوط بروتين <strong className="text-slate-900 dark:text-white">الميوسين (Myosin)</strong> السميكة فوق خيوط <strong className="text-slate-900 dark:text-white">الأكتين (Actin)</strong> الرفيعة. تتطلب هذه العملية جزيئات الطاقة (ATP) والكالسيوم لفك ارتباط الخيوط وإعادة تكوينها بسرعة فائقة.
              </p>
            </div>

            <h4 className="text-lg font-bold mb-4">أنواع الانقباض (Types of Muscle Contractions):</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SpotlightCard className="bg-white/50 dark:bg-zinc-800/40 p-5 rounded-2xl border border-slate-200/50 dark:border-zinc-700/50" spotlightColor="rgba(115,17,212,0.1)">
                <h5 className="font-bold text-primary mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">unfold_less</span>
                  المركزي (Concentric)
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-400">تقصر العضلة لتتغلب على المقاومة (مثل رفع الوزن في البايسبس). ممتاز لبناء القوة الانفجارية.</p>
              </SpotlightCard>
              
              <SpotlightCard className="bg-white/50 dark:bg-zinc-800/40 p-5 rounded-2xl border border-slate-200/50 dark:border-zinc-700/50" spotlightColor="rgba(115,17,212,0.1)">
                <h5 className="font-bold text-rose-500 mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">unfold_more</span>
                  اللامركزي (Eccentric)
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-400">تطول العضلة تحت الضغط (مثل إنزال الوزن ببطء). هو المحفز الأكبر للتمزقات المجهرية المسببة للبناء العضلي (Hypertrophy).</p>
              </SpotlightCard>

              <SpotlightCard className="bg-white/50 dark:bg-zinc-800/40 p-5 rounded-2xl border border-slate-200/50 dark:border-zinc-700/50" spotlightColor="rgba(115,17,212,0.1)">
                <h5 className="font-bold text-emerald-500 mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">compress</span>
                  الثابت (Isometric)
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-400">تنقبض العضلة بدون تغيير في طولها (مثل تمرين البلانك أو التثبيت). يبني قوة هائلة في زوايا محددة من المفاصل.</p>
              </SpotlightCard>
            </div>
          </section>
        </FadeContent>

        {/* Muscle Fiber Types Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-rose-500 text-2xl">biotech</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black">تصنيف الألياف العضلية المتقدم</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Type I */}
              <div className="group bg-slate-50/50 dark:bg-zinc-900/50 p-6 rounded-3xl border border-slate-200/50 dark:border-zinc-800/50 hover:border-rose-500/30 transition-all">
                <div className="w-full h-32 rounded-xl bg-[url('https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-black text-2xl tracking-wider opacity-30 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-500">TYPE I</span>
                  </div>
                </div>
                <h4 className="font-bold text-lg mb-2 text-rose-500">بطيئة الانقباض (هوائية)</h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex gap-2 items-start"><span className="text-rose-500">•</span> ذات لون أحمر داكن لكثرة الميتوكوندريا والمايوجلوبين.</li>
                  <li className="flex gap-2 items-start"><span className="text-rose-500">•</span> مقاومة شديدة للتعب وتستخدم الأكسجين كوقود.</li>
                  <li className="flex gap-2 items-start"><span className="text-rose-500">•</span> مثالية للسباحة لمسافات طويلة والماراثون.</li>
                </ul>
              </div>

              {/* Type IIa */}
              <div className="group bg-slate-50/50 dark:bg-zinc-900/50 p-6 rounded-3xl border border-slate-200/50 dark:border-zinc-800/50 hover:border-violet-500/30 transition-all">
                <div className="w-full h-32 rounded-xl bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-black text-2xl tracking-wider opacity-30 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-500">TYPE IIa</span>
                  </div>
                </div>
                <h4 className="font-bold text-lg mb-2 text-violet-500">سريعة الانقباض (هجينة)</h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex gap-2 items-start"><span className="text-violet-500">•</span> مزيج بين الألياف الهوائية واللاهوائية (وردية اللون).</li>
                  <li className="flex gap-2 items-start"><span className="text-violet-500">•</span> قادرة على توليد قوة معقولة مع بعض المقاومة للتعب.</li>
                  <li className="flex gap-2 items-start"><span className="text-violet-500">•</span> الاستجابة المثلى تتم عبر تكرارات متوسطة (8-12) لبناء العضلات.</li>
                </ul>
              </div>

              {/* Type IIx */}
              <div className="group bg-slate-50/50 dark:bg-zinc-900/50 p-6 rounded-3xl border border-slate-200/50 dark:border-zinc-800/50 hover:border-sky-500/30 transition-all">
                <div className="w-full h-32 rounded-xl bg-[url('https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-black text-2xl tracking-wider opacity-30 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-500">TYPE IIx</span>
                  </div>
                </div>
                <h4 className="font-bold text-lg mb-2 text-sky-500">فائقة السرعة (لاهوائية)</h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex gap-2 items-start"><span className="text-sky-500">•</span> ذات لون أبيض لاعتمادها على الجليكوجين دون الأكسجين.</li>
                  <li className="flex gap-2 items-start"><span className="text-sky-500">•</span> تولد طاقة انفجارية قصوى لكنها تتعب خلال ثوانٍ معدودة.</li>
                  <li className="flex gap-2 items-start"><span className="text-sky-500">•</span> مثالية للقفز، رمي الأوزان الثقيلة (1-3 تكرارات)، والعدو السريع.</li>
                </ul>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Major Muscle Groups Breakdown */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-amber-500 text-2xl">accessibility_new</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black">الدليل التشريحي للمجموعات العضلية</h3>
            </div>
            
            <div className="space-y-4">
              {/* Chest */}
              <div className="group border border-slate-200/50 dark:border-zinc-800/50 rounded-2xl overflow-hidden hover:border-primary/40 transition-all bg-white dark:bg-zinc-900/30">
                <div 
                  className="flex items-center justify-between p-5 cursor-pointer"
                  onClick={() => toggleAccordion(0)}
                >
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-xl">shield</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg md:text-xl">عضلات الصدر (Pectorals)</h4>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Pectoralis Major &amp; Minor</p>
                    </div>
                  </div>
                  <span className={`material-symbols-outlined text-slate-500 group-hover:text-primary transition-transform duration-300 ${openAccordion === 0 ? 'rotate-180' : ''}`}>expand_more</span>
                </div>
                <div className={`grid grid-rows-[0fr] transition-all duration-300 ease-in-out ${openAccordion === 0 ? 'grid-rows-[1fr]' : ''}`}>
                  <div className="overflow-hidden">
                    <div className="p-5 bg-slate-50/50 dark:bg-black/20 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-zinc-800/50 space-y-4">
                      <p><strong className="text-slate-900 dark:text-white">التشريح والوظيفة:</strong> تنقسم الصدرية الكبرى إلى جزء ترقوي (الصدر العلوي) وجزء قصي (الصدر الأوسط/السفلي). وظيفتها الأساسية هي تقريب الذراع (Horizontal Adduction) والتدوير الداخلي.</p>
                      <p><strong className="text-slate-900 dark:text-white">التطبيق العملي:</strong> لاستهداف الصدر العلوي بفعالية، استخدم الدامبلز أو البار بزاوية 30-45 درجة. الزوايا المنحدرة (Decline) تفعل الصدر السفلي والقصي.</p>
                      <div className="w-full h-48 rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-700/50">
                        <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80" alt="Chest Exercises" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back */}
              <div className="group border border-slate-200/50 dark:border-zinc-800/50 rounded-2xl overflow-hidden hover:border-primary/40 transition-all bg-white dark:bg-zinc-900/30">
                <div 
                  className="flex items-center justify-between p-5 cursor-pointer"
                  onClick={() => toggleAccordion(1)}
                >
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-xl">format_align_justify</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg md:text-xl">عضلات الظهر (Back Complex)</h4>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Lats, Rhomboids, Traps, Erectors</p>
                    </div>
                  </div>
                  <span className={`material-symbols-outlined text-slate-500 group-hover:text-primary transition-transform duration-300 ${openAccordion === 1 ? 'rotate-180' : ''}`}>expand_more</span>
                </div>
                <div className={`grid grid-rows-[0fr] transition-all duration-300 ease-in-out ${openAccordion === 1 ? 'grid-rows-[1fr]' : ''}`}>
                  <div className="overflow-hidden">
                    <div className="p-5 bg-slate-50/50 dark:bg-black/20 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-zinc-800/50 space-y-4">
                      <p><strong className="text-slate-900 dark:text-white">التشريح والوظيفة:</strong> تتكون من المجنص (Lats) المسؤول عن العرض وسحب الذراعين لأسفل وللخلف، وعضلات المعينيات والترابيس (Rhomboids & Traps) المسؤولة عن الكثافة وتقريب ألواح الكتف.</p>
                      <p><strong className="text-slate-900 dark:text-white">التطبيق العملي:</strong> تمارين السحب الرأسي (Pull-ups/Lat Pulldown) تبني العرض. بينما السحب الأفقي (Rows) يبني الكثافة والسمك. تمرين الـ Deadlift يعزز الناصبة الفقرية (Erector Spinae).</p>
                      <div className="w-full h-48 rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-700/50">
                        <img src="https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80" alt="Back Exercises" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legs */}
              <div className="group border border-slate-200/50 dark:border-zinc-800/50 rounded-2xl overflow-hidden hover:border-primary/40 transition-all bg-white dark:bg-zinc-900/30">
                <div 
                  className="flex items-center justify-between p-5 cursor-pointer"
                  onClick={() => toggleAccordion(2)}
                >
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-xl">directions_run</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg md:text-xl">عضلات الأرجل والحوض (Lower Body)</h4>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Quads, Hamstrings, Glutes, Calves</p>
                    </div>
                  </div>
                  <span className={`material-symbols-outlined text-slate-500 group-hover:text-primary transition-transform duration-300 ${openAccordion === 2 ? 'rotate-180' : ''}`}>expand_more</span>
                </div>
                <div className={`grid grid-rows-[0fr] transition-all duration-300 ease-in-out ${openAccordion === 2 ? 'grid-rows-[1fr]' : ''}`}>
                  <div className="overflow-hidden">
                    <div className="p-5 bg-slate-50/50 dark:bg-black/20 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-zinc-800/50 space-y-4">
                      <p><strong className="text-slate-900 dark:text-white">التشريح والوظيفة:</strong> الأرجل تحتوي على أكبر كتلة عضلية. الكوادز (أمامية) تمد الركبة. الهامسترنج (خلفية) تثني الركبة. الأرداف (Glutes) مسؤولة عن مد مفصل الحوض ودفع الجسم للأمام.</p>
                      <p><strong className="text-slate-900 dark:text-white">التطبيق العملي:</strong> الـ Squats بعمق كامل يفعل الكوادز والأرداف. الـ Romanian Deadlifts يستهدف الهامسترنج بشكل مكثف بالاعتماد على الانقباض اللامركزي.</p>
                      <div className="w-full h-48 rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-700/50">
                        <img src="https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=800&q=80" alt="Legs Exercises" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shoulders */}
              <div className="group border border-slate-200/50 dark:border-zinc-800/50 rounded-2xl overflow-hidden hover:border-primary/40 transition-all bg-white dark:bg-zinc-900/30">
                <div 
                  className="flex items-center justify-between p-5 cursor-pointer"
                  onClick={() => toggleAccordion(3)}
                >
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-xl">ad</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg md:text-xl">عضلات الأكتاف (Deltoids)</h4>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Anterior, Lateral, Posterior Heads</p>
                    </div>
                  </div>
                  <span className={`material-symbols-outlined text-slate-500 group-hover:text-primary transition-transform duration-300 ${openAccordion === 3 ? 'rotate-180' : ''}`}>expand_more</span>
                </div>
                <div className={`grid grid-rows-[0fr] transition-all duration-300 ease-in-out ${openAccordion === 3 ? 'grid-rows-[1fr]' : ''}`}>
                  <div className="overflow-hidden">
                    <div className="p-5 bg-slate-50/50 dark:bg-black/20 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-zinc-800/50 space-y-4">
                      <p><strong className="text-slate-900 dark:text-white">التشريح والوظيفة:</strong> مفصل الكتف هو الأكثر حركية وتعرضاً للإصابة. يتكون من رأس أمامي (الدفع أمامي/أعلى)، رأس جانبي (التباعد الجانبي)، ورأس خلفي (السحب والدوران الخارجي).</p>
                      <p><strong className="text-slate-900 dark:text-white">التطبيق العملي:</strong> إهمال الرأس الخلفي يسبب انحناء الكتفين للأمام. يجب تدريب الرفرفة الخلفية والجانبية بتكرارات عالية (12-15) لتطوير الكرات العضلية (3D Shoulders).</p>
                      <div className="w-full h-48 rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-700/50">
                        <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80" alt="Shoulders Exercises" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Professional Footer Note */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <footer className="text-center pt-8 border-t border-primary/10">
            <p className="text-slate-500 text-sm font-medium">
              تمت صياغة ومراجعة هذه المادة الأكاديمية بالاستناد إلى مراجع الطب الرياضي والتشريح الحيوي لضمان أعلى معايير الجودة العلمية في 
              <span className="text-primary font-bold mx-1">HELMY Academy</span>.
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
