import React, { useState } from 'react';
import "./customer.css";

export const Campaigndetails = () => {

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
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedTalukas, setSelectedTalukas] = useState([]);
  const [selectedVillages, setSelectedVillages] = useState([]);
  const [selectAllTalukas, setSelectAllTalukas] = useState(false);
  const [selectAllVillages, setSelectAllVillages] = useState(false);
  const [range, setRange] = useState(0);
  const [detail, setDetail] = useState('');

//Customer Pofile
  const [selectedAgeRange, setSelectedAgeRange] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedAttribute, setSelectedAttribute] = useState('');
  

  const ageRanges = [
    { label: '13-17', value: '13-17' },
    { label: '18-25', value: '18-25' },
    { label: '26-35', value: '26-35' },
    { label: '36-50', value: '36-50' },
    { label: '50+', value: '50+' }
  ];

  const genderOptions = ['Male', 'Female'];

  const attributeOptions = ['Individual', 'Couple', 'Children', 'Family'];

  // Media Details
  const [mediaSlide, setMediaSlide] = useState(false);
  const [mediaVideo, setMediaVideo] = useState(false);
  const [media3D, setMedia3D] = useState(false);

  const [newTaluka, setNewTaluka] = useState('');
  const [newVillage, setNewVillage] = useState('');

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    setSelectedTalukas([]);
    setSelectedVillages([]);
    setSelectAllTalukas(false);
    setSelectAllVillages(false);
  };


  const handleAddTaluka = () => {
    
      const updatedDistrictsData = [...districtsData];
      const selectedDistrictData = updatedDistrictsData.find(district => district.district === selectedDistrict);
      selectedDistrictData.talukas.push({ taluka: newTaluka, villages: [] });
      setNewTaluka('');
    
  };

  const handleAddVillage = () => {
    if (newVillage && selectedTalukas.length > 0) {
      const updatedDistrictsData = [...districtsData];
      const selectedDistrictData = updatedDistrictsData.find(district => district.district === selectedDistrict);
      selectedDistrictData.talukas.forEach(taluka => {
        if (selectedTalukas.includes(taluka.taluka)) {
          taluka.villages.push(newVillage);
        }
      });
      setNewVillage('');
    }
  };

  const handleTalukaChange = (event) => {
    const talukaName = event.target.value;
    if (talukaName === 'selectAll') {
      setSelectAllTalukas(!selectAllTalukas);
      setSelectedTalukas(selectAllTalukas ? [] : talukaOptions.map(option => option.value));
    } else {
      if (selectedTalukas.includes(talukaName)) {
        setSelectedTalukas(selectedTalukas.filter(taluka => taluka !== talukaName));
      } else {
        setSelectedTalukas([...selectedTalukas, talukaName]);
      }
    }
  };

  const handleVillageChange = (event) => {
    const villageName = event.target.value;
    if (villageName === 'selectAll') {
      setSelectAllVillages(!selectAllVillages);
      setSelectedVillages(selectAllVillages ? [] : villageOptions.map(option => option.value));
    } else {
      if (selectedVillages.includes(villageName)) {
        setSelectedVillages(selectedVillages.filter(village => village !== villageName));
      } else {
        setSelectedVillages([...selectedVillages, villageName]);
      }
    }
  };

  const districtOptions = districtsData.map(district => (
    <option key={district.district} value={district.district}>
      {district.district}
    </option>
  ));

  const talukaOptions = selectedDistrict
    ? districtsData.find(district => district.district === selectedDistrict).talukas.map(taluka => ({
        label: taluka.taluka,
        value: taluka.taluka,
      }))
    : [];

  talukaOptions.unshift({ label: 'Select All Talukas', value: 'selectAll' });

  const villageOptions = selectedTalukas.length > 0
    ? districtsData.find(district => district.district === selectedDistrict)
        .talukas.filter(taluka => selectedTalukas.includes(taluka.taluka))
        .map(taluka => taluka.villages.map(village => ({
          label: village,
          value: village,
        })))
        .flat()
    : [];

  villageOptions.unshift({ label: 'Select All Villages', value: 'selectAll' });



  // Target Range
  const handleRangeChange = (event) => {
    const newRange = event.target.value;
    setRange(newRange);
  };
  const handleDetailChange = (event) =>{
    const newDetail = event.target.value;
    setDetail(newDetail);
  }

  const handleSubmit = () => {
    // Check if any necessary detail is missing
    if (
      !selectedAgeRange ||
      !selectedGender ||
      !selectedAttribute ||
      !detail
    ) {
      alert('Please fill in all required details before submitting.');
      return; // Don't submit the form
    }

    // Construct the form data
    const formData = {
      selectedDistrict,
      selectedTalukas,
      selectedVillages,
      range,
      mediaSlide,
      mediaVideo,
      media3D,
      detail,
      selectedAgeRange,
      selectedGender,
      selectedAttribute,
    };

    const existingFormData = JSON.parse(localStorage.getItem('formData')) || [];

    // Add the new form data to the array
    existingFormData.push(formData);

    // Save the updated form data array to local storage
    localStorage.setItem('formData', JSON.stringify(existingFormData));

    // Clear the form fields
    setSelectedAgeRange('');
    setSelectedGender('');
    setSelectedAttribute('');
    setDetail('');
    setSelectedDistrict('');
    setSelectedTalukas([]);
    setSelectedVillages([]);
    setRange('');
    setMediaSlide(false);
    setMediaVideo(false);
    setMedia3D(false);

    alert('Data Saved');
  };
  

  return (
    <div className='App'>
      <h1>Campaign Details</h1>
       <div>
        <label>Target Range</label><br />
        <input
          type="radio"
          name="range"
          value="1000-2500"
          onChange={handleRangeChange}
          checked={range === '1000-2500'}
        /> 1000 - 2500
        <input
          type="radio"
          name="range"
          value="2500-5000"
          onChange={handleRangeChange}
          checked={range === '2500-5000'}
        /> 2500 - 5000
        <input
          type="radio"
          name="range"
          value="5000-7500"
          onChange={handleRangeChange}
          checked={range === '5000-7500'}
        /> 5000 - 7500
        <input
          type="radio"
          name="range"
          value="7500-10000"
          onChange={handleRangeChange}
          checked={range === '7500-10000'}
        /> 7500 - 10000
        <input
          type="radio"
          name="range"
          value="10000+"
          onChange={handleRangeChange}
          checked={range === '10000+'}
        /> 10000+
      </div>
        <div>
        <label>
        <div>
        <h1>Customer Profile</h1>
        <div>
          <label>Age Range:</label>
          {ageRanges.map(range => (
            <label key={range.value}>
              <input
                type="checkbox"
                name="ageRange"
                value={range.value}
                // checked={selectedAgeRange === range.value}
                onChange={() => setSelectedAgeRange(range.value)}
              />
              {range.label}
            </label>
          ))}
        </div>
        <div>
          <label>Gender:</label>
          {genderOptions.map(gender => (
            <label key={gender}>
              <input
                type="checkbox"
                name="gender"
                value={gender}
                // checked={selectedGender === gender}
                onChange={() => setSelectedGender(gender)}
              />
              {gender}
            </label>
          ))}
        </div>
        <div>
          <label>Attribute:</label>
          {attributeOptions.map(attribute => (
            <label key={attribute}>
              <input
                type="checkbox"
                name="attribute"
                value={attribute}
                // checked={selectedAttribute === attribute}
                onChange={() => setSelectedAttribute(attribute)}
              />
              {attribute}
            </label>
          ))}
        </div>
       
      </div>
          </label>

        </div>

        <div>
        <label>Customer Geography</label>
        <div>
          <label>Select District:</label>
          <select value={selectedDistrict} onChange={handleDistrictChange}>
            <option value="">Select</option>
            {districtOptions}
          </select>
        </div>
        <div className='dropdown'>
          <label className='selelabel'>Select Talukas:</label>
          <select className='sele' multiple value={selectedTalukas} onChange={handleTalukaChange}>
            {talukaOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {/* <div>
        <label>Add Taluka:</label>
        <input
          type="text"
          value={newTaluka}
          onChange={(event) => setNewTaluka(event.target.value)}
        />
        <button onClick={handleAddTaluka}>Add Taluka</button>
      </div> */}
          
        </div>
        <div className='dropdown'>
          <label className='selelabel'>Select Villages:</label>
          <select className='sele' multiple value={selectedVillages} onChange={handleVillageChange}>
            {villageOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {/* <div>
        <label>Add Village:</label>
        <input
          type="text"
          value={newVillage}
          onChange={(event) => setNewVillage(event.target.value)}
        />
        <button onClick={handleAddVillage}>Add Village</button>
      </div> */}
        </div>
        </div>
        <div>
          <h1>Media Details</h1>
          <div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={mediaSlide}
              onChange={() => setMediaSlide(!mediaSlide)}
            />
            Slide
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={mediaVideo}
              onChange={() => setMediaVideo(!mediaVideo)}
            />
            Video
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={media3D}
              onChange={() => setMedia3D(!media3D)}
            />
            3D
          </label>
        </div>
        </div>
        </div>
        <div>
        <h1>Creative Details</h1>
        <div>
        <input
          type="radio"
          name="detail"
          value="available"
          onChange={handleDetailChange}
          checked={detail === 'available'}
        /> Available <br />
         {detail === 'available' && (
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
          onChange={handleDetailChange}
          checked={detail === 'buildown'}
        /> Build Your Own <br />
        <input
          type="radio"
          name="detail"
          value="buildme"
          onChange={handleDetailChange}
          checked={detail === 'buildme'}
        /> Build For Me
        
      </div>
        
          <button onClick={handleSubmit}>Submit</button>

        </div>
    </div>
  )
}