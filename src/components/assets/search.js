import React, { useState, useEffect } from 'react';

function SearchSvg(props) {

  return (
          <svg className='search-svg'
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <path d="M21 21L16.7 16.7"></path>
  </svg>
  );
}

export default SearchSvg;
