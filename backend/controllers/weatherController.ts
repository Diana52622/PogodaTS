import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { Request, Response } from 'express';
import cache from "memory-cache";;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const memesPath = path.resolve(__dirname, '../data/memes.json');

const WEATHER_CACHE_DURATION = 15 * 60 * 1000;

interface Meme {
    image: string;
    text: string;
}

interface WeatherData {
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
    };
    weather: Array<{
        main: string;
        description: string;
        icon: string;
    }>;
    name: string;
}

interface WeatherResponse {
    city: string;
    temperature: number;
    weather: string;
    weatherIcon: string;
    feelsLike: number;
    humidity: number;
    meme: Meme;
    cached?: boolean;
}

export const getWeather = async (req: Request, res: Response): Promise<Response> => {
    const city = req.query.city as string;
    const API_KEY = process.env.OPENWEATHER_API_KEY;

    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    if (!API_KEY) {
        return res.status(500).json({ error: 'Server configuration error' });
    }

    const cacheKey = `weather_${city.toLowerCase()}`;
    const cachedWeather = cache.get(cacheKey);
    
    if (cachedWeather) {
        return res.json({ ...cachedWeather, cached: true });
    }

    try {
        const [weatherResponse, memesData] = await Promise.all([
            axios.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    q: city,
                    appid: API_KEY,
                    units: 'metric',
                    lang: 'ru'
                },
                timeout: 5000
            }),
            fs.readFile(memesPath, 'utf8')
        ]);

        const temperature = weatherResponse.data.main.temp;
        const weatherMain = weatherResponse.data.weather[0].main.toLowerCase();
        const memes: Record<string, Meme[]> = JSON.parse(memesData);

        const category = 
            ['rain', 'snow', 'thunderstorm'].includes(weatherMain) ? weatherMain :
            temperature < 0 ? 'cold' :
            temperature <= 15 ? 'normal' :
            temperature <= 25 ? 'warm' : 'hot';

        const categoryMemes = memes[category];
        if (!categoryMemes?.length) {
            return res.status(404).json({ error: 'No memes found for this weather condition' });
        }

        const randomMeme = categoryMemes[Math.floor(Math.random() * categoryMemes.length)];

        const response: WeatherResponse = {
            city: weatherResponse.data.name,
            temperature,
            weather: weatherResponse.data.weather[0].description,
            weatherIcon: `https://openweathermap.org/img/wn/${weatherResponse.data.weather[0].icon}@2x.png`,
            feelsLike: weatherResponse.data.main.feels_like,
            humidity: weatherResponse.data.main.humidity,
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