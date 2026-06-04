import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FadeContent } from '../components/react-bits/FadeContent';
import { BackButton } from '../components/BackButton';
import { recipes, recipeCategories } from '../data/recipes';

const getRecipeColor = (cat: string) => {
  switch (cat) {
    case 'breakfast': return '#e08dff'; // Purple
    case 'salad': return '#22c55e'; // Green
    case 'snack': return '#f97316'; // Orange
    case 'chicken': return '#3b82f6'; // Blue
    case 'meat': return '#ef4444'; // Red
    case 'fish': return '#06b6d4'; // Cyan
    case 'smoothie': return '#a855f7'; // Purple-indigo
    case 'carbs': return '#f59e0b'; // Amber
    default: return '#bc00fb'; // Violet/Primary
  }
};

const getRecipeImage = (name: string, cat: string) => {
  const n = name.toLowerCase();
  
  // BREAKFAST
  if (n.includes('شوفان بالبروتين') || n.includes('شوفان بالبروتين والموز') || n.includes('عصيدة شوفان'))
    return 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=400&q=80';
  if (n.includes('بانكيك'))
    return 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=400&q=80';
  if (n.includes('بيض مخفوق') || n.includes('أومليت') || n.includes('بيض مسلوق'))
    return 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80';
  if (n.includes('توست أفوكادو'))
    return 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=400&q=80';
  if (n.includes('زبادي يوناني'))
    return 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80';
  if (n.includes('فول مدمس'))
    return 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=400&q=80';
  if (n.includes('شكشوكة'))
    return 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80';
  if (n.includes('كريب بروتين'))
    return 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=400&q=80';

  // CHICKEN
  if (n.includes('صدر دجاج مشوي بالأعشاب') || n.includes('دجاج مشوي بالأعشاب') || n.includes('دجاج بالليمون') || n.includes('دجاج مشوي بالخردل') || n.includes('دجاج مشوي'))
    return 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80';
  if (n.includes('ترياكي مع أرز') || n.includes('دجاج ترياكي'))
    return 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=400&q=80';
  if (n.includes('شاورما دجاج'))
    return 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=400&q=80';
  if (n.includes('دجاج بالكاري'))
    return 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=400&q=80';
  if (n.includes('برجر دجاج'))
    return 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=400&q=80';
  if (n.includes('محشي سبانخ'))
    return 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80';
  if (n.includes('فاهيتا'))
    return 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=400&q=80';
  if (n.includes('أصابع دجاج'))
    return 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80';

  // MEAT
  if (n.includes('ستيك'))
    return 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80';
  if (n.includes('كفتة') || n.includes('كباب'))
    return 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=400&q=80';
  if (n.includes('البروكلي') || n.includes('لحم بقر مع البروكلي'))
    return 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80';
  if (n.includes('برجر لحم'))
    return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80';
  if (n.includes('يخنة'))
    return 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80';
  if (n.includes('بطاطا حلوة') && n.includes('مفروم'))
    return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80';
  if (n.includes('شرائح لحم'))
    return 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=400&q=80';
  if (n.includes('لازانيا'))
    return 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=400&q=80';
  if (n.includes('روزماري'))
    return 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80';

  // FISH
  if (n.includes('سالمون مشوي') || n.includes('سالمون بالعسل') || n.includes('سالمون ترياكي'))
    return 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80';
  if (n.includes('تونة طازجة') || n.includes('تونة معلبة بالأفوكادو') || n.includes('سلطة التونة'))
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80';
  if (n.includes('فيليه') || n.includes('بلطي') || n.includes('شوربة السمك'))
    return 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80';
  if (n.includes('جمبري'))
    return 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=400&q=80';

  // SALADS
  if (n.includes('سلطة الدجاج'))
    return 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80';
  if (n.includes('يونانية'))
    return 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=400&q=80';
  if (n.includes('كينوا'))
    return 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=400&q=80';
  if (n.includes('سيزر'))
    return 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=400&q=80';
  if (n.includes('تبولة') || n.includes('فتوش'))
    return 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80';
  if (n.includes('سلطة الفواكه'))
    return 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=400&q=80';
  if (n.includes('شمندر'))
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80';

  // SMOOTHIES / DRINKS
  if (n.includes('سموذي بروتين الموز') || n.includes('سموذي الفراولة والموز'))
    return 'https://images.unsplash.com/photo-1553530979-7ee52a2670c4?auto=format&fit=crop&w=400&q=80';
  if (n.includes('التوت'))
    return 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400&q=80';
  if (n.includes('شيك') || n.includes('كاكاو') || n.includes('شوكولاتة'))
    return 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80';
  if (n.includes('المانجو') || n.includes('الأناناس'))
    return 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=400&q=80';
  if (n.includes('عصير أخضر'))
    return 'https://images.unsplash.com/photo-1553530979-7ee52a2670c4?auto=format&fit=crop&w=400&q=80';
  if (n.includes('فول سوداني'))
    return 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=400&q=80';
  if (n.includes('لاتيه'))
    return 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=400&q=80';

  // SNACKS
  if (n.includes('بروتين بولز') || n.includes('كرات الطاقة'))
    return 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=400&q=80';
  if (n.includes('لوز') || n.includes('تمر'))
    return 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=400&q=80';
  if (n.includes('بار بروتين'))
    return 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=400&q=80';
  if (n.includes('حمص'))
    return 'https://images.unsplash.com/photo-1577906096429-f73c2c312435?auto=format&fit=crop&w=400&q=80';
  if (n.includes('خبز الذرة') || n.includes('كيكة'))
    return 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=400&q=80';
  if (n.includes('بودينغ الشيا'))
    return 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=400&q=80';
  if (n.includes('فشار'))
    return 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=400&q=80';

  // CARBS
  if (n.includes('أرز بني') || n.includes('فريكة') || n.includes('برغل') || n.includes('مجدرة'))
    return 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80';
  if (n.includes('معكرونة') || n.includes('كسكس'))
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80';
  if (n.includes('بطاطا حلوة') || n.includes('بطاطا مهروسة'))
    return 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80';
  if (n.includes('خبز الشوفان'))
    return 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80';

  // CATEGORY FALLBACKS
  switch (cat) {
    case 'breakfast':
      return 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80';
    case 'chicken':
      return 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=400&q=80';
    case 'meat':
      return 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80';
    case 'fish':
      return 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80';
    case 'salad':
      return 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80';
    case 'smoothie':
      return 'https://images.unsplash.com/photo-1553530979-7ee52a2670c4?auto=format&fit=crop&w=400&q=80';
    case 'snack':
      return 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=400&q=80';
    case 'carbs':
      return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80';
    default:
      return 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=400&q=80';
  }
};

