import '../Style/Admin.css'
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Style/Admin.css';

export default function AdminLogin() {
    const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', credentials);
      console.log('Login successful:', response.data);
      navigate('/adm');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('An error occurred. Please try again.');
      }
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='bac'>
        <br /><br /><br />
    <div className="login-container">
      <h2>ADMIN LOGIN</h2>
      <form onSubmit={handleSubmit}>
        <div>
        <label>
            Username:
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>Password: <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
}
