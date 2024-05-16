import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './FormStyleSheet.css';

const SubjectPage = ({ userRole }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const academicYear = queryParams.get('academicYear');
  const semester = queryParams.get('semester');

  const [lecturerOptions, setLecturerOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/lecturers/lecturer');
        const filteredLecturers = response.data.filter(lecturer => lecturer.role === 'lecturer');
        setLecturerOptions(filteredLecturers.map(lecturer => lecturer.lectureName));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lecturers:', error.message);
      }
    };

    fetchLecturers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const subjectName = formData.get('subjectName');
    const subjectCode = formData.get('subjectCode');
    const lecturerInCharge = formData.get('lecturerInCharge');

    try {
      const response = await axios.post('http://localhost:5000/api/subjects', {
        subjectName,
        subjectCode,
        lecturerInCharge
      });

      if (response.status === 201) {
        console.log('Subject added successfully');
        // Clear form fields after successful submission
        e.target.reset();
      } else {
        console.error('Failed to add subject');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  // Only render if the user has the 'admin' or 'lecturer' role
  if (userRole !== 'admin' ) {
    return null;
  }

  return (
    <div  className='add_sub'>
      <h1>Subject Details</h1>
      <h3>Academic Year: {academicYear}</h3>
      <h3>Semester: {semester}</h3>
<br></br>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Add Subject</h2>
          <form onSubmit={handleSubmit}>
           <div className='input_box_lec'>
           <label htmlFor="subjectName">Subject Name:</label>
            <input style={{height: '30px', borderRadius: '5px'}} type="text" id="subjectName" name="subjectName" required />
           </div>
            
            <div className='input_box_lec'>
            <label htmlFor="subjectCode">Subject Code:</label>
            <input style={{height: '30px', borderRadius: '5px'}} type="text" id="subjectCode" name="subjectCode" required />
            </div>
            <div className='input_box_lec'>
            <label htmlFor="lecturerInCharge">Lecturer In Charge:</label>
            <select  id="lecturerInCharge" name="lecturerInCharge" required>
              <option value="">Select Lecturer</option>
              {lecturerOptions.map((lecturer, index) => (
                <option key={index} value={lecturer}>{lecturer}</option>
              ))}
            </select>
            </div>
            
            <button style={{marginLeft:'170px'}} className='btn_academic' type="submit">Add Subject</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SubjectPage;
