import { useState, useEffect } from 'react'
import './App.css'
import Scoreboard from './components/Scoreboard'
import TeamStats from './components/TeamStats'
import PlayerRankings from './components/PlayerRankings'

export default function App() {
  const [activeTab, setActiveTab] = useState('scoreboard')
  const [liveScores, setLiveScores] = useState([])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Initialize WebSocket connection for live updates
    const connectWebSocket = () => {
      // Simulating WebSocket connection status
      setIsConnected(true)
      
      // Fetch initial data from sports API
      fetchLiveScores()
      
      // Set up periodic updates every 30 seconds
      const interval = setInterval(fetchLiveScores, 30000)
      return () => clearInterval(interval)
    }

    return connectWebSocket()
  }, [])

  const fetchLiveScores = async () => {
    try {
      // Using correct TheSportsDB API endpoint
      const response = await fetch('https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=Arsenal')
      const data = await response.json()
      if (data.teams) {
        setLiveScores(data.teams.slice(0, 5))
      }
    } catch (error) {
      console.error('Error fetching live scores:', error)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🏆 Live Sports Scoreboard</h1>
        <div className="connection-status">
          <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}></span>
          {isConnected ? 'Live' : 'Disconnected'}
        </div>
      </header>
      
      <nav className="nav-tabs">
        <button 
          className={activeTab === 'scoreboard' ? 'active' : ''}
          onClick={() => setActiveTab('scoreboard')}
        >
          Live Scores
        </button>
        <button 
          className={activeTab === 'teams' ? 'active' : ''}
          onClick={() => setActiveTab('teams')}
        >
          Team Stats
        </button>
        <button 
          className={activeTab === 'players' ? 'active' : ''}
          onClick={() => setActiveTab('players')}
        >
          Player Rankings
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'scoreboard' && <Scoreboard liveScores={liveScores} />}
        {activeTab === 'teams' && <TeamStats />}
        {activeTab === 'players' && <PlayerRankings />}
      </main>
    </div>
  )
}
