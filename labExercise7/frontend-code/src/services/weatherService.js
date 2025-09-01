import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

class WeatherService {
  async getCurrentWeather(city) {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric'
        }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('City not found');
      } else if (error.response?.status === 401) {
        throw new Error('Invalid API key');
      } else {
        throw new Error('Failed to fetch weather data');
      }
    }
  }

  async getWeatherForecast(city) {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric'
        }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('City not found');
      } else if (error.response?.status === 401) {
        throw new Error('Invalid API key');
      } else {
        throw new Error('Failed to fetch forecast data');
      }
    }
  }

  getWeatherIconUrl(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
}

export default new WeatherService();