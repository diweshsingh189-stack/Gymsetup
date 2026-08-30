export const EQUIPMENT_CATEGORIES = [
  { id: 'all', label: 'All Equipment' },
  { id: 'cardio', label: 'Cardio Machines' },
  { id: 'upper', label: 'Upper Body Machines' },
  { id: 'lower', label: 'Lower Body Machines' },
  { id: 'cables', label: 'Cable Station' },
  { id: 'free_weights', label: 'Dumbbells & Benches' }
];

export const EQUIPMENT_DATA = [
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown Machine',
    symbol: '🚣‍♂️',
    category: 'upper',
    primaryMuscle: 'Upper Back & Lats',
    secondaryMuscles: ['Biceps', 'Shoulders'],
    difficulty: 'Very Beginner Friendly',
    iconName: 'ChevronDown',
    imageType: 'lat-pulldown',
    shortDesc: 'Builds upper back strength and replaces difficult pull-ups.',
    adjustment: 'Adjust the thigh pads so your knees are firmly tucked under without lifting your hips off the seat.',
    steps: [
      'Sit down and adjust the knee pad so your legs are snug and feet are flat on the floor.',
      'Grip the bar slightly wider than shoulder-width with palms facing away from you (overhand grip).',
      'Lean back very slightly (around 10-15 degrees), keep your chest up and proud.',
      'Pull the bar down smoothly toward your upper chest/collarbone, driving your elbows down and back.',
      'Slowly resist as the bar returns to the top for a full stretch. Never let the weight stack slam.'
    ],
    safetyTips: [
      'Never pull the bar behind your neck — always pull to your upper chest.',
      'Do not swing your entire torso back and forth to generate momentum.',
      'Keep your wrists straight, not bent backward.'
    ],
    startingWeight: 'Women: 15–25 kg (30–55 lbs) | Men: 25–40 kg (55–90 lbs)'
  },
  {
    id: 'chest-press-machine',
    name: 'Seated Chest Press',
    symbol: '🏋️‍♂️',
    category: 'upper',
    primaryMuscle: 'Chest (Pectorals)',
    secondaryMuscles: ['Triceps', 'Front Shoulders'],
    difficulty: 'Zero Intimidation',
    iconName: 'Activity',
    imageType: 'chest-press',
    shortDesc: 'The safest way for beginners to train pushing strength without dropping free weights.',
    adjustment: 'Adjust the seat height so the handles align directly with the middle of your chest (nipple line).',
    steps: [
      'Sit with your back and head firmly against the backrest and feet planted firmly on the floor.',
      'Grab the handles with knuckles facing forward. Your elbows should be slightly below shoulder level.',
      'Exhale and press forward until your arms are extended, but DO NOT violently lock your elbows.',
      'Inhale as you slowly bring the handles back until your chest feels a comfortable stretch.',
      'Pause for 1 second at full extension and keep your shoulders down away from your ears.'
    ],
    safetyTips: [
      'Do not flare your elbows straight out at 90 degrees; keep them tucked at roughly 45–60 degrees.',
      'Keep your wrists aligned with your forearms to avoid wrist strain.'
    ],
    startingWeight: 'Women: 10–20 kg (20–45 lbs) | Men: 20–35 kg (45–75 lbs)'
  },
  {
    id: 'leg-press',
    name: 'Seated / 45° Leg Press',
    symbol: '🦵',
    category: 'lower',
    primaryMuscle: 'Quadriceps & Glutes',
    secondaryMuscles: ['Hamstrings', 'Calves'],
    difficulty: 'Beginner Friendly',
    iconName: 'Zap',
    imageType: 'leg-press',
    shortDesc: 'Build massive lower body strength without loading a heavy barbell onto your spine.',
    adjustment: 'Seat angle should support your lower back. Set the safety stop pins high enough so you cannot get pinned.',
    steps: [
      'Sit with your entire back and hips firmly against the pad. Place feet shoulder-width on the platform.',
      'Press the platform slightly to disengage the side safety lock levers with your hands.',
      'Slowly lower the platform by bending your knees until your legs reach a 90-degree angle.',
      'Push through your heels and mid-foot to return to the starting position.',
      'CRITICAL: NEVER lock your knees straight at the top! Keep a soft, slight bend.'
    ],
    safetyTips: [
      'NEVER lock your knees out straight under load (can cause hyperextension injury).',
      'Do not let your lower back or tailbone round or peel off the backrest at the bottom.',
      'Always test the safety release levers with empty weight first.'
    ],
    startingWeight: 'Women: 25–45 kg (50–100 lbs) | Men: 40–80 kg (90–175 lbs)'
  },
  {
    id: 'seated-cable-row',
    name: 'Seated Cable Row',
    symbol: '🚣',
    category: 'cables',
    primaryMuscle: 'Mid Back & Rhomboids',
    secondaryMuscles: ['Biceps', 'Forearms', 'Rear Delts'],
    difficulty: 'Beginner Friendly',
    iconName: 'Repeat',
    imageType: 'seated-row',
    shortDesc: 'Corrects slouching posture from desk jobs by strengthening the mid-back.',
    adjustment: 'Attach a V-bar or double D-handle to the low pulley.',
    steps: [
      'Sit on the bench, place feet on footrests with knees slightly bent (not locked straight).',
      'Reach forward to grip the handle, sit upright with spine neutral and shoulders relaxed.',
      'Pull the handle toward your lower abdomen/belly button while squeezing your shoulder blades together.',
      'Hold the contraction for 1 second, then slowly release forward under control.'
    ],
    safetyTips: [
      'Do not rock excessively back and forth like a rowing boat.',
      'Keep your chest high and do not round your lower spine.'
    ],
    startingWeight: 'Women: 15–25 kg (30–55 lbs) | Men: 25–40 kg (55–90 lbs)'
  },
  {
    id: 'treadmill',
    name: 'Smart Treadmill',
    symbol: '🏃‍♂️',
    category: 'cardio',
    primaryMuscle: 'Cardiovascular / Heart Health',
    secondaryMuscles: ['Calves', 'Hamstrings', 'Quads'],
    difficulty: 'Super Simple',
    iconName: 'Flame',
    imageType: 'treadmill',
    shortDesc: 'The classic warm-up and conditioning machine with zero learning curve.',
    adjustment: 'Attach the red emergency stop clip to your shirt before pressing Quick Start.',
    steps: [
      'Step onto the side rails first (not the moving belt).',
      'Clip the red safety key to your waistband or shirt collar.',
      'Press "Quick Start" and wait for the belt to start at 1.0 km/h before stepping onto the center.',
      'Gradually increase speed to 4.5–5.5 km/h for a brisk walking warm-up.',
      'Add a 1.0% to 2.5% incline to mimic natural outdoor walking ground resistance.'
    ],
    safetyTips: [
      'Always use the safety clip — if you stumble, it stops the belt instantly.',
      'Do not stare down at your phone while walking fast; keep eyes forward.',
      'Use the handrails to steady yourself initially, but avoid hanging your body weight on them.'
    ],
    startingWeight: 'Speed: 4.5–5.5 km/h | Incline: 1.0–2.0% (5–10 mins warm-up)'
  },
  {
    id: 'stationary-bike',
    name: 'Upright / Recumbent Bike',
    symbol: '🚴',
    category: 'cardio',
    primaryMuscle: 'Cardiovascular & Quads',
    secondaryMuscles: ['Calves', 'Glutes'],
    difficulty: 'Zero Joint Stress',
    iconName: 'RotateCw',
    imageType: 'bike',
    shortDesc: 'Low-impact cardio ideal for warming up knees, hips, and ankles before lifting.',
    adjustment: 'Seat height should match your hip bone when standing next to the bike.',
    steps: [
      'Adjust seat height so when your foot is at the lowest pedal point, there is a gentle 10–15° bend in the knee.',
      'Slip feet into the pedal straps and tighten gently.',
      'Press "Quick Start" and set resistance level to 3–5.',
      'Maintain an RPM (pedal speed) of 65–80 RPM with steady, comfortable breathing.'
    ],
    safetyTips: [
      'If the seat is too low, your knees will ache; if too high, your hips will rock side-to-side.',
      'Do not hunch over the handlebars; keep your spine long.'
    ],
    startingWeight: 'Resistance Level: 3–5 | Duration: 5–10 minutes'
  },
  {
    id: 'dumbbells-starter',
    name: 'Adjustable / Fixed Dumbbells',
    symbol: '🛡️',
    category: 'free_weights',
    primaryMuscle: 'Full Body Versatility',
    secondaryMuscles: ['Stabilizers', 'Core'],
    difficulty: 'Essential Skill',
    iconName: 'Dumbbell',
    imageType: 'dumbbells',
    shortDesc: 'The ultimate tool for balanced strength on both the left and right sides of your body.',
    adjustment: 'Select weights from the dumbbell rack. Light beginner weights: 2 kg to 7.5 kg (5–15 lbs).',
    steps: [
      'Pick weights from the rack by bending at your knees and hips, not rounding your spine.',
      'Step back 2 steps from the dumbbell rack so other gym members can access weights.',
      'Perform exercises (e.g. Goblet Squats, Bicep Curls, Dumbbell Shoulder Press) with controlled tempo (2s down, 1s up).',
      'Always return dumbbells to their exact marked numerical slot on the rack after finishing.'
    ],
    safetyTips: [
      'Never drop dumbbells on the gym floor from above waist height.',
      'Do not pick a weight so heavy that your body has to contort or swing.',
      'Always re-rack weights — this is the #1 rule of gym etiquette.'
    ],
    startingWeight: 'Women: 2–6 kg (5–12 lbs) | Men: 4–10 kg (10–22 lbs)'
  },
  {
    id: 'cable-crossover-station',
    name: 'Dual Adjustable Cable Pulley',
    symbol: '⚡',
    category: 'cables',
    primaryMuscle: 'Arms, Shoulders & Core',
    secondaryMuscles: ['Chest', 'Back'],
    difficulty: 'Intermediate Beginner',
    iconName: 'GitCommit',
    imageType: 'cables',
    shortDesc: 'Constant tension throughout the entire movement makes cables safe and joint-friendly.',
    adjustment: 'Pull the spring pin on the slider collar and slide the pulley up or down to your desired height.',
    steps: [
      'Ensure both sides are adjusted to identical height notches.',
      'Attach your preferred accessory (Rope for triceps, Straight bar for curls, Single D-handles for shoulders).',
      'Select a light pin weight on the stack (e.g. 5–10 kg).',
      'Maintain continuous tension by not letting the weight stack clink or hit bottom between reps.'
    ],
    safetyTips: [
      'Make sure the locking pin clicks fully into the height hole before pulling.',
      'Do not release cables quickly — guide the handles back smoothly.'
    ],
    startingWeight: 'Weight pin: 5–15 kg (10–30 lbs)'
  },
  {
    id: 'leg-curl-extension',
    name: 'Seated Leg Curl / Leg Extension',
    symbol: '🦵',
    category: 'lower',
    primaryMuscle: 'Hamstrings & Quadriceps',
    secondaryMuscles: ['Knee Stabilizers'],
    difficulty: 'Beginner Friendly',
    iconName: 'Layers',
    imageType: 'leg-curl',
    shortDesc: 'Isolates the front of thighs (quads) and back of thighs (hamstrings) safely.',
    adjustment: 'Align the pivot axis marker (red/yellow dot on machine) directly with your knee joint line.',
    steps: [
      'Adjust the backrest so your knees sit right at the edge of the seat cushion.',
      'Position the round shin/ankle pad so it rests comfortably above your sneakers.',
      'Hold the side stabilizer handles tightly to keep your hips glued to the seat.',
      'Extend or curl smoothly, pause for 1 second, then lower with a 3-second negative descent.'
    ],
    safetyTips: [
      'Do not kick or jerk the weight up rapidly.',
      'Keep toes pointed neutral, not twisted inwards or outwards.'
    ],
    startingWeight: 'Women: 10–20 kg (20–45 lbs) | Men: 15–30 kg (30–65 lbs)'
  },
  {
    id: 'smith-machine',
    name: 'Smith Machine',
    symbol: '🛡️',
    category: 'free_weights',
    primaryMuscle: 'Full Body Compound Movements',
    secondaryMuscles: ['Quads', 'Chest', 'Shoulders'],
    difficulty: 'Guided Safety Barbell',
    iconName: 'Shield',
    imageType: 'smith-machine',
    shortDesc: 'A barbell fixed on vertical steel rails with built-in twist safety hooks and emergency stop catches.',
    adjustment: 'Set the mechanical safety catch pins at lowest depth before adding any barbell plates.',
    steps: [
      'Set the lower safety stopper pins at the lowest point you plan to squat or bench press.',
      'Practice rotating your wrists to hook and unhook the empty bar from the rack notches.',
      'Position yourself centered beneath the barbell with a solid, balanced stance.',
      'Perform your movement and simply rotate your wrists forward/backward to lock the bar safely at any point.'
    ],
    safetyTips: [
      'ALWAYS set the safety stopper brackets before loading weights.',
      'Note that the bar path is fixed vertically, so adjust your foot placement slightly forward on squats.'
    ],
    startingWeight: 'Bar alone (counterbalanced to ~7–10 kg / 15–20 lbs)'
  }
];
