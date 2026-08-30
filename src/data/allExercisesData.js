// Unified Knowledge Base of All Gym Machines, Exercises, and Movements
// Contains complete step-by-step instructions, seat/pin setups, starting weights, and safety tips

export const ALL_EXERCISES_DIRECTORY = [
  // 1. CHEST / PUSH
  {
    id: 'chest-press-machine',
    name: 'Seated Chest Press Machine',
    symbol: '🏋️‍♂️',
    category: 'Chest (Push)',
    muscleGroup: 'Chest, Front Shoulders & Triceps',
    equipmentType: 'Pin Machine',
    difficulty: 'Zero Intimidation (Level 1)',
    startingWeight: 'Women: 10–20 kg | Men: 20–35 kg',
    seatSetup: 'Adjust seat height so handles align directly with the middle of your chest (nipple line). Keep feet flat on floor.',
    shortDesc: 'The safest way for beginners to train pushing strength without balancing heavy dumbbells or barbells.',
    steps: [
      'Sit with head and back pinned flat against backrest; plant feet firmly on the ground.',
      'Grip handles with knuckles facing forward. Position elbows slightly below shoulder height (45° angle).',
      'Exhale smoothly and press handles forward until arms are almost fully extended (DO NOT lock elbows violently).',
      'Inhale and control the return descent for 2–3 seconds until you feel a comfortable chest stretch.',
      'Pause for 1 second at full stretch before pressing the next rep.'
    ],
    safetyTips: [
      'Do not flare elbows straight out at 90 degrees — tuck them slightly at 45° to protect shoulders.',
      'Never let the weight stack slam together at the bottom.'
    ],
    commonMistakes: 'Lifting shoulders up towards ears, bouncing off backrest, locking out elbows.'
  },
  {
    id: 'flat-dumbbell-bench-press',
    name: 'Flat Dumbbell Bench Press',
    symbol: '🏋️',
    category: 'Chest (Push)',
    muscleGroup: 'Chest, Triceps & Anterior Deltoids',
    equipmentType: 'Free Weights (Dumbbells + Bench)',
    difficulty: 'Beginner Friendly (Level 2)',
    startingWeight: 'Women: 3–6 kg each | Men: 6–12 kg each',
    seatSetup: 'Lie flat on horizontal bench with eyes under the weights, feet planted wide for stability.',
    shortDesc: 'Builds balanced left and right pushing strength with free range of natural wrist rotation.',
    steps: [
      'Sit on bench edge with dumbbells resting on thighs. Lie back while kicking weights up to chest.',
      'Hold dumbbells with elbows angled at roughly 60 degrees from your torso.',
      'Press both dumbbells upward in a slight arc over your chest until arms are straight.',
      'Lower weights under control for 2 seconds until dumbbells are level with chest.',
      'Keep shoulder blades squeezed together into the bench throughout.'
    ],
    safetyTips: [
      'Never drop dumbbells to the floor from above; bring them to your thighs first when sitting up.',
      'Keep your wrists straight over elbows, not bent backward.'
    ],
    commonMistakes: 'Arching lower back excessively, letting dumbbells clang together violently at top.'
  },
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Chest Press',
    symbol: '📐',
    category: 'Chest (Push)',
    muscleGroup: 'Upper Chest & Front Shoulders',
    equipmentType: 'Free Weights (Incline Bench ~30°)',
    difficulty: 'Beginner Friendly (Level 2)',
    startingWeight: 'Women: 2–5 kg each | Men: 5–10 kg each',
    seatSetup: 'Set adjustable bench to a 30-degree incline notch (too steep turns it into shoulder press).',
    shortDesc: 'Targets the upper portion of the pectorals (clavicular head) for full chest development.',
    steps: [
      'Lie back on the 30° inclined bench with dumbbells held at shoulder level.',
      'Press dumbbells upwards directly over upper chest.',
      'Lower slowly until elbows reach 90 degrees with gentle chest stretch.',
      'Repeat with smooth rhythm.'
    ],
    safetyTips: [
      'Avoid setting bench angle above 45 degrees to prevent excess front shoulder strain.'
    ],
    commonMistakes: 'Setting bench too high, flaring elbows out wide.'
  },

  // 2. BACK / PULL
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown Machine (Overhand)',
    symbol: '🚣‍♂️',
    category: 'Back (Pull)',
    muscleGroup: 'Upper Back, Lats & Biceps',
    equipmentType: 'Cable Machine',
    difficulty: 'Very Beginner Friendly (Level 1)',
    startingWeight: 'Women: 15–25 kg | Men: 25–40 kg',
    seatSetup: 'Adjust roller thigh pads so your knees are firmly anchored without lifting your hips off seat.',
    shortDesc: 'Builds wide V-taper upper back strength and is the best foundation before doing bodyweight pull-ups.',
    steps: [
      'Grip the wide bar slightly wider than shoulder width with palms facing away (overhand grip).',
      'Sit down and lock thighs under the pads with feet flat on the floor.',
      'Lean back slightly (~10–15 degrees) and keep chest lifted proud.',
      'Pull bar down smoothly toward your upper chest/collarbone, driving your elbows down and back.',
      'Resist the weight slowly as the bar returns all the way up for a deep back stretch.'
    ],
    safetyTips: [
      'NEVER pull the bar behind your neck (can cause rotator cuff & cervical spine injury).',
      'Do not swing your whole torso back and forth like a pendulum.'
    ],
    commonMistakes: 'Pulling with arms only instead of leading with back & elbows, violent swinging.'
  },
  {
    id: 'seated-cable-row',
    name: 'Seated Cable Row (Neutral Grip)',
    symbol: '🚣',
    category: 'Back (Pull)',
    muscleGroup: 'Mid Back, Rhomboids & Rear Delts',
    equipmentType: 'Low Cable Station',
    difficulty: 'Beginner Friendly (Level 1)',
    startingWeight: 'Women: 15–25 kg | Men: 20–35 kg',
    seatSetup: 'Attach V-bar or double D-handle to low cable pulley. Sit with knees soft (never locked straight).',
    shortDesc: 'The #1 exercise to correct rounded desk-job posture by strengthening mid-back rhomboids.',
    steps: [
      'Sit upright on bench, place feet on footrests with gentle knee bend.',
      'Grab handle and sit with spine straight, shoulders down away from ears.',
      'Pull handle toward your lower belly/navel while squeezing shoulder blades together hard.',
      'Hold the squeeze for 1 second, then release slowly forward with controlled posture.'
    ],
    safetyTips: [
      'Do not round your lower spine forward when reaching for the handle.'
    ],
    commonMistakes: 'Rocking backwards and forwards like a rowing boat, shrugging shoulders.'
  },
  {
    id: 'one-arm-dumbbell-row',
    name: 'One-Arm Dumbbell Bench Row',
    symbol: '💪',
    category: 'Back (Pull)',
    muscleGroup: 'Lats, Rhomboids & Forearm Grip',
    equipmentType: 'Free Weights (Dumbbell + Flat Bench)',
    difficulty: 'Beginner Friendly (Level 2)',
    startingWeight: 'Women: 4–8 kg | Men: 8–14 kg',
    seatSetup: 'Place one knee and same-side hand firmly supported on a flat bench. Back flat like a tabletop.',
    shortDesc: 'Develops unilateral back strength and core stability to prevent muscular imbalances.',
    steps: [
      'Place left hand and left knee on bench; right foot planted on floor.',
      'Hold dumbbell in right hand hanging straight down under shoulder.',
      'Pull dumbbell up toward your hip pocket, driving elbow towards the ceiling.',
      'Squeeze right back muscle at the top, then lower smoothly to full extension.'
    ],
    safetyTips: [
      'Keep torso parallel to floor; do not twist spine aggressively to yank the weight.'
    ],
    commonMistakes: 'Pulling weight to chest instead of hip, rotating upper body.'
  },

  // 3. LEGS / LOWER BODY
  {
    id: 'seated-leg-press',
    name: 'Seated / 45° Leg Press Machine',
    symbol: '🦵',
    category: 'Legs (Lower Body)',
    muscleGroup: 'Quadriceps, Glutes & Hamstrings',
    equipmentType: 'Pin or Plate-Loaded Machine',
    difficulty: 'Beginner Friendly (Level 1)',
    startingWeight: 'Women: 25–45 kg | Men: 40–80 kg',
    seatSetup: 'Seat backrest adjusted to comfortable 45° angle. Test safety stops before adding heavy weight.',
    shortDesc: 'Builds massive leg drive and quad strength with zero compressive spine stress.',
    steps: [
      'Sit back against pad with entire spine supported. Place feet shoulder-width in center of platform.',
      'Press platform slightly and disengage side safety release handles.',
      'Lower platform slowly by bending knees until legs reach 90-degree angle (knees tracking over toes).',
      'Push through mid-foot and heels to drive platform back up.',
      'CRITICAL: Stop just before full extension — NEVER lock your knees out straight!'
    ],
    safetyTips: [
      'NEVER lock knees straight at the top under heavy loads (risk of joint hyperextension).',
      'Do not allow lower back or tailbone to round off the back cushion at bottom.'
    ],
    commonMistakes: 'Locking knee joints, letting knees cave inward, bouncing weight off safety stops.'
  },
  {
    id: 'dumbbell-goblet-squat',
    name: 'Dumbbell Goblet Squats',
    symbol: '🏋️‍♀️',
    category: 'Legs (Lower Body)',
    muscleGroup: 'Quads, Glutes & Core Stability',
    equipmentType: 'Free Weights (Single Dumbbell or Kettlebell)',
    difficulty: 'Beginner Friendly (Level 1)',
    startingWeight: 'Women: 4–8 kg | Men: 8–16 kg',
    seatSetup: 'Stand with feet shoulder-width apart, toes pointed slightly outward (15–30 degrees).',
    shortDesc: 'The gold standard exercise for teaching perfect squat mechanics and upright torso posture.',
    steps: [
      'Hold one dumbbell vertically with both hands cupped under the top weight bell against upper chest.',
      'Take a deep breath into belly, brace core, and push hips back and down between your heels.',
      'Descend until thighs are parallel to floor while keeping chest high and elbows inside knees.',
      'Drive through your feet to stand back up, squeezing glutes firmly at top.'
    ],
    safetyTips: [
      'Keep heels glued to the floor; do not let heels lift onto toes.',
      'Keep chest upright so dumbbell does not pull your spine forward.'
    ],
    commonMistakes: 'Rounding lower back, knees collapsing inward, rising onto toes.'
  },
  {
    id: 'seated-leg-curl',
    name: 'Seated Hamstring Leg Curl Machine',
    symbol: '🦵',
    category: 'Legs (Lower Body)',
    muscleGroup: 'Hamstrings (Back of Thighs)',
    equipmentType: 'Pin Machine',
    difficulty: 'Very Easy (Level 1)',
    startingWeight: 'Women: 15–25 kg | Men: 25–40 kg',
    seatSetup: 'Align machine pivot axis dot directly with knee joint line. Thigh clamp firmly holding thighs down.',
    shortDesc: 'Isolates the back of thighs to prevent knee injuries and balance quad-heavy daily walking.',
    steps: [
      'Sit back against pad with legs extended over bottom roller pad (pad resting on lower calves).',
      'Lower and lock the top thigh pad securely against your upper thighs.',
      'Grip side handles and curl legs downward and back under the seat.',
      'Hold contraction for 1 second, then allow roller to return up with 2-second controlled tempo.'
    ],
    safetyTips: [
      'Keep ankles relaxed and neutral; avoid pointing toes aggressively inward.'
    ],
    commonMistakes: 'Kicking weight fast, lifting hips off seat.'
  },
  {
    id: 'seated-leg-extension',
    name: 'Seated Quad Leg Extension Machine',
    symbol: '🦵',
    category: 'Legs (Lower Body)',
    muscleGroup: 'Quadriceps (Front of Thighs)',
    equipmentType: 'Pin Machine',
    difficulty: 'Very Easy (Level 1)',
    startingWeight: 'Women: 10–20 kg | Men: 20–35 kg',
    seatSetup: 'Backrest adjusted so knee crease aligns with seat edge. Shin pad resting just above shoelaces.',
    shortDesc: 'Directly shapes and strengthens the four quadricep muscles around the kneecap.',
    steps: [
      'Sit back against cushion with shin pad resting on front of lower shins.',
      'Grip side handles and extend legs smoothly upward until legs are almost straight.',
      'Squeeze front thighs at top for 1 full second.',
      'Lower slowly over 3 seconds to starting position without letting weights crash.'
    ],
    safetyTips: [
      'Avoid swinging or jerking heavy weights rapidly to prevent patellar tendon irritation.'
    ],
    commonMistakes: 'Using explosive momentum, not pausing at peak contraction.'
  },

  // 4. SHOULDERS / OVERHEAD
  {
    id: 'standing-dumbbell-overhead-press',
    name: 'Standing / Seated Dumbbell Shoulder Press',
    symbol: '🥥',
    category: 'Shoulders',
    muscleGroup: 'Deltoids, Upper Traps & Triceps',
    equipmentType: 'Free Weights (Dumbbells + Upright Bench)',
    difficulty: 'Beginner Friendly (Level 2)',
    startingWeight: 'Women: 2–5 kg each | Men: 4–10 kg each',
    seatSetup: 'Can be done standing with feet shoulder-width, or seated on high-back upright bench.',
    shortDesc: 'Builds strong, healthy, and rounded 3D shoulders with natural wrist mobility.',
    steps: [
      'Hold dumbbells at shoulder height with palms facing slightly inward (45° angle).',
      'Brace core and glutes tightly to protect lower back.',
      'Press dumbbells smoothly overhead in a gentle arc until arms are extended overhead.',
      'Lower dumbbells with control back to ear level and repeat.'
    ],
    safetyTips: [
      'Do not arch your lower back backwards to push heavy weights — lower the weight if this happens.'
    ],
    commonMistakes: 'Over-arching lower spine, pressing weights too far in front.'
  },
  {
    id: 'dumbbell-lateral-raise',
    name: 'Dumbbell Side Lateral Raise',
    symbol: '🦅',
    category: 'Shoulders',
    muscleGroup: 'Lateral Deltoids (Side Shoulders)',
    equipmentType: 'Light Dumbbells (2–5 kg)',
    difficulty: 'Beginner Friendly (Level 1)',
    startingWeight: 'Women: 1.5–3 kg each | Men: 3–6 kg each',
    seatSetup: 'Stand tall with feet hip-width, slight forward torso lean (5°), soft elbows.',
    shortDesc: 'The ultimate isolation exercise for creating wider shoulders and a narrower-looking waist.',
    steps: [
      'Hold light dumbbells at sides with slight bend in elbows.',
      'Raise arms out to sides like wings until dumbbells reach shoulder height.',
      'Lead with your elbows and keep pinkies slightly higher than thumbs (pouring water motion).',
      'Pause for a split second at top, then lower with a strict 2-second tempo.'
    ],
    safetyTips: [
      'Always use light weights — swinging heavy dumbbells bypasses the side delts completely.'
    ],
    commonMistakes: 'Shrugging traps to lift weights, swinging torso back and forth.'
  },

  // 5. ARMS (BICEPS & TRICEPS)
  {
    id: 'dumbbell-bicep-curl',
    name: 'Dumbbell Bicep Curls (Alternating / Simultaneous)',
    symbol: '💪',
    category: 'Arms (Biceps/Triceps)',
    muscleGroup: 'Biceps Brachii & Forearms',
    equipmentType: 'Free Weights (Dumbbells)',
    difficulty: 'Very Easy (Level 1)',
    startingWeight: 'Women: 2–5 kg each | Men: 5–10 kg each',
    seatSetup: 'Stand tall with chest proud and elbows pinned tight against your ribcage.',
    shortDesc: 'The classic arm exercise for building peak bicep definition and grip endurance.',
    steps: [
      'Stand holding dumbbells with arms fully extended and palms facing forward or neutral.',
      'Keep upper arms completely stationary glued to your sides.',
      'Curl dumbbells up toward shoulders, squeezing biceps hard at top.',
      'Slowly lower weights down for 2 full seconds until arms are straight.'
    ],
    safetyTips: [
      'Do not swing your hips or rock back to throw the dumbbells up.'
    ],
    commonMistakes: 'Elbows drifting forward during curl, swinging torso.'
  },
  {
    id: 'cable-tricep-pushdown',
    name: 'Cable Tricep Pushdown (Rope or Straight Bar)',
    symbol: '⚡',
    category: 'Arms (Biceps/Triceps)',
    muscleGroup: 'Triceps (All 3 Heads)',
    equipmentType: 'High Cable Station with Rope',
    difficulty: 'Very Easy (Level 1)',
    startingWeight: 'Women: 10–18 kg | Men: 15–30 kg',
    seatSetup: 'Attach rope accessory to top cable pulley. Stand with slight forward hip hinge.',
    shortDesc: 'Isolates the back of upper arms (triceps) to improve pressing power and firm arm tone.',
    steps: [
      'Grip rope handles, pin elbows firmly into your sides, and step back slightly.',
      'Push rope handles straight down toward floor by extending your elbows.',
      'At bottom, flare the two rope ends apart outward for maximum tricep contraction.',
      'Allow hands to rise back to 90° elbow bend under full control.'
    ],
    safetyTips: [
      'Keep elbows locked in one place at your sides — do not let them flare out or swing back and forth.'
    ],
    commonMistakes: 'Letting elbows move up and down, using shoulder momentum.'
  },

  // 6. CORE / ABS
  {
    id: 'forearm-plank',
    name: 'Forearm Core Plank Hold',
    symbol: '🧘',
    category: 'Core / Abs',
    muscleGroup: 'Transverse Abdominis, Glutes & Lower Back',
    equipmentType: 'Exercise Mat / Floor',
    difficulty: 'Beginner Friendly (Level 1)',
    startingWeight: 'Bodyweight (20–45s hold)',
    seatSetup: 'Rest on forearms and toes on an exercise mat.',
    shortDesc: 'Builds deep isometric core stability that protects your spine during all heavy lifts.',
    steps: [
      'Place forearms on floor with elbows directly under shoulders.',
      'Extend legs straight back, resting on balls of feet.',
      'Squeeze glutes tight, pull belly button inward toward spine, and keep body in rigid straight line.',
      'Breathe steadily through nose without letting hips sag down or pike into the air.'
    ],
    safetyTips: [
      'If lower back starts to ache or arch, drop knees to floor and rest.'
    ],
    commonMistakes: 'Sagging lower back, holding breath, hips elevated too high.'
  },
  {
    id: 'dead-bug-core',
    name: 'Dead Bug Anti-Extension Core Drill',
    symbol: '🐜',
    category: 'Core / Abs',
    muscleGroup: 'Deep Abs, Pelvic Floor & Hip Flexors',
    equipmentType: 'Exercise Mat',
    difficulty: 'Zero Spine Strain (Level 1)',
    startingWeight: 'Bodyweight (8–12 reps/side)',
    seatSetup: 'Lie flat on back on an exercise mat.',
    shortDesc: 'Teaches core bracing without putting any compression on lower back or neck.',
    steps: [
      'Lie on back with arms straight up to ceiling and knees bent at 90 degrees (tabletop position).',
      'Press your lower back firmly flat against floor with zero gap under your spine.',
      'Slowly extend right arm overhead and left leg straight toward floor simultaneously.',
      'Return to center and switch to left arm and right leg smoothly.'
    ],
    safetyTips: [
      'Never allow lower spine to peel off the floor — keep it pressed flat.'
    ],
    commonMistakes: 'Arching back off floor, moving too fast.'
  },

  // 7. CARDIO & CONDITIONING
  {
    id: 'smart-treadmill',
    name: 'Smart Incline Treadmill',
    symbol: '🏃‍♂️',
    category: 'Cardio / Conditioning',
    muscleGroup: 'Cardiovascular, Calves & Quads',
    equipmentType: 'Cardio Machine',
    difficulty: 'Zero Learning Curve (Level 1)',
    startingWeight: 'Speed: 4.5–5.5 km/h | Incline: 1.5–3.0%',
    seatSetup: 'Attach red safety emergency stop clip to your shirt before pressing Quick Start.',
    shortDesc: 'Low-impact uphill walking that burns calories and warms up joints with zero impact shock.',
    steps: [
      'Step onto side foot rails first (not the moving belt).',
      'Clip red safety key to waistband or shirt.',
      'Press Quick Start, wait for belt to move at 1.0 km/h, then step onto center.',
      'Increase speed to 4.5–5.0 km/h and incline to 2.0% for a brisk natural stride.'
    ],
    safetyTips: [
      'Always clip emergency key — stops motor automatically if you lose balance.'
    ],
    commonMistakes: 'Hanging entire body weight onto handrails, staring down at phone.'
  },
  {
    id: 'stationary-bike',
    name: 'Upright / Recumbent Stationary Bike',
    symbol: '🚴',
    category: 'Cardio / Conditioning',
    muscleGroup: 'Heart Health, Quads & Calves',
    equipmentType: 'Cardio Machine',
    difficulty: 'Zero Joint Impact (Level 1)',
    startingWeight: 'Resistance Level: 3–6 (65–80 RPM)',
    seatSetup: 'Adjust seat height so foot has slight 10–15° knee bend at lowest pedal stroke.',
    shortDesc: 'Gentle low-impact cardio that lubricates knees and hips without pounding joints.',
    steps: [
      'Adjust seat height level with hip bone before sitting.',
      'Slip feet into pedal straps and tighten gently.',
      'Press Quick Start, set resistance to level 3–5, and pedal at steady 70 RPM cadence.'
    ],
    safetyTips: [
      'If seat is too low, knees will hurt; if too high, hips will rock side to side.'
    ],
    commonMistakes: 'Hunching shoulders over handlebars, seat set too low.'
  },
  {
    id: 'smith-machine',
    name: 'Smith Machine Guided Barbell',
    symbol: '🛡️',
    category: 'Free Weights / Guided',
    muscleGroup: 'Full Body (Squats, Bench, Overhead)',
    equipmentType: 'Fixed Vertical Rail Barbell',
    difficulty: 'Guided Safety (Level 2)',
    startingWeight: 'Bar alone (~7–10 kg counterbalanced)',
    seatSetup: 'ALWAYS set bottom mechanical safety stop pins before loading weight plates onto the bar.',
    shortDesc: 'A barbell locked on steel guide rails with twist-to-lock safety hooks for safe solo training.',
    steps: [
      'Set bottom safety stopper brackets at desired lowest depth.',
      'Center yourself under bar with balanced stance.',
      'Rotate wrists to unhook bar from safety catch notches and perform movement.',
      'Rotate wrists forward/backward at any point to lock bar immediately onto rack.'
    ],
    safetyTips: [
      'Never skip setting the lower safety stopper pins.'
    ],
    commonMistakes: 'Standing directly under bar on squats without accounting for vertical rail line.'
  }
];
