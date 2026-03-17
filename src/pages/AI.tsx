import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ai } from '../genai';
import { MessageSquare, Mic, Search, MapPin, Zap, Upload, Activity, Utensils, Camera, PlayCircle } from 'lucide-react';

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export default function AI() {
  const [activeTab, setActiveTab] = useState<'chat' | 'form' | 'meals' | 'tts'>('chat');
  
  // Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: string, text: string, image?: string}[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [useMaps, setUseMaps] = useState(false);
  const [useSearch, setUseSearch] = useState(false);
  const [useFastMode, setUseFastMode] = useState(false);
  const [chatImage, setChatImage] = useState<{data: string, mimeType: string} | null>(null);

  // Form Analysis State
  const [formImage, setFormImage] = useState<{data: string, mimeType: string, url: string} | null>(null);
  const [formExercise, setFormExercise] = useState('');
  const [formAnalysis, setFormAnalysis] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Meal Planner State
  const [fridgeImage, setFridgeImage] = useState<{data: string, mimeType: string, url: string} | null>(null);
  const [mealPreferences, setMealPreferences] = useState('');
  const [mealPlan, setMealPlan] = useState<string | null>(null);
  const [mealLoading, setMealLoading] = useState(false);

  // TTS State
  const [ttsText, setTtsText] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [ttsLoading, setTtsLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = (event.target?.result as string).split(',')[1];
      setter({ data: base64, mimeType: file.type, url: URL.createObjectURL(file) });
    };
    reader.readAsDataURL(file);
  };

  const handleChat = async () => {
    if (!chatInput.trim() && !chatImage) return;
    setChatLoading(true);
    
    const userMsg = chatInput;
    const userImg = chatImage ? `data:${chatImage.mimeType};base64,${chatImage.data}` : undefined;
    
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg, image: userImg }]);
    
    try {
      let model = 'gemini-3.1-pro-preview';
      if (useFastMode) model = 'gemini-3.1-flash-lite-preview';
      if (useMaps) model = 'gemini-2.5-flash';
      if (useSearch) model = 'gemini-3-flash-preview';

      const tools: any[] = [];
      if (useMaps) tools.push({ googleMaps: {} });
      if (useSearch) tools.push({ googleSearch: {} });

      const config: any = {};
      if (tools.length > 0) config.tools = tools;
      if (!useMaps && !useSearch && !useFastMode) {
         config.thinkingConfig = { thinkingLevel: 'HIGH' };
      }

      const parts: any[] = [];
      if (chatImage) {
        parts.push({ inlineData: { data: chatImage.data, mimeType: chatImage.mimeType } });
      }
      if (chatInput.trim()) {
        parts.push({ text: chatInput });
      }

      const response = await ai.models.generateContent({
        model,
        contents: { parts },
        config
      });

      setChatHistory(prev => [...prev, { role: 'ai', text: response.text || 'لا يوجد رد' }]);
    } catch (error) {
      console.error(error);
      setChatHistory(prev => [...prev, { role: 'ai', text: 'خطأ في توليد الرد.' }]);
    } finally {
      setChatLoading(false);
      setChatInput('');
      setChatImage(null);
    }
  };

  const handleFormAnalysis = async () => {
    if (!formImage) {
      alert("الرجاء رفع صورة أو فيديو قصير للتمرين أولاً.");
      return;
    }
    setFormLoading(true);
    try {
      const prompt = `قم بتحليل الأداء الحركي (Form) في هذه الصورة/الفيديو للتمرين التالي: ${formExercise || 'غير محدد'}. 
      ركز على:
      1. الأخطاء الشائعة في الوضعية.
      2. نصائح لتصحيح المسار الحركي.
      3. العضلات المستهدفة وكيفية تفعيلها بشكل أفضل.
      قدم الإجابة بتنسيق واضح ونقاط محددة باللغة العربية.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: {
          parts: [
            { inlineData: { data: formImage.data, mimeType: formImage.mimeType } },
            { text: prompt }
          ]
        }
      });
      setFormAnalysis(response.text || 'لم يتمكن الذكاء الاصطناعي من تحليل الصورة.');
    } catch (error) {
      console.error(error);
      setFormAnalysis('حدث خطأ أثناء تحليل الأداء الحركي. تأكد من حجم الملف.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleMealGeneration = async () => {
    if (!fridgeImage && !mealPreferences.trim()) {
      alert("الرجاء رفع صورة للمكونات أو كتابة تفضيلاتك.");
      return;
    }
    setMealLoading(true);
    try {
      const parts: any[] = [];
      if (fridgeImage) {
        parts.push({ inlineData: { data: fridgeImage.data, mimeType: fridgeImage.mimeType } });
      }
      
      const prompt = `أنت خبير تغذية رياضي. بناءً على المكونات المتاحة في الصورة (إن وجدت) والتفضيلات التالية: "${mealPreferences}"، 
      قم باقتراح 3 وجبات صحية ومناسبة للرياضيين. 
      لكل وجبة، اذكر:
      - اسم الوجبة.
      - المكونات المطلوبة.
      - طريقة التحضير باختصار.
      - تقدير تقريبي للماكروز (بروتين، كارب، دهون) والسعرات الحرارية.
      قدم الإجابة بتنسيق واضح باللغة العربية.`;
      
      parts.push({ text: prompt });

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: { parts }
      });
      setMealPlan(response.text || 'لم يتمكن الذكاء الاصطناعي من توليد الوجبات.');
    } catch (error) {
      console.error(error);
      setMealPlan('حدث خطأ أثناء توليد الوجبات.');
    } finally {
      setMealLoading(false);
    }
  };

  const handleTTS = async () => {
    if (!ttsText.trim()) return;
    setTtsLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: ttsText }] }],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioUrl = `data:audio/mp3;base64,${base64Audio}`;
        setAudioUrl(audioUrl);
      }
    } catch (error) {
      console.error(error);
      alert('فشل في توليد الصوت');
    } finally {
      setTtsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      <header>
        <h1 className="text-4xl font-bold text-white mb-2">المساعد الذكي (AI)</h1>
        <p className="text-zinc-400">أدوات متقدمة مدعومة بالذكاء الاصطناعي لتحسين أدائك وتغذيتك.</p>
      </header>

      <div className="flex gap-4 border-b border-zinc-800 pb-4 overflow-x-auto scrollbar-hide">
        <button onClick={() => setActiveTab('chat')} className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${activeTab === 'chat' ? 'bg-purple-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}>
          <MessageSquare className="w-4 h-4" /> الدردشة والاستشارات
        </button>
        <button onClick={() => setActiveTab('form')} className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${activeTab === 'form' ? 'bg-purple-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}>
          <Activity className="w-4 h-4" /> تحليل الأداء (Form)
        </button>
        <button onClick={() => setActiveTab('meals')} className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${activeTab === 'meals' ? 'bg-purple-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}>
          <Utensils className="w-4 h-4" /> مبتكر الوجبات
        </button>
        <button onClick={() => setActiveTab('tts')} className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${activeTab === 'tts' ? 'bg-purple-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}>
          <Mic className="w-4 h-4" /> المساعد الصوتي
        </button>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 min-h-[500px]">
        {activeTab === 'chat' && (
          <div className="flex flex-col h-full space-y-4">
            <div className="flex flex-wrap gap-4 mb-4">
              <label className="flex items-center gap-2 text-zinc-400 text-sm cursor-pointer">
                <input type="checkbox" checked={useSearch} onChange={e => {setUseSearch(e.target.checked); setUseMaps(false); setUseFastMode(false);}} className="rounded bg-zinc-900 border-zinc-700 text-purple-500 focus:ring-purple-500" />
                <Search className="w-4 h-4" /> البحث في الويب
              </label>
              <label className="flex items-center gap-2 text-zinc-400 text-sm cursor-pointer">
                <input type="checkbox" checked={useMaps} onChange={e => {setUseMaps(e.target.checked); setUseSearch(false); setUseFastMode(false);}} className="rounded bg-zinc-900 border-zinc-700 text-purple-500 focus:ring-purple-500" />
                <MapPin className="w-4 h-4" /> صالات قريبة (خرائط)
              </label>
              <label className="flex items-center gap-2 text-zinc-400 text-sm cursor-pointer">
                <input type="checkbox" checked={useFastMode} onChange={e => {setUseFastMode(e.target.checked); setUseSearch(false); setUseMaps(false);}} className="rounded bg-zinc-900 border-zinc-700 text-purple-500 focus:ring-purple-500" />
                <Zap className="w-4 h-4" /> رد سريع
              </label>
            </div>
            
            <div className="flex-1 bg-zinc-900/50 rounded-2xl p-4 overflow-y-auto space-y-4 min-h-[300px] max-h-[500px]">
              {chatHistory.length === 0 && (
                <div className="text-zinc-500 text-center mt-10">اسألني عن أي شيء يخص التدريب، التغذية، أو الاستشفاء.</div>
              )}
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-200'}`}>
                    {msg.image && <img src={msg.image} alt="Uploaded" className="max-w-xs rounded-lg mb-2" />}
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  </div>
                </div>
              ))}
              {chatLoading && <div className="text-purple-400 text-sm animate-pulse">يحلل البيانات...</div>}
            </div>
            
            {chatImage && (
              <div className="flex items-center gap-2 text-sm text-purple-400 bg-purple-500/10 p-2 rounded-lg w-fit">
                <Camera className="w-4 h-4" /> صورة مرفقة. <button onClick={() => setChatImage(null)} className="text-zinc-400 hover:text-white underline ml-2">إزالة</button>
              </div>
            )}

            <div className="flex gap-2">
              <label className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-3 rounded-xl cursor-pointer transition-colors flex items-center justify-center">
                <Upload className="w-5 h-5" />
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setChatImage)} />
              </label>
              <input 
                type="text" 
                value={chatInput} 
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleChat()}
                placeholder="اكتب سؤالك هنا..."
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              />
              <button onClick={handleChat} disabled={chatLoading} className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                إرسال
              </button>
            </div>
          </div>
        )}

        {activeTab === 'form' && (
          <div className="space-y-6">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-4 text-purple-300 text-sm">
              <p>قم برفع صورة (أو لقطة شاشة من فيديو) لتمرينك، وسيقوم الذكاء الاصطناعي بتحليل وضعية جسمك واكتشاف الأخطاء الشائعة لتقليل خطر الإصابة.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block">
                  <span className="text-zinc-400 text-sm mb-1 block">اسم التمرين (اختياري)</span>
                  <input 
                    type="text" 
                    value={formExercise} 
                    onChange={e => setFormExercise(e.target.value)}
                    placeholder="مثال: سكوات، ديدليفت، بنش برس..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                  />
                </label>

                <div className="border-2 border-dashed border-zinc-700 rounded-2xl p-8 text-center hover:border-purple-500 transition-colors relative">
                  {formImage ? (
                    <div className="relative">
                      <img src={formImage.url} alt="Exercise Form" className="max-h-64 mx-auto rounded-lg" />
                      <button onClick={() => setFormImage(null)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs">إزالة</button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400">
                        <Upload className="w-8 h-8" />
                      </div>
                      <span className="text-zinc-300 font-medium">اضغط لرفع صورة التمرين</span>
                      <span className="text-zinc-500 text-sm">يدعم JPG, PNG (يفضل لقطة واضحة من الجانب)</span>
                      <input type="file" accept="image/*,video/mp4" className="hidden" onChange={(e) => handleImageUpload(e, setFormImage)} />
                    </label>
                  )}
                </div>

                <button 
                  onClick={handleFormAnalysis} 
                  disabled={formLoading || !formImage} 
                  className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white px-6 py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                >
                  {formLoading ? <span className="animate-pulse">جاري التحليل الميكانيكي...</span> : <><Activity className="w-5 h-5" /> تحليل الأداء</>}
                </button>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 min-h-[300px]">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Search className="w-5 h-5 text-purple-400" /> نتيجة التحليل
                </h3>
                {formAnalysis ? (
                  <div className="text-zinc-300 whitespace-pre-wrap leading-relaxed">
                    {formAnalysis}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
                    <PlayCircle className="w-16 h-16 opacity-20" />
                    <p>ارفع صورتك واضغط على تحليل للحصول على تقرير مفصل عن أدائك.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'meals' && (
          <div className="space-y-6">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-emerald-300 text-sm">
              <p>افتح ثلاجتك، التقط صورة للمكونات المتاحة، وسيقوم الذكاء الاصطناعي بابتكار وجبات صحية تناسب أهدافك الرياضية.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border-2 border-dashed border-zinc-700 rounded-2xl p-8 text-center hover:border-emerald-500 transition-colors relative">
                  {fridgeImage ? (
                    <div className="relative">
                      <img src={fridgeImage.url} alt="Fridge Ingredients" className="max-h-64 mx-auto rounded-lg" />
                      <button onClick={() => setFridgeImage(null)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs">إزالة</button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400">
                        <Camera className="w-8 h-8" />
                      </div>
                      <span className="text-zinc-300 font-medium">التقط صورة لمكوناتك</span>
                      <span className="text-zinc-500 text-sm">أو صورة لداخل الثلاجة</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setFridgeImage)} />
                    </label>
                  )}
                </div>

                <label className="block">
                  <span className="text-zinc-400 text-sm mb-1 block">تفضيلات إضافية (اختياري)</span>
                  <textarea 
                    value={mealPreferences} 
                    onChange={e => setMealPreferences(e.target.value)}
                    placeholder="مثال: أريد وجبة عالية البروتين، لا أحب الطماطم، وجبة سريعة التحضير..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 min-h-[100px]"
                  />
                </label>

                <button 
                  onClick={handleMealGeneration} 
                  disabled={mealLoading || (!fridgeImage && !mealPreferences.trim())} 
                  className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white px-6 py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                >
                  {mealLoading ? <span className="animate-pulse">جاري ابتكار الوصفات...</span> : <><Utensils className="w-5 h-5" /> توليد وجبات ذكية</>}
                </button>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 min-h-[300px]">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-emerald-400" /> الوصفات المقترحة
                </h3>
                {mealPlan ? (
                  <div className="text-zinc-300 whitespace-pre-wrap leading-relaxed">
                    {mealPlan}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
                    <Utensils className="w-16 h-16 opacity-20" />
                    <p>أضف المكونات واضغط على توليد للحصول على وصفات صحية ولذيذة.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tts' && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 text-blue-300 text-sm mb-6">
              <p>حول أي نص أو مقال رياضي إلى مقطع صوتي لتستمع إليه أثناء تمرينك.</p>
            </div>
            <div className="flex gap-2">
              <textarea 
                value={ttsText} 
                onChange={e => setTtsText(e.target.value)}
                placeholder="أدخل النص هنا (مثال: نصائح للتحمية قبل التمرين)..."
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 min-h-[150px]"
              />
            </div>
            <button onClick={handleTTS} disabled={ttsLoading} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-xl font-bold transition-colors w-full flex items-center justify-center gap-2">
              {ttsLoading ? <span className="animate-pulse">جاري التوليد...</span> : <><Mic className="w-5 h-5" /> تحويل إلى صوت</>}
            </button>
            {audioUrl && (
              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 mt-6">
                <h4 className="text-white font-medium mb-4">المقطع الصوتي الجاهز:</h4>
                <audio src={audioUrl} controls className="w-full" />
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
