import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";

enum AuthStatus {   //creo un estado global para saber si el usuario esá logueado
    'checking' = 'checking', 
    'authenticated' = 'authenticated', 
    'unauthenticated' = 'unauthenticated',
}
//creo un tipo de datos(AuthState) con toda la info que va a guardar en el estado global
interface AuthState{ 
    status: AuthStatus;
    token?: string;
    user?: User;
    isChecking: boolean;
    isAuthenticated: boolean;
    login: (userData: User, token: string) => void;
    logout: () => void;
}

interface User {
    name: string;
    email: string;
    role: 'buyer' | 'seller'; //para ser usado por los headers/footers
}

export const AuthContext = createContext({} as AuthState); //aquí guardo toda la info como si fuere un estado global

export const useAuthContext = () => useContext(AuthContext);  //Esto crea un atajo llamado useAuthContext, que permite acceder al contenido del contexto, desde cualquier parte de la app. 

//Esto crea un "repartidor/proveedor" del contexto. children son todos los componentes que van dentro del AuthProvider. El value={{}} es lo que compartiré (va a tener cosas como user, login, logout, etc).
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.checking);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Simular que verificamos si hay token
    setTimeout(() => {
      // Ejemplo: arrancamos como deslogueado
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

