import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { WeatherData } from '../types/weather';

export const useWeather = () => {
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
      const apiUrl = (import.meta as unknown as { env: { VITE_API_URL: string } }).env.VITE_API_URL;
      const response = await axios.get(`${apiUrl}/weather?city=${encodeURIComponent(city)}`
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

  return {
    weatherData,
    loading,
    error,
    urlCity,
    fetchWeather
  };
};