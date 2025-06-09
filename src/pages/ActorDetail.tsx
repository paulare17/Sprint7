import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiKey, useGetActorByIdQuery, useGetActorMoviesQuery } from "../features/apiSlice";
import List from "../components/List/List";

// const apiKey = "38aec9dcc915b82585b7be878fba2d4b";

export default function ActorDetail() {
    //params
  const { id } = useParams<{ id: string }>();
  const { data: actor, isLoading: loadingActor } = useGetActorByIdQuery(id || '');
  const { data: moviesData, isLoading: loadingMovies } = useGetActorMoviesQuery(id || '');


//errors
   if (loadingActor || loadingMovies) return <p>Carregant...</p>;
  if (!actor || !moviesData) return <p>No s'ha trobat l'actor</p>;


 

  return (
    <div style={{ margin: "2rem" }}>
      <h2>{actor.name}</h2>
      {actor.profile_path && (
        <img
          src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
          alt={actor.name}
          style={{ borderRadius: "12px", marginBottom: "1rem" }}
        />
      )}
      <h3>Pel·lícules:</h3>
      <List movies={moviesData.cast}
      cols={7}
  imageSize="w300"
  linkPrefix="/movie"
      />

    </div>
  );
}