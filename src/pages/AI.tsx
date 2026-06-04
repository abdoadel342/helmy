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
    <div className="flex flex-col h-[100dvh] bg-[#131314] text-[#e3e3e3] font-sans selection:bg-primary/30">
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

      {/* Minimal Header (Gemini Style) */}
      <header className="flex items-center justify-between p-3 border-b border-white/5 bg-[#1e1f20] sticky top-0 z-40 shrink-0">
        <div className="flex items-center gap-3">
          <BackButton />
          <h1 className="text-lg font-bold flex items-center gap-2 text-white">
             المدرب الذكي <span className="bg-gradient-to-l from-primary to-purple-400 text-transparent bg-clip-text text-sm ml-1">AI</span>
          </h1>
        </div>
        {/* Tabs inside a neat container */}
        <div className="hidden md:flex bg-white/5 rounded-full p-1 border border-white/5">
          <button onClick={() => setActiveTab('chat')} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTab === 'chat' ? 'bg-[#282a2c] text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>الدردشة</button>
          <button onClick={() => setActiveTab('form')} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTab === 'form' ? 'bg-[#282a2c] text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>تحليل الأداء</button>
          <button onClick={() => setActiveTab('meals')} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTab === 'meals' ? 'bg-[#00fcca]/20 text-[#00fcca] shadow-sm' : 'text-[#00fcca]/60 hover:text-[#00fcca] hover:bg-white/5'}`}>الوجبات</button>
          <button onClick={() => setActiveTab('tts')} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTab === 'tts' ? 'bg-[#e08dff]/20 text-[#e08dff] shadow-sm' : 'text-[#e08dff]/60 hover:text-[#e08dff] hover:bg-white/5'}`}>مساعد صوتي</button>
        </div>
      </header>

      {/* Mobile Tabs */}
      <div className="md:hidden flex gap-2 p-3 overflow-x-auto border-b border-white/5 bg-[#1e1f20] scrollbar-hide shrink-0">
          <button onClick={() => setActiveTab('chat')} className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${activeTab === 'chat' ? 'bg-[#282a2c] text-white border border-white/10' : 'bg-transparent text-slate-400 hover:text-white'}`}>الدردشة</button>
          <button onClick={() => setActiveTab('form')} className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${activeTab === 'form' ? 'bg-[#282a2c] text-white border border-white/10' : 'bg-transparent text-slate-400 hover:text-white'}`}>الأداء</button>
          <button onClick={() => setActiveTab('meals')} className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${activeTab === 'meals' ? 'bg-[#00fcca]/10 text-[#00fcca] border border-[#00fcca]/20' : 'bg-transparent text-[#00fcca]/60 hover:text-[#00fcca]'}`}>الوجبات</button>
          <button onClick={() => setActiveTab('tts')} className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${activeTab === 'tts' ? 'bg-[#e08dff]/10 text-[#e08dff] border border-[#e08dff]/20' : 'bg-transparent text-[#e08dff]/60 hover:text-[#e08dff]'}`}>الصوت</button>
      </div>

      <div className="flex-1 overflow-hidden relative flex flex-col bg-[#131314]">
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto relative">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 custom-scrollbar flex flex-col gap-6">
               {chatHistory.length === 0 ? (
                 <div className="flex-1 flex flex-col items-center justify-center text-center px-4 animate-in fade-in duration-700">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-purple-600/20 text-primary rounded-full flex items-center justify-center mb-6 shadow-lg border border-primary/20">
                      <Zap className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-semibold text-white mb-3">كيف يمكنني مساعدتك اليوم؟</h2>
                    <p className="text-[#a8c7fa] opacity-80 max-w-md">أنا المدرب الذكي، هنا لمساعدتك في تصميم التدريبات، تحسين أدائك، وتنظيم وجباتك.</p>
                 </div>
               ) : (
                 <div className="flex flex-col gap-8 pb-10">
                   {chatHistory.map((msg, i) => (
                     <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                       {msg.role === 'user' ? (
                         <div className="max-w-[85%] md:max-w-[75%] rounded-3xl rounded-tr-sm px-5 py-3 bg-[#333537] text-[#e3e3e3] text-base leading-relaxed">
                           {msg.image && <img src={msg.image} alt="Uploaded" className="max-w-xs rounded-xl mb-3 object-cover" />}
                           <div className="whitespace-pre-wrap">{msg.text}</div>
                         </div>
                       ) : (
                         <div className="flex gap-4 w-full">
                           <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 shrink-0 flex items-center justify-center shadow-md">
                             <Zap className="w-4 h-4 text-white" />
                           </div>
                           <div className="flex-1 text-[#e3e3e3] text-base leading-relaxed pt-1">
                             <div className="whitespace-pre-wrap prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-[#1e1f20] prose-pre:border prose-pre:border-white/10">{msg.text}</div>
                           </div>
                         </div>
                       )}
                     </div>
                   ))}
                   {chatLoading && (
                     <div className="flex gap-4 w-full animate-in fade-in">
                       <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 shrink-0 flex items-center justify-center shadow-md">
                         <Zap className="w-4 h-4 text-white" />
                       </div>
                       <div className="flex items-center gap-1.5 pt-2">
                         <div className="w-2 h-2 rounded-full bg-primary/80 animate-bounce"></div>
                         <div className="w-2 h-2 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                         <div className="w-2 h-2 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                       </div>
                     </div>
                   )}
                 </div>
               )}
            </div>

            {/* Gemini-style Input Bar */}
            <div className="px-4 pb-6 pt-2 bg-gradient-to-t from-[#131314] via-[#131314] to-transparent shrink-0">
               <div className="max-w-3xl mx-auto flex flex-col gap-3">
                 {/* Tool Chips */}
                 <div className="flex flex-wrap gap-2 px-1">
                   <label className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${useSearch ? 'bg-[#004a77] text-[#c2e7ff]' : 'bg-[#1e1f20] text-[#a8c7fa] hover:bg-[#282a2c]'}`}>
                     <input type="checkbox" checked={useSearch} onChange={e => {setUseSearch(e.target.checked); setUseMaps(false); setUseFastMode(false);}} className="hidden" />
                     <Search className="w-3.5 h-3.5" /> البحث في الويب
                   </label>
                   <label className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${useMaps ? 'bg-[#004a77] text-[#c2e7ff]' : 'bg-[#1e1f20] text-[#a8c7fa] hover:bg-[#282a2c]'}`}>
                     <input type="checkbox" checked={useMaps} onChange={e => {setUseMaps(e.target.checked); setUseSearch(false); setUseFastMode(false);}} className="hidden" />
                     <MapPin className="w-3.5 h-3.5" /> الأماكن القريبة
                   </label>
                   <label className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${useFastMode ? 'bg-[#004a77] text-[#c2e7ff]' : 'bg-[#1e1f20] text-[#a8c7fa] hover:bg-[#282a2c]'}`}>
                     <input type="checkbox" checked={useFastMode} onChange={e => {setUseFastMode(e.target.checked); setUseSearch(false); setUseMaps(false);}} className="hidden" />
                     <Zap className="w-3.5 h-3.5" /> أقصى سرعة
                   </label>
                 </div>

                 {/* Input Pill */}
                 <div className="bg-[#1e1f20] rounded-3xl flex flex-col shadow-sm focus-within:bg-[#282a2c] transition-colors relative">
                    {chatImage && (
                      <div className="px-4 pt-4 pb-2">
                        <div className="relative w-fit group">
                          <img src={`data:${chatImage.mimeType};base64,${chatImage.data}`} alt="Attached" className="h-16 w-16 object-cover rounded-xl border border-white/5" />
                          <button onClick={() => setChatImage(null)} className="absolute -top-2 -right-2 bg-red-500/90 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-xs">close</span>
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-end gap-1 px-2 py-2">
                      <label className="p-3 text-slate-400 hover:text-[#e3e3e3] hover:bg-white/5 rounded-full cursor-pointer transition-colors shrink-0 tooltip" title="رفع صورة">
                        <Upload className="w-5 h-5" />
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setChatImage)} />
                      </label>
                      <button onClick={() => startCamera('chat')} className="p-3 text-slate-400 hover:text-[#e3e3e3] hover:bg-white/5 rounded-full transition-colors shrink-0 tooltip" title="التقاط صورة">
                        <Camera className="w-5 h-5" />
                      </button>
                      
                      <textarea 
                        value={chatInput} 
                        onChange={e => {
                          setChatInput(e.target.value);
                          e.target.style.height = 'auto';
                          e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
                        }}
                        onKeyDown={e => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleChat();
                          }
                        }}
                        placeholder="أدخل رسالتك هنا..."
                        className="flex-1 bg-transparent text-[#e3e3e3] placeholder-[#8e918f] py-3 px-3 resize-none focus:outline-none max-h-[200px] overflow-y-auto text-base"
                        rows={1}
                        style={{ height: 'auto', minHeight: '48px' }}
                      />
                      
                      <button 
                        onClick={handleChat} 
                        disabled={chatLoading || (!chatInput.trim() && !chatImage)} 
                        className={`p-3 mx-1 mb-1 rounded-full shrink-0 transition-colors flex items-center justify-center ${chatInput.trim() || chatImage ? 'text-[#1e1f20] bg-[#a8c7fa] hover:bg-[#d3e3fd]' : 'text-[#8e918f] bg-transparent'}`}
                      >
                        <span className="material-symbols-outlined font-variation-settings-'FILL' 1" style={{ fontSize: '24px', transform: 'rotate(-90deg) translateX(2px)' }}>send</span>
                      </button>
                    </div>
                 </div>
                 
                 <div className="text-center mt-1">
                   <span className="text-xs text-[#8e918f]">قد يعرض الذكاء الاصطناعي معلومات غير دقيقة، يرجى مراجعتها.</span>
                 </div>
               </div>
            </div>
          </div>
        )}

        {/* Other Tabs Content */}
        {activeTab !== 'chat' && (
          <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar">
            <div className="max-w-4xl mx-auto space-y-8 pb-12">
              {activeTab === 'form' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <SpotlightCard className="bg-[#1e1f20] border border-white/5 rounded-3xl p-6 shadow-lg" spotlightColor="rgba(115, 17, 212, 0.15)">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl text-primary"><Activity className="w-6 h-6" /></div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">محلل الأداء الحركي</h3>
                        <p className="text-slate-400 leading-relaxed text-sm">قم برفع صورة لتمرينك، وسيقوم الذكاء الاصطناعي بتحليل وضعية جسمك لاكتشاف الأخطاء الشائعة.</p>
                      </div>
                    </div>
                  </SpotlightCard>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <input 
                        type="text" 
                        value={formExercise} 
                        onChange={e => setFormExercise(e.target.value)}
                        placeholder="اسم التمرين (مثال: سكوات، ديدليفت)..."
                        className="w-full bg-[#1e1f20] border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors shadow-sm"
                      />

                      <div className="border border-dashed border-white/10 bg-[#1e1f20]/50 rounded-3xl p-8 text-center hover:border-primary/30 transition-all relative min-h-[200px] flex items-center justify-center">
                        {formImage ? (
                          <div className="relative z-10 w-full flex flex-col items-center">
                            <img src={formImage.url} alt="Exercise Form" className="max-h-64 rounded-2xl shadow-lg border border-white/5" />
                            <button onClick={() => setFormImage(null)} className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg">
                               <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-4 w-full">
                            <div className="flex gap-4 w-full">
                              <button onClick={() => startCamera('form')} className="flex flex-col items-center justify-center gap-2 bg-white/5 hover:bg-white/10 p-4 rounded-2xl flex-1 transition-colors text-slate-300">
                                <Camera className="w-8 h-8 text-primary/80" />
                                <span className="text-sm font-semibold">الكاميرا</span>
                              </button>
                              <label className="flex flex-col items-center justify-center gap-2 bg-white/5 hover:bg-white/10 p-4 rounded-2xl flex-1 transition-colors cursor-pointer text-slate-300">
                                <Upload className="w-8 h-8 text-primary/80" />
                                <span className="text-sm font-semibold">رفع ملف</span>
                                <input type="file" accept="image/*,video/mp4" className="hidden" onChange={(e) => handleImageUpload(e, setFormImage)} />
                              </label>
                            </div>
                          </div>
                        )}
                      </div>

                      <button 
                        onClick={handleFormAnalysis} 
                        disabled={formLoading || !formImage} 
                        className="w-full bg-[#1e1f20] hover:bg-primary/20 text-white disabled:opacity-50 border border-white/5 hover:border-primary/50 px-6 py-4 rounded-2xl font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                      >
                        {formLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Activity className="w-5 h-5 text-primary" />}
                        {formLoading ? 'جاري التحليل...' : 'بدء التحليل'}
                      </button>
                    </div>

                    <div className="bg-[#1e1f20] border border-white/5 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col">
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 shrink-0">
                        <Search className="w-5 h-5 text-primary" /> تقرير الأداء
                      </h3>
                      <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {formAnalysis ? (
                          <div className="text-[#e3e3e3] whitespace-pre-wrap leading-relaxed text-sm prose prose-invert">
                            {formAnalysis}
                          </div>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4 py-10">
                            <Activity className="w-16 h-16 opacity-20" />
                            <p className="text-center text-sm">التقرير سيظهر هنا بعد تحليل الصورة.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'meals' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <SpotlightCard className="bg-[#1e1f20] border border-white/5 rounded-3xl p-6 shadow-lg" spotlightColor="rgba(0, 252, 202, 0.1)">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#00fcca]/10 rounded-xl text-[#00fcca]"><Utensils className="w-6 h-6" /></div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">مبتكر الوجبات الذكي</h3>
                        <p className="text-slate-400 leading-relaxed text-sm">التقط صورة لثلاجتك، وسيبتكر الذكاء الاصطناعي وصفات صحية تتناسب مع أهدافك.</p>
                      </div>
                    </div>
                  </SpotlightCard>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="border border-dashed border-white/10 bg-[#1e1f20]/50 rounded-3xl p-8 text-center hover:border-[#00fcca]/30 transition-all relative min-h-[200px] flex items-center justify-center">
                        {fridgeImage ? (
                          <div className="relative z-10 w-full flex flex-col items-center">
                            <img src={fridgeImage.url} alt="Fridge Ingredients" className="max-h-64 rounded-2xl shadow-lg border border-white/5" />
                            <button onClick={() => setFridgeImage(null)} className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg">
                               <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-4 w-full">
                            <div className="flex gap-4 w-full">
                              <button onClick={() => startCamera('meals')} className="flex flex-col items-center justify-center gap-2 bg-white/5 hover:bg-white/10 p-4 rounded-2xl flex-1 transition-colors text-slate-300">
                                <Camera className="w-8 h-8 text-[#00fcca]/80" />
                                <span className="text-sm font-semibold">الكاميرا</span>
                              </button>
                              <label className="flex flex-col items-center justify-center gap-2 bg-white/5 hover:bg-white/10 p-4 rounded-2xl flex-1 transition-colors cursor-pointer text-slate-300">
                                <Upload className="w-8 h-8 text-[#00fcca]/80" />
                                <span className="text-sm font-semibold">رفع ملف</span>
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setFridgeImage)} />
                              </label>
                            </div>
                          </div>
                        )}
                      </div>

                      <textarea 
                        value={mealPreferences} 
                        onChange={e => setMealPreferences(e.target.value)}
                        placeholder="تفضيلات إضافية (اختياري)..."
                        className="w-full bg-[#1e1f20] border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#00fcca]/50 min-h-[100px] resize-none shadow-sm text-sm"
                      />

                      <button 
                        onClick={handleMealGeneration} 
                        disabled={mealLoading || (!fridgeImage && !mealPreferences.trim())} 
                        className="w-full bg-[#1e1f20] hover:bg-[#00fcca]/20 text-white disabled:opacity-50 border border-white/5 hover:border-[#00fcca]/50 px-6 py-4 rounded-2xl font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                      >
                        {mealLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Utensils className="w-5 h-5 text-[#00fcca]" />}
                        {mealLoading ? 'جاري الابتكار...' : 'ابتكار الوصفات'}
                      </button>
                    </div>

                    <div className="bg-[#1e1f20] border border-white/5 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col">
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 shrink-0">
                        <Utensils className="w-5 h-5 text-[#00fcca]" /> الوصفات المقترحة
                      </h3>
                      <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {mealPlan ? (
                          <div className="text-[#e3e3e3] whitespace-pre-wrap leading-relaxed text-sm prose prose-invert">
                            {mealPlan}
                          </div>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4 py-10">
                            <Utensils className="w-16 h-16 opacity-20" />
                            <p className="text-center text-sm">الوصفات ستظهر هنا بمجرد رفع الصورة.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'tts' && (
                <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <SpotlightCard className="bg-[#1e1f20] border border-white/5 rounded-3xl p-6 shadow-lg text-center" spotlightColor="rgba(224, 141, 255, 0.1)">
                    <div className="inline-flex p-4 bg-[#e08dff]/10 rounded-full text-[#e08dff] mb-4"><Mic className="w-8 h-8" /></div>
                    <h3 className="text-xl font-bold text-white mb-2">المساعد الصوتي</h3>
                    <p className="text-slate-400 text-sm">استمع إلى المقالات والنصوص بدلاً من قراءتها.</p>
                  </SpotlightCard>

                  <textarea 
                    value={ttsText} 
                    onChange={e => setTtsText(e.target.value)}
                    placeholder="أدخل النص هنا..."
                    className="w-full bg-[#1e1f20] border border-white/5 rounded-3xl px-6 py-5 text-[#e3e3e3] focus:outline-none focus:border-[#e08dff]/50 min-h-[250px] resize-none shadow-sm text-base leading-relaxed"
                  />

                  <div className="flex gap-4">
                    {isPlaying ? (
                      <button 
                        onClick={stopTTS} 
                        className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-6 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                      >
                        <div className="w-3 h-3 bg-current rounded-sm animate-pulse"></div> إيقاف
                      </button>
                    ) : (
                      <button 
                        onClick={handleTTS} 
                        disabled={!ttsText.trim()} 
                        className="w-full bg-[#1e1f20] hover:bg-[#e08dff]/20 text-white disabled:opacity-50 border border-white/5 hover:border-[#e08dff]/50 px-6 py-4 rounded-2xl font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                      >
                        <PlayCircle className="w-5 h-5 text-[#e08dff]" /> استماع
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
