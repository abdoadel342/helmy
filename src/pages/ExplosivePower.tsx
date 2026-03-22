import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { ShinyText } from '../components/react-bits/ShinyText';
import { StarBorder } from '../components/react-bits/StarBorder';
import { useStartWorkout } from '../useStartWorkout';

export default function ExplosivePower() {
  const navigate = useNavigate();
  const { isStarting, workoutStarted, handleStartWorkout } = useStartWorkout();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-x-hidden font-display">
      {/* TopAppBar */}
      <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-primary/10">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center p-2 rounded-full text-slate-900 dark:text-white hover:bg-primary/20 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <h1 className="text-xl font-bold leading-tight tracking-tight">القوة الانفجارية</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded">HELMY</span>
        </div>
      </header>

      <main className="flex-1 pb-24 max-w-2xl mx-auto w-full">
        {/* Hero Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="@container px-4 py-4">
            <div 
              className="relative w-full aspect-video @[480px]:aspect-[21/9] bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl group shadow-2xl border border-primary/20" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDoZUk9QQ-9t0pDIW-fQdTE9Kg0JamP67mkafIYwaT3NP5aGa-DkMwKCGEPAwBFDO80JDCWgEib9bTt5ij4HUvY-Vll_Rdqw1hvUgxOG8Ycda_A2UIdOhLrKr2Ja8eca9qUE7UdGzKF3mVg9LO0jo14iZRcZYAwqdrtTaMcAlpeHzkM-cC2QIxrlshCyrRFWOTgkp7gXYrSGMLtG70TLjGSawPhcukykmM0HTaQ-OKaFpN6lsJBcFB6Dummq73djOQEY9ISs5tXlyHo")' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
              <div className="relative p-6">
                <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                  <ShinyText text="مستوى متقدم" disabled={false} speed={3} className="text-white" />
                </span>
                <h2 className="text-white text-2xl font-bold">تطوير القدرة القصوى</h2>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Scientific Definition */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">analytics</span>
              <h2 className="text-xl font-bold">التعريف العلمي</h2>
            </div>
            <SpotlightCard className="!p-5 !bg-primary/5 !border-primary/10 !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
              <h3 className="text-primary font-bold mb-2">منحنى القوة والسرعة (Force-Velocity Curve)</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                القوة الانفجارية هي القدرة على بذل أقصى جهد في أقصر زمن ممكن. تعتمد على التجنيد السريع للألياف العضلية البيضاء. وهي حيوية جداً لعدائي المسافات القصيرة (Sprinting) لزيادة قوة الدفع وتقليل زمن التلامس مع الأرض.
              </p>
            </SpotlightCard>
          </section>
        </FadeContent>

        {/* Main Exercises List */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">fitness_center</span>
              <h2 className="text-xl font-bold">التمارين الأساسية</h2>
            </div>
            <div className="space-y-4">
              {/* Exercise 1 */}
              <SpotlightCard className="!p-3 !bg-primary/5 !border-primary/10 hover:!border-primary/30 transition-colors cursor-pointer !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-center gap-4">
                  <div className="size-16 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBQIHBWu-U8fwkvCsF9Y8Pg-MeG5rwdV5wXq_4NlZLi5EkL_yygJeaMAieUCHei6x6_EfcBOFMqZIKbpOC-9Cs_zrkGkIfpzlgMAJ918d7VgRoAOeTf31GeXjKnh1IUuI8kYNz3YX9PYc4PVza8US9qi7m2JPZtZSC9c4tELsaXsWLRGPATeZdq-CQixDm86Lc9FGqG5dlVtvWvSWqP2xH92dZGbRtUPNhcR1HdQtBCelqOgvQZ-fdMsjSzRxc2JJcBhPMmkr8VNrCx')" }}></div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">الرفعات الأولمبية (Olympic Lifts)</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">تحتاج مهارة فنية عالية جداً لتجنب الإصابة.</p>
                  </div>
                  <span className="material-symbols-outlined text-primary/40">chevron_left</span>
                </div>
              </SpotlightCard>

              {/* Exercise 2 */}
              <SpotlightCard className="!p-3 !bg-primary/5 !border-primary/10 hover:!border-primary/30 transition-colors cursor-pointer !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-center gap-4">
                  <div className="size-16 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAReIBg8OFMblPnSZcH53YOuvWrAGvNUmz3YPIoMICnHvn1N2Y651rAFE0oAFMNDyAEJRUPSevD3MqKlSeFzVHSeua0Azl3SeqXSK5AWt_VWB5Oh9yTYbutxY4xJ-lutiM25Tm3n4cDb1Gr50ravz-YaQ94GLc0swvQSngv69W-1M1shmHsltVncmw0aUmLVLYsktg5yqtz0Eh8hBoE0BKyBYSvLeX81MddABJW_iNBUk6qCJLd7cZHH67jl8tcuApXc84SJSKXHDSt')" }}></div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">رمي الكرة الطبية (Med Ball Slams)</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">ممتاز لتطوير القوة الانفجارية للجزء العلوي.</p>
                  </div>
                  <span className="material-symbols-outlined text-primary/40">chevron_left</span>
                </div>
              </SpotlightCard>

              {/* Exercise 3 */}
              <SpotlightCard className="!p-3 !bg-primary/5 !border-primary/10 hover:!border-primary/30 transition-colors cursor-pointer !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-center gap-4">
                  <div className="size-16 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAhN_4kQwJFp5m7MluEIm8YmGytR8aMb1MdswxcUPIF5RiYHs2sCqPkH86UCbMZzmDoBvWQ-Ax3I8gsPqbZCOOu14TebHDJCj0uwIA79UVmlXyXI3GJMghaMJoAeiS-q34eezYEr0C-qZveIhnLw5KlqRtzWpxILliKx-k86mDWFdyVL9u2VxyX3Z3LwCfNxJ4KveTa9LCXhOaOFUsFkXM_sBjDZdXfCynZoC-7HS2zH1UKlkXJkN7CZqpcjOmQ3CRZFKS5L5IiqMWu')" }}></div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">القفز بالأوزان (Loaded Jumps)</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">تستهدف انفجارية عضلات الرجلين والقفز العمودي.</p>
                  </div>
                  <span className="material-symbols-outlined text-primary/40">chevron_left</span>
                </div>
              </SpotlightCard>
            </div>
          </section>
        </FadeContent>

        {/* Training Parameters */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-6 bg-primary/5 my-4 mx-4 rounded-2xl border border-primary/10">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">timer</span>
              <h2 className="text-xl font-bold">بروتوكول التدريب</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-background-light dark:bg-background-dark rounded-lg shadow-sm border border-primary/5">
                <div className="text-primary font-bold text-xl">1-5</div>
                <div className="text-[10px] text-slate-500 uppercase mt-1">تكرارات</div>
              </div>
              <div className="text-center p-3 bg-background-light dark:bg-background-dark rounded-lg shadow-sm border border-primary/5">
                <div className="text-primary font-bold text-xl">90%</div>
                <div className="text-[10px] text-slate-500 uppercase mt-1">الشدة</div>
              </div>
              <div className="text-center p-3 bg-background-light dark:bg-background-dark rounded-lg shadow-sm border border-primary/5">
                <div className="text-primary font-bold text-xl">3-5د</div>
                <div className="text-[10px] text-slate-500 uppercase mt-1">راحة</div>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Important Tips */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 py-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">tips_and_updates</span>
              <h2 className="text-xl font-bold">نصائح هامة</h2>
            </div>
            <ul className="space-y-3">
              <SpotlightCard className="!p-3 !bg-white/5 !border-transparent hover:!border-primary/20 transition-colors !rounded-lg" spotlightColor="rgba(115, 17, 212, 0.15)">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                  <p className="text-sm">التركيز التام على سرعة الحركة وليس فقط رفع الوزن.</p>
                </li>
              </SpotlightCard>
              <SpotlightCard className="!p-3 !bg-white/5 !border-transparent hover:!border-primary/20 transition-colors !rounded-lg" spotlightColor="rgba(115, 17, 212, 0.15)">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                  <p className="text-sm">الجودة أهم من الكمية؛ توقف إذا بدأت سرعة الأداء بالتناقص.</p>
                </li>
              </SpotlightCard>
              <SpotlightCard className="!p-3 !bg-white/5 !border-transparent hover:!border-primary/20 transition-colors !rounded-lg" spotlightColor="rgba(115, 17, 212, 0.15)">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                  <p className="text-sm">الإحماء الحركي الجيد ضروري جداً لتنشيط الجهاز العصبي.</p>
                </li>
              </SpotlightCard>
            </ul>
          </section>
        </FadeContent>
      </main>

      {/* Fixed CTA Button */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-light via-background-light dark:from-background-dark dark:via-background-dark to-transparent z-50">
        <div className="max-w-2xl mx-auto">
          <StarBorder as="button" color={workoutStarted ? '#10b981' : '#7311d4'} speed="4s" className="w-full" onClick={() => handleStartWorkout('برنامج السرعة واللياقة', 'القوة الانفجارية')} disabled={isStarting || workoutStarted}>
            <div className="flex items-center justify-center gap-2 font-bold">
              {isStarting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : workoutStarted ? (
                <><span className="material-symbols-outlined">check_circle</span><span>تم تسجيل التدريب بنجاح!</span></>
              ) : (
                <><span className="material-symbols-outlined">play_circle</span><span>ابدأ التدريب الآن</span></>
              )}
            </div>
          </StarBorder>
        </div>
      </footer>
    </div>
  );
}
