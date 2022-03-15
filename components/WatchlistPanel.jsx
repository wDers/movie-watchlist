import React from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import { RiPlayListAddLine } from "react-icons/ri";
import { CgPlayListRemove } from "react-icons/cg";
import { BsEye, BsEyeSlash } from "react-icons/bs";

function WatchlistPanel({ showMore, movieDetails, setShowDetails }) {
  const location = useRouter().pathname;

  const saveWatchlistMovies = () => {
    let saveDetails = movieDetails;
    saveDetails["watchlist"] = true;

    localStorage.setItem(movieDetails?.id, JSON.stringify(saveDetails));
    Router.push("/watchlist");
  };

  const saveWatchedMovies = () => {
    localStorage.setItem(movieDetails?.id, JSON.stringify(movieDetails));
    Router.push("/watched");
  };

  const removeMovie = () => {
    localStorage.removeItem(movieDetails?.id);
    setShowDetails(false);
  };

  const iconStyle = "w-[25px] h-[25px] text-[#3F82BD]";
  const listStyle =
    "mt-6 pt-8 pb-16 flex flex-col gap-5 border-t-[1px] border-[#2F3033]";

  switch (location) {
    case "/popular":
      return (
        <ul className={!showMore ? listStyle : `${listStyle} pb-18`}>
          <li className="flex justify-end">
            <button
              className="flex items-center gap-3"
              onClick={saveWatchlistMovies}
            >
              <RiPlayListAddLine className={iconStyle} /> Add to Watchlist
            </button>
          </li>
          <li className="flex justify-end">
            <button
              className="flex items-center gap-3"
              onClick={saveWatchedMovies}
            >
              <BsEye className={iconStyle} /> Add to Watched
            </button>
          </li>
        </ul>
      );
    case "/watchlist":
      return (
        <ul className={!showMore ? listStyle : `${listStyle} pb-18`}>
          <li className="flex justify-end">
            <button
              className="flex items-center gap-3"
              onClick={saveWatchedMovies}
            >
              <BsEye className={iconStyle} /> Add to Watched
            </button>
          </li>
          <li className="flex justify-end">
            <button className="flex items-center gap-3" onClick={removeMovie}>
              <CgPlayListRemove className="w-[35px] h-[35px] text-[#3F82BD] relative top-0.5 left-1.5" />{" "}
              Remove from Watchlist
            </button>
          </li>
        </ul>
      );
    case "/watched":
      return (
        <ul className={!showMore ? listStyle : `${listStyle} pb-18`}>
          <li className="flex justify-end">
            <button
              className="flex items-center gap-3"
              onClick={saveWatchlistMovies}
            >
              <RiPlayListAddLine className={iconStyle} /> Add to Watchlist
            </button>
          </li>
          <li className="flex justify-end">
            <button className="flex items-center gap-3" onClick={removeMovie}>
              <BsEyeSlash className={iconStyle} /> Remove from Watched
            </button>
          </li>
        </ul>
      );
  }
}
export default WatchlistPanel;
