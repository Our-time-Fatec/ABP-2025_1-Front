import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <button className="login-button" onClick={() => navigate('/login')}>
        Login
      </button>
      <div className="content">
        <h1>Bem-vindo ao Scar!</h1>
        <p>Aqui você será direcionado para as páginas do sistema.</p>
      </div>
    </div>
  );
}

export default Home;
