import React from 'react';

const RealityCompare = ({ reality, current }) => {
    if (!reality) return null;

    const getIntensityLabel = (val) => {
        if (val < 0.2) return 'Negligible';
        if (val < 0.5) return 'Moderate';
        if (val < 0.8) return 'Heavy';
        return 'Extreme';
    };

    return (
        <div className="glass animate-fade-in" style={{
            position: 'absolute',
            right: '40px',
            top: '120px',
            width: '300px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            borderLeft: '4px solid var(--accent-primary)'
        }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', letterSpacing: '1px' }}>REALITY CHECK</h3>

            <div className="stat-compare">
                <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>PRECIPITATION</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--accent-primary)' }}>{getIntensityLabel(current.intensity)}</span>
                    <span style={{ fontSize: '1.2rem' }}>VS</span>
                    <span style={{ fontWeight: 600 }}>{getIntensityLabel(reality.intensity)}</span>
                </div>
            </div>

            <div className="stat-compare">
                <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>WIND DRIFT</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--accent-primary)' }}>{current.wind} km/h</span>
                    <span style={{ fontSize: '1.2rem' }}>VS</span>
                    <span style={{ fontWeight: 600 }}>{reality.wind} km/h</span>
                </div>
            </div>

            <div style={{
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: '1px solid var(--glass-border)',
                fontSize: '0.9rem',
                fontStyle: 'italic',
                color: 'var(--text-secondary)'
            }}>
                Reality data sourced from OpenWeatherMap Tier 1 API.
            </div>
        </div>
    );
};

export default RealityCompare;
