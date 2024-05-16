import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../UserContext";
import './StyleSheet.css';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const values = useContext(UserContext);
  const [,setRole,,setLecturerName]= values;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/lecturers/login', {
        username,
        password
      });

      const role = response.data.role;
      const lectureName = response.data.LectureName;

      if (role === 'lecturer' || role === 'admin') {
        setRole(role); 
        setLecturerName(lectureName);
        navigate('/home');
      } else {
        setError('User is not authorized');
      }
    } catch (error) {
      setError('Invalid username or password');
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="curved_shape1"></div>
        <div className="form_box Login">
          <h2 style={{ '--D': 0, '--S': 21 }}>Login</h2>
          {error && <p className="error" style={{color:"red"}}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input_box" style={{ '--D': 1, '--S': 22 }}>
              <label>Username</label>
              <input
                type="text"
                name="uname"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input_box" style={{ '--D': 2, '--S': 23 }}>
              <label>Password</label>
              <input
                type="password"
                name="pwd"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input_box" style={{ '--D': 3, '--S': 24 }}>
              <button type="submit" className="btn btn-success">Login</button>
            </div>
          </form>
        </div>

        <div className="info-content Login">
        <h6 style={{ '--D': 0, '--S': 20 }}>
          Department of Physical Science<br></br>
          Faculty of Applied Science</h6><br></br>
          <h3 style={{ '--D': 0, '--S': 20 }}>Student Results Management System
          </h3>
          
        </div>
      </div>
    </div>
  );
}

export default Login;
