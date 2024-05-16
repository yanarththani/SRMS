import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddAcademicYearPage = ({ userRole }) => {
  const [academicYear, setAcademicYear] = useState('');
  const [academicYears, setAcademicYears] = useState([]);
  const [semester, setSemester] = useState('First Semester');
  const [semesters, setSemesters] = useState(['First Semester', 'Second Semester']);

  useEffect(() => {
    // Fetch academic years from backend
    axios.get('http://localhost:5000/api/academic-years')
      .then(response => {
        setAcademicYears(response.data);
      })
      .catch(error => {
        console.error('Error fetching academic years:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch semesters based on selected academic year
    if (academicYear) {
      axios.get(`http://localhost:5000/api/semesters/${academicYear}`)
        .then(response => {
          setSemesters(response.data);
        })
        .catch(error => {
          console.error('Error fetching semesters:', error);
        });
    }
  }, [academicYear]);

  const addAcademicYear = () => {
    // Send request to backend to add academic year
    axios.post('http://localhost:5000/api/academic-years', { year: academicYear })
      .then(response => {
        console.log('Academic year added successfully');
        setAcademicYears([...academicYears, { _id: response.data._id, year: academicYear }]);
        setAcademicYear('');
      })
      .catch(error => {
        console.error('Error adding academic year:', error);
      });
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  return (
    <div className='container_aca'>
      <div className='form1_box' >
      {userRole === 'admin' && (
        <div >
          <h2>Add Academic Year</h2>
          <input style={{height: '30px', 
    borderRadius: '5px', 
    marginRight: '10px', 
    border: 'none' }}
            type="text" 
            placeholder="Enter academic year" 
            value={academicYear} 
            onChange={(e) => setAcademicYear(e.target.value)} 
          />
          <button className='btn_academic' onClick={addAcademicYear}>Add</button>
          
        </div>
      )}
      <div>
      <h2>Academic Years</h2>
      <select value={academicYear} onChange={(e) => setAcademicYear(e.target.value)}>
        <option value="">Select academic year</option>
        {academicYears.map((yearObject, index) => (
          <option key={index} value={yearObject.year}>{yearObject.year}</option>
        ))}
      </select>
      </div>
      <div>
      <h2>Semesters</h2>
      {/* Render semester dropdown for non-admin users */}
      {/* <select value={semester} onChange={handleSemesterChange}>
            {semesters.map((semesterItem, index) => (
              <option key={index} value={semesterItem}>{semesterItem}</option>
            ))}
          </select> */}
      {userRole !== 'admin' && (
        <select value={semester} onChange={handleSemesterChange}>
          {semesters.map((semesterItem, index) => (
            <option key={index} value={semesterItem}>{semesterItem}</option>
          ))}
        </select>
      )}<br></br>
      <button className="link-button">
  <Link className='link_aca' to={`/subject?academicYear=${academicYear}&semester=${semester}`}>Next</Link>
</button>
      </div>
    </div>
    </div>
  );
};

export default AddAcademicYearPage;
