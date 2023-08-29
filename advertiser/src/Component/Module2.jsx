import React, { useState } from 'react';

export const Module2 = () => {
  const [businessName, setBusinessName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [selectedAdjectives, setSelectedAdjectives] = useState([]);
  const [storePhotos, setStorePhotos] = useState([]);
  const [productPhotos, setProductPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [productVideos, setProductVideos] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedAdType, setSelectedAdType] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState('');

  const adjectiveOptions = [
    'Reliable', 'Innovative', 'Quality', 'Elegant', 'Unique', 'Economical',
    'Efficient', 'Modern', 'Luxurious', 'Friendly', 'Creative', 'Dynamic',
    'Inspiring', 'Effective', 'Professional'
  ];

  const modelOptions = [
    'Female(18-25)', 'Female(26-40)', 'Male(18-25)', 'Male(26-40)',
    'Couple(18-25)', 'Couple(26-40)', 'Female(18-25)', 'Family(Of 4 People)', 'Senier citizn'
  ];

  const adTypeOptions = ['Slide', 'Slide With Audio', 'Video', '3D'];

  const durationOptions = ['10 Sec', '20 Sec', '30 Sec', '40 Sec', '50 Sec', '60 Sec'];

  const handleAdjectiveChange = (adjective) => {
    if (selectedAdjectives.includes(adjective)) {
      setSelectedAdjectives(selectedAdjectives.filter(adj => adj !== adjective));
    } else {
      setSelectedAdjectives([...selectedAdjectives, adjective]);
    }
  };

  const handleModelChange = (model) => {
    if (selectedModels.includes(model)) {
      setSelectedModels(selectedModels.filter(mdl => mdl !== model));
    } else {
      setSelectedModels([...selectedModels, model]);
    }
  };

  const handleAdTypeChange = (adType) => {
    if (selectedAdType.includes(adType)) {
      setSelectedAdType(selectedAdType.filter(type => type !== adType));
    } else {
      setSelectedAdType([...selectedAdType, adType]);
    }
  };

  const handleSubmit = () => {
    // Construct the data object from the form inputs
    const formData = {
      businessName,
      tagline,
      description,
      selectedAdjectives,
      storePhotos,
      productPhotos,
      videos,
      productVideos,
      selectedModels,
      selectedAdType,
      selectedDuration
    };

    // Save the formData to local storage
    localStorage.setItem('adFormData', JSON.stringify(formData));
  };

  return (
    <div>
      {/* Your form elements */}
      {/* Use state variables and event handlers to capture user input */}
      {/* Remember to add proper JSX for form fields, labels, checkboxes, etc. */}
      {/* Example: */}
      <input
        type="text"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        placeholder="Business Name"
      />

      {/* Render adjective checkboxes */}
      <div>
        {adjectiveOptions.map((adjective, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={selectedAdjectives.includes(adjective)}
              onChange={() => handleAdjectiveChange(adjective)}
            />
            {adjective}
          </label>
        ))}
      </div>

      {/* Render model checkboxes */}
      <div>
        {modelOptions.map((model, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={selectedModels.includes(model)}
              onChange={() => handleModelChange(model)}
            />
            {model}
          </label>
        ))}
      </div>

      {/* Render ad type checkboxes */}
      <div>
        {adTypeOptions.map((adType, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={selectedAdType.includes(adType)}
              onChange={() => handleAdTypeChange(adType)}
            />
            {adType}
          </label>
        ))}
      </div>

      {/* Render duration radio buttons */}
      <div>
        {durationOptions.map((duration, index) => (
          <label key={index}>
            <input
              type="radio"
              name="duration"
              value={duration}
              checked={selectedDuration === duration}
              onChange={() => setSelectedDuration(duration)}
            />
            {duration}
          </label>
        ))}
      </div>

      {/* Add more form elements for other fields (tagline, description, photos, videos, etc.) */}

      {/* Submit button */}
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default Module2;
