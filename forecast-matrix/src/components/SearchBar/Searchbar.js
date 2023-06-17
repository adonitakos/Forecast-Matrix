import React, { useState, useEffect } from 'react';
import { SearchbarContainer, SearchIcon, SearchInput, SearchResults } from './SearchbarElements';
import "./Searchbar.css";
import PropTypes from 'prop-types';

export default function Searchbar({ onCitySelect }) {
  // State Variables
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    let cancelRequest = false;

    // Fetch for searchQuery
    const fetchSuggestions = async () => {
      if (searchQuery) {
        try {
          const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?limit=5&name=${searchQuery}`
          ); // Ex: https://geocoding-api.open-meteo.com/v1/search?limit=5&name=Chicago

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
            })); // <--- results.map ends here
            setSuggestions(towns);
          } // <--- if(!cancelRequest) statement ends here
        } catch (error) {
          console.log('Error fetching suggestions:', error);
        }
      } // <--- if(searchQuery) statement ends here
      else {
        setSuggestions([]);
      }
    }; // <--- fetchSuggestions() async function ends here

    fetchSuggestions();

    return () => {
      cancelRequest = true;
    };

  }, [searchQuery]); // <--- useEffect() ends here

  const handleInputChange = event => {
    setSearchQuery(event.target.value);
  }; // <--- handleInputChange() function ends here

  const handleCityClick = async (city, country, state, lat, lon) => {
    onCitySelect(city, lat, lon);
    console.log('Selected City:', city);
    console.log('Country:', country);
    console.log('State:', state);
    console.log('Latitude:', lat);
    console.log('Longitude:', lon);
  }; //  <--- handleCityClick() function ends here

  return (
    <>
      <SearchbarContainer className="search-bar">
        <SearchIcon className="icon" aria-hidden="true" viewBox="0 0 24 24">
          {/* Icon SVG code */}
        </SearchIcon>
        <SearchInput
          placeholder="Search for a city..."
          type="search"
          className="input"
          value={searchQuery}
          onChange={handleInputChange}
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

    </>
  );

} // <--- Searchbar() function ends here

Searchbar.propTypes = {
  onCitySelect: PropTypes.func.isRequired,
};
