import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/login';
import MapViewer from './pages/mapView/MapViewer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mapa" element={<MapViewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
