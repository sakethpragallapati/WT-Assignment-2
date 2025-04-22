import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

function Home() {
    const navigate = useNavigate();
    
    return (
        <div className="container text-center mt-5 home-page fade-in">
            <h1 className="mb-4">Student Management System</h1>
            <p className="lead mb-5">An easy way to manage student records, enrollment, and academic information</p>
            
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="d-grid gap-3">
                        <button 
                            className="btn btn-primary d-flex align-items-center justify-content-center" 
                            onClick={() => navigate('/studentlist')}
                        >
                            <span className="me-2">👥</span> View Students
                        </button>
                        
                        <button 
                            className="btn btn-success d-flex align-items-center justify-content-center" 
                            onClick={() => navigate('/addstudent')}
                        >
                            <span className="me-2">➕</span> Add Student
                        </button>
                        
                        <button 
                            className="btn btn-warning d-flex align-items-center justify-content-center" 
                            onClick={() => navigate('/editstudent')}
                        >
                            <span className="me-2">✏️</span> Edit Student
                        </button>
                        
                        <button 
                            className="btn btn-danger d-flex align-items-center justify-content-center" 
                            onClick={() => navigate('/deletestudent')}
                        >
                            <span className="me-2">🗑️</span> Delete Student
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="mt-5 text-muted">
                <p>Access and manage student information efficiently</p>
            </div>
        </div>
    );
}

export default Home;