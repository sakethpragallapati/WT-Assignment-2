import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css"; 

function Editstudent() {
    const [studentData, setStudentData] = useState({
        studentID: "",
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        department: "",
        enrollmentYear: "",
        isActive: true
    });
    
    const [studentFound, setStudentFound] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setStudentData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const searchStudent = () => {
        if (!studentData.studentID) {
            setMessage({ type: "warning", text: "Please enter a Student ID" });
            return;
        }
        
        setIsLoading(true);
        setMessage({ type: "", text: "" });
        
        axios.get(`https://student-management-system-backend-t0ks.onrender.com/api/students/${studentData.studentID}`)
            .then((res) => {
                if (res.data && res.data.studentID) {
                    // Set all student data from response
                    setStudentData(res.data);
                    setStudentFound(true);
                    setMessage({ type: "success", text: "Student found! You can edit the details below." });
                } else {
                    setStudentFound(false);
                    setMessage({ type: "danger", text: "No student found with that ID." });
                }
                setIsLoading(false);
            })
            .catch((error) => {
                setStudentFound(false);
                setMessage({ type: "danger", text: `Error: ${error.response?.data?.message || error.message}` });
                setIsLoading(false);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!studentFound) {
            searchStudent();
            return;
        }
        
        setIsSubmitting(true);
        setMessage({ type: "", text: "" });
        
        axios.put(`http://localhost:5000/api/students/${studentData.studentID}`, studentData)
            .then((res) => {
                setMessage({ 
                    type: "success", 
                    text: res.data.message || "Student updated successfully!" 
                });
                setIsSubmitting(false);
            })
            .catch((error) => {
                setMessage({ 
                    type: "danger", 
                    text: `Failed to update student: ${error.response?.data?.message || error.message}` 
                });
                setIsSubmitting(false);
            });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !studentFound) {
            e.preventDefault();
            searchStudent();
        }
    };

    return (
        <div className="container mt-4 fade-in">
            <h2 className="mb-4">Edit Student</h2>
            
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
                                    value={studentData.studentID}
                                    onChange={handleChange}
                                    onKeyPress={handleKeyPress}
                                    disabled={studentFound || isLoading}
                                    required
                                />
                                {!studentFound && (
                                    <button 
                                        type="button" 
                                        className="btn btn-primary" 
                                        onClick={searchStudent}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
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

                    {studentFound && (
                        <>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="form-control"
                                        value={studentData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="form-control"
                                        value={studentData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={studentData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dob"
                                        className="form-control"
                                        value={studentData.dob ? studentData.dob.split('T')[0] : ""}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Department</label>
                                    <input
                                        type="text"
                                        name="department"
                                        className="form-control"
                                        value={studentData.department}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Enrollment Year</label>
                                    <input
                                        type="text"
                                        name="enrollmentYear"
                                        className="form-control"
                                        value={studentData.enrollmentYear}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-check mb-4">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    id="isActiveCheck"
                                    className="form-check-input"
                                    checked={studentData.isActive}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="isActiveCheck">
                                    Active Student
                                </label>
                            </div>

                            <div className="d-flex justify-content-between mt-4">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setStudentFound(null);
                                        setStudentData({
                                            studentID: "",
                                            firstName: "",
                                            lastName: "",
                                            email: "",
                                            dob: "",
                                            department: "",
                                            enrollmentYear: "",
                                            isActive: true
                                        });
                                        setMessage({ type: "", text: "" });
                                    }}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Updating...
                                        </>
                                    ) : (
                                        "Update Student"
                                    )}
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Editstudent;