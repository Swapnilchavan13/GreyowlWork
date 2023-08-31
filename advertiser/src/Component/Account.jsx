import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import "./account.css";

export const Account = () => {
 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    year: '',
    businessType1: 'FMCG',
    businessType2: '',
    des:'',
    address: '',
    state:'',
    city:'',
    pin:'',
    phone: '',
    email: '',
    contactPerson: '',
    etc: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateAccount = async () => {
    if (Object.values(formData).some((value) => value === '')) {
      alert('Please fill in all required fields before creating an account.');
      return;
    }

    try {
      const response = await fetch('https://lonely-cow-life-jacket.cyclic.app/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Account Created Successfully');
        navigate('/campaign'); // Replace with the actual route

      } else {
        alert('Failed to create account');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      alert('An error occurred while creating the account');
    }
  };

  return (
    <div className='account-container'>
      <h1>Account Creation Form</h1>
      <div>
        <label>Business Name</label><br />
        <input type="text" name="name" placeholder='Enter Name of your Business' onChange={handleChange} required />
      </div>
      <div>
      <label>Year of Establishment</label><br />
        <input
          type="text"
          name="year"
          placeholder="Year Of Establishment Eg. 2026"
          value={formData.year}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Choose Business Type</label><br />
        <select
          name="businessType1"
          value={formData.businessType1}
          onChange={handleChange}
        >
          <option value="FMCG">FMCG</option>
          <option value="Retail">Retail</option>
          <option value="Hospitality">Hospitality</option>
          <option value="Education">Education</option>
          <option value="Medical">Medical</option>
        </select>
        <span>
          <select
            name="businessType2"
            value={formData.businessType2}
            onChange={handleChange}
          >
            <option value="">Choose</option>
            <option value="Jewellery">Jewellery</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Food">Food</option>
            <option value="Other">Other</option>
          </select>
        </span>
      </div>
      <div>
        <label>Business Description</label><br />
        <input type="text" name="des" placeholder='Describe Your Business' onChange={handleChange} required/>
      </div>
  
      <div>
        <label>Address</label><br />
        <input type="text" name="address" placeholder='House Number Building Name' onChange={handleChange} required/>
        <input type="number" name="pin" placeholder='Enter Your Pin Code' onChange={handleChange} required/>
        <select name="state" 
        value={formData.state}
          onChange={handleChange}>
          <option value="">select your State</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Punjab">Punjab</option>
          <option value="Rajasthan">Rajasthan</option>
        </select>
        <select name="city" 
        value={formData.city}
          onChange={handleChange}>
          <option value="">select your city</option>
          <option value="Aurangabad">Aurangabad</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
        </select>
      </div>
      <div>
        <label>Enter Phone Number</label><br />
        <input type="number" name="phone" placeholder='Enter Your Phone Number' onChange={handleChange} required/>
      </div>
      <div>
        <label>Enter Email</label><br />
        <input type="email" name="email" placeholder='Enter Your Email Id' onChange={handleChange} required/>
      </div>
      <div>
        <label>Contact Person Name</label><br />
        <input type="text" name="contactPerson" placeholder='Enter Contact Person Name' onChange={handleChange} required/>
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
