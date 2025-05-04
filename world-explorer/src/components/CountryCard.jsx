import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './CountryCard.css';

const CountryCard = ({ country, onClick, isFavorite = false, onToggleFavorite }) => {
  const [favorite, setFavorite] = useState(isFavorite); // Set initial favorite state based on isFavorite prop

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the token from localStorage
  const userToken = localStorage.getItem('token');

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch favorites from backend if logged in
        if (userToken) {
          const res = await fetch('http://localhost:5000/api/favorites', {
            headers: {
              'Authorization': `Bearer ${userToken}`,
            },
          });

          if (!res.ok) {
            throw new Error('Failed to fetch favorites');
          }

          const json = await res.json();
          const favoriteCodes = json.favorites || [];

          // Set favorite state based on response
          if (country?.cca3) {
            setFavorite(favoriteCodes.includes(country.cca3));
          }
        }
      } catch (err) {
        setError(err.message);
        console.error('Error loading favorites:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userToken, country?.cca3]); // Re-run when country or userToken changes

  const handleFavoriteToggle = async (countryCode) => {
    if (!userToken) {
      alert('You need to log in to add favorites');
      return;
    }

    try {
      // Toggle the favorite (add or remove based on the current state)
      const response = favorite
        ? await fetch('http://localhost:5000/api/favorites/remove', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userToken}`,
            },
            body: JSON.stringify({ countryCode }),
          })
        : await fetch('http://localhost:5000/api/favorites/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userToken}`,
            },
            body: JSON.stringify({ countryCode }),
          });

      const text = await response.text(); // Get the raw text response
      console.log('Response Text:', text); // Log response

      const data = JSON.parse(text); // Parse the response as JSON

      if (response.ok) {
        setFavorite(!favorite); // Update the favorite state
        console.log(data.message); // Log success message
        onToggleFavorite(countryCode); // Callback to parent component to update favorite list
      } else {
        console.error(data.message); // Log error message
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="country-card" data-testid={`country-${country.cca3}`}>
      {/* Country Flag */}
      <img
        src={country.flags?.png}
        alt={`${country.name?.common} flag`}
        className="country-flag"
        onClick={() => onClick?.(country.cca3)}
      />

      {/* Country Details */}
      <div className="country-details">
        <h2 className="country-namec">{country.name?.common}</h2>
        <p className="country-infos"><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
        <p className="country-infos"><strong>Region:</strong> {country.region}</p>
        <p className="country-infos"><strong>Population:</strong> {country.population.toLocaleString()}</p>
      </div>
            {/* Heart Icon */}
            <button
        className="favorite-button"
        onClick={() => handleFavoriteToggle(country.cca3)}
      >
        {favorite ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
  );
};

export default CountryCard;
