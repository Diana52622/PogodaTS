import axios from 'axios';
import { Request, Response } from 'express';
import cache from 'memory-cache';
import { WEATHER_CACHE_DURATION, WEATHER_API_TIMEOUT, WEATHER_API_BASE_URL, WEATHER_ICON_BASE_URL} from '../constants/weather.constants.js';
import { readMemesFile, getRandomMeme } from '../utils/meme.utils.js';
import { getWeatherCategory } from '../utils/weather.utils.js';
import { WeatherData, WeatherResponse } from '../types/types.js';

export const getWeather = async (req: Request, res: Response): Promise<Response> => {
    const city = req.query.city as string;
    const API_KEY = process.env.OPENWEATHER_API_KEY;

    if (!city) return res.status(400).json({ error: 'City parameter is required' });
    if (!API_KEY) return res.status(500).json({ error: 'Server configuration error' });

    const cacheKey = `weather_${city.toLowerCase()}`;
    const cachedWeather = cache.get(cacheKey);
    if (cachedWeather) return res.json({ ...cachedWeather, cached: true });

    try {
        const [weatherResponse, memes] = await Promise.all([
            axios.get<WeatherData>(WEATHER_API_BASE_URL, {
                params: {
                    q: city,
                    appid: API_KEY,
                    units: 'metric',
                    lang: 'ru'
                },
                timeout: WEATHER_API_TIMEOUT
            }),
            readMemesFile()
        ]);

        const { data } = weatherResponse;
        const category = getWeatherCategory(data.weather[0].main.toLowerCase(), data.main.temp);
        const randomMeme = getRandomMeme(memes, category);

        if (!randomMeme) {
            return res.status(404).json({ error: 'No memes found for this weather condition' });
        }

        const response: WeatherResponse = {
            city: data.name,
            temperature: data.main.temp,
            weather: data.weather[0].description,
            weatherIcon: `${WEATHER_ICON_BASE_URL}/${data.weather[0].icon}@2x.png`,
            feelsLike: data.main.feels_like,
            humidity: data.main.humidity,
            meme: randomMeme
        };

        cache.put(cacheKey, response, WEATHER_CACHE_DURATION);
        return res.json(response);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                return res.status(404).json({ error: 'City not found' });
            }
            if (error.code === 'ECONNABORTED') {
                return res.status(504).json({ error: 'Weather service timeout' });
            }
        }
        console.error('Error fetching weather data:', error);
        return res.status(500).json({ error: 'Error fetching weather data' });
    }
};