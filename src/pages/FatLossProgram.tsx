import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BackButton } from '../components/BackButton';
import { FadeContent } from '../components/react-bits/FadeContent';
import GradientText from '../components/react-bits/GradientText';
import { useLanguage } from '../LanguageContext';
import { useStartWorkout } from '../useStartWorkout';

type Exercise = { name: string; sets: number; reps: string; rest: string; muscle: string; note?: string };
type DayPlan = { title: string; exercises: Exercise[] };
type ProgramType = {
  id: string; name: string; nameAr: string; desc: string; icon: string; color: string;
  duration: string; level: string; frequency: string; cardio: string; days: DayPlan[];
};

const programs: ProgramType[] = [
  {
    id: 'beginner', name: 'Beginner', nameAr: 'المبتدئ', icon: 'hiking',
    color: '#00fcca', duration: '4 أسابيع', level: 'مبتدئ', frequency: '3 أيام/أسبوع', cardio: '20 دقيقة مشي سريع',
    desc: 'برنامج لطيف يجمع بين تمارين المقاومة والكارديو منخفض الشدة لبدء رحلة خسارة الدهون بأمان وبناء عادات تدريبية صحية.',
    days: [
      { title: 'يوم A — جسم كامل + كارديو', exercises: [
        { name: 'سكوات بوزن الجسم', sets: 3, reps: '12-15', rest: '60 ث', muscle: 'الأرجل' },
        { name: 'ضغط أرضي (Push-ups)', sets: 3, reps: '8-12', rest: '60 ث', muscle: 'الصدر', note: 'يمكن تعديلها على الركبتين' },
        { name: 'تجديف بالدمبلز', sets: 3, reps: '10-12', rest: '60 ث', muscle: 'الظهر' },
        { name: 'طعنات ثابتة', sets: 3, reps: '10 لكل رجل', rest: '60 ث', muscle: 'الأرجل والمؤخرة' },
        { name: 'بلانك', sets: 3, reps: '20-30 ث', rest: '45 ث', muscle: 'البطن' },
        { name: 'مشي سريع على المشاية', sets: 1, reps: '20 دقيقة', rest: '-', muscle: 'كارديو', note: 'سرعة 5-6 كم/ساعة' },
      ]},
      { title: 'يوم B — جسم كامل + كارديو', exercises: [
        { name: 'ديدلفت بالدمبلز', sets: 3, reps: '10-12', rest: '60 ث', muscle: 'الظهر والأرجل' },
        { name: 'ضغط كتف بالدمبلز (جالس)', sets: 3, reps: '10-12', rest: '60 ث', muscle: 'الكتف' },
        { name: 'سحب أمامي بالكيبل', sets: 3, reps: '12', rest: '60 ث', muscle: 'الظهر العلوي' },
        { name: 'Step-ups على صندوق', sets: 3, reps: '10 لكل رجل', rest: '60 ث', muscle: 'الأرجل' },
        { name: 'كرنش عكسي', sets: 3, reps: '15', rest: '45 ث', muscle: 'البطن السفلي' },
        { name: 'دراجة ثابتة', sets: 1, reps: '15 دقيقة', rest: '-', muscle: 'كارديو', note: 'مقاومة خفيفة' },
      ]},
    ]
  },
  {
    id: 'intermediate', name: 'Intermediate', nameAr: 'المتوسط', icon: 'local_fire_department',
    color: '#e08dff', duration: '6 أسابيع', level: 'متوسط', frequency: '4-5 أيام/أسبوع', cardio: 'HIIT + LISS',
    desc: 'يجمع بين تدريبات المقاومة المركبة و HIIT لتسريع عملية الأيض وحرق الدهون مع الحفاظ على الكتلة العضلية.',
    days: [
      { title: 'يوم الجزء العلوي + HIIT', exercises: [
        { name: 'ضغط البنش بالبار', sets: 4, reps: '10-12', rest: '75 ث', muscle: 'الصدر' },
        { name: 'تجديف بالبار', sets: 4, reps: '10-12', rest: '75 ث', muscle: 'الظهر' },
        { name: 'ضغط كتف بالدمبلز', sets: 3, reps: '12', rest: '60 ث', muscle: 'الكتف' },
        { name: 'Face Pulls', sets: 3, reps: '15', rest: '45 ث', muscle: 'الكتف الخلفي' },
        { name: 'سوبرسيت: بايسبس + تريسبس', sets: 3, reps: '12+12', rest: '45 ث', muscle: 'الذراعين', note: 'بدون راحة بين التمرينين' },
        { name: 'HIIT سبرنت', sets: 8, reps: '20 ث سبرنت / 40 ث راحة', rest: '-', muscle: 'كارديو HIIT', note: 'إجمالي 8 دقائق' },
      ]},
      { title: 'يوم الجزء السفلي + Core', exercises: [
        { name: 'سكوات بالبار', sets: 4, reps: '10-12', rest: '90 ث', muscle: 'الفخذ الأمامي' },
        { name: 'ديدلفت روماني', sets: 4, reps: '10-12', rest: '90 ث', muscle: 'الفخذ الخلفي' },
        { name: 'ضغط أرجل', sets: 3, reps: '12-15', rest: '60 ث', muscle: 'الفخذ الكامل' },
        { name: 'طعنات مشي بالدمبلز', sets: 3, reps: '12 لكل رجل', rest: '60 ث', muscle: 'الأرجل والمؤخرة' },
        { name: 'رفع سمانة', sets: 4, reps: '15-20', rest: '30 ث', muscle: 'السمانة' },
        { name: 'دائرة بطن: بلانك + كرنش + دراجة', sets: 3, reps: '30 ث لكل تمرين', rest: '45 ث', muscle: 'البطن' },
      ]},
      { title: 'يوم كارديو + تكييف', exercises: [
        { name: 'إحماء ديناميكي', sets: 1, reps: '5 دقائق', rest: '-', muscle: 'الجسم الكامل' },
        { name: 'Burpees', sets: 4, reps: '10', rest: '30 ث', muscle: 'الجسم الكامل' },
        { name: 'قفز الحبل', sets: 4, reps: '60 ث', rest: '30 ث', muscle: 'كارديو' },
        { name: 'Mountain Climbers', sets: 4, reps: '20 لكل جانب', rest: '30 ث', muscle: 'البطن + كارديو' },
        { name: 'Kettlebell Swings', sets: 4, reps: '15', rest: '45 ث', muscle: 'الظهر والأرجل' },
        { name: 'مشي مائل على المشاية', sets: 1, reps: '15 دقيقة', rest: '-', muscle: 'LISS كارديو', note: 'ميل 10-12%' },
      ]},
    ]
  },
  {
    id: 'advanced', name: 'Advanced', nameAr: 'المتقدم', icon: 'whatshot',
    color: '#ff6b6b', duration: '8 أسابيع', level: 'متقدم', frequency: '5-6 أيام/أسبوع', cardio: 'HIIT مكثف + تدريب دوائر',
    desc: 'برنامج عالي الكثافة يجمع بين التدريب الدوائري والسوبرسيت و HIIT المكثف لتحقيق أقصى حرق للدهون والوصول لنسبة دهون منخفضة.',
    days: [
      { title: 'يوم دفع + HIIT مكثف', exercises: [
        { name: 'سوبرسيت: بنش بار + تفتيح كيبل', sets: 4, reps: '10+12', rest: '60 ث', muscle: 'الصدر', note: 'بدون راحة بين التمرينين' },
        { name: 'سوبرسيت: ضغط كتف + رفع جانبي', sets: 4, reps: '10+15', rest: '60 ث', muscle: 'الكتف' },
        { name: 'تراي سيت: تريسبس حبل + ضغط ضيق + دبس', sets: 3, reps: '12+10+8', rest: '75 ث', muscle: 'التريسبس', note: 'ثلاث تمارين متتالية' },
        { name: 'HIIT تبادلي على المشاية', sets: 10, reps: '30 ث سبرنت / 30 ث راحة', rest: '-', muscle: 'كارديو HIIT', note: '10 دقائق إجمالي' },
      ]},
      { title: 'يوم سحب + تدريب دوائري', exercises: [
        { name: 'سوبرسيت: سحب أمامي + تجديف كيبل', sets: 4, reps: '10+12', rest: '60 ث', muscle: 'الظهر' },
        { name: 'سوبرسيت: Face Pull + شراجز', sets: 3, reps: '15+12', rest: '45 ث', muscle: 'الترابيس والكتف الخلفي' },
        { name: 'سوبرسيت: بايسبس بار + مطرقة', sets: 3, reps: '10+12', rest: '45 ث', muscle: 'البايسبس' },
        { name: 'دائرة حرق: Burpees + Box Jump + Battle Ropes', sets: 4, reps: '30 ث لكل تمرين', rest: '60 ث بين الدوائر', muscle: 'تكييف عام' },
      ]},
      { title: 'يوم أرجل + Tabata', exercises: [
        { name: 'سوبرسيت: سكوات + قفز سكوات', sets: 4, reps: '10+8', rest: '75 ث', muscle: 'الفخذ الأمامي', note: 'انفجاري في القفز' },
        { name: 'سوبرسيت: ديدلفت روماني + طعنات مشي', sets: 4, reps: '10+12', rest: '75 ث', muscle: 'الفخذ الخلفي' },
        { name: 'سوبرسيت: تمديد أرجل + ثني أرجل', sets: 3, reps: '15+15', rest: '45 ث', muscle: 'الأرجل الكاملة' },
        { name: 'Tabata بطن: كرنش + بلانك + جانبي + رفع أرجل', sets: 4, reps: '20 ث عمل / 10 ث راحة', rest: '60 ث', muscle: 'البطن', note: '4 دقائق Tabata' },
        { name: 'سبرنت مائل', sets: 6, reps: '30 ث سبرنت / 30 ث راحة', rest: '-', muscle: 'كارديو HIIT', note: 'ميل 8%' },
      ]},
    ]
  },
];

