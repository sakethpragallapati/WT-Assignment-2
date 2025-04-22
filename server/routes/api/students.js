import express from 'express';
import studentModel from '../../models/Students.js';

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const allStudents = await studentModel.find();
        res.json(allStudents);
    } catch (err) {
        res.status(500).json({ message: "Error has occurred in GET request. Please try again.", error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const specificStudent = await studentModel.findOne({ studentID: id });
        if (!specificStudent) {
            return res.status(404).json({ message: `Unable to find student with studentID ${id}` });
        }
        res.json(specificStudent);
    } catch (err) {
        res.status(500).json({ message: "Error has occurred in GET request. Please try again.", error: err.message });
    }
});

router.post("/", async (req, res) => {
    const newData = req.body;
    try {
        if (/^[0-9]+$/.test(newData.studentID)) {
            newData.studentID = parseInt(newData.studentID);
        } else {
            return res.status(400).json({ 
                message: "Student ID must contain only numbers." 
            });
        }
        const newStudent = new studentModel(newData);
        const savedStudent = await newStudent.save();
        res.json({ message: "Student added successfully!", data: savedStudent });
    } catch (err) {
        res.status(500).json({ 
            message: "Error has occurred in POST request. Please try again.", 
            error: err.message 
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updateStudent = await studentModel.findOneAndUpdate(
            { studentID: req.params.id },
            { $set: req.body },
            { new: true }
        );
        if (!updateStudent) {
            return res.status(404).json({ message: "No student found. Please try again." });
        }
        res.json({ message: "Student updated successfully!", data: updateStudent });
    } catch (err) {
        res.status(500).json({ message: "Error has occurred in PUT request. Please try again.", error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedStudent = await studentModel.findOneAndDelete({studentID : req.params.id});
        if (!deletedStudent) {
            return res.status(404).json({ message: "No student found. Please try again." });
        }
        res.json({ message: "Student deleted successfully!", data: deletedStudent });
    } catch (err) {
        res.status(500).json({ message: "Error has occurred in DELETE request. Please try again.", error: err.message });
    }
});

export default router;