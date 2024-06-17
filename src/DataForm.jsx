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
            backgroundColor: '#121212',
            color: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            textAlign: 'center'
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
            color: 'red',
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
                    <h3 style={styles.heading}>{selectedMode === 'survival' ? 'Survival Leaderboard' : 'Time Attack Leaderboard'}</h3>
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
