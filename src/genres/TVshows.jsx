import React, { useState, useRef, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const TVShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);
  const email = localStorage.getItem('email');
  const navigate = useNavigate();

  const getTvShows = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&api_key=9c869b656bbcb8317a0c240b21095641");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTvShows(data.results);
    } catch (e) {
      console.error("Error fetching TV shows:", e);
      toast.error("Error Fetching");
      setError("Failed to fetch TV shows. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTvShows();
  }, []);

  const addFavorites = async (tvShow) => {
    if(!email){
      toast.error('Please log in to add TV shows to favorites.');
      setTimeout(() => navigate("/login"), 1000);
      return;
    }
    try {
      const response = await fetch('https://netflix-backend-n3us.onrender.com/api/favorites/createfavorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'email': email,
        },
        body: JSON.stringify({
          adult: tvShow.adult,
          backdrop_path: tvShow.backdrop_path,
          genre_ids: tvShow.genre_ids,
          id: tvShow.id,
          original_language: tvShow.original_language,
          original_title: tvShow.original_name,   
          overview: tvShow.overview || "No overview available",
          popularity: tvShow.popularity,
          poster_path: tvShow.poster_path,
          release_date: tvShow.first_air_date,    
          title: tvShow.name,                    
          video: false,                          
          vote_average: tvShow.vote_average,
          vote_count: tvShow.vote_count,
        }),
      });

      console.log("JSON => ",  {
        overview: tvShow.overview,
      })
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData.message);
        toast.error(errorData.message);
        return;
      }
      toast.success(`${tvShow.name} added to wishlist`);
    } catch (error) {
      console.error('Error adding TV show to wishlist:', error);
      toast.error('Failed to add TV show to wishlist. Please try again.');
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

  if (tvShows.length === 0) {
    return <div className="text-white text-center">No TV shows found.</div>;
  }

  return (
    <div className="movie-list-container my-8">
      <Toaster />
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold text-white mb-4 px-4 uppercase">tv shows</h2>
        <button className="text-violet-700 mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-move-right"
          >
            <path d="M18 8L22 12L18 16" />
            <path d="M2 12H22" />
          </svg>
        </button>
      </div>
      <div className="relative group">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-scroll custom-scrollbar-hide space-x-4 p-4"
          onMouseEnter={() => setIsScrolling(true)}
          onMouseLeave={() => setIsScrolling(false)}
        >
          {tvShows.map((tvShow) => (
            <div
              key={tvShow.id}
              className="flex-none w-40 md:w-48 lg:w-56 group/item relative transition-all duration-300 ease-in-out hover:scale-150 hover:z-10"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                alt={tvShow.name}
                className="rounded-md object-cover w-full h-auto transition-all duration-300 group-hover/item:rounded-none"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/item:bg-opacity-50 transition-all duration-300 flex flex-col items-center justify-center opacity-0 group-hover/item:opacity-100">
                <h3 className="text-white text-lg font-bold text-center mb-2">{tvShow.name}</h3>
                <div className="flex flex-row gap-3">
                  <button className="bg-white text-black py-1 px-3 rounded-lg text-sm font-semibold transition-colors duration-300">
                    Play
                  </button>
                  <button
                    onClick={() => addFavorites(tvShow)}
                    className="bg-gray-400 text-black py-1 px-3 rounded-xl text-sm font-semibold hover:text-red-600 transition-colors duration-300"
                  >
                    Add to wishlist
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

export default TVShows;