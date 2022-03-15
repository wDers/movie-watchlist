import Router from "next/router";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const isPhone = useMediaQuery({
    query: "(max-width: 425px)",
  });

  useEffect(() => {
    if (isPhone) Router.push("/watchlist");
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center text-4xl">
      <h1 className="text-white">
        <a href="https://www.walekders.hu/movie-watchlist">Project info</a>
      </h1>
    </div>
  );
}
