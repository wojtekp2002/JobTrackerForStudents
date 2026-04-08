import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function LoginForm({ onLoginSuccess }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputEmail || !inputPassword) {
            setErrorMessage("Please enter both email and password.");
            return;
        }
        
        if (!/\S+@\S+\.\S+/.test(inputEmail)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        setErrorMessage("");
        
        axios.post("http://localhost:5000/api/auth/login", {
        email: inputEmail,
        password: inputPassword
        }).then(response => {
            console.log("Login successful:");
            localStorage.setItem("token", response.data.token);
            setErrorMessage("");
            onLoginSuccess();
            navigate(location.state?.from || "/", { replace: true });

        }).catch(error => {
            console.error("Login error:", error);
            setErrorMessage("Invalid email or password."); 
        });
    };

    return (
        <div>
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={handleSubmit} >
                <input type="text" placeholder="Email" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} />
                <button type="submit" >Login</button>
            </form>
        </div>
    );
}

export default LoginForm;