import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BackButton } from '../components/BackButton';
import { FadeContent } from '../components/react-bits/FadeContent';
import GradientText from '../components/react-bits/GradientText';
import { useLanguage } from '../LanguageContext';
import { useStartWorkout } from '../useStartWorkout';
import { usePersistentState } from '../hooks/usePersistentState';
import { speedProgramDays } from './speedData';

const getExerciseEquipment = (name: string): string[] => {
  const equipments = [];
  const text = name.toLowerCase();

  if (text.includes('دمبل')) equipments.push('dumbbells');
  if (text.includes('بار')) equipments.push('barbell');
  if (text.includes('بوسو') || text.includes('وسادة') || text.includes('حبل') || text.includes('سلم') || text.includes('أقماع') || text.includes('صندوق') || text.includes('مكعبات') || text.includes('مزلقة')) equipments.push('others');
  
  if (
    text.includes('وزن') || text.includes('جسم') || text.includes('وقوف') || 
    text.includes('بلانك') || text.includes('سكوات') || text.includes('اندفاع') ||
    text.includes('جسر') || text.includes('طعنات') || text.includes('سوبرمان') ||
    text.includes('سبرنت') || text.includes('جري') || text.includes('قفز') ||
    text.includes('تكرارات') || text.includes('شقلبة') || text.includes('bounds')
  ) {
    equipments.push('bodyweight');
  }

  if (equipments.length === 0) {
    equipments.push('others');
  }

  return equipments;
};

const adjustReps = (repsStr: string, increment: boolean): string => {
  const rangeMatch = repsStr.match(/^(\d+)-(\d+)(.*)$/);
  if (rangeMatch) {
    const start = parseInt(rangeMatch[1]);
    const end = parseInt(rangeMatch[2]);
    const suffix = rangeMatch[3] || '';
    const diff = end - start;
    const newStart = increment ? start + 1 : Math.max(1, start - 1);
    const newEnd = newStart + diff;
    return `${newStart}-${newEnd}${suffix}`;
  }
  const singleMatch = repsStr.match(/^(\d+)(.*)$/);
  if (singleMatch) {
    const val = parseInt(singleMatch[1]);
    const suffix = singleMatch[2] || '';
    const newVal = increment ? val + 5 : Math.max(5, val - 5);
    return `${newVal}${suffix}`;
  }
  return repsStr;
};

const adjustRest = (restStr: string, increment: boolean): string => {
  const match = restStr.match(/^(\d+)(.*)$/);
  if (match) {
    const val = parseInt(match[1]);
    const suffix = match[2] || '';
    const newVal = increment ? val + 15 : Math.max(15, val - 15);
    return `${newVal}${suffix}`;
  }
  return restStr;
};

