import React from 'react';

const ChaosButton = ({ isActive, onClick }) => {
    return (
        <div style={{ position: 'absolute', right: '40px', bottom: '40px', zIndex: 100 }}>
            <button
                className={`chaos-btn ${isActive ? 'active' : ''} animate-fade-in`}
                onClick={onClick}
                title="Toggle Weather Chaos"
            >
                {isActive ? 'EXIT' : 'CHAOS'}
            </button>
            {!isActive && (
                <div style={{
                    position: 'absolute',
                    top: '-30px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: '#ff4b2b',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    whiteSpace: 'nowrap',
                    letterSpacing: '2px',
                    textShadow: '0 0 5px rgba(255,75,43,0.5)'
                }}>
                    DANGER ZONE
                </div>
            )}
        </div>
    );
};

export default ChaosButton;
