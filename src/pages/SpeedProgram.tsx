import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { ShinyText } from '../components/react-bits/ShinyText';
import { StarBorder } from '../components/react-bits/StarBorder';
import { useStartWorkout } from '../useStartWorkout';

export default function SpeedProgram() {
  const navigate = useNavigate();
  const { isStarting, workoutStarted, handleStartWorkout } = useStartWorkout();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-x-hidden font-display">
      {/* TopAppBar */}
      <header className="flex items-center bg-background-light dark:bg-background-dark p-4 sticky top-0 z-10 border-b border-primary/10">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center justify-center p-2 rounded-full text-slate-900 dark:text-white hover:bg-primary/20 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <h1 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight flex-1 mr-4">برنامج السرعة</h1>
        <button className="flex items-center justify-center size-10 text-primary hover:bg-primary/10 rounded-full transition-colors">
          <span className="material-symbols-outlined">share</span>
        </button>
      </header>

      <main className="flex-1 pb-12 max-w-2xl mx-auto w-full">
        {/* Hero Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="@container px-4 py-4">
            <div 
              className="w-full aspect-video bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl relative group shadow-2xl border border-primary/20" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBd_jWwfX1kasheeBPs0NRAjM34iQwEEM_vN_F_TTekcXYAF3hiV2jw4gPSGIkv-GPRm8jUld4Rsb3qikIaRD4N_eAxkMK1z5wwiddrItVAeUTBbP_aFtMKZz2XnKYYUEruCL7UJqAFgmopGFoIuyVRMY66iAxViFJet9EA9suWz6Xo_OjiYEjjoXWMu5c6Wqu_gRKB3JorgElFBV9KQl9yyyRgEG-dqsnm78-4lQrzbDpxujuxCRSYwKaIhg2PbHXWp8FqviI8RTOG")' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/20 to-transparent"></div>
              <div className="relative p-6">
                <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-2">
                  <ShinyText text="مستوى متقدم" disabled={false} speed={3} className="text-white" />
                </span>
                <h2 className="text-white text-2xl font-bold">تطوير القوة الانفجارية</h2>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Working Muscles / Kinematic Anatomy Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="mt-4">
            <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold px-4 mb-3">العضلات العاملة / التشريح الحركي</h3>
            <div className="flex flex-col gap-4 px-4">
              {/* Lower Limb */}
              <SpotlightCard className="!p-4 !bg-primary/5 !border-primary/20 !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-center gap-2 mb-3 text-primary">
                  <span className="material-symbols-outlined">downhill_skiing</span>
                  <h4 className="font-bold">الطرف السفلي</h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-sm bg-background-dark/5 dark:bg-background-dark/30 p-2 rounded-lg border border-primary/10">
                    <span className="size-2 rounded-full bg-primary shrink-0"></span>
                    أوتار الركبة
                  </div>
                  <div className="flex items-center gap-2 text-sm bg-background-dark/5 dark:bg-background-dark/30 p-2 rounded-lg border border-primary/10">
                    <span className="size-2 rounded-full bg-primary shrink-0"></span>
                    الألوية
                  </div>
                  <div className="flex items-center gap-2 text-sm bg-background-dark/5 dark:bg-background-dark/30 p-2 rounded-lg border border-primary/10">
                    <span className="size-2 rounded-full bg-primary shrink-0"></span>
                    الأمامية (Quadriceps)
                  </div>
                  <div className="flex items-center gap-2 text-sm bg-background-dark/5 dark:bg-background-dark/30 p-2 rounded-lg border border-primary/10">
                    <span className="size-2 rounded-full bg-primary shrink-0"></span>
                    قابضات الورك
                  </div>
                  <div className="flex items-center gap-2 text-sm bg-background-dark/5 dark:bg-background-dark/30 p-2 rounded-lg border border-primary/10 col-span-2">
                    <span className="size-2 rounded-full bg-primary shrink-0"></span>
                    عضلات السمانة
                  </div>
                </div>
              </SpotlightCard>

              {/* Core & Upper Limb */}
              <div className="grid grid-cols-1 gap-4">
                <SpotlightCard className="!p-4 !bg-primary/5 !border-primary/20 !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                  <div className="flex items-center gap-2 mb-3 text-primary">
                    <span className="material-symbols-outlined">accessibility_new</span>
                    <h4 className="font-bold">عضلات الجذع</h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">البطن والمائلة، العضلة المادة للعمود الفقري (أسفل الظهر)</p>
                </SpotlightCard>
                <SpotlightCard className="!p-4 !bg-primary/5 !border-primary/20 !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                  <div className="flex items-center gap-2 mb-3 text-primary">
                    <span className="material-symbols-outlined">fitness_center</span>
                    <h4 className="font-bold">الطرف العلوي</h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">الدالية (الكتف)، العضدية ثنائية وثلاثية الرؤوس (الذراعين)</p>
                </SpotlightCard>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Fitness Elements for Speed Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="mt-8">
            <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold px-4 mb-3">عناصر اللياقة البدنية للجري السريع</h3>
            <div className="flex flex-col gap-3 px-4">
              {/* Speed Detailed */}
              <SpotlightCard className="!p-4 !bg-slate-100 dark:!bg-slate-800/50 !border-slate-200 dark:!border-slate-800 !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-primary">speed</span>
                    <span className="font-bold">السرعة (Speed)</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1 text-xs text-slate-600 dark:text-slate-400 mr-8">
                    <div className="flex items-center gap-2">• سرعة رد الفعل (Reactive Speed)</div>
                    <div className="flex items-center gap-2">• التسارع (Acceleration)</div>
                    <div className="flex items-center gap-2">• السرعة القصوى (Maximum Speed)</div>
                  </div>
                </div>
              </SpotlightCard>

              {/* Explosive Power */}
              <SpotlightCard className="!p-4 !bg-slate-100 dark:!bg-slate-800/50 !border-slate-200 dark:!border-slate-800 !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">bolt</span>
                    <div className="flex flex-col">
                      <span className="font-bold">القدرة العضلية</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">القوة الانفجارية للأطراف</span>
                    </div>
                  </div>
                  <span className="text-xs text-primary font-bold bg-primary/10 px-2 py-1 rounded-md">أساسي</span>
                </div>
              </SpotlightCard>

              {/* Speed Endurance */}
              <SpotlightCard className="!p-4 !bg-slate-100 dark:!bg-slate-800/50 !border-slate-200 dark:!border-slate-800 !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">vital_signs</span>
                    <div className="flex flex-col">
                      <span className="font-bold">تحمل السرعة</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">الحفاظ على السرعة لفترة أطول</span>
                    </div>
                  </div>
                  <span className="text-xs text-primary font-bold bg-primary/10 px-2 py-1 rounded-md">متوسط</span>
                </div>
              </SpotlightCard>

              {/* Dynamic Flexibility */}
              <SpotlightCard className="!p-4 !bg-slate-100 dark:!bg-slate-800/50 !border-slate-200 dark:!border-slate-800 !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">settings_accessibility</span>
                    <div className="flex flex-col">
                      <span className="font-bold">المرونة الحركية</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">المدى الحركي للمفاصل أثناء الجري</span>
                    </div>
                  </div>
                  <span className="text-xs text-primary font-bold bg-primary/10 px-2 py-1 rounded-md">تكميلي</span>
                </div>
              </SpotlightCard>

              {/* Coordination */}
              <SpotlightCard className="!p-4 !bg-slate-100 dark:!bg-slate-800/50 !border-slate-200 dark:!border-slate-800 !rounded-xl" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">sync_alt</span>
                    <div className="flex flex-col">
                      <span className="font-bold">التوافق العصبي العضلي</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">تناغم عمل العضلات والأعصاب</span>
                    </div>
                  </div>
                  <span className="text-xs text-primary font-bold bg-primary/10 px-2 py-1 rounded-md">عالي</span>
                </div>
              </SpotlightCard>
            </div>
          </section>
        </FadeContent>

        {/* Exercises Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="mt-8 mb-10">
            <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold px-4 mb-3">تمارين تقوية العضلات العاملة</h3>
            <div className="flex flex-col gap-4 px-4">
              {/* Exercise Card 1 */}
              <SpotlightCard 
                className="!p-0 !bg-slate-100 dark:!bg-slate-800/40 !border-slate-200 dark:!border-slate-800 hover:!border-primary/30 transition-colors cursor-pointer group !rounded-xl" 
                spotlightColor="rgba(115, 17, 212, 0.15)"
                onClick={() => navigate('/education/training/speed/plyometrics')}
              >
                <div className="flex overflow-hidden w-full h-full">
                  <div className="w-24 h-24 shrink-0 bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20">
                    <span className="material-symbols-outlined text-primary text-3xl">sports_gymnastics</span>
                  </div>
                  <div className="flex flex-col justify-center p-4 flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">تمارين البليومتريك</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">تطوير القوة الانفجارية والقفز</p>
                  </div>
                  <div className="flex items-center justify-end px-4">
                    <span className="material-symbols-outlined text-primary text-3xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">play_circle</span>
                  </div>
                </div>
              </SpotlightCard>

              {/* Exercise Card 2 */}
              <SpotlightCard 
                className="!p-0 !bg-slate-100 dark:!bg-slate-800/40 !border-slate-200 dark:!border-slate-800 hover:!border-primary/30 transition-colors cursor-pointer group !rounded-xl" 
                spotlightColor="rgba(115, 17, 212, 0.15)"
                onClick={() => navigate('/education/training/speed/short-sprints')}
              >
                <div className="flex overflow-hidden w-full h-full">
                  <div className="w-24 h-24 shrink-0 bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20">
                    <span className="material-symbols-outlined text-primary text-3xl">timer</span>
                  </div>
                  <div className="flex flex-col justify-center p-4 flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">تمارين السرعة القصيرة</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">زيادة سرعة الانطلاق والتسارع</p>
                  </div>
                  <div className="flex items-center justify-end px-4">
                    <span className="material-symbols-outlined text-primary text-3xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">play_circle</span>
                  </div>
                </div>
              </SpotlightCard>

              {/* Exercise Card 3 */}
              <SpotlightCard 
                className="!p-0 !bg-slate-100 dark:!bg-slate-800/40 !border-slate-200 dark:!border-slate-800 hover:!border-primary/30 transition-colors cursor-pointer group !rounded-xl" 
                spotlightColor="rgba(115, 17, 212, 0.15)"
                onClick={() => navigate('/education/training/speed/starting-block')}
              >
                <div className="flex overflow-hidden w-full h-full">
                  <div className="w-24 h-24 shrink-0 bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20">
                    <span className="material-symbols-outlined text-primary text-3xl">start</span>
                  </div>
                  <div className="flex flex-col justify-center p-4 flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">إتقان وضعية البدء</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">تعلم تقنيات الانطلاق السريع</p>
                  </div>
                  <div className="flex items-center justify-end px-4">
                    <span className="material-symbols-outlined text-primary text-3xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">play_circle</span>
                  </div>
                </div>
              </SpotlightCard>

              {/* Exercise Card 4 */}
              <SpotlightCard 
                className="!p-0 !bg-slate-100 dark:!bg-slate-800/40 !border-slate-200 dark:!border-slate-800 hover:!border-primary/30 transition-colors cursor-pointer group !rounded-xl" 
                spotlightColor="rgba(115, 17, 212, 0.15)"
                onClick={() => navigate('/education/training/speed/max-speed')}
              >
                <div className="flex overflow-hidden w-full h-full">
                  <div className="w-24 h-24 shrink-0 bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20">
                    <span className="material-symbols-outlined text-primary text-3xl">speed</span>
                  </div>
                  <div className="flex flex-col justify-center p-4 flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">تمارين السرعة القصوى</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">تحسين السرعة القصوى والركض الفعال</p>
                  </div>
                  <div className="flex items-center justify-end px-4">
                    <span className="material-symbols-outlined text-primary text-3xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">play_circle</span>
                  </div>
                </div>
              </SpotlightCard>

              {/* Exercise Card 5 */}
              <SpotlightCard 
                className="!p-0 !bg-slate-100 dark:!bg-slate-800/40 !border-slate-200 dark:!border-slate-800 hover:!border-primary/30 transition-colors cursor-pointer group !rounded-xl" 
                spotlightColor="rgba(115, 17, 212, 0.15)"
                onClick={() => navigate('/education/training/speed/coordination')}
              >
                <div className="flex overflow-hidden w-full h-full">
                  <div className="w-24 h-24 shrink-0 bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20">
                    <span className="material-symbols-outlined text-primary text-3xl">sync_alt</span>
                  </div>
                  <div className="flex flex-col justify-center p-4 flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">التوافق العصبي العضلي</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">تحسين كفاءة نقل الإشارات العصبية</p>
                  </div>
                  <div className="flex items-center justify-end px-4">
                    <span className="material-symbols-outlined text-primary text-3xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">play_circle</span>
                  </div>
                </div>
              </SpotlightCard>

              {/* Exercise Card 6 */}
              <SpotlightCard 
                className="!p-0 !bg-slate-100 dark:!bg-slate-800/40 !border-slate-200 dark:!border-slate-800 hover:!border-primary/30 transition-colors cursor-pointer group !rounded-xl" 
                spotlightColor="rgba(115, 17, 212, 0.15)"
                onClick={() => navigate('/education/training/speed/balance')}
              >
                <div className="flex overflow-hidden w-full h-full">
                  <div className="w-24 h-24 shrink-0 bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20">
                    <span className="material-symbols-outlined text-primary text-3xl">balance</span>
                  </div>
                  <div className="flex flex-col justify-center p-4 flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">تمارين التوازن</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">تعزيز الاستقرار أثناء الحركة السريعة</p>
                  </div>
                  <div className="flex items-center justify-end px-4">
                    <span className="material-symbols-outlined text-primary text-3xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">play_circle</span>
                  </div>
                </div>
              </SpotlightCard>

              {/* Exercise Card 7 */}
              <SpotlightCard 
                className="!p-0 !bg-slate-100 dark:!bg-slate-800/40 !border-slate-200 dark:!border-slate-800 hover:!border-primary/30 transition-colors cursor-pointer group !rounded-xl" 
                spotlightColor="rgba(115, 17, 212, 0.15)"
                onClick={() => navigate('/education/training/speed/agility')}
              >
                <div className="flex overflow-hidden w-full h-full">
                  <div className="w-24 h-24 shrink-0 bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20">
                    <span className="material-symbols-outlined text-primary text-3xl">directions_run</span>
                  </div>
                  <div className="flex flex-col justify-center p-4 flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">تمارين الرشاقة</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">تغيير الاتجاه بسرعة وكفاءة</p>
                  </div>
                  <div className="flex items-center justify-end px-4">
                    <span className="material-symbols-outlined text-primary text-3xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">play_circle</span>
                  </div>
                </div>
              </SpotlightCard>

              {/* Exercise Card 8 */}
              <SpotlightCard 
                className="!p-0 !bg-slate-100 dark:!bg-slate-800/40 !border-slate-200 dark:!border-slate-800 hover:!border-primary/30 transition-colors cursor-pointer group !rounded-xl" 
                spotlightColor="rgba(115, 17, 212, 0.15)"
                onClick={() => navigate('/education/training/speed/speed-endurance')}
              >
                <div className="flex overflow-hidden w-full h-full">
                  <div className="w-24 h-24 shrink-0 bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20">
                    <span className="material-symbols-outlined text-primary text-3xl">vital_signs</span>
                  </div>
                  <div className="flex flex-col justify-center p-4 flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">تحمل السرعة</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">الحفاظ على أعلى سرعة لمسافة أطول</p>
                  </div>
                  <div className="flex items-center justify-end px-4">
                    <span className="material-symbols-outlined text-primary text-3xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">play_circle</span>
                  </div>
                </div>
              </SpotlightCard>

              {/* Exercise Card 9 */}
              <SpotlightCard 
                className="!p-0 !bg-slate-100 dark:!bg-slate-800/40 !border-slate-200 dark:!border-slate-800 hover:!border-primary/30 transition-colors cursor-pointer group !rounded-xl" 
                spotlightColor="rgba(115, 17, 212, 0.15)"
                onClick={() => navigate('/education/training/speed/explosive-power')}
              >
                <div className="flex overflow-hidden w-full h-full">
                  <div className="w-24 h-24 shrink-0 bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20">
                    <span className="material-symbols-outlined text-primary text-3xl">bolt</span>
                  </div>
                  <div className="flex flex-col justify-center p-4 flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">تطوير القدرة القصوى</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">دمج القوة والسرعة لأداء انفجاري</p>
                  </div>
                  <div className="flex items-center justify-end px-4">
                    <span className="material-symbols-outlined text-primary text-3xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">play_circle</span>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </section>
        </FadeContent>

        {/* CTA Action Button */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 pb-8">
            <StarBorder as="button" color={workoutStarted ? '#10b981' : '#7311d4'} speed="4s" className="w-full" onClick={() => handleStartWorkout('برنامج السرعة واللياقة', 'برنامج السرعة واللياقة')} disabled={isStarting || workoutStarted}>
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
