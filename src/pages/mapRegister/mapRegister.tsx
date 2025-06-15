// src/pages/mapRegister.tsx

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./mapRegister.css";
import logoImage from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface WildfireRecord {
  id: string;
  date: string;
  location: [number, number];
  severity: number;
  images: { url: string }[];
}

const MapRegister: React.FC = () => {
  const [records, setRecords] = useState<WildfireRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<WildfireRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { clearToken } = useAuth();

  const saoPauloCoords: [number, number] = [-23.55052, -46.633308];

  const fetchRecords = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/images");
      const images = await response.json();

      const data: WildfireRecord[] = [
        {
          id: "local",
          date: new Date().toISOString().split("T")[0],
          location: saoPauloCoords,
          severity: 5,
          images,
        },
      ];

      setRecords(data);
      setSelectedRecord(data[0]); // Mostra o único registro por padrão
    } catch (err) {
      setError("Falha ao carregar as imagens");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleLogout = () => {
    clearToken();
    navigate("/");
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
          {loading ? (
            <p>Carregando...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
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
              {records.map((record) => (
                <Marker
                  key={record.id}
                  position={record.location}
                  eventHandlers={{
                    click: () => setSelectedRecord(record),
                  }}
                />
              ))}
            </MapContainer>
          )}
        </div>

        <aside className="sidebar">
          <h3>Detalhes do Registro</h3>
          {selectedRecord ? (
            <div>
              <p><strong>Data:</strong> {selectedRecord.date}</p>
              <p><strong>Severidade:</strong> {selectedRecord.severity}</p>
              <div className="images-container">
                {selectedRecord.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`Imagem ${index + 1}`}
                    className="thumbnail"
                  />
                ))}
              </div>
            </div>
          ) : (
            <p>Selecione um marcador no mapa para ver os detalhes.</p>
          )}
        </aside>
      </div>
    </div>
  );
};

export default MapRegister;
