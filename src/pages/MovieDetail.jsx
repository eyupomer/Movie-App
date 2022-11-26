import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import VideoSection from "../components/VideoSection";

const MovieDetail = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState("");
  const [videoKey, setVideoKey] = useState();

  const {
    title,
    poster_path,
    overview,
    vote_average,
    release_date,
    vote_count,
  } = movieDetails;

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const movieDetailBaseUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;
  const baseImageUrl = "https://image.tmdb.org/t/p/w1280";
  const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

  useEffect(() => {
    axios
      .get(movieDetailBaseUrl)
      .then((res) => setMovieDetails(res.data))
      .catch((err) => console.log(err));
    axios
      .get(videoUrl)
      .then((res) => setVideoKey(res.data.results[0].key))
      .catch((err) => console.log(err));
  }, [movieDetailBaseUrl, videoUrl]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-screen h-screen">
        <h1 className="mt-10 text-center text-3xl font-semibold">{title}</h1>
        {videoKey && <VideoSection videoKey={videoKey} />}
      </div>
      <div>
        <div className="flex flex-col md:flex-row gap-x-3">
          <div className="">
            <img
              src={poster_path ? baseImageUrl + poster_path : defaultImage}
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col mb-6">
              <h5 className="text-2xl font-semibold mb-3 text-center">Overview</h5>
              <p>{overview}</p>
            </div>
            <ul className="flex flex-col gap-y-5">
              <li className="border-b-2 py-3">{"Release Date : " + release_date}</li>
              <li className="border-b-2 py-3">{"Rate : " + vote_average}</li>
              <li className="border-b-2 py-3"> {"Total Vote : " + vote_count}</li>
              <li className="border-b-2 py-3">
                <Link
                  to={-1}
                  className="text-blue-600 underline text-base cursor-pointer ml-6"
                >
                  Go Back
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
