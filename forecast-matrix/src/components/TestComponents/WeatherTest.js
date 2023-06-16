import React, { useState, useEffect } from 'react';

function WeatherTest() {
  const [data, setData] = useState();

  let latitude = 40.77
  let longitude = -73.99

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,windspeed_10m&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&past_days=7`
    )
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return (
    <>
      {data && (
        <>
          <p>Latitude: {data.latitude}</p>
          <p>Longitude: {data.longitude}</p>
          {data.hourly &&
            data.hourly.temperature_2m &&
            data.hourly.temperature_2m.map((temp, index) => (
              <div key={index}>
                <p>Hour: {index}</p>
                <p>Temperature: {temp}°F</p>
                {data.hourly.relativehumidity_2m && (
                  <p>
                    Relative Humidity:{' '}
                    {data.hourly.relativehumidity_2m[index]}%
                  </p>
                )}
                {data.hourly.precipitation_probability && (
                  <p>
                    Precipitation Probability:{' '}
                    {data.hourly.precipitation_probability[index]}%
                  </p>
                )}
                {data.hourly.windspeed_10m && (
                  <p>
                    Wind Speed: {data.hourly.windspeed_10m[index]} mph
                  </p>
                )}
              </div>
            ))}
        </>
      )}
    </>
  );
}

export default WeatherTest;