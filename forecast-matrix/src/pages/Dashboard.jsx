// File: /src/pages/Dashboard.jsx
import React from 'react';
import Searchbar from '../components/SearchBar/Searchbar';
import WeatherCard from '../components/TestComponents/WeatherCard';

function Dashboard() {

  return (
    <>
      <h1 style={{textAlign:'center', fontSize:'50px'}}>DASHBOARD</h1>
      <Searchbar />
      <WeatherCard />

    </>
  )
} // <--- Dashboard() function ends here

export default Dashboard;