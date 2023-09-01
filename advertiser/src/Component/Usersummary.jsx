import React, { useEffect, useState } from 'react'

export const Usersummary = () => {
    const [savedData, setSavedData] = useState([]);
    const [campData, setCampdata] = useState([]);
    const [mediaData, setMediaData] = useState([]);
    
    useEffect(() => {
      const apiUrl = 'https://lonely-cow-life-jacket.cyclic.app/address';
  
      // Fetch data from the API
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          // Update the component's state with the received data
          console.log(data)
          setSavedData(data[data.length-1]);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);

    useEffect(() => {
      // Define the API endpoint URL
      const apiUrl = 'https://lonely-cow-life-jacket.cyclic.app/campaign';
  
      // Fetch data from the API
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          // Update the component's state with the received data
          setCampdata(data[data.length-1]);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);

    useEffect(() => {
      // Define the API endpoint URL
      const apiUrl = 'https://lonely-cow-life-jacket.cyclic.app/business';
  
      // Fetch data from the API
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          // Update the component's state with the received data
          setMediaData(data[data.length-1]);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);

    console.log(campData)
     
  return (
    <div style={{"padding":"10px"}}>
        <h1>User Campaign Summary</h1>
        <div id='summary'>
            <div >
                <h3>Creative Summary</h3>
             <div>
          <ul>

          <div className='main'>
            <strong>Name:</strong> {savedData.name}<br />
            <strong>Year:</strong> {savedData.year}<br />
            <strong>Business Type 1:</strong> {savedData.businessType1}<br />
            <strong>Business Type 2:</strong> {savedData.businessType2}<br />
            <strong>Description:</strong> {savedData.des}<br />
            <strong>Address:</strong> {savedData.address}<br />
            <strong>City:</strong> {savedData.city}<br />
            <strong>State:</strong> {savedData.state}<br />
            <strong>Pin:</strong> {savedData.pin}<br />
            <strong>Contact Person:</strong> {savedData.contactPerson}<br />
            <strong>Email:</strong> {savedData.email}<br />
            <strong>Phone:</strong> {savedData.phone}<br />
            <strong>ETC:</strong> {savedData.etc}<br />
            {/* Add more fields here */}
          </div>
      </ul>
      
      </div>
    </div>
    <div>
        <h3>Campaign Elements</h3>
        <ul>
          <div className='main'>
            <strong>Selected District:</strong> {campData.selectedDistrict}<br />
            <strong>Selected Talukas:</strong> {campData.selectedTalukas.join(', ')}<br />
            <strong>Selected Villages:</strong> {campData.selectedVillages.join(', ')}<br />
            <strong>Budget: Rs.</strong>{campData.budget}<br />
            <strong>3D Media:</strong> {campData.media3D ? 'Yes' : 'No'}<br />
            <strong>Slide Media:</strong> {campData.mediaSlide ? 'Yes' : 'No'}<br />
            <strong>Video Media:</strong> {campData.mediaVideo ? 'Yes' : 'No'}<br />
            <strong>Range:</strong> {campData.range}<br />
            <strong>Selected Attributes:</strong> {campData.selectedAttributes.join(', ')}<br />
            <strong>Selected Genders:</strong> {campData.selectedGenders.join(', ')}<br />
            <strong>Selected Ranges:</strong> {campData.selectedRanges.join(', ')}<br />
            <strong>Detail:</strong> {campData.detail}<br />
            {/* Add more fields here */}    
          </div>
      </ul>   
    </div>
    <div>
        <h3>Media Summary</h3>
        <ul>
          <div className='main'>
            <strong>Business Name:</strong> {mediaData.businessName}<br />
            <strong>Tagline:</strong> {mediaData.tagline}<br />
            <strong>Description:</strong> {mediaData.description}<br />
            {/* <strong>Logo File:</strong> {data.logoFile ? 'Yes' : 'No'}<br /> */}
            {/* <strong>Product Photos:</strong> {data.productPhotos.filter(photo => photo).length}<br /> */}
            {/* <strong>Product Videos:</strong> {data.productVideos.filter(video => video).length}<br /> */}
            <strong>Selected Ad Types:</strong> {mediaData.selectedAdTypes.join(', ')}<br />
            <strong>Selected Adjectives:</strong> {mediaData.selectedAdjectives.join(', ')}<br />
            <strong>Selected Model Types:</strong> {mediaData.selectedModelTypes.join(', ')}<br />
            <strong>Selected Duration:</strong> {mediaData.selectedDuration}<br />
            {/* <strong>Store Photos:</strong> {data.storePhotos.filter(photo => photo).length}<br /> */}
            {/* <strong>Store Videos:</strong> {data.storeVideos.filter(video => video).length}<br /> */}
            {/* Add more fields here */}
          </div>
      </ul>
            </div>
            
        </div>
    </div>
  )
}
