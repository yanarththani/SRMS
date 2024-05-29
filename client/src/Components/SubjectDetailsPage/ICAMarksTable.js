import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../stylesheets/style.css';
import Pagination from '../Pagination.js';

const ICAMarksTable = () => {
  const [studentMarks, setStudentMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { subject } = location.state || {};
  
  console.log('Subject:', subject);  // Debugging line

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Change this to the desired number of items per page

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentsResponse = await axios.get('http://localhost:5000/api/students');
        let marksResponse = null;

        try {
          marksResponse = await axios.get(`http://localhost:5000/api/icamarks/${subject}`);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.log('No marks data found for the subject');
          } else {
            throw error;
          }
        }
        
        console.log('Students Data:', studentsResponse.data);
        console.log('Marks Data:', marksResponse ? marksResponse.data : []);

        const registrationNumbers = studentsResponse.data.map(student => ({
          registrationNo: student.regNo,
          ica01: 0, // Default value to 0
          ica02: 0, // Default value to 0
          ica03: 0, // Default value to 0
          added: false
        }));
        
        const marksData = (marksResponse ? marksResponse.data : []).reduce((acc, mark) => {
          acc[mark.regNo] = { ica01: mark.ica01, ica02: mark.ica02, ica03: mark.ica03 };
          return acc;
        }, {});
        
        const combinedData = registrationNumbers.map(student => ({
          ...student,
          ...marksData[student.registrationNo],
          added: marksData[student.registrationNo] ? true : false
        }));

        console.log('Combined Data:', combinedData);

        setStudentMarks(combinedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student data:', error.message);
      }
    };
    
    fetchStudentData();
  }, [subject]);

  const handleMarksChange = (index, field, value) => {
    const updatedMarksData = [...studentMarks];
    updatedMarksData[index][field] = value === '' ? 0 : Number(value);
    setStudentMarks(updatedMarksData);
  };
  

  const addStudentMarks = async (index) => {
    try {
      const studentMark = studentMarks[index];
      const { registrationNo, ica01, ica02, ica03 } = studentMark;
      const course = subject; // Assuming 'subject' contains the course information
      await axios.post('http://localhost:5000/api/icamarks/add', { regNo: registrationNo, course, ica01, ica02, ica03 });
      console.log('Student marks added successfully');

      // Update the state to reflect that marks have been added
      const updatedMarksData = [...studentMarks];
      updatedMarksData[index].added = true;
      setStudentMarks(updatedMarksData);
    } catch (error) {
      console.error('Error adding student marks:', error.message);
    }
  };

  const handleUpdate = async (index) => {
    try {
      const studentMark = studentMarks[index];
      const { registrationNo, ica01, ica02, ica03 } = studentMark;
      const course = subject; // Assuming 'subject' contains the course information
      await axios.post('http://localhost:5000/api/icamarks/add', { regNo: registrationNo, course, ica01, ica02, ica03 });
      console.log('Student marks updated successfully');
    } catch (error) {
      console.error('Error updating student marks:', error.message);
    }
  };

  const handleDelete = async (index) => {
    try {
      // Get the registration number of the student at the specified index
      const studentMark = studentMarks[index];
      const registrationNo = studentMark.registrationNo;
  
      // Send a DELETE request to the backend API endpoint with the registration number
      await axios.delete(`http://localhost:5000/api/icamarks/${registrationNo}`);
  
      // If the request is successful, update the state to reset marks to zero
      const updatedStudentMarks = [...studentMarks];
      updatedStudentMarks[index].ica01 = 0;
      updatedStudentMarks[index].ica02 = 0;
      updatedStudentMarks[index].ica03 = 0;
      updatedStudentMarks[index].added = false; // Set added to false
      setStudentMarks(updatedStudentMarks);
  
      console.log('Student marks deleted successfully');
    } catch (error) {
      console.error('Error deleting student marks:', error.message);
    }
  };
  

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = studentMarks.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(studentMarks.length / itemsPerPage);

  return (
    <div className='icaContainer'>
      <div className='ica'>
        <h2>Course: {subject}</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <table className="styled-table">
              <thead>
                <tr>
                  <th style={{ width: '10%' }}>Serial No.</th>
                  <th style={{ width: '20%' }}>Registration No.</th>
                  <th style={{ width: '15%' }}>ICA 01</th>
                  <th style={{ width: '15%' }}>ICA 02</th>
                  <th style={{ width: '15%' }}>ICA 03</th>
                  <th style={{ width: '30%' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((student, index) => (
                  <tr key={index}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{student.registrationNo}</td>
                    <td>
                      <input
                        type="number"
                        value={student.ica01 || 0}
                        onChange={(e) => handleMarksChange(indexOfFirstItem + index, 'ica01', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={student.ica02 || 0}
                        onChange={(e) => handleMarksChange(indexOfFirstItem + index, 'ica02', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={student.ica03 || 0}
                        onChange={(e) => handleMarksChange(indexOfFirstItem + index, 'ica03', e.target.value)}
                      />
                    </td>
                    <td className="button-cell">
                      {!student.added ? (
                        <button onClick={() => addStudentMarks(indexOfFirstItem + index)} className="action-button" style={{ backgroundColor: 'rgb(32, 145, 79)'}}>
                          Add
                        </button>
                      ) : (
                        <button onClick={() => handleUpdate(indexOfFirstItem + index)} className="action-button" style={{ backgroundColor: '#26619c'}}>
                          Update
                        </button>
                      )}
                      <button onClick={() => handleDelete(indexOfFirstItem + index)} className="action-button" style={{ backgroundColor: 'rgb(145, 32, 32)'}}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
        <h1>Student Marks</h1>
        <table border="1px solid" className="styled-table">
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Registration No.</th>
              <th>Total Marks</th>
              <th>Average</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((student, index) => (
              <tr key={index}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{student.registrationNo}</td>
                <td>{ // Calculate total marks by summing the maximum two ICA marks
                  Math.max(student.ica01, student.ica02, student.ica03) +
                  Math.min(
                    Math.max(student.ica01, student.ica02),
                    Math.max(student.ica01, student.ica03),
                    Math.max(student.ica02, student.ica03)
                  )
                }</td>
                <td>{ // Calculate average marks
                  ((Math.max(student.ica01, student.ica02, student.ica03) +
                  Math.min(
                    Math.max(student.ica01, student.ica02),
                    Math.max(student.ica01, student.ica03),
                    Math.max(student.ica02, student.ica03)
                  )) * 30) / 200
                }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ICAMarksTable;