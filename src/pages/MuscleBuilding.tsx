import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BackButton } from '../components/BackButton';
import { FadeContent } from '../components/react-bits/FadeContent';
import GradientText from '../components/react-bits/GradientText';
import { useLanguage } from '../LanguageContext';
import { useStartWorkout } from '../useStartWorkout';
import { usePersistentState } from '../hooks/usePersistentState';

type Exercise = { name: string; sets: number; reps: string; rest: string; muscle: string; note?: string; alternatives?: string[] };
type DayPlan = { title: string; exercises: Exercise[] };
type ProgramType = {
  id: string; name: string; desc: string; icon: string; color: string;
  image?: string; duration: string; level: string; frequency: string; days: DayPlan[];
};

const programs: ProgramType[] = [
  {
    id: 'ppl', name: 'Push / Pull / Legs', icon: 'exercise',
    color: '#e08dff', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2000&auto=format&fit=crop',
    duration: '8 أسابيع', level: 'متوسط - متقدم', frequency: '6 أيام/أسبوع',
    desc: 'نظام تقسيم عضلي يركز على تجميع العضلات حسب وظيفتها الحركية (دفع، سحب، أرجل) لتحقيق أقصى تحفيز عضلي مع راحة كافية.',
    days: [
      { title: 'يوم الدفع (Push)', exercises: [
        { name: 'ضغط البنش بالبار', sets: 4, reps: '8-10', rest: '120 ث', muscle: 'الصدر', note: 'حافظ على تقوس خفيف بالظهر', alternatives: ['ضغط بنش بالدمبلز', 'ضغط بنش جهاز سميث'] },
        { name: 'ضغط صدر علوي بالدمبلز', sets: 3, reps: '10-12', rest: '90 ث', muscle: 'الصدر العلوي', alternatives: ['ضغط صدر علوي بالبار', 'ضغط صدر علوي جهاز'] },
        { name: 'ضغط كتف عسكري', sets: 4, reps: '8-10', rest: '120 ث', muscle: 'الكتف الأمامي', alternatives: ['ضغط كتف بالدمبلز', 'ضغط كتف جهاز'] },
        { name: 'رفع جانبي بالدمبلز', sets: 3, reps: '12-15', rest: '60 ث', muscle: 'الكتف الجانبي', alternatives: ['رفع جانبي كيبل', 'رفع جانبي جهاز'] },
        { name: 'تفتيح صدر بالكيبل', sets: 3, reps: '12-15', rest: '60 ث', muscle: 'الصدر الداخلي', alternatives: ['تفتيح صدر بالدمبلز', 'فراشة (Pec Deck)'] },
        { name: 'تمديد تريسبس بالحبل', sets: 3, reps: '12-15', rest: '60 ث', muscle: 'التريسبس', alternatives: ['تمديد تريسبس بار V', 'كيك باك بالدمبلز'] },
        { name: 'دبس متوازي', sets: 3, reps: '10-12', rest: '90 ث', muscle: 'التريسبس والصدر', alternatives: ['ضغط تريسبس ضيق بالبار', 'تمديد تريسبس خلف الرأس'] },
      ]},
      { title: 'يوم السحب (Pull)', exercises: [
        { name: 'سحب أمامي (Lat Pulldown)', sets: 4, reps: '8-10', rest: '120 ث', muscle: 'الظهر العلوي', alternatives: ['عقلة واسع (Pull-ups)', 'سحب جهاز'] },
        { name: 'تجديف بالبار', sets: 4, reps: '8-10', rest: '120 ث', muscle: 'الظهر الأوسط', note: 'ميل الجذع 45°', alternatives: ['تجديف بالدمبلز', 'تجديف كيبل جالس'] },
        { name: 'سحب كيبل ضيق', sets: 3, reps: '10-12', rest: '90 ث', muscle: 'الظهر السفلي', alternatives: ['تجديف ذراع واحدة', 'تي بار رو (T-Bar Row)'] },
        { name: 'Face Pulls', sets: 3, reps: '15-20', rest: '60 ث', muscle: 'الكتف الخلفي', alternatives: ['رفرفة خلفي بالدمبلز', 'فراشة عكسي جهاز'] },
        { name: 'كيرل بار زجزاج', sets: 3, reps: '10-12', rest: '60 ث', muscle: 'البايسبس', alternatives: ['كيرل بايسبس بالدمبلز', 'كيرل بايسبس كيبل'] },
        { name: 'كيرل مطرقة', sets: 3, reps: '12-15', rest: '60 ث', muscle: 'البايسبس والساعد', alternatives: ['كيرل مطرقة بالكيبل', 'كيرل عكسي بالبار'] },
        { name: 'شراجز بالدمبلز', sets: 3, reps: '12-15', rest: '60 ث', muscle: 'الترابيس', alternatives: ['شراجز بالبار', 'شراجز جهاز سميث'] },
      ]},
      { title: 'يوم الأرجل (Legs)', exercises: [
        { name: 'سكوات بالبار', sets: 4, reps: '6-8', rest: '180 ث', muscle: 'الفخذ الأمامي', note: 'انزل حتى التوازي أو أعمق', alternatives: ['هاك سكوات', 'سكوات جوبليت'] },
        { name: 'ضغط أرجل (Leg Press)', sets: 4, reps: '10-12', rest: '120 ث', muscle: 'الفخذ الكامل', alternatives: ['طعنات مشي بالدمبلز', 'سكوات بلغاري'] },
        { name: 'رومانيان ديدلفت', sets: 4, reps: '8-10', rest: '120 ث', muscle: 'الفخذ الخلفي', alternatives: ['ديدلفت مستقيم الساقين', 'صباح الخير (Good Mornings)'] },
        { name: 'تمديد أرجل', sets: 3, reps: '12-15', rest: '60 ث', muscle: 'الكوادريسبس', alternatives: ['سكوات بوزن الجسم', 'سكوات كعب مرفوع'] },
        { name: 'ثني أرجل', sets: 3, reps: '12-15', rest: '60 ث', muscle: 'الهامسترنج', alternatives: ['ثني أرجل واقف جهاز', 'نورديك كيرل'] },
        { name: 'رفع سمانة واقف', sets: 4, reps: '15-20', rest: '45 ث', muscle: 'السمانة', alternatives: ['رفع سمانة جالس', 'رفع سمانة بجهاز ضغط الأرجل'] },
        { name: 'طعنات بالدمبلز', sets: 3, reps: '10 لكل رجل', rest: '90 ث', muscle: 'الأرجل والمؤخرة', alternatives: ['صعود الصندوق', 'رفسة خلفية بالكيبل'] },
      ]},
    ]
  },
  {
    id: 'ul', name: 'Upper / Lower', icon: 'swap_vert',
    color: '#00fcca', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop',
    duration: '6 أسابيع', level: 'مبتدئ - متوسط', frequency: '4 أيام/أسبوع',
    desc: 'تقسيم بسيط وفعال بين الجزء العلوي والسفلي، مثالي لمن يبحث عن تكرار تدريبي عالٍ مع توازن في الراحة.',
    days: [
      { title: 'الجزء العلوي (Upper)', exercises: [
        { name: 'ضغط البنش بالبار', sets: 4, reps: '6-8', rest: '120 ث', muscle: 'الصدر', alternatives: ['ضغط بنش بالدمبلز', 'دبس متوازي'] },
        { name: 'تجديف بالدمبلز', sets: 4, reps: '8-10', rest: '90 ث', muscle: 'الظهر', alternatives: ['تجديف بالبار', 'تجديف كيبل جالس'] },
        { name: 'ضغط كتف بالدمبلز', sets: 3, reps: '10-12', rest: '90 ث', muscle: 'الكتف', alternatives: ['ضغط كتف عسكري بالبار', 'ضغط كتف جهاز'] },
        { name: 'سحب أمامي واسع', sets: 3, reps: '10-12', rest: '90 ث', muscle: 'الظهر العلوي', alternatives: ['عقلة واسع', 'سحب جهاز'] },
        { name: 'رفع جانبي', sets: 3, reps: '15', rest: '60 ث', muscle: 'الكتف الجانبي', alternatives: ['رفع جانبي كيبل', 'رفع جانبي جهاز'] },
        { name: 'كيرل بايسبس + تريسبس', sets: 3, reps: '12', rest: '60 ث', muscle: 'الذراعين', alternatives: ['بايسبس وتريسبس بالدمبلز', 'بايسبس وتريسبس بالكيبل'] },
      ]},
      { title: 'الجزء السفلي (Lower)', exercises: [
        { name: 'سكوات بالبار', sets: 4, reps: '6-8', rest: '180 ث', muscle: 'الفخذ الأمامي', alternatives: ['هاك سكوات', 'سكوات جوبليت بالدمبلز'] },
        { name: 'ديدلفت روماني', sets: 4, reps: '8-10', rest: '120 ث', muscle: 'الفخذ الخلفي', alternatives: ['ثني أرجل خلفي', 'ديدلفت بالدمبلز'] },
        { name: 'ضغط أرجل', sets: 3, reps: '10-12', rest: '90 ث', muscle: 'الفخذ الكامل', alternatives: ['طعنات متحركة بالدمبلز', 'طعنات بلغارية'] },
        { name: 'طعنات بلغارية', sets: 3, reps: '10 لكل رجل', rest: '90 ث', muscle: 'الأرجل والمؤخرة', alternatives: ['صعود الصندوق (Step-ups)', 'دفع حوض (Hip Thrust)'] },
        { name: 'ثني أرجل', sets: 3, reps: '12-15', rest: '60 ث', muscle: 'الهامسترنج', alternatives: ['ثني أرجل بالدمبل', 'نورديك كيرل'] },
        { name: 'رفع سمانة', sets: 4, reps: '15-20', rest: '45 ث', muscle: 'السمانة', alternatives: ['رفع سمانة جالس', 'سمانة على جهاز ضغط الأرجل'] },
      ]},
    ]
  },
  {
    id: 'fb', name: 'Full Body', icon: 'accessibility_new',
    color: '#f97316', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2000&auto=format&fit=crop',
    duration: '4 أسابيع', level: 'مبتدئ', frequency: '3 أيام/أسبوع',
    desc: 'برنامج شامل يستهدف جميع المجموعات العضلية في كل جلسة تدريبية، مثالي للمبتدئين ولتعزيز اللياقة العامة.',
    days: [
      { title: 'تمرين الجسم الكامل - يوم A', exercises: [
        { name: 'سكوات بالبار', sets: 4, reps: '8-10', rest: '120 ث', muscle: 'الأرجل', alternatives: ['ضغط أرجل', 'سكوات جوبليت'] },
        { name: 'ضغط البنش بالبار', sets: 4, reps: '8-10', rest: '120 ث', muscle: 'الصدر', alternatives: ['ضغط صدر بالدمبلز', 'ضغط صدر جهاز سميث'] },
        { name: 'تجديف بالبار', sets: 4, reps: '8-10', rest: '90 ث', muscle: 'الظهر', alternatives: ['تجديف بالدمبلز', 'سحب كيبل ضيق'] },
        { name: 'ضغط كتف عسكري', sets: 3, reps: '10-12', rest: '90 ث', muscle: 'الكتف', alternatives: ['ضغط كتف دمبلز', 'رفع جانبي'] },
        { name: 'كيرل بايسبس', sets: 2, reps: '12-15', rest: '60 ث', muscle: 'البايسبس', alternatives: ['كيرل مطرقة', 'كيرل كيبل'] },
        { name: 'تمديد تريسبس', sets: 2, reps: '12-15', rest: '60 ث', muscle: 'التريسبس', alternatives: ['دبس متوازي', 'كيك باك بالدمبلز'] },
      ]},
      { title: 'تمرين الجسم الكامل - يوم B', exercises: [
        { name: 'ديدلفت', sets: 4, reps: '6-8', rest: '180 ث', muscle: 'الظهر والأرجل', alternatives: ['رومانيان ديدلفت', 'تمديد ظهر'] },
        { name: 'ضغط صدر مائل بالدمبلز', sets: 3, reps: '10-12', rest: '90 ث', muscle: 'الصدر العلوي', alternatives: ['ضغط مائل بار', 'تفتيح مائل بالدمبلز'] },
        { name: 'سحب أمامي', sets: 3, reps: '10-12', rest: '90 ث', muscle: 'الظهر العلوي', alternatives: ['عقلة', 'سحب جهاز'] },
        { name: 'طعنات بالدمبلز', sets: 3, reps: '10 لكل رجل', rest: '90 ث', muscle: 'الأرجل', alternatives: ['طعنات بلغارية', 'هاك سكوات'] },
        { name: 'رفع جانبي', sets: 3, reps: '15', rest: '60 ث', muscle: 'الكتف', alternatives: ['فيس بولز (Face Pulls)', 'فراشة خلفي جهاز'] },
        { name: 'بلانك', sets: 3, reps: '45-60 ث', rest: '45 ث', muscle: 'البطن', alternatives: ['كرانشز (Crunches)', 'رفع أرجل معلق'] },
      ]},
    ]
  },
];

