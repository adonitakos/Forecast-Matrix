// File: /src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// Pages
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/ErrorPage';
import TestPage from './pages/TestPage'
import News from './components/News/News';

import Forecast from './pages/Forecast';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<ErrorPage/>} />
        <Route path="/testpage" element={<TestPage/>} />
        <Route path="/news" element={<News/>} />
        
        <Route path="/forecast" element={<Forecast/>} />


      </Routes>
    </Router>
  );
} // <--- App() function ends here

export default App;

