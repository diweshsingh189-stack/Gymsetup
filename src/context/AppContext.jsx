import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playSuccessChime, playCelebrationSound, playClickBeep } from '../utils/soundEffects';

const AppContext = createContext();

const STORAGE_KEYS = {
  THEME: 'gymsetup_theme',
  CHECKLIST: 'gymsetup_checklist',
  WORKOUT_LOGS: 'gymsetup_workout_logs_v2',
  ROADMAP_MILESTONES: 'gymsetup_roadmap_milestones',
  WIZARD_COMPLETED: 'gymsetup_wizard_completed'
};

const DEFAULT_LOGS = [
  {
    id: 'sample-1',
    symbol: '🏋️‍♂️',
    exercise: 'Seated Chest Press Machine',
    category: 'Chest (Push)',
    weight: '20',
    unit: 'kg',
    sets: 3,
    reps: 10,
    rpe: 'Easy (RPE 6)',
    notes: 'Felt very smooth, adjusted seat to notch #4.',
    date: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0]
  },
  {
    id: 'sample-2',
    symbol: '🚣‍♂️',
    exercise: 'Lat Pulldown (Overhand)',
    category: 'Back (Pull)',
    weight: '25',
    unit: 'kg',
    sets: 3,
    reps: 10,
    rpe: 'Moderate (RPE 7)',
    notes: 'Good stretch at top. Pulled cleanly to upper chest.',
    date: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0]
  },
  {
    id: 'sample-3',
    symbol: '🦵',
    exercise: 'Seated Leg Press',
    category: 'Legs (Quads/Glutes)',
    weight: '40',
    unit: 'kg',
    sets: 3,
    reps: 12,
    rpe: 'Moderate (RPE 7)',
    notes: 'Kept knees aligned with toes, no joint locking.',
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0]
  },
  {
    id: 'sample-4',
    symbol: '🏋️‍♀️',
    exercise: 'Dumbbell Goblet Squats',
    category: 'Legs (Quads/Glutes)',
    weight: '8',
    unit: 'kg',
    sets: 3,
    reps: 10,
    rpe: 'Moderate (RPE 7)',
    notes: 'Upright torso posture, good hip depth.',
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0]
  },
  {
    id: 'sample-5',
    symbol: '🥥',
    exercise: 'Dumbbell Overhead Shoulder Press',
    category: 'Shoulders',
    weight: '6',
    unit: 'kg',
    sets: 3,
    reps: 10,
    rpe: 'Hard (RPE 8)',
    notes: 'Maintained tight core and straight pressing path.',
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0]
  },
  {
    id: 'sample-6',
    symbol: '🚣',
    exercise: 'Seated Cable Row (Neutral Grip)',
    category: 'Back (Pull)',
    weight: '20',
    unit: 'kg',
    sets: 3,
    reps: 12,
    rpe: 'Moderate (RPE 7)',
    notes: 'Paused for 1-second scapular squeeze on each rep.',
    date: new Date(Date.now() - 86400000 * 1).toISOString().split('T')[0]
  },
  {
    id: 'sample-7',
    symbol: '💪',
    exercise: 'Dumbbell Bicep Curls',
    category: 'Arms (Biceps/Triceps)',
    weight: '6',
    unit: 'kg',
    sets: 3,
    reps: 12,
    rpe: 'Moderate (RPE 7)',
    notes: 'No momentum swinging; controlled lowering.',
    date: new Date(Date.now() - 86400000 * 1).toISOString().split('T')[0]
  },
  {
    id: 'sample-8',
    symbol: '⚡',
    exercise: 'Cable Tricep Pushdown (Rope)',
    category: 'Arms (Biceps/Triceps)',
    weight: '15',
    unit: 'kg',
    sets: 3,
    reps: 12,
    rpe: 'Moderate (RPE 7)',
    notes: 'Flared rope outwards at bottom for peak contraction.',
    date: new Date(Date.now() - 86400000 * 1).toISOString().split('T')[0]
  },
  {
    id: 'sample-9',
    symbol: '🦵',
    exercise: 'Seated Hamstring Leg Curl',
    category: 'Legs (Quads/Glutes)',
    weight: '25',
    unit: 'kg',
    sets: 3,
    reps: 10,
    rpe: 'Easy (RPE 6)',
    notes: 'Smooth contraction, thigh pad held down securely.',
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: 'sample-10',
    symbol: '🧘',
    exercise: 'Forearm Plank Hold',
    category: 'Core / Abs',
    weight: '0',
    unit: 'kg',
    sets: 3,
    reps: 30,
    rpe: 'Hard (RPE 8)',
    notes: 'Held for 30 seconds per set with braced core.',
    date: new Date().toISOString().split('T')[0]
  }
];

