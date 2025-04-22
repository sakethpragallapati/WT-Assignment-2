import React, { useState } from "react";
import axios from "axios";
import "../index.css"; 

function Deletestudent() {
    const [studentID, setStudentID] = useState("");
    const [studentInfo, setStudentInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    
    const handleSearch = () => {
        if (!studentID) {
            setMessage({ type: "warning", text: "Please enter a Student ID" });
            return;
        }
        
        setIsSearching(true);
        setMessage({ type: "", text: "" });
        
        axios.get(`http://localhost:5000/api/students/${studentID}`)
            .then((res) => {
                if (res.data && res.data.studentID) {
                    setStudentInfo(res.data);
                    setMessage({ type: "info", text: "Student found! Review details and confirm deletion." });
                } else {
                    setStudentInfo(null);
                    setMessage({ type: "danger", text: "No student found with that ID." });
                }
                setIsSearching(false);
            })
            .catch((error) => {
                setStudentInfo(null);
                setMessage({ type: "danger", text: `Error: ${error.response?.data?.message || error.message}` });
                setIsSearching(false);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!studentInfo) {
            handleSearch();
            return;
        }
        
        setIsLoading(true);
        setMessage({ type: "", text: "" });
        
        axios.delete(`http://localhost:5000/api/students/${studentID}`)
            .then((res) => {
                setMessage({ 
                    type: "success", 
                    text: res.data.message || "Student deleted successfully!" 
                });
                setStudentID("");
                setStudentInfo(null);
                setIsLoading(false);
            })
            .catch((error) => {
                setMessage({ 
                    type: "danger", 
                    text: `Failed to delete student: ${error.response?.data?.message || error.message}` 
                });
                setIsLoading(false);
            });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !studentInfo) {
            e.preventDefault();
            handleSearch();
        }
    };

    return (
        <div className="container mt-4 fade-in">
            <h2 className="mb-4">Delete Student</h2>
            
            {message.text && (
                <div className={`alert alert-${message.type} mb-4`} role="alert">
                    {message.text}
                </div>
            )}
            
            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <div className="row mb-4">
                        <div className="col-md-8">
                            <label className="form-label">Student ID</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="studentID"
                                    className="form-control"
                                    placeholder="Enter ID to search (e.g., 1601xxxxxxxx)"
                                    value={studentID}
                                    onChange={(e) => setStudentID(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    disabled={studentInfo !== null || isSearching}
                                    required
                                />
                                {!studentInfo && (
                                    <button 
                                        type="button" 
                                        className="btn btn-primary" 
                                        onClick={handleSearch}
                                        disabled={isSearching}
                                    >
                                        {isSearching ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Searching...
                                            </>
                                        ) : (
                                            "Search"
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {studentInfo && (
                        <div className="mt-4">
                            <div className="card border-danger mb-4">
                                <div className="card-header bg-danger text-white">
                                    <h5 className="mb-0">Student Details - Confirm Deletion</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p><strong>Student ID:</strong> {studentInfo.studentID}</p>
                                            <p><strong>Name:</strong> {studentInfo.firstName} {studentInfo.lastName}</p>
                                            <p><strong>Email:</strong> {studentInfo.email}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p><strong>Department:</strong> {studentInfo.department}</p>
                                            <p><strong>Enrollment Year:</strong> {studentInfo.enrollmentYear}</p>
                                            <p>
                                                <strong>Status:</strong> 
                                                <span className={studentInfo.isActive ? "status-active ms-2" : "status-inactive ms-2"}>
                                                    {studentInfo.isActive ? "Active" : "Inactive"}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="alert alert-warning">
                                <strong>Warning:</strong> This action cannot be undone. Are you sure you want to delete this student record?
                            </div>
                            
                            <div className="d-flex justify-content-between mt-4">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setStudentInfo(null);
                                        setStudentID("");
                                        setMessage({ type: "", text: "" });
                                    }}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn btn-danger"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Deleting...
                                        </>
                                    ) : (
                                        "Confirm Delete"
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Deletestudent;