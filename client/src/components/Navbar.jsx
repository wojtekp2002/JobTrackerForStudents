import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Navbar({ isLoggedIn, onLogout, role }) {
    const navButtonStyle = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 16px",
        borderRadius: "10px",
        textDecoration: "none",
        border: "1px solid #334155",
        color: "#e5e7eb",
        background: "transparent",
        fontSize: "15px",
        fontWeight: 500,
        transition: "0.2s ease",
    };

    const primaryLinkStyle = {
        ...navButtonStyle,
        background: "#8b5cf6",
        border: "1px solid #8b5cf6",
        color: "#ffffff",
    };

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
                    role === "student" ? 
                        (
                        <>
                            <Link to="/my-applications" style={navButtonStyle}>
                                My Applications
                            </Link>
                            <button onClick={onLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/add-job" style={primaryLinkStyle}>
                                Add Job
                            </Link>
                            <button onClick={onLogout}>Logout</button>
                        </>
                    )
                ) : (
                        <Link to="/login" style={primaryLinkStyle}>
                            Login
                        </Link>
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