import React from "react";
import { useEffect, useState } from "react";

interface Film {
  original_title: string;
  poster_path: string;
  overview: string;
}

const List: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    const apiKey = "38aec9dcc915b82585b7be878fba2d4b";
    const page = 1; // veure com arreglo lo de les pgs

    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results[0]); // objecte JSON
        setFilms(data.results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const film = () => {
    return films.map((film) => (
      <div className="element">
        <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} />{" "}
        <br></br>
        <h4>{film.original_title}</h4> <br></br>
        <h5>
          {film.overview} <br></br>
        </h5>
      </div>
    ));
  };

  return <section>{film()}</section>;
};

export default List;
