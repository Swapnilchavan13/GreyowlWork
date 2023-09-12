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

  const [uploadPercentage, setUploadPercentage] = useState(0);  //New state variable for percentage

  ////////////////////////
  const [formId, setFormId] = useState(Date.now());
  const [uploadLogo, setUploadLogo] = useState(null);
  const [productPhotoFive, setProductPhotoFive] = useState(null);
  const [storePhotoOne, setStorePhotoOne] = useState(null);
  const [storePhotoTwo, setStorePhotoTwo] = useState(null);
  const [storePhotoThree, setStorePhotoThree] = useState(null);
  const [storePhotoFour, setStorePhotoFour] = useState(null);
  const [storePhotoFive, setStorePhotoFive] = useState(null);

  const [productPhotoOne, setProductPhotoOne] = useState(null);
  const [productPhotoTwo, setProductPhotoTwo] = useState(null);
  const [productPhotoThree, setProductPhotoThree] = useState(null);
  const [productPhotoFour, setProductPhotoFour] = useState(null);

  const [storeVideoOne, setStoreVideoOne] = useState(null);
  const [storeVideoTwo, setStoreVideoTwo] = useState(null);
  const [storeVideoThree, setStoreVideoThree] = useState(null);
  const [storeVideoFour, setStoreVideoFour] = useState(null);

  const [productVideoOne, setProductVideoOne] = useState(null);
  const [productVideoTwo, setProductVideoTwo] = useState(null);
  const [productVideoThree, setProductVideoThree] = useState(null);
  const [productVideoFour, setProductVideoFour] = useState(null);

  const handleImageChange = (event, setImageState) => {
    const newImageFile = event.target.files[0];
    setImageState(newImageFile); // Set the file object, not a Blob URL
  };

  const handleVideoChange = (event, setVideoState) => {
    const newVideoFile = event.target.files[0];
    setVideoState(newVideoFile);
  };

  const handleLogoChange = (event) => {
    const logoFile = event.target.files[0];
    setUploadLogo(logoFile);
  };
  ////////////////////////////

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

    ///////////////////////////
      /////////////////////////////////////////////////////

    
    // Demo
    // Create a new FormData object
    const data = new FormData();
  
    // Append individual form fields one by one if they have values
    data.append('form_id', formId);
    data.append('upload_logo', uploadLogo);
  
    const imageFields = [
      storePhotoOne, storePhotoTwo, storePhotoThree, storePhotoFour, storePhotoFive,
    ];
    const imageFields2 = [
      productPhotoOne, productPhotoTwo, productPhotoThree, productPhotoFour, productPhotoFive,
    ];
  
    const videoFields = [
      storeVideoOne, storeVideoTwo, storeVideoThree, storeVideoFour,
    ];
    const videoFields2 = [
      productVideoOne, productVideoTwo, productVideoThree, productVideoFour,
    ];

    const numbsimg = [
      "one","two","three","four","five"
    ]
  
    const numbsvid = [
      "one","two","three","four"
    ]
    // Append image fields with 'store_photo_' and video fields with 'store_video_'
    imageFields.forEach((field, index) => {
      if (field !== null) {
        data.append(`store_photo_${numbsimg[index]}`, field);
      }
    });
    imageFields2.forEach((field, index) => {
      if (field !== null) {
        data.append(`product_photo_${numbsimg[index]}`, field);
      }
    });

    videoFields2.forEach((field, index) => {
      if (field !== null) {
        data.append(`product_video_${numbsvid[index]}`, field);
      }
    });
  
    videoFields.forEach((field, index) => {
      if (field !== null) {
        data.append(`store_video_${numbsvid[index]}`, field);
      }
    });
  
    // Create an XMLHttpRequest object
    const xhr = new XMLHttpRequest();
  
    // Configure the request
    xhr.open('POST', 'http://62.72.59.146:8005/business-details-media/');
  
    // Listen for the progress event to track upload progress
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        setUploadPercentage(percentage.toFixed(2)); // Update the state with the percentage
      }
    });
  
    // Listen for the load event when the upload is complete
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // Clear the form after successful upload
        setFormId('');
        setUploadLogo(null);
        imageFields.forEach((_, index) => {
          setStorePhotoOne(null);
          setProductPhotoOne(null);
        });
        videoFields.forEach((_, index) => {
          setStoreVideoOne(null);
          setProductVideoOne(null);
        });
        console.log(uploadPercentage)
      } else {
        if(uploadPercentage=="100.00"){

          alert('Media data uploaded successfully');
        }

      }
    });
  
    // Listen for the error event
    xhr.addEventListener('error', (error) => {
      console.error('Error uploading media data:', error);
      alert('An error occurred while uploading media data');
    });
  
    // Send the FormData object with the XMLHttpRequest
    xhr.send(data);
  


