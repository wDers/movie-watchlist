import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiTrendingUp } from "react-icons/fi";
import { RiPlayListAddLine } from "react-icons/ri";
import { BsEye } from "react-icons/bs";

function Navbar(props) {
  const [currentPath, setCurrentPath] = useState("watchlist");
  const location = useRouter().pathname;

  useEffect(() => {
    paths.map((path) => {
      location === `/${path.name}` ? setCurrentPath(path.name) : null;
    });
  }, []);

  const size = "w-[20px] h-[20px]";

  const paths = [
    { name: "popular", icon: <FiTrendingUp className={size} /> },
    { name: "watchlist", icon: <RiPlayListAddLine className={size} /> },
    { name: "watched", icon: <BsEye className={size} /> },
  ];

  return (
    <nav className="w-full fixed bottom-0 bg-[#2D2E30] px-5 py-1">
      <ul className="text-[#818588] flex justify-between">
        {paths.map((path, index) => (
          <Link key={index} href={`/${path.name}`}>
            <li
              className={`flex flex-col items-center capitalize ${
                path.name === currentPath ? "text-[#3F82BD]" : ""
              }`}
            >
              {path.icon} {path.name}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
