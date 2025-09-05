import React from 'react';
import '../styles/WeatherCard.css';

// Weather Icons mapping for better visual consistency
const weatherIcons = {
  '01d': '☀️', '01n': '🌙',
  '02d': '⛅', '02n': '☁️',
  '03d': '☁️', '03n': '☁️',
  '04d': '☁️', '04n': '☁️',
  '09d': '🌧️', '09n': '🌧️',
  '10d': '🌦️', '10n': '🌧️',
  '11d': '⛈️', '11n': '⛈️',
  '13d': '❄️', '13n': '❄️',
  '50d': '🌫️', '50n': '🌫️'
};

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const getFormattedDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const getWindDirection = (degrees) => {
    const directions = ['↓ N', '↙ NNE', '↙ NE', '↗ ENE', '→ E', '↘ ESE', '↘ SE', '↓ SSE', '↓ S', '↙ SSW', '↙ SW', '↗ WSW', '← W', '↖ WNW', '↖ NW', '↑ NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  const getSunTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getHumidityLevel = (humidity) => {
    if (humidity < 30) return 'Low';
    if (humidity < 70) return 'Moderate';
    return 'High';
  };

  const getPressureLevel = (pressure) => {
    if (pressure < 1000) return 'Low';
    if (pressure < 1020) return 'Normal';
    return 'High';
  };

  return (
    <div className="weather-card">
      <div className="weather-location">
        <h2>{weather.name}, {weather.sys.country}</h2>
        <span className="date">{getFormattedDate(weather.dt)}</span>
      </div>
      
      <div className="weather-main">
        <div className="weather-temp">
          <div className="temp-main">
            <span className="temp-value">{Math.round(weather.main.temp)}</span>
            <span className="temp-unit">°C</span>
          </div>
          <p className="weather-description">
            {weather.weather[0].description}
          </p>
          <div className="temp-minmax">
            <span className="high">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 18a5 5 0 0 0-10 0"/>
                <line x1="12" y1="9" x2="12" y2="2"/>
                <line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/>
                <line x1="1" y1="18" x2="3" y2="18"/>
                <line x1="21" y1="18" x2="23" y2="18"/>
                <line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/>
                <line x1="23" y1="22" x2="1" y2="22"/>
              </svg>
              {Math.round(weather.main.temp_max)}°
            </span>
            <span className="low">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 18a5 5 0 0 0-10 0"/>
                <line x1="12" y1="2" x2="12" y2="9"/>
                <line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/>
                <line x1="1" y1="18" x2="3" y2="18"/>
                <line x1="21" y1="18" x2="23" y2="18"/>
                <line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/>
                <line x1="23" y1="22" x2="1" y2="22"/>
              </svg>
              {Math.round(weather.main.temp_min)}°
            </span>
          </div>
          <p className="feels-like">
            Feels like {Math.round(weather.main.feels_like)}°C
          </p>
        </div>
        
        <div className="weather-icon-container">
          <img 
            className="weather-icon"
            src={getWeatherIcon(weather.weather[0].icon)} 
            alt={weather.weather[0].description}
            title={weather.weather[0].description}
            loading="lazy"
          />
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
            </svg>
            {weather.main.humidity}% <small>({getHumidityLevel(weather.main.humidity)})</small>
          </span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Wind</span>
          <span className="detail-value">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
            </svg>
            {weather.wind.speed} m/s
            <small>({getWindDirection(weather.wind.deg)})</small>
          </span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M16 12l-4 4-4-4M12 8v8"/>
            </svg>
            {weather.main.pressure} hPa
            <small>({getPressureLevel(weather.main.pressure)})</small>
          </span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Visibility</span>
          <span className="detail-value">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {(weather.visibility / 1000).toFixed(1)} km
          </span>
        </div>
        
        {weather.rain && (
          <div className="detail-item">
            <span className="detail-label">Rain (1h)</span>
            <span className="detail-value">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="19" x2="8" y2="21"/>
                <line x1="8" y1="13" x2="8" y2="15"/>
                <line x1="16" y1="19" x2="16" y2="21"/>
                <line x1="16" y1="13" x2="16" y2="15"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="12" y1="15" x2="12" y2="17"/>
                <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/>
              </svg>
              {weather.rain['1h'] ? `${weather.rain['1h']} mm` : '0 mm'}
            </span>
          </div>
        )}
        
        <div className="detail-item">
          <span className="detail-label">Sunrise</span>
          <span className="detail-value">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            {getSunTime(weather.sys.sunrise)}
          </span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Sunset</span>
          <span className="detail-value">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            {getSunTime(weather.sys.sunset)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;