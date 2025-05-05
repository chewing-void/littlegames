import { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [gamesWon, setGamesWon] = useState(0);
  
  // Load initial value from localStorage or fetch from API on first load
  useEffect(() => {
    const storedWins = localStorage.getItem('gamesWon');
    console.log('Stored wins:', storedWins); // Debugging line
    
    if (storedWins) {
      setGamesWon(parseInt(storedWins));
    } else {
      fetchInitialCount();
    }
  }, []);
  
  // Update localStorage whenever gamesWon changes
  useEffect(() => {
    localStorage.setItem('gamesWon', gamesWon.toString());
  }, [gamesWon]);
  
  const fetchInitialCount = async () => {
    try {
      const response = await fetch('https://cgi.cse.unsw.edu.au/~cs6080/raw/data/info.json');
      const data = await response.json();
      setGamesWon(data.score || 0);
    } catch (error) {
      console.error('Error fetching initial count:', error);
      setGamesWon(0);
    }
  };
  
  const handleReset = () => {
    fetchInitialCount();
  };
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <p className="dashboard-message">Please choose an option from the navbar.</p>
        <p className="dashboard-score">
          Games won: {gamesWon} <button onClick={handleReset} className="reset-button">(reset)</button>
        </p>
      </div>
    </div>
  );
}

export default Dashboard;