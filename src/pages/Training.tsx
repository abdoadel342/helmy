import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { ShinyText } from '../components/react-bits/ShinyText';
import { BackButton } from '../components/BackButton';

export default function Training() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-primary/10">
        <div className="flex items-center gap-3">
          <BackButton />
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">التدريب الرياضي</h1>
        </div>
        <button className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
          <span className="material-symbols-outlined">share</span>
        </button>
      </header>

      <main className="max-w-4xl mx-auto pb-24 w-full">
        {/* Hero Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="px-4 py-4">
            <div className="relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden shadow-2xl border border-primary/20">
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10"></div>
              <img 
                alt="Professional athlete training" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjstB-7WiLJtOONG6H5qpbWY4Ogft8DYaFNzr8F2_imIz9wZjiIpj2PTWnzr3dRKembcfaRqHA3UlP7ZDjnfqsEkpzalyrwUND4JJJOk5y55fJesTMc8Nv45cgx8WPUlH-wfCCTLnn3Ss7iDlxRIgPT30twbIRxK6zSaF9BvyRqK-QFeQxQtkILdfOKvi_EUak4la4fFDJoUJeWfROmC4MvbRJmLNBwlvCokJuyfSKnlhPIv-l5bxVGtID2FqKdtUSwcKJ1ec1JzA1"
              />
              <div className="absolute bottom-4 right-4 z-20">
                <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  <ShinyText text="دليل المحترفين" disabled={false} speed={3} className="text-white" />
                </span>
              </div>
            </div>
          </div>
        </FadeContent>

        <div className="px-4 py-8 space-y-12">
          
          <FadeContent blur={true} duration={1000} initialOpacity={0}>
            <section className="space-y-6">
              <div className="text-center mb-10 border-b border-primary/20 pb-8">
                <h1 className="text-3xl md:text-4xl font-black text-primary mb-4 leading-tight">خطة استراتيجية شاملة لتطبيق مبادئ التدريب الرياضي</h1>
                <p className="text-xl text-slate-700 dark:text-slate-300 font-bold">الأسس الفسيولوجية، البرمجة المرحلية، والاعتبارات الديموغرافية</p>
              </div>

              {/* 1. الإطار المنهجي والفلسفي */}
              <div className="bg-white dark:bg-primary/5 p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined">menu_book</span>
                  1. الإطار المنهجي والفلسفي لخطة التدريب الرياضي
                </h2>
                <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                  <p>
                    تُعرّف خطة التدريب الرياضي بأنها العملية البدنية والتربوية المستمرة والممنهجة التي تهدف بشكل أساسي إلى إحداث سلسلة من التكيفات الفسيولوجية والعصبية والسيكولوجية المحددة، وذلك من أجل الوصول بالرياضي إلى أعلى المستويات الممكنة في تخصصه البدني والمهاري. لا تقتصر هذه العملية المعقدة على المجهود البدني داخل صالات التدريب والملاعب فحسب، بل تمتد لتشمل الإدارة الرياضية والتخطيط الاستراتيجي الدقيق الذي يضع رؤية ورسالة وأهدافاً واضحة للمؤسسة أو الفريق الرياضي، مما يضمن تحقيق التكامل التام بين الإدارة والتدريب للوصول إلى التميز الرياضي المرجو وتعزيز الصحة العامة واللياقة البدنية للأفراد.
                  </p>
                  <p>
                    إن وضع خطة تدريبية فعالة يتطلب إشرافاً يقظاً وآمناً، وهو ما يُعد من المهام الأساسية لأي محترف في مجال القوة والتكيف (Strength and Conditioning). يجب أن تمر أي قرارات تتعلق بتصميم البرامج التدريبية عبر "مصفوفة معايير" أو قفاز من الاختبارات التي تستند إلى مبادئ التدريب الرياضي الصارمة، وذلك لضمان أن تكون الخطة فعالة وآمنة في آن واحد. وعلى المستوى الصحي العام، تشير التوصيات العالمية الصادرة عن الكلية الأمريكية للطب الرياضي (ACSM) ومراكز السيطرة على الأمراض والوقاية منها (CDC) إلى أن خطط النشاط البدني للبالغين الأصحاء (الذين تتراوح أعمارهم بين 18 و65 عاماً) يجب أن تتضمن المشاركة في نشاط بدني هوائي معتدل الشدة لمدة لا تقل عن 30 دقيقة على مدار خمسة أيام أسبوعياً، أو نشاط هوائي عالي الشدة لمدة 20 دقيقة على الأقل ثلاثة أيام أسبوعياً، مع إلزامية دمج تمارين المقاومة التي تحافظ على القوة العضلية أو تزيدها لمدة يومين على الأقل أسبوعياً، وذلك كحد أدنى لتقليل التكاليف الاقتصادية المرتبطة بعدم النشاط البدني وتحسين جودة الحياة.
                  </p>
                </div>
              </div>

              {/* 2. الأسس البيولوجية والفسيولوجية للتكيف الرياضي */}
              <div>
                <h2 className="text-2xl font-bold text-primary mt-12 mb-6 border-r-4 border-primary pr-3">2. الأسس البيولوجية والفسيولوجية للتكيف الرياضي (محرك الخطة)</h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg mb-6">
                  يعتمد نجاح أي خطة تدريب رياضية على الفهم العميق والدقيق لردود فعل الجسم البشري تجاه الإجهاد الواقع عليه. التكيف (Adaptation) هو العملية البيولوجية المعقدة التي يقوم الجسم من خلالها بضبط أنظمته الفسيولوجية والبيوكيميائية استجابةً للضغوط البدنية أو البيئية أو النفسية. من منظور فسيولوجي بحت، ينظر الجسم إلى التمرين الرياضي كعامل ضغط (Stressor) يخرجه عن حالة التوازن الطبيعي (Homeostasis)، وفي محاولة من الجسم لحماية نفسه من الضغوط المستقبلية المماثلة، فإنه يقوم بإحداث تغييرات هيكلية ووظيفية تجعله أكثر قدرة على التعامل مع هذا الإجهاد، وهذه هي العملية الجوهرية لاكتساب اللياقة البدنية.
                </p>

                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 mt-8">2.1 نظرية متلازمة التكيف العام (General Adaptation Syndrome - GAS)</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg mb-4">
                  تستند الغالبية العظمى من قرارات تصميم البرامج التدريبية إلى النموذج النظري الذي وضعه العالم هانز سيلي (Hans Selye) في عام 1956، والذي يُعرف بمتلازمة التكيف العام (GAS). يفترض هذا النموذج أن الاستجابة الفسيولوجية للجسم تجاه الإجهاد تمر بثلاث مراحل أساسية متسلسلة، بغض النظر عن نوع المؤثر الخارجي:
                </p>
                <ul className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg mr-6 list-disc marker:text-primary">
                  <li><strong>مرحلة الإنذار (Alarm Phase):</strong> تبدأ هذه المرحلة بمجرد تعرض الرياضي لضغط أو حمل تدريبي كبير بما يكفي لإثارة استجابة التعب. تؤدي هذه المرحلة إلى انخفاض مؤقت ومباشر في الأداء وقدرات العمل البدني. خلال هذه النافذة الزمنية، يتم استنزاف مخازن الوقود العضلي، وتحديداً الجليكوجين، وتحدث أضرار دقيقة وتمزقات ميكروية في الأنسجة العضلية (Microtrauma). تترافق هذه المرحلة مع سلسلة من التغيرات الفسيولوجية العابرة والحادة التي تشمل: زيادة معدل ضربات القلب، زيادة معدل التنفس، زيادة استهلاك الأكسجين الكلي، تعديل وتوجيه تدفق الدم نحو العضلات العاملة، ارتفاع معدل التعرق، زيادة درجة حرارة الجسم الأساسية، وزيادة ملحوظة في التدفق الجليكوليتي لتلبية متطلبات الطاقة السريعة.</li>
                  <li><strong>مرحلة المقاومة (Resistance Phase):</strong> وهي المرحلة التي تمثل الهدف الأساسي للخطة التدريبية. في هذه المرحلة، يتكيف الجسم مع المؤثر الخارجي ويحقق ما يُعرف بظاهرة "التعويض الزائد" (Supercompensation). هنا، يتم تجديد مخازن الوقود العضلي، وتحدث عملية إعادة بناء الأنسجة (Remodeling) لتصبح القدرة البدنية والقوة العضلية أكبر وأعلى من مستوى التوازن الذي كان موجوداً قبل التدريب.</li>
                  <li><strong>مرحلة الإرهاق (Exhaustion Phase):</strong> تمثل هذه المرحلة الفشل الكارثي للخطة التدريبية. تحدث مرحلة الإرهاق إذا كان المؤثر التدريبي كبيراً جداً ومتواصلاً، أو إذا لم يُمنح الرياضي فترة راحة فسيولوجية ونفسية كافية. في هذه الحالة، ينزلق الجسم متجاوزاً قدرته على التكيف، حيث يصبح التعب أكثر عمقاً ومرضياً، ويتراجع الأداء بشكل حاد، وترتفع احتمالية التعرض للإصابات العضلية والمفصلية، ويدخل الرياضي في حالة من الإفراط في التدريب (Overtraining).</li>
                </ul>

                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 mt-8">2.2 ديناميكية التعويض الزائد وإدارة الإجهاد (Supercompensation Model)</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg mb-4">
                  يُعد مفهوم التعويض الزائد (الذي يُشار إليه أحياناً بالتعويض المفرط) ليس مجرد تكيف فسيولوجي معزول، بل هو نموذج استراتيجي متكامل يمكن للمدربين تأطير دورات التدريب بأكملها داخله. وفقاً لخبير التكيف والتدريب الدولي فيرن جامبيتا (Vern Gambetta)، تنقسم هذه الديناميكية الفسيولوجية إلى مرحلتين متداخلتين بشكل حرج: مرحلة التدريب ومرحلة الاستشفاء. في مرحلة التدريب، يتم إدخال مؤثر عالي الشدة يؤدي إلى التعب وانخفاض الأداء. أما في مرحلة الاستشفاء، فيحدث التعويض الزائد فعلياً.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg mb-4">
                  تعتمد فعالية الخطة على التوقيت الاستراتيجي للمؤثر التالي. إذا تلقى النظام العضلي العصبي للرياضي حافزاً تدريبياً جديداً (وحدة تدريبية) خلال "نافذة التعويض الزائد" (حيث تكون مستويات القوة واللياقة في ذروتها الجديدة)، فإنه سيرتقي بمستواه إلى خط أساس أعلى. أما إذا تأخر المؤثر التدريبي ولم تتلق العضلات تحفيزاً ضمن هذه النافذة، فإن مستويات القوة واللياقة ستعود تدريجياً لتتطابق مع خط الأساس السابق، مما يؤدي إلى ضياع الجهد التدريبي. يمكن رؤية هذا النموذج بوضوح في الدورات التدريبية الصغرى (Microcycles)؛ حيث يمثل يوم الراحة بعد أسبوع من التدريب الشاق المساحة البيولوجية التي تسمح بحدوث التكيف وترسيخ التعويض الزائد للوحدات التدريبية القادمة.
                </p>
              </div>

              {/* 3. المبادئ الجوهرية */}
              <div className="bg-slate-50 dark:bg-slate-800/30 p-8 rounded-3xl mt-12">
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined">rule</span>
                  3. المبادئ الجوهرية الحاكمة لتصميم الخطة التدريبية
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg mb-8">
                  لكي تنجح الخطة التدريبية في تحفيز تكيفات إيجابية مستدامة، يجب أن تخضع البرمجة لمجموعة من المبادئ الحاكمة الأساسية التي تمنع الركود التدريبي (Plateaus) وتضمن التحسن المستمر. إهمال هذه المبادئ يؤدي حتماً إلى نتائج دون المستوى المطلوب وتضييع للجهد والوقت.
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">3.1 مبدأ زيادة الحمل (Overload Principle)</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                      يُشترط لحدوث أي تكيف فسيولوجي أو شكلي (مورفولوجي) أن يبذل الجسم البشري جهداً يتجاوز مستويات الضغط المعتادة التي اعتاد عليها في أنشطته اليومية أو التدريبية السابقة. ينص هذا المبدأ على أن التحسينات مدفوعة أساساً بالتوتر والإجهاد (Stress). بعبارة أخرى، لحدوث تكيفات تدريبية، يجب تدريب العضلة أو المكون الفسيولوجي بمستوى غير معتاد عليه. في سياق تدريبات القوة والمقاومة، يُترجم ذلك إلى استخدام أحمال أو أوزان لم تعتد عليها العضلة لتوليد مستوى توتر عتبوي (Threshold tension) كافٍ لإحداث التكيف. ولا يقتصر مفهوم الحمل على الوزن المرفوع فحسب، بل يمتد ليشمل حجم العمل الإجمالي، ومدة التمرين، والكثافة التدريبية.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">3.2 مبدأ التدرج (Progression Principle)</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mb-4">
                      يرتبط مبدأ التدرج ارتباطاً وثيقاً وعضوياً بمبدأ زيادة الحمل، حيث يشير إلى أن التحسن المستمر يتطلب إجراء تغييرات استراتيجية ومنهجية وتدريجية في برنامج التدريب. يعني التدرج اختيار التمارين، الأحمال، وترتيبها بحيث تكون "مناسبة تماماً" للحالة البدنية الحالية للرياضي؛ فلا يجب أن تكون المقاومة قاسية جداً فتسبب الإصابة وتمزق الأنسجة، ولا يجب أن تكون ضعيفة جداً فلا تُحدث أي تكيف فسيولوجي، مما يسمح بتقدم مطرد ومستقر.
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                      يتم تفعيل التدرج غالباً باستخدام نموذج "FITT" (التكرار Frequency، الشدة Intensity، الوقت Time، والنوع Type)، حيث يتم التلاعب بهذه المتغيرات لضمان استمرار الجسم في التكيف. يتطلب التدرج فهماً دقيقاً لكيفية تغيير المتغيرات مع مرور الوقت، وهو الأساس ليس فقط في الأداء الرياضي العالي، بل أيضاً في برامج إعادة التأهيل الرياضي التي تستهدف استعادة القوة وبناء أسس السرعة والرشاقة للمصابين ضمن حدود الشفاء البيولوجي.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">3.3 مبدأ الخصوصية (Specificity Principle) والهندسة الدقيقة للتكيفات</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mb-4">
                      يُعرف هذا المبدأ علمياً وتطبيقياً بمبدأ التكيفات المحددة للضغوط المفروضة (Specific Adaptations to Imposed Demands - SAID). ينص هذا المبدأ الصارم على أن الجسم يتكيف بشكل ضيق جداً وحصري مع طبيعة التمرين المؤدى والطلب المفروض عليه. التكيفات الفسيولوجية، العصبية، والسيكولوجية ترتبط مباشرة وبالتحديد بالنشاط الذي يتم ممارسته أثناء التدريب. فعلى سبيل المثال، يؤدي تدريب الماراتون إلى تطوير التحمل الهوائي بكفاءة عالية، لكنه لن يبني أبداً القوة الانفجارية المطلوبة لعداء المسافات القصيرة (العدو السريع)، وبالمثل، يجب على لاعب كمال الأجسام التركيز على تدريب القوة بدلاً من الكميات الكبيرة من تمارين القلب والأوعية الدموية.
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mb-4">
                      يمتد تطبيق مبدأ الخصوصية إلى مستويات خلوية وحركية عميقة ومعقدة تشمل عدة سمات يجب على مصمم الخطة مراعاتها:
                    </p>
                    <ul className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed text-lg mr-6 list-disc marker:text-primary">
                      <li><strong>نوع الانقباض العضلي (Contraction Mode):</strong> يوجد ثلاثة أنماط رئيسية للانقباض العضلي. الانقباض المركزي (Concentric). الانقباض اللامركزي (Eccentric). الانقباض الثابت (Isometric). الخصوصية تعني أنه إذا ركز الرياضي على قوة معينة، سيتحسن في ذلك النمط بالتحديد.</li>
                      <li><strong>نوع الألياف العضلية والبروتيوميات (Muscle Fiber Type and Proteomics):</strong> العضلات تتكيف بشكل مختلف تماماً مع التدريب بناءً على الألياف المستهدفة السريعة مقابل البطيئة.</li>
                      <li><strong>نطاق الحركة وسرعة الانقباض (Range of Motion & Velocity):</strong> التكيفات العصبية والعضلية تكون محددة للزوايا المفصلية وسرعة الأداء التي تم التدريب عليها.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">3.4 مبدأ الاستشفاء (Recovery) والعكسية (Reversibility)</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mb-4">
                      الاستشفاء هو الإطار الزمني الفعلي الذي يحدث فيه التكيف البيولوجي وبناء الأنسجة (Remodeling) والتعويض الزائد. بدون الراحة المبرمجة فسيولوجياً، يفشل نظام التكيف العام (GAS)، وتتراجع الأداءات، ويدخل الرياضي في مستنقع الإفراط في التدريب.
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                      على الجانب الآخر، تفرض الخطة التدريبية فهماً عميقاً لمبدأ العكسية أو الارتداد، والذي يُلخص في عبارة "استخدمه أو افقده" (Use it or lose it). ينص هذا المبدأ على أن اللياقة البدنية تتدهور إذا توقف التدريب تماماً، كما يحدث لعضلات الساق الموضوعة في الجبس.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">3.5 التنوع (Variety) ومبدأ الإعداد المتعدد الجوانب (Multilateral Preparation)</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                      لتجنب الملل الفسيولوجي (الركود العضلي) والنفسي، يجب دمج مبدأ التنوع من خلال تغيير طرق التدريب، الحركات المستخدمة، والأنظمة التدريبية بما يتماشى دائماً مع أهداف المتدرب لتكوين أساس إعداد بدني شامل.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. هندسة الحمل التدريبي والمتغيرات الميكانيكية للخطة */}
              <div>
                <h2 className="text-2xl font-bold text-primary mt-12 mb-6 border-r-4 border-primary pr-3 flex items-center gap-2">
                  <span className="material-symbols-outlined">settings_suggest</span>
                  4. هندسة الحمل التدريبي والمتغيرات الميكانيكية للخطة
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg mb-6">
                  يُعتبر التقسيم المرحلي (Periodization) مفهوماً شاملاً للعملية التدريبية يتعامل مع تقسيم خطة التدريب إلى مراحل فسيولوجية وزمنية محددة، بينما تمثل "البرمجة" (Programming) المعالجة الدقيقة للمتغيرات الفنية داخل هذه المراحل لإحداث التكيفات المرغوبة.
                </p>

                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 mt-8">4.1 متغيرات التصميم الكلاسيكية</h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed text-lg mr-6 list-disc marker:text-primary mb-6">
                  <li><strong>الحجم (Volume):</strong> يمثل إجمالي مقدار العمل المنجز في الوحدة التدريبية.</li>
                  <li><strong>الشدة (Intensity):</strong> تعكس درجة صعوبة العمل المنجز (الوزن أو السرعة).</li>
                  <li><strong>حجم-الحمل (Volume-Load):</strong> مزيج تفاعلي بين الحجم والشدة (المجموعات × التكرارات × الوزن).</li>
                  <li><strong>التكرار أو التردد (Frequency):</strong> عدد الجلسات التدريبية المنجزة خلال فترة زمنية محددة.</li>
                </ul>

                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg mb-6">
                  الجدول الاستراتيجي التالي يوضح تصنيف مستويات الشدة وتأثيرها الفسيولوجي:
                </p>
                
                <div className="overflow-x-auto rounded-xl border border-primary/20 bg-white dark:bg-background-dark mb-8 shadow-sm">
                  <table className="w-full text-right border-collapse">
                    <thead className="bg-primary/10">
                      <tr>
                        <th className="p-4 border-b border-primary/20 text-primary font-bold">رقم الشدة</th>
                        <th className="p-4 border-b border-primary/20 text-primary font-bold">النسبة المئوية للإنجاز القصوي (%1RM)</th>
                        <th className="p-4 border-b border-primary/20 text-primary font-bold">تصنيف درجة الشدة</th>
                        <th className="p-4 border-b border-primary/20 text-primary font-bold">التأثير الفسيولوجي والتطبيق الاستراتيجي في الخطة</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-700 dark:text-slate-300 text-sm">
                      <tr className="hover:bg-primary/5 transition-colors">
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800 font-bold">1</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">30% - 50%</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">واطئة (خفيفة جداً)</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">تقتصر على "الراحة الإيجابية". أثبتت الدراسات أن هذا الحمل يسرع من استعادة الرياضي لشفائه وتخلصه من التعب مقارنة بالراحة السلبية.</td>
                      </tr>
                      <tr className="hover:bg-primary/5 transition-colors">
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800 font-bold">2</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">50% - 70%</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">معتدلة</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">تُستخدم لبناء التحمل العضلي الأساسي، التهيؤ التشريحي في بداية المواسم، وتدريب المبتدئين.</td>
                      </tr>
                      <tr className="hover:bg-primary/5 transition-colors">
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800 font-bold">3</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">70% - 80%</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">متوسطة</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">النطاق الذهبي لتطوير التضخم العضلي (Hypertrophy) وزيادة المقطع العرضي للألياف العضلية.</td>
                      </tr>
                      <tr className="hover:bg-primary/5 transition-colors">
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800 font-bold">4</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">80% - 90%</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">تحت القصوية</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">يمثل هذا المجال تحدياً فسيولوجياً كبيراً لأجهزة جسم الرياضي الوظيفية. يستهدف تطوير القوة القصوى والقدرة الانفجارية.</td>
                      </tr>
                      <tr className="hover:bg-primary/5 transition-colors">
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800 font-bold">5</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">90% - 100%</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">قصوية</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">استنفاد عصبي عضلي عالٍ وتجنيد كامل للوحدات الحركية السريعة. يُستخدم لتسجيل الأرقام القياسية وتطوير القوة المطلقة النقية.</td>
                      </tr>
                      <tr className="hover:bg-primary/5 transition-colors">
                        <td className="p-4 font-bold border-b-0">6</td>
                        <td className="p-4 border-b-0">100%+</td>
                        <td className="p-4 border-b-0">فوق القصوية</td>
                        <td className="p-4 border-b-0">يقتصر حصرياً على الانقباضات اللامركزية (Eccentric overloads) وتدريبات صدمة الجهاز العصبي المركزي، ويحتاج لحذر شديد.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 mt-8">4.2 الجدل الفسيولوجي حول الحجم والشدة: الجرعة التدريبية الفعالة الدنيا (METD)</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg mb-4">
                  بالنسبة للرياضيين في مجالات القوة القصوى (مثل Powerlifting)، حددت الدراسات العلمية المتقدمة مفهوم "الجرعة التدريبية الفعالة الدنيا" (Minimum Effective Training Dose - METD). يشير هذا المفهوم إلى أقل قدر من التدريب المطلوب لإحداث زيادات ذات مغزى في القوة. يوضح التحليل السريري أنه يمكن للرياضيين المتمرسين اكتساب قوة ملموسة من خلال أداء 3 إلى 6 مجموعات عمل فقط تتكون من 1 إلى 5 تكرارات لكل رفعة أساسية أسبوعياً، باستخدام أحمال تتجاوز 80% من 1RM، وبمعدل مجهود محسوس (RPE) يتراوح بين 7.5 إلى 9.5، موزعة على 1 إلى 3 جلسات أسبوعية لمدة 6 إلى 12 أسبوعاً. 
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                  في المقابل، تشير التحليلات المعنية بالتضخم العضلي (Hypertrophy) إلى أن الحجم المتزايد (Volume) ضروري لتحفيز نمو الأنسجة العضلية، مما يستدعي من المدرب إيجاد توازن دقيق لضمان عدم تداخل التعب العصبي المتراكم من الحجم العالي مع إنتاج القوة القصوى.
                </p>
              </div>

              {/* 5. خطة التقسيم المرحلي والبرمجة الزمنية */}
              <div className="bg-primary/5 p-8 rounded-3xl mt-12 border border-primary/10">
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined">event_note</span>
                  5. خطة التقسيم المرحلي والبرمجة الزمنية (Periodization Plan)
                </h2>
                
                <ul className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg mr-6 list-disc mb-8">
                  <li><strong>الخطة السنوية (Annual Plan):</strong> المخطط الاستراتيجي العام للسنة التدريبية بأكملها.</li>
                  <li><strong>الدورة الكبرى (Macrocycle):</strong> تمثل أكبر كتلة تدريبية، وتعادل غالباً الخطة السنوية أو الموسمية الكاملة.</li>
                  <li><strong>الدورة المتوسطة (Mesocycle):</strong> كتل زمنية وسيطة، تمتد عادة لعدة أسابيع أو أشهر داخل الدورة الكبرى.</li>
                  <li><strong>الدورة الصغرى (Microcycle):</strong> أصغر كتلة زمنية متكاملة، تتراوح من بضعة أيام إلى أسبوع.</li>
                  <li><strong>الوحدة التدريبية اليومية (Training Session):</strong> تُقسم تنظيمياً إلى ثلاثة أقسام أساسية: القسم الإعدادي (الإحماء)، القسم الرئيسي، والقسم الختامي (التهدئة).</li>
                </ul>

                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 mt-8">5.1 نماذج الزيادة المنهجية للحمل (Progressive Overload Models)</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg mb-6">
                  يختلف التطبيق الميكانيكي للتدرج وزيادة الحمل بناءً على المستوى التدريبي والعمر التدريبي للفرد. يوضح الجدول التالي نموذجاً تطبيقياً لدورة صغرى مكثفة (خطة 4 أسابيع) لتطبيق الزيادة المتدرجة في تمرين أساسي مثل ضغط الصدر للمبتدئين:
                </p>

                <div className="overflow-x-auto rounded-xl border border-primary/20 bg-white dark:bg-background-dark mb-8 shadow-sm">
                  <table className="w-full text-right border-collapse">
                    <thead className="bg-[#e08dff]/10">
                      <tr>
                        <th className="p-4 border-b border-primary/20 text-[#e08dff] font-bold">الأسبوع التدريبي</th>
                        <th className="p-4 border-b border-primary/20 text-[#e08dff] font-bold">المجموعات</th>
                        <th className="p-4 border-b border-primary/20 text-[#e08dff] font-bold">التكرارات</th>
                        <th className="p-4 border-b border-primary/20 text-[#e08dff] font-bold">الشدة المئوية (%1RM)</th>
                        <th className="p-4 border-b border-primary/20 text-[#e08dff] font-bold">التبرير الفسيولوجي لتطبيق الحمل</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-700 dark:text-slate-300 text-sm">
                      <tr className="hover:bg-primary/5 transition-colors">
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800 font-bold">الأسبوع الأول</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">3</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">8</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">65%</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">بناء التوافق العصبي العضلي واعتياد المسار الحركي بأمان.</td>
                      </tr>
                      <tr className="hover:bg-primary/5 transition-colors">
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800 font-bold">الأسبوع الثاني</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">3</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">8</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">70%</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">تطبيق مبدأ زيادة الحمل (Overload) عبر زيادة الوزن المرفوع (الشدة) مع ثبات الحجم.</td>
                      </tr>
                      <tr className="hover:bg-primary/5 transition-colors">
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800 font-bold">الأسبوع الثالث</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">4</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">8</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">70%</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">تطبيق زيادة الحمل عبر زيادة الحجم التدريبي الكلي (إضافة مجموعة جديدة) لتحدي القدرة على التحمل الأيضي.</td>
                      </tr>
                      <tr className="hover:bg-primary/5 transition-colors">
                        <td className="p-4 font-bold border-b-0">الأسبوع الرابع</td>
                        <td className="p-4 border-b-0">4</td>
                        <td className="p-4 border-b-0">8</td>
                        <td className="p-4 border-b-0">75%</td>
                        <td className="p-4 border-b-0">دفع الجسم للتكيف المزدوج عبر زيادة مشتركة في كل من الحجم والشدة للدخول في نطاق التضخم الفعلي.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 mt-8">5.2 أساليب ومسارات التدريب المتقدمة</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg mb-4">
                  تعتمد المدرسة التدريبية المعاصرة على عدة طرق هيكلية لتعزيز القدرات الوظيفية، مثل طريقة التدريب المستمر (Continuous Training)، طريقة التدريب الفتري (Interval Training)، طريقة التدريب التكراري، والتدريب البلايومترك (Plyometrics) للقدرة الانفجارية.
                </p>
                <div className="bg-slate-100 dark:bg-[#151515] p-6 rounded-xl border border-slate-200 dark:border-slate-700 mt-4">
                  <h4 className="font-bold text-primary mb-2">التدريب المتزامن (Concurrent Training) وتداخل المسارات:</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                    تُشير الرؤية الكلاسيكية لعلم الفسيولوجيا إلى أن الجمع بين تدريب القوة وتدريب التحمل في ذات البرنامج الزمني قد يحد من التكيفات بسبب ما يُعرف بتأثير التداخل (Interference effect). تشير التوجهات الحديثة إلى أن تدريبات القوة والمقاومة منخفضة الحمل حتى الفشل يمكن أن تُعزز قدرات التحمل، ولكن تدريب التحمل الهوائي عالي الشدة غالباً ما يُعرض مكاسب القوة العضلية لخطر التراجع والعرقلة.
                  </p>
                </div>
              </div>

              {/* 6. الاعتبارات الديموغرافية */}
              <div>
                <h2 className="text-2xl font-bold text-primary mt-12 mb-6 border-r-4 border-primary pr-3 flex items-center gap-2">
                  <span className="material-symbols-outlined">groups</span>
                  6. الاعتبارات الديموغرافية: تكييف الخطة للمراحل العمرية والنضجي
                </h2>
                
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 mt-6">6.1 التدريب الرياضي للناشئين والشباب (Youth Athletes)</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg mb-4">
                  بينما يعتقد البعض أن التدريب المكثف مطلوب للوصول لمرحلة النخبة، فإن الإجماع الطبي والعلمي يُظهر أن التخصص المبكر قبل سن البلوغ (في رياضة واحدة فقط واستبعاد الرياضات الأخرى) غير ضروري للوصول إلى النخبة في معظم الرياضات، بل ويحمل مخاطر كارثية تشمل ارتفاع معدلات الإصابة البدنية، الإجهاد النفسي الشديد، والاحتراق الرياضي المبكر (Burnout) الذي يدفع الأطفال لترك الرياضة تماماً في سن مبكرة.
                </p>
                <div className="bg-primary/10 p-4 rounded-xl mb-6">
                  <p className="text-primary font-bold">استراتيجية الحل: التنويع المبكر (Early Diversification) والتصنيف البيولوجي (Bio-banding) لتقليل الإصابات وتحسين الأداء.</p>
                </div>

                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 mt-8">6.2 تكييف الخطة لكبار السن والرياضيين الرواد (Senior Athletes)</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg mb-4">
                  يواجه كبار السن تحديات فسيولوجية חتتمية أبرزها تراجع قوة وحجم العضلات بمعدل يصل إلى 3% سنوياً بعد سن السبعين (ظاهرة الساركوبينيا والديناموبينيا). يتطلب تطبيق مبادئ التدريب لهذه الشريحة منهجية وقائية، تشمل التدريب الحسي الحركي (Sensorimotor Training) لحماية الرياضي المسن من السقوط والإصابات عبر استخدام أسطح غير مستقرة لتحسين التوازن.
                </p>
              </div>

              {/* 7. الفروق البيولوجية للرياضيات */}
              <div className="bg-[#bc00fb]/5 p-8 rounded-3xl mt-12 border border-[#bc00fb]/10">
                <h2 className="text-2xl font-bold text-[#bc00fb] mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined">female</span>
                  7. الفروق البيولوجية وتكييف الخطة للرياضيات الإناث
                </h2>
                
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 mt-6">7.1 الاختلافات المورفولوجية والفسيولوجية المقارنة</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg mb-4">
                  يُعتبر الجنس البيولوجي محدداً أولياً وحاسماً للأداء الرياضي بسبب التأثيرات الابتنائية (Anabolic) الضخمة لهرمون التستوستيرون لدى الذكور (أعلى بحوالي 15 مرة من الإناث عند سن 18 عاماً). تنعكس هذه الفروق في قدرات الأداء حيث يمتلك الذكور البالغون كتلة عضلية أكبر ونسبة دهون أقل، مما يجعلهم أقوى وإنتاجاً للقدرة الانفجارية مقارنة بالإناث.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg mb-6">
                  تُظهر الدراسات اختلافات بين الجنسين في استقلاب الأحماض الأمينية وتخليق البروتين العضلي. المشكلة الأبرز تتمثل في معاناة الرياضيات من متلازمة نقص الطاقة النسبي في الرياضة (RED-S) وضعف الإمداد الغذائي، مما يسبب تدهوراً في كثافة العظام واضطرابات الدورة الشهرية (ثالوث الرياضية الأنثى).
                </p>

                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 mt-8">7.2 التخطيط المرحلي والدورة الشهرية (Menstrual Cycle Periodization)</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg mb-6">
                  يمثل دمج تقلبات الدورة الشهرية في برمجة الفترات التدريبية إحدى أهم الاستراتيجيات المعاصرة للرياضيات الإناث. يوضح الجدول التالي التقلبات الهرمونية وتأثيرها على استجابة الرياضية وكيفية تكييف الخطة:
                </p>

                <div className="overflow-x-auto rounded-xl border border-[#bc00fb]/20 bg-white dark:bg-background-dark shadow-sm">
                  <table className="w-full text-right border-collapse">
                    <thead className="bg-[#bc00fb]/10">
                      <tr>
                        <th className="p-4 border-b border-[#bc00fb]/20 text-[#bc00fb] font-bold">التأثير الفسيولوجي</th>
                        <th className="p-4 border-b border-[#bc00fb]/20 text-[#bc00fb] font-bold">استجابات الأداء وفقاً لمراحل الدورة الشهرية</th>
                        <th className="p-4 border-b border-[#bc00fb]/20 text-[#bc00fb] font-bold">التوجيه الاستراتيجي في خطة التدريب</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                      <tr className="hover:bg-[#bc00fb]/5 transition-colors">
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800 font-bold">القوة العضلية القصوى</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">تزيد بشكل واضح خلال المراحل الجرابية بفعل الإستروجين وتصل للحد الأدنى في المرحلة اللوتيلية.</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">تخصيص الكتل الأثقل والأرقام القياسية (1RM) في المراحل الجرابية، وتقليل الأحمال الميكانيكية للحد الأدنى في المرحلة اللوتيلية.</td>
                      </tr>
                      <tr className="hover:bg-[#bc00fb]/5 transition-colors">
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800 font-bold">التكيف التدريبي العام</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">استجابات التكيف العضلي تكون أكثر تفوقاً عندما يتركز التدريب القوي في المرحلة الجرابية.</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">برمجة الأحمال الثقيلة والكثافة العالية في النصف الأول من الدورة الشهرية والاعتماد على Negh الضبط التلقائي.</td>
                      </tr>
                      <tr className="hover:bg-[#bc00fb]/5 transition-colors">
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800 font-bold">الوزن واحتباس السوائل</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">تحتفظ الرياضية بالوزن والمياه في المرحلة اللوتيلية، نتاج هرمون الألدوستيرون وزيادة الشهية للبروجسترون.</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">يجب أخذ الزيادة في الوزن في الاعتبار في الفئات الوزنية دون الخلط بينها وبين السمنة.</td>
                      </tr>
                      <tr className="hover:bg-[#bc00fb]/5 transition-colors">
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800 font-bold">الجهد المحسوس والإرهاق</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">معدلات الإجهاد النفسي والإرهاق المحسوس ترتفع بشكل حاد وبشكل خاص في المرحلة اللوتيلية المتأخرة والجرابية المبكرة.</td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800">إعطاء تخفيف الشدة وتوفير الدعم النفسي الذي يمنع الاستنزاف المركزي والعصبي للرياضية.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Conclusion */}
              <div className="mt-16 text-center bg-primary/10 p-8 rounded-3xl border border-primary/20">
                <h2 className="text-3xl font-black text-primary mb-4">الخاتمة</h2>
                <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed max-w-4xl mx-auto">
                  إن بناء وتصميم خطة تدريب رياضية متكاملة يتجاوز مجرد سرد التمارين؛ فهو هندسة فسيولوجية دقيقة تستدعي الإلمام بالأنظمة البيولوجية، وتقدير استجابات الإجهاد، وتنظيم آليات الاستشفاء. وبناءً على التحليل المعمق للنماذج البيولوجية والأدبيات المعاصرة، فإن أي خطة تدريب احترافية يجب أن تبدأ باحترام نظرية التكيف العام (GAS) عبر تجنب تطبيق تدريبات مرهقة متتالية دون برمجة فترات راحة حتمية تسمح بحدوث ظاهرة "التعويض الزائد"، وإلا سينهار النظام البدني للرياضي وتحدث الإصابة. يضمن التطبيق المتزامن والصارم لهذه المبادئ المتداخلة ارتقاء الأنظمة العصبية والعضلية بأمان تام، وصولاً إلى ذروة الإمكانيات البشرية.
                </p>
              </div>

            </section>
          </FadeContent>
        </div>
      </main>
    </div>
  );
}
