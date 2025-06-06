import * as React from 'react';
import { Link } from 'react-router-dom'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useGetDadesQuery } from '../../features/apiSlice';
import type { Film } from '../../features/apiSlice';



export default function List() {
  const [page, setPage] = React.useState(1)
  const [movies, setMovies] = React.useState<Film[]>([])
  const { data, isLoading, isError } = useGetDadesQuery(page)

  React.useEffect(() => {
    if (data && data.results) {
      setMovies((prev) => [...prev, ...data.results]);
    }
  }, [data]);



  const handleViewMore = () => setPage((p) => p + 1)
  


  if (isLoading) return <p>Carregant...</p>
  if (isError) return <p>Error en carregar la llista de pel·lícules</p>
  if (!data || !data.results || data.results.length === 0) return <p>No hi ha pel·lícules disponibles</p>;

  console.log(data.results)

  return (
<>
     <ImageList className="image" sx={{ width: '90vw', height: 'auto', margin: '0 auto' }} cols={5} gap={30}>
      {movies.map((movie: Film) => (
        <ImageListItem key={movie.id} className='poster-item'>
          <Link to={`/movie/${movie.id}`}>
          {movie.poster_path ? (
          <img
            // className='poster-img'
            srcSet={`https://image.tmdb.org/t/p/w200${movie.poster_path} 1x, https://image.tmdb.org/t/p/w400${movie.poster_path} 2x`}
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.original_title || 'Poster de pel·lícula'}
            loading="lazy"
            />
          ) : (
            <div>
              {movie.title}
            </div>
          )}
            </Link>
        </ImageListItem>
      ))}
    </ImageList>
    <div className='view-more-container'>

    <button className='view-more' onClick={handleViewMore} disabled={isLoading}> {isLoading ? 'Carregant' : "View more"}</button>
    </div>
      </>
  );
}
