const fs = require('fs');

const bases = {
  'الصدر': [
    { ar: 'ضغط بالبار', en: 'barbell bench press' },
    { ar: 'تفتيح بالدمبلز', en: 'dumbbell chest fly' },
    { ar: 'ضغط بالدمبلز', en: 'dumbbell bench press' },
    { ar: 'بول أوفر', en: 'dumbbell pullover' },
    { ar: 'ضغط بالجهاز', en: 'machine chest press' },
    { ar: 'ضغط مائل', en: 'incline bench press' },
    { ar: 'كروس أوفر', en: 'cable crossover' },
    { ar: 'تمرين الضغط', en: 'push up' },
    { ar: 'ضغط سفلي', en: 'decline bench press' }
  ],
  'الظهر': [
    { ar: 'سحب أمامي', en: 'lat pulldown' },
    { ar: 'سحب أرضي', en: 'seated cable row' },
    { ar: 'تجديف بالبار', en: 'barbell row' },
    { ar: 'تجديف بالدمبل', en: 'dumbbell row' },
    { ar: 'ديدليفت', en: 'deadlift' },
    { ar: 'عقلة', en: 'pull ups' },
    { ar: 'سحب ظهر مستقيم', en: 'straight arm pulldown' },
    { ar: 'رفرفة خلفية', en: 'rear delt fly' },
    { ar: 'تجديف تي بار', en: 't bar row' }
  ],
  'الكتف': [
    { ar: 'ضغط أمامي', en: 'overhead press' },
    { ar: 'ضغط خلفي', en: 'behind the neck press' },
    { ar: 'رفرفة جانبية', en: 'lateral raise' },
    { ar: 'رفرفة أمامية', en: 'front raise' },
    { ar: 'سحب للذقن', en: 'upright row' },
    { ar: 'أرنولد بريس', en: 'arnold press' },
    { ar: 'ضغط كتف بالدمبلز', en: 'dumbbell shoulder press' }
  ],
  'الأرجل': [
    { ar: 'سكوات أمامي', en: 'front squat' },
    { ar: 'سكوات خلفي', en: 'back squat' },
    { ar: 'لنجز (طعنات)', en: 'lunges' },
    { ar: 'دفع أرجل', en: 'leg press' },
    { ar: 'رفرفة أمامي', en: 'leg extension' },
    { ar: 'رفرفة خلفي', en: 'leg curl' },
    { ar: 'سميث سكوات', en: 'smith machine squat' },
    { ar: 'سومو ديدليفت', en: 'sumo deadlift' },
    { ar: 'رفع سمانة', en: 'calf raise' },
    { ar: 'تمرين خطوة الصندوق', en: 'box step up' }
  ],
  'الذراعين': [
    { ar: 'بايسيبس بالبار', en: 'barbell bicep curl' },
    { ar: 'بايسيبس بالدمبلز', en: 'dumbbell bicep curl' },
    { ar: 'ترايسيبس سحب', en: 'tricep pushdown' },
    { ar: 'ترايسيبس فرنسي', en: 'skull crusher' },
    { ar: 'مطرقة', en: 'hammer curl' },
    { ar: 'تركيز بايسيبس', en: 'concentration curl' },
    { ar: 'غطس', en: 'tricep dips' },
    { ar: 'ضغط ضيق', en: 'close grip bench press' }
  ],
  'البطن والجذع': [
    { ar: 'كرانشز', en: 'crunches' },
    { ar: 'بلانك', en: 'plank' },
    { ar: 'دوران روسي', en: 'russian twist' },
    { ar: 'رفع أرجل', en: 'leg raises' },
    { ar: 'طي الركبتين', en: 'knee tucks' },
    { ar: 'بلانك جانبي', en: 'side plank' },
    { ar: 'تمرين العجلة', en: 'ab wheel rollout' },
    { ar: 'ستريتش جذع', en: 'cobra stretch' }
  ]
};

let tests = [];
let idCounter = 1;

for (const [muscle, exercises] of Object.entries(bases)) {
  for (const ex of exercises) {
    const encodedPrompt = encodeURIComponent(`man doing ${ex.en} at gym realistic highly detailed photography`);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=600&nologo=true&seed=${idCounter}`;

    const variations = [
      { name: `${ex.ar} - مستوى المبتدئين`, desc: `اختبار ${ex.ar} مخصص للمبتدئين للتركيز على الأداء الحركي الصحيح بدون أوزان ثقيلة.` },
      { name: `${ex.ar} - الأداء المتقدم`, desc: `نسخة متقدمة من ${ex.ar} لاختبار أقصى قوة (1RM) والمدى الحركي الكامل.` }
    ];

    if (Math.random() > 0.5) {
      variations.push({ name: `${ex.ar} - بالاعتماد على الثبات`, desc: `اختبار قدرة التحمل العضلي أثناء أداء ${ex.ar} مع الثبات لمدة 3 ثوانٍ في النزول.` });
    }

    variations.forEach((v, index) => {
      // Slightly change the prompt for variations to get a unique but related image
      const varPrompt = encodeURIComponent(`man doing ${ex.en} at gym realistic highly detailed photography variation ${index}`);
      const varImageUrl = `https://image.pollinations.ai/prompt/${varPrompt}?width=800&height=600&nologo=true&seed=${idCounter + index}`;

      tests.push({
        id: `test-${idCounter++}`,
        title: v.name,
        category: muscle,
        image: varImageUrl,
        description: v.desc,
        executionSteps: [
          'تأكد من الإحماء الجيد قبل البدء.',
          'اتخذ وضعية البداية الصحيحة وحافظ على استقامة ظهرك.',
          'قم بأداء الحركة بمدى حركي كامل وبتحكم تام.',
          'حافظ على وتيرة تنفس منتظمة (الزفير عند الجهد).',
          'عد لوضع البداية وكرر الحركة بناءً على الهدف.'
        ],
        safetyWarnings: [
          'احذر من استخدام أوزان ثقيلة دون إتقان التكنيك أولاً.',
          'توقف فوراً عند الشعور بأي ألم حاد في المفاصل.',
          'استعن بزميل (Spotter) عند الأوزان القصوى.'
        ]
      });
    });
  }
}

const fileContent = `export interface PerformanceTest {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  executionSteps: string[];
  safetyWarnings: string[];
}

export const PERFORMANCE_TESTS: PerformanceTest[] = ${JSON.stringify(tests, null, 2)};
`;

fs.mkdirSync('./src/data', { recursive: true });
fs.writeFileSync('./src/data/performanceTests.ts', fileContent);
console.log(`Generated ${tests.length} tests with unique AI images!`);
