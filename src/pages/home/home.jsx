import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const apiKey = "5bbfda55";
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=popular&type=movie`)
      .then((res) => res.json())
      .then((data) => setPopularMovies(data.Search));
  }, []);

  return (
    <>
      <div className="poster">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
        >
          {popularMovies.map((movie) => (
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/movie/${movie.imdbID}`}
            >
              <div className="posterImage">
                <img
                  src={
                    movie.Poster === "N/A"
                      ? "https://via.placeholder.com/320"
                      : movie.Poster
                  }
                />
              </div>
              <div className="posterImage__overlay">
                <div className="posterImage__title">
                  {movie ? movie.Title : ""}
                </div>
                <div className="posterImage__runtime">
                  {movie ? movie.Year : ""}
                  <span className="posterImage__rating">
                    {movie ? movie.imdbRating : ""}
                    <i className="fas fa-star" />{" "}
                  </span>
                </div>
                <div className="posterImage__description">
                  {movie ? movie.Plot : ""}
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
        <MovieList />
      </div>
    </>
  );
};

export default Home;
