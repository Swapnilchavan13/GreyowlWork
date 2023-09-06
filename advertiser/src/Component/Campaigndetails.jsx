import React, { useState } from 'react';
import "./customer.css";
import { useNavigate } from 'react-router-dom';

export const Campaigndetails = () => {

  const navigate = useNavigate();

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
  
  const ageRanges = [
    { label: '13-17', value: '13-17' },
    { label: '18-25', value: '18-25' },
    { label: '26-35', value: '26-35' },
    { label: '36-50', value: '36-50' },
    { label: '50+', value: '50+' }
  ];

  const [selectedRanges, setSelectedRanges] = useState([]);

  const handleCheckboxChange = (value) => {
    if (selectedRanges.includes(value)) {
      setSelectedRanges(selectedRanges.filter(range => range !== value));
    } else {
      setSelectedRanges([...selectedRanges, value]);
    }
  };

  const genderOptions = ['Male', 'Female'];
  const attributeOptions = ['Individual', 'Couple', 'Children', 'Family'];

  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  const handleGenderChange = (gender) => {
    if (selectedGenders.includes(gender)) {
      setSelectedGenders(selectedGenders.filter((g) => g !== gender));
    } else {
      setSelectedGenders([...selectedGenders, gender]);
    }
  };

  const handleAttributeChange = (attribute) => {
    if (selectedAttributes.includes(attribute)) {
      setSelectedAttributes(selectedAttributes.filter((a) => a !== attribute));
    } else {
      setSelectedAttributes([...selectedAttributes, attribute]);
    }
  };
  
  // Media Details
  const [mediaSlide, setMediaSlide] = useState(false);
  const [mediaVideo, setMediaVideo] = useState(false);
  const [media3D, setMedia3D] = useState(false);

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    setSelectedTalukas([]);
    setSelectedVillages([]);
    setSelectAllTalukas(false);
    setSelectAllVillages(false);
  };

  const [budget, setBudget] = useState(1000);

  const handleDecrease = () => {
    if (budget - 250 >= 500) {
      setBudget(budget - 250);
    }
  };

  const handleIncrease = () => {
      setBudget(budget + 250);
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
   
    const handleSubmit = async (event) => {
      event.preventDefault();

      const formData = {
        selectedDistrict,
        selectedTalukas,
        selectedVillages,
        range,
        mediaSlide,
        mediaVideo,
        media3D,
        detail,
        selectedRanges,
        selectedGenders,
        selectedAttributes,
        budget
      };
  
      
      try {
        const response = await fetch('https://lonely-cow-life-jacket.cyclic.app/campaign', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
    
        if (response.ok) {
          // Clear the form fields
    setSelectedRanges([]);
    setSelectedGenders([]);
    setSelectedAttributes([]);
    setDetail('');
    setSelectedDistrict('');
    setSelectedTalukas([]);
    setSelectedVillages([]);
    setRange('');
    setMediaSlide(false);
    setMediaVideo(false);
    setMedia3D(false);
    setBudget(1000)

    alert('Data Saved');          
    
          navigate('/module2');
        } else {
          alert('Failed to store data.');
        }
      } catch (error) {
        alert('An error occurred while saving data.');
        console.error(error);
      }
    };
  
  return (
    <div className='App'>
      <h1>Campaign Details</h1>
       <div>
        <h4>Audience Target Range (Choose 1):</h4>
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
        <h4>Customer Profile</h4>
        <div>
          <label>Select Age Range:</label><br />
      {ageRanges.map(range => (
        <label key={range.value}>
          <input
            type="checkbox"
            value={range.value}
            checked={selectedRanges.includes(range.value)}
            onChange={() => handleCheckboxChange(range.value)}
          />
          {range.label}
        </label>
      ))}

      </div>
        <div>
          <label>Select Gender:</label><br />
          {genderOptions.map((gender) => (
        <label key={gender}>
          <input
            type="checkbox"
            value={gender}
            checked={selectedGenders.includes(gender)}
            onChange={() => handleGenderChange(gender)}
          />
          {gender}
        </label>
      ))}
        </div>
        <div>
          <label>Attribute:</label><br />
          {attributeOptions.map((attribute) => (
        <label key={attribute}>
          <input
            type="checkbox"
            value={attribute}
            checked={selectedAttributes.includes(attribute)}
            onChange={() => handleAttributeChange(attribute)}
          />
          {attribute}
        </label>
      ))}
        </div>
       
      </div>
          </label>

        </div>

        <div>
        <label>Customer Geography:</label>
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
        </div>
        </div>
        <div>
          <h4>Media Details:</h4>
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
        <h4>Creative Details:</h4>
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
      <div>
        <h4>Campaign Budget/Week</h4>
        <div className="budget-control">
        <button className="decrease-button" onClick={handleDecrease}>-</button>
        <span className="budget-amount">Rs.{budget}</span>
        <button onClick={handleIncrease}>+</button>
      </div>
      <br />
      </div>
        
          <button onClick={handleSubmit}>Submit</button>

        </div>
    </div>
  )
}