# FlowAI - Smart Stadium System 🏟️

Welcome to **FlowAI**, an intelligent, fully-featured Progressive Web Application (PWA) built to transform large-scale event operations by providing real-time crowd insights, smart routing, and visitor-centric interactive experiences.

---

## 🛑 Problem Statement
Large stadiums and event arenas often face severe friction during peak operations. Visitors regularly encounter crowd congestion, unexpectedly long waiting times at food stalls, complete confusion regarding venue navigation, and a lack of immediate emergency access. This leads to a frustrating user experience, increased safety risks, and diminished operational efficiency.

## 💡 Solution
**FlowAI** serves as a centralized "Smart Stadium" hub. By utilizing a cutting-edge, Single Page Application (SPA) multi-view architecture, it isolates specific visitor intents (from ordering food to emergency SOS) and pairs them with dynamically updating, algorithmically simulated operations data to prevent crowding *before* it happens.

---

## ✨ Features

### Operations & Wayfinding
- **Overview Dashboard**: Continuously monitors venue zones to predict traffic bottlenecks via a simulated Halftime data engine.
- **Predictive Departure Planner**: Users can input their expected departure time (e.g. "In 30 Minutes") and algorithmic logic automatically assigns them the least congested exit-gate relative to projected movement metrics.
- **Seat-to-Seat Group Navigation**: Users can generate isolated "Group Link Codes" allowing friends to find each other. The tool cross-references two user seat inputs against the stadium's layout logic (North, South, East, West Wings) to output strict walking directions.
- **AI Assistant for User Queries**: A built-in context-aware chat interface responding to real-time operations data.

### Visitor Experience
- **Click-and-Collect Amenities**: An intelligent finder that maps your current seat to the nearest *un-crowded* washroom or food vendor. Features a mock "Order Ahead" checkout system utilizing haptic device feedback (`navigator.vibrate`) and animated UI countdowns.
- **Live Match Centre**: A robust, self-driving cricket simulator. Set on a timer loop, it ticks up runs, boundaries, overs, and run-rate seamlessly on the UI alongside a visual "Recent Deliveries" TV-style tracking bar.

### Safety & Robustness
- **High-Priority SOS Dispatch**: An aggressively structured, high-contrast warning interface where attendees can categorize emergencies (Medical, Fire, Security) and submit their explicit location, receiving immediate tailored protocol guidance.
- **Accessibility & Contrast Mode**: An instant toggle enabling WCAG-level pure contrast layout across the entire infrastructure. 
- **PWA Service Worker Engine**: Runs localized caching loops (`sw.js`) allowing the foundational UI views (importantly, the SOS engine) to theoretically function off of cached network layers if internet connectivity drops deep within the stadium.

---

## 💻 Tech Stack
- **Frontend Architecture**: Pure HTML5, CSS3 natively utilizing Variable Logic (`var(--blue)`) and flexbox grids.
- **Client Logic**: Modularized Vanilla JavaScript (`live_score.js`, `navigation_logic.js`, `crowd_predict.js`, etc.)
- **AI / Tooling Assistance**: Antigravity AI

---

## 🚀 Future Scope
- **Real Sensor Integration**: Hook up WebSockets and IoT camera metric payloads directly into the live prediction loop.
- **Machine Learning Flow Engine**: Transition our static algorithms to reactive Time-Series models tracking real footfall patterns globally. 
- **Native Applications**: Wrap the current offline-friendly UI in React Native for fluid App Store distribution globally. 