function getRecipeDetails(name: string, cat: string) {
  if (name.includes('شوفان')) {
    return {
      ingredients: ['نصف كوب شوفان', 'كوب حليب خالي الدسم', 'سكوب واي بروتين', 'موزة واحدة', 'ملعقة عسل'],
      steps: ['ضع الشوفان والحليب في وعاء وسخنهما لمدة 3-5 دقائق.', 'أضف سكوب البروتين واخلط جيداً.', 'زيّن الطبق بشرائح الموز والعسل.']
    };
  }
  if (name.includes('دجاج')) {
    return {
      ingredients: ['200غ صدر دجاج', 'ملعقة زيت زيتون', 'ثوم مهروس', 'ليمون وبهارات (ملح، فلفل، بابريكا)'],
      steps: ['تبّل الدجاج بالبهارات والليمون والثوم.', 'سخّن المقلاة وأضف زيت الزيتون.', 'اشوِ الدجاج لمدة 6-8 دقائق لكل جانب حتى ينضج.']
    };
  }
  if (name.includes('سالمون') || name.includes('سمك') || name.includes('تونة')) {
    return {
      ingredients: ['180غ سالمون أو تونة', 'خضار مشكلة', 'عصير ليمون', 'ملح وفلفل أسود'],
      steps: ['نظّف السمك وتبّله بالملح والفلفل والليمون.', 'ضعه في الفرن أو المقلاة الهوائية لمدة 15-20 دقيقة.', 'قدّمه ساخناً مع الخضار المشوية.']
    };
  }
  if (name.includes('بيض') || name.includes('أومليت') || name.includes('شكشوكة')) {
    return {
      ingredients: ['3 بيضات كاملة', 'طماطم وفلفل رومي مفروم', 'قليل من الفطر', 'ملح وفلفل أسود'],
      steps: ['اخفق البيض جيداً مع الملح والفلفل.', 'سخّن مقلاة غير لاصقة مع مسحة زيت.', 'اطبخ الخضار أولاً ثم صب البيض فوقها حتى ينضج.']
    };
  }
  if (name.includes('بروتين') || name.includes('سموذي') || name.includes('شيك')) {
    return {
      ingredients: ['سكوب واي بروتين', 'كوب ماء بارد أو حليب لوز', 'فواكه مجمدة (توت أو موز)', 'مكعبات ثلج'],
      steps: ['ضع جميع المكونات في الخلاط الكهربائي.', 'اخلط لمدة 30-60 ثانية حتى يصبح المزيج ناعماً.', 'يُقدم بارداً مباشرة بعد التمرين.']
    };
  }
  switch (cat) {
    case 'breakfast':
      return {
        ingredients: ['بيض أو شوفان', 'حليب أو خبز أسمر', 'فواكه طازجة', 'عسل أو زبدة مكسرات'],
        steps: ['حضّر المكونات الأساسية.', 'اطبخها بطريقة صحية بدون زيوت مهدرجة.', 'قدّمها دافئة مع كوب من القهوة أو الشاي الأخضر.']
      };
    case 'salad':
      return {
        ingredients: ['خضار ورقية مشكلة', 'خيار وطماطم', 'أفوكادو أو زيت زيتون', 'ليمون وخل تفاح'],
        steps: ['اغسل الخضار جيداً وقطّعها.', 'اخلط المكونات في وعاء كبير.', 'أضف زيت الزيتون وعصير الليمون كصلصة خفيفة.']
      };
    case 'snack':
      return {
        ingredients: ['مكسرات نيئة', 'فواكه مجففة أو تمر', 'زبادي يوناني أو شوكولاتة داكنة'],
        steps: ['قسّم الكمية لضمان عدم تجاوز السعرات.', 'تناولها بين الوجبات الرئيسية لتعزيز الشبع.', 'اشرب كوباً من الماء مع السناك.']
      };
    default:
      return {
        ingredients: ['مصدر بروتين صافي (دجاج/لحم/سمك)', 'مصدر كربوهيدرات معقدة (أرز/بطاطا)', 'خضار مشكلة'],
        steps: ['طهي مصدر البروتين بطريقة صحية (شواء/سلق).', 'تحضير النشويات بدون دهون مضافة.', 'تقديم الوجبة متكاملة العناصر الغذائية.']
      };
  }
}

