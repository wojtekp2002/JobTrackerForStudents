import { useState, useEffect } from "react";
import {Route, Routes} from "react-router-dom";
import axios from "axios";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import ApplyPage from "./pages/ApplyPage";
import MyApplicationsPage from "./pages/MyApplicationPage";
import AddJobPage from "./pages/AddJobPage";

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

  const [role, setRole] = useState(null);

  useEffect(() => {
      axios.get(
        "/api/auth/me", 
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
      )
        .then((response) => {
            setRole(response.data.role);
        })
          .catch((error) => {
              console.error("Error fetching user role:", error);
      });
    }, []);

  return (
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} onLogout={handleLogout} role={role} />} />
        <Route path="/login" element={<LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobs/:id" element={<JobDetailsPage isLoggedIn={isLoggedIn} onLogout={handleLogout} role={role} />} />
        <Route path="/jobs/:id/apply" element={<ApplyPage isLoggedIn={isLoggedIn} role={role} />} />
        <Route path="/my-applications" element={<MyApplicationsPage />} />
        <Route path="/add-job" element={<AddJobPage isLoggedIn={isLoggedIn} role={role} />} />
      </Routes>
  );
}

export default App;