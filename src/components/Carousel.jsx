import React, { useEffect, useState } from 'react';

const Carousel = () => {
  const [movies, setMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const getMovies = () => {
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=9c869b656bbcb8317a0c240b21095641")
      .then((response) => response.json())
      .then((data) => setMovies(data.results));
  };

  const userId = localStorage.getItem("userid");

  useEffect(() => {
    getMovies();
  }, [userId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % movies.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [movies.length]);

  const toSentenceCase = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  return (
    <div className="carousel w-full h-[56.25vw] sm:h-[50vw] md:h-[45vw] lg:h-[40vw] xl:h-[35vw] relative overflow-hidden">
      {movies.map((movie, index) => (
        <div
          id={`slide${index + 1}`}
          className={`carousel-item absolute w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          key={movie.id}
        >
          <div className="w-full h-full relative overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              className="w-full h-full object-cover"
              alt={movie.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
          </div>
          {/* Title and Overview */}
          <div className="absolute left-4 sm:left-6 md:left-8 lg:left-10 bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-2xl text-white p-2 sm:p-3 md:p-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 sm:mb-2 md:mb-3 lg:mb-4 line-clamp-2">
              {movie.title}
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-300 mb-2 sm:mb-3 md:mb-4 lg:mb-6 line-clamp-2 sm:line-clamp-3 md:line-clamp-4">
              {toSentenceCase(movie.overview)}
            </p>
            <button className="bg-white text-black py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 lg:py-2 lg:px-6 text-xs sm:text-sm md:text-base lg:text-lg rounded-md font-bold hover:bg-opacity-80 transition mr-2">
              Play
            </button>
            <button className="bg-gray-500 bg-opacity-50 text-white py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 lg:py-2 lg:px-6 text-xs sm:text-sm md:text-base lg:text-lg rounded-md font-bold hover:bg-opacity-40 transition">
              More Info
            </button>
          </div>
        </div>
      ))}
      {/* Carousel navigation */}
      <div className="absolute left-2 right-2 sm:left-4 sm:right-4 top-1/2 flex -translate-y-1/2 transform justify-between">
        <button
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + movies.length) % movies.length)}
          className="btn btn-circle btn-sm sm:btn-md lg:btn-lg bg-black bg-opacity-50 text-white border-none hover:bg-opacity-75 transition"
        >
          ❮
        </button>
        <button
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % movies.length)}
          className="btn btn-circle btn-sm sm:btn-md lg:btn-lg bg-black bg-opacity-50 text-white border-none hover:bg-opacity-75 transition"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Carousel;