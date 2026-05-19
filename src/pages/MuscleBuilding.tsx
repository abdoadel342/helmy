import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BackButton } from '../components/BackButton';
import { FadeContent } from '../components/react-bits/FadeContent';
import GradientText from '../components/react-bits/GradientText';
import { useLanguage } from '../LanguageContext';

type Exercise = { name: string; sets: number; reps: string; rest: string; muscle: string; note?: string };
type DayPlan = { title: string; exercises: Exercise[] };
type ProgramType = {
  id: string; name: string; desc: string; icon: string; color: string;
  duration: string; level: string; frequency: string; days: DayPlan[];
};

const programs: ProgramType[] = [
  {
    id: 'ppl', name: 'Push / Pull / Legs', icon: 'exercise',
    color: '#e08dff', duration: '8 أسابيع', level: 'متوسط - متقدم', frequency: '6 أيام/أسبوع',
    desc: 'نظام تقسيم عضلي يركز على تجميع العضلات حسب وظيفتها الحركية (دفع، سحب، أرجل) لتحقيق أقصى تحفيز عضلي مع راحة كافية.',
    days: [
      { title: 'يوم الدفع (Push)', exercises: [
        { name: 'ضغط البنش بالبار', sets: 4, reps: '8-10', rest: '120 ث', muscle: 'الصدر', note: 'حافظ على تقوس خفيف بالظهر' },
        { name: 'ضغط صدر علوي بالدمبلز', sets: 3, reps: '10-12', rest: '90 ث', muscle: 'الصدر العلوي' },
        { name: 'ضغط كتف عسكري', sets: 4, reps: '8-10', rest: '120 ث', muscle: 'الكتف الأمامي' },
        { name: 'رفع جانبي بالدمبلز', sets: 3, reps: '12-15', rest: '60 ث', muscle: 'الكتف الجانبي' },
        { name: 'تفتيح صدر بالكيبل', sets: 3, reps: '12-15', rest: '60 ث', muscle: 'الصدر الداخلي' },
        { name: 'تمديد تريسبس بالحبل', sets: 3, reps: '12-15', rest: '60 ث', muscle: 'التريسبس' },
        { name: 'دبس متوازي', sets: 3, reps: '10-12', rest: '90 ث', muscle: 'التريسبس والصدر' },
      ]},
      { title: 'يوم السحب (Pull)', exercises: [
        { name: 'سحب أمامي (Lat Pulldown)', sets: 4, reps: '8-10', rest: '120 ث', muscle: 'الظهر العلوي' },
        { name: 'تجديف بالبار', sets: 4, reps: '8-10', rest: '120 ث', muscle: 'الظهر الأوسط', note: 'ميل الجذع 45°' },
        { name: 'سحب كيبل ضيق', sets: 3, reps: '10-12', rest: '90 ث', muscle: 'الظهر السفلي' },
        { name: 'Face Pulls', sets: 3, reps: '15-20', rest: '60 ث', muscle: 'الكتف الخلفي' },
        { name: 'كيرل بار زجزاج', sets: 3, reps: '10-12', rest: '60 ث', muscle: 'البايسبس' },
        { name: 'كيرل مطرقة', sets: 3, reps: '12-15', rest: '60 ث', muscle: 'البايسبس والساعد' },
        { name: 'شراجز بالدمبلز', sets: 3, reps: '12-15', rest: '60 ث', muscle: 'الترابيس' },
      ]},
      { title: 'يوم الأرجل (Legs)', exercises: [
        { name: 'سكوات بالبار', sets: 4, reps: '6-8', rest: '180 ث', muscle: 'الفخذ الأمامي', note: 'انزل حتى التوازي أو أعمق' },
        { name: 'ضغط أرجل (Leg Press)', sets: 4, reps: '10-12', rest: '120 ث', muscle: 'الفخذ الكامل' },
        { name: 'رومانيان ديدلفت', sets: 4, reps: '8-10', rest: '120 ث', muscle: 'الفخذ الخلفي' },
        { name: 'تمديد أرجل', sets: 3, reps: '12-15', rest: '60 ث', muscle: 'الكوادريسبس' },
        { name: 'ثني أرجل', sets: 3, reps: '12-15', rest: '60 ث', muscle: 'الهامسترنج' },
        { name: 'رفع سمانة واقف', sets: 4, reps: '15-20', rest: '45 ث', muscle: 'السمانة' },
        { name: 'طعنات بالدمبلز', sets: 3, reps: '10 لكل رجل', rest: '90 ث', muscle: 'الأرجل والمؤخرة' },
      ]},
    ]
  },
  {
    id: 'ul', name: 'Upper / Lower', icon: 'swap_vert',
    color: '#00fcca', duration: '6 أسابيع', level: 'مبتدئ - متوسط', frequency: '4 أيام/أسبوع',
    desc: 'تقسيم بسيط وفعال بين الجزء العلوي والسفلي، مثالي لمن يبحث عن تكرار تدريبي عالٍ مع توازن في الراحة.',
    days: [
      { title: 'الجزء العلوي (Upper)', exercises: [
        { name: 'ضغط البنش بالبار', sets: 4, reps: '6-8', rest: '120 ث', muscle: 'الصدر' },
        { name: 'تجديف بالدمبلز', sets: 4, reps: '8-10', rest: '90 ث', muscle: 'الظهر' },
        { name: 'ضغط كتف بالدمبلز', sets: 3, reps: '10-12', rest: '90 ث', muscle: 'الكتف' },
        { name: 'سحب أمامي واسع', sets: 3, reps: '10-12', rest: '90 ث', muscle: 'الظهر العلوي' },
        { name: 'رفع جانبي', sets: 3, reps: '15', rest: '60 ث', muscle: 'الكتف الجانبي' },
        { name: 'كيرل بايسبس + تريسبس', sets: 3, reps: '12', rest: '60 ث', muscle: 'الذراعين' },
      ]},
      { title: 'الجزء السفلي (Lower)', exercises: [
        { name: 'سكوات بالبار', sets: 4, reps: '6-8', rest: '180 ث', muscle: 'الفخذ الأمامي' },
        { name: 'ديدلفت روماني', sets: 4, reps: '8-10', rest: '120 ث', muscle: 'الفخذ الخلفي' },
        { name: 'ضغط أرجل', sets: 3, reps: '10-12', rest: '90 ث', muscle: 'الفخذ الكامل' },
        { name: 'طعنات بلغارية', sets: 3, reps: '10 لكل رجل', rest: '90 ث', muscle: 'الأرجل والمؤخرة' },
        { name: 'ثني أرجل', sets: 3, reps: '12-15', rest: '60 ث', muscle: 'الهامسترنج' },
        { name: 'رفع سمانة', sets: 4, reps: '15-20', rest: '45 ث', muscle: 'السمانة' },
      ]},
    ]
  },
  {
    id: 'fb', name: 'Full Body', icon: 'accessibility_new',
    color: '#f97316', duration: '4 أسابيع', level: 'مبتدئ', frequency: '3 أيام/أسبوع',
    desc: 'برنامج شامل يستهدف جميع المجموعات العضلية في كل جلسة تدريبية، مثالي للمبتدئين ولتعزيز اللياقة العامة.',
    days: [
      { title: 'تمرين الجسم الكامل - يوم A', exercises: [
        { name: 'سكوات بالبار', sets: 4, reps: '8-10', rest: '120 ث', muscle: 'الأرجل' },
        { name: 'ضغط البنش بالبار', sets: 4, reps: '8-10', rest: '120 ث', muscle: 'الصدر' },
        { name: 'تجديف بالبار', sets: 4, reps: '8-10', rest: '90 ث', muscle: 'الظهر' },
        { name: 'ضغط كتف عسكري', sets: 3, reps: '10-12', rest: '90 ث', muscle: 'الكتف' },
        { name: 'كيرل بايسبس', sets: 2, reps: '12-15', rest: '60 ث', muscle: 'البايسبس' },
        { name: 'تمديد تريسبس', sets: 2, reps: '12-15', rest: '60 ث', muscle: 'التريسبس' },
      ]},
      { title: 'تمرين الجسم الكامل - يوم B', exercises: [
        { name: 'ديدلفت', sets: 4, reps: '6-8', rest: '180 ث', muscle: 'الظهر والأرجل' },
        { name: 'ضغط صدر مائل بالدمبلز', sets: 3, reps: '10-12', rest: '90 ث', muscle: 'الصدر العلوي' },
        { name: 'سحب أمامي', sets: 3, reps: '10-12', rest: '90 ث', muscle: 'الظهر العلوي' },
        { name: 'طعنات بالدمبلز', sets: 3, reps: '10 لكل رجل', rest: '90 ث', muscle: 'الأرجل' },
        { name: 'رفع جانبي', sets: 3, reps: '15', rest: '60 ث', muscle: 'الكتف' },
        { name: 'بلانك', sets: 3, reps: '45-60 ث', rest: '45 ث', muscle: 'البطن' },
      ]},
    ]
  },
];

