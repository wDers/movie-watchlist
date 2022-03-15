import MovieContextProvider from "../contexts/MovieContextProvider";
import "../styles/global.css";

function MyApp({ Component }) {
  return (
    <MovieContextProvider>
      <Component />
    </MovieContextProvider>
  );
}

export default MyApp;
