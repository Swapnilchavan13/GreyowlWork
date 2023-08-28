import React, { useState } from 'react';
import "./customer.css";

export const Customerdetails = () => {

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

  // Media Details
  const [mediaSlide, setMediaSlide] = useState(false);
  const [mediaVideo, setMediaVideo] = useState(false);
  const [media3D, setMedia3D] = useState(false);
  const [budget, setBudget] = useState('');
  const [profile, setProfile] = useState('');


  const [newTaluka, setNewTaluka] = useState('');
  const [newVillage, setNewVillage] = useState('');

  // Creative Details
  const [creativeAvailable, setCreativeAvailable] = useState(false);
  const [creativeBuildYourOwn, setCreativeBuildYourOwn] = useState(false);
  const [video, setVideo] = useState(false);
  const [three, setThree] = useState(false);
  const [slide, setSlide] = useState(false);

  

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
  
  

  const handleRangeChange = (event) => {
    const newRange = parseInt(event.target.value);
    setRange(newRange);
  };


  const handleSubmit = () => {
    const formData = {
      selectedDistrict,
      selectedTalukas,
      selectedVillages,
      range,
      mediaSlide,
      mediaVideo,
      media3D,
      budget,
      profile,
      creativeAvailable,
      creativeBuildYourOwn,
      video,
      three,
      slide,
    };
  
    // Save the form data to local storage
    localStorage.setItem('formData', JSON.stringify(formData));
    alert("Data Saved")
  };

  const savedName = localStorage.getItem('userName');  

  

  return (
    <div className='App'>
      <h2>Hello {savedName} !!!</h2>
      <h1>Customer Details</h1>
      <div>
        <label>Target Number</label>
        <input
          type="range"
          min="1"
          max="10000"
          step="1"
          value={range}
          onChange={handleRangeChange}
        />      
        <h3>{range}</h3>
        </div>

        <div>
        <label>
            Customer Profile:
            <input
              type="text"
              value={profile}
              onChange={(event) => setProfile(event.target.value)}
            />
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
        <div>
          <label>
            Budget:
            <input
              type="text"
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
            />
          </label>
        </div>
          </div>
        </div>
        <div>
        <h1>Creative Details</h1>
        <div>
          <label>
            <input
              type="checkbox"
              checked={creativeAvailable}
              onChange={() => setCreativeAvailable(!creativeAvailable)}
            />
            Available
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              onChange={() => setCreativeBuildYourOwn(!creativeBuildYourOwn)}
              checked={creativeBuildYourOwn}
            />
            Build Your Own
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={slide}
              onChange={() => setSlide(!slide)}
            />
            Slide
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={video}
              onChange={() => setVideo(!video)}
            />
            Video
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={three}
              onChange={() => setThree(!three)}
            />
            3D
          </label>
          </div>
          <button onClick={handleSubmit}>Submit</button>

        </div>
    </div>
  )
}
