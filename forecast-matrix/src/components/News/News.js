// File: /src/components/News/News.js
import React, { useState, useEffect } from 'react';
import { newsApiKey } from '../../config'; // <--- /src/config.js
import '../News/News.css';

function News({ selectedCity }) {
  const [data, setData] = useState();
  const [currentSlide, setCurrentSlide] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % (data?.articles?.length || 1));
    }, 5000); // Change slide every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, [data]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="news-container">
      <h2 className="news-heading">NEWS</h2>
      <p>Location: {selectedCity} </p>
      {data && (
        <div className="news-slideshow">
          {data.articles &&
            data.articles.map((article, index) => (
              <div
                key={index}
                className={`news-article ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              >
                <h2 className="news-title">{article.title}</h2>
                <p className="news-author">Author: {article.author}</p>
                <a href={article.url} className="news-link">
                  Read More
                </a>{' '}
                <br />
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt="NO IMAGE"
                    className="news-image"
                    style={{ width: '20%' }}
                  />
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default News;
