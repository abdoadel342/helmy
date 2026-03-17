import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../AuthContext';
import { handleFirestoreError, OperationType } from '../errorHandling';
import { Save, Calculator, Target, TrendingUp, Activity, Flame, Utensils } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface UserProfile {
  uid: string;
  personal_info: {
    user_age: number;
    user_weight: number;
    user_height: number;
    user_gender: 'male' | 'female';
    activity_multiplier: number;
    training_goal: 'bulking' | 'cutting' | 'maintenance';
  };
  calculated_nutrition: {
    calculated_bmr: number;
    calculated_tdee: number;
    target_calories: number;
    macros: {
      protein_grams: number;
      fat_grams: number;
      carb_grams: number;
    };
  };
  weightHistory: { date: string; weight: number }[];
}

const activityLevels = [
  { id: 1.2, label: 'خامل (مكتب، قليل الحركة)' },
  { id: 1.375, label: 'نشاط خفيف (تمرين 1-3 أيام/أسبوع)' },
  { id: 1.55, label: 'نشاط معتدل (تمرين 3-5 أيام/أسبوع)' },
  { id: 1.725, label: 'نشط جداً (تمرين شاق 6-7 أيام)' },
  { id: 1.9, label: 'نشاط مفرط (وظيفة بدنية شاقة)' }
];

const goals = [
  { id: 'maintenance', label: 'محافظة على الوزن' },
  { id: 'bulking', label: 'تضخيم (زيادة عضلية)' },
  { id: 'cutting', label: 'تنشيف (خسارة دهون)' }
];

