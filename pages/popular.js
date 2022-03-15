import { useState, useEffect } from "react";
import { useMovieContext } from "../contexts/MovieContextProvider";
import { Header, SearchResult, MovieDetails, Navbar } from "../components";

function Popular(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentId, setCurrentId] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const [popularBlock, setPopularBlock] = useState([]);

  const {
    getPopularData,
    getSearchData,
    popularMovies,
    showSearchResult,
    setShowSearchResult,
  } = useMovieContext();

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem("searchTerm");

    if (storedSearchTerm !== "") {
      setSearchTerm(storedSearchTerm);
      getSearchData(storedSearchTerm);
      setShowSearchResult(true);
    } else handleLoadMore();
  }, []);

  const handleLoadMore = () => {
    getPopularData();
    setPopularBlock(popularBlock.concat(renderMovies));
  };

  const handleMovieDetails = (movie) => {
    setCurrentId(movie.id);
    setShowDetails(true);
  };

  const renderMovies = popularMovies?.results?.map((movie) => (
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
  ));

  return (
    <div className="h-screen">
      <header>
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
        />
      </header>
      <main>
        {showDetails ? (
          <MovieDetails currentId={currentId} />
        ) : (
          <div className="mt-5 mx-4 flex flex-wrap mb-32">
            {showSearchResult ? (
              <SearchResult handleMovieDetails={handleMovieDetails} />
            ) : (
              <>
                {popularBlock}{" "}
                <button
                  onClick={handleLoadMore}
                  className="px-2 mt-1 mb-20 text-[#3F82BD]"
                >
                  Load more
                </button>
              </>
            )}
          </div>
        )}
      </main>
      <footer>
        <Navbar />
      </footer>
    </div>
  );
}

export default Popular;
