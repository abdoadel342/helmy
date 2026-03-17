import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { ShinyText } from '../components/react-bits/ShinyText';
import { StarBorder } from '../components/react-bits/StarBorder';

export default function MaxSpeed() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-x-hidden font-display">
      {/* Header Section */}
      <header className="flex items-center bg-background-dark/80 backdrop-blur-md sticky top-0 z-50 p-4 justify-between border-b border-primary/10">
        <button 
          onClick={() => navigate(-1)}
          className="text-primary flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 cursor-pointer hover:bg-primary/20 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <h2 className="text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">تمارين السرعة القصوى</h2>
        <div className="size-10"></div>
      </header>

      <main className="flex-1 pb-24 max-w-2xl mx-auto w-full">
        {/* Hero Image */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 py-4">
            <div 
              className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-background-dark rounded-xl min-h-[240px] shadow-2xl relative border border-primary/20" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB7E-gWrB7YvQgViZ57t8hRHKdmrGMpVAAg1_tF0wFk_Oy1_QcceCJ-m0DOOYXdP4x6yWeiRWYXAc6UHn47Sy1kK29549Ub0C2uby2RPpYXg7NZAsxHjzxHBDMvRPVKux8xECXLIUwrPXE97UizvJP9S13wodFMkBYtd74MGfmnFACsM7H9K60AlqNdfhtKa-Q3N1IINd55BJ6lL_0L4rdh4tIWATDKyos_FDwReWWmzi731FU2j6rlpFXFQ4vfU92oNGFLKuFX-AMD")' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
              <div className="relative p-4">
                <span className="inline-block bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white mb-2">
                  <ShinyText text="Advanced Performance" disabled={false} speed={3} className="text-white" />
                </span>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Introduction */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-4">
            <h2 className="text-primary text-[22px] font-bold leading-tight tracking-[-0.015em] mb-3">ما هي السرعة القصوى؟</h2>
            <div className="bg-primary/5 border-r-4 border-primary p-4 rounded-lg">
              <p className="text-slate-300 text-base font-normal leading-relaxed">
                هي المرحلة التي تلي مرحلة التسارع، حيث يتم الحفاظ على أعلى سرعة ممكنة للجسم. تهدف هذه التمارين إلى تحسين كفاءة الجهاز العصبي المركزي (CNS) والتوافق العضلي العصبي لزيادة التردد الحركي وطول الخطوة.
              </p>
            </div>
          </section>
        </FadeContent>

        {/* Training List */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-4">
            <h3 className="text-slate-100 text-xl font-bold leading-tight tracking-[-0.015em] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">fitness_center</span>
              قائمة التمارين المتقدمة
            </h3>
            <div className="space-y-4">
              {/* Exercise 1 */}
              <SpotlightCard className="!p-4 !bg-white/5 !border-white/10 hover:!border-primary/30 transition-colors !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-primary font-bold text-lg">الجري الطائر (Flying Sprints)</h4>
                  <span className="material-symbols-outlined text-primary/60">bolt</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  ابدأ بجري تدرجي لمسافة 20 مترًا للوصول للسرعة القصوى، ثم حافظ على جهد 100% لمسافة 30 مترًا تالية. التركيز هنا على الحفاظ على السرعة وليس التسارع.
                </p>
              </SpotlightCard>

              {/* Exercise 2 */}
              <SpotlightCard className="!p-4 !bg-white/5 !border-white/10 hover:!border-primary/30 transition-colors !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-primary font-bold text-lg">تمارين التدرج الحركي (In-and-Outs)</h4>
                  <span className="material-symbols-outlined text-primary/60">speed</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  التناوب بين السرعة القصوى والسرعة تحت القصوى (مثلاً 10م انفجار، 10م استرخاء حركي) لتعليم الجسم التحكم في التوتر العضلي أثناء السرعات العالية.
                </p>
              </SpotlightCard>

              {/* Exercise 3 */}
              <SpotlightCard className="!p-4 !bg-white/5 !border-white/10 hover:!border-primary/30 transition-colors !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-primary font-bold text-lg">الجري على منحدر (Downhill Sprints)</h4>
                  <span className="material-symbols-outlined text-primary/60">trending_down</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  الجري على منحدر بسيط (2-3 درجات) لتحسين تردد الخطوات. يجب الحذر الشديد من زيادة الانحدار لتجنب الإصابات واختلال الميكانيكا.
                </p>
              </SpotlightCard>

              {/* Exercise 4 */}
              <SpotlightCard className="!p-4 !bg-white/5 !border-white/10 hover:!border-primary/30 transition-colors !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-primary font-bold text-lg">تمارين رفع الركبتين (High Knees)</h4>
                  <span className="material-symbols-outlined text-primary/60">directions_run</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  التركيز على ميكانيكا الجزء الأمامي من الجسم، مع الحفاظ على وضعية الحوض مرتفعة والضرب بقوة بمشط القدم تحت مركز الثقل مباشرة.
                </p>
              </SpotlightCard>
            </div>
          </section>
        </FadeContent>

        {/* Volume & Recovery */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-6">
            <div className="bg-gradient-to-br from-primary to-purple-900 p-5 rounded-2xl shadow-lg shadow-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-white text-3xl">timer</span>
                <h3 className="text-white text-xl font-bold">الحجم والاصطبار (الاستشفاء)</h3>
              </div>
              <p className="text-white/90 text-base leading-relaxed">
                لتحقيق الاستفادة القصوى وتدريب الجهاز العصبي بفعالية، يجب أن يكون الاستشفاء كاملاً. القاعدة الذهبية: 
                <strong className="text-white mx-1">دقيقة راحة مقابل كل 10 أمتار جري سريع.</strong> 
                الجودة أهم بكثير من الكمية في تمارين السرعة القصوى.
              </p>
            </div>
          </section>
        </FadeContent>

        {/* Key Tips */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-4 mb-8">
            <h3 className="text-slate-100 text-lg font-bold mb-4">نصائح الأداء الاحترافي</h3>
            <div className="grid grid-cols-1 gap-3">
              <SpotlightCard className="!p-3 !bg-white/5 !border-transparent hover:!border-primary/20 transition-colors !rounded-lg" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <div>
                    <p className="font-bold text-slate-200">الاسترخاء</p>
                    <p className="text-xs text-slate-400">تجنب التشنج في الوجه والرقبة أثناء الجري.</p>
                  </div>
                </div>
              </SpotlightCard>
              
              <SpotlightCard className="!p-3 !bg-white/5 !border-transparent hover:!border-primary/20 transition-colors !rounded-lg" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <div>
                    <p className="font-bold text-slate-200">دفع الذراعين</p>
                    <p className="text-xs text-slate-400">حركة الذراعين من الكتف تولد قوة دفع إضافية.</p>
                  </div>
                </div>
              </SpotlightCard>

              <SpotlightCard className="!p-3 !bg-white/5 !border-transparent hover:!border-primary/20 transition-colors !rounded-lg" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <div>
                    <p className="font-bold text-slate-200">ميكانيكا الجزء الأمامي</p>
                    <p className="text-xs text-slate-400">ركز على رفع الركبة بزاوية قائمة لزيادة طول الخطوة.</p>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </section>
        </FadeContent>
      </main>

      {/* Fixed Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-dark via-background-dark to-transparent z-50">
        <div className="max-w-2xl mx-auto">
          <StarBorder as="button" color="#7311d4" speed="4s" className="w-full">
            <div className="flex items-center justify-center gap-2 font-bold">
              <span>ابدأ التدريب الآن</span>
              <span className="material-symbols-outlined">play_arrow</span>
            </div>
          </StarBorder>
        </div>
      </div>
    </div>
  );
}
