export type Recipe = {
  name: string;
  cal: number;
  protein: number;
  time: string;
  cat: string;
  icon: string;
};

export const recipeCategories = [
  { id: 'all', label: 'الكل', icon: 'apps' },
  { id: 'breakfast', label: 'فطور', icon: 'egg_alt' },
  { id: 'chicken', label: 'دجاج', icon: 'set_meal' },
  { id: 'meat', label: 'لحوم', icon: 'kebab_dining' },
  { id: 'fish', label: 'أسماك', icon: 'phishing' },
  { id: 'salad', label: 'سلطات', icon: 'nutrition' },
  { id: 'smoothie', label: 'مشروبات', icon: 'local_cafe' },
  { id: 'snack', label: 'سناكات', icon: 'cookie' },
  { id: 'carbs', label: 'نشويات', icon: 'rice_bowl' },
];

export const recipes: Recipe[] = [
  // === BREAKFAST (فطور) ===
  { name: 'شوفان بالبروتين والموز', cal: 350, protein: 30, time: '10 د', cat: 'breakfast', icon: '🥣' },
  { name: 'بانكيك البروتين', cal: 380, protein: 35, time: '15 د', cat: 'breakfast', icon: '🥞' },
  { name: 'بيض مخفوق بالخضار', cal: 280, protein: 22, time: '8 د', cat: 'breakfast', icon: '🍳' },
  { name: 'توست أفوكادو وبيض', cal: 320, protein: 18, time: '10 د', cat: 'breakfast', icon: '🥑' },
  { name: 'زبادي يوناني بالتوت والجرانولا', cal: 300, protein: 25, time: '5 د', cat: 'breakfast', icon: '🫐' },
  { name: 'أومليت بالجبنة والسبانخ', cal: 310, protein: 26, time: '10 د', cat: 'breakfast', icon: '🧀' },
  { name: 'فول مدمس بزيت الزيتون', cal: 290, protein: 18, time: '5 د', cat: 'breakfast', icon: '🫘' },
  { name: 'عصيدة شوفان بزبدة اللوز', cal: 370, protein: 15, time: '10 د', cat: 'breakfast', icon: '🥜' },
  { name: 'شكشوكة بالطماطم والفلفل', cal: 260, protein: 16, time: '15 د', cat: 'breakfast', icon: '🍅' },
  { name: 'كريب بروتين بالفراولة', cal: 340, protein: 32, time: '12 د', cat: 'breakfast', icon: '🍓' },

  // === CHICKEN (دجاج) ===
  { name: 'صدر دجاج مشوي بالأعشاب', cal: 350, protein: 45, time: '25 د', cat: 'chicken', icon: '🍗' },
  { name: 'دجاج ترياكي مع أرز', cal: 480, protein: 40, time: '30 د', cat: 'chicken', icon: '🍚' },
  { name: 'شاورما دجاج صحية', cal: 420, protein: 38, time: '20 د', cat: 'chicken', icon: '🌯' },
  { name: 'دجاج بالكاري والحليب', cal: 450, protein: 35, time: '35 د', cat: 'chicken', icon: '🍛' },
  { name: 'برجر دجاج مشوي', cal: 380, protein: 42, time: '20 د', cat: 'chicken', icon: '🍔' },
  { name: 'دجاج بالليمون والثوم', cal: 340, protein: 43, time: '25 د', cat: 'chicken', icon: '🍋' },
  { name: 'صدر دجاج محشي سبانخ وجبنة', cal: 400, protein: 44, time: '30 د', cat: 'chicken', icon: '🧑‍🍳' },
  { name: 'دجاج فاهيتا بالفلفل', cal: 390, protein: 38, time: '20 د', cat: 'chicken', icon: '🌶️' },
  { name: 'أصابع دجاج مقرمشة بالفرن', cal: 360, protein: 36, time: '25 د', cat: 'chicken', icon: '🍖' },
  { name: 'دجاج مشوي بالخردل والعسل', cal: 370, protein: 40, time: '25 د', cat: 'chicken', icon: '🍯' },

  // === MEAT (لحوم) ===
  { name: 'ستيك لحم مشوي بالفطر', cal: 450, protein: 48, time: '20 د', cat: 'meat', icon: '🥩' },
  { name: 'كفتة مشوية بالبهارات', cal: 380, protein: 35, time: '25 د', cat: 'meat', icon: '🍢' },
  { name: 'لحم بقر مع البروكلي', cal: 400, protein: 40, time: '20 د', cat: 'meat', icon: '🥦' },
  { name: 'برجر لحم بقري صحي', cal: 420, protein: 38, time: '15 د', cat: 'meat', icon: '🍔' },
  { name: 'يخنة لحم بالخضار', cal: 380, protein: 35, time: '45 د', cat: 'meat', icon: '🍲' },
  { name: 'لحم مفروم بالبطاطا الحلوة', cal: 440, protein: 34, time: '30 د', cat: 'meat', icon: '🍠' },
  { name: 'شرائح لحم بالصويا والزنجبيل', cal: 390, protein: 42, time: '20 د', cat: 'meat', icon: '🫚' },
  { name: 'كباب لحم مشوي', cal: 360, protein: 38, time: '20 د', cat: 'meat', icon: '🔥' },
  { name: 'لازانيا لحم صحية', cal: 480, protein: 35, time: '45 د', cat: 'meat', icon: '🧆' },
  { name: 'لحم مشوي بالروزماري', cal: 370, protein: 44, time: '25 د', cat: 'meat', icon: '🌿' },

  // === FISH (أسماك) ===
  { name: 'سالمون مشوي بالليمون', cal: 420, protein: 40, time: '20 د', cat: 'fish', icon: '🐟' },
  { name: 'تونة طازجة مشوية', cal: 350, protein: 45, time: '15 د', cat: 'fish', icon: '🐠' },
  { name: 'سمك فيليه بالفرن', cal: 300, protein: 38, time: '25 د', cat: 'fish', icon: '🍽️' },
  { name: 'جمبري مقلي بالثوم', cal: 280, protein: 32, time: '12 د', cat: 'fish', icon: '🦐' },
  { name: 'سالمون ترياكي', cal: 440, protein: 38, time: '20 د', cat: 'fish', icon: '🍣' },
  { name: 'سمك مشوي بالكمون', cal: 320, protein: 36, time: '20 د', cat: 'fish', icon: '🐡' },
  { name: 'تونة معلبة بالأفوكادو', cal: 290, protein: 30, time: '5 د', cat: 'fish', icon: '🥑' },
  { name: 'سمك بلطي بالأعشاب', cal: 280, protein: 34, time: '20 د', cat: 'fish', icon: '🌿' },
  { name: 'شوربة السمك والخضار', cal: 250, protein: 28, time: '30 د', cat: 'fish', icon: '🍜' },
  { name: 'سالمون بالعسل والصويا', cal: 400, protein: 36, time: '20 د', cat: 'fish', icon: '🍯' },

  // === SALAD (سلطات) ===
  { name: 'سلطة الدجاج المشوي', cal: 310, protein: 35, time: '15 د', cat: 'salad', icon: '🥗' },
  { name: 'سلطة التونة والفاصوليا', cal: 280, protein: 28, time: '10 د', cat: 'salad', icon: '🫘' },
  { name: 'سلطة يونانية بالفيتا', cal: 240, protein: 12, time: '10 د', cat: 'salad', icon: '🧀' },
  { name: 'سلطة الكينوا والأفوكادو', cal: 350, protein: 15, time: '15 د', cat: 'salad', icon: '🥑' },
  { name: 'سلطة سيزر بالدجاج', cal: 360, protein: 32, time: '15 د', cat: 'salad', icon: '🥬' },
  { name: 'سلطة البيض المسلوق', cal: 250, protein: 20, time: '15 د', cat: 'salad', icon: '🥚' },
  { name: 'تبولة بالبرغل', cal: 200, protein: 6, time: '15 د', cat: 'salad', icon: '🌿' },
  { name: 'سلطة الفواكه والمكسرات', cal: 220, protein: 8, time: '10 د', cat: 'salad', icon: '🍇' },
  { name: 'فتوش صحي', cal: 180, protein: 5, time: '10 د', cat: 'salad', icon: '🥒' },
  { name: 'سلطة الشمندر والجوز', cal: 260, protein: 10, time: '15 د', cat: 'salad', icon: '🟣' },

  // === SMOOTHIE (مشروبات) ===
  { name: 'سموذي بروتين الموز', cal: 300, protein: 30, time: '5 د', cat: 'smoothie', icon: '🍌' },
  { name: 'سموذي التوت الأزرق', cal: 250, protein: 25, time: '5 د', cat: 'smoothie', icon: '🫐' },
  { name: 'شيك الشوكولاتة البروتين', cal: 320, protein: 35, time: '5 د', cat: 'smoothie', icon: '🍫' },
  { name: 'سموذي المانجو والزبادي', cal: 280, protein: 20, time: '5 د', cat: 'smoothie', icon: '🥭' },
  { name: 'عصير أخضر بالسبانخ', cal: 150, protein: 5, time: '5 د', cat: 'smoothie', icon: '🥬' },
  { name: 'سموذي زبدة الفول السوداني', cal: 380, protein: 28, time: '5 د', cat: 'smoothie', icon: '🥜' },
  { name: 'لاتيه بروتين بارد', cal: 200, protein: 25, time: '5 د', cat: 'smoothie', icon: '☕' },
  { name: 'سموذي الفراولة والموز', cal: 240, protein: 22, time: '5 د', cat: 'smoothie', icon: '🍓' },
  { name: 'مشروب الكاكاو والشوفان', cal: 310, protein: 18, time: '8 د', cat: 'smoothie', icon: '🥛' },
  { name: 'سموذي الأناناس وجوز الهند', cal: 260, protein: 8, time: '5 د', cat: 'smoothie', icon: '🍍' },

  // === SNACK (سناكات) ===
  { name: 'بروتين بولز بالشوكولاتة', cal: 180, protein: 15, time: '15 د', cat: 'snack', icon: '🍫' },
  { name: 'لوز محمص بالقرفة', cal: 200, protein: 8, time: '10 د', cat: 'snack', icon: '🌰' },
  { name: 'بار بروتين منزلي', cal: 220, protein: 20, time: '20 د', cat: 'snack', icon: '🍬' },
  { name: 'حمص بالطحينة وخضار', cal: 250, protein: 10, time: '5 د', cat: 'snack', icon: '🫘' },
  { name: 'تمر محشي لوز', cal: 160, protein: 4, time: '5 د', cat: 'snack', icon: '🌴' },
  { name: 'كرات الطاقة بالشوفان', cal: 190, protein: 12, time: '15 د', cat: 'snack', icon: '⚡' },
  { name: 'خبز الذرة بالجبنة', cal: 230, protein: 14, time: '20 د', cat: 'snack', icon: '🌽' },
  { name: 'بودينغ الشيا', cal: 200, protein: 10, time: '5 د + 4 ساعات', cat: 'snack', icon: '🫙' },
  { name: 'كيكة بروتين بالموز', cal: 240, protein: 18, time: '30 د', cat: 'snack', icon: '🍰' },
  { name: 'فشار بالبابريكا', cal: 120, protein: 4, time: '5 د', cat: 'snack', icon: '🍿' },

  // === CARBS (نشويات) ===
  { name: 'أرز بني بالخضار المشكلة', cal: 350, protein: 10, time: '25 د', cat: 'carbs', icon: '🍚' },
  { name: 'معكرونة قمح كامل بالصلصة', cal: 400, protein: 15, time: '20 د', cat: 'carbs', icon: '🍝' },
  { name: 'بطاطا حلوة مشوية', cal: 250, protein: 4, time: '30 د', cat: 'carbs', icon: '🍠' },
  { name: 'كينوا بالخضار والحمص', cal: 380, protein: 16, time: '20 د', cat: 'carbs', icon: '🫛' },
  { name: 'خبز الشوفان المنزلي', cal: 200, protein: 8, time: '40 د', cat: 'carbs', icon: '🍞' },
  { name: 'فريكة بالدجاج', cal: 420, protein: 30, time: '35 د', cat: 'carbs', icon: '🌾' },
  { name: 'برغل بالطماطم', cal: 300, protein: 10, time: '20 د', cat: 'carbs', icon: '🍅' },
  { name: 'رز بالعدس (مجدرة)', cal: 360, protein: 18, time: '30 د', cat: 'carbs', icon: '🫘' },
  { name: 'بطاطا مهروسة بالثوم', cal: 280, protein: 6, time: '20 د', cat: 'carbs', icon: '🥔' },
  { name: 'كسكس بالخضار', cal: 340, protein: 12, time: '20 د', cat: 'carbs', icon: '🥘' },
];
