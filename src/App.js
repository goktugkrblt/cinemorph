import React, { useState } from 'react';
import './App.css';
import './main.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import PopularFilm from './components/popular-film/popularFilm';
import TopRatedFilm from './components/top-rated/topRated';
// import FilmSection1 from './components/film-section1/filmSection1';
import UpComingFilm from './components/upcoming/upComing';
// import FilmSection2 from './components/film-section2/filmSection2';
import NowPlaying from './components/now-playing/nowPlaying';
// import AllFilms from './components/all-film/allFilm';
import Footer from './components/footer/footer';
import UserLogin from './components/user-login/UserConnect';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar onLogoClick={() => {}} />
  
          <Routes>
              <Route
                  path="/"
                  element={<UpComingFilm />}
                />
                <Route
                  path="/user"
                  element={<UserLogin/>}
                />
                <Route
                  path="/popular"
                  element={<PopularFilm />}
                />
                   <Route
                  path="/updated"
                  element={<TopRatedFilm />}
                />
                    
                   <Route
                  path="/now-playing"
                  element={<NowPlaying />}
                />
              
          </Routes>
          <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
