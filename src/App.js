import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [catUrl, setCatUrl] = useState('');
  const [breeds, setBreeds] = useState([]);

  const nouveauChat = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?has_breeds=1&api_key=live_mtl9hrEB87yKSbY11iXEkgFZtnsMeZtj2VhYQIJkQNOnRwIJkMleFZlmgHLyDF7p');
      const data = await response.json();
      setCatUrl(data[0].url);
      const catBreeds = data[0].breeds;
      setBreeds(catBreeds);
      if (catBreeds.length > 0) {
        console.log('Nom de la race de chat : ', catBreeds[0].name);
        console.log('Description de la race de chat : ', catBreeds[0].description);
        console.log('Tempérament de la race de chat : ', catBreeds[0].temperament);
      } else {
        console.log('Aucune information sur la race de chat disponible.');
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    nouveauChat();
  }, []);

  return (
    <div className='container'>
      <div className="cat-container">
        <img className="cat-img" src={catUrl} alt={breeds.length > 0 ? breeds[0].name : 'Random cat image'} />
        {catUrl && (
          <div className="cat-details">
            <h2 className="cat-name">Race : {breeds.find(breed => breed.id === catUrl.split('/')[4])?.name || 'Inconnue'}</h2>
            {breeds.length > 0 && (
              <div className="cat-attributes">
                <p>Description : {breeds.find(breed => breed.id === catUrl.split('/')[4])?.description || 'Aucune description disponible.'}</p>
                <p>Tempérament : {breeds.find(breed => breed.id === catUrl.split('/')[4])?.temperament || 'Aucun tempérament disponible.'}</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className='btn'>
        <button className='new-cat-btn' onClick={nouveauChat}>Un autre chat !</button>
      </div>
    </div>
  );
}

export default App;
