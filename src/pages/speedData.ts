import { Exercise } from '../types'; // Adjust as needed

const startExercises: Exercise[] = [
  { name: 'انطلاق من المكعبات (Block Starts)', sets: 4, reps: '10 م', rest: '3 د', muscle: 'زاوية الانطلاق', note: 'ركز على الدفع القوي بالقدمين واستقامة الجسم تدريجياً.', alternatives: ['انطلاق من وضعية 3 نقاط'] },
  { name: 'انطلاق السقوط (Falling Starts)', sets: 4, reps: '15 م', rest: '2 د', muscle: 'مركز الثقل', note: 'الميل للأمام حتى تفقد توازنك ثم الانطلاق السريع.', alternatives: ['انطلاق القفز (Jump Starts)'] },
  { name: 'وضعية الثلاث نقاط (3-Point Stance)', sets: 4, reps: '20 م', rest: '3 د', muscle: 'قوة التسارع', note: 'يد واحدة على الأرض، والتركيز على انفجار الذراع المعاكس.', alternatives: ['انطلاق من الجلوس'] },
  { name: 'سبرنت استجابة (Reaction Sprints)', sets: 5, reps: '10 م', rest: '2 د', muscle: 'سرعة الاستجابة الصوتية', note: 'الانطلاق فور سماع إشارة المدرب أو الصافرة.', alternatives: ['سبرنت الاستجابة البصرية'] },
];

const speedExercises: Exercise[] = [
  { name: 'سبرنت طائر 30 متر (Flying 30s)', sets: 4, reps: '30 م', rest: '4-5 د', muscle: 'السرعة القصوى', note: 'الجري المتزايد 20م ثم الحفاظ على أقصى سرعة لـ 30م.', alternatives: ['Flying 20s'] },
  { name: 'سبرنت 60 متر', sets: 4, reps: '60 م', rest: '5 د', muscle: 'السرعة القصوى والتحمل', note: 'ركز على استرخاء الوجه والكتفين أثناء السرعة.', alternatives: ['سبرنت 80 متر'] },
  { name: 'تدريب السرعة الزائدة (Overspeed)', sets: 3, reps: '20 م', rest: '4 د', muscle: 'الجهاز العصبي', note: 'الجري بنزول خفيف أو سحب خفيف جدًا لتجاوز سرعتك المعتادة.', alternatives: ['الجري بمساعدة الرياح (Tailwind)'] },
  { name: 'الجري برفع الركبتين (High Knees)', sets: 4, reps: '20 م', rest: '90 ث', muscle: 'تردد الخطوة', note: 'ركز على السرعة وليس المسافة المقطوعة.', alternatives: ['A-Skips السريعة'] },
];

const powerExercises: Exercise[] = [
  { name: 'رمي الكرة الطبية (Med Ball Throws)', sets: 4, reps: '8', rest: '90 ث', muscle: 'طاقة الجسم الكاملة', note: 'الرمي بأقصى قوة ممكنة سواء للأعلى أو للأمام.', alternatives: ['رمي الكرة للخلف'] },
  { name: 'القفز العريض (Broad Jumps)', sets: 4, reps: '5', rest: '90 ث', muscle: 'قوة الساقين الأفقية', note: 'قفز متتالي لأقصى مسافة مع التركيز على هبوط متزن.', alternatives: ['قفز الحواجز'] },
  { name: 'كلين القوة (Power Cleans)', sets: 4, reps: '5', rest: '2-3 د', muscle: 'الانفجار العضلي', note: 'تمرين رفع أثقال أساسي لبناء القدرة الانفجارية.', alternatives: ['سحب الخطف المرتفع (High Pulls)'] },
  { name: 'دفع المزلقة (Sled Pushes)', sets: 4, reps: '20 م', rest: '2 د', muscle: 'قوة الدفع', note: 'دفع بأقصى سرعة وقوة.', alternatives: ['سحب المزلقة'] },
];

