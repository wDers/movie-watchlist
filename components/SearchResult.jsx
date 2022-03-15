import React from "react";
import { useMovieContext } from "../contexts/MovieContextProvider";

function SearchResult({ handleMovieDetails }) {
  const { searchResult } = useMovieContext();

  return (
    <>
      {searchResult.map((movie) => (
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
      ))}
    </>
  );
}

export default SearchResult;
