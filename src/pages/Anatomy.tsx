import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { ShinyText } from '../components/react-bits/ShinyText';
import { BackButton } from '../components/BackButton';

const sections = [
  {
    id: 'sliding',
    icon: 'science',
    title: 'ميكانيكية الانقباض العضلي',
    subtitle: 'نظرية الخيوط المنزلقة وتوليد القوة',
    color: '#e08dff',
    content: [
      {
        heading: 'نظرية الخيوط المنزلقة (Sliding Filament Theory)',
        text: 'الأساس العلمي لأي حركة تقوم بها! تنقبض العضلة عندما تنزلق خيوط بروتين الميوسين (Myosin) السميكة فوق خيوط الأكتين (Actin) الرفيعة داخل وحدة الساركومير (Sarcomere) — أصغر وحدة وظيفية في الليف العضلي. تتطلب هذه العملية جزيئات الطاقة (ATP) والكالسيوم لفك ارتباط الخيوط وإعادة تكوينها بسرعة فائقة تصل لـ 50 دورة/ثانية.'
      },
      {
        heading: 'دور الكالسيوم والتروبونين',
        text: 'عندما تصل الإشارة العصبية للعضلة، يتحرر الكالسيوم من الشبكة الساركوبلازمية (SR) ويرتبط ببروتين التروبونين-C على خيوط الأكتين. هذا الارتباط يُزيح بروتين التروبوميوسين من مواقع الارتباط، مما يكشف المواقع النشطة ليتمكن رأس الميوسين من الإمساك بالأكتين وتنفيذ "ضربة القوة" (Power Stroke). بدون كالسيوم كافٍ — لا انقباض! هذا هو سبب أهمية تناول الكالسيوم والمغنيسيوم للرياضيين.'
      },
      {
        heading: 'دورة الجسور العرضية (Cross-Bridge Cycle)',
        text: 'تتكون دورة الانقباض من 4 خطوات: 1) الارتباط: رأس الميوسين المُنشط (المحمّل بـ ATP مُتحلل) يرتبط بالأكتين. 2) ضربة القوة: يدور رأس الميوسين ويسحب الأكتين نحو مركز الساركومير (يقصر الساركومير بمقدار 10 نانومتر). 3) الانفصال: جزيء ATP جديد يرتبط بالميوسين فينفصل عن الأكتين. 4) إعادة التنشيط: يتحلل الـ ATP إلى ADP+Pi ويعود رأس الميوسين لوضع التجهيز. هذه الدورة تتكرر آلاف المرات في الثانية في كل ساركومير!'
      },
      {
        heading: 'الانقباض المركزي (Concentric)',
        text: 'تقصر العضلة أثناء توليد القوة — أي أن قوة العضلة تتغلب على المقاومة الخارجية. مثال كلاسيكي: رفع الوزن في تمرين البايسبس (الصعود). هذا النوع هو الأضعف من حيث إنتاج القوة (أقل بـ 20-30% من اللامركزي) لكنه الأهم لبناء القوة الانفجارية والسرعة. يستهلك ATP بمعدل مرتفع جداً.'
      },
      {
        heading: 'الانقباض اللامركزي (Eccentric)',
        text: 'تطول العضلة تحت الحمل — أي أن المقاومة الخارجية تتغلب على قوة العضلة. مثال: إنزال الوزن ببطء في البايسبس (النزول المتحكم). هو المحفز الأكبر للتمزقات المجهرية المسببة للبناء العضلي (Hypertrophy) وألم العضلات المتأخر (DOMS). ينتج قوة أكبر بـ 20-60% من المركزي بنفس التنشيط العصبي! التدريب اللامركزي يُعيد هيكلة الأوتار ويُستخدم في تأهيل التهاب وتر أخيل والرضفة.'
      },
      {
        heading: 'الانقباض الثابت (Isometric)',
        text: 'تُنتج العضلة قوة بدون تغيير في طولها — تتعادل القوة العضلية مع المقاومة. مثال: تمرين البلانك، الإمساك بالوزن في منتصف الحركة. يبني قوة هائلة في الزاوية المحددة فقط (±15 درجة)، مع نقل محدود لباقي المدى الحركي. يرفع ضغط الدم بشكل حاد أثناء الأداء (تأثير فالسالفا)، لذا يجب الحذر لمرضى القلب. يُستخدم بكثرة في التأهيل لأنه يُسيطر على الألم عبر تثبيط مسارات الألم.'
      },
      {
        heading: 'الانقباض البليومتري (Plyometric / SSC)',
        text: 'دورة الإطالة-التقصير (Stretch-Shortening Cycle): العضلة تُمطط بسرعة (لامركزي) ثم تنقبض فوراً (مركزي). هذا التسلسل يُخزّن طاقة مرنة في الأوتار ويُفعّل منعكس الإطالة العضلي (Stretch Reflex)، مما ينتج قوة أعلى بـ 25-30% مقارنة بالانقباض المركزي وحده! مثال: القفز العمودي، الجري (كل خطوة هي SSC!). ضروري للسرعة والقوة الانفجارية في كل الرياضات.'
      }
    ]
  },
  {
    id: 'fibers',
    icon: 'genetics',
    title: 'تصنيف الألياف العضلية المتقدم',
    subtitle: 'الخصائص الفسيولوجية والتدريبية لكل نوع',
    color: '#ff928a',
    content: [
      {
        heading: 'الألياف بطيئة الانقباض — Type I (Slow Oxidative)',
        text: 'الخصائص: لون أحمر داكن بسبب وفرة الميوجلوبين (بروتين تخزين الأكسجين) والميتوكوندريا (مصانع الطاقة الهوائية). قطر صغير نسبياً. مقاومة فائقة للتعب. الوقود: تعتمد على الأكسجين والأحماض الدهنية كوقود أساسي (النظام المؤكسد). سرعة الانقباض: بطيئة (110 مللي ثانية). القوة: منخفضة. الهيمنة: لدى عداءي الماراثون (80-90% من عضلات الساق)، السباحين للمسافات الطويلة، راكبي الدراجات. التدريب المثالي: تكرارات عالية (15-25+)، تمارين التحمل المستمرة، الكارديو الهوائي (Zone 2).'
      },
      {
        heading: 'الألياف سريعة الانقباض الانتقالية — Type IIa (Fast Oxidative-Glycolytic)',
        text: 'الخصائص: لون وردي. حجم أكبر من Type I. تجمع بين الأيض الهوائي واللاهوائي — "اللاعب الشامل". مقاومة متوسطة للتعب. الوقود: الغليكوجين + الأكسجين (نظام هجين). سرعة الانقباض: سريعة (50 مللي ثانية). القوة: متوسطة إلى عالية. الميزة الفريدة: أكثر الألياف قابلية للتكيف! يمكنها أن تتحول لتصبح أشبه بـ Type I مع تدريب التحمل، أو أشبه بـ Type IIx مع تدريب القوة. الهيمنة: الرياضات المختلطة (كرة القدم، كرة السلة، الفنون القتالية). التدريب المثالي: تكرارات متوسطة (8-12)، تدريبات التضخم العضلي (Hypertrophy Zone).'
      },
      {
        heading: 'الألياف فائقة السرعة — Type IIx (Fast Glycolytic)',
        text: 'الخصائص: لون أبيض (قليلة الميوجلوبين والميتوكوندريا). أكبر قطراً وأسرع انقباضاً. تتعب بسرعة فائقة (ثوانٍ معدودة). الوقود: الغليكوجين فقط — عبر نظام الفوسفاجين (ATP-PC) والتحلل اللاهوائي (Glycolysis). سرعة الانقباض: فائقة السرعة (25 مللي ثانية). القوة: قصوى / انفجارية. الهيمنة: العدائين السريعين (عدو 100م)، الوثابين، رافعي الأثقال الأولمبيين. التدريب المثالي: تكرارات منخفضة (1-5) بأوزان ثقيلة جداً (85-100% 1RM)، تدريب القوة القصوى والسرعة. حقيقة صادمة: الأشخاص غير النشطين يفقدون هذه الألياف مع التقدم بالعمر، مما يُسبب بطء الحركة وضعف ردود الفعل!'
      },
      {
        heading: 'مبدأ حجم هينمان (Henneman\'s Size Principle)',
        text: 'قانون عصبي أساسي: الجهاز العصبي يُجنّد الوحدات الحركية بترتيب تصاعدي من الأصغر (Type I) إلى الأكبر (Type IIx) حسب الحاجة. في الأحمال الخفيفة: تعمل Type I فقط. مع زيادة المقاومة: تُضاف Type IIa. في الأحمال القصوى أو عند الاقتراب من الفشل العضلي: تُجنّد Type IIx. التطبيق العملي: لتفعيل جميع الألياف العضلية، إما استخدم أوزاناً ثقيلة (>85% 1RM) أو أوزاناً خفيفة مع الوصول للفشل العضلي. كلا الطريقتين تُحقق تجنيداً كاملاً!'
      },
      {
        heading: 'التضخم العضلي (Hypertrophy) مقابل فرط التنسج (Hyperplasia)',
        text: 'التضخم (Hypertrophy): زيادة حجم الألياف العضلية الموجودة — وهو الآلية الرئيسية لنمو العضلات لدى البشر. يحدث عبر: 1) تضخم الميوفيبريلات (زيادة عدد الساركوميرات — قوة حقيقية). 2) تضخم الساركوبلازم (زيادة سوائل الخلية والغليكوجين — حجم مظهري). فرط التنسج (Hyperplasia): زيادة عدد الألياف العضلية — مثبت في الحيوانات لكن لا يزال محل جدل عند البشر. بعض الأبحاث تُشير لحدوثه بنسبة بسيطة مع التدريب المكثف لسنوات طويلة عبر انقسام الألياف المتضخمة.'
      },
      {
        heading: 'الذاكرة العضلية (Muscle Memory)',
        text: 'ظاهرة حقيقية مُثبتة علمياً! عندما تتضخم العضلات، تكتسب الألياف نوى خلوية إضافية (Myonuclei) من الخلايا الساتلية (Satellite Cells). عند التوقف عن التدريب، تنكمش العضلات لكن النوى الإضافية تبقى لسنوات طويلة (ربما للأبد!). هذا هو السر في سرعة استعادة الحجم العضلي عند العودة للتدريب بعد انقطاع — العضلة لا تبدأ من الصفر بل لديها "مخطط بناء" جاهز.'
      }
    ]
  },
  {
    id: 'chest',
    icon: 'shield',
    title: 'عضلات الصدر (Pectorals)',
    subtitle: 'Pectoralis Major & Minor — محرك الدفع والضغط',
    color: '#e08dff',
    content: [
      {
        heading: 'التشريح التفصيلي',
        text: 'الصدرية الكبرى (Pectoralis Major): عضلة مسطحة كبيرة على شكل مروحة تغطي الجزء الأمامي من الصدر. تنقسم إلى: 1) الجزء الترقوي (Clavicular Head): ينشأ من الترقوة — يُسمى "الصدر العلوي". 2) الجزء القصي-الضلعي (Sternocostal Head): ينشأ من عظمة القص والغضاريف الضلعية — يُسمى "الصدر الأوسط والسفلي". كلا الجزئين يندمجان ويرتبطان بعظمة العضد (Humerus). الصدرية الصغرى (Pectoralis Minor): عضلة رقيقة مثلثة تحت الكبرى، ترتبط بلوح الكتف وتسحبه للأمام وللأسفل.'
      },
      {
        heading: 'الوظائف الحركية',
        text: 'الوظيفة الأساسية: التقريب الأفقي للذراع (Horizontal Adduction) — أي دفع الذراع أمام الجسم. الدوران الداخلي لعظمة العضد (Internal Rotation). الثني (Flexion): الجزء الترقوي يرفع الذراع للأمام (مشترك مع الدالية الأمامية). البسط (Extension): الجزء القصي يسحب الذراع لأسفل من وضع الرفع. التقريب (Adduction): ضم الذراعين نحو الجسم. في الحياة اليومية: الدفع، المعانقة، فتح الأبواب الثقيلة، رمي الكرة.'
      },
      {
        heading: 'تطبيقات تدريبية متقدمة',
        text: 'استهداف الصدر العلوي: بنش مائل (Incline Press) بزاوية 30-45 درجة. زاوية أعلى من 60 درجة تنقل الحمل للأكتاف! استهداف الصدر الأوسط: بنش مستوٍ (Flat Press)، الضغط بالدمبلز، تمرين الكروس أوفر. استهداف الصدر السفلي: بنش منحدر (Decline Press)، تمرين الديبس (Dips). مبدأ مهم: الدامبلز توفر مدى حركي أوسع من البار، مما يزيد إطالة العضلة ويُحفز نمواً أكبر (Stretch-Mediated Hypertrophy). نصيحة: ابدأ بتمارين الصدر العلوي لأنه الجزء الأضعف عند معظم المتدربين.'
      },
      {
        heading: 'الإصابات الشائعة والوقاية',
        text: 'تمزق الصدرية الكبرى: إصابة خطيرة تحدث غالباً أثناء البنش بريس بأوزان ثقيلة عند النقطة السفلى (التمدد الأقصى). عوامل الخطر: إحماء غير كافٍ، استخدام الستيرويدات (تضعف الأوتار)، ارتداد الوزن بعنف من الصدر. الوقاية: إحماء تدريجي (3-4 مجموعات تصاعدية)، تجنب التمدد المفرط تحت حمل ثقيل، تقوية عضلات الكفة المدورة (Rotator Cuff) للحفاظ على استقرار مفصل الكتف.'
      }
    ]
  },
  {
    id: 'back',
    icon: 'layers',
    title: 'عضلات الظهر (Back Complex)',
    subtitle: 'Lats, Rhomboids, Traps, Erectors — عمق وعرض',
    color: '#00fcca',
    content: [
      {
        heading: 'العضلة المجنصة (Latissimus Dorsi — "The Lats")',
        text: 'أكبر عضلة في الجزء العلوي من الجسم! تمتد من أسفل الظهر وعظم الحوض إلى عظمة العضد. الوظيفة: البسط (Extension)، التقريب (Adduction)، والدوران الداخلي للذراع. هي المسؤولة الأولى عن "عرض الظهر" وشكل V-Taper المميز. التمارين الأساسية: العقلة (Pull-up)، السحب العلوي (Lat Pulldown)، سحب الكابل بالذراع المستقيمة (Straight-Arm Pulldown). القبضة: القبضة الواسعة تستهدف الألياف العلوية (العرض)، والقبضة الضيقة تستهدف الألياف السفلية (العمق).'
      },
      {
        heading: 'عضلات الترابيس (Trapezius)',
        text: 'عضلة كبيرة على شكل شبه منحرف تمتد من قاعدة الجمجمة إلى منتصف الظهر. تنقسم لثلاثة أجزاء: 1) الترابيس العلوي: رفع الأكتاف (Shrugging) — يُستهدف بالشرقز والرفعة الميتة. 2) الترابيس الأوسط: تقريب ألواح الكتف (Retraction) — يُستهدف بتمارين السحب الأفقي (Rows) مع ضغط الكتفين للخلف. 3) الترابيس السفلي: خفض ألواح الكتف وتثبيتها — مُهمل بشدة! ضعفه يُسبب انحناء الأكتاف للأمام. يُستهدف بتمرين Face Pulls وY-Raise.'
      },
      {
        heading: 'المعينيات (Rhomboids) وتحت الشوكية (Infraspinatus)',
        text: 'المعينيات: تقع بين العمود الفقري ولوح الكتف. وظيفتها تقريب لوح الكتف (Scapular Retraction) — مسؤولة عن "سُمك" وكثافة الظهر. تعمل مع الترابيس الأوسط. تُستهدف بتمارين السحب الأفقي مع التركيز على "عصر" ألواح الكتف. تحت الشوكية: جزء من الكفة المدورة (Rotator Cuff)، مسؤولة عن الدوران الخارجي للكتف وتثبيت مفصل الكتف. ضعفها = إصابات كتف متكررة! يجب تدريبها بتمارين الدوران الخارجي بالكابل أو الدمبل.'
      },
      {
        heading: 'الناصبة الفقرية (Erector Spinae)',
        text: 'مجموعة من ثلاث عضلات طويلة تمتد على طول العمود الفقري من الحوض إلى الجمجمة: Iliocostalis، Longissimus، Spinalis. الوظيفة: بسط (Extension) العمود الفقري — أي إرجاع الجذع للخلف من وضع الانحناء. تثبيت العمود الفقري أثناء الحركة والوقوف. الدوران الجانبي للجذع. التمارين: الرفعة الميتة (Deadlift) هي الملك! البسط الخلفي (Back Extension)، تمرين Good Morning. تحذير: ضعف الناصبة الفقرية هو السبب الأول لآلام أسفل الظهر المزمنة. تقويتها يحمي من الانزلاق الغضروفي.'
      },
      {
        heading: 'تطبيقات: بناء ظهر ثلاثي الأبعاد',
        text: 'لبناء ظهر متكامل يجب الجمع بين 3 أنماط حركية: 1) السحب الرأسي (Vertical Pull): عقلة، سحب علوي — يبني العرض عبر استهداف المجنص. 2) السحب الأفقي (Horizontal Pull): تجديف بالبار، تجديف بالدمبل، تجديف بالكابل — يبني السمك عبر المعينيات والترابيس الأوسط. 3) البسط (Hip Hinge): رفعة ميتة، Good Morning — يبني أسفل الظهر والناصبة الفقرية. النسبة المثالية: 2:1 نسبة سحب إلى دفع (أي تمرينا ظهر لكل تمرين صدر) لمنع انحناء الأكتاف الأمامي.'
      }
    ]
  },
  {
    id: 'legs',
    icon: 'directions_walk',
    title: 'عضلات الأرجل والحوض (Lower Body)',
    subtitle: 'Quads, Hamstrings, Glutes, Calves — 60% من الكتلة العضلية',
    color: '#ff928a',
    content: [
      {
        heading: 'الكوادريسبس (الرباعية الرؤوس)',
        text: 'أقوى مجموعة عضلية في الجسم! تتكون من 4 عضلات: 1) Rectus Femoris: العضلة الوحيدة التي تعبر مفصلين (الورك والركبة) — تثني الورك وتمد الركبة. 2) Vastus Lateralis: الأكبر — تشكل الجانب الخارجي للفخذ. 3) Vastus Medialis (VMO): الدمعة فوق الركبة — ضعفها مرتبط بآلام الركبة الأمامية. 4) Vastus Intermedius: الأعمق — تقع تحت Rectus Femoris. الوظيفة الأساسية: بسط (مد) الركبة. التمارين: السكوات (Squat) بأنواعه، الليج بريس (Leg Press)، الليج إكستنشن (Leg Extension) لعزل VMO.'
      },
      {
        heading: 'الهامسترنج (عضلات الفخذ الخلفية)',
        text: 'مجموعة من 3 عضلات: Biceps Femoris (طويلة وقصيرة)، Semitendinosus، Semimembranosus. الوظيفة: ثني الركبة وبسط مفصل الورك (مد الجذع للخلف). تعمل كـ "فرامل" ديناميكية أثناء الجري والقفز. الإصابة الأكثر شيوعاً: تمزق الهامسترنج — السبب الأول لغياب لاعبي كرة القدم! يحدث بسبب: عدم التوازن بين قوة الكوادز والهامسترنج (النسبة المثالية H:Q = 0.6-0.8)، ضعف الانقباض اللامركزي. التمارين: Romanian Deadlift (الأفضل!)، Nordic Hamstring Curl (وقائي بامتياز — يقلل إصابات الهامسترنج بنسبة 51%!)، Leg Curl.'
      },
      {
        heading: 'الأرداف (Gluteus Maximus, Medius, Minimus)',
        text: 'Gluteus Maximus: أكبر عضلة في الجسم البشري! مسؤولة عن بسط مفصل الورك (دفع الجسم للأمام أثناء المشي والجري والقفز) والدوران الخارجي للفخذ. تُنتج أعلى قوة في الجسم. Gluteus Medius و Minimus: تبعيد الفخذ (Abduction) وتثبيت الحوض أثناء الوقوف على ساق واحدة والجري. ضعفهما يُسبب "هبوط الحوض" (Trendelenburg Gait) ويزيد خطر إصابات الركبة. "متلازمة الأرداف الميتة" (Dead Butt Syndrome / Gluteal Amnesia): تحدث بسبب الجلوس لفترات طويلة — العضلة "تنسى" كيف تنشط! الحل: تمرينات التنشيط (Glute Bridges، Clamshells) قبل كل تمرين.'
      },
      {
        heading: 'عضلات الساق (Calves: Gastrocnemius & Soleus)',
        text: 'Gastrocnemius: ذات الرأسين (الجزء السطحي البارز)، تعبر مفصلي الركبة والكاحل. مسؤولة عن رفع الكعب بقوة (Plantar Flexion). غنية بالألياف السريعة — تستجيب لأوزان ثقيلة وتكرارات أقل. Soleus: تقع أسفل الـ Gastrocnemius، تعبر مفصل الكاحل فقط. غنية بالألياف البطيئة — تعمل كمحرك التحمل عند المشي والوقوف لفترات طويلة. تستجيب لتكرارات عالية (15-25). التطبيق: لبناء ساق ضخمة يجب استهداف كليهما: رفع الكعب واقفاً (Standing Calf Raise) للـ Gastrocnemius، ورفع الكعب جالساً (Seated Calf Raise) للـ Soleus.'
      },
      {
        heading: 'العضلة القطنية الحرقفية (Iliopsoas — Hip Flexor)',
        text: 'عضلة عميقة تربط العمود الفقري القطني بعظمة الفخذ. الوظيفة: ثني مفصل الورك (رفع الفخذ نحو الصدر). مهمة جداً للجري والركل وصعود الدرج. المشكلة: الجلوس لساعات طويلة يُقصّرها ويُشدّها، مما يسحب الحوض للأمام (Anterior Pelvic Tilt) ويُسبب آلام أسفل الظهر المزمنة. الحل: تمارين إطالة الـ Hip Flexor يومياً (Couch Stretch)، تقوية الأرداف والبطن لإعادة التوازن الحوضي.'
      }
    ]
  },
  {
    id: 'shoulders',
    icon: 'sports_martial_arts',
    title: 'عضلات الأكتاف (Deltoids & Rotator Cuff)',
    subtitle: 'المفصل الأكثر حركية وتعرضاً للإصابة',
    color: '#e08dff',
    content: [
      {
        heading: 'الدالية الأمامية (Anterior Deltoid)',
        text: 'الوظيفة: ثني الكتف (رفع الذراع أمام الجسم) والدوران الداخلي. تشارك بقوة في كل تمارين الدفع (البنش بريس، الدفع العلوي). غالباً لا تحتاج لتمارين عزل إضافية لأنها مُحفزة بكثرة في تمارين الصدر. التمارين: الرفع الأمامي (Front Raise)، الدفع العلوي (Overhead Press). تحذير: إفراط تدريب الدالية الأمامية مع إهمال الخلفية = اختلال وضعي وتدوير الأكتاف للداخل!'
      },
      {
        heading: 'الدالية الجانبية (Lateral Deltoid)',
        text: 'الوظيفة: تبعيد الذراع جانبياً (Abduction) — المسؤولة عن "عرض الأكتاف" والمظهر المدور. هي العضلة الأصعب في الاستهداف لأن ذراع العزم قصير جداً. أفضل التمارين: الرفرفة الجانبية بالدمبلز (Lateral Raise) — الزاوية المثلى هي ميل الجذع قليلاً للأمام مع إبقاء الإبهام مائلاً لأسفل قليلاً. الكابل يوفر توتراً ثابتاً أفضل من الدمبلز. التكرارات المثالية: 12-20 تكرار بأوزان خفيفة إلى متوسطة مع التركيز على الإحساس العضلي (Mind-Muscle Connection).'
      },
      {
        heading: 'الدالية الخلفية (Posterior Deltoid)',
        text: 'الوظيفة: بسط الكتف (سحب الذراع للخلف)، التقريب الأفقي، والدوران الخارجي. العضلة الأكثر إهمالاً! ضعفها يُسبب: انحناء الأكتاف للأمام (Rounded Shoulders)، خلل في استقرار مفصل الكتف، وزيادة خطر إصابات الكفة المدورة. التمارين: الرفرفة الخلفية (Reverse Fly)، Face Pull بالكابل (من أهم التمارين التصحيحية!)، تجديف عالي بقبضة واسعة. القاعدة الذهبية: لكل تمرين دفع يجب أداء تمرين سحب — وتخصيص عمل إضافي للدالية الخلفية 2-3 مرات أسبوعياً.'
      },
      {
        heading: 'الكفة المدورة (Rotator Cuff) — حارسة المفصل',
        text: '4 عضلات صغيرة تحيط بمفصل الكتف وتثبته: Supraspinatus (فوق الشوكية): تبدأ التبعيد — الأكثر عرضة للإصابة والتمزق. Infraspinatus (تحت الشوكية): الدوران الخارجي — ضرورية للرمي والإرسال. Teres Minor (المدورة الصغيرة): تُساعد في الدوران الخارجي. Subscapularis (تحت لوح الكتف): الدوران الداخلي — الأكبر في المجموعة. أهميتها: مفصل الكتف هو الأكثر حركية لكن الأقل استقراراً (الحُق ضحل جداً — كـ "كرة جولف على صحن صغير"). الكفة المدورة هي التي تمنع رأس العضد من الانزلاق. تقويتها بتمارين الدوران الداخلي والخارجي بأوزان خفيفة (2-5 كجم) ضرورة وقائية لكل رياضي!'
      }
    ]
  },
  {
    id: 'arms',
    icon: 'fitness_center',
    title: 'عضلات الذراعين والسواعد',
    subtitle: 'Biceps, Triceps, Brachialis, Forearms',
    color: '#00fcca',
    content: [
      {
        heading: 'البايسبس (Biceps Brachii — ثنائية الرؤوس)',
        text: 'تتكون من رأسين: الرأس الطويل (Long Head): يمر على الجزء الخارجي من العضد — يُستهدف أكثر عندما تكون الذراعين خلف الجسم (Incline Curls). الرأس القصير (Short Head): الجزء الداخلي — يُستهدف بتمارين الكيرل الواسعة وPreacher Curls. الوظائف: ثني المرفق (Elbow Flexion) + استلقاء الساعد (Supination — تدوير الكف للأعلى). للتحفيز الأقصى: أضف دوران الساعد خلال الحركة (Supinating Curl). حقيقة: البايسبس تشكل فقط 30% من حجم الذراع — الترايسبس أكبر!'
      },
      {
        heading: 'العضلة العضدية (Brachialis) — بطل الحجم المخفي',
        text: 'تقع تحت البايسبس مباشرة وتربط عظمة العضد بعظمة الزند. الوظيفة: ثني المرفق فقط (لا علاقة لها بدوران الساعد). هي في الواقع المُثنّي الأقوى للمرفق — أقوى من البايسبس! أهمية تدريبها: عندما تتضخم تدفع البايسبس للخارج وتُعطي الذراع مظهراً أعرض وأكثر ثلاثية الأبعاد. أفضل التمارين: Hammer Curls (القبضة المحايدة)، Reverse Curls (القبضة المقلوبة)، Cross-Body Hammer Curls.'
      },
      {
        heading: 'الترايسبس (Triceps Brachii — ثلاثية الرؤوس)',
        text: 'تشكل 70% من حجم الذراع! تتكون من 3 رؤوس: الرأس الطويل (Long Head): الوحيد الذي يعبر مفصل الكتف — يُستهدف أكثر عندما تكون الذراعين فوق الرأس (Overhead Extension). الرأس الجانبي (Lateral Head): يُشكل الحدبة الخارجية — يُستهدف بالـ Pushdowns بالحبل. الرأس الأوسط (Medial Head): الأعمق والأصغر — يعمل في كل حركات البسط. الوظيفة: بسط المرفق (مد الذراع) + بسط الكتف (الرأس الطويل). للذراعين الضخمة: ركّز 60% من تمارين الذراع على الترايسبس!'
      },
      {
        heading: 'عضلات الساعد (Forearms) — قوة القبضة',
        text: 'أكثر من 20 عضلة في الساعد! تنقسم لمجموعتين: المجموعة الأمامية (Flexors): ثني المعصم وأصابع اليد — مسؤولة عن قوة القبضة (Grip Strength). المجموعة الخلفية (Extensors): بسط المعصم والأصابع. Brachioradialis: أكبر عضلة في الساعد — تساعد في ثني المرفق خاصة بالقبضة المحايدة. أهمية تدريبها: قوة القبضة هي "الحلقة الأضعف" — إذا كانت ضعيفة ستحد من أداء كل تمارين السحب (الرفعة الميتة، العقلة، التجديف). تمارين: Wrist Curls، Farmer\'s Walks (أفضل تمرين شامل للسواعد!)، Dead Hangs.'
      }
    ]
  },
  {
    id: 'core',
    icon: 'emergency',
    title: 'عضلات الجذع والبطن (Core)',
    subtitle: 'المستقيمة، المائلة، العرضية، والحجاب الحاجز',
    color: '#ff928a',
    content: [
      {
        heading: 'المستقيمة البطنية (Rectus Abdominis — "Six Pack")',
        text: 'عضلة طويلة مسطحة تمتد من عظمة القص إلى عظم العانة، مقسمة بأوتار عرضية (Tendinous Inscriptions) تُنشئ شكل "المربعات الست". الوظيفة: ثني الجذع للأمام (Spinal Flexion)، ضغط أعضاء البطن، والمساعدة في التنفس القسري. حقيقة مهمة: الـ "Six Pack" موجود لدى الجميع — لكنه مخفي تحت طبقة الدهون! ظهوره يتطلب نسبة دهون أقل من 12-15% للرجال و18-22% للنساء. تمارين الكرانش لن تُزيل الدهون من البطن (لا يوجد "حرق موضعي"!).'
      },
      {
        heading: 'العضلات المائلة (Obliques — الداخلية والخارجية)',
        text: 'المائلة الخارجية (External Oblique): الأكبر والأكثر سطحية. ألياف تسير بشكل مائل من الأعلى للأسفل وللداخل. الوظيفة: الدوران والانحناء الجانبي للجذع. المائلة الداخلية (Internal Oblique): تقع أسفل الخارجية. أليافها تسير بالاتجاه المعاكس. الوظيفة: نفس الوظائف + دعم الضغط داخل البطن. معاً: تعملان كـ "مشد طبيعي" يحمي العمود الفقري أثناء الدوران والرفع. التمارين: Russian Twists، Woodchops بالكابل، Pallof Press (الأفضل لتمرين مقاومة الدوران Anti-Rotation).'
      },
      {
        heading: 'العضلة البطنية العرضية (Transversus Abdominis — TVA)',
        text: 'أعمق عضلة في البطن — "حزام الأمان الداخلي"! تلتف حول الجذع كالمشد (Corset). الوظيفة: ضغط أعضاء البطن الداخلية وتثبيت العمود الفقري. لا تُحرّك المفاصل — بل تمنع الحركة غير المرغوبة (Stabilizer). تنشيطها: أمر "شد البطن للداخل" (Drawing-In Maneuver) أو "الشد كأنك ستتلقى لكمة" (Bracing). أهميتها: ضعفها مرتبط بآلام أسفل الظهر المزمنة وبروز البطن حتى عند نسب دهون منخفضة. تمارين: Dead Bug، Stomach Vacuum، Bird Dog، Plank مع التركيز على Bracing.'
      },
      {
        heading: 'الحجاب الحاجز (Diaphragm) وقاع الحوض (Pelvic Floor)',
        text: 'الحجاب الحاجز: العضلة الأساسية للتنفس — يهبط أثناء الشهيق ويرتفع أثناء الزفير. في سياق التدريب: يلعب دوراً حاسماً في تقنية "التحزيم" (Bracing) عبر زيادة الضغط داخل البطن (Intra-Abdominal Pressure — IAP) مما يثبت العمود الفقري أثناء رفع الأثقال الثقيلة. قاع الحوض: مجموعة عضلات تشكل "أرضية" تجويف الحوض. تدعم أعضاء الحوض وتعمل مع الـ TVA والحجاب الحاجز كنظام متكامل لتثبيت الجذع. ضعفها شائع لدى الرياضيات بعد الولادة ويحتاج تأهيلاً متخصصاً. تمارين كيغل (Kegel) وتمارين التنفس الحجابي ضرورية لكل رياضي.'
      }
    ]
  },
  {
    id: 'connective',
    icon: 'link',
    title: 'الأنسجة الضامة (Tendons, Ligaments, Fascia)',
    subtitle: 'البنية التحتية الصامتة التي تربط كل شيء',
    color: '#e08dff',
    content: [
      {
        heading: 'الأوتار (Tendons) — حبال القوة',
        text: 'أنسجة ليفية كثيفة تربط العضلات بالعظام. تتكون بشكل أساسي من الكولاجين (Type I — 85%). وظيفتها: نقل القوة العضلية للعظام لإنتاج الحركة + تخزين وإطلاق الطاقة المرنة (Elastic Energy) مما يزيد كفاءة الحركة بنسبة 25-30%. مثال: وتر أخيل يُخزّن طاقة كافية أثناء كل خطوة جري لتوفير 35% من الطاقة المطلوبة! المشكلة: الأوتار تتكيف أبطأ بـ 5-10 مرات من العضلات. لذا زيادة الأحمال بسرعة تُسبب التهاب الأوتار (Tendinopathy). الوقاية: زيادة الأحمال تدريجياً بنسبة لا تتجاوز 10% أسبوعياً.'
      },
      {
        heading: 'الأربطة (Ligaments) — حراس المفاصل',
        text: 'أنسجة ليفية تربط العظام ببعضها عبر المفاصل. الوظيفة: تثبيت المفاصل ومنع الحركة المفرطة. أهم الأربطة: الرباط الصليبي الأمامي (ACL): يمنع انزلاق قصبة الساق للأمام — تمزقه كارثة لدى الرياضيين! الرباط الصليبي الخلفي (PCL): يمنع الانزلاق الخلفي. الأربطة الجانبية (MCL/LCL): تمنع الانحراف الجانبي للركبة. خاصية مهمة: الأربطة فقيرة التروية الدموية = شفاء بطيء جداً (6-12 شهراً). بعض التمزقات الكاملة تحتاج جراحة وإعادة بناء.'
      },
      {
        heading: 'اللفافة العضلية (Fascia) — الشبكة المنسية',
        text: 'غشاء من النسيج الضام يُغلّف كل عضلة وكل ليف عضلي وكل عضو في الجسم — شبكة متصلة من الرأس للقدم! 3 طبقات: 1) Epimysium: يُغلّف العضلة بالكامل. 2) Perimysium: يُغلّف حزم الألياف (Fascicles). 3) Endomysium: يُغلّف كل ليف عضلي فردي. الاكتشاف الحديث: اللفافة ليست مجرد غلاف سلبي — بل تحتوي على مستقبلات حسية أكثر من العضلات نفسها! تنقل القوة بين العضلات المتجاورة (Myofascial Force Transmission). تقنيات التحرير اللفافي (Foam Rolling، Myofascial Release) تعمل على هذه الشبكة لتحسين المرونة وتقليل الألم.'
      },
      {
        heading: 'الغضاريف (Cartilage) — وسائد المفاصل',
        text: 'نوعان أساسيان: الغضروف الهياليني (Hyaline): يُغطي أسطح المفاصل — أملس كالزجاج ويقلل الاحتكاك. لا يحتوي على أوعية دموية (يتغذى من السائل الزليلي) = قدرة شفاء شبه معدومة! الغضروف الليفي (Fibrocartilage): أقوى وأصلب — يُشكل الغضاريف الهلالية (Menisci) في الركبة والأقراص الفقرية (Discs) في العمود الفقري. تآكل الغضروف (Osteoarthritis): لا يُعاد بناؤه تلقائياً. الحماية: الحفاظ على وزن صحي، تقوية العضلات المحيطة بالمفاصل، وتجنب الصدمات المتكررة. حقيقة: الحركة المنتظمة "تُزيت" الغضروف — الجلوس الطويل يُجففه!'
      }
    ]
  }
];

