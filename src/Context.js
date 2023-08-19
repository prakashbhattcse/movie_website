import React, { useEffect, useState } from "react"
import { createContext } from "react"
import { useContext } from 'react';
const AppContext = React.createContext();

const API_URL = "https://www.omdbapi.com/?apikey=102b3ca9&s=titanic";



const AppProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({ show: "false", msg: "" });

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
                    msg: data.error
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMovies(API_URL);
    }, [])


    return <AppContext.Provider value={{ loading, movie, isError }}>
        {children}
    </AppContext.Provider>
}

const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };