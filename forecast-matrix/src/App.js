// File: /src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// Pages
import ErrorPage from './pages/ErrorPage';
import News from './components/News/News';

import Forecast from './pages/Forecast';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<ErrorPage/>} />
        <Route path="/news" element={<News/>} />
        
        <Route path="/forecast" element={<Forecast/>} />
        <Route path="/dashboard" element={<Dashboard/>} />


      </Routes>
    </Router>
  );
} // <--- App() function ends here

export default App;

