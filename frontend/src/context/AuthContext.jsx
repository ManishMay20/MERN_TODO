import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

// Create Auth Context
const AuthContext = createContext();

// AuthProvider to wrap the app
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(isAuthenticated);
  const token = localStorage.getItem("authToken");

  console.log(token);
  useEffect(() => {
    token &&
      axios
        .get("http://localhost:3000/api/auth/authenticate", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setIsAuthenticated(true);
          console.log(response);
        })
        .catch((e) => console.log(e));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy use
export const useAuth = () => useContext(AuthContext);
