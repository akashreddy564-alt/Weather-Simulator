import React, { useState } from 'react';
import WeatherEngine from './components/WeatherEngine';
import Dashboard from './components/Dashboard';

function App() {
  const [weatherState, setWeatherState] = useState({
    id: 'sunny',
    type: 'sunny',
    intensity: 0,
    wind: 5,
    label: 'Clear Sky'
  });
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCityWeather = async (e) => {
    e.preventDefault();
    if (!city) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5001/api/weather/${city}`);
      const data = await response.json();
      setWeatherState({
        id: 'external',
        type: data.type,
        intensity: data.intensity,
        wind: data.wind,
        label: `Syncing: ${data.city}`
      });
    } catch (error) {
      console.error("Failed to sync atmospheric data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <WeatherEngine weatherState={weatherState} />

      <main style={{ padding: '40px', height: '100vh', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="glass animate-fade-in" style={{
            width: 'fit-content',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#ff4b2b',
              boxShadow: '0 0 10px #ff4b2b'
            }} />
            <span style={{ fontWeight: 600, letterSpacing: '1px' }}>{loading ? 'SYNCING...' : 'LIVE SIMULATION'}</span>
          </div>

          <form onSubmit={fetchCityWeather} className="glass animate-fade-in" style={{ padding: '8px 16px', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Enter city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                outline: 'none',
                fontFamily: 'var(--font-main)'
              }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>SYNC</button>
          </form>
        </div>

        <Dashboard weatherState={weatherState} setWeatherState={setWeatherState} />
      </main>
    </div>
  );
}

export default App;
