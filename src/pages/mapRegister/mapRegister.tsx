import React, { useState } from "react"; // NOVO: importar useState
import { useLocation, useNavigate } from "react-router-dom";
import "./mapRegister.css";
import { useAuth } from "../../context/auth";
import logoImage from "../../assets/logo.png";

// A função formatDate continua a mesma
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const MapRegister: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearToken } = useAuth();
  
  // NOVO: Estado para armazenar o valor da pesquisa
  const [searchTerm, setSearchTerm] = useState("");

  const { results, dateRange } = location.state || { results: [], dateRange: null };

  const handleLogout = () => {
    clearToken();
    navigate("/");
  };

  const pageTitle = dateRange 
    ? `Resultados para ${formatDate(dateRange.start)} - ${formatDate(dateRange.end)}`
    : "Histórico de Registros";

  // NOVO: Lógica para filtrar os resultados com base no searchTerm
  // Filtra pelo 'id' do item, ignorando maiúsculas/minúsculas.
  const filteredResults = results.filter((item: any) => 
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="gallery-container">
      <header className="top-bar">
        {/* Bloco da Esquerda */}
        <div className="top-bar-left">
          <button
            className="back-button"
            onClick={() => navigate(-1)}
            aria-label="Voltar para a página anterior"
          >
            ← Voltar
          </button>
          <img src={logoImage} alt="Logo" className="logo" />
        </div>

        {/* NOVO: Container da Pesquisa (adicionado no meio) */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Pesquisar por ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Ícone de Lupa em SVG para não precisar de imagens externas */}
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>

        {/* Bloco da Direita */}
        <button className="logout-button" onClick={handleLogout} aria-label="Sair da conta">
          Logout
        </button>
      </header>

      <main className="content-area">
        <h2 className="gallery-title">{pageTitle}</h2>
        
        {/* Mude a verificação e o map para usar 'filteredResults' */}
        {filteredResults && filteredResults.length > 0 ? (
          <div className="gallery-grid">
            {filteredResults.map((item: any) => ( // NOVO: usar filteredResults
              <div key={item.id} className="image-card">
                <img
                  src={item.assets.thumbnail.href}
                  alt={item.id}
                  className="card-image"
                />
                <div className="card-info">
                  <p className="card-id">{item.id}</p>
                  <p className="card-date">{formatDate(item.properties.datetime)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>Nenhum resultado encontrado.</h3>
            {/* Mensagem um pouco mais genérica agora */}
            <p>Tente ajustar sua busca ou volte para fazer uma nova consulta no mapa.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MapRegister;