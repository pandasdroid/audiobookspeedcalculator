import SpeedCalculator from './components/Hero/SpeedCalculator';
import ComparisonTable from './components/ComparisonTable/ComparisonTable';
import GoalPlanner from './components/GoalPlanner/GoalPlanner';
import SpeedQuiz from './components/SpeedQuiz/SpeedQuiz';
import ReadingQueue from './components/ReadingQueue/ReadingQueue';
import YearlyStats from './components/YearlyStats/YearlyStats';
import SpeedGuide from './components/SpeedGuide/SpeedGuide';
import './App.css';

function App() {
  return (
    <div className="app">
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
  );
}

export default App;
