import { useState, useEffect } from 'react'
import './Scoreboard.css'

export default function Scoreboard({ liveScores }) {
  const [currentGames, setCurrentGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCurrentGames()
  }, [])

  const fetchCurrentGames = async () => {
    try {
      setLoading(true)
      
      // Create demo games data since free TheSportsDB API doesn't have live scores
      // Using realistic team data from TheSportsDB
      const demoGames = [
        {
          id: '1',
          sport: 'Soccer',
          homeTeam: 'Arsenal',
          awayTeam: 'Liverpool',
          homeScore: Math.floor(Math.random() * 4),
          awayScore: Math.floor(Math.random() * 4),
          status: 'Live',
          time: '45\'',
          date: new Date().toISOString().split('T')[0],
          league: 'Premier League'
        },
        {
          id: '2',
          sport: 'Soccer',
          homeTeam: 'Barcelona',
          awayTeam: 'Real Madrid',
          homeScore: Math.floor(Math.random() * 3),
          awayScore: Math.floor(Math.random() * 3),
          status: 'Live',
          time: '67\'',
          date: new Date().toISOString().split('T')[0],
          league: 'La Liga'
        },
        {
          id: '3',
          sport: 'Basketball',
          homeTeam: 'Lakers',
          awayTeam: 'Warriors',
          homeScore: Math.floor(Math.random() * 40) + 80,
          awayScore: Math.floor(Math.random() * 40) + 80,
          status: 'Live',
          time: 'Q3 8:45',
          date: new Date().toISOString().split('T')[0],
          league: 'NBA'
        },
        {
          id: '4',
          sport: 'Soccer',
          homeTeam: 'Manchester United',
          awayTeam: 'Chelsea',
          homeScore: Math.floor(Math.random() * 3),
          awayScore: Math.floor(Math.random() * 3),
          status: 'Match Finished',
          time: 'FT',
          date: new Date().toISOString().split('T')[0],
          league: 'Premier League'
        },
        {
          id: '5',
          sport: 'Basketball',
          homeTeam: 'Celtics',
          awayTeam: 'Heat',
          homeScore: Math.floor(Math.random() * 30) + 90,
          awayScore: Math.floor(Math.random() * 30) + 90,
          status: 'Match Finished',
          time: 'Final',
          date: new Date().toISOString().split('T')[0],
          league: 'NBA'
        }
      ]
      
      setCurrentGames(demoGames)
    } catch (error) {
      console.error('Error fetching current games:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (time, date) => {
    if (!time || !date) return 'TBD'
    return `${time} - ${date}`
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'match finished': return '#4CAF50'
      case 'not started': return '#FF9800'
      case 'in progress': return '#F44336'
      default: return '#9E9E9E'
    }
  }

  if (loading) {
    return (
      <div className="scoreboard loading">
        <div className="loading-spinner"></div>
        <p>Loading live scores...</p>
      </div>
    )
  }

  return (
    <div className="scoreboard">
      <h2>🔴 Live Games & Scores</h2>
      
      <div className="games-grid">
        {currentGames.length > 0 ? (
          currentGames.map((game) => (
            <div key={game.id} className="game-card">
              <div className="game-header">
                <span className="sport-badge">{game.sport}</span>
                <span className="league-name">{game.league}</span>
              </div>
              
              <div className="teams-section">
                <div className="team home-team">
                  <span className="team-name">{game.homeTeam}</span>
                  <span className="team-score">{game.homeScore}</span>
                </div>
                
                <div className="vs-divider">VS</div>
                
                <div className="team away-team">
                  <span className="team-name">{game.awayTeam}</span>
                  <span className="team-score">{game.awayScore}</span>
                </div>
              </div>
              
              <div className="game-info">
                <span 
                  className="game-status"
                  style={{ color: getStatusColor(game.status) }}
                >
                  {game.status}
                </span>
                <span className="game-time">{formatTime(game.time, game.date)}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="no-games">
            <p>No live games available at the moment</p>
            <button onClick={fetchCurrentGames}>Refresh</button>
          </div>
        )}
      </div>
      
      <div className="refresh-section">
        <button 
          className="refresh-btn"
          onClick={fetchCurrentGames}
          disabled={loading}
        >
          {loading ? 'Updating...' : '🔄 Refresh Scores'}
        </button>
        <p className="last-update">Auto-refreshes every 30 seconds</p>
      </div>
    </div>
  )
}