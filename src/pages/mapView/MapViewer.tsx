import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Polygon,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
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

const minimalIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [18, 28], // menor que o padrão
  iconAnchor: [9, 28],
  popupAnchor: [0, -28],
  shadowUrl: "",
});

function MapClickHandler({
  onClick,
}: {
  onClick: (latlng: [number, number]) => void;
}) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onClick([lat, lng]);
    },
  });
  return null;
}

const MapViewer: React.FC = () => {
  const saoPauloCoords: [number, number] = [-23.55052, -46.633308];
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove o token de autenticação
    navigate("/"); // Redireciona para a página de login
  };

  const [points, setPoints] = React.useState<[number, number][]>([]);
  
  const handleMapClick = (coords: [number, number]) => {
    setPoints((prev) => {
      if (prev.length >= 4) prev.shift();
      const updated = [...prev, coords];
      console.log("Coordenadas atuais do polígono:", updated);
      return updated;
    });
  };

  const clearPolygon = () => {
    setPoints([]);
  };

  return (
    <div className="container">
      <div className="top-bar">
        <img src={logoImage} alt="Logo" className="logo" />
        <button className="logout-button" onClick={handleLogout} aria-label="Sair da conta">
          Logout
        </button>
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
                attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapClickHandler onClick={handleMapClick} />
              {points.map((point, index) => (
                <Marker key={index} position={point} icon={minimalIcon} />
              ))}
              {points.length > 2 && (
                <Polygon positions={points} pathOptions={{ color: "lime" }} />
              )}
              {points.length > 0 && (
                <button className="clear-button" onClick={clearPolygon}>
                  Limpar Polígono
                </button>
              )}

              {/* <Marker position={saoPauloCoords}>
                <Popup>São Paulo, SP</Popup>
              </Marker> */}
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
          <button className="btn-clear" onClick={clearPolygon}>Limpar todos</button>
          <button className="btn-apply">Aplicar filtros</button>
        </aside>
      </div>
    </div>
  );
};

export default MapViewer;