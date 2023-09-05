import React, { useEffect, useState } from "react";

export const Usersummary = () => {
  const [savedData, setSavedData] = useState([]);
  const [campData, setCampdata] = useState([]);
  const [mediaData, setMediaData] = useState([]);

  const [editedData, setEditedData] = useState({});
  const [editedCamp, setEditedCamp] = useState({});
  const [editedBuss, setEditedBuss] = useState({});

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingcamp, setIsEditingcamp] = useState(false);
  const [isEditingbuss, setIsEditingbuss] = useState(false);

  var Btype  = [
    {
      "type": "FMCG",
      "subtype": ["Food and Beverages","Personal Care and Hygiene", "Home care"]
    },

    {
      "type": "Retail",
      "subtype":["Jewellery", "Clothing", "Electronics", "Mobile", "Food and Beverages", "Children Care"]
    },

    {
      "type": "Hospitality",
      "subtype":["Wedding", "Lodging", "Restaurant", "Travel and Tourism", "Events"]
    },
    
    {
      "type": "Education",
      "subtype":["School", "College", "Professional","Institute"]
    },

    {
      "type": "Medical",
      "subtype":["Medical Store", "Hospital", "Nursing Homes", "Clinics"]
    }
  ]

  useEffect(() => {
    const apiUrl = "https://lonely-cow-life-jacket.cyclic.app/address";

    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update the component's state with the received data
        setSavedData(data[data.length - 1]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = "https://lonely-cow-life-jacket.cyclic.app/campaign";

    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update the component's state with the received data
        setCampdata(data[data.length - 1]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = "https://lonely-cow-life-jacket.cyclic.app/business";

    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update the component's state with the received data
        setMediaData(data[data.length - 1]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Function to handle inline editing
  const handleEdit = () => {
    setEditedData({ ...savedData }); // Copy the current data for editing
    setIsEditing(true);
  };

  // Function to handle inline editing for Camapign
  const handleEditCamp = () => {
    setEditedCamp({ ...campData }); // Copy the current data for editing
    setIsEditingcamp(true);
  };

  // Function to handle inline editing for Business
  const handleEditBuss = () => {
    setEditedBuss({ ...mediaData });
    setIsEditingbuss(true);
  };

  // Function to handle canceling the edit
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Function to handle canceling the edit for Campaign
  const handleCancelCamp = () => {
    setIsEditingcamp(false);
  };

  // Function to handle canceling the edit for Business
  const handleCancelBuss = () => {
    setIsEditingbuss(false);
  };

  // Function to handle saving the edited data
  const handleSave = () => {
    // Perform validation on editedData here
    // For example, you can check if required fields are filled, validate email format, etc.
    // If validation fails, display an error message and prevent saving

    // Assuming the validation is successful, you can send the updated data to the server
    const apiUrl = "https://lonely-cow-life-jacket.cyclic.app/address"; // Replace with the correct API URL

    // Send a PUT request to update the data on the server
    fetch(apiUrl, {
      method: "PUT", // Use the appropriate HTTP method for updating data
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData), // Send the updated data
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to update data on the server");
        }

        // Assuming the API response contains the updated data,
        // you can fetch it and update the state
        const updatedData = await response.json();

        // Update the state to reflect the changes in the UI
        setSavedData(updatedData);
        // If the update was successful, set isEditing to false
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        // Handle and display the error to the user if needed
      });
  };

  // Function to handle saving the edited data for campaign
  const handlecampaignsave = () => {
    // Perform validation on editedData here
    // For example, you can check if required fields are filled, validate email format, etc.
    // If validation fails, display an error message and prevent saving

    // Assuming the validation is successful, you can send the updated data to the server
    const apiUrl = "https://lonely-cow-life-jacket.cyclic.app/campaign"; // Replace with the correct API URL

    // Send a PUT request to update the data on the server
    fetch(apiUrl, {
      method: "PUT", // Use the appropriate HTTP method for updating data
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedCamp), // Send the updated data
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to update data on the server");
        }
        // Assuming the API response contains the updated data,
        // you can fetch it and update the state
        const updatedCampData = await response.json();

        // Update the state to reflect the changes in the UI
        setCampdata(updatedCampData);
        // If the update was successful, set isEditing to false
        setIsEditingcamp(false);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        // Handle and display the error to the user if needed
      });
  };

  // Function to handle saving the edited data for Business
  const handlebusinesssave = () => {
    // Perform validation on editedData here
    // For example, you can check if required fields are filled, validate email format, etc.
    // If validation fails, display an error message and prevent saving

    // Assuming the validation is successful, you can send the updated data to the server
    const apiUrl = "https://lonely-cow-life-jacket.cyclic.app/business"; // Replace with the correct API URL

    // Send a PUT request to update the data on the server
    fetch(apiUrl, {
      method: "PUT", // Use the appropriate HTTP method for updating data
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedBuss), // Send the updated data
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to update data on the server");
        }
        // Assuming the API response contains the updated data,
        // you can fetch it and update the state
        const updatedBussData = await response.json();

        // Update the state to reflect the changes in the UI
        setMediaData(updatedBussData);
        // If the update was successful, set isEditing to false
        setIsEditingbuss(false);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        // Handle and display the error to the user if needed
      });
  };



  var districtsData = [
    {
      district: "Mumbai",
      talukas: [
        {
          taluka: "Mumbai City",
          villages: ["Colaba", "Dadar", "Fort"],
        },
        {
          taluka: "Mumbai Suburban",
          villages: ["Andheri", "Borivali", "Kandivali"],
        },
      ],
    },
    {
      district: "Pune",
      talukas: [
        {
          taluka: "Pune City",
          villages: ["Shivajinagar", "Kothrud", "Khadki"],
        },
        {
          taluka: "Pimpri-Chinchwad",
          villages: ["Pimpri", "Chinchwad", "Akurdi"],
        },
      ],
    },
    {
      district: "Bangalore",
      talukas: [
        {
          taluka: "Bangalore North",
          villages: ["Hebbal", "Yelahanka", "Nagavara"],
        },
        {
          taluka: "Bangalore South",
          villages: ["Jayanagar", "Basavanagudi", "BTM Layout"],
        },
      ],
    },
  ];

  const ageRanges = [
    { label: "13-17", value: "13-17" },
    { label: "18-25", value: "18-25" },
    { label: "26-35", value: "26-35" },
    { label: "36-50", value: "36-50" },
    { label: "50+", value: "50+" },
  ];

  const genderOptions = ["Male", "Female"];
  const attributeOptions = ["Individual", "Couple", "Children", "Family"];

  const handleDecrease = () => {
    if (editedCamp.budget - 250 >= 500) {
      setEditedCamp({
        ...editedCamp,
        budget: editedCamp.budget - 250,
      });
    }
  };

  const handleIncrease = () => {
    setEditedCamp({
      ...editedCamp,
      budget: editedCamp.budget + 250,
    });
  };

  const handleCheckboxChange = (fieldName) => {
    setEditedCamp({
      ...editedCamp,
      [fieldName]: !editedCamp[fieldName],
    });
  };

  const districtOptions = districtsData.map((district) => (
    <option key={district.district} value={district.district}>
      {district.district}
    </option>
  ));

  const businessAdjectives = [
    "Reliable",
    "Innovative",
    "Professional",
    "Quality",
    "Efficient",
    "Trustworthy",
    "Dynamic",
    "Creative",
    "Responsive",
    "Modern",
    "Experienced",
    "Flexible",
    "Ethical",
    "Expert",
    "Customer-Oriented",
  ];

  const modelTypes = [
    "Female (18-25)",
    "Female (25-40)",
    "Male (18-25)",
    "Male (25-40)",
    "Couple (18-25)",
    "Couple (26-40)",
    "Family (of 4 people)",
    "Senior Citizen",
  ];

  const adTypes = ["Slide", "Slide And Audio", "Video", "3D"];

  const durations = [
    "10 Sec",
    "20 Sec",
    "30 Sec",
    "40 Sec",
    "50 Sec",
    "60 Sec",
  ];

  return (
    <div style={{ padding: "10px" }}>
      <h1>User Campaign Summary</h1>
      <div id="summary">
        {/* Create Account */}
        <div>
          <h3>Creative Summary</h3>
          {isEditing ? (
            <div>
              {/* Editable fields */}
              <label htmlFor="">Business Name</label>
              <br />
              <input
                type="text"
                value={editedData.name}
                onChange={(e) =>
                  setEditedData({ ...editedData, name: e.target.value })
                }
              />
              <br />
              <label htmlFor="">Year of Establishment</label>
              <br />
              <input
                type="text"
                value={editedData.year}
                onChange={(e) =>
                  setEditedData({ ...editedData, year: e.target.value })
                }
              />
              <br />
              {/* <div>
                <label>Choose Business Type</label>
                <br />
                <select
                  name="businessType1"
                  value={editedData.businessType1}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      businessType1: e.target.value,
                    })
                  }
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
                    value={editedData.businessType2}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        businessType2: e.target.value,
                      })
                    }
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
              </div> */}

<div>
  <label>Choose Business Type</label>
  <br />
  <select
    name="businessType1"
    value={editedData.businessType1} // Change to editedData.businessType1
    onChange={(e) =>
      setEditedData({ ...editedData, businessType1: e.target.value })
    }
  >
    <option value="">Choose</option>
    {Btype.map((item) => (
      <option key={item.type} value={item.type}>
        {item.type}
      </option>
    ))}
  </select>

  {editedData.businessType1 && (
    <span>
      <select
        name="businessType2"
        value={editedData.businessType2}
        onChange={(e) =>
          setEditedData({ ...editedData, businessType2: e.target.value })
        }
      >
        <option value="">Choose</option>
        {/* Use optional chaining to safely access the subtype array */}
        {Btype.find((item) => item.type === editedData.businessType1)?.subtype?.map((subtype) => (
          <option key={subtype} value={subtype}>
            {subtype}
          </option>
        ))}
      </select>
    </span>
  )}
</div>


              <br />
              <label>Description</label>
              <br />
              <input
                type="text"
                value={editedData.des}
                onChange={(e) =>
                  setEditedData({ ...editedData, des: e.target.value })
                }
              />
              <br />
              <label>Address</label>
              <br />
              <input
                type="text"
                value={editedData.address}
                onChange={(e) =>
                  setEditedData({ ...editedData, address: e.target.value })
                }
              />
              <br />
              <label>State & City</label>
              <br />
              <select
                name="state"
                value={editedData.state}
                onChange={(e) =>
                  setEditedData({ ...editedData, state: e.target.value })
                }
              >
                <option value="">select your State</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
              </select>
              <select
                name="city"
                value={editedData.city}
                onChange={(e) =>
                  setEditedData({ ...editedData, city: e.target.value })
                }
              >
                <option value="">select your city</option>
                <option value="Aurangabad">Aurangabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
              </select>
              <br />
              <label htmlFor="">Pincode</label> <br />
              <input
                type="text"
                value={editedData.pin}
                onChange={(e) =>
                  setEditedData({ ...editedData, pin: e.target.value })
                }
              />
              <br />
              <label htmlFor="">Contact Number</label> <br />
              <input
                type="text"
                value={editedData.contactPerson}
                onChange={(e) =>
                  setEditedData({
                    ...editedData,
                    contactPerson: e.target.value,
                  })
                }
              />
              <br />
              <label htmlFor="">Email Id</label> <br />
              <input
                type="text"
                value={editedData.email}
                onChange={(e) =>
                  setEditedData({ ...editedData, email: e.target.value })
                }
              />
              <br />
              <label htmlFor="">Other Contact Person</label> <br />
              <input
                type="text"
                value={editedData.phone}
                onChange={(e) =>
                  setEditedData({ ...editedData, phone: e.target.value })
                }
              />
              <br />
              <label htmlFor="">Etc</label> <br />
              <input
                type="text"
                value={editedData.etc}
                onChange={(e) =>
                  setEditedData({ ...editedData, etc: e.target.value })
                }
              />
              <br />
              <br />
              {/* Add input fields for other fields */}
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <div>
              <ul>
                <div className="main">
                  <strong>Name:</strong> {savedData.name}
                  <br />
                  <strong>Year:</strong> {savedData.year}
                  <br />
                  <strong>Business Type 1:</strong> {savedData.businessType1}
                  <br />
                  <strong>Business Type 2:</strong> {savedData.businessType2}
                  <br />
                  <strong>Description:</strong> {savedData.des}
                  <br />
                  <strong>Address:</strong> {savedData.address}
                  <br />
                  <strong>City:</strong> {savedData.city}
                  <br />
                  <strong>State:</strong> {savedData.state}
                  <br />
                  <strong>Pin:</strong> {savedData.pin}
                  <br />
                  <strong>Contact Person:</strong> {savedData.contactPerson}
                  <br />
                  <strong>Email:</strong> {savedData.email}
                  <br />
                  <strong>Phone:</strong> {savedData.phone}
                  <br />
                  <strong>ETC:</strong> {savedData.etc}
                  <br />
                  {/* Add more fields here */}
                </div>
              </ul>
              <button onClick={handleEdit}>Edit</button>
            </div>
          )}
        </div>
        {/* Campaign Data */}
        <div>
          <h3>Campaign Elements</h3>
          {isEditingcamp ? (
            <div>
              <div>
                <label>Select District:</label>
                <select
                  value={editedCamp.selectedDistrict}
                  onChange={(e) =>
                    setEditedCamp({
                      ...editedCamp,
                      selectedDistrict: e.target.value,
                    })
                  }
                >
                  <option value="">Select</option>
                  {districtOptions}
                </select>
              </div>

              <div className="dropdown">
                <label className="selelabel">Select Talukas:</label>
                <select
                  className="sele"
                  multiple
                  value={editedCamp.selectedTalukas}
                  onChange={(e) =>
                    setEditedCamp({
                      ...editedCamp,
                      selectedTalukas: e.target.value,
                    })
                  }
                >
                  {/* {talukaOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))} */}
                </select>
              </div>
              <div className="dropdown">
                <label className="selelabel">Select Villages:</label>
                <select
                  className="sele"
                  multiple
                  value={editedCamp.selectedVillages}
                  onChange={(e) =>
                    setEditedCamp({
                      ...editedCamp,
                      selectedVillages: e.target.value,
                    })
                  }
                >
                  {/* {villageOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))} */}
                </select>
              </div>

              <div>
                <label>Campaign Range :</label>
                <br />
                <input
                  type="radio"
                  name="range"
                  value="1000-2500"
                  onChange={(e) =>
                    setEditedCamp({ ...editedCamp, range: e.target.value })
                  }
                  checked={editedCamp.range === "1000-2500"}
                />{" "}
                1000 - 2500
                <input
                  type="radio"
                  name="range"
                  value="2500-5000"
                  checked={editedCamp.range === "2500-5000"}
                  onChange={(e) =>
                    setEditedCamp({ ...editedCamp, range: e.target.value })
                  }
                />{" "}
                2500 - 5000
                <input
                  type="radio"
                  name="range"
                  value="5000-7500"
                  onChange={(e) =>
                    setEditedCamp({ ...editedCamp, range: e.target.value })
                  }
                  checked={editedCamp.range === "5000-7500"}
                />{" "}
                5000 - 7500
                <input
                  type="radio"
                  name="range"
                  value="7500-10000"
                  onChange={(e) =>
                    setEditedCamp({ ...editedCamp, range: e.target.value })
                  }
                  checked={editedCamp.range === "7500-10000"}
                />{" "}
                7500 - 10000
                <input
                  type="radio"
                  name="range"
                  value="10000+"
                  onChange={(e) =>
                    setEditedCamp({ ...editedCamp, range: e.target.value })
                  }
                  checked={editedCamp.range === "10000+"}
                />{" "}
                10000+
              </div>

              <div>
                <label>Select Age Range :</label>
                <br />
                {ageRanges.map((range) => (
                  <label key={range}>
                    <input
                      type="checkbox"
                      value={range.value}
                      checked={editedCamp.selectedRanges.includes(range.value)}
                      // onChange={() => handleCheckboxChange(range.value)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          // Add the gender to the selectedGenders array
                          setEditedCamp({
                            ...editedCamp,
                            selectedRanges: [
                              ...editedCamp.selectedRanges,
                              range.value,
                            ],
                          });
                        } else {
                          // Remove the gender from the selectedGenders array
                          setEditedCamp({
                            ...editedCamp,
                            selectedRanges: editedCamp.selectedRanges.filter(
                              (selectedRanges) =>
                                selectedRanges.value !== range.value
                            ),
                          });
                        }
                      }}
                    />
                    {range.label}
                  </label>
                ))}
              </div>

              <div>
                <label>Select Gender :</label>
                <br />
                {genderOptions.map((gender) => (
                  <label key={gender}>
                    <input
                      type="checkbox"
                      value={gender}
                      checked={editedCamp.selectedGenders.includes(gender)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          // Add the gender to the selectedGenders array
                          setEditedCamp({
                            ...editedCamp,
                            selectedGenders: [
                              ...editedCamp.selectedGenders,
                              gender,
                            ],
                          });
                        } else {
                          // Remove the gender from the selectedGenders array
                          setEditedCamp({
                            ...editedCamp,
                            selectedGenders: editedCamp.selectedGenders.filter(
                              (selectedGender) => selectedGender !== gender
                            ),
                          });
                        }
                      }}
                    />
                    {gender}
                  </label>
                ))}
              </div>

              <div>
                <label>Select Attribute :</label>
                <br />
                {attributeOptions.map((attribute) => (
                  <label key={attribute}>
                    <input
                      type="checkbox"
                      value={attribute}
                      checked={editedCamp.selectedAttributes.includes(
                        attribute
                      )}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          // Add the gender to the selectedGenders array
                          setEditedCamp({
                            ...editedCamp,
                            selectedAttributes: [
                              ...editedCamp.selectedAttributes,
                              attribute,
                            ],
                          });
                        } else {
                          // Remove the gender from the selectedGenders array
                          setEditedCamp({
                            ...editedCamp,
                            selectedAttributes:
                              editedCamp.selectedAttributes.filter(
                                (selectedAttributes) =>
                                  selectedAttributes !== attribute
                              ),
                          });
                        }
                      }}
                    />
                    {attribute}
                  </label>
                ))}
              </div>
              <div>
                <h3>Creative Details</h3>
                <div>
                  <input
                    type="radio"
                    name="detail"
                    value="available"
                    onChange={(e) =>
                      setEditedCamp({ ...editedCamp, detail: e.target.value })
                    }
                    checked={editedCamp.detail === "available"}
                  />{" "}
                  Available <br />
                  {editedCamp.detail === "available" && (
                    <div>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.gif"
                        // Add your onChange function and state here for handling the file upload
                      />
                    </div>
                  )}
                  <input
                    type="radio"
                    name="detail"
                    value="buildown"
                    onChange={(e) =>
                      setEditedCamp({ ...editedCamp, detail: e.target.value })
                    }
                    checked={editedCamp.detail === "buildown"}
                  />{" "}
                  Build Your Own <br />
                  <input
                    type="radio"
                    name="detail"
                    value="buildme"
                    onChange={(e) =>
                      setEditedCamp({ ...editedCamp, detail: e.target.value })
                    }
                    checked={editedCamp.detail === "buildme"}
                  />{" "}
                  Build For Me
                </div>
              </div>

              <div>
                <h3>Campaign Budget/Week</h3>
                <div className="budget-control">
                  <button className="decrease-button" onClick={handleDecrease}>
                    -
                  </button>
                  <span className="budget-amount">Rs.{editedCamp.budget}</span>
                  <button onClick={handleIncrease}>+</button>
                </div>
              </div>

              <div>
                <h3>Media Details</h3>
                <div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        checked={editedCamp.mediaSlide}
                        onChange={() => handleCheckboxChange("mediaSlide")}
                      />
                      Slide
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        checked={editedCamp.mediaVideo}
                        onChange={() => handleCheckboxChange("mediaVideo")}
                      />
                      Video
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        checked={editedCamp.media3D}
                        onChange={() => handleCheckboxChange("media3D")}
                      />
                      3D
                    </label>
                  </div>
                </div>
              </div>

              <br />
              <br />
              {/* Add input fields for other fields */}
              <button onClick={handlecampaignsave}>Save</button>
              <button onClick={handleCancelCamp}>Cancel</button>
            </div>
          ) : (
            <ul>
              <div className="main">
                <strong>Selected District:</strong> {campData.selectedDistrict}
                <br />
                <strong>Selected Talukas:</strong>{" "}
                {Array.isArray(campData.selectedTalukas)
                  ? campData.selectedTalukas.join(", ")
                  : "N/A"}
                <br />
                <strong>Selected Villages:</strong>{" "}
                {Array.isArray(campData.selectedVillages)
                  ? campData.selectedVillages.join(", ")
                  : "N/A"}
                <br />
                <strong>Budget: Rs.</strong>
                {campData.budget}
                <br />
                <strong>3D Media:</strong> {campData.media3D ? "Yes" : "No"}
                <br />
                <strong>Slide Media:</strong>{" "}
                {campData.mediaSlide ? "Yes" : "No"}
                <br />
                <strong>Video Media:</strong>{" "}
                {campData.mediaVideo ? "Yes" : "No"}
                <br />
                <strong>Range:</strong> {campData.range}
                <br />
                <strong>Selected Attributes:</strong>{" "}
                {Array.isArray(campData.selectedAttributes)
                  ? campData.selectedAttributes.join(", ")
                  : "N/A"}
                <br />
                <strong>Selected Genders:</strong>{" "}
                {Array.isArray(campData.selectedGenders)
                  ? campData.selectedGenders.join(", ")
                  : "N/A"}
                <br />
                <strong>Selected Ranges:</strong>{" "}
                {Array.isArray(campData.selectedRanges)
                  ? campData.selectedRanges.join(", ")
                  : "N/A"}
                <br />
                <strong>Detail:</strong> {campData.detail}
                <br />
                {/* Add more fields here */}
              </div>
              <button onClick={handleEditCamp}>Edit</button>
            </ul>
          )}
        </div>
        {/* Business Data */}
        <div>
          <h3>Media Summary</h3>
          {isEditingbuss ? (
            <div>
              <label htmlFor="businessName">Business Name:</label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                placeholder="Enter the business name"
                value={editedBuss.businessName}
                onChange={(e) =>
                  setEditedBuss({ ...editedBuss, businessName: e.target.value })
                }
                required
              />
              <div>
                <label htmlFor="tagline">Tagline:</label>
                <input
                  type="text"
                  id="tagline"
                  name="tagline"
                  placeholder="Enter the tagline"
                  value={editedBuss.tagline}
                  onChange={(e) =>
                    setEditedBuss({ ...editedBuss, tagline: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter the business description"
                  value={editedBuss.description}
                  onChange={(e) =>
                    setEditedBuss({
                      ...editedBuss,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <label>Business Adjectives (Select up to 4):</label>
                <br />
                {businessAdjectives.map((adjective) => (
                  <label key={adjective}>
                    <input
                      type="checkbox"
                      checked={editedBuss.selectedAdjectives.includes(
                        adjective
                      )}
                      // onChange={() => handleAdjectiveChange(adjective)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          // Add the gender to the selectedGenders array
                          setEditedBuss({
                            ...editedBuss,
                            selectedAdjectives: [
                              ...editedBuss.selectedAdjectives,
                              adjective,
                            ],
                          });
                        } else {
                          // Remove the gender from the selectedGenders array
                          setEditedBuss({
                            ...editedBuss,
                            selectedAdjectives:
                              editedBuss.selectedAdjectives.filter(
                                (selectedAdjectives) =>
                                  selectedAdjectives !== adjective
                              ),
                          });
                        }
                      }}
                      disabled={
                        editedBuss.selectedAdjectives.length === 4 &&
                        !editedBuss.selectedAdjectives.includes(adjective)
                      }
                    />
                    {adjective}
                  </label>
                ))}
              </div>

              <div>
                <label>Choose Model Types For Your AD (Select any 2):</label>
                <br />
                {modelTypes.map((modelType) => (
                  <label key={modelType}>
                    <input
                      type="checkbox"
                      checked={editedBuss.selectedModelTypes.includes(
                        modelType
                      )}
                      // onChange={() => handleModelTypeChange(modelType)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          // Add the gender to the selectedGenders array
                          setEditedBuss({
                            ...editedBuss,
                            selectedModelTypes: [
                              ...editedBuss.selectedModelTypes,
                              modelType,
                            ],
                          });
                        } else {
                          // Remove the gender from the selectedGenders array
                          setEditedBuss({
                            ...editedBuss,
                            selectedModelTypes:
                              editedBuss.selectedModelTypes.filter(
                                (selectedModelTypes) =>
                                  selectedModelTypes !== modelType
                              ),
                          });
                        }
                      }}
                      disabled={
                        editedBuss.selectedModelTypes.length === 2 &&
                        !editedBuss.selectedModelTypes.includes(modelType)
                      }
                    />
                    {modelType}
                  </label>
                ))}
              </div>

              <div>
                <label>AD Types (Select one or more):</label>
                <br />
                {adTypes.map((adType) => (
                  <label key={adType}>
                    <input
                      type="checkbox"
                      checked={editedBuss.selectedAdTypes.includes(adType)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          // Add the gender to the selectedGenders array
                          setEditedBuss({
                            ...editedBuss,
                            selectedAdTypes: [
                              ...editedBuss.selectedAdTypes,
                              adType,
                            ],
                          });
                        } else {
                          // Remove the gender from the selectedGenders array
                          setEditedBuss({
                            ...editedBuss,
                            selectedAdTypes: editedBuss.selectedAdTypes.filter(
                              (selectedAdTypes) => selectedAdTypes !== adType
                            ),
                          });
                        }
                      }}
                    />
                    {adType}
                  </label>
                ))}
              </div>

              <div>
                {durations.map((duration) => (
                  <label key={duration}>
                    <input
                      type="radio"
                      value={duration}
                      checked={editedBuss.selectedDuration === duration}
                      onChange={(e) =>
                        setEditedBuss({
                          ...editedBuss,
                          selectedDuration: e.target.value,
                        })
                      }
                    />
                    {duration}
                  </label>
                ))}
              </div>

              <br />
              <br />
              {/* Add input fields for other fields */}
              <button onClick={handlebusinesssave}>Save</button>
              <button onClick={handleCancelBuss}>Cancel</button>
            </div>
          ) : (
            <ul>
              <div className="main">
                <strong>Business Name:</strong> {mediaData.businessName}
                <br />
                <strong>Tagline:</strong> {mediaData.tagline}
                <br />
                <strong>Description:</strong> {mediaData.description}
                <br />
                {/* <strong>Logo File:</strong> {data.logoFile ? 'Yes' : 'No'}<br /> */}
                {/* <strong>Product Photos:</strong> {data.productPhotos.filter(photo => photo).length}<br /> */}
                {/* <strong>Product Videos:</strong> {data.productVideos.filter(video => video).length}<br /> */}
                <strong>Selected Ad Types:</strong>{" "}
                {Array.isArray(mediaData.selectedAdTypes)
                  ? mediaData.selectedAdTypes.join(", ")
                  : "N/A"}
                <br />
                <strong>Selected Adjectives:</strong>{" "}
                {Array.isArray(mediaData.selectedAdjectives)
                  ? mediaData.selectedAdjectives.join(", ")
                  : "N/A"}
                <br />
                <strong>Selected Model Types:</strong>{" "}
                {Array.isArray(mediaData.selectedModelTypes)
                  ? mediaData.selectedModelTypes.join(", ")
                  : "N/A"}
                <br />
                <strong>Selected Duration:</strong> {mediaData.selectedDuration}
                <br />
                {/* <strong>Store Photos:</strong> {data.storePhotos.filter(photo => photo).length}<br /> */}
                {/* <strong>Store Videos:</strong> {data.storeVideos.filter(video => video).length}<br /> */}
                {/* Add more fields here */}
              </div>
              <button onClick={handleEditBuss}>Edit</button>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