export const nutritionPlansData = [
  {
    title: 'خطة بناء العضلات', icon: 'fitness_center', color: '#22c55e', badge: 'فائض سعرات +300-500', cal: '~2,500-3,200 سعرة',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=400&q=80',
    desc: 'خطة غذائية مصممة لزيادة الكتلة العضلية مع تقليل تخزين الدهون عبر فائض سعرات مدروس وبروتين مرتفع.',
    macros: { protein: '2.0-2.2 غ/كغ', carbs: '4-6 غ/كغ', fat: '0.8-1.2 غ/كغ' },
    meals: [
      { emoji: '🌅', label: 'الفطور', food: 'شوفان + واي بروتين + موز + زبدة فول سوداني', cal: '550' },
      { emoji: '🍗', label: 'الغداء', food: 'صدر دجاج 200غ + أرز بني 200غ + خضار + زيت زيتون', cal: '700' },
      { emoji: '🥤', label: 'سناك', food: 'زبادي يوناني + مكسرات + عسل', cal: '350' },
      { emoji: '🐟', label: 'العشاء', food: 'سالمون 180غ + بطاطا حلوة + سلطة خضراء', cal: '600' },
      { emoji: '💪', label: 'بعد التمرين', food: 'واي بروتين + كرياتين + موز', cal: '300' },
    ],
    tips: ['زد الأوزان تدريجياً أسبوعياً', 'وزّع البروتين على 4-5 وجبات', 'نم 7-9 ساعات للاستشفاء', 'اشرب 3-4 لتر ماء يومياً'],
  },
  {
    title: 'خطة خسارة الدهون', icon: 'local_fire_department', color: '#ef4444', badge: 'عجز سعرات -400-600', cal: '~1,500-2,000 سعرة',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80',
    desc: 'خطة لحرق الدهون مع الحفاظ على الكتلة العضلية عبر عجز سعرات معتدل وبروتين مرتفع وألياف كافية.',
    macros: { protein: '2.2-2.6 غ/كغ', carbs: '2-3 غ/كغ', fat: '0.6-0.9 غ/كغ' },
    meals: [
      { emoji: '🍳', label: 'الفطور', food: 'بيض 3 حبات + خبز أسمر + خضار + أفوكادو', cal: '400' },
      { emoji: '🥗', label: 'الغداء', food: 'صدر دجاج مشوي 200غ + سلطة كبيرة + كينوا 100غ', cal: '500' },
      { emoji: '🍎', label: 'سناك', food: 'واي بروتين + تفاحة', cal: '200' },
      { emoji: '🐠', label: 'العشاء', food: 'تونة 150غ + خضار مشوية + زيت زيتون', cal: '400' },
    ],
    tips: ['لا تنزل تحت 1200 سعرة للنساء أو 1500 للرجال', 'أضف خضار في كل وجبة للشبع', 'تجنب السوائل المحلاة', 'امشِ 10,000 خطوة يومياً'],
  },
  {
    title: 'خطة الأداء الرياضي', icon: 'directions_run', color: '#3b82f6', badge: 'أداء عالي', cal: '~3,000-4,000 سعرة',
    image: 'https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=400&q=80',
    desc: 'خطة للرياضيين تركز على الطاقة الكافية للأداء الأمثل مع كربوهيدرات عالية واستشفاء سريع.',
    macros: { protein: '1.6-2.0 غ/كغ', carbs: '5-8 غ/كغ', fat: '1.0-1.5 غ/كغ' },
    meals: [
      { emoji: '🥞', label: 'الفطور', food: 'بانكيك شوفان + عسل + فواكه + بيض مسلوق', cal: '650' },
      { emoji: '⚡', label: 'قبل التمرين', food: 'موز + تمر + قهوة (قبل 60 دقيقة)', cal: '200' },
      { emoji: '🥩', label: 'الغداء', food: 'لحم بقر 200غ + أرز 250غ + خضار + عصير', cal: '800' },
      { emoji: '🍝', label: 'العشاء', food: 'معكرونة قمح كامل + دجاج + صلصة طماطم', cal: '650' },
      { emoji: '🥛', label: 'قبل النوم', food: 'كازيين بروتين + زبدة لوز', cal: '300' },
    ],
    tips: ['تناول كربوهيدرات سريعة بعد التمرين', 'رطّب جسمك قبل وأثناء وبعد التمرين', 'أضف إلكتروليتات في التمارين الطويلة', 'لا تجرب أطعمة جديدة يوم المنافسة'],
  },
  {
    title: 'خطة الحياة الصحية', icon: 'favorite', color: '#f59e0b', badge: 'توازن غذائي', cal: '~1,800-2,200 سعرة',
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=400&q=80',
    desc: 'خطة متوازنة للحفاظ على الوزن المثالي والصحة العامة مبنية على أطعمة طبيعية كاملة.',
    macros: { protein: '1.2-1.6 غ/كغ', carbs: '3-4 غ/كغ', fat: '0.8-1.0 غ/كغ' },
    meals: [
      { emoji: '🫓', label: 'الفطور', food: 'خبز حبوب كاملة + جبنة + خيار + طماطم + زيت زيتون', cal: '400' },
      { emoji: '🍲', label: 'الغداء', food: 'دجاج أو سمك 150غ + أرز بني + سلطة + فاكهة', cal: '550' },
      { emoji: '🥜', label: 'سناك', food: 'حفنة مكسرات + فاكهة موسمية', cal: '250' },
      { emoji: '🍜', label: 'العشاء', food: 'شوربة عدس + خبز أسمر + سلطة خضراء', cal: '400' },
    ],
    tips: ['تناول 5 حصص خضار وفواكه يومياً', 'قلل الأطعمة المصنعة والسكر المضاف', 'اطبخ في المنزل قدر الإمكان', 'استمتع بوجبة حرة أسبوعياً بدون ذنب'],
  },
];

