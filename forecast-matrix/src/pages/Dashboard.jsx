// File: /src/pages/Dashboard.jsx
import React from 'react';
import Searchbar from '../components/SearchBar/Searchbar';

// const meteoURL = 'https://api.open-meteo.com/v1/forecast?latitude=40.76&longitude=-73.93&hourly=temperature_2m,precipitation_probability,windspeed_10m&daily=sunrise,sunset&temperature_unit=fahrenheit&windspeed_unit=mph&past_days=7&timezone=America%2FNew_York'

function Dashboard() {

  return (
    <>
      <h1 style={{textAlign:'center', fontSize:'50px'}}>DASHBOARD</h1>
      <Searchbar />
   

    </>
  )
} // <--- Dashboard() function ends here

export default Dashboard;