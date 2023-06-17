import React, { useState, useEffect } from 'react';
import { newsApiKey } from '../../config';

function News({ selectedCity }) {
  const [data, setData] = useState();

  useEffect(() => {
    if (selectedCity) {
      const user_location = encodeURIComponent(selectedCity);
      fetch(
        `https://newsapi.org/v2/top-headlines?q=${user_location}&sortBy=relevance&apiKey=${newsApiKey}`
      )
        .then((response) => response.json())
        .then((json) => setData(json));
    }
  }, [selectedCity]);

  return (
    <>
      <p>Location: {selectedCity} </p>
      {data && (
        <>
          {data.articles &&
            data.articles.map((article, index) => (
              <div key={index}>
                <h2>{article.title}</h2>
                <p>Author: {article.author}</p>
                <a href={article.url}>Read More</a> <br />
                {article.urlToImage && <img src={article.urlToImage} alt="NO IMAGE" style={{width:'20%'}}/>}
              </div>
            ))}
        </>
      )}
    </>
  );
}

export default News;