const getExerciseEquipment = (name: string): string[] => {
  const equipments = [];
  const text = name.toLowerCase();

  if (text.includes('دمبل') || text.includes('مطرقة') || text.includes('كيرل بايسبس') || text.includes('رفع جانبي') || text.includes('تريسبس')) {
    equipments.push('dumbbells');
  }

  if (text.includes('بار') || text.includes('عسكري') || text.includes('ديدلفت') || text.includes('سكوات') || text.includes('روما')) {
    equipments.push('barbell');
  }

  if (text.includes('كيبل') || text.includes('كابل') || text.includes('حبل') || text.includes('pull')) {
    equipments.push('cable');
  }

  if (
    text.includes('جهاز') ||
    text.includes('سحب') ||
    text.includes('تمديد') ||
    text.includes('ثني') ||
    text.includes('برس') ||
    text.includes('press')
  ) {
    equipments.push('machines');
  }

  if (
    text.includes('وزن') ||
    text.includes('جسم') ||
    text.includes('دبس') ||
    text.includes('متوازي') ||
    text.includes('بلانك') ||
    text.includes('عقلة') ||
    text.includes('سمانة') ||
    text.includes('بلغار')
  ) {
    equipments.push('bodyweight');
  }

  if (equipments.length === 0) {
    equipments.push('others');
  }

  return equipments;
};

