import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

enum AuthStatus {
  //creo un estado global para saber si el usuario esá logueado
  "checking" = "checking",
  "authenticated" = "authenticated",
  "unauthenticated" = "unauthenticated",
}
//creo un tipo de datos(AuthState) con toda la info que va a guardar en el estado global
interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
  isChecking: boolean;
  isAuthenticated: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
  switchRole: (newRole: "buyer" | "seller") => void;
  updateCredits: (amount: number) => void; // Para actualizar el saldo desde cualquier pantalla
  loginWithCredentials: (email: string, password: string) => User | null;
}

interface User {
  name: string;
  email: string;
  role: "buyer" | "seller"; //para ser usado por los headers/footers

  sellerProfileCompleted?: boolean;

  credits?: number; // para seller
  commerceName?: string; // para seller
}

// ======== MOCK USERS (para simular login) ========
const mockUsers: (User & { password: string })[] = [
  {
    name: "Usuario1",
    email: "comprador@test.com",
    password: "123456",
    role: "buyer",
  },
  {
    name: "Usuario2",
    email: "vendedor@test.com",
    password: "123456",
    role: "seller",
    credits: 1500,
    commerceName: "El Rincón del Sabor",
    sellerProfileCompleted: true,
  },
];

export const AuthContext = createContext({} as AuthState); //aquí guardo toda la info como si fuera un estado global

export const useAuthContext = () => useContext(AuthContext); //Esto crea un atajo llamado useAuthContext, que permite acceder al contenido del contexto, desde cualquier parte de la app.

//Esto crea un "repartidor/proveedor" del contexto. children son todos los componentes que van dentro del AuthProvider. El value={{}} es lo que compartiré (va a tener cosas como user, login, logout, etc).
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.checking);
  const [user, setUser] = useState<User | undefined>(undefined);

  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Simular verificación de token
    setTimeout(() => {
      setStatus(AuthStatus.unauthenticated);
    }, 1500);
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    setToken(token);
    setStatus(AuthStatus.authenticated);
  };

  const logout = () => {
    setUser(undefined);
    setToken(undefined);
    setStatus(AuthStatus.unauthenticated);
  };

  const switchRole = useCallback((newRole: "buyer" | "seller") => {
    setUser((prev) => (prev ? { ...prev, role: newRole } : prev));
  }, []);

  const updateCredits = (amount: number) => {
    if (!user) return;
    setUser({ ...user, credits: (user.credits ?? 0) + amount });
  };

  const loginWithCredentials = (
    name: string,
    password: string,
  ): User | null => {
    const found = mockUsers.find(
      (u) => u.name === name && u.password === password,
    );
    if (!found) return null;

    const { password: _, ...userData } = found;
    login(userData, "mock-token-123");
    return userData;
  };

  return (
    <AuthContext.Provider
      value={{
        status,
        user,
        token,
        isChecking: status === AuthStatus.checking,
        isAuthenticated: status === AuthStatus.authenticated,
        login,
        logout,
        switchRole,
        updateCredits,
        loginWithCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