export default function SpeedProgram() {
  const { language } = useLanguage();
  const { isStarting, workoutStarted, handleStartWorkout } = useStartWorkout();
  
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>(['dumbbells', 'bodyweight', 'others', 'barbell', 'machines', 'cables']);
  const [customExercises, setCustomExercises] = usePersistentState<Record<string, { sets: number; reps: string; rest: string; swappedName?: string }>>('speed_custom_v1', {});
  const [swapMenuOpenFor, setSwapMenuOpenFor] = useState<string | null>(null);

  const programColor = '#3b82f6';

  const day = speedProgramDays[activeDayIdx];
  const filteredExercises = day.exercises.filter(ex => {
    const key = `${day.title}-${ex.name}`;
    const custom = customExercises[key];
    const actualName = custom?.swappedName || ex.name;
    const eqList = getExerciseEquipment(actualName);
    return eqList.some(eq => selectedEquipment.includes(eq));
  });

  const handleStartRoutine = () => {
    if (filteredExercises.length === 0) return;
    const workoutName = `برنامج السرعة - ${day.title}`;
    const description = filteredExercises
      .map((ex) => {
        const custom = customExercises[`${day.title}-${ex.name}`] || { sets: ex.sets, reps: ex.reps, rest: ex.rest };
        return `• ${custom.swappedName || ex.name}: ${custom.sets} مجموعات × ${custom.reps} (راحة ${custom.rest})`;
      })
      .join('\n');
    handleStartWorkout(workoutName, description, 'speed');
  };

  return (
    <FadeContent blur duration={400} easing="ease-out" initialOpacity={0}>
      <div className="dark relative flex h-auto min-h-screen w-full flex-col bg-[#0e0e0e] text-white overflow-x-hidden font-display pb-32">
        <header className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 bg-[#0e0e0e]/80 backdrop-blur-xl border-b border-white/5 mb-4 -mx-4 md:-mx-8">
          <div className="w-10 flex justify-start"><BackButton /></div>
          <h1 className="text-lg font-bold truncate flex-1 text-center flex justify-center">
            <GradientText colors={['#3b82f6','#60a5fa','#3b82f6']} animationSpeed={6} showBorder={false}>
              برنامج السرعة الشامل
            </GradientText>
          </h1>
          <div className="w-10"></div>
        </header>

        <div className="rounded-3xl overflow-hidden p-6 relative shadow-2xl min-h-[180px] flex flex-col justify-end mb-8">
          <div className="absolute inset-0 bg-cover bg-center transition-all duration-500" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1552674605-15c2145bc4bc?q=80&w=2000&auto=format&fit=crop')` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/80 to-transparent" />
          <div className="absolute top-4 left-4 w-24 h-24 rounded-full blur-3xl transition-all duration-500" style={{ backgroundColor: programColor, opacity: 0.4 }} />
          
          <div className="relative z-10 flex items-end gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shrink-0 transition-all duration-500" style={{ backgroundColor: `${programColor}40`, color: programColor, backdropFilter: 'blur(8px)' }}>
              <span className="material-symbols-outlined text-3xl">bolt</span>
            </div>
            <div className="flex-1 pb-1">
              <h2 className="text-xl font-extrabold text-white mb-1">تطوير القوة الانفجارية والسرعة</h2>
              <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">برنامج متكامل لتعزيز ميكانيكا الجري، رفع معدل التسارع، والقدرة الانفجارية الشاملة.</p>
            </div>
          </div>
          <div className="relative z-10 flex flex-wrap gap-2">
            {[
              { icon: 'schedule', label: 'مرن' },
              { icon: 'bar_chart', label: 'جميع المستويات' },
              { icon: 'calendar_month', label: 'حسب المرحلة' },
            ].map((t, i) => (
              <span key={i} className="text-[11px] flex items-center gap-1 px-3 py-1.5 rounded-full font-bold" style={{ color: programColor, backgroundColor: `${programColor}15` }}>
                <span className="material-symbols-outlined text-sm">{t.icon}</span>{t.label}
              </span>
            ))}
          </div>
        </div>

        {/* Equipment Filter */}
        <div className="px-4 mb-6">
          <h3 className="text-sm font-bold text-slate-400 mb-3">الأجهزة والمعدات المتاحة</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'bodyweight', nameAr: 'وزن الجسم', icon: 'accessibility_new' },
              { id: 'dumbbells', nameAr: 'دمبلز', icon: 'fitness_center' },
              { id: 'barbell', nameAr: 'بار', icon: 'exercise' },
              { id: 'others', nameAr: 'معدات أخرى', icon: 'sports_gymnastics' }
            ].map(option => {
              const isSelected = selectedEquipment.includes(option.id);
              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedEquipment(prev => isSelected ? prev.filter(id => id !== option.id) : [...prev, option.id])}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    isSelected
                      ? 'border-[#3b82f6]/50 bg-[#3b82f6]/10 text-[#3b82f6]'
                      : 'border-white/10 bg-white/5 text-[#adaaaa] hover:border-white/20'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">{option.icon}</span>
                  <span>{option.nameAr}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Days/Phases Tabs */}
        <div className="px-4 mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {speedProgramDays.map((d, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDayIdx(idx)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
                  activeDayIdx === idx
                    ? 'bg-[#3b82f6] text-white shadow-lg shadow-[#3b82f6]/30 border-transparent'
                    : 'bg-zinc-900 text-zinc-500 hover:text-white border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {d.title}
              </button>
            ))}
          </div>
        </div>

        {/* Exercises List */}
        <div className="px-4 mt-6 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold">{day.title}</h3>
            <span className="text-xs px-3 py-1 rounded-full font-bold" style={{ color: programColor, backgroundColor: `${programColor}15` }}>
              {filteredExercises.length} تمارين
            </span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={`${activeDayIdx}-${selectedEquipment.join(',')}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
              {filteredExercises.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center gap-2 bg-[#131313] border border-white/5 rounded-2xl relative z-10">
                  <span className="material-symbols-outlined text-[#f59e0b] text-3xl animate-bounce">warning</span>
                  <p className="text-sm font-bold text-slate-300">لا توجد تمارين تطابق الأجهزة المختارة</p>
                  <p className="text-xs text-[#adaaaa]">يرجى اختيار أجهزة أخرى من القائمة أعلاه لعرض تمارين هذا اليوم.</p>
                </div>
              ) : (
                filteredExercises.map((ex, i) => {
                  const key = `${day.title}-${ex.name}`;
                  const custom = customExercises[key] || { sets: ex.sets, reps: ex.reps, rest: ex.rest };
                  const actualName = custom.swappedName || ex.name;

                  return (
                    <div key={i} className="bg-[#131313] rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-all group">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start gap-3 justify-between">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center font-bold text-sm" style={{ backgroundColor: `${programColor}15`, color: programColor }}>
                              {String(i + 1).padStart(2, '0')}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-white text-base leading-tight mb-1">{actualName}</h4>
                              <span className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-[#adaaaa] font-bold">{ex.muscle}</span>
                              {ex.note && !custom.swappedName && <p className="text-xs mt-1.5 text-[#adaaaa] italic">💡 {ex.note}</p>}
                            </div>
                          </div>
                          
                          {/* Swap Button */}
                          {ex.alternatives && ex.alternatives.length > 0 && (
                            <div className="relative shrink-0">
                              <button
                                onClick={() => setSwapMenuOpenFor(swapMenuOpenFor === key ? null : key)}
                                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                              >
                                <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
                              </button>
                              
                              <AnimatePresence>
                                {swapMenuOpenFor === key && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    className="absolute left-0 top-10 w-48 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-20"
                                  >
                                    <div className="p-2 text-xs font-bold text-[#adaaaa] border-b border-white/5">بدائل التمرين:</div>
                                    <button
                                      onClick={() => {
                                        setCustomExercises(prev => ({ ...prev, [key]: { ...custom, swappedName: undefined } }));
                                        setSwapMenuOpenFor(null);
                                      }}
                                      className={`w-full text-right px-3 py-2 text-sm hover:bg-white/5 transition-colors ${!custom.swappedName ? 'text-[#3b82f6] bg-[#3b82f6]/10' : 'text-white'}`}
                                    >
                                      {ex.name} (الأصلي)
                                    </button>
                                    {ex.alternatives.map((alt, idx) => (
                                      <button
                                        key={idx}
                                        onClick={() => {
                                          setCustomExercises(prev => ({ ...prev, [key]: { ...custom, swappedName: alt } }));
                                          setSwapMenuOpenFor(null);
                                        }}
                                        className={`w-full text-right px-3 py-2 text-sm hover:bg-white/5 transition-colors border-t border-white/5 ${custom.swappedName === alt ? 'text-[#3b82f6] bg-[#3b82f6]/10' : 'text-white'}`}
                                      >
                                        {alt}
                                      </button>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-2 mt-2 pt-3 border-t border-white/5">
                          {/* Sets */}
                          <div className="flex items-center gap-2 bg-[#0e0e0e] rounded-lg p-1.5 flex-1 justify-between border border-white/5">
                            <button onClick={() => setCustomExercises(prev => ({ ...prev, [key]: { ...custom, sets: Math.max(1, custom.sets - 1) } }))} className="w-6 h-6 rounded bg-[#262626] flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#333] transition-colors">-</button>
                            <span className="text-xs font-bold text-white flex gap-1 items-center">
                              <span className="text-[#3b82f6]">{custom.sets}</span> مجموعات
                            </span>
                            <button onClick={() => setCustomExercises(prev => ({ ...prev, [key]: { ...custom, sets: custom.sets + 1 } }))} className="w-6 h-6 rounded bg-[#262626] flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#333] transition-colors">+</button>
                          </div>

                          {/* Reps */}
                          <div className="flex items-center gap-2 bg-[#0e0e0e] rounded-lg p-1.5 flex-1 justify-between border border-white/5">
                            <button onClick={() => setCustomExercises(prev => ({ ...prev, [key]: { ...custom, reps: adjustReps(custom.reps, false) } }))} className="w-6 h-6 rounded bg-[#262626] flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#333] transition-colors">-</button>
                            <span className="text-xs font-bold text-white flex gap-1 items-center">
                              <span className="text-[#3b82f6]">{custom.reps}</span>
                            </span>
                            <button onClick={() => setCustomExercises(prev => ({ ...prev, [key]: { ...custom, reps: adjustReps(custom.reps, true) } }))} className="w-6 h-6 rounded bg-[#262626] flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#333] transition-colors">+</button>
                          </div>

                          {/* Rest */}
                          <div className="flex items-center gap-2 bg-[#0e0e0e] rounded-lg p-1.5 flex-1 justify-between border border-white/5">
                            <button onClick={() => setCustomExercises(prev => ({ ...prev, [key]: { ...custom, rest: adjustRest(custom.rest, false) } }))} className="w-6 h-6 rounded bg-[#262626] flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#333] transition-colors">-</button>
                            <span className="text-xs font-bold text-white flex gap-1 items-center">
                              <span className="material-symbols-outlined text-[14px] text-[#3b82f6]">timer</span>
                              {custom.rest}
                            </span>
                            <button onClick={() => setCustomExercises(prev => ({ ...prev, [key]: { ...custom, rest: adjustRest(custom.rest, true) } }))} className="w-6 h-6 rounded bg-[#262626] flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#333] transition-colors">+</button>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Start Button */}
        <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/90 to-transparent z-40">
          <div className="max-w-7xl mx-auto md:px-8">
            <button
              onClick={handleStartRoutine}
              disabled={isStarting || workoutStarted || filteredExercises.length === 0}
              className="w-full h-14 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-xl"
              style={{
                backgroundColor: workoutStarted ? '#10b981' : isStarting ? '#3b82f6' : programColor,
                color: 'white',
                opacity: (isStarting || workoutStarted || filteredExercises.length === 0) ? 0.7 : 1,
                transform: (isStarting || workoutStarted) ? 'scale(0.98)' : 'scale(1)'
              }}
            >
              {isStarting ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              ) : workoutStarted ? (
                <><span className="material-symbols-outlined text-xl">check_circle</span>تم بدء الجلسة</>
              ) : (
                <><span className="material-symbols-outlined text-xl">play_arrow</span>ابدأ التدريب الآن</>
              )}
            </button>
          </div>
        </div>

      </div>
    </FadeContent>
  );
}
