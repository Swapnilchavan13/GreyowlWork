import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Get existing users' data from local storage
    const existingUsersData = JSON.parse(localStorage.getItem('usersData')) || [];

    // Find the user with the matching email
    const user = existingUsersData.find((userData) => userData.email === email);

    // Check if a user with the provided email exists and the password matches
    if (user && user.password === password) {
      // Call the onLogin callback to redirect to the creation page
    //   onLogin();
    alert("Successfully Logged In")
      navigate("/account")
    } else {
      setErrorMessage('Invalid email or password.');
    }
  };
  const createhandle = ()=>{
    navigate("/")
  }

  return (
    <div className="App">
      <h1>Login</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
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
      </div><br />
      <button onClick={handleLogin}>Login</button>
      <p onClick={createhandle}>Create an Account</p>
    </div>
  );
};
