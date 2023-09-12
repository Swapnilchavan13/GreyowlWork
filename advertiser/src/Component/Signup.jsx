import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCpasswordChange = (e) => {
    setCpassword(e.target.value);
  };

  const handleLogin =() => {
    navigate('/login')
  }

  const handleSignup = () => {
    // Validate the form fields
    if (!name || !email || !password || !cpassword) {
      setErrorMessage('All fields are required.');
    } else if (password !== cpassword) {
      setErrorMessage('Passwords do not match.');
    } else {
      // Get existing users' data from local storage
      const existingUsersData = JSON.parse(localStorage.getItem('usersData')) || [];

      // Create an object to represent the user data
      const userData = {
        name,
        email,
        password,
      };

      // Add the new user data to the existing users' data
      existingUsersData.push(userData);

      // Save the updated users' data array in local storage
      localStorage.setItem('usersData', JSON.stringify(existingUsersData));

      alert("Account Is Created");
      navigate("/login")
      // Clear the form fields and error message after saving
      setName('');
      setEmail('');
      setPassword('');
      setCpassword('');
      setErrorMessage('');
    }
  };

  return (
    <div className="App">
      <h1>Signup Form</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div>
        <label htmlFor="name">User Name</label><br />
        <input
          type="text"
          id="name"
          value={name}
          placeholder="Enter User Name"
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label htmlFor="email">User Email Id</label><br />
        <input
          type="email"
          id="email"
          value={email}
          placeholder="Enter Email Id"
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label><br />
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Enter Password"
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <label htmlFor="cpassword">Confirm Password</label><br />
        <input
          type="password"
          id="cpassword"
          value={cpassword}
          placeholder="Again Enter Password"
          onChange={handleCpasswordChange}
        />
      </div><br />
      <button onClick={handleSignup}>Signup</button>
    
      <p onClick={handleLogin}>Already an User</p>
      
    </div>

  );
};
