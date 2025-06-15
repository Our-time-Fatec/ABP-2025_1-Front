import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import "./register.css";
import mapImg from "../../assets/map.png";
import logoImg from "../../assets/logo.png";
import backgroundImg from "../../assets/background.jpg";
import { registerUser } from "../../http/api";
import { asyncCatchError } from "../../utils/try-catch";

const registerSchema = z.object({
  name: z.string(),
  email: z
    .string()
    .nonempty("Email é obrigatório")
    .email("Email ou senha inválidos"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name:"",
      email: "",
      password: ""
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    console.log("Dados do formulário:", data);

    const [err, res] = await asyncCatchError(registerUser(data));
    
    if (err) {
      alert(err.message);
      return;
    }

    navigate("/login");
    return
  };

  return (
    <div className="register-wrapper">
      <img src={backgroundImg} alt="fundo" className="background-image" />

      <div className="register-left">
        <div className="register-box">
          <img src={logoImg} alt="Logo" className="logo" />
          <h2>Bem vindo(a)!</h2>
          <p>Insira suas credenciais para se cadastrar no sistema</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Nome</label>
            <input
              type="name"
              placeholder="Digite seu nome completo"
              {...register("name")}
            />
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

            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>

      <div className="register-right">
        <img src={mapImg} alt="Mapa" className="map-image" />
      </div>
    </div>
  );
}

export default Register;
