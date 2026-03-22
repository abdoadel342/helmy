import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { ShinyText } from '../components/react-bits/ShinyText';
import { StarBorder } from '../components/react-bits/StarBorder';
import { useStartWorkout } from '../useStartWorkout';

export default function ShortSprints() {
  const navigate = useNavigate();
  const { isStarting, workoutStarted, handleStartWorkout } = useStartWorkout();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#0a0a0a] text-white overflow-x-hidden font-display">
      {/* TopAppBar */}
      <header className="flex items-center bg-[#0a0a0a]/80 backdrop-blur-md p-4 sticky top-0 z-50">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center justify-center size-10 rounded-full bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] transition-colors"
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <h1 className="text-xl font-bold tracking-tight flex-1 mr-4">تمارين السرعة القصيرة</h1>
      </header>

      <main className="flex-1 pb-24 max-w-2xl mx-auto w-full">
        {/* Hero Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="relative h-[400px] w-full overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop")' }}
            ></div>
            <div className="absolute inset-0 bg-[#7311d4]/25 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent"></div>
            <div className="absolute bottom-4 right-4 left-4">
              <span className="inline-block bg-[#7311d4] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-[#7311d4]/40">
                <ShinyText text="HELMY Performance" disabled={false} speed={3} className="text-white" />
              </span>
            </div>
          </section>
        </FadeContent>

        {/* Goal Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-6 py-6">
            <h2 className="text-[#7311d4] font-bold text-lg mb-2">هدف التمرين</h2>
            <p className="text-gray-300 leading-relaxed">
              تهدف تمارين السرعة القصيرة إلى تطوير <strong className="text-white">التسارع الانفجاري</strong> وقوة الساقين القصوى. تساعد هذه السبرنتات في تحسين كفاءة الجهاز العصبي وقدرة العضلات على إنتاج القوة في أقل وقت ممكن.
            </p>
          </section>
        </FadeContent>

        {/* Exercises List */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-6 py-4 space-y-4">
            <h2 className="text-xl font-bold mb-4">قائمة التمارين</h2>
            
            {/* Exercise 1 */}
            <SpotlightCard className="!p-4 !bg-[#1a1a1a] !border-white/5 !rounded-2xl" spotlightColor="rgba(115, 17, 212, 0.15)">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">سبرنت 10 متر</h3>
                <span className="text-[#7311d4] font-bold">01</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center p-2 bg-[#0a0a0a] rounded-xl border border-[#7311d4]/20">
                  <span className="material-symbols-outlined text-[#7311d4] mb-1 text-xl">speed</span>
                  <span className="text-[10px] text-gray-400">الشدة</span>
                  <span className="text-sm font-bold">100%</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-[#0a0a0a] rounded-xl border border-[#7311d4]/20">
                  <span className="material-symbols-outlined text-[#7311d4] mb-1 text-xl">repeat</span>
                  <span className="text-[10px] text-gray-400">الجولات</span>
                  <span className="text-sm font-bold">3-5</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-[#0a0a0a] rounded-xl border border-[#7311d4]/20">
                  <span className="material-symbols-outlined text-[#7311d4] mb-1 text-xl">timer</span>
                  <span className="text-[10px] text-gray-400">راحة</span>
                  <span className="text-sm font-bold">2-3 د</span>
                </div>
              </div>
            </SpotlightCard>

            {/* Exercise 2 */}
            <SpotlightCard className="!p-4 !bg-[#1a1a1a] !border-white/5 !rounded-2xl" spotlightColor="rgba(115, 17, 212, 0.15)">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">سبرنت 20 متر</h3>
                <span className="text-[#7311d4] font-bold">02</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center p-2 bg-[#0a0a0a] rounded-xl border border-[#7311d4]/20">
                  <span className="material-symbols-outlined text-[#7311d4] mb-1 text-xl">speed</span>
                  <span className="text-[10px] text-gray-400">الشدة</span>
                  <span className="text-sm font-bold">100%</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-[#0a0a0a] rounded-xl border border-[#7311d4]/20">
                  <span className="material-symbols-outlined text-[#7311d4] mb-1 text-xl">repeat</span>
                  <span className="text-[10px] text-gray-400">الجولات</span>
                  <span className="text-sm font-bold">3-5</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-[#0a0a0a] rounded-xl border border-[#7311d4]/20">
                  <span className="material-symbols-outlined text-[#7311d4] mb-1 text-xl">timer</span>
                  <span className="text-[10px] text-gray-400">راحة</span>
                  <span className="text-sm font-bold">2-3 د</span>
                </div>
              </div>
            </SpotlightCard>

            {/* Exercise 3 */}
            <SpotlightCard className="!p-4 !bg-[#1a1a1a] !border-white/5 !rounded-2xl" spotlightColor="rgba(115, 17, 212, 0.15)">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">سبرنت 30 متر</h3>
                <span className="text-[#7311d4] font-bold">03</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center p-2 bg-[#0a0a0a] rounded-xl border border-[#7311d4]/20">
                  <span className="material-symbols-outlined text-[#7311d4] mb-1 text-xl">speed</span>
                  <span className="text-[10px] text-gray-400">الشدة</span>
                  <span className="text-sm font-bold">100%</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-[#0a0a0a] rounded-xl border border-[#7311d4]/20">
                  <span className="material-symbols-outlined text-[#7311d4] mb-1 text-xl">repeat</span>
                  <span className="text-[10px] text-gray-400">الجولات</span>
                  <span className="text-sm font-bold">3-5</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-[#0a0a0a] rounded-xl border border-[#7311d4]/20">
                  <span className="material-symbols-outlined text-[#7311d4] mb-1 text-xl">timer</span>
                  <span className="text-[10px] text-gray-400">راحة</span>
                  <span className="text-sm font-bold">2-3 د</span>
                </div>
              </div>
            </SpotlightCard>
          </section>
        </FadeContent>

        {/* Tips Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-6 py-4">
            <div className="bg-[#7311d4]/10 border border-[#7311d4]/30 rounded-2xl p-5">
              <h2 className="flex items-center gap-2 text-[#7311d4] font-bold mb-3">
                <span className="material-symbols-outlined">lightbulb</span>
                نصائح الخبراء
              </h2>
              <ul className="space-y-3 text-sm text-gray-200">
                <li className="flex gap-2">
                  <span className="text-[#7311d4] font-bold">•</span>
                  <span>التركيز على <strong className="text-white">الانطلاقة الانفجارية</strong> من وضعية السكون.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#7311d4] font-bold">•</span>
                  <span>استخدم <strong className="text-white">دفع الذراعين</strong> بقوة للأمام وللخلف لزيادة السرعة.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#7311d4] font-bold">•</span>
                  <span>حافظ على استرخاء عضلات الوجه والرقبة أثناء الجري بكامل طاقتك.</span>
                </li>
              </ul>
            </div>
          </section>
        </FadeContent>

        {/* CTA Action Button */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent z-40 max-w-2xl mx-auto">
            <StarBorder as="button" color={workoutStarted ? '#10b981' : '#7311d4'} speed="4s" className="w-full" onClick={() => handleStartWorkout('برنامج السرعة واللياقة', 'تمارين السرعة القصيرة')} disabled={isStarting || workoutStarted}>
              <div className="flex items-center justify-center gap-2 font-bold text-lg">
                {isStarting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : workoutStarted ? (
                  <><span className="material-symbols-outlined">check_circle</span><span>تم تسجيل التدريب بنجاح!</span></>
                ) : (
                  <><span>ابدأ التدريب الآن</span><span className="material-symbols-outlined">rocket_launch</span></>
                )}
              </div>
            </StarBorder>
          </div>
        </FadeContent>
      </main>
    </div>
  );
}
