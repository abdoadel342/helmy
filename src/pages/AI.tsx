import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ai } from '../genai';
import { BackButton } from '../components/BackButton';
import { MessageSquare, Mic, Search, MapPin, Zap, Upload, Activity, Utensils, Camera, PlayCircle } from 'lucide-react';
import { FadeContent } from '../components/react-bits/FadeContent';
import { ShinyText } from '../components/react-bits/ShinyText';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { usePersistentState } from '../hooks/usePersistentState';

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
  const [chatHistory, setChatHistory] = usePersistentState<{role: string, text: string, image?: string}[]>('ai_chat_history', []);
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

  // Camera State
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraTarget, setCameraTarget] = useState<'chat' | 'form' | 'meals' | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async (target: 'chat' | 'form' | 'meals') => {
    setCameraTarget(target);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error("Error accessing camera: ", err);
      alert("تعذر الوصول إلى الكاميرا. يرجى التأكد من منح الصلاحيات.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setCameraTarget(null);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current && cameraTarget) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.8);
        const imageObj = {
          data: dataUrl.split(',')[1],
          mimeType: 'image/jpeg',
          url: dataUrl
        };
        
        if (cameraTarget === 'chat') setChatImage(imageObj);
        else if (cameraTarget === 'form') setFormImage(imageObj);
        else if (cameraTarget === 'meals') setFridgeImage(imageObj);
        
        stopCamera();
      }
    }
  };

  // Meal Planner State
  const [fridgeImage, setFridgeImage] = useState<{data: string, mimeType: string, url: string} | null>(null);
  const [mealPreferences, setMealPreferences] = usePersistentState('ai_meal_prefs', '');
  const [mealPlan, setMealPlan] = usePersistentState('ai_meal_plan', '');
  const [mealLoading, setMealLoading] = useState(false);

  // TTS State
  const [ttsText, setTtsText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

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
      let model = 'gemini-2.5-flash';
      if (useFastMode) model = 'gemini-2.5-flash';
      if (useMaps) model = 'gemini-2.5-flash';
      if (useSearch) model = 'gemini-2.5-flash';

      const tools: any[] = [];
      if (useMaps) tools.push({ googleMaps: {} });
      if (useSearch) tools.push({ googleSearch: {} });

      const config: any = {};
      if (tools.length > 0) config.tools = tools;

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
    } catch (error: any) {
      console.error(error);
      const mockResponse = `عذراً، حدث خطأ: ${error?.message || JSON.stringify(error)}`;
      setChatHistory(prev => [...prev, { role: 'ai', text: mockResponse }]);
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
        model: 'gemini-2.5-flash',
        contents: {
          parts: [
            { inlineData: { data: formImage.data, mimeType: formImage.mimeType } },
            { text: prompt }
          ]
        }
      });
      setFormAnalysis(response.text || 'لم يتمكن الذكاء الاصطناعي من تحليل الصورة.');
    } catch (error: any) {
      console.error(error);
      setFormAnalysis(`حدث خطأ أثناء تحليل الأداء الحركي: ${error?.message || ''}`);
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
      
      const prompt = `أنت شيف عبقري وخبير تغذية رياضي. مهمتك الأساسية هي ابتكار 3 وجبات صحية ومناسبة للرياضيين باستخدام المكونات الظاهرة في الصورة المرفقة حصرياً (أو كمكونات أساسية).
      ${mealPreferences ? `الرجاء مراعاة هذه التفضيلات الإضافية: "${mealPreferences}"` : ''}
      يجب أن يكون الابتكار واقعياً ولذيذاً بناءً على ما يملكه المستخدم من مكونات في الصورة فقط، ولا تضف مكونات رئيسية غير موجودة (يمكنك إضافة بهارات وأساسيات الطبخ البسيطة كزيت الزيتون والملح).
      
      لكل وجبة، اذكر:
      - اسم الوجبة المبتكرة (اجعله جذاباً).
      - المكونات المستخدمة (من المكونات المتاحة).
      - طريقة التحضير باختصار.
      - تقدير تقريبي للماكروز (بروتين، كارب، دهون) والسعرات الحرارية.
      قدم الإجابة بتنسيق واضح وجذاب باللغة العربية.`;
      
      parts.push({ text: prompt });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts }
      });
      setMealPlan(response.text || 'لم يتمكن الذكاء الاصطناعي من توليد الوجبات.');
    } catch (error: any) {
      console.error(error);
      setMealPlan(`حدث خطأ أثناء توليد الوجبات: ${error?.message || ''}`);
    } finally {
      setMealLoading(false);
    }
  };

  const handleTTS = () => {
    if (!ttsText.trim()) return;
    
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(ttsText);
      utterance.lang = 'ar-SA';
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = (e) => {
        console.error("Speech API Error:", e);
        setIsPlaying(false);
      };
      
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error(e);
      alert("متصفحك لا يدعم قراءة النصوص أو يمنع تشغيلها.");
      setIsPlaying(false);
    }
  };

  const stopTTS = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <>
      {isCameraActive && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4">
           <canvas ref={canvasRef} className="hidden" />
           <div className="w-full max-w-lg bg-zinc-900 rounded-3xl p-4 border border-primary/20 shadow-2xl flex flex-col items-center gap-4">
             <div className="w-full bg-black rounded-2xl overflow-hidden shadow-inner relative min-h-[300px]">
               <video ref={videoRef} className="w-full h-full object-cover" playsInline autoPlay muted />
               <div className="absolute top-4 left-4 bg-red-500/80 backdrop-blur text-white text-xs px-3 py-1 rounded-full animate-pulse flex items-center gap-1">
                 <div className="w-2 h-2 bg-white rounded-full"></div> LIVE
               </div>
             </div>
             <div className="flex gap-4 w-full">
               <button onClick={capturePhoto} className="flex-1 bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-2xl font-bold shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all">
                 <Camera className="w-6 h-6" /> التقاط صورة
               </button>
               <button onClick={stopCamera} className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 px-8 py-4 rounded-2xl font-bold transition-all">
                 إلغاء
               </button>
             </div>
           </div>
        </div>
      )}
      
      <FadeContent blur={true} duration={1000} initialOpacity={0}>
      <div className="space-y-8 pb-12">
        <header className="flex items-center gap-4 mb-8">
          <BackButton />
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              <ShinyText text="المدرب الذكي (AI)" disabled={false} speed={3} className="" />
            </h1>
            <p className="text-primary/60">أدوات متقدمة مدعومة بالذكاء الاصطناعي لتحسين أدائك وتغذيتك.</p>
          </div>
        </header>

        {/* Tabs - Glassmorphic */}
        <div className="flex gap-4 border-b border-primary/20 pb-4 overflow-x-auto scrollbar-hide">
          <button onClick={() => setActiveTab('chat')} className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all whitespace-nowrap ${activeTab === 'chat' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-primary/5 text-primary/60 hover:text-white hover:bg-primary/10 border border-primary/10'}`}>
            <MessageSquare className="w-5 h-5" /> الدردشة والاستشارات
          </button>
          <button onClick={() => setActiveTab('form')} className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all whitespace-nowrap ${activeTab === 'form' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-primary/5 text-primary/60 hover:text-white hover:bg-primary/10 border border-primary/10'}`}>
            <Activity className="w-5 h-5" /> تحليل الأداء (Form)
          </button>
          <button onClick={() => setActiveTab('meals')} className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all whitespace-nowrap ${activeTab === 'meals' ? 'bg-[#00fcca] text-[#0f172a] shadow-lg shadow-[#00fcca]/30' : 'bg-[#00fcca]/5 text-[#00fcca]/60 hover:text-white hover:bg-[#00fcca]/10 border border-[#00fcca]/10'}`}>
            <Utensils className="w-5 h-5" /> مبتكر الوجبات
          </button>
          <button onClick={() => setActiveTab('tts')} className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all whitespace-nowrap ${activeTab === 'tts' ? 'bg-[#e08dff] text-white shadow-lg shadow-[#e08dff]/30' : 'bg-[#e08dff]/5 text-[#e08dff]/60 hover:text-white hover:bg-[#e08dff]/10 border border-[#e08dff]/10'}`}>
            <Mic className="w-5 h-5" /> المساعد الصوتي
          </button>
        </div>

        <div className="bg-white/5 dark:bg-primary/5 backdrop-blur-xl border border-primary/10 rounded-3xl p-6 min-h-[500px] shadow-2xl">
          {activeTab === 'chat' && (
            <div className="flex flex-col h-full space-y-6">
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-primary/60 text-sm cursor-pointer hover:text-primary transition-colors">
                  <input type="checkbox" checked={useSearch} onChange={e => {setUseSearch(e.target.checked); setUseMaps(false); setUseFastMode(false);}} className="rounded bg-primary/10 border-primary/20 text-primary focus:ring-primary accent-primary" />
                  <Search className="w-4 h-4" /> البحث في الويب
                </label>
                <label className="flex items-center gap-2 text-primary/60 text-sm cursor-pointer hover:text-primary transition-colors">
                  <input type="checkbox" checked={useMaps} onChange={e => {setUseMaps(e.target.checked); setUseSearch(false); setUseFastMode(false);}} className="rounded bg-primary/10 border-primary/20 text-primary focus:ring-primary accent-primary" />
                  <MapPin className="w-4 h-4" /> صالات قريبة (خرائط)
                </label>
                <label className="flex items-center gap-2 text-primary/60 text-sm cursor-pointer hover:text-primary transition-colors">
                  <input type="checkbox" checked={useFastMode} onChange={e => {setUseFastMode(e.target.checked); setUseSearch(false); setUseMaps(false);}} className="rounded bg-primary/10 border-primary/20 text-primary focus:ring-primary accent-primary" />
                  <Zap className="w-4 h-4" /> رد سريع
                </label>
              </div>
              
              <div className="flex-1 bg-black/20 rounded-2xl p-4 overflow-y-auto space-y-4 min-h-[300px] max-h-[500px] border border-primary/5 relative custom-scrollbar">
                {chatHistory.length === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-primary/40 space-y-4">
                    <MessageSquare className="w-16 h-16 opacity-20" />
                    <p>اسألني عن أي شيء يخص التدريب، التغذية، أو الاستشفاء.</p>
                  </div>
                )}
                
                {chatHistory.map((msg, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    key={i} 
                    className={`flex w-full mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-3xl px-5 py-4 shadow-lg backdrop-blur-md ${msg.role === 'user' ? 'bg-gradient-to-br from-primary to-primary/80 text-white rounded-br-none border border-primary/50' : 'bg-white/10 text-slate-200 rounded-bl-none border border-white/5'}`}>
                      {msg.image && <img src={msg.image} alt="Uploaded" className="max-w-xs rounded-xl mb-3 border border-white/10 shadow-md" />}
                      <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                    </div>
                  </motion.div>
                ))}
                
                {chatLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-white/5 border border-white/5 rounded-3xl rounded-bl-none px-6 py-4 flex items-center gap-3 shadow-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-primary/70 text-sm">جاري التفكير...</span>
                    </div>
                  </div>
                )}
              </div>
              
              {chatImage && (
                <div className="flex items-center gap-3 text-sm text-primary bg-primary/10 border border-primary/20 px-4 py-3 rounded-2xl w-fit backdrop-blur-md">
                  <Camera className="w-4 h-4" /> تم إرفاق صورة
                  <button onClick={() => setChatImage(null)} className="text-red-400 hover:text-red-300 mr-2 bg-red-400/10 px-2 py-1 rounded-lg transition-colors">إزالة</button>
                </div>
              )}

              <div className="flex gap-3 items-end">
                <button onClick={() => startCamera('chat')} className="bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary p-4 rounded-2xl cursor-pointer transition-all flex items-center justify-center shrink-0 shadow-lg">
                  <Camera className="w-6 h-6" />
                </button>
                <label className="bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary p-4 rounded-2xl cursor-pointer transition-all flex items-center justify-center shrink-0 shadow-lg">
                  <Upload className="w-6 h-6" />
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setChatImage)} />
                </label>
                <div className="flex-1 relative">
                  <textarea 
                    value={chatInput} 
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleChat();
                      }
                    }}
                    placeholder="اكتب سؤالك هنا... (اضغط Enter للإرسال)"
                    className="w-full bg-black/20 border border-primary/20 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary min-h-[60px] resize-none shadow-inner"
                    rows={1}
                  />
                </div>
                <button 
                  onClick={handleChat} 
                  disabled={chatLoading || (!chatInput.trim() && !chatImage)} 
                  className="bg-primary hover:bg-primary/90 disabled:bg-primary/20 disabled:text-primary/40 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 shrink-0 flex items-center gap-2"
                >
                  إرسال <Zap className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'form' && (
            <div className="space-y-6">
              <SpotlightCard className="bg-primary/5 border border-primary/20 rounded-3xl p-6 shadow-lg" spotlightColor="rgba(115, 17, 212, 0.2)">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/20 rounded-xl text-primary"><Activity className="w-6 h-6" /></div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">محلل الأداء الحركي</h3>
                    <p className="text-primary/70 leading-relaxed">قم برفع صورة (أو لقطة شاشة من فيديو) لتمرينك، وسيقوم الذكاء الاصطناعي بتحليل وضعية جسمك واكتشاف الأخطاء الشائعة لتقليل خطر الإصابة.</p>
                  </div>
                </div>
              </SpotlightCard>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <label className="block">
                    <span className="text-primary/80 font-medium mb-2 block">اسم التمرين (اختياري)</span>
                    <input 
                      type="text" 
                      value={formExercise} 
                      onChange={e => setFormExercise(e.target.value)}
                      placeholder="مثال: سكوات، ديدليفت، بنش برس..."
                      className="w-full bg-black/20 border border-primary/20 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary transition-colors shadow-inner"
                    />
                  </label>

                  <div className="border-2 border-dashed border-primary/30 rounded-3xl p-8 text-center hover:border-primary hover:bg-primary/5 transition-all relative overflow-hidden group min-h-[250px] flex items-center justify-center">
                    {formImage ? (
                      <div className="relative z-10 w-full flex flex-col items-center">
                        <img src={formImage.url} alt="Exercise Form" className="max-h-64 rounded-2xl shadow-2xl border border-white/10" />
                        <button onClick={() => setFormImage(null)} className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110">إزالة</button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-6 relative z-10 w-full">
                        <div className="flex flex-wrap justify-center gap-8 w-full">
                          <button onClick={() => startCamera('form')} className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-primary/10 transition-colors group/btn flex-1 min-w-[120px]">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover/btn:scale-110 group-hover/btn:bg-primary group-hover/btn:text-white transition-all shadow-inner border border-primary/20">
                              <Camera className="w-8 h-8" />
                            </div>
                            <span className="text-white font-bold block">فتح الكاميرا</span>
                          </button>

                          <div className="hidden sm:block w-px bg-primary/20"></div>

                          <label className="cursor-pointer flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-primary/10 transition-colors group/btn flex-1 min-w-[120px]">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover/btn:scale-110 group-hover/btn:bg-primary group-hover/btn:text-white transition-all shadow-inner border border-primary/20">
                              <Upload className="w-8 h-8" />
                            </div>
                            <span className="text-white font-bold block">رفع ملف</span>
                            <input type="file" accept="image/*,video/mp4" className="hidden" onChange={(e) => handleImageUpload(e, setFormImage)} />
                          </label>
                        </div>
                        <span className="text-primary/60 text-sm block mt-2">يدعم التقاط حي مباشر أو رفع JPG/PNG</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>

                  <button 
                    onClick={handleFormAnalysis} 
                    disabled={formLoading || !formImage} 
                    className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 disabled:from-primary/20 disabled:to-primary/20 disabled:text-primary/40 text-white px-6 py-5 rounded-2xl font-bold transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-3 text-lg"
                  >
                    {formLoading ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> جاري التحليل الميكانيكي...</> : <><Activity className="w-6 h-6" /> بدء التحليل</>}
                  </button>
                </div>

                <div className="bg-black/20 border border-primary/10 rounded-3xl p-8 min-h-[400px] shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                    <Search className="w-6 h-6 text-primary" /> تقرير الأداء
                  </h3>
                  {formAnalysis ? (
                    <div className="text-slate-300 whitespace-pre-wrap leading-relaxed relative z-10 bg-white/5 p-6 rounded-2xl border border-white/5">
                      {formAnalysis}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-primary/30 space-y-6 relative z-10">
                      <div className="relative">
                        <PlayCircle className="w-24 h-24" />
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                      </div>
                      <p className="text-lg text-center max-w-xs">التقرير سيظهر هنا بعد تحليل الصورة.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'meals' && (
            <div className="space-y-6">
              <SpotlightCard className="bg-[#00fcca]/5 border border-[#00fcca]/20 rounded-3xl p-6 shadow-lg" spotlightColor="rgba(0, 252, 202, 0.15)">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#00fcca]/20 rounded-xl text-[#00fcca]"><Utensils className="w-6 h-6" /></div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">مبتكر الوجبات الذكي</h3>
                    <p className="text-[#00fcca]/70 leading-relaxed">التقط صورة لمكونات ثلاجتك، وسيقوم الذكاء الاصطناعي بابتكار وصفات صحية ولذيذة تتناسب مع أهدافك.</p>
                  </div>
                </div>
              </SpotlightCard>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-[#00fcca]/30 rounded-3xl p-8 text-center hover:border-[#00fcca] hover:bg-[#00fcca]/5 transition-all relative overflow-hidden group min-h-[250px] flex items-center justify-center">
                    {fridgeImage ? (
                      <div className="relative z-10 w-full flex flex-col items-center">
                        <img src={fridgeImage.url} alt="Fridge Ingredients" className="max-h-64 rounded-2xl shadow-2xl border border-white/10" />
                        <button onClick={() => setFridgeImage(null)} className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110">إزالة</button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-6 relative z-10 w-full">
                        <div className="flex flex-wrap justify-center gap-8 w-full">
                          <button onClick={() => startCamera('meals')} className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-[#00fcca]/10 transition-colors group/btn flex-1 min-w-[120px]">
                            <div className="w-16 h-16 bg-[#00fcca]/10 rounded-full flex items-center justify-center text-[#00fcca] group-hover/btn:scale-110 group-hover/btn:bg-[#00fcca] group-hover/btn:text-slate-900 transition-all shadow-inner border border-[#00fcca]/20">
                              <Camera className="w-8 h-8" />
                            </div>
                            <span className="text-white font-bold block">فتح الكاميرا</span>
                          </button>

                          <div className="hidden sm:block w-px bg-[#00fcca]/20"></div>

                          <label className="cursor-pointer flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-[#00fcca]/10 transition-colors group/btn flex-1 min-w-[120px]">
                            <div className="w-16 h-16 bg-[#00fcca]/10 rounded-full flex items-center justify-center text-[#00fcca] group-hover/btn:scale-110 group-hover/btn:bg-[#00fcca] group-hover/btn:text-slate-900 transition-all shadow-inner border border-[#00fcca]/20">
                              <Upload className="w-8 h-8" />
                            </div>
                            <span className="text-white font-bold block">رفع ملف</span>
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setFridgeImage)} />
                          </label>
                        </div>
                        <span className="text-[#00fcca]/60 text-sm block mt-2">أو صورة لداخل الثلاجة بالكامل</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00fcca]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>

                  <label className="block">
                    <span className="text-[#00fcca]/80 font-medium mb-2 block">تفضيلات إضافية (اختياري)</span>
                    <textarea 
                      value={mealPreferences} 
                      onChange={e => setMealPreferences(e.target.value)}
                      placeholder="مثال: أريد وجبة عالية البروتين بدون منتجات ألبان..."
                      className="w-full bg-black/20 border border-[#00fcca]/20 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#00fcca] min-h-[120px] resize-none shadow-inner"
                    />
                  </label>

                  <button 
                    onClick={handleMealGeneration} 
                    disabled={mealLoading || (!fridgeImage && !mealPreferences.trim())} 
                    className="w-full bg-gradient-to-r from-[#00fcca] to-teal-500 hover:from-[#00fcca]/90 hover:to-teal-500/90 text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-5 rounded-2xl font-bold transition-all shadow-lg shadow-[#00fcca]/25 flex items-center justify-center gap-3 text-lg"
                  >
                    {mealLoading ? <><div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div> جاري الابتكار...</> : <><Utensils className="w-6 h-6" /> ابتكار الوصفات</>}
                  </button>
                </div>

                <div className="bg-black/20 border border-[#00fcca]/10 rounded-3xl p-8 min-h-[400px] shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#00fcca]/10 blur-[100px] rounded-full pointer-events-none"></div>
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                    <Utensils className="w-6 h-6 text-[#00fcca]" /> الوصفات المقترحة
                  </h3>
                  {mealPlan ? (
                    <div className="text-slate-300 whitespace-pre-wrap leading-relaxed relative z-10 bg-white/5 p-6 rounded-2xl border border-white/5">
                      {mealPlan}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-[#00fcca]/30 space-y-6 relative z-10">
                      <div className="relative">
                        <Utensils className="w-24 h-24" />
                        <div className="absolute inset-0 bg-[#00fcca]/20 blur-xl rounded-full"></div>
                      </div>
                      <p className="text-lg text-center max-w-xs">الوصفات ستظهر هنا بمجرد رفع الصورة.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tts' && (
            <div className="space-y-8 max-w-3xl mx-auto">
              <SpotlightCard className="bg-[#e08dff]/5 border border-[#e08dff]/20 rounded-3xl p-6 shadow-lg text-center" spotlightColor="rgba(224, 141, 255, 0.15)">
                <div className="inline-flex p-4 bg-[#e08dff]/20 rounded-full text-[#e08dff] mb-4"><Mic className="w-8 h-8" /></div>
                <h3 className="text-2xl font-bold text-white mb-2">المساعد الصوتي</h3>
                <p className="text-[#e08dff]/70 text-lg">حول أي نص أو مقال رياضي إلى مقطع صوتي نقي لتستمع إليه أثناء تمرينك.</p>
              </SpotlightCard>

              <div className="space-y-6">
                <textarea 
                  value={ttsText} 
                  onChange={e => setTtsText(e.target.value)}
                  placeholder="أدخل النص هنا للبدء في التحويل..."
                  className="w-full bg-black/20 border border-[#e08dff]/20 rounded-3xl px-6 py-5 text-white focus:outline-none focus:border-[#e08dff] focus:ring-1 focus:ring-[#e08dff] min-h-[200px] resize-none shadow-inner text-lg leading-relaxed"
                />
              </div>

              <div className="flex gap-4">
                {isPlaying ? (
                  <button 
                    onClick={stopTTS} 
                    className="w-full bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/30 px-6 py-5 rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center gap-3 text-xl"
                  >
                    <div className="w-4 h-4 bg-current rounded-sm animate-pulse"></div> إيقاف الاستماع
                  </button>
                ) : (
                  <button 
                    onClick={handleTTS} 
                    disabled={!ttsText.trim()} 
                    className="w-full bg-gradient-to-r from-[#e08dff] to-purple-500 hover:opacity-90 disabled:opacity-50 text-white px-6 py-5 rounded-2xl font-bold transition-all shadow-lg shadow-[#e08dff]/25 flex items-center justify-center gap-3 text-xl"
                  >
                    <PlayCircle className="w-7 h-7" /> استماع للنص
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </FadeContent>
    </>
  );
}