export default function MuscleBuilding() {
  const { language } = useLanguage();
  const [selectedProgram, setSelectedProgram] = useState<ProgramType | null>(null);
  const [activeDayIdx, setActiveDayIdx] = useState(0);

  if (selectedProgram) {
    const day = selectedProgram.days[activeDayIdx];
    return (
      <FadeContent blur duration={400} easing="ease-out" initialOpacity={0}>
        <div className="relative flex flex-col min-h-screen pb-32 bg-[#0e0e0e] text-white font-display antialiased">
          <header className="sticky top-0 z-50 flex items-center gap-4 px-5 py-4 bg-[#0e0e0e]/80 backdrop-blur-xl border-b border-white/5">
            <BackButton onClick={() => setSelectedProgram(null)} />
            <h1 className="text-lg font-bold truncate">
              <GradientText colors={['#e08dff','#bc00fb','#e08dff']} animationSpeed={6} showBorder={false}>
                {selectedProgram.name}
              </GradientText>
            </h1>
          </header>

          <div className="mx-4 mt-4 rounded-3xl overflow-hidden p-6 relative" style={{ background: `linear-gradient(135deg, ${selectedProgram.color}20, ${selectedProgram.color}05)` }}>
            <div className="absolute top-4 left-4 w-20 h-20 rounded-full blur-3xl" style={{ backgroundColor: selectedProgram.color, opacity: 0.15 }} />
            <div className="relative z-10 flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${selectedProgram.color}20`, color: selectedProgram.color }}>
                <span className="material-symbols-outlined text-3xl">{selectedProgram.icon}</span>
              </div>
              <div>
                <h2 className="text-xl font-extrabold">{selectedProgram.name}</h2>
                <p className="text-sm text-[#adaaaa]">{selectedProgram.desc.slice(0, 60)}...</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: 'schedule', label: selectedProgram.duration },
                { icon: 'bar_chart', label: selectedProgram.level },
                { icon: 'calendar_month', label: selectedProgram.frequency },
              ].map((t, i) => (
                <span key={i} className="text-[11px] flex items-center gap-1 px-3 py-1.5 rounded-full font-bold" style={{ color: selectedProgram.color, backgroundColor: `${selectedProgram.color}15` }}>
                  <span className="material-symbols-outlined text-sm">{t.icon}</span>{t.label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2 px-4 mt-6 overflow-x-auto pb-2 scrollbar-hide">
            {selectedProgram.days.map((d, i) => (
              <button key={i} onClick={() => setActiveDayIdx(i)}
                className={`shrink-0 px-5 py-3 rounded-2xl text-sm font-bold transition-all ${activeDayIdx === i ? 'text-white shadow-lg' : 'bg-[#1a1a1a] text-[#adaaaa] border border-white/5'}`}
                style={activeDayIdx === i ? { backgroundColor: selectedProgram.color, boxShadow: `0 8px 25px ${selectedProgram.color}30` } : {}}>
                {d.title}
              </button>
            ))}
          </div>

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
                  <div key={i} className="bg-[#131313] rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-all group">
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
                        { icon: 'fitness_center', label: `${ex.reps} تكرار` },
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

          <div className="mx-4 mt-8 p-5 rounded-2xl border border-white/5 bg-[#131313]">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[#f59e0b]">lightbulb</span>
              <h4 className="font-bold">نصائح البرنامج</h4>
            </div>
            <ul className="space-y-2 text-sm text-[#adaaaa]">
              <li className="flex gap-2"><span style={{ color: selectedProgram.color }}>•</span>قم بالإحماء 5-10 دقائق قبل كل تمرين.</li>
              <li className="flex gap-2"><span style={{ color: selectedProgram.color }}>•</span>زد الأوزان تدريجياً كل أسبوع (2-5%).</li>
              <li className="flex gap-2"><span style={{ color: selectedProgram.color }}>•</span>احرص على النوم 7-9 ساعات يومياً.</li>
              <li className="flex gap-2"><span style={{ color: selectedProgram.color }}>•</span>تناول 1.6-2.2 غ بروتين/كغ من وزن الجسم.</li>
            </ul>
          </div>
        </div>
      </FadeContent>
    );
  }

  return (
    <FadeContent blur duration={600} easing="ease-out" initialOpacity={0}>
      <div className="relative flex flex-col min-h-screen pb-32 bg-[#0e0e0e] text-white font-display antialiased">
        <header className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 bg-[#0e0e0e]/80 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-xl font-extrabold">
              <GradientText colors={['#e08dff','#bc00fb','#e08dff']} animationSpeed={6} showBorder={false}>
                برامج بناء العضلات
              </GradientText>
            </h1>
          </div>
        </header>

        <div className="mx-4 mt-4 relative rounded-3xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop" alt="Muscle building" className="w-full h-52 object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent" />
          <div className="absolute bottom-5 right-5 left-5">
            <span className="text-[10px] uppercase tracking-widest text-[#e08dff] font-bold">اختر برنامجك المناسب</span>
            <h2 className="text-2xl font-extrabold leading-tight mt-1">ابنِ عضلاتك<br/>بالطريقة الصحيحة</h2>
            <p className="text-sm text-[#adaaaa] mt-1">٣ برامج احترافية مصممة لجميع المستويات</p>
          </div>
        </div>

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
                  <h3 className="text-lg font-extrabold leading-tight">{prog.name}</h3>
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
                <div className="w-10 h-10 shrink-0 rounded-full border flex items-center justify-center transition-all" style={{ borderColor: `${prog.color}30`, color: prog.color }}>
                  <span className="material-symbols-outlined">{language === 'ar' ? 'chevron_left' : 'chevron_right'}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mx-4 mt-8 p-6 rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] border border-white/5 text-center">
          <span className="material-symbols-outlined text-4xl text-[#e08dff] mb-2 block">info</span>
          <h4 className="font-bold text-lg mb-2">كيف تختار برنامجك؟</h4>
          <div className="grid grid-cols-1 gap-3 mt-4 text-right">
            {[
              { prog: 'Push Pull Legs', tip: 'للمتدربين المتقدمين الذين يريدون تكرار عالي (6 أيام)', color: '#e08dff' },
              { prog: 'Upper Lower', tip: 'للمتوسطين الذين يريدون توازن بين التدريب والراحة (4 أيام)', color: '#00fcca' },
              { prog: 'Full Body', tip: 'للمبتدئين أو من لديهم وقت محدود (3 أيام)', color: '#f97316' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: item.color }} />
                <div>
                  <span className="font-bold text-sm" style={{ color: item.color }}>{item.prog}</span>
                  <p className="text-xs text-[#adaaaa] mt-0.5">{item.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-10 right-10 w-32 h-32 bg-[#e08dff]/5 blur-[100px] pointer-events-none z-[-1]" />
        <div className="fixed top-40 left-0 w-48 h-48 bg-[#00fcca]/5 blur-[120px] pointer-events-none z-[-1]" />
      </div>
    </FadeContent>
  );
}