const endoExercises: Exercise[] = [
  { name: 'تكرارات 150 متر (150m Repeats)', sets: 4, reps: '150 م', rest: '4 د', muscle: 'التحمل اللاهوائي', note: 'الركض بنسبة 90-95% من سرعتك القصوى.', alternatives: ['تكرارات 100 متر'] },
  { name: 'جري إيقاعي 200 متر (Tempo Runs)', sets: 3, reps: '200 م', rest: '3 د', muscle: 'كفاءة الحركة', note: 'الركض السلس بنسبة 75-80% لتعويد الجسم على التخلص من اللاكتيك.', alternatives: ['تكرارات 300 متر إيقاعي'] },
  { name: 'سبرنت التلال (Hill Sprints)', sets: 5, reps: '40 م', rest: '2-3 د', muscle: 'قوة الدفع والتحمل', note: 'اختر تلاً بميل 10-15 درجة للركض بأقصى قوة.', alternatives: ['سبرنت بمقاومة الزلاجة'] },
  { name: 'انطلاقات متقطعة (Fartlek)', sets: 1, reps: '10 د', rest: 'بدون', muscle: 'التحمل الهوائي/اللاهوائي', note: 'التبديل بين الهرولة السريعة والجري البطيء كل دقيقة.', alternatives: ['جري متواصل سريع (Tempo 15m)'] },
];

const agilityExercises: Exercise[] = [
  { name: 'In-and-Out (سلم)', sets: 3, reps: '6-8', rest: '60 ث', muscle: 'تنسيق القدمين', note: 'دخول وخروج سريع على سلم الرشاقة.', alternatives: ['Lateral Run (سلم)'] },
  { name: 'Ickey Shuffle', sets: 4, reps: '6-8', rest: '60 ث', muscle: 'سرعة الاستجابة', note: 'التمرين الأكثر شهرة على سلم الرشاقة.', alternatives: ['Ali Shuffle'] },
  { name: 'T-Drill (أقماع)', sets: 4, reps: '6', rest: '60 ث', muscle: 'الحركة متعددة الاتجاهات', note: 'يركز على تغيير الاتجاه الأمامي والجانبي والخلفي.', alternatives: ['L-Drill'] },
  { name: 'Pro Agility 5-10-5', sets: 3, reps: '6', rest: '90 ث', muscle: 'الانطلاق المتبادل', note: 'معيار عالمي للقدرة على الانطلاق وتغيير الاتجاه المفاجئ.', alternatives: ['Shuttle Run (10m)'] },
  { name: 'قفز جانبي (Lateral Bounds)', sets: 3, reps: '10', rest: '60 ث', muscle: 'الرشاقة الجانبية', note: 'تطوير القوة الجانبية والثبات.', alternatives: ['قفز التزلج'] },
];

const balanceExercises: Exercise[] = [
  { name: 'الوقوف على قدم واحدة', sets: 3, reps: '45 ث', rest: '45 ث', muscle: 'الكاحل والكور', note: 'تمرين أساسي للتوازن الثابت.', alternatives: ['الوقوف على وسادة التوازن', 'الوقوف مع إغلاق العينين'] },
  { name: 'الرفعة المميتة على قدم واحدة', sets: 3, reps: '10 لكل قدم', rest: '60 ث', muscle: 'أوتار الركبة والمؤخرة', alternatives: ['رفعة مميتة بالدمبلز', 'جسر المؤخرة بقدم واحدة'] },
  { name: 'سكوات على كرة البوسو', sets: 3, reps: '12-15', rest: '60 ث', muscle: 'الفخذين والكور', note: 'تحدي متقدم لاستقرار الجسم.', alternatives: ['سكوات بوزن الجسم', 'طعنات جانبية'] },
  { name: 'بلانك مع رفع الأطراف', sets: 3, reps: '10 لكل جانب', rest: '45 ث', muscle: 'الكور', note: 'حافظ على استقامة الظهر.', alternatives: ['بلانك جانبي', 'تمرين سوبرمان'] },
  { name: 'اندفاع مع دوران الجذع', sets: 3, reps: '10 لكل قدم', rest: '60 ث', muscle: 'الأرجل والكور', alternatives: ['طعنات مشي', 'اندفاع خلفي'] },
];

