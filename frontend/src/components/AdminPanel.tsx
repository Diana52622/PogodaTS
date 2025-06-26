import { useState } from 'react';
import axios from 'axios';
import './Admin.css';

export const AdminPanel = () => {
  const [formData, setFormData] = useState({
    category: '',
    image: '',
    text: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/memes', formData);
      setMessage('Мем успешно добавлен!');
      setFormData({ category: '', image: '', text: '' });
    } catch (error) {
      setMessage('Ошибка при добавлении мема');
      console.error(error);
    }
  };

const [password, setPassword] = useState('');
const [isAuthenticated, setIsAuthenticated] = useState(false);

const handleAuth = (e: React.FormEvent) => {
  e.preventDefault();
  if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
    setIsAuthenticated(true);
  } else {
    setMessage('Неверный пароль');
  }
};

if (!isAuthenticated) {
  return (
    <div className="admin-auth">
      <h2>Введите пароль администратора</h2>
      <form onSubmit={handleAuth}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Войти</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

  return (
    <div className="admin-panel">
      <h2>Добавить новый мем</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Категория:</label>
          <select 
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            required
          >
            <option value="">Выберите категорию</option>
            <option value="hot">Горячо</option>
            <option value="warm">Тепло</option>
            <option value="cold">Холодно</option>
            <option value="normal">Нормально</option>
            <option value="rain">Дождь</option>
            <option value="snow">Снег</option>
            <option value="thunderstorm">Гроза</option>
          </select>
        </div>
        <div>
          <label>Имя файла изображения:</label>
          <input 
            type="text" 
            value={formData.image}
            onChange={(e) => setFormData({...formData, image: e.target.value})}
            required
          />
        </div>
        <div>
          <label>Текст мема:</label>
          <textarea 
            value={formData.text}
            onChange={(e) => setFormData({...formData, text: e.target.value})}
            required
          />
        </div>
        <button type="submit">Добавить мем</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};