import React, { useState, useEffect } from 'react';
import "../Weather/Weather.css"

function Weather({ latitude, longitude }) {
  const [weatherData, setWeatherData] = useState();
  const [aqiData, setAQIData] = useState();
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [currentHumidity, setCurrentHumidity] = useState(null);
  const [currentPrecipitation, setCurrentPrecipitation] = useState(null);
  const [currentWindSpeed, setCurrentWindSpeed] = useState(null);
  const [currentAQI, setCurrentAQI] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,windspeed_10m&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York&past_days=7"
    )
      .then((response) => response.json())
      .then((json) => {
        setWeatherData(json);
        
        setCurrentTemperature(json.hourly.temperature_2m[0]);
        setCurrentHumidity(json.hourly.relativehumidity_2m[0]);
        setCurrentPrecipitation(json.hourly.precipitation_probability[0]);
        setCurrentWindSpeed(json.hourly.windspeed_10m[0]);
        
      });
  }, []);

  useEffect(() => {
    fetch(
      'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=40.71&longitude=-74.01&hourly=pm2_5&timezone=America%2FNew_York&past_days=7'
    )
      .then((response) => response.json())
      .then((json) => {
        setAQIData(json);
        setCurrentAQI(json.hourly.pm2_5[0]);
      });
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

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDateTime = new Date();
      const formattedTime = getDateTime(currentDateTime);
      setCurrentTime(formattedTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {weatherData && aqiData && (
        <>
          {/* Current Weather Information */}
          <h2>Current Weather:</h2>
          <p>Time: {currentTime}</p>
          <p>Temperature: {currentTemperature}°F</p>
          <p>Humidity: {currentHumidity}%</p>
          <p>Precipitation: {currentPrecipitation}%</p>
          <p>Wind Speed: {currentWindSpeed} mph</p>
          <p>AQI (PM2.5): {currentAQI}</p>

          {/* Hourly Weather Information */}
          <br></br>
          <br></br>
          <h2>Hourly Weather:</h2>
          <div className="weather-slideshow">
            {weatherData.hourly &&
              weatherData.hourly.temperature_2m &&
              weatherData.hourly.temperature_2m.map((temp, index) => {
                const weatherDateTime = weatherData.hourly.time[index];
                const aqiDateTime = aqiData.hourly.time[index];
                const dateTime = getDateTime(weatherDateTime);

                return (
                  <div key={index}className='weather-card'>
                    <p className='time'>Time: {dateTime}</p>
                    <hr></hr>
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
          </div>
          
        </>
      )}
    </>
  );
}

export default Weather;
