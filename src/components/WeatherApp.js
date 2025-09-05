import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/WeatherApp.css';
import WeatherCard from './WeatherCard';

const OPENWEATHER_API_KEY = '21805bff7224936fa25d6cec016a0a4b';

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('');
  const [isGeolocationAvailable, setIsGeolocationAvailable] = useState(true);
  const [isGeolocationLoading, setIsGeolocationLoading] = useState(false);

  const searchWeather = async (location, coords = null) => {
    if (!location.trim() && !coords) {
      setError('Please enter a city name or use your live location');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      let url = '';
      if (coords) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${OPENWEATHER_API_KEY}&units=metric`;
      } else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${OPENWEATHER_API_KEY}&units=metric`;
      }
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setError('Invalid API key. Please check your OpenWeather API key.');
        } else if (err.response.status === 404) {
          setError('Location not found. Please try a different city name.');
        } else {
          setError('An error occurred while fetching weather data. Please try again.');
        }
      } else {
        setError('Network error. Please check your internet connection.');
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setIsGeolocationAvailable(false);
      setError('Geolocation is not supported by your browser');
      return;
    }

    setIsGeolocationLoading(true);
    setError('');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        searchWeather('', { latitude, longitude });
        setIsGeolocationLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setError('Unable to retrieve your location');
        setIsGeolocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      searchWeather(city);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <div className="search-container">
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search for a city..."
            disabled={loading}
            aria-label="Search for a city"
          />
          <button 
            type="submit" 
            disabled={loading || !city.trim()}
            aria-label={loading ? 'Searching...' : 'Search'}
            className="search-button"
          >
            {loading ? (
              <span className="spinner" aria-hidden="true"></span>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="search-icon"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            )}
          </button>
        </form>
        <button 
          onClick={getLocation}
          disabled={isGeolocationLoading || !isGeolocationAvailable}
          className="location-button"
          aria-label="Use my current location"
        >
          {isGeolocationLoading ? (
            <span className="spinner" aria-hidden="true"></span>
          ) : (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="location-icon"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          )}
          <span className="location-text">Use My Location</span>
        </button>
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
};

export default WeatherApp;