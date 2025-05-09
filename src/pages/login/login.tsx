import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import mapImg from '../../assets/map.png';
import logoImg from '../../assets/logo.png';
import backgroundImg from '../../assets/background.jpg';

// Interface para o estado do formulário
interface FormData {
  email: string;
  senha: string;
  lembrar: boolean;
}

// Interface para os erros de validação
interface Erros {
  email?: string;
  senha?: string;
}

function Login() {
  const navigate = useNavigate();

  // Estado para os campos do formulário
  const [formData, setFormData] = useState<FormData>({
    email: '',
    senha: '',
    lembrar: false,
  });

  // Estado para erros de validação
  const [erros, setErros] = useState<Erros>({});

  // Função para atualizar o estado conforme o usuário digita
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Função para validar o formulário
  const validarFormulario = (): Erros => {
    const novosErros: Erros = {};
    if (!formData.email) {
      novosErros.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      novosErros.email = 'Email ou senha inválidos';
    }
    if (!formData.senha) {
      novosErros.senha = 'Senha é obrigatória';
    }
    return novosErros;
  };

  // Função para manipular o envio do formulário
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errosValidacao = validarFormulario();
    if (Object.keys(errosValidacao).length > 0) {
      setErros(errosValidacao);
      return;
    }

    // Limpa os erros se a validação passar
    setErros({});

    // Aqui você pode adicionar lógica para autenticar o usuário
    console.log('Dados do formulário:', formData);

    // Redireciona para a página do mapa
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
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu email"
            />
            {erros.email && <p className="error">{erros.email}</p>}

            <label>Senha</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Digite sua senha"
            />
            {erros.senha && <p className="error">{erros.senha}</p>}

            <div className="options">
              <div>
                <input
                  type="checkbox"
                  id="remember"
                  name="lembrar"
                  checked={formData.lembrar}
                  onChange={handleChange}
                />
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