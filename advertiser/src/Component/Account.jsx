import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "./account.css";

export const Account = () => {
  const location = useLocation();
  const iddata = location.state;

  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  var Btype = [
    {
      type: "FMCG",
      subtype: ["Food and Beverages", "Personal Care and Hygiene", "Home care"],
    },

    {
      type: "Retail",
      subtype: [
        "Jewellery",
        "Clothing",
        "Electronics",
        "Mobile",
        "Food and Beverages",
        "Children Care",
      ],
    },

    {
      type: "Hospitality",
      subtype: [
        "Wedding",
        "Lodging",
        "Restaurant",
        "Travel and Tourism",
        "Events",
      ],
    },

    {
      type: "Education",
      subtype: ["School", "College", "Professional", "Institute"],
    },

    {
      type: "Medical",
      subtype: ["Medical Store", "Hospital", "Nursing Homes", "Clinics"],
    },

    {
      type: "Real Estate",
      subtype: [
        "Residential",
        "Commercial",
        "Industrial",
        "Vacation Properties",
      ],
    },
  ];

  var AddressCities = [
    {
      type: "Maharashtra",
      subtype: ["Mumbai", "Pune", "Nagpur", "Nasik", "Aurangabad"],
    },

    {
      type: "Punjab",
      subtype: ["Ludhiana", "Amritsar", "Patiala", "Jalandhar", "Mohali"],
    },

    {
      type: "Rajasthan",
      subtype: ["Jaipur", "Jodhpur", "Bikaner", "Udaipur", "Alwar"],
    },

    {
      type: "Madhya Pradesh",
      subtype: [
        "Bhopal",
        "Gwalior",
        "Jabalpur",
        "Ujjain",
        "Dewas",
        "Satna",
        "Indore",
      ],
    },
  ];

  // console.log(iddata.register_id)
  const campiddata = { register_camp_id: iddata.register_id };

  const [formData, setFormData] = useState({
    register_id: iddata.register_id,
    name: "",
    year: "",
    businessType1: "",
    businessType2: "",
    des: "",
    address1: "",
    address2: "",
    state: "",
    city: "",
    pin: "",
    phone: "",
    businessphone: "",
    email: "",
    contactPerson: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateAccount = async () => {
    if (Object.values(formData).some((value) => value === "")) {
      alert("Please fill in all required fields before creating an account.");
      return;
    }

    try {
      setIsSaving(true);
      const response = await fetch(
        "http://62.72.59.146:3000/address",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Account Created Successfully");
        setIsSaving(false);
        navigate("/addcreator", { state: campiddata }); // Replace with the actual route
      } else {
        alert("Failed to create account");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      alert("An error occurred while creating the account");
    }
  };

  return (
    <div className="account-container">
      <h1>Account Creation Form</h1>
      <div>
        <label>Business Name</label>
        <br />
        <input
          type="text"
          name="name"
          placeholder="Enter Name of your Business"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Year of Establishment</label>
        <br />
        <input
          type="text"
          name="year"
          placeholder="Year Of Establishment Eg. 2012"
          value={formData.year}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Choose Business Type</label>
        <br />
        <select
          name="businessType1"
          value={formData.businessType1}
          onChange={handleChange}
        >
          <option value="">Choose</option>
          {Btype.map((item) => (
            <option key={item.type} value={item.type}>
              {item.type}
            </option>
          ))}
        </select>

        {formData.businessType1 && (
          <span>
            <select
              name="businessType2"
              value={formData.businessType2}
              onChange={handleChange}
            >
              {/* <option value="">Choose</option> */}
              {Btype.find(
                (item) => item.type === formData.businessType1
              )?.subtype.map((subtype) => (
                <option key={subtype} value={subtype}>
                  {subtype}
                </option>
              ))}
            </select>
          </span>
        )}
      </div>

      <div>
        <label>Business Description</label>
        <br />
        <input
          type="text"
          name="des"
          placeholder="Describe Your Business"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Address</label>
        <br />
        <input
          type="text"
          name="address1"
          placeholder="House Number Building Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address2"
          placeholder="Street and landmark"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="pin"
          placeholder="Enter Your Pin Code"
          onChange={handleChange}
          required
        />

        <div>
          <label>Choose State And City</label>
          <br />
          <select name="state" value={formData.state} onChange={handleChange}>
            <option value="">Choose State</option>
            {AddressCities.map((item) => (
              <option key={item.type} value={item.type}>
                {item.type}
              </option>
            ))}
          </select>

          {formData.state && (
            <span>
              <select name="city" value={formData.city} onChange={handleChange}>
                <option value="">Choose City</option>
                {AddressCities.find(
                  (item) => item.type === formData.state
                )?.subtype.map((subtype) => (
                  <option key={subtype} value={subtype}>
                    {subtype}
                  </option>
                ))}
              </select>
            </span>
          )}
        </div>
      </div>
      <div>
        <label>Contact Person`s Phone Number</label>
        <br />
        <input
          type="number"
          name="phone"
          placeholder="Enter Your Phone Number"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Enter Business Phone Number</label>
        <br />
        <input
          type="businessnumber"
          name="businessphone"
          pattern="\d{3}[\-]\d{3}[\-]\d{4}"
          placeholder="Enter Your Business Phone Number"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Contact Person`s Email Id</label>
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email Id"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Contact Person`s Name</label>
        <br />
        <input
          type="text"
          name="contactPerson"
          placeholder="Enter Contact Person`s Name"
          onChange={handleChange}
          required
        />
      </div>
      <br />
      <button
        className="create-button"
        onClick={handleCreateAccount}
        disabled={isSaving}
      >
        {isSaving ? "Saving..." : "Create Account"}
      </button>
    </div>
  );
};
