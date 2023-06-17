import React, { useState } from 'react';
import Searchbar from '../components/SearchBar/Searchbar';
import News from '../components/News/News';
import "./Dashboard.css"

export default function Forecast() {
    const [selectedCity, setSelectedCity] = useState('');
  
    const handleCitySelection = (city) => {
      setSelectedCity(city);
    };
  
    return (
      <div className="dashboard-container">
        <h1 className='Dashboard Heading'>Dashboard</h1>
        <Searchbar onCitySelect={handleCitySelection} />
        <News selectedCity={selectedCity} />
      </div>
    );
  }