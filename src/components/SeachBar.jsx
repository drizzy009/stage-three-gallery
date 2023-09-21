/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./SearchBar.module.css";
import { searchicon } from "../assets/gallery";

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    const query = event.target.value;
    console.log("Query:", query); // Log the query value
    setSearchText(query);
    onSearch(query);
  };

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search members..."
        value={searchText}
        onChange={handleSearch}
      />
      <img src={searchicon} alt="" className={styles.searchButton} />
    </div>
  );
};

export default SearchBar;
