import * as React from 'react';
import { Link } from 'react-router-dom'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useGetDadesQuery } from '../../features/apiSlice';
import type { Film } from '../../features/apiSlice';

export default function List() {
  const { data, isLoading, isError } = useGetDadesQuery()

  if (isLoading) return <p>Carregant...</p>
  if (isError) return <p>Error en carregar la llista de pel·lícules</p>
  if (!data || !data.results || data.results.length === 0) return <p>No hi ha pel·lícules disponibles</p>;

  console.log(data.results)

  return (

     <ImageList className="poster" sx={{ width: '90vw', height: 'auto', margin: '0 auto' }} cols={5} gap={30}>
      {data.results.map((movie: Film) => (
        <ImageListItem key={movie.id} className='poster-item'>
          <Link to={`/movie/${movie.id}`}>
          <img
            // className='poster-img'
            srcSet={`https://image.tmdb.org/t/p/w200${movie.poster_path} 1x, https://image.tmdb.org/t/p/w400${movie.poster_path} 2x`}
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.original_title || 'Poster de pel·lícula'}
            loading="lazy"
            />
            </Link>
        </ImageListItem>
      ))}
    </ImageList>
  );
}
