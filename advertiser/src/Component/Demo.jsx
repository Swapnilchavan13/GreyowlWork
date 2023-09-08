import React, { useState } from 'react';

function Demo() {
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
    // const form = new FormData();
  //  data.append('data', JSON.stringify(data));

  
    // Append individual form fields one by one
    data.append('form_id', formId);
    data.append('upload_logo', uploadLogo);
  
    // Store Photos
    data.append('store_photo_one', storePhotoOne);
    data.append('store_photo_two', storePhotoTwo);
    data.append('store_photo_three', storePhotoThree);
    data.append('store_photo_four', storePhotoFour);
    data.append('store_photo_five', storePhotoFive);
  
    // Product Photos
    data.append('product_photo_one', productPhotoOne);
    data.append('product_photo_two', productPhotoTwo);
    data.append('product_photo_three', productPhotoThree);
    data.append('product_photo_four', productPhotoFour);
    data.append('product_photo_five', productPhotoFive);
  
    // Store Videos
    data.append('store_video_one', storeVideoOne);
    data.append('store_video_two', storeVideoTwo);
    data.append('store_video_three', storeVideoThree);
    data.append('store_video_four', storeVideoFour);
  
    // Product Videos
    data.append('product_video_one', productVideoOne);
    data.append('product_video_two', productVideoTwo);
    data.append('product_video_three', productVideoThree);
    data.append('product_video_four', productVideoFour);
  
    try {
      // Now, you can send a POST request with the FormData object
      const response = await fetch('http://62.72.59.146:8005/business-details-media/', {
        method: 'POST',
        body: data, // Use the FormData object as the body
      });
  
      if (response.status === 200) {
        // alert('Media data uploaded successfully');
        // Clear the form after successful upload
        setFormId('');
        setUploadLogo(null);
        setStorePhotoOne('');
        setStorePhotoTwo('');
        setStorePhotoThree('');
        setStorePhotoFour('');
        setStorePhotoFive('');
        setProductPhotoOne('');
        setProductPhotoTwo('');
        setProductPhotoThree('');
        setProductPhotoFour('');
        setProductPhotoFive('');
        setStoreVideoOne('');
        setStoreVideoTwo('');
        setStoreVideoThree('');
        setStoreVideoFour('');
        setProductVideoOne('');
        setProductVideoTwo('');
        setProductVideoThree('');
        setProductVideoFour('');
        alert('Media data uploaded successfully');

      } else {
        // alert('Failed to upload media data');
      }
    } catch (error) {
      console.error('Error uploading media data:', error);
      alert('An error occurred while uploading media data');
    }
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
            name="store_photo_"

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

      <button type='submit'>Upload Media Data</button>
    </div>
</form>

  );
}

export default Demo;

