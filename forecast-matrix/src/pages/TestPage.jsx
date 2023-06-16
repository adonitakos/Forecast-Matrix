import React from 'react';
import WeatherTest from '../components/TestComponents/WeatherTest';
import NewsTest from '../components/TestComponents/NewsTest';

function TestPage() {
  return (
    <>
        <h1 style={{textAlign:'center', textDecoration:'underline'}}>OPENMETEO WEATHER TEST</h1>
        <WeatherTest />
        <br /><br />
        <h1 style={{textAlign:'center', textDecoration:'underline'}}>NEWSAPI TEST</h1>
        <NewsTest />
    </>
  );
} // <--- TestPage() function ends here

export default TestPage;