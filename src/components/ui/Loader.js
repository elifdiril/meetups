import React from "react";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-75 z-50 flex justify-center items-center">
      <div className="animate-spin rounded-[100%_100%_0_0] h-16 w-16 border-t-[5px] border-purple-300"></div>
    </div>
  );
};

export default Loader;
