import axios from "axios";
import { useContext, useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/AuthContext";
import { toastWarnNotify } from '../helpers/ToastNotify';

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    axios
      .get(API)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm && currentUser) {
      getMovies(SEARCH_API + searchTerm);
    } else if (!currentUser) {
      toastWarnNotify('Please log in to search a movie');
    } else {
      toastWarnNotify('Please enter a text');
    }
  };

  return (
    <>
      <form
        className="w-full flex gap-x-2 justify-center items-center bg-gray-300 p-4"
        onSubmit={handleSubmit}
      >
        <input
          className="p-1 h-8 w-72 rounded-md outline-none border-none"
          type="search"
          placeholder="Search a movie..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="px-3 py-1 text-lg bg-white text-blue-600 rounded-md cursor-pointer hover:bg-white hover:text-blue-600 duration-300"
          type="submit"
        >
          Search
        </button>
      </form>
      <div className="flex justify-center items-center flex-wrap">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
};

export default Main;
