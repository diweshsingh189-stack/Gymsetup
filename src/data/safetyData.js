export const SAFETY_DOS_AND_DONTS = {
  dos: [
    {
      title: 'Always Warm Up for 5–7 Minutes',
      desc: 'Warm muscles and lubricated synovial joints prevent sudden strains and tears. Never lift cold.'
    },
    {
      title: 'Wipe Down Equipment After Using',
      desc: 'Use disinfectant spray and paper towel to clean sweat off handles, seats, and benches.'
    },
    {
      title: 'Always Re-Rack Weights & Dumbbells',
      desc: 'Return dumbbells to their exact weight rack position and unload barbell plates after use.'
    },
    {
      title: 'Use Safety Collars / Clips on Barbells',
      desc: 'Always slide spring or lock collars onto the ends of barbells to prevent weight plates from slipping.'
    },
    {
      title: 'Focus on Slow, Controlled Eccentrics',
      desc: 'Take 2 to 3 seconds to lower the weight. You build more strength on the descent and prevent injuries.'
    },
    {
      title: 'Breathe Naturally (Exhale on Effort)',
      desc: 'Breathe out when you push/pull the weight; breathe in on the way back. Never hold your breath until purple.'
    }
  ],
  donts: [
    {
      title: 'Do NOT "Ego Lift" (Lifting Too Heavy)',
      desc: 'Picking weights heavier than you can handle with pristine form is the #1 cause of beginner injuries.'
    },
    {
      title: 'Do NOT Lock Knees or Elbows Straight',
      desc: 'Locking joints puts all pressure on cartilage, ligaments, and tendons rather than muscles.'
    },
    {
      title: 'Do NOT Rest on Machines While Staring at Phone',
      desc: 'If someone is waiting, let them "work in" during your rest period or step aside.'
    },
    {
      title: 'Do NOT Pull Bars Behind Your Neck',
      desc: 'Pulling lat bars or pressing barbells behind the neck puts the rotator cuff in an unnatural pinch.'
    },
    {
      title: 'Do NOT Drop Dumbbells from Waist Height',
      desc: 'Lower them safely onto your thighs first, then place them on the floor.'
    },
    {
      title: 'Do NOT Skip Water During Workouts',
      desc: 'A 2% drop in hydration reduces strength, endurance, and causes muscle cramping.'
    }
  ]
};

export const WHEN_TO_STOP_SIGNS = [
  {
    type: 'warning',
    title: 'Sharp, Stabbing or Joint Pain',
    desc: 'Good muscle burn is a dull, warm sensation in the muscle belly. Sharp, shooting, or joint pain means STOP immediately.'
  },
  {
    type: 'danger',
    title: 'Lightheadedness or Tunnel Vision',
    desc: 'Caused by holding your breath (Valsalva), low blood sugar, or dehydration. Sit down immediately and sip water.'
  },
  {
    type: 'warning',
    title: 'Popping / Clicking with Pain',
    desc: 'Painless popping is usually benign, but popping accompanied by pain indicates tendon or cartilage impingement.'
  },
  {
    type: 'danger',
    title: 'Extreme Nausea / Dizziness',
    desc: 'Your nervous system is overwhelmed. End the workout, cool down with slow walking, and elevate feet if needed.'
  }
];

export const FORM_TRAPS = [
  {
    id: 'squat-knee-cave',
    exercise: 'Squats & Leg Press',
    trapName: 'Knee Valgus (Knees Caving Inward)',
    danger: 'Places extreme torque on the ACL and meniscus inside the knee joint.',
    wrongWay: 'Knees collapse inward toward each other when pushing up from the bottom.',
    rightWay: 'Actively push knees outward in line with your 2nd and 3rd toes throughout the entire movement.',
    cue: 'Imagine spreading the floor apart with your feet.'
  },
  {
    id: 'deadlift-rounded-spine',
    exercise: 'Deadlifts & Romanian Deadlifts',
    trapName: 'Spinal Flexion (Cat-Back Rounding)',
    danger: 'Shifts heavy load from glutes/hamstrings directly onto lumbar spinal discs.',
    wrongWay: 'Rounding the lower back like a scared cat when reaching down for the weights.',
    rightWay: 'Hinge at the hips, keep chest proud, shoulders locked down, and maintain a neutral flat spine.',
    cue: 'Push your butt back into the wall behind you while keeping collarbones high.'
  },
  {
    id: 'bench-press-flared-elbows',
    exercise: 'Chest Press & Bench Press',
    trapName: '90-Degree Elbow Flare',
    danger: 'Causes rotator cuff impingement and shoulder joint friction.',
    wrongWay: 'Elbows flared out straight in a "T-shape" in line with your ears.',
    rightWay: 'Tuck elbows at roughly a 45-degree angle (forming an arrow shape "↑" with your torso).',
    cue: 'Tuck your elbows and think about bending the bar inwards.'
  },
  {
    id: 'lat-behind-neck',
    exercise: 'Lat Pulldown',
    trapName: 'Pulling Bar Behind Head',
    danger: 'Extreme external rotation forces cervical spine flexion and shoulder strain.',
    wrongWay: 'Craning neck forward to slam the pulldown bar into the back of your neck.',
    rightWay: 'Lean back 10–15 degrees and pull the bar smoothly to your collarbone / upper chest.',
    cue: 'Drive your elbows down into your back pockets.'
  },
  {
    id: 'bicep-swing',
    exercise: 'Dumbbell & Barbell Curls',
    trapName: 'Torso Momentum Rocking',
    danger: 'Lower back strain with zero tension delivered to the actual bicep muscles.',
    wrongWay: 'Swinging upper body backward and forward like a pendulum to heave the dumbbells up.',
    rightWay: 'Pin elbows to the sides of your ribcage; keep torso stationary and isolate the arm bend.',
    cue: 'Stand against a wall or keep elbows glued to your sides.'
  },
  {
    id: 'valsalva-breath-hold',
    exercise: 'All Resistance Exercises',
    trapName: 'Holding Breath Until Face Turns Purple',
    danger: 'Dangerous spike in blood pressure followed by sudden dizzy spells upon release.',
    wrongWay: 'Holding breath through entire 10-rep sets.',
    rightWay: 'Exhale forcefully through your mouth during the hardest part (concentric); inhale smoothly on the return.',
    cue: 'Blow out when you push or pull!'
  }
];
