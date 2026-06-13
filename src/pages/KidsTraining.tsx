import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ai } from '../genai';
import { BackButton } from '../components/BackButton';
import { FadeContent } from '../components/react-bits/FadeContent';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { ShinyText } from '../components/react-bits/ShinyText';
import { StarBorder } from '../components/react-bits/StarBorder';
import GradientText from '../components/react-bits/GradientText';

type Tab = 'profile' | 'schedule' | 'games' | 'brain' | 'chat';

interface ChildProfile {
  name: string;
  age: number;
  height: number;
  weight: number;
  gender: 'boy' | 'girl';
  sport: string;
  sessionDuration: number;
  childrenCount: number;
  trainingDays: number;
  fitnessLevel: string;
}

const sports = [
  { id: 'football', name: 'كرة القدم', icon: 'sports_soccer' },
  { id: 'basketball', name: 'كرة السلة', icon: 'sports_basketball' },
  { id: 'swimming', name: 'السباحة', icon: 'pool' },
  { id: 'athletics', name: 'ألعاب القوى', icon: 'directions_run' },
  { id: 'gymnastics', name: 'الجمباز', icon: 'sports_gymnastics' },
  { id: 'tennis', name: 'التنس', icon: 'sports_tennis' },
  { id: 'martial', name: 'فنون قتالية', icon: 'sports_martial_arts' },
  { id: 'general', name: 'لياقة عامة', icon: 'fitness_center' },
];

const physicalGames = [
  // ألعاب حركية وترفيهية
  { id: 'p1', name: 'سباق الحواجز المنزلي', desc: 'استخدام الوسائد والكراسي لعمل مسار عقبات وتجاوزه بأسرع وقت لزيادة الرشاقة.', icon: 'directions_run' },
  { id: 'p2', name: 'تجميد الحركة', desc: 'الركض والرقص، وعند توقف الموسيقى يجب الثبات في نفس الوضعية للتحكم العصبي العضلي.', icon: 'accessibility_new' },
  { id: 'p3', name: 'قفز الحبل والتوازن', desc: 'تمارين قفز الحبل تليها وقفة التوازن على قدم واحدة لمدة 30 ثانية لتحسين التوافق.', icon: 'fitness_center' },
  { id: 'p4', name: 'صيد الكرة (رد الفعل)', desc: 'رمي الكرة للطفل باتجاهات مختلفة وعليه التقاطها بسرعة لزيادة سرعة البديهة.', icon: 'sports_baseball' },
  { id: 'p5', name: 'مشية الحيوانات', desc: 'التحرك مثل الدب أو السلطعون لتقوية عضلات الجذع واليدين بطريقة مرحة.', icon: 'pets' },
  { id: 'p6', name: 'شد الحبل المصغر', desc: 'لعبة شد الحبل باستخدام منشفة لتقوية عضلات السحب والظهر.', icon: 'fitness_center' },
  { id: 'p7', name: 'صائد الظل', desc: 'لعبة ملاحقة الظل في الحديقة المشمسة لتطوير الرشاقة والسرعة وتغيير الاتجاه.', icon: 'run_circle' },
  { id: 'p8', name: 'لعبة القفز في المربعات', desc: 'رسم مربعات على الأرض والقفز داخلها بتسلسل معين لتقوية الكاحل والقدمين.', icon: 'grid_on' },
  { id: 'p9', name: 'التسلق الآمن', desc: 'استخدام معدات التسلق المخصصة للأطفال في الحدائق لتقوية عضلات الجسم كاملة.', icon: 'terrain' },
  
  // تدريبات بدنية مقننة للأطفال
  { id: 'e1', name: 'تمارين الإطالة الحركية', desc: 'دوران الذراعين، ولف الجذع، ورفع الركبتين عالياً كإحماء أساسي لتجنب الإصابات.', icon: 'accessibility' },
  { id: 'e2', name: 'القرفصاء بوزن الجسم (Squat)', desc: 'النزول بوضعية الجلوس والنهوض (10 تكرارات) لتقوية عضلات الفخذين والمؤخرة.', icon: 'airline_seat_legroom_extra' },
  { id: 'e3', name: 'تمرين البلانك (Plank)', desc: 'الثبات على الساعدين وأصابع القدمين لمدة 15-30 ثانية لتقوية الجذع (Core).', icon: 'horizontal_rule' },
  { id: 'e4', name: 'الضغط على الركبتين (Knee Push-ups)', desc: 'تمرين ضغط مبسط بدعم الركبتين على الأرض لتقوية الصدر والذراعين.', icon: 'fitness_center' },
  { id: 'e5', name: 'الجري السريع في المكان', desc: 'الجري في نفس المكان بأقصى سرعة لمدة 20 ثانية كتدريب قلبي تنفسي ممتاز.', icon: 'directions_run' },
  { id: 'e6', name: 'القفز النجمي (Jumping Jacks)', desc: 'القفز مع فتح وضم اليدين والقدمين (15 تكرار) لرفع نبضات القلب واللياقة العامة.', icon: 'sports_gymnastics' },
];

