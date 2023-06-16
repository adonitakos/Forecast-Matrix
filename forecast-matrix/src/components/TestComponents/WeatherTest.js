// File: /src/components/TestComponents/WeatherTest.js
import React, { useState, useEffect } from 'react';

function WeatherTest() {
  const [weatherData, setWeatherData] = useState();
  const [aqiData, setAQIData] = useState();

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,windspeed_10m&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York&past_days=7"
    )
      .then((response) => response.json())
      .then((json) => setWeatherData(json));
  }, []);

  useEffect(() => {
    fetch(
      'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=40.71&longitude=-74.01&hourly=pm2_5&timezone=America%2FNew_York&past_days=7'
    )
      .then((response) => response.json())
      .then((json) => setAQIData(json));
  }, []);

  const getDateTime = (timeString) => {
    const date = new Date(timeString);
    const options = {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return date.toLocaleString('en-US', options);
  };

  return (
    <>
      {weatherData && aqiData && (
        <>
          <p>Latitude: {weatherData.latitude}</p>
          <p>Longitude: {weatherData.longitude}</p>
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
