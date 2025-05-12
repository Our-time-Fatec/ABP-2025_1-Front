import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import "./login.css";
import mapImg from "../../assets/map.png";
import logoImg from "../../assets/logo.png";
import backgroundImg from "../../assets/background.jpg";
import { login } from "../../http/api";
import { catchError } from "../../client/try-catch";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email é obrigatório")
    .email("Email ou senha inválidos"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  lembrar: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      lembrar: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("Dados do formulário:", data);

    const [err, res] = await catchError(login(data));
    if(err){
      alert("Erro ao fazer login, verifique suas credenciais");
      return 
    }

    navigate("/mapa");
  };

  return (
    <div className="login-wrapper">
      <img src={backgroundImg} alt="fundo" className="background-image" />

      <div className="login-left">
        <div className="login-box">
          <img src={logoImg} alt="Logo" className="logo" />
          <h2>Bem vindo(a)!</h2>
          <p>Insira suas credenciais para acessar o sistema</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              {...register("email")}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}

            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              {...register("password")}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}

            <div className="options">
              <div className="remember-me">
                <input type="checkbox" id="remember" {...register("lembrar")} />
                <span>Lembre-se por 30 dias</span>
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
