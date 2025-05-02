# Student Management System

An easy-to-use **Student Management System** built using **MERN stack** (MongoDB, Express.js, React.js, Node.js) with **Bootstrap** styling.

---

## 🔧 Tech Stack

- **Frontend**: React.js, Bootstrap 5, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas)
- **Hosting**: Render (Backend API)

---

## 📈 Features

- View all students
- Add new students
- Edit existing student information
- Delete student records safely
- Search students by Student ID
- Status indicators for active/inactive students
- Form validations with real-time feedback
- Responsive and modern UI

---

## 🗂️ Folder Structure

```
/
|-- server
|    |-- config/
|    |    |-- db.js
|    |-- models/
|    |    |-- Students.js
|    |-- routes/api/
|    |    |-- students.js
|    |-- server.js
|
|-- client
|    |-- src/
|         |-- components/
|             |-- Addstudent.jsx
|             |-- Deletestudent.jsx
|             |-- Editstudent.jsx
|             |-- Home.jsx
|             |-- Navbar.jsx
|             |-- Studentlist.jsx
|         |-- App.js
|         |-- index.css
```

---

## 🛠️ Setup Instructions

### 1. Backend Setup (Express API)

- Navigate to backend folder:
  ```bash
  cd server
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Start the server:
  ```bash
  npm run dev
  ```

### 2. Frontend Setup (React App)

- Navigate to frontend folder:
  ```bash
  cd client
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Start the React app:
  ```bash
  npm start
  ```

---

## 📎 API Endpoints

- `GET /api/students` - Fetch all students
- `GET /api/students/:id` - Fetch a specific student
- `POST /api/students` - Add a new student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student

---

## 📷 Screenshots

Home
![image](https://github.com/user-attachments/assets/270bd279-e6e6-4d61-b026-0dee69f26d09)

StudentList
![image](https://github.com/user-attachments/assets/42fb40e6-4a44-4572-8d95-1e9042beb216)

Add Student
![image](https://github.com/user-attachments/assets/9dbead40-e716-4d77-9fae-dfca939a12dd)

Edit Student
![image](https://github.com/user-attachments/assets/e80089e5-c460-4e1d-9b86-46b58fef014b)

Delete Student
![image](https://github.com/user-attachments/assets/44ab1cfc-145b-49df-bb84-ea20dc6624e6)

---

## 📅 Live Demo

> 🔗 [Frontend Live Link](https://student-management-system-129.onrender.com)
>
> 🔗 [Backend API](https://student-management-system-backend-t0ks.onrender.com/api/students)

---

## 👨‍💻 Author

by Pragallapati Saketh

Feel free to contribute, star, and fork the project!

---

## 🚀 Future Enhancements

- Add authentication (Admin login)
- Pagination for large student datasets
- Role-based access control
- Export student data (CSV, PDF)
