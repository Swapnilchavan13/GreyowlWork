import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import "./account.css";

export const Account = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    phone: '',
    contactPerson1: '',
    contactPerson2: '',
    etc: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateAccount = () => {
    if (Object.values(formData).some(value => value === '')) {
        alert('Please fill in all required fields before creating an account.');
        return;
      }
    
      // Save data to local storage
      localStorage.setItem('formData', JSON.stringify(formData));
      localStorage.setItem('userName', formData.name);
    
      // Navigate to the customer page
      alert('Account Created Successfully');
      navigate('/customer'); // Replace '/customer' with the actual route
  };

  return (
    <div className='account-container'>
      <h1>Account Creation Form</h1>
      <div >
        <label>Name</label><br />
        <input type="text" name="name" placeholder='Enter Your Name' onChange={handleChange} required />
      </div>
      <div>
        <label>Age</label><br />
        <input type="number" name="age" placeholder='Enter Your Age' onChange={handleChange} required/>
      </div>
      <div>
        <label>Address</label><br />
        <input type="text" name="address" placeholder='Enter Your Address' onChange={handleChange} required/>
      </div>
      <div>
        <label>Phone</label><br />
        <input type="number" name="phone" placeholder='Enter Your Phone Number' onChange={handleChange} required/>
      </div>
      <div>
        <label>Contact of Person 1</label><br />
        <input type="number" name="contactPerson1" placeholder='Add Other Contact' onChange={handleChange} required/>
      </div>
      <div>
        <label>Contact of Person 2</label><br />
        <input type="number" name="contactPerson2" placeholder='Add Other Contact' onChange={handleChange} required/>
      </div>
      <div>
        <label>Etc</label><br />
        <input type="text" name="etc" placeholder='Other' onChange={handleChange} required/>
      </div>

<br />
      <button className='create-button' onClick={handleCreateAccount}>
        Create Account
      </button>
    </div>
  );
};
