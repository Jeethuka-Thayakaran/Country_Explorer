import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCountryByCode } from '../api/countries';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './CountryDetails.css';

const CountryDetails = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  const userToken = localStorage.getItem('token');

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch country details
        const [data] = await fetchCountryByCode(code);
        setCountry(data);

        // Fetch favorites from backend if logged in
        if (userToken) {
          const res = await fetch('http://localhost:5000/api/favorites', {
            headers: {
              'Authorization': `Bearer ${userToken}`,
            },
          });

          const json = await res.json();
          const favoriteCodes = json.favorites || [];

          // Set if this country is favorite
          if (data?.cca3) {
            setFavorite(favoriteCodes.includes(data.cca3));
          }
        }
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [code, userToken]);

  const handleFavoriteToggle = async (countryCode) => {
    if (!userToken) {
      alert('You need to log in to add favorites');
      return;
    }

    try {
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

      const text = await response.text();
      const data = JSON.parse(text);

      if (response.ok) {
        setFavorite(!favorite); // Toggle state
        console.log(data.message);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (loading) return <p className="loading">Loading country details...</p>;
  if (!country) return <p className="error">Country not found.</p>;

  return (
    <div className="country-details-container">
      <div className="country-details-card">
        <div className="flag-section">
          <h1 className="country-name">{country.name?.common}</h1>
        </div>
        <div className="flag-section">
          <img
            src={country.flags?.svg}
            alt={`Flag of ${country.name?.common}`}
            className="flag-image"
          />
          <button
            className="favorites-button"
            onClick={() => handleFavoriteToggle(country.cca3)}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {favorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
  
        <div className="info-section">
          <table className="country-info-table">
            <tbody>
              <tr>
                <td><strong>Official Name:</strong></td>
                <td>{country.name?.official || 'N/A'}</td>
              </tr>
              <tr>
                <td><strong>Capital:</strong></td>
                <td>{country.capital?.[0] || 'N/A'}</td>
              </tr>
              <tr>
                <td><strong>Region:</strong></td>
                <td>{country.region || 'N/A'}</td>
              </tr>
              <tr>
                <td><strong>Subregion:</strong></td>
                <td>{country.subregion || 'N/A'}</td>
              </tr>
              <tr>
                <td><strong>Population:</strong></td>
                <td>{country.population?.toLocaleString() || 'N/A'}</td>
              </tr>
              <tr>
                <td><strong>Languages:</strong></td>
                <td>{country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</td>
              </tr>
              <tr>
                <td><strong>Timezones:</strong></td>
                <td>{country.timezones?.join(', ') || 'N/A'}</td>
              </tr>
              <tr>
                <td><strong>Currency:</strong></td>
                <td>
                  {country.currencies
                    ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ')
                    : 'N/A'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
};

export default CountryDetails;
