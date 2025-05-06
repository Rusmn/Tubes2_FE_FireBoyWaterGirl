import React from 'react';

function Spinner() {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="border-t-4 border-blue-500 border-solid rounded-full w-10 h-10 animate-spin"></div>
      <span className="ml-3">Mencari resep...</span>
    </div>
  );
}

export default Spinner;