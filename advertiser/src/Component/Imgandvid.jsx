import React, { useState, useEffect } from "react";

export const Imgandvid = () => {
  const [mediaData, setMediaData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the provided URL
    fetch("https://lonely-cow-life-jacket.cyclic.app/imgandvid")
      .then((response) => response.json())
      .then((data) => {
        setMediaData(data[data.length - 1].imgandvid);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  }, []);
  console.log(mediaData);

  return (
    <>
      <h2>Selcted Images and Videos</h2>
      <div className="photosdiv">
        {mediaData.map((item, index) => (
          <div>
            <div key={index}>
              <div>
                {item.imgurl1.map((imgUrl, imgIndex) => (
                  <img
                    style={{ width: "200px", height: "300px" }}
                    key={`img-${index}-${imgIndex}`}
                    src={imgUrl}
                    alt={`Image ${imgIndex}`}
                  />
                ))}
              </div>
            </div>

            {item.vidurl1.length > 0 && (
              <div>
                {item.vidurl1.map((vidUrl, vidIndex) => (
                  <div>
                    <video
                      style={{ width: "200px", height: "300px" }}
                      key={`vid-${index}-${vidIndex}`}
                      src={vidUrl}
                      controls
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
