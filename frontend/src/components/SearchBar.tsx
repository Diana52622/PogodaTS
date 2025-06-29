import { useState } from 'react'
import type { SearchBarProps } from '../types/weather';

export const SearchBar = ({ onSearch, initialCity = '' }: SearchBarProps) => {
  const [city, setCity] = useState(initialCity)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim()) await onSearch(city)
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Введите город"
      />
      <button type="submit">Узнать погоду</button>
    </form>
  )
}