export const AppProvider = ({ children }) => {
  // Navigation State
  const [currentTab, setCurrentTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search State for global search trigger
  const [equipmentSearchQuery, setEquipmentSearchQuery] = useState('');
  const [equipmentCategoryFilter, setEquipmentCategoryFilter] = useState('all');

  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  });

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 3500);
  };

  // Interactive Checklist State
  const [checklist, setChecklist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CHECKLIST);
      return saved ? JSON.parse(saved) : { 'bg-1': true, 'bg-2': true, 'dg-1': true };
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CHECKLIST, JSON.stringify(checklist));
  }, [checklist]);

  const toggleChecklistItem = (id) => {
    setChecklist(prev => {
      const nextVal = !prev[id];
      if (nextVal) {
        playSuccessChime();
      } else {
        playClickBeep();
      }
      return { ...prev, [id]: nextVal };
    });
  };

  const resetChecklist = () => {
    setChecklist({});
    playClickBeep();
    showToast('Checklist reset for your next workout session', 'info');
  };

  // Workout Tracker Logs
  const [workoutLogs, setWorkoutLogs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WORKOUT_LOGS);
      return saved ? JSON.parse(saved) : DEFAULT_LOGS;
    } catch {
      return DEFAULT_LOGS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WORKOUT_LOGS, JSON.stringify(workoutLogs));
  }, [workoutLogs]);

  const addWorkoutLog = (logData) => {
    const newLog = {
      id: 'log-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      symbol: logData.symbol || '🏋️',
      ...logData
    };
    setWorkoutLogs(prev => [newLog, ...prev]);
    playSuccessChime();
    showToast(`Logged: ${newLog.symbol || ''} ${newLog.exercise} (${newLog.sets} sets × ${newLog.reps} reps)`, 'success');
  };

  const deleteWorkoutLog = (id) => {
    setWorkoutLogs(prev => prev.filter(l => l.id !== id));
    playClickBeep();
    showToast('Workout entry deleted', 'info');
  };

  const clearAllWorkoutLogs = () => {
    setWorkoutLogs([]);
    playClickBeep();
    showToast('Workout history cleared', 'info');
  };

  // Roadmap Milestones Completion
  const [roadmapMilestones, setRoadmapMilestones] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ROADMAP_MILESTONES);
      return saved ? JSON.parse(saved) : { 'd1-1': true, 'd1-2': true };
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROADMAP_MILESTONES, JSON.stringify(roadmapMilestones));
  }, [roadmapMilestones]);

  const toggleRoadmapMilestone = (id) => {
    setRoadmapMilestones(prev => {
      const nextVal = !prev[id];
      if (nextVal) playSuccessChime();
      return { ...prev, [id]: nextVal };
    });
  };

  // Guided Wizard Completion
  const [wizardCompleted, setWizardCompleted] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.WIZARD_COMPLETED) === 'true';
  });

  const completeWizard = () => {
    setWizardCompleted(true);
    localStorage.setItem(STORAGE_KEYS.WIZARD_COMPLETED, 'true');
    playCelebrationSound();
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
    showToast('Congratulations! You earned the Gym Beginner Badge 🏆', 'success');
  };

  // Timer Modal Global State
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [timerInitialSeconds, setTimerInitialSeconds] = useState(60);
  const [timerTitle, setTimerTitle] = useState('Rest Interval Timer');

  const openTimer = (seconds = 60, title = 'Rest Interval Timer') => {
    setTimerInitialSeconds(seconds);
    setTimerTitle(title);
    setIsTimerOpen(true);
  };

  const closeTimer = () => {
    setIsTimerOpen(false);
  };

  // Exercise Search Modal Global State
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchModalInitialQuery, setSearchModalInitialQuery] = useState('');

  const openSearchModal = (initialQ = '') => {
    setSearchModalInitialQuery(initialQ);
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  // Keyboard shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Helper to jump to a specific section and scroll up
  const navigateTo = (tabName, extra = null) => {
    setCurrentTab(tabName);
    setMobileMenuOpen(false);
    if (extra && extra.search) {
      setEquipmentSearchQuery(extra.search);
    }
    if (extra && extra.category) {
      setEquipmentCategoryFilter(extra.category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        navigateTo,
        mobileMenuOpen,
        setMobileMenuOpen,
        theme,
        toggleTheme,
        toast,
        showToast,
        checklist,
        toggleChecklistItem,
        resetChecklist,
        workoutLogs,
        addWorkoutLog,
        deleteWorkoutLog,
        clearAllWorkoutLogs,
        roadmapMilestones,
        toggleRoadmapMilestone,
        wizardCompleted,
        completeWizard,
        isTimerOpen,
        openTimer,
        closeTimer,
        timerInitialSeconds,
        timerTitle,
        equipmentSearchQuery,
        setEquipmentSearchQuery,
        equipmentCategoryFilter,
        setEquipmentCategoryFilter,
        isSearchModalOpen,
        openSearchModal,
        closeSearchModal,
        searchModalInitialQuery
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
