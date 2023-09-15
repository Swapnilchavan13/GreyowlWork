import React, { useState, useEffect } from "react";

export const Summary = () => {
  const [savedData, setSavedData] = useState([]);
  const [campData, setCampdata] = useState([]);
  const [mediaData, setMediaData] = useState([]);
  const [imgAndVideos, setImgAndVideos] = useState([]);
  // Define the API endpoint URL
  const [sumApproved, setSumApproved] = useState(false);
  const [campApproved, setCampApproved] = useState(false);
  const [mediaApproved, setMediaApproved] = useState(false);

  useEffect(() => {
    const apiUrl = "http://62.72.59.146:8005/business-details-media/";

    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update the component's state with the received data
        console.log(data.data);
        setImgAndVideos(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const apiUrl = "https://lonely-cow-life-jacket.cyclic.app/address";

    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update the component's state with the received data
        console.log(data);
        setSavedData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = "https://lonely-cow-life-jacket.cyclic.app/campaign";

    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update the component's state with the received data
        setCampdata(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = "https://lonely-cow-life-jacket.cyclic.app/business";

    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update the component's state with the received data
        setMediaData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleApproveTogglesum = (_id) => {
    setSumApproved((prevSumApproved) => ({
      ...prevSumApproved,
      [_id]: !prevSumApproved[_id],
    }));
    alert("Status Updated");
  };

  const handleApproveTogglecamp = (_id) => {
    setCampApproved((prevCampApproved) => ({
      ...prevCampApproved,
      [_id]: !prevCampApproved[_id],
    }));
    alert("Status Updated");
  };

  const handleApproveTogglemedia = (_id) => {
    setMediaApproved((prevMediaApproved) => ({
      ...prevMediaApproved,
      [_id]: !prevMediaApproved[_id],
    }));
    alert("Status Updated");
  };

  return (
    <div style={{ padding: "10px" }}>
      <h1>Campaign Summary</h1>
      <div id="summary">
        <div>
          <h3>Creative Summary</h3>
          <div>
            <ul>
              {savedData.map((data) => (
                <div className="main" key={data._id}>
                  <strong>Name:</strong> {data.name}
                  <br />
                  <strong>Year:</strong> {data.year}
                  <br />
                  <strong>Business Type 1:</strong> {data.businessType1}
                  <br />
                  <strong>Business Type 2:</strong> {data.businessType2}
                  <br />
                  <strong>Description:</strong> {data.des}
                  <br />
                  <strong>Address:</strong> {data.address}
                  <br />
                  <strong>City:</strong> {data.city}
                  <br />
                  <strong>State:</strong> {data.state}
                  <br />
                  <strong>Pin:</strong> {data.pin}
                  <br />
                  <strong>Contact Person:</strong> {data.contactPerson}
                  <br />
                  <strong>Email:</strong> {data.email}
                  <br />
                  <strong>Phone:</strong> {data.phone}
                  <br />
                  <strong>ETC:</strong> {data.etc}
                  <br />
                  {/* Add more fields here */}
                  <button onClick={() => handleApproveTogglesum(data._id)}>
                    {sumApproved[data._id] ? "Not Approve" : "Approve"}
                  </button>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h3>Campaign Elements</h3>
          <ul>
            {campData.map((data) => (
              <div className="main" key={data._id}>
                <strong>Selected District:</strong> {data.selectedDistrict}
                <br />
                <strong>Selected Talukas:</strong>{" "}
                {data.selectedTalukas.join(", ")}
                <br />
                <strong>Selected Villages:</strong>{" "}
                {data.selectedVillages.join(", ")}
                <br />
                <strong>Budget:</strong> {data.budget}
                <br />
                <strong>3D Media:</strong> {data.media3D ? "Yes" : "No"}
                <br />
                <strong>Slide Media:</strong> {data.mediaSlide ? "Yes" : "No"}
                <br />
                <strong>Video Media:</strong> {data.mediaVideo ? "Yes" : "No"}
                <br />
                <strong>Range:</strong> {data.range}
                <br />
                <strong>Selected Attributes:</strong>{" "}
                {data.selectedAttributes.join(", ")}
                <br />
                <strong>Selected Genders:</strong>{" "}
                {data.selectedGenders.join(", ")}
                <br />
                <strong>Selected Ranges:</strong>{" "}
                {data.selectedRanges.join(", ")}
                <br />
                <strong>Detail:</strong> {data.detail}
                <br />
                {/* Add more fields here */}
                <button onClick={() => handleApproveTogglecamp(data._id)}>
                  {campApproved[data._id] ? "Not Approve" : "Approve"}
                </button>
              </div>
            ))}
          </ul>
        </div>
        <div>
          <h3>Media Summary</h3>
          <ul>
            {mediaData.map((data) => (
              <div className="main" key={data._id}>
                <strong>Tagline:</strong> {data.tagline}
                <br />
                <strong>Description:</strong> {data.description}
                <br />
                <strong>Selected Ad Types:</strong>{" "}
                {data.selectedAdTypes.join(", ")}
                <br />
                <strong>Business Name:</strong> {data.businessName}
                <br />
                <strong>Selected Adjectives:</strong>{" "}
                {data.selectedAdjectives.join(", ")}
                <br />
                <strong>Selected Duration:</strong> {data.selectedDuration}
                <br />
                <strong>Selected Model Types:</strong>{" "}
                {data.selectedModelTypes.join(", ")}
                <br />
                <button onClick={() => handleApproveTogglemedia(data._id)}>
                  {mediaApproved[data._id] ? "Not Approve" : "Approve"}
                </button>
              </div>
            ))}
          </ul>
        </div>
        <div>
          <h3>Images and Videos Details</h3>
          {imgAndVideos.map((item) => (
            <div
              key={item.id}
              style={{ border: "1px solid black", margin: "10px" }}
            >
              <h4 htmlFor="">Logo</h4>
              <img src={item.upload_logo} alt="Logo" />
              <h4>Store Images</h4>
              {item.store_photo_one !== null && (
                <img src={item.store_photo_one} alt="Store Photo 1" />
              )}

              {item.store_photo_two !== null && (
                <img src={item.store_photo_two} alt="Store Photo 2" />
              )}

              {item.store_photo_three !== null && (
                <img src={item.store_photo_three} alt="Store Photo 3" />
              )}

              {item.store_photo_four !== null && (
                <img src={item.store_photo_four} alt="Store Photo 4" />
              )}

              {item.store_photo_five !== null && (
                <img src={item.store_photo_five} alt="Store Photo 5" />
              )}

              <h4>Store Videos</h4>
              {item.store_video_one !== null && (
                <video controls>
                  <source src={item.store_video_one} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}

              {item.store_video_two !== null && (
                <video controls>
                  <source src={item.store_video_two} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}

              {item.store_video_three !== null && (
                <video controls>
                  <source src={item.store_video_three} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              {item.store_video_four !== null && (
                <video controls>
                  <source src={item.store_video_four} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}

              <h4>Product Images</h4>
              {item.product_photo_one !== null && (
                <img src={item.product_photo_one} alt="Store Photo 1" />
              )}
              {item.product_photo_two !== null && (
                <img src={item.product_photo_two} alt="Store Photo 2" />
              )}
              {item.product_photo_three !== null && (
                <img src={item.product_photo_three} alt="Store Photo 3" />
              )}
              {item.product_photo_four !== null && (
                <img src={item.product_photo_four} alt="Store Photo 4" />
              )}
              {item.product_photo_five !== null && (
                <img src={item.product_photo_five} alt="Store Photo 5" />
              )}
              <h4>Store Videos</h4>

              {item.product_photo_five !== null && (
                <video controls>
                  <source src={item.product_video_one} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}

              {item.product_video_two !== null && (
                <video controls>
                  <source src={item.product_video_two} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}

              {item.product_video_three !== null && (
                <video controls>
                  <source src={item.product_video_three} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}

              {item.product_video_four !== null && (
                <video controls>
                  <source src={item.product_video_four} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
