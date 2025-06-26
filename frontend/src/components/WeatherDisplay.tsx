import { motion } from 'framer-motion'
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiLightning, WiFog } from 'react-icons/wi'
import type { WeatherData } from '../types/weather'

export const WeatherDisplay = ({ data }: { data: WeatherData }) => {
  const getWeatherIcon = () => {
  const weather = data.weather.toLowerCase();
  
  if (weather.includes('дождь') || weather.includes('rain')) {
    return <WiRain size={64} />;
  }
  if (weather.includes('снег') || weather.includes('snow')) {
    return <WiSnow size={64} />;
  }
  if (weather.includes('облачно') || weather.includes('cloud')) {
    return <WiCloudy size={64} />;
  }
  if (weather.includes('пасмурно') || weather.includes('cloud')) {
    return <WiCloudy size={64} />;
  }
  if (weather.includes('гроза') || weather.includes('thunderstorm')) {
    return <WiLightning size={64} />;
  }
  if (weather.includes('туман') || weather.includes('fog') || weather.includes('mist')) {
    return <WiFog size={64} />;
  }
  return <WiDaySunny size={64} />;
};

  const tempVariant = data.temperature > 25 ? 'hot' : 
                     data.temperature < 5 ? 'cold' : 'normal'

  return (
    <motion.div 
      key={data.city}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
      duration: 0.6}}
    className="weather-card"
    >
      <h2>{data.city}</h2>
      <div className="weather-icon-container">
        {getWeatherIcon()}
        <motion.p
          className="temperature"
          animate={tempVariant}
          variants={{
            hot: { 
              rotate: [0, -15, 15, -15, 15, -15, 0], // Увеличенный размах
              transition: {
              duration: 0.8, // Более быстрая анимация
              repeat: 3,
              repeatType: "mirror", // Зеркальное повторение
              ease: "easeInOut"
              } 
            },
            cold: { 
              rotate: [0, 10, -10, 10, -10, 10, 0],
      transition: {
        duration: 0.6, // Ещё быстрее
              repeat: 5, // Больше повторений
              ease: "easeOut" // Резкое начало
            }
            },
            normal: { rotate: 0 }
          }}
        >
          {Math.round(data.temperature)}°C
        </motion.p>
      </div>
      <p className="weather-description">{data.weather}</p>
    </motion.div>
  );
};