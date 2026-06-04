import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, BrainCircuit, Target, Send, User, RotateCcw, Image as ImageIcon, History, CheckCircle2, Activity } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Message = {
  id: string;
  sender: 'user' | 'ai';
  text: string;
};

type Goal = {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'failed';
  date: string;
  metric: string;
};

const INITIAL_MESSAGES: Message[] = [
  { id: '1', sender: 'ai', text: 'مرحباً! التقط صورة لأدائك وسأقوم بتحليل زوايا الجسم وتقديم النصائح اللازمة.' }
];

const AI_RESPONSES = [
  "أرى أن استقامة ظهرك جيدة جداً في هذه الصورة، لكن حاول إبقاء مستوى الحوض منخفضاً قليلاً.",
  "زاوية الركبة ممتازة وتصل إلى 90 درجة، هذا سيقلل الضغط على المفاصل.",
  "يبدو أن هناك ميلاً طفيفاً في الأكتاف، حاول شد عضلات البطن لضمان ثبات الجذع.",
  "أداء رائع! استمر على نفس الوضعية لضمان أفضل نتيجة بأقل جهد."
];

export default function KineticComparison() {
  const [activeTab, setActiveTab] = useState<'chat' | 'goals'>('chat');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [goalsHistory, setGoalsHistory] = useState<Goal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize camera
  useEffect(() => {
    const startCamera = async () => {
      if (activeTab === 'chat' && !capturedImage) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Camera error:", err);
        }
      }
    };
    
    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [capturedImage, activeTab]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, activeTab]);

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      setCapturedImage(canvas.toDataURL('image/jpeg', 0.9));
      
      // Stop camera
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      // Add auto AI message
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: 'ai',
          text: 'تم التقاط الصورة بنجاح! جاري تحليل الأبعاد... كيف يمكنني مساعدتك بخصوص هذه الوضعية؟'
        }]);
      }, 500);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setMessages(INITIAL_MESSAGES);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg: Message = { id: Date.now().toString(), sender: 'user', text: inputValue };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking and replying
    setTimeout(() => {
      const randomResponse = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'ai',
        text: capturedImage ? randomResponse : "الرجاء التقاط صورة أولاً لأتمكن من تحليل الأداء بشكل دقيق."
      }]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleAddGoal = () => {
    if (!selectedGoal) return;
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: selectedGoal,
      status: 'in-progress',
      date: new Date().toISOString().split('T')[0],
      metric: 'قياس جديد'
    };
    setGoalsHistory([newGoal, ...goalsHistory]);
    setSelectedGoal('');
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden text-right" dir="rtl" style={{ fontFamily: 'var(--font-body)' }}>
      
      {/* Top Navigation Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('chat')}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all duration-300",
            activeTab === 'chat' 
              ? "bg-purple-500 text-white shadow-lg shadow-purple-500/20" 
              : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
          )}
        >
          <BrainCircuit className="w-5 h-5" />
          مساعد الأداء الذكي (AI)
        </button>
        <button
          onClick={() => setActiveTab('goals')}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all duration-300",
            activeTab === 'goals' 
              ? "bg-purple-500 text-white shadow-lg shadow-purple-500/20" 
              : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
          )}
        >
          <Target className="w-5 h-5" />
          سجل الأهداف
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'chat' && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0"
          >
            {/* Left Column - Camera / Photo (Takes 7 cols) */}
            <div className="col-span-1 lg:col-span-7 flex flex-col h-[50vh] lg:h-auto">
              <div className="glass rounded-3xl p-2 flex-1 relative overflow-hidden border border-white/10 flex flex-col justify-center items-center bg-black/50">
                
                {!capturedImage ? (
                  <>
                    <video 
                      ref={videoRef}
                      autoPlay 
                      playsInline 
                      muted 
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    
                    {/* Camera UI Overlay */}
                    <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-white/20 rounded-2xl m-4"></div>
                    <div className="absolute top-8 right-8 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-white font-bold text-sm flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                      الكاميرا جاهزة
                    </div>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                      <button 
                        onClick={capturePhoto}
                        className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border-4 border-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-2xl"
                        title="التقاط صورة للأداء"
                      >
                        <div className="w-12 h-12 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center">
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <img 
                      src={capturedImage} 
                      alt="الصورة الملتقطة" 
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    
                    {/* Photo Overlay */}
                    <div className="absolute top-8 right-8 bg-purple-600/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-white font-bold text-sm flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      تم التقاط الأداء
                    </div>

                    <button 
                      onClick={retakePhoto}
                      className="absolute bottom-8 right-8 bg-black/70 hover:bg-black/90 backdrop-blur-md text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all border border-white/20"
                    >
                      <RotateCcw className="w-4 h-4" />
                      إعادة التصوير
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Right Column - AI Chat (Takes 5 cols) */}
            <div className="col-span-1 lg:col-span-5 flex flex-col bg-zinc-950/80 rounded-3xl border border-white/10 overflow-hidden relative h-[50vh] lg:h-auto">
              
              {/* Chat Header */}
              <div className="bg-white/5 border-b border-white/10 p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center relative">
                  <BrainCircuit className="w-4 h-4 text-purple-400" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500 border border-zinc-950"></div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">المدرب الذكي (Helmy AI)</h3>
                  <p className="text-[10px] text-green-400">متصل الآن - جاهز لتحليل أدائك</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex max-w-[90%]",
                        msg.sender === 'user' ? "mr-auto flex-row-reverse" : "ml-auto"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-auto mx-2",
                        msg.sender === 'user' ? "bg-zinc-800" : "bg-purple-600/30 border border-purple-500/50"
                      )}>
                        {msg.sender === 'user' ? <User className="w-4 h-4 text-zinc-300" /> : <BrainCircuit className="w-4 h-4 text-purple-400" />}
                      </div>
                      <div className={cn(
                        "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                        msg.sender === 'user' 
                          ? "bg-purple-600 text-white rounded-br-none" 
                          : "bg-white/10 text-zinc-200 rounded-bl-none border border-white/5"
                      )}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex max-w-[85%] ml-auto">
                      <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center shrink-0 mt-auto mx-2">
                        <BrainCircuit className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="bg-white/10 p-4 rounded-2xl rounded-bl-none border border-white/5 flex gap-1 items-center">
                        <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-3 bg-black/40 border-t border-white/10 mt-auto">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={capturedImage ? "اكتب سؤالك هنا... (مثال: هل ظهري مستقيم؟)" : "التقط صورة أولاً لبدء المحادثة..."}
                    disabled={!capturedImage && messages.length <= 1}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-4 pl-12 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping || (!capturedImage && messages.length <= 1)}
                    className="absolute left-2 w-8 h-8 rounded-lg bg-purple-600 hover:bg-purple-500 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {activeTab === 'goals' && (
          <motion.div
            key="goals"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col gap-6 min-h-0"
          >
            {/* Goal Setter Input */}
            <div className="bg-zinc-950/80 rounded-3xl p-6 border border-white/10">
              <h4 className="font-bold text-white mb-3">إضافة هدف أداء جديد</h4>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={selectedGoal}
                  onChange={(e) => setSelectedGoal(e.target.value)}
                  placeholder="مثال: الحفاظ على زاوية ركبة 90 درجة أثناء القرفصاء..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button 
                  onClick={handleAddGoal}
                  disabled={!selectedGoal.trim()}
                  className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors"
                >
                  إضافة الهدف
                </button>
              </div>
            </div>

            {/* Goals List */}
            <div className="flex-1 overflow-y-auto glass rounded-3xl p-6 border border-white/10 custom-scrollbar">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>سجل أهداف الأداء</h2>
                  <p className="text-zinc-400 text-sm">تتبع تطورك وتصحيحات التقنية عبر الزمن</p>
                </div>
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  <History className="w-6 h-6 text-white/50" />
                </div>
              </div>

              <div className="space-y-4">
                {goalsHistory.map((goal) => (
                  <div key={goal.id} className="bg-zinc-950/50 hover:bg-zinc-900/80 transition-colors rounded-2xl p-5 border border-white/5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between group">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                        goal.status === 'completed' ? "bg-green-500/20 border-green-500/30" :
                        goal.status === 'in-progress' ? "bg-amber-500/20 border-amber-500/30" :
                        "bg-red-500/20 border-red-500/30"
                      )}>
                        {goal.status === 'completed' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> :
                         goal.status === 'in-progress' ? <Activity className="w-5 h-5 text-amber-500" /> :
                         <Target className="w-5 h-5 text-red-500" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg">{goal.title}</h4>
                        <div className="flex items-center gap-3 mt-1 text-xs">
                          <span className="text-zinc-500">{goal.date}</span>
                          <div className="w-1 h-1 rounded-full bg-zinc-700"></div>
                          <span className={cn(
                            "font-bold",
                            goal.status === 'completed' ? "text-green-400" :
                            goal.status === 'in-progress' ? "text-amber-400" :
                            "text-red-400"
                          )}>
                            {goal.status === 'completed' ? 'مكتمل' : goal.status === 'in-progress' ? 'قيد التحسين' : 'لم يكتمل'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {goalsHistory.length === 0 && (
                  <div className="text-center py-12 text-zinc-500">
                    <Target className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>لا توجد أهداف مسجلة حالياً. قم بإضافة هدف جديد من الأعلى.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
