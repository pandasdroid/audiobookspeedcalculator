import { useState, useEffect } from 'react';
import SpeedCalculator from './components/Hero/SpeedCalculator';
import ComparisonTable from './components/ComparisonTable/ComparisonTable';
import GoalPlanner from './components/GoalPlanner/GoalPlanner';
import SpeedQuiz from './components/SpeedQuiz/SpeedQuiz';
import ReadingQueue from './components/ReadingQueue/ReadingQueue';
import YearlyStats from './components/YearlyStats/YearlyStats';
import SpeedGuide from './components/SpeedGuide/SpeedGuide';
import GamificationHeader from './components/Gamification/GamificationHeader';
import AchievementToast from './components/Gamification/AchievementToast';
import { unlockAchievement } from './utils/gamification';
import './App.css';

function App() {
  const [currentAchievement, setCurrentAchievement] = useState(null);

  useEffect(() => {
    // Unlock "first visit" achievement
    unlockAchievement('first_calculation', (achievement) => {
      setCurrentAchievement(achievement);
      setTimeout(() => setCurrentAchievement(null), 5000);
    });
  }, []);

  // Global achievement unlock handler
  window.unlockAchievement = (id) => {
    unlockAchievement(id, (achievement) => {
      setCurrentAchievement(achievement);
      setTimeout(() => setCurrentAchievement(null), 5000);
    });
  };

  return (
    <div className="app">
      <GamificationHeader />
      <AchievementToast achievement={currentAchievement} />

      <div className="content-with-header">
        <SpeedCalculator />
        <ComparisonTable />
        <GoalPlanner />
        <SpeedQuiz />
        <ReadingQueue />
        <YearlyStats />
        <SpeedGuide />

        <footer className="app-footer">
          <div className="footer-content">
            <p className="footer-text">
              Built with ❤️ for audiobook lovers everywhere
            </p>
            <p className="footer-subtext">
              Calculate • Save Time • Listen More
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
