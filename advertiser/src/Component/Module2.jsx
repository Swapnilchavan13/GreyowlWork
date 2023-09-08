import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Demo from './Demo';

const businessAdjectives = [
  'Reliable',
  'Innovative',
  'Professional',
  'Quality',
  'Efficient',
  'Trustworthy',
  'Dynamic',
  'Creative',
  'Responsive',
  'Modern',
  'Experienced',
  'Flexible',
  'Ethical',
  'Expert',
  'Customer-Oriented'
];


const modelTypes = [
  'Female (18-25)',
  'Female (25-40)',
  'Male (18-25)',
  'Male (25-40)',
  'Couple (18-25)',
  'Couple (26-40)',
  'Family (of 4 people)',
  'Senior Citizen'
];

const adTypes = [
  'Slide',
  'Slide And Audio',
  'Video',
  '3D'
];

const durations = [
  '10 Sec',
  '20 Sec',
  '30 Sec',
  '40 Sec',
  '50 Sec',
  '60 Sec'
];


export const Module2 = () => {

  const navigate = useNavigate()
  const [isSub, setIssub] = useState(false)

  const [businessName, setBusinessName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [selectedAdjectives, setSelectedAdjectives] = useState([]);
  const [selectedModelTypes, setSelectedModelTypes] = useState([]);
  const [selectedAdTypes, setSelectedAdTypes] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState('');
  const [savedData, setSavedData] = useState([]);


  const handleAdjectiveChange = (adjective) => {
    if (selectedAdjectives.includes(adjective)) {
      setSelectedAdjectives(selectedAdjectives.filter(item => item !== adjective));
    } else if (selectedAdjectives.length < 4) {
      setSelectedAdjectives([...selectedAdjectives, adjective]);
    }
  };


  const handleBusinessNameChange = (event) => {
    setBusinessName(event.target.value);
  };

  const handleTaglineChange = (event) => {
    setTagline(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleModelTypeChange = (modelType) => {
    if (selectedModelTypes.includes(modelType)) {
      setSelectedModelTypes(selectedModelTypes.filter(item => item !== modelType));
    } else if (selectedModelTypes.length < 2) {
      setSelectedModelTypes([...selectedModelTypes, modelType]);
    }
  };

  const handleAdTypeChange = (adType) => {
    if (selectedAdTypes.includes(adType)) {
      setSelectedAdTypes(selectedAdTypes.filter(item => item !== adType));
    } else {
      setSelectedAdTypes([...selectedAdTypes, adType]);
    }
  };

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newData = {
      businessName,
      tagline,
      description,
      selectedAdjectives,
      selectedModelTypes,
      selectedAdTypes,
      selectedDuration,
    };
  
  
    try {
      setIssub(true);
      const response = await fetch('https://lonely-cow-life-jacket.cyclic.app/business', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
  
      if (response.ok) {
        // Data saved successfully
        alert('Data Stored');
        // Reset state values
        setBusinessName('');
        setTagline('');
        setDescription('');
        setSelectedAdjectives([]);
        setSelectedModelTypes([]);
        setSelectedAdTypes([]);
        setSelectedDuration('');
        
        navigate('/usersummary');
      } else {
        alert('Failed to store data.');
      }
    } catch (error) {
      alert('An error occurred while saving data.');
      console.error(error);
    }
  };
  
  return (
  <div className='account-container'>
    <h1>Business Details</h1>
    <form onSubmit={handleSubmit}>
        <label htmlFor="businessName">Business Name:</label><br />
        <input
          type="text"
          id="businessName"
          name="businessName"
          placeholder="Enter the business name"
          value={businessName}
          onChange={handleBusinessNameChange}
          required
        />
        <br />

        <label htmlFor="tagline">Tagline:</label><br />
        <input
          type="text"
          id="tagline"
          name="tagline"
          placeholder="Enter the tagline"
          value={tagline}
          onChange={handleTaglineChange}
          required
        />
        <br />
        <label htmlFor="description">Description:</label><br />
        <textarea
          id="description"
          name="description"
          placeholder="Enter the business description"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
        <br />

        <label>Business Adjectives (Select up to 4):</label>
        <br />
        {businessAdjectives.map(adjective => (
          <label key={adjective}>
            <input
              type="checkbox"
              checked={selectedAdjectives.includes(adjective)}
              onChange={() => handleAdjectiveChange(adjective)}
              disabled={selectedAdjectives.length === 4 && !selectedAdjectives.includes(adjective)}
            />
            {adjective}
          </label>
        ))}
        <br />
        <br />
        <Demo />

<label>Choose Model Types For Your AD (Select any 2):</label>
        <br />
        {modelTypes.map(modelType => (
          <label key={modelType}>
            <input
              type="checkbox"
              checked={selectedModelTypes.includes(modelType)}
              onChange={() => handleModelTypeChange(modelType)}
              disabled={selectedModelTypes.length === 2 && !selectedModelTypes.includes(modelType)}
            />
            {modelType}
          </label>
        ))}
        <br />
        <br />
        <label>AD Types (Select one or more):</label>
        <br />
        {adTypes.map(adType => (
          <label key={adType}>
            <input
              type="checkbox"
              checked={selectedAdTypes.includes(adType)}
              onChange={() => handleAdTypeChange(adType)}
            />
            {adType}
          </label>
        ))}
        <br />
        <br />
        <label>Duration:</label>
        <br />
        {durations.map(duration => (
          <label key={duration}>
            <input
              type="radio"
              value={duration}
              checked={selectedDuration === duration}
              onChange={() => handleDurationChange(duration)}
            />
            {duration}
          </label>
        ))}
        <br />

        <button disabled={isSub} type="submit">
          {isSub ? "Submiting":"Submit"}
        </button>
      </form>
  </div>
  )
};

export default Module2;
