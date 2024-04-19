import './App.css';
import './main.css';
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



function App() {
  return (
    <div className="App">
        <Navbar />
        <Slider />
        <PopularFilm />
        <FilmSection1 />
        <TopRatedFilm />
        <UpComingFilm />
        <FilmSection2 />
        <NowPlaying />
        <AllFilms />
        <Footer />  
    </div>
  );
}

export default App;
