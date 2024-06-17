import React, { useState, useEffect } from "react";
import axios from "axios";

function Leaderboard() {
    const [selectedMode, setSelectedMode] = useState(null);
    const [leaderboardData, setLeaderboardData] = useState(null);
    const [buttonHovered, setButtonHovered] = useState(null); // Track which button is hovered

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const response = await axios.get(`https://leaderboard-api-shakesafe.netlify.app/.netlify/functions/api/${selectedMode}`);
                setLeaderboardData(response.data);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error.message);
            }
        };

        if (selectedMode) {
            fetchLeaderboardData();
        }
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
        paragraph: {
            fontSize: '1.2em',
            marginBottom: '20px'
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
            margin: '10px',
            // Conditional style based on hover
            ...(buttonHovered === 'survival' && selectedMode !== 'survival' && {
                backgroundColor: '#ffffff',
                color: '#000000'
            }),
            ...(buttonHovered === 'timeAttack' && selectedMode !== 'timeAttack' && {
                backgroundColor: '#ffffff',
                color: '#000000'
            }),
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

    const handleModeSelect = (mode) => {
        setSelectedMode(mode);
    };

    const handleMouseOver = (mode) => {
        setButtonHovered(mode);
    };

    const handleMouseOut = () => {
        setButtonHovered(null);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Game Modes</h2>
            <button
                style={styles.button}
                onMouseOver={() => handleMouseOver('survival')}
                onMouseOut={handleMouseOut}
                onClick={() => handleModeSelect('survival')}
            >
                Survival
            </button>
            <button
                style={styles.button}
                onMouseOver={() => handleMouseOver('timeAttack')}
                onMouseOut={handleMouseOut}
                onClick={() => handleModeSelect('timeAttack')}
            >
                Time Attack
            </button>
            {selectedMode && leaderboardData && (
                <div style={styles.leaderboard}>
                    <h3 style={styles.heading}>{selectedMode === 'survival' ? 'Survival Leaderboard' : 'Time Attack Leaderboard'}</h3>
                    {leaderboardData.map((entry, index) => (
                        <div key={index} style={styles.leaderboardItem}>
                            {index + 1}. {entry.user} - {entry.score}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Leaderboard;
