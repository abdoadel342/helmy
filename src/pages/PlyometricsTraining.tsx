import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { ShinyText } from '../components/react-bits/ShinyText';
import { StarBorder } from '../components/react-bits/StarBorder';
import { useStartWorkout } from '../useStartWorkout';

export default function PlyometricsTraining() {
  const navigate = useNavigate();
  const { isStarting, workoutStarted, handleStartWorkout } = useStartWorkout();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-x-hidden font-display">
      {/* TopAppBar */}
      <header className="flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 sticky top-0 z-50 border-b border-primary/10">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <h1 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 mr-4">تمارين البليومتريك</h1>
        <button className="flex items-center justify-center size-10 text-slate-400 hover:bg-primary/10 hover:text-primary rounded-full transition-colors">
          <span className="material-symbols-outlined">share</span>
        </button>
      </header>

      <main className="flex-1 pb-24 max-w-2xl mx-auto w-full">
        {/* Hero Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="relative h-[300px] w-full overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDmBTfoa9NUNGSOTSMCqziz0BfPewY8AqSWZIYbYPXDNfkQrCIiXcQ0G0YxZHvB7h7i6cmUAZNcnr4c2eKSCNbj2XBJMTcfdUdldwLCVn_5HTsSRnZgUUSVjAuptUomwBAZ3d3mqUAqJYayq-NV3D9VRlRaUQ-HoDfrFe9X-BBvyfKKhXn4Z9HOLIij2jpZHL4l4y0CZ-6KuDonFHmDmrvpAJ4Jptfpaoqk-DGCc73pAI0UV9LkYpumN7S9GjqPrf4QbgwPVs3sRG1x")' }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>
            <div className="absolute bottom-6 px-6">
              <span className="inline-block px-3 py-1 mb-2 text-xs font-bold uppercase tracking-wider bg-primary text-white rounded-full">
                <ShinyText text="المستوى المتقدم" disabled={false} speed={3} className="text-white" />
              </span>
              <h2 className="text-3xl font-extrabold text-white leading-tight">القوة الانفجارية القصوى</h2>
            </div>
          </section>
        </FadeContent>

        {/* SSC Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="p-6">
            <div className="flex items-center gap-2 mb-3 text-primary">
              <span className="material-symbols-outlined">science</span>
              <h3 className="text-xl font-bold">دورة التمدد والتقلص (SSC)</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
              تعتمد تمارين البليومتريك على مبدأ علمي يُعرف بدورة التمدد والتقلص. تعمل هذه العملية على تخزين الطاقة المرنة في العضلات والأوتار خلال مرحلة "التمدد" السريع، ثم إطلاقها بشكل مفاجئ في مرحلة "التقلص"، مما يعزز القدرة على القفز والسرعة بشكل يفوق القوة العضلية التقليدية.
            </p>
          </section>
        </FadeContent>

        {/* Key Exercises Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-6 py-4 space-y-4">
            <h3 className="text-lg font-bold border-r-4 border-primary pr-3">أهم التمارين</h3>
            
            <SpotlightCard className="!p-0 !bg-slate-100 dark:!bg-primary/5 !border-slate-200 dark:!border-primary/10 hover:!border-primary/30 transition-all !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
              <div className="flex gap-4 p-4">
                <div className="size-16 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-3xl">vertical_align_top</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-primary">قفزة الصندوق (Box Jumps)</h4>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">3-5 مجموعات</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">التركيز على الهبوط الناعم والتحكم الكامل. 3-6 تكرارات.</p>
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard className="!p-0 !bg-slate-100 dark:!bg-primary/5 !border-slate-200 dark:!border-primary/10 hover:!border-primary/30 transition-all !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
              <div className="flex gap-4 p-4">
                <div className="size-16 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-3xl">downhill_skiing</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-primary">القفز العميق (Depth Jumps)</h4>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">3-4 مجموعات</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">القفز من ارتفاع ثم القفز للأعلى فوراً عند ملامسة الأرض.</p>
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard className="!p-0 !bg-slate-100 dark:!bg-primary/5 !border-slate-200 dark:!border-primary/10 hover:!border-primary/30 transition-all !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
              <div className="flex gap-4 p-4">
                <div className="size-16 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-3xl">directions_run</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-primary">القفز الجانبي (Lateral Bounds)</h4>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">4 مجموعات</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">تطوير القوة الجانبية والثبات. 5 تكرارات لكل جانب.</p>
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard className="!p-0 !bg-slate-100 dark:!bg-primary/5 !border-slate-200 dark:!border-primary/10 hover:!border-primary/30 transition-all !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
              <div className="flex gap-4 p-4">
                <div className="size-16 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-3xl">bolt</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-primary">قفز القرفصاء (Squat Jumps)</h4>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">3-5 مجموعات</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">انفجار للأعلى من وضعية القرفصاء بأقصى سرعة ممكنة.</p>
                </div>
              </div>
            </SpotlightCard>
          </section>
        </FadeContent>

        {/* Pro Tips Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="p-6 mx-6 my-4 bg-primary rounded-2xl text-white shadow-xl shadow-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined">lightbulb</span>
              <h3 className="font-bold">نصائح المحترفين (Pro Tips)</h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm mt-0.5">check_circle</span>
                <span>ركز على ميكانيكية الهبوط؛ يجب أن يكون الهبوط هادئاً باستخدام كامل القدم لامتصاص الصدمات.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm mt-0.5">timer</span>
                <span>الراحة الكاملة ضرورية: خذ من 2 إلى 3 دقائق بين المجموعات لضمان استشفاء الجهاز العصبي.</span>
              </li>
            </ul>
          </section>
        </FadeContent>

        {/* Safety Guidelines Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="p-6 bg-slate-50 dark:bg-white/5 border-y border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-2 mb-4 text-amber-500">
              <span className="material-symbols-outlined">warning</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">إرشادات السلامة للمبتدئين</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-background-light dark:bg-background-dark rounded-lg border border-slate-200 dark:border-white/5">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">الأساس</p>
                <p className="text-xs font-medium">اتقن حركات القرفصاء والاندفاع أولاً قبل البدء بالقفز.</p>
              </div>
              <div className="p-3 bg-background-light dark:bg-background-dark rounded-lg border border-slate-200 dark:border-white/5">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">السطح</p>
                <p className="text-xs font-medium">تمرن على أسطح ممتصة للصدمات مثل العشب أو بساط النادي.</p>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* CTA Action Button */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-6 py-8">
            <StarBorder as="button" color={workoutStarted ? '#10b981' : '#7311d4'} speed="4s" className="w-full" onClick={() => handleStartWorkout('برنامج السرعة واللياقة', 'تمارين البليومتريك')} disabled={isStarting || workoutStarted}>
              <div className="flex items-center justify-center gap-2 font-bold">
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
