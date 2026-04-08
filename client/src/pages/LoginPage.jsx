import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

function LoginPage({ onLoginSuccess }) {
  return (
    <div>
      <h1>Student Jobs App</h1>
      <h2>Login</h2>
      <LoginForm onLoginSuccess={onLoginSuccess} />
      <Link to="/register">Don't have an account? Register</Link>
      <Link to="/">Back</Link>
    </div>
  );
}

export default LoginPage;