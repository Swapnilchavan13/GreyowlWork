import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Createown = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
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
        console.log(data.photos)
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setLoading(false);
      });
  }, []);

  const handleclick = () => {
    navigate('/module2');
  };

  return (
    <div className='App'>
      <h1>Create Your Own</h1>
      <button onClick={handleclick}>Next</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='allimages'>
          {photos.map(photo => (
            <div  key={photo.id}>
                <div>
                 <img style={{height:"350px", width:"270px"}} src={photo.src.medium} alt={photo.alt} />
                  <p>{photo.alt}</p>
                  </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
