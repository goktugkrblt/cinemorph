import React from 'react';
import './App.css';
import './main.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import PopularFilm from './components/popular-film/popularFilm';
import TopRatedFilm from './components/top-rated/topRated';
import UpComingFilm from './components/upcoming/upComing';
import NowPlaying from './components/now-playing/nowPlaying';
import Footer from './components/footer/footer';
import SearchResults from './components/search/SearchResults';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
  
        <Routes>
          <Route
            path="/"
            element={<UpComingFilm />}
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

          <Route
            path="/search"
            element={<SearchResults />}
          />
        </Routes>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