export default function Nutrition() {
  const navigate = useNavigate();

  // Accordion Section Expansion States
  const [openPlansSection, setOpenPlansSection] = useState(false);
  const [openSuppsSection, setOpenSuppsSection] = useState(false);
  const [openRecipesSection, setOpenRecipesSection] = useState(false);

  // Search queries
  const [planSearch, setPlanSearch] = useState('');
  const [suppSearch, setSuppSearch] = useState('');
  const [recipeSearch, setRecipeSearch] = useState('');

  // Category filters
  const [suppCat, setSuppCat] = useState('all');
  const [recipeCat, setRecipeCat] = useState('all');

  // Inner item expansion states
  const [openPlan, setOpenPlan] = useState<number | null>(null);
  const [openSupp, setOpenSupp] = useState<number | null>(null);
  const [openRecipe, setOpenRecipe] = useState<string | null>(null);

  const supplements = [
    { name: 'واي بروتين (Whey Protein)', icon: 'exercise', color: '#22c55e', stars: '★★★★★', level: 'دليل قوي', desc: 'بروتين سريع الامتصاص مستخلص من مصل الحليب، يحفز تخليق البروتين العضلي (MPS) ويسرّع الاستشفاء بعد التمرين.', dose: '20-40 غ لكل حصة', timing: 'بعد التمرين مباشرة أو بين الوجبات', benefits: ['بناء العضلات', 'تسريع الاستشفاء', 'إكمال البروتين اليومي', 'غني بـ BCAAs'], image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&w=400&q=80' },
    { name: 'الكرياتين مونوهيدرات', icon: 'bolt', color: '#8b5cf6', stars: '★★★★★', level: 'دليل قوي', desc: 'أكثر المكملات دراسةً علمياً. يزيد مخازن الفوسفوكرياتين في العضلات مما يحسن القوة والأداء.', dose: '3-5 غ يومياً (بدون تحميل)', timing: 'في أي وقت يومياً مع ماء كافٍ', benefits: ['زيادة القوة القصوى', 'تحسين الأداء الانفجاري', 'زيادة حجم العضلات', 'دعم الوظائف الذهنية'], image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=400&q=80' },
    { name: 'الكافيين (Caffeine)', icon: 'coffee', color: '#ef4444', stars: '★★★★★', level: 'دليل قوي', desc: 'منبه طبيعي يعزز اليقظة ويقلل الإحساس بالتعب ويحسن الأداء في تمارين التحمل والقوة.', dose: '3-6 مغ/كغ من وزن الجسم', timing: '30-60 دقيقة قبل التمرين', benefits: ['زيادة التركيز', 'تأخير التعب', 'تحسين أداء التحمل', 'زيادة حرق الدهون'], image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80' },
    { name: 'أحماض أمينية متشعبة (BCAAs)', icon: 'science', color: '#f59e0b', stars: '★★★★', level: 'دليل متوسط', desc: 'ليوسين، إيزوليوسين، وفالين — تقلل تكسر البروتين العضلي أثناء التمرين وتخفف الألم.', dose: '5-10 غ (نسبة 2:1:1)', timing: 'قبل أو أثناء التمرين', benefits: ['تقليل هدم العضلات', 'تخفيف الألم العضلي', 'دعم الاستشفاء', 'مفيد أثناء الصيام'], image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=400&q=80' },
    { name: 'بيتا ألانين (Beta-Alanine)', icon: 'speed', color: '#06b6d4', stars: '★★★★★', level: 'دليل قوي', desc: 'يرفع مستويات الكارنوسين في العضلات مما يؤخر الإرهاق في التمارين عالية الكثافة.', dose: '3.2-6.4 غ يومياً (مقسمة)', timing: 'يومياً (تراكمي 2-4 أسابيع)', benefits: ['تأخير التعب العضلي', 'تحسين تحمل الشدة', 'زيادة حجم التدريب', 'وخز خفيف (غير ضار)'], image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=400&q=80' },
    { name: 'أوميغا 3 (زيت السمك)', icon: 'water_drop', color: '#3b82f6', stars: '★★★★★', level: 'دليل قوي', desc: 'أحماض دهنية أساسية (EPA و DHA) مضادة للالتهاب وتدعم صحة القلب والمفاصل.', dose: '2-3 غ (EPA+DHA) يومياً', timing: 'مع الوجبات (لتحسين الامتصاص)', benefits: ['مضاد للالتهاب', 'صحة المفاصل', 'حساسية الأنسولين', 'صحة القلب والدماغ'], image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=400&q=80' },
    { name: 'فيتامين د (Vitamin D3)', icon: 'sunny', color: '#f97316', stars: '★★★★', level: 'دليل متوسط', desc: 'فيتامين أساسي لصحة العظام والمناعة. نقصه شائع جداً ويؤثر على القوة والأداء.', dose: '1000-4000 وحدة دولية يومياً', timing: 'مع وجبة تحتوي دهون', benefits: ['صحة العظام', 'تعزيز المناعة', 'دعم الهرمونات', 'تحسين القوة العضلية'], image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=400&q=80' },
    { name: 'المغنيسيوم (Magnesium)', icon: 'hotel', color: '#a855f7', stars: '★★★★', level: 'دليل متوسط', desc: 'معدن أساسي يشارك في 300+ تفاعل إنزيمي. يُفقد بكثرة عبر التعرق.', dose: '200-400 مغ (جلايسينات أو سترات)', timing: 'قبل النوم بـ 30 دقيقة', benefits: ['تحسين جودة النوم', 'منع التشنجات', 'دعم الأعصاب', 'تقليل التوتر'], image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=400&q=80' },
  ];

  const filteredSupps = supplements.filter(s => {
    const matchesSearch = suppSearch === '' || s.name.toLowerCase().includes(suppSearch.toLowerCase()) || s.benefits.some(b => b.includes(suppSearch));
    const matchesCat = suppCat === 'all' || (suppCat === 'strong' && s.level === 'دليل قوي') || (suppCat === 'medium' && s.level === 'دليل متوسط');
    return matchesSearch && matchesCat;
  });

  const nutritionPlans = nutritionPlansData;

  const filteredPlans = nutritionPlans.filter(p =>
    planSearch === '' || p.title.toLowerCase().includes(planSearch.toLowerCase()) || p.desc.toLowerCase().includes(planSearch.toLowerCase())
  );

  const filteredRecipes = recipes.filter(r => 
    (recipeCat === 'all' || r.cat === recipeCat) && 
    (recipeSearch === '' || r.name.toLowerCase().includes(recipeSearch.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-screen text-right" dir="rtl" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center glass p-4 border-b border-primary/10">
        <BackButton />
        <div className="flex-1 text-center">
          <h1 className="text-xl font-bold tracking-tight animate-text-glow" style={{ fontFamily: 'var(--font-heading)' }}>التغذية الرياضية</h1>
        </div>
        <div className="size-10"></div> {/* Spacer for symmetry */}
      </header>

      <div className="space-y-6 px-4 py-4 max-w-4xl mx-auto w-full">
        {/* Hero Section */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section>
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80" 
                alt="تغذية رياضية متكاملة" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 right-6 left-6 z-20 md:p-4">
                <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded inline-block mb-3 shadow-lg">جديد</span>
                <h2 className="text-white text-3xl md:text-5xl font-black mb-2" style={{ fontFamily: 'var(--font-heading)' }}>وقود الأبطال</h2>
                <p className="text-slate-200 text-sm md:text-lg opacity-90 max-w-2xl">دليلك الشامل للتغذية الرياضية المتقدمة والاستشفاء العضلي</p>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* 1. Nutrition Plans Section (Accordion) */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="mb-4">
            <div className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
              openPlansSection ? 'border-primary/30 shadow-2xl shadow-primary/5' : 'border-primary/10 hover:border-primary/20'
            } bg-background-light dark:bg-zinc-900/50`}>
              
              {/* Header Button */}
              <button 
                onClick={() => setOpenPlansSection(!openPlansSection)} 
                className="w-full flex items-center gap-4 p-6 text-right cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-primary/10 text-primary shadow-lg shadow-primary/5">
                  <span className="material-symbols-outlined text-3xl">restaurant_menu</span>
                </div>
                <div className="flex-1 min-w-0 text-right">
                  <h3 className="font-black text-xl leading-tight text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-heading)' }}>خطط التغذية الرياضية</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5 justify-start">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">4 خطط أساسية</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">خطط لبناء العضلات، التنشيف، والأداء الرياضي العالي</span>
                  </div>
                </div>
                <span className={`material-symbols-outlined text-primary transition-transform duration-300 text-2xl ${openPlansSection ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>

              {/* Accordion Body */}
              {openPlansSection && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-200 dark:border-zinc-800 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                  
                  {/* Banner */}
                  <div className="relative h-28 w-full rounded-2xl overflow-hidden mb-2 shadow-inner">
                    <img 
                      src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80" 
                      alt="خطط تغذية صحية" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between z-10 text-white">
                      <span className="text-xs font-bold bg-primary/95 backdrop-blur-sm px-2.5 py-1 rounded-lg">أنظمة غذائية للرياضيين</span>
                      <span className="text-[10px] opacity-75">خُطط مخصصة لكل هدف</span>
                    </div>
                  </div>

                  {/* Search */}
                  <div className="relative">
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                    <input
                      type="text" placeholder="ابحث عن خطة غذائية..."
                      value={planSearch} onChange={e => setPlanSearch(e.target.value)}
                      className="w-full pr-10 pl-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950/40 border border-primary/10 focus:border-primary/40 outline-none text-sm transition-colors text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* Plans List */}
                  <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                    {filteredPlans.map((plan, idx) => {
                      const isOpen = openPlan === idx;
                      return (
                        <div
                          key={idx}
                          className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                            isOpen ? 'border-primary/30 shadow-xl shadow-primary/5' : 'border-slate-200 dark:border-zinc-800/40 hover:border-primary/20'
                          } bg-slate-50/50 dark:bg-zinc-950/20`}
                        >
                          <div 
                            className="p-5 relative cursor-pointer"
                            onClick={() => setOpenPlan(isOpen ? null : idx)}
                          >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                              <div className="flex flex-col gap-1 flex-1 w-full text-right">
                                <div className="flex items-center gap-3 mb-1 justify-start">
                                  <div 
                                    className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shadow-inner shrink-0"
                                    style={{ backgroundColor: `${plan.color}15`, color: plan.color }}
                                  >
                                    <span className="material-symbols-outlined text-2xl">{plan.icon}</span>
                                  </div>
                                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">{plan.title}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-1 justify-start">
                                  <span 
                                    className="text-[10px] tracking-wider flex items-center gap-1 px-2 py-1 rounded-full font-bold"
                                    style={{ color: plan.color, backgroundColor: `${plan.color}10` }}
                                  >
                                    {plan.badge}
                                  </span>
                                  <span className="text-[10px] text-slate-500 font-bold px-2 py-1">{plan.cal}</span>
                                </div>
                              </div>
                              <div 
                                className="w-9 h-9 rounded-full shrink-0 border flex items-center justify-center transition-all shadow-sm"
                                style={{ 
                                  backgroundColor: 'transparent', 
                                  borderColor: isOpen ? plan.color : 'rgba(128,128,128,0.15)', 
                                  color: plan.color 
                                }}
                              >
                                <span className={`material-symbols-outlined text-lg transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                                  expand_more
                                </span>
                              </div>
                            </div>

                            {/* Plan Expand Content */}
                            {isOpen && (
                              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-zinc-800 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 text-right">
                                {plan.image && (
                                  <div className="relative w-full h-36 md:h-44 rounded-2xl overflow-hidden mb-3">
                                    <img 
                                      src={plan.image} 
                                      alt={plan.title} 
                                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                                    <span 
                                      className="absolute bottom-3 right-3 text-[10px] font-extrabold text-white px-2.5 py-1 rounded-lg"
                                      style={{ backgroundColor: plan.color }}
                                    >
                                      {plan.badge}
                                    </span>
                                  </div>
                                )}
                                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{plan.desc}</p>
                                
                                {/* Macros */}
                                <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                                  <div className="rounded-xl p-2" style={{ backgroundColor: `${plan.color}08` }}>
                                    <span className="font-bold block mb-0.5" style={{ color: plan.color }}>البروتين</span>
                                    <span className="text-slate-700 dark:text-slate-300">{plan.macros.protein}</span>
                                  </div>
                                  <div className="rounded-xl p-2" style={{ backgroundColor: `${plan.color}08` }}>
                                    <span className="font-bold block mb-0.5" style={{ color: plan.color }}>الكربوهيدرات</span>
                                    <span className="text-slate-700 dark:text-slate-300">{plan.macros.carbs}</span>
                                  </div>
                                  <div className="rounded-xl p-2" style={{ backgroundColor: `${plan.color}08` }}>
                                    <span className="font-bold block mb-0.5" style={{ color: plan.color }}>الدهون</span>
                                    <span className="text-slate-700 dark:text-slate-300">{plan.macros.fat}</span>
                                  </div>
                                </div>

                                {/* Daily Meals */}
                                <div className="space-y-2">
                                  <h4 className="font-bold text-xs flex items-center gap-1.5 text-slate-900 dark:text-white justify-start">
                                    <span className="material-symbols-outlined text-sm" style={{ color: plan.color }}>lunch_dining</span>
                                    نموذج يومي للوجبات:
                                  </h4>
                                  <div className="space-y-2">
                                    {plan.meals.map((meal, mi) => (
                                      <div key={mi} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-100/50 dark:bg-zinc-800/40 border border-slate-200/30 dark:border-zinc-800/60 justify-start text-right">
                                        <span className="text-lg leading-none mt-0.5">{meal.emoji}</span>
                                        <div className="flex-1 min-w-0">
                                          <span className="font-bold text-xs" style={{ color: plan.color }}>{meal.label}</span>
                                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{meal.food}</p>
                                        </div>
                                        <span className="text-[10px] font-bold shrink-0 px-2 py-0.5 rounded-full" style={{ color: plan.color, backgroundColor: `${plan.color}10` }}>{meal.cal} سعرة</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Tips */}
                                <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                                  <div className="flex items-center gap-1.5 mb-1.5 justify-start">
                                    <span className="material-symbols-outlined text-amber-500 text-sm">tips_and_updates</span>
                                    <span className="font-bold text-xs text-amber-600 dark:text-amber-400">نصائح الخطة:</span>
                                  </div>
                                  <ul className="space-y-1 text-right">
                                    {plan.tips.map((tip, ti) => (
                                      <li key={ti} className="text-[11px] text-slate-500 dark:text-slate-400 flex gap-1.5 justify-start">
                                        <span style={{ color: plan.color }}>•</span>
                                        <span>{tip}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {filteredPlans.length === 0 && (
                    <div className="text-center py-10 text-slate-500">
                      <span className="material-symbols-outlined text-4xl mb-1 block opacity-30">search_off</span>
                      <p className="font-bold text-sm">لا توجد خطط مطابقة</p>
                      <p className="text-xs mt-0.5">جرّب تغيير كلمة البحث</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        </FadeContent>

        {/* 2. Supplements Guide Section (Accordion) */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="mb-4">
            <div className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
              openSuppsSection ? 'border-primary/30 shadow-2xl shadow-primary/5' : 'border-primary/10 hover:border-primary/20'
            } bg-background-light dark:bg-zinc-900/50`}>
              
              {/* Header Button */}
              <button 
                onClick={() => setOpenSuppsSection(!openSuppsSection)} 
                className="w-full flex items-center gap-4 p-6 text-right cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-primary/10 text-primary shadow-lg shadow-primary/5">
                  <span className="material-symbols-outlined text-3xl">pill</span>
                </div>
                <div className="flex-1 min-w-0 text-right">
                  <h3 className="font-black text-xl leading-tight text-slate-900 dark:text-white">دليل المكملات المعتمدة</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5 justify-start">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">8 مكملات أساسية</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">مكملات مدعومة علمياً ومعتمدة من الجمعية الدولية (ISSN)</span>
                  </div>
                </div>
                <span className={`material-symbols-outlined text-primary transition-transform duration-300 text-2xl ${openSuppsSection ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>

              {/* Accordion Body */}
              {openSuppsSection && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-200 dark:border-zinc-800 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                  
                  {/* Banner */}
                  <div className="relative h-28 w-full rounded-2xl overflow-hidden mb-2 shadow-inner">
                    <img 
                      src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80" 
                      alt="مكملات غذائية معتمدة" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between z-10 text-white">
                      <span className="text-xs font-bold bg-primary/95 backdrop-blur-sm px-2.5 py-1 rounded-lg">مكملات مدعومة بالدليل العلمي</span>
                      <span className="text-[10px] opacity-75">جرعات وتوقيتات آمنة ومدروسة</span>
                    </div>
                  </div>

                  {/* Search */}
                  <div className="relative">
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                    <input
                      type="text" placeholder="ابحث عن مكمل أو فائدة (مثل: بناء العضلات، النوم)..."
                      value={suppSearch} onChange={e => setSuppSearch(e.target.value)}
                      className="w-full pr-10 pl-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950/40 border border-primary/10 focus:border-primary/40 outline-none text-sm transition-colors text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* Category Tabs */}
                  <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
                    {[
                      { id: 'all', label: 'الكل', icon: 'apps' },
                      { id: 'strong', label: 'دليل قوي (★★★★★)', icon: 'verified' },
                      { id: 'medium', label: 'دليل متوسط (★★★★)', icon: 'clinical_research' }
                    ].map(c => (
                      <button key={c.id} onClick={() => setSuppCat(c.id)}
                        className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                          suppCat === c.id
                            ? 'bg-primary text-white shadow-lg shadow-primary/30'
                            : 'bg-slate-100 dark:bg-zinc-800 border border-primary/5 text-slate-500 dark:text-slate-400 hover:border-primary/20'
                        }`}>
                        <span className="material-symbols-outlined text-sm">{c.icon}</span>{c.label}
                      </button>
                    ))}
                  </div>

                  {/* Supplements Scrollable List */}
                  <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                    {filteredSupps.map((supp, idx) => {
                      const isOpen = openSupp === idx;
                      return (
                        <div
                          key={idx}
                          className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                            isOpen ? 'border-primary/30 shadow-xl shadow-primary/5' : 'border-slate-200 dark:border-zinc-800/40 hover:border-primary/20'
                          } bg-slate-50/50 dark:bg-zinc-950/20`}
                        >
                          <div 
                            className="p-5 relative cursor-pointer"
                            onClick={() => setOpenSupp(isOpen ? null : idx)}
                          >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                              <div className="flex flex-col gap-1 flex-1 w-full text-right">
                                <div className="flex items-center gap-3 mb-1 justify-start">
                                  <div 
                                    className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shadow-inner shrink-0"
                                    style={{ backgroundColor: `${supp.color}15`, color: supp.color }}
                                  >
                                    <span className="material-symbols-outlined text-2xl">{supp.icon}</span>
                                  </div>
                                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">{supp.name}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-1 justify-start">
                                  <span 
                                    className="text-[10px] tracking-wider flex items-center gap-1 px-2 py-1 rounded-full font-bold"
                                    style={{ color: supp.color, backgroundColor: `${supp.color}10` }}
                                  >
                                    {supp.level} {supp.stars}
                                  </span>
                                </div>
                              </div>
                              <div 
                                className="w-9 h-9 rounded-full shrink-0 border flex items-center justify-center transition-all shadow-sm"
                                style={{ 
                                  backgroundColor: 'transparent', 
                                  borderColor: isOpen ? supp.color : 'rgba(128,128,128,0.15)', 
                                  color: supp.color 
                                }}
                              >
                                <span className={`material-symbols-outlined text-lg transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                                  expand_more
                                </span>
                              </div>
                            </div>

                            {/* Details Content */}
                            {isOpen && (
                              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-zinc-800 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 text-right">
                                {supp.image && (
                                  <div className="relative w-full h-32 md:h-36 rounded-2xl overflow-hidden mb-3">
                                    <img 
                                      src={supp.image} 
                                      alt={supp.name} 
                                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                                    <span 
                                      className="absolute bottom-3 right-3 text-[10px] font-extrabold text-white px-2.5 py-1 rounded-lg"
                                      style={{ backgroundColor: supp.color }}
                                    >
                                      {supp.level}
                                    </span>
                                  </div>
                                )}
                                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{supp.desc}</p>
                                
                                <div className="grid grid-cols-2 gap-2 text-[11px]">
                                  <div className="rounded-xl p-2.5" style={{ backgroundColor: `${supp.color}08` }}>
                                    <span className="font-bold block mb-0.5" style={{ color: supp.color }}>الجرعة اليومية</span>
                                    <span className="text-slate-700 dark:text-slate-300">{supp.dose}</span>
                                  </div>
                                  <div className="rounded-xl p-2.5" style={{ backgroundColor: `${supp.color}08` }}>
                                    <span className="font-bold block mb-0.5" style={{ color: supp.color }}>أفضل توقيت</span>
                                    <span className="text-slate-700 dark:text-slate-300">{supp.timing}</span>
                                  </div>
                                </div>

                                <div className="space-y-1.5">
                                  <h4 className="font-bold text-xs flex items-center gap-1 text-slate-900 dark:text-white justify-start">
                                    <span className="material-symbols-outlined text-sm" style={{ color: supp.color }}>stars</span>
                                    الفوائد الرئيسية:
                                  </h4>
                                  <div className="flex flex-wrap gap-1.5 pr-1 justify-start">
                                    {supp.benefits.map((b, bi) => (
                                      <span key={bi} className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100/50 dark:bg-zinc-800/40 text-slate-700 dark:text-slate-300 border border-slate-200/40 dark:border-zinc-800/60 font-medium">
                                        {b}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {filteredSupps.length === 0 && (
                    <div className="text-center py-10 text-slate-500">
                      <span className="material-symbols-outlined text-4xl mb-1 block opacity-30">search_off</span>
                      <p className="font-bold text-sm">لا توجد مكملات مطابقة</p>
                      <p className="text-xs mt-0.5">جرّب تغيير التصفية أو كلمة البحث</p>
                    </div>
                  )}

                  {/* Warning Banner */}
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-right">
                    <span className="material-symbols-outlined text-amber-500 shrink-0 mt-0.5">warning</span>
                    <div>
                      <h4 className="font-bold text-sm text-amber-600 dark:text-amber-400 mb-1">تنبيه مهم</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">المكملات ليست بديلاً عن النظام الغذائي المتوازن. استشر طبيبك قبل البدء بأي مكمل. تأكد من شراء منتجات حاصلة على شهادات (NSF, Informed Sport).</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </FadeContent>

        {/* 3. Recipes Section (Accordion) */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section className="mb-4">
            <div className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
              openRecipesSection ? 'border-primary/30 shadow-2xl shadow-primary/5' : 'border-primary/10 hover:border-primary/20'
            } bg-background-light dark:bg-zinc-900/50`}>
              
              {/* Header Button */}
              <button 
                onClick={() => setOpenRecipesSection(!openRecipesSection)} 
                className="w-full flex items-center gap-4 p-6 text-right cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-primary/10 text-primary shadow-lg shadow-primary/5">
                  <span className="material-symbols-outlined text-3xl">menu_book</span>
                </div>
                <div className="flex-1 min-w-0 text-right">
                  <h3 className="font-black text-xl leading-tight text-slate-900 dark:text-white">دليل الوصفات الصحية الشامل</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5 justify-start">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">وصفات صحية متنوعة ({filteredRecipes.length})</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">فطور، وجبات غداء بروتينية، سلطات، ومشروبات رياضية</span>
                  </div>
                </div>
                <span className={`material-symbols-outlined text-primary transition-transform duration-300 text-2xl ${openRecipesSection ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>

              {/* Accordion Body */}
              {openRecipesSection && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-200 dark:border-zinc-800 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                  
                  {/* Banner */}
                  <div className="relative h-28 w-full rounded-2xl overflow-hidden mb-2 shadow-inner">
                    <img 
                      src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" 
                      alt="وصفات صحية جاهزة" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between z-10 text-white">
                      <span className="text-xs font-bold bg-primary/95 backdrop-blur-sm px-2.5 py-1 rounded-lg">وجبات شهية وسريعة التحضير</span>
                      <span className="text-[10px] opacity-75">غنية بالبروتين ومحسوبة السعرات</span>
                    </div>
                  </div>

                  {/* Search */}
                  <div className="relative">
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                    <input
                      type="text" placeholder="ابحث عن وصفة..."
                      value={recipeSearch} onChange={e => setRecipeSearch(e.target.value)}
                      className="w-full pr-10 pl-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950/40 border border-primary/10 focus:border-primary/40 outline-none text-sm transition-colors text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* Category Tabs */}
                  <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
                    {recipeCategories.map(c => (
                      <button key={c.id} onClick={() => setRecipeCat(c.id)}
                        className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                          recipeCat === c.id
                            ? 'bg-primary text-white shadow-lg shadow-primary/30'
                            : 'bg-slate-100 dark:bg-zinc-800 border border-primary/5 text-slate-500 dark:text-slate-400 hover:border-primary/20'
                        }`}>
                        <span className="material-symbols-outlined text-sm">{c.icon}</span>{c.label}
                      </button>
                    ))}
                  </div>

                  {/* Recipes Scrollable List */}
                  <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                    {filteredRecipes.map((r, i) => {
                      const isOpen = openRecipe === r.name;
                      const details = getRecipeDetails(r.name, r.cat);
                      const recipeColor = getRecipeColor(r.cat);
                      const recipeImg = getRecipeImage(r.name, r.cat);
                      return (
                        <div
                          key={i}
                          className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                            isOpen ? 'border-primary/30 shadow-xl shadow-primary/5' : 'border-slate-200 dark:border-zinc-800/40 hover:border-primary/20'
                          } bg-slate-50/50 dark:bg-zinc-950/20`}
                        >
                          <div 
                            className="p-5 relative cursor-pointer"
                            onClick={() => {
                              if (!isOpen) {
                                setOpenRecipe(r.name);
                              }
                            }}
                          >
                            {/* Header Row */}
                            <div 
                              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                              onClick={(e) => {
                                if (isOpen) {
                                  e.stopPropagation();
                                  setOpenRecipe(null);
                                }
                              }}
                            >
                              <div className="flex flex-col gap-1 flex-1 w-full text-right">
                                <div className="flex items-center gap-3 mb-1 justify-start">
                                  <div 
                                    className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shadow-inner shrink-0"
                                    style={{ backgroundColor: `${recipeColor}15` }}
                                  >
                                    {r.icon}
                                  </div>
                                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">{r.name}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-1 justify-start">
                                  <span 
                                    className="text-[10px] tracking-wider flex items-center gap-1 px-2 py-1 rounded-full font-bold"
                                    style={{ color: recipeColor, backgroundColor: `${recipeColor}10` }}
                                  >
                                    <span className="material-symbols-outlined text-xs">fitness_center</span> {r.protein}غ بروتين
                                  </span>
                                  <span 
                                    className="text-[10px] tracking-wider flex items-center gap-1 px-2 py-1 rounded-full font-bold"
                                    style={{ color: recipeColor, backgroundColor: `${recipeColor}10` }}
                                  >
                                    <span className="material-symbols-outlined text-xs">local_fire_department</span> {r.cal} سعرة
                                  </span>
                                  <span 
                                    className="text-[10px] tracking-wider flex items-center gap-1 px-2 py-1 rounded-full font-bold"
                                    style={{ color: recipeColor, backgroundColor: `${recipeColor}10` }}
                                  >
                                    <span className="material-symbols-outlined text-xs">timer</span> {r.time}
                                  </span>
                                </div>
                              </div>
                              <div 
                                className="w-9 h-9 rounded-full shrink-0 border flex items-center justify-center transition-all shadow-sm"
                                style={{ 
                                  backgroundColor: 'transparent', 
                                  borderColor: isOpen ? recipeColor : 'rgba(128,128,128,0.15)', 
                                  color: recipeColor 
                                }}
                              >
                                <span className={`material-symbols-outlined text-lg transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                                  expand_more
                                </span>
                              </div>
                            </div>

                            {/* Details Content */}
                            {isOpen && (
                              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-zinc-800 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 text-right">
                                {recipeImg && (
                                  <div className="relative w-full h-32 md:h-36 rounded-2xl overflow-hidden mb-3">
                                    <img 
                                      src={recipeImg} 
                                      alt={r.name} 
                                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                                    <span 
                                      className="absolute bottom-3 right-3 text-[10px] font-extrabold text-white px-2.5 py-1 rounded-lg"
                                      style={{ backgroundColor: recipeColor }}
                                    >
                                      {r.protein}غ بروتين • {r.cal} سعرة
                                    </span>
                                  </div>
                                )}

                                {/* Stats Grid */}
                                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                                  <div className="bg-slate-100/50 dark:bg-zinc-800/40 rounded-xl p-2 border border-slate-200/50 dark:border-zinc-800/60">
                                    <span className="font-bold block mb-0.5 text-slate-500 dark:text-slate-400">السعرات</span>
                                    <span className="text-slate-900 dark:text-white font-black">{r.cal} سعرة</span>
                                  </div>
                                  <div className="bg-slate-100/50 dark:bg-zinc-800/40 rounded-xl p-2 border border-slate-200/50 dark:border-zinc-800/60">
                                    <span className="font-bold block mb-0.5 text-slate-500 dark:text-slate-400">البروتين</span>
                                    <span className="text-slate-900 dark:text-white font-black">{r.protein} غ</span>
                                  </div>
                                  <div className="bg-slate-100/50 dark:bg-zinc-800/40 rounded-xl p-2 border border-slate-200/50 dark:border-zinc-800/60">
                                    <span className="font-bold block mb-0.5 text-slate-500 dark:text-slate-400">الوقت</span>
                                    <span className="text-slate-900 dark:text-white font-black">{r.time}</span>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                                  {/* Ingredients */}
                                  <div className="space-y-2">
                                    <h4 className="font-bold text-xs flex items-center gap-1.5 text-slate-900 dark:text-white justify-start">
                                      <span className="material-symbols-outlined text-sm" style={{ color: recipeColor }}>shopping_basket</span>
                                      المكونات:
                                    </h4>
                                    <ul className="space-y-2 text-[11px] pr-1">
                                      {details.ingredients.map((ing, ingIdx) => (
                                        <li key={ingIdx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 justify-start">
                                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: recipeColor }}></span>
                                          <span>{ing}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Steps */}
                                  <div className="space-y-2">
                                    <h4 className="font-bold text-xs flex items-center gap-1.5 text-slate-900 dark:text-white justify-start">
                                      <span className="material-symbols-outlined text-sm" style={{ color: recipeColor }}>restaurant</span>
                                      طريقة التحضير:
                                    </h4>
                                    <ol className="space-y-2.5 pr-1 text-right">
                                      {details.steps.map((step, stepIdx) => (
                                        <li key={stepIdx} className="flex items-start gap-2.5 text-[11px] leading-relaxed justify-start">
                                          <span 
                                            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black"
                                            style={{ color: recipeColor, backgroundColor: `${recipeColor}15` }}
                                          >
                                            {stepIdx + 1}
                                          </span>
                                          <span className="text-slate-700 dark:text-slate-300 pt-0.5">{step}</span>
                                        </li>
                                      ))}
                                    </ol>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {filteredRecipes.length === 0 && (
                    <div className="text-center py-10 text-slate-500">
                      <span className="material-symbols-outlined text-4xl mb-1 block opacity-30">search_off</span>
                      <p className="font-bold text-sm">لا توجد وصفات مطابقة</p>
                      <p className="text-xs mt-0.5">جرّب تغيير الفئة أو كلمة البحث</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        </FadeContent>

        {/* Hydration Section (Always visible banner at the bottom) */}
        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <section>
            <div className="bg-gradient-to-br from-primary to-[#4a0b8a] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="max-w-xl">
                  <h2 className="text-3xl font-black mb-4 flex items-center gap-3">
                    <span className="material-symbols-outlined text-4xl">water_drop</span>
                    استراتيجية الترطيب
                  </h2>
                  <p className="text-slate-100 text-lg mb-6 leading-relaxed opacity-90 font-medium text-right">
                    يؤثر نقص الماء بنسبة 2% فقط على أدائك الرياضي والذهني بشكل حاد. اتبع قاعدة الـ "500 مل" قبل التمرين لتضمن أداءً مستقراً.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 justify-start">
                    <div className="bg-white/10 backdrop-blur-md px-5 py-2 rounded-2xl flex items-center gap-2 border border-white/10">
                      <span className="material-symbols-outlined text-xl">schedule</span>
                      <span className="text-sm font-bold tracking-wide leading-none">كل 120 دقيقة</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md px-5 py-2 rounded-2xl flex items-center gap-2 border border-white/10">
                      <span className="material-symbols-outlined text-xl">glass_cup</span>
                      <span className="text-sm font-bold tracking-wide leading-none">3.5 - 4.5 لتر يومياً</span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <span className="material-symbols-outlined text-[160px] opacity-20 rotate-12 bg-white/10 p-4 rounded-full">opacity</span>
                </div>
              </div>
              <span className="material-symbols-outlined absolute -bottom-10 -left-10 text-[300px] opacity-10 rotate-12">opacity</span>
            </div>
          </section>
        </FadeContent>
      </div>
    </div>
  );
}
