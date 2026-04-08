import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function RegisterForm() {
    const navigate = useNavigate();
    const location = useLocation();

    const [inputName, setInputName] = useState("");
    const [inputRole, setInputRole] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputEmail || !inputPassword || !inputName || !inputRole || !confirmPassword) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        if (inputPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(inputEmail)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        setErrorMessage("");
        
        axios.post("http://localhost:5000/api/auth/register", {
            name: inputName,
            role: inputRole,
            email: inputEmail,
            password: inputPassword
        }).then(() => {
            console.log("Registration successful:");
            setErrorMessage("");
            navigate("/login", { replace: true });

        }).catch(error => {
            console.error("Registration error:", error);
            setErrorMessage("Registration failed. Please try again.");
        });
    };

    return (
        <div>
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={handleSubmit} >
                <input type="text" placeholder="Name" value={inputName} onChange={(e) => setInputName(e.target.value)} />
                <select value={inputRole} onChange={(e) => setInputRole(e.target.value)}>
                    <option value="">Select Role</option>
                    <option value="student">Student</option>
                    <option value="employer">Employer</option>
                </select>
                <input type="email" placeholder="Email" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} />
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <button type="submit" >Register</button>
            </form>
        </div>
    );
}

export default RegisterForm;