import React, { useState } from "react";
import axios from "axios";
import "../index.css"; 

function Addstudent() {
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
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setStudentData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage({ type: "", text: "" });
        
        axios.post('http://localhost:5000/api/students', studentData)
            .then((res) => {
                setSubmitMessage({ 
                    type: "success", 
                    text: res.data.message || "Student added successfully!" 
                });
                // Reset form
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
                setIsSubmitting(false);
            })
            .catch((error) => {
                setSubmitMessage({ 
                    type: "danger", 
                    text: `Failed to add student: ${error.response?.data?.message || error.message}`
                });
                setIsSubmitting(false);
            });
    };

    return (
        <div className="container mt-4 fade-in">
            <h2 className="mb-4">Add New Student</h2>
            
            {submitMessage.text && (
                <div className={`alert alert-${submitMessage.type} mb-4`} role="alert">
                    {submitMessage.text}
                </div>
            )}
            
            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Student ID</label>
                            <input
                                type="text"
                                name="studentID"
                                className="form-control"
                                placeholder="Enter ID (e.g., 1601xxxxxxxx)"
                                value={studentData.studentID}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="student@example.com"
                                value={studentData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                className="form-control"
                                placeholder="Enter first name"
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
                                placeholder="Enter last name"
                                value={studentData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                className="form-control"
                                value={studentData.dob}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Department</label>
                            <input
                                type="text"
                                name="department"
                                className="form-control"
                                placeholder="Enter department"
                                value={studentData.department}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Enrollment Year</label>
                            <input
                                type="text"
                                name="enrollmentYear"
                                className="form-control"
                                placeholder="YYYY"
                                value={studentData.enrollmentYear}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3 d-flex align-items-center">
                            <div className="form-check mt-4">
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
                        </div>
                    </div>

                    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Adding...
                                </>
                            ) : (
                                "Add Student"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Addstudent;