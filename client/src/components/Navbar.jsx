import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, onLogout }) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 24px",
                borderBottom: "1px solid #334155",
            }}
        >
            <Link
                to="/"
                style={{
                    textDecoration: "none",
                    color: "inherit",
                }}
            >
                <h2 style={{ margin: 0 }}>StudentyWantWork</h2>
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {isLoggedIn ? (
                    <>
                        <Link to="/my-applications">My Applications</Link>
                        <button onClick={onLogout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </div>
    );
}

Navbar.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func,
};

export default Navbar;