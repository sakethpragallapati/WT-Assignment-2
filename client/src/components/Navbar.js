import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
    const location = useLocation();
    
    // Function to check if the link is active
    const isActive = (path) => {
        return location.pathname === path ? "active" : "";
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand fw-bold text-white d-flex align-items-center">
                    <span className="me-2">📚</span>
                    Student Management
                </Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className={`nav-link text-white ${isActive("/")}`} to="/">
                                <span className="me-1">🏠</span> Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link text-white ${isActive("/studentlist")}`} to="/studentlist">
                                <span className="me-1">👥</span> Student List
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link text-white ${isActive("/addstudent")}`} to="/addstudent">
                                <span className="me-1">➕</span> Add
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link text-white ${isActive("/editstudent")}`} to="/editstudent">
                                <span className="me-1">✏️</span> Edit
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link text-white ${isActive("/deletestudent")}`} to="/deletestudent">
                                <span className="me-1">🗑️</span> Delete
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;