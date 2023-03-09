import React from "react";
import "./style.css";
import { BsSearch } from 'react-icons/bs';

const SearchBox = () => {
  return (
    <>
      <div className="search-wrapper">
        <div className="search-icon">
            <BsSearch />
        </div>
        <div className="search-input">
            <input type="text" placeholder="Search" />
        </div>
      </div>
    </>
  );
};

export default SearchBox;
