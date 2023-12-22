import React, { useState, useEffect } from 'react';

export const Admin = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [addressData, setAddressData] = useState(null);
  const [campaignData, setCampaignData] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [viewMode, setViewMode] = useState(null); // 'address' or 'campaign'


  useEffect(() => {
    fetch('http://localhost:3000/signup')
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
    fetchCampaignData(userId);
    setViewMode('campaign');
  };

  const handleBusinessClick = (userId) => {
    setSelectedUserId(userId);
    fetchBusinessData(userId);
    setViewMode('business');
  };


  const fetchAddressData = (userId) => {
    fetch(`http://localhost:3000/address/${userId}`)
      .then(response => response.json())
      .then(data => setAddressData(data))
      .catch(error => console.error('Error fetching address data:', error));
  };

  const fetchCampaignData = (userId) => {
    fetch(`http://localhost:3000/campaign/${userId}`)
      .then(response => response.json())
      .then(data => setCampaignData(data))
      .catch(error => console.error('Error fetching campaign data:', error));
  };

  const fetchBusinessData = (userId) => {
    fetch(`http://localhost:3000/business/${userId}`)
      .then(response => response.json())
      .then(data => setBusinessData(data))
      .catch(error => console.error('Error fetching business data:', error));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table>
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
                <button onClick={() => handleUserClick(user._id)}>View Address</button>
                <button onClick={() => handleCampaignClick(user._id)}>View Campaign</button>
                <button onClick={() => handleBusinessClick(user._id)}>View Business</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {viewMode === 'address' && addressData && Array.isArray(addressData) && (
        <div>
          <h2>Full Details for User ID: {selectedUserId}</h2>
          {addressData.map(user => (
            <div key={user._id}>
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
        <div>
          <h2>Campaign Details for User ID: {selectedUserId}</h2>
          {campaignData.map(campaign => (
            <div key={campaign._id}>       
        <p>Detail: {campaign.detail}</p>
        <p>Budget: {campaign.budget}</p>
        <p>Selected Villages: {campaign.selectedVillages.join(', ')}</p>
        <p>Selected Talukas: {campaign.selectedTalukas.join(', ')}</p>
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
        <div>
          <h2>Business Details for User ID: {selectedUserId}</h2>
          {businessData.map(business => (
            <div key={business._id}>
              <p>Business Name: {business.businessName}</p>
              <p>Description: {business.description}</p>
              <p>Selected Ad Types: {business.selectedAdTypes.join(', ')}</p>
              <p>Selected Adjectives: {business.selectedAdjectives.join(', ')}</p>
              <p>Selected Duration: {business.selectedDuration}</p>
              <p>Selected Model Types: {business.selectedModelTypes.join(', ')}</p>
              <p>Tagline: {business.tagline}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
