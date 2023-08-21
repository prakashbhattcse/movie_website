import React, { useEffect, useState } from "react"
import { useContext } from 'react';
const AppContext = React.createContext();

// Define the API URL for fetching movie data
export const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_KEY}`;

const AppProvider = ({ children }) => {

    // Define state variables for loading, movie data, errors, and search query
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({ show: "false", msg: "" });
    const [query, setQuery] = useState("hacker");

    // Function to fetch movie data from the API
    const getMovies = async (url) => {
        
        try {
            const res = await fetch(url);
            const data = await res.json();

            console.log(data)
            if (data.Response === "True") {
                setLoading(false);
                setMovie(data.Search)
            } else {
                setIsError({
                    show: true,
                    msg: data.Error
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Fetch movie data when the query changes
    useEffect(() => {
        let timeout = setTimeout(() => {
            getMovies(`${API_URL}&s=${query}`);
        }, 800);
        return () => clearTimeout(timeout);
    }, [query]);

    // Provide the state variables and functions to the children components
    return <AppContext.Provider value={{ loading, movie, isError, setQuery, query }}>
        {children}
    </AppContext.Provider>
}

// Custom hook to access the context values
const useGlobalContext = () => {
    return useContext(AppContext);
};
export { AppContext, AppProvider, useGlobalContext };
