import { SearchBar } from './components/SearchBar';
import { WeatherDisplay } from './components/WeatherDisplay';
import { MemeDisplay } from './components/MemeDisplay';
import { Link } from 'react-router-dom';
import { useWeather } from './hooks/useWeather';
import './App.css';

function App() {
  const { weatherData, loading, error, urlCity, fetchWeather } = useWeather();

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