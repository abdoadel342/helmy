import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, ArrowRight, Clock, Dumbbell, Repeat, PlayCircle, Target, Calendar, BarChart, Info, Activity, CheckCircle2 } from 'lucide-react';
import { doc, setDoc, getDocs, collection, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../AuthContext';

import { useNavigate } from 'react-router-dom';

type ExerciseSet = {
  set_number: number;
  set_type: string;
  reps: number;
  weight_percentage_1rm: number;
  rpe: number;
  rest_time_seconds: number;
};

type Exercise = {
  exercise_id: string;
  exercise_name: string;
  target_muscle: string;
  video_url: string;
  tempo: string;
  coach_note?: string;
  sets: ExerciseSet[];
};

type TrainingDay = {
  day_order: number;
  day_title: string;
  is_rest_day: boolean;
  exercises: Exercise[];
};

type Week = {
  week_number: number;
  days: TrainingDay[];
};

type Program = {
  program_id: string;
  program_name: string;
  target_level: string;
  program_description: string;
  program_goal: string;
  duration_value: number;
  duration_unit: string;
  image: string;
  weeks: Week[];
};

export const programsData: Program[] = [
  {
    program_id: "prog_001",
    program_name: "برنامج القوة العضلية (التضخيم)",
    target_level: "متقدم",
    program_description: "ركز على التكرارات القليلة، الأوزان الثقيلة، والزيادة التدريجية لبناء قوة خام وتضخيم العضلات.",
    program_goal: "زيادة القوة القصوى والتضخيم",
    duration_value: 8,
    duration_unit: "أسابيع",
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=2071&auto=format&fit=crop",
    weeks: [
      {
        week_number: 1,
        days: [
          {
            day_order: 1,
            day_title: "اليوم الأول: دفع (صدر وكتف أمامي وتريسبس)",
            is_rest_day: false,
            exercises: [
              {
                exercise_id: "ex_001",
                exercise_name: "تفتيح صدر بالدمبلز (Incline Dumbbell Flyes)",
                target_muscle: "الصدر العلوي",
                video_url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
                tempo: "3-1-1-0", 
                coach_note: "ركز على أقصى مدى حركي وتمدد العضلة في الأسفل.",
                sets: [
                  {
                    set_number: 1,
                    set_type: "تسخين (Warm-up)",
                    reps: 15,
                    weight_percentage_1rm: 50,
                    rpe: 5,
                    rest_time_seconds: 60
                  },
                  {
                    set_number: 2,
                    set_type: "أساسية (Working Set)",
                    reps: 10,
                    weight_percentage_1rm: 75,
                    rpe: 8,
                    rest_time_seconds: 90
                  },
                  {
                    set_number: 3,
                    set_type: "دروب سيت (Drop Set)",
                    reps: 8,
                    weight_percentage_1rm: 85,
                    rpe: 9,
                    rest_time_seconds: 120
                  }
                ]
              },
              {
                exercise_id: "ex_002",
                exercise_name: "ضغط الصدر بالبار (Bench Press)",
                target_muscle: "الصدر الأوسط",
                video_url: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
                tempo: "2-0-1-0", 
                coach_note: "حافظ على ثبات قدميك على الأرض وتقوس خفيف في أسفل الظهر.",
                sets: [
                  {
                    set_number: 1,
                    set_type: "أساسية (Working Set)",
                    reps: 5,
                    weight_percentage_1rm: 80,
                    rpe: 8,
                    rest_time_seconds: 180
                  },
                  {
                    set_number: 2,
                    set_type: "أساسية (Working Set)",
                    reps: 5,
                    weight_percentage_1rm: 80,
                    rpe: 8.5,
                    rest_time_seconds: 180
                  }
                ]
              }
            ]
          },
          {
            day_order: 2,
            day_title: "اليوم الثاني: راحة نشطة",
            is_rest_day: true,
            exercises: []
          }
        ]
      }
    ]
  },
  {
    program_id: "prog_002",
    program_name: "برنامج السرعة واللياقة",
    target_level: "متوسط",
    program_description: "تمارين عالية الكثافة (HIIT) لزيادة السرعة، حرق الدهون، وتحسين اللياقة القلبية التنفسية.",
    program_goal: "السرعة واللياقة",
    duration_value: 6,
    duration_unit: "أسابيع",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
    weeks: [
      {
        week_number: 1,
        days: [
          {
            day_order: 1,
            day_title: "اليوم الأول: كارديو عالي الكثافة",
            is_rest_day: false,
            exercises: [
              {
                exercise_id: "ex_003",
                exercise_name: "الجري السريع (Sprints)",
                target_muscle: "القلب والساقين",
                video_url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
                tempo: "N/A", 
                coach_note: "اركض بأقصى سرعة لمدة 30 ثانية ثم استرح.",
                sets: [
                  {
                    set_number: 1,
                    set_type: "أساسية (Working Set)",
                    reps: 1,
                    weight_percentage_1rm: 0,
                    rpe: 9,
                    rest_time_seconds: 60
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    program_id: "prog_003",
    program_name: "برنامج المرونة والاستشفاء",
    target_level: "مبتدئ",
    program_description: "جلسات إطالة ويوجا مصممة لزيادة المدى الحركي، تقليل التوتر العضلي، وتسريع الاستشفاء.",
    program_goal: "المرونة والاستشفاء",
    duration_value: 4,
    duration_unit: "أسابيع",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop",
    weeks: [
      {
        week_number: 1,
        days: [
          {
            day_order: 1,
            day_title: "اليوم الأول: إطالات الجسم الكامل",
            is_rest_day: false,
            exercises: [
              {
                exercise_id: "ex_004",
                exercise_name: "إطالة أوتار الركبة (Hamstring Stretch)",
                target_muscle: "أوتار الركبة",
                video_url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
                tempo: "ثبات", 
                coach_note: "حافظ على استقامة ظهرك وتنفس بعمق.",
                sets: [
                  {
                    set_number: 1,
                    set_type: "إطالة (Stretch)",
                    reps: 1,
                    weight_percentage_1rm: 0,
                    rpe: 4,
                    rest_time_seconds: 30
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    program_id: "prog_004",
    program_name: "القوة الانفجارية والسرعة (Plyometrics)",
    target_level: "متوسط",
    program_description: "تمارين بليومترية لتحسين التوافق العضلي العصبي والقدرة الانفجارية للأداء الرياضي.",
    program_goal: "القوة الانفجارية والسرعة",
    duration_value: 4,
    duration_unit: "أسابيع",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop",
    weeks: [
      {
        week_number: 1,
        days: [
          {
            day_order: 1,
            day_title: "اليوم الأول: تمارين بليومترية",
            is_rest_day: false,
            exercises: [
              {
                exercise_id: "ex_005",
                exercise_name: "قفز الصندوق (Box Jumps)",
                target_muscle: "الساقين",
                video_url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
                tempo: "انفجاري",
                coach_note: "اهبط بهدوء لامتصاص الصدمة.",
                sets: [
                  { set_number: 1, set_type: "أساسية (Working Set)", reps: 8, weight_percentage_1rm: 75, rpe: 8, rest_time_seconds: 90 },
                  { set_number: 2, set_type: "أساسية (Working Set)", reps: 8, weight_percentage_1rm: 75, rpe: 8, rest_time_seconds: 90 },
                  { set_number: 3, set_type: "أساسية (Working Set)", reps: 8, weight_percentage_1rm: 75, rpe: 8, rest_time_seconds: 90 },
                  { set_number: 4, set_type: "أساسية (Working Set)", reps: 8, weight_percentage_1rm: 75, rpe: 8, rest_time_seconds: 90 }
                ]
              },
              {
                exercise_id: "ex_006",
                exercise_name: "رمي الكرة الطبية (Medicine Ball Throws)",
                target_muscle: "الجذع والذراعين",
                video_url: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
                tempo: "انفجاري",
                coach_note: "استخدم قوة الجذع في الرمي.",
                sets: [
                  { set_number: 1, set_type: "أساسية (Working Set)", reps: 10, weight_percentage_1rm: 70, rpe: 7, rest_time_seconds: 60 },
                  { set_number: 2, set_type: "أساسية (Working Set)", reps: 10, weight_percentage_1rm: 70, rpe: 7, rest_time_seconds: 60 },
                  { set_number: 3, set_type: "أساسية (Working Set)", reps: 10, weight_percentage_1rm: 70, rpe: 7, rest_time_seconds: 60 }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

function RestTimer({ defaultTime }: { defaultTime: number }) {
  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(defaultTime);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-3 bg-zinc-900/50 p-2 rounded-xl border border-zinc-800">
      <div className="text-xl font-mono text-purple-400 w-14 text-center">{formatTime(timeLeft)}</div>
      <button onClick={toggleTimer} className="p-1.5 bg-purple-600 hover:bg-purple-500 rounded-lg text-white transition-colors">
        {isActive ? <Pause size={16} /> : <Play size={16} />}
      </button>
      <button onClick={resetTimer} className="p-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white transition-colors">
        <RotateCcw size={16} />
      </button>
    </div>
  );
}

export default function Programs() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<Program[]>(programsData);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [activeWeekIndex, setActiveWeekIndex] = useState(0);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [completedDays, setCompletedDays] = useState<string[]>([]);
  const [isCompleting, setIsCompleting] = useState(false);

  // Fetch programs from Firestore
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const programsRef = collection(db, 'programs');
        const snapshot = await getDocs(programsRef);
        if (!snapshot.empty) {
          const fetchedPrograms: Program[] = [];
          snapshot.forEach((doc) => {
            fetchedPrograms.push(doc.data() as Program);
          });
          setPrograms(fetchedPrograms);
        } else {
          // Fallback to mock data if Firestore is empty
          setPrograms(programsData);
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
        setPrograms(programsData);
      } finally {
        setLoadingPrograms(false);
      }
    };

    fetchPrograms();
  }, []);

  // Fetch completed days for the selected program
  useEffect(() => {
    if (!user || !selectedProgram) return;

    const fetchProgress = async () => {
      try {
        const progressRef = collection(db, 'users', user.uid, 'workout_progress');
        const q = query(progressRef, where('program_id', '==', selectedProgram.program_id));
        const snapshot = await getDocs(q);
        
        const completed: string[] = [];
        snapshot.forEach((doc) => {
          completed.push(doc.id); // doc.id will be like: prog_001_w1_d1
        });
        setCompletedDays(completed);
      } catch (error) {
        console.error("Error fetching workout progress:", error);
      }
    };

    fetchProgress();
  }, [user, selectedProgram]);

  const handleCompleteWorkout = async (programId: string, weekNumber: number, dayOrder: number) => {
    if (!user) {
      alert("يرجى تسجيل الدخول لحفظ تقدمك.");
      return;
    }

    const workoutId = `${programId}_w${weekNumber}_d${dayOrder}`;
    
    if (completedDays.includes(workoutId)) {
      return; // Already completed
    }

    setIsCompleting(true);
    try {
      const docRef = doc(db, 'users', user.uid, 'workout_progress', workoutId);
      await setDoc(docRef, {
        program_id: programId,
        week_number: weekNumber,
        day_order: dayOrder,
        completed_at: serverTimestamp()
      });
      
      setCompletedDays(prev => [...prev, workoutId]);
    } catch (error) {
      console.error("Error saving workout progress:", error);
      alert("حدث خطأ أثناء حفظ التقدم. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsCompleting(false);
    }
  };

  if (selectedProgram) {
    const activeWeek = selectedProgram.weeks[activeWeekIndex];
    const activeDay = activeWeek?.days[activeDayIndex];
    const currentWorkoutId = `${selectedProgram.program_id}_w${activeWeek?.week_number}_d${activeDay?.day_order}`;
    const isCurrentDayCompleted = completedDays.includes(currentWorkoutId);

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6 pb-12"
      >
        <button 
          onClick={() => setSelectedProgram(null)}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowRight size={20} />
          <span>العودة للبرامج</span>
        </button>

        <header className="relative rounded-3xl overflow-hidden mb-8 bg-zinc-950 border border-zinc-800">
          <div className="h-64 relative">
            <img src={selectedProgram.image} alt={selectedProgram.program_name} className="w-full h-full object-cover opacity-40 mix-blend-luminosity" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-4xl font-bold text-white mb-2">{selectedProgram.program_name}</h1>
              <p className="text-zinc-300 max-w-2xl text-lg">{selectedProgram.program_description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-zinc-900/50 border-t border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Target size={20} /></div>
              <div>
                <div className="text-xs text-zinc-500">الهدف</div>
                <div className="font-medium text-white">{selectedProgram.program_goal}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Calendar size={20} /></div>
              <div>
                <div className="text-xs text-zinc-500">المدة</div>
                <div className="font-medium text-white">{selectedProgram.duration_value} {selectedProgram.duration_unit}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><BarChart size={20} /></div>
              <div>
                <div className="text-xs text-zinc-500">المستوى</div>
                <div className="font-medium text-white">{selectedProgram.target_level}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400"><Repeat size={20} /></div>
              <div>
                <div className="text-xs text-zinc-500">الأسابيع</div>
                <div className="font-medium text-white">{selectedProgram.weeks.length} أسابيع</div>
              </div>
            </div>
          </div>
        </header>

        {/* Weeks Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {selectedProgram.weeks.map((week, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveWeekIndex(idx);
                setActiveDayIndex(0); // Reset day when changing week
              }}
              className={`px-6 py-2 rounded-xl whitespace-nowrap font-medium transition-all ${
                activeWeekIndex === idx 
                  ? 'bg-zinc-800 text-white border border-zinc-700' 
                  : 'bg-zinc-900/50 text-zinc-500 hover:bg-zinc-800 hover:text-white border border-transparent'
              }`}
            >
              الأسبوع {week.week_number}
            </button>
          ))}
        </div>

        {/* Days Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {activeWeek?.days.map((day, idx) => {
            const dayId = `${selectedProgram.program_id}_w${activeWeek.week_number}_d${day.day_order}`;
            const isCompleted = completedDays.includes(dayId);
            
            return (
              <button
                key={idx}
                onClick={() => setActiveDayIndex(idx)}
                className={`px-6 py-3 rounded-2xl whitespace-nowrap font-medium transition-all flex items-center gap-2 ${
                  activeDayIndex === idx 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' 
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {day.day_title.split(':')[0]} {/* Show only "اليوم الأول" in tab */}
                {isCompleted && <CheckCircle2 size={16} className={activeDayIndex === idx ? "text-white" : "text-emerald-500"} />}
              </button>
            );
          })}
        </div>

        {/* Active Day Content */}
        <div className="space-y-6">
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-purple-400 mb-1">{activeDay?.day_title}</h2>
            </div>
            {activeDay?.is_rest_day && (
              <div className="flex items-center gap-3">
                {isCurrentDayCompleted && (
                  <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 border border-emerald-500/30">
                    <CheckCircle2 size={16} /> مكتمل
                  </div>
                )}
                <div className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-xl font-medium flex items-center gap-2">
                  <Clock size={18} /> يوم راحة واستشفاء
                </div>
              </div>
            )}
          </div>

          {!activeDay?.is_rest_day && (
            <div className="space-y-6">
              {activeDay?.exercises.map((exercise, idx) => (
                <div key={idx} className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden hover:border-purple-500/30 transition-colors">
                  <div className="flex flex-col md:flex-row">
                    {/* Exercise Visual */}
                    <div className="w-full md:w-64 h-48 md:h-auto relative bg-zinc-900 shrink-0 group">
                      <img src={exercise.video_url} alt={exercise.exercise_name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayCircle className="w-12 h-12 text-white/70 group-hover:text-white group-hover:scale-110 transition-all drop-shadow-lg" />
                      </div>
                    </div>

                    {/* Exercise Header Details */}
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">{exercise.exercise_name}</h3>
                          <div className="flex gap-2">
                            <span className="bg-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-full">{exercise.target_muscle}</span>
                            <span className="bg-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                              <Activity size={12} /> Tempo: {exercise.tempo}
                            </span>
                          </div>
                        </div>
                      </div>

                      {exercise.coach_note && (
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 mb-6 flex gap-3">
                          <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                          <p className="text-sm text-blue-200 leading-relaxed"><span className="font-bold text-blue-400">نصيحة المدرب:</span> {exercise.coach_note}</p>
                        </div>
                      )}

                      {/* Sets Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-zinc-400">
                          <thead className="text-xs text-zinc-500 uppercase bg-zinc-900/50 rounded-t-xl">
                            <tr>
                              <th className="px-4 py-3 rounded-tr-xl text-right">المجموعة</th>
                              <th className="px-4 py-3 text-right">النوع</th>
                              <th className="px-4 py-3 text-center">التكرارات</th>
                              <th className="px-4 py-3 text-center">%1RM</th>
                              <th className="px-4 py-3 text-center">RPE</th>
                              <th className="px-4 py-3 rounded-tl-xl text-center">الراحة</th>
                            </tr>
                          </thead>
                          <tbody>
                            {exercise.sets.map((set, setIdx) => (
                              <tr key={setIdx} className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
                                <td className="px-4 py-3 font-medium text-white text-right">{set.set_number}</td>
                                <td className="px-4 py-3 text-right">
                                  <span className={`px-2 py-1 rounded text-xs ${
                                    set.set_type.includes('تسخين') ? 'bg-orange-500/10 text-orange-400' :
                                    set.set_type.includes('أساسية') ? 'bg-purple-500/10 text-purple-400' :
                                    'bg-red-500/10 text-red-400'
                                  }`}>
                                    {set.set_type}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-center text-white">{set.reps}</td>
                                <td className="px-4 py-3 text-center">{set.weight_percentage_1rm}%</td>
                                <td className="px-4 py-3 text-center">{set.rpe}</td>
                                <td className="px-4 py-3 text-center">
                                  <div className="flex items-center justify-center gap-2">
                                    <Clock size={14} className="text-zinc-500" />
                                    {set.rest_time_seconds}ث
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <RestTimer defaultTime={exercise.sets[0]?.rest_time_seconds || 60} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Complete Workout Button */}
              <div className="pt-6 pb-8 flex justify-center">
                <button
                  onClick={() => handleCompleteWorkout(selectedProgram.program_id, activeWeek.week_number, activeDay.day_order)}
                  disabled={isCurrentDayCompleted || isCompleting}
                  className={`px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all ${
                    isCurrentDayCompleted 
                      ? 'bg-emerald-600/20 text-emerald-500 border border-emerald-500/30 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105'
                  }`}
                >
                  {isCompleting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isCurrentDayCompleted ? (
                    <>
                      <CheckCircle2 size={24} />
                      تم إنجاز تمرين اليوم بنجاح!
                    </>
                  ) : (
                    <>
                      <Dumbbell size={24} />
                      إنهاء التمرين وحفظ التقدم
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
          
          {/* Complete Rest Day Button */}
          {activeDay?.is_rest_day && !isCurrentDayCompleted && (
            <div className="pt-6 pb-8 flex justify-center">
              <button
                onClick={() => handleCompleteWorkout(selectedProgram.program_id, activeWeek.week_number, activeDay.day_order)}
                disabled={isCompleting}
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all hover:scale-105"
              >
                {isCompleting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 size={24} />
                    تأكيد إتمام يوم الراحة
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowRight size={20} />
        <span>الرجوع</span>
      </button>

      <header>
        <h1 className="text-4xl font-bold text-white mb-2">البرامج التدريبية</h1>
        <p className="text-zinc-400">اختر مساراً متخصصاً بناءً على أهدافك الحالية.</p>
      </header>

      {loadingPrograms ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 flex flex-col animate-pulse">
              <div className="h-48 bg-zinc-900 shrink-0 relative"></div>
              <div className="p-6 relative -mt-12 flex-1 flex flex-col">
                <div className="h-8 bg-zinc-800 rounded-lg w-3/4 mb-2"></div>
                <div className="h-4 bg-zinc-800 rounded w-full mb-2"></div>
                <div className="h-4 bg-zinc-800 rounded w-5/6 mb-4 flex-1"></div>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  <div className="h-8 bg-zinc-900 rounded-lg w-24 border border-zinc-800"></div>
                  <div className="h-8 bg-zinc-900 rounded-lg w-24 border border-zinc-800"></div>
                  <div className="h-8 bg-zinc-900 rounded-lg w-24 border border-zinc-800"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((prog) => (
            <div 
              key={prog.program_id} 
              onClick={() => {
                if (prog.program_id === 'prog_001' || prog.program_name.includes('القوة العضلية')) {
                  navigate('/programs/muscle-strength');
                } else if (prog.program_id === 'prog_002' || prog.program_name.includes('السرعة')) {
                  navigate('/education/training/speed');
                } else {
                  setSelectedProgram(prog);
                  setActiveWeekIndex(0);
                  setActiveDayIndex(0);
                }
              }}
              className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer flex flex-col"
            >
            <div className="h-48 overflow-hidden shrink-0 relative">
              <img 
                src={prog.image} 
                alt={prog.program_name} 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 mix-blend-luminosity group-hover:mix-blend-normal"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.15)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent h-48" />
            </div>
            <div className="p-6 relative -mt-12 flex-1 flex flex-col">
              <h2 className="text-2xl font-bold text-white mb-2">{prog.program_name}</h2>
              <p className="text-zinc-400 mb-4 flex-1">{prog.program_description}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="bg-zinc-900 text-zinc-300 text-xs px-3 py-1.5 rounded-lg border border-zinc-800 flex items-center gap-1">
                  <Target size={12} /> {prog.program_goal}
                </span>
                <span className="bg-zinc-900 text-zinc-300 text-xs px-3 py-1.5 rounded-lg border border-zinc-800 flex items-center gap-1">
                  <Calendar size={12} /> {prog.duration_value} {prog.duration_unit}
                </span>
                <span className="bg-zinc-900 text-zinc-300 text-xs px-3 py-1.5 rounded-lg border border-zinc-800 flex items-center gap-1">
                  <BarChart size={12} /> {prog.target_level}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </motion.div>
  );
}
