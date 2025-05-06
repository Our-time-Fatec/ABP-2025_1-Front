import React from 'react';
import './login.css';
import mapImg from '../../assets/map.png';
import logoImg from '../../assets/logo.png';

function Login() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Login efetuado!');
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="login-box">
          <img src={logoImg} alt="Logo" className="logo" /> {/* Troque pela logo desejada */}
          <h2>Bem vindo(a)!</h2>
          <p>Insira suas credenciais para acessar o sistema</p>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" required />

            <label>Senha</label>
            <input type="password" required />

            <div className="options">
              <div>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember"> Lembre-se por 30 dias</label>
              </div>
              <a href="#">Esqueceu a senha?</a>
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
