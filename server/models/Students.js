import mongoose from "mongoose";
const currentYear = new Date().getFullYear();
const studentSchema = mongoose.Schema({
    studentID: {
        type: Number,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
        minLength: 2 
    },
    lastName: {
        type: String,
        required: true,
        minLength: 2 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/,`Invalid email please try again...`]
    },
    dob: {
        type: Date,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    enrollmentYear: {
        type: Number,
        required: true,
        min: 2000,
        validate: {
            validator: function (value) {
                return value <= currentYear;
            },
            message: props => `Enrollment year ${props.value} cannot be in the future.`
        }
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const studentModel = mongoose.model(
    "Student",  // Model name (singular, PascalCase)
    studentSchema,
    "studentcollections"  // ← Exact collection name from your DB
  );
export default studentModel;