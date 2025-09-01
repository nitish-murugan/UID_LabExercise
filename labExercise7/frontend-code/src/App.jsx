import { useState } from 'react'
import WeatherSearch from './components/WeatherSearch'
import WeatherCard from './components/WeatherCard'
import WeatherForecast from './components/WeatherForecast'
import weatherService from './services/weatherService'
import './App.css'

function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (city) => {
    setLoading(true)
    setError(null)

    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherService.getCurrentWeather(city),
        weatherService.getWeatherForecast(city)
      ])

      setCurrentWeather(weatherData)
      setForecast(forecastData)
    } catch (err) {
      setError(err.message)
      setCurrentWeather(null)
      setForecast(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Weather Forecast App</h1>
        <p>Get current weather and 5-day forecast for any city</p>
      </header>

      <main className="app-main">
        <WeatherSearch onSearch={handleSearch} loading={loading} />

        {error && (
          <div className="error-message">
            <p>⚠️ {error}</p>
          </div>
        )}

        {currentWeather && (
          <div className="weather-content">
            <WeatherCard weather={currentWeather} />
            {forecast && <WeatherForecast forecast={forecast} />}
          </div>
        )}

        {!currentWeather && !error && !loading && (
          <div className="welcome-message">
            <p>Enter a city name to get started!</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
