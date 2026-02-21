import React from 'react';

const Dashboard = ({ weatherState, setWeatherState }) => {
    const presets = [
        { id: 'sunny', label: 'Clear Sky', type: 'sunny', intensity: 0, wind: 5 },
        { id: 'rain', label: 'Light Rain', type: 'rain', intensity: 0.3, wind: 15 },
        { id: 'storm', label: 'Supercell', type: 'rain', intensity: 1, wind: 45 },
        { id: 'snow', label: 'Blizzard', type: 'snow', intensity: 0.8, wind: 25 },
    ];

    return (
        <div className="glass dashboard animate-fade-in" style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '800px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 className="gradient-text" style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', fontWeight: 800 }}>
                        Supernova Weather
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Atmospheric Simulation Engine v1.0</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 600 }}>{Math.round(weatherState.wind)}<span style={{ fontSize: '1rem' }}>km/h</span></span>
                    <p style={{ color: 'var(--text-secondary)' }}>WIND SPEED</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                {presets.map(p => (
                    <button
                        key={p.id}
                        className={`btn ${weatherState.id === p.id ? 'btn-primary' : 'glass'}`}
                        onClick={() => setWeatherState({ ...p })}
                        style={{ padding: '16px' }}
                    >
                        {p.label}
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px' }}>
                <div className="control-group">
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Precipitation Intensity</label>
                    <input
                        type="range"
                        min="0" max="1" step="0.01"
                        value={weatherState.intensity}
                        onChange={(e) => setWeatherState({ ...weatherState, intensity: parseFloat(e.target.value), id: 'custom' })}
                        style={{ width: '100%', cursor: 'pointer' }}
                    />
                </div>
                <div className="control-group">
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Wind Velocity</label>
                    <input
                        type="range"
                        min="0" max="100"
                        value={weatherState.wind}
                        onChange={(e) => setWeatherState({ ...weatherState, wind: parseInt(e.target.value), id: 'custom' })}
                        style={{ width: '100%', cursor: 'pointer' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
