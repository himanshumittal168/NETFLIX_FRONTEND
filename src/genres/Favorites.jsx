import React, { useState, useRef, useEffect } from 'react';

const Favorites = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);
  const email = localStorage.getItem("email");

  const getMovies = async () => {
    try {
      setIsLoading(true);
      if (!email) {
        setError("No email found in local storage.");
        setIsLoading(false);
        return;
      }

      const response = await fetch("https://netflix-backend-1-5s54.onrender.com/api/favorites/getfavorites", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "email": email,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        console.log("Fetched movies:", data);
        setMovies(data);
      } else {
        throw new Error("Unexpected response format");
      }
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

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (isLoading) {
    return <div className="text-white text-center">Loading movies...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="movie-list-container my-8">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold text-white mb-4 px-4 uppercase">MY Favorites</h2>
        {movies.length > 0 && (
          <div className="flex space-x-2">
            <button
              onClick={() => scroll('left')}  
              className="text-violet-700"
            >
              &lt;
            </button>
            <button
              onClick={() => scroll('right')} 
              className="text-violet-700"
            >
              &gt; 
            </button>
          </div>
        )}
      </div>
      <div className="relative group">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-scroll custom-scrollbar-hide space-x-4 p-4"
        >
          {movies.length > 0 ? (
            movies.map((movie) => (
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
                  <div className="flex flex-row gap-3">
                    <button className="bg-white text-black py-1 px-3 rounded-lg text-sm font-semibold transition-colors duration-300">
                      Play
                    </button>
                    <button className="bg-gray-400 text-black py-1 px-3 rounded-xl text-sm font-semibold hover:text-red-600 transition-colors duration-300">
                      Add to Favorites
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-red-600 text-center">No movies added!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;