# Supernova Weather Simulator 🌌

A premium full-stack atmospheric dashboard showcasing real-time weather synchronization, dynamic physics-based simulations, and high-fidelity glassmorphic UI.

![Supernova Weather Simulator UI](https://img.shields.io/badge/UI-Glassmorphic-blueviolet)
![Full Stack](https://img.shields.io/badge/Stack-FullStack-green)

## 🚀 Overview

Supernova Weather Simulator is more than just a weather dashboard. It's a technical showcase of modern web engineering, featuring an interactive HTML5 Canvas engine that responds in real-time to atmospheric telemetry from a Node.js backend.

## ✨ Key Features

- **Interactive Geo-Spatial Mapping**: Integrated Leaflet with dark-matter tiles, providing a global interactive backdrop that syncs with search telemetry.
- **"Compare to Reality" Engine**: A diagnostic module that visualizes the delta between user-defined simulation parameters and live OpenWeatherMap data.
- **Full-Stack Synchronization**: Node.js/Express backend fetches real-world atmospheric telemetry (Temp, Wind, Precipitation) and auto-centers the simulation on real coordinates.
- **Dynamic Physics Engine**: Custom-built particle system handles Rain, Snow, and Storm effects with realistic wind-velocity vectors.


## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18+
- **Visuals**: HTML5 Canvas API (Particle Systems)
- **Styling**: Vanilla CSS3 (Custom Design Tokens)
- **Build Tool**: Vite

### Backend
- **Environment**: Node.js
- **Server**: Express
- **API Integration**: Axios for external weather proxies
- **CORS**: Cross-origin security enabled

## 🏗️ Architecture

```mermaid
graph LR
    A[React Dashboard] -->|User Sync| B(Express Server)
    B -->|Fetch| C[Weather API Proxy]
    C -->|Telemetry| B
    B -->|JSON Data| A
    A -->|State Update| D[Canvas Physics Engine]
    D -->|Render| E[Dynamic Visuals]
```

## ⚙️ Installation & Setup

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install && cd server && npm install
   ```
3. **Run the Backend** (From `/server`)
   ```bash
   node server.js
   ```
4. **Run the Frontend** (From root)
   ```bash
   npm run dev
   ```

---
*Built with ❤️ as a technical portfolio project.*
