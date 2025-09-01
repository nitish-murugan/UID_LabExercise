import weatherService from '../services/weatherService';
import './WeatherForecast.css';

const WeatherForecast = ({ forecast }) => {
  // Group forecast data by day and take first entry for each day
  const dailyForecast = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!acc[date]) {
      acc[date] = item;
    }
    return acc;
  }, {});

  const forecastDays = Object.values(dailyForecast).slice(0, 5);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTemperature = (temp) => Math.round(temp);

  return (
    <div className="weather-forecast">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-list">
        {forecastDays.map((day, index) => (
          <div key={day.dt} className="forecast-item">
            <div className="forecast-date">
              {index === 0 ? 'Today' : formatDate(day.dt)}
            </div>
            <div className="forecast-icon">
              <img 
                src={weatherService.getWeatherIconUrl(day.weather[0].icon)} 
                alt={day.weather[0].description}
              />
            </div>
            <div className="forecast-description">
              {day.weather[0].main}
            </div>
            <div className="forecast-temp">
              <span className="temp-high">{formatTemperature(day.main.temp_max)}°</span>
              <span className="temp-low">{formatTemperature(day.main.temp_min)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;