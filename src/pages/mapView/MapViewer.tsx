import React, { useState } from 'react';
import './MapViewer.css';
import mapImage from '../../assets/map.png';

const MapViewer: React.FC = () => {
  const [zoom, setZoom] = useState<number>(1);

  const handleZoomIn = () => setZoom(zoom + 0.1);
  const handleZoomOut = () => setZoom(zoom - 0.1 > 0.1 ? zoom - 0.1 : 0.1);

  return (
    <div className="map-container">
      <div className="map-section">
        <div className="map-zoom">
          <button onClick={handleZoomIn}>+</button>
          <button onClick={handleZoomOut}>-</button>
        </div>
        <img
          src={mapImage}
          alt="Mapa"
          style={{ transform: `scale(${zoom})`, transition: 'transform 0.2s' }}
          className="w-full h-full object-cover"
        />
      </div>
      <aside className="sidebar">
        <h3 className="text-sm font-semibold mb-4">Filtros por:</h3>
        <label>Data de:</label>
        <input type="date" />
        <label>Até:</label>
        <input type="date" />
        <label>Hora de:</label>
        <input type="time" />
        <label>Até:</label>
        <input type="time" />
        <label>Coordenadas</label>
        <input type="text" placeholder="insira coordenadas" />
        <button className="btn-clear">Limpar todos</button>
        <button className="btn-apply">Aplicar filtros</button>
      </aside>
    </div>
  );
};

export default MapViewer;