import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Target, ShieldAlert, FileText, Camera, Search } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import KineticComparison from '../components/KineticComparison';
import { PERFORMANCE_TESTS, type PerformanceTest } from '../data/performanceTests';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



export default function Telemetry() {
  const [viewMode, setViewMode] = useState<'simulated' | 'comparison'>('simulated');
  const [selectedTest, setSelectedTest] = useState<PerformanceTest | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('الكل');

  const categories = ['الكل', 'الصدر', 'الظهر', 'الكتف', 'الأرجل', 'الذراعين', 'البطن والجذع'];

  const filteredTests = PERFORMANCE_TESTS.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          test.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'الكل' || test.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const startAiTest = () => {
    setViewMode('comparison');
    setSelectedTest(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full h-[85vh] rounded-3xl overflow-hidden bg-zinc-950 text-white font-sans border border-purple-900/30 transition-all duration-500 flex flex-col"
      dir="rtl"
    >
      {/* Header Controls */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2 py-2 rounded-full border border-white/10 shadow-xl">
        <button 
          onClick={() => { setViewMode('simulated'); setSelectedTest(null); }} 
          className={cn("px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2", viewMode === 'simulated' ? "bg-purple-500 text-white" : "text-zinc-400 hover:text-white")}
        >
          <FileText className="w-4 h-4" />
          دليل اختبارات الأداء
        </button>

        <button 
          onClick={() => setViewMode('comparison')} 
          className={cn("px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2", viewMode === 'comparison' ? "bg-purple-500 text-white" : "text-zinc-400 hover:text-white")}
        >
          <Camera className="w-4 h-4" />
          مقارنة الأداء والأهداف
        </button>
      </div>

      {viewMode === 'comparison' ? (
        <div className="w-full h-full p-6 pt-24 bg-zinc-950/90 z-10">
          <KineticComparison />
        </div>
      ) : (
        <div className="w-full h-full pt-24 pb-8 px-8 overflow-y-auto custom-scrollbar">
          
          <AnimatePresence mode="wait">
            {!selectedTest ? (
              <motion.div
                key="catalog"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-6xl mx-auto"
              >
                <div className="mb-8 text-center max-w-2xl mx-auto">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">مكتبة اختبارات الأداء البدني</h2>
                  <p className="text-zinc-400 mb-6">اختر الاختبار لقراءة الشرح الفني والتوجيهات قبل تنفيذ الأداء أمام المدرب الذكي.</p>
                  
                  <div className="relative mb-6">
                    <input 
                      type="text" 
                      placeholder="ابحث عن تمرين (مثال: سكوات، ظهر، متقدم...)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-12 pl-4 text-white focus:outline-none focus:border-purple-500 transition-colors shadow-inner"
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                  </div>

                  {/* Category Tabs */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border",
                          activeCategory === cat 
                            ? "bg-purple-500 border-purple-400 text-white shadow-lg shadow-purple-500/25" 
                            : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {filteredTests.map((test) => (
                    <motion.div 
                      key={test.id}
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedTest(test)}
                      className="group cursor-pointer glass bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all shadow-lg flex flex-col"
                    >
                      <div className="h-48 relative overflow-hidden">
                        <img src={test.image} alt={test.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-3 right-3 bg-purple-500/80 backdrop-blur text-white text-[10px] px-2 py-1 rounded-md font-bold">
                          {test.category}
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{test.title}</h3>
                        <p className="text-sm text-zinc-400 line-clamp-2 mb-4 flex-1">{test.description}</p>
                        <div className="flex items-center text-purple-400 text-sm font-bold group-hover:text-purple-300 transition-colors">
                          قراءة الشرح
                          <ChevronRight className="w-4 h-4 mr-1" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredTests.length === 0 && (
                  <div className="text-center py-20">
                    <Search className="w-12 h-12 text-zinc-600 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl text-zinc-400 font-bold mb-2">لا توجد نتائج</h3>
                    <p className="text-sm text-zinc-500">لم نتمكن من العثور على تمرين يطابق "{searchQuery}"</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="max-w-4xl mx-auto"
              >
                <button 
                  onClick={() => setSelectedTest(null)}
                  className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                  العودة للقائمة
                </button>

                <div className="glass bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
                  {/* Image Side */}
                  <div className="md:w-2/5 h-64 md:h-auto relative">
                    <img src={selectedTest.image} alt={selectedTest.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-black/80 to-transparent flex flex-col justify-end p-6">
                      <span className="text-purple-400 font-bold text-sm mb-1">{selectedTest.category}</span>
                      <h2 className="text-2xl font-bold text-white">{selectedTest.title}</h2>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="p-8 md:w-3/5 flex flex-col">
                    <p className="text-zinc-300 leading-relaxed mb-8">{selectedTest.description}</p>

                    <div className="space-y-6 flex-1">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Target className="w-5 h-5 text-purple-400" />
                          <h4 className="text-lg font-bold text-white">خطوات التنفيذ الصحيحة</h4>
                        </div>
                        <ul className="space-y-2">
                          {selectedTest.executionSteps.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-zinc-400 bg-black/20 p-3 rounded-xl border border-white/5">
                              <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">{idx + 1}</span>
                              <span className="leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <ShieldAlert className="w-5 h-5 text-red-400" />
                          <h4 className="text-lg font-bold text-white">تحذيرات السلامة والإصابات</h4>
                        </div>
                        <ul className="space-y-2">
                          {selectedTest.safetyWarnings.map((warning, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-red-200/80 bg-red-950/30 p-3 rounded-xl border border-red-500/20">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></div>
                              <span className="leading-relaxed">{warning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button 
                      onClick={startAiTest}
                      className="mt-8 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-purple-500/25"
                    >
                      <Camera className="w-5 h-5" />
                      جرب الاختبار الآن بالذكاء الاصطناعي
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
