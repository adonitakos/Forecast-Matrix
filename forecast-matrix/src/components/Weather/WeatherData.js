//Used to get long at lat from Searchbar to weather
export async function WeatherData(latitude, longitude) {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=40.76&longitude=-73.59&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,windspeed_10m&daily=temperature_2m_max,apparent_temperature_max,uv_index_max,precipitation_probability_max,windspeed_10m_max&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&past_days=7&timezone=America%2FNew_York`
    );
    const json = await response.json();
    return json;
  }
  
  export async function fetchAQIData(latitude, longitude) {
    const response = await fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=pm2_5&timezone=America%2FNew_York&past_days=7`
    );
    const json = await response.json();
    return json;
  }