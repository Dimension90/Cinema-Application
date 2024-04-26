import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/Cards";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();
  const apiKey = "5bbfda55";

  useEffect(() => {
    getData();
  }, [type]);

  const getData = async () => {
    let url = `http://www.omdbapi.com/?apikey=${apiKey}`;

    if (type === "popular") {
      url += "&s=popular&type=movie";
    } else if (type === "top_rated") {
      url += "&s=top_rated&type=movie";
    } else if (type === "upcoming") {
      url += "&s=upcoming&type=movie";
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovieList(data.Search || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="movie__list">
      <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
      <div className="list__cards">
        {movieList.map((movie) => (
          <Cards key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
