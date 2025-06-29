import { useState } from 'react';
import axios from 'axios';
import { AuthForm } from './AuthForm';
import { MemeForm } from './MemeForm';
import './Admin.css';

export const AdminPanel = () => {
  const [formMessage, setFormMessage] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = async (formData: { category: string; image: string; text: string }) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/memes`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setFormMessage('Мем успешно добавлен!');
      return { category: '', image: '', text: '' };
    } catch (error) {
      setFormMessage('Ошибка при добавлении мема');
      console.error(error);
      return null;
    }
  };

  const handleAuth = (password: string) => {
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthMessage('');
      return true;
    } else {
      setAuthMessage('Неверный пароль');
      return false;
    }
  };

  if (!isAuthenticated) {
    return <AuthForm onAuthSubmit={handleAuth} authMessage={authMessage} />;
  }

  return <MemeForm onSubmit={handleSubmit} formMessage={formMessage} />;
};