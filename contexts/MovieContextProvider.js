import React, { useState, createContext, useContext } from "react";

const MovieContext = createContext();

function MovieContextProvider({ children }) {
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [showSearchResult, setShowSearchResult] = useState(false);

  const getPopularData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${
        process.env.API_KEY
      }&language=en-US&include_adult=false&page=${Math.floor(
        Math.random() * 500
      )}`
    );
    const data = await response.json();

    setPopularMovies(data);
  };

  const getSearchData = async (keyword) => {
    const response = await fetch(
      `
      https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`
    );
    const data = await response.json();

    setSearchResult(data.results.map((result) => result));
  };

  return (
    <MovieContext.Provider
      value={{
        getPopularData,
        popularMovies,
        getSearchData,
        searchResult,
        setSearchResult,
        showSearchResult,
        setShowSearchResult,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export default MovieContextProvider;

export const useMovieContext = () => useContext(MovieContext);
