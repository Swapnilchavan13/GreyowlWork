import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Createown = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 100;

  useEffect(() => {
    const apikey = 'en7mrb3c4adwv9k99reqhcur';
    const imageApiUrl = `https://api.gettyimages.com/v3/search/images/creative?phrase=${query}&page=${currentPage}&page_size=${resultsPerPage}`;

    setLoading(true);

    fetch(imageApiUrl, {
      headers: {
        "api-key": apikey,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.images)
        setPhotos(data.images);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });


  }, [query, currentPage]);

  const handleQChange = (e) => {
    setQuery(e.target.value);
  };
  const handlePageChange = (prev) => {
    setCurrentPage(prev + 1);
  };

  const totalPages = Math.ceil(photos.length / resultsPerPage);

  return (
    <div className="App">
      <h1>Create Your Own (Select Images or Videos Up to 5)</h1>
      <button>
        Next
      </button>

      <input
        type="text"
        value={query}
        onChange={handleQChange}
      />

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="allimages">
          {photos.map((image, index) => (
            <div key={index} className="image-card">
              <img style={{ height: "200px", width: "250px" }} src={image.display_sizes[0].uri} alt={image.caption} />
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button key={index} onClick={() => handlePageChange(index+1)}>Next Page</button>
        ))}
      </div>

    </div>
  );
};
