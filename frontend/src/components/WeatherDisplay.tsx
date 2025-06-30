import { motion } from 'framer-motion';
import { getWeatherIconComponent } from '../utils/weatherIcons';
import type { WeatherData } from '../types/weather';

interface WeatherDisplayProps {
  data: WeatherData;
}

export const WeatherDisplay = ({ data }: WeatherDisplayProps) => {
  const WeatherIcon = getWeatherIconComponent(data);
  const tempVariant = data.temperature > 25 ? 'hot' : 
                     data.temperature < 5 ? 'cold' : 'normal';

  return (
    <motion.div 
      key={data.city}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="weather-card"
    >
      <h2>{data.city}</h2>
      <div className="weather-icon-container">
        <WeatherIcon size={64} />
        <motion.p
          className="temperature"
          animate={tempVariant}
          variants={{
            hot: {
              x: [0, -0.5, 0.5, -0.3, 0.3, -0.2, 0], 
              y: [0, 0.3, -0.2, 0.4, -0.3, 0.2, 0],
              transition: {
                duration: 0.4,
                repeat: Infinity,
                repeatType: "mirror"
              }
            },
            cold: {
              rotate: [0, 0.3, -0.2, 0.4, -0.3, 0.2, 0], 
              transition: {
                duration: 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        >
          {Math.round(data.temperature)}°C
        </motion.p>
      </div>
      <p className="weather-description">{data.weather}</p>
    </motion.div>
  );
};