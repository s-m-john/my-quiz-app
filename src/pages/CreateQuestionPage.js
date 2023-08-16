import React, { useState, useEffect } from 'react';
import countriesApi from '../api/countriesApi';

const CreateQuestionPage = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch countries using the countriesApi
    countriesApi.fetchCountries()
      .then((fetchedCountries) => {
        setCountries(fetchedCountries);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  // Render countries
  return (
    <div>
      <h2>Country List</h2>
      <ul>
        {countries.map((country) => (
          <li key={country.name.common}>{country.name.common}</li>
        ))}
      </ul>
    </div>
  );
};

export default CreateQuestionPage;
