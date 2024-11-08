import React from "react";

const loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="animate-spin rounded-full h-30 w-30 border-t-2 border-b-2 border-lime-500"></div>
    </div>
  );
};

export default loading;
