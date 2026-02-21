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

// Real-time weather proxy (Mocking API for now to ensure immediate functionality)
app.get('/api/weather/:city', async (req, res) => {
    const { city } = req.params;

    // In a production app, you'd use OpenWeatherMap here:
    // const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`);

    // Realistic mock data based on input for demonstration
    const hash = city.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const mockWeather = {
        city,
        type: hash % 3 === 0 ? 'rain' : (hash % 5 === 0 ? 'snow' : 'sunny'),
        intensity: (hash % 10) / 10,
        wind: (hash % 100),
        temp: (hash % 35)
    };

    res.json(mockWeather);
});

// Get saved scenarios
app.get('/api/scenarios', (req, res) => {
    res.json(savedScenarios);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
