import React, { useState, useEffect } from 'react';
import { SearchbarContainer, SearchIcon, SearchInput, SearchResults } from './SearchbarElements';
import "./Searchbar.css";


export default function Searchbar() {
  // Variables
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    let cancelRequest = false;

    // Fetch for searchQuery
    const fetchSuggestions = async () => {
      if (searchQuery) {
        try {
          const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?limit=5&name=${searchQuery}`
          );

          if (!cancelRequest) {
            const { results } = await response.json();
            // Map Suggestions - added lat and long for geo conversion
            // If you want more for the drop-down, add it here (look at the doc page)
            const towns = results.map(item => ({
              city: item.name,
              country: item.country,
              state: item.admin1 || item.admin2 || item.admin3 || item.admin4 || '',
              latitude: item.latitude,
              longitude: item.longitude,
            }));
            setSuggestions(towns);
          }
        } catch (error) {
          console.log('Error fetching suggestions:', error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();

    return () => {
      
      cancelRequest = true;
    };
  }, [searchQuery]);

  const handleInputChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleCityClick = async (city, country, state, lat, lon) => {
    setSelectedCity(city);
    setSelectedCountry(country);
    setSelectedState(state);
    setLatitude(lat);
    setLongitude(lon);
    console.log('Selected City:', city);
    console.log('Country:', country);
    console.log('State:', state);
    console.log('Latitude:', lat);
    console.log('Longitude:', lon);
  };

  return (
    <>
      <SearchbarContainer className="search-bar">
        <SearchIcon className="icon" aria-hidden="true" viewBox="0 0 24 24">
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
          </g>
        </SearchIcon>
        <SearchInput
          placeholder="Search"
          type="search"
          className="input"
          value={searchQuery}
          onChange={handleInputChange}
          list="suggestions-list"
        />
      </SearchbarContainer>

      {/* Suggestion List */}
      <SearchResults className='SearchResults_List'>
        {suggestions.length > 0 && (
          <ul>
            {suggestions.map((town, index) => (
              <li key={index} onClick={() => handleCityClick(town.city, town.country, town.state, town.latitude, town.longitude)}>
                {town.city}, {town.state}, {town.country}
              </li>
            ))}
          </ul>
        )}
      </SearchResults>

      {/* Selected City Info */}
      {selectedCity && (
        <div>
          <p>Selected City: {selectedCity}</p>
          <p>Country: {selectedCountry}</p>
          <p>State: {selectedState}</p>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
        </div>
      )}
    </>
  );
}
