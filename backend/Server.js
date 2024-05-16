const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const academicYearRoutes = require('./Routes/academicYearRoutes');
const subjectRouter = require('./Routes/SubjectRoutes');
const lecturerRoutes = require('./Routes/LecturerRoute');
const studentRoutes = require('./Routes/StudentRoute');
const icamarksRouter = require('./Routes/ICAERoutes');
const finalMarkRoutes = require('./Routes/FinalMarksRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection with updated options
mongoose.connect('mongodb+srv://kyanarththanik:m3vRGMud5n8bkvoc@studentmanagement.9bjszz2.mongodb.net/students');


// Routes
app.use('/api/academic-years', academicYearRoutes);
app.use('/api/subjects', subjectRouter);
app.use('/api/lecturers', lecturerRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/icamarks', icamarksRouter);
app.use('/api/finalmarks', finalMarkRoutes);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
