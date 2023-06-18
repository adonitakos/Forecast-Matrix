// File: /src/pages/Forecast.js
import React, { useState } from 'react';
import Searchbar from '../components/SearchBar/Searchbar';
import News from '../components/News/News';
import "./Dashboard.css"
import "../components/Weather/WeatherCard.css"
import WeatherCard from '../components/Weather/WeatherCard';
import Weather from '../components/Weather/Weather';
import { WeatherData, fetchAQIData } from '../components/Weather/WeatherData';

export default function Forecast() {
  // State Variables:
  const [selectedCity, setSelectedCity] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [showWeatherCard, setShowWeatherCard] = useState(false);
  const [humidity, setHumidity] = useState('');
  const [windspeed, setWindspeed] = useState('');

  const handleCitySelection = async(city, lat,lon) => {
    setSelectedCity(city);
    setLatitude(lat); 
    setLongitude(lon);
    setShowWeatherCard(true);
    const weatherData = await WeatherData(lat, lon);
    const aqiData = await fetchAQIData(lat, lon);
    console.log(weatherData);
    console.log(aqiData);
    const pm2_5Values = weatherData.hourly.pm2_5;//Humidity
    setWindspeed(weatherData.hourly.windspeed_10m);
    //setHumidity(humidity);
  }; // <--- handleCitySelection() async function ends here

  // Get the CURRENT Data & Time of the user
  const getCurrentDT = () => {
    // Create a new Date object
    const currentDate = new Date();
    // Get the current date and time components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add leading zero and convert to string
    const day = String(currentDate.getDate()).padStart(2, '0'); // Add leading zero and convert to string
    const hour = String(currentDate.getHours()).padStart(2, '0'); // Add leading zero and convert to string

    // Determine if it's AM or PM
    const amOrPm = hour >= 12 ? 'PM' : 'AM';

    // Convert hour from 24-hour format to 12-hour format
    if (hour > 12) {
      hour = hour % 12;
    } else if (hour === 0) {
      hour = 12;
    }

    // Output the current date, time, and AM/PM indicator
    console.log(`Current date: ${year}-${month}-${day}`);
    console.log(`Current time: ${hour}:00 ${amOrPm}`);

    const date = `${year}-${month}-${day}`;
    const time = `${hour}:00 ${amOrPm}`
    const full_dt = `${date} ${time}`

    return full_dt;

  } // <--- getCurrentDT() function ends here

  return (
    <div className="dashboard-container">
      <h1 className='dashboard-heading'>Dashboard</h1>
      <Searchbar onCitySelect={handleCitySelection} />

      <div className="content-container">
        {showWeatherCard && <WeatherCard city={selectedCity} humidity={humidity} windspeed={windspeed}/>}
        <div div className="content-container">
            <div className='WeatherCard'>
                {showWeatherCard && weatherData && weatherData.hourly && (
                  <WeatherCard 
                    city={selectedCity} 
                    humidity={weatherData.hourly.relativehumidity_2m} 
                    windspeed={weatherData.hourly.windspeed_10m} 
                    aqi={parseFloat(aqiData && aqiData.hourly && aqiData.hourly.pm2_5).toFixed(2)}
                    temperature={parseFloat(weatherData.hourly.temperature_2m).toFixed(2)}                
                  />
                )}     
            </div>
          
        <div className="weather-container">
          <Weather latitude={latitude} longitude={longitude} />
        </div>
      </div>

      <div className="news-container">
        <News selectedCity={selectedCity} />
      </div>
    </div>
  );

} // <--- Forecast() function ends here    