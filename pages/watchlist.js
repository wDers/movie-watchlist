import Router from "next/router";
import { Header, CategorizedMovies, Navbar } from "../components";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

function Watchlist(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentId, setCurrentId] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const [movies, setMovies] = useState([]);

  const isPhone = useMediaQuery({
    query: "(max-width: 425px)",
  });

  useEffect(() => {
    if (!isPhone) Router.push("/");
  }, []);

  const handleMovieDetails = (movie) => {
    setCurrentId(movie.id);
    setShowDetails(true);
  };

  return (
    <div className="h-screen">
      <header>
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
          count={movies.length}
        />
      </header>
      <main>
        <CategorizedMovies
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          currentId={currentId}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
          movies={movies}
          setMovies={setMovies}
          handleMovieDetails={handleMovieDetails}
        />
      </main>
      <footer>
        <Navbar />
      </footer>
    </div>
  );
}

export default Watchlist;
