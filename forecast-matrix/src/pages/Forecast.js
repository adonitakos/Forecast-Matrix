// File: /src/pages/Forecast.js
import React, { useState } from 'react';
import Searchbar from '../components/SearchBar/Searchbar';
import News from '../components/News/News';
import "./Dashboard.css"

export default function Forecast() {
  
  const [selectedCity, setSelectedCity] = useState('');

  const handleCitySelection = (city) => {
    setSelectedCity(city);
  };

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
      <h1 className='Dashboard Heading'>Dashboard</h1>
      <Searchbar onCitySelect={handleCitySelection} />
      <News selectedCity={selectedCity} />
    </div>
  );

} // <--- Forecast() function ends here    