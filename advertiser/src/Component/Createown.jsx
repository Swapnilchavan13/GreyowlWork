import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Createown = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = 'uSZsZcZjmlsieQYmuY4dTvS4aXPpQSCsdFIDZuOVL6wFP1sb1X8dGGF4';
    const page = 2;
    const perPage = 60;
    const apiUrl = `https://api.pexels.com/v1/curated?page=${page}&per_page=${perPage}`;

    fetch(apiUrl, {
      headers: {
        Authorization: apiKey,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPhotos(data.photos);
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setLoading(false);
      });
  }, []);

  const handleImageClick = (photo) => {
    const isAlreadySelected = selectedPhotos.some(selectedPhoto => selectedPhoto.id === photo.id);

    if (isAlreadySelected) {
      // If the photo is already selected, remove it from the selection
      const updatedSelection = selectedPhotos.filter(selectedPhoto => selectedPhoto.id !== photo.id);
      setSelectedPhotos(updatedSelection);
    } else if (selectedPhotos.length < 5) {
      // If the photo is not selected and there are less than 5 selected photos, add it to the selection
      setSelectedPhotos([...selectedPhotos, photo]);
    }
  };

  const handleNextClick = () => {
    // Save selected photo URLs to local storage
    const selectedPhotoUrls = selectedPhotos.map(photo => photo.src.medium);
    localStorage.setItem('selectedPhotos', JSON.stringify(selectedPhotoUrls));

    // Navigate to the next page
    navigate('/campaign');
  };

  return (
    <div className='App'>
      <h1>Create Your Own (Select Images Upto 5)</h1>
      <button onClick={handleNextClick} disabled={selectedPhotos.length < 1}>Next</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='allimages'>
  {photos.map(photo => (
    <div
      key={photo.id}
      onClick={() => handleImageClick(photo)}
      className={`image-container ${selectedPhotos.some(selectedPhoto => selectedPhoto.id === photo.id) ? 'selected-image' : ''}`}
    >
      <img style={{ height: '350px', width: '270px' }} src={photo.src.medium} alt={photo.alt} />
      {/* <p>{photo.alt}</p> */}
    </div>
  ))}
</div>

      )}
    </div>
  );
};
