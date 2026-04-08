import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
  return (
    <div>
      <h1>Student Jobs App</h1>
      <h2>Register</h2>
      <RegisterForm />
      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
}

export default RegisterPage;