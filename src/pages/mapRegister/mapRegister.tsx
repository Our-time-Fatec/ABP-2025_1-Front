import React, { useEffect, useState } from "react";
import "./mapRegister.css";
import logoImage from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { allCicatriz, getAllDataAnalytics } from "../../http/api";
import type { AllCicatriz201DataItem, GetAllDataAnalytics200 } from "../../http/api";

const MapRegister: React.FC = () => {
  const { clearToken } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState<AllCicatriz201DataItem[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analyticsData, setAnalyticsData] = useState<GetAllDataAnalytics200 | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await allCicatriz();
        setData(response.data);
        setCount(response.count);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar as imagens de cicatriz.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleImageClick = async (scarId: string) => {
    setAnalyticsData(null);
    setAnalyticsLoading(true);
    setAnalyticsError(null);

    try {
      const analytics = await getAllDataAnalytics(scarId);
      setAnalyticsData(analytics);
    } catch (err) {
      console.error(err);
      setAnalyticsError("Erro ao carregar os dados analíticos.");
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const handleCloseAnalytics = () => {
    setAnalyticsData(null);
    setAnalyticsError(null);
  };

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
        <aside className="sidebar">
          <h3>Imagens de Cicatriz (Total: {count})</h3>

          {loading ? (
            <p>Carregando...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <div className="images-container">
              {data
                .filter((item) => item.url !== null)
                .map((item, index) => (
                  <img
                    key={item.id}
                    src={item.url!}
                    alt={`Imagem ${index + 1}`}
                    className="thumbnail"
                    onClick={() => handleImageClick(item.id)}
                    style={{ cursor: "pointer" }}
                  />
                ))}
            </div>
          )}
        </aside>

        <div className="map-section" />

        {analyticsLoading && (
          <div className="analytics-overlay">
            <p>Carregando análise...</p>
          </div>
        )}

        {analyticsError && (
          <div className="analytics-overlay error">
            <p>{analyticsError}</p>
            <button onClick={handleCloseAnalytics}>Fechar</button>
          </div>
        )}

        {analyticsData && (
          <div className="analytics-overlay">
            <button className="close-button" onClick={handleCloseAnalytics}>
              Fechar
            </button>
            <h3>Dados Analíticos</h3>
            <div className="analytics-section">
              <h4>Área Stats</h4>
              <p>Total m²: {analyticsData.areaStats.total_area_m2}</p>
              <p>Total ha: {analyticsData.areaStats.total_area_ha}</p>
            </div>
            <div className="analytics-section">
              <h4>NDVI Stats</h4>
              <p>Min: {analyticsData.ndviStats.min}</p>
              <p>Max: {analyticsData.ndviStats.max}</p>
              <p>Média: {analyticsData.ndviStats.mean}</p>
              <p>Desvio padrão: {analyticsData.ndviStats.std}</p>
              <p>% acima de 0.5: {analyticsData.ndviStats.pct_acima_0_5}%</p>
            </div>
            <div className="analytics-section">
              <h4>Resumo de Área</h4>
              <p>Área Total (km²): {analyticsData.areaSummary.total_area_km2}</p>
              <p>Área Queimada (km²): {analyticsData.areaSummary.burned_area_km2}</p>
              <p>% Queimada: {analyticsData.areaSummary.burned_percent}%</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapRegister;
