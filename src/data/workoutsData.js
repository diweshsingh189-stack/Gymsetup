export const WORKOUT_ROUTINES = [
  {
    id: 'full-body-starter',
    title: '3-Day Beginner Full Body',
    tag: 'Most Recommended',
    badgeColor: 'emerald',
    symbol: '⚡',
    iconName: 'Zap',
    frequency: '3 Days / Week (e.g. Mon / Wed / Fri)',
    duration: '40–50 mins',
    level: 'Complete Beginner',
    description: 'The golden standard routine for beginners. Hits all major muscle groups 3 times a week with ample recovery days.',
    target: 'Build foundational strength, learn movement patterns & kickstart metabolism.',
    exercises: [
      {
        name: 'Goblet Squat (or Leg Press)',
        symbol: '🦵',
        muscle: 'Quads & Glutes',
        sets: 3,
        reps: '10–12 reps',
        rest: '90 sec',
        startingWeight: 'Dumbbell: 4–8 kg / Machine: 30 kg',
        tip: 'Keep chest upright, sit between your hips, and push through your midfoot.'
      },
      {
        name: 'Seated Chest Press Machine',
        symbol: '🏋️‍♂️',
        muscle: 'Chest & Triceps',
        sets: 3,
        reps: '10–12 reps',
        rest: '75 sec',
        startingWeight: '15–30 kg',
        tip: 'Elbows slightly lower than shoulders. Smooth push, slow 2-second return.'
      },
      {
        name: 'Lat Pulldown (Overhand)',
        symbol: '🚣‍♂️',
        muscle: 'Upper Back & Lats',
        sets: 3,
        reps: '10–12 reps',
        rest: '75 sec',
        startingWeight: '20–35 kg',
        tip: 'Pull bar down to upper chest while keeping your chest raised toward the ceiling.'
      },
      {
        name: 'Dumbbell Romanian Deadlift (RDL)',
        symbol: '🍑',
        muscle: 'Hamstrings & Glutes',
        sets: 3,
        reps: '10 reps',
        rest: '90 sec',
        startingWeight: 'Dumbbells: 4–6 kg each',
        tip: 'Push your hips back as if closing a car door with your glutes. Soft knees.'
      },
      {
        name: 'Seated Cable Row (or Dumbbell Row)',
        symbol: '🚣',
        muscle: 'Mid Back',
        sets: 3,
        reps: '12 reps',
        rest: '60 sec',
        startingWeight: '15–25 kg',
        tip: 'Squeeze your shoulder blades together like you are holding a pencil between them.'
      },
      {
        name: 'Forearm Plank (or Dead Bug)',
        symbol: '🧘',
        muscle: 'Core / Abs',
        sets: 3,
        reps: '20–30 sec hold',
        rest: '60 sec',
        startingWeight: 'Bodyweight',
        tip: 'Keep your body in a straight line from head to heels. Squeeze glutes & brace abs.'
      }
    ]
  },
  {
    id: 'intro-20min',
    title: 'Zero Intimidation: 20-Min Intro',
    tag: 'Quick & Easy',
    badgeColor: 'cyan',
    symbol: '🌱',
    iconName: 'Sparkles',
    frequency: '2–3 Days / Week',
    duration: '20–25 mins',
    level: 'First Day at Gym',
    description: 'Designed specifically to eliminate gym anxiety. Gentle, machine-only movements to get comfortable inside the gym.',
    target: 'Boost confidence, break a light sweat, and build an effortless habit.',
    exercises: [
      {
        name: 'Incline Treadmill Walk',
        symbol: '🏃‍♂️',
        muscle: 'Cardio & Legs',
        sets: 1,
        reps: '5 mins',
        rest: 'None',
        startingWeight: 'Speed 4.5 km/h | Incline 2%',
        tip: 'Brisk natural walk to warm up joints and get comfortable in the space.'
      },
      {
        name: 'Seated Chest Press Machine',
        symbol: '🏋️',
        muscle: 'Chest',
        sets: 2,
        reps: '10 reps',
        rest: '60 sec',
        startingWeight: 'Light pin (10–15 kg)',
        tip: 'Focus on feeling your chest muscles work rather than pushing heavy weight.'
      },
      {
        name: 'Lat Pulldown Machine',
        symbol: '🚣‍♂️',
        muscle: 'Back',
        sets: 2,
        reps: '10 reps',
        rest: '60 sec',
        startingWeight: 'Light pin (15–20 kg)',
        tip: 'Smooth controlled movement with no torso swinging.'
      },
      {
        name: 'Seated Leg Press Machine',
        symbol: '🦵',
        muscle: 'Legs',
        sets: 2,
        reps: '10 reps',
        rest: '60 sec',
        startingWeight: 'Light pin (25–35 kg)',
        tip: 'Never lock your knees out straight at the top.'
      },
      {
        name: 'Stationary Bike Cool-down',
        symbol: '🚴',
        muscle: 'Cardio / Recovery',
        sets: 1,
        reps: '5 mins',
        rest: 'None',
        startingWeight: 'Resistance Level 3',
        tip: 'Slow leisurely cadence to bring heart rate back down.'
      }
    ]
  },
  {
    id: 'dumbbell-starter',
    title: 'Dumbbell-Only Beginner Circuit',
    tag: 'Free Weights',
    badgeColor: 'amber',
    symbol: '🛡️',
    iconName: 'Dumbbell',
    frequency: '3 Days / Week',
    duration: '35–40 mins',
    level: 'Beginner',
    description: 'No waiting for machines! Grab a pair of light dumbbells and a flat bench to complete this full workout in one spot.',
    target: 'Develop unilateral balance, grip strength, and core stability.',
    exercises: [
      {
        name: 'Dumbbell Goblet Squat',
        symbol: '🏋️‍♀️',
        muscle: 'Quads & Core',
        sets: 3,
        reps: '10 reps',
        rest: '75 sec',
        startingWeight: '5–10 kg dumbbell',
        tip: 'Hold dumbbell vertically against your upper chest.'
      },
      {
        name: 'Flat Dumbbell Bench Press (or Floor Press)',
        symbol: '🏋️‍♂️',
        muscle: 'Chest & Shoulders',
        sets: 3,
        reps: '10 reps',
        rest: '75 sec',
        startingWeight: '4–8 kg each hand',
        tip: 'Lower dumbbells until elbows are at about 90 degrees, then press up.'
      },
      {
        name: 'One-Arm Dumbbell Row',
        symbol: '🚣',
        muscle: 'Upper Back & Lats',
        sets: 3,
        reps: '10 reps/arm',
        rest: '60 sec',
        startingWeight: '4–8 kg',
        tip: 'One hand and knee supported on bench. Pull dumbbell up towards your hip pocket.'
      },
      {
        name: 'Standing Dumbbell Overhead Press',
        symbol: '🥥',
        muscle: 'Shoulders & Triceps',
        sets: 3,
        reps: '8–10 reps',
        rest: '75 sec',
        startingWeight: '3–6 kg each hand',
        tip: 'Stand tall, squeeze glutes to protect lower spine, press weights overhead.'
      },
      {
        name: 'Dumbbell Bicep Curl to Hammer Curl',
        symbol: '💪',
        muscle: 'Arms',
        sets: 3,
        reps: '12 reps',
        rest: '60 sec',
        startingWeight: '3–6 kg each hand',
        tip: 'Keep elbows pinned to your ribcage; do not swing your body.'
      }
    ]
  },
  {
    id: 'push-pull-legs-intro',
    title: 'Push / Pull / Legs Intro (Weeks 4+)',
    tag: 'Next Milestone',
    badgeColor: 'violet',
    symbol: '🔥',
    iconName: 'Flame',
    frequency: '3–4 Days / Week',
    duration: '45 mins',
    level: 'Advanced Beginner',
    description: 'When you are ready to graduate from Full Body routines, split workouts into Push (Chest/Shoulders/Triceps), Pull (Back/Biceps), and Legs.',
    target: 'Target muscle specialization and increased training volume.',
    exercises: [
      {
        name: 'Push Day: Dumbbell Chest Press + Overhead Press + Tricep Pushdowns',
        symbol: '🏋️‍♂️',
        muscle: 'Pushing Muscles',
        sets: 9,
        reps: '10–12 reps per movement',
        rest: '75 sec',
        startingWeight: 'Moderate',
        tip: 'Focus on chest squeeze and controlled tricep extension.'
      },
      {
        name: 'Pull Day: Lat Pulldowns + Seated Cable Rows + Face Pulls + Bicep Curls',
        symbol: '🚣‍♂️',
        muscle: 'Pulling Muscles',
        sets: 10,
        reps: '10–12 reps per movement',
        rest: '75 sec',
        startingWeight: 'Moderate',
        tip: 'Lead every pull with your elbows, retracting shoulder blades.'
      },
      {
        name: 'Legs Day: Goblet Squats + Leg Press + Leg Curls + Standing Calf Raises',
        symbol: '🦵',
        muscle: 'Lower Body',
        sets: 10,
        reps: '10–15 reps per movement',
        rest: '90 sec',
        startingWeight: 'Moderate',
        tip: 'Control the lowering phase on every leg exercise to maximize growth and protect knees.'
      }
    ]
  }
];
