import { useParams } from "react-router-dom";
import { useGetFilmByIdQuery, useGetCastByIdQuery } from "../features/apiSlice";
import type { Film } from "../features/apiSlice";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


//funció per mostrar el cast
function showCast(castData: any) {
  if (!castData || !castData.cast) return <p>No s'ha trobat el casting</p>;

return (
  <ImageList className="image" sx={{ width: '90vw', height: 'auto', margin: '0 auto' }} cols={8} gap={30}>
    {castData.cast.map((actor: any) => (
      <ImageListItem key={actor.cast_id || actor.id}>
        {/* ternari */}
        {actor.profile_path ? (
          <img
            srcSet={`https://image.tmdb.org/t/p/w185${actor.profile_path} 2x`}
            src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
            alt={`Foto de ${actor.name}`}
            loading="lazy"
          />
        ) : (
          <div className="no-image">
            {actor.name}
          </div>
        )}
      </ImageListItem>
    ))}
  </ImageList>
)};



const FilmDetail = () => {
  const { id } = useParams<{ id: string }>(); //captura la id de la peli i la usa a la resta del docu
  const { data: movie, isLoading, isError } = useGetFilmByIdQuery(Number(id));
  const { data: castData } = useGetCastByIdQuery(id || "");

  if (isLoading) return <p>Carregant...</p>;
  if (isError || !movie) return <p>No s'ha trobat la pel·lícula</p>;


  return (
    <div className="pg">
        <section className="info-film">

      <img
        className="poster-detail"
        src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
        alt={`Poster of the film ${movie.original_title}`}
        />
        <h1 className="title">{movie.title}</h1>
        <h5>"{movie.original_title}"</h5>
        <h4>{movie.release_date}</h4>
      <p className="overview">{movie.overview}</p>
        </section>
      {showCast(castData)}
    </div>
    
  ) ;
};

export default FilmDetail;
