// File: /src/components/TestComponents/NewsTest.js

import React, { useState, useEffect } from 'react';

function NewsTest() {
  const [data, setData] = useState();

  const newsApiKey = ''
  
  let user_location = 'New%20York'; // just for test; will later integrate w/ search bar

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?q=${user_location}&sortBy=relevance&apiKey=${newsApiKey}`
    )
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return (
    <>
      <p>Location: {user_location} </p>
      {data && (
        <>
          {data.articles &&
            data.articles.map((article, index) => (
              <div key={index}>
                <h2>{article.title}</h2>
                <p>Author: {article.author}</p>
                <a href={article.url}>Read More</a> <br />
                {article.urlToImage && <img src={article.urlToImage} alt="Article" style={{width:'20%'}}/>}
              </div>
            ))}
        </>
      )}
    </>
  );
}

export default NewsTest;