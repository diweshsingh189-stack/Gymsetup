export const CHECKLIST_PHASES = [
  {
    id: 'before-gym',
    name: 'Before Gym (Preparation)',
    badgeColor: 'cyan',
    iconName: 'Package',
    items: [
      { id: 'bg-1', label: 'Pack clean gym shoes / sneakers (no muddy outdoor shoes)', essential: true },
      { id: 'bg-2', label: 'Fill 750ml – 1L water bottle', essential: true },
      { id: 'bg-3', label: 'Pack a small personal sweat towel', essential: true },
      { id: 'bg-4', label: 'Pack combination lock / pad lock for gym locker', essential: true },
      { id: 'bg-5', label: 'Charge wireless headphones & queue upbeat music playlist', essential: false },
      { id: 'bg-6', label: 'Eat light snack (banana / dates) 30–60 mins prior', essential: true },
      { id: 'bg-7', label: 'Wear breathable gym shorts / leggings & t-shirt', essential: true }
    ]
  },
  {
    id: 'during-gym',
    name: 'During Gym (Session & Etiquette)',
    badgeColor: 'emerald',
    iconName: 'Activity',
    items: [
      { id: 'dg-1', label: '5-minute dynamic warm-up or treadmill incline walk', essential: true },
      { id: 'dg-2', label: 'Check machine pin & seat height before loading heavy weights', essential: true },
      { id: 'dg-3', label: 'Sip water between sets (about 100–150ml every 15 minutes)', essential: true },
      { id: 'dg-4', label: 'Take 60–90 seconds rest between working sets', essential: true },
      { id: 'dg-5', label: 'Always wipe down seat/handles after completing your sets', essential: true },
      { id: 'dg-6', label: 'Return all dumbbells and weight plates to the rack', essential: true },
      { id: 'dg-7', label: 'Log sets and weights in the GymSetup Tracker', essential: false }
    ]
  },
  {
    id: 'after-gym',
    name: 'After Gym (Recovery & Habit)',
    badgeColor: 'violet',
    iconName: 'CheckCircle2',
    items: [
      { id: 'ag-1', label: '5-minute static cooldown stretches (hamstrings, quads, chest)', essential: true },
      { id: 'ag-2', label: 'Rehydrate with 500ml of water or electrolyte drink', essential: true },
      { id: 'ag-3', label: 'Consume high-protein meal or shake within 1–2 hours', essential: true },
      { id: 'ag-4', label: 'Put gym clothes straight into laundry / hang out bag', essential: true },
      { id: 'ag-5', label: 'Mark workout session complete on GymSetup Dashboard', essential: true },
      { id: 'ag-6', label: 'Aim for 7.5 to 8.5 hours of restful sleep tonight', essential: true }
    ]
  }
];
