// File: /src/pages/Dashboard.jsx
import React from 'react';

// const meteoURL = 'https://api.open-meteo.com/v1/forecast?latitude=40.76&longitude=-73.93&hourly=temperature_2m,precipitation_probability,windspeed_10m&daily=sunrise,sunset&temperature_unit=fahrenheit&windspeed_unit=mph&past_days=7&timezone=America%2FNew_York'

function Dashboard() {

  return (
    <>
      <h1 style={{textAlign:'center', fontSize:'50px'}}>DASHBOARD</h1>

      <div className="search-bar" style={{marginLeft:'auto', marginRight:'auto'}}>
        <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
        <input placeholder="Search" type="search" className="input" />
      </div>

    
    <style>{`
    .search-bar {
      display: flex;
      line-height: 28px;
      align-items: center;
      position: relative;
      max-width: 350px;
     }
     
     .input {
      width: 100%;
      height: 40px;
      line-height: 28px;
      padding: 0 1rem;
      padding-left: 2.5rem;
      border: 2px solid transparent;
      border-radius: 8px;
      outline: none;
      background-color: #f3f3f4;
      color: #0d0c22;
      transition: .3s ease;
     }
       
     .input::placeholder {
      color: #9e9ea7;
     }
     
     .input:focus, input:hover {
      outline: none;
      border-color: rgba(234,76,137,0.4);
      background-color: #fff;
      box-shadow: 0 0 0 4px rgb(234 76 137 / 10%);
     }
     
     .icon { 
      position: absolute;
      left: 1rem;
      fill: #9e9ea7;
      width: 1rem;
      height: 1rem;
     }
    `}</style>

    </>
  )
} // <--- Dashboard() function ends here

export default Dashboard;