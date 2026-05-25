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
        { name: 'سكوات بوزن الجسم', sets: 3, reps: '12-15', rest: '60 ث', muscle: 'الأرجل', alternatives: ['سكوات مع دمبل جوبليت', 'ضغط أرجل جهاز'] },
        { name: 'ضغط أرضي (Push-ups)', sets: 3, reps: '8-12', rest: '60 ث', muscle: 'الصدر', note: 'يمكن تعديلها على الركبتين', alternatives: ['ضغط بنش بالدمبلز', 'ضغط صدر على الجهاز'] },
        { name: 'تجديف بالدمبلز', sets: 3, reps: '10-12', rest: '60 ث', muscle: 'الظهر', alternatives: ['سحب أرضي بالكيبل', 'تجديف بالبار'] },
        { name: 'طعنات ثابتة', sets: 3, reps: '10 لكل رجل', rest: '60 ث', muscle: 'الأرجل والمؤخرة', alternatives: ['طعنات مشي بالدمبلز', 'صعود الصندوق'] },
        { name: 'بلانك', sets: 3, reps: '20-30 ث', rest: '45 ث', muscle: 'البطن', alternatives: ['كرانشز (Crunches)', 'رفع أرجل معلق'] },
        { name: 'مشي سريع على المشاية', sets: 1, reps: '20 دقيقة', rest: '-', muscle: 'كارديو', note: 'سرعة 5-6 كم/ساعة', alternatives: ['دراجة ثابتة', 'جهاز الاوربتراك'] },
      ]},
      { title: 'يوم B — جسم كامل + كارديو', exercises: [
        { name: 'ديدلفت بالدمبلز', sets: 3, reps: '10-12', rest: '60 ث', muscle: 'الظهر والأرجل', alternatives: ['رومانيان ديدلفت', 'كابل Pull-through'] },
        { name: 'ضغط كتف بالدمبلز (جالس)', sets: 3, reps: '10-12', rest: '60 ث', muscle: 'الكتف', alternatives: ['ضغط كتف أمامي جهاز', 'ضغط عسكري بالبار'] },
        { name: 'سحب أمامي بالكيبل', sets: 3, reps: '12', rest: '60 ث', muscle: 'الظهر العلوي', alternatives: ['سحب جهاز همار', 'عقلة (Pull-ups)'] },
        { name: 'Step-ups على صندوق', sets: 3, reps: '10 لكل رجل', rest: '60 ث', muscle: 'الأرجل', alternatives: ['طعنات بلغارية', 'هاك سكوات'] },
        { name: 'كرنش عكسي', sets: 3, reps: '15', rest: '45 ث', muscle: 'البطن السفلي', alternatives: ['رفرفة بطن مقصية', 'رفع ركبتين معلق'] },
        { name: 'دراجة ثابتة', sets: 1, reps: '15 دقيقة', rest: '-', muscle: 'كارديو', note: 'مقاومة خفيفة', alternatives: ['مشي سريع', 'نط الحبل الخفيف'] },
      ]},
    ]
  },
  {
    id: 'intermediate', name: 'Intermediate', nameAr: 'المتوسط', icon: 'local_fire_department',
    color: '#e08dff', duration: '6 أسابيع', level: 'متوسط', frequency: '4-5 أيام/أسبوع', cardio: 'HIIT + LISS',
    desc: 'يجمع بين تدريبات المقاومة المركبة و HIIT لتسريع عملية الأيض وحرق الدهون مع الحفاظ على الكتلة العضلية.',
    days: [
      { title: 'يوم الجزء العلوي + HIIT', exercises: [
        { name: 'ضغط البنش بالبار', sets: 4, reps: '10-12', rest: '75 ث', muscle: 'الصدر', alternatives: ['ضغط بنش بالدمبلز', 'دبس متوازي'] },
        { name: 'تجديف بالبار', sets: 4, reps: '10-12', rest: '75 ث', muscle: 'الظهر', alternatives: ['تجديف بالدمبلز', 'تي بار رو'] },
        { name: 'ضغط كتف بالدمبلز', sets: 3, reps: '12', rest: '60 ث', muscle: 'الكتف', alternatives: ['رفع جانبي وأمامي', 'ضغط كتف جهاز'] },
        { name: 'Face Pulls', sets: 3, reps: '15', rest: '45 ث', muscle: 'الكتف الخلفي', alternatives: ['فراشة خلفي جهاز', 'رفرفة خلفية بالدمبلز'] },
        { name: 'سوبرسيت: بايسبس + تريسبس', sets: 3, reps: '12+12', rest: '45 ث', muscle: 'الذراعين', note: 'بدون راحة بين التمرينين', alternatives: ['كيرل مطرقة + كيك باك', 'كيرل كيبل + تمديد حبل'] },
        { name: 'HIIT سبرنت', sets: 8, reps: '20 ث سبرنت / 40 ث راحة', rest: '-', muscle: 'كارديو HIIT', note: 'إجمالي 8 دقائق', alternatives: ['HIIT دراجة ثابتة', 'Burpees متفجر'] },
      ]},
      { title: 'يوم الجزء السفلي + Core', exercises: [
        { name: 'سكوات بالبار', sets: 4, reps: '10-12', rest: '90 ث', muscle: 'الفخذ الأمامي', alternatives: ['سكوات جوبليت دمبل', 'هاك سكوات'] },
        { name: 'ديدلفت روماني', sets: 4, reps: '10-12', rest: '90 ث', muscle: 'الفخذ الخلفي', alternatives: ['ثني أرجل خلفي', 'ديدلفت مستقيم'] },
        { name: 'ضغط أرجل', sets: 3, reps: '12-15', rest: '60 ث', muscle: 'الفخذ الكامل', alternatives: ['طعنات بلغارية', 'صعود الصندوق'] },
        { name: 'طعنات مشي بالدمبلز', sets: 3, reps: '12 لكل رجل', rest: '60 ث', muscle: 'الأرجل والمؤخرة', alternatives: ['دفع حوض (Hip Thrust)', 'رفسة خلفية بالكيبل'] },
        { name: 'رفع سمانة', sets: 4, reps: '15-20', rest: '30 ث', muscle: 'السمانة', alternatives: ['رفع سمانة جالس', 'رفع سمانة على المشاية بميل'] },
        { name: 'دائرة بطن: بلانك + كرنش + دراجة', sets: 3, reps: '30 ث لكل تمرين', rest: '45 ث', muscle: 'البطن', alternatives: ['تويست روسي + رفع أرجل', 'كرانشز كابل + سايد بلانك'] },
      ]},
      { title: 'يوم كارديو + تكييف', exercises: [
        { name: 'إحماء ديناميكي', sets: 1, reps: '5 دقائق', rest: '-', muscle: 'الجسم الكامل', alternatives: ['مشي سريع', 'هرولة خفيفة'] },
        { name: 'Burpees', sets: 4, reps: '10', rest: '30 ث', muscle: 'الجسم الكامل', alternatives: ['قفز نجمي (Jumping Jacks)', 'تبادل أرجل سريع'] },
        { name: 'قفز الحبل', sets: 4, reps: '60 ث', rest: '30 ث', muscle: 'كارديو', alternatives: ['دراجة هوائية سريعة', 'ركض في المكان'] },
        { name: 'Mountain Climbers', sets: 4, reps: '20 لكل جانب', rest: '30 ث', muscle: 'البطن + كارديو', alternatives: ['تويست روسي سريع', 'بلانك جاكس'] },
        { name: 'Kettlebell Swings', sets: 4, reps: '15', rest: '45 ث', muscle: 'الظهر والأرجل', alternatives: ['ديدلفت بالدمبلز سريع', 'قفز قرفصاء'] },
        { name: 'مشي مائل على المشاية', sets: 1, reps: '15 دقيقة', rest: '-', muscle: 'LISS كارديو', note: 'ميل 10-12%', alternatives: ['صعود الدرج (Stairmaster)', 'دراجة ثابتة'] },
      ]},
    ]
  },
  {
    id: 'advanced', name: 'Advanced', nameAr: 'المتقدم', icon: 'whatshot',
    color: '#ff6b6b', duration: '8 أسابيع', level: 'متقدم', frequency: '5-6 أيام/أسبوع', cardio: 'HIIT مكثف + تدريب دوائر',
    desc: 'برنامج عالي الكثافة يجمع بين التدريب الدوائري والسوبرسيت و HIIT المكثف لتحقيق أقصى حرق للدهون والوصول لنسبة دهون منخفضة.',
    days: [
      { title: 'يوم دفع + HIIT مكثف', exercises: [
        { name: 'سوبرسيت: بنش بار + تفتيح كيبل', sets: 4, reps: '10+12', rest: '60 ث', muscle: 'الصدر', note: 'بدون راحة بين التمرينين', alternatives: ['بنش دمبلز + تفتيح دمبلز', 'ضغط جهاز + بيك ديك'] },
        { name: 'سوبرسيت: ضغط كتف + رفع جانبي', sets: 4, reps: '10+15', rest: '60 ث', muscle: 'الكتف', alternatives: ['ضغط كتف جهاز + رفع جانبي كيبل'] },
        { name: 'تراي سيت: تريسبس حبل + ضغط ضيق + دبس', sets: 3, reps: '12+10+8', rest: '75 ث', muscle: 'التريسبس', note: 'ثلاث تمارين متتالية', alternatives: ['تريسبس بار + كيك باك + ضغط أرضي ضيق'] },
        { name: 'HIIT تبادلي على المشاية', sets: 10, reps: '30 ث سبرنت / 30 ث راحة', rest: '-', muscle: 'كارديو HIIT', note: '10 دقائق إجمالي', alternatives: ['HIIT جهاز التجديف', 'Tabata دراجة سريعة'] },
      ]},
      { title: 'يوم سحب + تدريب دوائري', exercises: [
        { name: 'سوبرسيت: سحب أمامي + تجديف كيبل', sets: 4, reps: '10+12', rest: '60 ث', muscle: 'الظهر', alternatives: ['عقلة + تجديف بالدمبلز', 'سحب جهاز + تي بار'] },
        { name: 'سوبرسيت: Face Pull + شراجز', sets: 3, reps: '15+12', rest: '45 ث', muscle: 'الترابيس والكتف الخلفي', alternatives: ['فراشة خلفي + شراجز بار'] },
        { name: 'سوبرسيت: بايسبس بار + مطرقة', sets: 3, reps: '10+12', rest: '45 ث', muscle: 'البايسبس', alternatives: ['كيرل دمبلز تبادلي + كيرل كيبل'] },
        { name: 'دائرة حرق: Burpees + Box Jump + Battle Ropes', sets: 4, reps: '30 ث لكل تمرين', rest: '60 ث بين الدوائر', muscle: 'تكييف عام', alternatives: ['قفز سكوات + متسلق الجبال + قفز حبل'] },
      ]},
      { title: 'يوم أرجل + Tabata', exercises: [
        { name: 'سوبرسيت: سكوات + قفز سكوات', sets: 4, reps: '10+8', rest: '75 ث', muscle: 'الفخذ الأمامي', note: 'انفجاري في القفز', alternatives: ['ضغط أرجل + طعنات قفز', 'هاك سكوات + قفز صندوق'] },
        { name: 'سوبرسيت: ديدلفت روماني + طعنات مشي', sets: 4, reps: '10+12', rest: '75 ث', muscle: 'الفخذ الخلفي', alternatives: ['ثني أرجل + طعنات بلغارية'] },
        { name: 'سوبرسيت: تمديد أرجل + ثني أرجل', sets: 3, reps: '15+15', rest: '45 ث', muscle: 'الأرجل الكاملة', alternatives: ['سكوات بوزن الجسم + ديدلفت خفيف'] },
        { name: 'Tabata بطن: كرنش + بلانك + جانبي + رفع أرجل', sets: 4, reps: '20 ث عمل / 10 ث راحة', rest: '60 ث', muscle: 'البطن', note: '4 دقائق Tabata', alternatives: ['تويست روسي + دراجة بطن + V-ups'] },
        { name: 'سبرنت مائل', sets: 6, reps: '30 ث سبرنت / 30 ث راحة', rest: '-', muscle: 'كارديو HIIT', note: 'ميل 8%', alternatives: ['صعود الدرج السريع', 'HIIT دراجة'] },
      ]},
    ]
  },
];

