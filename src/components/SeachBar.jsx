/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";
import { searchicon } from "../assets/gallery";

const SearchBar = ({ onSearch, emailValue }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    const query = event.target.value;
    // console.log("Query:", query); // Log the query value
    setSearchText(query);
    onSearch(query);

     // Call handleClick directly
     handleClick();
  };

  const handleClick = () => {
    // Access the form values
    const searchValue = searchText;

    console.log(searchValue);
    // Identify user in smartech
    smartech("identify", emailValue);

    // Dispatch digital ads
    smartech("dispatch", "flight_search", { SEARCH: searchValue });

    // // Contact smartech
    // smartech("contact", "132", {
    //   "pk^email": emailValue,
    // });
  };

  useEffect(() => {
    // Attach event listener to the button
    const mkadsButton = document.getElementById("searchbtn");
    mkadsButton.addEventListener("click", handleClick);

    // Clean up the event listener when the component unmounts
    return () => {
      mkadsButton.removeEventListener("click", handleClick);
    };
  }, []);



  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search members..."
        value={searchText}
        id="searchbtn"
        onChange={handleSearch}
      />
      <img src={searchicon} alt="" className={styles.searchButton} />
    </div>
  );
};

export default SearchBar;
