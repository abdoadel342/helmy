import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Flame, Dumbbell, Repeat, Layers, HeartPulse, ChevronRight, ChevronLeft, Zap, Target, Timer, Camera } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar, Cell, ReferenceLine } from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import LivePoseDetection from '../components/LivePoseDetection';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type WorkoutMode = 'deadlift' | 'bicep-curl' | 'chest-fly' | 'battle-ropes';

interface WorkoutData {
  id: WorkoutMode;
  name: string;
  category: string;
  bgImage: string;
  heartRate: number;
  calories: number;
  weight?: number;
  reps?: number;
  sets?: number;
  intensity?: number;
  maxHeartRate?: number;
  musclesEngaged?: string[];
  themeColor: string;
}

const WORKOUTS: WorkoutData[] = [
  {
    id: 'deadlift',
    name: 'الرفعة المميتة',
    category: 'تدريب الأثقال',
    bgImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
    heartRate: 97,
    calories: 251,
    weight: 52,
    intensity: 85,
    themeColor: 'text-orange-500',
  },
  {
    id: 'bicep-curl',
    name: 'تمرين العضلة ذات الرأسين',
    category: 'تدريب الأثقال',
    bgImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
    heartRate: 98,
    calories: 120,
    weight: 45,
    reps: 12,
    sets: 4,
    musclesEngaged: ['العضلة ذات الرأسين', 'الساعدين'],
    themeColor: 'text-green-500',
  },
  {
    id: 'chest-fly',
    name: 'تفتيح الصدر',
    category: 'تدريب الأثقال',
    bgImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop',
    heartRate: 124,
    calories: 180,
    reps: 15,
    maxHeartRate: 75,
    themeColor: 'text-cyan-500',
  },
  {
    id: 'battle-ropes',
    name: 'حبال المعركة',
    category: 'تمارين القلب / الحبال',
    bgImage: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop',
    heartRate: 124,
    calories: 87,
    intensity: 90,
    themeColor: 'text-orange-500',
  }
];

// Mock data for graphs
const ecgData = Array.from({ length: 50 }, (_, i) => ({
  value: Math.sin(i * 0.5) * 50 + 50 + Math.random() * 20
}));

const rangeOfMotionData = Array.from({ length: 30 }, (_, i) => ({
  value: Math.sin(i * 0.2) * 100
}));

const intensityBarData = [
  { value: 20 }, { value: 40 }, { value: 60 }, { value: 80 }, { value: 100 },
  { value: 80 }, { value: 60 }, { value: 40 }, { value: 20 }
];

