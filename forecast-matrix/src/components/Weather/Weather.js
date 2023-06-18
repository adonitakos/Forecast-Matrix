import React, { useState, useEffect } from 'react';
import { WeatherData, fetchAQIData } from '../Weather/WeatherData';

export default function Weather({ latitude, longitude }) {
  const [weatherData, setWeatherData] = useState();
  const [aqiData, setAQIData] = useState();
  const [humidity, setHumidity] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const weatherData = await WeatherData(latitude, longitude);
      const aqiData = await fetchAQIData(latitude, longitude);
      setWeatherData(weatherData);
      setAQIData(aqiData);
      if (weatherData && weatherData.hourly && weatherData.hourly.relativehumidity_2m) {
        setHumidity(weatherData.hourly.relativehumidity_2m);
      }
    };

    fetchData();
  }, [latitude, longitude]);

  const getDateTime = (timeString) => {
    const date = new Date(timeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
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
          <p>Latitude: {weatherData.latitude}</p>
          <p>Longitude: {weatherData.longitude}</p>
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
}
