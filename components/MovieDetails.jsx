import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { WatchlistPanel, Loader } from "../components";

function MovieDetails({ currentId, setShowDetails }) {
  const [movieDetails, setMovieDetails] = useState([]);
  const [showMore, setshowMore] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useRouter().pathname;

  const getMovieDetails = async () => {
    const details = await fetch(
      `
      https://api.themoviedb.org/3/movie/${currentId}?api_key=${process.env.API_KEY}&language=en-US`
    );

    const credits = await fetch(
      `
      https://api.themoviedb.org/3/movie/${currentId}/credits?api_key=${process.env.API_KEY}&language=en-US`
    );

    let detailsData = await details.json();
    const creditsData = await credits.json();

    let crew = {
      directors: [],
    };

    creditsData.crew.forEach((entry) => {
      if (entry.job === "Director") crew.directors.push(entry.name);
    });

    detailsData = {
      ...detailsData,
      ...crew,
    };

    setMovieDetails(detailsData);
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  useEffect(() => {
    if (movieDetails.length !== 0) setLoading(false);
  });

  const formatBudget = (budget) => {
    const isInteger = Number.isInteger(budget / 1000000);

    if (Math.abs(Number(budget)) >= 1.0e6) {
      if (isInteger) {
        return `${(Math.abs(Number(budget)) / 1.0e6).toFixed(0)} million`;
      } else return `${(Math.abs(Number(budget)) / 1.0e6).toFixed(1)} million`;
    } else if (Math.abs(Number(budget)) >= 1.0e3)
      return (Math.abs(Number(budget)) / 1.0e3).toFixed(3);
  };

  const displayLanguage = (language) => {
    if (language === "en") {
      return "English";
    } else if (language === "fr") {
      return "French";
    } else if (language === "de") {
      return "German";
    } else if (language === "br") {
      return "Brazilian";
    } else if (language === "ja") {
      return "Japanese";
    } else if (language === "ko") {
      return "Korean";
    } else if (language === "it") {
      return "Italian";
    } else if (language === "es") {
      return "Spanish";
    } else if (language === "hu") {
      return "Hungarian";
    } else if (language === "id") {
      return "Indonesian";
    } else if (language === "cn") {
      return "Chinese";
    } else {
      return movieDetails.original_language;
    }
  };

  const sectionStyle = "mt-3 flex flex-col gap-0.5";
  const headingStyle = "uppercase font-semibold text-[#A4A5A9]";

  if (loading) {
    return <Loader />;
  } else
    return (
      <div
        className={location === "/popular" ? "mt-5 text-white" : "text-white"}
      >
        <div className="flex items-center">
          <div className="w-1/2 flex justify-center">
            <img
              className="w-2/3"
              src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-1">
              <span className={headingStyle}>year</span>
              {movieDetails.release_date !== undefined
                ? movieDetails.release_date.substring(0, 4)
                : null}
            </div>
            <div className="w-1/2 bg-[#F1A927] text-[#120000] text-center font-bold">
              {movieDetails.vote_average}
            </div>
            <div className="bg-[#2A8BE0] flex justify-center text-white uppercase font-bold">
              {displayLanguage(movieDetails.original_language)}
            </div>
            <div className="font-semibold">{`${Math.floor(
              movieDetails.runtime / 60
            )}h ${movieDetails.runtime % 60}m`}</div>
          </div>
        </div>
        <div className="mx-8 mt-6">
          <h1 className="text-xl">{movieDetails.title}</h1>
          <section className={sectionStyle}>
            <h2 className={headingStyle}>Genre</h2>
            <div className="flex">
              {movieDetails?.genres?.map((genre, index) => (
                <span
                  key={index}
                  className={
                    index < movieDetails?.genres?.length - 1
                      ? "after:content-['-'] after:p-1"
                      : null
                  }
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </section>
          <section className={sectionStyle}>
            <h2 className={headingStyle}>Director</h2>
            <div
              className={
                movieDetails?.directors?.length > 1 ? "flex flex-col" : null
              }
            >
              {movieDetails?.directors?.map((director, index) => (
                <span key={index}>{director}</span>
              ))}
            </div>
          </section>
          <section className="mt-2">
            {showMore ? (
              <>
                <h2 className={headingStyle}>Overview</h2>
                <p>{movieDetails?.overview}</p>
              </>
            ) : (
              <h3 className="font-semibold mb-0.5">{movieDetails?.tagline}</h3>
            )}
            <section className={showMore ? sectionStyle : "hidden"}>
              <span className="uppercase font-semibold text-[#3F82BD]">
                Budget -{" "}
                <span className="lowercase">
                  {movieDetails?.budget !== 0
                    ? `$${formatBudget(movieDetails?.budget)}`
                    : "No data"}
                </span>
              </span>
            </section>
            <button
              className="text-[#F1A927]"
              onClick={() => setshowMore(!showMore)}
            >
              {!showMore ? "Show more" : "Show less"}
            </button>
          </section>
          <aside>
            <WatchlistPanel
              showMore={showMore}
              movieDetails={movieDetails}
              setShowDetails={setShowDetails}
            />
          </aside>
        </div>
      </div>
    );
}

export default MovieDetails;
