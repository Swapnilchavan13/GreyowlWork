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

  const handleLogin = async () => {
    try {
      const response = await fetch('https://lonely-cow-life-jacket.cyclic.app/signup');
      const data = await response.json();

      // Check if a user with the provided email exists and the password matches
      const user = data.find((userData) => userData.email === email);

      if (user && user.password === password) {
        // Successfully logged in, navigate to the account page
        alert('Successfully Logged In');
        navigate('/account');
      } else {
        setErrorMessage('Invalid email or password.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  const createhandle = () => {
    navigate('/');
  };

  return (
    <div className="App">
      <h1>Login Page</h1>
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
