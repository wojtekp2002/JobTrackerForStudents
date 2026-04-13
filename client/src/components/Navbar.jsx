import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";
import "./Navbar.css";

function Navbar({ isLoggedIn, onLogout, role }) {
    return (
        <div className="navbar">
            <Link to="/" className="navbar-brand">
                <div className="navbar-logo">
                    <BriefcaseBusiness size={16} color="white" />
                </div>
                <span className="navbar-title">StudentyWantWork</span>
            </Link>

            <div className="navbar-actions">
                {!isLoggedIn ? (
                    <Link to="/login" className="navbar-link-button navbar-link-button--primary">
                        Login
                    </Link>
                ) : (
                    <>
                        {role === "student" && (
                            <Link to="/my-applications" className="navbar-link-button">
                                My Applications
                            </Link>
                        )}

                        {role === "employer" && (
                            <Link to="/add-job" className="navbar-link-button navbar-link-button--primary">
                                Add Job
                            </Link>
                        )}

                        <button onClick={onLogout}>Logout</button>
                    </>
                )}
            </div>
        </div>
    );
}

Navbar.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func,
    role: PropTypes.string,
};

export default Navbar;