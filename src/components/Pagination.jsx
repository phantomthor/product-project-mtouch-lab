import React, { useState } from "react";

const Pagination = ({ currentIndex, setCurrentIndex, totalPages }) => {
  const next = () => {
    if (currentIndex === totalPages - 1) return;
    console.log(currentIndex, totalPages - 1);
    setCurrentIndex(currentIndex + 1);
  };

  const prev = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  };
  return (
    <div className="scroll-none grow items-center gap-2 overflow-scroll flex my-2">
      <button
        variant="text"
        className="flex shrink-0 items-center gap-2 rounded-full bg-gray-200 px-4 py-2 text-sm"
        onClick={prev}
      >
        <span className="material-icons-outlined">chevron_left</span>
        <span className="hidden md:block">Previous</span>
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (item, i) => {
          return (
            <button
              className={`${currentIndex === i ? "bg-indigo-500 text-white" : "hover:bg-gray-200"} size-8 shrink-0 rounded-full`}
              key={i}
              onClick={() => {
                setCurrentIndex(i);
              }}
            >
              {i + 1}
            </button>
          );
        },
      )}
      <button
        className="flex shrink-0 items-center gap-2 rounded-full bg-gray-200 px-4 py-2 text-sm"
        onClick={next}
      >
        <span className="hidden md:block">Next</span>
        <span className="material-icons-outlined">chevron_right</span>
      </button>
    </div>
  );
};

export default Pagination;