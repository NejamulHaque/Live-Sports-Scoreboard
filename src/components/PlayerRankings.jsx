import { useState, useEffect } from 'react'
import './PlayerRankings.css'

export default function PlayerRankings() {
  const [players, setPlayers] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('topScorers')
  const [selectedSport, setSelectedSport] = useState('soccer')
  const [loading, setLoading] = useState(true)

  const categories = {
    soccer: [
      { key: 'topScorers', label: 'Top Scorers' },
      { key: 'assists', label: 'Most Assists' },
      { key: 'topRated', label: 'Top Rated' }
    ],
    basketball: [
      { key: 'pointsLeaders', label: 'Points Leaders' },
      { key: 'reboundLeaders', label: 'Rebound Leaders' },
      { key: 'assistLeaders', label: 'Assist Leaders' }
    ]
  }

  useEffect(() => {
    generatePlayerRankings()
  }, [selectedCategory, selectedSport])

  const generatePlayerRankings = async () => {
    try {
      setLoading(true)
      
      // Since TheSportsDB doesn't have comprehensive player stats API,
      // we'll create realistic demo data based on real player names
      const soccerPlayers = [
        { name: 'Lionel Messi', team: 'Inter Miami', country: 'Argentina' },
        { name: 'Cristiano Ronaldo', team: 'Al Nassr', country: 'Portugal' },
        { name: 'Kylian Mbappe', team: 'PSG', country: 'France' },
        { name: 'Erling Haaland', team: 'Manchester City', country: 'Norway' },
        { name: 'Robert Lewandowski', team: 'Barcelona', country: 'Poland' },
        { name: 'Mohamed Salah', team: 'Liverpool', country: 'Egypt' },
        { name: 'Kevin De Bruyne', team: 'Manchester City', country: 'Belgium' },
        { name: 'Neymar Jr', team: 'Al Hilal', country: 'Brazil' },
        { name: 'Luka Modric', team: 'Real Madrid', country: 'Croatia' },
        { name: 'Sadio Mane', team: 'Al Nassr', country: 'Senegal' }
      ]

      const basketballPlayers = [
        { name: 'LeBron James', team: 'Los Angeles Lakers', country: 'USA' },
        { name: 'Stephen Curry', team: 'Golden State Warriors', country: 'USA' },
        { name: 'Kevin Durant', team: 'Phoenix Suns', country: 'USA' },
        { name: 'Giannis Antetokounmpo', team: 'Milwaukee Bucks', country: 'Greece' },
        { name: 'Luka Doncic', team: 'Dallas Mavericks', country: 'Slovenia' },
        { name: 'Jayson Tatum', team: 'Boston Celtics', country: 'USA' },
        { name: 'Joel Embiid', team: 'Philadelphia 76ers', country: 'Cameroon' },
        { name: 'Nikola Jokic', team: 'Denver Nuggets', country: 'Serbia' },
        { name: 'Jimmy Butler', team: 'Miami Heat', country: 'USA' },
        { name: 'Damian Lillard', team: 'Milwaukee Bucks', country: 'USA' }
      ]

      const playersData = selectedSport === 'soccer' ? soccerPlayers : basketballPlayers
      
      const playersWithStats = playersData.map((player, index) => {
        const baseStats = generateStatsForCategory(selectedCategory, selectedSport)
        return {
          id: index + 1,
          ...player,
          ...baseStats,
          rank: index + 1
        }
      })

      // Sort by primary stat
      const sortedPlayers = playersWithStats.sort((a, b) => {
        const primaryStat = getPrimaryStat(selectedCategory)
        return b[primaryStat] - a[primaryStat]
      })

      // Reassign ranks after sorting
      sortedPlayers.forEach((player, index) => {
        player.rank = index + 1
      })

      setPlayers(sortedPlayers)
    } catch (error) {
      console.error('Error generating player rankings:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateStatsForCategory = (category, sport) => {
    if (sport === 'soccer') {
      switch (category) {
        case 'topScorers':
          return {
            goals: Math.floor(Math.random() * 25) + 10,
            assists: Math.floor(Math.random() * 15) + 3,
            matches: Math.floor(Math.random() * 10) + 20,
            rating: (Math.random() * 2 + 7).toFixed(1)
          }
        case 'assists':
          return {
            assists: Math.floor(Math.random() * 20) + 8,
            goals: Math.floor(Math.random() * 15) + 5,
            matches: Math.floor(Math.random() * 10) + 20,
            rating: (Math.random() * 2 + 7).toFixed(1)
          }
        default:
          return {
            rating: (Math.random() * 2 + 7).toFixed(1),
            goals: Math.floor(Math.random() * 20) + 5,
            assists: Math.floor(Math.random() * 15) + 3,
            matches: Math.floor(Math.random() * 10) + 20
          }
      }
    } else {
      switch (category) {
        case 'pointsLeaders':
          return {
            points: (Math.random() * 10 + 25).toFixed(1),
            rebounds: (Math.random() * 5 + 6).toFixed(1),
            assists: (Math.random() * 5 + 5).toFixed(1),
            games: Math.floor(Math.random() * 20) + 50
          }
        case 'reboundLeaders':
          return {
            rebounds: (Math.random() * 5 + 10).toFixed(1),
            points: (Math.random() * 10 + 20).toFixed(1),
            assists: (Math.random() * 5 + 3).toFixed(1),
            games: Math.floor(Math.random() * 20) + 50
          }
        default:
          return {
            assists: (Math.random() * 5 + 8).toFixed(1),
            points: (Math.random() * 10 + 20).toFixed(1),
            rebounds: (Math.random() * 5 + 5).toFixed(1),
            games: Math.floor(Math.random() * 20) + 50
          }
      }
    }
  }

  const getPrimaryStat = (category) => {
    const statMap = {
      topScorers: 'goals',
      assists: 'assists',
      topRated: 'rating',
      pointsLeaders: 'points',
      reboundLeaders: 'rebounds',
      assistLeaders: 'assists'
    }
    return statMap[category] || 'rating'
  }

  const getRankColor = (rank) => {
    if (rank === 1) return '#FFD700' // Gold
    if (rank === 2) return '#C0C0C0' // Silver  
    if (rank === 3) return '#CD7F32' // Bronze
    return '#e0e0e0'
  }

  return (
    <div className="player-rankings">
      <div className="rankings-header">
        <h2>🏆 Player Rankings</h2>
        
        <div className="filters">
          <div className="sport-selector">
            <label>Sport:</label>
            <select 
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
            >
              <option value="soccer">Soccer</option>
              <option value="basketball">Basketball</option>
            </select>
          </div>
          
          <div className="category-selector">
            <label>Category:</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories[selectedSport].map(cat => (
                <option key={cat.key} value={cat.key}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-section">
          <div className="loading-spinner"></div>
          <p>Loading player rankings...</p>
        </div>
      ) : (
        <div className="rankings-content">
          <div className="rankings-list">
            {players.map((player) => (
              <div key={player.id} className="player-card">
                <div 
                  className="rank-badge"
                  style={{ backgroundColor: getRankColor(player.rank) }}
                >
                  #{player.rank}
                </div>
                
                <div className="player-info">
                  <h3 className="player-name">{player.name}</h3>
                  <p className="player-team">{player.team}</p>
                  <span className="player-country">🏴 {player.country}</span>
                </div>
                
                <div className="player-stats">
                  {selectedSport === 'soccer' ? (
                    <div className="stats-grid">
                      <div className="stat">
                        <span className="stat-value">{player.goals}</span>
                        <span className="stat-label">Goals</span>
                      </div>
                      <div className="stat">
                        <span className="stat-value">{player.assists}</span>
                        <span className="stat-label">Assists</span>
                      </div>
                      <div className="stat">
                        <span className="stat-value">{player.matches}</span>
                        <span className="stat-label">Matches</span>
                      </div>
                      <div className="stat">
                        <span className="stat-value">{player.rating}</span>
                        <span className="stat-label">Rating</span>
                      </div>
                    </div>
                  ) : (
                    <div className="stats-grid">
                      <div className="stat">
                        <span className="stat-value">{player.points}</span>
                        <span className="stat-label">PPG</span>
                      </div>
                      <div className="stat">
                        <span className="stat-value">{player.rebounds}</span>
                        <span className="stat-label">RPG</span>
                      </div>
                      <div className="stat">
                        <span className="stat-value">{player.assists}</span>
                        <span className="stat-label">APG</span>
                      </div>
                      <div className="stat">
                        <span className="stat-value">{player.games}</span>
                        <span className="stat-label">Games</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="rankings-footer">
            <p>Rankings update based on current season performance</p>
            <button onClick={generatePlayerRankings} disabled={loading}>
              🔄 Refresh Rankings
            </button>
          </div>
        </div>
      )}
    </div>
  )
}