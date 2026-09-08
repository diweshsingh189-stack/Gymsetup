import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ErrorBoundary } from './components/ErrorBoundary';
import { TimerModal } from './components/TimerModal';
import { Toast } from './components/Toast';
import { ExerciseSearchModal } from './components/ExerciseSearchModal';

// Sections
import { HomeSection } from './sections/HomeSection';
import { GuidedFlowSection } from './sections/GuidedFlowSection';
import { FirstDaySection } from './sections/FirstDaySection';
import { RoadmapSection } from './sections/RoadmapSection';
import { SafetySection } from './sections/SafetySection';
import { EquipmentSection } from './sections/EquipmentSection';
import { WarmupSection } from './sections/WarmupSection';
import { WorkoutSection } from './sections/WorkoutSection';
import { NutritionSection } from './sections/NutritionSection';
import { RecoverySection } from './sections/RecoverySection';
import { TrackerSection } from './sections/TrackerSection';
import { ChecklistSection } from './sections/ChecklistSection';
import { GymPricingSection } from './sections/GymPricingSection';
import { FeedbackSection } from './sections/FeedbackSection';

// Icons for Mobile Bottom Nav
import { Home, Sparkles, Dumbbell, ClipboardList, Cpu } from 'lucide-react';

const MainView = () => {
  const {
    currentTab,
    navigateTo,
    isSearchModalOpen,
    closeSearchModal,
    searchModalInitialQuery
  } = useApp();

  const renderSection = () => {
    switch (currentTab) {
      case 'home':
        return <HomeSection />;
      case 'guided-flow':
        return <GuidedFlowSection />;
      case 'first-day':
        return <FirstDaySection />;
      case 'roadmap':
        return <RoadmapSection />;
      case 'safety':
        return <SafetySection />;
      case 'equipment':
        return <EquipmentSection />;
      case 'warmup':
        return <WarmupSection />;
      case 'workout':
        return <WorkoutSection />;
      case 'nutrition':
        return <NutritionSection />;
      case 'recovery':
        return <RecoverySection />;
      case 'tracker':
        return <TrackerSection />;
      case 'checklist':
        return <ChecklistSection />;
      case 'gym-pricing':
        return <GymPricingSection />;
      case 'feedback':
        return <FeedbackSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-wrapper">
        <Navbar />

        <main className="main-content">
          {renderSection()}
        </main>
      </div>

      {/* Mobile Bottom Quick Navigation */}
      <nav className="mobile-bottom-nav">
        {[
          { id: 'home', label: 'Home', icon: Home },
          { id: 'guided-flow', label: 'Start Here', icon: Sparkles },
          { id: 'workout', label: 'Workouts', icon: Dumbbell },
          { id: 'equipment', label: 'Machines', icon: Cpu },
          { id: 'tracker', label: 'Tracker', icon: ClipboardList }
        ].map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
            >
              <Icon size={19} color={isActive ? '#06B6D4' : 'var(--text-subtle)'} />
              <span style={{ fontSize: '0.68rem', fontWeight: isActive ? 700 : 500, color: isActive ? '#06B6D4' : 'var(--text-muted)' }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Global Overlays */}
      <TimerModal />
      <Toast />
      <ExerciseSearchModal
        isOpen={isSearchModalOpen}
        onClose={closeSearchModal}
        initialQuery={searchModalInitialQuery}
      />

      <style>{`
        .mobile-bottom-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: calc(58px + env(safe-area-inset-bottom, 0px));
          padding-bottom: env(safe-area-inset-bottom, 0px);
          background: var(--bg-sidebar);
          border-top: 1px solid var(--border-subtle);
          z-index: 40;
          align-items: center;
          justify-content: space-around;
          padding-left: 0.25rem;
          padding-right: 0.25rem;
          box-shadow: var(--shadow-md);
        }

        .mobile-nav-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px 6px;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          flex: 1;
          min-width: 0;
          touch-action: manipulation;
        }

        .mobile-nav-btn.active {
          background: rgba(6, 182, 212, 0.1);
        }

        @media (max-width: 1024px) {
          .mobile-bottom-nav {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <MainView />
      </AppProvider>
    </ErrorBoundary>
  );
}