export default function Telemetry() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const workout = WORKOUTS[currentIndex];

  const nextWorkout = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % WORKOUTS.length);
  };
  const prevWorkout = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + WORKOUTS.length) % WORKOUTS.length);
  };

  // Simulate real-time data updates
  const [currentHR, setCurrentHR] = useState(workout.heartRate);
  const [hrHistory, setHrHistory] = useState<{time: number, value: number}[]>(
    Array.from({ length: 20 }, (_, i) => ({ time: i, value: workout.heartRate }))
  );

  const [iconPrefs, setIconPrefs] = useState<Record<string, string>>({
    calories: 'flame',
    weight: 'dumbbell',
    reps: 'repeat',
    sets: 'layers'
  });

  const toggleIcon = (stat: string) => {
    setIconPrefs(prev => {
      const current = prev[stat];
      let next = current;
      if (stat === 'calories') next = current === 'flame' ? 'zap' : 'flame';
      if (stat === 'weight') next = current === 'dumbbell' ? 'target' : 'dumbbell';
      if (stat === 'reps') next = current === 'repeat' ? 'activity' : 'repeat';
      if (stat === 'sets') next = current === 'layers' ? 'timer' : 'layers';
      return { ...prev, [stat]: next };
    });
  };

  const getIcon = (stat: string) => {
    const pref = iconPrefs[stat];
    if (pref === 'flame') return <Flame />;
    if (pref === 'zap') return <Zap />;
    if (pref === 'dumbbell') return <Dumbbell />;
    if (pref === 'target') return <Target />;
    if (pref === 'repeat') return <Repeat />;
    if (pref === 'activity') return <Activity />;
    if (pref === 'layers') return <Layers />;
    if (pref === 'timer') return <Timer />;
    return <Activity />;
  };

  useEffect(() => {
    setCurrentHR(workout.heartRate);
    setHrHistory(Array.from({ length: 20 }, (_, i) => ({ time: i, value: workout.heartRate })));
    
    const interval = setInterval(() => {
      setCurrentHR(prev => {
        const nextHR = prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3);
        setHrHistory(history => {
          const newHistory = [...history.slice(1), { time: Date.now(), value: nextHR }];
          return newHistory;
        });
        return nextHR;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [workout.heartRate]);

  const contentVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full h-[80vh] rounded-3xl overflow-hidden bg-black text-white font-sans border border-purple-900/30 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 flex flex-col"
    >
      {/* Header Controls */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        <button 
          onClick={() => setIsLiveMode(false)} 
          className={cn("px-4 py-1.5 rounded-full text-sm font-medium transition-colors", !isLiveMode ? "bg-purple-500 text-white" : "text-zinc-400 hover:text-white")}
        >
          محاكاة البيانات
        </button>
        <button 
          onClick={() => setIsLiveMode(true)} 
          className={cn("px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2", isLiveMode ? "bg-purple-500 text-white" : "text-zinc-400 hover:text-white")}
        >
          <Camera className="w-4 h-4" />
          كاميرا حية (AR)
        </button>
      </div>

      {isLiveMode ? (
        <div className="w-full h-full flex items-center justify-center p-8 pt-24">
          <LivePoseDetection />
        </div>
      ) : (
        <>
          {/* Background Image with Overlay */}
          <AnimatePresence mode="wait">
        <motion.div
          key={workout.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={workout.bgImage}
            alt={workout.name}
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-60" />
        </motion.div>
      </AnimatePresence>

      {/* HUD Scanning Line */}
      <motion.div 
        animate={{ y: ['0%', '100%', '0%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-transparent via-white/5 to-transparent z-0 pointer-events-none"
      />

      {/* HUD Corners */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/20 z-10" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-white/20 z-10" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-white/20 z-10" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/20 z-10" />

      {/* Navigation Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
        <button onClick={prevWorkout} className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors border border-white/10">
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="flex gap-2 flex-row-reverse">
          {WORKOUTS.map((w, i) => (
            <div key={w.id} className={cn("w-1.5 h-1.5 rounded-full transition-all duration-300", i === currentIndex ? "bg-white w-4" : "bg-white/30")} />
          ))}
        </div>
        <button onClick={nextWorkout} className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors border border-white/10">
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* HUD Overlay */}
      <div className="relative z-10 w-full h-full p-6 md:p-8 pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={workout.id}
            custom={direction}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full h-full flex flex-col justify-between"
          >
            {/* Top Section */}
            <header className="flex justify-between items-start">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <div className={cn("w-2 h-2 rounded-full animate-pulse", workout.themeColor.replace('text-', 'bg-'))} />
                  <span className="text-xs font-mono tracking-widest uppercase text-white/60">القياس عن بعد المباشر AR</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase">
                  {workout.name}
                </h1>
                <p className="text-sm text-white/60 uppercase tracking-widest mt-1 font-mono">
                  {workout.category}
                </p>
              </div>

              {/* Top Right - Heart Rate */}
              <div className="flex flex-col items-start w-48">
                <div className="flex items-center gap-2 text-white/60 mb-1">
                  <HeartPulse className={cn("w-4 h-4", workout.themeColor)} />
                  <span className="text-xs font-mono uppercase tracking-widest">معدل ضربات القلب</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={cn("text-5xl md:text-7xl font-bold tracking-tighter font-mono leading-none", workout.themeColor)}>
                    {currentHR}
                  </span>
                  <span className="text-lg font-mono text-white/60">BPM</span>
                </div>
                
                {/* Heart Rate Area Chart */}
                <div className="w-full h-16 mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={hrHistory}>
                      <defs>
                        <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={workout.themeColor.includes('orange') ? '#f97316' : workout.themeColor.includes('green') ? '#22c55e' : '#06b6d4'} stopOpacity={0.4}/>
                          <stop offset="95%" stopColor={workout.themeColor.includes('orange') ? '#f97316' : workout.themeColor.includes('green') ? '#22c55e' : '#06b6d4'} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke={workout.themeColor.includes('orange') ? '#f97316' : workout.themeColor.includes('green') ? '#22c55e' : '#06b6d4'} 
                        strokeWidth={2} 
                        fillOpacity={1} 
                        fill="url(#colorHr)" 
                        isAnimationActive={false} 
                      />
                      <ReferenceLine y={workout.heartRate + 10} stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
                      <ReferenceLine y={workout.heartRate - 10} stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </header>

            {/* Middle/Bottom Section - Dynamic Widgets based on workout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pb-12">
              
              {/* Left Column - Stats */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  {workout.calories && (
                    <StatBox icon={getIcon('calories')} label="السعرات الحرارية" value={workout.calories} unit="KCAL" color={workout.themeColor} onClickIcon={() => toggleIcon('calories')} />
                  )}
                  {workout.weight && (
                    <StatBox icon={getIcon('weight')} label="المقاومة" value={workout.weight} unit="KG" color={workout.themeColor} onClickIcon={() => toggleIcon('weight')} />
                  )}
                  <div className="flex gap-3">
                    {workout.reps && (
                      <StatBox icon={getIcon('reps')} label="التكرارات" value={workout.reps} color={workout.themeColor} className="flex-1" onClickIcon={() => toggleIcon('reps')} />
                    )}
                    {workout.sets && (
                      <StatBox icon={getIcon('sets')} label="المجموعات" value={workout.sets} color={workout.themeColor} className="flex-1" onClickIcon={() => toggleIcon('sets')} />
                    )}
                  </div>
                </div>
              </div>

              {/* Center Column - Graphs/Visuals */}
              <div className="flex flex-col items-center justify-end h-32">
                <div className="w-full h-full flex flex-col items-center justify-end">
                  {workout.id === 'bicep-curl' && (
                    <div className="w-full h-24">
                      <p className="text-[10px] font-mono text-white/50 text-center mb-1 uppercase tracking-widest">مراقب تخطيط القلب</p>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={ecgData}>
                          <defs>
                            <linearGradient id="colorEcg" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorEcg)" isAnimationActive={false} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {workout.id === 'chest-fly' && (
                    <div className="w-full h-24">
                      <p className="text-[10px] font-mono text-white/50 text-center mb-1 uppercase tracking-widest">نطاق الحركة</p>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={rangeOfMotionData}>
                          <defs>
                            <linearGradient id="colorRom" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorRom)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {workout.id === 'battle-ropes' && (
                    <div className="w-full h-24">
                      <p className="text-[10px] font-mono text-white/50 text-center mb-1 uppercase tracking-widest">مخرجات الشدة</p>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={intensityBarData}>
                          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {intensityBarData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#f97316' : '#ea580c'} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Extra Info */}
              <div className="flex flex-col items-start gap-4">
                <div className="flex flex-col items-start gap-3">
                  {workout.maxHeartRate && (
                    <div className="flex flex-col items-start">
                      <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest mb-1">الحد الأقصى لمعدل ضربات القلب</span>
                      <div className="relative w-20 h-20 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray={`${workout.maxHeartRate * 2.82} 282`} className={workout.themeColor} />
                        </svg>
                        <span className="absolute text-xl font-bold font-mono">{workout.maxHeartRate}%</span>
                      </div>
                    </div>
                  )}

                  {workout.musclesEngaged && (
                    <div className="flex flex-col items-start bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                      <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest mb-2">العضلات المشاركة</span>
                      <div className="flex flex-wrap justify-start gap-1.5">
                        {workout.musclesEngaged.map(m => (
                          <span key={m} className={cn("px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/10 border border-white/20", workout.themeColor)}>
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {workout.intensity && (
                    <div className="flex flex-col items-start">
                      <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest mb-1.5">الشدة</span>
                      <div className="flex gap-1 flex-row-reverse">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div 
                            key={i} 
                            className={cn(
                              "w-1.5 h-6 rounded-sm transition-colors",
                              i < (workout.intensity! / 10) ? workout.themeColor.replace('text-', 'bg-') : "bg-white/10"
                            )} 
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      </>
      )}
    </motion.div>
  );
}

function StatBox({ icon, label, value, unit, color, className, onClickIcon }: { icon: React.ReactNode, label: string, value: string | number, unit?: string, color: string, className?: string, onClickIcon?: () => void }) {
  return (
    <div className={cn("flex items-center gap-3 bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10 hover:bg-white/10 hover:scale-105 hover:shadow-lg hover:shadow-white/10 transition-all duration-300", className)}>
      <div 
        className={cn("p-2 rounded-xl bg-white/5 cursor-pointer hover:bg-white/20 transition-colors", color)}
        onClick={onClickIcon}
        title="انقر لتغيير الأيقونة"
      >
        {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">{label}</span>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold font-mono">{value}</span>
          {unit && <span className="text-xs font-mono text-white/50">{unit}</span>}
        </div>
      </div>
    </div>
  );
}
