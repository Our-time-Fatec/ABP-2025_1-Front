import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import mapImg from '../../assets/map.png';
import logoImg from '../../assets/logo.png';
import backgroundImg from '../../assets/background.jpg';

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/mapa');
  };

  return (
    <div className="login-wrapper">
      <img src={backgroundImg} alt="fundo" className="background-image" />

      <div className="login-left">
        <div className="login-box">
          <img src={logoImg} alt="Logo" className="logo" />
          <h2>Bem vindo(a)!</h2>
          <p>Insira suas credenciais para acessar o sistema</p>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" required placeholder="Digite seu email" />

            <label>Senha</label>
            <input type="password" required placeholder="Digite sua senha" />

            <div className="options">
              <div>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember"> Lembre-se por 30 dias</label>
              </div>
              <a href="#">Esqueci minha senha</a>
            </div>

            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>

      <div className="login-right">
        <img src={mapImg} alt="Mapa" className="map-image" />
      </div>
    </div>
  );
}

export default Login;
