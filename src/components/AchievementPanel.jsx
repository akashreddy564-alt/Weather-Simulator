import React, { useEffect, useState } from 'react';

const AchievementPanel = ({ weatherState }) => {
    const [achievements, setAchievements] = useState([]);
    const [showToast, setShowToast] = useState(null);

    const possibleAchievements = [
        { id: 'chaos', name: 'Agent of Chaos', description: 'Triggered Chaos Mode', icon: '🔥' },
        { id: 'storm', name: 'Storm Chaser', description: 'Synced with a heavy storm', icon: '⚡' },
        { id: 'snow', name: 'Arctic Explorer', description: 'Synced with a blizzard', icon: '❄️' },
    ];

    useEffect(() => {
        let newAchievement = null;

        if (weatherState.isChaos && !achievements.find(a => a.id === 'chaos')) {
            newAchievement = possibleAchievements.find(a => a.id === 'chaos');
        } else if (weatherState.type === 'rain' && weatherState.intensity > 0.8 && !achievements.find(a => a.id === 'storm')) {
            newAchievement = possibleAchievements.find(a => a.id === 'storm');
        } else if (weatherState.type === 'snow' && weatherState.intensity > 0.5 && !achievements.find(a => a.id === 'snow')) {
            newAchievement = possibleAchievements.find(a => a.id === 'snow');
        }

        if (newAchievement) {
            setAchievements(prev => [...prev, newAchievement]);
            setShowToast(newAchievement);
            setTimeout(() => setShowToast(null), 4000);
        }
    }, [weatherState]);

    return (
        <>
            {showToast && (
                <div className="glass-premium animate-fade-in" style={{
                    position: 'fixed',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    padding: '16px 32px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    borderTop: '4px solid #00d2ff'
                }}>
                    <span style={{ fontSize: '2rem' }}>{showToast.icon}</span>
                    <div>
                        <h4 style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', letterSpacing: '1px' }}>ACHIEVEMENT UNLOCKED</h4>
                        <p style={{ fontWeight: 800, fontSize: '1.2rem' }}>{showToast.name}</p>
                    </div>
                </div>
            )}

            {achievements.length > 0 && (
                <div className="glass-premium animate-fade-in" style={{
                    position: 'absolute',
                    left: '40px',
                    top: '120px',
                    width: '240px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                }}>
                    <h4 style={{ fontSize: '0.8rem', opacity: 0.6, letterSpacing: '1px' }}>BADGES</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {achievements.map(a => (
                            <div key={a.id} title={a.description} style={{
                                background: 'rgba(255,255,255,0.1)',
                                padding: '8px',
                                borderRadius: '8px',
                                fontSize: '1.2rem'
                            }}>
                                {a.icon}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default AchievementPanel;
