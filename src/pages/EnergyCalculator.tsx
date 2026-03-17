import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';

export default function EnergyCalculator() {
  const navigate = useNavigate();
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(25);
  const [height, setHeight] = useState<number>(175);
  const [weight, setWeight] = useState<number>(75);
  const [activityFactor, setActivityFactor] = useState<number>(1.375);

  // Mifflin-St Jeor Equation
  const calculateBMR = () => {
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }
    return bmr;
  };

  const bmr = calculateBMR();
  const tee = Math.round(bmr * activityFactor);
  const weightLoss = tee - 500;
  const weightGain = tee + 500;

  return (
    <div className="flex flex-col min-h-screen pb-12">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center p-4 justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <h2 className="text-xl font-bold tracking-tight">حساب الطاقة</h2>
          </div>
          <div className="size-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">bolt</span>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto w-full">
        {/* Hero Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="p-4">
            <div 
              className="relative w-full h-48 rounded-xl overflow-hidden bg-primary/20 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD2XVeSCAJ9GDVkDjxWNedxO8RSHXlW7URuXEtGnbQhDF-kbJ738nrJzk5nDVyYCzY6SULCQ6cRVYxXe7DfMMVNnonL6C-Gm2c8otIOXf7Eam4F9EOcHd21XQZ-Ji--sX294E0tcOT90MHa03GyFCT67B1dWUjR10FsZMVpffmdETMZ3xvgph-JCwSRA-rOR63YaMXcuSqNw0GrJ02fKpkfOdtYyFTcQUVZKSX2YxWM417l0hroc88jTnQrS1wHBeBeND91qh6hdINQ')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
            </div>
            <div className="mt-6 text-center px-2">
              <h3 className="text-2xl font-bold mb-3">أهمية حساب الطاقة للرياضيين</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                يعد حساب احتياجاتك من الطاقة أمراً بالغ الأهمية لتحسين الأداء الرياضي وضمان حصول جسمك على الوقود الكافي للتعافي والنمو وتحقيق أهدافك البدنية بدقة.
              </p>
            </div>
          </div>
        </FadeContent>

        {/* BMR Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="p-4 mt-4">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">calculate</span>
              <h2 className="text-xl font-bold">معدل الأيض الأساسي (BMR)</h2>
            </div>
            <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 space-y-6">
              {/* Gender Selection */}
              <div className="flex gap-4">
                <button 
                  onClick={() => setGender('male')}
                  className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors ${gender === 'male' ? 'bg-primary text-white' : 'bg-background-light dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-primary/10'}`}
                >
                  <span className="material-symbols-outlined">male</span>
                  ذكر
                </button>
                <button 
                  onClick={() => setGender('female')}
                  className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors ${gender === 'female' ? 'bg-primary text-white' : 'bg-background-light dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-primary/10'}`}
                >
                  <span className="material-symbols-outlined">female</span>
                  أنثى
                </button>
              </div>

              {/* Inputs Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">العمر (سنة)</label>
                  <input 
                    type="number" 
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-background-light dark:bg-slate-900 border-primary/20 rounded-lg p-3 focus:ring-primary focus:border-primary text-center font-bold" 
                    placeholder="25" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">الطول (سم)</label>
                  <input 
                    type="number" 
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full bg-background-light dark:bg-slate-900 border-primary/20 rounded-lg p-3 focus:ring-primary focus:border-primary text-center font-bold" 
                    placeholder="175" 
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">الوزن (كجم)</label>
                  <span className="text-primary font-bold">{weight} كجم</span>
                </div>
                <input 
                  type="range" 
                  min="40"
                  max="150"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary" 
                />
              </div>
            </div>
          </section>
        </FadeContent>

        {/* TEE Explanation */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="p-4 mt-4">
            <div className="bg-gradient-to-br from-primary to-purple-800 rounded-xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined">energy_savings_leaf</span>
                <h3 className="text-lg font-bold">إجمالي إنفاق الطاقة (TEE)</h3>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                يتم حساب احتياجك اليومي الفعلي بضرب معدل الأيض الأساسي (BMR) في معامل النشاط البدني (PAL).
              </p>
              <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-center font-mono text-sm">
                <span>TEE = BMR × Activity Factor</span>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Activity Factors */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="p-4 mt-4">
            <h3 className="text-lg font-bold mb-4 px-1">معامل النشاط البدني</h3>
            <div className="space-y-3">
              {/* Activity Card 1 */}
              <div 
                onClick={() => setActivityFactor(1.2)}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer group ${activityFactor === 1.2 ? 'bg-primary/10 border-primary' : 'bg-background-light dark:bg-slate-900 border-primary/5 hover:border-primary/30'}`}
              >
                <div className={`size-12 rounded-full flex items-center justify-center transition-colors ${activityFactor === 1.2 ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 group-hover:bg-primary/20 group-hover:text-primary'}`}>
                  <span className="material-symbols-outlined">chair</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm">خامل</h4>
                  <p className={`text-xs ${activityFactor === 1.2 ? 'text-primary/80' : 'text-slate-500'}`}>عمل مكتبي بدون تمارين (1.2)</p>
                </div>
                <div className={`size-5 rounded-full border-2 flex items-center justify-center ${activityFactor === 1.2 ? 'border-primary' : 'border-primary/30'}`}>
                  <div className={`size-2 rounded-full ${activityFactor === 1.2 ? 'bg-primary' : 'bg-transparent'}`}></div>
                </div>
              </div>

              {/* Activity Card 2 */}
              <div 
                onClick={() => setActivityFactor(1.375)}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer group ${activityFactor === 1.375 ? 'bg-primary/10 border-primary' : 'bg-background-light dark:bg-slate-900 border-primary/5 hover:border-primary/30'}`}
              >
                <div className={`size-12 rounded-full flex items-center justify-center transition-colors ${activityFactor === 1.375 ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 group-hover:bg-primary/20 group-hover:text-primary'}`}>
                  <span className="material-symbols-outlined">directions_walk</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm">نشاط خفيف</h4>
                  <p className={`text-xs ${activityFactor === 1.375 ? 'text-primary/80' : 'text-slate-500'}`}>تمارين خفيفة 1-3 أيام (1.375)</p>
                </div>
                <div className={`size-5 rounded-full border-2 flex items-center justify-center ${activityFactor === 1.375 ? 'border-primary' : 'border-primary/30'}`}>
                  <div className={`size-2 rounded-full ${activityFactor === 1.375 ? 'bg-primary' : 'bg-transparent'}`}></div>
                </div>
              </div>

              {/* Activity Card 3 */}
              <div 
                onClick={() => setActivityFactor(1.725)}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer group ${activityFactor === 1.725 ? 'bg-primary/10 border-primary' : 'bg-background-light dark:bg-slate-900 border-primary/5 hover:border-primary/30'}`}
              >
                <div className={`size-12 rounded-full flex items-center justify-center transition-colors ${activityFactor === 1.725 ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 group-hover:bg-primary/20 group-hover:text-primary'}`}>
                  <span className="material-symbols-outlined">fitness_center</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm">نشط جداً</h4>
                  <p className={`text-xs ${activityFactor === 1.725 ? 'text-primary/80' : 'text-slate-500'}`}>تمارين شاقة 6-7 أيام (1.725)</p>
                </div>
                <div className={`size-5 rounded-full border-2 flex items-center justify-center ${activityFactor === 1.725 ? 'border-primary' : 'border-primary/30'}`}>
                  <div className={`size-2 rounded-full ${activityFactor === 1.725 ? 'bg-primary' : 'bg-transparent'}`}></div>
                </div>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Results Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="p-4 mt-6">
            <div className="bg-background-light dark:bg-slate-900 rounded-2xl p-6 border-2 border-primary/20 shadow-xl shadow-primary/5">
              <h3 className="text-xl font-bold text-center mb-8">النتائج المتوقعة</h3>
              <div className="grid grid-cols-1 gap-6">
                {/* Maintenance */}
                <div className="flex flex-col items-center p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <span className="text-slate-500 text-xs font-medium mb-1">للمحافظة على الوزن</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-primary">{tee.toLocaleString()}</span>
                    <span className="text-xs font-bold text-primary/60">سعرة</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Weight Loss */}
                  <div className="flex flex-col items-center p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <span className="text-slate-500 text-[10px] font-medium mb-1">خسارة الوزن</span>
                    <div className="flex items-baseline gap-1 text-red-500">
                      <span className="text-xl font-bold">{weightLoss.toLocaleString()}</span>
                      <span className="text-[10px]">سعرة</span>
                    </div>
                  </div>

                  {/* Weight Gain */}
                  <div className="flex flex-col items-center p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <span className="text-slate-500 text-[10px] font-medium mb-1">زيادة الوزن</span>
                    <div className="flex items-baseline gap-1 text-green-500">
                      <span className="text-xl font-bold">{weightGain.toLocaleString()}</span>
                      <span className="text-[10px]">سعرة</span>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full mt-8 bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 active:scale-95 transition-transform flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">save</span>
                حفظ ومتابعة الأهداف
              </button>
            </div>
          </section>
        </FadeContent>

        {/* Tips Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 mt-8">
            <div className="flex items-center gap-2 text-primary/60 mb-4">
              <span className="material-symbols-outlined text-sm">info</span>
              <p className="text-xs">تعتمد هذه الحسابات على معادلة ميفلين سانت جوير الحديثة.</p>
            </div>
          </div>
        </FadeContent>
      </main>
    </div>
  );
}
