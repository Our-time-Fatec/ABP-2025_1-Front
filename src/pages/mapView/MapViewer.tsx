import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MapViewer.css";
import logoImage from "../../assets/logo.png";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapViewer: React.FC = () => {
  const saoPauloCoords: [number, number] = [-23.55052, -46.633308];

  return (
    <div className="container">
      <div className="top-bar">
        <img src={logoImage} alt="Logo" className="logo" />
      </div>

      <div className="map-container">
        <div className="map-section">
          <div className="map">
            <MapContainer
              center={saoPauloCoords}
              zoom={10}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={saoPauloCoords}>
                <Popup>São Paulo, SP</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        <aside className="sidebar">
          <h3 className="mb-4 font-semibold text-sm">Filtros por:</h3>
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
    </div>
  );
};

export default MapViewer;
