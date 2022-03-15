import React from "react";
import { useRouter } from "next/router";
import { Searchbar } from ".";
import { AiOutlineArrowLeft } from "react-icons/ai";

function Header({
  searchTerm,
  setSearchTerm,
  showDetails,
  setShowDetails,
  count,
}) {
  const location = useRouter().pathname;

  const displayHeader = () => {
    if (location === "/popular") return "Popular movies";
    if (location === "/watchlist")
      return (
        <>
          You have <span className="font-semibold text-[#3F82BD]">{count}</span>{" "}
          {count > 1 ? "movies" : "movie"} left
        </>
      );
    if (location === "/watched")
      return (
        <div>
          You watched{" "}
          <span className="font-semibold text-[#3F82BD]">{`(${count})`}</span>
        </div>
      );
  };

  return (
    <>
      {showDetails ? (
        <div className="h-10 mx-3 pt-5 text-[#818588] flex items-center">
          <AiOutlineArrowLeft
            className="w-[25px] h-[25px]"
            onClick={() => setShowDetails(false)}
          />
        </div>
      ) : (
        <div>
          <h1 className="mx-6 relative top-7 text-white text-2xl">
            {displayHeader()}
          </h1>
          <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      )}
    </>
  );
}

export default Header;