export default function Anatomy() {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedContent, setExpandedContent] = useState<Record<string, boolean>>({});

  const toggleContent = (key: string) => {
    setExpandedContent(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0e0e0e] text-white selection:bg-[#e08dff]/30" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Ambient Glow Effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#e08dff]/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-[#00fcca]/5 rounded-full blur-[150px]"></div>
        <div className="absolute top-2/3 right-1/4 w-64 h-64 bg-[#ff928a]/5 rounded-full blur-[150px]"></div>
      </div>

      {/* Top App Bar */}
      <header className="glass border-b border-white/5 p-4 sticky top-0 z-50">
        <div className="flex items-center max-w-5xl mx-auto">
          <div className="w-10 flex justify-start"><BackButton /></div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center flex justify-center" style={{ fontFamily: 'var(--font-heading)' }}>
            <span className="bg-gradient-to-l from-[#e08dff] to-[#00fcca] bg-clip-text text-transparent animate-gradient-shift">التشريح العضلي</span>
          </h2>
          <div className="w-10"></div>
        </div>
      </header>

      <div className="flex-1 pb-20 relative z-10">
        {/* Hero Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="max-w-5xl mx-auto px-4 pt-6">
            <div
              className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-3xl min-h-[280px] md:min-h-[360px] relative group shadow-2xl border border-white/10"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=80")' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/50 to-transparent"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[#e08dff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative p-8 z-10">
                <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#e08dff] to-[#00fcca] text-white text-xs font-bold rounded-full mb-4 shadow-lg">
                  <ShinyText text="الموسوعة التشريحية الشاملة" disabled={false} speed={3} className="text-white" />
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white mb-3 max-w-xl animate-text-glow" style={{ fontFamily: 'var(--font-heading)' }}>
                  تشريح الجهاز العضلي الهيكلي
                </h1>
                <p className="text-[#adaaaa] text-sm md:text-base max-w-lg leading-relaxed">
                  دليل تقني شامل يغطي آليات الانقباض، أنواع الألياف، التشريح التفصيلي لكل مجموعة عضلية، والأنسجة الضامة.
                </p>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Quick Stats Grid */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="max-w-5xl mx-auto px-4 mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: 'science', label: 'أنواع الانقباض', value: '4', color: '#e08dff' },
                { icon: 'genetics', label: 'أنواع الألياف', value: '3', color: '#ff928a' },
                { icon: 'accessibility_new', label: 'مجموعات عضلية', value: '8+', color: '#00fcca' },
                { icon: 'link', label: 'أنسجة ضامة', value: '4', color: '#e08dff' }
              ].map((stat, i) => (
                <div key={i} className="web-card !bg-[#131313] p-4 text-center group stagger-item">
                  <span className="material-symbols-outlined text-2xl mb-2 block transition-transform group-hover:scale-110" style={{ color: stat.color, fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
                  <p className="text-xl font-black text-white font-mono">{stat.value}</p>
                  <p className="text-[10px] text-[#adaaaa] uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeContent>

        {/* Main Content Modules */}
        <div className="max-w-5xl mx-auto px-4 mt-10 space-y-4">
          {sections.map((section) => (
            <FadeContent key={section.id} blur={true} duration={800} initialOpacity={0}>
              <div className="web-card !bg-[#131313] overflow-hidden">
                <button
                  onClick={() => setExpandedSection(prev => prev === section.id ? null : section.id)}
                  className="w-full flex items-center gap-4 p-5 md:p-6 text-right transition-colors hover:bg-white/[0.02]"
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${section.color}15` }}>
                    <span className="material-symbols-outlined text-2xl" style={{ color: section.color, fontVariationSettings: "'FILL' 1" }}>{section.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-white" style={{ fontFamily: 'var(--font-heading)' }}>{section.title}</h3>
                    <p className="text-[#adaaaa] text-xs mt-0.5">{section.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${section.color}15`, color: section.color }}>
                      {section.content.length} مواضيع
                    </span>
                    <span
                      className="material-symbols-outlined text-[#adaaaa] transition-transform duration-300"
                      style={{ transform: expandedSection === section.id ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >expand_more</span>
                  </div>
                </button>

                {expandedSection === section.id && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6 space-y-3">
                    <div className="h-px bg-gradient-to-l from-transparent via-white/10 to-transparent mb-4"></div>
                    {section.content.map((item, itemIdx) => {
                      const key = `${section.id}-${itemIdx}`;
                      const isOpen = expandedContent[key];
                      return (
                        <div
                          key={itemIdx}
                          className="rounded-2xl border border-white/5 bg-[#0e0e0e] overflow-hidden transition-all duration-300 hover:border-white/10"
                        >
                          <button
                            onClick={() => toggleContent(key)}
                            className="w-full flex items-center gap-3 p-4 text-right"
                          >
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${section.color}10` }}>
                              <span className="text-sm font-black" style={{ color: section.color }}>{itemIdx + 1}</span>
                            </div>
                            <span className="flex-1 text-sm font-semibold text-white">{item.heading}</span>
                            <span
                              className="material-symbols-outlined text-lg transition-transform duration-300"
                              style={{ color: section.color, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                            >expand_more</span>
                          </button>
                          {isOpen && (
                            <div className="px-4 pb-4">
                              <div className="h-px bg-white/5 mb-3"></div>
                              <p className="text-[#adaaaa] text-sm leading-[1.9] pr-11">{item.text}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </FadeContent>
          ))}
        </div>

        {/* Highlight Callout */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="max-w-5xl mx-auto px-4 mt-12">
            <div className="bg-gradient-to-br from-[#e08dff]/20 to-[#0e0e0e] rounded-3xl p-10 relative overflow-hidden border border-[#e08dff]/30 flex flex-col md:flex-row items-center gap-6 shadow-[0_10px_40px_rgba(224,141,255,0.1)]">
              <div className="w-20 h-20 rounded-full bg-[#e08dff]/20 flex items-center justify-center shrink-0 border border-[#e08dff]/50 shadow-[0_0_30px_rgba(224,141,255,0.3)]">
                <span className="material-symbols-outlined text-4xl text-[#e08dff]">auto_awesome</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">القاعدة الذهبية للتشريح التطبيقي</h3>
                <p className="text-[#adaaaa] text-sm leading-relaxed italic border-r-2 border-[#e08dff] pr-4 mt-2">
                  "لا تتدرب على تمارين — تدرب على عضلات! فهم التشريح يحول تمرينك من حركات عشوائية إلى استهداف دقيق. اعرف من أين تنشأ العضلة وأين ترتبط، وستعرف تلقائياً كيف تُحفزها بأقصى كفاءة ممكنة."
                </p>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Footer */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <footer className="max-w-5xl mx-auto px-4 mt-12 text-center">
            <p className="text-[#adaaaa] text-sm font-medium">
              تمت صياغة ومراجعة هذه المادة الأكاديمية بالاستناد إلى مراجع الطب الرياضي والتشريح الحيوي لضمان أعلى معايير الجودة العلمية في
              <span className="text-[#e08dff] font-bold mx-1">HELMY Academy</span>.
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <div className="size-2 rounded-full bg-[#e08dff]/30"></div>
              <div className="size-2 rounded-full bg-[#00fcca]/60"></div>
              <div className="size-2 rounded-full bg-[#ff928a]"></div>
            </div>
          </footer>
        </FadeContent>
      </div>
    </div>
  );
}
