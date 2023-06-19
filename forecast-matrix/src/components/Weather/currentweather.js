import React, { useState, useEffect } from 'react';

function CurrentWeather({ latitude, longitude }) {
  const [weatherData, setWeatherData] = useState();
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [currentHumidity, setCurrentHumidity] = useState(null);
  const [currentPrecipitation, setCurrentPrecipitation] = useState(null);
  const [currentWindSpeed, setCurrentWindSpeed] = useState(null);
  const [currentAQI, setCurrentAQI] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,windspeed_10m&temperature_unit=celsius&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York`
    )
      .then((response) => response.json())
      .then((json) => {
        setWeatherData(json);
        const currentHour = new Date().getHours();
        setCurrentTemperature(json.hourly.temperature_2m[currentHour]);
        setCurrentHumidity(json.hourly.relativehumidity_2m[currentHour]);
        setCurrentPrecipitation(json.hourly.precipitation_probability[currentHour]);
        setCurrentWindSpeed(json.hourly.windspeed_10m[currentHour]);
      });
  }, [latitude, longitude]);

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/airquality?latitude=${latitude}&longitude=${longitude}&hourly=pm2_5&timezone=America%2FNew_York`
    )
      .then((response) => response.json())
      .then((json) => {
        setCurrentAQI(json.hourly.pm2_5[0]);
      });
  }, [latitude, longitude]);

  return (
    <>
      {weatherData && (
        <>
          <h2>Current Weather:</h2>
          <p>Temperature: {currentTemperature}°C</p>
          <p>Humidity: {currentHumidity}%</p>
          <p>Precipitation: {currentPrecipitation}%</p>
          <p>Wind Speed: {currentWindSpeed} mph</p>
          <p>AQI (PM2.5): {currentAQI}</p>
        </>
      )}
    </>
  );
}

export default CurrentWeather;