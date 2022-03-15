import React from "react";
import { TailSpin } from "react-loader-spinner";

function Loader(props) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="relative bottom-20">
        <TailSpin color="#3F82BD" height={80} width={80} />
      </div>
    </div>
  );
}

export default Loader;
