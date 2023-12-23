import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = async () => {
    // Validate the form fields
    if (!name || !email || !password || !cpassword) {
      setErrorMessage("All fields are required.");
    } else if (password !== cpassword) {
      setErrorMessage("Passwords do not match.");
    } else {
      try {
        // setErrorMessage("Failed to create an account.");
        // Create an object to represent the user data
        const userData = {
          name,
          email,
          password,
        };
        // Make a POST request to your API to save the user data

        const response = await fetch(
          "http://62.72.59.146:3000/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );

        // Check if the request was successful
        if (response.status === 201) {
          alert("Account Is Created");
          navigate("/login");
        } 
        else {
          alert("Email is already Registerd");
          setErrorMessage("Failed to create an account.");
        }
      } catch (error) {
        alert("Email is already Registerd");
        console.error("Error creating an account:", error);
      }

      // Clear the form fields and error message after saving
      setName("");
      setEmail("");
      setPassword("");
      setCpassword("");
      setErrorMessage("");
    }
  };

  return (
    <div className="App">
      <h1>Signup Page</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div>
        <label htmlFor="name">User Name</label>
        <br />
        <input
          type="text"
          id="name"
          value={name}
          placeholder="Enter User Name"
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label htmlFor="email">User Email Id</label>
        <br />
        <input
          type="email"
          id="email"
          value={email}
          placeholder="Enter Email Id"
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Enter Password"
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <label htmlFor="cpassword">Confirm Password</label>
        <br />
        <input
          type="password"
          id="cpassword"
          value={cpassword}
          placeholder="Again Enter Password"
          onChange={handleCpasswordChange}
        />
      </div>
      <br />
      <button onClick={handleSignup}>Signup</button>

      <p onClick={handleLogin}>Already an User</p>
    </div>
  );
};
