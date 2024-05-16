import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../StyleSheet/ica.css";

const ICAMarksTable = () => {
  const [academicInfo, setAcademicInfo] = useState({});
  const [studentMarks, setStudentMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTable,setShowTable]=useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

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

  useEffect(() => {
    const fetchStudentRegistrationNumbers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students');
        const registrationNumbers = response.data.map(student => ({
          registrationNo: student.regNo,
          ica01: '',
          ica02: '',
          ica03: ''
        }));
        setStudentMarks(registrationNumbers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student registration numbers:', error.message);
      }
    };

    fetchStudentRegistrationNumbers();
  }, []);

  const handleMarksChange = (index, field, value) => {
    const updatedMarksData = [...studentMarks];
    updatedMarksData[index][field] = value;
    setStudentMarks(updatedMarksData);
  };

  const addStudentMarks = async () => {
    try {
      // Iterate over each student mark and send a separate POST request for each
      for (const studentMark of studentMarks) {
        await axios.post('http://localhost:5000/api/icamarks/add', studentMark);
      }
      console.log('Student marks added successfully');
    } catch (error) {
      console.error('Error adding student marks:', error.message);
    }
  };

const handleClick=()=>{
  setShowTable(true);
}
const handleCancel=()=>{
  setShowTable(false);
}

 // Pagination logic
 const indexOfLastRecord = currentPage * recordsPerPage;
 const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
 const currentRecords = studentMarks.slice(indexOfFirstRecord, indexOfLastRecord);

 const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Academic Information</h1>
      <p>Academic Year: {academicInfo.year}</p>
      <p>Semester: {academicInfo.semester}</p>
      <p>Course Code: {academicInfo.courseCode}</p>

    <br/>
      <h2>Enter Student Marks</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className='custom-table'>
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Registration No.</th>
              <th>ICA 01</th>
              <th>ICA 02</th>
              <th>ICA 03</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentMarks.map((student, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{student.registrationNo}</td>
                <td>
                  <input
                    type="number"
                    value={student.ica01}
                    onChange={(e) => handleMarksChange(index, 'ica01', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={student.ica02}
                    onChange={(e) => handleMarksChange(index, 'ica02', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={student.ica03}
                    onChange={(e) => handleMarksChange(index, 'ica03', e.target.value)}
                  />
                </td>
                <td>
                  <button className='icabtn' id='add' onClick={addStudentMarks}>Add</button>
                  <button className='icabtn' id='update' >Update</button>
                  <button className='icabtn' id='delete' >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      <div className="pagination pagination-teal">
  {Array.from({ length: Math.ceil(studentMarks.length / recordsPerPage) }).map((_, index) => (
    <button 
      key={index} 
      onClick={() => paginate(index + 1)} 
      className={currentPage === index + 1 ? 'active' : ''}
    >
      {index + 1}
    </button>
  ))}
</div>
      <br/>
      <button className='view'  onClick={handleClick}>View</button>


      
      {showTable && (
      <div className='overlay'>
        <div className='overlay-content'> 

      <h1>Student Marks</h1>
      <table className='custom-table'>
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Registration No.</th>
            <th>Total Marks</th>
            <th>Average</th>
          </tr>
        </thead>
        <tbody>
          {studentMarks.map((student, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
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
      <div className="pagination pagination-teal">
  {Array.from({ length: Math.ceil(studentMarks.length / recordsPerPage) }).map((_, index) => (
    <button 
      key={index} 
      onClick={() => paginate(index + 1)} 
      className={currentPage === index + 1 ? 'active' : ''}
    >
      {index + 1}
    </button>
  ))}
</div>
      <br/>
      
      <button className='table' id='adds'onClick={addStudentMarks}>Add Marks</button>
      <button  className='table' id='cancel' onClick={handleCancel}>Cancel</button>
      
    </div>

    
    </div>)}
      </div>
  );
};

export default ICAMarksTable;