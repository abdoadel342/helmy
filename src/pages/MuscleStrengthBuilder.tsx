import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';

export default function MuscleStrengthBuilder() {
  const navigate = useNavigate();
  const [selectedMuscle, setSelectedMuscle] = useState('الصدر');
  const [selectedPart, setSelectedPart] = useState('العلوي');
  const [sets, setSets] = useState(4);
  const [reps, setReps] = useState(12);
  const [restTime, setRestTime] = useState(60);

  const muscles = ['الصدر', 'الظهر', 'الكتف', 'الذراعين', 'الأرجل', 'البطن'];
  const parts = ['العلوي', 'السفلي', 'الداخلي', 'الخارجي'];

  return (
    <FadeContent blur={true} duration={600} easing="ease-out" initialOpacity={0}>
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden pb-48 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display">
        
        {/* Header */}
        <header className="flex items-center justify-between p-4 sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center size-10 rounded-full bg-slate-200 dark:bg-primary/20 text-slate-900 dark:text-slate-100"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <h1 className="text-xl font-bold tracking-tight text-center flex-1">برنامج القوة العضلية</h1>
          <div className="size-10"></div> {/* Spacer for symmetry */}
        </header>

        {/* Hero Section */}
        <div className="px-4 py-6">
          <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary/40 p-6 flex flex-col justify-end">
            <img 
              alt="Muscular person training" 
              className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-60" 
              src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded mb-2 inline-block">مستوى متقدم</span>
              <h2 className="text-2xl font-bold text-white leading-tight">تحدي تضخيم العضلات</h2>
              <p className="text-white/80 text-sm">برنامج مكثف لمدة ٨ أسابيع</p>
            </div>
          </div>
        </div>

        {/* Workout Builder Configuration */}
        <div className="px-4 space-y-8">
          
          {/* Muscle Selection Section */}
          <section>
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">target</span>
              اختر العضلة المستهدفة
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {muscles.map((muscle) => (
                <button 
                  key={muscle}
                  onClick={() => setSelectedMuscle(muscle)}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-colors ${
                    selectedMuscle === muscle 
                      ? 'border-primary bg-primary/5 text-primary' 
                      : 'border-slate-200 dark:border-primary/10 bg-white dark:bg-primary/5 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span className="font-medium">{muscle}</span>
                  {selectedMuscle === muscle ? (
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  ) : (
                    <div className="size-5 rounded-full border-2 border-slate-300 dark:border-primary/30"></div>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Target Muscle Part Section */}
          <section>
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">layers</span>
              جزء العضلة المستهدف
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {parts.map((part) => (
                <button 
                  key={part}
                  onClick={() => setSelectedPart(part)}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-colors ${
                    selectedPart === part 
                      ? 'border-primary bg-primary/5 text-primary' 
                      : 'border-slate-200 dark:border-primary/10 bg-white dark:bg-primary/5 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span className="font-medium">{part}</span>
                  {selectedPart === part ? (
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  ) : (
                    <div className="size-5 rounded-full border-2 border-slate-300 dark:border-primary/30"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Anatomical Detail View (Conditional based on selection) */}
            {selectedMuscle === 'الصدر' && selectedPart === 'العلوي' && (
              <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-primary text-sm">biotech</span>
                  <h4 className="text-sm font-bold text-primary">التفاصيل التشريحية (الصدر العلوي)</h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-0.5 p-2 rounded-lg bg-white/50 dark:bg-primary/10 border border-primary/5">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase leading-none">Pectoralis Major</span>
                    <span className="text-xs font-semibold">العضلة الصدرية الكبيرة</span>
                  </div>
                  <div className="flex flex-col gap-0.5 p-2 rounded-lg bg-white/50 dark:bg-primary/10 border border-primary/5">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase leading-none">Clavicular Head</span>
                    <span className="text-xs font-semibold">الرأس الترقوي</span>
                  </div>
                  <div className="flex flex-col gap-0.5 p-2 rounded-lg bg-white/50 dark:bg-primary/10 border border-primary/5">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase leading-none">Anterior Deltoid</span>
                    <span className="text-xs font-semibold">الدالية الأمامية (مساعد)</span>
                  </div>
                  <div className="flex flex-col gap-0.5 p-2 rounded-lg bg-white/50 dark:bg-primary/10 border border-primary/5">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase leading-none">Pectoralis Minor</span>
                    <span className="text-xs font-semibold">العضلة الصدرية الصغيرة</span>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Sets and Reps Configuration */}
          <section className="space-y-4">
            
            {/* Sets Counter */}
            <div className="bg-slate-100 dark:bg-primary/5 p-4 rounded-2xl border border-slate-200 dark:border-primary/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">refresh</span>
                  <h3 className="font-bold">عدد المجموعات</h3>
                </div>
                <span className="text-primary font-bold text-lg">{sets}</span>
              </div>
              <div className="flex items-center justify-between bg-white dark:bg-background-dark rounded-xl p-2 border border-slate-200 dark:border-primary/20">
                <button 
                  onClick={() => setSets(s => s + 1)}
                  className="size-10 rounded-lg bg-slate-100 dark:bg-primary/20 flex items-center justify-center text-primary"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
                <div className="flex gap-2">
                  <span className="text-2xl font-bold">{sets}</span>
                  <span className="text-slate-500 text-sm self-end pb-1">مجموعات</span>
                </div>
                <button 
                  onClick={() => setSets(s => Math.max(1, s - 1))}
                  className="size-10 rounded-lg bg-slate-100 dark:bg-primary/20 flex items-center justify-center text-primary"
                >
                  <span className="material-symbols-outlined">remove</span>
                </button>
              </div>
            </div>

            {/* Reps Counter */}
            <div className="bg-slate-100 dark:bg-primary/5 p-4 rounded-2xl border border-slate-200 dark:border-primary/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">fitness_center</span>
                  <h3 className="font-bold">عدد التكرارات</h3>
                </div>
                <span className="text-primary font-bold text-lg">{reps}</span>
              </div>
              <div className="flex items-center justify-between bg-white dark:bg-background-dark rounded-xl p-2 border border-slate-200 dark:border-primary/20">
                <button 
                  onClick={() => setReps(r => r + 1)}
                  className="size-10 rounded-lg bg-slate-100 dark:bg-primary/20 flex items-center justify-center text-primary"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
                <div className="flex gap-2">
                  <span className="text-2xl font-bold">{reps}</span>
                  <span className="text-slate-500 text-sm self-end pb-1">تكرار</span>
                </div>
                <button 
                  onClick={() => setReps(r => Math.max(1, r - 1))}
                  className="size-10 rounded-lg bg-slate-100 dark:bg-primary/20 flex items-center justify-center text-primary"
                >
                  <span className="material-symbols-outlined">remove</span>
                </button>
              </div>
            </div>

            {/* Rest Time Counter */}
            <div className="bg-slate-100 dark:bg-primary/5 p-4 rounded-2xl border border-slate-200 dark:border-primary/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">timer</span>
                  <h3 className="font-bold">وقت الراحة</h3>
                </div>
                <span className="text-primary font-bold text-lg">{restTime}</span>
              </div>
              <div className="flex items-center justify-between bg-white dark:bg-background-dark rounded-xl p-2 border border-slate-200 dark:border-primary/20">
                <button 
                  onClick={() => setRestTime(r => r + 15)}
                  className="size-10 rounded-lg bg-slate-100 dark:bg-primary/20 flex items-center justify-center text-primary"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
                <div className="flex gap-2">
                  <span className="text-2xl font-bold">{restTime}</span>
                  <span className="text-slate-500 text-sm self-end pb-1">ثانية</span>
                </div>
                <button 
                  onClick={() => setRestTime(r => Math.max(15, r - 15))}
                  className="size-10 rounded-lg bg-slate-100 dark:bg-primary/20 flex items-center justify-center text-primary"
                >
                  <span className="material-symbols-outlined">remove</span>
                </button>
              </div>
            </div>

          </section>

          {/* Summary / Hint */}
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-start gap-3">
            <span className="material-symbols-outlined text-primary">info</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              سيقوم النظام بإنشاء تسلسل تمارين مخصص بناءً على اختيارك لـ <span className="text-primary font-bold">{selectedMuscle} ({selectedPart})</span> مع نظام تكرار مرتفع لتحفيز الضخامة.
            </p>
          </div>

        </div>

        {/* Start Workout Button */}
        <div className="fixed bottom-20 left-0 right-0 px-4 py-4 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light dark:via-background-dark to-transparent z-10">
          <button className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-2xl shadow-primary/40 flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
            <span className="material-symbols-outlined">play_arrow</span>
            تأكيد وابدأ التمرين
          </button>
        </div>

      </div>
    </FadeContent>
  );
}
