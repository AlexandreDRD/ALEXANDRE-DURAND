import { useState, useEffect } from 'react';
import axios from 'axios';

function Cat() {
  const [catImgUrl, setCatImgUrl] = useState('');
  const [catBreed, setCatBreed] = useState('');
  const [catDescription, setCatDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCatData();
  }, []);

  const fetchCatData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search?has_breeds=1&api_key=YOUR_API_KEY');
      const data = response.data[0];
      setCatImgUrl(data.url);
      setCatBreed(data.breeds[0].name);
      setCatDescription(data.breeds[0].description);
      setIsLoading(false);
      setError('');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setError('Failed to fetch cat data. Please try again later.');
    }
  };

  const handleRefresh = () => {
    fetchCatData();
  };

  const handleChangePhoto = () => {
    fetchCatData();
  };

  return (
    <div className="cat-container">
      <div className="cat-card">
        {isLoading ? (
          <div className="loading-spinner"></div>
        ) : (
          <img
            className="cat-img"
            src={catImgUrl}
            alt={`${catBreed ?? 'Unknown'} cat`}
            onClick={handleChangePhoto}
            loading="lazy"
          />
        )}
        <div className="cat-info">
          <h2>{catBreed ?? 'Unknown'}</h2>
          <p>{catDescription ?? 'No information available.'}</p>
          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <button className="new-cat-btn" onClick={handleRefresh}>
              {isLoading ? 'Loading...' : 'Get a new cat'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cat;

