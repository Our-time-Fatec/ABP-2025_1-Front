import { createContext, useContext } from "react";
import { decodeToken, isTokenValid, DecodedToken } from "../utils/authUtils";
import { TOKEN_LOCAL_STORAGE_KEY } from "../constants/local-storage";

type AuthContextType = {
  getToken: () => string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  isAuthenticated: () => boolean;
  getDecodedToken: () => DecodedToken | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const getToken = () => localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
  const setToken = (token: string) => localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token);
  const clearToken = () => localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);

  const isAuthenticated = () => {
    const token = getToken();
    return token ? isTokenValid(token) : false;
  };

  const getDecodedToken = () => {
    const token = getToken();
    return token ? decodeToken(token) : null;
  };

  return (
    <AuthContext.Provider
      value={{ getToken, setToken, clearToken, isAuthenticated, getDecodedToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
