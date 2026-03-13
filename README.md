# Audiobook Speed Calculator

A modern, gamified web application that helps audiobook listeners calculate time savings, discover their optimal playback speed, and track their reading queue.

## Features

### 🎮 Gamification System
- **Achievements & Badges** - Unlock 8 different achievements
- **Experience Points (XP)** - Earn points for using features
- **Level System** - Progress from Beginner to Time Lord (6 levels)
- **Daily Streaks** - Track consecutive days of usage
- **Progress Tracking** - Visual level progression bar
- **Achievement Notifications** - Celebratory toasts when you unlock achievements

## Core Features

### 🎯 Hero Speed Calculator
- Interactive slider (0.5x - 3x speed)
- Real-time duration calculations
- Animated time-saved display
- Color-coded speed indicators

### 📊 Speed Comparison Table
- Side-by-side comparison of all speeds
- Highlighted "sweet spot" recommendation at 1.5x
- Time saved and percentage faster for each speed

### 📅 Daily Goal Planner
- Calculate finish date based on daily listening time
- Visual calendar display
- Bonus tips for faster completion

### 🎮 Speed Personality Quiz
- 4-question interactive quiz
- Personalized speed recommendations
- Fun personality labels: "The Cruiser", "The Optimizer", "The Speedrunner"

### 📚 Reading Queue Manager
- Add/remove multiple audiobooks
- Drag-to-reorder functionality
- Total queue time at any speed
- localStorage persistence

### 📈 Yearly Stats Dashboard
- Mind-blowing annual projections
- Visual comparison bars
- Hours saved, days gained, extra books calculations

### 💡 Speed Listening Guide
- Training tips for faster playback
- Speed recommendations by genre
- Science behind speed listening
- Pro tips accordion sections

## Tech Stack

- **React 19** - Modern UI framework
- **Vite** - Lightning-fast build tool
- **Framer Motion** - Smooth animations
- **Pure CSS** - Custom styling, no heavy UI libraries
- **localStorage** - Client-side data persistence

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Navigate to project directory
cd audiobookspeedcalculator

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Production files are generated in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
audiobookspeedcalculator/
├── src/
│   ├── components/
│   │   ├── Hero/                  # Speed calculator hero section
│   │   ├── ComparisonTable/       # Speed comparison grid
│   │   ├── GoalPlanner/           # Daily goal calculator
│   │   ├── SpeedQuiz/             # Personality quiz
│   │   ├── ReadingQueue/          # Multi-book tracker
│   │   ├── YearlyStats/           # Annual projections
│   │   ├── SpeedGuide/            # Educational content
│   │   └── common/                # Shared components
│   ├── utils/
│   │   ├── calculations.js        # All math utilities
│   │   └── storage.js             # localStorage helpers
│   ├── App.jsx                    # Main app component
│   ├── App.css                    # Global styles
│   └── main.jsx                   # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Deployment

This is a static site that can be deployed to any hosting platform:

### Netlify / Vercel
1. Push to GitHub
2. Connect repository to Netlify/Vercel
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages
```bash
npm run build
# Deploy dist/ directory to gh-pages branch
```

### CDN / Static Hosting
Upload the contents of `dist/` to any static file host.

## Features Deep Dive

### Speed Calculator
- Supports audiobooks from 0-50 hours
- Speed range: 0.5x to 3.0x
- Real-time calculations with smooth animations
- Color-coded indicators (green/yellow/red) based on speed difficulty

### Reading Queue
- Add unlimited audiobooks
- Persists across sessions using localStorage
- Calculate total listening time for entire queue
- Shows time savings at selected speed

### Personality Quiz
- Determines optimal speed based on:
  - Genre preferences
  - Experience level
  - Listening context
  - Re-listening habits
- Results saved to localStorage

### Yearly Projections
- Calculate annual impact of speed listening
- Shows hours saved, days gained, extra books
- Visual comparison bars
- Customizable inputs (books/month, avg length)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Bundle size: ~343 KB (107 KB gzipped)
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- 100% client-side (no backend required)

## License

MIT License - feel free to use for any project!

## Contributing

Contributions welcome! Ideas for improvements:
- Audible/Libby integration for book length lookup
- Share results as social media cards
- Dark mode toggle
- Additional quiz questions
- More speed training tips

## Acknowledgments

Built with ❤️ for audiobook lovers everywhere.
