import React, { useState, useEffect } from "react";
import axios from "axios";

function Leaderboard() {
    const [selectedMode, setSelectedMode] = useState('survival'); // Default mode is 'survival'
    const [leaderboardData, setLeaderboardData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const response = await axios.get(`https://leaderboard-api-shakesafe.netlify.app/.netlify/functions/api/${selectedMode}`);
                setLeaderboardData(response.data);
                setError(null); // Clear any previous error
            } catch (error) {
                console.error('Error fetching leaderboard data:', error.message);
                setError('Error fetching data. Please try again later.');
            }
        };

        fetchLeaderboardData();
    }, [selectedMode]);

    const styles = {
        container: {
            position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#121212',
  color: '#ffffff',
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
  width: '90%', // Increase the width to 90%
  maxWidth: '600px', // Increase the max width to 800px
  margin: '0 auto',
  backgroundImage: 'https://plus.unsplash.com/premium_photo-1716836076362-6ae73597e890?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Add a background image
  backgroundRepeat: 'no-repeat', // Set the background repeat to no-repeat
  backgroundPosition: 'center center'
          },
          heading: {
            fontSize: '2em',
            marginBottom: '10px'
          },
          button: {
            backgroundColor: '#1f1f1f',
            color: '#ffffff',
            border: '2px solid #ffffff',
            padding: '10px 20px',
            borderRadius: '5px',
            fontSize: '1em',
            cursor: 'pointer',
            transition: 'background-color 0.3s, color 0.3s',
            margin: '10px'
          },
          activeButton: {
            backgroundColor: '#ffffff',
            color: '#000000'
          },
          leaderboard: {
            marginTop: '20px',
            textAlign: 'left'
          },
          leaderboardItem: {
            padding: '10px',
            borderBottom: '1px solid #444'
          },
          error: {
            color: 'ed',
            marginTop: '10px'
          }
    };

    const toggleMode = () => {
        setSelectedMode(prevMode => prevMode === 'survival' ? 'timeAttack' : 'survival');
    };

    const formatDateTime = (dateTimeString) => {
        const options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: true // Use 12-hour format with AM/PM
        };
        return new Date(dateTimeString).toLocaleString(undefined, options);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>ShakeSafe Leaderboard</h2>
            <button
                style={{ ...styles.button, ...(selectedMode === 'survival' ? styles.activeButton : {}) }}
                onClick={toggleMode}
            >
                {selectedMode === 'survival' ? 'Switch to Time Attack' : 'Switch to Survival'}
            </button>
            {error && <div style={styles.error}>{error}</div>}
            {leaderboardData && leaderboardData.length > 0 ? (
                <div style={styles.leaderboard}>
                    <h3 style={styles.heading}>{selectedMode === 'survival' ? 'Survival' : 'Time Attack'}</h3>
                    {leaderboardData.map((entry, index) => (
                        <div key={index} style={styles.leaderboardItem}>
                            {index + 1}. {entry.user} - Score: {selectedMode === 'survival' ? entry.survival.score : entry.timeAttack.score}, Time: {selectedMode === 'survival' ? entry.survival.time : entry.timeAttack.time}, Date: {formatDateTime(entry.date)}
                        </div>
                    ))}
                </div>
            ) : (
                <div style={styles.leaderboard}>
                    <h3 style={styles.heading}>{selectedMode === 'survival' ? 'Survival Leaderboard' : 'Time Attack Leaderboard'}</h3>
                    <p>No leaderboard data available.</p>
                </div>
            )}
        </div>
    );
}

export default Leaderboard;
