import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import "./register.css";
import mapImg from "../../assets/map.png";
import logoImg from "../../assets/logo.png";
import backgroundImg from "../../assets/background.jpg";
import { login } from "../../http/api";
import { asyncCatchError } from "../../utils/try-catch";
import { useAuth } from "../../context/auth";

const registerSchema = z.object({
  email: z
    .string()
    .nonempty("Email é obrigatório")
    .email("Email ou senha inválidos"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  name:z.string(),
  lembrar: z.boolean().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

function Register() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    console.log("Dados do formulário:", data);

    const [err, res] = await asyncCatchError(login(data));
    
    if (err) {
      alert(err.message);
      return;
    }

    setToken(res.token);

    navigate("/login");
    return
  };

  return (
    <div className="login-wrapper">
      <img src={backgroundImg} alt="fundo" className="background-image" />

      <div className="login-left">
        <div className="login-box">
          <img src={logoImg} alt="Logo" className="logo" />
          <h2>Bem vindo(a)!</h2>
          <p>Insira suas credenciais para se cadastrar no sistema</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Nome Completo</label>
              <input
              type="password"
              placeholder="Digite seu nome completo"
              {...register("name")}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
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

            <label>Confirme sua senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              {...register("password")}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}

            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>

      <div className="login-right">
        <img src={mapImg} alt="Mapa" className="map-image" />
      </div>
    </div>
  );
}

export default Register;
