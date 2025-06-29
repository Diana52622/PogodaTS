import { useState } from 'react';

interface MemeFormProps {
  onSubmit: (formData: { category: string; image: string; text: string }) => void;
  initialFormData?: { category: string; image: string; text: string };
  formMessage: string;
}

export const MemeForm = ({ onSubmit, initialFormData, formMessage }: MemeFormProps) => {
  const [formData, setFormData] = useState(initialFormData || { 
    category: '', 
    image: '', 
    text: '' 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

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
      {formMessage && <p>{formMessage}</p>}
    </div>
  );
};