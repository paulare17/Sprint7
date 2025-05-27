import { useParams } from 'react-router-dom';
import { useGetFilmByIdQuery } from '../features/apiSlice';

const FilmDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading, isError } = useGetFilmByIdQuery(Number(id));

  if (isLoading) return <p>Carregant...</p>;
  if (isError || !movie) return <p>No s'ha trobat la pel·lícula</p>;

  return (
    <div>
      <h1>{movie.original_title}</h1>
      <img src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`} alt={`Poster of the film ${movie.original_title}`} />
      <p>ID: {movie.id}</p>
    </div>
  );
};

export default FilmDetail;