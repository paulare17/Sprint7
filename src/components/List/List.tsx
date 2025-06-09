import * as React from 'react';
import { Link } from 'react-router-dom'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useGetDadesQuery, useGetMoviesByGenreQuery } from '../../features/apiSlice';
import type { Film } from '../../features/apiSlice';

type ListProps = {
  movies?: Film[];
    cols?: number;
  imageSize?: string;
  linkPrefix?: string;
  isActor?: boolean;
  isScaryMode?: boolean;
}


export default function List({ 
  movies: moviesProp,
  cols = 5,
  imageSize = 'w200',
  linkPrefix = '/movie',
  isActor = false,
  isScaryMode = false,


}: ListProps) {
  const [page, setPage] = React.useState(1)
  const [movies, setMovies] = React.useState<Film[]>([])

const { data: normalData, isLoading: normalLoading, isError: normalError } = 
  useGetDadesQuery({ page }, { skip: isScaryMode });

const { data: scaryData, isLoading: scaryLoading, isError: scaryError } = 
  useGetMoviesByGenreQuery({ page }, { skip: !isScaryMode });

  const currentData = isScaryMode ? scaryData : normalData;
  const isLoading = isScaryMode ? scaryLoading : normalLoading;
  const isError = isScaryMode ? scaryError : normalError;

  
  
  React.useEffect(() => {
    if (!moviesProp && currentData?.results) {
      const newMovies = currentData.results.filter(
        newMovie => !movies.some(existing => existing.id === newMovie.id)
      );
      if (newMovies.length > 0) {
        setMovies(prev => [...prev, ...newMovies]);
      }
    }
  }, [currentData, moviesProp, movies]);
  
  //reinicia el useEffect per a que no es repeteixin a la llista
  React.useEffect(() => {
    return () => {
      setMovies([]);
      // setPage(1);
    };
  }, [isScaryMode]);

  const itemsToShow = moviesProp || movies;

    if (!moviesProp && isError) return <p>Error en carregar la llista de pel·lícules</p>
    if (!moviesProp && !currentData?.results?.length) return <p>No hi ha pel·lícules disponibles</p>;



  return (
     <>
      <ImageList className="image" sx={{ width: '90vw', height: 'auto', margin: '0 auto' }} cols={cols} gap={30}>
        {itemsToShow?.map((item: any) => (
          <ImageListItem key={item.id} className='poster-item'>
            <Link to={`${linkPrefix}/${item.id}`}>
              {item[isActor ? 'profile_path' : 'poster_path'] ? (
                 <>
                  <img
                    srcSet={`https://image.tmdb.org/t/p/${imageSize}${item[isActor ? 'profile_path' : 'poster_path']} 2x`}
                    src={`https://image.tmdb.org/t/p/${imageSize}${item[isActor ? 'profile_path' : 'poster_path']}`}
                    alt={item[isActor ? 'name' : 'title']}
                    loading="lazy"
                  />
                  {isActor && item.character && (
                    <div className="character-name">
                      <p>{item.name}</p>
                      <small>{item.character}</small>
                    </div>
                  )}
                </>
              ) : (
                <div className="no-image">
                  {item[isActor ? 'name' : 'title']}
                </div>
              )}
            </Link>
          </ImageListItem>
        ))}
      </ImageList>
    {!moviesProp && (
        <div className='view-more-container'>
          <button 
            className='view-more' 
            onClick={() => setPage(p => p + 1)} 
            disabled={isLoading}
          >
            {isLoading ? 'Carregant...' : 'View more'}
          </button>
        </div>
      )}
      </>
  );
}
