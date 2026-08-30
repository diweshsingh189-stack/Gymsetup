export const NUTRITION_MACROS = [
  {
    name: 'Protein',
    role: 'Muscle Repair & Satiety',
    tagline: 'The building blocks of strength',
    recommended: '1.4 – 1.8g per kg of bodyweight',
    sources: [
      'Eggs & Egg whites (6g per egg)',
      'Chicken breast / Turkey (25–30g per 100g)',
      'Greek yogurt & Cottage cheese / Paneer (15–20g per cup)',
      'Tofu, Tempeh & Edamame (15–20g per cup)',
      'Lentils, Chickpeas & Black beans (15g per cooked cup)',
      'Whey or Plant protein powder (20–25g per scoop)'
    ],
    beginnerTip: 'Include a palm-sized portion of protein with each of your 3 main meals.'
  },
  {
    name: 'Complex Carbohydrates',
    role: 'Primary Training Fuel & Energy',
    tagline: 'Gives your muscles stamina',
    recommended: '3 – 5g per kg of bodyweight',
    sources: [
      'Oatmeal & Rolled oats',
      'Brown & White rice, Quinoa',
      'Sweet potatoes & Potatoes',
      'Whole grain bread & wraps',
      'Bananas, Berries & Apples'
    ],
    beginnerTip: 'Carbs are not the enemy! They replenish muscle glycogen so you feel energized and strong.'
  },
  {
    name: 'Healthy Fats',
    role: 'Hormone Production & Joint Health',
    tagline: 'Keeps joints lubricated & hormones balanced',
    recommended: '0.8 – 1.0g per kg of bodyweight',
    sources: [
      'Extra virgin olive oil',
      'Avocados & Guacamole',
      'Almonds, Walnuts & Chia seeds',
      'Peanut butter / Almond butter',
      'Fatty fish (Salmon, Sardines)'
    ],
    beginnerTip: 'Use a thumb-sized portion of healthy fats with each meal.'
  }
];

export const PRE_POST_MEALS = {
  preWorkout: [
    { title: 'Banana + 1 tbsp Peanut Butter', timing: '30–45 mins before', benefits: 'Quick digestible carbs with healthy fat for steady blood sugar.' },
    { title: 'Oatmeal with Berries & Scoop of Protein', timing: '90–120 mins before', benefits: 'Sustained energy release for heavy workouts.' },
    { title: 'Whole Wheat Toast with 2 Scrambled Eggs', timing: '90 mins before', benefits: 'Balanced carbs and easily absorbed amino acids.' },
    { title: 'Handful of Dates + 10 Almonds', timing: '20–30 mins before', benefits: 'Natural glucose rush for immediate gym energy.' }
  ],
  postWorkout: [
    { title: 'Whey / Plant Protein Shake with a Banana', timing: 'Within 45–60 mins', benefits: 'Rapid amino acid delivery to start muscle protein synthesis.' },
    { title: 'Grilled Chicken / Tofu Bowl with Rice & Veggies', timing: 'Within 1–2 hours', benefits: 'Complete meal restoring glycogen and rebuilding muscle tissue.' },
    { title: 'Greek Yogurt with Granola & Honey', timing: 'Within 60 mins', benefits: 'High casein/whey blend + gut-healthy probiotics.' },
    { title: 'Paneer / Soya Tikka Wrap with Crunchy Salad', timing: 'Within 1–2 hours', benefits: 'Rich plant-based protein and micronutrient refuel.' }
  ]
};

export const FAD_DIET_MYTHS = [
  {
    myth: '“You must starve yourself and cut out all carbs to get results.”',
    reality: 'Severely cutting calories or carbs crashes your metabolism, spikes cortisol, and leaves you exhausted in the gym. Sustainable fat loss only requires a gentle 300–400 kcal deficit while keeping energy high.'
  },
  {
    myth: '“If you don’t drink a protein shake within 3 minutes of finishing, your workout is wasted.”',
    reality: 'The “anabolic window” is several hours long. What matters is hitting your total daily protein goal consistently across the whole day.'
  },
  {
    myth: '“Supplements and fat burners are necessary for beginners.”',
    reality: '95% of your progress comes from real whole foods, proper hydration, and regular sleep. The only evidence-backed supplements are creatine monohydrate and whey protein (for convenience).'
  }
];
