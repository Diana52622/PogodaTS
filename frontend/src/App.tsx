import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SearchBar } from './components/SearchBar';
import { WeatherDisplay } from './components/WeatherDisplay';
import { MemeDisplay } from './components/MemeDisplay';
import './App.css';
import { Link } from 'react-router-dom';

interface WeatherData {
  city: string;
  temperature: number;
  weather: string;
  weatherIcon: string;
  feelsLike: number;
  humidity: number;
  meme: {
    image: string;
    text: string;
  };
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const urlCity = searchParams.get('city');

  const fetchWeather = useCallback(async (city: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `http://localhost:5000/weather?city=${encodeURIComponent(city)}`
      );
      setWeatherData(response.data);
      navigate(`?city=${encodeURIComponent(city)}`, { replace: true });
    } catch (error) {
      let errorMessage = 'Не удалось получить данные о погоде';
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          errorMessage = 'Город не найден';
        } else if (error.code === 'ECONNABORTED') {
          errorMessage = 'Превышено время ожидания сервера';
        }
      }
      
      setError(errorMessage);
      console.error('Ошибка при запросе погоды:', error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (urlCity) {
      fetchWeather(urlCity);
    }
  }, [urlCity, fetchWeather]);

  return (
    <div className="app">
      <h1>Погода - непогода</h1>
      <SearchBar onSearch={fetchWeather} initialCity={urlCity || ''} />
      
      {loading && <div className="loading">Загрузка...</div>}
      {error && <div className="error">{error}</div>}
      
      <div className="content">
        {weatherData && (
          <>
            <WeatherDisplay data={weatherData} />
            <MemeDisplay data={weatherData} />
          </>
        )}
      </div>
      <Link to="/admin" className="admin-button">
        Админ-панель
      </Link>
    </div>
  );
}

export default App;