const defaultProfile: Partial<UserProfile> = {
  personal_info: {
    user_age: 25,
    user_weight: 75,
    user_height: 175,
    user_gender: 'male',
    activity_multiplier: 1.55,
    training_goal: 'maintenance'
  },
  calculated_nutrition: {
    calculated_bmr: 0,
    calculated_tdee: 0,
    target_calories: 0,
    macros: {
      protein_grams: 0,
      fat_grams: 0,
      carb_grams: 0
    }
  },
  weightHistory: []
};

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Partial<UserProfile>>(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as UserProfile;
          // Merge with default to ensure all nested objects exist
          setProfile({
            ...defaultProfile,
            ...data,
            personal_info: { ...defaultProfile.personal_info, ...data.personal_info },
            calculated_nutrition: { ...defaultProfile.calculated_nutrition, ...data.calculated_nutrition }
          });
        } else {
          setProfile({ ...defaultProfile, uid: user.uid });
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const calculateNutrition = () => {
    const info = profile.personal_info;
    if (!info || !info.user_weight || !info.user_height || !info.user_age) {
      alert("الرجاء إدخال العمر، الوزن، والطول بشكل صحيح.");
      return;
    }

    // 1. Calculate BMR (Mifflin-St Jeor Equation)
    let bmr = (10 * info.user_weight) + (6.25 * info.user_height) - (5 * info.user_age);
    if (info.user_gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }
    bmr = Math.round(bmr);

    // 2. Calculate TDEE
    const tdee = Math.round(bmr * info.activity_multiplier);

    // 3. Calculate Target Calories
    let target = tdee;
    if (info.training_goal === 'bulking') target += 500;
    if (info.training_goal === 'cutting') target -= 500;

    // 4. Calculate Macros
    const protein = Math.round(info.user_weight * 2.2);
    const fat = Math.round((target * 0.25) / 9);
    const carb = Math.max(0, Math.round((target - (protein * 4) - (fat * 9)) / 4));

    setProfile(prev => ({
      ...prev,
      calculated_nutrition: {
        calculated_bmr: bmr,
        calculated_tdee: tdee,
        target_calories: target,
        macros: {
          protein_grams: protein,
          fat_grams: fat,
          carb_grams: carb
        }
      }
    }));
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      // Update weight history
      let updatedHistory = profile.weightHistory ? [...profile.weightHistory] : [];
      const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
      const currentWeight = profile.personal_info?.user_weight;
      
      if (currentWeight) {
        if (updatedHistory.length === 0 || updatedHistory[updatedHistory.length - 1].weight !== currentWeight) {
          const lastEntry = updatedHistory[updatedHistory.length - 1];
          if (lastEntry && lastEntry.date === today) {
            updatedHistory[updatedHistory.length - 1].weight = currentWeight;
          } else {
            updatedHistory.push({ date: today, weight: currentWeight });
          }
        }
      }

      const updatedProfile = { ...profile, uid: user.uid, weightHistory: updatedHistory };
      await setDoc(doc(db, 'users', user.uid), updatedProfile);
      setProfile(updatedProfile);
      alert('تم حفظ الملف الشخصي بنجاح!');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    } finally {
      setSaving(false);
    }
  };

  const updatePersonalInfo = (field: keyof UserProfile['personal_info'], value: any) => {
    setProfile(prev => ({
      ...prev,
      personal_info: {
        ...prev.personal_info!,
        [field]: value
      }
    }));
  };

  const nutrition = profile.calculated_nutrition;
  const info = profile.personal_info;

  const macroData = [
    { name: 'بروتين', value: nutrition?.macros.protein_grams || 0, color: '#a855f7' }, // purple-500
    { name: 'كاربوهيدرات', value: nutrition?.macros.carb_grams || 0, color: '#3b82f6' }, // blue-500
    { name: 'دهون', value: nutrition?.macros.fat_grams || 0, color: '#eab308' }, // yellow-500
  ];

  const displayHistory = profile.weightHistory?.length 
    ? profile.weightHistory 
    : info?.user_weight ? [{ date: 'الآن', weight: info.user_weight }] : [];

  if (loading) return (
    <div className="space-y-8 pb-12 animate-pulse">
      <header>
        <div className="h-10 bg-zinc-900 rounded-lg w-48 mb-2"></div>
        <div className="h-4 bg-zinc-900 rounded w-64"></div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6 bg-zinc-950 p-8 rounded-3xl border border-zinc-800">
          <div className="h-8 bg-zinc-900 rounded w-48 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="space-y-3">
                <div className="h-4 bg-zinc-900 rounded w-28"></div>
                <div className="h-14 bg-zinc-900 rounded-2xl w-full"></div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-10">
            <div className="h-14 bg-zinc-900 rounded-2xl flex-1"></div>
            <div className="h-14 bg-zinc-900 rounded-2xl flex-1"></div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-zinc-950 p-8 rounded-3xl border border-zinc-800">
            <div className="h-6 bg-zinc-900 rounded w-32 mb-8 mx-auto"></div>
            <div className="h-56 w-56 bg-zinc-900 rounded-full mx-auto mb-8 border-8 border-zinc-800/50"></div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex justify-between items-center bg-zinc-900/30 p-3 rounded-xl">
                  <div className="h-4 bg-zinc-900 rounded w-20"></div>
                  <div className="h-4 bg-zinc-900 rounded w-16"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">ملفك الشخصي</h1>
          <p className="text-zinc-400 text-lg font-medium">أدخل بياناتك لحساب احتياجاتك بدقة علمية متطورة.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* User Inputs Section */}
        <div className="lg:col-span-8 space-y-8 bg-zinc-950 p-8 md:p-10 rounded-[2.5rem] border border-purple-900/30 shadow-2xl shadow-purple-900/5 transition-all hover:border-purple-500/30">
          <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
            <Activity className="w-8 h-8 text-purple-500 bg-purple-500/10 p-1.5 rounded-xl" /> 
            البيانات الأساسية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">العمر</label>
              <input 
                type="number" 
                value={info?.user_age || ''} 
                onChange={e => updatePersonalInfo('user_age', Number(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="25"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">النوع</label>
              <select 
                value={info?.user_gender || 'male'} 
                onChange={e => updatePersonalInfo('user_gender', e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option value="male">ذكر</option>
                <option value="female">أنثى</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">الطول (سم)</label>
              <input 
                type="number" 
                value={info?.user_height || ''} 
                onChange={e => updatePersonalInfo('user_height', Number(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="175"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">الوزن الحالي (كجم)</label>
              <input 
                type="number" 
                value={info?.user_weight || ''} 
                onChange={e => updatePersonalInfo('user_weight', Number(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="75"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">معدل النشاط اليومي</label>
              <select 
                value={info?.activity_multiplier || 1.55} 
                onChange={e => updatePersonalInfo('activity_multiplier', Number(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                {activityLevels.map(level => (
                  <option key={level.id} value={level.id}>{level.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">الهدف التدريبي</label>
              <select 
                value={info?.training_goal || 'maintenance'} 
                onChange={e => updatePersonalInfo('training_goal', e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                {goals.map(goal => (
                  <option key={goal.id} value={goal.id}>{goal.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="pt-4 flex gap-4">
            <button 
              onClick={calculateNutrition}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              حساب الاحتياجات
            </button>
            <button 
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {saving ? 'جاري الحفظ...' : 'حفظ البيانات'}
            </button>
          </div>
        </div>

        {/* Calculated Outputs Section */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-gradient-to-br from-purple-900 to-black p-6 rounded-3xl border border-purple-500/30 text-center relative overflow-hidden">
            <Flame className="absolute -right-4 -bottom-4 w-24 h-24 text-purple-500/10" />
            <h3 className="text-purple-300 font-medium uppercase tracking-widest text-sm mb-2 relative z-10">معدل الأيض الأساسي (BMR)</h3>
            <div className="text-4xl font-bold text-white mb-1 relative z-10">
              {nutrition?.calculated_bmr ? nutrition.calculated_bmr : '---'}
            </div>
            <p className="text-purple-400/60 text-xs relative z-10">سعرة حرارية / يوم</p>
          </div>
          
          <div className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-3xl border border-zinc-800 text-center relative overflow-hidden">
            <Activity className="absolute -left-4 -bottom-4 w-24 h-24 text-zinc-500/10" />
            <h3 className="text-zinc-400 font-medium uppercase tracking-widest text-sm mb-2 relative z-10">إجمالي استهلاك الطاقة (TDEE)</h3>
            <div className="text-4xl font-bold text-purple-500 mb-1 relative z-10">
              {nutrition?.calculated_tdee ? nutrition.calculated_tdee : '---'}
            </div>
            <p className="text-zinc-500 text-xs relative z-10">سعرة حرارية / يوم</p>
          </div>

          {nutrition?.target_calories > 0 && (
            <div className="bg-zinc-950 p-6 rounded-3xl border border-zinc-800">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-purple-500" />
                <h3 className="text-white font-medium">الهدف: {goals.find(g => g.id === info?.training_goal)?.label}</h3>
              </div>
              <div className="text-center mb-6 bg-zinc-900/50 py-4 rounded-2xl border border-zinc-800/50">
                <div className="text-4xl font-black text-white mb-1">{nutrition.target_calories}</div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest">السعرات المستهدفة</p>
              </div>

              <div className="flex items-center justify-center h-48 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={macroData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {macroData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff' }}
                      formatter={(value: number) => [`${value}g`, '']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                {macroData.map((macro) => (
                  <div key={macro.name} className="flex flex-col items-center bg-zinc-900/30 p-2 rounded-xl border border-zinc-800/30">
                    <div className="w-3 h-3 rounded-full mb-2" style={{ backgroundColor: macro.color }} />
                    <span className="text-xl font-bold text-white">{macro.value}</span>
                    <span className="text-xs text-zinc-500 mt-1">{macro.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Weight History Chart */}
      {displayHistory.length > 0 && (
        <div className="bg-zinc-950 p-8 rounded-3xl border border-zinc-800 mt-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-bold text-white">تطور الوزن</h2>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={displayHistory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#71717a" 
                  tick={{ fill: '#71717a', fontSize: 12 }} 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#71717a" 
                  tick={{ fill: '#71717a', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  domain={['dataMin - 2', 'dataMax + 2']}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                  labelStyle={{ color: '#a1a1aa', marginBottom: '4px' }}
                  itemStyle={{ color: '#a855f7', fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  name="الوزن (كجم)"
                  stroke="#a855f7" 
                  strokeWidth={3}
                  dot={{ fill: '#a855f7', strokeWidth: 2, r: 4, stroke: '#18181b' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </motion.div>
  );
}
