import { NavLink, useParams } from "react-router-dom";
import { API_URL } from "./Context";
import { useState, useEffect } from "react";


const SingleMovie = () => {
  const { id } = useParams();
  console.log(id);


  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState("");
  const [isError, setIsError] = useState({ show: "false", msg: "" });


  const getMovies = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log(data)
      if (data.Response === "True") {
        setLoading(false);
        setMovie(data)
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



  useEffect(() => {
    let timeout = setTimeout(() => {
      getMovies(`${API_URL}&i=${id}`);
    }, 500);

    // Return a cleanup function that clears the timeout
    return () => clearTimeout(timeout);
  }, [id]);




  // const { isLoading, isError } = useFetch(`&i=${id}`);

  if (loading) {
    return (
      <section className="movie-section ">
        <div className="loading">Loading....</div>;
      </section>
    );
  }

  return (

    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img src={movie.Poster} alt="" />
        </figure>
        <div className="card-content">
          <p className="title">{movie.Title}</p>
          <p className=""></p>
          <p className="card-text">{movie.Released}</p>
          <p className="card-text">{movie.Genre}</p>
          <p className="card-text">{movie.imdbRating} / 10</p>
          <p className="card-text">{movie.Country}</p>
          <NavLink to="/" className="back-btn">
            Go Back
          </NavLink>
        </div>
      </div>
    </section>

  );
};

export default SingleMovie;