const neuroExercises: Exercise[] = [
  { name: 'A-Skips', sets: 4, reps: '20 م', rest: '45 ث', muscle: 'التوافق الحركي', note: 'رفع الركبة مع نقر القدم بالأرض بقوة وإيقاع.', alternatives: ['High Knees'] },
  { name: 'B-Skips', sets: 4, reps: '20 م', rest: '45 ث', muscle: 'ميكانيكا الجري', note: 'دوران القدم للأمام بعد رفع الركبة لتعزيز خطوة الجري.', alternatives: ['C-Skips'] },
  { name: 'Fast Feet (الخطوات السريعة)', sets: 3, reps: '15 ث', rest: '60 ث', muscle: 'تردد الخطوة', note: 'لمس الأرض بأقصى سرعة ممكنة في المكان.', alternatives: ['Pogo Jumps'] },
  { name: 'Hurdle Hops (قفز الحواجز المتبادل)', sets: 4, reps: '8 حواجز', rest: '60 ث', muscle: 'سرعة رد الفعل العصبي', note: 'قفز سريع ومتتالي فوق حواجز منخفضة.', alternatives: ['قفز المربعات'] },
];

const plyoExercises: Exercise[] = [
  { name: 'قفزة الصندوق (Box Jumps)', sets: 4, reps: '5', rest: '120 ث', muscle: 'الفخذين والسمانة', note: 'التركيز على الهبوط الناعم والتحكم الكامل.', alternatives: ['القفز العريض (Broad Jumps)', 'صعود الدرج المتفجر'] },
  { name: 'القفز العميق (Depth Jumps)', sets: 3, reps: '5', rest: '180 ث', muscle: 'الأرجل والجهاز العصبي', note: 'القفز من ارتفاع ثم القفز للأعلى فوراً.', alternatives: ['قفز الحواجز المتتالية'] },
  { name: 'القفز الجانبي (Lateral Bounds)', sets: 4, reps: '5 لكل جانب', rest: '90 ث', muscle: 'الفخذ الخارجي', note: 'تطوير القوة الجانبية والثبات.', alternatives: ['قفز التزلج (Skater Jumps)'] },
  { name: 'قفز القرفصاء (Squat Jumps)', sets: 4, reps: '8', rest: '90 ث', muscle: 'الفخذين والمؤخرة', note: 'انفجار للأعلى بأقصى سرعة ممكنة.', alternatives: ['قفز الركبتين للصدر (Tuck Jumps)'] },
  { name: 'بوش أب متفجر (Plyo Push-ups)', sets: 3, reps: '6-8', rest: '90 ث', muscle: 'الصدر والذراعين', note: 'الدفع بقوة حتى ترتفع اليدان عن الأرض.', alternatives: ['رمي الكرة الطبية للصدر', 'بوش أب سريع'] },
];

const shortSprintsExercises: Exercise[] = [
  { name: 'سبرنت 10 متر', sets: 5, reps: '10 م', rest: '2-3 د', muscle: 'التسارع الأولي', note: 'التركيز على الدفع القوي للأرض في أول 3 خطوات.', alternatives: ['انطلاق من السقوط 10 م'] },
  { name: 'سبرنت 20 متر', sets: 4, reps: '20 م', rest: '3 د', muscle: 'مرحلة الانتقال', note: 'حافظ على زاوية ميل الجسم للأمام.', alternatives: ['سبرنت من وضعية 3 نقاط'] },
  { name: 'سبرنت 30 متر', sets: 4, reps: '30 م', rest: '3-4 د', muscle: 'بلوغ السرعة', note: 'وصول تدريجي لوضعية الجري المستقيمة.', alternatives: ['Flying 20s'] },
  { name: 'سبرنت بالمقاومة', sets: 4, reps: '15 م', rest: '3 د', muscle: 'قوة الدفع', note: 'استخدم حزام مقاومة أو مزلقة بوزن خفيف (10% من وزنك).', alternatives: ['سبرنت التلال القصير'] },
];

export const speedProgramDays = [
  { title: 'انطلاق السرعة (Starting Block)', exercises: startExercises },
  { title: 'السرعة القصوى (Max Speed)', exercises: speedExercises },
  { title: 'القوة الانفجارية (Explosive Power)', exercises: powerExercises },
  { title: 'تحمل السرعة (Speed Endurance)', exercises: endoExercises },
  { title: 'الرشاقة (Agility)', exercises: agilityExercises },
  { title: 'التوازن (Balance)', exercises: balanceExercises },
  { title: 'التوافق العضلي العصبي', exercises: neuroExercises },
  { title: 'البليومتريك (Plyometrics)', exercises: plyoExercises },
  { title: 'السرعات القصيرة (Short Sprints)', exercises: shortSprintsExercises }
];
