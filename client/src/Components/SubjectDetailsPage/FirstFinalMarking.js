import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FInalFirstMarking = () => {
// State variables to store academic information and student marks
const [academicInfo, setAcademicInfo] = useState({});
const [studentDetails, setStudentDetails] = useState([]);
const [loading, setLoading] = useState(true); // State variable to track loading state

// Fetch academic information from the database
useEffect(() => {
  const fetchAcademicInfo = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/academicInfo');
      setAcademicInfo(response.data);
    } catch (error) {
      console.error('Error fetching academic information:', error.message);
    }
  };

  fetchAcademicInfo();
}, []);

// Fetch student details from the database
useEffect(() => {
  const fetchStudentDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudentDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching student details:', error.message);
    }
  };

  fetchStudentDetails();
}, []);

const handleMarksChange = (index, field, value) => {
  const updatedStudents = [...studentDetails];
  updatedStudents[index][field] = value;
  setStudentDetails(updatedStudents);
};


const calculateTotalMarks = (student) => {
  const marks = [student.q1, student.q2, student.q3, student.q4, student.q5];
  marks.sort((a, b) => b - a);
  const totalMarks = marks.slice(0, 4).reduce((total, mark) => total + parseInt(mark), 0);
  return totalMarks;
};

const addStudentMarks = async () => {
  try {
    const markedStudents = studentDetails.map(student => ({
      regNo: student.regNo,
      q1: parseInt(student.q1),
      q2: parseInt(student.q2),
      q3: parseInt(student.q3),
      q4: parseInt(student.q4),
      q5: parseInt(student.q5),
      totalMarks: calculateTotalMarks(student),
      averageMarks: (calculateTotalMarks(student) * 70) / 400
    }));

    await axios.post('http://localhost:5000/api/finalMarks/add', markedStudents);
    alert('Student marks added successfully');
  } catch (error) {
    console.error('Error adding student marks:', error.message);
    alert('Failed to add student marks');
  }
};



  return (
    <div>
      {/* Display academic information 
      <h1>Academic Information</h1>
      <br/>
      <p>Academic Year: {academicInfo.year}</p>
      <p>Semester: {academicInfo.semester}</p>
      <p>Course Code: {academicInfo.courseCode}</p>
      <br/><br/><br/>
      {/* Display input fields for student marks */}
      <h2>Enter Student Marks of FirstFinalMarking</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Registration No.</th>
              <th>Q1</th>
              <th>Q2</th>
              <th>Q3</th>
              <th>Q4</th>
              <th>Q5</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentDetails.map((student, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{student.regNo}</td>
                <td>
                  <input
                    type="number"
                    value={student.q1}
                    onChange={(e) => handleMarksChange(index, 'q1', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={student.q2}
                    onChange={(e) => handleMarksChange(index, 'q2', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={student.q3}
                    onChange={(e) => handleMarksChange(index, 'q3', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={student.q4}
                    onChange={(e) => handleMarksChange(index, 'q4', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={student.q5}
                    onChange={(e) => handleMarksChange(index, 'q5', e.target.value)}
                  />
                </td>
                <td className="button-cell" >
              <button 
                    onClick={() => handleUpdate(index)} 
                    className="action-button"
                    style={{ backgroundColor: '#26619c', color: 'white', border: 'none'}}
                  >
                    Update
                  </button>
                  <button 
                    onClick={() => handleDelete(index)} 
                    className="action-button"
                    style={{ backgroundColor: '#BF0A30', color: 'white', border: 'none'}}
                  >
                    Delete
                  </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={addStudentMarks} className="finafirstbutton">Add Student Marks</button>
      <br/><br/><br/><br/>
      {/* Display student marks table */}
      <h1>Student Marks</h1>
      <table border="1px solid" className="styled-table">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Registration No.</th>
            <th>Total Marks</th>
            <th>Average Marks</th>
          </tr>
        </thead>
        <tbody>
          {studentDetails.map((student, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{student.regNo}</td>
              <td>{calculateTotalMarks(student)}</td>
              <td>{(calculateTotalMarks(student) * 70) / 400}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FInalFirstMarking;