const getExerciseEquipment = (name: string): string[] => {
  const equipments = [];
  const text = name.toLowerCase();

  if (text.includes('دمبل') || text.includes('مطرقة') || text.includes('كيرل بايسبس') || text.includes('رفع جانبي') || text.includes('تريسبس') || text.includes('dumbbell') || text.includes('flyes') || text.includes('lateral')) {
    equipments.push('dumbbells');
  }

  if (text.includes('بار') || text.includes('عسكري') || text.includes('ديدلفت') || text.includes('سكوات') || text.includes('روما') || text.includes('barbell') || text.includes('squat') || text.includes('deadlift')) {
    equipments.push('barbell');
  }

  if (text.includes('كيبل') || text.includes('كابل') || text.includes('حبل') || text.includes('pull') || text.includes('cable') || text.includes('rope')) {
    equipments.push('cable');
  }

  if (
    text.includes('جهاز') ||
    text.includes('سحب') ||
    text.includes('تمديد') ||
    text.includes('ثني') ||
    text.includes('برس') ||
    text.includes('press') ||
    text.includes('machine') ||
    text.includes('step-up') ||
    text.includes('صندوق') ||
    text.includes('box') ||
    text.includes('مشاية') ||
    text.includes('تجديف') ||
    text.includes('دراجة') ||
    text.includes('bike') ||
    text.includes('treadmill')
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
    text.includes('بلغار') ||
    text.includes('push-up') ||
    text.includes('pushups') ||
    text.includes('plank') ||
    text.includes('burpees') ||
    text.includes('crunch') ||
    text.includes('كرنش') ||
    text.includes('سبرنت') ||
    text.includes('sprint')
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

export default function FatLossProgram() {
  const { language } = useLanguage();
  const { isStarting, workoutStarted, handleStartWorkout } = useStartWorkout();
  const [selectedProgram, setSelectedProgram] = useState<ProgramType | null>(null);
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [customExercises, setCustomExercises] = usePersistentState<Record<string, { sets: number; reps: string; rest: string; swappedName?: string }>>('fat_loss_custom_v2', {});
  const [swapMenuOpenFor, setSwapMenuOpenFor] = useState<string | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>(['dumbbells', 'barbell', 'cable', 'machines', 'bodyweight', 'others']);

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
    const workoutName = `برنامج خسارة الدهون — ${selectedProgram.nameAr}`;
    const description = filteredExercises
      .map((ex) => {
        const key = `${day.title}-${ex.name}`;
        const custom = customExercises[key] || { sets: ex.sets, reps: ex.reps, rest: ex.rest };
        return `• ${ex.name}: ${custom.sets} مجموعات × ${custom.reps} (راحة ${custom.rest})`;
      })
      .join('\n');
    handleStartWorkout(workoutName, description, selectedProgram.id);
  };

  // Detail view
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

          {/* Exercises List */}
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
