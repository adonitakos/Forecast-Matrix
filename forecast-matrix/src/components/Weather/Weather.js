// File: /src/components/TestComponents/WeatherTest.js
import React, { useState, useEffect } from 'react';

function WeatherTest({ latitude, longitude }) {
  const [weatherData, setWeatherData] = useState();
  const [aqiData, setAQIData] = useState();

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,windspeed_10m&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York&past_days=7"
    )
      .then((response) => response.json())
      .then((json) => setWeatherData(json));
  },[] );

  useEffect(() => {
    fetch(
      'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=40.71&longitude=-74.01&hourly=pm2_5&timezone=America%2FNew_York&past_days=7'
    )
      .then((response) => response.json())
      .then((json) => setAQIData(json));
  }, []);

  const getDateTime = (timeString) => {
    const date = new Date(timeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to month as it is zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${(hours % 12) || 12}:${minutes} ${meridiem}`;
    return `${formattedDate} ${formattedTime}`;
  };
  
  return (
    <>
      {weatherData && aqiData && (
        <>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
          <p>------------------------------------</p>
          {weatherData.hourly &&
            weatherData.hourly.temperature_2m &&
            weatherData.hourly.temperature_2m.map((temp, index) => {
              const weatherDateTime = weatherData.hourly.time[index];
              const aqiDateTime = aqiData.hourly.time[index];
              const dateTime = getDateTime(weatherDateTime);

              return (
                <div key={index}>
                  <p>Time: {dateTime}</p>
                  <p>Temperature: {temp}°F</p>
                  {weatherData.hourly.relativehumidity_2m && (
                    <p>
                      Relative Humidity:{' '}
                      {weatherData.hourly.relativehumidity_2m[index]}%
                    </p>
                  )}
                  {weatherData.hourly.precipitation_probability && (
                    <p>
                      Precipitation Probability:{' '}
                      {weatherData.hourly.precipitation_probability[index]}%
                    </p>
                  )}
                  {weatherData.hourly.windspeed_10m && (
                    <p>
                      Wind Speed: {weatherData.hourly.windspeed_10m[index]} mph
                    </p>
                  )}
                  {aqiData.hourly.pm2_5 && (
                    <p>AQI (PM2.5): {aqiData.hourly.pm2_5[index]}</p>
                  )}
                  <p>--------------------------------------</p>
                </div>
              );
            })}
        </>
      )}
    </>
  );
} // <--- WeatherTest() function ends here

export default WeatherTest;
