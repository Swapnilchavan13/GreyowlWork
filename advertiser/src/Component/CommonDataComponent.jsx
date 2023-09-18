import React, { useState, useEffect } from 'react';

export const CommonDataComponent = () => {
  const [commonData, setCommonData] = useState([]);
  const [data, setData] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [addressData, businessData] = await Promise.all([
        fetch('http://62.72.59.146:3000/address').then((response) => response.json()),
        fetch('http://62.72.59.146:3000/business').then((response) => response.json()),
      ]);

      // Find common items where media_id is equal to register_id
      const commonItems = businessData.filter((businessItem) =>
        addressData.some((addressItem) => businessItem.media_id === addressItem.register_id)
      );

      setCommonData(commonItems);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    fetch("https://jsonplaceholder.typicode.com/users").then(responce => {
        return responce.json()
    }).then(data => setData(data)
    )
    console.log(data)
  };
  console.log(commonData)

  return (
    <div>
      <h1>Common Data</h1>
      <ul>
        {data.map((i) => {
            <li key={i.id}>
            <p>{data.name}</p>
            </li>
        })}
        {commonData.map((item) => (
          <li key={item._id}>
            <p>Name: {item.name}</p>
            <p>Description: {item.description}</p>
            {/* Display other fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

