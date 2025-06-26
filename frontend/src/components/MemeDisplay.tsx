import { motion } from 'framer-motion';
import type { WeatherData } from '../types/weather';

export const MemeDisplay = ({ data }: { data: WeatherData }) => {
  const handleShare = () => {
    const shareUrl = `${window.location.origin}?city=${encodeURIComponent(data.city)}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Ссылка скопирована!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="meme-container"
    >
      <div className="meme-image-wrapper">
        <img 
          src={`http://localhost:5000/images/${data.meme.image}`}
          alt="Погодный мем"
          className="meme-image"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
      <p className="meme-text">{data.meme.text}</p>
      <button 
        onClick={handleShare} 
        className="share-button"
      >
        Поделиться
      </button>
    </motion.div>
  );
};