export default function FatLossProgram() {
  const { language } = useLanguage();
  const { isStarting, workoutStarted, handleStartWorkout } = useStartWorkout();
  const [selectedProgram, setSelectedProgram] = useState<ProgramType | null>(null);
  const [activeDayIdx, setActiveDayIdx] = useState(0);

  // Detail view
  if (selectedProgram) {
    const day = selectedProgram.days[activeDayIdx];
    return (
      <FadeContent blur duration={400} easing="ease-out" initialOpacity={0}>
        <div className="relative flex flex-col min-h-screen pb-32 bg-[#0e0e0e] text-white font-display antialiased">
          <header className="sticky top-0 z-50 flex items-center gap-4 px-5 py-4 bg-[#0e0e0e]/80 backdrop-blur-xl border-b border-white/5">
            <BackButton onClick={() => setSelectedProgram(null)} />
            <h1 className="text-lg font-bold truncate">
              <GradientText colors={['#ff6b6b','#e08dff','#ff6b6b']} animationSpeed={6} showBorder={false}>
                {selectedProgram.nameAr} — Fat Loss
              </GradientText>
            </h1>
          </header>

          {/* Program Info Banner */}
          <div className="mx-4 mt-4 rounded-3xl overflow-hidden p-6 relative" style={{ background: `linear-gradient(135deg, ${selectedProgram.color}20, ${selectedProgram.color}05)` }}>
            <div className="absolute top-4 left-4 w-24 h-24 rounded-full blur-3xl" style={{ backgroundColor: selectedProgram.color, opacity: 0.12 }} />
            <div className="relative z-10 flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${selectedProgram.color}20`, color: selectedProgram.color }}>
                <span className="material-symbols-outlined text-3xl">{selectedProgram.icon}</span>
              </div>
              <div>
                <h2 className="text-xl font-extrabold">{selectedProgram.nameAr}</h2>
                <p className="text-sm text-[#adaaaa]">{selectedProgram.name} Level</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: 'schedule', label: selectedProgram.duration },
                { icon: 'bar_chart', label: selectedProgram.level },
                { icon: 'calendar_month', label: selectedProgram.frequency },
                { icon: 'directions_run', label: selectedProgram.cardio },
              ].map((t, i) => (
                <span key={i} className="text-[11px] flex items-center gap-1 px-3 py-1.5 rounded-full font-bold" style={{ color: selectedProgram.color, backgroundColor: `${selectedProgram.color}15` }}>
                  <span className="material-symbols-outlined text-sm">{t.icon}</span>{t.label}
                </span>
              ))}
            </div>
          </div>

          {/* Day Tabs */}
          <div className="flex gap-2 px-4 mt-6 overflow-x-auto pb-2 scrollbar-hide">
            {selectedProgram.days.map((d, i) => (
              <button key={i} onClick={() => setActiveDayIdx(i)}
                className={`shrink-0 px-5 py-3 rounded-2xl text-sm font-bold transition-all ${activeDayIdx === i ? 'text-white shadow-lg' : 'bg-[#1a1a1a] text-[#adaaaa] border border-white/5'}`}
                style={activeDayIdx === i ? { backgroundColor: selectedProgram.color, boxShadow: `0 8px 25px ${selectedProgram.color}30` } : {}}>
                {d.title}
              </button>
            ))}
          </div>

          {/* Exercises List */}
          <div className="px-4 mt-6 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">{day.title}</h3>
              <span className="text-xs px-3 py-1 rounded-full font-bold" style={{ color: selectedProgram.color, backgroundColor: `${selectedProgram.color}15` }}>
                {day.exercises.length} تمارين
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeDayIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
                {day.exercises.map((ex, i) => (
                  <div key={i} className="bg-[#131313] rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center font-bold text-sm" style={{ backgroundColor: `${selectedProgram.color}15`, color: selectedProgram.color }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-base">{ex.name}</h4>
                        <span className="text-xs text-[#adaaaa]">{ex.muscle}</span>
                        {ex.note && <p className="text-xs mt-1 text-[#adaaaa] italic">💡 {ex.note}</p>}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {[
                        { icon: 'replay', label: `${ex.sets} مجموعات` },
                        { icon: 'fitness_center', label: `${ex.reps}` },
                        { icon: 'timer', label: ex.rest },
                      ].map((s, j) => (
                        <span key={j} className="text-[10px] flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 text-[#adaaaa]">
                          <span className="material-symbols-outlined text-xs" style={{ color: selectedProgram.color }}>{s.icon}</span>{s.label}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Fat Loss Tips */}
          <div className="mx-4 mt-8 p-5 rounded-2xl border border-white/5 bg-[#131313]">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[#f59e0b]">lightbulb</span>
              <h4 className="font-bold">نصائح حرق الدهون</h4>
            </div>
            <ul className="space-y-2 text-sm text-[#adaaaa]">
              <li className="flex gap-2"><span style={{ color: selectedProgram.color }}>•</span>حافظ على عجز سعرات 300-500 سعرة يومياً.</li>
              <li className="flex gap-2"><span style={{ color: selectedProgram.color }}>•</span>تناول بروتين كافي (1.6-2.0 غ/كغ) للحفاظ على العضلات.</li>
              <li className="flex gap-2"><span style={{ color: selectedProgram.color }}>•</span>اشرب 3-4 لتر ماء يومياً.</li>
              <li className="flex gap-2"><span style={{ color: selectedProgram.color }}>•</span>النوم 7-9 ساعات يحسّن هرمونات حرق الدهون.</li>
              <li className="flex gap-2"><span style={{ color: selectedProgram.color }}>•</span>لا تتخطى وجبات الطعام — وزّع السعرات على 3-5 وجبات.</li>
            </ul>
          </div>

          {/* Start/Record Session Button */}
          <div className="mx-4 mt-6">
            <button
              onClick={() => handleStartWorkout(selectedProgram.nameAr, day.title, selectedProgram.id)}
              disabled={isStarting || workoutStarted}
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 ${
                workoutStarted
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-gradient-to-r hover:scale-[1.02] active:scale-95 text-white shadow-lg shadow-black/40'
              }`}
              style={
                !workoutStarted
                  ? {
                      background: `linear-gradient(135deg, ${selectedProgram.color}, ${selectedProgram.color}dd)`,
                      boxShadow: `0 10px 30px ${selectedProgram.color}33`,
                    }
                  : {}
              }
            >
              {isStarting ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : workoutStarted ? (
                <>
                  <span className="material-symbols-outlined text-emerald-400">check_circle</span>
                  <span>تم تسجيل هذا التمرين بنجاح!</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-white">play_arrow</span>
                  <span>ابدأ وحفظ هذا التمرين</span>
                </>
              )}
            </button>
          </div>
        </div>
      </FadeContent>
    );
  }

  // Selection View
  return (
    <FadeContent blur duration={600} easing="ease-out" initialOpacity={0}>
      <div className="relative flex flex-col min-h-screen pb-32 bg-[#0e0e0e] text-white font-display antialiased">
        <header className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 bg-[#0e0e0e]/80 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-xl font-extrabold">
              <GradientText colors={['#ff6b6b','#e08dff','#ff6b6b']} animationSpeed={6} showBorder={false}>
                برنامج خسارة الدهون
              </GradientText>
            </h1>
          </div>
        </header>

        {/* Hero */}
        <div className="mx-4 mt-4 relative rounded-3xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop" alt="Fat loss training" className="w-full h-52 object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent" />
          <div className="absolute bottom-5 right-5 left-5">
            <span className="text-[10px] uppercase tracking-widest text-[#ff6b6b] font-bold">Fat Loss Program</span>
            <h2 className="text-2xl font-extrabold leading-tight mt-1">احرق الدهون<br/>وحافظ على العضلات</h2>
            <p className="text-sm text-[#adaaaa] mt-1">٣ مستويات مصممة لتناسب مرحلتك التدريبية</p>
          </div>
        </div>

        {/* Program Cards */}
        <div className="px-4 mt-6 space-y-4">
          {programs.map((prog, idx) => (
            <motion.div key={prog.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.12 }}
              onClick={() => { setSelectedProgram(prog); setActiveDayIdx(0); }}
              className="group relative bg-[#131313] rounded-[2rem] p-1 overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" style={{ background: `linear-gradient(135deg, ${prog.color}12, transparent)` }} />
              <div className="relative bg-[#131313] rounded-[1.9rem] p-5 border-r-2 flex items-center gap-4" style={{ borderColor: `${prog.color}40` }}>
                <div className="w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: `${prog.color}15`, color: prog.color, boxShadow: `0 8px 20px ${prog.color}15` }}>
                  <span className="material-symbols-outlined text-3xl">{prog.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-extrabold leading-tight">{prog.nameAr} <span className="text-sm font-bold text-[#adaaaa]">({prog.name})</span></h3>
                  <p className="text-xs mt-1 text-[#adaaaa] line-clamp-2">{prog.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {[
                      { icon: 'schedule', label: prog.duration },
                      { icon: 'bar_chart', label: prog.level },
                      { icon: 'calendar_month', label: prog.frequency },
                    ].map((t, i) => (
                      <span key={i} className="text-[10px] flex items-center gap-1 px-2 py-1 rounded-full font-bold" style={{ color: prog.color, backgroundColor: `${prog.color}10` }}>
                        <span className="material-symbols-outlined text-xs">{t.icon}</span>{t.label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="w-10 h-10 shrink-0 rounded-full border flex items-center justify-center" style={{ borderColor: `${prog.color}30`, color: prog.color }}>
                  <span className="material-symbols-outlined">{language === 'ar' ? 'chevron_left' : 'chevron_right'}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guide */}
        <div className="mx-4 mt-8 p-6 rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] border border-white/5 text-center">
          <span className="material-symbols-outlined text-4xl text-[#ff6b6b] mb-2 block">info</span>
          <h4 className="font-bold text-lg mb-2">اختر المستوى المناسب لك</h4>
          <div className="grid grid-cols-1 gap-3 mt-4 text-right">
            {[
              { name: 'Beginner', tip: 'إذا كنت جديداً على التمارين أو عائداً بعد انقطاع طويل', color: '#00fcca' },
              { name: 'Intermediate', tip: 'إذا كنت تتمرن بانتظام 3+ أشهر وتريد نتائج أسرع', color: '#e08dff' },
              { name: 'Advanced', tip: 'إذا كنت متمرساً وتريد الوصول لنسبة دهون منخفضة جداً', color: '#ff6b6b' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: item.color }} />
                <div>
                  <span className="font-bold text-sm" style={{ color: item.color }}>{item.name}</span>
                  <p className="text-xs text-[#adaaaa] mt-0.5">{item.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-10 right-10 w-32 h-32 bg-[#ff6b6b]/5 blur-[100px] pointer-events-none z-[-1]" />
        <div className="fixed top-40 left-0 w-48 h-48 bg-[#e08dff]/5 blur-[120px] pointer-events-none z-[-1]" />
      </div>
    </FadeContent>
  );
}
