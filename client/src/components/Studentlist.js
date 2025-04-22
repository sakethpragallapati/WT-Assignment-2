import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Studentlist() {
    const [studentList, setStudentList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        setIsLoading(true);
        axios.get("http://localhost:5000/api/students")
            .then((res) => {
                setStudentList(res.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(`Something happened, please try again... ${error}`);
                setIsLoading(false);
            });
    };

    function searchStudent(event) {
        const studentId = event.target.value;
        setSearchTerm(studentId);

        if (studentId === "") {
            fetchStudents();
        } else {
            setIsLoading(true);
            axios.get(`http://localhost:5000/api/students/${studentId}`)
                .then((res) => {
                    if (res.data && res.data.studentID) {
                        setStudentList([res.data]);
                    } else {
                        setStudentList([]);
                    }
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error(`Search error: ${error}`);
                    setStudentList([]);
                    setIsLoading(false);
                });
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return "";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        } catch {
            return dateString;
        }
    };

    return (
        <div className="container mt-4 fade-in">
            <h2 className="mb-4">Student List</h2>
            
            <div className="search-container mb-4">
                <span className="search-icon">🔍</span>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search by Student ID..."
                    value={searchTerm}
                    onChange={searchStudent}
                />
            </div>
            
            {isLoading ? (
                <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : studentList.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>StudentID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date of Birth</th>
                                <th>Department</th>
                                <th>Enrollment Year</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentList.map((student) => (
                                <tr key={student.studentID}>
                                    <td>{student.studentID}</td>
                                    <td>{`${student.firstName} ${student.lastName}`}</td>
                                    <td>{student.email}</td>
                                    <td>{formatDate(student.dob)}</td>
                                    <td>{student.department}</td>
                                    <td>{student.enrollmentYear}</td>
                                    <td>
                                        <span className={student.isActive ? "status-active" : "status-inactive"}>
                                            {student.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="alert alert-info text-center">
                    No students found. Try a different search term or add new students.
                </div>
            )}
        </div>
    );
}

export default Studentlist;