export default function MuscleBuilding() {
  const { language } = useLanguage();
  const { isStarting, workoutStarted, handleStartWorkout } = useStartWorkout();
  const [selectedProgram, setSelectedProgram] = useState<ProgramType | null>(null);
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [customExercises, setCustomExercises] = usePersistentState<Record<string, { sets: number; reps: string; rest: string; swappedName?: string }>>('muscle_building_custom_v2', {});
  const [swapMenuOpenFor, setSwapMenuOpenFor] = useState<string | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>(['dumbbells', 'barbell', 'cable', 'machines', 'bodyweight', 'others']);

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
      const newVal = increment ? val + 1 : Math.max(1, val - 1);
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

  const handleStartRoutine = () => {
    if (!selectedProgram) return;
    const day = selectedProgram.days[activeDayIdx];
    const filteredExercises = day.exercises.filter(ex => {
      const key = `${day.title}-${ex.name}`;
      const custom = customExercises[key];
      const actualName = custom?.swappedName || ex.name;
      const eqList = getExerciseEquipment(actualName);
      return eqList.some(eq => selectedEquipment.includes(eq));
    });
    if (filteredExercises.length === 0) return;
    const workoutName = `برنامج ${selectedProgram.name} - ${day.title}`;
    const description = filteredExercises
      .map((ex) => {
        const custom = customExercises[`${day.title}-${ex.name}`] || { sets: ex.sets, reps: ex.reps, rest: ex.rest };
        return `• ${ex.name}: ${custom.sets} مجموعات × ${custom.reps} (راحة ${custom.rest})`;
      })
      .join('\n');
    handleStartWorkout(workoutName, description, selectedProgram.id);
  };

  if (selectedProgram) {
    const day = selectedProgram.days[activeDayIdx];
    const filteredExercises = day.exercises.filter(ex => {
      const key = `${day.title}-${ex.name}`;
      const custom = customExercises[key];
      const actualName = custom?.swappedName || ex.name;
      const eqList = getExerciseEquipment(actualName);
      return eqList.some(eq => selectedEquipment.includes(eq));
    });
    return (
      <FadeContent blur duration={400} easing="ease-out" initialOpacity={0}>
        <div className="relative flex flex-col min-h-screen pb-32 bg-[#0e0e0e] text-white font-display antialiased">
          <header className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 bg-[#0e0e0e]/80 backdrop-blur-xl border-b border-white/5 mb-4 -mx-4 md:-mx-8">
            <div className="w-10 flex justify-start"><BackButton onClick={() => setSelectedProgram(null)} /></div>
            <h1 className="text-lg font-bold truncate flex-1 text-center flex justify-center">
              <GradientText colors={['#e08dff','#bc00fb','#e08dff']} animationSpeed={6} showBorder={false}>
                {selectedProgram.name}
              </GradientText>
            </h1>
            <div className="w-10"></div>
          </header>

          <div className="rounded-3xl overflow-hidden p-6 relative shadow-2xl min-h-[180px] flex flex-col justify-end mb-8">
            <div className="absolute inset-0 bg-cover bg-center transition-all duration-500" style={{ backgroundImage: `url('${selectedProgram.image}')` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/80 to-transparent" />
            <div className="absolute top-4 left-4 w-24 h-24 rounded-full blur-3xl transition-all duration-500" style={{ backgroundColor: selectedProgram.color, opacity: 0.4 }} />
            
            <div className="relative z-10 flex items-end gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shrink-0 transition-all duration-500" style={{ backgroundColor: `${selectedProgram.color}40`, color: selectedProgram.color, backdropFilter: 'blur(8px)' }}>
                <span className="material-symbols-outlined text-3xl">{selectedProgram.icon}</span>
              </div>
              <div className="flex-1 pb-1">
                <h2 className="text-xl font-extrabold text-white mb-1">{selectedProgram.name}</h2>
                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">{selectedProgram.desc}</p>
              </div>
            </div>
            <div className="relative z-10 flex flex-wrap gap-2">
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

          {/* Equipment Filter Section */}
          <div className="mx-4 mt-6 p-5 rounded-2xl border border-white/5 bg-[#131313]">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined" style={{ color: selectedProgram.color }}>fitness_center</span>
              <h4 className="font-bold text-sm">الأجهزة المستخدمة لهذه الحصة</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'dumbbells', nameAr: 'دمبلز', icon: 'fitness_center' },
                { id: 'barbell', nameAr: 'بار', icon: 'line_weight' },
                { id: 'cable', nameAr: 'كيبل', icon: 'cable' },
                { id: 'machines', nameAr: 'أجهزة', icon: 'hardware' },
                { id: 'bodyweight', nameAr: 'وزن الجسم', icon: 'accessibility_new' },
                { id: 'others', nameAr: 'أدوات أخرى', icon: 'handyman' },
              ].map((option) => {
                const isSelected = selectedEquipment.includes(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedEquipment(selectedEquipment.filter((id) => id !== option.id));
                      } else {
                        setSelectedEquipment([...selectedEquipment, option.id]);
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs transition-all duration-300 ${
                      isSelected
                        ? 'border-white bg-white/10 text-white font-bold'
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

          <div className="px-4 mt-6 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">{day.title}</h3>
              <span className="text-xs px-3 py-1 rounded-full font-bold" style={{ color: selectedProgram.color, backgroundColor: `${selectedProgram.color}15` }}>
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
                            <div className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center font-bold text-sm" style={{ backgroundColor: `${selectedProgram.color}15`, color: selectedProgram.color }}>
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
                                className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-xs font-bold text-[#adaaaa] hover:text-white"
                                title="استبدال التمرين"
                              >
                                <span className="material-symbols-outlined text-[14px]">swap_horiz</span>
                                تبديل
                              </button>
                              
                              <AnimatePresence>
                                {swapMenuOpenFor === key && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -5, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                                    className="absolute left-0 top-full mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl shadow-black/50 z-50 overflow-hidden"
                                  >
                                    <div className="px-3 py-2 border-b border-white/5 text-[10px] text-[#adaaaa] font-bold">
                                      اختر تمريناً بديلاً:
                                    </div>
                                    <div className="max-h-40 overflow-y-auto scrollbar-hide">
                                      {/* Option to revert to original */}
                                      {custom.swappedName && (
                                        <button
                                          onClick={() => {
                                            const newCustom = { ...custom };
                                            delete newCustom.swappedName;
                                            setCustomExercises(prev => ({ ...prev, [key]: newCustom }));
                                            setSwapMenuOpenFor(null);
                                          }}
                                          className="w-full text-right px-3 py-2.5 text-xs hover:bg-white/5 transition-colors border-b border-white/5 text-white/80"
                                        >
                                          <span className="text-[#f59e0b] font-bold block mb-0.5">التمرين الأصلي:</span>
                                          {ex.name}
                                        </button>
                                      )}
                                      
                                      {ex.alternatives.map((alt, altIdx) => (
                                        <button
                                          key={altIdx}
                                          onClick={() => {
                                            setCustomExercises(prev => ({
                                              ...prev,
                                              [key]: { ...custom, swappedName: alt }
                                            }));
                                            setSwapMenuOpenFor(null);
                                          }}
                                          className={`w-full text-right px-3 py-2.5 text-xs hover:bg-white/5 transition-colors ${actualName === alt ? 'bg-white/5 text-white font-bold' : 'text-[#adaaaa]'}`}
                                          style={actualName === alt ? { color: selectedProgram.color } : {}}
                                        >
                                          {alt}
                                        </button>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Interactive Customization Controls */}
                      <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/5">
                        {/* Sets Control */}
                        <div className="flex flex-col items-center p-2 rounded-xl bg-white/5 border border-white/5">
                          <span className="text-[9px] text-[#adaaaa] mb-1 flex items-center gap-0.5 select-none">
                            <span className="material-symbols-outlined text-[10px]" style={{ color: selectedProgram.color }}>replay</span>
                            المجموعات
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setCustomExercises(prev => ({
                                  ...prev,
                                  [key]: { ...custom, sets: Math.max(1, custom.sets - 1) }
                                }));
                              }}
                              className="size-6 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs transition-colors"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold font-mono select-none">{custom.sets}</span>
                            <button
                              onClick={() => {
                                setCustomExercises(prev => ({
                                  ...prev,
                                  [key]: { ...custom, sets: custom.sets + 1 }
                                }));
                              }}
                              className="size-6 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Reps Control */}
                        <div className="flex flex-col items-center p-2 rounded-xl bg-white/5 border border-white/5">
                          <span className="text-[9px] text-[#adaaaa] mb-1 flex items-center gap-0.5 select-none">
                            <span className="material-symbols-outlined text-[10px]" style={{ color: selectedProgram.color }}>fitness_center</span>
                            التكرارات
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setCustomExercises(prev => ({
                                  ...prev,
                                  [key]: { ...custom, reps: adjustReps(custom.reps, false) }
                                }));
                              }}
                              className="size-6 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs transition-colors"
                            >
                              -
                            </button>
                            <span className="text-[10px] font-bold text-center leading-none truncate max-w-[40px] select-none">{custom.reps}</span>
                            <button
                              onClick={() => {
                                setCustomExercises(prev => ({
                                  ...prev,
                                  [key]: { ...custom, reps: adjustReps(custom.reps, true) }
                                }));
                              }}
                              className="size-6 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Rest Control */}
                        <div className="flex flex-col items-center p-2 rounded-xl bg-white/5 border border-white/5">
                          <span className="text-[9px] text-[#adaaaa] mb-1 flex items-center gap-0.5 select-none">
                            <span className="material-symbols-outlined text-[10px]" style={{ color: selectedProgram.color }}>timer</span>
                            الراحة
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setCustomExercises(prev => ({
                                  ...prev,
                                  [key]: { ...custom, rest: adjustRest(custom.rest, false) }
                                }));
                              }}
                              className="size-6 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs transition-colors"
                            >
                              -
                            </button>
                            <span className="text-[10px] font-bold text-center leading-none truncate max-w-[40px] select-none">{custom.rest}</span>
                            <button
                              onClick={() => {
                                setCustomExercises(prev => ({
                                  ...prev,
                                  [key]: { ...custom, rest: adjustRest(custom.rest, true) }
                                }));
                              }}
                              className="size-6 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs transition-colors"
                            >
                              +
                            </button>
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

          {/* Start/Record Session Button */}
          <div className="mx-4 mt-6">
            <button
              onClick={handleStartRoutine}
              disabled={isStarting || workoutStarted || filteredExercises.length === 0}
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

  return (
    <FadeContent blur duration={600} easing="ease-out" initialOpacity={0}>
      <div className="relative flex flex-col min-h-screen pb-32 bg-[#0e0e0e] text-white font-display antialiased">
        <header className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 bg-[#0e0e0e]/80 backdrop-blur-xl border-b border-white/5">
          <div className="w-10 flex justify-start"><BackButton /></div>
          <h1 className="text-xl font-extrabold truncate flex-1 text-center flex justify-center">
            <GradientText colors={['#e08dff','#bc00fb','#e08dff']} animationSpeed={6} showBorder={false}>
              برامج بناء العضلات
            </GradientText>
          </h1>
          <div className="w-10"></div>
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
