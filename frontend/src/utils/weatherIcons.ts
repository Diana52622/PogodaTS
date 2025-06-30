import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiLightning, WiFog } from 'react-icons/wi';
import type { WeatherData } from '../types/weather';

export const getWeatherIconComponent = (weatherData: WeatherData) => {
  const weather = weatherData.weather.toLowerCase();
  
  if (weather.includes('дождь') || weather.includes('rain')) return WiRain;
  if (weather.includes('снег') || weather.includes('snow')) return WiSnow;
  if (weather.includes('облачно') || weather.includes('cloud')) return WiCloudy;
  if (weather.includes('пасмурно') || weather.includes('cloud')) return WiCloudy;
  if (weather.includes('гроза') || weather.includes('thunderstorm')) return WiLightning;
  if (weather.includes('туман') || weather.includes('fog') || weather.includes('mist')) return WiFog;
  
  return WiDaySunny;
};