# Overview

This is a Live Sports Scoreboard application built with React and Vite that tracks live sports scores, team stats, and player rankings. The application integrates with free Sports APIs (TheSportsDB) and simulates real-time updates for displaying current games, comprehensive team statistics, and player performance rankings across multiple sports including soccer and basketball. It features a modern single-page application design with responsive components and live data connectivity.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with JSX/TypeScript support
- **Build Tool**: Vite for fast development builds and hot module reloading
- **Styling**: CSS modules with component-specific stylesheets
- **Component Structure**: Modular component architecture with separate components for PlayerRankings, Scoreboard, and TeamStats

## Development Setup
- **TypeScript Configuration**: Strict mode enabled with modern ES features
- **Module System**: ES modules with modern import/export syntax
- **Development Server**: Configured to run on host 0.0.0.0 and port 5000 for Replit compatibility

## UI/UX Design Patterns
- **Responsive Design**: Grid layouts and flexbox for adaptive interfaces
- **Loading States**: Dedicated loading spinners and states for asynchronous operations
- **Interactive Elements**: Hover effects and smooth transitions
- **Filtering System**: Dropdown selectors for sports, categories, and leagues
- **Card-based Layout**: Game cards and stats displayed in grid formations
- **Tabbed Navigation**: Clean tab interface for switching between Live Scores, Team Stats, and Player Rankings
- **Live Status Indicators**: Real-time connection status with animated indicators

## State Management
- **Component State**: Uses React's built-in useState and useEffect hooks
- **Data Fetching**: Integrated with TheSportsDB API for live sports data
- **Real-time Updates**: Implemented periodic data refresh every 30 seconds with WebSocket simulation
- **Active Tab Management**: Dynamic content switching between scoreboard, team stats, and player rankings

# External Dependencies

## Core Framework Dependencies
- **React**: ^18.2.0 - Main UI framework
- **React DOM**: ^18.2.0 - DOM rendering
- **Vite**: ^5.0.0 - Build tool and development server
- **@vitejs/plugin-react**: ^4.2.0 - React plugin for Vite

## Development Dependencies
- **TypeScript**: ^5.2.2 - Type checking and modern JavaScript features
- **@types/react**: ^18.2.37 - React type definitions
- **@types/react-dom**: ^18.2.15 - React DOM type definitions

## Data Sources
- **TheSportsDB API**: Free sports data API for live scores, team information, and league data
- **Multi-sport Support**: Soccer (Premier League, La Liga, Bundesliga) and Basketball (NBA)
- **Real-time Simulation**: Periodic API calls every 30 seconds for live score updates
- **Comprehensive Coverage**: Team statistics, player rankings, and live game information