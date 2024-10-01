import React, { useState, useEffect } from 'react';

const ViewFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('https://netflix-backend-n3us.onrender.com/api/favorites/getfavorites', {
          headers: {
            'email': email || '', 
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch favorites');
        }
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    if (email) {
      fetchFavorites();
    }
  }, [email]);

  const removeFromFavorites = async (movieId) => {
    try {
      const response = await fetch(`https://netflix-backend-n3us.onrender.com/api/favorites//deletefavorite/${movieId}`, {
        method: 'DELETE',
        headers: {
          'email': email || '',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to remove from favorites');
      }
      setFavorites(favorites.filter(movie => movie.id !== movieId));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black pt-20 pb-10">
      <div className="container mx-auto px-4 py-8 w-full max-w-7xl">
        <h1 className="text-3xl font-bold text-white mb-8 ">My Favorite's</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-white mb-2 truncate">{movie.title}</h2>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-yellow-400 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                </div>
                <p className="text-gray-300 text-sm line-clamp-3">{movie.overview}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm text-gray-400">Votes: {movie.vote_count}</span>
                  <span className="text-sm text-gray-400">Lang: {movie.original_language.toUpperCase()}</span>
                </div>
              </div>
              <div className="px-4 py-2 bg-gray-900">
                <button 
                  className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
                  onClick={() => removeFromFavorites(movie.id)}
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
        {favorites.length === 0 && (
          <p className="text-white text-center text-xl mt-12">You haven't added any favorites yet.</p>
        )}
      </div>
    </div>
  );
};

export default ViewFavorites;