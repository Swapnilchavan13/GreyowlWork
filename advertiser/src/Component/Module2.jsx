import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const [businessName, setBusinessName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [selectedAdjectives, setSelectedAdjectives] = useState([]);
  const [logoFile, setLogoFile] = useState(null);
  const [storePhotos, setStorePhotos] = useState(Array(5).fill(null));
  const [productPhotos, setProductPhotos] = useState(Array(5).fill(null));
  const [productVideos, setProductVideos] = useState(Array(4).fill(null));
  const [storeVideos, setStoreVideos] = useState(Array(4).fill(null));
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

  const handleLogoChange = (event) => {
    setLogoFile(event.target.files[0]);
  };

  const handleStorePhotoChange = (event, index) => {
    const newPhotos = Array.from(event.target.files);
    const updatedPhotos = storePhotos.map((photo, i) => (i === index ? newPhotos[0] : photo));
    setStorePhotos(updatedPhotos);
  };

  const handleProductPhotoChange = (event, index) => {
    const newPhotos = Array.from(event.target.files);
    const updatedPhotos = productPhotos.map((photo, i) => (i === index ? newPhotos[0] : photo));
    setProductPhotos(updatedPhotos);
  };

  const handleStoreVideoChange = (event, index) => {
    const newVideos = Array.from(event.target.files);
    const updatedVideos = storeVideos.map((video, i) => (i === index ? newVideos[0] : video));
    setStoreVideos(updatedVideos);
  };

  const handleProductVideoChange = (event, index) => {
    const newVideos = Array.from(event.target.files);
    const updatedVideos = productVideos.map((video, i) => (i === index ? newVideos[0] : video));
    setProductVideos(updatedVideos);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const newData = {
      businessName,
      tagline,
      description,
      selectedAdjectives,
      logoFile,
      storePhotos,
      storeVideos,
      productPhotos,
      productVideos,
      selectedModelTypes,
      selectedAdTypes,
      selectedDuration
    };
    setSavedData([...savedData, newData]);
    localStorage.setItem('savedData', JSON.stringify([...savedData, newData]));
  
    alert("Data Stored")
    // Reset state values
    setBusinessName('');
    setTagline('');
    setDescription('');
    setSelectedAdjectives([]);
    setLogoFile(null);
    setStorePhotos(Array(5).fill(null));
    setStoreVideos(Array(4).fill(null));
    setProductPhotos(Array(5).fill(null));
    setProductVideos(Array(4).fill(null));
    setSelectedModelTypes([]);
    setSelectedAdTypes([]);
    setSelectedDuration('');
  
    navigate('/summary')
  };

  return (
  <div className='account-container'>
    <form onSubmit={handleSubmit}>
        <label htmlFor="businessName">Business Name:</label>
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

        <label htmlFor="tagline">Tagline:</label>
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
        <label htmlFor="description">Description:</label>
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

        <label>Upload Logo:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
        />
        <br />

        <label>Upload Store Photos (up to 5):</label>
        {storePhotos.map((photo, index) => (
          <div key={index}>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleStorePhotoChange(event, index)}
            />
            <br />
          </div>
        ))}

        <label>Upload Product Photos (up to 5):</label>
         {productPhotos.map((photo, index) => (
          <div key={index}>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleProductPhotoChange(event, index)}
            />
            <br />
          </div>
        ))}

        <label>Upload Store Videos (up to 4):</label>
        {storeVideos.map((video, index) => (
          <div key={index}>
            <input
              type="file"
              accept="video/*"
              onChange={(event) => handleStoreVideoChange(event, index)}
            />
            <br />
          </div>
        ))}

<label>Upload Product Videos (up to 4):</label>
        {productVideos.map((video, index) => (
          <div key={index}>
            <input
              type="file"
              accept="video/*"
              onChange={(event) => handleProductVideoChange(event, index)}
            />
            <br />
          </div>
        ))}

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

        <button type="submit">Submit</button>
      </form>
  </div>
  )
};

export default Module2;
