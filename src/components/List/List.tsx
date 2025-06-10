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

// Hook personalitzat per detectar la mida de pantalla
const useResponsiveCols = (defaultCols: number) => {
  const [cols, setCols] = React.useState(defaultCols);

  React.useEffect(() => {
    const updateCols = () => {
      const width = window.innerWidth;
      if (width <= 576) {
        setCols(1);
      } else if (width <= 768) {
        setCols(2);
      } else if (width <= 992) {
        setCols(3);
      } else if (width <= 1200) {
        setCols(4);
      } else {
        setCols(defaultCols);
      }
    };

    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, [defaultCols]);

  return cols;
};

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
  
  // Usar el hook responsiu
  const responsiveCols = useResponsiveCols(cols);

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
  
  // Reinicia el useEffect per a que no es repeteixin a la llista
  React.useEffect(() => {
    return () => {
      setMovies([]);
    };
  }, [isScaryMode]);

  const itemsToShow = moviesProp || movies;

  if (!moviesProp && isError) return (
    <div className="error">
      <p>Error en carregar la llista de pel·lícules</p>
    </div>
  );
  
  if (!moviesProp && !currentData?.results?.length) return (
    <div className="loading">
      <p>No hi ha pel·lícules disponibles</p>
    </div>
  );

  if (!moviesProp && isLoading && movies.length === 0) return (
    <div className="loading">
      <p>Carregant...</p>
    </div>
  );

  return (
    <div className="container">
      <ImageList 
        className="image" 
        sx={{ 
          width: '100%', 
          height: 'auto', 
          margin: '0 auto',
          gap: '20px !important',
          '@media (max-width: 768px)': {
            gap: '15px !important'
          },
          '@media (max-width: 576px)': {
            gap: '10px !important'
          }
        }} 
        cols={responsiveCols} 
        gap={20}
      >
        {itemsToShow?.map((item: Film) => (
          <ImageListItem key={item.id} className='poster-item'>
            <Link to={`${linkPrefix}/${item.id}`} style={{ textDecoration: 'none' }}>
              {item[isActor ? 'profile_path' : 'poster_path'] ? (
                <>
                  <img
                    srcSet={`https://image.tmdb.org/t/p/${imageSize}${item[isActor ? 'profile_path' : 'poster_path']} 2x`}
                    src={`https://image.tmdb.org/t/p/${imageSize}${item[isActor ? 'profile_path' : 'poster_path']}`}
                    alt={item[isActor ? 'name' : 'title']}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: 'auto',
                      aspectRatio: '2/3',
                      objectFit: 'cover'
                    }}
                  />
                  {isActor && (item as any).character && (
                    <div className="character-name">
                      <p>{(item as any).name}</p>
                      <small>{(item as any).character}</small>
                    </div>
                  )}
                </>
              ) : (
                <div className="no-image" style={{ aspectRatio: '2/3' }}>
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
    </div>
  );
}
