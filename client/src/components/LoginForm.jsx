
function LoginForm() {
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
            console.log("Login successful:", response.data);
            // Handle successful login (e.g., store token, redirect)
        }).catch(error => {
            console.error("Login error:", error);
            setErrorMessage("Invalid email or password."); 
        });
    };

    return (
        <div>
            <h1>Student Jobs App</h1>
            <h2>Login</h2>
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