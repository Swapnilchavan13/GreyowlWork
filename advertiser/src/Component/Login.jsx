import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://62.72.59.146:3000/signup"
      );
      const data = await response.json();

      // Find the user with the provided email
      const user = data.find((userData) => userData.email === email);

      if (user && user.password === password) {
        // Successfully logged in, navigate to the account page
        const register_id = user._id;
        const loginname = user.name;

        const iddata = { register_id: register_id };
        localStorage.setItem("mainid", register_id); 
        localStorage.setItem("lname", loginname); 
        alert("Successfully Logged In");
        console.log(iddata.register_id);
        // Save register_id in local storage
        navigate("/iddata")
        // navigate(`/account`, { state: iddata }); // Include the _id in the URL
      }
      else {
        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const createhandle = () => {
    navigate("/");
  };

  return (
    <div className="App">
      <h1>Login Page</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
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
      <br />
      <button onClick={handleLogin}>Login</button>
      <p onClick={createhandle}>Create an Account</p>
    </div>
  );
};