const brainGames = [
  { id: 'b1', name: 'لعبة الذاكرة (الورق)', desc: 'قلب البطاقات وتذكر أماكن الصور المتطابقة لتقوية الذاكرة البصرية قصيرة المدى.', icon: 'psychology' },
  { id: 'b2', name: 'الشطرنج المبسط', desc: 'تعلم أساسيات الشطرنج والتفكير الاستراتيجي وخطوات القطع الأساسية.', icon: 'extension' },
  { id: 'b3', name: 'تركيب الألغاز (البازل)', desc: 'حل بازل مكون من 50-100 قطعة لزيادة التركيز وتنمية مهارة الصبر وحل المشكلات.', icon: 'extension' },
  { id: 'b4', name: 'سودوكو الأطفال', desc: 'لعبة سودوكو مصغرة 4x4 لتطوير مهارات التحليل والاستنتاج الرياضي.', icon: 'grid_on' },
  { id: 'b5', name: 'لعبة الكلمات المتسلسلة', desc: 'ذكر كلمة، وعلى الطفل الإتيان بكلمة تبدأ بآخر حرف لتنمية الذكاء اللغوي.', icon: 'record_voice_over' },
  { id: 'b6', name: 'البحث عن الكنز المفقود', desc: 'تخبئة شيء وكتابة ورقة أدلة لتشغيل التفكير المنطقي وربط المعطيات للوصول للكنز.', icon: 'explore' },
  { id: 'b7', name: 'ترتيب المكعبات بالألوان', desc: 'استخدام الذاكرة لإعادة ترتيب مجموعة مكعبات بنفس التسلسل اللوني الذي رآه الطفل لثوانٍ.', icon: 'category' },
  { id: 'b8', name: 'المتاهة الورقية', desc: 'طباعة أو رسم متاهة، وتدريب الطفل على إيجاد المخرج بالنظر قبل استخدام القلم.', icon: 'route' },
  { id: 'b9', name: 'لعبة الاختلافات السبعة', desc: 'المقارنة بين صورتين متطابقتين تقريباً لإيجاد الفروق، لتنمية دقة الملاحظة البصرية.', icon: 'search' },
  { id: 'b10', name: 'تأليف قصة خيالية', desc: 'إعطاء الطفل 3 كلمات عشوائية ويقوم بتأليف قصة قصيرة لتعزيز الخيال والذكاء الإبداعي.', icon: 'auto_stories' },
];

const defaultProfile: ChildProfile = { 
  name: '', age: 8, height: 130, weight: 30, gender: 'boy', sport: 'football',
  sessionDuration: 45, childrenCount: 1, trainingDays: 3, fitnessLevel: 'متوسط' 
};

