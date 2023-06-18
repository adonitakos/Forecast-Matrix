// Used to get latitude and longitude from Searchbar to Weather
export async function WeatherData(latitude, longitude) {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,windspeed_10m&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York&past_days=7`
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