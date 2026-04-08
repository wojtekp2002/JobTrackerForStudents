import { useState, useEffect } from "react";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
        <Route path="/login" element={<LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
  );
}

export default App;