import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError('');
    setWeather(null);

    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;  
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
      );
      
      if (!response.ok) {
        throw new Error('City not found');  
      }
      
      const data = await response.json();
      setWeather(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    }
  };

  return (
    <div className='app'>
      <h1>Weather Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder='Enter city name' 
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type='submit'>Get Weather</button>
      </form>

      {error && <p>{error}</p>}

      {weather && !error && (
        <div>
           <h2>{weather.name}</h2>
           <p>Temp: {weather.main.temp}F*</p>
           <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  )
}

export default App
