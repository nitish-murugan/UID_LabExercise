import weatherService from '../services/weatherService';
import './WeatherCard.css';

const WeatherCard = ({ weather }) => {
  const { name, main, weather: weatherData, wind, sys } = weather;
  const weatherInfo = weatherData[0];

  const formatTemperature = (temp) => Math.round(temp);

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2 className="city-name">{name}, {sys.country}</h2>
        <div className="weather-icon">
          <img 
            src={weatherService.getWeatherIconUrl(weatherInfo.icon)} 
            alt={weatherInfo.description}
          />
        </div>
      </div>
      
      <div className="weather-main">
        <div className="temperature">
          <span className="temp-value">{formatTemperature(main.temp)}</span>
          <span className="temp-unit">°C</span>
        </div>
        <div className="weather-description">
          {weatherInfo.description.charAt(0).toUpperCase() + weatherInfo.description.slice(1)}
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Feels like</span>
          <span className="detail-value">{formatTemperature(main.feels_like)}°C</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{main.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">{wind.speed} m/s</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{main.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;