import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Createown = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = 'uSZsZcZjmlsieQYmuY4dTvS4aXPpQSCsdFIDZuOVL6wFP1sb1X8dGGF4';

    // Fetch images
    const imageApiUrl = `https://api.pexels.com/v1/curated?page=2&per_page=30`;

    fetch(imageApiUrl, {
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
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });

    // Fetch videos
    const videoApiUrl = 'https://api.pexels.com/videos/search?query=nature&per_page=30';

    fetch(videoApiUrl, {
      headers: {
        Authorization: apiKey,
      },
    })
      .then(response => {
        if (!response.ok) {
          console.log('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setVideos(data.videos);
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
      // If the photo is not selected and there are fewer than 5 selected photos, add it to the selection
      setSelectedPhotos([...selectedPhotos, photo]);
    }
  };

  const handleVideoClick = (video) => {
    const isAlreadySelected = selectedVideos.some(selectedVideo => selectedVideo.id === video.id);

    if (isAlreadySelected) {
      // If the video is already selected, remove it from the selection
      const updatedSelection = selectedVideos.filter(selectedVideo => selectedVideo.id !== video.id);
      setSelectedVideos(updatedSelection);
    } else if (selectedVideos.length < 5) {
      // If the video is not selected and there are fewer than 5 selected videos, add it to the selection
      setSelectedVideos([...selectedVideos, video]);
    }
  };

  const handleNextClick = async () => {
    // Create an array to store all selected media in the desired format
    const formattedMediaData = [
      {Allinoneid: 123}
    ];
  
    // Add selected images to the array
    selectedPhotos.slice(0, 9).forEach((photo, index) => {
      formattedMediaData.push({
        mainid: photo.id,
        imgurl1: photo.src.medium,
        // Add other fields as needed for images
      });
    });
  
    // Add video data if available, up to the remaining slots
    selectedVideos.slice(0, 5).forEach((video, index) => {
      formattedMediaData.push({
        mainid: video.id,
        vidurl1: video.video_files[0].link,
        // Add other fields as needed for videos
      });
    });
    // Make a POST request to your server API to store the formatted media data
    try {
      const response = await fetch('https://lonely-cow-life-jacket.cyclic.app/imgandvid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imgandvid: formattedMediaData }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Media data stored successfully:', data);
  
        // Navigate to the next page (campaign page) if needed
        navigate('/slectedimgandvid');
      } else {
        console.error('Failed to store media data.');
        // Handle the error as needed, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('An error occurred while making the POST request:', error);
      // Handle the error as needed, e.g., show an error message to the user
    }
  };
  
  return (
    <div className='App'>
      <h1>Create Your Own (Select Images or Videos Up to 5)</h1>
      <button onClick={handleNextClick} disabled={selectedPhotos.length + selectedVideos.length < 1}>
        Next
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='allmedia'>
          <div className='allimages'>
            {photos.map(photo => (
              <div
                key={photo.id}
                onClick={() => handleImageClick(photo)}
                className={`media-container ${selectedPhotos.some(
                  selectedPhoto => selectedPhoto.id === photo.id
                ) ? 'selected-media' : ''}`}
              >
                <img style={{ height: '350px', width: '270px' }} src={photo.src.medium} alt={photo.alt} />
              </div>
            ))}
          </div>
          {/* Videos */}
          <div className='allimages'>
            {videos.map(video => (
              <div
                key={video.id}
                onClick={() => handleVideoClick(video)}
                className={`media-container ${selectedVideos.some(
                  selectedVideo => selectedVideo.id === video.id
                ) ? 'selected-video' : ''}`}
              >
                <video controls style={{ height: '350px', width: '270px' }}>
                  <source src={video.video_files[0].link} type='video/mp4' />
                </video>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