///////////////////////////////////////////
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
        // Reset state values

        setBusinessName('');
        setTagline('');
        setDescription('');
        setSelectedAdjectives([]);
        setSelectedModelTypes([]);
        setSelectedAdTypes([]);
        setSelectedDuration('');
        alert('Data Stored');

        
      } else {
        alert('Failed to store data.');
      }
    } catch (error) {
      alert('An error occurred while saving data.');
      console.error(error);
    }
  
  };
  if(uploadPercentage==100.00){
    navigate('/usersummary');
  }
  
  // };
  
  return (
  <div className='account-container'>
    <h1>Media Details</h1>
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

        {/* /////////////////////////////////////// */}
        <div>

<h4>Media Upload App</h4>
{/* <div>
  <h2>Form ID</h2>
  <input
    value={formId}
    onChange={(event) => setFormId(event.target.value)}
    type="number"
  />
</div> */}
<div>
  <h4>Upload Logo</h4>
  <input
    type="file"
    name="upload_logo"
    accept="image/*"
    onChange={handleLogoChange}
  />
  
</div>
<div>
  <h4>Store Photos (Max 5)</h4>
  <div>
  <input type="file"
   name="store_photo_one"
    accept="image/*" 
    onChange={(event) => 
    handleImageChange(event, setStorePhotoOne)} />

  </div>
  <div>
    <input
      type="file"
      name="store_photo_two"
      accept="image/*"
      onChange={(event) => handleImageChange(event, setStorePhotoTwo)}
    />
    
  </div>
  <div>
    <input
      type="file"
      accept="image/*"
      name="store_photo_three"

      onChange={(event) => handleImageChange(event, setStorePhotoThree)}
    />
    
  </div>
  <div>
    <input
      type="file"
      accept="image/*"
      name="store_photo_four"

      onChange={(event) => handleImageChange(event, setStorePhotoFour)}
    />
   
  </div>
  <div>
    <input
      type="file"
      name="store_photo_five"

      accept="image/*"
      onChange={(event) => handleImageChange(event, setStorePhotoFive)}
    />
   
  </div>
</div>
<div>
<h4>Product Photos (Max 5)</h4>
<div>
<input
type="file"
name="product_photo_one"

accept="image/*"
onChange={(event) => handleImageChange(event, setProductPhotoOne)}
/>

</div>
<div>
<input
type="file"
name="product_photo_two"

accept="image/*"
onChange={(event) => handleImageChange(event, setProductPhotoTwo)}
/>

</div>
<div>
<input
type="file"
name="product_photo_three"

accept="image/*"
onChange={(event) => handleImageChange(event, setProductPhotoThree)}
/>

</div>
<div>
<input
type="file"
name="product_photo_four"

accept="image/*"
onChange={(event) => handleImageChange(event, setProductPhotoFour)}
/>

</div>
<div>
<input
type="file"
name="product_photo_five"

accept="image/*"
onChange={(event) => handleImageChange(event, setProductPhotoFive)}
/>

</div>
</div>

<div>
<h4>Store Videos (Max 4)</h4>
<div>
<input
type="file"
name="store_video_one"

accept="video/*"
onChange={(event) => handleVideoChange(event, setStoreVideoOne)}
/>

</div>
<div>
<input
type="file"
name="store_video_two"

accept="video/*"
onChange={(event) => handleVideoChange(event, setStoreVideoTwo)}
/>

</div>
<div>
<input
type="file"
name="store_video_three"

accept="video/*"
onChange={(event) => handleVideoChange(event, setStoreVideoThree)}
/>

</div>
<div>
<input
type="file"
name="store_video_four"

accept="video/*"
onChange={(event) => handleVideoChange(event, setStoreVideoFour)}
/>

</div>
</div>

<div>
<h4>Product Videos (Max 4)</h4>
<div>
<input
type="file"
name="product_video_one"

accept="video/*"
onChange={(event) => handleVideoChange(event, setProductVideoOne)}
/>

</div>
<div>
<input
type="file"
name="product_video_two"

accept="video/*"
onChange={(event) => handleVideoChange(event, setProductVideoTwo)}
/>

</div>
<div>
<input
  height="240"
name="product_video_three"

type="file"
accept="video/*"
onChange={(event) => handleVideoChange(event, setProductVideoThree)}
/>

</div>
<div>
<input
type="file"
name="product_video_four"

accept="video/*"
onChange={(event) => handleVideoChange(event, setProductVideoFour)}
/>

</div>
</div>

{/* <button type='submit'>Upload Media Data</button> */}
</div>
<br />

        {/* ////////////////////////////////////// */}


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

<h3>Upload Progress: {uploadPercentage}%</h3>
        <button disabled={isSub} type="submit">
          {isSub ? "Submiting":"Submit"}
        </button>
      </form>
  </div>
  )
};

export default Module2;
