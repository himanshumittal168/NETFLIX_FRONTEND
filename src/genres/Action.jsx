import React, { useState, useRef, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';

const ActionMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);
  const email = localStorage.getItem('email');

  const getMovies = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=9c869b656bbcb8317a0c240b21095641&with_genres=18");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (e) {
      console.error("Error fetching movies:", e);
      setError("Failed to fetch movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const addFavorites = async (movie) => {
    try {
      const response = await fetch('https://netflix-backend-n3us.onrender.com/api/favorites/createfavorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'email': email,
        },
        body: JSON.stringify(movie),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Adding to favorites failed:', errorData.message);
        toast.error("Failed to add movie to favorites. Please try again.");
        return;
      }
      toast.success("Movie added to Favorites");
    } catch (error) {
      console.error('Error adding movie to favorites:', error);
      toast.error('Failed to add movie to favorites. Please try again.');
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (isLoading) {
    return <div className="text-red-600 loading loading-spinner loading-lg"></div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (movies.length === 0) {
    return <div className="text-white text-center">No movies found.</div>;
  }

  return (
    <div className="movie-list-container my-8">
      <Toaster/>
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold text-white mb-4 px-4 uppercase">DRAMA</h2>
        <button className="text-violet-700 mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round" className="lucide lucide-move-right">
            <path d="M18 8L22 12L18 16" /><path d="M2 12H22" /></svg>
        </button>
      </div>
      <div className="relative group">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-scroll custom-scrollbar-hide space-x-4 p-4"
          onMouseEnter={() => setIsScrolling(true)}
          onMouseLeave={() => setIsScrolling(false)}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-none w-40 md:w-48 lg:w-56 group/item relative transition-all duration-300 ease-in-out hover:scale-150 hover:z-10"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-md object-cover w-full h-auto transition-all duration-300 group-hover/item:rounded-none"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/item:bg-opacity-50 transition-all duration-300 flex flex-col items-center justify-center opacity-0 group-hover/item:opacity-100">
                <h3 className="text-white text-lg font-bold text-center mb-2">{movie.title}</h3>
                <div className='flex flex-row gap-3'>
                  <button className="bg-white text-black py-1 px-3 rounded-lg text-sm font-semibold transition-colors duration-300">
                    Play
                  </button>
                  <button onClick={() => addFavorites(movie)} className="bg-gray-400 text-black py-1 px-3 rounded-xl text-sm font-semibold hover:text-red-600 transition-colors duration-300">
                    Add to Favorites
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {isScrolling && (
          <>
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r-md hover:bg-opacity-75 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            >
              ❮
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l-md hover:bg-opacity-75 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            >
              ❯
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ActionMovies;