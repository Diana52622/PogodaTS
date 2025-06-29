export interface WeatherData {
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

export interface AuthFormProps {
  onAuthSubmit: (password: string) => void;
  authMessage: string;
}

export interface SearchBarProps {
  onSearch: (city: string) => Promise<void>
  initialCity?: string
}

export interface MemeFormProps {
  onSubmit: (formData: { category: string; image: string; text: string }) => void;
  initialFormData?: { category: string; image: string; text: string };
  formMessage: string;
}