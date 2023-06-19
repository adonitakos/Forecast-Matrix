import React, { useState } from 'react';
import Searchbar from '../components/SearchBar/Searchbar';
import News from '../components/News/News';
import "./Dashboard.css"
import "../components/TestComponents/WeatherCard.css"
import WeatherCard from '../components/TestComponents/WeatherCard';
import Weather from '../components/Weather/Weather';
import { WeatherData, fetchAQIData } from '../components/Weather/WeatherData';

export default function Forecast() {
  const [selectedCity, setSelectedCity] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [showWeatherCard, setShowWeatherCard] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [aqiData, setAQIData] = useState(null);
  const [currentTemperature, setCurrentTemperature] = useState(null);

  const handleCitySelection = async (city, lat, lon) => {
    setSelectedCity(city);
    setLatitude(lat);
    setLongitude(lon);
    setShowWeatherCard(true);
    const weatherData = await WeatherData(lat, lon);
    const aqiData = await fetchAQIData(lat, lon);
    console.log(weatherData);
    console.log(aqiData);
    setWeatherData(weatherData);
    setAQIData(aqiData);
    setCurrentTemperature(weatherData?.hourly?.temperature_2m[0]);
    //setHumidity(humidity);
  };

  return (
    <div className="dashboard-container">
      <h1 className='dashboard-heading'>Dashboard</h1>
      <Searchbar onCitySelect={handleCitySelection} />

      {showWeatherCard && selectedCity && latitude && longitude && (
        <div className="content-container">
          <div className='WeatherCard'>
            {weatherData && weatherData.hourly && (
              <WeatherCard
                city={selectedCity}
                humidity={parseFloat(weatherData.hourly.relativehumidity_2m).toFixed(1)}
                windspeed={parseFloat(weatherData.hourly.windspeed_10m).toFixed(1)}
                aqi={parseFloat(aqiData && aqiData.hourly && aqiData.hourly.pm2_5).toFixed(2)}
                precipitation={parseFloat(weatherData.hourly.precipitation_probability).toFixed(2)}
                realfeel={parseFloat(weatherData.hourly.apparent_temperature)}
                temperature={parseFloat(weatherData.hourly.temperature_2m).toFixed(2)}
              />
            )}
          </div>

          <div className="weather-container">
            {weatherData && (
              <Weather
                latitude={latitude}
                longitude={longitude}
                setCurrentTemperature={setCurrentTemperature}
              />
            )}
          </div>
        </div>
      )}

      {selectedCity && (
        <div className="news-container">
          <News selectedCity={selectedCity} />
        </div>
      )}
    </div>
  );
}
