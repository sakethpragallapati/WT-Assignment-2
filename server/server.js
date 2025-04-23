import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from './config/db.js';
import studentroutes from './routes/api/students.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000", // Your local dev
    "https://student-management-system-129.onrender.com" // Your production frontend
  ],
  credentials: true
}));
app.use(express.json());

dbConnection(); 
app.use('/api/students', studentroutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on PORT: ${process.env.PORT || 4000}`);
});