// File: /src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// Pages
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/ErrorPage';
import TestPage from './pages/TestPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<ErrorPage/>} />
        <Route path="/testpage" element={<TestPage/>} />
      </Routes>
    </Router>
  );
} // <--- App() function ends here

export default App;

