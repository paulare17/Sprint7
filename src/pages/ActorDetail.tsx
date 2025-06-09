import { useParams } from "react-router-dom";
import { 
  useGetActorByIdQuery, 
  useGetActorMoviesQuery,
} from "../features/apiSlice";
import List from "../components/List/List";

export default function ActorDetail() {
  const { id } = useParams<{ id: string }>();
  
  const { 
    data: actor, 
    isLoading: loadingActor 
  } = useGetActorByIdQuery(id || '');
  
  const { 
    data: moviesData, 
    isLoading: loadingMovies 
  } = useGetActorMoviesQuery(id || '');

  if (loadingActor || loadingMovies) {
    return <p>Carregant...</p>;
  }

  if (!actor || !moviesData?.cast) {
    return <p>No s'ha trobat l'actor</p>;
  }

  return (
    <div className="actor-detail">
      <h2>{actor.name}</h2>
      {actor.profile_path && (
        <img
          src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
          alt={actor.name}
          className="actor-image"
        />
      )}
      <h3>Pel·lícules:</h3>
      <List 
        movies={moviesData.cast}
        cols={7}
        imageSize="w300"
        linkPrefix="/movie"
      />
    </div>
  );
}