export default function KidsTraining() {
  const [tab, setTab] = useState<Tab>('profile');
  const [profile, setProfile] = useState<ChildProfile>(defaultProfile);
  const [profileSaved, setProfileSaved] = useState(false);

  // Selected Games State
  const [selectedPhysical, setSelectedPhysical] = useState<string[]>([]);
  const [selectedBrain, setSelectedBrain] = useState<string[]>([]);

  // AI states
  const [scheduleResult, setScheduleResult] = useState('');
  const [loading, setLoading] = useState<string | null>(null);

  // Chat
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{role:string;text:string}[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => { chatRef.current?.scrollTo(0, chatRef.current.scrollHeight); }, [chatHistory]);

  const profileContext = `الطفل: ${profile.name || 'غير محدد'}, العمر: ${profile.age} سنوات, الطول: ${profile.height} سم, الوزن: ${profile.weight} كجم, النوع: ${profile.gender === 'boy' ? 'ولد' : 'بنت'}, الرياضة: ${sports.find(s=>s.id===profile.sport)?.name || profile.sport}
--- محددات التقنين ---
مدة الحصة: ${profile.sessionDuration} دقيقة
عدد الأطفال: ${profile.childrenCount}
أيام التدريب أسبوعياً: ${profile.trainingDays} أيام
مستوى اللياقة: ${profile.fitnessLevel}`;

  const callAI = async (prompt: string): Promise<string> => {
    const r = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [{ text: prompt }] },
    });
    if (!r.text) throw new Error("No response from AI");
    return r.text;
  };

  const genSchedule = async () => {
    setLoading('schedule');
    try {
      const pGamesNames = physicalGames.filter(g => selectedPhysical.includes(g.id)).map(g => g.name).join('، ');
      const bGamesNames = brainGames.filter(g => selectedBrain.includes(g.id)).map(g => g.name).join('، ');
      
      const selectionsText = `\nالألعاب الحركية التي تم اختيارها للبرنامج: ${pGamesNames || 'لم يتم اختيار ألعاب حركية محددة.'}
الألعاب العقلية التي تم اختيارها للبرنامج: ${bGamesNames || 'لم يتم اختيار ألعاب عقلية محددة.'}`;

      const p = `أنت مدرب رياضي متخصص في تدريب الأطفال. بناءً على بيانات الطفل التالية:\n${profileContext}\n${selectionsText}\n\nقم بإنشاء جدول تدريب أسبوعي مفصل ومناسب لعمر الطفل ومقنن يوزع الأنشطة على أيام الأسبوع ويشمل:\n- توزيع الألعاب الحركية المختارة على أيام التدريب\n- دمج ألعاب الذكاء المختارة في أوقات الراحة أو أيام الاستشفاء\n- تمارين اللياقة العامة والإحماء المناسبة لرياضته المحددة\n\nيجب أن يكون الجدول ممتعاً، ومحدداً بأوقات منطقية، قدمه بتنسيق واضح وجذاب مدعماً بالإيموجي.`;
      setScheduleResult(await callAI(p));
    } catch {
      // Mock Fallback Schedule
      const pGamesNames = physicalGames.filter(g => selectedPhysical.includes(g.id)).map(g => g.name);
      const bGamesNames = brainGames.filter(g => selectedBrain.includes(g.id)).map(g => g.name);
      const name = profile.name || "البطل";
      
      let mock = `### 🌟 جدول التدريب المخصص للبطل ${name} 🌟\n\n`;
      mock += `**🎯 تفاصيل التقنين:**\n- **مدة الحصة:** ${profile.sessionDuration} دقيقة\n- **أيام التدريب:** ${profile.trainingDays} أيام في الأسبوع\n- **عدد الأطفال:** ${profile.childrenCount} (تدريب ${profile.childrenCount === 1 ? 'فردي' : 'جماعي'})\n- **مستوى اللياقة:** ${profile.fitnessLevel}\n\n---\n`;
      
      for(let i=1; i<=profile.trainingDays; i++) {
        mock += `#### 📅 اليوم ${i}:\n`;
        mock += `⏱️ **الإحماء (10 دقائق):** تمارين الإطالة والجري الخفيف في المكان.\n`;
        if (pGamesNames.length > 0) {
          const randomP = pGamesNames[i % pGamesNames.length];
          mock += `🏃‍♂️ **النشاط البدني الأساسي:** ${randomP} (ممتعة ومفيدة للياقة).\n`;
        } else {
          mock += `🏃‍♂️ **النشاط البدني:** تمارين لياقة عامة حسب نوع الرياضة (${sports.find(s=>s.id===profile.sport)?.name}).\n`;
        }
        if (bGamesNames.length > 0) {
          const randomB = bGamesNames[i % bGamesNames.length];
          mock += `🧠 **لعبة ذكاء للاستراحة:** ${randomB}.\n`;
        }
        mock += `🧘‍♂️ **التهدئة (5 دقائق):** استرخاء وتمدد خفيف.\n\n`;
      }
      mock += `> **نصيحة المدرب:** التزم بالجدول يا ${name} واحرص على شرب الماء! 💪💧`;
      
      setScheduleResult(mock);
    }
    setLoading(null);
  };

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    const msg = chatInput;
    setChatInput('');
    setChatHistory(h => [...h, { role: 'user', text: msg }]);
    setChatLoading(true);
    try {
      const p = `أنت مدرب رياضي ذكي متخصص في تدريب الأطفال. بيانات الطفل الحالي:\n${profileContext}\n\nالسؤال: ${msg}\n\nأجب بشكل مفيد ومختصر ومناسب لتدريب الأطفال. استخدم إيموجي لجعل الرد ممتعاً.`;
      const r = await callAI(p);
      setChatHistory(h => [...h, { role: 'ai', text: r }]);
    } catch { 
      setChatHistory(h => [...h, { role: 'ai', text: 'أهلاً بك! أنا المدرب الذكي، للأسف لا أستطيع الاتصال بالخادم الآن، ولكن أنصحك بالاعتماد على الألعاب التدريبية التي اخترتها في ملفك الشخصي. استمر في التشجيع! ⚽💪' }]); 
    }
    setChatLoading(false);
  };

  const toggleSelection = (id: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (list.includes(id)) {
      setList(list.filter(item => item !== id));
    } else {
      setList([...list, id]);
    }
  };

  const tabs: { id: Tab; label: string; icon: string; color: string }[] = [
    { id: 'profile', label: 'الملف الشخصي والجدول', icon: 'child_care', color: '#f59e0b' },
    { id: 'games', label: 'ألعاب وتدريبات', icon: 'sports_esports', color: '#10b981' },
    { id: 'brain', label: 'ألعاب الذكاء', icon: 'psychology', color: '#3b82f6' },
    { id: 'chat', label: 'المدرب الذكي', icon: 'smart_toy', color: '#ec4899' },
  ];

  const renderProfile = () => (
    <FadeContent blur duration={800} initialOpacity={0}>
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-amber-400 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
            <p className="text-amber-300 text-sm font-medium">أدخل بيانات الطفل لتخصيص البرنامج التدريبي والألعاب المقترحة بما يناسب عمره وقدراته.</p>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="text-zinc-400 text-sm mb-2 block">اسم الطفل</label>
          <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})}
            placeholder="مثال: أحمد"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors" />
        </div>

        {/* Gender */}
        <div>
          <label className="text-zinc-400 text-sm mb-2 block">النوع</label>
          <div className="grid grid-cols-2 gap-3">
            {(['boy','girl'] as const).map(g => (
              <button key={g} onClick={() => setProfile({...profile, gender: g})}
                className={`p-4 rounded-xl border-2 flex items-center justify-center gap-3 font-bold transition-all ${profile.gender === g ? 'border-amber-500 bg-amber-500/10 text-amber-400' : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'}`}>
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{g === 'boy' ? 'boy' : 'girl'}</span>
                {g === 'boy' ? 'ولد' : 'بنت'}
              </button>
            ))}
          </div>
        </div>

        {/* Age Slider */}
        <div>
          <label className="text-zinc-400 text-sm mb-2 flex justify-between"><span>العمر</span><span className="text-amber-400 font-bold">{profile.age} سنوات</span></label>
          <input type="range" min={3} max={17} value={profile.age} onChange={e => setProfile({...profile, age: +e.target.value})}
            className="w-full accent-amber-500 h-2 bg-zinc-800 rounded-full" />
          <div className="flex justify-between text-xs text-zinc-600 mt-1"><span>3</span><span>10</span><span>17</span></div>
        </div>

        {/* Height & Weight */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-zinc-400 text-sm mb-2 flex justify-between"><span>الطول</span><span className="text-amber-400 font-bold">{profile.height} سم</span></label>
            <input type="range" min={80} max={190} value={profile.height} onChange={e => setProfile({...profile, height: +e.target.value})}
              className="w-full accent-amber-500 h-2 bg-zinc-800 rounded-full" />
          </div>
          <div>
            <label className="text-zinc-400 text-sm mb-2 flex justify-between"><span>الوزن</span><span className="text-amber-400 font-bold">{profile.weight} كجم</span></label>
            <input type="range" min={10} max={80} value={profile.weight} onChange={e => setProfile({...profile, weight: +e.target.value})}
              className="w-full accent-amber-500 h-2 bg-zinc-800 rounded-full" />
          </div>
        </div>

        {/* Sport Selection */}
        <div>
          <label className="text-zinc-400 text-sm mb-3 block">نوع الرياضة الأساسية</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {sports.map(s => (
              <button key={s.id} onClick={() => setProfile({...profile, sport: s.id})}
                className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 text-sm font-medium transition-all ${profile.sport === s.id ? 'border-amber-500 bg-amber-500/10 text-amber-400' : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'}`}>
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Save */}
        <StarBorder as="button" color="#f59e0b" speed="4s" className="w-full" onClick={() => { setProfileSaved(true); setTimeout(() => setProfileSaved(false), 2000); }}>
          <div className="flex items-center justify-center gap-2 font-bold text-white">
            {profileSaved ? <><span className="material-symbols-outlined">check_circle</span><span>تم حفظ البيانات!</span></> : <><span>حفظ بيانات الطفل</span><span className="material-symbols-outlined">save</span></>}
          </div>
        </StarBorder>

        {/* Schedule Generation Section (Moved from separate tab) */}
        <div className="mt-8 pt-8 border-t border-zinc-800 space-y-5">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5">
            <div className="flex flex-col gap-3">
              <p className="text-amber-300 text-sm font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400">rule</span>
                بناءً على الاختيارات أعلاه والألعاب المحددة، سيقوم المدرب الذكي بصياغة جدول يومي.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-zinc-800 text-green-400 text-xs rounded-full font-bold">الألعاب الحركية المختارة: {selectedPhysical.length}</span>
                <span className="px-3 py-1 bg-zinc-800 text-blue-400 text-xs rounded-full font-bold">ألعاب الذكاء المختارة: {selectedBrain.length}</span>
              </div>
            </div>
          </div>

          <StarBorder as="button" color="#f59e0b" speed="4s" className="w-full" onClick={genSchedule} disabled={loading === 'schedule'}>
            <div className="flex items-center justify-center gap-2 font-bold text-white">
              {loading === 'schedule' ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>جاري التقنين وبناء الجدول...</span></> : <><span className="material-symbols-outlined">auto_awesome</span><span>توليد الجدول الأسبوعي للملف الحالي</span></>}
            </div>
          </StarBorder>

          {scheduleResult && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 mt-4">
              <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap text-zinc-300 leading-relaxed">{scheduleResult}</div>
            </motion.div>
          )}
        </div>
      </div>
    </FadeContent>
  );

  const renderGameList = (items: typeof physicalGames, selected: string[], setSelect: React.Dispatch<React.SetStateAction<string[]>>, color: string) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map(game => {
        const isSelected = selected.includes(game.id);
        return (
          <div 
            key={game.id} 
            onClick={() => toggleSelection(game.id, selected, setSelect)}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden flex items-start gap-4 ${isSelected ? 'border-green-500 bg-green-500/10' : 'border-zinc-800 bg-zinc-900 hover:border-zinc-600'}`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isSelected ? 'bg-green-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{game.icon}</span>
            </div>
            <div>
              <h4 className={`font-bold text-lg mb-1 ${isSelected ? 'text-green-400' : 'text-zinc-200'}`}>{game.name}</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">{game.desc}</p>
            </div>
            {isSelected && (
              <div className="absolute top-3 left-3">
                <span className="material-symbols-outlined text-green-500" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderGames = () => (
    <FadeContent blur duration={800} initialOpacity={0}>
      <div className="space-y-6">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 mb-4">
          <p className="text-emerald-300 text-sm font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400">touch_app</span>
            اختر الألعاب الحركية والتدريبات البدنية المناسبة لطفلك.
          </p>
        </div>
        {renderGameList(physicalGames, selectedPhysical, setSelectedPhysical, '#10b981')}
        <button onClick={() => setTab('brain')} className="w-full mt-6 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-xl transition-colors">
          انتقال لاختيار ألعاب الذكاء ➔
        </button>
      </div>
    </FadeContent>
  );

  const renderBrainGames = () => (
    <FadeContent blur duration={800} initialOpacity={0}>
      <div className="space-y-6">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5 mb-4">
          <p className="text-blue-300 text-sm font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-400">psychology</span>
            اختر ألعاب الذكاء والتنمية العقلية التي ستضاف في فترات الراحة.
          </p>
        </div>
        {renderGameList(brainGames, selectedBrain, setSelectedBrain, '#3b82f6')}
        <button onClick={() => setTab('profile')} className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/20">
          انتقال لتوليد الجدول ➔
        </button>
      </div>
    </FadeContent>
  );



  const renderChat = () => (
    <FadeContent blur duration={800} initialOpacity={0}>
      <div className="flex flex-col h-[60vh] min-h-[400px]">
        <div ref={chatRef} className="flex-1 bg-zinc-900/50 rounded-2xl p-4 overflow-y-auto space-y-3 mb-4">
          {chatHistory.length === 0 && (
            <div className="text-center mt-16 space-y-4">
              <span className="material-symbols-outlined text-pink-500 text-6xl block mx-auto opacity-40" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
              <p className="text-zinc-500">اسأل المدرب الذكي عن أي شيء يخص تدريب طفلك!</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['ما أفضل تمارين الإحماء؟','كم مدة التدريب المناسبة؟','نصائح للتغذية','كيف أحفز طفلي؟'].map(q => (
                  <button key={q} onClick={() => { setChatInput(q); }} className="bg-zinc-800 text-zinc-400 text-xs px-3 py-1.5 rounded-full hover:bg-pink-500/20 hover:text-pink-400 transition-colors">{q}</button>
                ))}
              </div>
            </div>
          )}
          {chatHistory.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${m.role === 'user' ? 'bg-pink-600 text-white' : 'bg-zinc-800 text-zinc-200'}`}>
                <div className="whitespace-pre-wrap">{m.text}</div>
              </div>
            </div>
          ))}
          {chatLoading && <div className="text-pink-400 text-sm animate-pulse flex items-center gap-2"><span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>يفكر...</div>}
        </div>
        <div className="flex gap-2">
          <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleChat()}
            placeholder="اسأل عن تدريب طفلك..."
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500" />
          <button onClick={handleChat} disabled={chatLoading} className="bg-pink-600 hover:bg-pink-500 text-white px-5 py-3 rounded-xl font-medium transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-lg">send</span>
          </button>
        </div>
      </div>
    </FadeContent>
  );

  return (
    <div className="dark relative flex min-h-screen w-full flex-col bg-[#0e0e0e] text-white overflow-x-hidden font-display">
      <header className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 bg-[#0e0e0e]/80 backdrop-blur-xl border-b border-white/5 mb-4 -mx-4 md:-mx-8">
        <div className="w-10 flex justify-start"><BackButton /></div>
        <h1 className="text-lg font-bold truncate flex-1 text-center flex justify-center">
          <GradientText colors={['#f59e0b','#fbbf24','#f59e0b']} animationSpeed={6} showBorder={false}>
            برنامج تدريب الأطفال
          </GradientText>
        </h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 pb-12 w-full">
        {/* Hero */}
        <FadeContent blur duration={1000} initialOpacity={0}>
          <div className="rounded-3xl overflow-hidden p-6 relative shadow-2xl min-h-[180px] flex flex-col justify-end mb-8">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=2000&auto=format&fit=crop')` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/80 to-transparent" />
            <div className="absolute top-4 left-4 w-24 h-24 rounded-full blur-3xl" style={{ backgroundColor: '#f59e0b', opacity: 0.3 }} />
            
            <div className="relative z-10 flex items-end gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shrink-0" style={{ backgroundColor: `#f59e0b40`, color: '#f59e0b', backdropFilter: 'blur(8px)' }}>
                <span className="material-symbols-outlined text-3xl">child_care</span>
              </div>
              <div className="flex-1 pb-1">
                <h2 className="text-xl font-extrabold text-white mb-1">تدريب ذكي لأبطال المستقبل</h2>
                <p className="text-xs text-gray-300">شاهد المدرب يبرمج الألعاب بذكاء</p>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Tabs */}
        <div className="px-4 mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${tab === t.id ? 'text-white shadow-lg' : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300 border border-zinc-800'}`}
                style={tab === t.id ? { background: t.color, boxShadow: `0 8px 20px ${t.color}40` } : {}}>
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              {tab === 'profile' && renderProfile()}
              {tab === 'games' && renderGames()}
              {tab === 'brain' && renderBrainGames()}
              {tab === 'chat' && renderChat()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
