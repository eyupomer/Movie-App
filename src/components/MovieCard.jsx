import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const IMG_API = "https://image.tmdb.org/t/p/w1280";
const defaultImage =
  "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

const MovieCard = ({ poster_path, title, vote_average, overview, id }) => {
  const { currentUser } = useContext(AuthContext);

  const setVoteClass = (vote) => {
    if (vote > 8) {
      return "bg-green-600";
    } else if (vote >= 6) {
      return "bg-orange-600";
    } else {
      return "bg-red-600";
    }
  };

  return (
    <div className="bg-blue-600 rounded-sm overflow-hidden m-4 w-[300px] relative cursor-pointer group">
      <img
        className="object-cover h-[450px] max-w-full"
        src={poster_path ? IMG_API + poster_path : defaultImage}
        alt="movie img"
      />
      <div className="flex items-baseline justify-between p-1 text-white">
        <h5 className="font-bold">{title}</h5>
        {currentUser && (
          <span
            className={`rounded-md p-3 font-bold ${setVoteClass(vote_average)}`}
          >
            {vote_average}
          </span>
        )}
      </div>
      <div className="absolute bg-gray-100 text-black bottom-0 left-0 right-0 overflow-auto max-h-full p-4 translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0 opacity-70">
        <h2>Overview</h2>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
