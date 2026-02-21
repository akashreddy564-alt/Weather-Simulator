import React, { useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import WeatherEngine from './components/WeatherEngine';
import Dashboard from './components/Dashboard';
import RealityCompare from './components/RealityCompare';
import ChaosButton from './components/ChaosButton';
import AchievementPanel from './components/AchievementPanel';


// Change map view when city changes
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, 12);
  return null;
}

function App() {
  const [weatherState, setWeatherState] = useState({
    id: 'sunny',
    type: 'sunny',
    intensity: 0,
    wind: 5,
    label: 'Clear Sky',
    isChaos: false
  });
  const [coords, setCoords] = useState([51.505, -0.09]); // Default: London
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleChaos = () => {
    setWeatherState(prev => ({
      ...prev,
      isChaos: !prev.isChaos
    }));
  };

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
        label: `Syncing: ${data.city}`,
        reality: data, // Store reality data for comparison
        isChaos: false // Reset chaos on new sync
      });
      if (data.coords) {
        setCoords([data.coords.lat, data.coords.lon]);
      }
    } catch (error) {
      console.error("Failed to sync atmospheric data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`app-container ${weatherState.isChaos ? 'animate-shake' : ''}`}>
      {weatherState.isChaos && <div className="chaos-flash" />}

      {/* Map Background Layer */}
      <div className="map-container" style={{ filter: weatherState.isChaos ? 'grayscale(100%) contrast(150%) brightness(50%)' : 'none' }}>
        <MapContainer center={coords} zoom={12} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <ChangeView center={coords} />
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
        </MapContainer>
      </div>

      {/* Weather Particle Layer */}
      <WeatherEngine weatherState={weatherState} />

      {/* UI Interaction Layer */}
      <main className="ui-overlay" style={{ padding: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="glass-premium animate-fade-in" style={{
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
              background: weatherState.isChaos ? '#ff4b2b' : '#00d2ff',
              boxShadow: `0 0 10px ${weatherState.isChaos ? '#ff4b2b' : '#00d2ff'}`
            }} />
            <span style={{ fontWeight: 600, letterSpacing: '1px' }}>
              {weatherState.isChaos ? '!!! ANOMALY DETECTED !!!' : (loading ? 'SYNCING...' : 'ATMOS LINK ONLINE')}
            </span>
          </div>

          <form onSubmit={fetchCityWeather} className="glass-premium animate-fade-in" style={{ padding: '8px 16px', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Enter city to sync..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                outline: 'none',
                fontFamily: 'var(--font-main)',
                width: '180px'
              }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>SYNC</button>
          </form>
        </div>

        <RealityCompare reality={weatherState.reality} current={weatherState} />
        <AchievementPanel weatherState={weatherState} />
        <Dashboard weatherState={weatherState} setWeatherState={setWeatherState} />
        <ChaosButton isActive={weatherState.isChaos} onClick={toggleChaos} />
      </main>
    </div>
  );
}

export default App;
