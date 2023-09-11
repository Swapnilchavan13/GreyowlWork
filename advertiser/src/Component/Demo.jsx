import React, { useState } from 'react';

function Demo() {

  const [uploadPercentage, setUploadPercentage] = useState(0);  //New state variable for percentage


  const [formId, setFormId] = useState('');
  const [uploadLogo, setUploadLogo] = useState(null);
  const [storePhotoOne, setStorePhotoOne] = useState(null);
  const [storePhotoTwo, setStorePhotoTwo] = useState(null);
  const [storePhotoThree, setStorePhotoThree] = useState(null);
  const [storePhotoFour, setStorePhotoFour] = useState(null);
  const [storePhotoFive, setStorePhotoFive] = useState(null);

  const [productPhotoOne, setProductPhotoOne] = useState(null);
  const [productPhotoTwo, setProductPhotoTwo] = useState(null);
  const [productPhotoThree, setProductPhotoThree] = useState(null);
  const [productPhotoFour, setProductPhotoFour] = useState(null);
  const [productPhotoFive, setProductPhotoFive] = useState(null);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
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
        alert('Media data uploaded successfully');
      } else {
        alert('Failed to upload media data');
      }
    });
  
    // Listen for the error event
    xhr.addEventListener('error', (error) => {
      console.error('Error uploading media data:', error);
      alert('An error occurred while uploading media data');
    });
  
    // Send the FormData object with the XMLHttpRequest
    xhr.send(data);
  };
  
  
     

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      
  {/* ... other form elements ... */}
    <div className="App">

      <h1>Media Upload App</h1>
      <div>
        <h2>Form ID</h2>
        <input
          value={formId}
          onChange={(event) => setFormId(event.target.value)}
          type="number"
        />
      </div>
      <div>
        <h2>Upload Logo</h2>
        <input
          type="file"
          name="upload_logo"
          accept="image/*"
          onChange={handleLogoChange}
        />
        
      </div>
      <div>
        <h2>Store Photos (Max 5)</h2>
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
  <h2>Product Photos (Max 5)</h2>
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
  <h2>Store Videos (Max 4)</h2>
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
  <h2>Product Videos (Max 4)</h2>
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
<h2>Upload Progress: {uploadPercentage}%</h2>
      <button type='submit'>Upload Media Data</button>
    </div>
</form>

  );
}

export default Demo;

