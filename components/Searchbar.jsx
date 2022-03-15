import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { HiOutlineSearch } from "react-icons/hi";
import { BiMicrophone } from "react-icons/bi";
import { useMovieContext } from "../contexts/MovieContextProvider";

function Searchbar({ searchTerm, setSearchTerm }) {
  const { getSearchData, setShowSearchResult } = useMovieContext();
  const location = useRouter().pathname;

  useEffect(() => {
    if (location === "/popular") {
      if ((searchTerm !== "") & (searchTerm !== null)) {
        localStorage.setItem("searchTerm", searchTerm);
        if (localStorage.getItem("searchTerm").length === 1) {
          localStorage.setItem("searchTerm", "");
        }
      } else setShowSearchResult(false);
    }
  }, [searchTerm]);

  const handleSearch = () => {
    if (searchTerm !== "") {
      getSearchData(searchTerm);
      setShowSearchResult(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const iconStyle =
    "w-[28px] h-[25px] text-[#818588] bg-[#323337] relative top-1 cursor-pointer";

  switch (location) {
    case "/popular":
      return (
        <div className="flex bg-[#323337] mt-10 mx-6 px-2">
          <HiOutlineSearch className={iconStyle} onClick={handleSearch} />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            value={searchTerm}
            placeholder="You can type or speak for searching."
            className="w-screen px-2 py-1.5 bg-[#323337] text-white text-sm outline-none"
          />
          <BiMicrophone className={iconStyle} />
        </div>
      );
    case "/watchlist":
      return (
        <div className="flex bg-[#323337] mt-10 mx-6 px-2">
          <HiOutlineSearch className={iconStyle} />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder="You can type or speak for searching."
            className="w-screen px-2 py-1.5 bg-[#323337] text-white text-sm outline-none"
          />
          <BiMicrophone className={iconStyle} />
        </div>
      );
    case "/watched":
      return (
        <div className="flex bg-[#323337] mt-10 mx-6 px-2">
          <HiOutlineSearch className={iconStyle} />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder="You can type or speak for searching."
            className="w-screen px-2 py-1.5 bg-[#323337] text-white text-sm outline-none"
          />
          <BiMicrophone className={iconStyle} />
        </div>
      );
  }
}

export default Searchbar;
