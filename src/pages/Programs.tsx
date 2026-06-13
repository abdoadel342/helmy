import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, ArrowRight, ArrowLeft, Clock, Dumbbell, Repeat, PlayCircle, Target, Calendar, BarChart, Info, Activity, CheckCircle2 } from 'lucide-react';
import { doc, setDoc, getDocs, collection, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../AuthContext';
import { useLanguage } from '../LanguageContext';

import { useNavigate } from 'react-router-dom';
import GradientText from '../components/react-bits/GradientText';
import { BackButton } from '../components/BackButton';
import { FadeContent } from '../components/react-bits/FadeContent';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { ShinyText } from '../components/react-bits/ShinyText';
import { StarBorder } from '../components/react-bits/StarBorder';

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

const staticStretches = [
  {
    id: 'ss_hamstring',
    name: 'إطالة عضلات الفخذ الخلفية',
    description: 'تمدد عميق للجزء الخلفي من الساق.',
    defaultTime: 30,
    muscle: 'العضلات الخلفية للفخذ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSXaBnrKP85NW2OCgvZpZF5ZEGopyj5uKx7oaQo4DOqqBkWcutT3Ib5JjWHWIS59IBr9Z8Dc44po5CN-kqwrkEluQJML5nGsit9YJedc2y8_vuLd0nJzGz5ffHpw233-JoiwiFtsEqYXtRSYQxLgR0nrxxcc6O-4c434jWbFP8ioI6PkVn7Ach2Mhr1rWFUxu06ipsxFbizemqnWFe_vLNIyJoW0Ac7fO1oc7LwjLd1fTLRypQdIKVJFs5kBdZbJRcIMLOUhgmm7A2'
  },
  {
    id: 'ss_chest',
    name: 'إطالة عضلة الصدر',
    description: 'فتح القفص الصدري وتحسين وضعية الوقوف.',
    defaultTime: 20,
    muscle: 'الصدر',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3bHh-uUXHmFwLTBXmAXedqUCOmd8_1d7j5nfEXU-VC0UfYGk_jm5mAMrApkuV3TgGLpA1pr04EjGnkqxMlB3aCkPANQeyZvI1-Pu5wc6okDL7Qpon5k4YqinyqDEdC8cLSzCXtc9ZDpor6p-ntf0MdgC7UYziGEK-SY5JT4jLe0OtxKmJM8EJ8L554gcY3tdaUjWI7hXFYAT_Hdm6WpNUD1NcYldZAzFMeXPS61LlNfSTafFglTdb_jAk4IF1HpCl9cYiXSeeUahb'
  },
  {
    id: 'ss_hip_flexor',
    name: 'إطالة عضلات الحوض',
    description: 'تخفيف الضغط الناتج عن الجلوس.',
    defaultTime: 45,
    muscle: 'الحوض',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_zxQoTbFKBIWlGG_60ZAStnZLyr_Chmwm3hUiC5MhpxLlC84XblIo3jscnveB0RhyK2sxFmnmyk8SFeUU0wqRccnNNRCHkzzhCUQ9qukcZqRXSIeIRMCZTZomFtBg1XOAQC--x4vaRrg9Dq-ANOGrgx7sINEHS7sMutzoZf89A4XAL0P_zW_7hM5dH3HRK77qMAPOEd9foEZJHtwq_LS2bCyrIx07I2OPW_eMSOV2lrTfU45_kc53I8Ceo-MT9kcM5zMctJ6f7Yh4'
  },
  {
    id: 'ss_neck',
    name: 'إطالة عضلات الرقبة',
    description: 'تحرير التشنجات في الجزء العلوي.',
    defaultTime: 15,
    muscle: 'الرقبة',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBm4RTjaFvL3pR7KqyEB2cLdniNTV2bh8Y0Y5dVwQ7-h_l-uYqFRionnvMO5s14wsqU5Y8352ELjUbnokKEfdPMBcb1LOfgjjRDB6o-YngVXgB7vO5LfysDPOZzgxGYiLYt34b9dJ3ydN7yPwq-jh2S8iYncg0xKRWK-_G8DSWrliBCWkTWLx2O2eq46gm4whzQF9YZVBHlBFv5j0-vkn5DoFOw7mgGlmFHp242dGy3yYmpekK5AFzLvfLjbrCYLYvEhAZffGqbOzKo'
  },
  {
    id: 'ss_back',
    name: 'إطالة عضلات الظهر',
    description: 'تمديد الفقرات وتقوية مرونة الظهر.',
    defaultTime: 30,
    muscle: 'الظهر',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3AK2qSR1z-WO6lDmN2zZkeHcV7ajJGey4xPF3homlUHg9dNmkLcxv6J7eM_EM7H5gD0qT3cjSW6-XFvVwx_fpkO053VDoBc4OTTl_6gnT6N7HXirrSeKcKemsJtAIzIZ-et360lgz8KsrgyvZFCVbcv4ln9ZUlvZoGQK-IRmBNTVsFfdMAxKdnwFx3U4mAVENLQwzmT7SwNXReWlXq9IOAdkDu4eTCU750p7yJI_97Amv2n-hD0KHaqkP8xn8jQ1Y1qgpX9sbsgIw'
  },
  {
    id: 'ss_calf',
    name: 'إطالة عضلات السمانة',
    description: 'تفريغ التعب من الساقين.',
    defaultTime: 25,
    muscle: 'السمانة',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlUq8riIw7o0AQpF1r247_gj3F21pCdIzaUvLjMONOnk_nNBcBOPyUYcr5L3C4qHke7uELOKNa851GLCoSyGIMw39UiAKwm06hDEboOWWFyp_-PxuI76W4PTb6OnF9jsh5b4cEGiizYA7t6QhYQzSxjBUjZWCla-act-_6icVmGFvZI8wMWyBfOhlhik2hRqo6aFVldFcvU7I7MfjBsVPDx_pDKOdk5cOEihKCIwxQW6fO_45mK1KdKx5wRRbSDSgHy48Od4Xw_xVM'
  },
  {
    id: 'ss_shoulder',
    name: 'إطالة عضلات الكتف',
    description: 'تحسين حركة المفصل والأكتاف.',
    defaultTime: 20,
    muscle: 'الكتف',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDY1Z1vEnqROUGecWuwwyQwemeiHNfB6kDJ8uYzASlmBpx_wSGE5mQdFAZYcxy0Uq0wM9RF3p7CdBohofOv7p1gJiOrezNcpak7nfczoCjfJrdPeo1bBG8pG6wLGHtYMw19qIYUCD-uqexrfcKrDg81hRCTSckZkpqdTze7afiqxm5H8pa_DHPMPN0WgQkoVFKC0y8zZPxfZKRuJpZXqtrjwHfV0-IPfM7ejmB50gXg-xj5MmoW0zvmUsOUREjuuvBTdmGjUFVOE_qq'
  },
  {
    id: 'ss_childs_pose',
    name: 'وضعية الطفل',
    description: 'تمرين مريح جداً للجسم بالكامل.',
    defaultTime: 60,
    muscle: 'الجسم بالكامل',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqgk_cjjTaleiVdwHCCJit1Go5GisIwPe2kwDQwUjpPRweiVi0NGkhF3NZGRLB7gR44EDQ-MP3ZLxlYr7maCooDyU2MzTQVU-nLNGRRuUgQI7hhLY00X9DqLmKNSleMZgLQdBO7TzW8gMfy2plB2B4CfCfHB9KjBa5HnKhv34YGE50l8a2CYpzuXQvkyXJCtRzkXnvDgr9IBGmp3Us2djetjOCv9ICVHJmgQ7tBdXOk-B2fK8tmOM-dcaU9zSSKKhI9we-GA0S6NDK'
  },
  {
    id: 'ss_cobra',
    name: 'إطالة الكوبرا',
    description: 'إطالة وتقوية مرونة الظهر الأمامية.',
    defaultTime: 30,
    muscle: 'الظهر والبطن',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaRbz2IjXwIXDwmiPHFE5bcHdMaoRhsKV2aTPOzAgYSUqZ0EEwZWhD9hAextkOMlCiVPyRwt43GfPx0iBc-WcsuEWJgIv4U9Z-DAHLeRFu1GeWc7qrpssWNo_T-opvNcXvzc36KEIIownlG3Q8IFMO1EHd43IImQIVLcyT9thSoa34Z9mBNE_V8ooUhvJCjGT_3Vtc-UApMWhP6MOB2h1sS0z-V3tW-Jv23KOsD3Am4Y-oHw7hyLxI9he8TKfVrEQbyKZbvWDZtqdA'
  },
  {
    id: 'ss_triceps',
    name: 'إطالة الترايسيبس',
    description: 'تخفيف الشد في الذراعين الخلفية.',
    defaultTime: 20,
    muscle: 'الذراعين (الترايسيبس)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1-J2-TYmNro-YpYm9FLjPPqFgs3dLP5LlPySRWNxveS2hRNK9p3WpxzoU_jTHKlGOkxSaRFKinUnttj0DIG-r7Hr-FvuwL_5TEu9YGkKC0z8ygXn9EA0WfRcYOZx97U2KLAuTBATVQQetgFGN91tmzTmaGoTnoUTAh-p2sQShgTjYtTo9lM1jOY069DnHFXSB_XZjg394dOC-fILVVDpwlB-D7AdSOlqAGRSE0sYsnQRPKfLSRp6EaatABFxfkfPxT8_sWuNN9HlO'
  },
  {
    id: 'ss_oblique',
    name: 'إطالة عضلات الجذع',
    description: 'تمدد جانبي للجسم للحركة.',
    defaultTime: 30,
    muscle: 'الجذع',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4kiUzVlPuvo0TfZcBVup-0mGJNYwuWZQq20RMrVfSTs7YQG-3rqofOKbmaoTqk0FASmvtNkfrj7hOLiFUbG7eUMcnhlnvC6OKSUIeJ0WLLf_cnbNRKF494TLiwAP160p26iJBhMg8DBQGwOwZPw2kHC6siujJqW2tcGlleMKQNfx5jqMEYArHoEXc2BjEOJaZLV5wkYVHwJ9jdmfhGuNm-Z1HJEDcBCWBVQwofGr6jS6kY-vDKeBZoC5w6hfbqLtBiTPXxDlml1c0'
  },
  {
    id: 'ss_quadriceps',
    name: 'إطالة الفخذ الأمامية',
    description: 'تمرين أساسي بعد التمارين العنيفة.',
    defaultTime: 40,
    muscle: 'الفخذ الأمامية',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwEBayjTDQgRP_rjGmGaTP_sIrk4oVx3aJ_y7bfdabUqS7GmjjGTR_OK9QiVJh6sAEc-w3GNDfhliT-Dlpx-aVCPBqC6Kt3dEhSCN_dInET-vg37RCHNCW0TgdavaJl1RBiTcItwJ4wJnyVjfVaYpUWKuFSBjsaZvZu00EFkoQtwo2hXG1rRes4H5mKETlxgQ0VFnNRSDf9t8CS1CKf8D89iKBm8xctJBgedr4EyA3DpzeBeJC2xbudlkSaFgQ8hux-95nBuc1MGUL'
  }
];

export default function Programs() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [programs, setPrograms] = useState<Program[]>(programsData);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [activeWeekIndex, setActiveWeekIndex] = useState(0);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [completedDays, setCompletedDays] = useState<string[]>([]);
  const [isCompleting, setIsCompleting] = useState(false);
  const [activeModule, setActiveModule] = useState<string | null>(null);

  // Custom schedule exercises state
  const [customScheduleExercises, setCustomScheduleExercises] = useState([
    { id: '1', name: 'تمرين مخصص 1', duration: 5, muscle: 'الصدر', icon: 'fitness_center' },
    { id: '2', name: 'تمرين مخصص 2', duration: 5, muscle: 'الظهر', icon: 'exercise' }
  ]);

  // Post-workout exercises state
  const [postWorkoutExercises, setPostWorkoutExercises] = useState([
    { id: '1', name: 'إطالة أوتار الركبة', duration: 3, muscle: 'العضلات الخلفية للفخذ', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7c74GBAfLmlVbB6p-9-PY6JwL-JIL6fiHsLS_MbidyEqHH7lkjVhvklCiY_TQdKCVnFCF8fuZzf3iAV7hIccbn_TgOXKoik-6J85tun39Gwh-nuG9IZ38G2afpKDY_EGSm_vUltQf9s4n3OThJ5Kbgi2YZ9PY72rdCjBl2gwXBnilRpCWKf-nz-eiT6lzH_nXAQLsPVUlKnLulVAKDvoU2DrMSDoMM6p_4VwKDRDCkIcABrbHRsoweyqjm8g7nHhyiI4h5wi_BV1F' }
  ]);

  // Add exercise modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalTarget, setModalTarget] = useState<'custom' | 'post'>('custom');
  const [newExName, setNewExName] = useState('');
  const [newExDuration, setNewExDuration] = useState(5);
  const [newExMuscle, setNewExMuscle] = useState('');
  const [newExIcon, setNewExIcon] = useState('fitness_center');

  
  // Dynamic Stretching Interaction States
  const [dsIntensity, setDsIntensity] = useState(1);
  const [dsVolume, setDsVolume] = useState(3);
  const [dsRest, setDsRest] = useState(30);
  const [dsDuration, setDsDuration] = useState(15);
  const dsIntensities = ['منخفضة', 'متوسطة', 'عالية'];

  // Static Stretching Interaction States
  const [ssIntensity, setSsIntensity] = useState(1);
  const [ssVolume, setSsVolume] = useState(3);
  const [ssRest, setSsRest] = useState(15);
  const [ssDuration, setSsDuration] = useState(20);
  const ssIntensities = ['خفيفة', 'متوسطة', 'قوية'];

  // Custom stretch selection states
  const [selectedStaticExercises, setSelectedStaticExercises] = useState<string[]>([]);
  const [customStaticParams, setCustomStaticParams] = useState<Record<string, { sets: number; duration: number; rest: number }>>({});
  const [transferTarget, setTransferTarget] = useState<'post' | 'custom'>('post');

  // Interactive & Dynamic protocol state
  const defaultProtocol = [
    { sets: 3, reps: 5, label: 'الأسبوع 1', intensityLabel: 'منخفضة', intensityColor: 'emerald', exercises: 'Box Jumps, Squat Jumps, Med Ball Throws', goal: 'التكيف العصبي والتقني' },
    { sets: 4, reps: 5, label: 'الأسبوع 2', intensityLabel: 'متوسطة', intensityColor: 'yellow', exercises: '+ Broad Jumps, Lateral Bounds', goal: 'زيادة الحجم التدريبي' },
    { sets: 4, reps: 6, label: 'الأسبوع 3', intensityLabel: 'عالية', intensityColor: 'orange', exercises: '+ Depth Jumps, Hurdle Hops', goal: 'الحمل الأقصى (أسبوع الذروة)' },
    { sets: 2, reps: 4, label: 'الأسبوع 4', intensityLabel: 'تفريغ', intensityColor: 'blue', exercises: 'Box Jumps, Squat Jumps فقط', goal: 'الاستشفاء والتكيف الفائق' },
  ];
  const [protocol, setProtocol] = useState(defaultProtocol.map(p => ({ ...p })));

  const updateProtocol = (weekIdx: number, field: 'sets' | 'reps', delta: number) => {
    setProtocol(prev => prev.map((p, i) => {
      if (i !== weekIdx) return p;
      const newVal = p[field] + delta;
      if (newVal < 1 || newVal > 10) return p;
      return { ...p, [field]: newVal };
    }));
  };

  const addWeek = () => {
    setProtocol(prev => {
      if (prev.length >= 12) return prev; // Max 12 weeks
      const lastWeek = prev[prev.length - 1];
      const newWeekNumber = prev.length + 1;
      return [...prev, {
        ...lastWeek,
        label: `الأسبوع ${newWeekNumber}`,
        goal: 'استمرار التطوير',
        intensityLabel: 'محافظة',
        intensityColor: 'purple'
      }];
    });
  };

  const removeWeek = () => {
    setProtocol(prev => {
      if (prev.length <= 1) return prev; // Min 1 week
      return prev.slice(0, -1);
    });
  };

  const resetProtocol = () => setProtocol(defaultProtocol.map(p => ({ ...p })));

  const toggleStaticExercise = (id: string) => {
    if (selectedStaticExercises.includes(id)) {
      setSelectedStaticExercises(prev => prev.filter(x => x !== id));
    } else {
      setSelectedStaticExercises(prev => [...prev, id]);
      if (!customStaticParams[id]) {
        const stretch = staticStretches.find(s => s.id === id);
        setCustomStaticParams(prev => ({
          ...prev,
          [id]: {
            sets: ssVolume,
            duration: stretch ? stretch.defaultTime : 30,
            rest: ssRest
          }
        }));
      }
    }
  };

  const updateStaticParam = (id: string, field: 'sets' | 'duration' | 'rest', delta: number) => {
    setCustomStaticParams(prev => {
      const current = prev[id] || { sets: ssVolume, duration: 30, rest: ssRest };
      let newVal = current[field] + delta;
      if (field === 'sets') newVal = Math.max(1, Math.min(10, newVal));
      if (field === 'duration') newVal = Math.max(5, Math.min(300, newVal));
      if (field === 'rest') newVal = Math.max(0, Math.min(120, newVal));
      return {
        ...prev,
        [id]: {
          ...current,
          [field]: newVal
        }
      };
    });
  };

  const handleTransferToSchedule = () => {
    if (selectedStaticExercises.length === 0) {
      alert("يرجى اختيار تمرين واحد على الأقل أولاً.");
      return;
    }

    if (transferTarget === 'post') {
      const newItems = selectedStaticExercises.map(id => {
        const stretch = staticStretches.find(s => s.id === id);
        const params = customStaticParams[id] || { sets: ssVolume, duration: stretch ? stretch.defaultTime : 30, rest: ssRest };
        const totalSeconds = (params.sets * params.duration) + ((params.sets - 1) * params.rest);
        const durationMin = Math.max(1, Math.round(totalSeconds / 60));
        return {
          id: `ss-${id}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          name: stretch?.name || 'إطالة مخصصة',
          duration: durationMin,
          muscle: stretch?.muscle || 'كامل الجسم',
          image: stretch?.image || ''
        };
      });

      setPostWorkoutExercises(prev => {
        const existingNames = prev.map(item => item.name);
        const uniqueNewItems = newItems.filter(item => !existingNames.includes(item.name));
        return [...prev, ...uniqueNewItems];
      });
    } else {
      const newItems = selectedStaticExercises.map(id => {
        const stretch = staticStretches.find(s => s.id === id);
        const params = customStaticParams[id] || { sets: ssVolume, duration: stretch ? stretch.defaultTime : 30, rest: ssRest };
        const totalSeconds = (params.sets * params.duration) + ((params.sets - 1) * params.rest);
        const durationMin = Math.max(1, Math.round(totalSeconds / 60));
        return {
          id: `custom-ss-${id}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          name: stretch?.name || 'إطالة مخصصة',
          duration: durationMin,
          muscle: stretch?.muscle || 'كامل الجسم',
          icon: 'self_improvement'
        };
      });

      setCustomScheduleExercises(prev => {
        const existingNames = prev.map(item => item.name);
        const uniqueNewItems = newItems.filter(item => !existingNames.includes(item.name));
        return [...prev, ...uniqueNewItems];
      });
    }

    setSelectedStaticExercises([]);
    setActiveModule('schedule');
    alert("تم نقل التمارين المحددة إلى جدول تمارين اليوم بنجاح!");
  };

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

  const handleCompleteWorkout = async (programId: string, weekNumber: number, dayOrder: number, dayTitle: string) => {
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
        program_name: selectedProgram?.program_name || '',
        day_title: dayTitle,
        week_number: weekNumber,
        day_order: dayOrder,
        workout_type: 'program',
        completed_at: serverTimestamp()
      });
      
      setCompletedDays(prev => [...prev, workoutId]);
      alert(`تم تسجيل وحفظ التمرين بنجاح: ${dayTitle}`);
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

    if (activeModule === 'dynamic') {
      return (
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           className="pb-32 px-4 md:px-8 space-y-8 max-w-5xl mx-auto mt-6 text-[#ffffff]"
        >
          {/* TopAppBar */}
          <header className="bg-[#0e0e0e]/70 backdrop-blur-xl border border-white/5 bg-gradient-to-b from-[#0e0e0e] to-transparent top-0 sticky z-50 flex items-center justify-between px-6 py-4 w-full rounded-2xl mb-8">
            <div className="flex items-center gap-4">
              <button onClick={() => setActiveModule(null)} className="text-[#e08dff] hover:bg-white/5 transition-colors p-2 rounded-full active:scale-95 duration-200">
                <span className="material-symbols-outlined text-2xl">{language === 'ar' ? 'arrow_forward' : 'arrow_back'}</span>
              </button>
              <h1 className="font-display font-bold tracking-tight text-lg">
                <GradientText colors={["#5227FF","#FF9FFC","#B19EEF"]} animationSpeed={8} showBorder={false}>
                  مخطط تمارين الإطالة الديناميكية
                </GradientText>
              </h1>
            </div>
          </header>

          {/* Section 1: Definition */}
          <section className="relative overflow-hidden rounded-[32px] bg-[#131313] p-8">
             <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
               <img className="w-full h-full object-cover" alt="Abstract dynamic purple energy patterns" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfCR95Daap8XQQ1cTrzVLHRqIdTAjLWXdMU_BQr5LeN3knVGO0q0HkGlExfCBclzU4H50FELrf4nrGGDNkLdxsv18yJ07m1Uj_m7XcsEJs_G83VdzE1QGyClca3tkPkEjA_pq2X7nO3JZlcochW10q-gwVN1RDdSU1FEK3PkTzc_-fRxZkARdMEsEBJGsw4swV42vQIIGsAQLXcwdsSShWG1dLs_rgTgXgfxeKJfeZnC6oiQseDjhcXYX6C9SUrlHOmq63Akl0S2hz"/>
             </div>
             <div className="relative z-10 space-y-4">
               <span className="font-display text-[#00fcca] tracking-widest uppercase text-xs">تعريف البرنامج</span>
               <h2 className="font-display text-3xl md:text-5xl font-extrabold leading-tight text-white max-w-2xl">
                   الإطالة <span className="text-[#e08dff] italic">الديناميكية</span> هي مفتاح الأداء الرياضي المتفوق.
               </h2>
               <p className="text-[#adaaaa] font-display leading-relaxed max-w-xl text-lg">
                   تعتمد الإطالة الديناميكية على حركات نشطة ترفع درجة حرارة الجسم وتزيد من نطاق الحركة المفصلية، مما يقلل مخاطر الإصابة ويهيئ العضلات للانقباض القوي والمفاجئ.
               </p>
             </div>
          </section>

          {/* Controls */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#201f1f] rounded-3xl p-5 flex flex-col justify-between border border-white/5 transition-all hover:border-[#e08dff]/20">
              <span className="font-display text-[#adaaaa] text-[10px] uppercase tracking-widest mb-4">الشدة</span>
              <div className="flex items-center justify-between bg-[#000000] rounded-full p-2">
                <button onClick={() => setDsIntensity(Math.max(0, dsIntensity - 1))} className="w-10 h-10 rounded-full bg-[#262626] flex items-center justify-center text-[#e08dff] hover:bg-[#e08dff]/20 active:scale-90 transition-all">
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="font-display font-bold text-lg text-white">{dsIntensities[dsIntensity]}</span>
                <button onClick={() => setDsIntensity(Math.min(2, dsIntensity + 1))} className="w-10 h-10 rounded-full bg-[#e08dff] flex items-center justify-center text-[#4f006c] hover:bg-[#d160ff] active:scale-90 transition-all">
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>
            {/* Volume */}
            <div className="bg-[#201f1f] rounded-3xl p-5 flex flex-col justify-between border border-white/5 transition-all hover:border-[#e08dff]/20">
              <span className="font-display text-[#adaaaa] text-[10px] uppercase tracking-widest mb-4">الحجم</span>
              <div className="flex items-center justify-between bg-[#000000] rounded-full p-2">
                <button onClick={() => setDsVolume(Math.max(1, dsVolume - 1))} className="w-10 h-10 rounded-full bg-[#262626] flex items-center justify-center text-[#e08dff] hover:bg-[#e08dff]/20 active:scale-90 transition-all">
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="font-display font-bold text-lg text-white">{dsVolume} جولات</span>
                <button onClick={() => setDsVolume(Math.min(10, dsVolume + 1))} className="w-10 h-10 rounded-full bg-[#e08dff] flex items-center justify-center text-[#4f006c] hover:bg-[#d160ff] active:scale-90 transition-all">
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>
            {/* Rest */}
            <div className="bg-[#201f1f] rounded-3xl p-5 flex flex-col justify-between border border-white/5 transition-all hover:border-[#e08dff]/20">
              <span className="font-display text-[#adaaaa] text-[10px] uppercase tracking-widest mb-4">الراحة</span>
              <div className="flex items-center justify-between bg-[#000000] rounded-full p-2">
                <button onClick={() => setDsRest(Math.max(15, dsRest - 15))} className="w-10 h-10 rounded-full bg-[#262626] flex items-center justify-center text-[#e08dff] hover:bg-[#e08dff]/20 active:scale-90 transition-all">
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="font-display font-bold text-lg text-white">{dsRest} ثانية</span>
                <button onClick={() => setDsRest(Math.min(120, dsRest + 15))} className="w-10 h-10 rounded-full bg-[#e08dff] flex items-center justify-center text-[#4f006c] hover:bg-[#d160ff] active:scale-90 transition-all">
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>
            {/* Duration */}
            <div className="bg-[#201f1f] rounded-3xl p-5 flex flex-col justify-between border border-white/5 transition-all hover:border-[#e08dff]/20">
              <span className="font-display text-[#adaaaa] text-[10px] uppercase tracking-widest mb-4">فترة التمرين</span>
              <div className="flex items-center justify-between bg-[#000000] rounded-full p-2">
                <button onClick={() => setDsDuration(Math.max(5, dsDuration - 5))} className="w-10 h-10 rounded-full bg-[#262626] flex items-center justify-center text-[#e08dff] hover:bg-[#e08dff]/20 active:scale-90 transition-all">
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="font-display font-bold text-lg text-white">{dsDuration} دقيقة</span>
                <button onClick={() => setDsDuration(Math.min(60, dsDuration + 5))} className="w-10 h-10 rounded-full bg-[#e08dff] flex items-center justify-center text-[#4f006c] hover:bg-[#d160ff] active:scale-90 transition-all">
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>
          </section>

          {/* List of Exercises */}
          <section className="space-y-6">
            <div className="flex items-end justify-between px-2">
              <h3 className="font-display text-2xl font-bold text-white">قائمة التمارين <span className="text-[#00fcca]">(12)</span></h3>
              <span className="font-display text-[#adaaaa] text-sm">اسحب للعرض</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group relative bg-[#131313] rounded-[2rem] overflow-hidden p-1">
                <div className="h-48 rounded-[1.75rem] overflow-hidden relative">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Athlete performing leg swings dynamic stretch" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdXy7SrvAmFiHlBu3XOF2P2yrQP2J-j2tIia1EhlVfrJ6WVpYgbiyWzxTPK29kzyhnG07Yt1fZix38QkvwTEBW7DdbVndiuDG6WZf2Whsj1gklL5naN6bLD3lWSWOIowG1J-U6Y1QE8NY0oY2Iom0pngj5imcgU5y5TXDIYDIwMJdNBKgB1kuB_32xCfLz6z-JUga0spH7Py_MEFw-s5UHK0omb51nmKLXZSd-t8fBQmbEOkOeoBvqws0aBhWKva0C7TRq0VNVr7Qz"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 right-4 bg-[#e08dff] px-3 py-1 rounded-full text-[#4f006c] text-xs font-bold font-display">01</div>
                </div>
                <div className="p-6">
                  <h4 className="font-display text-xl font-bold text-white mb-2">أرجحة الأرجل</h4>
                  <p className="text-[#adaaaa] text-sm font-display">تحسين مرونة عضلات الفخذ الخلفية والوركين.</p>
                </div>
              </div>

              <div className="group relative bg-[#131313] rounded-[2rem] overflow-hidden p-1">
                 <div className="h-48 rounded-[1.75rem] overflow-hidden relative">
                   <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Person doing walking lunges" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVd8XIYFxf74zhNDlxFoTc_dtQou7oee5wwkU0TReP-GXWN6tNrUtLpy9qSoH208KDDR0ur2OWeM8ZOmxkMYPwf_QAiaw7B3uLR8AMK4TVAwpN7DhminSR3yf_Q1AHYwiCaVMTf-JuIrczLYrF3y7Boy82rw3Ux95OwPxoFJ3_5ekb3G9NRGr9K3kCqcdteYe344FyVpKsmhJqSZBbkq2MNZ72ItKsmRk732XQJcjOz0P6aTIEMYV6P_MHDYA5_59fpw5Q-HGELn3-"/>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                   <div className="absolute bottom-4 right-4 bg-[#e08dff] px-3 py-1 rounded-full text-[#4f006c] text-xs font-bold font-display">02</div>
                 </div>
                 <div className="p-6">
                   <h4 className="font-display text-xl font-bold text-white mb-2">طعنات المشي</h4>
                   <p className="text-[#adaaaa] text-sm font-display">تحميل ديناميكي لعضلات الأرجل وتثبيت التوازن.</p>
                 </div>
              </div>

              <div className="group relative bg-[#131313] rounded-[2rem] overflow-hidden p-1">
                 <div className="h-48 rounded-[1.75rem] overflow-hidden relative">
                   <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Shoulder rotation arm circles" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCkWrXR6AFxJbqr3wJOgU-yxqP2WvoseklWNc7Ob_7OZafMm1qhU0lWDDZz_KnHWLkjuQ8Ofy-W6makhad_pSqYvAjWfqYHip57vzHfjoPawu8jPkPPnfvrHK-s961kuRPSZsS5M8YtvNUIi8EjzfVw3R0XH4Mqi4jHuNpInzVdp-8lj7BWfBob_tAY4O-1pLqb1av3vLPnQRZ0ll940x2TllHpAePWPcpIotDaZSxDrecNkG2Mp8Xn8GskqLMoVIW1dpdDrPGXegv"/>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                   <div className="absolute bottom-4 right-4 bg-[#e08dff] px-3 py-1 rounded-full text-[#4f006c] text-xs font-bold font-display">03</div>
                 </div>
                 <div className="p-6">
                   <h4 className="font-display text-xl font-bold text-white mb-2">دوائر الأكتاف</h4>
                   <p className="text-[#adaaaa] text-sm font-display">فك التوتر في مفاصل الكتف وتحسين نطاق الحركة العلوي.</p>
                 </div>
              </div>

              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 <div className="flex items-center gap-4 p-4 bg-[#1a1919] rounded-2xl border border-white/5">
                   <div className="w-12 h-12 rounded-xl bg-[#262626] flex items-center justify-center font-display font-bold text-[#00fcca]">04</div>
                   <div>
                     <p className="font-display font-bold text-white">تمرين القطة والجمل</p>
                     <span className="text-[#adaaaa] text-xs font-display">تحريك العمود الفقري</span>
                   </div>
                 </div>
                 <div className="flex items-center gap-4 p-4 bg-[#1a1919] rounded-2xl border border-white/5">
                   <div className="w-12 h-12 rounded-xl bg-[#262626] flex items-center justify-center font-display font-bold text-[#00fcca]">05</div>
                   <div>
                     <p className="font-display font-bold text-white">لمس أصابع القدمين</p>
                     <span className="text-[#adaaaa] text-xs font-display">إطالة عضلات الظهر والفخذ</span>
                   </div>
                 </div>
                 <div className="flex items-center gap-4 p-4 bg-[#1a1919] rounded-2xl border border-white/5">
                   <div className="w-12 h-12 rounded-xl bg-[#262626] flex items-center justify-center font-display font-bold text-[#00fcca]">06</div>
                   <div>
                     <p className="font-display font-bold text-white">الدوران الجذعي</p>
                     <span className="text-[#adaaaa] text-xs font-display">مرونة عضلات البطن الجانبية</span>
                   </div>
                 </div>
                 <div className="flex items-center gap-4 p-4 bg-[#1a1919] rounded-2xl border border-white/5">
                   <div className="w-12 h-12 rounded-xl bg-[#262626] flex items-center justify-center font-display font-bold text-[#00fcca]">07</div>
                   <div>
                     <p className="font-display font-bold text-white">ركلات المؤخرة</p>
                     <span className="text-[#adaaaa] text-xs font-display">رفع نبضات القلب</span>
                   </div>
                 </div>
                 <div className="flex items-center gap-4 p-4 bg-[#1a1919] rounded-2xl border border-white/5">
                   <div className="w-12 h-12 rounded-xl bg-[#262626] flex items-center justify-center font-display font-bold text-[#00fcca]">08</div>
                   <div>
                     <p className="font-display font-bold text-white">رفع الركب</p>
                     <span className="text-[#adaaaa] text-xs font-display">تنشيط الجزء السفلي</span>
                   </div>
                 </div>
                 <div className="flex items-center gap-4 p-4 bg-[#1a1919] rounded-2xl border border-white/5">
                   <div className="w-12 h-12 rounded-xl bg-[#262626] flex items-center justify-center font-display font-bold text-[#00fcca]">09</div>
                   <div>
                     <p className="font-display font-bold text-white">تمرين العنكبوت</p>
                     <span className="text-[#adaaaa] text-xs font-display">فتح الحوض الكامل</span>
                   </div>
                 </div>
                 <div className="flex items-center gap-4 p-4 bg-[#1a1919] rounded-2xl border border-white/5">
                   <div className="w-12 h-12 rounded-xl bg-[#262626] flex items-center justify-center font-display font-bold text-[#00fcca]">10</div>
                   <div>
                     <p className="font-display font-bold text-white">المشي على اليدين</p>
                     <span className="text-[#adaaaa] text-xs font-display">قوة الكتف وتمدد الجسم</span>
                   </div>
                 </div>
                 <div className="flex items-center gap-4 p-4 bg-[#1a1919] rounded-2xl border border-white/5">
                   <div className="w-12 h-12 rounded-xl bg-[#262626] flex items-center justify-center font-display font-bold text-[#00fcca]">11</div>
                   <div>
                     <p className="font-display font-bold text-white">فتح الحوض</p>
                     <span className="text-[#adaaaa] text-xs font-display">تحسين حركة مفصل الورك</span>
                   </div>
                 </div>
                 <div className="flex items-center gap-4 p-4 bg-[#1a1919] rounded-2xl border border-white/5">
                   <div className="w-12 h-12 rounded-xl bg-[#262626] flex items-center justify-center font-display font-bold text-[#00fcca]">12</div>
                   <div>
                     <p className="font-display font-bold text-white">أرجحة الذراعين</p>
                     <span className="text-[#adaaaa] text-xs font-display">تحرير عضلات الصدر والظهر</span>
                   </div>
                 </div>
              </div>
            </div>
          </section>

          {/* Dynamic CTA */}
          <div className="bg-gradient-to-r from-[#e08dff] to-[#bc00fb] p-6 rounded-[2rem] flex items-center justify-between shadow-[0_0_30px_rgba(224,141,255,0.2)]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </div>
              <div>
                <h5 className="font-display font-bold text-white text-lg">ابدأ الإحماء الآن</h5>
                <p className="text-white/80 text-xs">{dsDuration} دقيقة • المستوى {dsIntensities[dsIntensity]}</p>
              </div>
            </div>
            <button 
              onClick={() => handleCompleteWorkout('prog_003', activeWeekIndex + 1, activeDayIndex + 1, `إحماء ديناميكي (${dsIntensities[dsIntensity]})`)}
              disabled={isCompleting}
              className="bg-white text-[#e08dff] px-6 py-3 rounded-full font-display font-bold active:scale-95 transition-transform"
            >
              {isCompleting ? 'جاري...' : 'بدء'}
            </button>
          </div>
        </motion.div>
      );
    }

    if (activeModule === 'static') {
      return (
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           className="pb-32 px-4 md:px-8 space-y-8 max-w-5xl mx-auto mt-6 text-[#ffffff]"
        >
          {/* TopAppBar */}
          <header className="bg-[#0e0e0e]/70 backdrop-blur-xl border border-white/5 bg-gradient-to-b from-[#0e0e0e] to-transparent top-0 sticky z-50 flex items-center justify-between px-6 py-4 w-full rounded-2xl mb-8">
            <div className="flex items-center gap-4">
              <button onClick={() => setActiveModule(null)} className="text-[#e08dff] hover:bg-white/5 transition-colors p-2 rounded-full active:scale-95 duration-200">
                <span className="material-symbols-outlined text-2xl">{language === 'ar' ? 'arrow_forward' : 'arrow_back'}</span>
              </button>
              <h1 className="font-display font-bold tracking-tight text-lg">
                <GradientText colors={["#5227FF","#FF9FFC","#B19EEF"]} animationSpeed={8} showBorder={false}>
                  مخطط تمارين المرونة الثابتة
                </GradientText>
              </h1>
            </div>
          </header>

          {/* Definition Section */}
          <section className="relative overflow-hidden rounded-[32px] p-8 bg-[#131313]">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br from-[#e08dff] to-[#bc00fb] opacity-20 blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-8 bg-gradient-to-br from-[#e08dff] to-[#bc00fb] rounded-full"></span>
                <h2 className="font-display text-2xl font-extrabold text-white">الإطالة الثابتة</h2>
              </div>
              <p className="text-[#adaaaa] leading-relaxed font-display pr-2">
                هي تمرين يتضمن البقاء في وضعية تمدد معينة لمدة تتراوح بين <span className="text-[#00fcca] font-bold">15-60 ثانية</span>. تهدف بشكل أساسي إلى تحسين المدى الحركي للمفاصل، وتقليل التوتر العضلي، وتعزيز الاسترخاء العام للجسم.
              </p>
            </div>
          </section>

          {/* Interactive Controls */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Control 1: Intensity */}
            <div className="flex flex-col justify-between p-5 bg-[#201f1f] rounded-3xl border border-white/5 transition-all hover:border-[#e08dff]/20">
              <div className="flex flex-col mb-4">
                <span className="text-[#adaaaa] font-display text-[10px] uppercase tracking-widest">المؤشر</span>
                <span className="font-display font-bold text-lg text-white">الشدة</span>
              </div>
              <div className="flex items-center justify-between bg-[#000000] p-2 rounded-full">
                <button onClick={() => setSsIntensity(Math.max(0, ssIntensity - 1))} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#262626] text-[#e08dff] active:scale-95 duration-100 hover:bg-[#e08dff]/20">
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="font-display font-bold text-xl text-[#00fcca]">{ssIntensities[ssIntensity]}</span>
                <button onClick={() => setSsIntensity(Math.min(2, ssIntensity + 1))} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#e08dff] text-[#4f006c] active:scale-95 duration-100 hover:bg-[#d160ff]">
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>

            {/* Control 2: Volume */}
            <div className="flex flex-col justify-between p-5 bg-[#201f1f] rounded-3xl border border-white/5 transition-all hover:border-[#e08dff]/20">
              <div className="flex flex-col mb-4">
                <span className="text-[#adaaaa] font-display text-[10px] uppercase tracking-widest">التكرار</span>
                <span className="font-display font-bold text-lg text-white">الحجم</span>
              </div>
              <div className="flex items-center justify-between bg-[#000000] p-2 rounded-full">
                <button onClick={() => setSsVolume(Math.max(1, ssVolume - 1))} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#262626] text-[#e08dff] active:scale-95 duration-100 hover:bg-[#e08dff]/20">
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="font-display font-bold text-xl text-[#00fcca]">{ssVolume} جولات</span>
                <button onClick={() => setSsVolume(Math.min(10, ssVolume + 1))} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#e08dff] text-[#4f006c] active:scale-95 duration-100 hover:bg-[#d160ff]">
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>

            {/* Control 3: Rest */}
            <div className="flex flex-col justify-between p-5 bg-[#201f1f] rounded-3xl border border-white/5 transition-all hover:border-[#e08dff]/20">
              <div className="flex flex-col mb-4">
                <span className="text-[#adaaaa] font-display text-[10px] uppercase tracking-widest">التعافي</span>
                <span className="font-display font-bold text-lg text-white">الراحة</span>
              </div>
              <div className="flex items-center justify-between bg-[#000000] p-2 rounded-full">
                <button onClick={() => setSsRest(Math.max(15, ssRest - 15))} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#262626] text-[#e08dff] active:scale-95 duration-100 hover:bg-[#e08dff]/20">
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="font-display font-bold text-xl text-[#00fcca]">{ssRest} ثانية</span>
                <button onClick={() => setSsRest(Math.min(120, ssRest + 15))} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#e08dff] text-[#4f006c] active:scale-95 duration-100 hover:bg-[#d160ff]">
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>

            {/* Control 4: Duration */}
            <div className="flex flex-col justify-between p-5 bg-[#201f1f] rounded-3xl border border-white/5 transition-all hover:border-[#e08dff]/20">
              <div className="flex flex-col mb-4">
                <span className="text-[#adaaaa] font-display text-[10px] uppercase tracking-widest">الوقت</span>
                <span className="font-display font-bold text-lg text-white">فترة التمرين</span>
              </div>
              <div className="flex items-center justify-between bg-[#000000] p-2 rounded-full">
                <button onClick={() => setSsDuration(Math.max(5, ssDuration - 5))} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#262626] text-[#e08dff] active:scale-95 duration-100 hover:bg-[#e08dff]/20">
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="font-display font-bold text-xl text-[#00fcca]">{ssDuration} دقيقة</span>
                <button onClick={() => setSsDuration(Math.min(60, ssDuration + 5))} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#e08dff] text-[#4f006c] active:scale-95 duration-100 hover:bg-[#d160ff]">
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>
          </section>

          {/* Exercises List */}
          <section className="space-y-6">
            <div className="flex items-end justify-between pr-4 border-r-4 border-[#00fcca]">
              <div>
                <h3 className="font-display text-xl font-bold text-white">تمارين المرونة المقترحة</h3>
                <p className="text-xs text-[#adaaaa] mt-1">اختر التمارين التي ترغب في إضافتها إلى جدولك اليومي</p>
              </div>
              <span className="font-display text-[#e08dff] text-xs font-bold bg-[#e08dff]/10 px-3 py-1.5 rounded-full">
                تم اختيار {selectedStaticExercises.length} من {staticStretches.length}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {staticStretches.map((stretch) => {
                const isSelected = selectedStaticExercises.includes(stretch.id);
                return (
                  <div 
                    key={stretch.id}
                    onClick={() => toggleStaticExercise(stretch.id)}
                    className={`flex items-center gap-4 bg-[#131313] p-3 rounded-3xl transition-all duration-300 cursor-pointer relative group border ${
                      isSelected 
                        ? 'border-[#BF00FF] bg-[#1a131f]/40 shadow-[0_0_15px_rgba(191,0,255,0.15)]' 
                        : 'border-white/5 hover:bg-[#201f1f] hover:border-white/10'
                    }`}
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 relative">
                      <img className="w-full h-full object-cover" alt={stretch.name} src={stretch.image}/>
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#BF00FF]/25 backdrop-blur-[2px] flex items-center justify-center transition-all duration-300">
                          <span className="material-symbols-outlined text-white text-3xl font-bold">check_circle</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display font-bold text-white group-hover:text-[#e08dff] transition-colors">{stretch.name}</h4>
                      <p className="text-[#adaaaa] text-xs mt-1 font-display leading-relaxed">{stretch.description}</p>
                      <span className="inline-block mt-2 bg-[#e08dff]/10 text-[#e08dff] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        {stretch.defaultTime} ثانية
                      </span>
                    </div>
                    
                    {!isSelected && (
                      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 p-1 rounded-full">
                        <span className="material-symbols-outlined text-white/50 text-sm">add</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Selected Exercises Schedule Table */}
          {selectedStaticExercises.length > 0 && (
            <section className="space-y-6 mt-8 animate-fade-in">
              <div className="flex items-center justify-between border-r-4 border-[#BF00FF] pr-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">جدول التمارين المخصصة</h3>
                  <p className="text-xs text-[#adaaaa] mt-1">اضبط الجولات ومدة الثبات وفترات الراحة لكل تمرين</p>
                </div>
                <button 
                  onClick={() => setSelectedStaticExercises([])}
                  className="text-xs text-[#ff6e84] hover:underline flex items-center gap-1 bg-[#ff6e84]/15 px-3 py-1.5 rounded-full transition-all"
                >
                  <span className="material-symbols-outlined text-sm">clear_all</span>
                  مسح الجدول
                </button>
              </div>
              
              <div className="bg-[#131313] rounded-3xl p-4 md:p-6 border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-right border-collapse">
                    <thead>
                      <tr className="border-b border-[#494847]/30 pb-4 text-[#adaaaa] font-display text-xs">
                        <th className="pb-3 pr-2 text-right">التمرين</th>
                        <th className="pb-3 text-center w-28 md:w-36">الجولات</th>
                        <th className="pb-3 text-center w-28 md:w-36">الثبات</th>
                        <th className="pb-3 text-center w-28 md:w-36">الراحة</th>
                        <th className="pb-3 text-center w-12"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#494847]/20">
                      {selectedStaticExercises.map((id) => {
                        const stretch = staticStretches.find(s => s.id === id);
                        if (!stretch) return null;
                        const params = customStaticParams[id] || { sets: ssVolume, duration: stretch.defaultTime, rest: ssRest };
                        
                        return (
                          <tr key={id} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="py-4 pr-2">
                              <div className="flex items-center gap-3">
                                <img className="w-10 h-10 rounded-lg object-cover shrink-0" alt={stretch.name} src={stretch.image}/>
                                <div>
                                  <p className="font-display font-semibold text-white text-sm md:text-base">{stretch.name}</p>
                                  <p className="font-display text-[10px] text-[#adaaaa] max-w-[200px] truncate">{stretch.description}</p>
                                </div>
                              </div>
                            </td>
                            
                            <td className="py-4 text-center">
                              <div className="inline-flex items-center justify-between bg-[#201f1f] rounded-full p-1 border border-white/5">
                                <button 
                                  onClick={() => updateStaticParam(id, 'sets', -1)}
                                  className="w-7 h-7 rounded-full bg-[#131313] hover:bg-zinc-800 text-[#e08dff] flex items-center justify-center active:scale-90 duration-200"
                                >
                                  <span className="material-symbols-outlined text-sm">remove</span>
                                </button>
                                <span className="font-display font-bold text-xs text-white px-2.5 min-w-[70px] text-center">{params.sets} جولات</span>
                                <button 
                                  onClick={() => updateStaticParam(id, 'sets', 1)}
                                  className="w-7 h-7 rounded-full bg-[#BF00FF] hover:bg-[#a600dd] text-white flex items-center justify-center active:scale-90 duration-200"
                                >
                                  <span className="material-symbols-outlined text-sm">add</span>
                                </button>
                              </div>
                            </td>
                            
                            <td className="py-4 text-center">
                              <div className="inline-flex items-center justify-between bg-[#201f1f] rounded-full p-1 border border-white/5">
                                <button 
                                  onClick={() => updateStaticParam(id, 'duration', -5)}
                                  className="w-7 h-7 rounded-full bg-[#131313] hover:bg-zinc-800 text-[#e08dff] flex items-center justify-center active:scale-90 duration-200"
                                >
                                  <span className="material-symbols-outlined text-sm">remove</span>
                                </button>
                                <span className="font-display font-bold text-xs text-white px-2.5 min-w-[50px] text-center">{params.duration} ث</span>
                                <button 
                                  onClick={() => updateStaticParam(id, 'duration', 5)}
                                  className="w-7 h-7 rounded-full bg-[#BF00FF] hover:bg-[#a600dd] text-white flex items-center justify-center active:scale-90 duration-200"
                                >
                                  <span className="material-symbols-outlined text-sm">add</span>
                                </button>
                              </div>
                            </td>
                            
                            <td className="py-4 text-center">
                              <div className="inline-flex items-center justify-between bg-[#201f1f] rounded-full p-1 border border-white/5">
                                <button 
                                  onClick={() => updateStaticParam(id, 'rest', -5)}
                                  className="w-7 h-7 rounded-full bg-[#131313] hover:bg-zinc-800 text-[#e08dff] flex items-center justify-center active:scale-90 duration-200"
                                >
                                  <span className="material-symbols-outlined text-sm">remove</span>
                                </button>
                                <span className="font-display font-bold text-xs text-white px-2.5 min-w-[50px] text-center">{params.rest} ث</span>
                                <button 
                                  onClick={() => updateStaticParam(id, 'rest', 5)}
                                  className="w-7 h-7 rounded-full bg-[#BF00FF] hover:bg-[#a600dd] text-white flex items-center justify-center active:scale-90 duration-200"
                                >
                                  <span className="material-symbols-outlined text-sm">add</span>
                                </button>
                              </div>
                            </td>
                            
                            <td className="py-4 text-center">
                              <button 
                                onClick={() => setSelectedStaticExercises(prev => prev.filter(x => x !== id))}
                                className="text-rose-500 hover:text-rose-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="حذف"
                              >
                                <span className="material-symbols-outlined text-lg">delete</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* Start Plan Button */}
          {(() => {
            const hasCustomRoutine = selectedStaticExercises.length > 0;
            
            // Dynamic calculation
            let customTotalSeconds = 0;
            selectedStaticExercises.forEach(id => {
              const stretch = staticStretches.find(s => s.id === id);
              const params = customStaticParams[id] || { sets: ssVolume, duration: stretch ? stretch.defaultTime : 30, rest: ssRest };
              customTotalSeconds += (params.sets * params.duration) + ((params.sets - 1) * params.rest);
            });
            const customTotalMinutes = Math.max(1, Math.round(customTotalSeconds / 60));

            const handleStartStaticSession = () => {
              let dayTitle = '';
              if (hasCustomRoutine) {
                const workoutSummary = selectedStaticExercises.map(id => {
                  const stretch = staticStretches.find(s => s.id === id);
                  const params = customStaticParams[id] || { sets: ssVolume, duration: stretch ? stretch.defaultTime : 30, rest: ssRest };
                  return `${stretch?.name} (${params.sets}×${params.duration}ث)`;
                }).join(' • ');
                dayTitle = `جدول إطالة مخصص: ${workoutSummary.substring(0, 100)}`;
              } else {
                dayTitle = `جلسة إطالة ثابتة (${ssDuration} دقيقة • ${ssIntensities[ssIntensity]})`;
              }
              handleCompleteWorkout('prog_003', activeWeekIndex + 1, activeDayIndex + 1, dayTitle);
            };

            return (
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                {hasCustomRoutine && (
                  <button 
                    onClick={handleTransferToSchedule}
                    className="flex-1 py-5 bg-gradient-to-r from-[#00fcca] to-[#00a896] rounded-full font-display font-black text-xl text-[#0e0e0e] shadow-[0_15px_30px_rgba(0,252,202,0.2)] hover:scale-[1.02] active:scale-95 duration-150 transition-all flex items-center justify-center gap-3"
                  >
                    <span>نقل التمارين للجدول</span>
                    <span className="material-symbols-outlined">send</span>
                  </button>
                )}
                <button 
                  onClick={handleStartStaticSession}
                  disabled={isCompleting}
                  className={`py-5 bg-gradient-to-r from-[#e08dff] to-[#bc00fb] rounded-full font-display font-black text-xl text-white shadow-[0_15px_30px_rgba(188,0,251,0.3)] hover:scale-[1.02] active:scale-95 duration-150 transition-all flex items-center justify-center gap-3 disabled:opacity-50 ${
                    hasCustomRoutine ? 'flex-1' : 'w-full'
                  }`}
                >
                  <span>{isCompleting ? 'جاري الحفظ...' : 'بدء الجلسة الآن'}</span>
                  {hasCustomRoutine ? (
                    <span>({customTotalMinutes} دقيقة • مخصص)</span>
                  ) : (
                    <span>({ssDuration} دقيقة • {ssIntensities[ssIntensity]})</span>
                  )}
                  <span className="material-symbols-outlined">play_arrow</span>
                </button>
              </div>
            );
          })()}
        </motion.div>
      );
    }

    if (activeModule === 'techniques') {
      return (
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           className="pb-32 px-4 md:px-8 max-w-5xl mx-auto mt-6 text-[#ffffff]"
        >
          {/* Top App Bar */}
          <header className="bg-[#0e0e0e]/70 backdrop-blur-xl border border-white/5 bg-gradient-to-b from-[#0e0e0e] to-transparent top-0 sticky z-50 flex items-center justify-between px-6 py-4 w-full rounded-2xl mb-8">
            <div className="flex items-center gap-4">
              <button onClick={() => setActiveModule(null)} className="active:scale-95 duration-200 hover:opacity-80 transition-opacity text-[#e08dff]">
                <span className="material-symbols-outlined text-3xl">{language === 'ar' ? 'arrow_forward' : 'arrow_back'}</span>
              </button>
              <h1 className="font-display font-bold text-xl leading-relaxed text-[#e08dff]">مخطط تقنيات الاستشفاء</h1>
            </div>
            <span className="material-symbols-outlined text-[#494847]">more_vert</span>
          </header>

          <main className="space-y-16">
            {/* Introduction Section */}
            <section className="relative overflow-hidden rounded-3xl p-8 bg-[#131313]">
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <span className="font-display text-[#00fcca] text-sm tracking-widest uppercase mb-2 block">RECOVERY INSIGHT</span>
                  <h2 className="font-display text-3xl font-extrabold mb-4 leading-tight text-white">قوة الاستشفاء المنظم</h2>
                  <p className="text-[#adaaaa] leading-relaxed max-w-2xl text-lg font-display">
                    الاستشفاء ليس مجرد وقت راحة، بل هو عملية تقنية تهدف لإعادة بناء الأنسجة وتحسين الأداء. تنظيم هذه العملية يضمن لك الاستمرارية ويمنع الإصابات الناتجة عن الإجهاد المفرط.
                  </p>
                </div>
                <div className="w-full md:w-1/3 aspect-video rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] rotate-2 border border-white/5">
                  <img alt="Athletic stretching" className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBi7jkbnKIFLFT4_jixAXRd3fERV26NO2RxDqC4FDb_Js_BsSlKIN6QkJqg7Mh-Kn7t6rlMwyY57v2DeKLQUmGKCLFFJE6ShWj_T__MkZFae1yVM2P2E1lxrjisikSQDwtwgf-xvE3H_mm7W3lsX2uBWGB_I6LWdZ-8JDzy1adKNbddeeyHo7x4WDAmRIZMiQCgY82B91Kj-hELfRVjDNQ8EzZpjr1mfsbFL7OCyT8kXuBzxfljuIooto53JyulXRgYyty_epm34Epm"/>
                </div>
              </div>
              {/* Kinetic Background Element */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#e08dff]/10 rounded-full blur-[100px]"></div>
            </section>

            {/* Techniques List (Asymmetric Bento Grid) */}
            <section>
              <div className="flex items-baseline justify-between mb-8">
                <h3 className="font-display text-2xl font-bold flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-[#e08dff]"></span>
                  تقنيات الاستشفاء المتقدمة
                </h3>
                <span className="font-display text-[#e08dff] text-sm tracking-wider">6 ESSENTIALS</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Foam Rolling */}
                <div className="bg-[#201f1f] p-6 rounded-3xl hover:bg-[#262626] transition-colors group border border-white/5 hover:border-[#e08dff]/30">
                  <div className="w-12 h-12 rounded-xl bg-[#e08dff]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[#e08dff]">roller_skating</span>
                  </div>
                  <h4 className="font-display text-xl font-bold mb-2 text-white">التدليك بالأسطوانة</h4>
                  <p className="text-[#adaaaa] text-sm font-display leading-relaxed">تخفيف التوتر العضلي وتحسين مرونة الأنسجة الضامة لزيادة نطاق الحركة.</p>
                </div>

                {/* Hydration */}
                <div className="bg-[#201f1f] p-6 rounded-3xl hover:bg-[#262626] transition-colors group border border-white/5 hover:border-[#00fcca]/30">
                  <div className="w-12 h-12 rounded-xl bg-[#00fcca]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[#00fcca]">water_drop</span>
                  </div>
                  <h4 className="font-display text-xl font-bold mb-2 text-white">الترطيب المثالي</h4>
                  <p className="text-[#adaaaa] text-sm font-display leading-relaxed">تعويض السوائل والمعادن المفقودة لضمان كفاءة العمليات الحيوية وتوصيل الغذاء.</p>
                </div>

                {/* Sleep Quality */}
                <div className="bg-[#201f1f] p-6 rounded-3xl border-t-4 border-[#e08dff] border-x border-b border-white/5 group hover:bg-[#262626] transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-[#e08dff]/10 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-[#e08dff]" style={{ fontVariationSettings: "'FILL' 1" }}>dark_mode</span>
                  </div>
                  <h4 className="font-display text-xl font-bold mb-2 text-white">جودة النوم</h4>
                  <p className="text-[#adaaaa] text-sm font-display leading-relaxed">النوم العميق (7-9 ساعات) هو المرحلة الأساسية لإفراز هرمونات النمو وإصلاح الخلايا.</p>
                </div>

                {/* Active Recovery */}
                <div className="bg-[#201f1f] p-6 rounded-3xl md:col-span-2 group relative overflow-hidden border border-white/5 hover:border-[#00fcca]/30 transition-colors">
                  <div className="relative z-10 flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="w-12 h-12 rounded-xl bg-[#00fcca]/10 flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-[#00fcca]">directions_walk</span>
                      </div>
                      <h4 className="font-display text-xl font-bold mb-2 text-white">الاستشفاء النشط</h4>
                      <p className="text-[#adaaaa] text-sm font-display leading-relaxed max-w-sm">تمارين منخفضة الكثافة مثل المشي أو السباحة الخفيفة لتحفيز الدورة الدموية دون إجهاد الجهاز العصبي.</p>
                    </div>
                    <div className="hidden md:block w-48 h-32 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all border border-white/10">
                      <img alt="Light movement" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_ZhFib2eYNhDtJM__AGOf2f0c7kYix7kqtcfJ3NvzImXs-nzGJ7EZAQitTJqSdwReTzUu2_XHfREElopYASzEzSN6sywglogIatecSYNLsXP_3COO0cKW1uH3OKjvJubtAzwBU-ZV0d2XPEdXWbeKysjyVD6UEW7z3yZ2ki7i9rjmEdoDNPwX2EU1X0Co3MjrDugKFK8gwMe7OJaD7SMUiVxwmTfdcb-ZQwq2ECT14JmkQiUMWh1Y44zjzGJJRfJUehAGbfFuC_rS"/>
                    </div>
                  </div>
                </div>

                {/* Contrast Bath */}
                <div className="bg-[#131313] p-6 rounded-3xl group border-l-4 border-[#e08dff] shadow-inner hover:bg-[#201f1f] transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-[#e08dff]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[#e08dff]">thermostat</span>
                  </div>
                  <h4 className="font-display text-xl font-bold mb-2 text-white">حمام التباين</h4>
                  <p className="text-[#adaaaa] text-sm font-display leading-relaxed">التبديل بين الماء البارد والساخن لتعزيز ضخ الدم وتقليل الالتهابات.</p>
                </div>

                {/* Nutrition */}
                <div className="bg-[#201f1f] p-6 rounded-3xl hover:bg-[#262626] transition-colors group md:col-span-3 border border-white/5 hover:border-[#00fcca]/30">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-[#00fcca]/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[#00fcca] text-3xl">restaurant</span>
                    </div>
                    <div>
                      <h4 className="font-display text-xl font-bold mb-1 text-white">التغذية للاستشفاء</h4>
                      <p className="text-[#adaaaa] text-sm font-display leading-relaxed max-w-3xl">التركيز على البروتينات عالية الجودة والكربوهيدرات المعقدة ومضادات الأكسدة لتقليل الإجهاد التأكسدي وسرعة استعادة الألياف المتهتكة.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Recovery Schedule Table */}
            <section>
              <h3 className="font-display text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#00fcca]"></span>
                جدول المتابعة الأسبوعي
              </h3>
              <div className="overflow-x-auto pb-4 no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <div className="min-w-[800px] bg-[#131313] rounded-3xl p-8 border border-white/5">
                  <div className="grid grid-cols-8 gap-4 mb-6 border-b border-[#494847]/30 pb-4">
                    <div className="col-span-1 text-[#adaaaa] font-display text-[10px] uppercase tracking-wider">التقنية / اليوم</div>
                    <div className="text-center font-display font-bold text-sm text-white">الأحد</div>
                    <div className="text-center font-display font-bold text-sm text-white">الاثنين</div>
                    <div className="text-center font-display font-bold text-sm text-white">الثلاثاء</div>
                    <div className="text-center font-display font-bold text-sm text-white">الأربعاء</div>
                    <div className="text-center font-display font-bold text-sm text-white">الخميس</div>
                    <div className="text-center font-display font-bold text-sm text-[#00fcca]">الجمعة</div>
                    <div className="text-center font-display font-bold text-sm text-white">السبت</div>
                  </div>

                  {/* Row 1: Sleep */}
                  <div className="grid grid-cols-8 gap-4 mb-4 items-center">
                    <div className="col-span-1 font-bold text-sm flex items-center gap-2 text-white">
                      <span className="material-symbols-outlined text-[#e08dff] text-[16px]">hotel</span>
                      النوم
                    </div>
                    <div className="flex justify-center"><div className="w-6 h-6 rounded-lg bg-[#e08dff] shadow-[0_0_10px_rgba(224,141,255,0.3)]"></div></div>
                    <div className="flex justify-center"><div className="w-6 h-6 rounded-lg bg-[#e08dff] shadow-[0_0_10px_rgba(224,141,255,0.3)]"></div></div>
                    <div className="flex justify-center"><div className="w-6 h-6 rounded-lg bg-[#e08dff] shadow-[0_0_10px_rgba(224,141,255,0.3)]"></div></div>
                    <div className="flex justify-center"><div className="w-6 h-6 rounded-lg bg-[#e08dff] shadow-[0_0_10px_rgba(224,141,255,0.3)]"></div></div>
                    <div className="flex justify-center"><div className="w-6 h-6 rounded-lg bg-[#e08dff] shadow-[0_0_10px_rgba(224,141,255,0.3)]"></div></div>
                    <div className="flex justify-center"><div className="w-6 h-6 rounded-lg bg-[#e08dff] shadow-[0_0_10px_rgba(224,141,255,0.3)]"></div></div>
                    <div className="flex justify-center"><div className="w-6 h-6 rounded-lg bg-[#e08dff] shadow-[0_0_10px_rgba(224,141,255,0.3)]"></div></div>
                  </div>

                  {/* Row 2: Foam Rolling */}
                  <div className="grid grid-cols-8 gap-4 mb-4 items-center">
                    <div className="col-span-1 font-bold text-sm flex items-center gap-2 text-white">
                      <span className="material-symbols-outlined text-[#00fcca] text-[16px]">roller_skating</span>
                      التدليك
                    </div>
                    <div className="flex justify-center"><div className="w-6 h-6 rounded-lg bg-[#262626]"></div></div>
                    <div className="flex justify-center"><div className="w-6 h-6 rounded-lg bg-[#00fcca] shadow-[0_0_10px_rgba(0,252,202,0.3)]"></div></div>
                    <div className="flex justify-center"><div className="w-6 h-6 rounded-lg bg-[#262626]"></div></div>
                    <div className="flex justify-center"><div className="w-6 h-6 rounded-lg bg-[#00fcca] shadow-[0_0_10px_rgba(0,252,202,0.3)]"></div></div>
                    <div className="flex justify-center"><div className="w-6 h-6 rounded-lg bg-[#262626]"></div></div>
                    <div className="flex justify-center"><div className="w-6 h-6 rounded-lg bg-[#00fcca] shadow-[0_0_10px_rgba(0,252,202,0.3)]"></div></div>
                    <div className="flex justify-center"><div className="w-6 h-6 rounded-lg bg-[#262626]"></div></div>
                  </div>

                  {/* Row 3: Active Recovery */}
                  <div className="grid grid-cols-8 gap-4 items-center">
                    <div className="col-span-1 font-bold text-sm flex items-center gap-2 text-white">
                      <span className="material-symbols-outlined text-[#d978ff] text-[16px]">bolt</span>
                      نشط
                    </div>
                    <div className="flex justify-center"><div className="w-6 h-6 rounded-lg bg-[#262626]"></div></div>
                    <div className="flex justify-center"><div className="w-6 h-6 rounded-lg bg-[#262626]"></div></div>
                    <div className="flex justify-center"><div className="w-6 h-6 rounded-lg bg-[#d978ff] shadow-[0_0_10px_rgba(217,120,255,0.3)]"></div></div>
                    <div className="flex justify-center"><div className="w-6 h-6 rounded-lg bg-[#262626]"></div></div>
                    <div className="flex justify-center"><div className="w-6 h-6 rounded-lg bg-[#262626]"></div></div>
                    <div className="flex justify-center"><div className="w-6 h-6 rounded-lg bg-[#262626]"></div></div>
                    <div className="flex justify-center"><div className="w-6 h-6 rounded-lg bg-[#d978ff] shadow-[0_0_10px_rgba(217,120,255,0.3)]"></div></div>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* Fixed Action Button */}
          <div className="mt-16 sticky z-40 px-4 bottom-8">
            <button 
              onClick={() => handleCompleteWorkout('prog_003', activeWeekIndex + 1, activeDayIndex + 1, 'جلسة تقنيات الاستشفاء الذاتي')}
              disabled={isCompleting}
              className="w-full h-16 bg-gradient-to-br from-[#e08dff] to-[#bc00fb] rounded-full shadow-[0_10px_30px_rgba(188,0,251,0.4)] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
              <span className="font-display font-black text-xl text-white">{isCompleting ? 'جاري البدء...' : 'بدء جلسة اليوم المخصصة'}</span>
            </button>
          </div>
        </motion.div>
      );
    }

    if (activeModule === 'mindfulness') {
      return (
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           className="pb-32 px-4 md:px-8 max-w-5xl mx-auto mt-6 text-[#ffffff]"
        >
          {/* Top Navigation Anchor */}
          <header className="fixed top-0 z-50 w-full h-16 bg-[#0e0e0e]/70 backdrop-blur-xl shadow-[0_20px_40px_rgba(188,0,251,0.08)] flex items-center justify-between px-6 -mx-4 md:-mx-8">
            <div className="flex items-center gap-4">
              <span onClick={() => setActiveModule(null)} className="material-symbols-outlined text-[#e08dff] cursor-pointer active:scale-95 duration-200">arrow_forward</span>
              <h1 className="font-display font-bold text-xl leading-relaxed text-[#e08dff]">مخطط الوعي الجسماني</h1>
            </div>
            <div className="flex items-center">
              <span className="font-display font-black tracking-tighter text-[#e08dff]">HELMY</span>
            </div>
          </header>

          <main className="pt-24 pb-12">
            {/* Hero Section: Inspiration */}
            <section className="relative h-[450px] w-full overflow-hidden rounded-[32px] mb-8">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent z-10"></div>
              <img alt="Athlete inspiration" className="w-full h-full object-cover grayscale brightness-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38aVewH_yGgBVCJw4528YG_HQkdUbuDHP-fjWtkrvVh5YhG0DT21cRiim0kmI9MaP4u1vsk6q2HdZVuq8tbA7HRK4CDu7BZP0ZJ6BgwlNQSc3c8Hqpg-RI6fJ6B6Bxjxpg7gbjutCWp9nlCZmfx1F2zm6CFxqaFEUYITRm3M5AKNl5yJ_39N2QJPiL4bf9q0YTWyRA15dy2IxIA85xR7R65-e2cGJ81b35ftsmQPksVRSzRdhEWmUfLHA8MxM1EePPEvIDHtCJjs5"/>
              <div className="absolute bottom-12 right-6 left-6 z-20">
                <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white leading-tight tracking-tight max-w-lg">
                  تواصل مع <span className="text-[#e08dff] italic">قوتك</span> الداخلية
                </h2>
                <div className="mt-6 flex gap-3">
                  <button 
                    onClick={() => handleCompleteWorkout('prog_003', activeWeekIndex + 1, activeDayIndex + 1, 'جلسة الوعي الجسماني والاسترخاء')}
                    disabled={isCompleting}
                    className="bg-gradient-to-br from-[#e08dff] to-[#bc00fb] px-8 py-3 rounded-full font-display font-bold text-white shadow-[0_10px_20px_rgba(224,141,255,0.3)] active:scale-95 duration-200 disabled:opacity-50"
                  >
                    {isCompleting ? 'جاري...' : 'ابدأ الآن'}
                  </button>
                </div>
              </div>
            </section>

            {/* Progress Tracking Panel (Bento-style Cards) */}
            <section className="px-2 md:px-6 relative z-30 -mt-16 md:-mt-24">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-[#201f1f] rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#494847]/30 shadow-2xl shadow-[#0e0e0e]">
                  <div className="space-y-2 text-center md:text-right">
                    <span className="font-display text-[#00fcca] text-sm tracking-widest uppercase">Weekly Progress</span>
                    <h3 className="font-display font-bold text-3xl text-white">التقدم الأسبوعي</h3>
                    <p className="text-[#adaaaa] max-w-xs mx-auto md:mx-0">أنت تقترب من هدفك! استمر في دفع حدودك اليومية.</p>
                  </div>
                  <div className="relative flex items-center justify-center h-40 w-40">
                    <svg className="h-full w-full transform -rotate-90">
                      <circle className="text-[#262626]" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="12"></circle>
                      <circle className="text-[#00fcca] shadow-[0_0_15px_rgba(0,252,202,0.4)]" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeDasharray="440" strokeDashoffset="110" strokeWidth="12" style={{ filter: "drop-shadow(0 0 10px rgba(0,252,202,0.3))" }}></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-display font-black text-4xl text-white">75%</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-rows-2 gap-4">
                  <div className="bg-[#131313] rounded-[32px] p-6 flex flex-col justify-center border border-[#494847]/30 shadow-2xl shadow-[#0e0e0e]">
                    <span className="material-symbols-outlined text-[#e08dff] mb-2">fitness_center</span>
                    <span className="font-display text-xs text-[#adaaaa]">التمارين المنجزة</span>
                    <span className="font-display font-bold text-2xl text-white">12 تمرين</span>
                  </div>
                  <div className="bg-[#131313] rounded-[32px] p-6 flex flex-col justify-center border border-[#494847]/30 shadow-2xl shadow-[#0e0e0e]">
                    <span className="material-symbols-outlined text-[#00fcca] mb-2">schedule</span>
                    <span className="font-display text-xs text-[#adaaaa]">الوقت الإجمالي</span>
                    <span className="font-display font-bold text-2xl text-white">340 دقيقة</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Fitness Categories Grid */}
            <section className="mt-16 px-2 md:px-6">
              <div className="flex items-end justify-between mb-8">
                <h3 className="font-display font-bold text-2xl text-white">فئات اللياقة</h3>
                <span className="font-display text-[#e08dff] text-sm cursor-pointer hover:underline">عرض الكل</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#131313] aspect-square rounded-[24px] flex flex-col items-center justify-center gap-4 hover:bg-[#262626] transition-all group border border-[#494847]/10 cursor-pointer">
                  <div className="h-16 w-16 rounded-full bg-[#e08dff]/10 flex items-center justify-center group-hover:bg-[#e08dff] group-hover:text-[#4f006c] transition-colors">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                  </div>
                  <span className="font-display font-medium text-sm text-white">تحمل القوة</span>
                </div>
                <div className="bg-[#131313] aspect-square rounded-[24px] flex flex-col items-center justify-center gap-4 hover:bg-[#262626] transition-all group border border-[#494847]/10 cursor-pointer">
                  <div className="h-16 w-16 rounded-full bg-[#00fcca]/10 flex items-center justify-center group-hover:bg-[#00fcca] group-hover:text-[#005b47] transition-colors">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>directions_run</span>
                  </div>
                  <span className="font-display font-medium text-sm text-white">المرونة الحركية</span>
                </div>
                <div className="bg-[#131313] aspect-square rounded-[24px] flex flex-col items-center justify-center gap-4 hover:bg-[#262626] transition-all group border border-[#494847]/10 cursor-pointer">
                  <div className="h-16 w-16 rounded-full bg-[#ff928a]/10 flex items-center justify-center group-hover:bg-[#ff928a] group-hover:text-[#650b0e] transition-colors">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>self_improvement</span>
                  </div>
                  <span className="font-display font-medium text-sm text-white">توازن الجسم</span>
                </div>
                <div className="bg-[#131313] aspect-square rounded-[24px] flex flex-col items-center justify-center gap-4 hover:bg-[#262626] transition-all group border border-[#494847]/10 cursor-pointer">
                  <div className="h-16 w-16 rounded-full bg-[#d978ff]/10 flex items-center justify-center group-hover:bg-[#d978ff] group-hover:text-[#4c0068] transition-colors">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                  </div>
                  <span className="font-display font-medium text-sm text-white">التوافق العصبي</span>
                </div>
              </div>
            </section>

            {/* Training Plans Carousel */}
            <section className="mt-16">
              <h3 className="font-display font-bold text-2xl px-2 md:px-6 mb-8 text-white">خطط تدريب شخصية</h3>
              <div className="flex overflow-x-auto gap-6 px-2 md:px-6 no-scrollbar pb-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {/* Card 1 */}
                <div className="min-w-[280px] md:min-w-[340px] h-[400px] relative rounded-[32px] overflow-hidden group border border-white/5 cursor-pointer">
                  <img alt="Beginner plan" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlLnSdo8rsiY-HK6cRLCD9TyDAckDJWf090ZVZkjLjmQyLZ4M0JYq0IfOiW1IjwsRvxE606353I2hCQbKPAIUWYutTX4EFlMQkUhNUyMBLLgwkng-g-sjC5hxCdK-oukVl7unCgbq7egKXfHCY5Q2B-hxRR0E400_mHb4sVjMvjLMhYuo2EE-rUDT7QDsrlKYUsF4tqhpO272EEwXvCrq0n6O8zHhH_CIyIGbRDsiUt1goeX2zDd5yF-kB7CZqusnzf-itNsE4DCXz"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  <div className="absolute bottom-6 right-6 left-6">
                    <span className="bg-[#00fcca]/20 backdrop-blur-md text-[#00fcca] px-3 py-1 rounded-full font-display text-[10px] tracking-widest mb-3 inline-block">BEGINNER</span>
                    <h4 className="font-display font-bold text-2xl text-white">خطة المبتدئين</h4>
                    <p className="text-white/70 text-sm mt-2 font-display">بداية رحلة التحول الجسدي الحقيقي.</p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="min-w-[280px] md:min-w-[340px] h-[400px] relative rounded-[32px] overflow-hidden group border border-white/5 cursor-pointer">
                  <img alt="Pro plan" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRjWZf2eovL5p6c_GRQF39fMFJlX55eRMEf0OABJXcps1b7D3SQ3CCxRqaSjjysWKmyJSLaATZPihcTQ0MqcKSFpbpndB01vycwUmHqLkEv5UcD74rfEMPzPQI_aUmrmAAsHpsbNGjymnT2yARhAv_iafPdCm2nG8HiHVaZs73mziAUuyyI37S7FWusEa5_noOG-PJUPetwOT_lgVwKcnzCL_ySA86OFhaOQhB48ZJW34FQYMooiTULQOHe0IO6f2DtmXXS25WI8ct"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  <div className="absolute bottom-6 right-6 left-6">
                    <span className="bg-[#e08dff]/20 backdrop-blur-md text-[#e08dff] px-3 py-1 rounded-full font-display text-[10px] tracking-widest mb-3 inline-block">ADVANCED</span>
                    <h4 className="font-display font-bold text-2xl text-white">خطة المحترفين</h4>
                    <p className="text-white/70 text-sm mt-2 font-display">تحديات عالية الكثافة للقوة القصوى.</p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="min-w-[280px] md:min-w-[340px] h-[400px] relative rounded-[32px] overflow-hidden group border border-white/5 cursor-pointer">
                  <img alt="30 day challenge" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcplZuZixKV46t2_rZmZtpG24mxd9cZDqGakKvRYCC1tAgzjQhuvFVAKodrXSiuPUrZMkEp9wuHXlpt2oXIXM5hB8I3QkM-1_QNAM98_Xh_erWvmc218OIYDwGKbKXcD6UFe9Ejg7OOc8uyJzNh8LBdnxRxrVplsW2iDgOMnbSVvTljV0OjTCLmkmmlTL4-XuGG_Ytn3AnC_CjcJfLYY5oVJP3yOLL1XsC8sKs1xfPWqgT_S7PX2y-S9gJescWuTzrTIOeyHLtSY23"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  <div className="absolute bottom-6 right-6 left-6">
                    <span className="bg-[#ff928a]/20 backdrop-blur-md text-[#ff928a] px-3 py-1 rounded-full font-display text-[10px] tracking-widest mb-3 inline-block">CHALLENGE</span>
                    <h4 className="font-display font-bold text-2xl text-white">تحدي 30 يوم</h4>
                    <p className="text-white/70 text-sm mt-2 font-display">التزام يومي لنتائج غير مسبوقة.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Motivational Quote Section */}
            <section className="mt-8 px-2 md:px-6">
              <div className="bg-gradient-to-br from-[#bc00fb] to-[#4c0068] rounded-[32px] p-10 text-center relative overflow-hidden group shadow-[0_20px_50px_rgba(188,0,251,0.2)] border border-[#e08dff]/20">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#00fcca]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                <span className="font-display text-xs tracking-widest text-white/60 mb-6 inline-block uppercase">إلهام اليوم</span>
                <p className="font-display font-bold text-2xl md:text-3xl text-white leading-relaxed relative z-10 italic">
                  "القوة لا تأتي مما يمكنك فعله، بل تأتي من التغلب على الأشياء التي كنت تعتقد يوماً أنك لا تستطيع فعلها."
                </p>
                <div className="mt-8 flex justify-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-white"></div>
                  <div className="w-8 h-1 rounded-full bg-white"></div>
                  <div className="w-1 h-1 rounded-full bg-white"></div>
                </div>
              </div>
            </section>
          </main>
        </motion.div>
      );
    }

    if (activeModule === 'schedule') {
      return (
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           className="pb-32 px-4 md:px-8 max-w-5xl mx-auto mt-6 text-[#ffffff]"
        >
          {/* TopAppBar */}
          <header className="bg-[#0e0e0e]/70 backdrop-blur-xl border border-white/5 bg-gradient-to-b from-[#0e0e0e] to-transparent top-0 sticky z-50 flex items-center px-6 py-4 w-full rounded-2xl mb-8">
            <button onClick={() => setActiveModule(null)} className="active:scale-95 duration-200 hover:opacity-80 transition-opacity text-[#e08dff]">
              <span className="material-symbols-outlined text-3xl">{language === 'ar' ? 'arrow_forward' : 'arrow_back'}</span>
            </button>
          </header>

          <main className="space-y-10">
            {/* Weekly View (Horizontal Scroll) */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-extrabold text-2xl tracking-tight text-white">التدفق الأسبوعي</h2>
                <span className="font-display text-[#00fcca] text-sm font-bold bg-[#00fcca]/10 px-3 py-1 rounded-full">{new Date().toLocaleDateString('ar-EG', { month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex overflow-x-auto no-scrollbar gap-4 pb-4 px-2 -mx-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {(() => {
                  const weekDaysConfig = [
                    { abbr: 'SAT', label: 'السبت' },
                    { abbr: 'SUN', label: 'الأحد' },
                    { abbr: 'MON', label: 'الإثنين' },
                    { abbr: 'TUE', label: 'الثلاثاء' },
                    { abbr: 'WED', label: 'الأربعاء' },
                    { abbr: 'THU', label: 'الخميس' },
                    { abbr: 'FRI', label: 'الجمعة' },
                  ];
                  const today = new Date();
                  const jsDay = today.getDay(); // 0=Sun..6=Sat
                  const satBasedToday = jsDay === 6 ? 0 : jsDay + 1; // Sat=0..Fri=6
                  const startOfWeek = new Date(today);
                  startOfWeek.setDate(today.getDate() - satBasedToday);

                  return weekDaysConfig.map((day, index) => {
                    const dayDate = new Date(startOfWeek);
                    dayDate.setDate(startOfWeek.getDate() + index);
                    const dayNumber = dayDate.getDate();
                    const isActive = activeDayIndex === index;
                    const workoutId = `${selectedProgram.program_id}_w${activeWeekIndex + 1}_d${index + 1}`;
                    const isCompleted = completedDays.includes(workoutId);

                    return (
                      <div
                        key={index}
                        onClick={() => setActiveDayIndex(index)}
                        className={`flex-shrink-0 w-20 h-28 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer ${
                          isActive
                            ? 'bg-[#262626] border-2 border-[#e08dff] shadow-[0_0_20px_rgba(224,141,255,0.2)]'
                            : 'bg-[#131313] border border-[#494847]/20'
                        }`}
                      >
                        <span className={`font-display text-[10px] uppercase ${isActive ? 'text-[#e08dff]/60' : 'text-[#adaaaa]'}`}>{day.abbr}</span>
                        <span className={`font-display font-black text-3xl mt-1 ${isActive ? 'text-[#e08dff]' : 'text-white'}`}>{dayNumber}</span>
                        {isActive && !isCompleted && (
                          <div className="mt-2 w-2 h-2 rounded-full bg-[#e08dff] animate-pulse"></div>
                        )}
                        {isCompleted && (
                          <span className="material-symbols-outlined text-[#00fcca] text-xl mt-2" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        )}
                        {!isActive && !isCompleted && (
                          <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#494847]"></div>
                        )}
                      </div>
                    );
                  });
                })()}
              </div>
            </section>

            {/* Daily Schedule Bento Grid Layout */}
            <section className="space-y-8">
              <h2 className="font-display font-extrabold text-3xl mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-[#00fcca] rounded-full"></span>
                جلسات اليوم
              </h2>

              {/* Morning Session */}
              <div 
                onClick={() => setActiveModule('static')}
                className="group relative overflow-hidden rounded-3xl bg-[#131313] p-6 transition-all duration-300 hover:bg-[#201f1f] border-r-4 border-[#e08dff]/40 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-[#e08dff]" style={{ fontVariationSettings: "'FILL' 1" }}>accessibility_new</span>
                      <span className="font-display text-[#e08dff] font-bold tracking-widest text-xs uppercase">Static Stretching</span>
                    </div>
                    <h3 className="font-display font-bold text-xl">تمارين الإطالات الاستاتيكية الثابتة</h3>
                  </div>
                  <span className="font-display text-[#adaaaa] text-sm bg-[#262626] px-3 py-1 rounded-lg">12 دقيقة</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 bg-[#262626] p-3 rounded-2xl">
                    <div className="w-14 h-14 rounded-xl bg-[#0e0e0e] flex items-center justify-center overflow-hidden">
                      <img alt="stretching" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7c74GBAfLmlVbB6p-9-PY6JwL-JIL6fiHsLS_MbidyEqHH7lkjVhvklCiY_TQdKCVnFCF8fuZzf3iAV7hIccbn_TgOXKoik-6J85tun39Gwh-nuG9IZ38G2afpKDY_EGSm_vUltQf9s4n3OThJ5Kbgi2YZ9PY72rdCjBl2gwXBnilRpCWKf-nz-eiT6lzH_nXAQLsPVUlKnLulVAKDvoU2DrMSDoMM6p_4VwKDRDCkIcABrbHRsoweyqjm8g7nHhyiI4h5wi_BV1F"/>
                    </div>
                    <div>
                      <p className="font-display font-semibold text-sm">إطالة أوتار الركبة</p>
                      <p className="font-display text-[10px] text-[#e08dff]">3 دقيقة</p>
                      <p className="font-display text-[10px] text-[#adaaaa]/70 mt-1">العضلات العاملة: الخلفية، الألوية</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-[#262626] p-3 rounded-2xl">
                    <div className="w-14 h-14 rounded-xl bg-[#0e0e0e] flex items-center justify-center overflow-hidden">
                      <img alt="stretching" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChMWebBlC5yPAMzXQl4__4lc-O5K8c4DhTsIMKKMKzxGgDJAdhmAkRO7XRzIc5JmgLOwE69Xg3F1FfhF_0HBgaZOWyeTdBo87tQIibtmGj5hPWKldlsCdr40BWOjLYGQ_XaSscdHTqCEy4oGJ7AeX90F1pLY1lDf0LNt5sjv5bhjpzSPpReZBbJcG08dQ_nBsYtl1auz3V97ae15_24cBEBlPBOA69xE1MnAiWHy0ezNDAWks0UpDeb9VfmjZCzpW4qQJuYL6d2e5Z"/>
                    </div>
                    <div>
                      <p className="font-display font-semibold text-sm">إطالة الثبات للجذع</p>
                      <p className="font-display text-[10px] text-[#e08dff]">3 دقيقة</p>
                      <p className="font-display text-[10px] text-[#adaaaa]/70 mt-1">العضلات العاملة: الظهر، البطن، الجذع</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pre-Workout Session */}
              <div 
                onClick={() => setActiveModule('dynamic')}
                className="group relative overflow-hidden rounded-3xl bg-[#131313] p-6 transition-all duration-300 hover:bg-[#201f1f] border-r-4 border-[#e08dff]/40 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-[#e08dff]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                      <span className="font-display text-[#e08dff] font-bold tracking-widest text-xs">PRE-WORKOUT</span>
                    </div>
                    <h3 className="font-display font-bold text-xl">تحمية المفاصل والعضلات</h3>
                  </div>
                  <span className="font-display text-[#adaaaa] text-sm bg-[#262626] px-3 py-1 rounded-lg">5 دقيقة</span>
                </div>
                <div className="flex flex-col items-center justify-center h-24 bg-[#262626]/50 rounded-2xl border border-dashed border-[#494847]/30 text-[#adaaaa] font-display italic">
                  تبدأ قبل التمرين بـ 5 دقائق لتقليل خطر الإصابة
                  <div className="mt-2 font-display text-[10px] text-[#adaaaa]/70 bg-[#262626] px-2 py-0.5 rounded">العضلات العاملة: الجسم بالكامل، المفاصل الرئيسية</div>
                </div>
              </div>

              {/* Post-Workout Session */}
              <div className="group relative overflow-hidden rounded-3xl bg-[#131313] p-6 border-r-4 border-[#00fcca]/40">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-[#00fcca]" style={{ fontVariationSettings: "'FILL' 1" }}>fitness_center</span>
                      <span className="font-display text-[#00fcca] font-bold tracking-widest text-xs">POST-WORKOUT</span>
                    </div>
                    <h3 className="font-display font-bold text-xl">إطالات استاتيكية (ثابتة)</h3>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-display text-[#adaaaa] text-sm bg-[#262626] px-3 py-1 rounded-lg">
                      {postWorkoutExercises.reduce((acc, curr) => acc + curr.duration, 0)} دقيقة
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModule('static');
                      }}
                      className="text-xs text-[#00fcca] hover:underline flex items-center gap-0.5"
                    >
                      عرض التفاصيل <span className="material-symbols-outlined text-xs">open_in_new</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {postWorkoutExercises.map((ex) => (
                    <div key={ex.id} className="flex items-center gap-4 bg-[#262626] p-3 rounded-2xl relative group/item">
                      <div className="w-14 h-14 rounded-xl bg-[#0e0e0e] flex items-center justify-center overflow-hidden shrink-0">
                        {ex.image ? (
                          <img alt={ex.name} className="w-full h-full object-cover" src={ex.image} />
                        ) : (
                          <span className="material-symbols-outlined text-[#00fcca]/60 text-2xl">self_improvement</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 text-right">
                        <p className="font-display font-semibold text-sm text-white truncate">{ex.name}</p>
                        <p className="font-display text-[10px] text-[#00fcca]">{ex.duration} دقيقة</p>
                        <p className="font-display text-[10px] text-[#adaaaa]/70 mt-1 truncate">العضلات العاملة: {ex.muscle}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPostWorkoutExercises(prev => prev.filter(item => item.id !== ex.id));
                        }}
                        className="absolute top-2 left-2 size-6 rounded-md bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity"
                        title="حذف"
                      >
                        <span className="material-symbols-outlined text-xs">delete</span>
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setTransferTarget('post');
                      setActiveModule('static');
                    }}
                    className="flex items-center justify-center border-2 border-dashed border-[#00fcca]/20 rounded-2xl h-16 hover:border-[#00fcca]/40 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[#00fcca]/40">add</span>
                  </button>
                </div>
              </div>

              {/* Custom Training Section */}
              <div className="group relative overflow-hidden rounded-3xl bg-[#131313] p-6 border-r-4 border-[#e08dff]/40">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-[#e08dff]" style={{ fontVariationSettings: "'FILL' 1" }}>settings_accessibility</span>
                      <span className="font-display text-[#e08dff] font-bold tracking-widest text-xs uppercase">CUSTOM TRAINING</span>
                    </div>
                    <h3 className="font-display font-bold text-xl">تمارين مخصصة</h3>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-display text-[#adaaaa] text-sm bg-[#262626] px-3 py-1 rounded-lg">
                      {customScheduleExercises.reduce((acc, curr) => acc + curr.duration, 0)} دقائق
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModule('static');
                      }}
                      className="text-xs text-[#e08dff] hover:underline flex items-center gap-0.5"
                    >
                      عرض التمارين <span className="material-symbols-outlined text-xs">open_in_new</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {customScheduleExercises.map((ex) => (
                    <div key={ex.id} className="flex items-center gap-4 bg-[#262626] p-3 rounded-2xl relative group/item">
                      <div className="w-14 h-14 rounded-xl bg-[#0e0e0e] flex items-center justify-center overflow-hidden shrink-0">
                        <span className="material-symbols-outlined text-[#e08dff]/60 text-2xl">{ex.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0 text-right">
                        <p className="font-display font-semibold text-sm text-white truncate">{ex.name}</p>
                        <p className="font-display text-[10px] text-[#e08dff]">{ex.duration} دقائق</p>
                        <p className="font-display text-[10px] text-[#adaaaa]/70 mt-1 truncate">العضلات العاملة: {ex.muscle}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCustomScheduleExercises(prev => prev.filter(item => item.id !== ex.id));
                        }}
                        className="absolute top-2 left-2 size-6 rounded-md bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity"
                        title="حذف"
                      >
                        <span className="material-symbols-outlined text-xs">delete</span>
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setTransferTarget('custom');
                      setActiveModule('static');
                    }}
                    className="flex items-center justify-center border-2 border-dashed border-[#e08dff]/20 rounded-2xl h-16 hover:border-[#e08dff]/40 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[#e08dff]/40">add</span>
                  </button>
                </div>
              </div>

              {/* Bedtime Session */}
              <div 
                onClick={() => setActiveModule('static')}
                className="group relative overflow-hidden rounded-3xl bg-[#131313] p-6 transition-all duration-300 hover:bg-[#201f1f] border-r-4 border-[#e08dff]/40 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-[#e08dff]" style={{ fontVariationSettings: "'FILL' 1" }}>bedtime</span>
                      <span className="font-display text-[#e08dff] font-bold tracking-widest text-xs">RELAXATION</span>
                    </div>
                    <h3 className="font-display font-bold text-xl">إطالات الاسترخاء والهدوء</h3>
                  </div>
                  <span className="font-display text-[#adaaaa] text-sm bg-[#262626] px-3 py-1 rounded-lg">8 دقيقة</span>
                </div>
                <p className="text-[#adaaaa] text-sm font-display leading-relaxed max-w-md">
                  مجموعة من الحركات البسيطة لتهدئة الجهاز العصبي وتحسين جودة النوم.
                </p>
                <div className="mt-4 inline-flex items-center gap-1 font-display text-[10px] text-[#adaaaa]/70 border border-[#494847]/30 px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[12px]">target</span>
                  العضلات المستهدفة: الجهاز العصبي
                </div>
              </div>
            </section>

            {/* Main Action Button */}
            <div className="mt-12 sticky z-40 p-4 bottom-0 bg-gradient-to-t from-[#0e0e0e] to-transparent w-full">
              <button 
                onClick={() => handleCompleteWorkout('prog_003', activeWeekIndex + 1, activeDayIndex + 1, `جلسة الاستشفاء: ${activeDay?.day_title || 'اليومية'}`)}
                disabled={isCompleting}
                className="w-full h-16 bg-gradient-to-br from-[#e08dff] to-[#bc00fb] rounded-full shadow-[0_10px_30px_rgba(188,0,251,0.4)] flex items-center justify-center gap-3 active:scale-95 transition-all duration-300 group disabled:opacity-50"
              >
                <span className="font-display font-black text-lg text-white">{isCompleting ? 'جاري الحفظ...' : 'ابدأ جلسة اليوم'}</span>
                <span className="material-symbols-outlined text-white group-hover:-translate-x-1 transition-transform">{language === 'ar' ? 'arrow_back' : 'arrow_forward'}</span>
              </button>
            </div>
          </main>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6 pb-12"
      >
        {selectedProgram.program_id === 'prog_003' ? (
          <div className="pb-12 text-[#ffffff] w-full">
            <header className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 bg-[#0e0e0e]/80 backdrop-blur-xl border-b border-white/5 mb-4 -mx-4 md:-mx-8">
              <div className="w-10 flex justify-start">
                <button onClick={() => setSelectedProgram(null)} className="flex items-center justify-center size-10 text-white hover:bg-white/10 rounded-full transition-colors">
                  <span className="material-symbols-outlined">{language === 'ar' ? 'arrow_forward' : 'arrow_back'}</span>
                </button>
              </div>
              <h1 className="text-lg font-bold truncate flex-1 text-center flex justify-center">
                <GradientText colors={['#BF00FF','#E066FF','#BF00FF']} animationSpeed={6} showBorder={false}>
                  برنامج المرونة والاستشفاء
                </GradientText>
              </h1>
              <div className="w-10"></div>
            </header>

            {/* Hero Section */}
            <FadeContent blur={true} duration={1000} initialOpacity={0}>
              <div className="rounded-3xl overflow-hidden p-6 relative shadow-2xl min-h-[180px] flex flex-col justify-end mb-8">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2000&auto=format&fit=crop')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/80 to-transparent" />
                <div className="absolute top-4 left-4 w-24 h-24 rounded-full blur-3xl" style={{ backgroundColor: '#BF00FF', opacity: 0.3 }} />
                
                <div className="relative z-10 flex items-end gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shrink-0" style={{ backgroundColor: `#BF00FF40`, color: '#BF00FF', backdropFilter: 'blur(8px)' }}>
                    <span className="material-symbols-outlined text-3xl">self_improvement</span>
                  </div>
                  <div className="flex-1 pb-1">
                    <h2 className="text-xl font-extrabold text-white mb-1">خطة المرونة والاستشفاء</h2>
                    <p className="text-xs text-gray-300">تسريع التعافي وتقليل الإصابات</p>
                  </div>
                </div>
              </div>
            </FadeContent>

            {/* Modules Section */}
            <FadeContent blur={true} duration={1000} initialOpacity={0}>
              <section className="mt-8 mb-10">
                <h3 className="text-white text-lg font-bold px-4 mb-3">وحدات البرنامج الأساسية</h3>
                <div className="flex flex-col gap-4 px-4">
                  
                  {/* Dynamic Stretching */}
                  <SpotlightCard 
                    className="!p-0 !bg-[#131313] !border-white/5 hover:!border-[#BF00FF]/30 transition-colors cursor-pointer group !rounded-xl" 
                    spotlightColor="rgba(191, 0, 255, 0.15)"
                    onClick={() => setActiveModule('dynamic')}
                  >
                    <div className="flex overflow-hidden w-full h-full">
                      <div className="w-24 h-24 shrink-0 bg-[#BF00FF]/10 flex items-center justify-center transition-colors group-hover:bg-[#BF00FF]/20">
                        <span className="material-symbols-outlined text-[#BF00FF] text-3xl">fitness_center</span>
                      </div>
                      <div className="flex flex-col justify-center p-4 flex-1">
                        <h4 className="font-bold text-white group-hover:text-[#BF00FF] transition-colors">تمارين الإطالة الديناميكية</h4>
                        <p className="text-xs text-[#adaaaa] mt-1">للإحماء الفعال وزيادة مدى الحركة قبل التمرين</p>
                      </div>
                      <div className="flex items-center justify-end px-4">
                        <span className="material-symbols-outlined text-[#BF00FF] text-3xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">play_circle</span>
                      </div>
                    </div>
                  </SpotlightCard>

                  {/* Static Stretching */}
                  <SpotlightCard 
                    className="!p-0 !bg-[#131313] !border-white/5 hover:!border-[#BF00FF]/30 transition-colors cursor-pointer group !rounded-xl" 
                    spotlightColor="rgba(191, 0, 255, 0.15)"
                    onClick={() => setActiveModule('static')}
                  >
                    <div className="flex overflow-hidden w-full h-full">
                      <div className="w-24 h-24 shrink-0 bg-[#BF00FF]/10 flex items-center justify-center transition-colors group-hover:bg-[#BF00FF]/20">
                        <span className="material-symbols-outlined text-[#BF00FF] text-3xl">self_improvement</span>
                      </div>
                      <div className="flex flex-col justify-center p-4 flex-1">
                        <h4 className="font-bold text-white group-hover:text-[#BF00FF] transition-colors">تمارين الإطالة الثابتة</h4>
                        <p className="text-xs text-[#adaaaa] mt-1">للاسترخاء العميق وتهدئة العضلات بعد المجهود البدني</p>
                      </div>
                      <div className="flex items-center justify-end px-4">
                        <span className="material-symbols-outlined text-[#BF00FF] text-3xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">play_circle</span>
                      </div>
                    </div>
                  </SpotlightCard>

                  {/* Recovery Techniques */}
                  <SpotlightCard 
                    className="!p-0 !bg-[#131313] !border-white/5 hover:!border-[#00fcca]/30 transition-colors cursor-pointer group !rounded-xl" 
                    spotlightColor="rgba(0, 252, 202, 0.15)"
                    onClick={() => setActiveModule('techniques')}
                  >
                    <div className="flex overflow-hidden w-full h-full">
                      <div className="w-24 h-24 shrink-0 bg-[#00fcca]/10 flex items-center justify-center transition-colors group-hover:bg-[#00fcca]/20">
                        <span className="material-symbols-outlined text-[#00fcca] text-3xl">rebase_edit</span>
                      </div>
                      <div className="flex flex-col justify-center p-4 flex-1">
                        <h4 className="font-bold text-white group-hover:text-[#00fcca] transition-colors">تقنيات الاستشفاء</h4>
                        <p className="text-xs text-[#adaaaa] mt-1">التدليك، الفوم رولينج، والترطيب المثالي للعضلات</p>
                      </div>
                      <div className="flex items-center justify-end px-4">
                        <span className="material-symbols-outlined text-[#00fcca] text-3xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">play_circle</span>
                      </div>
                    </div>
                  </SpotlightCard>

                  {/* Mindfulness */}
                  <SpotlightCard 
                    className="!p-0 !bg-[#131313] !border-white/5 hover:!border-[#BF00FF]/30 transition-colors cursor-pointer group !rounded-xl" 
                    spotlightColor="rgba(191, 0, 255, 0.15)"
                    onClick={() => setActiveModule('mindfulness')}
                  >
                    <div className="flex overflow-hidden w-full h-full">
                      <div className="w-24 h-24 shrink-0 bg-[#BF00FF]/10 flex items-center justify-center transition-colors group-hover:bg-[#BF00FF]/20">
                        <span className="material-symbols-outlined text-[#BF00FF] text-3xl">psychology</span>
                      </div>
                      <div className="flex flex-col justify-center p-4 flex-1">
                        <h4 className="font-bold text-white group-hover:text-[#BF00FF] transition-colors">الوعي الجسماني</h4>
                        <p className="text-xs text-[#adaaaa] mt-1">تعزيز الاتصال الذهني العضلي أثناء عملية الاستشفاء</p>
                      </div>
                      <div className="flex items-center justify-end px-4">
                        <span className="material-symbols-outlined text-[#BF00FF] text-3xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">play_circle</span>
                      </div>
                    </div>
                  </SpotlightCard>
                  
                  {/* Weekly Schedule */}
                  <SpotlightCard 
                    className="!p-0 !bg-[#131313] !border-white/5 hover:!border-[#00fcca]/30 transition-colors cursor-pointer group !rounded-xl" 
                    spotlightColor="rgba(0, 252, 202, 0.15)"
                    onClick={() => setActiveModule('schedule')}
                  >
                    <div className="flex overflow-hidden w-full h-full">
                      <div className="w-24 h-24 shrink-0 bg-[#00fcca]/10 flex items-center justify-center transition-colors group-hover:bg-[#00fcca]/20">
                        <span className="material-symbols-outlined text-[#00fcca] text-3xl">calendar_month</span>
                      </div>
                      <div className="flex flex-col justify-center p-4 flex-1">
                        <h4 className="font-bold text-white group-hover:text-[#00fcca] transition-colors">جدول الاستشفاء الأسبوعي</h4>
                        <p className="text-xs text-[#adaaaa] mt-1">خارطة طريق مخصصة توضح لك متى وكيف تطبق التمارين</p>
                      </div>
                      <div className="flex items-center justify-end px-4">
                        <span className="material-symbols-outlined text-[#00fcca] text-3xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">arrow_forward</span>
                      </div>
                    </div>
                  </SpotlightCard>
                </div>
              </section>
            </FadeContent>

            {/* CTA Action Button */}
            <FadeContent blur={true} duration={1000} initialOpacity={0}>
              <div className="px-4 pb-8">
                <StarBorder as="button" color="#BF00FF" speed="4s" className="w-full" onClick={() => setActiveModule('schedule')}>
                  <div className="flex items-center justify-center gap-2 font-bold text-white">
                    <span>ابدأ الجلسة الآن</span>
                    <span className="material-symbols-outlined">rocket_launch</span>
                  </div>
                </StarBorder>
              </div>
            </FadeContent>
          </div>
        ) : (
          <>

        <header className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 bg-[#0e0e0e]/80 backdrop-blur-xl border-b border-white/5 mb-4 -mx-4 md:-mx-8">
          <div className="w-10 flex justify-start">
            <button onClick={() => setSelectedProgram(null)} className="flex items-center justify-center size-10 text-white hover:bg-white/10 rounded-full transition-colors">
              <span className="material-symbols-outlined">{language === 'ar' ? 'arrow_forward' : 'arrow_back'}</span>
            </button>
          </div>
          <h1 className="text-lg font-bold truncate flex-1 text-center flex justify-center">
            <GradientText colors={['#e08dff','#bc00fb','#e08dff']} animationSpeed={6} showBorder={false}>
              {selectedProgram.program_name}
            </GradientText>
          </h1>
          <div className="w-10"></div>
        </header>

        <div className="rounded-3xl overflow-hidden p-6 relative shadow-2xl min-h-[180px] flex flex-col justify-end mb-8">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${selectedProgram.image}')` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/80 to-transparent" />
          <div className="absolute top-4 left-4 w-24 h-24 rounded-full blur-3xl" style={{ backgroundColor: '#bc00fb', opacity: 0.3 }} />
          
          <div className="relative z-10 flex items-end gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shrink-0" style={{ backgroundColor: `#bc00fb40`, color: '#e08dff', backdropFilter: 'blur(8px)' }}>
              <span className="material-symbols-outlined text-3xl">fitness_center</span>
            </div>
            <div className="flex-1 pb-1">
              <h2 className="text-xl font-extrabold text-white mb-1">{selectedProgram.program_name}</h2>
              <p className="text-xs text-gray-300 line-clamp-2">{selectedProgram.program_description}</p>
            </div>
          </div>
        </div>

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
                  onClick={() => handleCompleteWorkout(selectedProgram.program_id, activeWeek.week_number, activeDay.day_order, activeDay.day_title)}
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
                      {t('workout_completed')}
                    </>
                  ) : (
                    <>
                      <Dumbbell size={24} />
                      {t('complete_workout')}
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
                onClick={() => handleCompleteWorkout(selectedProgram.program_id, activeWeek.week_number, activeDay.day_order, activeDay.day_title)}
                disabled={isCompleting}
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all hover:scale-105"
              >
                {isCompleting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 size={24} />
                    {t('complete_rest')}
                  </>
                )}
              </button>
            </div>
          )}
            </div>
          </>
        )}
      </motion.div>
    );
  }

  const programCards = [
    {
      id: 1,
      title: 'برنامج القوة العضلية',
      subtitle: 'يركز على بناء الكتلة العضلية وزيادة القوة البدنية.',
      description: 'بناء أساس صلب من القوة والكتلة العضلية باستخدام أساليب التدريب العلمي المتقدمة لضمان أقصى استفادة.',
      icon: 'fitness_center',
      color: '#e08dff', // Purple
      tags: [
        { icon: 'schedule', label: '8 أسابيع' },
        { icon: 'bar_chart', label: 'مستوى متقدم' }
      ],
      onClick: () => navigate('/programs/muscle-strength'),
    },
    {
      id: 6,
      title: 'برامج بناء العضلات',
      subtitle: 'Push Pull Legs • Upper Lower • Full Body',
      description: '٣ برامج احترافية لبناء العضلات مصممة لجميع المستويات مع تمارين مفصلة وجداول تدريبية متكاملة.',
      icon: 'cardiology',
      color: '#ff6b6b',
      tags: [
        { icon: 'schedule', label: '4-8 أسابيع' },
        { icon: 'group', label: 'جميع المستويات' }
      ],
      onClick: () => navigate('/programs/muscle-building'),
    },
    {
      id: 7,
      title: 'برنامج خسارة الدهون',
      subtitle: 'Beginner • Intermediate • Advanced',
      description: '٣ مستويات لحرق الدهون تجمع بين تمارين المقاومة والكارديو و HIIT للحفاظ على العضلات وتسريع الأيض.',
      icon: 'local_fire_department',
      color: '#ff6b6b',
      tags: [
        { icon: 'schedule', label: '4-8 أسابيع' },
        { icon: 'whatshot', label: 'حرق دهون' }
      ],
      onClick: () => navigate('/programs/fat-loss'),
    },
    {
      id: 2,
      title: 'برنامج المرونة والاستشفاء',
      subtitle: 'يهدف لتحسين المدى الحركي وتقليل تيبس العضلات.',
      description: 'تحسين المدى الحركي وتسريع عمليات الاستشفاء العضلي لضمان أداء رياضي مستدام وبدون إصابات.',
      icon: 'self_improvement',
      color: '#00fcca', // Cyan
      tags: [
        { icon: 'bolt', label: 'يومي' },
        { icon: 'accessibility', label: 'جميع المستويات' }
      ],
      onClick: () => {
        const prog = programs.find(p => p.program_id === 'prog_003' || p.program_name.includes('المرونة'));
        if (prog) {
          setSelectedProgram(prog);
          setActiveWeekIndex(0);
          setActiveDayIndex(0);
        }
      },
    },
    {
      id: 3,
      title: 'برنامج السرعة',
      subtitle: 'تطوير الانفجار الحركي وزيادة معدل السرعة القصوى.',
      description: 'تمارين متخصصة لتطوير الانفجار الحركي وزيادة معدل السرعة القصوى للرياضيين بطريقة علمية مدروسة.',
      icon: 'speed',
      color: '#bc00fb', // Deep purple
      tags: [
        { icon: 'schedule', label: '4 أسابيع' },
        { icon: 'trending_up', label: 'تقدم سريع' }
      ],
      onClick: () => navigate('/education/training/speed'),
    },
    {
      id: 4,
      title: 'برنامج البليومترية',
      subtitle: 'تحسين رد فعل العضلات والقدرة الحركية.',
      description: 'تحسين القفز والقدرة الانفجارية عبر تمارين القوة الحركية المرتدة لتعزيز الأداء العام.',
      icon: 'sports_gymnastics',
      color: '#f97316', // Orange
      tags: [
        { icon: 'schedule', label: '6 أسابيع' },
        { icon: 'vertical_align_top', label: 'قفز ومقاومة' }
      ],
      onClick: () => navigate('/education/training/speed/plyometrics'),
    },
    {
      id: 5,
      title: 'برنامج التوازن',
      subtitle: 'تعزيز الاستقرار العضلي والعصبي وتحسين التوافق.',
      description: 'تعزيز الاستقرار العصبي العضلي والتوافق الحركي للجسم بالكامل لزيادة التحكم والسيطرة.',
      icon: 'accessibility_new',
      color: '#3b82f6', // Blue
      tags: [
        { icon: 'all_inclusive', label: 'مستمر' },
        { icon: 'balance', label: 'توافق عضلي' }
      ],
      onClick: () => navigate('/education/training/speed/balance'),
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-12 text-[#ffffff]"
    >
      <header className="flex items-center justify-between px-6 py-5 bg-[#0e0e0e]/70 backdrop-blur-xl rounded-2xl mb-8 border border-white/5 bg-gradient-to-b from-[#0e0e0e] to-transparent">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="font-display font-extrabold tracking-tight text-2xl">
            <GradientText colors={["#e08dff","#bc00fb","#e08dff"]} animationSpeed={6} showBorder={false}>
              مخطط البرامج
            </GradientText>
          </h1>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#e08dff]/20">
          <img alt="Profile" className="w-full h-full object-cover" src={user?.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuCYRt_Y20UZkInvBHOC7W43x8L7_-qzEFFLCnGxNqObdMR8YgRPRvMGO-pToQAItPnK389QhbdgVcT0eqNUu5xmr3NLmdtq6IvP-YUuO5zJkjhvBrcmg0f7LSj7NMcJtCvsHHuwlWQs3PhWxcPqWlIDaV8IkeUJelSSYi1rWOvRWaUI6Psk7wbDrzud-tIbKFBOMracAtm0NYiCvjgj8pojIWFvsrZqu8K557Qky06CTMmclKTqeCbydukHOnjH_qu0pb4R7nRcRVuY"} />
        </div>
      </header>

      {loadingPrograms ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-[#e08dff]/30 border-t-[#e08dff] rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {programCards.map((card, idx) => (
            <motion.div 
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              onClick={card.onClick}
              className="group relative bg-[#131313] rounded-[2rem] p-1 overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]"
                style={{ background: `linear-gradient(to bottom right, ${card.color}15, transparent)` }}
              ></div>
              <div 
                className="relative bg-[#131313] rounded-[1.9rem] p-6 flex flex-col sm:flex-row items-center justify-between gap-5 border-l-2"
                style={{ borderColor: `${card.color}30` }}
              >
                <div className="flex flex-col gap-1 flex-1 w-full">
                  <div className="flex items-center gap-4 mb-3">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105"
                      style={{ backgroundColor: `${card.color}15`, color: card.color, boxShadow: `0 10px 20px -5px ${card.color}20` }}
                    >
                      <span className="material-symbols-outlined text-3xl">{card.icon}</span>
                    </div>
                    <h3 className="font-display text-2xl font-extrabold text-white leading-tight">{card.title}</h3>
                  </div>
                  <p className="font-display text-sm mb-2 font-bold" style={{ color: card.color }}>{card.subtitle}</p>
                  <p className="font-display text-[#adaaaa] text-base leading-relaxed pr-2">{card.description}</p>
                  
                  <div className="flex flex-wrap gap-3 mt-4">
                    {card.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="font-display text-[11px] tracking-wider flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold"
                        style={{ color: card.color, backgroundColor: `${card.color}10` }}
                      >
                        <span className="material-symbols-outlined text-sm">{tag.icon}</span> {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button 
                  className="w-14 h-14 rounded-full shrink-0 border flex items-center justify-center transition-all shadow-lg mt-4 sm:mt-0 relative overflow-hidden"
                  style={{ backgroundColor: '#201f1f', borderColor: '#49484720', color: card.color }}
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: card.color }}
                  ></div>
                  <span className="material-symbols-outlined text-2xl group-hover:text-white relative z-10 transition-colors">
                    {language === 'ar' ? 'chevron_left' : 'chevron_right'}
                  </span>
                </button>
              </div>
            </motion.div>
          ))}

          {/* Need help footer */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 p-8 rounded-[3rem] bg-gradient-to-br from-[#262626] to-[#0e0e0e] flex flex-col items-center text-center border border-white/5"
          >
            <h4 className="font-display text-xl font-extrabold mb-3 text-white">هل تحتاج لمساعدة؟</h4>
            <p className="text-[#adaaaa] text-base mb-6 max-w-sm block mx-auto font-display leading-relaxed">فريق الخبراء لدينا متاح لمساعدتك في اختيار البرنامج الأنسب لأهدافك.</p>
            <button className="flex items-center gap-2 text-[#e08dff] text-sm font-bold tracking-widest group bg-[#e08dff]/10 px-6 py-3 rounded-full hover:bg-[#e08dff]/20 transition-colors font-display">
              تحدث مع مدرب <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">{language === 'ar' ? 'arrow_back' : 'arrow_forward'}</span>
            </button>
          </motion.div>
        </div>
      )}
      
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-[#18181b] border border-white/10 rounded-3xl p-6 shadow-2xl relative text-right"
              dir="rtl"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                {modalTarget === 'custom' ? 'إضافة تمرين مخصص جديد' : 'إضافة تمرين إطالة جديد'}
              </h3>
              
              {/* Preset Selector */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-zinc-400 mb-2">اختر من التمارين والوجبات الجاهزة (تلقائي)</label>
                <select 
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    if (selectedId) {
                      const stretch = staticStretches.find(s => s.id === selectedId);
                      if (stretch) {
                        setNewExName(stretch.name);
                        setNewExMuscle(stretch.muscle);
                        setNewExDuration(Math.max(1, Math.round(stretch.defaultTime / 60) || 2));
                        if (modalTarget === 'custom') {
                          setNewExIcon('self_improvement');
                        }
                      }
                    }
                  }}
                  className="w-full bg-[#131313] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#e08dff] focus:outline-none transition-colors"
                >
                  <option value="">-- اختر تمرين إطالة جاهز --</option>
                  {staticStretches.map((stretch) => (
                    <option key={stretch.id} value={stretch.id}>
                      {stretch.name} ({stretch.muscle})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-2">اسم التمرين</label>
                  <input 
                    type="text" 
                    value={newExName}
                    onChange={(e) => setNewExName(e.target.value)}
                    placeholder="مثال: إطالة عضلة البايسبس" 
                    className="w-full bg-[#131313] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#e08dff] focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-2">المدة (دقائق)</label>
                    <input 
                      type="number" 
                      value={newExDuration}
                      onChange={(e) => setNewExDuration(parseInt(e.target.value) || 1)}
                      className="w-full bg-[#131313] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#e08dff] focus:outline-none transition-colors"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-2">العضلة المستهدفة</label>
                    <input 
                      type="text" 
                      value={newExMuscle}
                      onChange={(e) => setNewExMuscle(e.target.value)}
                      placeholder="مثال: الذراعين"
                      className="w-full bg-[#131313] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#e08dff] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {modalTarget === 'custom' && (
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-2">اختر الأيقونة</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: 'fitness_center', name: 'دمبل' },
                        { id: 'self_improvement', name: 'يوجا' },
                        { id: 'directions_run', name: 'جري' },
                        { id: 'accessibility_new', name: 'جسم' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setNewExIcon(item.id)}
                          type="button"
                          className={`py-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                            newExIcon === item.id 
                              ? 'border-[#e08dff] bg-[#e08dff]/10 text-white font-bold' 
                              : 'border-white/5 bg-[#131313] text-zinc-400 hover:border-white/10'
                          }`}
                        >
                          <span className="material-symbols-outlined text-lg">{item.id}</span>
                          <span className="text-[10px]">{item.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    if (!newExName || !newExMuscle) {
                      alert('يرجى ملء جميع الحقول');
                      return;
                    }
                    if (modalTarget === 'custom') {
                      setCustomScheduleExercises(prev => [
                        ...prev,
                        {
                          id: String(Date.now()),
                          name: newExName,
                          duration: newExDuration,
                          muscle: newExMuscle,
                          icon: newExIcon
                        }
                      ]);
                    } else {
                      setPostWorkoutExercises(prev => [
                        ...prev,
                        {
                          id: String(Date.now()),
                          name: newExName,
                          duration: newExDuration,
                          muscle: newExMuscle,
                          image: '' // Fallback to icon
                        }
                      ]);
                    }
                    // Reset
                    setNewExName('');
                    setNewExMuscle('');
                    setNewExDuration(5);
                    setShowAddModal(false);
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-[#e08dff] to-[#bc00fb] text-white text-sm font-bold rounded-xl active:scale-95 transition-all shadow-lg shadow-purple-500/20"
                >
                  إضافة التمرين
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 bg-zinc-800 border border-white/5 text-zinc-300 text-sm font-bold rounded-xl active:scale-95 transition-all"
                >
                  إلغاء
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Visual Floating Elements */}
      <div className="fixed bottom-10 right-10 w-32 h-32 bg-[#00fcca]/5 blur-[100px] pointer-events-none z-[-1]"></div>
      <div className="fixed top-40 left-0 w-48 h-48 bg-[#e08dff]/5 blur-[120px] pointer-events-none z-[-1]"></div>
    </motion.div>
  );
}
