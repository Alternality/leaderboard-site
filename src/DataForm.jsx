import React, { useState, useEffect } from "react";
import axios from "axios";

function Leaderboard() {
    const [selectedMode, setSelectedMode] = useState('survival'); // Default mode is 'survival'
    const [leaderboardData, setLeaderboardData] = useState(null);

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const response = await axios.get(`https://leaderboard-api-shakesafe.netlify.app/.netlify/functions/api/${selectedMode}`);
                setLeaderboardData(response.data);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error.message);
            }
        };

        fetchLeaderboardData(); // Fetch data initially and whenever selectedMode changes
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
        }
    };

    const toggleMode = () => {
        setSelectedMode(prevMode => prevMode === 'survival' ? 'timeAttack' : 'survival');
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Leaderboard</h2>
            <button
                style={{ ...styles.button, ...(selectedMode === 'survival' ? styles.activeButton : {}) }}
                onClick={toggleMode}
            >
                {selectedMode === 'survival' ? 'Switch to Time Attack' : 'Switch to Survival'}
            </button>
            {leaderboardData && (
                <div style={styles.leaderboard}>
                    <h3 style={styles.heading}>{selectedMode === 'survival' ? 'Survival Leaderboard' : 'Time Attack Leaderboard'}</h3>
                    {leaderboardData.map((entry, index) => (
                        <div key={index} style={styles.leaderboardItem}>
                            {index + 1}. {entry.user} - {selectedMode === 'survival' ? entry.survival.score : entry.timeAttack.score}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Leaderboard;
