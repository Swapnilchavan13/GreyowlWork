import React, { useState, useEffect } from 'react';

export const Summary = () => {
    const [savedData, setSavedData] = useState([]);
    const [campData, setCampdata] = useState([]);
    const [mediaData, setMediaData] = useState([]);
    const [sum, setSum] = useState(false);
    const [camp, setCamp] = useState(false);
    const [media, setMedia] = useState(false);


    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('accounts'));
        if (storedData) {
          setSavedData(storedData);
        }
      }, []);

      useEffect(() => {
        const campData = JSON.parse(localStorage.getItem('formData'));
        if (campData) {
        setCampdata(campData);
        }
      }, []);


      useEffect(() => {
        const mediaData = JSON.parse(localStorage.getItem('savedData'));
        if (mediaData) {
            setMediaData(mediaData);
        }
      }, []);

      const handleApproveTogglesum = (sum) => {
        setSum(!sum)
      };

      const handleApproveTogglecamp = (camp) => {
        setCamp(!camp)
      };
      const handleApproveTogglemedia = (media) => {
        setMedia(!media)
      };

  return (
    <div style={{"padding":"10px"}}>
        <h1>Campaign Summary</h1>
        <div id='summary'>
            <div>
                <h3>Creative Summary</h3>
                <div>
                <ul>
        {savedData.map((data, index) => (
          <li key={index}>
            <strong>Name:</strong> {data.name}<br />
            <strong>Year:</strong> {data.year}<br />
            <strong>Business Type 1:</strong> {data.businessType1}<br />
            <strong>Business Type 2:</strong> {data.businessType2}<br />
            <strong>Description:</strong> {data.des}<br />
            <strong>Address:</strong> {data.address}<br />
            <strong>City:</strong> {data.city}<br />
            <strong>State:</strong> {data.state}<br />
            <strong>Pin:</strong> {data.pin}<br />
            <strong>Contact Person:</strong> {data.contactPerson}<br />
            <strong>Email:</strong> {data.email}<br />
            <strong>Phone:</strong> {data.phone}<br />
            <strong>ETC:</strong> {data.etc}<br />
            {/* Add more fields here */}
          </li>
        ))}
      </ul>
      <button onClick={() => handleApproveTogglesum(sum)}>
                  { sum? 'Not Approve' : 'Approve'}
        </button>
      </div>
    </div>
    <div>
        <h3>Campaign Elements</h3>
        <ul>
        {campData.map((data, index) => (
          <li key={index}>
            <strong>Selected District:</strong> {data.selectedDistrict}<br />
            <strong>Selected Talukas:</strong> {data.selectedTalukas.join(', ')}<br />
            <strong>Budget:</strong> {data.budget}<br />
            <strong>3D Media:</strong> {data.media3D ? 'Yes' : 'No'}<br />
            <strong>Slide Media:</strong> {data.mediaSlide ? 'Yes' : 'No'}<br />
            <strong>Video Media:</strong> {data.mediaVideo ? 'Yes' : 'No'}<br />
            <strong>Range:</strong> {data.range}<br />
            <strong>Selected Attributes:</strong> {data.selectedAttributes.join(', ')}<br />
            <strong>Selected Genders:</strong> {data.selectedGenders.join(', ')}<br />
            <strong>Selected Ranges:</strong> {data.selectedRanges.join(', ')}<br />
            <strong>Selected Villages:</strong> {data.selectedVillages.join(', ')}<br />
            <strong>Detail:</strong> {data.detail}<br />
            {/* Add more fields here */}    
          </li>
        ))}
      </ul>
      <button onClick={() => handleApproveTogglecamp(camp)}>
                  { camp? 'Not Approve' : 'Approve'}
        </button>
    </div>
    <div>
        <h3>Media Summary</h3>
        <ul>
        {mediaData.map((data, index) => (
          <li key={index}>
            <strong>Tagline:</strong> {data.tagline}<br />
            <strong>Description:</strong> {data.description}<br />
            <strong>Logo File:</strong> {data.logoFile ? 'Yes' : 'No'}<br />
            <strong>Product Photos:</strong> {data.productPhotos.filter(photo => photo).length}<br />
            <strong>Product Videos:</strong> {data.productVideos.filter(video => video).length}<br />
            <strong>Selected Ad Types:</strong> {data.selectedAdTypes.join(', ')}<br />
            <strong>Business Name:</strong> {data.businessName}<br />
            <strong>Selected Adjectives:</strong> {data.selectedAdjectives.join(', ')}<br />
            <strong>Selected Duration:</strong> {data.selectedDuration}<br />
            <strong>Selected Model Types:</strong> {data.selectedModelTypes.join(', ')}<br />
            <strong>Store Photos:</strong> {data.storePhotos.filter(photo => photo).length}<br />
            <strong>Store Videos:</strong> {data.storeVideos.filter(video => video).length}<br />
            {/* Add more fields here */}
          </li>
        ))}
      </ul>
      <button onClick={() => handleApproveTogglemedia(media)}>
                  { media? 'Not Approve' : 'Approve'}
        </button>
    
            </div>
            
        </div>
    </div>
  )
}
