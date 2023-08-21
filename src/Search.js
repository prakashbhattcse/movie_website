import React from "react";
import { useGlobalContext } from "./Context";

const Search = () => {
  // Destructure the `query`, `setQuery`, and `isError` values from the global context
  const { query, setQuery, isError } = useGlobalContext();

  return (
    <>
      <section className="search-section">
        <h2>Search Your Favourite Movie</h2>
        <form action="#" onSubmit={(e) => e.preventDefault()}>
          <div>
             {/* Render an input element that allows the user to enter a search term */}
            <input
              type="text"
              placeholder="search movie"
              value={query}
              // Update the `query` value in the global context when the input value changes
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </form>
        <div className="card-error">
           {/* Display an error message if there is an error */}
          <p>{isError.show && isError.msg}</p>
        </div>
      </section>
    </>
  );
};

export default Search;
