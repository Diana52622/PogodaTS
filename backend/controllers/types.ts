export interface Meme {
    image: string;
    text: string;
}

export interface MemesData {
    [key: string]: Meme[];
}

export interface WeatherData {
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

export interface WeatherResponse {
    city: string;
    temperature: number;
    weather: string;
    weatherIcon: string;
    feelsLike: number;
    humidity: number;
    meme: Meme;
    cached?: boolean;
}