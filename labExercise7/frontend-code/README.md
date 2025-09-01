# Weather Forecast App

A modern React application that displays current weather and 5-day forecast for any location using the OpenWeatherMap API.

## Features

- 🌤️ Current weather conditions
- 📅 5-day weather forecast
- 🔍 Search by city name
- 📱 Responsive design
- 🎨 Modern glassmorphism UI
- ⚡ Fast and lightweight

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key

## Setup Instructions

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd frontend-code
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Get an API key:**
   - Go to [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Get your API key from the dashboard

4. **Configure environment variables:**
   - Copy `.env.example` to `.env`:
     ```bash
     copy .env.example .env
     ```
   - Open `.env` and replace `your_openweathermap_api_key_here` with your actual API key:
     ```
     VITE_WEATHER_API_KEY=your_actual_api_key_here
     ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   - Visit `http://localhost:5173`
   - Enter a city name to get weather information

## Usage

1. Enter a city name in the search box
2. Click "Get Weather" or press Enter
3. View current weather conditions and 5-day forecast
4. Search for different cities as needed

## Technologies Used

- **React** - Frontend framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API requests
- **OpenWeatherMap API** - Weather data provider
- **CSS3** - Styling with glassmorphism effects

## Project Structure

```
src/
├── components/
│   ├── WeatherCard.jsx      # Current weather display
│   ├── WeatherCard.css
│   ├── WeatherSearch.jsx    # Search input component
│   ├── WeatherSearch.css
│   ├── WeatherForecast.jsx  # 5-day forecast display
│   └── WeatherForecast.css
├── services/
│   └── weatherService.js    # API service layer
├── App.jsx                  # Main application component
├── App.css
├── index.css               # Global styles
└── main.jsx               # Application entry point
```

## API Information

This app uses the OpenWeatherMap API:
- Current Weather Data API
- 5 Day Weather Forecast API
- Weather icons from OpenWeatherMap

## Troubleshooting

- **"Invalid API key" error**: Make sure your API key is correct in the `.env` file
- **"City not found" error**: Check the spelling of the city name
- **No data loading**: Check your internet connection and API key

## License

This project is open source and available under the [MIT License](LICENSE).+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
