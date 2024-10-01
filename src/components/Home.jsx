import React from 'react';
import Carousel from './Carousel';
import PopularMovies from '../genres/Popular';
import TopMovies from '../genres/TopRated';
import ActionMovies from '../genres/Action';
import TVShows from '../genres/TVshows';
import Anime from '../genres/Anime';
import Footer from './Footer';

const Home = () => {
  return (
    <div> 
      <div className='flex flex-col'>  
        <Carousel/>
        <div className='mt-20'><PopularMovies/></div>
        <div className='mt-5'><TVShows/></div>
        <div className='mt-5'><TopMovies/></div>   
        <div className='mt-5'><ActionMovies/></div>
        <div className='mt-5'><Anime/></div> 
        <footer className='mt-4'>
          <Footer/>
        </footer>
      </div>
    </div>
  );
};

export default Home;