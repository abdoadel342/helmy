import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { ShinyText } from '../components/react-bits/ShinyText';
import { StarBorder } from '../components/react-bits/StarBorder';

export default function SpeedEndurance() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-x-hidden font-display pb-32">
      {/* Header / Top Bar */}
      <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 border-b border-primary/20">
        <button 
          onClick={() => navigate(-1)}
          className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-bold tracking-tight text-primary">HELMY</h1>
        <div className="w-10"></div> {/* Spacer for balance */}
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full">
        {/* Hero Image Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="@container px-4 py-6">
            <div className="relative overflow-hidden rounded-xl aspect-video bg-primary/10 shadow-2xl border border-primary/20">
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: 'linear-gradient(0deg, rgba(25, 16, 34, 0.9) 0%, rgba(25, 16, 34, 0.2) 60%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAEYdeGApezs5hQxb4NrfqRMMfnW9O6G9tmhsNyEAlazwog8bUKIQmsRIm_U8uMLXcr23KjE94bI1biQrSsHA7vnkR5WoaQUU6SlpHXTcsXTgJcz3yYErG7EMo4YXEUvdMndyK0pzdZx4fkv3bYYswnZnAR6MCzzuR5MYh7K9wWrbL2vrjS_7fRXF8Mi30MQlwvGktPuKsmCoDsM5RDazzXfT24wN4wGDX7iwC9QNBYrNzKdqbf0oQe_DS-CRCCxpm60TTU9p07_jyQ")' }}
              ></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase mb-2">
                  <ShinyText text="Pro Training" disabled={false} speed={3} className="text-white" />
                </span>
                <h2 className="text-3xl font-bold leading-tight text-white">تحمل السرعة <br/><span className="text-primary-300 text-xl font-medium">(Speed Endurance)</span></h2>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Scientific Definition */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-primary">science</span>
              <h3 className="text-xl font-bold">التعريف العلمي</h3>
            </div>
            <SpotlightCard className="!p-4 !bg-primary/5 !border-r-4 !border-r-primary !border-y-0 !border-l-0 !rounded-lg" spotlightColor="rgba(115, 17, 212, 0.15)">
              <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                تحمل السرعة هو القدرة على الحفاظ على سرعة قريبة من القصوى رغم ظهور التعب وتراكم حمض اللاكتيك في العضلات. إنه الجسر بين القوة الانفجارية والتحمل الهوائي.
              </p>
            </SpotlightCard>
          </section>
        </FadeContent>

        {/* Training Principles Grid */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">settings_suggest</span>
              <h3 className="text-xl font-bold">مبادئ التدريب</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SpotlightCard className="!p-4 !bg-white dark:!bg-primary/10 !border-primary/20 !rounded-xl text-center flex flex-col items-center" spotlightColor="rgba(115, 17, 212, 0.15)">
                <span className="material-symbols-outlined text-primary mb-2 text-3xl">bolt</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">الشدة التدريبية</span>
                <span className="text-lg font-bold">90-95%</span>
                <span className="text-xs">من السرعة القصوى</span>
              </SpotlightCard>
              <SpotlightCard className="!p-4 !bg-white dark:!bg-primary/10 !border-primary/20 !rounded-xl text-center flex flex-col items-center" spotlightColor="rgba(115, 17, 212, 0.15)">
                <span className="material-symbols-outlined text-primary mb-2 text-3xl">straighten</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">حجم التدريب</span>
                <span className="text-lg font-bold">300-600م</span>
                <span className="text-xs">مسافات تراكمية</span>
              </SpotlightCard>
              <SpotlightCard className="!p-4 !bg-white dark:!bg-primary/10 !border-primary/20 !rounded-xl text-center flex flex-col items-center" spotlightColor="rgba(115, 17, 212, 0.15)">
                <span className="material-symbols-outlined text-primary mb-2 text-3xl">timer_3</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">فترة الاستشفاء</span>
                <span className="text-lg font-bold">2-3 دقائق</span>
                <span className="text-xs">استشفاء غير مكتمل</span>
              </SpotlightCard>
            </div>
          </section>
        </FadeContent>

        {/* Key Exercises */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">fitness_center</span>
              <h3 className="text-xl font-bold">التمارين الأساسية</h3>
            </div>
            <div className="space-y-4">
              <SpotlightCard className="!p-4 !bg-white dark:!bg-slate-800/50 !border-primary/10 hover:!border-primary/30 transition-colors cursor-pointer !rounded-xl shadow-sm" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">speed</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">سبرنت فترات (Interval Sprints)</h4>
                    <p className="text-sm text-slate-500">5 مجموعات × 60 متر مع راحة دقيقتين</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-400">chevron_left</span>
                </div>
              </SpotlightCard>

              <SpotlightCard className="!p-4 !bg-white dark:!bg-slate-800/50 !border-primary/10 hover:!border-primary/30 transition-colors cursor-pointer !rounded-xl shadow-sm" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">reorder</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">جري مقسم (Segmented Runs)</h4>
                    <p className="text-sm text-slate-500">150م - 120م - 100م - 80م تتابعي</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-400">chevron_left</span>
                </div>
              </SpotlightCard>

              <SpotlightCard className="!p-4 !bg-white dark:!bg-slate-800/50 !border-primary/10 hover:!border-primary/30 transition-colors cursor-pointer !rounded-xl shadow-sm" spotlightColor="rgba(115, 17, 212, 0.15)">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">signal_cellular_alt</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">سبرنت الهرمي (Pyramid Sprints)</h4>
                    <p className="text-sm text-slate-500">زيادة المسافة تدريجياً ثم النزول</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-400">chevron_left</span>
                </div>
              </SpotlightCard>
            </div>
          </section>
        </FadeContent>

        {/* Benefits */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 mb-8">
            <div className="bg-primary/10 rounded-2xl p-6 border border-primary/20">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">verified</span>
                الفوائد الرئيسية
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                  <p>تحسين عتبة اللاكتات (Lactate Threshold) وتأخير الشعور بالتعب.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                  <p>تعزيز القدرة اللاهوائية (Anaerobic Capacity) للجسم.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                  <p>تطوير المرونة النفسية والصلابة العقلية لمواجهة المجهود البدني.</p>
                </li>
              </ul>
            </div>
          </section>
        </FadeContent>

        {/* Safety & Tips */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="px-4 mb-12">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex gap-4">
              <span className="material-symbols-outlined text-amber-500 text-3xl">lightbulb</span>
              <div>
                <h4 className="font-bold text-amber-600 dark:text-amber-400">نصائح الأداء والسلامة</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                  ركز على الحفاظ على ميكانيكا الجري الصحيحة ووضعية الجسم حتى عند شعورك بالتعب الشديد. التكنيك الصحيح يحميك من الإصابة ويزيد من كفاءة التدريب.
                </p>
              </div>
            </div>
          </section>
        </FadeContent>
      </main>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 z-50 p-4 bg-background-light dark:bg-background-dark border-t border-primary/20 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
        <div className="max-w-md mx-auto">
          <StarBorder as="button" color="#7311d4" speed="4s" className="w-full">
            <div className="flex items-center justify-center gap-2 font-bold">
              <span className="material-symbols-outlined">play_circle</span>
              <span>ابدأ التدريب الآن</span>
            </div>
          </StarBorder>
        </div>
      </div>
    </div>
  );
}
