import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from './config/db.js';
import studentroutes from './routes/api/students.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

dbConnection(); 
app.use('/api/students', studentroutes); 

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on PORT: 5000");
});