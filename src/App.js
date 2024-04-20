import React, { useState } from 'react';
import './App.css';
import './main.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Slider from './components/slider/slider';
import PopularFilm from './components/popular-film/popularFilm';
import TopRatedFilm from './components/top-rated/topRated';
import FilmSection1 from './components/film-section1/filmSection1';
import UpComingFilm from './components/upcoming/upComing';
import FilmSection2 from './components/film-section2/filmSection2';
import NowPlaying from './components/now-playing/nowPlaying';
import AllFilms from './components/all-film/allFilm';
import Footer from './components/footer/footer';
import UserLogin from './components/user-login/UserConnect';
import { useLocation } from 'react-router-dom';

function App() {
  const [userOpened, setUserOpened] = useState(false);

  return (
    <BrowserRouter>
      <AppContent userOpened={userOpened} setUserOpened={setUserOpened} />
    </BrowserRouter>
  );
}

function AppContent({ userOpened, setUserOpened }) {
  const location = useLocation();

  // Kontrol edilen rotaları bir diziye koyun
  const hideComponentsRoutes = ['/user'];

  // Mevcut yolun, gizlenmesi gereken rotalardan biri olup olmadığını kontrol edin
  const shouldHideComponents = hideComponentsRoutes.includes(location.pathname);

  return (
    <div className="App">
      <Navbar onLogoClick={() => {}} />
      <Routes>
        <Route
          path="/user"
          element={<UserLogin onClose={() => setUserOpened(false)} />}
        />
      </Routes>
      {!userOpened && !shouldHideComponents && (
        <>
          <Slider />
          <PopularFilm />
          <FilmSection1 />
          <TopRatedFilm />
          <UpComingFilm />
          <FilmSection2 />
          <NowPlaying />
          <AllFilms />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
