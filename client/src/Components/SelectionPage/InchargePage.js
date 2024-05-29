import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const InchargePage = ({ lecturerName, userRole }) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [additionalOptions, setAdditionalOptions] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/subjects/lecturer?lecturerName=${lecturerName}`);
        // Check if the response data is an array before setting state
        if (Array.isArray(response.data.data.subjects)) { // Accessing subjects from data property
          setSubjects(response.data.data.subjects);
        } else {
          console.error('Invalid subjects data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching subjects:', error.message);
      }
    };

    fetchSubjects();
  }, [lecturerName]);

  useEffect(() => {
    // Additional options based on the selected subject
    if (selectedSubject) {
      setAdditionalOptions(['ICAE', 'Final First Marking', 'Final Second Marking','Composite Sheet']);
    } else {
      setAdditionalOptions([]);
    }
  }, [selectedSubject]);

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  // Handle navigation to the selected option
  const handleOptionSelect = (option) => {
    // Navigate to the page corresponding to the selected option
    navigate(`/${option}`, { state: { subject: selectedSubject } }); // Pass the selected subject as state
  };

  // Render the component only if the user is a lecturer
  if (userRole !== 'lecturer') {
    return null;
  }

  return (
    <div className='add_lec'>
      <h1>Lecturer Subject Page</h1>
      <label htmlFor="subject">Select Subject:</label>
      <select id="subject" value={selectedSubject} onChange={handleSubjectChange}>
        <option value="">Select Subject</option>
        {subjects.map((subject, index) => (
          <option key={index} value={subject.code}>{subject.name}</option>
        ))}
      </select>
      <br /><br />
      <label htmlFor="additionalOptions">Additional Options:</label>
      <select id="additionalOptions" disabled={!selectedSubject} onChange={(e) => handleOptionSelect(e.target.value)}>
        <option value="">Select Option</option>
        {additionalOptions.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default InchargePage;
