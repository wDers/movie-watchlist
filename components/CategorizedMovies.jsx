import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { MovieDetails } from ".";

function CategorizedMovies({
  searchTerm,
  currentId,
  showDetails,
  setShowDetails,
  movies,
  setMovies,
  handleMovieDetails,
}) {
  const location = useRouter().pathname;

  useEffect(() => {
    let values = [],
      keys = Object.keys(localStorage).filter(
        (key) => (key !== "ally-supports-cache") & (key !== "searchTerm")
      ),
      i = keys.length;

    while (i--) {
      values.push(JSON.parse(localStorage.getItem(keys[i])));
    }

    const watchlistMovies = [];
    const watchedMovies = [];

    for (let value of values) {
      value.hasOwnProperty("watchlist")
        ? watchlistMovies.push(value)
        : watchedMovies.push(value);
    }

    if (location === "/watchlist") {
      setMovies(watchlistMovies);
    }
    if (location === "/watched") {
      setMovies(watchedMovies);
    }
  }, [showDetails]);

  if (searchTerm === "") {
    return (
      <div
        className={
          showDetails
            ? "mt-5 flex flex-wrap mb-32"
            : "mt-5 mx-4 flex flex-wrap mb-32"
        }
      >
        {showDetails ? (
          <MovieDetails currentId={currentId} setShowDetails={setShowDetails} />
        ) : (
          movies.map((movie) => (
            <div
              className="w-1/2 h-1/2 md:w-1/3 md:h-1/3"
              key={movie.id}
              onClick={() => handleMovieDetails(movie)}
            >
              <img
                className="p-2"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
          ))
        )}
      </div>
    );
  } else
    return (
      <div
        className={
          showDetails
            ? "mt-5 flex flex-wrap mb-32"
            : "mt-5 mx-4 flex flex-wrap mb-32"
        }
      >
        {showDetails ? (
          <MovieDetails currentId={currentId} setShowDetails={setShowDetails} />
        ) : (
          movies
            .filter((movie) => {
              if (
                movie.title.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return movie;
              }
            })
            .map((movie) => (
              <div
                className="w-1/2 h-1/2 md:w-1/3 md:h-1/3"
                key={movie.id}
                onClick={() => handleMovieDetails(movie)}
              >
                <img
                  className="p-2"
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
            ))
        )}
      </div>
    );
}

export default CategorizedMovies;
