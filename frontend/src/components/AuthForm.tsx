import { useState } from 'react';

interface AuthFormProps {
  onAuthSubmit: (password: string) => void;
  authMessage: string;
}

export const AuthForm = ({ onAuthSubmit, authMessage }: AuthFormProps) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuthSubmit(password);
  };

  return (
    <div className="admin-auth">
      <h2>Введите пароль</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Войти</button>
      </form>
      {authMessage && <p className="error-message">{authMessage}</p>}
    </div>
  );
};