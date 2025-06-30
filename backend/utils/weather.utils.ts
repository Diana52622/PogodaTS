export const getWeatherCategory = (weatherMain: string, temperature: number): string => {
  if (['rain', 'snow', 'thunderstorm'].includes(weatherMain)) {
    return weatherMain;
  }
  if (temperature < 0) return 'cold';
  if (temperature <= 15) return 'normal';
  if (temperature <= 25) return 'warm';
  return 'hot';
};