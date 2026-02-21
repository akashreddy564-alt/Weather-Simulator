const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Mock database for simulation scenarios
let savedScenarios = [
    { id: '1', name: 'Summer Storm', type: 'rain', intensity: 0.8, wind: 30 },
    { id: '2', name: 'Arctic Blast', type: 'snow', intensity: 0.9, wind: 50 }
];

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Atmospheric Engine Online' });
});

// Real-time weather proxy
app.get('/api/weather/:city', async (req, res) => {
    const { city } = req.params;
    const API_KEY = process.env.WEATHER_API_KEY;

    try {
        let rawData;
        if (API_KEY && API_KEY !== 'YOUR_API_KEY_HERE') {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            rawData = response.data;
        } else {
            // High-fidelity fallback for demonstration
            const hash = city.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            rawData = {
                name: city,
                weather: [{ main: hash % 3 === 0 ? 'Rain' : (hash % 5 === 0 ? 'Snow' : 'Clear') }],
                main: { temp: 15 + (hash % 15) },
                wind: { speed: 5 + (hash % 40) },
                coord: { lat: 51.5074 + (hash % 10) / 100, lon: -0.1278 + (hash % 10) / 100 }
            };
        }

        const weatherType = rawData.weather[0].main.toLowerCase();
        const mockWeather = {
            city: rawData.name,
            type: weatherType.includes('rain') || weatherType.includes('drizzle') ? 'rain' : (weatherType.includes('snow') ? 'snow' : 'sunny'),
            intensity: weatherType.includes('rain') || weatherType.includes('snow') ? 0.6 : 0,
            wind: Math.round(rawData.wind.speed * 3.6), // Convert m/s to km/h
            temp: Math.round(rawData.main.temp),
            coords: rawData.coord
        };

        res.json(mockWeather);
    } catch (error) {
        console.error("Weather API Error:", error.message);
        res.status(500).json({ error: "Could not fetch atmospheric data" });
    }
});


// Get saved scenarios
app.get('/api/scenarios', (req, res) => {
    res.json(savedScenarios);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
