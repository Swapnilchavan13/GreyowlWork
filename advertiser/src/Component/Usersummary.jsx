import React, { useEffect, useState } from "react";

export const Usersummary = () => {
  const [savedData, setSavedData] = useState([]);
  const [campData, setCampdata] = useState([]);
  const [mediaData, setMediaData] = useState([]);

  const [editedData, setEditedData] = useState({});
  const [editedCamp, setEditedCamp] = useState({});

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingcamp, setIsEditingcamp] = useState(false);


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

  // Function to handle inline editing
  const handleEditCamp = () => {
    setEditedCamp({ ...campData }); // Copy the current data for editing
    setIsEditingcamp(true);
  };

  // Function to handle canceling the edit
  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleCancelCamp = () => {
    setIsEditingcamp(false);
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

  // Function to handle saving the edited data
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

  var districtsData  = [
    {
      "district": "Mumbai",
      "talukas": [
        {
          "taluka": "Mumbai City",
          "villages": ["Colaba", "Dadar", "Fort"]
        },
        {
          "taluka": "Mumbai Suburban",
          "villages": ["Andheri", "Borivali", "Kandivali"]
        }
      ]
    },
    {
      "district": "Pune",
      "talukas": [
        {
          "taluka": "Pune City",
          "villages": ["Shivajinagar", "Kothrud", "Khadki"]
        },
        {
          "taluka": "Pimpri-Chinchwad",
          "villages": ["Pimpri", "Chinchwad", "Akurdi"]
        }
      ]
    },
    {
      "district": "Bangalore",
      "talukas": [
        {
          "taluka": "Bangalore North",
          "villages": ["Hebbal", "Yelahanka", "Nagavara"]
        },
        {
          "taluka": "Bangalore South",
          "villages": ["Jayanagar", "Basavanagudi", "BTM Layout"]
        }
      ]
    }
  ]

  const districtOptions = districtsData.map(district => (
    <option key={district.district} value={district.district}>
      {district.district}
    </option>
  ));

  // const talukaOptions = selectedDistrict
  // ? districtsData.find(district => district.district === selectedDistrict).talukas.map(taluka => ({
  //     label: taluka.taluka,
  //     value: taluka.taluka,
  //   }))
  // : [];

// talukaOptions.unshift({ label: 'Select All Talukas', value: 'selectAll' });

// const villageOptions = selectedTalukas.length > 0
//   ? districtsData.find(district => district.district === selectedDistrict)
//       .talukas.filter(taluka => selectedTalukas.includes(taluka.taluka))
//       .map(taluka => taluka.villages.map(village => ({
//         label: village,
//         value: village,
//       })))
//       .flat()
//   : [];

// villageOptions.unshift({ label: 'Select All Villages', value: 'selectAll' });



  return (
    <div style={{ padding: "10px" }}>
      <h1>User Campaign Summary</h1>
      <div id="summary">
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
              <div>
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
        <div>
          <h3>Campaign Elements</h3>
          {isEditingcamp ? (
            <div>
               <div>
          <label>Select District:</label>
          <select value={editedCamp.selectedDistrict}  onChange={(e) =>
                  setEditedCamp({ ...editedCamp, selectedDistrict: e.target.value })
                }>
            <option value="">Select</option>
            {districtOptions}
          </select>
        </div>


        <div className='dropdown'>
          <label className='selelabel'>Select Talukas:</label>
          <select className='sele' multiple value={editedCamp.selectedTalukas} onChange={(e) =>
                  setEditedCamp({ ...editedCamp, selectedTalukas: e.target.value })
                }>
            {/* {talukaOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))} */}
          </select>
          
        </div>
        <div className='dropdown'>
          <label className='selelabel'>Select Villages:</label>
          <select className='sele' multiple value={editedCamp.selectedVillages} onChange={(e) =>
                  setEditedCamp({ ...editedCamp, selectedVillages: e.target.value })
                }>
            {/* {villageOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))} */}
          </select>
        </div>



              {/* Editable fields */}
              <label htmlFor="">Business Name</label>
              <br />
              <input
                type="text"
                value={editedCamp.budget}
                onChange={(e) =>
                  setEditedCamp({ ...editedCamp, budget: e.target.value })
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
              <div>
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
                  <strong>Slide Media:</strong> {campData.mediaSlide ? "Yes" : "No"}
                  <br />
                  <strong>Video Media:</strong> {campData.mediaVideo ? "Yes" : "No"}
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
        
              
        <div>
          <h3>Media Summary</h3>
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
          </ul>
        </div>
      </div>
    </div>
  );
};
