import React, { useState, useEffect } from 'react';
import './Admin.css'; 

export const Admin = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [addressData, setAddressData] = useState(null);
  const [campaignData, setCampaignData] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [mediaData, setMediaData] = useState(null);

  const [viewMode, setViewMode] = useState(null); // 'address' or 'campaign'


  const isMediaAvailable = (media) => {
    if (!media || media.length === 0) return false;

    const mediaKeys = [
      'upload_logo',
      'product_photo_one', 'product_photo_two', 'product_photo_three', 'product_photo_four', 'product_photo_five',
      'store_photo_one', 'store_photo_two', 'store_photo_three', 'store_photo_four', 'store_photo_five',
      'store_video_one', 'store_video_two', 'store_video_three', 'store_video_four',
      'product_video_one', 'product_video_two', 'product_video_three', 'product_video_four',
    ];

    return mediaKeys.some(key => media[0][key]);
  };

  // Function to render videos
  const renderVideos = (media, videoType) => {
    const videoKeys = [
      `${videoType}_video_one`,
      `${videoType}_video_two`,
      `${videoType}_video_three`,
      `${videoType}_video_four`,
    ];

    return videoKeys.map((key, index) => {
      const videoUrl = media[key];
      return videoUrl ? (
        <div key={index}>
          <h4>Video {index + 1}</h4>
          <video width="320" height="240" controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : null;
    });
  };

  useEffect(() => {
    fetch('http://62.72.59.146:3000/signup')
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    fetchAddressData(userId);
    setViewMode('address');

  };

  const handleCampaignClick = (userId) => {
    setViewMode('campaign');
  };

  const handleBusinessClick = (userId) => {
    setSelectedUserId(userId);
    fetchBusinessData(userId);
    fetchCampaignData(userId);
    setViewMode('business');
  };


  const fetchAddressData = (userId) => {
    fetch(`http://62.72.59.146:3000/address/${userId}`)
      .then(response => response.json())
      .then(data => setAddressData(data))
      .catch(error => console.error('Error fetching address data:', error));
  };

  const fetchCampaignData = (userId) => {
    fetch(`http://62.72.59.146:3000/campaign/${userId}`)
      .then(response => response.json())
      .then(data => setCampaignData(data))
      .catch(error => console.error('Error fetching campaign data:', error));
  };

  const fetchBusinessData = (userId) => {
    fetch(`http://62.72.59.146:3000/business/${userId}`)
      .then(response => response.json())
      .then(businessData => {
        setBusinessData(businessData);
        const miid = businessData[0].mi;

        // Fetch data from the media details API
        fetch('http://62.72.59.146:8005/business-details-media/')
          .then(response => response.json())
          .then(mediaDetailsData => {
            const filteredMediaData = mediaDetailsData.data.filter(media => media.form_id.toString() === miid.toString());
            setMediaData(filteredMediaData);
          })
          .catch(error => console.error('Error fetching media details data:', error));
      })
      .catch(error => console.error('Error fetching business data:', error));
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button className="action-button" onClick={() => handleUserClick(user._id)}>View Address</button>
                  <button className="action-button" onClick={() => handleCampaignClick(user._id)}>View Campaign</button>
                  <button className="action-button" onClick={() => handleBusinessClick(user._id)}>View Business</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      {viewMode === 'address' && addressData && Array.isArray(addressData) && (
       <div className="details-section">
       <h2 className="section-title">Full Details for User ID: {selectedUserId}</h2>
       {addressData.map(user => (
         <div className="detail-block" key={user._id}>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Address 1: {user.address1}</p>
              <p>Address 2: {user.address2}</p>
              <p>Business Type 1: {user.businessType1}</p>
              <p>Business Type 2: {user.businessType2}</p>
              <p>City: {user.city}</p>
              <p>Contact Person: {user.contactPerson}</p>
              <p>Description: {user.des}</p>
              <p>Phone: {user.phone}</p>
              <p>Business Phone: {user.businessphone}</p>
              <p>Pin: {user.pin}</p>
              <p>State: {user.state}</p>
              <p>Year: {user.year}</p>
            </div>
          ))}
        </div>
      )}
      {viewMode === 'campaign' && campaignData && Array.isArray(campaignData) && (
        <div className="details-section">
       <h2 className="section-title">Campaign Details for User ID: {selectedUserId}</h2>
       {campaignData.map(campaign => (
         <div className="detail-block" key={campaign._id}>
              <p>Detail: {campaign.detail}</p>
              <p>Budget: {campaign.budget}</p>
           <p>Selected Talukas: {campaign.selectedTalukas.join(', ')}</p>
              <p>Selected Villages: {campaign.selectedVillages.join(', ')}</p>
              <p>Selected Ranges: {campaign.selectedRanges.join(', ')}</p>
              <p>Selected Genders: {campaign.selectedGenders.join(', ')}</p>
              <p>Selected District: {campaign.selectedDistrict}</p>
              <p>Selected Attributes: {campaign.selectedAttributes.join(', ')}</p>
              <p>Range: {campaign.range}</p>
              <p>Media Video: {campaign.mediaVideo ? 'Yes' : 'No'}</p>
              <p>Media Slide: {campaign.mediaSlide ? 'Yes' : 'No'}</p>
              <p>Media 3D: {campaign.media3D ? 'Yes' : 'No'}</p>
            </div>
          ))}
        </div>
      )}

      {viewMode === 'business' && businessData && Array.isArray(businessData) && (
        <div className="details-section">
        <h2 className="section-title">Business Details for User ID: {selectedUserId}</h2>
        {businessData.map(business => (
          <div className="detail-block" key={business._id}>
              <p>Business Name: {business.businessName}</p>
              <p>Description: {business.description}</p>
              <p>Selected Ad Types: {business.selectedAdTypes.join(', ')}</p>
              <p>Selected Adjectives: {business.selectedAdjectives.join(', ')}</p>
              <p>Selected Duration: {business.selectedDuration}</p>
              <p>Selected Model Types: {business.selectedModelTypes.join(', ')}</p>
              <p>Tagline: {business.tagline}</p>
            </div>
          ))}

          {mediaData && isMediaAvailable(mediaData) ? (
            <div className="media-section">
              <h3 className="section-title">Media Data:</h3>
          
              <h3>Logo Image</h3>
              {mediaData[0].upload_logo && <img src={mediaData[0].upload_logo} alt="Logo" />}

              {mediaData[0].product_photo_one && <img src={mediaData[0].product_photo_one} alt="one" />}
              {mediaData[0].product_photo_two && <img src={mediaData[0].product_photo_two} alt="two" />}
              {mediaData[0].product_photo_three && <img src={mediaData[0].product_photo_three} alt="three" />}
              {mediaData[0].product_photo_four && <img src={mediaData[0].product_photo_four} alt="four" />}
              {mediaData[0].product_photo_five && <img src={mediaData[0].product_photo_five} alt="five" />}

              <h3>Store Photos</h3>
              {mediaData[0].store_photo_one && <img src={mediaData[0].store_photo_one} alt="Logo" />}
              {mediaData[0].store_photo_two && <img src={mediaData[0].store_photo_two} alt="Logo" />}
              {mediaData[0].store_photo_three && <img src={mediaData[0].store_photo_three} alt="Logo" />}
              {mediaData[0].store_photo_four && <img src={mediaData[0].store_photo_four} alt="Logo" />}
              {mediaData[0].store_photo_five && <img src={mediaData[0].store_photo_five} alt="Logo" />}

              <h3>Product Photos</h3>
              <h3>Store Videos</h3>
              {renderVideos(mediaData[0], 'store')}

              <h3>Product Videos</h3>
              {renderVideos(mediaData[0], 'product')}
            </div>
              ) : (
              <div className="media-section">
              <h3 className="section-title">No media added</h3>
              </div>
              )}
              </div>
              )}
            </div>
          </div>
      );
  };
        